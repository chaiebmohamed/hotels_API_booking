const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({

    description:{type: String,required:true},
    status:{type:String,enum:["notfixed","in progress","fixed"],required:true},
    fiexd_by:{type:mongoose.Types.ObjectId,required:true},
    client:{type:mongoose.Types.ObjectId,required:true}

})

module.exports = mongoose.model('reclamation',ReclamationSchema);