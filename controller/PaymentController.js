const { request, response } = require("express");
const moment =require("moment");
const Instance = require("../models/Instance");
const Entry = require("../models/Entry");
const { manipulateDate, calculateDifference  } = require("../functions/function");



exports.AssignAmount=(req=request,res=response)=>{
    try {
        const {customerId,totalAmount,fromDate,totalMonths,totalWeeks,totalDays,empId,payment}=req.body;
        Instance.where({customerId:customerId,isCompleted:false}).findOne().then(data=>{
            if(data){
                res.status(200).json({message:"Already Have A Instance in Active",status:false});
            }else{
                var instanceData=req.body;
                var monthORweek= totalMonths?totalMonths:totalWeeks?totalWeeks:totalDays;
                var singlePay= Math.round(totalAmount/monthORweek);
                console.log(singlePay);

                // payment should be in "months","weeks","days";
                var toDate=manipulateDate(fromDate,monthORweek,payment)
                instanceData["singlePay"]=singlePay;
                instanceData["toDate"]=toDate;
                instanceData["balanceAmount"]=totalAmount;

                const newInstance=new Instance(instanceData);
                newInstance.populate("customerId");
                newInstance.populate("empId");
                newInstance.save().then(()=>{
                    res.status(200).json({message:"Assigned A Instance Successfully",status:true});
                })

            }
        })
    } catch (error) {
        console.error(`Error While Assigning Customer's Instance - ${Error}`);
        res.status(500).json({message:"Error While Assigning Customer's Instance",status:false});
    }
}

exports.listInstance=(req=request,res=response)=>{
    try {
        Instance.where({isCompleted:false,empId:req.user_id,lastEntry:{$ne:moment().format("YYYY-MM-DD")}}).find().select("_id").populate("customerId",["_id","firstname","lastname"]).then(data=>{
            res.status(200).json({data:data,status:true})
        })
    } catch (error) {
        console.error(`Error While Listing Instance - ${error}`);
        res.status(500).json({message:"Error While Listing Instance",status:false});
    }
}


exports.AddEntry=(req=request,res=response)=>{
    try {
        const {customerId,paidAmount,instanceId}=req.body;
        Instance.where({_id:instanceId,isCompleted:false}).findOne().then(data=>{
            if(data){
                console.log(data);
                var newEntryData=req.body;
                newEntryData["empId"]=req.user_id;
                newEntryData["totalPending"]=(data.balanceAmount-paidAmount);
                var pendings=calculateDifference( moment().format('YYYY-MM-DD'),data.toDate);
                newEntryData["pendingMonths"]=pendings.months;
                newEntryData["pendingWeeks"]=pendings.weeks;
                newEntryData["pendingDays"]=pendings.days;
                const newEntry=new Entry(newEntryData);
                newEntry.populate("empId");
                newEntry.populate("instanceId");
                newEntry.populate("customerId");
                newEntry.save().then(async ()=>{
                    await Instance.findOneAndUpdate({_id:instanceId,isCompleted:false},{
                        balanceAmount:newEntryData["totalPending"],
                        lastEntry:moment().format("YYYY-MM-DD")
                    }).exec();
                    res.status(200).json({message:"Added a Entry Successfully",status:true})

                })
            }
        })
    } catch (error) {
        console.error(`Error While Adding Entry - ${error}`);
        res.status(500).json({message:"Error While Adding Entry",status:false});
    }
}

exports.viewEntries=(req=request,res=response)=>{
    try {
        Entry.where({empId:req.user_id}).find().then(data=>{
            res.status(200).json({data:data,status:true});
        })
    } catch (error) {
        console.error(`Error While Fetching Entries - ${error}`);
        res.status(500).json({message:"Error While Fetching Entries",status:false});
    }
}

