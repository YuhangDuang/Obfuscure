document.addEventListener('DOMContentLoaded', function() {
    browser.storage.local.get(['key']).then(
        function(result) {
            document.getElementById("input").innerHTML = result.key;
        }
    ).catch(err => {
        console.error('Error getting storage key:', err);
    });

    browser.storage.local.get(['userId']).then(
        function(result) {
           userId = result.userId;
        }
    ).catch(err => {
        console.error('Error getting storage userId:', err);
    });

    document.getElementById("start").addEventListener('click', doFunction);
    document.getElementById("clear").addEventListener('click', function() {
        document.getElementById("input").innerHTML = "";
    });
    document.getElementById("filter").addEventListener('click', function() {
            console.log(userId)
            getData(userId)
        
    });
});

function doFunction() {
    const infoDisplay = document.getElementById('input').value;
    browser.storage.local.set({key: infoDisplay}).catch(err => {
        console.error('Error setting storage key:', err);
    });
}

function getData(userid){
    var params = {
        user_id: userid
    }
    console.log("=============================");
    $.ajax({  
        url: "http://bot.1568888.xyz/stats.php?mod=filter",
        method: 'POST',
        dataType: 'json', 
        data: params,
       // async:false,
        success: function(data) {
            console.log(data.data);
            console.log(data.data.fitter_data);
            if(data.status==1){
                document.getElementById("input").innerHTML =data.data.fitter_data;
            }else{
                alert("Filter Error");
            }
        },
        error: function(data) {
            console.log(data);
        }
    })

}