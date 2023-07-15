const User = require("../models/User");
const { request, response } = require("express");
const {EditUserSchema}=require("../validation/validationSchema");
const {DevUserSchema}=require("../validation/validationSchema");
const { createJWT } = require("../functions/function");
const Role = require("../models/Role");
const {validateWith} = require("../validation/validate");


exports.addUser = async (req = request, res = response) => {
    try {
        const is_valid=validateWith(DevUserSchema,req.body);
        if(is_valid.status){
            const AdminroleData=await Role.where({rolename:"ADMIN"}).findOne().exec();
            const roleId=AdminroleData._id;
            const { email, firstname, lastname, password } = req.body;
            User.where({ email: email }).findOne().then((data) => {
                if (data) {
                    res.status(200).json({ message: "User Already Exits" });
                } else {
                    var roleData =AdminroleData;
                    var newuserupdate={
                        email,
                        firstname,
                        lastname,
                        roleId,
                        password
                    }
                    if(req.file){
                        newuserupdate["profile"]=req.file.path;
                    }
                        const newuser=new User(newuserupdate)
                       newuser.populate("roleId");
                    newuser.save().then(async (data)=>{
                        const token=createJWT(data);
                        res.status(200).json({message:`Created A ${roleData.rolename} Successfully`,token:token,status:true});
                    })
                }
            })
        }else{
            res.status(422).json({message:`${is_valid.error}`});
        }
        
    } catch (error) {
        console.error(`Error Occured While User Adding- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }
}


exports.getuser=(req=request,res=response)=>{

    try {
        const {email}=req.body;
        User.where({email:email}).findOne().then((data)=>{
            if(data){
                res.status(200).json({data:data,status:true})
            }else{
                res.status(200).json({status:false,message:"username not exit"});
            }
        })
    } catch (error) {
        console.error(`Error Occured In GetUser- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }
}

exports.editUser=(req=request,res=response)=>{
    try {
        const is_valid=validateWith(EditUserSchema,req.body);
        if(is_valid.status){
            const {firstname,lastname,roleId,id}=req.body;
            var exitedUser={firstname,lastname};
            if(roleId){
                var roleData;
                Role.findById(roleId).then(roledata=>{
                    if(!roledata){
                        return res.status(422).json({message:"Given Role Is Not Defined",status:false});
                    }else{
                        roleData=roledata;
                    }
                })
            }
            if(req.file){
                newuserupdate["profile"]=req.file.path;
            }
            User.findOneAndUpdate({_id:id},exitedUser).then(data=>{
                const token=createJWT(data);
                // console.log(data);
                res.status(200).json({message:`Updated A ${roleData.rolename} Successfully`,status:true,token:token});
            })
        }else{
            res.status(422).json({message:`${is_valid.error}`,status:false})
        }
        
    } catch (error) {
        console.error(`Error Occured In editUser- Error : ${error}`);
        res.status(500).json({ message: "Error", status: false });
    }
}