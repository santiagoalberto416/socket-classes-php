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
	console.log(locationId);
	console.log(date);
	
	var url = urlServer + 'getactivities.php?idLocation=' + locationId + '&beginDate=' + date;
	console.log(url);
	//request
	x.open('GET', urlServer + url, true);
	//send request
	x.send();
	
}
