const { validationResult }=require('express-validator')
const bcrypt=require('bcryptjs')
const db=require('../model/index.model')
const Admin=db.admin


// Registration Page
// Route    GET     /auth/resgitration
const getRegistrationPage = async (req,res)=>{
    try {
        res.render('auth/registration',{
            title: "Registration Page"
        })
    } catch (error) {
        console.log(error)
    }
}


// Registration Admin
// Route    POST   /auth/admin
const registrationAdmin = async (req,res)=>{
    try {
        const { email, name, password, password2 } = req.body
        const errorMessage = validationResult(req)
        if(!errorMessage.isEmpty()){
            return res.render('auth/registration',{
                      title: "Registration Page",
                      oldTxt: { email, name },
                      error: errorMessage.array()[0].msg
                   })
        }
        else{
                const admin = await Admin.findAll({
                                raw: true,
                                where: {email}
                            })
                if(admin[0]){
                        req.flash('error', "Bunday email bilan ro'yhardan o'tilgan")
                        return res.render('auth/registration',{
                            title: "Registration Page",
                            oldTxt: { email, name },
                            error: req.flash('error')
                        })
                }
                else{
                        if(password===password2){
                            const salt = await bcrypt.genSalt(10)
                            const hashPassword = await bcrypt.hash(password, salt)
                        await Admin.create({
                            email,
                            name, 
                            password: hashPassword
                        })
                        res.redirect('/auth/login')
                        }
                        else{
                            req.flash('error', "Parol kiritishda hatolik!!!")
                            return res.render('auth/registration',{
                                title: "Registration Page",
                                oldTxt: { email, name },
                                error: req.flash('error')
                            })
                        }
                }
        }
         
    } catch (error) {
        console.log(error)
    }
}


// Login Page
// Route    GET    /auth/login
const getLoginPage = async (req,res)=>{
    try {
        res.render('auth/login',{
            title: "Login"
        })
    } catch (error) {
        console.log(error)
    }
}


// Login Admin
// Route   POST    /auth/signup
const loginAdmin = async (req,res)=>{
    try {
        const {email, password}=req.body
        const errorMessage = validationResult(req)
        if(!errorMessage.isEmpty()){
                return res.render('auth/login',{
                    title: "Login",
                    oldTxt: { email },
                    error: errorMessage.array()[0].msg
                })
        }
        else{
                const admin = await Admin.findAll({
                    raw: true,
                    where: {email}
                })
                if(admin[0]){
                            const hashPassword = await bcrypt.compare(password, admin[0].password)
                            if(hashPassword){
                                req.session.isAuth=true
                                req.session.admin=admin
                                req.session.save((err)=>{
                                    if(err) throw err
                                    return res.redirect('/admin/dashboard')
                                })
                            }
                            else{
                                req.flash('error', "Noto'g'ri paroldan foydalanildi!!!")
                                return res.render('auth/login',{
                                    title: "Login",
                                    oldTxt: { email },
                                    error: req.flash('error')
                                })
                            }   
                }
                else {
                            req.flash('error', "Bunday Email bilan admin ro'yhatdan o'tmagan!!!")
                            return res.render('auth/login',{
                                title: "Login",
                                oldTxt: { email },
                                error: req.flash('error')
                            })
                }
        }
    } catch (error) {
       console.log(error) 
    }
}

// Logout 
// Route   GET   /auth/logout
const logout = async (req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err) throw err
            res.redirect('/auth/login')
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    getRegistrationPage,
    registrationAdmin,
    getLoginPage,
    loginAdmin,
    logout
}