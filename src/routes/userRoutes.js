const userRouter = require('express').Router();
const userController = require('../controllers/userController')
const middlewares = require('../middlewares')

userRouter.get('/getUsers', middlewares.sampleMiddlewareFunc, userController.getUsers)
userRouter.post('/addUsers', middlewares.sampleMiddlewareFunc, userController.addUsers)

module.exports = userRouter