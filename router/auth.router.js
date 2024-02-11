const { Router }=require('express')
const { getRegistrationPage, registrationAdmin, getLoginPage, loginAdmin, logout } = require('../controller/auth.controller')
const { body } = require('express-validator')
const { forAdmin }=require('../middlewears/middle')
const router=Router()

router.get('/registration', forAdmin, getRegistrationPage)
router.get('/login', forAdmin, getLoginPage)
router.get('/logout', logout) 
router.post('/registradmin',[
    body('email', 'Email kiritishda hatolik!!!').isEmail(),
    body('name', "Ism  bo'sh qoldirildi!!!").notEmpty(),
    body('password', "Parol 6 ta belgidan kam bo'lmasligi kerak!!!").isLength({min: 6})
],  forAdmin, registrationAdmin)
router.post('/signup',[
    body('email', 'Email kiritishda hatolik!!!').isEmail(),
    body('password', "Parol 6 ta belgidan kam bo'lmasligi kerak!!!").isLength({min: 6})
],  forAdmin, loginAdmin)

module.exports=router