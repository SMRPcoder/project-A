const { Router } = require("express");
const auth_admin=require("../middleware/auth_admin");
const paymentController=require("../controller/PaymentController");
const auth_user = require("../middleware/auth_user");
const auth_employee = require("../middleware/auth_employee");
const PaymentRouter=Router();

// admin router
PaymentRouter.post("/assignAmount",auth_admin,paymentController.AssignAmount);



// employee routes
PaymentRouter.get("/listCustomerInstance",auth_employee,paymentController.listInstance);
PaymentRouter.post("/addEntry",auth_employee,paymentController.AddEntry);
PaymentRouter.get("/viewAllEntries",auth_employee,paymentController.viewEntries);



module.exports=PaymentRouter;