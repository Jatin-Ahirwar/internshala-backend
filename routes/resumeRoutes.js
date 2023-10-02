const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middlewares/auth")
const { 
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addskills,
    editskills,
    deleteskills,
    deleteaccomplishments,
    editaccomplishments,
    addaccomplishments,
    deleteresponsiblities,
    editresponsiblities,
    addresponsiblities,
    deleteprojects,
    editprojects,
    addprojects,
    deletejobs,
    editjobs,
    addjobs,
    deleteinternships,
    editinternships,
    addinternships,
    addcourses,
    editcourses,
    deletecourses,
} = require("../controllers/resumeController.js")


// Get /resume/ 
router.get("/" , isAuthenticated , resume)



// ----------------------------------Education------------------------------------------


// post /resume/add-education 
router.post("/add-education" , isAuthenticated , addeducation)

// post /resume/edit-education/:eduid 
router.post("/edit-education/:eduid" , isAuthenticated , editeducation)

// post /resume/delete-education/:eduid 
router.post("/delete-education/:eduid" , isAuthenticated , deleteeducation)


// ----------------------------------courses------------------------------------------

// post /resume/add-courses 
router.post("/add-courses" , isAuthenticated , addcourses)

// post /resume/edit-courses/:eduid 
router.post("/edit-courses/:eduid" , isAuthenticated , editcourses)

// post /resume/delete-courses/:eduid 
router.post("/delete-courses/:eduid" , isAuthenticated , deletecourses)


// ----------------------------------internships------------------------------------------


// post /resume/add-internships 
router.post("/add-internships" , isAuthenticated , addinternships)

// post /resume/edit-internships/:eduid 
router.post("/edit-internships/:eduid" , isAuthenticated , editinternships)

// post /resume/delete-internships/:eduid 
router.post("/delete-internships/:eduid" , isAuthenticated , deleteinternships)


// ----------------------------------jobs-------------------------------------------------


// post /resume/add-jobs 
router.post("/add-jobs" , isAuthenticated , addjobs)

// post /resume/edit-jobs/:eduid 
router.post("/edit-jobs/:eduid" , isAuthenticated , editjobs)

// post /resume/delete-jobs/:eduid 
router.post("/delete-jobs/:eduid" , isAuthenticated , deletejobs)


// ----------------------------------projects------------------------------------------


// post /resume/add-projects 
router.post("/add-projects" , isAuthenticated , addprojects)

// post /resume/edit-projects/:eduid 
router.post("/edit-projects/:eduid" , isAuthenticated , editprojects)

// post /resume/delete-projects/:eduid 
router.post("/delete-projects/:eduid" , isAuthenticated , deleteprojects)


// ----------------------------------responsiblities------------------------------------------


// post /resume/add-responsiblities 
router.post("/add-responsiblities" , isAuthenticated , addresponsiblities)

// post /resume/edit-responsiblities/:eduid 
router.post("/edit-responsiblities/:eduid" , isAuthenticated , editresponsiblities)

// post /resume/delete-responsiblities/:eduid 
router.post("/delete-responsiblities/:eduid" , isAuthenticated , deleteresponsiblities)


// ----------------------------------accomplishments------------------------------------------



// post /resume/add-accomplishments 
router.post("/add-accomplishments" , isAuthenticated , addaccomplishments)

// post /resume/edit-accomplishments/:eduid 
router.post("/edit-accomplishments/:eduid" , isAuthenticated , editaccomplishments)

// post /resume/delete-accomplishments/:eduid 
router.post("/delete-accomplishments/:eduid" , isAuthenticated , deleteaccomplishments)


// ----------------------------------skills---------------------------------------------------


// post /resume/add-skills 
router.post("/add-skills" , isAuthenticated , addskills)

// post /resume/edit-skills/:eduid 
router.post("/edit-skills/:eduid" , isAuthenticated , editskills)

// post /resume/delete-skills/:eduid 
router.post("/delete-skills/:eduid" , isAuthenticated , deleteskills)



module.exports = router