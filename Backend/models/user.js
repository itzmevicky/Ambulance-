const mongoose = require('mongoose') ;

const user = new mongoose.Schema({
    license_no: {
        type: String,
        required: true,
        unique: true,
    },
    type_of_vehicle: {
        type: String,
        required: true,
    },
    vechicle_no: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
        default: "",
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("user",user) ;