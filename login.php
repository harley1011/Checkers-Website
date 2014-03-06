<?php
if($_SERVER['REQUEST_METHOD'] =="GET" )
{
	require_once("loginform.php");
}
else
{
	$fname = $_POST['email'];
	$lname = $_POST['password'];
	$pattern = "/ email:" . $_POST['email'] . ' ' . 'password:' . $_POST['password'] . "/";
	$fileText = file_get_contents("members.txt");
	if (preg_match($pattern,$fileText) == 1 )
	{
		echo "account found";
	}
	else
	{
		echo "account not found";
		echo $pattern;
		echo $fileText; 
	}
}
		
?>
