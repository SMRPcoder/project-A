const { Router } = require("express");
const auth_user=require("../middleware/auth_user");
const RolesController=require("../controller/RolesController");
const RolesRouter=Router();

RolesRouter.post("/addRole",RolesController.addRoles);
RolesRouter.post("/editRole",auth_user,RolesController.editRoles);

module.exports=RolesRouter;

