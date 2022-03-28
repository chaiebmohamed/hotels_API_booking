const boolean = require('@hapi/joi/lib/types/boolean');
const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');

const spaSchema = new mongoose.Schema({

    id : {
        type : number,
        required: true,
         },
    
    isAvailable : {
        type : boolean,
        required: true,
        default : true
    } 





})

module.exports = mongoose.model('spa',spaSchema);