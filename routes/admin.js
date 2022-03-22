const router = require('express').Router();
const mongoose = require('mongoose');
const authcontroller = require('../controllers/auth');
const admincontroller = require('../controllers/admin');

router.post('/register', authcontroller.registeradmin);
router.get('/all',admincontroller.getalladmins);
router.post('/change',admincontroller.manipuleRole);



module.exports = router;