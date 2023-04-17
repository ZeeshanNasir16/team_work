const jwt =  require('jsonwebtoken');
const dotenv = require("dotenv");
const HTTPCodes = require('../utils/responses');
const logger = require('../utils/logger.js');

dotenv.config();

module.exports = function verifyToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(HTTPCodes.NOT_AUTHORIZED).
        json({message: 'You are not authorized'});
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        logger.info("error: ", err)
        logger.info("decoded: ", decoded)
        if(!err){
            logger.info(decoded)
            if(decoded.id == 1 || decoded.id == 2 || decoded.id == 3){
                logger.info(" You're Authorized ")
                req.loggedInUser = decoded.id;
                next()
            }else{
                res.status(HTTPCodes.NOT_AUTHORIZED).
                json({message: 'You are Not authorized'});
            }    
        }
        else{  
        res.status(HTTPCodes.NOT_AUTHORIZED).
        json({message: 'You are Not authorized'});
      }      
      });
}


