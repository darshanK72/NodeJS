import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';

export const uploadFileToCloudinary = async (localFilePath) => {
    const uploadResponse = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'});
    fs.unlinkSync(localFilePath);
    return uploadResponse;

}