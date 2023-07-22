const mongoose = require('mongoose')

const schema = mongoose.Schema

const carSchema = new schema({
    model:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    SeatingCapacity:{
        type:Number,
        required:true
    },
    transmissionType:{
        type:String,
        required:true
    },
    Rate:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    }

},{
    timestamps:true
})

const Cars = mongoose.model('Cars',carSchema)

module.exports = Cars