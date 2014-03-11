var canvas = document.getElementById("checkerboard");
var context = canvas.getContext("2d");
var pieceSelected = false;
var pieceSelectedColumn;
var pieceSelectedRow;
var pieceMoves = Array();
var pieceMovesColumn = Array();
var pieceMovesRow = Array();
canvas.addEventListener('click', function(e){ selectPiece(e)}, false);
var checkerboardArray = eval( "(" + document.getElementById("checkerboardarray").value + ")");
function selectPiece(e)
{
	var rect = canvas.getBoundingClientRect();
	var column = Math.ceil((e.clientX - rect.left) / 80) - 1;
	var row = Math.ceil((e.clientY - rect.top) / 80) - 1;
	var playerTurn = document.getElementById('playerturn').value;
	if (pieceSelected && checkerboardArray[column][row] != playerTurn )
	{	
		for ( var i=0; i < pieceMovesColumn.length; i++)
		{
			if (pieceMovesColumn[i] == column && pieceMovesRow[i] == row)
			{
				delete checkerboardArray[pieceSelectedColumn][pieceSelectedRow];
				checkerboardArray[column][row] = playerTurn;
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
			if ( checkerboardArray[column][row] == playerTurn )
			{
				if (playerTurn == "player1")
					drawCircle(40 + 80 * column,40 + 80 * row,30,0,2*Math.PI,"white",canvas,context);
				else
					drawCircle(40 + 80 * column,40 + 80 * row,30,0,2*Math.PI,"red",canvas,context);					
				context.lineWidth = 5;
	      		context.strokeStyle = 'yellow';
	      		context.stroke();
	      		context.lineWidth = 0;
	      		pieceSelected = true;
	      		pieceSelectedColumn = column;
	      		pieceSelectedRow = row;
			}
		}
	}
}
function getAllMoves(playerTurn)
{
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
					if (row < 1)
					{
						if (column > 1 && checkerboardArray[column - 1][row - 1] == "player1" && typeof checkerboardArray[column - 2][row - 2] == "undefined")
						{
							attackPossible = true;
							pieceMoves.push(new piece(playerTurn,property,"attack", row-2, column-2, true));
						}
						if (column < 6 && checkerboardArray[column + 1][row - 1] == "player1" && typeof checkerboardArray[column + 2][row + 2] == "undefined")
						{
							attackPossible = true;
						    pieceMoves.push(new piece(playerTurn,row,column,"attack", row + 2, column + 2));
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
