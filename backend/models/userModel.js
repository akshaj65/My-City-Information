import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false //when you search in using findone it will not show password with the output 
    }
})

UserSchema.pre("save", async function (next) {//we are using function because in arrow func we cant use "this"
    if (!this.isModified("password")) { // when we update email name but no password we need not update hash again so hash only change when its modified
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});
//JWT token
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id },config.JWT_SECRET,{
        expiresIn:config.JWT_EXPIRE,
    });
};
//compare Password
UserSchema.methods.comparePassword = async function (inputedPassword) {
    return await bcrypt.compare(inputedPassword, this.password);
}

const User = new mongoose.model('user', UserSchema);
export default User;