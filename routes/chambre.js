const router = require('express').Router();
const mongoose = require('mongoose');
const roomController = require('../controllers/chambre');


router.post('/add',roomController.addRoom);

module.exports = router;