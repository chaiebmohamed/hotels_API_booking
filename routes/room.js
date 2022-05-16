const router = require('express').Router();
const roomController = require('../controllers/room');


router.post('/addroom',roomController.addRoom);
router.put('/changestatustonotavailble',roomController.changeStatusToNotAvailble);
router.put('/changestatustoavailble',roomController.changeStatusToAvailble);

module.exports = router;