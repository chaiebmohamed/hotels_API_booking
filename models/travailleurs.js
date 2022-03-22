const number = require('@hapi/joi/lib/types/number');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const travailleurSchema = new mongoose.Schema({

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
    type: {
        type: String,
        enum: ["travailleur", "receptionniste", "admin"],
        default: "travailleur",
    },
})
module.exports = mongoose.model('travailleur', travailleurSchema);