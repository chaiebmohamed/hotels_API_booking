const number = require('@hapi/joi/lib/types/number');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const clientSchema = new mongoose.Schema({

    cin: {
        type: number,
        required: true
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
})
module.exports = mongoose.model('client', clientSchema);