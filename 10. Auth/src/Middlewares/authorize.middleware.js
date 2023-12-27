import { BadRequestError } from "../Errors/BadRequestError.js";

export const authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            throw new BadRequestError("You do not have permission to perform this action");
        }
        next()
    }
}