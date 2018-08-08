<?php

	$tradeid = $_POST['tradeid'];
	$nas = $_POST['nas'];
	$sellerWallet = $_POST['sellerWallet'];
	
	if (!$tradeid || !$sellerWallet) {
		
		exit;
	}
	
	//echo 1;
	
	$mysql = mysqli_connect("127.0.0.1","root","123456");
	
	mysqli_select_db($mysql, "wallet_pay");
	
	mysqli_query($mysql, "SET NAMES UTF-8");
	
	$insert = "INSERT INTO pay(tradeid, nas, sellerWallet) values($tradeid,'$nas','$sellerWallet')";
	
	var_dump(mysqli_query($mysql, $insert));

?>