const { Router } = require("express");
const auth_employee = require("../middleware/auth_employee");
const EmployeeController=require("../controller/EmployeeController");
const upload = require("../functions/multer_upload");

const EmpRouter=Router()


EmpRouter.get("/getEmployee",auth_employee,EmployeeController.ViewEmployee);
EmpRouter.get("/getAllEmployees",auth_employee,EmployeeController.viewAllEmployees);

EmpRouter.get("/editEmployee",auth_employee,upload.single("file"),EmployeeController.editProfile);




module.exports=EmpRouter;