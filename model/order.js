const Sequelize=require('sequelize')
const sequelize=require('../util/datbase')

const Order=sequelize.define("order",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING,
    
});

module.exports=Order