const Sequelize=require('sequelize')
const sequelize=require('../util/datbase')

const Expense=sequelize.define('expense',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING
    },
    Item:{
        type:Sequelize.STRING
    },
    userId:{
        type:Sequelize.INTEGER
    }
})
module.exports=Expense