var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const {sendemail} = require("../helpers/send-mail")
module.exports =  function sendmail (email,subject,text){
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }
    );

    let mailOptions = {
        from : process.env.EMAIL,
        to : email,
        subject  : subject,
        text : text
    }

    transporter.sendMail(mailOptions , function(err , data){
        if (err){
            console.log('Error Occurs' ,err)
        }
        else {
            console.log('Email sent !S')
        }
    });

    


}