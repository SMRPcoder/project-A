const {Schema,model}=require("mongoose");

const EntrySchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    empId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    instanceId:{
        type:Schema.Types.ObjectId,
        ref:"Instance",
        required:true
    },
    paidAmount:{
        type:Number,
        required:true
    },
    totalPending:{
        type:Number,
        required:true
    },
    pendingMonths:{
        type:Number,
        required:true
    },
    pendingWeeks:{
        type:Number,
        required:true
    },
    pendingDays:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Entry=model("Entry",EntrySchema);

module.exports=Entry;