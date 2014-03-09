var canvas = document.getElementById("checkerboard");
var context = canvas.getContext("2d");

context.fillStyle="black";
context.fillRect(0,0,640,640);
context.fillStyle= "grey";
for( var r = 0; r < 8; r++)
{
	for ( var c = 0; c < 8; c++)
		if ( (r+c)%2== 0 ) context.fillRect(80*c,80*r,80,80);
}
function selectPiece(e)
{
	var playerTurn = document.getElementById('playerturn').value;
	if (playerTurn != false)
	{
		if (playerTurn == "player1")
			
		var canvas = document.getElementById('checkerboard');
		var rect = canvas.getBoundingClientRect();
		var column = Math.ceil((e.clientX - rect.left) / 80) - 1;
		var row = Math.ceil((e.clientY - rect.top) / 80) - 1;
		var canvas = document.getElementById("checkerboard");
		var context = canvas.getContext("2d");
		if (column != 7 && row != 7)
		{
			if ()
		}
	}



}
function drawPieces()
{
	var canvas = document.getElementById("checkerboard");
	var context = canvas.getContext("2d");
	canvas.addEventListener('click', function(e){ selectPiece(e)}, false);
	var checkerboardArray = eval( "(" + document.getElementById("checkerboardarray").value + ")");
	var circleXPos = 40;

	var circleYPos = 40;
	for ( var c = 0; c < checkerboardArray.length ; c++)
	{
		var object = checkerboardArray[c];
    	for (var property in object) {
       // alert('item ' + c + ': ' + property + '=' + object[property]);
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
