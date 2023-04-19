const roleModel = require('../model/roleModel');

exports.createRole = async (req, res) => {
  const { type } = req.body;
  try {
    await roleModel.createRole(type);
    return res.status(200).json({
      status: 'success',
      message: 'Role is created',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error in createRole',
      errMsg: error,
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const results = await roleModel.getAllRoles();
    return res.status(200).json({
      status: 'success',
      message: 'View all roles',
      Roles: results,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error in viewing role',
      errMsg: error,
    });
  }
};

exports.getRolebyId = async (req, res) => {
  const roleId = req.params.id;
  try {
    const results = await roleModel.getRoleById(roleId);
    return res.status(200).json({
      status: 'success',
      message: 'View Role by ID',
      Roles: results,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error in viewing role',
      errMsg: error,
    });
  }
};

exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { type } = req.body;
  try {
    const results = await roleModel.updateRole(type, roleId);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Id not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Role is updated',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error in updating roles',
      errMsg: error,
    });
  }
};

exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;
  try {
    const results = await roleModel.deleteRole(roleId);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Id not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Role is deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error in deleting roles',
      errMsg: error,
    });
  }
};
