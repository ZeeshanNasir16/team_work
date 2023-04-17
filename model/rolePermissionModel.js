const QueryDB = require('../config/db_Config');

exports.createRolePermission = (userType, permissionId) => {
  return QueryDB(
    'INSERT into roles_permission (user_type_id, permission_id) values(?,?) ',
    [userType, permissionId]
  );
};

exports.getAllRolePermissions = () => {
  return QueryDB('SELECT * from roles_permission');
};

exports.getRolePermissionById = (permissionId) => {
  return QueryDB('SELECT * from roles_permission where id=? ', [permissionId]);
};

exports.getRolePermissionByUserType = (userType) => {
  return QueryDB('SELECT * from roles_permission where user_type_id=? ', [
    userType,
  ]);
};

exports.updateRolePermission = (userType, permissionId, rolePermissionId) => {
  return QueryDB(
    'Update roles_permission SET user_type_id=?, permission_id=? where id=? ',
    [userType, permissionId, rolePermissionId]
  );
};

exports.deleteRolePermission = (rolePermissionId) => {
  return QueryDB('Delete from roles_permission where id=? ', [
    rolePermissionId,
  ]);
};
