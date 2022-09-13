module.exports = function (req, res, next) {
    if (req.user.type !== "receptionniste") 
      return res.status(403).send({error:"access denied"});
    next();
  };