import axios from "axios"
import React, { useEffect } from "react"

const AdminLogout = ()=>{

   const handleLogout = async(e)=>{
    console.log("logout function performing")

    e.preventDefault()

    const response = await axios({
        method:'post',
        url:'http://localhost:5000/api/admin/logout'
    }).then((req,res)=>{
        console.log("req object aftr logout",req)
        console.log("response object",res)
        
    })
   }

   return (
    <a href="/api/admin/login" onClick={handleLogout}>logout</a>
   )

}

export default AdminLogout