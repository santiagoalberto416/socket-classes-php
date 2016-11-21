
//show graphs
var ctx = document.getElementById("myChart");

	var data = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [
	        {
	            label: "Inflow of people per hour",
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.8)',
	                'rgba(54, 162, 235, 0.8)',
	                'rgba(255, 206, 86, 0.8)',
	                'rgba(75, 192, 192, 0.8)',
	                'rgba(153, 102, 255, 0.8)',
	                'rgba(255, 159, 64, 0.8)',
	                'rgba(255, 159, 64, 0.8)',
	                'rgba(75, 192, 192, 0.8)',
	                'rgba(153, 102, 255, 0.8)',
	                'rgba(255, 159, 64, 0.8)',
	                'rgba(255, 159, 64, 0.8)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)',
	                'rgba(255, 159, 64, 1)', 
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	            data: [65, 59, 80, 81, 56, 55, 70, 60, 56, 55, 70, 60],
	        }
	    ]
	};

    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        responsive: false
    }
})

myBarChart.data.datasets[0].data[2] = 70; // Would update the first dataset's value of 'March' to be 50
myBarChart.update();