const dotenv = require('dotenv');
dotenv.config();
const constants = Object.freeze({
  // DB_NAME: `integration_ninjas`,
  DB_NAME: 'electronics_world',
  PASSWORD_SALT_ROUNDS: 10,
  JWT_SECRET: 'SUPER_SECRET',
  JWT_EXPIRY: '30d',
  STRIPE_SUCCESS_URL : `${process.env.UI_HOST}/payment-complete?session_id={CHECKOUT_SESSION_ID}`,
  STRIPE_CANCEL_URL : `${process.env.UI_HOST}/cart`,
  STRIPE_PAYMENT_MODE: 'payment',
  STRIPE_CURRENCY: 'usd'
});

module.exports = constants;
