const salledesport = require('../models/salledesport');
const Sport = require('../models/salledesport');
const req = require('express/lib/request');



exports.addSalleSport = async (req,res) =>{

    const salledesport = new Sport({
        id : req.body.id,
      
    })
    console.log (req.body.id);
    
    try {

        const savedsport = await salledesport.save();
        
        res.send(salledesport);


    }
    catch (error) {
        res.status(400).send(error);    
    }

}