import jwt from 'jsonwebtoken';
import util from 'util';
import { NotFoundError } from '../../../09. Mongoose/src/Errors/NotFoundError.js';
import { BadRequestError } from "../Errors/BadRequestError.js";
import { User } from '../Models/user.model.js';
import { asyncWrapper } from '../Utils/asyncWrapper.js';

export const authenticate = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        throw new BadRequestError("You are not logged in");
    }
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken.id);
    if(!user){
        throw new NotFoundError("User Not Found");
    }
    req.user = user;
    next();
})