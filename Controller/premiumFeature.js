const User = require('../models/signup');
const Expense = require('../models/expense')
const sequelize = require('../util/database');

const getUserLeaderBoard = async(req,res)=>{
    try{
        const leaderboardofusers = await User.findAll({
            attributes:['id', 'name', [sequelize.fn('sum', sequelize.col('expenseItems.amount')), 'total_cost']],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['signup.id'],
            order:[['total_cost', 'DESC']]
          
        })
        res.status(200).json(leaderboardofusers)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}