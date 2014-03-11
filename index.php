<?php
require_once("headerlayout.php");
global $playerTurn;
global $checkerboard;
$canMove = false;

if($_SERVER['REQUEST_METHOD'] =="POST" )
{   
    $stringToStore;
    $file = file_get_contents("challenge.txt");
    $array;
    preg_match('/([^\n])+' . $_SESSION['email'] . '([^\n])+/', $file, $array);
    if ($_POST['playerturn'] == "player2")
    {
        preg_match('/player2:([^\s])+/', $array[0], $turn);
        $email = preg_replace("/player2:/", "", $turn[0]);
        $stringToStore = "player1:" . $_SESSION['email'] . " player2:" . $email . " turn:" . $email . " " . $_POST['checkerboardarray'] . " \r\n";
    }
    else
    {
        preg_match('/player1:([^\s])+/', $array[0], $turn);
        $email = preg_replace("/player1:/", "", $turn[0]);
        $stringToStore = "player1:" . $email . " player2:" . $_SESSION['email'] . " turn:" . $email . " " . $_POST['checkerboardarray'] . " \r\n";
    }
    $newFile = preg_replace('/([^\n])+' . $_SESSION['email'] . '([^\n])+/',$stringToStore, $file);
   file_put_contents("challenge.txt", $newFile);

}
if (isset($_SESSION['email']))
{
    $file = file_get_contents("challenge.txt");
    $array;
     if ( preg_match('/' . $_SESSION['email'] . '/',$file) == 1 )
     {
     	preg_match("/" . $_SESSION['email'] . '([^\n])+/', $file, $array);
     	preg_match('/turn:([^\s])+/', $array[0], $turn);
        $playerTurn = preg_replace("/turn:/", "", $turn[0]);

        if ($playerTurn == $_SESSION['email'])
        {
            echo "It is your turn,";
            if ( preg_match("/player1:" . $_SESSION['email'] . "/", $file) == 1 )
            {
                $canMove = "player1";
                echo (" you are white.");
            }
            else
            {
                $canMove = "player2";
                echo ("you are red.");
            }
        }
        else
     	    echo "It is not your turn.";
        preg_match('/\[(.*?)\]/', $array[0], $checkerboard);

     }
}
?>
<form id="myForm" name="myForm"  action="" method="post"> 
<canvas id="checkerboard" width="640" height ="640"></br></br>
</canvas>
<input id="checkerboardarray" type="hidden" name="checkerboardarray" value=<?php echo $checkerboard[0]?> />
<input id="playerturn" type="hidden" name="playerturn" value=<?php echo $canMove?> />

</form>
   <script type="text/javascript" src="javascripts/checkerboard.js">
   </script>
   <script type="text/javascript">
    window.onload=drawPieces();
    </script>
<?php
require_once("footerlayout.php");
?>