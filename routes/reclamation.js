const express = require('express')
const auth = require('../middlewares/auth')
const client = require('../middlewares/client')
const reclamationController=require("../controllers/reaclamation")
const error=require("../middlewares/error")
const router=express()


router.post("/newReclamation",auth,client,reclamationController.newReclamation,error)


module.exports=router;