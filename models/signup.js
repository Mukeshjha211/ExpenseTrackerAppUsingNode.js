const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Signup = sequelize.define('signup',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING
    },
    ispremiumuser:Sequelize.BOOLEAN,
    totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue:0,
    }
 
})

module.exports = Signup;
