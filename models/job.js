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
        orgname:String,
        preferences:String,
        perks:String,
        assesments:String,
        profile:String,
        from:String,
        to:String,
        duration:String,
        responsiblity:String,
        bookmark:String,
        location:String,
        lastdate:String,
        stipend:{
            status:{
                enum:["Fixed" , "Negotiable" , "Performance Based" ,"Unpaid" ]
            },
            amount:Number
        },
    },
    { timestamps:true })

    





const job = mongoose.model("job",jobModel)

module.exports = job