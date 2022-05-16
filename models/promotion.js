const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({

    date_begin:{type:Date,required:true},
    date_end:{type:Date,required:true},
    image:{type: String,required:true},
    services :[
       {
           service:{type:mongoose.Types.ObjectId,ref:"service"},
           percent:{type:Number,required:true}
       }
    ]
    

})

module.exports = mongoose.model('promotion',PromotionSchema);