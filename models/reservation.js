const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({

    date_begin:{type:Date,required:true},
    date_end:{type:Date,required:true},
    total_price:{type:Number,required:true},
    code:{type:Number,required:true},
    valid:{type: Boolean,required:true},
    services :[{type:mongoose.Types.ObjectId,ref:"service"}],
    client:{type:mongoose.Types.ObjectId,ref:"user"},
    room:{type:mongoose.Types.ObjectId,ref:"room"},
    receptionniste:{type:mongoose.Types.ObjectId,ref:"user"}
          
})

module.exports = mongoose.model('reservation',ReservationSchema);