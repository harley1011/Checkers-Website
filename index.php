<?php
require_once("headerlayout.php");
global $playerTurnEmail;
global $playerTurn;
global $player;
global $checkerboard;
global $movesAllowed;

if (isset($_POST['email']) && $_POST['email'] != $_SESSION['email'])
{
    $file = file_get_contents("challenge.txt");
    $array;
    $emailWhitePlayer;
    $emailRedPlayer;
    preg_match('/([^\n])+' . $_POST['email'] . '([^\n])+/', $file, $array);
    preg_match('/player2:([^\s])+/', $array[0], $turn);
    $emailRedPlayer = preg_replace("/player2:/", "", $turn[0]);
    preg_match('/player1:([^\s])+/', $array[0], $turn);
    $emailWhitePlayer = preg_replace("/player1:/", "", $turn[0]);
    preg_match('/\[(.*?)\]/', $array[0], $checkerboard);
    echo ($emailWhitePlayer . ' is white and ' . $emailRedPlayer . ' is red.'); 
    $movesAllowed = "false";      
}
elseif (isset($_SESSION['email']))
{
    $movesAllowed = "true";
    if($_SERVER['REQUEST_METHOD'] =="POST" )
    {   
        $stringToStore;
        $file = file_get_contents("challenge.txt");
        $array;
        $_POST['checkerboardarray'] = str_replace("\\","",$_POST['checkerboardarray']);
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
    $file = file_get_contents("challenge.txt");
    $array;
     if ( preg_match('/' . $_SESSION['email'] . '/',$file) == 1 )
     {
     	preg_match("/" . $_SESSION['email'] . '([^\n])+/', $file, $array);
     	preg_match('/turn:([^\s])+/', $array[0], $turn);
        $playerTurnEmail = preg_replace("/turn:/", "", $turn[0]);
        if ( preg_match("/player1:" . $_SESSION['email'] . "/", $file) == 1 )
                $playerTurn = "player1";
            else
                $playerTurn = "player2";
        if ( preg_match("/player1:" . $playerTurnEmail . "/", $file) == 1 )
                $player = "player1";
            else
                $player = "player2";
        if ($playerTurnEmail == $_SESSION['email'])
        {
            echo "It is your turn,";
            if ( preg_match("/player1:" . $_SESSION['email'] . "/", $file) == 1 )
            {
                $playerTurn = "player1";
                echo (" you are white.");
            }
            else
            {
                $playerTurn = "player2";
                echo ("you are red.");
            }
        }
        else
        {   
     	    echo "It is not your turn, it is " . $playerTurnEmail . ". Refresh page to see if turn has been made";
        }
        preg_match('/\[(.*?)\]/', $array[0], $checkerboard);

     }
     else
        echo "No game currently in progress. You must challenge someone or view someones game go to the users section to do this.";
}
?>
<form id="myForm" name="myForm"  action="" method="post"> 
<canvas id="checkerboard" width="640" height ="640"></br></br>
</canvas>
<input id="checkerboardarray" type="hidden" name="checkerboardarray" value=<?php echo $checkerboard[0]?> />
<input id="player" type="hidden" name="playerturn" value=<?php echo $player ?> />
<input id="playerturn" type="hidden" name="playerturn" value=<?php echo $playerTurn?> />
<input id="gameOrView" type="hidden"  value=<?php echo $movesAllowed?> />
</form>
   <script type="text/javascript" src="javascripts/checkerboard.js">
   </script>
<?php
require_once("footerlayout.php");
?>