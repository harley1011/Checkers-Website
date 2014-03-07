<?php
require_once("headerlayout.php");
?>
<?php
echo '<table border="0">';
$file = fopen("members.txt", "r");
if ($file) {
    while (($buffer = fgets($file)) !== false) {
        $emailArray = array();
        preg_match("/email:([^\s]+)/", $buffer, $emailArray);
        $email = preg_replace("/email:/", "", $emailArray[0]);
        $winArray = array();
        preg_match("/win:([^\s]+)/", $buffer, $winArray);
        $win = preg_replace("/win:/", "", $winArray[0]);
        $lossArray = array();
        preg_match("/win:([^\s]+)/", $buffer, $lossArray);
        $loss = preg_replace("/win:/", "", $lossArray[0]);
        $_POST['email'] = $email;
        echo   '<tr><form action="challenge.php" method="post">
                <td><img id="tableimg" src="images/defaultuserpicture.png" alt="pic"/></td>
                <td>' . $email . '&nbsp;</td>
                <td>' . $win . ' Wins ' . $loss . ' Loses </td>
                <td><input type="submit" value="Challenge" /></td></form>
                </tr>';
    }
    fclose($file);
}
echo '</table>';
?>
<?php
require_once("footerlayout.php");
?>



