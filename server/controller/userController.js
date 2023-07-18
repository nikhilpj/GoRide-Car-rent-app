const userHelper= require('../helpers/userHelper')



module.exports={
    postLogin:(req,res)=>{
        console.log(req.body)
        userHelper.doLogin(req.body).then(()=>{
            return res.json({status:'ok'})
        })
    },

    postSignup:async(req,res)=>{
        console.log(req.body)
       userHelper.signup(req.body).then(()=>{
        return res.json({status:'ok'})

       })
       
    }
   
}