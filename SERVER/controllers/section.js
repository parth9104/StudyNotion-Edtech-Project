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
            message:"unable to create section please try again",
            error:error.message,
        });
    }
}

//middleware function reponse handler
exports.updateSection = async(req,res)=>{
try{
     //data input
     //data validation
     //update data 
     //return response

     //data input
     const{sectionName,sectionId} = req.body;
     //data validation 
     if(!sectionName || !sectionId){
        return res.status(400).json({
            success:false,
            message:"missing property",

        });
     }
//update data

const section = await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
//return res
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
}

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
    catch(error){

        return res.status(500).json({
            success:false,
            message:"unable to delete section please try again",
            error:error.message,
        });
    }
}