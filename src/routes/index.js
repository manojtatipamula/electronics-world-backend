const userRouter = require('./userRoutes')
const stripeRouter = require('./stripeRoutes')
const router = require('express').Router()

router.use('/users', userRouter)
router.use('/stripe', stripeRouter)

module.exports = router