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
        skill:String,
        jobtype:{ type:String, enum:["In Office","Remote"]},
        openings:String,
        description:String,
        preferences:String,

        perks:String,
        assesments:String,
    },
    { timestamps:true })



const job = mongoose.model("job",jobModel)

module.exports = job