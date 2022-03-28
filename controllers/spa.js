const salledesport = require('../models/salledesport');
const Spa = require('../models/salledesport');
const req = require('express/lib/request');



exports.addSpa = async (req,res) =>{

    const spa = new Spa({
        id : req.body.id,
      
    })
    console.log (req.body.id);
    
    try {

        const savedspa = await spa.save();
        
        res.send(spa);


    }
    catch (error) {
        res.status(400).send(error);    
    }

}