import mongoose from "mongoose";
import config from "./config.js";
const connectDatabase= () => {
    mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`MongoDB connected with server :${data.connection.host}`)
    });
};

export default connectDatabase;