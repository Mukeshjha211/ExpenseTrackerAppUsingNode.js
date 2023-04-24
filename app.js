const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const User = require('./models/User');

const expense = require('./models/expense');
const orders = require('./models/orders')
const Forgotpassword = require('./models/forgotpassword');


var cors = require('cors');

const sequelize= require('./util/database');

const { error } = require('console');


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const expenseRoute = require('./routes/expenseRoutes');
const signupRoute = require('./routes/signupRoutes');
const resetPasswordRoutes = require('./routes/resetpassword')
const Expense = require('./models/expense');
const Signup = require('./models/signup');
const Orders = require('./models/orders')
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premiumFeatures')
const { Sign } = require('crypto');
const Order = require('./models/orders');
app.use('/user', signupRoute);
app.use('/password', resetPasswordRoutes);



app.use('/expense', expenseRoute);
app.use('/purchase', purchaseRoute)
app.use('/premium', premiumRoute)


// console.log(Expense, 'its Expense');
//     console.log(Signup, 'its signup');
Signup.hasMany(Expense);
Expense.belongsTo(Signup);

Signup.hasMany(Orders);
Orders.belongsTo(Signup)

Signup.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Signup);

// app.post('/user/signup', async(req,res,next)=>{
//     try{
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     const Data = await Signup.create({
//         name:name, email:email, password:password
//     }) 
//     res.status(201).json({signupDetails:Data})
    
//     }catch(err){
//         res.status(500).json(err);
//         console.log(err,"This is Post Error");
//     }
// })

// app.post('/user/add-order', async(req,res,next)=>{
//     try{
//     const price = req.body.price;
//     const dish = req.body.dish;
//     const table = req.body.table;

//     const data = await Order.create({
//         price:price, dish:dish, table:table
//     })
//     res.status(201).json({newOrders: data})
// }catch(err){
//     console.log(err, "Post is not Requesting, Check Error");
// }
// })

// app.get('/user/get-orders', async(req,res,next)=>{
//     try{
//     const orders = await Order.findAll();
//     res.status(200).json({AllOrders:orders})
//     }catch(err){
//         console.log(err, 'Get user if Failing,Check error')
//     }
// })

// app.delete('/user/delete-order/:id',async(req,res,next)=>{
//     try{
//    const orderId = req.params.id;
//    await Order.destroy({where:{id:orderId}})
//    res.sendStatus(200);
//     }catch(err){
//         console.log(err, "This is Delete Order Error");
//         res.status(500).json(err)

//     }

// })
// app.get('/expense/get-expenses', async(req,res,next)=>{
//     try{
//         console.log('its working')
//     const expenses = await expense.findAll();
//     res.status(200).json({AllExpenses: expenses});
   
//     }catch(error){
//         console.log('Get user is failing');
//         res.status(500).json({error:error})
//     }

// })
// app.post('/expense/add-expense', async(req,res, next)=>{

//     try{
     
//     const amount = req.body.amount;
//     const description = req.body.description;
//     const category = req.body.category;

//     const data = await expense.create({
//         amount: amount, description: description, category: category
        
//     })
//     res.status(201).json({newUserDetail: data})
// }catch(err){
//     console.log(err, 'Post Request is not working');
//     res.status(500).json({
        
//         error:err
//     })
// }
// })





// app.post('/user/add-user', async(req,res, next)=>{
//     console.log("I am called");
// console.log(req.body);
//     try{
//         console.log(req.body.contactNo, "its Not working");
//         console.log(req.body.email, "its Email");
//         console.log(req.body.username, "its Username");
     
//     const username = req.body.username;
//     const email = req.body.email;
//     const contactNo = req.body.contactNo;

//     const data = await User.create({
//         username: username, email: email, contactNo: contactNo
        
//     })
//     res.status(201).json({newUserDetail: data})
// }catch(err){
//     console.log(err, 'Post Request is not working');
//     res.status(500).json({
        
//         error:err
//     })
// }
// })


// app.get('/user/get-users', async(req,res,next)=>{
//     try{
//     const users = await User.findAll();
//     res.status(200).json({allUsers: users});
//     }catch(error){
//         console.log('Get user is failing');
//         res.status(500).json({error:error})
//     }

// })

// app.delete('/user/delete-user/:id', async(req,res)=>{
//     try{
//         if(req.params.id == 'undefined'){
//             console.log('ID is missing');{
//             return res.status(400).json({err:'ID is missing'})
//             }
// const uId = req.params.id;
// await User.destroy({where:{id:uId}});
// res.sendStatus(200);
// }
//     }
//         catch(err){
//             console.log(err);
//             res.status(500).json(err)}
// })
// app.use(errorController.get404);
// app.use((req,res,next)=>{
//     console.log("All The APIs are Fails");
// })
sequelize
.sync()
.then(result =>{
    // console.log(result)
    app.listen(3000);
})
.catch(err =>{
    console.log(err)
});

