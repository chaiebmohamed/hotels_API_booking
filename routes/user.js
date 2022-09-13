const express = require('express')
const router=express()
const userController = require('../controllers/user');
const auth=require("../middlewares/auth")
const admin=require("../middlewares/admin")
const error=require("../middlewares/error")
const validateObjetId=require("../middlewares/validateObjectId")

router.get('/all',auth,admin,userController.getAlluser,error);
router.get('/:id',auth,admin,userController.getUser,error);

router.post("/registerAdmin",userController.addAdmin,error);
router.post('/registerUser',auth,admin,userController.addUser,error);

router.post("/signIn",userController.singIn,error);
router.delete("/removeUser/:id",validateObjetId,auth,admin,userController.removeUser,error)
router.patch("/updateProfil",auth,userController.updateProfil,error);
router.patch("/updatePassword",auth,userController.updatePassword,error)

module.exports = router;

