import React, { useEffect, useState } from "react";
import { Box,Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../../components/user/Navbar";
import axios from "../../axios/instance";
import Product from "../../components/user/Product";
import { Link } from "react-router-dom";

const Location = ()=>{
    const {id} = useParams()
    const [carData,setCarData] = useState([])

   
    async function getCars(id)
    {
        try{

            console.log("getcars function working")
            const response = await axios({
                method:"get",
                url:`/api/user/location/${id}`
            })
            console.log("response from fetching  car data from location",response)
            setCarData(response.data.data)
            console.log(",cardata",carData)
        }catch(e)
        {
            console.log("eror is",e)
        }
       

    }

    useEffect(()=>{
        getCars(id)
    },[])

    useEffect(()=>{
        
    },[carData])
    return (<>
    <Box>
        <NavBar/>
        <Grid align="center" item xs={12} md={8} lg={6}>
          <h1>Cars</h1>
        </Grid>
        
        <Box display="flex" flexWrap="wrap" justifyContent="center">
      {carData.map((item) => (
      <Link to={`/booking/${item._id}`} > <Product key={item._id} item={item} /></Link>
      ))}
    </Box>
    </Box>
    </>)
}

export default Location