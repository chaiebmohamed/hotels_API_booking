const Booking=require("../models/booking")
const Room=require("../models/room")
const Service=require("../models/service")
const Promotion=require("../models/promotion")
const generateCode=require("../helpers/generator")
const User=require("../models/user")
const transporter=require("../controllers/mailer")
const {uploadImage}=require("../helpers/manage-file")
const mongoose = require("mongoose")
const { ObjectId } = require('mongodb');
const number = require("@hapi/joi/lib/types/number")
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const sendemail = require("../helpers/send-mail")
var bcrypt = require('bcryptjs');




exports.getAll=async(req,res,next)=>{
    try
    {
       var bookings=await Booking.find().populate({
        select:'services promotions promotions room receptioniste'
       });
          /*.populate("services")
          .populate("promotions")
          .populate("client")
          .populate("room")
          .populate("receptioniste")
          */
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
     console.log(generated_password);
     
     var client=await User.findByIdAndUpdate(booking.client._id,{password:generated_password})
   
     
     // send mail to client
     
     sendemail(client.email,"Account activation", `this is your password ${generated_password}`);
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
           room:mongoose.Types.ObjectId(req.body.room),
           client : mongoose.Types.ObjectId(user._id)
       })
       var room=await Room.findById(req.body.room)
       //!
       if(!room) return res.status(404).send({error:"room not found"})

       const days = (date_1, date_2) =>{
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

       var Period_days = days(newBooking.date_end,newBooking.date_begin)  
       var Price_room_days=Period_days*room.price
       console.log(Period_days)
       let totalPrice=Price_room_days;

       //if the client selected services

       
       if(req.body.service && req.body.services.length!=0 )
       {
        var services=await Service.find({ _id: { $in: req.body.services }})
        services.map(service => totalPrice=+service.price)
       }

       //if the client selected promotions
       if(req.body.promotions &&req.body.promotions.length!=0)
       {
        var promotions=await Promotion.find({ _id: { $in: req.body.promotions }})
        promotions.map(promotion => totalPrice=+promotion.price) 
       }
       console.log(totalPrice)
       newBooking.total_price= parseInt (totalPrice)
       const randomCode =generateCode(8) 
       console.log(randomCode)
       newBooking.code=randomCode;



       const savedBooking=await newBooking.save()
       if(!savedBooking) return res.status(400).send({error:"failed booking"})

    sendemail(user.email,'ahla bik ya mama',`ya welcome ya welcome w haw el code mte3ek ${randomCode}`)

    //    var transporter = nodemailer.createTransport(
    //     {
    //         service: 'gmail',
    //         auth:{
    //             user: process.env.EMAIL,
    //             pass: process.env.PASSWORD
    //         }
    //     }
    // );

    // let mailOptions = {
    //     from : process.env.EMAIL,
    //     to : user.email,
    //     subject  : 'ahla bik ya mama',
    //     text : 'ya welcome ya welcome'
    // }

    // transporter.sendMail(mailOptions , function(err , data){
    //     if (err){
    //         console.log('Error Occurs' ,err)
    //     }
    //     else {
    //         console.log('Email sent !')
    //     }
    // });

    


    return res.status(201).send({message:"booking success",data:savedBooking})
    
    }
    
    catch(ex)
    {
        next(ex)
    }
}