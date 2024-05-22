$(function(){
    isLogin();
});

function isLogin(){
    if(localStorage.getItem('userId')==null){
       window.location.href = "login.html";
    }
}

$("#logout").click(function() {
    console.log("Logout clicked");
    localStorage.removeItem('userId');
    localStorage.removeItem('key');
    localStorage.removeItem('hashedPassword');
    localStorage.removeItem('pin');
    alert("Logged out successfully!");
    window.location.href = "login.html";
});