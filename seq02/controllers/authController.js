const { User } = require("../models/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) throw new Error("must have username and password");

  //Validation
  if (password.length < 4 || password.length > 10)
    throw new Error("password must has length 4 to 10 characters");
  bcrypt.hash(password, 10).then((hashed) => {
    return User.create({
      name: username,
      password: hashed,
    })
      .then((rs) => {
        res.status(201).json({ msg: `user: ${username} was created` });
      })
      .catch(next);
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  //   User.findOne({
  //     where: { name: username },
  //   })
  //     .then((user) => {
  //       if (!user) throw new Error("Cannot Login");
  //       return bcrypt.compare(password, user.password).then((rs) => {
  //         return { pwOk: rs, user: user };
  //       });
  //     })
  //     .then((rs) => {
  //       if (!rs.pwOk) throw new Error("Cannot login 2");
  //       res.json(rs);
  //     })
  //     .catch(next);

  User.findOne({
    where: { name: username },
  })
    .then((user) => {
      if (!user) throw new Error("Cannot Login");
      return Promise.all([bcrypt.compare(password, user.password), Promise.resolve(user)]);
    })
    .then(([pwOK, user]) => {
      if (!pwOK) throw new Error("cannot login 2");
      const payload = {
        id: user.id,
        name: user.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: "30d" });
      res.json({ token: token });
    })
    .catch(next);
};
