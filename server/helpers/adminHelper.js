const userCollection = require('../models/userModel')

module.exports={
    getDetails:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            try {

                let details = await userCollection.findOne({_id:userId})
                console.log("found user to edit",details)
               await userCollection.updateOne({_id:userId},
                    {$set:{
                        isBlocked: !details.isBlocked
                    }})

                    resolve()
                
            } catch (error) {
                console.log("error in editing ",error)
            }

            
           
            
        })
    }
}


