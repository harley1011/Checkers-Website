var xmlhttp;
var targetPage;
var numberOfUsers = 0;
var numberOfUsersPerPage = 5;
loadUsers(0);

function firstPage()
{
	loadUsers(0);
}
function prevPage()
{
	if ( targetPage != 0)
		loadUsers(targetPage-1);
}
function nextPage()
{
	if ( targetPage <= numberOfUsers / numberOfUsersPerPage)
	loadUsers(targetPage+1);
}
function lastPage()
{
	loadUsers(Math.ceil(numberOfUsers/numberOfUsersPerPage) - 1);
}
function loadUsers(pageNumber)
{
	targetPage = pageNumber;
 	xmlhttp=new XMLHttpRequest();
 	xmlhttp.onreadystatechange=ajaxCallback;
 	xmlhttp.open("GET", "userpage.php?page="+pageNumber, true);
 	xmlhttp.send();
	  
}
function ajaxCallback() {

	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		showUsers(JSON.parse(xmlhttp.responseText));
    }
}
function enableOrDisableControls()
{
	if ( targetPage == 0)
	{
		document.getElementById("firstButton").disabled = true;
		document.getElementById("prevButton").disabled = true;
	}
	else
	{
		document.getElementById("firstButton").disabled = false;
		document.getElementById("prevButton").disabled = false;
	}
	if (targetPage >= numberOfUsers/numberOfUsersPerPage -1)
	{
		document.getElementById("lastButton").disabled = true;
		document.getElementById("nextButton").disabled = true;
	}
	else
	{
		document.getElementById("lastButton").disabled = false;
		document.getElementById("nextButton").disabled = false;
	}




}
function showUsers(result) {
	var table = document.getElementById("userList");
	while(table.childNodes.length >0) {
		table.removeChild(table.firstChild);
	}
	var numberOfUsersOnPage = result[1];
	numberOfUsers = result[0];
	var paging = document.getElementById("pageNumber");
	paging.innerHTML = targetPage+1 + ' of ' + Math.ceil(numberOfUsers/ numberOfUsersPerPage);
	enableOrDisableControls(); 
	for ( var i = 2; i < numberOfUsersOnPage + 2; i++)
	{
		var tr = document.createElement("tr");
		var tdImg = document.createElement("td");
		var tdEmail = document.createElement("td");
		var tdWin = document.createElement("td");
		var tdLoss = document.createElement("td");
		var tdButton = document.createElement("td");

		tdImg.innerHTML = '<img id="tableimg" src="images/defaultuserpicture.png" alt="pic"/>';
		tdEmail.innerHTML =  result[i].email;
		tdWin.innerHTML = " Wins: " +  result[i].win;
		tdLoss.innerHTML = " Loss: " + result[i].loss;
		if (result[i].buttontype == "view")
			tdButton.innerHTML = '<td><form action="checkerboardview.php" method="post"><input type="submit" value="View Game" /><input type="hidden" name="email" value="' +  result[i].email + '"/></td></form>';
		else
			tdButton.innerHTML = '<td><form action="challenge.php" method="post"><input type="submit" value="Challenge"/><input type="hidden" name="email" value="' +   result[i].email + '"/></td></form>';
		tr.appendChild(tdImg);
		tr.appendChild(tdEmail);
		tr.appendChild(tdWin);
		tr.appendChild(tdLoss);
		tr.appendChild(tdButton);

		table.appendChild(tr);
	}

	
}

