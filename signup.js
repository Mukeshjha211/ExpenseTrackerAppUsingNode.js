const btn = document.getElementById('button');

btn.addEventListener('click', Signup);

function Signup(e){
    e.preventDefault();
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   const Details = {
    name,
    email,
    password
   }
   console.log(Details);

   axios.post('http://localhost:3000/user/signup', Details)
   .then(res=>{
    res
    console.log('Signup Successfully');
   })
   .catch(err=>{
    err
   })
  
}