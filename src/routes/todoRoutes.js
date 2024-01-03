const express = require("express");
const Todo = require("../models/todoModel");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE - POST a Todo
router.post("/add-todo", authenticateToken, async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const createdBy = req.user.userId;

    const newTodo = new Todo({
      title,
      description,
      due_date,
      priority,
      createdBy,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET all Todos for the authenticated user
router.get("/get-all-todos", authenticateToken, async (req, res) => {
  try {
    const createdBy = req.user.userId;
    const todos = await Todo.find({ createdBy });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET a specific Todo by ID for the authenticated user
router.get("/get-todo/:id", authenticateToken, async (req, res) => {
  try {
    const createdBy = req.user.userId;
    const todo = await Todo.findOne({ _id: req.params.id, createdBy });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - PUT a Todo for the authenticated user
router.put("/update-todo/:id", authenticateToken, async (req, res) => {
  try {
    const createdBy = req.user.userId;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, createdBy },
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a Todo for the authenticated user
router.delete("/delete-todo/:id", authenticateToken, async (req, res) => {
  try {
    const createdBy = req.user.userId;
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
