const Tag = require("../models/tags");

//create a tag handler function 
exports.createTag = async(req,res)=>{
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
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        //return reponse
        return res.status(200).json({
            success:true,
            message:"tag created successfully",
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

exports.getAllTags = async(req,res)=>{
try{
const allTags = await Tag.find({},{name:true,descirption:true});
res.status(200).json({
    success:true,
    message:"all tag return successfully",
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