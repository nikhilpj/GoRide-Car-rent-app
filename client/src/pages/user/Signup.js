import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import React, { useState} from "react";
import {  useNavigate} from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate()
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit= async(e)=>{
    console.log("handle submit function working")
    
    
    e.preventDefault()
        const response =await axios({
        method:'post',
        url:`http://localhost:5000/api/user/signup`,
        data:{
            firstname:firstname,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            password:password
        }
    }).then((req,res)=>{
         
       
       console.log(req.status)
       if(req.status===200)
       {
        toast.success('user succesfuly created',{
          position:'top-center'
        })
        navigate('/api/user/login')
       }
    }).catch((e)=>{
        console.log('error after signup ',e)
    })

  }


  const paperStyle = {
    height: "70vh",
    width: "25vw",
    padding: 20,
    margin: "60px auto",
  };
  const btnStyle = { margin: "4px 0" };
  return (
    <Grid>
      <Paper style={paperStyle} elevation={10}>
        <Grid align="center">
          <h2>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label="first-name"
          fullWidth
          required
          style={btnStyle}
          value={firstname}
          onChange={(e)=>setFirstName(e.target.value)}
          name="firstname"
        />
        <TextField
          size="small"
          label="last-name"
          fullWidth
          required
          style={btnStyle}
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          name="lastName"
          
        />
        <TextField
          size="small"
          label="phone-number"
          fullWidth
          required
          style={btnStyle}
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
          name="phoneNumber"
          
        />
        <TextField
          size="small"
          label="email"
          fullWidth
          required
          style={btnStyle}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          name="email"
        />
        <TextField
          size="small"
          label="password"
          fullWidth
          required
          style={btnStyle}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          name="password"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={btnStyle}
          
        >
          Sign In
        </Button>
        </form>

        <Typography>
          Have an account?
          <Link href="#">Login</Link>
        </Typography>
        <ToastContainer/>
      </Paper>
    </Grid>
  );
};

export default Signup;
