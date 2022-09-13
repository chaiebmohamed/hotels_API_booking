const Booking=require("../models/booking")
const Room=require("../models/room")
const Service=require("../models/service")
const Promotion=require("../models/promotion")
const generateCode=require("../helpers/generator")
const User=require("../models/user")
const transporter=require("../controllers/mailer")

exports.getAll=async(req,res,next)=>{
    try
    {
       var bookings=await Booking.find()
          .populate("services")
          .populate("promotions")
          .populate("client")
          .populate("room")
          .populate("receptioniste")
        if(bookings) return res.status(200).send({data:bookings,message:"success fetching bookings"})
        return res.status(400).send({error:"failed fetching bookings"})
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.validateCheckIn=async(req,res,next)=>{
    try
    {
      var booking=await Booking.findByIdAndUpdate(req.params.id,
        {
            receptionste:req.user._id,
            valid:true
        },{new:true}).populate("client")

     let generated_password=generateCode(12)
     const salt = await bcrypt.genSalt(10);
     let crypted_password = await bcrypt.hash(generated_password, salt);
     var client=await User.findByIdAndUpdate(booking.client._id,{password:crypted_password})

     
     // send mail to client
     const subject = "Activate Account";
     var mail = {
        from: "@adresse-sender",
        to: client.email,
        subject: subject,
        html: `<h1>subject :${subject}</h1><p>Your password: ${generated_password}</p>`,
     };
    transporter.sendMail(mail, (err, data) => {
     if (err) {
         return res.status(500).json({ status: "fail sent" });
        } else {
        return res.status(200).json({ status: "success sent" });
      }
    });
       return res.status(200).send({message:"success activate account client"})
    }
    catch(ex)
    {
        next(ex)
    }
}

exports.newCheckIn=async(req,res,next)=>{
    try
    {

        const userExist = await User.findOne({
            email: req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone:req.body.phone
       });
       if (userExist) return res.status(400).send({error:'user already exist'});
   
       let Matricule="CLI"+Math.floor((Math.random()*1000000)+1);
        
       
       const user = new User({
           matricule: Matricule,
           lastname: req.body.lastname,
           firstname:req.body.firstname,
           adress: req.body.adress,
           email: req.body.email,
           country:req.body.country,
           date_birth:req.body.date_birth,
           place_birth:req.body.place_birth,
           phone:req.body.phone,
           isAdmin: false,
           type: "client",    
       })


   
       if (req.files && req.files.avatar) {
           req.files.avatar.name=`avatar.${req.files.avatar.mimetype.split('/')[1]}`
           const new_image=await uploadImage(`public/images/clients`,`${req.body.firstname}${req.body.lastname}`,req.files.avatar, "image")
           if(new_image!=="error") user.avatar = new_image
           
       }
     
       
   
       const saveduser = await user.save();
       if(!saveduser) return res.status(400).send({error:"failed create client"})
      
       var newBooking=new Booking({
           date_begin:req.body.date_begin,
           date_end:req.body.date_end,
           services:req.body.services,
           promotions:req.body.promotions,
           room:req.body.room
       })
       var room=await Room.findById(req.body.room)
       //!
       if(!room) return res.status(404).send({error:"room not found"})

       var Period_days = date_end.getTime() - date_begin.getTime() / (1000 * 3600 * 24); 
       var Price_room_days=Period_days*room.price
       
       let totalPrice=Price_room_days;

       //if the client selected services
       if(req.body.services.length!=0)
       {
        var services=await Service.find({ _id: { $in: req.body.services }})
        services.map(service => totalPrice=+service.price)
       }

       //if the client selected promotions
       if(req.body.promotions.length!=0)
       {
        var promotions=await Promotion.find({ _id: { $in: req.body.promotions }})
        promotions.map(promotion => totalPrice=+promotion.price) 
       }

       newBooking.total_price=totalPrice
       const randomCode =generateCode(8) 
       newBooking.code=randomCode;



       const savedBooking=await newBooking.save()
       if(!savedBooking) return res.status(400).send({error:"failed booking"})

       
       const subject = "checking code";
       var mail = {
        from: "mouradi@gmail.com",
        to: user.email,
        subject: subject,
        html: `<h1>subject :${subject}</h1><p>Your code is : ${randomCode}</p>`,
                  };

       
     transporter.sendMail(mail, (err, data) => {
     if (err) {
         return res.status(500).json({ status: "fail sent" });
              } 
        else 
        {
        return res.status(200).json({ status: "success sent" });
        }
    });
    
    return res.status(201).send({message:"booking success",data:savedBooking})
    
    }
    
    catch(ex)
    {
        next(ex)
    }
}