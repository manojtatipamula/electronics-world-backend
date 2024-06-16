const ProductService = require('../services/productService');

const createProductsInventory = async (req, res, next) => {
  try {
    const payload = req.body;
    const currentUser = req.userData;
    const result = await ProductService.createProductInvetory(payload, currentUser);
    return res.json({
      status: 'success',
      message: 'PRODUCT_INVENTORY_UPDATED',
      currentUser: currentUser,
      result: result
    });
  } catch (err) {
    return next(err);
  }
};

const getAllProductsInventory = async (req, res, next) => {
  try {
    const currentUser = req.userData;
    const result = await ProductService.getAllProductsInventory(currentUser);
    return res.json({
      status: 'success',
      message: 'PRODUCT_INVENTORY_LIST',
      result: result
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createProductsInventory,
  getAllProductsInventory
};
