<?php
require_once("headerlayout.php");
?>

<table id="userList" border="0">

</table>
<button id="firstButton" type="button" onclick="firstPage()">First</button>
<button id="prevButton" type="button" onclick="prevPage()">Prev</button>
<span id="pageNumber">1</span>
<button id="nextButton" type="button" onclick="nextPage()">Next</button>
<button id="lastButton" type="button" onclick="lastPage()">Last</button>

  <script type="text/javascript" src="javascripts/navigationcontrols.js">
   </script>
<?php
require_once("footerlayout.php");
?>


