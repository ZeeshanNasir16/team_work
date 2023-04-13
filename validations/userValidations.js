const Joi = require('joi') ;
const { signupSchema } = require('../utils/validationSchema');

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
exports.signupValidation = (req, res, next) => {
  const value = signupSchema.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};