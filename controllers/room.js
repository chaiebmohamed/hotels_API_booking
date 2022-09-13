const Room = require('../models/room');
const {uploadImage}=require("../helpers/manage-file")
exports.getAll=async(req,res,next)=>{
    try{
       let rooms=await Room.find()
       if(rooms) return res.status(200).send(rooms)
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.getEmpltyRooms=async(req,res,next)=>{
    try
    {
      let rooms=await Room.find({isAvailable:true});
      if(rooms) return res.status(200).send(rooms)
      return res.status(400).send({error:"empty rooms not found"}) 
    }
    catch(ex)
    {
      next(ex)
    }
}

exports.addRoom = async (req, res,next) => {

    try 
    {
        let room=await Room.findOne({
           numero:req.body.block+"-"+req.body.numero,
           type:req.body.type,
           block:req.body.block
        })
        if(room) return res.status(400).send({error:"room already exist"})

        var numero=req.body.block+"-"+req.body.numero

        room = new Room({
            numero: numero,
            price: req.body.price,
            type: req.body.type,
            block:req.body.block,
            description:req.body.description
        })
        var images=[];
        if (req.files && req.files.images)
        {
            
            for(var i=0;i<req.files.images.length;i++){
                
                req.files.images[i].name=`image.${req.files.images[i].mimetype.split('/')[1]}`
                let new_image=await uploadImage(`public/rooms/${numero}`,`${numero+"-"+i}`,req.files.images[i], "image")
                
                if(new_image!=="error") images.push(new_image)
                console.log()
            }
        }
        room.images=images;
        const savedRoom = await room.save();
        return res.status(201).send(savedRoom);
    }
    catch (ex) {
        next(ex)
    }

}

exports.changeStatusToNotAvailble = async (req, res,next) => {
    try {
        const room = await Room.findOneAndUpdate({ _id: req.params.id, isAvailable: true }, { isAvailable: false })
        if(room) return res.status(200).send({message:"room closed"});
        return res.status(400).send({error:"room not found"})
    }
    catch (ex) 
    {
        next(ex)
    }
}

exports.changeStatusToAvailble = async (req, res,next) => {
    try {
        const room = await Room.findOneAndUpdate({ _id: req.params.id, isAvailable: false }, { isAvailable: true })
        if(room) return res.status(200).send({message:"room opened"});
        return res.status(400).send({error:"room not found"})
    } 
    catch (ex) {
        next(ex)
    }
}

exports.changePriceByType=async(req,res,next)=>{
    try
    {
       let rooms=await Room.updateMany({type:req.body.type},{price:req.body.price})
       if(rooms) return res.status(200).send({message:"success update price"}) 
       return res.status(400).send({error:"failed update"})
    }
    catch(ex)
    {
      next(ex)
    }
}

exports.changePrice=async(req,res,next)=>{
    try{
        let room=await Room.findOneAndUpdate({_id:req.params.id},{price:req.body.price})
        if(room) return res.status(200).send({message:"success update price"})
        return res.status(400).send({error:"failed update price"})
    }
    catch(ex)
    {
        next(ex)
    }
}