const rolePermissionModel = require('../model/rolePermissionModel');

exports.createRolePermission = async (req, res) => {
  const { userType, permissionId } = req.body;
  try {
    await rolePermissionModel.createRolePermission(userType, permissionId);
    res.status(200).json({
      status: 'success',
      message: 'Role permission is created',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in createRolePermission',
      errMsg: error,
    });
  }
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

exports.deleteRolePermission = async (req, res) => {
  const rolePermissionId = req.params.id;
  try {
    const results = await rolePermissionModel.deleteRolePermission(
      rolePermissionId
    );
    res.status(200).json({
      status: 'success',
      message: 'Delete Role Permission by ID',
      Permissions: results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error in Deleting Role permission',
      errMsg: error,
    });
  }
};
