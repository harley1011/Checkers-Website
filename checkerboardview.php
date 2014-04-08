<?php
require_once("headerlayout.php");
	$player="view";
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
    preg_match('/turn:([^\s])+/', $array[0], $turn);
    $playerTurn = $turn[0];
    echo ($emailWhitePlayer . ' is white and ' . $emailRedPlayer . '. ' . $playerTurn ); 
    $movesAllowed = "false";    
?>

   <form id="myForm" name="myForm" action="" method="post"> 
<canvas id="checkerboard"  width="640" height ="640"></br></br>
</canvas>
<input id="checkerboardarray" type="hidden" name="checkerboardarray" value=<?php echo $checkerboard[0]?> />
<input id="player" type="hidden" name="playerturn" value=<?php echo $player ?> />
<input id="playerturn" type="hidden" name="playerturn" value=<?php echo $playerTurn?> />
<input id="gameOrView" type="hidden"  value=<?php echo $movesAllowed?> /> 

  <script type="text/javascript" src="javascripts/checkerboard.js">
   </script>
<?php
require_once("footerlayout.php");
?>