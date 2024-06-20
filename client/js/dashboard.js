$("#stats").click(function() {
    window.location.href = "stats.html";
});
$("#popup").click(function() {
    window.location.href = "popup.html";
});
$("#logout_facebook").click(function() {
    var params = {
        user_id: localStorage.getItem('userId')
    }
    $.ajax({  
        url: "http://bot.1568888.xyz/settings.php?mod=logout_facebook",
        method: 'POST',
        dataType: 'json',
        data: params,
        success: function(data) {  
            if(data.status=="success"){
                localStorage.removeItem("Infacebook");
                alert("Logged out successfully!");
                window.location.href = "settings.html";
            }else{
                alert("Error Logged out");
            }
        },  
        error: function(xhr, status, error) {  
            console.error('Error fetching data: ' + error);  
        } 
    }); 
});
