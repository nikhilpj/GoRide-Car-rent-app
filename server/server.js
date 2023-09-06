const express = require('express')
const userRouter = require('./routes/User')
const adminRouter = require('./routes/admin')

 const connectDB = require('./config/connection')

 const cors = require('cors')

const app = express()

 connectDB

 const allowedOrigins = ['http://localhost:3000']

 app.use(express.json({limit:'10mb'}));
 app.use(cors({
    origin:function (origin,callback)
    {
        if(allowedOrigins.indexOf(origin) !== -1)
        {
            callback(null,true)
        }
        else
        {
            callback(new Error('Not allowed by cors'))
        }
    },
    allowedHeaders:['Content-Type','Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    credentials:true
    
 }))
 app.use('/api/user',userRouter)
 app.use('/api/admin',adminRouter)



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})