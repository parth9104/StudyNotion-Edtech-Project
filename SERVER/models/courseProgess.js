const mongoose = require("mongoose");
const courseProgressSchema = new mongoose.Schema({
  
  courseID:{
    type:mongoose.Schema.type.obejctId,
    ref:"Course",
  },
  completedVideos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsection",
  }]

});

module.exports = mongoose.model("courseProgress",courseProgressSchema);
