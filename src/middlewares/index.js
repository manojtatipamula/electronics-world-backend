const helpers = require('../helpers');

const validateToken = (req, res, next) => {
  try {
    console.log('Middleware called', req.url);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ status: 'failure', message: 'Send Authorization header' });
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ status: 'failure', message: 'Unauthorized' });
    }
    const decoded = helpers.verifyToken(token);
    req.userData = decoded?.data;
    return next();
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: 'failure', message: 'Token is not valid' });
    }
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'failure', message: 'TokenExpired' });
    }
    return next(e);
  }
};

module.exports = {
  validateToken
};
