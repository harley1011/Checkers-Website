<?php
session_start();
$email = $_SESSION['email'];
unset($_SESSION['email']);
require_once("headerlayout.php");

echo "You have logged out " . $email;

require_once("footerlayout.php");
?>