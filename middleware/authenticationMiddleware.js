const jwt =  require('jsonwebtoken');
const dotenv = require("dotenv");
const HTTPCodes = require('../utils/responses');
dotenv.config();

module.exports = function verifyToken(req,res,next) {
    console.log("inside verify", req.headers)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(HTTPCodes.NOT_AUTHORIZED).
        json({message: 'You are not authorized'});
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        console.log("error: ", err)
        console.log("decoded: ", decoded)
        if(!err){
            console.log(decoded)
            if(decoded.id == 1){
                // res.status(HTTPCodes.OK).
                // json({message: 'You are authorized'});
                console.log(" You're Authorized ")
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


