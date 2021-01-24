//have a surface to draw
var canv = document.getElementById("myCanvas"); //get the canvas from the browser document
var c = canv.getContext("2d"); //get a drawable panel from the canvas

document.onkeydown = doKeyDown;  //key press on the document - this is the whole browser

function doKeyDown(e)
{
	console.log(e.keyCode); //write out the key code
	if ( e.keyCode == 39 ) // if key code is 33, then...
	{
		mySmile.x = mySmile.x + 1; //növeld az X koordinátát
		drawSmile( mySmile );
	}

}

canv.onclick = doClick;  //click on the canvas - this is only the canvas
function doClick(e)
{
	console.log("X:"+e.offsetX + "y:"+e.offsetY);  //offset on the canvas
	var dx =dy = 0;  //lokális segédváltozó
if( mySmile.x < e.offsetX) //x lépés irány és érték beállítása
{
  dx = 1;
}
if( mySmile.x > e.offsetX)
{
  dx = -1;
}
if( mySmile.y < e.offsetY) //x lépés irány és érték beállítása
{
  dy = 1;
}
if( mySmile.y > e.offsetY)
{
  dy = -1;
}
//Léptetés
mySmile.x = mySmile.x + dx;
mySmile.y = mySmile.y + dy;
drawSmile(mySmile); //kirajzolás

}




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
	
	//száj
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