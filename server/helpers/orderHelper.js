const orderCollection = require('../models/orderModel')
const carCollection = require('../models/carModel')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)



module.exports = {
    postOrder:async(data)=>{
        try {
          console.log("line items",data)
          
      
          const car_data = await  carCollection.findOne({_id:data.carId})
          console.log(car_data)
        
        
            const session = await stripe.checkout.sessions.create({
              line_items:[{
                price_data: {
                  currency: 'inr',
                  unit_amount: data.totalTime * car_data.Rate * 100,
                  product_data: {
                    name: car_data.model,
                    description: car_data.brand,
                    images: [car_data.image.secure_url],
                  },
                },
              
                quantity: 1,
              }],
                mode: 'payment',
                success_url: `http://localhost:3000/?success=true`,
                cancel_url: `http://localhost:3000/?canceled=true`,
              });
            
              return(session)
        } catch (error) {
            console.log("error in stripe",error)
        }
 




    }
}