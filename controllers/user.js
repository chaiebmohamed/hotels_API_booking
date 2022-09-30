const User = require('../models/user');
const bcrypt = require("bcrypt");
const { uploadImage } = require("../helpers/manage-file")
const sendemail = require("../helpers/send-mail")

exports.getUser = async (req, res, next) => {



  try {
    let user = await User.findOne({ _id: req.params.id, status: true }).select("-password");
    if (!user) return res.status(400).send({ error: "user not found" })
    return res.status(200).send(user);
  }
  catch (ex) {
    next(ex)
  }
}


exports.getAlluser = async (req, res, next) => {

  try {

    let users = await User.find({ status: true }).select("-password");
    if (!users) return res.status(400).send({ error: "users not found" })
    if (users.length == 0) return res.status(200).send({ message: "no user found" })
    return res.status(200).send(users);
  }
  catch (ex) {
    console.log("zebiii");
    next(ex)
  }
}

// add user(client,travailleur,recepsioniste) by admin
exports.addUser = async (req, res, next) => {


  const userExist = await User.findOne({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone
  });
  if (userExist) return res.status(400).send({ error: 'user already exist' });



  var Matricule = ""
  switch (req.body.type) {
    case "client":
      Matricule = "CLI" + Math.floor((Math.random() * 1000000) + 1);
      break;
    case "travailleur":
      Matricule = "TRA" + Math.floor((Math.random() * 1000000) + 1);
      break;
    case "receptionniste":
      Matricule = "REC" + Math.floor((Math.random() * 1000000) + 1);
      break;
    default:
      Matricule = ""
  }
  try {


    const user = new User({
      matricule: Matricule,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      adress: req.body.adress,
      email: req.body.email,
      country: req.body.country,

      date_birth: req.body.date_birth,
      place_birth: req.body.place_birth,
      salary: req.body.salary,
      phone: req.body.phone,
      password: req.body.password,
      isAdmin: false,
      type: req.body.type,
    })

    if (req.files && req.files.avatar) {
      req.files.avatar.name = `avatar.${req.files.avatar.mimetype.split('/')[1]}`
      const new_image = await uploadImage(`public/images/${req.body.type}`, `${req.body.firstname}${req.body.lastname}`, req.files.avatar, "image")
      if (new_image !== "error") user.avatar = new_image

    }

    const salt = await bcrypt.genSalt(10);
    pwd = user.password
    user.password = await bcrypt.hash(user.password, salt);

    const saveduser = await user.save();
    if (saveduser) {
      sendemail(user.email, "your login ", `your email is : ${user.email} and your password is : ${pwd}`);

      return res.status(201).send({ data: user, message: "user created" });
    }
    return res.status(400).send({ error: "failed create user" })
  }
  catch (ex) {
    next(ex)
  }
}

exports.addAdmin = async (req, res, next) => {

  let Matricule = "ADMIN" + Math.floor((Math.random() * 1000000) + 1);

  try {
    const userExist = await User.findOne({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    });
    if (userExist) return res.status(400).send({ error: 'Admin already exist' });


    const user = new User({
      matricule: Matricule,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      adress: req.body.adress,
      email: req.body.email,
      country: req.body.country,

      date_birth: req.body.date_birth,
      place_birth: req.body.place_birth,
      salary: req.body.salary,
      phone: req.body.phone,
      isAdmin: true,
      type: "admin",
      password: req.body.password
    })

    console.log(user);

    if (req.files && req.files.avatar) {
      req.files.avatar.name = `avatar.${req.files.avatar.mimetype.split('/')[1]}`
      const new_image = await uploadImage(`public/users/${req.body.type}`, `${req.body.firstname}${req.body.lastname}`, req.files.avatar, "image")
      if (new_image !== "error") user.avatar = new_image

    }


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const saveduser = await user.save();
    if (saveduser) {
      sendemail(user.email, "your login ", `your email is : ${user.email} and your password is : ${pwd}`);
      return res.status(201).send({ data: user, message: "user created" });
    }
    return res.status(400).send({ error: "failed create user" })
  }
  catch (ex) {
    next(ex)
  }

}

exports.singInClient = async (req, res, next) => {
  try {

    var user = await User.findOne({ email: req.body.email, status: true });
    if (!user) return res.status(404).send({ error: 'invalid email' });

    const validpassword = req.body.password == user.password
    if (!validpassword) return res.status(401).send({ error: 'Invalid Password' })

    const token = user.generateAuth();
    return res.header("auth-token", token).status(200).send({ message: "login successful", data: user })
  }
  catch (ex) {
    next(ex)
  }
}

exports.singIn = async (req, res, next) => {
  try {

    var user = await User.findOne({ email: req.body.email, status: true });
    if (!user) return res.status(404).send({ error: 'invalid email' });

    const validpassword = await bcrypt.compare(req.body.password, user.password)
    if (!validpassword) return res.status(401).send({ error: 'Invalid Password' })

    const token = user.generateAuth();
    return res.header("auth-token", token).status(200).send({ message: "login successful", data: user })
  }
  catch (ex) {
    next(ex)
  }
}

exports.removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: false })
    if (!user) return res.status(404).send({ error: "user not found" })
    return res.status(200).send({ message: "user removed" })
  }
  catch (ex) {
    next(ex)
  }
}

exports.updateProfil = async (req, res, next) => {
  try {
    let currentUser = await User.findById(req.user._id)
    console.log(req.user._id);
    var avatar;
    if (req.files && req.files.avatar) {
      req.files.avatar.name = `avatar.${req.files.avatar.mimetype.split('/')[1]}`
      const new_image = await uploadImage(`public/users/${currentUser.type}`, `${req.body.firstname}${req.body.lastname}`, req.files.avatar, "image")
      if (new_image !== "error") avatar = new_image
    }

    let updateInfos = {
      firstname: req.body.firstname || currentUser.firstname,
      lastname: req.body.lastname || currentUser.lastname,
      adress: req.body.adress || currentUser.adress,
      country: req.body.country || currentUser.country,
      profession: req.body.profession || currentUser.profession,
      phone: req.body.phone || currentUser.phone,
      salary: req.body.salary || currentUser.salary,
      email: req.body.email || currentUser.email,
      avatar: avatar || currentUser.avatar
    }
    currentUser = await User.findByIdAndUpdate(req.user._id, updateInfos)

    if (currentUser) return res.status(200).send({ message: "success updating profil" })

    return res.status(400).send({ error: "failed update profil" })
  }
  catch (ex) {
    next(ex)
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    //req.body.oldpassword
    //req.body.newpassword
    //req.body.renewpassowrd

    if (req.body.newpassword !== req.body.renewpassword)
      return res.status(400).send({ error: "failed to confirm new password" })
    if (req.body.newpassword == req.body.oldpassword)
      return res.status(400).send({ error: "new password must be different to the old one" })
    let currentUser = await User.findById(req.user._id)
    const validpassword = await bcrypt.compare(req.body.oldpassword, currentUser.password)
    if (!validpassword) return res.status(401).send({ error: 'Invalid Password.' });

    const salt = await bcrypt.genSalt(10);
    let newpassword = await bcrypt.hash(req.body.newpassword, salt)

    currentUser.password = newpassword;
    let updatedUser = await currentUser.save()

    if (updatedUser) return res.status(200).send({ data: updatedUser })
    return res.status(400).send({ error: "failed updating user" })

  }
  catch (ex) {
    next(ex)
  }
}


