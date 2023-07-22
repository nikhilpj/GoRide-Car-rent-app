import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [fueltype, setFuelType] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [transmission, setTransmission] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState("");
  const BtnStyle = { margin: "4px 0" };

  console.log('image',image)

  const handleImageUpload=(e)=>{
    const files = e.target.files[0]
    console.log(files)
    TransformFile(files)
  }

  const TransformFile=(file)=>{
    const reader = new FileReader()
    if(file)
    {
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setImage(reader.result)
        }
    }
    else{
        setImage('')
    }

  }

  const handleForm = async(e)=>{
    console.log('createcar form working')
    console.log(model,brand,image)
    e.preventDefault()
    const response = await axios({
      method:'post',
      url:`http://localhost:5000/api/admin/createCar`,
      data:{
        model:model,
        brand:brand,
        fueltype:fueltype,
        seatCapacity:seatCapacity,
        transmission:transmission,
        rate:rate,
        image:image
        
      }

    }).then((req,res)=>{
      console.log("in .then funtion")
      if(req.status===200)
      {
        toast.success('Car Details succesfully inserted',{
          position:'top-center'
        })
      }

    }).catch((e)=>{
      console.log("error in create car form",e)
    })
  }

  const paperStyle = {
    height: "85vh",
    width: "26vw",
    padding: 20,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Create</h2>
        </Grid>
        <form onSubmit={handleForm}>
        <TextField
          size="small"
          label="model"
          fullWidth
          required
          onChange={(e) => setModel(e.target.value)}
          style={BtnStyle}
          value={model}
        />
        <TextField
          size="small"
          label="brand"
          fullWidth
          required
          onChange={(e) => setBrand(e.target.value)}
          style={BtnStyle}
          value={brand}
        />
        <TextField
          size="small"
          label="fuel-type"
          fullWidth
          required
          onChange={(e) => setFuelType(e.target.value)}
          style={BtnStyle}
          value={fueltype}
        />
        <TextField
          size="small"
          label="Seat-Capacity"
          required
          fullWidth
          onChange={(e) => setSeatCapacity(e.target.value)}
          style={BtnStyle}
          value={seatCapacity}
        />
        <TextField
          size="small"
          label="Transmission"
          required
          fullWidth
          onChange={(e) => setTransmission(e.target.value)}
          style={BtnStyle}
          value={transmission}
        />
        <TextField
          size="small"
          label="Rate"
          required
          fullWidth
          onChange={(e) => setRate(e.target.value)}
          style={BtnStyle}
          value={rate}
        />
        <Button variant="outlined" component="label" fullWidth style={BtnStyle}>
          Image
          <input type="file" accept="image/" onChange={handleImageUpload} required />
        </Button>
        <Button variant="contained" color="primary" fullWidth style={BtnStyle} type="submit">
          Submit
        </Button>
        </form>
        <ToastContainer/>
      </Paper>
     
    </Grid>
    
  );
};

export default Create;
