const { Router } = require("express");
const auth_user = require("../middleware/auth_user");
const UserController=require("../controller/UserController");
const upload = require("../functions/multer_upload");
const UserRouter=Router()

UserRouter.get("/getUser",auth_user,UserController.viewUser);
UserRouter.post("/editUser",auth_user,upload.single("file"),UserController.editUser);

module.exports=UserRouter;