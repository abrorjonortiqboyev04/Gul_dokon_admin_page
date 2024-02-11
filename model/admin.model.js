module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(300),
            unique: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestemps: true
    })
}