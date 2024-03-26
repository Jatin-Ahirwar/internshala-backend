const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
        homepage,
        employesignup,
        employesignin,
        employesignout,
        employesendmail,
        employeforgetlink,
        employeresetpassword,
        employeupdate,
        employeavatar,
        employepicc,
        createinternship,
        readinternships,
        readsingleinternship,
        createjob,
        readjobs,
        readsinglejob,
        currentEmploye
      } = require("../controllers/employeController")

// post / 
router.post("/", homepage)


router.post("/employe", isAuthenticated  ,currentEmploye)

// Post /signup
router.post("/signup" , employesignup )

// Post /signin
router.post("/signin" , employesignin  )

// Get /signout
router.get("/signout", isAuthenticated , employesignout  )

// Post /send-mail
router.post("/send-mail", employesendmail  )


// post /forget-link/:id
router.post("/forget-link/", employeforgetlink )

// post /forget-link/:id
router.post("/reset-password/:id", isAuthenticated , employeresetpassword )

// post /forget-link/:id
router.post("/update/:id", isAuthenticated , employeupdate )

// post /avatar/:id
router.post("/avatar/:id", isAuthenticated , employeavatar )


// -------------------------- internship routes ------------------------------

// post /internship/create
router.post("/internship/create", isAuthenticated , createinternship )


// post /internship/read
router.post("/internship/read", isAuthenticated , readinternships )


// post /internship/read/:id
router.post("/internship/read/:id", isAuthenticated , readsingleinternship )


// -------------------------- job routes ------------------------------

// post /job/create
router.post("/job/create", isAuthenticated , createjob )


// post /job/read
router.post("/job/read", isAuthenticated , readjobs )

// post /job/read/:id
router.post("/job/read/:id", isAuthenticated , readsinglejob )






module.exports = router