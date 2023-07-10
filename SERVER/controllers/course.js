const course = require("../models/course");
const Course = require("../models/course");
const Tag  = require("../models/tags");
const User = require("../models/user");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//createCourse Handler function 

exports.createCourse =async(req,res)=>{
    try{
       //fetch data
       const{courseName,courseDescription,whatYouWillLearn,price,tag} = req.body;
       //get thumbnail
       const thumbnail = req.files.thumbnailImage;
       //validation
       if(!courseName ||!courseDescription||!whatYouWillLearn||!price||!thumbnail){
        return res.status(400).json({
            success:false,
            message:'All fields are required',
        });
       }
       //check for instructor
       const userId = req.user.id;
       const instructorDetails = await User.findById(userId);
       console.log("Instructor Details:",instructorDetails);

       if(!instructorDetails){
        return req.status(404).json({
            success:false,
            message:'instructor details not found',
        });
       }
       //check tag details are not valid or not
          const tagDetails = await Tag.findById(tag);
          if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:'tag details not found',
            });
          }
          //upload image top cloudinary
          const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

          //create an entry for new course
          const newCourse = await course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWilllearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
          });

          //add the new course to user schema of instructor

          await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true},
            );

          //return response

          return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse,
          });
    }

    
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to create course",
            error:error.message,
        })

    }
};


//getallhandler function 
exports.showAllCourses = async(req,res)=>{
    try{
         const allCourses = await course.find({});

         return res.status(200).json({
            success:true,
            message:"Data for all courses fetch successfully",
            data:allCourses,
         })
    }
    catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"cannot fetch course data",
    error:error.message,
})

    }
}