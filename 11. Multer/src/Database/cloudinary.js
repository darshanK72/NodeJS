import { v2 as cloudinary } from 'cloudinary';

export const connectCloudinary = (name,key,secret) => {
    cloudinary.config({
        cloud_name: name,
        api_key: key,
        api_secret: secret
    })
}
