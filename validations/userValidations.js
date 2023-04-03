const Joi = require('joi') ;


module.exports =  loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });