const { Schema, model } = require("mongoose");


const RolePermissionSchema=new Schema({
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"Role"
    },
    permission:{
        type:Schema.Types.Array
    }
},{
    timestamps:true
})


const RolePermission=model("RolePermission",RolePermissionSchema);

module.exports=RolePermission;