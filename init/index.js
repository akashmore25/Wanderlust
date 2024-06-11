const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
 
// 8. step|| here we initalized data for testing or inseting dami data

const mongoUrl = 'mongodb://127.0.0.1:27017/wanderlast';
main().then((res)=>{
    console.log("connected successfully to DB init!")
})  
.catch((err)=>{
    console.log(err);
})

async function main(){
 await  mongoose.connect(mongoUrl);
}

const initDB = async()=>{
    await Listing.deleteMany({});
initData.data=   initData.data.map((obj)=>({...obj,owner:'660a5f7c16f45fe96b3ac0fc'}));
    await Listing.insertMany(initData.data);
    console.log("data was initaalized");
}

initDB();
