const orderRoutes = require('express').Router();
const middlewares = require('../middlewares');
const orderController = require('../controllers/orderController');

orderRoutes.post('/createOrder', middlewares.validateToken, orderController.createOrder);
orderRoutes.get('/getAllOrders', middlewares.validateToken, orderController.getAllOrders);
orderRoutes.get('/getOrder/:id', middlewares.validateToken, orderController.getOrderbyID);

module.exports = orderRoutes;
