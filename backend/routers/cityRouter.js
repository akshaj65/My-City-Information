import express from "express";
import expressAsyncHandler from "express-async-handler";
import { City } from '../models/cityModel.js'
const cityRouter = express.Router();


//get city details
cityRouter.get(
    '/city/:city', 
    expressAsyncHandler(async (req, res,next)  => {
        const cityName = req.params.city;
        const data= await City.findOne({cityName:cityName});
        if (!data) {
            res.status(404).send({
                success: false,
                message: 'City Not Found'
            });
        }else{
            res.status(200).send({
                success: true,
                data
            });
        }

}));

export default cityRouter;