import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "../../axios/instance";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const CreateStore = () => {
  const [locationName, setLocationName] = useState("");
  const [image, setImage] = useState("");

  const BtnStyle = { margin: "8px 0" };

 
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
    console.log('createstore form working')
    
    e.preventDefault()
    const response = await axios({
      method:'post',
      url:`/api/admin/createLocation`,
      data:{
        locationName:locationName,
        image:image
        
      }

    })
    console.log("response from creating location",response)
    
    if(response.data.message==='Location created successfully')
    {
        console.log("tost should work")
        toast.success(' Location succesfully inserted',{
            position:'top-center'
          })
    }
  }

  const paperStyle = {
    height: "auto",
    width: "26vw",
    padding: 20,
    margin: "30px auto",
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
          label="Location-Name"
          fullWidth
          required
          onChange={(e) => setLocationName(e.target.value)}
          style={BtnStyle}
          value={locationName}
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

export default CreateStore;
