var xmlhttp;
var targetPage;
loadUsers(0);
function test()
{
	 	alert("hes");
	loadUsers(0);
}
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
	loadUsers(targetPage+1);

}
function lastPage()
{


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

function showUsers(result) {
	var table = document.getElementById("userList");
	while(table.childNodes.length >0) {
		table.removeChild(table.firstChild);
	}
	
	for ( var i = 0; i < 5; i++)
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
			tdButton.innerHTML = '<form action="index.php" method="post"><input type="submit" value="View Game" /><input type="hidden" name="email" value="' +  result[i].email + '"/></td></form>';
		else
			tdButton.innerHTML = '<td><form action="challenge.php" method="post"><input type="submit" value="Challenge"/><input type="hidden" name="email" value="' +   result[i].email + '"/></td></form>';
		tr.appendChild(tdImg);
		tr.appendChild(tdEmail);
		tr.appendChild(tdWin);
		tr.appendChild(tdLoss);
		tr.appendChild(tdButton);

		table.appendChild(tr);
	}
		var paging = document.getElementById("pageNumber");
		paging.innerHTML = targetPage+1; 
	
}

