import express from "express";
import expressAsyncHandler from "express-async-handler";
import {College, Hospital, Hotel, PoliceStation, School } from "../models/simpleModel.js";
const otherRouters = express.Router();

const getFunction =(item,itemModel)=>{
    const path='/city/:city/'+item;
    otherRouters.get(
        path,
        expressAsyncHandler(async (req, res) => {
            const city = req.params.city;
            const data = await itemModel.findOne({ city });
            if (!data) {
                res.status(404).send({
                    success: false,
                    message: 'City Not Found'
                });
            } else {
                res.status(200).send({
                    success: true,
                    data
                })
            }
        })
    )
}

getFunction('hospitals',Hospital);
getFunction('schools',School);
getFunction('police-stations',PoliceStation);
getFunction('hotels',Hotel);
getFunction('colleges',College);


export default otherRouters;