const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const onSignIn = document.getElementById('signIn_button')

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

onSignIn.addEventListener('click', () => {
    console.log("asasd")
    const url = '/login'
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:9000/lll')
    request.onload = () => {
        console.log(request)
        console.log(request.response)
    }
})