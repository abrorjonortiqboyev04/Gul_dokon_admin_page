const { validationResult }=require('express-validator')
const db=require('../model/index.model')
const Product=db.product
const Order=db.order
const Comment=db.comment

// Buyurtmalarni jo'natish uchun sahifa  (Bu yurtma qabul qilishni tekshirib ko'rish maqsadida)
// Route  GET   /user/all
const allProductPage = async (req,res)=>{
    try {
        const data = await Product.findAll({
            raw: true,
        })
        res.render('user/all',{
           title: "All Product",
           isAuth: req.session.isAuth,
           data: data.reverse()
        })
    } catch (error) {
        console.log(error)
    }
}

// Order Page
// Route     GET    /user/open/:id
const orderPage = async (req,res)=>{
    try {
        const data = await Product.findAll({
            raw: true,
            where: {id: req.params.id}
        })
        res.render('user/order',{
           title: data[0].title,
           data: data[0]
        })
    } catch (error) {
        console.log(error)
    }
}

// Order   reques
// Route    POST   /user/order
const orderTo = async (req,res)=>{
    try {
        const { FISH, address, phone }=req.body
        const errorMessage =  validationResult(req)
        if(!errorMessage.isEmpty()){
            const data = await Product.findAll({
                raw: true,
                where: {id: req.params.id}
            })
            return res.render('user/order',{
               title: data[0].title,
               data: data[0],
               error: errorMessage.array()[0].msg
            }) 
        }else{
            await  Order.create({
                FISH, 
                address,
                phone,
                productId: req.params.id
            })
            res.render('user/accepted',{
                title: "Accepted"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// Add Comment Page
// Route    GET    /user/comment/:id
const addCommentPage = async (req,res)=>{
    try {
        const data = await Product.findAll({
            raw: true,
            where: {id: req.params.id}
        })
        res.render('user/comment',{
            title: 'Comment',
            data: data[0]
        })
    } catch (error) {
       console.log(error) 
    }
}

// Add Comment 
// Route     POST   /user/add/:id
const addComment = async(req,res)=>{
    try {
       const {email, comment} = req.body
       const errorMessage = validationResult(req)
       if(!errorMessage.isEmpty()){
            const data = await Product.findAll({
            raw: true,
            where: {id: req.params.id}
            })
            return res.render('user/comment',{
               title: 'Comment',
               data: data[0],
               error: errorMessage.array()[0].msg
            })
       }else{
           await Comment.create({
            email,
            comment,
            productId: req.params.id
           })
           res.redirect('/user/comment/' + req.params.id)
       }
    } catch (error) {
        console.log(error)
    }
}



module.exports={
    allProductPage,
    orderPage,
    orderTo,
    addCommentPage,
    addComment
}