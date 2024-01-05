import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName:{
        type:String,
        unique:true,
        require:true
    },
    url:{
        type:String,
        unique:true,
        require:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
},{versionKey:false})

export const File = new mongoose.model("File",fileSchema);