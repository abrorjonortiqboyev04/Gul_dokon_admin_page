module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        FISH: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(1000),
            allowNull: false
        }
    },
    {
        timestemps: true
    })
}