const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('./constants');

const comparePasswords = async (textPassword, existingHash) => {
  try {
    const match = await bcrypt.compare(textPassword, existingHash);
    return match;
  } catch (e) {
    throw e;
  }
};

const hashPassword = async (password) => {
  try {
    const saltRounds = constants.PASSWORD_SALT_ROUNDS ?? 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (e) {
    throw e;
  }
};

const generateToken = (data) => {
  try {
    return jwt.sign({
      data: data
    }, constants.JWT_SECRET, { expiresIn: constants.JWT_EXPIRY });
  } catch (e) {
    throw e;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, constants.JWT_SECRET);
    return decoded;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  comparePasswords,
  hashPassword,
  generateToken,
  verifyToken
};
