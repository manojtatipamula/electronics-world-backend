const ProductModel = require('../models/productModel');

const createProductInvetory = async (data, currentUser) => {
  try {
    if (currentUser) {
      console.log('Current User is there');
    }
    const dataToInsert = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      image: data.image,
      stock: data.stock ?? 0
    };
    const product = new ProductModel(dataToInsert);
    await product.save();

    const final = {
      products: await ProductModel.find(),
    };
    return final;
  } catch (err) {
    throw err;
  }
};
const getAllProductsInventory = async () => {
  try {
    const data = await ProductModel.find();
    return data;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createProductInvetory,
  getAllProductsInventory
};
