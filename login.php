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
	require_once("loginsuccess.php");
	}
}
		
?>
