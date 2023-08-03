const express = require('express')

const router = express.Router()

const adminController = require('../controller/adminController')

const verifyJwt = require('../middlewares/verifyJwt')

router.post('/login',adminController.postLogin)

router.get('/user-management',verifyJwt,adminController.getUsers)

router.post('/createCar',adminController.postCar)

router.get('/carManagement',adminController.getCars)

router.post('/logout',adminController.adminLogout)




module.exports = router