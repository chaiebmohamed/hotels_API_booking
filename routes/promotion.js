const express = require('express')
const router=express()
const promotionController = require('../controllers/promotion');
const auth=require("../middlewares/auth")
const admin=require("../middlewares/admin")
const error=require("../middlewares/error")
const validateObjetId=require("../middlewares/validateObjectId")

router.get('/all',promotionController.getAll,error)
router.post("/newPromotion",auth,admin,promotionController.newPromotion,error)
router.delete("/removePromotion/:id",validateObjetId,auth,admin,promotionController.removePormotion,error)

module.exports = router;