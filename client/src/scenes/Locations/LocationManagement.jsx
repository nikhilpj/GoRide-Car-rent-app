import React, { useEffect, useState,useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../axios/instance";
import AdminContext from "../../context/adminContext";

const Management = () => {
  const [locationData,setLocationData] = useState([])
  const {adminToken} = useContext(AdminContext)


  useEffect(()=>{

    async function getCars() {
    
      const response = await axios({
        method: "get",
        url: "/api/admin/getStores",
        headers:{
          Authorization:`Bearer ${adminToken}`,
          
        },
        withCredentials:true
      })
       
       
      
    }

    getCars()


  },[])

   
  

  const columns = [
    { field: "_id", headerName: "_id",width:'250' },
    { field: "location", headerName: "location",width:'100' },
    
  ];

  // const rows = carData.map((items)=>{return items})
  const rows = locationData ? locationData.map((items) => items) : [];

  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Store management
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row._id}
      ></DataGrid>
    </Box>
  );
};

export default Management;
