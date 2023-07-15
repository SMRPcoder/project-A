const { Schema, model } = require("mongoose");

const MenuSchema=new Schema({
    name:{
        type:String,
        required:true

    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:"Menu",
        default:0
    },
    status:{
        type:Boolean,
        required:true
    }

},{
    timestamps:true
});


const Menu=model("Menu",MenuSchema);

module.exports=Menu;