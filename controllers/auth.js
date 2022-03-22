const Admin = require('../models/administrateur');
const travailleurs = require('../models/travailleurs');
//const { registerValidation } = require('../validation');

exports.registeradmin = async (req, res) => {
    //validate the data 
    //const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.message);

    //checking if the admin exists in DB

    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash the passwords


    admin = new Admin({
        matricule: req.body.matricule,
        name: req.body.name,
        lastname: req.body.lastname,
        adress: req.body.adress,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        type: req.body.type
    })
    try {
        const savedadmin = await admin.save();
        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.register = async (req, res) => {
    //validate the data 
    //const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.message);

    //checking if the admin exists in DB

    const emailExist = await travailleurs.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash the passwords


    travailleur = new travailleurs({
        matricule: req.body.matricule,
        name: req.body.name,
        lastname: req.body.lastname,
        adress: req.body.adress,
        email: req.body.email,
        password: req.body.password,
        //type: req.body.type
    })
    try {
        const savedtravailleur = await travailleur.save();
        res.send(travailleur);
    } catch (error) {
        res.status(400).send(error);
    }
}