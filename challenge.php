<?php
require_once("headerlayout.php");
if (!isset($_SESSION['email']))
	echo "Please login first";
elseif ( $_POST['email'] == $_SESSION['email'] )
	echo "You can't challenge yourself.";
else
{
$file = fopen("challenge.txt","a");
fwrite($file, 'player1:' . $_SESSION['email'] . ' player2:' . $_POST['email'] . " turn:" . $_SESSION['email'] . " " . setupCheckerboard() . " \r\n");
	echo $_POST['email'] . ' vs ';
	echo $_SESSION['email'];
}

function setupCheckerboard()
{
	$checkerboard = array();
	for ( $i = 0; $i < 8; $i++)
	{
		$checkerboard[$i] = array();
		if ( $i % 2 == 0)
		{
			$checkerboard[$i][0] = "player1";
			$checkerboard[$i][2] = "player1";
			$checkerboard[$i][6] = "player2";
		}
		else
		{
			$checkerboard[$i][1] = "player1";
			$checkerboard[$i][5] = "player2";
			$checkerboard[$i][7] = "player2";			
		}
	}
	echo json_encode($checkerboard);
	return json_encode($checkerboard);
}
?>



<?php
require_once("footerlayout.php");
?>