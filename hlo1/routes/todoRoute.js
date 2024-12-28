var express = require('express');
var authVerify = require('../middlewares/auth');
const { fetchTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo');

var todoRouter = express.Router();
todoRouter.get('/', authVerify, fetchTodos)
todoRouter.post('/create', authVerify, createTodo)
todoRouter.put('/update', authVerify, updateTodo)
todoRouter.delete('/delete', authVerify, deleteTodo)
module.exports = todoRouter;