const express = require('express')
const userRouter = require('./routes/User')
const adminRouter = require('./routes/admin')

 const connectDB = require('./config/connection')

 const cors = require('cors')

const app = express()

 connectDB

 app.use(express.json({limit:'10mb'}));
 app.use(cors())
 app.use('/api/user',userRouter)
 app.use('/api/admin',adminRouter)



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})