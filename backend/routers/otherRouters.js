import express from "express";
import expressAsyncHandler from "express-async-handler";
import { College, Hospital, Hotel, OldAgeHome, PoliceStation, School } from "../models/simpleModel.js";
const otherRouters = express.Router();

const getFunction = (item, itemModel) => {
    const path = '/city/:city/' + item;
    otherRouters.get(
        path,
        expressAsyncHandler(async (req, res) => {
            const page = 1; // The page of results you want to retrieve
            const limit = 10; // The maximum number of results per page
            const skip = (page - 1) * limit; // The number of documents to skip

            const city = req.params.city;
            const data = await itemModel.findOne({ city }).select('results')
                .slice('results', [skip, skip + limit]);
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

getFunction('hospitals', Hospital);
getFunction('schools', School);
getFunction('policestations', PoliceStation);
getFunction('hotels', Hotel);
getFunction('colleges', College);
getFunction('oldagehomes', OldAgeHome);


export default otherRouters;