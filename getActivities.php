<?php
	//allow access to API
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: user, token');
	//use files
	require_once('classes/location.php');
	require_once('classes/activity.php');
	require_once('classes/catalogs.php');
	require_once('classes/exceptions.php');
	// get headers
	$headers = getallheaders();
	//validate parameter and headers
	
	if(isset($_POST['idLocation']) && isset($_POST['beginDate']) && isset($_POST['lastDate']))
	{
		
		$beginDate = ($_POST['beginDate']);
		$lastDate =  ($_POST['lastDate']);

		$json = '{ "status" : 0,
					"begin" : "'.$beginDate.'",
					"end" : "'.$beginDate.'",
					';

		$location = new Location($_POST['idLocation']);

		$json .='"location": {
						"id" : '.$location->get_id().',
						"latitude" : '.$location->get_lat().',
						"longitude" : '.$location->get_long().',
						"description" : "'.$location->get_description().'"
						},';

				  
		$json .= '"activity" : [';
		$first = true;
		
		foreach(Catalogs::get_activity_for_arduino($location->get_id(), ($_POST['beginDate']), ($_POST['lastDate'])) as $a)
		{
			if($first) $first=false; else $json .= ',';
				$json .= ' { 
						"id" : '.$a->get_id().',
						"time" : "'.$a->get_time().'" }';
				
		}		
		$json .= '] }';		
		echo $json;
	}
	else
	{
		echo '{ "status" : 3, "errorMessage" : "Parameter not found" }';
	}
	

?>