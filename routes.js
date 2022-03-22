const adminRoute = require("./routes/admin");
const travailleurRoute = require('./routes/travailleurs')

module.exports = function (app, express) {
    app.use('/admin',adminRoute);
    app.use('/travailleur',travailleurRoute);

}