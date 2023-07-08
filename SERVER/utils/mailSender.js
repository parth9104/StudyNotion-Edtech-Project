const nodeMailer = require("nodemailer");
const mailSender = async(email,title,body)=>{

try{
    let trnasport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }   
    })
    let info = await trasnporter.sendMail({
        from:'StudyNotion || codehelp-by babbar',
        to:`${email}`,
        email:`${title}`,
        html:`${body}`,

    })
    console.log(info);
    return info;
}
catch(error){
    console.log(error.message);
}
}
module.exports  = mailSender;