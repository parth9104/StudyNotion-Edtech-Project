const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { isAsyncFunction } = require("util/types");
const { functions } = require("lodash");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});
//a fucntion to send mail
async function sendVerificationEmail(email,otp){
try{
const mailResponse = await mailSender(email,"Verfication email from studynotion",otp);
console.log("email send succesfully",mailResponse);
}
catch(error){
    console.log("error occured while sending mails:",error);
    throw error;
}
}
// using pre hook from mongoose also known as middleware
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",OTPSchema);
