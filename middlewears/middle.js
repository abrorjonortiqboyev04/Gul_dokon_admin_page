const  forAdmin = (req,res,next)=>{
    if(req.session.isAuth){
        res.redirect('/admin/dashboard')
    }
    next()
}

const  public = (req,res,next)=>{
    if(!req.session.isAuth){
        res.redirect('/auth/login')
    }
    next()
}

const  forUser = (req,res,next)=>{
    if(!req.session.isAuth){
        res.redirect('/user/all')
    }
    next()
}



module.exports={
    forAdmin,
    public,
     forUser
}