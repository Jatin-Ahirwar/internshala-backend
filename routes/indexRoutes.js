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
        studentavatar
    }
    = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")

// Get / 
router.get("/" , homepage)


// Post /student
router.post("/student" , isAuthenticated , currentloginuser  )


// Post /student/signup
router.post("/student/signup" , studentsignup  )

// Post /student/signin
router.post("/student/signin" , studentsignin  )

// Get /student/signout
router.get("/student/signout", isAuthenticated , studentsignout  )

// Post /student/send-mail
router.post("/student/send-mail", studentsendmail  )


// post /student/forget-link/:id
router.post("/student/forget-link/:id", studentforgetlink )

// post /student/forget-link/:id
router.post("/student/reset-password/:id", isAuthenticated , studentresetpassword )

// post /student/forget-link/:id
router.post("/student/update/:id", isAuthenticated , studentupdate )

// post /student/avatar/:id
router.post("/student/avatar/:id", isAuthenticated , studentavatar )




module.exports = router