const express = require('express');

const todoController = require('../controllers/todoController');
const userMiddleware = require('../middlewares/user');

const router = express.Router();

router.post('/', userMiddleware.getUserById, todoController.createTodo);
router.get('/', userMiddleware.getUserById, todoController.getAllTodo);
router.get('/:id', userMiddleware.getUserById, todoController.getTodoById);
router.put('/:id', userMiddleware.getUserById, todoController.updateTodo);
router.delete('/:id', userMiddleware.getUserById, todoController.deleteTodo);

module.exports = router;
