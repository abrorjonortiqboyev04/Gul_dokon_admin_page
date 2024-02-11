module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(300),
            allowNull: false,
            unique: true
        },
        comment: {
            type: Sequelize.STRING(300),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestemps: true
    })
}