//global variables
var urlServer = 'http://localhost/proyecto/classes/';
var x = new XMLHttpRequest();

var activitiesArray[];

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
			//send activities
			var data = JSON.parse(x.responseText);
			var activities = data.activities;
			//console.log(activities);			
			showDataChart(activities);
			
			//localstorage data
			localStorage.setItem('location', data.location.description);
			localStorage.setItem('beginDate', date);

		}
	}
	
}
//push api activities
function arrayData(data){
	activitiesArray.push(data.activity);
	console.log(activity);
}
//show graphs
function showDataChart(dataChart){
	var location = localStorage.getItem('location');
	var date = localStorage.getItem('beginDate');
	console.log(dataChart);
	
	var ctx = document.getElementById("myChart");
	
	dataChart.forEach(arrayData);

	var data = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [
	        {
	            label: "Inflow of people per hour from " + location + " in date: " + date,
	            backgroundColor: 'rgba(255, 99, 132, 0.8)',
	            borderColor: 'rgba(255,99,132,1)',
	            borderWidth: 1,				
	            data: activitiesArray
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

	/*myBarChart.data.datasets[0].data[3]= 10; // Would update the first dataset's value of 'March' to be 50
	myBarChart.update();*/
}

