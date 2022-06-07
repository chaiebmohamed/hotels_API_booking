const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({

  name:{type:String,required:true},
  description:{type:String,required:true},
  type:{type:String,required:true,enum:["restauration","ASI","lingerie"]},
  image: {type:String,required:true,default:""},
  isAvaible:{type:Boolean,required:true,default:false},
  price:{type:Number,required:true},
  capacity:{type:Number,required:true,min:0},
  avaible_places:{type:Number,required:true,min:0},
  rating:{type:Number,required:true,default:0},
  comments:[
      { 
          client:{type:mongoose.Types.ObjectId,ref:"user"},
          comment:{type:String,required:true},
          mark: {type:Number,required:true}
      }
  ]
})

module.exports = mongoose.model('service',ServiceSchema);