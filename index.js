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
    axios.post('http://localhost:3000/user/addexpense',expenseDetails, { headers: {"authorization" : token} }).then((response) => {
    console.log('inside axios');
    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))
}
function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}