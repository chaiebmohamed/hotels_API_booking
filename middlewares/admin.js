module.exports = function (req, res, next) {
    
    if (req.user.isAdmin === false && req.user.type === "admin")
      return res.status(403).send("access denied");
    next();
  };
  