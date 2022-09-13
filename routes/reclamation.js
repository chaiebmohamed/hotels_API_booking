const express = require('express')
const auth = require('../middlewares/auth')
const client = require('../middlewares/client')
const reclamationController=require("../controllers/reaclamation")
const error=require("../middlewares/error")
const router=express()
const travailleur = require('../middlewares/travailleur')


router.post("/newReclamation",auth,client,reclamationController.newReclamation,error)
router.get("Reclamations",auth,travailleur,reclamationController.getAllReclamation,error)

module.exports=router;