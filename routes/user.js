const express = require('express')
const router=express()

const authcontroller = require('../controllers/auth');
const userController = require('../controllers/user');
const auth=require("../middlewares/auth")


router.get('/all',auth,userController.getAlluser);

router.patch('/change',userController.manipuleRole);

router.post('/registeradmin',authcontroller.RegisterAdmin);
router.post('/register', authcontroller.registeruser);





module.exports = router;