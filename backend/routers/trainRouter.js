import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Train } from '../models/trainModel.js'
const trainRouter = express.Router();


//get station details
// GET /buses?srcStn=ABC&destStn=XYZ
trainRouter.get(
    '/trains', 
    expressAsyncHandler(async (req, res,next)  => {
        const { stationCode } = req.query;
        const data= await Train.findOne({stationCode});
        if (!data) {
            res.status(404).send({
                success: false,
                message: 'Route Not Found'
            });
        }else{
            res.status(200).send({
                success: true,
                data
            });
        }

}));

export default trainRouter;