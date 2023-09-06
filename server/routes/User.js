const express = require('express')
const userController = require('../controller/userController')

var router = express.Router()

router.post('/signup',userController.postSignup)

router.post('/login/otp/:Phonenumber',userController.postOtpLogin)

router.get('/login/:Phonenumber',userController.otpLogin)

router.get('/getProdctDetails',userController.getProducts)

router.get('/getlocations',userController.getLocations)

router.post('/login',userController.postLogin)

router.get('/location/:id',userController.getCars)

router.get('/booking/:id',userController.BookCar)

router.post('/checkout',userController.checkout)
module.exports = router