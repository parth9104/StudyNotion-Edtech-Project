const user = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const user = require("../models/user");
const { JsonWebTokenError } = require("jsonwebtoken");
const bcrypt = require(bcrypt);
const jwt = require(JsonWebToken);
require("dotenv").config();
//send otp
exports.sendOTP = async(req,res)=>{
    try{
        //fetch email from request body
        const {email} = req.body;

        //check if user already exist
        const checkUserPresent = await UserActivation.findOne({email});

        //if user already exist then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'user already registered'
            })
        }
        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("otp generated ",otp);

       //check unique otp or not
       let result  = await OTP.findOne({otp:otp});
       while(result){
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
         result  = await OTP.findOne({otp:otp});
    }
    
    const otpPayload = {email,otp};
    //create an entry for otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpbody);

    //return response successfully
    res.status(200).json({
        succes:true,
        message:'otp sent successfully',
        otp
    })
}
catch(error){
    console.log(error);

    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
};



//sign up
exports.signup = async(req,res)=>{
    //fetch data from request body
    try{const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    }=req.body;
    //validate
    if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
        return res.status(403).json({
            success:false,
            message:"all fields are required",
        })
    }
    //matching password
    if(password != confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirmpassword does not match",

        });
    }
    //check user already exist or not
    const exitingUser = await user.findOne({Email});    //400 bad request server cannot or will not request a reponse
    if(exitingUser){
        return res.status(400).json({
            success:false,
            message:"user already exist",

        });

    }

    //find most recent otp for the user 

    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    //validate otp
    if(recentOtp.length ==0){
        //otp not found
        return res.status(400).json({
            success:false,
            message:"otp found",
        });

    }
    else if(otp != recentOtp.otp){
        return res.status(400).json({
            success:false,
            message:"Invaid otp",
        });
    }
    //hashing  a password usign bcrypt
    const hashesPassword = await bcrypt.hash(password,10);

    //entry create in DB 

    const profileDetails = await Profile.create({
     gender:null, 
     dateOfBirth:null,
     about:null,
     contactNumber:null,
   });
    const user  = await user.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashesPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/6.x/initials/svg?seed=Felix${firstName} ${lastName}`,
    })  
    //return reponse
    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user
    });
}
catch(error){
    console.log(errror);
    return res.status(500).json({
        success:false,
        message:"user cannot be registers try again",
    });
}
};
//login
exports.login = async(req,res)=>{
 try{
    //get data from req body
    const{email,password} = req.body;
    //validation data
    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"All fields are rrequired please try again",
        });
    } 
    //user check exist or not
    const user  = await user.findOne({email}).populate("additionalDetails");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"user is not registered sign up first",
        })
    }
    //generate JWT after password matching 
    if(await bcrypt.compare(password,user.password)){
        const payLoad = {
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }
        const token = jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        user.token = token;
        user.password=undefined;

        //creat cookie and response
        const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            succes:true,
            token,
            user,
            message:"login successfully",
        })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"password is incorrect",
        })
    }
 }
 catch(error)
 {

    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Login Failure please try again"
    });
 }
};
//change password

