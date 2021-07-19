function login(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const loginDetails = {
        email: form.get("email"),
        password: form.get("password")

    }
    console.log(loginDetails);
    axios.post('http://localhost:3000/user/login',loginDetails).then(response=>{
        console.log('inside axios post');
        if(response.status===200){
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user))
            window.location.href = "index.html" // change the page on successful login
        } else {
            createNotification('failed to login!');
            throw new Error('Failed to login')
        }
    }).catch(err => {
            createNotification('Password doesnot match');
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}
function createNotification(text) {
    const container = document.getElementById("container");
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = text;

    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 3000);
}