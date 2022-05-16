const userRoute = require("./routes/user");
const serviceRoute = require("./routes/service");
const roomRoute = require("./routes/room");


module.exports = function (app, express) {
    
    app.use('/user',userRoute);
    app.use('/service',serviceRoute);
    app.use('/room',roomRoute);
  
}