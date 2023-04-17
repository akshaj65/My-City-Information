import ErrorHandler from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const isAuthenticatedUser = expressAsyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)

    if (!token) {
        return next(new ErrorHandler("Please login to use this resource", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    next();
})

export default isAuthenticatedUser;