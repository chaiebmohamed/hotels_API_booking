const Reclamation=require("../models/reclamation")


exports.newReclamation=async(req,res,next)=>{
    try{
        var reaclamation=new Reclamation({
            description:req.body.description,
            client:req.user._id
        })
        const savedReclamation=await reaclamation.save()
        if(savedReclamation) return res.status(201).send({data:reaclamation,message:"success create"})
        return res.status(400).send({error:"failed create reaclamation"})
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.fixReclamation=async(req,res,next)=>{
    try
    {
      
    }
    catch(ex)
    {
        next(ex)
    }
}