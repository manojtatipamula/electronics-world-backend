const UserModel = require('../models/userModel');

const getUser = async (data) => {
  try {
    // implement pagination
    const selectionCriteria = {
      email: data?.email
    };
    return await UserModel.findOne(selectionCriteria);
  } catch (e) {
    throw e;
  }
};

const addUser = async (data) => {
  try {
    const newUser = new UserModel(data);
    const result = await newUser.save();
    return result;
  } catch (e) {
    throw e;
  }
};

const getAll = async () => {
  try {
    return await UserModel.find({}).exec();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUser,
  addUser,
  getAll
};
