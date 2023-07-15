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
       if(!sectionId||!title||!video||!description){
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
            data:uppdatedSection,
           });
    }
    catch(error){
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)

        return res.status(500).json({
            success:false,
            message:"unable to delete section please try again",
            error:error.message,
        });
    }
}

//updatesection
  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, title, description } = req.body
      const subSection = await SubSection.findById(sectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      return res.json({
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }