import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Management = () => {
  const [carData,setCarsData] = useState([])


  useEffect(()=>{

    async function getCars() {
    
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/api/admin/user-management",
      })
        .then((req, res) => {
         console.log("car data",req.data.userData)
          setCarsData(req.data.userData)
          
          
        })
        .catch((e) => {
          console.log("error while getting user data is", e);
        });
      
    }

    getCars()


  },[])

   
  

  const columns = [
    { field: "_id", headerName: "_id",width:'250' },
    { field: "model", headerName: "model",width:'100' },
    { field: "brand", headerName: "brand",width:'100' },
    { field: "fuelType", headerName: "fuelType" ,width:'170'},
    { field: "rate", headerName: "rate" ,width:'130'},
  ];

  const rows = carData.map((items)=>{return items})

  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Car management
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
