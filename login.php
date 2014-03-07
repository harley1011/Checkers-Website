<?php
if($_SERVER['REQUEST_METHOD'] =="GET" )
{
	require_once("loginform.php");

}
else
{
	$pattern = "/ email:" . $_POST['email'] . ' ' . 'password:' . $_POST['password'] . "/";
	$fileText = file_get_contents("members.txt");
	if (preg_match($pattern,$fileText) == 1 )
	{
	$_SESSION['email'] = $_POST['email'];
	require_once("loginsuccess.php");
	}
	else
	{
		echo "account not found";
	}
}
		
?>
