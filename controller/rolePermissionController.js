const rolePermissionModel = require('../model/rolePermissionModel');

const {
  signUpSubject: subject,
  signUpHtml,
  signUpFrom: from,
} = require('../utils/emailMsgs');
const logger = require('../utils/logger');
const HTTPCodes = require('../utils/responses');
const { SendMail } = require('../utils/SendMail');

exports.createRolePermission = async (req, res) => {
  const alreadyExists = await rolePermissionModel.getByIdRolePermission(
    req.body
  );
  if (alreadyExists.length === 0) {
    const resp = await rolePermissionModel.createRolePermission(req.body);

    if (!resp)
      return res.status(HTTPCodes.NOT_FOUND).json({
        status: 'success',
        message: 'User not found with this email.',
      });
    else if (resp.affectedRows == 1)
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: 'Perrmision has been Created',
      });
  } else
    return res.status(HTTPCodes.OK).json({
      status: 'success',
      message: 'Perrmision Already Exists',
    });
};

// exports.getRolePermissions = async (req, res) => {
//   const resp = await rolePermissionModel.getRolePermission();
//   if (!resp)
//     return res.status(HTTPCodes.NOT_FOUND).json({
//       status: 'success',
//       message: 'User not found with this email.',
//     });
//   else if (resp.affectedRows == 1)
//     return res.status(HTTPCodes.OK).json({
//       status: 'success',
//       message: 'Perrmision has been Created',
//     });
//   else return res.status(HTTPCodes.OK).json(resp);
// };

exports.deleteRolePermission = async (req, res) => {
  const resp = await rolePermissionModel.deleteRolePermission(req.body);
  if (!resp)
    return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
    });
  else if (resp.affectedRows == 1)
    return res.status(HTTPCodes.OK).json({
      status: 'success',
      message: ' Permission has been deleted ',
    });
  else return res.status(HTTPCodes.OK).json(resp);
};

exports.getAllRolePermissions = async (req, res) => {
  try {
    const results = await rolePermissionModel.getAllRolePermissions();
    res.status(200).json({
      status: 'success',
      message: 'View all role permissions',
      Permissions: results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in viewing role permission',
      errMsg: error,
    });
  }
};

exports.getRolePermissionbyId = async (req, res) => {
  const rolePermissionId = req.params.id;
  try {
    const results = await rolePermissionModel.getRolePermissionById(
      rolePermissionId
    );
    res.status(200).json({
      status: 'success',
      message: 'View Role Permission by ID',
      Permissions: results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in viewing Role permission',
      errMsg: error,
    });
  }
};

exports.getRolePermissionByUserType = async (req, res) => {
  const userType = req.params.userType;
  try {
    const results = await rolePermissionModel.getRolePermissionByUserType(
      userType
    );
    res.status(200).json({
      status: 'success',
      message: 'View Role Permission by User Type',
      Permissions: results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in viewing Role permission',
      errMsg: error,
    });
  }
};

exports.updateRolePermission = async (req, res) => {
  const rolePermissionId = req.params.id;
  const { userType, permissionId } = req.body;
  try {
    const results = await rolePermissionModel.updateRolePermission(
      userType,
      permissionId,
      rolePermissionId
    );
    if (results.affectedRows === 0) {
      res.status(400).json({
        status: 'fail',
        message: 'Role Permission not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Role Permission is updated',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in updating Role Permissions',
      errMsg: error,
    });
  }
};
