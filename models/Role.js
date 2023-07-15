const {Schema,model}=require("mongoose");

const RolesSchema=new Schema({
    rolename:{
        type:String,
        minlength:2,
        required:true
    }
},{
    timestamps:true
})

const Role=model("Role",RolesSchema);
module.exports=Role;
