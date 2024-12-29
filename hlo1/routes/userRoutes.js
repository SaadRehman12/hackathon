var express = require('express');
const { doSignup, doLogin } = require('../controllers/userController');
var userRouter = express.Router();
const userController = require('../controllers/userController')
userRouter.post('/login', doLogin)
userRouter.post('/signup', userController.doSignup)
module.exports = userRouter;