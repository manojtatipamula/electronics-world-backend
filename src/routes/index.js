const router = require('express').Router();
const userRouter = require('./userRoutes');
const stripeRouter = require('./stripeRoutes');
const productRouter = require('./productRoutes');
const orderRouter = require('./orderRoutes');

router.use('/users', userRouter);
router.use('/stripe', stripeRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

module.exports = router;
