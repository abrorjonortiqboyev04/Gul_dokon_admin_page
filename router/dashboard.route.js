const { Router }=require('express')
const { getDashboardPage, addNewProductPage, addProduct,
        dalete, updatePage, editProduct, orderAll, 
        productSotildi, productSotilmadi, allComment, commentDelete 
      } = require('../controller/dashboard.controller')
const { body, check }=require('express-validator')
const { public, forAdmin }=require('../middlewears/middle')
const upload = require('../utils/imgUpload')

const router=Router()

router.get('/dashboard',public, getDashboardPage)
router.get('/add', public, addNewProductPage)
router.get('/delete/:id', public, dalete)
router.get('/update/:id', public, updatePage)
router.get('/order', public, orderAll)
router.get('/sotildi/:id', public, productSotildi)
router.get('/sotilmadi/:id', public, productSotilmadi)
router.get('/comment/:id', public, allComment)
router.get('/commentDelete/:id', public, commentDelete)
router.post('/edit/:id', public, editProduct)
router.post('/new', upload.single('image'), [
    body('title', "Title bo'sh qoldirildi!!!").notEmpty(),
    body('description', "Description bo'sh qoldirildi!!!").notEmpty(),
    body('mount', "Mount bo'sh qoldirildi!!!").notEmpty(),
    body('price', "Price 5000 so'mdan kam bo'lmasligi kerak!!!").isLength({min: 4})
],  public, addProduct)

module.exports=router