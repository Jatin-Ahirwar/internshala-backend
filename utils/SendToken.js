exports.sendtoken = (student,statuscode,res) =>{
    const token = student.getjwttoken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        secure:process.env.SECURE,
        sameSite: "none"

    }
    res.status(statuscode)
    .cookie("token",token,options,)
    .json({ success: true , id: student._id , token})
}