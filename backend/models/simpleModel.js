import mongoose from "mongoose";

const basicSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
            unique: true
        },
        category:{
            type:String
        },
        results: [
            {
                name: {
                    type: String,
                    required: true
                },
                latitude: {
                    type: Number,
                    required: true
                },
                longitude: {
                    type: Number,
                    required: true
                },
                address: { //you can choose "address_lines" where it has been printed in new line
                    type: String,
                },
                address_lines: {
                    type: [String],
                },
                phone: {
                    type: String
                },
                website: {
                    type: String
                },
                tags: {
                    type: [String]
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Hospital = mongoose.model('Hospital', basicSchema);
const PoliceStation = mongoose.model('PoliceStations', basicSchema);
const Hotel = mongoose.model('Hotel', basicSchema);
const School = mongoose.model('School', basicSchema);
const College = mongoose.model('College', basicSchema);
const OldAgeHome = mongoose.model('OldAgeHome', basicSchema);

export {
    Hospital,
    PoliceStation,
    Hotel,
    School,
    College,
    OldAgeHome
};