const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")

exports.sendmail = (req,res,url,next) =>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD
        }
    })
    const mailoptions = {
        from:"Tech Private Limited",
        to:req.body.email,
        subject:"Password Reset Link",
        html:`<h1>click link below to reset password</h1>
                <a href="${url}">Password Reset Link</a>`
    }
    transport.sendMail(mailoptions,(err,info) =>{
        if(err) return next (new ErrorHandler(err , 500))
        console.log(info)
        return res.status(200).json({
            message:"mail sent successfully",
            url
        })
    })
}