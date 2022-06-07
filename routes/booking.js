const express = require('express')
const router=express()

const bookingController=require("../controllers/booking");
const auth = require('../middlewares/auth');
const receptioniste=require("../middlewares/receptionniste")
const error = require('../middlewares/error');
const validateObjectId = require('../middlewares/validateObjectId');


router.get("/getAll",auth,receptioniste,bookingController.getAll,error);
router.post("/newCheckIng",bookingController.newCheckIn,error);
router.path("/validateCheckIn/:id",validateObjectId,auth,receptioniste,bookingController.validateCheckIn,error);


module.exports = router;