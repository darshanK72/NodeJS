import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NotFoundError } from "../../../09. Mongoose/src/Errors/NotFoundError.js";
import { BadRequestError } from "../Errors/BadRequestError.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        minLength: [4, "Name must be 4 or more characters"],
        require: true
    },
    username: {
        type: String,
        trim: true,
        minlength: [4, 'Username must be minimum 4 or more characters'],
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email address',
        },
        unique: true
    },
    password: {
        type: String,
        trim: true,
        unique: true,
        minLength: [8, 'Password must be minimum of length 8'],
        select: false
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => /^[0-9]+$/.test(value),
            message: 'Phone number must contain digits only',
        },
        minlength: [10, 'Phone number must be of 10 digits only'],
        maxlength: [10, 'Phone number must be of 10 digits only']
    },
    refreshToken: {
        type: String,
        select: false
    }
}, { versionKey: false })


userSchema.pre('save', async function (next) {
    const user = this; // Ensure 'this' refers to the document
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(this.password, password);
}

userSchema.methods.generateAccessToken = function () {
    const accessToken =  jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    return accessToken;
}

userSchema.methods.generateRefreshToken = async function () {
    const refreshToken = jwt.sign({
        id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })

    this.refreshToken = refreshToken;
    await this.save();
    return refreshToken;
}

userSchema.statics.findByUsername = async function (username) {
    const user = await this.findOne({ username }).select("+password");
    if (!user) {
        throw new NotFoundError("User Not Found");
    }
    return user;
}

export const User = new mongoose.model("User", userSchema);