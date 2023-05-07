import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
        required: true
    },
    placeInfo: {
        pinCode: {
            type: String,
            required: true
        },
        areaCode: {
            type: String,
            required: true
        },
        population: {
            type: String,
            required: true
        },
        mainLanguage: {
            type: String,
            required: true
        },
        famousFor: {
            type: String,
            required: true
        }
    },
    placeLinks: [
        {
            url: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});
const City = mongoose.model('City', citySchema);

export {
    City
};