import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Train } from '../models/trainModel.js'
const trainRouter = express.Router();


//get station details
// GET /trains?stationCode=ABC
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

trainRouter.get(
    '/city-stations',
    expressAsyncHandler(async (req, res, next) => {
        const { city } = req.query;
        let data = await Train.find({ city }, { stationName: 1 ,stationCode:1,_id:0});
        if (!city) {
            return next(new ErrorHandler("city parameter is required", 400));
        }
        if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Stations Not Found'
            });
        } else {
            res.status(200).send({
                success: true,
                // data: data.map(({ stationName, stationCode }) => ({ [stationCode]:stationName  }))
                data
            });
        }

    }));
export default trainRouter;