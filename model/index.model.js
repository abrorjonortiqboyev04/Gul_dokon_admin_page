const Sequelize = require('sequelize')


const sequelize = new Sequelize('gul', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

const db={Sequelize, sequelize}
db.admin=require('./admin.model')(Sequelize,sequelize)
db.product=require('./product.model')(Sequelize,sequelize)
db.order=require('./order.model')(Sequelize,sequelize)
db.comment=require('./comment.model')(Sequelize,sequelize)


db.product.hasOne(db.order, {
    as: 'order',
    foreignKey: 'productId'
  });
db.order.belongsTo(db.product,{
    as: 'product'
});


db.product.hasMany(db.comment, {
    as: 'comment',
    onDelete: 'CASCADE',
    constraints: true,
    foreignKey: 'productId'
})
db.comment.belongsTo(db.product, {as: 'product'})


module.exports=db