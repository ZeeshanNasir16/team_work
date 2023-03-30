const { signupSchema } = require('../utils/validationSchema');

exports.signupValidation = (req, res, next) => {
  const value = signupSchema.validate(req.body);
  if (value.error) {
    // console.log(value.error);
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
