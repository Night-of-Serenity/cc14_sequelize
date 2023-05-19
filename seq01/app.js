require("dotenv").config();
const { User, Todo, sequelize } = require("./models");

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     return User.bulkCreate([
//       { name: "Andy", password: "1234" },
//       { name: "Bobby", password: "1234" },
//       { name: "Candy", password: "1234" },
//       { name: "Danny", password: "1234" },
//       { name: "Eddy", password: "1234" },
//     ]);
//   })
//   .then(() => {
//     return Todo.bulkCreate([
//       { title: "Learn HTML", dueDate: "2023-05-19", userId: 1 },
//       { title: "Learn CSS", dueDate: new Date("2023-05-21"), userId: 1 },
//       { title: "Learn Javascript", dueDate: new Date("2023-05-25"), userId: 2 },
//       { title: "Practice Git", dueDate: new Date("2023-05-30"), userId: 3 },
//       {
//         title: "Read mySQL Manual",
//         dueDate: new Date("2023-06-02"),
//         userId: 3,
//       },
//       { title: "Review Docker", dueDate: "2023-06-10", userId: 4 },
//     ]);
//   })
//   .catch((err) => console.log(err.message));

// User.hasMany(Todo, {
//   foreignKey: "userId",
// });

// Todo.belongsTo(User, {
//   foreignKey: "userId",
// });

// sequelize.sync({ force: true });

// -------------------------------------------------------
// User.findAll({
//   where: { name: "Andy" },
//   include: Todo,
// }).then((rs) => {
//   //   console.log(JSON.stringify(rs, null, 2));
//   console.log(JSON.parse(JSON.stringify(rs)));
// });

// Todo.findAll({
//   where: { id: 3 },
//   include: User,
// }).then((rs) => {
//   //   console.log(JSON.stringify(rs, null, 2));
//   console.log(JSON.parse(JSON.stringify(rs)));
// });

// User.findAll({
//   where: { id: 3 },
//   attributes: ["id", "name"],
//   include: {
//     model: Todo,
//     attributes: ["title", "status"],
//   },
// }).then((rs) => {
//   //   console.log(JSON.stringify(rs, null, 2));
//   //   console.log(rs);
//   //   console.log(rs[0].Todos[0].dataValues.title);
//   //   console.log(rs[0].Todos[0].title);
//   //   console.log(typeof rs[0].Todos);
//   //   let output = rs[0].Todos.map((item) => item.title);
//   //   console.log(output);
// });

// Todo.findByPk(2).then((rs) => {
//   console.log(JSON.stringify(rs, null, 2));
//   //   console.log(rs.getDataValue("name"));
//   //   console.log(rs.get("name"));
// });
