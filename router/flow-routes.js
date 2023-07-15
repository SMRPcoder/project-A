const { Router } = require("express");
const flowController=require("../controller/flowController");
const auth_user=require("../middleware/auth_user");
const upload=require("../functions/multer_upload");

const flowRouter=Router();


flowRouter.post("/adduser",upload.single("file"),flowController.addUser);
flowRouter.post("/viewUser",auth_user,flowController.getuser);
flowRouter.post("/editUser",auth_user,upload.single("file"),flowController.editUser);

module.exports=flowRouter;