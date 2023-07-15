const mongoose = require("mongoose");
// Define the Tags schema

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
],
});

module.exports = mongoose.model("category",categorySchema);
