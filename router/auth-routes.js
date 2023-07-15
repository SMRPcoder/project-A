const {Router} =require("express");
const AuthController=require("../controller/AuthController");
const AuthRouter=Router();
const {validate} = require("../validation/validate");
const { LoginSchema } = require("../validation/validationSchema");


AuthRouter.post("/login",validate(LoginSchema),AuthController.login);



module.exports=AuthRouter;