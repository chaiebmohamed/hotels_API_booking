const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload')
const cors = require("cors");
const path = require('path');
dotenv.config();


mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,useUnifiedTopology: true}, () =>console.log('connected to DB'));

app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/clients', express.static(path.join(__dirname, 'public/clients')));
app.use('/promotions', express.static(path.join(__dirname, 'public/promotions')));
app.use('/services', express.static(path.join(__dirname, 'public/images/services')));

// API routes
app.use('/user',require("./routes/user"));
app.use('/service',require("./routes/service"));
app.use('/room',require("./routes/room"));
app.use('/booking',require("./routes/booking"));
app.use('/promotion',require("./routes/promotion"));
app.use('/reclamation',require("./routes/reclamation"));

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));


module.exports=app;