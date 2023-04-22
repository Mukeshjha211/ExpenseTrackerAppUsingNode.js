const Signup = require('../models/signup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function isstringinvalid(string){
    if(string ==undefined || string.length ===0){return true}
    else{
        return false
    }
}
const SignupUsers = async(req,res)=>{
    try{

        const {name, email, password} = req.body;

        if(isstringinvalid(name)||isstringinvalid(email)||isstringinvalid(password)){
            return res.status(400).json({err:'Bad parameters, something id missing'})
        }
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err,hash)=>{
            console.log(err)
            await Signup.create({name,email,password:hash})
            res.status(201).json({message:'Successfully create new user'})
        })
        
        }catch(err){
            res.status(500).jsonf(err);
            console.log(err,"This is Post Error");
        }
}
 
const generateAccessToken= (id, name, ispremiumuser)=>{
    return jwt.sign({userId: id, name:name, ispremiumuser},'secretKey')
}

const loginUsers = async(req,res)=>{
    const {email, password} = req.body;
    Signup.findAll({where:{email}}).then(user=>{
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if(err){
                    res.status(200).json({success:false, message: 'Something went Wrong'})
                }
                if(result === true){
                    res.status(200).json({success:true, message:"User logged in Successful", token:generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)})
                }
                else{
                    return res.status(400).json({success:false, message:'Password is Incorrect'})
                }
            })
           
        }
    }).catch(err=>{
        res.status(500).json({message:err, success:false})
    })
}

module.exports = {
    SignupUsers,
    loginUsers
}