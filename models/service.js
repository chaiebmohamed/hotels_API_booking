const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({

  name:{type:String,required:true},
  description:{type:String,required:true},
  type:{type:String,required:true},
  image: {type:String,required:true,default:""},
  capacity:{type:Number,required:true,min:0},
  avaible_places:{type:Number,required:true,min:0},
  rating:{type:Number,required:true},
  comments:[
      { 
          client:{type:mongoose.Types.ObjectId,ref:"user"},
          comment:{type:String,required:true},
          mark: {type:Number,required:true}
      }
  ]
})

module.exports = mongoose.model('service',ServiceSchema);