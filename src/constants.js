const constants = Object.freeze({
  // DB_NAME: `integration_ninjas`,
  DB_NAME: 'electronics_world',
  PASSWORD_SALT_ROUNDS: 10,
  JWT_SECRET: 'SUPER_SECRET',
  JWT_EXPIRY: '30d',
  STRIPE_SUCCESS_URL : 'http://localhost:4200/payment-complete',
  STRIPE_CANCEL_URL : 'http://localhost:4200/payment-cancel',
  STRIPE_PAYMENT_MODE: 'payment',
  STRIPE_CURRENCY: 'usd'
});

module.exports = constants;
