const router = require('express').Router();
const mongoose = require('mongoose');
const spaController = require('../controllers/spa');

router.post('/add',spaController.addSpa);

module.exports = router;