<?php
require_once("headerlayout.php");
?>

<table id="userList" border="0">

</table>
<button type="button" onclick="firstPage()">First</button>
<button type="button" onclick="prevPage()">Prev</button>
<span id="pageNumber">1</span>
<button type="button" onclick="nextPage()">Next</button>
<button type="button" onclick="lastPage()">Last</button>
<button type="button" onclick="test()">Test</button>
  <script type="text/javascript" src="javascripts/navigationcontrols.js">
   </script>
<?php
require_once("footerlayout.php");
?>


