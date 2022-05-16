const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,useUnifiedTopology: true}, () =>console.log('connected to DB'));

app.use(express.json());
require("./routes")(app,express);
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));




app.listen(process.env.PORT, () => console.log('serveur Up and running '+process.env.PORT));