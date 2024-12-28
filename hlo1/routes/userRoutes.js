var express = require('express');
const { doSignup, doLogin } = require('../controllers/authController');
var userRouter = express.Router();
const authController = require('../controllers/authController')
userRouter.post('/login', doLogin)
userRouter.post('/signup', authController.doSignup)
module.exports = userRouter;