const jwt = require(jsonwebtoken);
require("dotenv").config();
const user = require("../models/user");

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Autherization").replace("Bearer", "");

        //if token is missing return reponse
        if (!token) {
            return res.status(401).json({
                success: false,
                messgae: "token is missing",
            });
        }
        //verify the token usign secret key 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });

        }
        next();
    }


    catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while validating a token",
        });
    }
}
//isstudent
exports.isStudent = async (req, res, next) => {
    try {
         if(req.user.accountType !== "student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student only",
            });
         }
         next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating a token",
        });
    }
}
//isinstructor
exports.isInstructor = async (req, res, next) => {
    try {
         if(req.user.accountType !== "instructor"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for instructor only",
            });
         }
         next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating a token",
        });
    }
}
//isstudent
exports.isAdmin = async (req, res, next) => {
    try {
         if(req.user.accountType !== "admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin only",
            });
         }
         next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating a token",
        });
    }
}
