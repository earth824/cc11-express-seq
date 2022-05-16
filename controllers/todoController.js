const { Todo } = require('../models');
const createError = require('../utils/createError');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate, userId } = req.body;
    const todo = await Todo.create({ title, completed, dueDate, userId });
    res.status(201).json({ todo: todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const todos = await Todo.findAll({ where: { userId } });
    res.json({ todos: todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const todo = await Todo.findOne({
      where: { id: id, userId: userId }
    });
    res.json({ todo: todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed, dueDate, userId } = req.body;
    // const newValue = {};
    // if (title) {
    //   newValue.title = title;
    // }
    // if (completed) {
    //   newValue.completed = completed;
    // }
    // if (dueDate) {
    //   newValue.dueDate = dueDate;
    // }
    const result = await Todo.update(
      { title, completed, dueDate },
      { where: { id, userId } }
    );
    if (result[0] === 0) {
      createError('todo with this id not found', 400);
    }
    res.json({ message: 'update todo success' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const result = await Todo.destroy({ where: { id: id, userId: userId } });
    if (result === 0) {
      createError('todo with this id not found', 400);
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
