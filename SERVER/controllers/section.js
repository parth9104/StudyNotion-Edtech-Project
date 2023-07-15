const section = require("../models/section"); 
const course =  require("../models/course");
const { response } = require("express");

exports.createSection  = async(req,res)=>{
    try{
      //fetch data
      const{sectionName, courseId} = req.body;
      //data validation
      if(!sectionName || !courseId){
        res.status(400).json({
            suceess:false,
            message:"missing properties",
        });
      }
      //create section 
      const newSection  = await section.create({sectionName});
      //update course with section objectID
      const updateCourseDetails = await course.findByIdAndUpdate(
        courseId,
        {
        $push:{
            courseContent:newSection._id,
        }
    },
    {new:true},
      );

      //return response
      return res.status(200).json({
        success:true,
        message:"section created successfully",
        updateCourseDetails,
      })       
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"unable to create section please try again Inernal server error",
            error:error.message,
        });
    }
}

//middleware function reponse handler
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
exports.deleteSection = async(req,res)=>{
    try{
         //getByID
         //use findbyidanddelete
         //return response

                  //getByID --assuming that we are sendingID in params
                  const {sectionId} = req.params
                  //user findByIdAndDelete
                  await section.findByIdAndDelete(sectionId);
                //   return response
                return res.status(200).json({
                    success:true,
                    message:"section deleted successfully"
                })


    }
    catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};