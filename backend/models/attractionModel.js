import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
            unique: true
        },
        attractions: [
            {
                name: {
                    type: String,
                    required: true,
                },
                address: {
                    type: String,
                },
                description: {
                    type: String,
                },
                latitude: {
                    type: Number,
                    required: true
                },
                longitude: {
                    type: Number,
                    required: true
                },
                imageUrls: {
                    type: [String]
                }
            }
        ]
    },
    {
        timestamps: true
    }
);


const attraction = mongoose.model('Attraction', attractionSchema);
export default attraction;