const { model, Schema } = require("mongoose");


const InstanceSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalAmount: {
        type:Schema.Types.Number,
        required: true
    },
    balanceAmount:{
        type:Schema.Types.Number,
        required: true
    },
    fromDate: {
        type: Schema.Types.Date,
        required: true
    },
    toDate: {
        type: Schema.Types.Date,
        required: true
    },
    totalMonths: {
        type:Schema.Types.Number,
        required: true,
        default: 0
    },
    totalWeeks: {
        type:Schema.Types.Number,
        required: true,
        default: 0
    },
    totalDays: {
        type:Schema.Types.Number,
        required: true,
        default: 0
    },
    empId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    // payment should be in "months","weeks","days";
    payment: {
        type: String,
        required: true
    },
    singlePay: {
        type: Schema.Types.Number,
        required: true
    },
    lastEntry:{
        type: Schema.Types.Date,
        default:null
    },
    isCompleted: {
        type: Boolean,
        default: false
    },


}, {
    timestamps: true
})

const Instance = model("Instance", InstanceSchema);

module.exports = Instance;