<?php
$file = fopen("members.txt","a");
fwrite($file,"fname:" . $_POST['fname']  . " lname:" . $_POST['lname'] .
" phonenum:" . $_POST['phonenum'] . " email:" . $_POST['email'] . " password:" . $_POST['password'] . "\r\n");

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
            	<?php
            		echo '<h2>Account created</h2>';
            		echo "<p>   Username/E-mail: " . $_POST['email'];
            		echo "</br>            Name: " . $_POST['fname']  . " " . $_POST['lname']; 
            		echo "</br>    Phone number: " . $_POST['phonenum'] . "</p>";
            	?>
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
        <script src="javascripts/validateform.js"></script>
</body>
</html>
