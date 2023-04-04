import config from "../config/config.js";
const sendToken=async (user,statuscode,res)=>{
    let token=user.getJWTToken();
    //options for cookie
    const options={
        expires: new Date(
            Date.now()+config.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });
}

export default sendToken;