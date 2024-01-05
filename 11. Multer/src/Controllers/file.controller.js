import { NotFoundError } from "../Errors/NotFoundError.js";
import {BadRequestError} from '../Errors/BadRequestError.js';
import { File } from "../Models/file.model.js";
import { asyncWrapper } from "../Utils/asyncWrapper.js";
import { uploadFileToCloudinary } from "../Utils/cloudinaryHandler.js";

export const getFiles = asyncWrapper(async (req,res) => {
    const files = await File.find();
    if(!files){
        throw new NotFoundError("Files Not Found");
    }
    res.json(files);
})

export const getFile = asyncWrapper(async (req,res) => {
    const fileId = req.params.fileId;
    if(!fileId){
        throw new BadRequestError("Invalid input for file id");
    }
    const file = await File.findById(fileId);

    if(!file){
        throw new NotFoundError("File with given id not found");
    }

    res.json(file);
})

export const uploadFile = asyncWrapper(async (req,res) => {

    const {path,filename} = req.file;

    const uploadResponse = await uploadFileToCloudinary(path);

    const file = await File.create({
        fileName:req.file.originalname,
        url:uploadResponse.secure_url,
        image:{
            data:req.file.filename,
            contentType:'image/png'
        }
    })

    if(!file){
        throw new BadRequestError("File Not Uploaded");
    }

    res.json({message:`File ${filename} Uploaded successfully`});
})
