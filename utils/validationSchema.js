const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

exports.signupSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(20).required(),
  last_name: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email().required(),
  mobile_no: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(5)
    .noWhiteSpaces()
    .required()
    .label('password'),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
    }),
  user_type_id: Joi.number().integer().min(2).max(3),
});
