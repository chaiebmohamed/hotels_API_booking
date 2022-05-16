const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
  const token = req.header("authorization");
  if (!token) return res.status(401).send({error:"Access Denied No token provied "});
  try {
    const decoded = jwt.verify(token,process.env.JWT_PRIVATE);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({error:"invalid token"});
  }
};
