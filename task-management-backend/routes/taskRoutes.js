const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const { validateTask } = require("../utils/validators");

// Task routes
router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
