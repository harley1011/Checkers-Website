<?php
session_start();
$email = $_SESSION['email'];
session_destroy();
require_once("headerlayout.php");

echo "You have logged out " . $email;

require_once("footerlayout.php");
?>