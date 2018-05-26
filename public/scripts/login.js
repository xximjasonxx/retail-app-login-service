
function fetchToken() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    axios.post('/api/login', {
        username,
        password
    })
    .then((response) => {
        document.getElementById("tokenContainer").innerText = response.data.token;
    })
    .catch((error) => {
        alert(error);
    })
}