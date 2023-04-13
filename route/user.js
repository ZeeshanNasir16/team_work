const express = require('express');
const { getAllUsers, getUsersOnly } = require('../controller/userController');
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/getUsersOnly', getUsersOnly);

module.exports = userRouter;
