const adminHelper = require("../helpers/adminHelper");
const userHelper = require("../helpers/userHelper");
const carHelper = require("../helpers/carHelper");
const locationHelper = require('../helpers/locationHelper')
const adminEmail = "admin@gmail.com";
const adminPassword = "admin";
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  postLogin: (req, res) => {
    try {
      console.log(req.body);
      if (
        req.body.email === adminEmail &&
        req.body.password === adminPassword
      ) {
        const accesstoken = jwt.sign(
          {
            "userInfo": {
              "email": adminEmail,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );
        console.log(accesstoken);
        const refreshtoken = jwt.sign({"userInfo":
          {
            "email": adminEmail,
          }},
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.cookie("jwt", refreshtoken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        console.log("hey ", refreshtoken);
        return res.json({ accesstoken });
      } else {
        return res.json({ status: "failed" });
      }
    } catch (error) {
      console.log("error is ", error);
    }
  },

  getUsers: (req, res) => {
    userHelper
      .getAllUsers()
      .then((data) => {
        return res.json({ userData: data });
      })
      .catch((e) => {
        console.log("error in getusers", e);
      });
  },

  getCars: (req, res) => {
    carHelper
      .getAllCars()
      .then((data) => {
        return res.json({ carData: data });
      })
      .catch((e) => {
        console.log("error in car management", e);
      });
  },

  postCar: (req, res) => {
    carHelper
      .createCar(req.body)
      .then(() => {
        console.log("after inserting car data in collection");
        res.status(200).json({ message: "data inserted succesfully" });
      })
      .catch((e) => {
        res.status(500).json({ error: "internal server error" });
      });
  },

  postLocation:async(req,res)=>{
    try{
      
      const response = await locationHelper.createLocation(req.body)
      console.log(response)
      res.status(200).json({ message: "Location created successfully" });
    }
    catch(e)
    {
console.log("error is ",e)
res.status(500).json({ error: "An error occurred while creating the location" });
    }
    


  },

  adminLogout:(req,res)=>{
    const cookies = req.cookies
    console.log("this is the cookie going to be cleared ",cookies)
    if(!cookies?.jwt)
    {
      console.log("cookies not present to clear")
        return res.sendStatus(204)

    }
    res.clearCookie('jwt',{httpOnly:true})
    res.json({message:"cookie cleared"})
  },

  editUser:(req,res)=>{
    console.log(req.params.userId)
    adminHelper.getDetails(req.params.userId).then(()=>{
      res.json({message:'edited succesfully'})
    }).catch((e)=>{
      console.log("error in edit",e)
    })

  }
};
