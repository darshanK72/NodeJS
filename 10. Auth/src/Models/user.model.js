import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        minLength: [4, "Name must be 4 or more characters"],
        require: true,
        unique:true
    },
    username: {
        type: String,
        trim: true,
        minlength: [4, 'Username must be minimum 4 or more characters'],
        maxlength: [12, 'Username must be maximum 12 or less characters'],
        unique:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email address',
        },
        unique:true
    },
    password:{
        type:String,
        trim:true,
        unique:true,
        minLength:[9,'Password must be minimum of length 8']
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => /^[0-9]+$/.test(value),
            message: 'Phone number must contain digits only',
        },
        minlength: [10, 'Phone number must be of 10 digits only'],
        maxlength: [10, 'Phone number must be of 10 digits only'],
        transform: (val) => `+91 ${val.slice(0, 5)} ${val.slice(5)}`,
    },
})

export const User = new mongoose.model("User",userSchema);