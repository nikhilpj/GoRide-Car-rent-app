const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

})

const Users = mongoose.model('Users',userSchema)

module.exports = Users