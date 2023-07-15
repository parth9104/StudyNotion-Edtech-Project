const profile = require("../models/profile");
const user  = require("../models/user");
// Method for updating a profile

exports.updateProfile = async(req,res)=>{
    try{
            //get data
            //get userID
            //validation 
            //find profile 
            //update profile
            //return response

            //get data
            const{dateOfBirth = "",about="",contactNumber,gender} = req.body;
            //get userId
            const id = req.user.Id;
            //validation 
            if(!contactNo|| !gender ||!id){
                return res.status(400).json({
                    success:false,
                    message:'all fields are required',
                });
            }
            //find profile
            const userDetails = await user.findById(id);
            const profileId = userDetails.additionalDetails;
            const profile = await profile.findById(profileId);


            //update profile
            profile.dateOfBirth = dateOfBirth;
            profile.about = about;
            profile.contactNumber = contactNumber;
            await profile.save();

            //return response

            return res.status(200).json({
                success:true,
                message:'Profile Updated successfully',
                profile,
            })

    }
    catch(error){
    console.log(error);

return res.status(500).json({
    success:false,
    error:error.message,
})
    }
}


// delete account

exports.deleteAccount = async(req,res)=>{
    try{
              //getID
              //validation
              //delete profile
              //delete user
              //return response

              //getID
              const id = req.user.id;
              //validation
              const user = await user.findById(id);
              if(!user){
                return res.status(404).json({
                    success:false,
                    messgae:'user not found',
                });
              }
              //delete profile

              await profile.findByAndDelete({_id:user.userDetails});
              //delte user
              await user.findByIdAndDelete({_id:id});

              //return response
              return res.status(200).json({
                success:true,
                message:'user deletes successfully',

              })
    }
catch(error){
return res.status(500).json({
    success:false,
    message:'user cannot deleted successfully',
});
    }
};

//get all userdetails
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};