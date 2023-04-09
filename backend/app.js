import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import errorMiddleware from './middleware/error.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import attractionRouter from "./routers/attractionRouter.js";
import otherRouters from "./routers/otherRouters.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());//we have used this for parsing cookies

app.use("/api/v1",userRouter);
app.use("/api/v1",attractionRouter);
app.use('/api/v1',otherRouters)
app.use(errorMiddleware);
export default app;