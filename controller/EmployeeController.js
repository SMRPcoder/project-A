const { request, response } = require("express");
const User = require("../models/User");
const { createJWT } = require("../functions/function");



exports.ViewEmployee=(req=request,res=response)=>{

    try {
        User.where({_id:req.user_id,}).findOne().then((data)=>{
            res.status(200).json({data:data,status:false});
        })
    } catch (error) {
        console.error(`error while fetching profile Error: ${error}`);
        res.status(500).json({message:"error while fetching profile",status:false})
    }
}

exports.editProfile=(req=request,res=response)=>{
    try {
        const {firstname,lastname}=req.body;
        var updateData={firstname,lastname}
        if(req.file){
            updateData["profile"]=req.file.path;
        }
        User.findOneAndUpdate({_id:req.user_id},updateData).then(async data=>{
            const updatedData=await User.findById(req.user_id).exec();
            const token=createJWT(updatedData);
            res.status(200).json({message:"Updated Successfully",token:token,status:true});
        })
    } catch (error) {
        console.error(`error while editing profile Error: ${error}`);
        res.status(500).json({message:"error while editing profile",status:false})
    }
}

exports.viewAllEmployees=(req=request,res=request)=>{
    try {
        User.where({roleId:req.roleId}).find().then(data=>{
            res.status(200).json({data:data,status:true});
        })
    } catch (error) {
        console.error(`error while fetching profiles, Error: ${error}`);
        res.status(500).json({message:"error while fetching profile",status:false})
    }
}