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
    console.log(expenseDetails);
    axios.post("http://localhost:3000/expense/add-expense",expenseDetails)
    .then(response=>{
        console.log(response);
        showUserOnList(response.data.newExpenseDetail);
    })
    .catch(err=>{
        console.log(err);
    });

}


window.addEventListener("DOMContentLoaded", ()=>{
    const token = localStorage.getItem('token')
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

    axios.delete('http://localhost:3000/expense/delete-expense/'+itemId)
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