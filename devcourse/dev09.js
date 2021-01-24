//have a surface to draw
var canv = document.getElementById("myCanvas"); //get the canvas from the browser document
var c = canv.getContext("2d"); //get a drawable panel from the canvas

//draw circle function
function circle(argX, argY, argR, argColor)
{
	c.beginPath();
	c.strokeStyle = argColor;
	c.arc(argX, argY, argR, 0, 2*Math.PI);
	c.stroke();
}

//draw a smile function
function drawSmile(argSmile)
{
	//fej
	circle(argSmile.x, argSmile.y, argSmile.size, argSmile.color);
	//szem
	circle(argSmile.x-argSmile.size/2, argSmile.y-argSmile.size/3, argSmile.size/6, argSmile.color);
	//szem
	circle(argSmile.x+argSmile.size/2, argSmile.y-argSmile.size/3, argSmile.size/6, argSmile.color);
	
	//sz�j
	c.strokeStyle = argSmile.color;
	c.beginPath();
	c.arc(argSmile.x, argSmile.y, argSmile.size/2, 0.25 * Math.PI, 0.75 * Math.PI);  //2 * Math.PI = 360fok
	c.stroke();
}


//create an object to store parameters for a smile
var mySmile = { x: 200, y: 200, size: 100, color: "red"};    

//draw the smile
drawSmile (mySmile);

mySmile.x=50;
mySmile.size=30;
drawSmile (mySmile);