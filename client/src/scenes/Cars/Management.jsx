import React, { useEffect, useState,useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../axios/instance";
import AdminContext from "../../context/adminContext";

const Management = () => {
  const [carData,setCarsData] = useState([])
  const {adminToken} = useContext(AdminContext)


  useEffect(()=>{

    async function getCars() {
    
      const response = await axios({
        method: "get",
        url: "/api/admin/carManagement",
        headers:{
          Authorization:`Bearer ${adminToken}`,
          
        },
        withCredentials:true
      })
        .then((req, res) => {
          console.log(req)
         console.log("car data",req.data.carData)
          setCarsData(req.data.carData)
          
          
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
    { field: "Rate", headerName: "rate" ,width:'130'},
  ];

  // const rows = carData.map((items)=>{return items})
  const rows = carData ? carData.map((items) => items) : [];

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
