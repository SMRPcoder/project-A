// mongodb+srv://rajapandeeswarans369:<password>@cluster0.lvpiawy.mongodb.net/
//8R9WassnzoshmQcX
require("dotenv").config();
const mongoose= require("mongoose");


const username=process.env.MONGOUSER;
const password=process.env.MONGOPASS;
console.log(username,password)
const onlineCluster="cluster0.lvpiawy.mongodb.net";
// const dbname="sample-mflix";
const dbname="test";


module.exports=()=>{mongoose.connect(`mongodb+srv://${username}:${password}@${onlineCluster}/${dbname}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("connection established successfully");
})
.catch(err=>{
    console.error(`Something Happend While Connecting To Mongo Server!! - ${err}`)
})

}