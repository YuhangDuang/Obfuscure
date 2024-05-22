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

var keyword = "";
var percentage = 20;
    $(document).ready(function() {  
        getSettings();
    }
  );
  function getSettings() {
     // Get data from the URL 
     var url = 'http://bot.1568888.xyz/settings.php';
    
    var params = {  
        mod: 'get',  
        user_id: localStorage.getItem('userId'),  
    };  

    $.ajax({  
        url: url,  
        method: 'GET',  
        dataType: 'json',  
        data: params,
        success: function(data) {  
            if(data.status=="success" && data.empty == "no"){
                var settings = data.data;  
                $('#percentage').val(settings.percentage);  
                keyword = settings.keyword
                percentage = settings.percentage;
                $('#keyword').val(settings.keyword);
            }else{
               alert("Please enter a keyword");
            }
        },  
        error: function(xhr, status, error) {  
        console.error('Error fetching data: ' + error);  
        }  
    });  
  }
    $("#save-settings").click(function() {
    var url = 'http://bot.1568888.xyz/settings.php?mod=add';
    

    if($('#keyword').val()==''){
        alert ("Please enter a keyword");
        return false;
    }
    var params = {  
        mod: 'add',  
        user_id: localStorage.getItem('userId'),  
        keyword: $('#keyword').val(),
        percentage: $('#percentage').val(),
    };  

    $.ajax({  
        url: url,  
        method: 'POST',
        dataType: 'json',
        data: params,
        success: function(data) {  
            if(data.status=="success"){
                getSettings();
                alert("Settings saved successfully");
            }else{
                alert("Error saving settings");
            }
        },  
        error: function(xhr, status, error) {  
        console.error('Error fetching data: ' + error);  
        }  
    });  
    });
    $("#login_facebook").click(function() {
        if(keyword==""){
            alert ("Please enter a seed keyword");
            return false;
        }
        userId = localStorage.getItem('userId')
        key = localStorage.getItem('key')+CryptoJS.SHA256(localStorage.getItem('hashedPassword')).toString()
        fetchEncryptedFBCredentials(userId)
            .then(encryptedCredentials => {
                console.log("Encrypted credentials received:", encryptedCredentials);
                var decryptedCredentials = decryptFBCredentials(encryptedCredentials,key,keyword,percentage);
                console.log("Decrypted FB Credentials:", decryptedCredentials);
            })
            .catch(error => console.error('Error fetching encrypted credentials:', error));
    });

    function boot(username,password,keyword,percentage,key) {
        var url = 'http://bot.1568888.xyz/settings.php?mod=start';
        var params = {
            user_id: localStorage.getItem('userId'),
            keyword: keyword,
            percentage: percentage,
            password: password,
            email:username,
            key: localStorage.getItem('key')
        }
        $.ajax({  
        url: url,  
        method: 'POST', 
        dataType: 'json',  
        data: params,
        success: function(data) {  
            if(data.status=="success"){
                console.log(data.message)
                //alert("Settings saved successfully");
            }else{
                alert("Error saving settings");
            }
        },  
        error: function(xhr, status, error) {  
        console.error('Error fetching data: ' + error);  
        } 
    }); 
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
    function decryptFBCredentials(encryptedCredentials, key,keyword,percentage) {
        var decryptedEmail =decryptByAES(encryptedCredentials.fb_email,key);
        try {
            var decryptedEmail =decryptByAES(encryptedCredentials.fb_email,key);
            var decryptedPassword =decryptByAES(encryptedCredentials.fb_password,key);
            //console.log("Decrypted credentials:", decryptedEmail, decryptedPassword);
            boot(decryptedEmail,decryptedPassword,keyword,percentage,key);
            setTimeout(function() {  
                console.log('Code excuted after 3 seconds');  
                localStorage.setItem('Infacebook',1);
                window.location.href = "dashboard.html";
            }, 5000);
            return { email: decryptedEmail, password: decryptedPassword };
        } catch (error) {
            return { email: "", password: "" };
        }
    }