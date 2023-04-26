
const expense = require('../model/expense')
const User = require('../model/signup')
const sequelize = require('../util/datbase')
const UserServices = require('../services/userServices')
const S3Services = require('../services/s3services')
const fileTable = require('../model/filestable')


const postItem = async (req, res, next) => {
    try {
        const t = await sequelize.transaction()
        const { amount, description, Item, } = req.body
        const userId = req.user.id
        const Expense = await expense.create({ amount, description, Item, userId }, { transaction: t })
        const totalExpense = Number(req.user.total_amount) + Number(amount)
        User.update({
            total_amount: totalExpense
        }, { where: { Id: req.user.id } },
            { transaction: t })

        await t.commit()
        
        res.status(201).json({ expense: Expense })

    } catch (err) {
        await t.rollback()
        res.status(501).json({ err: "something went wrong" })
    }
}

const getItem = async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 3
        console.log(page,limit)

        const expenses = await expense.findAll({
            where: { userId: req.user.id }, offset: (page - 1) * limit,
            limit: limit,
        })

        const allData = await expense.findAll({ where: { userId: req.user.id } })
        

        res.status(201).json({
            expense: expenses, hasnextpage: (limit * page < allData.length),
            nextpage: page + 1,
            currentpage: page,
            haspreviouspage: page > 1,
            previouspage: page - 1
        })
    }
    catch (err) {
        console.log(err)
        res.status(501).json({ err: "something went wrong" })
    }
}
const deleteItem = async (req, res, next) => {
    try {
        const t = await sequelize.transaction()
        const ItemId = req.params.id
        const gettingExpenseDetails = await expense.findAll({ where: { id: ItemId } })
        const UserDetails = await User.findAll({ where: { id: gettingExpenseDetails[0].userId } })
        const response = await expense.destroy({ where: { id: ItemId, userId: req.user.id } })
        if (response == true) {
            res.status(201).json({ success: true })
            const deletedAmount = gettingExpenseDetails[0].amount
            const UserTotalAmount = UserDetails[0].total_amount
            const remmainingAmount = Number(UserTotalAmount) - Number(deletedAmount)
            User.update({
                total_amount: remmainingAmount
            }, { where: { id: gettingExpenseDetails[0].userId } }, { transaction: t })
            await t.commit()
        }
    } catch (err) {
        await t.rollback()
        res.status(501).json({ err: "something went wrong" })
    }
}

const download = async (req, res) => {
    try {
        const expenses = await UserServices.getExpenses(req)

        const stringified = JSON.stringify(expenses);
        const fileName = `expense${req.user.id}/${new Date()}.txt`;

        const fileURL = await S3Services.uploadS3(stringified, fileName)
        fileTable.create({ link: fileURL, userId: req.user.id })
        res.status(201).json({ fileURL, success: true })

    } catch (err) {
        res.status(401).json({ success: false, err: err })
    }

};


module.exports = {
    postItem: postItem,
    getItem: getItem,
    deleteItem: deleteItem,
    download
}