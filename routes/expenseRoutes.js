const express = require('express');

const expenseControllers = require('../Controller/expenseController')

const userauthenticate = require('../middleware/auth')

const router = express.Router();

router.post('/add-expense', userauthenticate.authenticate,expenseControllers.addExpense);

router.get('/get-expenses', userauthenticate.authenticate,expenseControllers.getExpenses);

router.delete('/delete-expense/:id',userauthenticate.authenticate, expenseControllers.deleteExpense);

module.exports = router;
