const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports={

    signup:async(userData)=>{
        console.log('userdata ',userData)
        const {firstname,lastName,phoneNumber,email,password} = userData
        const newPassword =await bcrypt.hash(password,10)
        return new Promise(async(resolve,reject)=>{
          await  userCollection.create({
            firstName:firstname,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            password:newPassword
          })
            resolve()
            
        }).catch((e)=>{
            console.log('eroor is',e)
        })

    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await userCollection.findOne({email:userData.email})
            if(user)
            {
                bcrypt.compare(userData.password,user.password).then((result)=>{
                    if(result)
                    {
                        resolve()
                    }
                })
            }
        })
    },

    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users =await userCollection.find({})
            console.log(users)
            resolve(users)
          
        })
    }
}