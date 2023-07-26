const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')
require("dotenv").config()

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
                        const accesstoken = jwt.sign({"userInfo":{
                            "email":userData.email
                        }},
                        process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn:'10s'
                        })

                        const refreshtoken = jwt.sign({"userInfo":{
                            "email":userData.email
                        }},
                        process.env.REFRESH_TOKEN_SECRET,{
                            expiresIn:'1d'
                        })

                       let data={accesstoken,refreshtoken}
                        resolve(data)
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