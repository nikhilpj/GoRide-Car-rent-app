import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const paperStyle = {
    height: "60vh",
    width: "25vw",
    margin: "60px auto",
    padding: 20,
  };
  const btnStyle = { margin: "8px 0" };

async  function handleLogin(e){
    e.preventDefault()
    const response = await axios({
        method:'post',
        url:'http://localhost:5000/api/admin/login',
        data:{
            email:email,
            password:password
        }
    }).then((req,res)=>{
        console.log(req)
        if(req.status===200)
        {
            alert('login sucess')
            navigate('/api/admin/dashboard')
        }
    })

  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <h2>AdminLogin</h2>
        </Grid>
        <form onSubmit={handleLogin}>
        <TextField
          size="small"
          label="email"
          type="string"
          required
          fullWidth
          style={btnStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          label="password"
          type="password"
          required
          fullWidth
          style={btnStyle}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={btnStyle}
        >
          Login
        </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default AdminLogin;
