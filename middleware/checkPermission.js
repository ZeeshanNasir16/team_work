const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HTTPCodes = require('../utils/responses');
const logger = require('../utils/logger.js');
const QueryDB = require('../config/db_Config');

dotenv.config();

const routeCheck = {
  POST: '1',
  GET: '2',
  PUT: '3',
  PATCH: '3',
  DELETE: '4',
};

module.exports = function checkPermission(req, res, next) {
  const resp = new Promise(async (resolve, reject) => {
    try {
      const result = await query(req, routeCheck[req.method]);

      if (result.length === 0) {
        reject(false);
      }
      // else if(result[0].affectedRows == 1){

      // }
      else {
        resolve(true);
      }
    } catch (err) {
      reject(err);
    }
  });

  resp
    .then(() => {
      logger.info('Permission True');
      next();
    })
    .catch((err) => {
      return res
        .status(HTTPCodes.NOT_AUTHORIZED)
        .json({ message: 'You did not have permission ' });
    });
};
async function query(req, routeID) {
  //console.log(req)

  let res = await QueryDB(
    'Select * from roles_permission where user_type_id = ? AND permission_id = ?',
    [req.loggedInUser, routeID]
  );

  return res;
}
// async function queryPermission(permissionID) {
//   let res = await QueryDB('Select * from permissions where user_type_id = ? AND permission_id = ?', [req.body.user_type_id, req.body.permission_id])
//   console.log('res',res);
//   return res
// }
