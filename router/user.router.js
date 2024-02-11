const { Router } = require('express')
const { allProductPage, orderPage, orderTo,
        addCommentPage, addComment } = require('../controller/user.controller')
const { forAdmin }=require('../middlewears/middle')
const { body }=require('express-validator')

const router = Router()

router.get('/all', forAdmin, allProductPage)
router.get('/open/:id',forAdmin, orderPage)
router.get('/comment/:id',forAdmin, addCommentPage)
router.post('/add/:id', [
      body('email', "Email kiritishda hatolik!!!").isEmail(),
      body('comment', "Bo'sh comment jo'nab bo'lmaydi!!!").notEmpty()
    ],forAdmin, addComment)
router.post('/order/:id',[
      body('FISH', "FISH ni bo'sh jo'natib bolmaydi!!!").notEmpty(),
      body('address', "Address ni bo'sh jo'natib bolmaydi!!!").notEmpty(),
      body('phone', "Phone ni bo'sh jo'natib bolmaydi!!!").notEmpty()
],forAdmin, orderTo)

module.exports = router