const multer=require('multer')
const path=require('path')

const stroge = multer.diskStorage({
    destination: './public/upload',
    filename: function(req, file, cb){
        cb(null,  file.fieldname + "-" + Date.now() + path.join(file.originalname))
    }
})



const upload = multer({
    storage: stroge,
    limits: {fieldSize: 100000000},
    fileFilter: function(req, file, cb){
       fileFilters(file, cb)
    }
})


const fileFilters = function(file, cb){
    const fileType = /jpg|png|jpeg|gif/
    const extname = fileType.test(path.extname(file.originalname))
    const mimatype = fileType.test(file.originalname)

    if(extname && mimatype){
        return cb(null, true)
    }
    else{
        cb("Error: NOT UPLOAD")
    }
}

module.exports = upload