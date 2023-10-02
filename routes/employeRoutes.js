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
        employepicc
      } = require("../controllers/employeController")

// Get / 
router.get("/" , isAuthenticated ,homepage)


// Post /signup
router.post("/signup" , employesignup )

// Post /signin
router.post("/signin" , employesignin  )

// Get /signout
router.get("/signout", isAuthenticated , employesignout  )

// Post /send-mail
router.post("/send-mail", employesendmail  )


// post /forget-link/:id
router.post("/forget-link/:id", employeforgetlink )

// post /forget-link/:id
router.post("/reset-password/:id", isAuthenticated , employeresetpassword )

// post /forget-link/:id
router.post("/update/:id", isAuthenticated , employeupdate )

// post /employe/avatar/:id
router.post("/avatar/:id", isAuthenticated , employepicc )





module.exports = router