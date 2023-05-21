import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Bus } from '../models/busModel.js'
import ErrorHandler from "../utils/errorHandler.js";
const busRouter = express.Router();


//get bus details
// GET /buses?srcStn=ABC&destStn=XYZ
busRouter.get(
    '/buses',
    expressAsyncHandler(async (req, res, next) => {
        const { srcStn, destStn } = req.query;

        const data = await Bus.findOne({ srcStn, destStn });

        if (!data) {
            res.status(404).send({
                success: false,
                message: 'Route Not Found'
            });
        } else {
            res.status(200).send({
                success: true,
                data
            });
        }

    }));

// get All DestStn With SrcStn
busRouter.get(
    '/bus-destinations',
    expressAsyncHandler(async (req, res, next) => {
        const { srcStn } = req.query;
        let data = await Bus.find({ srcStn }, { destStn: 1 ,_id:0});
        if (!srcStn) {
            return next(new ErrorHandler("srcStn parameter is required", 400));
        }
        if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Route Not Found'
            });
        } else {
            res.status(200).send({
                success: true,
                data: data.map(bus => bus.destStn)
            });
        }

    }));

export default busRouter;