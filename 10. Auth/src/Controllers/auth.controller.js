import crypto from 'crypto';
import { User } from '../Models/user.model.js';
import { BadRequestError } from '../Errors/BadRequestError.js';
import { asyncWrapper } from '../Utils/asyncWrapper.js';
import { sendEmail } from '../Utils/emailSender.js';
import { CustomError } from '../Errors/CustomError.js';

export const signUp = asyncWrapper(async (req,res) => {
    const user = await User.create(req.body);
    if(!user){
        throw new BadRequestError("Invalid Input");
    }
    res.status(201).json(user);
})

export const signIn = asyncWrapper(async (req,res) => {
    const {username,email,password} = req.body;
    let user;
    if(username){
        user = await User.findByUsername(username);
    }else if(email){
        user = await User.findByEmail(email);
    }else{
        throw new BadRequestError("Invalid Credentials");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        throw new BadRequestError("Password Do Not Match");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.status(200).json({accessToken,refreshToken});
})

export const forgotPassword = asyncWrapper(async (req,res) => {
    const {username,email} = req.body;
    let user;
    if(username){
        user = await User.findByUsername(username);
    }else if(email){
        user = await User.findByEmail(email);
    }else{
        throw new BadRequestError("Invalid Credentials");
    }

    const passwordResetToken = await user.generatePasswordResetToken();

    const resetUrl = `${req.protocol}://${req.get("host")}/user/reset/password/${passwordResetToken}`;
    const message = `We have recived your password reset request, please use the below link to reset your password\n\n${resetUrl}\n\nThis password reset link will expire in 10 Mins`;
    
    try{
        await sendEmail({
            to:user.email,
            subject:"Link for reseting your password",
            text:message
        })

        res.status(200).json({
            message:"Password reset link is send to your email!"
        })

    }catch(error){
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save()
        throw new CustomError("Cannot reset your password now, Try again after some time",500);
    }
}) 

export const resetPassword = asyncWrapper(async (req,res) => {
    const passwordResetToken = req.params.token;
    const {password} = req.body;
    const token = crypto.createHash("sha256").update(passwordResetToken).digest('hex');
    const user = await User.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}});

    if(!user){
        throw new BadRequestError("Password reset link expired");
    }

    user.password = password;
    user.passwordResetAt = Date.now();
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    res.status(200).json({message:"Password reset successfull"});

})