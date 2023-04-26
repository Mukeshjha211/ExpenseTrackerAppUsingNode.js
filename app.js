const express =require('express');
const path=require('path');
const fs=require('fs')

const cors=require('cors');
const bodyParser = require('body-parser');
// const helmet=require('helmet');
// const compression=require('compression');
// const morgan =require('morgan')
const dotenv = require('dotenv');

dotenv.config();

const sequelize=require('./util/datbase');
const signUpRoute=require('./route/signup');
const expenseRoute=require('./route/expense');
const purchaseRoute=require('./route/purchase');
const premiumRoute=require('./route/premiumFeatures');
const forgotPasswordRoute=require('./route/forgotPassword');
// const resetPasswordRoutes = require('./route/resetPassword');

const User=require('./model/signup');
const Expense=require('./model/expense');
const Order=require('./model/order');
const Forgotpassword = require('./model/forgotPassword');
const fileTable=require('./model/filestable');

const app=express();
app.use(cors());
// app.use(helmet());
// app.use(compression());

// const accessData=fs.createWriteStream(path.join(__dirname,"access.log"),{flags:'a'})
// app.use(morgan('combined',{stream:accessData}))


app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(fileTable)
fileTable.belongsTo(User)

app.use(signUpRoute)
app.use(expenseRoute)
app.use(purchaseRoute)
app.use(premiumRoute)
app.use(forgotPasswordRoute)

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`frontend/${req.url}`))
})


sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT||3000)
})
.catch(err=>{
    console.log(err)
})
