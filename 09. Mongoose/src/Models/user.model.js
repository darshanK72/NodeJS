import mongoose, { mongo } from 'mongoose';


const geoSchema = new mongoose.Schema({
    lat: { type: String, trim: true },
    lng: { type: String, trim: true },
}, { _id: false })

const addressSchema = new mongoose.Schema({
    street: { type: String, trim: true },
    suite: { type: String, trim: true },
    city: { type: String, trim: true },
    zipcode: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => /^\d{6}$/.test(value),
            message: 'Zipcode must be of 6 digits only',
        },
    },
    geo: geoSchema
},{_id:false})

const companySchema = new mongoose.Schema({
    name: { type: String },
    catchPhrase: { type: String },
    bs: { type: String },
},{_id:false});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [4, "Name must be 4 or more characters"],
        require: true
    },
    username: {
        type: String,
        trim: true,
        minlength: [4, 'Username must be minimum 4 or more characters'],
        maxlength: [12, 'Username must be maximum 12 or less characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email address',
        }
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
    website: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [5, 'Website url must contain at least 5 characters'],
        validate: {
            validator: (value) => value.indexOf('.') !== -1,
            message: 'Invalid Url',
        }

    },
    address: addressSchema,
    company: companySchema,
},{versionKey:false})

export const User = new mongoose.model("User", userSchema);
