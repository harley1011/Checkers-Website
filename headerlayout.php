<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/mainstyle.css" />
</head>
<body id="top" onload="setTime()">
    <div id="centerpage">
        <header class="banner">
            <section class="logo"> 
                <a href="index.php"><img src="images/checkerlogo.png" alt="checker logo" style="vertical-align: middle;" width ="50" height="50"/></a>
                Checkers
            </section>
            <div>
                <label id="ptime">Current Time:  </label>  
                <nav>
                	<?php
                		if(!isset($_SESSION['email']))
                			echo '<a href="login.php">Login</a>';
                		else
                			echo '<a href="logout.php">Logout</a>';

                	 ?>

                    <a href="index.php">Home</a>
                    <a href="rules.php">Rules</a>
                    <a href="#">About</a> 
                </nav>
            </div>
        </header>
        <section id="main">
            <nav>
                <ul>
                    <li><a href="index.php">Profile</a></li>
                    <li><a href="index.php">View Game</a></li>
                    <li><a href="users.php">Users</a></li>
                    <li><a href="register.php">Register</a></li>
                </ul>
            </nav>
            <article>