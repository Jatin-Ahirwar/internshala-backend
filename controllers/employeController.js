const ImageKit = require("../utils/imagekit").initimagekit()
const path = require("path");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const employes = require("../models/employeModel");
const jobModel = require("../models/job");
const internshipModel = require("../models/internship");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/employeSendToken");
const { sendmail } = require("../utils/nodemailer");

exports.homepage = catchAsyncError(async (req,res,next)=>{
        res.json({message:"secure homepage"}); 
})

exports.currentEmploye = catchAsyncError(async (req, res, next) => {
  const employe = await employes.findById(req.id)
    .populate("job")
    .populate("internship")
    .exec();
  res.json(employe);
});


exports.employesignup = catchAsyncError(async (req,res,next)=>{
    const employe = await new employes(req.body).save()
    sendtoken(employe,201,res)
})


exports.employesignin = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findOne({email : req.body.email}).select("+password").exec()
    if(!employe) {
            return next (new ErrorHandler("user not exist with this email. " , 404))
    }
    const ismatch = employe.comparepassword(req.body.password)
    if(!ismatch){
            return next (new ErrorHandler("wrong Credentials",500))
    }
    sendtoken(employe,201,res)
})

exports.employesignout = catchAsyncError(async (req,res,next)=>{
    res.clearCookie("token")
    res.json({message:"signed out succesfully"})
})

exports.employesendmail = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findOne({email:req.body.email}).exec()
    if(!employe) {
            return next (new ErrorHandler("user not exist with this email. " , 404))
    }
    const url = Math.floor(Math.random() * 9000 + 1000)
    // const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`
    sendmail(req,res,url,next)
    employe.resetPasswordToken = `${url}`
    await employe.save()
    res.json({message : "mail has been succesfully sended !"}); 
    res.json({employe,url}); 
})

exports.employeforgetlink = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findOne({email : req.body.email}).exec()
    if(!employe) {
            return next (new ErrorHandler("user not not exist with this email. " , 404))
    }
    if(employe.resetPasswordToken == req.body.otp){
            employe.resetPasswordToken = "0"
            employe.password = req.body.password
        }
        else{
            return next (new ErrorHandler("Invalid Reset Link" , 500))
        }
        await employe.save()    
        res.status(200).json({
            message:"password succsesfully changed !"
    })
})


exports.employeresetpassword = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findById(req.id).exec()
    employe.password = req.body.password
    await employe.save()
    sendtoken(employe , 201 ,res)
})

exports.employeupdate = catchAsyncError(async (req,res,next)=>{
    await employes.findByIdAndUpdate(req.params.id,req.body).exec()
    res.status(200).json({
            success:true,
            message:"employe updated successfully"
    })
})


// exports.employeavatar = catchAsyncError(async (req,res,next)=>{
//     const employe = await employes.findById(req.params.id).exec()
//     const  file = req.files.orglogo
//     const modifyfilename = `image-${Date.now()}${path.extname(file.name)}`
//     const image  = await ImageKit.upload({
//         file:file.name,
//         fileName: modifyfilename
//     })
//     res.json({image})
//     // res.json({file : req.files })
//     // const employe = await employes.findById(req.params.id).exec()
//     // const file = req.files.orglogo
//     // })
//     // res.json({image})
// })


exports.employeavatar = catchAsyncError(async (req, res, next) => {
  const employe = await employes.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedfileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  const { fileId, url } = await ImageKit.upload({
    file: file.data,
    fileName: modifiedfileName,
  });

  if (employe.avatar.fileId !== "") {
    await ImageKit.deleteFile(employe.avatar.fileId);
  }

  employe.avatar = { fileId, url };
  await employe.save();

  res
    .status(200)
    .json({ success: true, message: "file uploaded successfully" });
});





// exports.employeavatar = catchAsyncError(async (req,res,next)=>{
//     const employe = await employes.findById(req.params.id).exec()
//     const file = req.files.avatar
//     const modifyfilename = `image-${Date.now()}${path.extname(file.name)}`

//     const {fileId , url} = await ImageKit.upload({
//             file:file.data,
//             fileName:modifyfilename
//     })
//     if(employe.avatar !== ""){
//             await ImageKit.deleteFile(employe.avatar.fileId)
//     }
//     employe.avatar = { fileId , url }
//     await employe.save()
//     res.status(200).json({
//             success: true,
//             message:"Profile Pic Uploaded"
//     })
// })


// -------------------------- internship ------------------------------


exports.createinternship = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findById(req.id).exec()
    const internship = await new internshipModel(req.body)
    internship.employe = employe._id
    employe.internship.push(internship._id)
    await internship.save()    
    await employe.save()    
    res.status(201).json({success:true , internship})
})


exports.readinternships = catchAsyncError(async (req,res,next)=>{
    const { internship } = await employes.findById(req.id).populate("internship").exec()
    res.status(201).json({success:true , internship})
})



exports.readsingleinternship = catchAsyncError(async (req,res,next)=>{
    const internship = await internshipModel.findById(req.params.id).exec()
    if(!internship){
        return next (new ErrorHandler("internship not found" , 500))
    }
    res.status(201).json({success:true , internship})
})



// -------------------------- jobs ------------------------------


exports.createjob = catchAsyncError(async (req,res,next)=>{
    const employe = await employes.findById(req.id).exec()
    const job = await new jobModel(req.body)
    job.employe = employe._id
    employe.job.push(job._id)
    await job.save()    
    await employe.save()    
    res.status(201).json({success:true , job})
})


exports.readjobs = catchAsyncError(async (req,res,next)=>{
    const { job } = await employes.findById(req.id).populate("job").exec()
    res.status(201).json({success:true , job})
})


exports.readsinglejob = catchAsyncError(async (req,res,next)=>{
    const job = await jobModel.findById(req.params.id).exec()
    if(!job){
        return next (new ErrorHandler("job not found" , 500))
    }
    res.status(201).json({success:true , job})
})
