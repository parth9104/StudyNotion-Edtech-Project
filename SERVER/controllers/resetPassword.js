const user = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
//resetpassword token
exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};









































// exports.resetPasswordToken = async (req, res) => {

//     try{
//  //get email from request body
// const email = req.body.email;
// //check user for this email,email validation

// const user  = await user.findOne({email:email});
// if(!user){
//     return res.json({
//         success:false,
//         message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
//     });
// }
// //generate token
// const token = crypto.randomBytes(20).toString("hex");
// //update user by adding token and expiration time
// const userDetails = await user.findOneandUpdate(
//     {email:email},
//     {token:token,
//     resetPasswordExpires: Date.now()+5*60*1000,},
//     {new:true}
// );
// //create url
// const url = `http://localhost:3000/update-password/${token}`;
// //send mail containing the url
// await mailSender(email,
//     "password link",
//     `password reset link:${url}`);

//     //return reponse
//     return res.json({
//         success:true,
//         message:"email sent successfully please check your mail and change pwd"
//     });

// }
// catch(error){
//     console.log(error);
//     return res.status(500).json({
//         success:false,
//         message:"something went wrong while sending mail"
//    });
// }
// }

// //reset password
// exports.resetPassword = async(req,res)=>{
//     try{
//     //data fetch
//     const {password,confirmPassword,token} = req.body;
    
//     //validation
//     if(password != confirmPassword){
//         return res.json({
//             success:false,
//             message:'password not matching',
//         });
//     }

//     //get user details from user using token 
//     const userDetails = await user.findOne({token:token});
//     // if no entry - invalid token

//     if(!userDetails){
//         return res.json({
//             success:false,
//             message:'token is invalid',
//         });

//     }
//     //token time check
//     if(userDetails.resetPasswordExpires<Date.now()){
//         return res.json({
//             success:false,
//             message:'token is expired please regenarte your token',
//         });
//     }
//     //hash pwd 
//     const hashedPassword = await bcrypt.hash(password,10);
//     //pasword update
//     await user.findOneAndUpdate(
//         {token:token},
//         {password:hashedPassword},
//         {new:true},
//     );
//     //return response
//     return response.status(200).json({
//         success:true,
//         messgae:"password reset successfully",
//     });
// }
// catch(error){
//     console.log(error);
//     return res.status(500).json({
//         success:false,
//         message:"something went wrong while sending mail"
//    });
// }
// }
