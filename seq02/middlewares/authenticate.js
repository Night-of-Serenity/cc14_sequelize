const jwt = require("jsonwebtoken");
const { User } = require("../models/");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization.split(" ")[1]);

  if (!authorization || !authorization.startsWith("Bearer"))
    return res.status(401).json({ msg: "Unauthorized" });

  const token = authorization.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
  console.log(payload);

  User.findOne({
    where: {
      id: payload.id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.statuss(401).json({ msg: "Unauthorized" });
      }
      req.user = user;
      // console.log(req.user);
      next();
    })
    .catch(next);
};
