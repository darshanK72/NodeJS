import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    rate:{
        type:Number
    },
    count:{
        type:Number
    }
},{_id:false})

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    rating:ratingSchema
},{versionKey:false})

export const Product = new mongoose.model("Product",productSchema);
