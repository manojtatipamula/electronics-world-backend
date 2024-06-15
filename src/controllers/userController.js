const userService = require('../services/userService');
const helpers = require('../helpers');

const getUsers = async (req, res, next) => {
  try {
    let results = await userService.getAll();
    const finalRes = {
      data : results,
      status : 'success'
    }
    return res.send(finalRes).status(200);
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const results = await userService.addUser(payload);
    return res.send(results).status(200);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.email || !payload.password) {
      return res.status(503).json({ status: 'error', message: 'PAYLOAD_REQUIRED' });
    }
    const userData = await userService.getUser({ email: payload.email });
    if (!userData) {
      return res.status(404).json({ status: 'error', message: 'USER_NOT_FOUND' });
    }
    const passRes = await helpers.comparePasswords(payload?.password, userData.password);
    if (passRes) {
      const encode = {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name
      };
      const token = helpers.generateToken(encode);
      return res.status(200).json({
        status: 'success', data: encode, message: 'VALID_USER', token
      });
    }
    return res.status(403).json({ status: 'error', message: 'PASSWORD_INCORRECT' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUsers,
  register,
  login,
};
