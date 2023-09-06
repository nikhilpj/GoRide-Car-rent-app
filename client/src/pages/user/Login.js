import React, { useState,useEffect } from "react";
import axios from "../../axios/instance";
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {  useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 

  


const Login = () => {
 
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "60px auto",
  };
  const btnStyle = { margin: "8px 0" };

  const handleOtp = ()=>{
    console.log("handleotp");
    navigate('/api/user/otp')
  }
 

 async function handleLogin(e) {
    e.preventDefault();
    console.log('inside handlelogin')

    const response =await axios({
      method: "post",
      url: "/api/user/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((req,res) => {
        console.log("token data",req.data.data.accesstoken)
       
        
        if(req.status===200)
        {
          toast.success('login success',{
            position:'top-center'
          })
          navigate('/api/user/home')
        }
      })
      .catch((e) =>{ toast.error(e.message)
      console.log(e.message)});
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={handleLogin}>
        <TextField
          size="small"
          label="email"
          placeholder="enter email"
          fullWidth
          required
          style={btnStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          size="small"
          label="password"
          placeholder="enter password"
          type="password"
          fullWidth
          required
          style={btnStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        
        <Button
          onClick={handleOtp}
          color="primary"
          variant="contained"
          fullWidth
          style={btnStyle}
          
        >
          Login using OTP
        </Button>
        
        </form>
        <Typography>
          <Link href="#">forgot password</Link>
        </Typography>
        <Typography>
          Do not have an account?
          <Link href="#">Sign Up</Link>
        </Typography>
        <ToastContainer/>
      </Paper>
    </Grid>
  );
};

export default Login;
