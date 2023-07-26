const adminHelper = require('../helpers/adminHelper')
const userHelper = require('../helpers/userHelper')
const carHelper = require('../helpers/carHelper')
const adminEmail = 'admin@gmail.com'
const adminPassword ='admin'

module.exports = {
    postLogin:(req,res)=>{
        console.log(req.body)
        if(req.body.email===adminEmail && req.body.password===adminPassword)
        {
            return res.json({status:'ok'})
        }
        else
        {
            return res.json({status:'failed'})
        }
    },

    getUsers:(req,res)=>{
        userHelper.getAllUsers().then((data)=>{
            
            return res.json({userData:data})
        }).catch((e)=>{
            console.log("error in getusers",e)
        })

    },

    getCars:(req,res)=>{
        carHelper.getAllCars().then((data)=>{
            return res.json({carData:data})
        }).catch((e)=>{
            console.log('error in car management',e)
        })
    },



    postCar:(req,res)=>{
        carHelper.createCar(req.body).then(()=>{
            console.log("after inserting car data in collection")
            res.status(200).json({message:"data inserted succesfully"})
        }).catch((e)=>{
            res.status(500).json({error:'internal server error'})
        })
        

    }
}