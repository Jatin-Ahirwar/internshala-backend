const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');


exports.resume = catchAsyncError(async (req,res,next)=>{
    const { resume } = await studentModel.findById(req.id).exec()
    res.json({message:"resume" , resume} ); 
})

// ----------------------------------Education------------------------------------------

exports.addeducation = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.education.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"Education Information Added Succesfully" , resume} ); 
})


exports.editeducation = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.education.findIndex((i)=>i.id === req.params.eduid)
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex],...req.body}    
    await student.save()
    res.json({message:"Education Information Edited Succesfully" }); 
})


exports.deleteeducation = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filterededucation = student.resume.education.filter((i)=>i.id !== req.params.eduid)
    student.resume.education = filterededucation    
    await student.save()
    res.json({message:"Education Information Deleted succesfully" }); 
})


// ----------------------------------courses------------------------------------------


exports.addcourses = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"courses Information Added Succesfully" } ); 
})


exports.editcourses = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.courses.findIndex((i)=>i.id === req.params.eduid)
    student.resume.courses[eduIndex] = {...student.resume.courses[eduIndex],...req.body}    
    await student.save()
    res.json({message:"courses Information Edited Succesfully" }); 
})


exports.deletecourses = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredcourses = student.resume.courses.filter((i)=>i.id !== req.params.eduid)
    student.resume.courses = filteredcourses    
    await student.save()
    res.json({message:"courses Information Deleted succesfully" }); 
})


// ----------------------------------internships------------------------------------------

exports.addinternships = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.internships.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"Internships Information Added Succesfully"} ); 
})


exports.editinternships = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.internships.findIndex((i)=>i.id === req.params.eduid)
    student.resume.internships[eduIndex] = {...student.resume.internships[eduIndex],...req.body}    
    await student.save()
    res.json({message:"Internships Information Edited Succesfully" }); 
})


exports.deleteinternships = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredinternships = student.resume.internships.filter((i)=>i.id !== req.params.eduid)
    student.resume.internships = filteredinternships    
    await student.save()
    res.json({message:"Internships Information Deleted succesfully" }); 
})

// ----------------------------------jobs-------------------------------------------------

exports.addjobs = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.jobs.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"jobs Information Added Succesfully"} ); 
})


exports.editjobs = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.jobs.findIndex((i)=>i.id === req.params.eduid)
    student.resume.jobs[eduIndex] = {...student.resume.jobs[eduIndex],...req.body}    
    await student.save()
    res.json({message:"jobs Information Edited Succesfully" }); 
})


exports.deletejobs = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredjobs = student.resume.jobs.filter((i)=>i.id !== req.params.eduid)
    student.resume.jobs = filteredjobs    
    await student.save()
    res.json({message:"jobs Information Deleted succesfully" }); 
})


// ----------------------------------projects------------------------------------------

exports.addprojects = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"projects Information Added Succesfully"} ); 
})


exports.editprojects = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.projects.findIndex((i)=>i.id === req.params.eduid)
    student.resume.projects[eduIndex] = {...student.resume.projects[eduIndex],...req.body}    
    await student.save()
    res.json({message:"projects Information Edited Succesfully" }); 
})


exports.deleteprojects = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredprojects = student.resume.projects.filter((i)=>i.id !== req.params.eduid)
    student.resume.projects = filteredprojects    
    await student.save()
    res.json({message:"projects Information Deleted succesfully" }); 
})
// ----------------------------------responsiblities------------------------------------------

exports.addresponsiblities = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsiblities.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"responsiblities Information Added Succesfully"} ); 
})


exports.editresponsiblities = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.responsiblities.findIndex((i)=>i.id === req.params.eduid)
    student.resume.responsiblities[eduIndex] = {...student.resume.responsiblities[eduIndex],...req.body}    
    await student.save()
    res.json({message:"responsiblities Information Edited Succesfully" }); 
})


exports.deleteresponsiblities = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredresponsiblities = student.resume.responsiblities.filter((i)=>i.id !== req.params.eduid)
    student.resume.responsiblities = filteredresponsiblities    
    await student.save()
    res.json({message:"responsiblities Information Deleted succesfully" }); 
})

// ----------------------------------accomplishments------------------------------------------

exports.addaccomplishments = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.accomplishments.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"accomplishments Information Added Succesfully" } ); 
})


exports.editaccomplishments = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.accomplishments.findIndex((i)=>i.id === req.params.eduid)
    student.resume.accomplishments[eduIndex] = {...student.resume.accomplishments[eduIndex],...req.body}    
    await student.save()
    res.json({message:"accomplishments Information Edited Succesfully" }); 
})


exports.deleteaccomplishments = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredaccomplishments = student.resume.accomplishments.filter((i)=>i.id !== req.params.eduid)
    student.resume.accomplishments = filteredaccomplishments    
    await student.save()
    res.json({message:"accomplishments Information Deleted succesfully" }); 
})

// ----------------------------------skills---------------------------------------------------

exports.addskills = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"skills Information Added Succesfully" } ); 
})


exports.editskills = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.skills.findIndex((i)=>i.id === req.params.eduid)
    student.resume.skills[eduIndex] = {...student.resume.skills[eduIndex],...req.body}    
    await student.save()
    res.json({message:"skills Information Edited Succesfully" }); 
})


exports.deleteskills = catchAsyncError(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec()
    const filteredskills = student.resume.skills.filter((i)=>i.id !== req.params.eduid)
    student.resume.skills = filteredskills    
    await student.save()
    res.json({message:"skills Information Deleted succesfully" }); 
})
