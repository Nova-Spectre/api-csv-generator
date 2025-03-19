const { logger } = require('../utils/logger.util');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { 
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });
  
  if (err.name === 'AxiosError') {
    const statusCode = err.response?.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: 'API request failed',
      error: err.message,
      details: err.response?.data
    });
  }
  
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = errorHandler;