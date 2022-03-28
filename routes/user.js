const router = require('express').Router();
const mongoose = require('mongoose');
const authcontroller = require('../controllers/auth');
const userController = require('../controllers/user');

router.patch('/change',userController.manipuleRole);
router.get('/all',userController.getalluser);
router.post('/registeradmin',authcontroller.RegisterAdmin);
router.post('/register', authcontroller.registeruser);





module.exports = router;