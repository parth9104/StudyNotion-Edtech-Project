const subSection = require("../models/subSection");
const section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create subsection 

exports.createSubSection = async(req,res)=>{
    try{
    //fetch data from req body
    //extract file/video
    //validation 
    //upload video to cloudinary
    //create a sub section 
    //update section with this sub section obj id
    //return response

        //fetch data from req body
const{sectionId,title,timeDuration,description} = req.body;
    //extract file/video
       const video = req.files.videoFile;
       //validation
       if(!sectionId||!title||!timeDuration||!description){
        return res.status(400).json({
            success:false,
            message:"all fields are required",
        });
       }
       //upload video to cloudinary
       const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

       //create a sub section 
       const subSectionDetails = await subSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,

           });

           //update section with this sub section obj id

           const uppdatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {$push:{
                subSection:subSectionDetails._id,
            }},
            {new:true});
           //return response
           return res.status(200).json({
            success:true,
            message:"sub section created successfully",
            uppdatedSection,
           });
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"unable to delete section please try again",
            error:error.message,
        });
    }
}

//updatesection
try{
    return res.status(200).json({
        success:true,
        message:"section updated successfully",
    });
    
    }
    catch(error){
    
        return res.status(500).json({
            success:false,
            message:"unable to create section please try again",
            error:error.message,
        });
    }
    