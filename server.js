const express=require('express')
const hbs=require('express-handlebars')
const dotenv=require('dotenv')
const flash=require('express-flash')
const path=require('path')
const session=require('express-session')
const connectPgSimple=require('connect-pg-simple')(session)
const csrf=require('csurf')
const pool=require('./config/db')
const db=require('./model/index.model')
const { public, forAdmin }=require('./middlewears/middle')


dotenv.config()
const PORT=process.env.PORT
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({ 
    store: new connectPgSimple({
        pool: pool,
        tableName: 'admin_session' 
    }),
    secret: "Abrorjon",
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

app.engine('.hbs', hbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))

// Admin Dashboard Pages
app.use('/admin', require('./router/dashboard.route'))

app.use(csrf())
app.use((req,res,next)=>{
    res.locals.csrfToken=req.csrfToken()
    next()
})

// Authentication  Pages
app.use('/auth',  require('./router/auth.router'))

// All Product Page
app.use('/user', require('./router/user.router'))

app.use((req,res)=>{
    res.status(404).render('404',{
        title: "NOT FUND"
    })
})
const start = async ()=>{
    try {
        await  db.sequelize.sync()  
        app.listen(PORT, ()=>{
            console.log(`Server running on port: ${PORT}`)
         })
    } catch (error) {
        console.log(error)
    }
}

start()
