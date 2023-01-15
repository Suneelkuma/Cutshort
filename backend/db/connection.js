const mongoose=require('mongoose')
const DB=process.env.DATABASE;
mongoose.connect(DB)
.then(()=>console.log("connections successfull"))
.catch((error)=>console.log(error))
//middleware

const middleware=(req,res,next)=>{
console.log('hello middleware');
}