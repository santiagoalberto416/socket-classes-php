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
	option.text = data.description;	
	selectLocation.appendChild(option); 	
}

