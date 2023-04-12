const Signup = require('../models/signup')
const SignupUsers = async(req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        const Data = await Signup.create({
            name:name, email:email, password:password
        }) 
        res.status(201).json({signupDetails:Data})
        
        }catch(err){
            res.status(500).json(err);
            console.log(err,"This is Post Error");
        }
}

module.exports = {
    SignupUsers
}