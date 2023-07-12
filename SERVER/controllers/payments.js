const { instance } = require("../config/razorPay");
const course = require("../models/course");
const user = require("../models/user");
const mailSender = require("../utils/mailSender");
const { courseEnrollemnetEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and intiates the razorpay payment

exports.capturePayment = async (req, res) => {
    
        //get courseId and userID
        //validation
        //valid courseID
        //valid coursedetails
        //user already pay for the same course
        //order create 
        //return repsonse


        //get courseID and userID
        const { course_id } = req.body;
        const userId = req.user.id;

        //validation 
        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: 'please provide valid course id',
            });
        };
        //valid course details
        let course;
        try {
            course = await course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message: 'could not find the course',
                });
            }

            //user already pay for the same course 
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:true,
                    message:'student already enrolled',
                })
            }

        }
        
    
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })


    }



//order create 
const amount  = course.price;
const currency = "INR";

const options = {
    amount:mount*100,
    currency,
    receipt:Math.random(Date.now().toString),
    notes:{
     courseId : course_id,
     userId, 
    }
};

try{
//intiate the payment using razorpay
const paymentResponse = await instance.order.create(options);
console.log(paymentResponse);
//return reponse
return res.status(200).json({
    success:true,
    courseName:course.courseName,
    courseDescription:course.courseDescription,
    thumbNail:course.thumbNail,
    orderId:paymentResponse.id,
    currency:paymentResponse.currency,
    amount:paymentResponse.amount,
});
}
catch(error){
console.log(error);
res.json({
    success:false,
    message:'could not intiliaze the order',
});
}
}
//verify signature for razorpay and server
exports.verifySignature = async(req,res)=>{
  const webhooksecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256",webhooksecret);
  shasum.update(JSON.stringify(req.body));
  const digest  = shasum.digest("hsx");

  if(signature == digest){
    console.log("Pyament is authorized");

    const{courseId,userId}=req.body.payLoad.payment.entity.notes;
    try{
        //fullfill the section
        //find the course and enroll the student in it 

        const enrolledCourse = await course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new:true},
        );
        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:'course not found',
            });
        } 
        console.log(enrolledCourse);

        //find the student and add to the course to theri list enrolled courses 
        const enrolledStudent  = await user.findOneAndUpdate(
            {_id:userId},
            {$push:{userId}},
            {new:true},
        );
        console.log(enrolledStudent);

        //sending confirmation email
       const emailResponse = await mailSender(
        enrolledStudent.email,
        "congratulations",
        "you are onboarded to new course"
       );
       console.log(emailResponse);
       return res.status(200).json({
        success:true,
        message:'signature verified and course added'
       });
    }
    
    catch(error){
      console.log(eror);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }
  }
  else{
    return res.status(400).json({
        success:false,
        message:'Invalid request',
    })
  }

};