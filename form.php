<?php
require_once("headerlayout.php");
?>

<form name="myForm"  action="" method="post">
    <div id="labelBox">
        First Name:</br>
        Last Name:</br>
        Phone Number:</br>
        Email:</br>
        Password:</br>
        Password Confirm:</br>
    </div>
    <div id="inputBox">
    <input type="text"  name="fname" value="<?php echo htmlspecialchars($fname); ?>" ></br>
    <input type="text"  name="lname" value="<?php echo htmlspecialchars($lname); ?>"/></br>
    <input type="text"  name="phonenum" value="<?php echo htmlspecialchars($phonenum); ?>"/></br>
    <input type="text"  name="email" value="<?php echo htmlspecialchars($email); ?>"/></br>
    <input type="password"  name="password" /></br>
    <input type="password"  name="passwordconfirm"/></br>
    <input type="submit"  value="Submit"/></br>
    </div>
</form>
<?php
require_once("footerlayout.php");
?>