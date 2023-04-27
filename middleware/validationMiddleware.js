const logger = require('../utils/logger');
const HTTPCodes = require('../utils/responses');

module.exports = function validationMiddleware(schema) {
  return async (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (e) {
      const errors = [];

      e.details.forEach((error) => {
        errors.push(error.message);
      });
      res.status(HTTPCodes.BAD_REQUEST).send({ errors: errors });
    }
  };
};
