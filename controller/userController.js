const UserModel = require('../model/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');
const HTTPCodes = require('../utils/responses');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAll();

    if (users.length === 0)
      return next(new AppError(HTTPCodes.NOT_FOUND, 'No record found'));

    res.status(HTTPCodes.OK).json({
      status: 'success',
      users,
    });
  } catch (er) {
    res.status(HTTPCodes.SERVER_ERROR).json({
      status: 'failed',
      message: er.message,
    });
  }
};

exports.getUsersOnly = catchAsync(async (req, res, next) => {
  const users = await UserModel.getUsers();
  if (users.length === 0)
    return next(new AppError(HTTPCodes.NOT_FOUND, 'No record found'));

  res.status(HTTPCodes.OK).json({
    status: 'success',
    users,
  });
});
