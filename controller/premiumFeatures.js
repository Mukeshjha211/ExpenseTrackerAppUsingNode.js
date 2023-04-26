const User=require('../model/signup')
const Expense=require('../model/expense')
const sequelize = require('../util/datbase')

const getUserLeaderBoard=async(req,res,next)=>{
    try{
        const total_amount = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'total_expenses']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['User.id'],
            order:[['total_expenses',"DESC"]]
        })
        
        res.status(201).json(total_amount)
        
    }catch(err){
        console.log(err)
        res.status(501).json({err:err})
    }
}

module.exports ={
    getUserLeaderBoard
}

// bruteforce solution
// const ExpenseAmount={}

        // expenses.forEach((expense)=>{
        //     if(ExpenseAmount[expense.userId]){
        //         ExpenseAmount[expense.userId]+=expense.amount
        //     }
        //     else{
        //         ExpenseAmount[expense.userId]=expense.amount
        //     }
        // })

        // const UserDeatils=[]
        // users.forEach((user)=>{
        //     UserDeatils.push({Name:user.Name,amount:ExpenseAmount[user.id] || 0 })
        // })
        
        // console.log(UserDeatils)
        // UserDeatils.sort((a,b)=>b.amount-a.amount)