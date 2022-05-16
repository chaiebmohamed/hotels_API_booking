const User = require('../models/user');

exports.getAlluser = async (req, res) => {
    try 
    {
        let users = await User.find().select("-password");
        if(!users) return res.status(400).send({error:"users not found"})
        if(users.length==0) return res.status(200).send({message:"no user found"})
        return res.status(200).send(users);
    }
    catch (error) {
        return res.status(400).send({error:error.message});
    }
}


exports.registeruser = async (req, res) => {
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
        firstname:req.body.firstname,
        adress: req.body.adress,
        email: req.body.email,
        country:req.body.country,
        profession:req.body.profession,
        date_birth:req.body.date_birth,
        place_birth:req.body.place_birth,
        salary:req.body.salary,
        phone:req.body.phone,
        password: req.body.password,
        isAdmin: false,
        type: req.body.type
    })
    try {
        const saveduser = await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.manipuleRole = async (req, res) => {

    try {
        console.log(req.body);

        const user = await User.findOneAndUpdate({ matricule: req.body.matricule }, { type: req.body.type });
        if (req.body.type == "admin") {
            user.isAdmin = true;
            await user.save();
        }

        if (req.body.type != "admin") {
            user.isAdmin = false;
            await user.save();
        }


        return res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);

    }

}



