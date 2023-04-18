const QueryDB = require('../config/db_Config');
const bcrypt = require('bcrypt');


exports.getRolePermission = async (rolePermissionData) => {
    return QueryDB(
      'select * from roles_permission '
    );
  };

exports.deleteRolePermission = async (rolePermissionData) => {
    return QueryDB(
      'DELETE from roles_permission where user_type_id = ? AND permission_id = ?' , [rolePermissionData.user_type_id, rolePermissionData.permission_id]
    );
  };

  exports.getByIdRolePermission = async (rolePermissionData) => {
    return QueryDB(
      'select * from roles_permission where user_type_id = ? AND permission_id = ?' , [rolePermissionData.user_type_id, rolePermissionData.permission_id]
    );
  };

exports.createRolePermission = async (rolePermissionData) => {
  const { user_type_id, permission_id} =
  rolePermissionData;

  const data = [
    user_type_id, 
    permission_id,
  ];

  return QueryDB(
    'INSERT into roles_permission (user_type_id, permission_id) values(?,?) ',
    data
  );
};
