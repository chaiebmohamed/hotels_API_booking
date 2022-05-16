const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    matricule: {type: Number,required: true,min: 8},
    firstname: {type: String,required: true,min: 6,max: 25},
    lastname: {type: String,required: true,min: 6,max: 25},
    adress: {type: String,required: true},
    email: {type: String,required: true,max: 25,min: 8},
    password: {type: String,required: true,min: 8,max: 12},
    country : {type:String,required:true},
    profession : {type:String,required:true},
    date_birth: {type: Date,default: Date.now},
    place_birth: {type: String,required:true},
    avatar:{type:String,required:true},
    phone: {type:String,required:true},
    salary:{type:Number,required:false},
    isAdmin: {type: Boolean,required: true},
    type: { type: String,enum: ["travailleur", "receptionniste", "admin", "client"] },
    busy:{type:Boolean,required:true,default:false}
})
module.exports = mongoose.model('user',UserSchema);