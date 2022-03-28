const router = require('express').Router();
const mongoose = require('mongoose');
const sportcontroller = require('../controllers/salledesport')



router.post('/add',sportcontroller.addSalleSport);

module.exports = router;