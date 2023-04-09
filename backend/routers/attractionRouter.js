import express from "express";
import expressAsyncHandler from "express-async-handler";
import Attraction from "../models/attractionModel.js";

const attractionRouter = express.Router();

//Create 
attractionRouter.post(
    '/city/:city/attractions/add',
    expressAsyncHandler(async (req, res) => {
        const { name, address, latitude, longitude, imageUrls, description } = req.body;
        const city = req.params.city;
        const attraction = await Attraction.findOne({ city });
        if (!attraction) {
            // Create a new attraction object for the city
            const newAttraction = new Attraction({
                city: city,
                attractions: [{ name, address, latitude, longitude, imageUrls, description }]
            });
            const CreatedNewAttraction = await newAttraction.save();
            if (CreatedNewAttraction) {
                res.status(201).send({
                    success: true,
                    message: 'New city and attraction added',
                    results: CreatedNewAttraction
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in adding city and attraction data'
                });
            }
        } else {
            // Add a new attraction to the existing attraction object
            attraction.attractions.push({ name, address, latitude, longitude, imageUrls });
            const updateAttraction = await attraction.save();
            if (updateAttraction) {
                res.status(201).send({
                    success: true,
                    message: 'New attraction added',
                    results: updateAttraction
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in adding attraction'
                })
            }
        }
    })
);

//get
attractionRouter.get(
    '/city/:city/attractions',
    expressAsyncHandler(async (req, res) => {
        const city = req.params.city;
        const attraction = await Attraction.findOne({ city });
        if (!attraction) {
            res.status(404).send({
                success: false,
                message: 'City Not Found'
            });
        } else {
            res.status(200).send({
                success: true,
                results: attraction
            })
        }
    })
)
export default attractionRouter;
