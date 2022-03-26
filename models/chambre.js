const boolean = require('@hapi/joi/lib/types/boolean');
const number = require('@hapi/joi/lib/types/number');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({

    id : {
        type : number,
        required: true,
         },
    
    isAvailable : {
        type : boolean,
        required: true,
        default : true
    } ,

    price:{
        type : number,
        required : true
    },

    type:{
        type : String,
        required: true
    },

    numberofperson : {
        type : number,
        required : true
    }



})

module.exports = mongoose.model('room',chambreSchema);