const router = require('express').Router();
const roomController = require('../controllers/room');
const auth=require("../middlewares/auth")
const admin=require("../middlewares/admin")
const client=require("../middlewares/client")
const error=require("../middlewares/error")
const validateObjetId=require("../middlewares/validateObjectId");


router.get("/all",auth,admin,roomController.getAll,error)
router.get("/allroom",roomController.getEmpltyRooms,error)
router.post('/addroom',auth,admin,roomController.addRoom,error);
router.put('/notavailble/:id',validateObjetId,auth,admin,roomController.changeStatusToNotAvailble,error);
router.put('/availble/:id',validateObjetId,auth,admin,roomController.changeStatusToAvailble,error);
router.put("/updatePriceByType",auth,admin,roomController.changePriceByType,error)
router.put("/updatePrice/:id",validateObjetId,auth,admin,roomController.changePrice,error);

module.exports = router;