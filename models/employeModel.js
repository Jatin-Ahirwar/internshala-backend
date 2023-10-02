const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const employeModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Ft name is required"],
        minlength:[4,"First name should be atleast more then  4 characters"]
    },
    lastname:{
        type:String,
        required:[true,"Last name is required"],
        minlength:[4,"Last name should be atleast more then 4 characters"]
    },
    contact:{        
        type:String,
        required:[true,"Contact is required"],
        minlength:[10,"Contact should be atleast 10 characters"],
        maxlength:[10,"Contact should not exceed 10 characters"]
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    city:{
        type:String,
        required:[true,"City is required"],
        minlength:[3,"City should be atleast more then 3 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        
    },
    password:{
        select:false,
        type:String,
        maxlength:[15,"Password should not exceed more than 15 characters"],
        minlength:[6,"Password should have atleast 6 characters"],
    },
    resetPasswordToken :{
        type:String,
        default:"0"
    },
    avatar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://plus.unsplash.com/premium_photo-1695725168378-601813bf922f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
        }
    },
    orgname:{
        type:String,
        required:[true,"Organisation name is required"],
        minlength:[4,"Organisation name should be atleast more then  4 characters"]
    },
    internships:[],
    jobs:[],
    },
    { timestamps:true })

employeModel.pre("save", function(){
    if(!this.isModified ("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt)
});


employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

employeModel.methods.getjwttoken = function (){
    return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


const employe = mongoose.model("employe",employeModel)

module.exports = employe