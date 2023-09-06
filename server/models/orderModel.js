const mongoose = require('mongoose')

const schema = mongoose.Schema

const orderSchema = new schema({
   fromDate:{
    type:String,
    required:true
   },
   toDate:{
    type:String,
    required:true
   },
   total:{
    type:String
   },
   carId:{
    type:String
   },
   userId:{
    type:String
   },
   totalTime:{
      type:Number
   }
    

})

const Orders = mongoose.model('Orders',orderSchema)

module.exports = Orders