const imagekit = require("../utils/imagekit.js").initimagekit()
const path = require("path");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const internshipModel = require("../models/internship");
const jobModel = require("../models/job");
const students = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const { readinternships } = require("./employeController");
const ImageKit = require("imagekit");

exports.homepage = catchAsyncError(async (req,res,next)=>{
        res.json({message:"secure homepage"}); 
})

exports.currentloginuser = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.id).populate("appliedjobs").populate("appliedinternships").exec()
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


// exports.studentsendmail = catchAsyncError(async (req,res,next)=>{
//         const student = await students.findOne({email:req.body.email}).exec()
//         if(!student) {
//                 return next (new ErrorHandler("user not exist with this email. " , 404))
//         }
//         const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
//         sendmail(req,res,url,next)
//         student.resetPasswordToken = `1`
//         await student.save()
//         res.json({message : "mail has been succesfully sended !"}); 
//         res.json({student,url}); 
// })



exports.studentsendmail = catchAsyncError(async (req,res,next)=>{
        const student = await students.findOne({email:req.body.email}).exec()
        if(!student) {
                return next (new ErrorHandler("user not exist with this email. " , 404))
        }
        // const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
        const url = Math.floor(Math.random() * 9000 + 1000)
        sendmail(req,res,url,next)
        student.resetPasswordToken = `${url}`
        await student.save()
        res.json({message : "mail has been succesfully sended !"}); 
        res.json({student,url}); 
})

// exports.studentforgetlink = catchAsyncError(async (req,res,next)=>{
//         const student = await students.findById(req.params.id).exec()
//         if(!student) {
//                 return next (new ErrorHandler("user not not exist with this email. " , 404))
//         }
//         if(student.resetPasswordToken == "1"){
//                 student.resetPasswordToken = "0"
//                 student.password = req.body.password
//                 await student.save()
//         }
//         else{
//                 return next (new ErrorHandler("Invalid Reset Link" , 500))
//         }
//         res.status(200).json({
//                 message:"password succsesfully changed !"
//         })
// })


exports.studentforgetlink = catchAsyncError(async (req,res,next)=>{
        const student = await students.findOne({email:req.body.email}).exec()
        if(!student) {
                return next (new ErrorHandler("user not not exist with this email. " , 404))
        }
        if(student.resetPasswordToken == req.body.otp){
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
        // student.resetPasswordToken = "0";
        // student.password = req.body.password;
        // await student.save();
        // sendtoken(student, 200, res);
        // res.status(200).json({ message: "password successfull reset" });
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



// exports.studentavatar = catchAsyncError(async (req,res,next)=>{
//         const student = await students.findById(req.params.id).exec()
//         const file = req.files.avatar
//         const modifyfilename = `image-${Date.now()}${path.extname(file.name)}`
//         const {fileId , url} = await ImageKit.upload({
//                 file:file.data,
//                 fileName:modifyfilename
//         })
//         if(student.avatar !== ""){
//                 await ImageKit.deleteFile(student.avatar.fileId)
//         }
//         student.avatar = { fileId , url }
//         await student.save()
//         res.status(200).json({
//                 success: true,
//                 message:"Profile Pic Uploaded"
//         })
// })


// exports.studentphoto = catchAsyncError(async (req, res, next) => {
//   const student = await students.findById(req.params.id).exec();
//   const file = req.files.avatar;
//   const modifiedfileName = `resumebuilder-${Date.now()}${path.extname(
//     file.name
//   )}`;
//   const { fileId, url } = await ImageKit.upload({
//     file: file.data,
//     fileName: modifiedfileName,
//   });

//   if (student.avatar.fileId !== "") {
//     await ImageKit.deleteFile(student.avatar.fileId);
//   }

//   student.avatar = { fileId, url };
//   await student.save();

//   res
//     .status(200)
//     .json({ success: true, message: "file uploaded successfully" });
// });

exports.studentphoto = catchAsyncError(async (req,res,next)=>{
   const student = await students.findById(req.params.id).exec()
   const file = req.files.avatar   
   const modifiedfilename = `profileimage-${Date.now()}${path.extname(
        file.name
   )}`  
   if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId)
   }
   const {fileId , url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedfilename
   })
   student.avatar.fileId = { fileId:fileId , url }
   await student.save()
   res.status(200).json({
        success:true,
        message: "file uploaded successfully"
   })
});






// ---------------------read internships-------------------------

exports.readinternships = catchAsyncError(async (req, res, next) => {
  const internships = await internshipModel.find().exec();
  res.status(200).json({ internships });
});

// ---------------------read single internships-------------------------

exports.readsingleinternships = catchAsyncError(async (req, res, next) => {
        const internship = await internshipModel.findById(req.params.id).exec()
        res.status(200).json({ internship });
});
      

// ---------------------read jobs-------------------------

exports.readjobs = catchAsyncError(async (req, res, next) => {
  const jobs = await jobModel.find().exec();
  res.status(200).json({ jobs });
});

// ---------------------read single job-------------------------

exports.readsinglejob = catchAsyncError(async (req, res, next) => {
        const job = await jobModel.findById(req.params.id).exec()
        res.status(200).json({ job });
});
      



// ---------------------apply internships-------------------------

exports.applyinternship = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.id).exec()
        const internship = await internshipModel.findById(req.params.internshipid).exec()
        student.appliedinternships.push(internship._id)
        internship.students.push(student._id)
        await student.save()
        await internship.save()
        res.json({student})
})


// ---------------------apply jobs--------------------------------


exports.applyjob = catchAsyncError(async (req,res,next)=>{
        const student = await students.findById(req.id).exec()
        const job = await jobModel.findById(req.params.jobid).exec()
        student.appliedjobs.push(job._id)
        job.students.push(student._id)
        await student.save()
        await job.save()
        res.json({student})
        // console.log({student})
})



exports.findstudents = catchAsyncError(async (req,res,next)=>{
        const { data } =await students.find().exec()
        res.json(data)
})




