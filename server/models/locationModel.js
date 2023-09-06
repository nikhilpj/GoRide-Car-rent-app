const mongoose = require('mongoose')

const schema = mongoose.Schema

const locationSchema = new schema({
    locationName:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    }
    

})

const Locations = mongoose.model('Locations',locationSchema)

module.exports = Locations