const mongoose = require("mongoose")


const jobModel = new mongoose.Schema(
    {
        employe:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"employe"
        },
        students:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        }],
        title:String,
        skill:[{
            type:String
        }],
        jobtype:{ type:String, enum:["In Office","Remote"]},
        openings:String,
        description:String,
        orgname:String,
        preferences:String,
        perks:String,
        assesments:String,
        start:String,
        responsiblity:String,
        bookmark:String,
        location:String,
        experience:String,
        lastdate:String,
        salary:{
            type:String
        },
    },
    { timestamps:true })

    





const job = mongoose.model("job",jobModel)

module.exports = job