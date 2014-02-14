var canvas = document.getElementById("checkerboard");
var context = canvas.getContext("2d");
context.fillStyle="black";
context.fillRect(0,0,640,640);
context.fillStyle= "grey";

for( var r = 0; r < 8; r++)
{
	for ( var c = 0; c < 8; c++)
		if ( (r+c)%2== 0 ) zcontext.fillRect(80*c,80*r,80,80);
}
function drawPieces()
{
	var canvas = document.getElementById("checkerboard");
	var context = canvas.getContext("2d");
	var circleXPos = 40;
	for ( var c = 1; c <= 8; c++)
	{
	if ( c%2 == 0)
	{
		drawCircle(circleXPos,120,30,0,2*Math.PI,"white",canvas,context);
		drawCircle(circleXPos,440,30,0,2*Math.PI,"red",canvas,context);
		drawCircle(circleXPos,600,30,0,2*Math.PI,"red",canvas,context);
		circleXPos += 80;
	}
	else
	{
		drawCircle(circleXPos,40,30,0,2*Math.PI,"white",canvas,context);
		drawCircle(circleXPos,200,30,0,2*Math.PI,"white",canvas,context);
		drawCircle(circleXPos,520,30,0,2*Math.PI,"red",canvas,context);
		circleXPos += 80;
		context.fill();	
		
	}


		context.fill();	
	}
}
function drawCircle(x, y, r, t,a, color,canvas,context )
{
	context.fillStyle= color;
	context.beginPath();
	context. arc(x,y,r,0,a);
	context.fill();	
}