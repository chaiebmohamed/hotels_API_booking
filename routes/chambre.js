const router = require('express').Router();
const mongoose = require('mongoose');
const roomController = require('../controllers/chambre');


router.post('/addroom',roomController.addRoom);
router.put('/changestatustonotavailble',roomController.changeStatusToNotAvailble);
router.put('/changestatustoavailble',roomController.changeStatusToAvailble);

module.exports = router;