

const validate=(Schema)=>{
    return (req,res,next)=>{
        const {error}=Schema.validate(req.body);
        // console.log(req.body);
        if(error){
            console.error(`Error: ${error}`);
            return res.status(400).json({ message: error.details[0].message,status:false });
        }else{
            req.validate=1;
            next();
        }
    }
}

const validateWith=(Schema,Object)=>{
    const {error}=Schema.validate(Object);
    if(error){
        return {status:false,error:error.details[0].message};
    }else{
        return {status:true};
    }
}


module.exports={validate,validateWith};