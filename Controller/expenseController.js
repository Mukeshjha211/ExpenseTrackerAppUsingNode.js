const { where } = require('sequelize');
const expense = require('../models/expense');
const Signup = require('../models/signup')
const sequelize = require('../util/database');

const addExpense = async (req, res) => {
    console.log('Its Working or not?')
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const t = await sequelize.transaction();
       

        const data = await expense.create( {amount: amount, description: description, category: category, signupId:req.user.id});
        const totalExpense = Number(req.user.totalExpenses) + Number(amount)
        console.log(totalExpense)
        Signup.update({
            totalExpenses:totalExpense
        },{
            where:{id:req.user.id},
            transaction:t
        }).then(async()=>{
            await t.commit();
            res.status(201).json({newExpenseDetail: data});
        }).catch(async(err)=>{
            await t.rollback();
            return res.status(500).json({success:false, error:err})
        })
    
    } catch(err) {
    
        console.log(err, "This is the Error");
        console.log('The expense data is not posting');
        res.status(500).json({
        
            error:err
        })
    }
}

const getExpenses = async (req, res) => {
    try {
        const expenses = await expense.findAll({where:{signupId:req.user.id}})
    
        res.status(200).json({allExpensesDetails: expenses})
    } catch(error) {
        console.log(error);
        console.log('Get expenses is failing', JSON.stringify(error))
        res.status(500).json({error: error})
    }
}

const deleteExpense = async (req, res) => {
    try {
        if(!req.params.id === 'undefined') {
            console.log("ID is missing")
            return res.status(400).json({err: 'ID is missing'})
        }
        const expenseId = req.params.id;

        await expense.destroy({where: {id: expenseId, signupId:req.user.id}});
       
        res.sendStatus(200);
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
}