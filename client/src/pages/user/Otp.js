import React,{useState,useContext, useEffect} from "react";
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import UserContext from "../../context/userContext";
import axios from "../../axios/instance";


const Otp = () => {

  const navigate = useNavigate()
  const {Token,setToken} = useContext(UserContext)
    const [Phonenumber, setPhoneNumber] = useState('')
    const [Otp,setOtp] = useState('')
    const [error,setError] = useState('')
    const [flag,setFlag] = useState(false)
    const [confirmobj,setConfirmObj] = useState('')
    const { setUpRecaptcha } = useContext(UserContext)
    const [loginSuccess,setLoginSuccess] = useState(false)


    useEffect(()=>{
      if(loginSuccess)
      {
        toast("otp verified login in succesful")
        navigate('/api/user/home')
      }
      
    },[loginSuccess])

  const paperStyle = {
    padding: 20,
    height: "45vh",
    width: 280,
    margin: "60px auto",
  };

  const btnStyle = { margin: "10px 0" };

  const verifyOtp = async(e)=>{
    e.preventDefault()
    console.log(Otp)
    if(Otp === '' || Otp === null)
    return

    try {
        setError("")
        await confirmobj.confirm(Otp).then(async ()=>{
          console.log("verified")
          
          const res = await axios({
            method:"post",
            url:`/api/user/login/otp/${Phonenumber}`
          })
          console.log(res)
          
          setToken(res.data.data.accesstoken)
          setLoginSuccess(true)
          console.log(Token)
        })
       
    } catch (error) {
        console.log("error in otp verification",error.message)
        setError(error.message)
    }
  }

 
  
  const getOtp= async(e)=>{
    e.preventDefault()
    setError("")
    if(Phonenumber ===' ' || Phonenumber ===undefined)
    return setError("please enter a valid number")

    try {
      const res = await axios({
        method:"get",
        url:`/api/user/login/${Phonenumber}`,
  
      })
      console.log("response from server after checking if account exists",res)
      if(res.data.status===403)
      {
        toast("either you are blocked or your account doesnot exist")
        return
      }
      else{
        toast("otp sent")
        const response = await setUpRecaptcha(Phonenumber)
        console.log(response)
        setConfirmObj(response)
        setFlag(true)
      }
    } catch (error) {
        console.log("error in genreating otp",error.response.data.message)
        toast.error(error.response.data.message)
    }
console.log(Phonenumber)

}

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <h2>OTP Login</h2>
          <br/>
        </Grid>
        <form onSubmit={getOtp} style={{display: !flag ? "block" :"none"}}>
          {/* <TextField
            size="small"
            label="phone number"
            placeholder="enter valid phone number"
            fullWidth
            required
            style={btnStyle}
          /> */}


          <PhoneInput
      placeholder="Enter phone number"
      value={Phonenumber}
    
      defaultCountry='IN'
      
      onChange={setPhoneNumber}/>

      <div id="recaptcha-container"/>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            submit
          </Button>
          
        </form>

        <form onSubmit={verifyOtp} style={{display: flag ? "block" :"none"}}>
         
        <TextField
             size="small"
             label="otp"
             type="string"
             required
             fullWidth
             onChange={(e)=>setOtp(e.target.value)}
            
            
          />

      <div id="recaptcha-container"/>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            submit
          </Button>
          
        </form>

        <ToastContainer />
      </Paper>
    </Grid>
  );
};

export default Otp;
