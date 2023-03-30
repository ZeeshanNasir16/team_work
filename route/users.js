const express = require('express');
const controller = require('../controller/users');

const router = express.Router();

router.post('/register', controller.registerUser);

module.exports = router;
