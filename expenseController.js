const expense = require('../models/expense');

const addExpense = async (req, res) => {
    console.log('Its Working or not?')
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await expense.create( {amount: amount, description: description, category: category});
        res.status(201).json({newExpenseDetail: data});
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
        const expenses = await expense.findAll()
        res.status(200).json({allExpensesDetails: expenses})
    } catch(error) {
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
        await expense.destroy({where: {id: expenseId}});
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