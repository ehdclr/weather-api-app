import winston from 'winston';

const {combine, timestamp, label, printf, colorize} = winston.format;

const logFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const logger = winston.createLogger({
  format: combine(
      label({label: 'weather-app'}),
      timestamp(),
      logFormat,
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;