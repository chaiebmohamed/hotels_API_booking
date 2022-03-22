const admin = require('../models/administrateur');
const receptionniste = require('../models/receptionniste');
const travailleur = require('../models/travailleurs');


exports.getalladmins = async (req,res)=>{
    let namelist=[];
    
    try {
        const admins = await admin.find();
    
        if (admins)
        {
           // console.log(admins);
            let tab = [...admins]
            console.log(tab)
            for (let i=0; i<tab.length;i++){
                namelist.push(tab[i].name);
            } 
        }
        //if (!admins) return res.status(400).send("no admin found");
        return res.status(200).send(namelist);
    }
    
    catch (error) {
        res.status(400).send(error);
    }

}

exports.manipuleRole= async (req,res)=>{

        try {
            
            const user= await travailleur.findOneAndUpdate({matricule : req.body.matricule},{type : req.body.type});
            
        } catch (error) {
            res.status(400).send(error);

        }

}