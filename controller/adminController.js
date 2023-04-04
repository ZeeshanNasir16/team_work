exports.getAllUsers = async (req, res, next) => {
  const result = await UserModel.getAll();

  if (result.length === 0)
    return next(new HttpException(HTTPCodes.OK, `No record found`));

  res.status(HTTPCodes.OK).json({
    status: 'success',
    employees: result,
  });
};
