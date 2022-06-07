const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    matricule: {type: String,required: true,min: 8},
    firstname: {type: String,required: true,min: 6,max: 25},
    lastname: {type: String,required: true,min: 6,max: 25},
    adress: {type: String,required: true},
    email: {type: String,required: true,max: 25,min: 8},
    password: {type: String,required: false,min:10},
    country : {type:String,required:true},
    profession : {type:String,required:true,},
    date_birth: {type: Date,default: Date.now},
    place_birth: {type: String,required:true},
    avatar:{type:String,required:true},
    phone: {type:String,required:true},
    salary:{type:Number,required:false,default:0},
    isAdmin: {type: Boolean,required: true},
    type: { type: String,enum: ["travailleur", "receptionniste", "admin", "client"] },
    busy:{type:Boolean,required:true,default:false},
    status:{type:Boolean,required:true,default:true}
})

UserSchema.methods.generateAuth = function () {
  
    return jwt.sign(
      {
        _id: this._id,
        username: this.firstname+" "+this.lastname,
        type: this.type,
        busy: this.busy,
        isAdmin:this.isAdmin
      },
      process.env.JWT,
      {
        expiresIn: '24h',
      }
    );
  };

module.exports = mongoose.model('user',UserSchema);