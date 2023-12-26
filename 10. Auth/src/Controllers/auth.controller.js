import { User } from '../Models/user.model.js';
import { BadRequestError } from '../Errors/BadRequestError.js';
import { asyncWrapper } from '../Utils/asyncWrapper.js';

export const signUp = asyncWrapper(async (req,res) => {
    const user = await User.create(req.body);
    if(!user){
        throw new BadRequestError("Invalid Input");
    }
    res.status(201).json(user);
}
)
export const signIn = asyncWrapper(async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findByUsername(username);
    const isPasswordMatch = user.comparePassword(password);
    if(!isPasswordMatch){
        throw new BadRequestError("Password Do Not Match");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.status(200).json({accessToken,refreshToken});
})
