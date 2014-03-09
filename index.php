<?php
require_once("headerlayout.php");
global $playerTurn;
global $checkerboard;
$canMove = false;

if (isset($_SESSION['email']))
{
	$file = file_get_contents("challenge.txt");
    $array;
     if ( preg_match('/' . $_SESSION['email'] . '/',$file) == 1 )
     {
     	preg_match("/" . $_SESSION['email'] . '([^\n])+/', $file, $array);
     	preg_match('/turn:([^\s])+/', $file, $turn);
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
<canvas id="checkerboard" width="640" height ="640"></br></br>
</canvas>
<input id="checkerboardarray" type="hidden" name="checkerboardarray" value=<?php echo $checkerboard[0]?> />
<input id="playerturn" type="hidden" name="playerturn" value=<?php echo $canMove?> />
   <script type="text/javascript" src="javascripts/checkerboard.js">
   </script>
   <script type="text/javascript">
    window.onload=drawPieces();
    </script>
<?php
require_once("footerlayout.php");
?>