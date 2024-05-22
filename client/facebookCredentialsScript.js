// facebookCredentialsScript.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fbCredentialsForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fbEmail = document.getElementById('fbEmail').value;
        const fbPassword = document.getElementById('fbPassword').value;
        const userPin = document.getElementById('pinInput').value;
        const userId = localStorage.getItem('userId');
        const hashedPassword = localStorage.getItem('hashedPassword');
        const key = hashPinAndPassword(userPin, hashedPassword);
        console.log("key=======",key);
        sendCredentialsToServer(userId, fbEmail, fbPassword, key);
    });
});

function hashPinAndPassword(pin, password) {
    var pinHash = CryptoJS.SHA256(pin).toString(CryptoJS.enc.Hex);
    var passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log("pinHash=======",pinHash);
    console.log("passwordHash=======",passwordHash);
    return pinHash + passwordHash; // Concatenate the hashes for the key
}
