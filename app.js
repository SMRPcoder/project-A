const express = require("express");
const cors=require("cors");
const connection=require("./db/connection");
const AuthRouter = require("./router/auth-routes");
const RolesRouter = require("./router/role-routes");
const flowRouter = require("./router/flow-routes");
const AdminRouter = require("./router/admin-routes");
const CustomerRouter = require("./router/customer-routes");
const PaymentRouter = require("./router/payment-routes");


require("dotenv").config();
const app= express();
connection();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/auth",AuthRouter);
app.use("/api/role",RolesRouter);
app.use("/api/dev",flowRouter);
app.use("/api/admin",AdminRouter);
app.use("/api/customer",CustomerRouter);
app.use("/api/payment",PaymentRouter);



app.get("/",(req,res)=>{
    res.status(200).json({message:"hello world",status:true});
})

app.listen(4000,()=>{
    console.log("port is running and access by \"http://localhost:3000/\"");
})


// module.exports=app;