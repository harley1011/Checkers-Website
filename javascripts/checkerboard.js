var canvas = document.getElementById("checkerboard");
var context = canvas.getContext("2d");
var pieceSelected = false;
var pieceSelectedColumn;
var pieceSelectedRow;
var pieceMoves = Array();
var selectedPieceMoves = Array();
canvas.addEventListener('click', function(e){ selectPiece(e)}, false);
var checkerboardArray = eval( "(" + document.getElementById("checkerboardarray").value + ")");
function selectPiece(e)
{
	var rect = canvas.getBoundingClientRect();
	var columnSelect = Math.ceil((e.clientX - rect.left) / 80) - 1;
	var rowSelect = Math.ceil((e.clientY - rect.top) / 80) - 1;
	var playerTurn = document.getElementById('playerturn').value;
	getAllMoves(playerTurn);

	if (pieceSelected && checkerboardArray[columnSelect][rowSelect] != playerTurn)
	{	
		for ( var i=0; i < selectedPieceMoves.length; i++)
		{
			if (selectedPieceMoves[i].moveColumn == columnSelect && selectedPieceMoves[i].moveRow == rowSelect)
			{
				if ( selectedPieceMoves[i].move == "attack")
				{
						
					if ( selectedPieceMoves[i].playerTurn == "player1")
					{
						if ( selectedPieceMoves[i].column == columnSelect - 2)
							delete checkerboardArray[selectedPieceMoves[i].column - 1][selectedPieceMoves[i].Row +1];
						else
							delete checkerboardArray[selectedPieceMoves[i].column  + 1][selectedPieceMoves[i].Row +1];
					}
					else
					{
						if ( selectedPieceMoves[i].column == columnSelect - 2)
							delete checkerboardArray[selectedPieceMoves[i].column  - 1][selectedPieceMoves[i].Row -1];
						else
							delete checkerboardArray[selectedPieceMoves[i].column  + 1][selectedPieceMoves[i].Row  -1];
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
		      		alert(pieceMoves[i].moveRow + ' ' + pieceMoves[i].moveColumn);
					context.fillRect(80*pieceMoves[i].moveColumn,80*pieceMoves[i].moveRow,80,80);
					pieceSelected = true;
					selectedPieceMoves.push(pieceMoves[i]);
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
				if (playerTurn=="player1")
				{
					if (row < 6)
					{
						if (column > 1 && checkerboardArray[column - 1][row + 1] == "player2" && typeof checkerboardArray[column - 2][row + 2] == "undefined")
						{
							attackPossible = true;
							pieceMoves.push(new piece(playerTurn,row,column,"attack", row + 2, column - 2));
						}
						if (column < 6 && checkerboardArray[column + 1][row + 1] == "player2" && typeof checkerboardArray[column + 2][row + 2] == "undefined")
						{
							attackPossible = true;
						    pieceMoves.push(new piece(playerTurn,row,column,"attack", row + 2, column + 2));
						}
					}
				}
				else
				{
					
					if (row > 1)
					{
						if (column > 1 && checkerboardArray[column - 1][row - 1] == "player1" && typeof checkerboardArray[column - 2][row - 2] == "undefined")
						{
							attackPossible = true;
							pieceMoves.push(new piece(playerTurn,row,column,"attack", row - 2, column - 2));
						}
						if (column < 6 && checkerboardArray[column + 1][row - 1] == "player1" && typeof checkerboardArray[column + 2][row - 2] == "undefined")
						{
							attackPossible = true;
						    pieceMoves.push(new piece(playerTurn,row,column,"attack", row - 2, column + 2));
						}
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
		   		if (playerTurn=="player1")
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
   	alert(pieceMoves);
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
function getMoves(column, row,playerTurn, checkerboardArray)
{
	pieceMovesRow = Array();
	pieceMovesColumn = Array();
	if (playerTurn=="player1")
	{
		if (row != 7)
		{

			//alert(checkerboardArray[column + 1][row+ 1] );
			if (column != 0 && typeof checkerboardArray[column - 1][row + 1] == "undefined")
			{
				context.fillStyle= "yellow";
				context.fillRect(80*(column-1),80*(row+1),80,80);
				pieceMovesColumn.push(column-1);
				pieceMovesRow.push(row+1);
			}
			if (column != 7 && typeof checkerboardArray[column + 1][row + 1] == "undefined")
			{
				context.fillStyle= "yellow";
				context.fillRect(80*(column+1),80*(row+1),80,80);
				pieceMovesColumn.push(column+1);
				pieceMovesRow.push(row+1);
			}
		}
	}
	else 
	{
		if (row != 0)
		{

			//alert(checkerboardArray[column + 1][row+ 1] );
			if (column != 0 && typeof checkerboardArray[column - 1][row-1] == "undefined")
			{
				context.fillStyle= "yellow";
				context.fillRect(80*(column-1),80*(row-1),80,80);
				pieceMovesColumn.push(column-1);
				pieceMovesRow.push(row-1);
			}
			if (column != 7 && typeof checkerboardArray[column + 1][row-1] == "undefined")
			{
				context.fillStyle= "yellow";
				context.fillRect(80*(column+1),80*(row-1),80,80);
				pieceMovesColumn.push(column+1);
				pieceMovesRow.push(row-1);
			}
		}
	}
	return ( pieceMovesRow.length > 0);

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
	drawBoard();
	var circleXPos = 40;

	var circleYPos = 40;
	for ( var c = 0; c < checkerboardArray.length ; c++)
	{
		var object = checkerboardArray[c];
    	for (var property in object) {
        //alert('item ' + c + ': ' + property + '=' + object[property]);
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
