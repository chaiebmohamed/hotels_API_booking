const Service=require("../models/service")


exports.getAll=async(req,res,next)=>{
    try{
       let services=await Service.find({isAvaible:true})
       if(services) return res.status(200).send({data:services})
       return res.status(404).send({message:"services not found"})
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.addService=async(req,res,next)=>{

    try{
      let service=await Service.findOne({
          name:req.body.name,
          type:req.body.type
      })
      if(service) return res.status(400).send({error:"service already exist"})

      service=new Service({
        name:req.body.name,
        description:req.body.description,
        type:req.body.type,
        price:req.body.price,
        capacity:req.body.capacity,
        avaible_places:req.body.avaible_places,
      })

      if (req.files && req.files.image) {
        req.files.image.name=`image.${req.files.image.mimetype.split('/')[1]}`
        const new_image=await uploadImage(`public/images/${req.body.type}`,`${req.body.name}${req.body.type}`,req.files.image, "image")
        if(new_image!=="error") service.image = new_image 
      }

      const savedService = await service.save();
      if( savedService) return res.status(201).send({data:service,message:"service created"});
      return res.status(400).send({error:"failed create service"})

    }
    catch(ex)
    {
       next(ex)
    }
}

exports.removeService=async(req,res,next)=>{
    try{
      let service=await Service.findByIdAndUpdate(req.params.id,{isAvaible:false})
      if(service) return res.status(200).send({message:"service removed"})
      return res.status(404).send({error:"service not found"})
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.newComment=async(req,res,next)=>{
   try{
      let newComment={
        client:req.user._id,
        comment:req.body.comment,
        mark:req.body.mark
      }
      var service=await Service.findByIdAndUpdate(req.params.id,{$push: {comment:newComment }},{new:true})
      var somme=0;
      for(let i=0;i<service.comments.length;i++)
      {
        somme=+service.comments[i].mark
      }
      service.rating=somme/service.comments.length;
      await service.save()
      if(service) return res.status(200).send({message:"success add new comment"})
      return res.status(400).send({error:"failed to add new comment"})
   }
   catch(ex)
   {
     next(ex)
   }
}