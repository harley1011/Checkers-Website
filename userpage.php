<?php
$file = fopen("members.txt", "r");
$fileText = file_get_contents("challenge.txt");
$users = array();
if ($file) {
    $offset = $_REQUEST['page'] * 5;
    $position = 0;
    $counter = 0;
    while (($buffer = fgets($file)) !== false) {

        if ( $counter >= $offset && $position != 5)
        {

            $emailArray = array();
            preg_match("/email:([^\s]+)/", $buffer, $emailArray);
            $email = preg_replace("/email:/", "", $emailArray[0]);
            $winArray = array();
            preg_match("/win:([^\s]+)/", $buffer, $winArray);
            $win = preg_replace("/win:/", "", $winArray[0]);
            $lossArray = array();
            preg_match("/win:([^\s]+)/", $buffer, $lossArray);
            $loss = preg_replace("/win:/", "", $lossArray[0]);
            $_REQUEST['email'] = $email; 
            
            $challengeOrView;
            if ((isset($_SESSION['email']) && preg_match('/' . $_SESSION['email'] . '/',$fileText) == 1 ) || preg_match('/' . $email . '/',$fileText) == 1)
                    $challengeOrView = "view";
            else
                $challengeOrView = "challenge";
            $users[$position++] = array("img"=>"images/defaultuserpicture.png",
                                       "email"=>$email,
                                       "win"=>$win,
                                       "loss"=>$loss,
                                       "buttontype"=>$challengeOrView);
        }
        $counter++;
    }
    fclose($file);

    echo json_encode($users);
}
?>

