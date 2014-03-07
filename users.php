<?php
require_once("headerlayout.php");
?>
<?php
echo '<table border="0">';
$file = fopen("members.txt", "r");
$fileText = file_get_contents("members.txt");
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
        echo   '<tr>
                <td><img id="tableimg" src="images/defaultuserpicture.png" alt="pic"/></td>
                <td>' . $email . '&nbsp;</td>
                <td>' . $win . ' Wins ' . $loss . ' Loses </td>';
                if (preg_match('/$email/',$fileText) == 1 )
                    echo '<td><form action="viewgame.php" method="post"><input type="submit" value="View Game" /><input type="hidden" name="email" value=" ' .  $email . '"/></td></form></tr>';
                else
                    echo '<td><form action="challenge.php" method="post"><input type="submit" value="Challenge"/><input type="hidden" name="email" value=" ' .   $email . '"/></td></form></tr>';

    }
    fclose($file);
}
echo '</table>';
?>
<?php
require_once("footerlayout.php");
?>


