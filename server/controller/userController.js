const carHelper = require('../helpers/carHelper')
const userHelper= require('../helpers/userHelper')
const locationHelper = require('../helpers/locationHelper')
const orderHelper = require('../helpers/orderHelper')
const { response } = require('express')



module.exports={
    postLogin:(req,res)=>{
        console.log(req.body)
        userHelper.doLogin(req.body).then((data)=>{
            console.log("data of token",data)
            res.cookie('jwt',data.refreshtoken,{
                httpOnly:true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.json({data})
        }).catch((e)=>{
            return res.json(e)
        })
    },

    postSignup:async(req,res)=>{
        console.log(req.body)
       userHelper.signup(req.body).then(()=>{
        return res.json({status:'ok'})

       })
       
    },

    getProducts:(req,res)=>{
        carHelper.getAllDetails().then((data)=>{
            
            return res.json({ProductData:data})
        }).catch((e)=>{
            console.log("eror in fetching data of products",e)
        })
    }
    ,

    otpLogin:(req,res)=>{
        console.log("phonenumber",req.params.Phonenumber)
        userHelper.checkAccountExists(req.params.Phonenumber).then(()=>{
            return res.status(200).json({message:"Account exists ,continue"})
        }).catch((e)=>{
            console.log("hiiii");
            return res.status(403).json({message:"Either Account doesnot exist or you are blocked "})
        })
    },

    postOtpLogin:(req,res)=>{
        userHelper.createToken(req.params.Phonenumber).then((data)=>{
            console.log("user token is ",data)
            res.cookie('jwt',data.refreshtoken,{
                httpOnly:true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.json({data})

        }).catch((e)=>{
            console.log("error is ",e)

        })
    },

    getLocations:async(req,res)=>{
        try
        {
            const data= await  locationHelper.getAllLocations()
            console.log("data of locations",data)
            res.status(200).json({ data });
        }catch(e){
            console.log("error while fetching location daat",e.message)
            res.status(500).json({ error: "an error occured while fetching location data" });
        }
     

    },

    getCars:async(req,res)=>{
        try {
            console.log("req.params in location page",req.params.id)
            const data = await carHelper.getCarsDetails(req.params.id)
            res.status(200).json({data})

        } catch (error) {
            console.log("eror is ",error)
            res.status(500).json({error:'an error occured while fetching car data'})
            
        }
    },

    BookCar:async(req,res)=>{
        try{
            console.log("req.params.id of car",req.params.id)
            const data = await carHelper.Booking(req.params.id)
            res.status(200).json({data,message:"data sent"})
        }
        catch(e)
        {
            console.log("eroor is",e)
            res.status(500).json({error:'an error occured while fetching data'})
        }
    },

    checkout:async(req,res)=>{
        try {
            
            console.log("data for order",req.body)
            const sessionUrl = await  orderHelper.postOrder(req.body)
            console.log("sessionurl",sessionUrl)
            console.log("url",sessionUrl.url)
            res.json(sessionUrl.url)
        } catch (error) {
                console.log("error",error)
        }
      
    }
   
}