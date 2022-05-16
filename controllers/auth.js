
const User = require('../models/user');

//const { registerValidation } = require('../validation');


exports.RegisterAdmin = async (req,res)=>{
//validate the data 
    //const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.message);

    //checking if the admin exists in DB

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash the passwords


    const user = new User({
        matricule: req.body.matricule,
        name: req.body.name,
        lastname: req.body.lastname,
        adress: req.body.adress,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
        
    })
    try {
        const saveduser = await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

