import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const UserManage = () => {
  const navigate = useNavigate()
  const [usersData,setUsersData] = useState([])
  


  useEffect(()=>{
    

    async function getUsers() {
    
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/api/admin/user-management",
      })
        .then((req, res) => {
         
          
          setUsersData(req.data.userData)
         
          
          
        })
        .catch((e) => {
          if(  e?.response?.status === 401)
          {
            alert('you are not authorized')
            navigate('/api/admin/login')
          }
          console.log("error in user management is",e)
        });
      
    }

    getUsers()


  },[])

   
  

  const columns = [
    { field: "_id", headerName: "_id",width:'250' },
    { field: "firstName", headerName: "first-Name",width:'100' },
    { field: "lastName", headerName: "last-Name",width:'100' },
    { field: "email", headerName: "E-mail" ,width:'170'},
    { field: "phoneNumber", headerName: "Phone" ,width:'130'},
  ];

  const rows = usersData.map((items)=>{return items})

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
    </Box>
  );
};

export default UserManage;
