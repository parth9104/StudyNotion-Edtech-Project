const mongoose = require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedToplogy:true,
    })
    .then(()=>console.log("DB connected succesfullt"))
    .catch((error)=>{
     console.log("DB connection failed");
     consolo.log(error);
     process.exit(1);
    })
};