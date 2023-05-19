const { Todo, User, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getAllTodos = (req, res, next) => {
  Todo.findAll()
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

// ต้องการเฉพาะ title, due_date, status
exports.getTodoById = (req, res, next) => {
  const { id } = req.params;
  Todo.findAll({
    // attributes: ["title", "dueDate", "status"],
    where: { id: id },
  })
    .then((rs) => res.json(rs))
    .catch(next);
};

exports.createTodo = (req, res, next) => {
  //   console.log(req.body);
  Todo.create(req.body)
    .then((rs) => {
      console.log(rs);
      res.status(201).json(rs);
    })
    .catch(next);
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.destroy({
    where: { id },
  })
    .then((rs) => {
      console.log(rs);
      if (rs >= 1) res.status(204).send();
      else {
        let c_err = new Error(`cannot delete id : ${id}`);
        c_err.statusCode = 404;
        throw c_err;
      }
    })
    .catch(next);
};

exports.updateTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.update(req.body, {
    where: { id },
  })
    .then((rs) => {
      console.log(rs[0]);
      if (rs[0] >= 1) res.status(204).send();
      else {
        let c_err = new Error(`cannot delete id : ${id}`);
        c_err.statusCode = 404;
        throw c_err;
      }
    })
    .catch(next);
};

// /user?name=Andy
exports.getTodoByUser = (req, res, next) => {
  const { name } = req.query;
  // console.log(name);
  Todo.findAll({
    include: {
      model: User,
      attributes: { exclude: "password" },
      where: {
        name: name,
      },
    },
  })
    .then((rs) => {
      console.log(JSON.parse(JSON.stringify(rs)));
      res.json(rs);
    })
    .catch(next);
};

exports.sumTodos = (req, res, next) => {
  Todo.findAll({
    attributes: [[sequelize.fn("COUNT", sequelize.col("user_id")), "task"]],
    include: {
      model: User,
      attributes: ["name"],
    },
    group: "user_id",
  })
    .then((rs) => {
      let result = JSON.parse(JSON.stringify(rs)).map((item) => {
        return {
          name: item.User.name,
          task: item.task,
        };
      });
      console.log(result);
      res.json(result);
    })
    .catch(next);
};

// exports.sumTodos = (req, res, next) => {
//   User.findAll({
//     attributes: ["name", [sequelize.fn("COUNT", sequelize.col("name")), "task"]],
//     include: {
//       model: Todo,
//       where: {
//         id: {
//           [Op.ne]: null,
//         },
//       },
//       group: "user_id",
//     },
//   })
//     .then((rs) => res.json(rs))
//     .catch(next);
// };
