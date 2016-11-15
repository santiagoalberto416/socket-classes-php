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
		$array = new SplFixedArray(24);
		foreach(Catalogs::get_activity_for_arduino($location->get_id(), ($_POST['beginDate']), ($_POST['lastDate'])) as $a)
		{
			$date = $a->get_time();
			$date = substr($date, 11, -6);
			$array[intval($date)] = $array[intval($date)] + 1;	
		}

		$counter = 0;
		foreach ($array as $activity) {
				if($first) $first=false; else $json .= ',';
				if(is_null($activity)){
					$activity = 0;
				}
				$json .= ' { 
						"hour" : '.$counter.',
						"activity" : '.$activity.'}';
				$counter = $counter + 1;
		}

		$json .= '] }';		
		echo $json;
	}
	else
	{
		echo '{ "status" : 3, "errorMessage" : "Parameter not found" }';
	}
	

?>