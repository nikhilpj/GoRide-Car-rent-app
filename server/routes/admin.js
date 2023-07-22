const express = require('express')

const router = express.Router()

const adminController = require('../controller/adminController')

router.post('/login',adminController.postLogin)

router.get('/user-management',adminController.getUsers)

router.post('/createCar',adminController.postCar)




module.exports = router