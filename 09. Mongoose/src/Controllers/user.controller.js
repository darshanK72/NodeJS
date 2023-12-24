import { User } from "../Models/user.model.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).send("Internal Server Error");
    }
}

export const getUserById = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
}

export const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User is created", user });
    } catch (error) {
        res.status(400).json({ message: "Invalid Input", error });
    }
}

