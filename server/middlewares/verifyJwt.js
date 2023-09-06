const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJwt = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message:"unauthorized"})
    }

    const token = authHeader.split(' ')[1]
    console.log("accesstoken after splitinh",token)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err)
        {
            console.log("error while verifying token",err.message)
            return res.status(403).json({message:"forbidden"})
        }
        req.user= decoded.userInfo.email
        next()
    })
}

module.exports = verifyJwt