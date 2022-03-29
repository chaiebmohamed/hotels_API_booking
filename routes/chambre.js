const router = require('express').Router();
const mongoose = require('mongoose');
const roomController = require('../controllers/chambre');


router.post('/addroom',roomController.addRoom);
router.put('/changestatus',roomController.changeStatus);

module.exports = router;