<?php
$fname = $lname = $phonenum =$email = $password = $passwordconfirm ="";
$errorMessage = "";
function formInputValid(){
global $fname, $lname, $phonenum, $email, $password, $passwordconfirm;
global $errorMessage;
	if(empty($_POST['fname']))
		$errorMessage .= " First name is empty.";
	else
		$fname = $_POST['fname'];
	if(empty($_POST['lname']))
		$errorMessage .= " Last name is empty.";
	else
		$lname = $_POST['lname'];
	if(empty($_POST['phonenum']))
		$errorMessage .= " Phone number is empty.";
	else
		$phonenum = $_POST['phonenum'];
	if(empty($_POST['email']))
		$errorMessage .= " E-mail is empty.";
	elseif(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
		$errorMessage .= " E-mail is invalid, not in the right format.";
	else
		$email = $_POST['email'];
	if(empty($_POST['password']))
		$errorMessage .= " Password is empty.";
	if(empty($_POST['passwordconfirm']))
		$errorMessage .= " Password Confirm name is empty.";
	if ($_POST['password'] != $_POST['passwordconfirm'] )
		$errorMessage .= " Passwords do not match.";
	elseif ( strlen($_POST['password']) < 8 )
		$errorMessage .= " Password must be greater than 8 characters.";


	return empty($errorMessage);

}
if($_SERVER['REQUEST_METHOD'] =="GET" )
{
	require_once("form.php");
}
elseif (!formInputValid())
{
	require_once("form.php");
	echo '<script language="javascript">';
	echo 'alert("Error on server side validation: Following errors occured: ' . $errorMessage . '")';
	echo '</script>';
}
else
{
	require_once("createuser.php");
}
?>
