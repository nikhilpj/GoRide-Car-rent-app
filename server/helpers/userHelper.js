const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')
require("dotenv").config()

module.exports={

    signup:async(userData)=>{
        console.log('userdata ',userData)
        const {firstname,lastName,phoneNumber,email,password} = userData
        let phone = 91
        phone += phoneNumber 
        const newPassword =await bcrypt.hash(password,10)
        return new Promise(async(resolve,reject)=>{
          await  userCollection.create({
            firstName:firstname,
            lastName:lastName,
            phoneNumber:phone,
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
            if(user && !user.isBlocked)
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
            else{
                reject("either account doesnot exist or you are blocked")
            }
        })
    },

    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users =await userCollection.find({})
            console.log(users)
            resolve(users)
          
        })
    },

    checkAccountExists:(phoneNumber)=>{
        return new Promise(async(resolve,reject)=>{

            try{
                console.log(phoneNumber)
                const result = await userCollection.findOne({phoneNumber:phoneNumber})
                console.log("result is ",result)
                if(result!=null && !result.isBlocked)
                {
                    resolve()
                }
                else
                {
                    reject()
                }
            }
            catch(error)
            {
                console.log("eror is ",error)
                reject(error)
            }
            
           

        })
    },

    createToken:(phoneNumber)=>{

        return new Promise(async(resolve,reject)=>{
            const user = await userCollection.findOne({phoneNumber:phoneNumber})
            if(user)
            {
                const accesstoken = jwt.sign({"userInfo":{
                    "email":user.email
                }},
                process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn:'10s'
                })

                const refreshtoken = jwt.sign({"userInfo":{
                    "email":user.email
                }},
                process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn:'1d'
                })

               let data={accesstoken,refreshtoken}
                resolve(data)
            }
            else
            {
                console.log("user not present")
                reject()
            }
        })

    }

    
}