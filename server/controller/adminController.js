const adminHelper = require('../helpers/adminHelper')
const userHelper = require('../helpers/userHelper')
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
            console.log("data is ",data)
            return res.json({userData:data})
        }).catch((e)=>{
            console.log("error in getusers",e)
        })

    }
}