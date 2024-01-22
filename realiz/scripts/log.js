
function getEmailValue() {
    let emailValue = document.getElementById("email").value;
    
    window.localStorage.setItem("email",emailValue);
    window.location.replace("client.html");    
}