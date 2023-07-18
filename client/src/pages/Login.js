import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {  useNavigate} from 'react-router-dom'


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

 async function handleLogin(e) {
    e.preventDefault();
    console.log('inside handlelogin')

    const response =await axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((req,res) => {
        console.log(req)
        if(req.status===200)
        {
          alert('login successfull')
          navigate('/api/user/home')
        }
      })
      .catch((e) => console.log("error aftre login is ", e));
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
        </form>
        <Typography>
          <Link href="#">forgot password</Link>
        </Typography>
        <Typography>
          Do not have an account?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
