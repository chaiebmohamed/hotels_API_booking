const userRoute = require("./routes/user");


module.exports = function (app, express) {
    app.use('/user',userRoute);


}