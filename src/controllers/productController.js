const ProductService = require('../services/productService');
const mongoose = require('mongoose')

const createProductsInventory = async (req, res, next) => {
  try {
    const payload = req.body;
    const currentUser = req.userData;
    const result = await ProductService.createProductInvetory(payload, currentUser);
    return res.json({
      status: 'success',
      message: 'PRODUCT_INVENTORY_UPDATED',
      currentUser: currentUser,
      data: result
    });
  } catch (err) {
    return next(err);
  }
};

const getAllProductsInventory = async (req, res, next) => {
  try {
    const currentUser = req.userData;
    let result = await ProductService.getAllProductsInventory(currentUser);
    result = result.map((item)=> {
      item.id = item._id
      return item
    })
    // console.log(result)
    return res.json({
      status: 'success',
      message: 'PRODUCT_INVENTORY_LIST',
      data: result
    });
  } catch (err) {
    return next(err);
  }
};

const getProductbyID = async (req, res, next) => {
  try {
    const currentUser = req.userData;
    const productId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: 'error',
        message: 'PRODUCT_ID_INVALID',
      });
    }
    const result = await ProductService.getProductbyID({ _id: productId });
    return res.json({
      status: 'success',
      message: 'PRODUCT_DETAILS',
      result: result
    });
  } catch (err) {
    return next(err);
  }

}

module.exports = {
  createProductsInventory,
  getAllProductsInventory,
  getProductbyID
};
