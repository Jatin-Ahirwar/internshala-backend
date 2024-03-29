const mongoose = require("mongoose")


const internshipModel = new mongoose.Schema(
    {
        employe:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"employe"
        },
        students:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        }],
        orgname:String,
        profile:String,
        skill:[{
            type:String
        }],
        internshiptype:{ type:String, enum:["In Office", "Remote" , "work from home"]},
        openings:String,
        from:String,
        to:String,
        duration:String,
        responsiblity:String,
        bookmark:String,
        location:String,
        lastdate:String,
        // stipend:{
        //     status:{
        //         enum:["Fixed" , "Negotiable" , "Performance Based" ,"Unpaid" ]
        //     },
        //     amount:Number
        // },
        stipend:{
            type:String
        },
        perks:String,
        assesments:String,
    },
    { timestamps:true })



const internship = mongoose.model("internship",internshipModel)

module.exports = internship