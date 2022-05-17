const express = require('express');

const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodo);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
