require("dotenv").config({path:'./.env'})
const express = require("express")
const app = express()
const cors = require('cors');

// db connections
require("./models/database.js").connectDatabase()

app.use(cors({credentials:true, origin:true}))

// morgan
const logger = require("morgan")
app.use(logger("tiny"))

// bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// session and cookie
const session = require("express-session")
const cookieparser = require("cookie-parser")
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))

app.use(cookieparser())

// express file-upload
const fileupload = require("express-fileupload")
app.use(fileupload())

// routes
app.use("/" , require("./routes/indexRoutes.js"))
app.use("/resume" , require("./routes/resumeRoutes.js"))
app.use("/employe" , require("./routes/employeRoutes.js"))

// error handling

const Errorhandler = require('./utils/ErrorHandler.js')
const { generatedErrors } = require('./middlewares/error.js')
app.all("*",(req,res,next) =>{
    next(new Errorhandler(`Requested Url Not Found ${req.url}` , 404))
})
app.use(generatedErrors)

app.listen(
    process.env.PORT,
    console.log(`server is running on port ${process.env.PORT}`)
)