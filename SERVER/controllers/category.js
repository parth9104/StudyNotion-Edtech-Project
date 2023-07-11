const Tag = require("../models/category");

//create a tag handler function 
exports.createCategory = async(req,res)=>{
    try{
        //taking out data
        //fetch data
        const{name,description} = req.body;
        //validation
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }
        //create entry in DB 
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        //return reponse
        return res.status(200).json({
            success:true,
            message:"category created successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            sucess:false,
            message:error.message,
        })
    }

};

//getAlltags handler function

exports.getAllCategory = async(req,res)=>{
try{
const allTags = await Tag.find({},{name:true,descirption:true});
res.status(200).json({
    success:true,
    message:"all cateogry return successfully",
    allTags,

})
}
catch(error){
return res.status(500).json({
    success:false,
message:error.message,
})
}
};