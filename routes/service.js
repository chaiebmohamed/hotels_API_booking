const express= require('express')
const router=express()
const serviceController=require("../controllers/service")
const auth=require("../middlewares/auth")
const admin=require("../middlewares/admin")
const client=require("../middlewares/client")
const error=require("../middlewares/error")
const validateObjetId=require("../middlewares/validateObjectId")

router.get("/all",serviceController.getAll,error)
router.post("/newService",auth,admin,serviceController.addService,error)
router.put("/newComment",auth,client,serviceController.newComment,error)
router.delete("/removeService/:id",validateObjetId,auth,admin,serviceController.removeService,error)



module.exports = router;