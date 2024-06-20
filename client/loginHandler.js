// loginHandler.js
if(localStorage.getItem("userId")){
    console.log(localStorage.getItem("Infacebook"))
    if(localStorage.getItem("Infacebook")){
        window.location.href = "dashboard.html"
    }else{
        window.location.href = "settings.html"
    }
}

function decryptByAES(encryptedMessageWithIV, secretKey) {  
    var key = CryptoJS.enc.Utf8.parse(secretKey);  
    var parts = encryptedMessageWithIV.split(':');  
    var iv = CryptoJS.enc.Hex.parse(parts[0]);  
    var ciphertext = CryptoJS.enc.Base64.parse(parts[1]);  
    var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {  
      iv: iv,  
      mode: CryptoJS.mode.CBC,  
      padding: CryptoJS.pad.Pkcs7  
    });  
    return decrypted.toString(CryptoJS.enc.Utf8);  
  }  

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var pin = document.getElementById('pin').value;

    var hashedPassword1 = CryptoJS.SHA256(password).toString();


    // Adjust key generation to match sendCredentials.js
    var key = hashPinAndPassword(pin, hashedPassword1);
    fetch('http://bot.1568888.xyz/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username,
            password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex) // Send hashed password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("Login response data:", data);
            localStorage.setItem('key', CryptoJS.SHA256(pin).toString()); 
            localStorage.setItem('hashedPassword', hashedPassword1); 
            localStorage.setItem('userId', data.userId); 
            browser.storage.local.set({userId: data.userId}).catch(err => {
                console.error('Error setting storage userId:', err);
            });
            window.location.href = "settings.html";
        } else {
            console.error('Authentication failed:', data.message);
        }
    })
    .catch(error => console.error('Error during authentication:', error));
});

function hashPinAndPassword(pin, password) {
    var pinHash = CryptoJS.SHA256(pin).toString(CryptoJS.enc.Hex);
    var passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return pinHash + passwordHash;
}

function fetchEncryptedFBCredentials(userId) {
    return fetch(`http://bot.1568888.xyz/getEncryptedCredentials.php?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                console.error("Error fetching encrypted credentials:", data.message);
                throw new Error(data.message); 
            }
            console.log("Encrypted credentials and IVs received:", data);
            return data; 
        })
        .catch(error => console.error('Fetch Encrypted Credentials Error:', error));
}
function facebook_login(username,password) {
    return fetch(`http://bot.1568888.xyz/facebook_login.php?username=${username}&password=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                console.error("Error fetching encrypted credentials:", data.message);
                throw new Error(data.message); 
            }
            console.log("Encrypted credentials and IVs received:", data);
            return data; 
        })
        .catch(error => console.error('Fetch Encrypted Credentials Error:', error));
}

function startbot(userid,username,password) {
    return fetch(`http://bot.1568888.xyz/startbot.php?userid=${userid}&username=${username}&password=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                console.error("Error fetching encrypted credentials:", data.message);
                throw new Error(data.message); 
            }
            console.log("Encrypted credentials and IVs received:", data);
            return data; 
        })
        .catch(error => console.error('Fetch Encrypted Credentials Error:', error));
}

function decryptFBCredentials(encryptedCredentials, key) {
    var decryptedEmail =decryptByAES(encryptedCredentials.fb_email,key);
    console.log("Decrypted email:", decryptedEmail);
    console.log("Decrypting FB credentials...");
    console.log("Decrypting FB credentials...",encryptedCredentials);
    try {
        console.log("Encrypted credentials received for decryption:", encryptedCredentials); 
        console.log("Key for decryption:", key); 

    
        var decryptedEmail =decryptByAES(encryptedCredentials.fb_email,key);
        var decryptedPassword =decryptByAES(encryptedCredentials.fb_password,key);

        console.log("Decrypted credentials:", decryptedEmail, decryptedPassword); // Debugging log
        window.location.href = "settings.html";
        return { email: decryptedEmail, password: decryptedPassword };
    } catch (error) {
        console.error("Decryption error:", error);
        return { email: "", password: "" };
    }
}
