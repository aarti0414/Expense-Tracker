const btn = document.getElementById("btn");
const container = document.getElementById("container");

function createNotification(text) {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = text;

    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 3000);
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
            // alert('Successfully Registered!');
            console.log('done!');
            createNotification('Successfully registered123');
            setTimeout(()=>{
            window.location.href = "login.html" // change the page on successful login

            },3000);
        }
       else {
            alert('Something went wrong');
        }
    }).catch(err => {
        createNotification('User Already Exist! Please Login.')
        // alert('User Already Exist! Please Login.');
        // document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

