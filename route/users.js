const express = require('express');
const controller = require('../controller/users');
const validation = require('../validations/userValidations');

const router = express.Router();

router.post('/register', validation.signupValidation, controller.signUpUser);

module.exports = router;
