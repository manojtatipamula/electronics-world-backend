const constants = Object.freeze({
  // DB_NAME: `integration_ninjas`,
  DB_NAME: 'electronics_world',
  PASSWORD_SALT_ROUNDS: 10,
  JWT_SECRET: 'SUPER_SECRET',
  JWT_EXPIRY: '12h'
});

module.exports = constants;
