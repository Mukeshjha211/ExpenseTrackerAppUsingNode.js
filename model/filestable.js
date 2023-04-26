const Sequelize=require('sequelize')
const sequelize=require('../util/datbase')

const fileTable=sequelize.define("files",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    link:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=fileTable