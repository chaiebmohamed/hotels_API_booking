const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({

    description:{type: String,required:true},
    status:{type:String,enum:["notfixed","in progress","fixed"],required:true,default:"notfixed"},
    fiexd_by:{type:mongoose.Types.ObjectId,required:false,ref:"user"},
    client:{type:mongoose.Types.ObjectId,required:true,ref:"user"}

})

module.exports = mongoose.model('reclamation',ReclamationSchema);