const { Todo, User, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getAllTodos = (req, res, next) => {
  // console.log(req.user);

  Todo.findAll({
    where: { user_id: req.user.id },
  })
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

// exports.sumTodos = (req, res, next) => {
//   Todo.findAll({
//     attributes: [[sequelize.fn("COUNT", sequelize.col("user_id")), "task"]],
//     include: {
//       model: User,
//       attributes: ["name"],
//     },
//     group: "user_id",
//   })
//     .then((rs) => {
//       let result = JSON.parse(JSON.stringify(rs)).map((item) => {
//         return {
//           name: item.User.name,
//           task: item.task,
//         };
//       });
//       console.log(result);
//       res.json(result);
//     })
//     .catch(next);
// };

// exports.sumTodos = (req, res, next) => {
//   User.findAll({
//     attributes: ["name"],
//     include: {
//       model: Todo,
//       attributes: [[sequelize.fn("COUNT", sequelize.col("title")), "task"]],
//       // where: {
//       //   id: {
//       //     [Op.ne]: null,
//       //   },
//       // },
//       group: "user_id",
//     },
//   })
//     .then((rs) => res.json(rs))
//     .catch(next);
// };

exports.sumTodos = (req, res, next) => {
  User.findAll({
    attributes: ["name"],
    include: {
      model: Todo,
      attributes: [[sequelize.fn("count", sequelize.col("user_id")), "tasks"]],
    },
    group: "name",
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.doubleDelete = async (req, res, next) => {
  const { id1, id2 } = req.params;
  console.log(id1, id2);
  let t = await sequelize.transaction();

  try {
    let rs1 = await Todo.destroy({ where: { id: id1 }, transaction: t });
    if (rs1 === 0) throw new Error("Cannot delete");
    let rs2 = await Todo.destroy({ where: { id: id2 }, transaction: t });
    if (rs2 === 0) throw new Error("Cannot delete");
    await t.commit();

    res.json({ msg: `delete id: ${id1}, ${id2}` });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
