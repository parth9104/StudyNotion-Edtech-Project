const profile = require("../models/profile");
const user  = require("../models/user");

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
            const profileDetails = await profile.findById(profileId);


            //update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;
            await profile.save();

            //return response

            return res.status(200).json({
                success:true,
                message:'Profile Updated successfully',
                profileDetails,
            })

    }
    catch(error){
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
              const userDetails = await user.findById(id);
              if(!userDetails){
                return res.status(404).json({
                    success:false,
                    messgae:'user not found',
                });
              }
              //delete profile

              await profile.findByAndDelete({_id:userDetails.additionalDetails});
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
exports.getAllUserDetails = async(req,res)=>{
    try{
          //getid
          const id = req.user.id;
          //validation and userdetails
          const userDetails = await user.findById(id).populate.exec();
          //return response
          return res.status(200).json({
            success:true,
            message:'user data fetch successfully',

          });

    }
    catch(error){return res.status(500).json({
        success:false,
        error:error.message,
    });


    }
}
