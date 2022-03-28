const boolean = require('@hapi/joi/lib/types/boolean');
const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({

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

module.exports = mongoose.model('salledesport',sportSchema);