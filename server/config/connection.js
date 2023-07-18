const mongoose = require('mongoose')

const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/project-2-GoRide')
.then(()=>console.log('mongodb database connected'))
.catch((e)=>console.log("error while connecting mongodb database ",e))

module.exports = connectDB