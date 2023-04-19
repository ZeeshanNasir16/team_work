const QueryDB = require('../config/db_Config');

exports.createPermission = (perName) =>
  QueryDB('INSERT into permissions (permission_name) values(?) ', [perName]);

exports.getAllPermissions = () => QueryDB('SELECT * from permissions');

exports.getPermissionById = (permId) =>
  QueryDB('SELECT * from permissions where id=? ', [permId]);

exports.updatePermission = (permId, perName) =>
  QueryDB('Update permissions SET permission_name=? where id=? ', [
    perName,
    permId,
  ]);

exports.deletePermission = (permId) =>
  QueryDB('Delete from permissions where id=? ', [permId]);
