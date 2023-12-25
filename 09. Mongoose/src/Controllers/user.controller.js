import { BadRequestError } from "../Errors/BadRequestError.js";
import { NotFoundError } from "../Errors/NotFoundError.js";
import { User } from "../Models/user.model.js";


const asyncWrapper = (controllerFunction) => {
    return (req, res, next) => {
        controllerFunction(req, res, next).catch(next);
    }
}

export const getUsers = asyncWrapper(async (req, res) => {
    const keywords = ["sort", "page", "limit", "fields"];
    const queryObj = {};
    const query = req.query;

    keywords.forEach(key => {
        if (query[key]) {
            queryObj[key] = query[key];
            delete query[key];
        }
    })

    // Filtering
    let queryString = JSON.stringify(query);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let usersQuery = User.find(JSON.parse(queryString));

    // Sorting
    if (queryObj.sort) {
        const sortby = queryObj.sort.split(',').join(' ');
        usersQuery = usersQuery.sort(sortby);
    }

    // Limiting Fields
    if (queryObj.fields) {
        const selectOnly = queryObj.fields.split(',').join(' ');
        usersQuery = usersQuery.select(selectOnly);
    }

    // Pegination
    if (queryObj.page || queryObj.limit) {
        const count = await User.countDocuments();
        let limit = parseInt(queryObj.limit) || 5;
        let page = parseInt(queryObj.page) || 1;
        let skip = (page - 1) * limit;
        usersQuery = usersQuery.skip(skip).limit(limit);
        if (skip >= count) {
            throw new NotFoundError("No more users found");
        }
    }
    const users = await usersQuery;
    res.status(200).json(users);
})

export const getUserById = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        throw new NotFoundError("User Not Found");
    }
    res.status(200).json(user);
})

export const addUser = asyncWrapper(async (req, res) => {
    const user = await User.create(req.body);
    if (!user) {
        throw new BadRequestError("Invalid Input");
    }
    res.status(201).json({ message: "User is created", user });

})

export const updateUser = asyncWrapper( async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, upsert: true });
    if (!user) {
        throw new NotFoundError("User Not Found");
    }
    res.status(201).json(user);
})

export const deleteUser = asyncWrapper( async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new NotFoundError("User Not Found");
    }
    res.status(200).json(user);
})
