const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
courseName:{
    type:String,
},
courseDescription:{
    type:String,
},
instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
},
whatYouWilllearn:{
    type:String,
},
courseContent:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }
],
ratingAndReviews:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReviews",
    }
],
price:{
    type:Number,
},
thumbnail:{
    type:String,
},
tag:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"tag",
},
studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
}]
});

module.exports = mongoose.model("course",courseSchema);
