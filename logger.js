const winston = require('winston');

// Format messages
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(info => {
  return `${info.timestamp} - status: ${info.message}`;
});

const coolFormat = combine(
  label({ label: 'right meow!' }),
  timestamp(),
  myFormat,
);

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: coolFormat,
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'messages.log' }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: coolFormat,
  }),
);

module.exports = logger;
