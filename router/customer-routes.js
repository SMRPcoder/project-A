const { Router } = require("express");
const auth_user = require("../middleware/auth_user");
const CustomerController=require("../controller/CustomerController");
const upload = require("../functions/multer_upload");
const CustomerRouter=Router()

CustomerRouter.get("/getUser",auth_user,CustomerController.viewUser);
CustomerRouter.post("/editUser",auth_user,upload.single("file"),CustomerController.editUser);

module.exports=CustomerRouter;