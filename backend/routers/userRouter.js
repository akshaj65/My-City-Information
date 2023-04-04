import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
const userRouter = express.Router();

//Register User
userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        await sendToken(user, 201, res);
    })
)

//signin User
userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        //checking if user has given password and email both
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400))
        }
        //as we know we had made select false for password so we should externally select that password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }
        const isPasswordMatched = await user.comparePassword(password);
        // console.log(isPasswordMatched)
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }
        await sendToken(user, 200, res);
    })
);

//signout User
userRouter.get(
    '/logout',
    expressAsyncHandler(async (req, res, next) => {
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true,

        });
        res.status(200).json({
            success:true,
            message:"Logged Out",
        })
    })
);

export default userRouter;