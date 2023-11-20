const express = require("express")
const router = express.Router()
const { 
        homepage,
        studentsignup,
        studentsignout,
        studentsignin,
        currentloginuser,
        studentsendmail,
        studentforgetlink,
        studentresetpassword,
        studentupdate,
        studentavatar,
        applyinternship,
        applyjob,
        findstudents,
        readinternships,
        readjobs,
        readsingleinternships,
        studentAvatar,
        studentphoto
    }
    = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")

// Get / 
router.get("/" , homepage)

// Post /student
router.post("/student" , isAuthenticated , currentloginuser  )

router.post("/student/find" , findstudents  )

// Post /student/signup
router.post("/student/signup" , studentsignup  )

// Post /student/signin
router.post("/student/signin" , studentsignin  )

// Get /student/signout
router.get("/student/signout", isAuthenticated , studentsignout  )

// Post /student/send-mail
router.post("/student/send-mail", studentsendmail  )

// post /student/forget-link/:id
router.post("/student/forget-link", studentforgetlink )

// post /student/forget-link/:id
router.post("/student/reset-password/:id", isAuthenticated , studentresetpassword )

// post /student/forget-link/:id
router.post("/student/update/:id", isAuthenticated , studentupdate )

// post /student/avatar/:id
router.post("/student/avatar/:id", isAuthenticated , studentphoto )





// ---------------------read internships-------------------------

// post /student/applied/:internshipid
router.post("/student/read/internships/", isAuthenticated , readinternships )

// ---------------------read internships-------------------------

// post /student/readsingle/:internshipid
router.post("/student/readsingle/internship/:id", isAuthenticated , readsingleinternships )

// ---------------------read jobs--------------------------------

// post /student/applied/:jobid
router.post("/student/read/jobs/", isAuthenticated , readjobs )









// ---------------------apply internships-------------------------

// post /student/applied/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated , applyinternship )

// ---------------------apply jobs--------------------------------

// post /student/applied/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated , applyjob )





module.exports = router