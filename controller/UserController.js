const { request, response } = require("../app");
const { createJWT } = require("../functions/function");
const User = require("../models/User");


exports.viewUser=(req=request,res=response)=>{
    try {
        User.findById(req.user_id).populate("roleId").then(data=>{
            if(data){
                res.status(200).json({data:data,status:true});
            }else{
                res.status(404).json({message:"Data Not Found",status:false});
            }
        })
    } catch (error) {
        console.error(`error while fetching user Error: ${error}`);
        res.status(500).json({message:"error while fecting User",status:false})
    }
}

exports.editUser=(req=request,res=response)=>{
    try {
        const {firstname,lastname}=req.body;
        var updatedata={firstname,lastname}
        if(req.file){
            updatedata["profile"]=req.file.path;
        }
        User.findOneAndUpdate({_id:req.user_id},updatedata).then(async data=>{
            if(data){
                const Userdata=await User.findById(data._id).populate("roleId").exec();
                const token=createJWT(Userdata);
                res.status(200).json({data:Userdata,token:token,status:true})
            }
        })
    } catch (error) {
        console.error(`error while editing Error: ${error}`);
        res.status(500).json({message:"error while editing",status:false})
    }
}