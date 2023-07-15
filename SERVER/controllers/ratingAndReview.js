const RatingAndReview = require("../models/ratingAndReviews");
const Course = require("../models/course");
const { default: mongoose } = require("mongoose");

//create Rating
exports.createRating = async (req, res) => {
    try {
        //get userid
        //fetchdata from req body
        //check if user is enrolled or not 
        //check if user already review the course
        //create rating and review
        //update course with this rating/review
        //return response


        //get user id
        const userId = req.body;

        //fetchdata from req body
        const { rating, review, courseId } = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: { eleMatch: { $eq: userId } },
        });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'student is not enrolled in the course',
            });
        }

        //check if user already review the course 
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'course is already reviewd by the user',
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId,
        });

        //upgrade course with rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true });

        //update course with rating and review

        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: 'Rating and review created successfully',
            ratingReview,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })


    }
}
//get averageRating
exports.getAverageRating = async (req, res) => {
    try {
           //get course id
           //calculate average rating 
           //return averge id 

           //get course id 
           const courseId = req.body.courseId;
        
        //calculate average rating
         const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
              $group:{
                _id:null,
                averageRating:{$avg:"$rating"},
              }
            }
        ])
        //return string 
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating and review exist
        return res.status(200).json({
            success:true,
            message:'Average rating is 0, no rating given till now',
            averageRating:0,
        })
        }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//get allrating and reviews
exports.getAllRating = async(req,res)=>{
    try{
         const allReviews = await RatingAndReview.find({})
         .sort({rating:"desc"})
         .populate({
            path:"user",
            select:"firstname lastname email image",
         })
         .populate({
            path:"course",
            course:"courseName"
         })
         .exec();
         return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
         })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


//category page details
exports.categoryPageDetails = async(req,res)=>{
    try{
           //getcourseid
           //get course for specified categoryid
           //validation
           //getcourse for different category
           //get top selling course
           //return response

           //getCategoryID
           
           const{categoryId} = req.body;
           //get course for specified categoryid
      const selectedCategory = await Category.findById(categoryId)
                             .populate("courses")
                             .exec();

                             //validation
                             if(!selectedCategory){
                                return res.status(404).json({
                                    success:false,
                                    message:'data not found',
                                });
                             }
                             //get courses for different category
                             const differentCategories = await Category.find({
                                _id: {$ne:categoryId},
                             })
                             .populate("courses")
                             .exec()
                            
                             //return response
                             return res.status(200).json({
                                success:true,
                                data:{
                                    selectedCategory,
                                    differentCategories,
                                },
                             });
            }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}