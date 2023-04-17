import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import isAuthenticatedUser from '../middleware/auth.js'
const userRouter = express.Router();

//Register User
userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res, next) => {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400))
        }
        // console.log(req.body,"userouter");
        const user = await User.create({
            name: name || 'user',
            email,
            password
        });
        // console.log(user);
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
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,

        });
        res.status(200).json({
            success: true,
            message: "Logged Out",
        })
    })
);

userRouter.get(
    '/me',
    isAuthenticatedUser,
    expressAsyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    })
);
export default userRouter;