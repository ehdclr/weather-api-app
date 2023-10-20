import logger from '../config/logger.js';
import { HttpError } from '../utils/httpErrors.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err instanceof HttpError) {
    logger.error(`HTTP 에러 - Status: ${err.status}, Message: ${err.message}`);
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
