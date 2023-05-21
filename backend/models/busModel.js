import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    srcStn: {
        type: String,
        required: true
    },
    destStn: {
        type: String,
        required: true
    },
    results: [
        {
            operatorName: {
                type: String,
                required: true
            },
            arrivalTime: {
                type: String,
                required: true
            },
            departureTime: {
                type: String,
                required: true
            },
            fare: {
                type: String,
                required: true
            },
            busType: {
                type: String,
            },
            amenities: {
                type: [String],
            },
            boardingPoint: [
                {
                    name: {
                        type: String,
                        // required: true
                    },
                    landmark: {
                        type: String,
                        default: ""
                    },
                    time: {
                        type: String,
                        // required: true
                    }
                }
            ],
            droppingPoint: [
                {
                    name: {
                        type: String,
                        // required: true
                    },
                    landmark: {
                        type: String,
                        default: ""
                    },
                    time: {
                        type: String,
                        // required: true
                    }
                }
            ]
        }
    ]

});

// Create a bus model
const Bus = mongoose.model('Bus', busSchema);

export { Bus };