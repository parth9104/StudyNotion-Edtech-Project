const{instance}  = require("../config/razorPay");
const course = require("../models/course");
const user = require("../models/user");
const mailSender = require("../utils/mailSender");
const {courseEnrollemnetEmail} = require("../mail/templates/courseEnrollmentEmail");


//capture the payment and intiates the razorpay payment

exports.capturePayment = async(req,res)=>{
    try{
        //get courseId and userID
        //validation
        //valid courseID
        //valid coursedetails
        //user already pay for the same course
        //order create 
        //return repsonse


        //get courseID and userID
        const {course_id} = req.body;
        const userId = req.user.id;

        //validation 
        if(!course_id){
            return res.status(400).json({
                success:false,
                message:'pleas provide valid course id',
            });
        }
        //valid course details
        let course;
        try{

        }
        catch{
            
        }
    }
    catch(error){

    }
}
