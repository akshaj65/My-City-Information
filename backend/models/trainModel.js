import mongoose from 'mongoose';
const trainSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    stationName: {
        type: String,
        required: true,
        unique:true,
    },
    stationCode: {
        type: String,
        required: true,
        unique:true,
    },
    stationData: [
        {
            trainNumber: {
                type: String,
                required: true
            },
            trainName: {
                type: String,
                required: true
            },
            trainType: {
                type: String
            },
            trainClass: {
                type: String
            },
            trainRoute: {
                type: String,
            },
            dayOfRun: {
                type: String
            },
            schedule: {
                arrival: {
                    type: String,
                },
                departure: {
                    type: String,
                }
            }
        }
    ]
});

// Create a bus model
const Train = mongoose.model('Train', trainSchema);

export { Train };