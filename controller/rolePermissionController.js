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
  console.log("inside create role permission ")
  const alreadyExists = await rolePermissionModel.getByIdRolePermission(
    req.body.user_type_id,
    req.body.permission_id
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
  const userId = req.params.id;
  try {
    const results = await rolePermissionModel.getRolePermissionById(
      userId
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
  const { user_type_id, permission_id, new_permission_id} = req.body;
  try {
    const alreadyExists = await rolePermissionModel.getByIdRolePermission(
      user_type_id,
      new_permission_id
    );
    console.log("length ",alreadyExists.length)
    if(alreadyExists.length === 0){
      const results = await rolePermissionModel.updateRolePermission(
        user_type_id,
        permission_id,
        new_permission_id
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
      
    }else{
      res.status(404).json({
        status: 'Alrady exists',
        message: 'Permission Already Exists',
      });
    }
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in updating Role Permissions',
      errMsg: error,
    });
  }
};
