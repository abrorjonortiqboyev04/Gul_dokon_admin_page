module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        image: { 
            type: Sequelize.STRING(300),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        mount: {
           type: Sequelize.INTEGER,
           allowNull: false  
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false  
         },
        buy: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestemps: true
    })
}