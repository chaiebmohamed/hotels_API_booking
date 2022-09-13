const Promotion=require("../models/promotion")
const {uploadImage}=require("../helpers/manage-file")

exports.getAll=async(req,res,next)=>{
    try{
      let promotions=await Promotion.find()
      if(promotions) return res.status(200).send(promotions)
      return res.status(404).send({error:"promotions not found"})
    }
    catch(ex)
    {
     next(ex)
    }
}
exports.newPromotion=async(req,res,next)=>{
    try{
      let promotion=await Promotion.findOne({
          name:req.body.name,
          date_begin:req.body.date_begin,
          date_end:req.body.date_end
      })
      if(promotion) return res.status(400).send({error:"promotion already exist"})
     
      promotion=new Promotion({
        name:req.body.name,
        date_begin:req.body.date_begin,
        date_end:req.body.date_end,
        services:req.body.services
      })
      
      console.log(req.body.services);
      if (req.files && req.files.image) {
        req.files.image.name=`image.${req.files.image.mimetype.split('/')[1]}`
        const new_image=await uploadImage(`public/images/promotion`,`${req.body.name}`,req.files.image, "image")
        if(new_image!=="error") promotion.image = new_image 
      }

      const newPromotion=await promotion.save()
      if(newPromotion) return res.status(201).send({message:"promotion created",data:promotion})

      return res.status(400).send({error:"faield create new promotion"})
    }
    catch(ex)
    {
      next(ex)
    }
}

exports.removePormotion=async(req,res,next)=>{
    try{
       let promostion=await Promotion.findByIdAndUpdate(req.params.id,{isAvaible:false})
       if(promostion) return res.status(200).send({message:"promotion removed"})
    }
    catch(ex)
    {
      next(ex)
    }
}

