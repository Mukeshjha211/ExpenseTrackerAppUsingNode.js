const submitbtn = document.getElementById('submit');
const items = document.getElementById('items');

submitbtn.addEventListener('click', storeDetails);

function storeDetails(e){
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expenseDetails={
        amount,
        description,
        category
    }
    const token = localStorage.getItem('token')
    console.log(expenseDetails);
    axios.post("http://localhost:3000/expense/add-expense",expenseDetails, {headers:{"Authorization":token}})
    .then(response=>{
        console.log(response);
        showUserOnList(response.data.newExpenseDetail);
    })
    .catch(err=>{
        console.log(err);
    });

}
function showPremiumMsg(){
    document.getElementById('razorpay').style.visibility = 'hidden';
    document.getElementById('msg').innerText = "You are premium User Now";

}

function showLeaderboard(){
    const inputElement = document.createElement('input')
    inputElement.type = 'button'
    inputElement.value = 'Show Leaderboard'
    inputElement.onclick = async()=>{
        inputElement.style.visibility = 'hidden';
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', {headers:{"Authorization":token}})
        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1>Leader Board </h1>'
        userLeaderBoardArray.data.forEach((userDetails)=>{
            leaderboardElem.innerHTML+= `<li>Name-${userDetails.name}, Total Expenses-${userDetails.total_cost}`
        })

    }
    document.getElementById('msg').appendChild(inputElement);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", ()=>{
    const token = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    const ispremiumuser = decodeToken.ispremiumuser
    if(ispremiumuser){
        showPremiumMsg()
        showLeaderboard()
    }
    console.log(token);
    axios.get("http://localhost:3000/expense/get-expenses",{headers:{"Authorization":token}}).then(response=>{
        for(let i = 0; i<response.data.allExpensesDetails.length; i++){
            let key = response.data.allExpensesDetails[i];
            showUserOnList(key);
           
        }
        // console.log("Out of loop")
        // console.log(response);
        
    }).catch(err=>{
        console.log(err);
    })
    
    
})

function showUserOnList(expenseDetails){
    let li = document.createElement('li');

    li.textContent ="TotalExpenses :"+ " "+ expenseDetails.amount +' '+expenseDetails.description+' '+expenseDetails.category;
let deletebtn = document.createElement('input');
deletebtn.type = 'button';
deletebtn.value = 'delete';

function deleteId(itemId){
const token = localStorage.getItem('token')
    axios.delete('http://localhost:3000/expense/delete-expense/'+itemId, {headers:{"Authorization":token}})
    .then(res=>{
        res
       
    })
    .catch(err=>{
        err
    })
}

deletebtn.onclick = ()=>{
    items.removeChild(li);
    deleteId(expenseDetails.id);
}

let editbtn = document.createElement('input');
editbtn.type = 'button';
editbtn.value = 'edit';

function editId(itemId){
    axios.put('http://localhost:3000/expense/delete-expense/'+itemId).then(res=>{
        res
    }).catch(err=>{
        err
    })
}

editbtn.onclick = () =>{
    items.removeChild(li);
    editId(`${expenseDetails.id}`);
    deleteId(`${expenseDetails.id}`);
    document.getElementById('amount').value = expenseDetails.amount;
    document.getElementById('description').value = expenseDetails.description;
    document.getElementById('category').value = expenseDetails.category;
}



li.appendChild(deletebtn);
li.appendChild(editbtn);
items.appendChild(li);
}


document.getElementById('razorpay').onclick = async function(e){
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', {headers:{"Authorization":token}});
    console.log(response);

    var options = {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,

            },{headers:{"Authorization":token}})
            alert('You are Premium User Now')
            document.getElementById('razorpay').style.visibility = 'hidden';
            document.getElementById('msg').innerText = "You are premium User Now";
            showLeaderboard()
            localStorage.setItem('token', res.data.token);
        },
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Something went wrong')
    })


}