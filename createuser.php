
<?php
$file = fopen("members.txt","a");
fwrite($file,"fname:" . $_POST['fname']  . " lname:" . $_POST['lname'] .
" phonenum:" . $_POST['phonenum'] . " email:" . $_POST['email'] . " password:" . $_POST['password'] . " win:0 loss:0 \r\n");
require_once("headerlayout.php");
?>

<?php
    echo '<h2>Account created</h2>';
    echo "<p>   Username/E-mail: " . $_POST['email'];
    echo "</br>            Name: " . $_POST['fname']  . " " . $_POST['lname']; 
    echo "</br>    Phone number: " . $_POST['phonenum'] . "</p>";
?>

<?php
require_once("footerlayout.php");
?>

