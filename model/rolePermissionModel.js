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

  exports.getByIdRolePermission = async (userID, permissionID) => {
    console.log("inside get by id")
    console.log(userID, permissionID)
    return QueryDB(
      'select * from roles_permission where user_type_id = ? AND permission_id = ?' , [userID, permissionID]
    );
  };

exports.createRolePermission = async (rolePermissionData) => {
  const { user_type_id, permission_id} =
  rolePermissionData;

  const data = [
    user_type_id, 
    permission_id,
  ];
   console.log("role permission data",rolePermissionData)
  return QueryDB(
    'INSERT into roles_permission (user_type_id, permission_id) values(?,?) ',
    data
  );
};

// exports.createRolePermission = (userType, permissionId) => {
//   return QueryDB(
//     'INSERT into roles_permission (user_type_id, permission_id) values(?,?) ',
//     [userType, permissionId]
//   );
// };

exports.getAllRolePermissions = () => {
  return QueryDB('SELECT * from roles_permission');
};

exports.getRolePermissionById = (userId) => {
  return QueryDB('SELECT * from roles_permission where user_type_id=? ', [userId]);
};

exports.getRolePermissionByUserType = (userType) => {
  return QueryDB('SELECT * from roles_permission where user_type_id=? ', [
    userType,
  ]);
};

exports.updateRolePermission = (userType, permissionId, newPermissionId) => {
  return QueryDB(
    'Update roles_permission SET permission_id=? where user_type_id=? AND permission_id=? ',
    [newPermissionId, userType, permissionId ]
  );
};

// exports.deleteRolePermission = (rolePermissionId) => {
//   return QueryDB('Delete from roles_permission where id=? ', [
//     rolePermissionId,
//   ]);
// };

