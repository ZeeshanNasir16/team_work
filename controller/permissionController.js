const {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require('../model/permissionModel');
const catchAsync = require('../utils/catchAsync.js');
const HTTPCodes = require('../utils/responses.js');
const AppError = require('../utils/appError.js');
const { delRolePermByIds } = require('../model/rolePermissionModel');

exports.createPermission = catchAsync(async (req, res, next) => {
  const { permission_name } = req.body;
  const result = await createPermission(permission_name);
  if (result.affectedRows === 1)
    return res.status(HTTPCodes.CREATED).json({
      status: 'success',
      message: 'Permission created Successfully',
    });

  return next(
    new AppError(HTTPCodes.SERVER_ERROR, 'Error in new permission creation')
  );
});

exports.getPermissions = catchAsync(async (req, res, next) => {
  const result = await getAllPermissions();
  if (result.length === 0)
    return next(new AppError(HTTPCodes.OK, `No record found`));

  res.status(HTTPCodes.OK).json({
    status: 'success',
    permissions: result,
  });
});

exports.updatePermission = catchAsync(async (req, res, next) => {
  const result = await updatePermission(
    req.params.id,
    req.body.permission_name
  );

  if (result.affectedRows === 1)
    return res.status(HTTPCodes.CREATED).json({
      status: 'success',
      message: 'Permission updated Successfully',
    });

  return next(
    new AppError(
      HTTPCodes.NOT_FOUND,
      `Cant find any permission with id ${req.params.id}`
    )
  );
});

exports.deletePermission = catchAsync(async (req, res, next) => {
  const result = await deletePermission(req.params.id);
  if (result.affectedRows >= 1) {
    const delRolePermResult = await delRolePermByIds(
      'permission',
      req.params.id
    );
    if (delRolePermResult.affectedRows >= 1)
      return res.status(HTTPCodes.CREATED).json({
        status: 'success',
        message: 'Permission deleted Successfully',
      });
  }

  return next(
    new AppError(
      HTTPCodes.NOT_FOUND,
      `Cant find any permission with id ${req.params.id}`
    )
  );
});
