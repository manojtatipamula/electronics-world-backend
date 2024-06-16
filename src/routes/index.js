const router = require('express').Router();
const userRouter = require('./userRoutes');
const stripeRouter = require('./stripeRoutes');
const productRouter = require('./productRoutes');

router.use('/users', userRouter);
router.use('/stripe', stripeRouter);
router.use('/products', productRouter);
router.use('/cart', require('express').Router());
router.use('/orders', require('express').Router());

module.exports = router;
