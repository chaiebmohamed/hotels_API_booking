const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date_begin:{type:Date,required:true},
    date_end:{type:Date,required:true},
    image:{type: String,required:true},
    isAvaible:{type:Boolean,required:true,default:true},
    services :[
       {
           service:{type:mongoose.Types.ObjectId,ref:"service"},
           percent:{type:Number,required:true}
       }
    ]
    

})

module.exports = mongoose.model('promotion',PromotionSchema);