$("#back").click(function(){
    window.history.back();
});
$(function(){
    var params = {
        user_id: localStorage.getItem('userId'),
    }
    $.ajax({  
        url: "http://bot.1568888.xyz/stats.php?mod=get",
        method: 'POST', 
        dataType: 'json', 
        data: params,
        success: function(data) {  
            if(data.status=="success"){
                console.log(data.data.stats_data);
                console.log(data.data.keywords);
                stats_data = data.data.stats_data;
                keywords = data.data.keywords;
                stats(stats_data,keywords)
            }else{
                alert("Error saving settings");
            }
        },  
        error: function(xhr, status, error) {  
        console.error('Error fetching data: ' + error);  
        } 
    }); 
});

    // Create Chart.js
    function stats(statsData,keywords){
    
    const indicators = [ "Liked pages","Liked posts",  "Watched videos","Liked videos"];

    // Create bar charts
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keywords,
            datasets: indicators.map((indicator, index) => ({
                label: indicator,
                data: statsData.map(data => data[index]),
                backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`,
                borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
                borderWidth: 1
            }))
        },
        options: {
            scales: {
                x: { stacked: false },
                y: { stacked: false }
            }
        }
    });
}