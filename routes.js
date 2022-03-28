const userRoute = require("./routes/user");
const spaRoute = require("./routes/spa");
const roomRoute = require("./routes/chambre");
const sportRoute = require ("./routes/salledesport");

module.exports = function (app, express) {
    app.use('/user',userRoute);
    app.use('/spa',spaRoute);
    app.use('/room',roomRoute);
    app.use('/sport',sportRoute);

}