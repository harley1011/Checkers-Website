<?php

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
                <a href="index.html"><img src="images/checkerlogo.png" alt="checker logo" style="vertical-align: middle;" width ="50" height="50"/></a>
                Checkers
            </section>
            <div>
                <label id="ptime">Current Time:  </label>  
                <nav>
                <a  href="login.php">Login</a>
                    <a href="index.html">Home</a>
                    <a href="rules.html">Rules</a>
                    <a href="#">About</a> 
                </nav>
            </div>
        </header>
        <section id="main">
            <nav>
                <ul>
                    <li><a href="index.html">Profile</a></li>
                    <li><a href="index.html">View Game</a></li>
                    <li><a href="users.html">Users</a></li>
                    <li><a href="register.html">Register</a></li>
                </ul>
            </nav>
            <article>
            	<form name="myForm"  action="" method="post">
                <div id="labelBox">
                    E-mail:</br>
                    Password:</br>
                </div>
                <div id="inputBox">
                <input type="email"  name="email"/></br>
                <input type="password"  name="password"/></br>
                <input type="submit"  value="Login"/></br>
                </div>
            </form>
            </article>
        </section>
    </div>
    <footer>
        <nav>
            <a href="privacy.html">Privacy Statement</a>
            <a href="contact.html">Contact Us</a>
            <img src="images/chromelogo.jpg" alt="Chrome"/> 
        </nav>
    </footer>
    <script src="javascripts/currenttime.js"></script>
    <script type="text/javascript" src="javascripts/checkerboard.js"></script>
</body>
</html>