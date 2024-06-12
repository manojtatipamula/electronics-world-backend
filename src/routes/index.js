const router = require('express').Router();
const userRouter = require('./userRoutes');
const stripeRouter = require('./stripeRoutes');

router.use('/users', userRouter);
router.use('/stripe', stripeRouter);

module.exports = router;
