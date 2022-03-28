const User = require('../models/user');
const req = require('express/lib/request');

exports.getalluser = async (req, res) => {


    try {
        let users = await User.find().select("name  -_id");
        users = users.map(element => element.name);

        return res.status(200).send(users);
    }

    catch (error) {
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



