const mongoose = require('mongoose');
const dotenv = require('dotenv');
const constants = require('../constants');

async function connectToDBViaMongoose() {
  try {
    // Call dotenv.config() to load environment variables from .env file
    dotenv.config();

    const DB_NAME = constants.DB_NAME;
    const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
    const connectionString = `mongodb+srv://manojtatipamula:${password}@dev-cluster.vxnjm7d.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster`; // clustore url
    await mongoose.connect(connectionString, {
      dbName: DB_NAME
    });
  } catch (eee) {
    console.log('err in connectToDBViaMongoose');
    throw eee;
  }
}
module.exports = {
  connectToDBViaMongoose
};
