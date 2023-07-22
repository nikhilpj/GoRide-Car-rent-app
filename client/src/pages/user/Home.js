import React from "react";
import NavBar from "../../components/user/Navbar";
import Slider from "../../components/user/Slider";
import Product from "../../components/user/Product";
import Products from "../../components/user/Products";

const  Home=()=>
{
    return(
        <div>
            <NavBar/>
            <Slider/>
            <Products/>
        </div>
    )
}


export default Home