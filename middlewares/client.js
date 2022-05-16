module.exports = function (req, res, next) {
    if (req.user.type !== "client") 
      return res.status(403).send({error:"access denied"});
    next();
  };