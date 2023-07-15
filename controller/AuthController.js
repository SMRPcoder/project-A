const User = require("../models/User");
const { request, response } = require("express");

const { createJWT } = require("../functions/function");
const Role = require("../models/Role");




exports.login=(req=request,res=response)=>{

    try {
        const {email,password}=req.body;
        User.where({email:email}).findOne().populate("roleId").then(data=>{
            if(data){
                data.verifyPassword(password,(err,valid)=>{
                    if(valid){
                        const token=createJWT(data);
                        res.status(200).json({message:"Logged in Success",status:true,token:token});
                    }else{
                        res.status(200).json({message:"Password wrong",status:false});
                    }
                })
            }else{
                res.status(200).json({message:"username not found",status:false});
            }
        })
    } catch (error) {
        console.error(`Error Occured While Login- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }

}

