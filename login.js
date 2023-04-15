const loginBtn = document.getElementById('button');

loginBtn.addEventListener('click', login)

function login(e){
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const loginDetails = {
        email,
        password
    }
   axios.post('http://localhost:3000/user/login', loginDetails).then(res=>{
    res
    alert('SuccessFully LoggedIn')
   })
   .catch(err=>{
    err
   alert('Login details not matched');
   })
}