require("dotenv").config();
const { Op } = require("sequelize");
const { User, Todo, sequelize } = require("./models/index");

// sequelize.sync({ force: true });

// CRUD
// Create
// User.create({ name: "Joe", password: "1234" }).then((rs) => {
//   console.log(JSON.stringify(rs, null, 2));
// });

// Delete
// User.destroy({
//   where: { name: "Andy" },
// }).then((rs) => {
//   console.log(JSON.stringify(rs, null, 4));
// });

// Bulk Create
// const mockUser = [
//   { name: "Anderson", password: "1234" },
//   { name: "John", password: "1234" },
//   { name: "Candy", password: "1234" },
//   { name: "Danny", password: "1234" },
//   { name: "Eddy", password: "1234" },
// ];

// const mockUser = [
//   { name: "Andy", password: "1234" },
//   { name: "Andy", password: "1234" },
//   { name: "Andy", password: "1234" },
//   { name: "Andy", password: "1234" },
//   { name: "Andy", password: "1234" },
// ];

// sequelize.sync({ force: true });
// User.bulkCreate(mockUser).then((rs) => {
//   console.log(JSON.stringify(rs));
// });

// Update
// User.update(
//   { password: "35261" },
//   {
//     where: {
//       id: 4,
//     },
//   }
// ).then((rs) => {
//   console.log(JSON.stringify(rs, null, 2));
// });

// Select / find
// User.findOne({
//   where: {
//     name: "Andy",
//   },
// }).then((rs) => console.log(rs.toJSON()));

// Attribute
// User.findAll({
//   attributes: [["name", "username"], "password", "createdAt"],
//   where: {
//     name: "Andy",
//   },
// }).then((rs) => {
//   console.log(rs);
//     console.log(JSON.stringify(rs, null, 2));
//     console.log(JSON.parse(JSON.stringify(rs, null, 2)));
//     console.log(rs[0].get("username"));
//     console.log(rs[0].dataValues.username);
// });

// exclude attricute
// User.findAll({
//   attributes: { exclude: "password" },
// }).then((rs) => console.log(JSON.stringify(rs, null, 2)));

// Aggregate function
// const { fn, col } = sequelize;
// User.findAll({
//   attributes: [[fn("COUNT", col("id")), "countAll"]],
//   where: { name: "Andy" },
// }).then((rs) => console.log(JSON.stringify(rs, null, 2)));

// use Op => Operator
// User.findAll({
//   where: {
//     name: {
//       [Op.like]: "A%",
//     },
//   },
// }).then((rs) => console.log(JSON.stringify(rs, null, 2)));

// User.findAll({
//   where: {
//     [Op.or]: [{ id: 5 }, { name: "Andy" }],
//   },
// }).then((rs) => console.log(JSON.stringify(rs, null, 4)));

// User.create({
//   name: "Gary132423",
//   password: "32451",
// })
//   .then((rs) => console.log(JSON.stringify(rs, null, 2)))
//   .catch((err) => console.log(err.message));
