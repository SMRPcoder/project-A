const {Schema,model}=require("mongoose");

const UserSchema= new Schema({
    firstname:{
        type:String,
        minlength:2,
        required:true
    },
    lastname:{
        type:String,
        minlength:1,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        bcrypt:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"Role"
    },
    profile:{
        type:String,
        required:false
    },
    mainId:{
        type:Schema.Types.ObjectId,
        
    }

},{
    timestamps:true
}).plugin(require("mongoose-bcrypt"),{
    fields:["password"],
    rounds:8
});


const User=model("User",UserSchema);
module.exports=User;