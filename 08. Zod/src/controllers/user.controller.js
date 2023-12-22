// import users from '../data/user.json' assert {type: "json"};
import fs from 'fs';
import { userSchema } from '../schemas/user.schema.js';

const users = JSON.parse(fs.readFileSync('./data/user.json'));

const createUserId = () => {
    return Math.floor(Math.random() * 9999 + 1);
}

const updateUsers = (users) => {
    fs.writeFile('./data/user.json',JSON.stringify(users),(error) => {
        if(error){
            throw error;
        }
    })
}

export const getUsers = (req, res) => {
    res.status(200).json(users);
}

export const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User Not Found" });
    }
}

export const addUser = (req, res) => {
    const validationResult = userSchema.safeParse(req.body);
    if (validationResult.success) {
        const id = createUserId();
        users.push({ id, ...validationResult.data });
        updateUsers(users);
        res.status(201).json({ message: "User is created", user: req.body });
    }
    else {
        res.status(400).json({ message: "Invalid Input", error: validationResult.error });
    }
}
