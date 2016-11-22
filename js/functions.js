//global variables
var urlServer = 'http://localhost/proyecto/classes/';
var x = new XMLHttpRequest();

//getlocations
function getLocations(){	
	//request
	x.open('GET', urlServer + 'getlocations.php', true);
	//send request
	x.send();
	//event handler
	x.onreadystatechange = function()
	{
		if(x.status ==200 & x.readyState == 4)
		{
			var data = (x.responseText);
			//console.log(data);
			
			var JSONdata = JSON.parse(data);			
			var locations = JSONdata.locations;			
			//console.log(locations);
			
			for(var i = 0; i < locations.length; i++)
			{
				showSelectLocations(locations[i]);
			}
		}
	}
	
}
//show data in combobox
function showSelectLocations(data){
	//console.log(data);	
	var selectLocation = document.getElementById('select_location');
	var option = document.createElement('option');	
	option.value = data.id;
	option.text = data.description + ": " + data.lat + ", " + data.long;	
	selectLocation.appendChild(option); 	
}
//contains the select and datepicker values.
function getGraphs(){
	
	var locationId = document.getElementById('select_location').value;
	var date = document.getElementById('datepicker').value;
	/*console.log(locationId);
	console.log(date);*/
	//request
	x.open('GET', urlServer + 'getactivities.php?idLocation=' + locationId + '&beginDate=' + date, true);
	//send request
	x.send();
	
	x.onreadystatechange = function()
	{
		if(x.status ==200 & x.readyState == 4)
		{
			var data = (x.responseText);
			//console.log(data);
			
			var JSONdata = JSON.parse(data);			
			var activities = JSONdata.activities;	
			localStorage.setItem('location', JSONdata.location.description);
			localStorage.setItem('beginDate', date);
			//console.log(activities);
			
			for(var i = 0; i < activities.length; i++)
			{
				
				showDataChart(activities[i]);
				//console.log(activities[i]);
			}
		}
	}
	
}
//show graphs
function showDataChart(dataChart){
	var location = localStorage.getItem('location');
	var date = localStorage.getItem('beginDate');
	console.log(dataChart);
	
	var ctx = document.getElementById("myChart");

	var data = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [
	        {
	            label: "Inflow of people per hour from " + location + " in date: " + date,
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
					'rgba(255, 99, 132, 0.8)',
	                'rgba(54, 162, 235, 0.8)',
	                'rgba(255, 206, 86, 0.8)',
	                'rgba(75, 192, 192, 0.8)'
					
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
					'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)'
					
	            ],
				
	            borderWidth: 1,
				
	            data: [dataChart.activity
					   /*dataChart.activity[0], 
					   dataChart.activity[1],
					   dataChart.activity[2], 
					   dataChart.activity[3], 
					   dataChart.activity[4],
					   dataChart.activity[5],
					   dataChart.activity[6],
					   dataChart.activity[7],
					   dataChart.activity[8],
					   dataChart.activity[9],
					   dataChart.activity[10],
					   dataChart.activity[11],
					   dataChart.activity[12],
					   dataChart.activity[13],
					   dataChart.activity[14],
					   dataChart.activity[15],
					   dataChart.activity[16],
					   dataChart.activity[17],
					   dataChart.activity[18],
					   dataChart.activity[19],
					   dataChart.activity[20],
					   dataChart.activity[21],
					   dataChart.activity[22],
					   dataChart.activity[23]*/
					  ],
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

	myBarChart.data.datasets[0].data[3]= 10; // Would update the first dataset's value of 'March' to be 50
	myBarChart.update();
}

