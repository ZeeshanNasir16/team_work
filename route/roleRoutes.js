const express = require('express');
const roleController = require('../controller/roleController');
const roleRouter = express.Router();

roleRouter.post('/createRole', roleController.createRole);
roleRouter.get('/getAllRoles', roleController.getAllRoles);
roleRouter.get('/getRoleById/:id', roleController.getRolebyId);
roleRouter.put('/updateRole/:id', roleController.updateRole);
module.exports = roleRouter;
