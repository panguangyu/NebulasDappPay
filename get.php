<?php

	$tradeid = $_POST['tradeid'];
	
	if (!$tradeid) {
		
		exit;
	}
	
	$mysql = mysqli_connect("127.0.0.1","root","123456");
	
	mysqli_select_db($mysql, "wallet_pay");
	
	mysqli_query($mysql, "SET NAMES UTF-8");
	

	
	$insert = "SELECT * FROM pay where tradeid = '{$tradeid}'";
	
	//var_dump($insert);
	
	$res = mysqli_query($mysql, $insert);
	
	//var_dump($res);
	
	$r = array();
	
	while($req = mysqli_fetch_assoc($res)) {
		
		$r[] = $req; 
	}
	
	echo json_encode($r);

?>