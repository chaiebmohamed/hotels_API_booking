const router = require('express').Router();
const mongoose = require('mongoose');
const authcontroller = require('../controllers/auth');
const admincontroller = require('../controllers/travailleurs');

router.post('/register', authcontroller.register);


module.exports = router;