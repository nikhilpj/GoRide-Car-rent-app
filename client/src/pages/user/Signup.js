import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Signup.css'

const pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,12}$/;
const name_Regex = /^[a-zA-Z]{4,10}$/;
const email_Regex = /^[A-Za-z._0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
const phone_Regex = /^[0-9]{10}$/

const Signup = () => {
  const userRef = useRef();
  const lastNameRef = useRef()
  const errRef = useRef();
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(name_Regex.test(firstname));
  }, [firstname]);

  useEffect(() => {
    const result = name_Regex.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(()=>{
    const result = email_Regex.test(email)
    console.log(result)
    console.log(email)
    setValidEmail(result)
  },[email])

  useEffect(() => {
    const result = pwd_Regex.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(()=>{
    const result = phone_Regex.test(phoneNumber)
    console.log(result)
    console.log(phoneNumber)
    setValidPhoneNumber(result)
  },[phoneNumber])

  useEffect(() => {
    setErrMsg("");
  }, [firstname,lastName,password,email,phoneNumber]);

  const handleSubmit = async (e) => {
    console.log("handle submit function working");

    e.preventDefault();
    const v1 = name_Regex.test(firstname)
    const v2 = name_Regex.test(lastName)
    const v3 = email_Regex.test(email)
    const v4 = phone_Regex.test(phoneNumber)
    const v5 = pwd_Regex.test(password)
    if(!v1 || !v2 || !v3 || !v4 || !v5)
    {
      setErrMsg("invalid entry")
      console.log("abort")
      return
    }
    const response = await axios({
      method: "post",
      url: `http://localhost:5000/api/user/signup`,
      data: {
        firstname: firstname,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      },
    })
      .then((req, res) => {
        console.log(req.status);
        if (req.status === 200) {
          toast.success("user succesfuly created", {
            position: "top-center",
          });
          navigate("/api/user/login");
        }
      })
      .catch((e) => {
        console.log("error after signup ", e);
      });
  };

 
  

  const paperStyle = {
    height: "75vh",
    width: "25vw",
    padding: 20,
    margin: "60px auto",
  };
  const btnStyle = { margin: "4px 0" };
  return (
    <Grid>
      <Paper style={paperStyle} elevation={10}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Grid align="center">
          <h2>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <p
            id="uidnote"
            className={
              firstNameFocus && firstname && !validFirstName
                ? "instructions"
                : "offscreen"
            }
          >
            <br />4 to 10 characters. should be alphabets
           
          </p>
          <span className={validFirstName ? "valid" : "hide"}>
            <CheckIcon />
          </span>
          <span className={validFirstName || !firstname ? "hide" : "invalid"}>
            <CloseIcon />
          </span>

          <TextField
            size="small"
            label="firstname"
            type="text"
            id="firstname"
            fullWidth
            autoComplete="off"
            required
            ref={userRef}
            style={btnStyle}
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={validFirstName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            name="firstname"
            
            
          />

          <p
            id="lastnote"
            className={
              lastNameFocus && lastName && !validLastName
                ? "instructions"
                : "offscreen"
            }
          >
            <br />4 to 10 characters. should be alphabets
           
          </p>
        
         
          <TextField
            size="small"
            type="text"
            label="last-name"
            fullWidth
            autoComplete="off"
            required
            
            ref={lastNameRef}
            style={btnStyle}
            value={lastName}
            onFocus={()=>setLastNameFocus(true)}
            onBlur={()=>setLastNameFocus(false)}
            onChange={(e) => setLastName(e.target.value)}
            aria-invalid={validLastName ? "false" : "true"}
            aria-describedby="lastnote"
            name="lastName"
          />

<p id="phone" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
          enter valid phoneNumber
         </p>
          <TextField
            size="small"
            label="phone-number"
            fullWidth
            autoComplete="off"
            required
            style={btnStyle}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            onFocus={()=>setPhoneNumberFocus(true)}
            onBlur={()=>setPhoneNumberFocus(false)}
            aria-invalid={validPhoneNumber ? "false" : "true"}
            aria-describedby="phone"
          />

            <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail
                ? "instructions"
                : "offscreen"
            }
          >
            <br />enter valid email
           
          </p>
          <TextField
            size="small"
            label="email"
            fullWidth
            type="email"
            autoComplete="off"
            required
            style={btnStyle}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={()=>setEmailFocus(true)}
            onBlur={()=>setEmailFocus(false)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

<p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            4 to 10 characters. must contain an uppercase ,a lowercase , a
            number and a special digit
            <span className={validPwd ? "valid" : "hide"}>
            <CheckIcon />
          </span>
         
          </p>
          <span className={validPwd || !password ? "hide" : "invalid"}>
            <CloseIcon />
          </span>
         
          

          <TextField
            size="small"
            label="password"
            fullWidth
            type="password"
            required
            style={btnStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            name="password"
          />
         

        <p id="matchpwd" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          password should match
        </p>
          <TextField
            size="small"
            label="Confirm password"
            fullWidth
            type="password"
            required
            style={btnStyle}
            value={matchPwd}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="matchpwd"
            onFocus={()=>setMatchFocus(true)}
            onBlur={()=>setMatchFocus(false)}
            onChange={(e) => setMatchPwd(e.target.value)}
            name="matchPwd"
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
        <ToastContainer />
      </Paper>
    </Grid>
  );
};

export default Signup;
