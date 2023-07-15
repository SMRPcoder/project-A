const { Router } = require("express");
const AdminController=require("../controller/AdminController");
const upload=require("../functions/multer_upload");
const auth_admin=require("../middleware/auth_admin");
const AdminRouter=Router();

//create process
AdminRouter.get("/getRolesList",auth_admin,AdminController.viewRolesList);
AdminRouter.post("/adduser",auth_admin,upload.single("file"),AdminController.addUser);

// view all
AdminRouter.post("/viewAllEmployee",auth_admin,AdminController.viewAllEmployee);
AdminRouter.post("/viewAllUsers",auth_admin,AdminController.viewAllUsers);

// view single
AdminRouter.post("/viewEmployee",auth_admin,AdminController.viewEmployee);
AdminRouter.post("/viewUser",auth_admin,AdminController.viewUser);

// edit
AdminRouter.post("/editEmployee",auth_admin,AdminController.editEmployee);
AdminRouter.post("/editUser",auth_admin,AdminController.editUser);

// delete
AdminRouter.post("/deleteUser",auth_admin,AdminController.deleteUser)





module.exports=AdminRouter;
