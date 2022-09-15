const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

    date_begin:{type:Date,required:true},
    date_end:{type:Date,required:true},
    total_price:{type:Number,required:true},
    code:{type:String,required:true,default:""},
    valid:{type: Boolean,required:true,default:false},
    services :[{type:mongoose.Types.ObjectId,ref:"service"}],
    promotion:[{type:mongoose.Types.ObjectId,ref:"promotion"}],
    client:{type:mongoose.Types.ObjectId,ref:"user",required:true},
    room:{type:mongoose.Types.ObjectId,ref:"room",required:true},
    receptionniste:{type:mongoose.Types.ObjectId,ref:"user",required:false}
          
})

module.exports = mongoose.model('booking',BookingSchema);