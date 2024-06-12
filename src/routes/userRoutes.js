const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const middlewares = require('../middlewares');

userRouter.get('/getUsers', middlewares.validateToken, userController.getUsers);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
module.exports = userRouter;
