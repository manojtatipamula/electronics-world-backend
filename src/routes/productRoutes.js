const productRouter = require('express').Router();
const middlewares = require('../middlewares');
const productController = require('../controllers/productController');

productRouter.post('/createInventory', middlewares.validateToken, productController.createProductsInventory);
productRouter.get('/getProductInventory', middlewares.validateToken, productController.getAllProductsInventory);
productRouter.get('/getProduct/:id', middlewares.validateToken, productController.getProductbyID);

module.exports = productRouter;
