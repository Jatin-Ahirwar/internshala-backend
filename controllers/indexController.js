const ImageKit = require("../utils/imagekit").initimagekit();
const path = require("path");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const student = require("../models/studentModel");
const students = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");

exports.homepage = catchAsyncError(async (req,res,next)=>{
        res.json({message:"secure homepage"}); 
})

exports.currentloginuser = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.id).exec()
        res.json({student}); 
})

exports.studentsignup = catchAsyncError(async (req,res,next)=>{
        const student = await new students(req.body).save()
        sendtoken(student,201,res)
        // res.json(req.body)
})


exports.studentsignin = catchAsyncError(async (req,res,next)=>{
        const student = await students.findOne({email : req.body.email}).select("+password").exec()
        if(!student) {
                return next (new ErrorHandler("user not not exist with this email. " , 404))
        }
        const ismatch = student.comparepassword(req.body.password)
        if(!ismatch){
                return next (new ErrorHandler("wrong Credentials",500))
        }
        sendtoken(student,201,res)
})

exports.studentsignout = catchAsyncError(async (req,res,next)=>{
        res.clearCookie("token")
        res.json({message:"signed out succesfully"})
})

exports.studentsendmail = catchAsyncError(async (req,res,next)=>{
        const student = await students.findOne({email:req.body.email}).exec()
        if(!student) {
                return next (new ErrorHandler("user not exist with this email. " , 404))
        }
        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
        sendmail(req,res,url,next)
        student.resetPasswordToken = "1"
        await student.save()
        res.json({student,url}); 
})

exports.studentforgetlink = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.params.id).exec()
        if(!student) {
                return next (new ErrorHandler("user not not exist with this email. " , 404))
        }
        if(student.resetPasswordToken == "1"){
                student.resetPasswordToken = "0"
                student.password = req.body.password
                await student.save()
        }
        else{
                return next (new ErrorHandler("Invalid Reset Link" , 500))
        }
        res.status(200).json({
                message:"password succsesfully changed !"
        })
})


exports.studentresetpassword = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.id).exec()
        student.password = req.body.password
        await student.save()
        sendtoken(student , 201 ,res)
})

exports.studentupdate = catchAsyncError(async (req,res,next)=>{
        await students.findByIdAndUpdate(req.params.id,req.body).exec()
        res.status(200).json({
                success:true,
                message:"student updated successfully"
        })
})



exports.studentavatar = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.params.id).exec()
        const file = req.files.avatar
        const modifyfilename = `image-${Date.now()}${path.extname(file.name)}`
        const {fileId , url} = await ImageKit.upload({
                file:file.data,
                fileName:modifyfilename
        })

        if(student.avatar !== ""){
                await ImageKit.deleteFile(student.avatar.fileId)
        }
        student.avatar = { fileId , url }
        await student.save()
        res.status(200).json({
                success: true,
                message:"Profile Pic Uploaded"
        })
})




