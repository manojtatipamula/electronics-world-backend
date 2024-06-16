const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug', // Adjust the log level as needed (e.g., 'debug', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // Optionally add transports for file or remote logging
  ]
});

module.exports = logger;
