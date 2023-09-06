import React, { useContext, useEffect, useState } from "react";
import { Box, Typography ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../axios/instance";
import {  useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import AdminContext from "../context/adminContext";


const UserManage = () => {
  const navigate = useNavigate()
  const [usersData,setUsersData] = useState([])
  const {adminToken} = useContext(AdminContext)
  const [isblocked,setIsBlocked] = useState()
  
  

  const handleEdit=async(userId)=>{
    const res = await axios({
      method:'patch',
      url:`/api/admin/user-management/${userId}`,
      headers:{
        Authorization:`Bearer ${adminToken}`
      },
      withCredentials:true
    })
  }

  useEffect(()=>{
    

    async function getUsers() {
    
      const response = await axios({
        method: "get",
        url: "/api/admin/user-management",
        headers:{
          Authorization:`Bearer ${adminToken}`,
          
        },
        withCredentials:true
      })
        .then((req, res) => {
         
          
          setUsersData(req.data.userData)
          setIsBlocked(req.data.userData.isBlocked)
         
          
          
        })
        .catch((e) => {
          if(  e?.response?.status === 401 )
          {
            toast('you are not authorized')
            navigate('/api/admin/login')
          }
          else if(e?.response?.status === 403)
          {
            toast('forbidden')
            navigate('/admin/login')

          }
          console.log("error in user management is",e.message)
        });
      
    }

    getUsers()


  },[])

   useEffect(()=>{

   },[isblocked])


  const columns = [
    { field: "_id", headerName: "_id",width:'250' },
    { field: "firstName", headerName: "first-Name",width:'100' },
    { field: "lastName", headerName: "last-Name",width:'100' },
    { field: "email", headerName: "E-mail" ,width:'170'},
    { field: "phoneNumber", headerName: "Phone" ,width:'130'},
    {field:"blockUnblockButton",headerName:"Actions",width:'130',renderCell: (params) =>{ return params.row.blockUnblockButton }}
    
  ];

  const rows = usersData.map((items)=>({
    ...items,
    blockUnblockButton:(
      <Button  onClick={()=>handleEdit(items._id)}>
        
        {items.isBlocked ? 'UnBlock' :'Block'}
        
      </Button>
    ),
  }))

  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        User management
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row._id}
      ></DataGrid>
      <ToastContainer />
    </Box>
  );
};

export default UserManage;
