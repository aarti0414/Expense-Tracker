const btn = document.getElementById("btn");
const container = document.getElementById("container");

function createNotification() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = " New User Regisered!!";

    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 2500);
}

function signup(e) {

    const form = new FormData(e.target);
    
    const signupDetails = {
        name: form.get("name"),
        email: form.get("email"),
        phoneno : form.get("phoneno"),
        password: form.get("password")
        
    }
    console.log(signupDetails)
    e.preventDefault();
    axios.post('http://localhost:3000/user/signup',signupDetails).then(response => {
        if(response.status === 201){
            alert('Successfully Registered!');
            // createNotification();
            // setTimeout(()=>{
                window.location.href = "index.html" // change the page on successful login

            // },3000);
        }
       else {
            alert('Something went wrong');
        }
    }).catch(err => {
        alert('User Already Exist! Please Login.');
        // document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

