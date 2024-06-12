const stripeRouter = require('express').Router();
const stripeController = require('../controllers/stripeController');
const middlewares = require('../middlewares');

stripeRouter.post('/checkout/sessions', middlewares.validateToken, stripeController.checkStripe);

module.exports = stripeRouter;
