function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);
    
    const expenseDetails ={
        expenseAmount: form.get("expenseAmount"),
        description: form.get("description"),
        category: form.get("category")   
    }
    const token = localStorage.getItem('token');
    console.log(expenseDetails);
    axios.post('http://localhost:3000/user/addexpense',expenseDetails, { headers: {"authorization" : token} }).then((response) => 
    {
        if(response.status === 201){
            console.log("data  to addexpense"+response.data.expense);
            addNewExpensetoUI(response.data.expense);
        } else {
            throw new Error('Failed To create new expense');
        }
        
    }).catch(err => {
        showError(err);
        console.log(err);
    })
}


function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}
function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listofExpense');
    const expenseElemId = `expense-${expense.id}`;
    const date = new Date();
    parentElement.innerHTML += `
        <div id=${expenseElemId} class="bottom-border"> 
            <div class="row expense-row">
                <div class="col-2 expense-date fs-15">${date.getDate() +"-"+ date.getMonth()+"-" +date.getFullYear()} </div>
                <div class="col-5 expense-text fs-15"> ${expense.description}</div>
                <div class="col-2 expense-value expense-saving fs-15"> ₹ ${expense.expenseAmount} </div>
                <button class="col-1 fs-15 btn btn-danger" onclick='deleteExpense(event, ${expense.id})'>
                Delete
                </button>
            </div>
        </div>`
     // Clear the input fields after adding element
     document.getElementById('descId').value = "";
     document.getElementById('valueId').value = "";
}



window.addEventListener('load', ()=> {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/user/getexpenses', { headers: {"Authorization" : token} }).then(response => {
        console.log("Response from getresponse"+response.data.expenses)
        if(response.status === 200){
            response.data.expenses.forEach(expense => {
                addNewExpensetoUI(expense);
            })
        } else {
            throw new Error();
        }
    })
});

function deleteExpense(e, expenseid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}
function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}