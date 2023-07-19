import React,{useState} from "react";
import { Box,useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import {useSelector} from 'react-redux'
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const Layout = ()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [isSidebarOpen,setisSidebarOpen] = useState(true)
    return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box height={30}>
        
        <Box sx={{display:"flex"}}>
        <Sidebar  />
        <Box component="main" sx={{flexGrow:1,p:3}}>
        <Outlet/>
        </Box>
        </Box>
    </Box>
    </>
    )
}

export default Layout