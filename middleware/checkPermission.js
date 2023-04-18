const jwt =  require('jsonwebtoken');
const dotenv = require("dotenv");
const HTTPCodes = require('../utils/responses');
const logger = require('../utils/logger.js');
const QueryDB = require('../config/db_Config');

dotenv.config();

const routeCheck = {
  'POST':'1',
  'GET':'2',
  'PUT':'3',
  'DELETE':'4'
}

module.exports = function checkPermission(req,res,next) {
  console.log("req body is " , req.body)
    console.log("req header is " , req.method)
    console.log("POST VALUE IS : " , routeCheck[req.method]);
    
    const resp = new Promise(async (resolve, reject) => {
        try {
          console.log("POST VALUE IS : " , routeCheck[req.method]);

          const result = await query(req , routeCheck[req.method]);
          console.log('result is', result[0]);
          console.log('array length is', result.length);
          if (result.length === 0) {
            console.log('inside reject');
            reject(false);
          }
          // else if(result[0].affectedRows == 1){
            
          // }
           else {
            console.log('inside resolve');
            resolve(true);
          }
        } catch (err) {
          reject(err);
        }
      });
      
      resp
        .then(() => {
          console.log('inside true');
          logger.info("Permission True")
          next();
        })
        .catch((err) => {
          console.log('inside false');
          console.log("error is :", err)
          res
            .status(HTTPCodes.NOT_AUTHORIZED)
            .json({ message: 'You did not have permission ' });
        });
       
}
async function query(req, routeID) {
  //console.log(req)
  console.log(routeID)
  console.log(req.body)
    let res = await QueryDB('Select * from roles_permission where user_type_id = ? AND permission_id = ?', [req.loggedInUser, routeID]) 
    console.log('res',res);
    return res
}
// async function queryPermission(permissionID) {
//   let res = await QueryDB('Select * from permissions where user_type_id = ? AND permission_id = ?', [req.body.user_type_id, req.body.permission_id]) 
//   console.log('res',res);
//   return res
// }


