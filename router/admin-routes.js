const { Router } = require("express");
const AdminController=require("../controller/AdminController");
const upload=require("../functions/multer_upload");
const auth_admin=require("../middleware/auth_admin");
const AdminRouter=Router();

//create process
AdminRouter.get("/checkIsIn",auth_admin,(req,res)=>{res.status(200).json({status:true,message:"is logged in"})});
AdminRouter.get("/getRolesList",auth_admin,AdminController.viewRolesList);
AdminRouter.post("/adduser",auth_admin,upload.single("file"),AdminController.addUser);

// view all
AdminRouter.post("/viewAll",auth_admin,AdminController.viewAll);
// AdminRouter.post("/viewAllUsers",auth_admin,AdminController.viewAllUsers);

// view single
AdminRouter.post("/viewOne",auth_admin,AdminController.viewOne);
// AdminRouter.post("/viewUser",auth_admin,AdminController.viewUser);

// edit
AdminRouter.post("/editOne",auth_admin,upload.single("file"),AdminController.editOne);
// AdminRouter.post("/editUser",auth_admin,AdminController.editUser);

// delete
AdminRouter.post("/deleteUser",auth_admin,AdminController.deleteUser);


// role permission
AdminRouter.post("/createRolePermission",auth_admin,AdminController.createRolePermission);
AdminRouter.post("/addPermission",auth_admin,AdminController.addPermission);
AdminRouter.post("/removePermission",auth_admin,AdminController.removePermission);
AdminRouter.get("/viewAllRolePermission",auth_admin,AdminController.viewAllRolePermissions);
AdminRouter.post("/viewRolePermission",auth_admin,AdminController.viewOneRolePermisions);
// AdminRouter.post("/getRolePermission")




module.exports=AdminRouter;
