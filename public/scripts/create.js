
function createUser() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;4

    axios.post('/api/user', {
        firstName,
        lastName,
        username,
        password,
        role
    })
    .then((response) => {
        document.getElementById('tokenContainer').innerText = 'User Created - Please login';
    })
    .catch((error) => {
        document.getElementById('tokenContainer').innerText = `Error - ${JSON.stringify(error)}`;
    });
}