<?php
$_SESSION['email'] = $_POST['email'];
require_once("headerlayout.php");
?>

<?php echo "<h2>Login successful";
echo $_SESSION['email'];
 ?>


<?php
require_once("footerlayout.php");
?>

