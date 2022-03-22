const boolean = require('@hapi/joi/lib/types/boolean');
const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    matricule: {
        type: number,
        required: true,
        min: 8
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    adress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 8
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: boolean,
        required: true,
    },

    type: {
        type: String,
        enum: ["travailleur", "receptionniste", "admin", "client"],
        default: "admin",
    },
})
module.exports = mongoose.model('user',userSchema);