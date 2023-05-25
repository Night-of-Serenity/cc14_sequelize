const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.get("/", todoController.getAllTodos);
router.get("/user", todoController.getTodoByUser);
router.get("/summary", todoController.sumTodos);
router.delete("/doubleDelete/:id1/:id2", todoController.doubleDelete);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.delete("/:id", todoController.deleteTodo);
router.put("/:id", todoController.updateTodo);

module.exports = router;
