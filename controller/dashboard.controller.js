const { validationResult }=require('express-validator')
const db=require('../model/index.model')
const Product=db.product
const Order=db.order
const Comment=db.comment

// Dashboard Page
// Route   GET    /admin/dashboard
const getDashboardPage = async (req,res)=>{
    try {
        const data = await Product.findAll({
             raw: true,
        })
        const hammaGullar = await Product.sum('mount')
        const summa = await Product.sum('buy')
       
        res.render('admin/dashboard',{
            title: "Dashboard",
            isAuth: req.session.isAuth,
            data: data.reverse(),
            countFlower: data.length,
            hammaGullar, summa
        })
    } catch (error) {
        console.log(error)
    }
}


// Add New Product Page
// Route     GET    /admin/add
const addNewProductPage = async (req,res)=>{
    try {
        res.render('admin/addProduct',{
            title: "Add New Product",
            isAuth: req.session.isAuth
        })
    } catch (error) {
        console.log(error)
    }
}


// Product Add
// Route    POST    /admin/new
const addProduct = async (req,res)=>{
    try {
        const { title, description, mount, price }=req.body
        const errorMessage = validationResult(req)
        if(!errorMessage.isEmpty()){
            return  res.render('admin/addProduct',{
                        title: "Add New Product",
                        error: errorMessage.array()[0].msg,
                        isAuth: req.session.isAuth,
                        oldTxt: { title, description, mount, price }
            })
        }
        else{
              
             await Product.create({
                title, description, mount, price,
                image: '/upload/'+req.file.filename
             })
             return res.redirect('/admin/dashboard')
        }
    } catch (error) {
        console.log(error)
    }
}

// Delete  Product
// Route   GET   /admin/dalete/:id
const dalete = async (req,res)=>{
    try {
        await Product.destroy({
            where: {id: req.params.id}
        })
        res.redirect('/admin/dashboard')
    } catch (error) {
        console.log(error)
    }
}

// Update  Product Page
// Route  GET   /admin/update/:id
const updatePage = async (req,res)=>{
    try {
        const data = await Product.findAll({
            raw: true,
            where: {id: req.params.id}
        })
        res.render('admin/update',{
           title: "Dashboard",
           isAuth: req.session.isAuth,
           data: data[0],
           error: req.flash('error')
       })
    } catch (error) {
        console.log(error)
    }
}

// Update  Product 
// Route    POST  /admin/edit/:id
const editProduct = async (req,res)=>{
      try {
       const { title, image, description, mount, price } = req.body
       if(title==='' || image==='' || description==='' || mount==='' || price===''){
          req.flash('error', "Bo'sh maydon qoldirildi!!!")
          return res.redirect('/admin/update/' + req.params.id)
       }
       else{
        await Product.update({title, image, description, mount, price},{
            where: {id: req.params.id}
        })
        res.redirect('/admin/dashboard')
       }
      } catch (error) {
        console.log(error)
      }
}

// Order All Page
// Route     GET   /admin/order
const orderAll = async (req,res)=>{
    try {
        const order = await Order.findAll({
            raw: true,
            include: ['product'],
            nest: true
        })
        
        res.render('admin/orderAll',{
            title: "Order All",
            isAuth: req.session.isAuth,
            data: order
        })
    } catch (error) {
        console.log(error)
    }
}

// Product sotildi
// Route     GET    /admin/sotildi
const productSotildi = async (req,res)=>{
    try {
        const data = await Order.findAll({
            raw: true,
            where: {id: req.params.id},
            include: ['product'],
            nest: true
        }) 
        await Product.update({ 

            mount: data[0].product.mount - 1,
            buy:  data[0].product.buy + data[0].product.price
            },
            { where: { id: data[0].product.id }  })

        await Order.destroy({where: {id: req.params.id}})
        res.redirect('/admin/order')
    } catch (error) {
        console.log(error) 
    }
}

// Product Sotilmadi
// Route   GET    /admin/sotilmadi
const productSotilmadi = async (req,res)=>{
    try {
        await Order.destroy({where: {id: req.params.id}})
        res.redirect('/admin/order') 
    } catch (error) {
        console.log(error)
    }
}

// All Comment Page
// Route   GET   /admin/comment/:id
const allComment = async (req,res)=>{
    try {
        const data = await Comment.findAll({
            raw: true,
            where: {productId: req.params.id}
        })
        const product = await Product.findAll({
            raw: true,
            where: {id: req.params.id}
        })
        res.render('admin/comment', {
            title: "Comment",
            data,
            product: product[0],
            isAuth: req.session.isAuth
        })
    } catch (error) {
        console.log(error)
    }
}

// Delete Comment
// Route     GET     /admin/commentDelete/:id
const commentDelete =  async (req,res)=>{
    try {
        await Comment.destroy({
            where: {id: req.params.id}
        })
        res.redirect('/admin/comment/'+req.params.id)
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    getDashboardPage,
    addNewProductPage,
    addProduct,
    dalete,
    updatePage,
    editProduct,
    orderAll,
    productSotildi,
    productSotilmadi,
    allComment,
    commentDelete
}