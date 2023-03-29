// import logger from '../utils/logger.js';
const logger = require('../utils/logger');

function GlobalErrorMiddleware(error, _, res, _next) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  logger.error(message);

  res.status(status).send({
    status,
    message,
  });
}

module.exports = GlobalErrorMiddleware;
