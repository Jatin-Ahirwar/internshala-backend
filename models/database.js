const mongoose = require('mongoose')

exports.connectDatabase = async () =>{
    try {
        await mongoose.connect(process.env.MONGODBD_URL , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true}
        ) 
        console.log("Database Connected")
    } catch (error) {
        console.log(error.message)
    }
}