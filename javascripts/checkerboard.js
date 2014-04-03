var canvas = document.getElementById("checkerboard");
var context = canvas.getContext("2d");
var pieceSelected = false;
var pieceSelectedColumn;
var pieceSelectedRow;
var pieceMoves = Array();
var selectedPieceMoves = Array();
if ( document.getElementById('gameOrView').value == "true")
canvas.addEventListener('click', function(e){ selectPiece(e)}, false);
var checkerboardArray = eval( "(" + document.getElementById("checkerboardarray").value + ")");
var player = document.getElementById('player').value;
drawPieces();
checkerboardSetAjaxCall();
function selectPiece(e)
{

	var rect = canvas.getBoundingClientRect();
	var columnSelect = Math.ceil((e.clientX - rect.left) / 80) - 1;
	var rowSelect = Math.ceil((e.clientY - rect.top) / 80) - 1;
	var playerTurn = document.getElementById('playerturn').value;
if (playerTurn == player)
{
	getAllMoves(playerTurn);

	if (pieceSelected && checkerboardArray[columnSelect][rowSelect] != playerTurn)
	{	
		for ( var i=0; i < selectedPieceMoves.length; i++)
		{
			if (selectedPieceMoves[i].moveColumn == columnSelect && selectedPieceMoves[i].moveRow == rowSelect)
			{
				if ( selectedPieceMoves[i].move == "attack")
				{
						
					if ( selectedPieceMoves[i].row == selectedPieceMoves[i].moveRow - 2)
					{
						if ( selectedPieceMoves[i].column == columnSelect - 2)
							delete checkerboardArray[columnSelect - 1][rowSelect -1];
						else if (selectedPieceMoves[i].column == columnSelect + 2)
							delete checkerboardArray[columnSelect + 1][rowSelect -1];
					}
					else
					{
						if ( selectedPieceMoves[i].column == columnSelect - 2)
							delete checkerboardArray[columnSelect  - 1][rowSelect +1];
						else
							delete checkerboardArray[columnSelect + 1][rowSelect  +1];
					}
					delete checkerboardArray[selectedPieceMoves[i].column][selectedPieceMoves[i].row];
					checkerboardArray[selectedPieceMoves[i].moveColumn][selectedPieceMoves[i].moveRow] = playerTurn;
				}
				else
				{
					checkerboardArray[columnSelect][rowSelect] = playerTurn;
					delete checkerboardArray[selectedPieceMoves[i].column][selectedPieceMoves[i].row];
				}
				drawPieces();
				document.getElementById('checkerboardarray').value = JSON.stringify(checkerboardArray);
				if (playerTurn == "player1")
					document.getElementById('playerturn').value = "player2";
				else
					document.getElementById('playerturn').value = "player1";
				document.getElementById('myForm').submit();
			}
		}
	}
	else
	{
		if (playerTurn != false)
		{	
			drawPieces();
			for ( var i = 0; i< pieceMoves.length; i++)
			{
				if (pieceMoves[i].row == rowSelect && pieceMoves[i].column == columnSelect)
				{

					if (playerTurn == "player1")
						drawCircle(40 + 80 * columnSelect,40 + 80 * rowSelect,30,0,2*Math.PI,"white",canvas,context);
					else
						drawCircle(40 + 80 * columnSelect,40 + 80 * rowSelect,30,0,2*Math.PI,"red",canvas,context);	
					context.lineWidth = 5;
		      		context.strokeStyle = 'yellow';
		      		context.stroke();
		      		context.lineWidth = 0;
		      		context.fillStyle= "yellow";
					context.fillRect(80*pieceMoves[i].moveColumn,80*pieceMoves[i].moveRow,80,80);
					pieceSelected = true;
					selectedPieceMoves.push(pieceMoves[i]);
				}
			}
		}
	}
}
}
function getAllMoves(playerTurn)
{
	pieceMoves = Array();
	var attackPossible = false; 
	for ( var column = 0; column < checkerboardArray.length ; column++)
	{
		var object = checkerboardArray[column];
    	for (var row in object) 
    	{
        	if ( object[row] == playerTurn )
			{
				var otherPlayer;
				if (player=="player1")
					otherPlayer="player2";
				else
					otherPlayer="player1";
				row = parseInt(row);
				if (row < 6)
				{
					if (column > 1 && checkerboardArray[column - 1][row + 1] == otherPlayer && typeof checkerboardArray[column - 2][row + 2] == "undefined")
					{
						attackPossible = true;
						pieceMoves.push(new piece(playerTurn,row,column,"attack", row + 2, column - 2));
					}
					if (column < 6 && checkerboardArray[column + 1][row + 1] == otherPlayer && typeof checkerboardArray[column + 2][row + 2] == "undefined")
					{
						attackPossible = true;
					    pieceMoves.push(new piece(playerTurn,row,column,"attack", row + 2, column + 2));
					}
				}
				if (row > 1)
				{
					if (column > 1 && checkerboardArray[column - 1][row - 1] == otherPlayer && typeof checkerboardArray[column - 2][row - 2] == "undefined")
					{
						attackPossible = true;
						pieceMoves.push(new piece(playerTurn,row,column,"attack", row - 2, column - 2));
					}
					if (column < 6 && checkerboardArray[column + 1][row - 1] == otherPlayer && typeof checkerboardArray[column + 2][row - 2] == "undefined")
					{
						attackPossible = true;
					    pieceMoves.push(new piece(playerTurn,row,column,"attack", row - 2, column + 2));
					}
				}	
	        }
		}
   	}
   	if (!attackPossible)
   	{
   		for ( var column = 0; column < checkerboardArray.length ; column++)
		{
			var object = checkerboardArray[column];
	    	for (var row in object) 
	    	{
		   		if (player=="player1")
				{
					if (row != 7)
					{
						row = parseInt(row);
						if (column != 0 && typeof checkerboardArray[column - 1][row + 1] == "undefined")
						{
							pieceMoves.push(new piece(playerTurn,row,column,"move", row + 1, column - 1));
						}
						if (column != 7 && typeof checkerboardArray[column + 1][row + 1] == "undefined")
						{
							pieceMoves.push(new piece(playerTurn,row,column,"move", row + 1, column + 1));
						}
					}
				}
				else 
				{
					if (row != 0)
					{
						if (column != 0 && typeof checkerboardArray[column - 1][row-1] == "undefined")
						{
							pieceMoves.push(new piece(playerTurn,row,column,"move", row - 1, column - 1));
						}
						if (column != 7 && typeof checkerboardArray[column + 1][row-1] == "undefined")
						{
							pieceMoves.push(new piece(playerTurn,row,column,"move", row - 1, column + 1));
						}
					}
				}
			}
		}
   	}
}
function piece(playerTurn, row, column, move, moveRow, moveColumn)
{
	this.playerTurn = playerTurn;
	this.row = row;
	this.column = column;
	this.move = move;
	this.moveRow = moveRow;
	this.moveColumn = moveColumn;
}

function drawBoard()
{
	context.clearRect ( 0 , 0 , 640 , 640 );
	context.fillStyle="black";
	context.fillRect(0,0,640,640);
	context.fillStyle= "grey";
	for( var r = 0; r < 8; r++)
	{
		for ( var c = 0; c < 8; c++)
			if ( (r+c)%2== 0 ) context.fillRect(80*c,80*r,80,80);
	}
}
function drawPieces()
{
	canvas = document.getElementById("checkerboard");
    context = canvas.getContext("2d");
	drawBoard();
	var circleXPos = 40;
	//alert("here");
	var circleYPos = 40;
	for ( var c = 0; c < checkerboardArray.length ; c++)
	{
		var object = checkerboardArray[c];
    	for (var property in object) {
        	if ( object[property] == "player1" )
					drawCircle(circleXPos + 80 * c,circleYPos + 80 * property,30,0,2*Math.PI,"white",canvas,context);
				else
					drawCircle(circleXPos + 80 * c,circleYPos + 80 * property,30,0,2*Math.PI,"red",canvas,context);
				context.fill();
   		 }
	}	
}
function drawCircle(x, y, r, t,a, color,canvas,context )
{
	context.fillStyle= color;
	context.beginPath();
	context. arc(x,y,r,0,a);
	context.fill();	
}
function checkerboardSetAjaxCall()
{
	 setInterval(function(){updateCheckerboard()},5000);
}
function updateCheckerboard()
{
	if (document.getElementById('player').value != document.getElementById('playerturn').value)
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    document.getElementById("content").innerHTML = xmlhttp.responseText;
		   	checkerboardArray = eval( "(" + document.getElementById("checkerboardarray").value + ")");
			 player = document.getElementById('player').value;
		   //alert(xmlhttp.responseText)
		    drawPieces();
		     canvas.addEventListener('click', function(e){ selectPiece(e)}, false);
		    }
		  }
		  xmlhttp.open("GET","checkerboard.php",true);
		  xmlhttp.send();
	}
	  
}