var canv = document.getElementById("myCanvas"); 
var c = canv.getContext("2d");

function circle(argX, argY, argR, argColor)
{
	c.beginPath();
	c.strokeStyle = argColor;
	c.arc(argX, argY, argR, 0, 2*Math.PI);
	c.stroke();
}


function drawSmile(argX, argY, argSize, argColor)
{
	//mosolygos
	//fej
	circle(argX, argY, argSize, argColor);
	//szem
	circle(argX-argSize/2, argY-argSize/3, argSize/6, argColor);
	//szem
	circle(argX+argSize/2, argY-argSize/3, argSize/6, argColor);
	
	//száj
	c.strokeStyle = argColor;
	c.beginPath();
	c.arc(argX, argY, argSize/2, 0.25 * Math.PI, 0.75 * Math.PI);  //2 * Math.PI = 360fok
	c.stroke();
}




//kör bal fent
c.strokeStyle = "black";
c.beginPath();
c.arc(50, 50, 50, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();

//mosolygos a circle függvénnyel rajzolva
//fej
circle(200, 200, 100, "black");
//szem
circle(150, 175, 20, "black");
//szem
circle(250, 175, 20, "black");
//száj
c.beginPath();
c.arc(200, 200, 75, 0.25 * Math.PI, 0.75 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();

//mosolygos kirakása saját függvényekkel
drawSmile (50,50,50, "red");
drawSmile (350,50,50, "blue");
drawSmile (50,350,50, "green");
drawSmile (350,350,50, "black");


//kör rajzolása változokkal
var cx, cy, r, sAngle, eAngle;
//kör 1
cx=150;
cy=175;
r=5;
circle(cx, cy, r, "blue");

//kör 2
cx=250;
cy=170;
r=5;
circle(cx, cy, r, "green");

//kör 3
cx=200;
cy=220;
r=20;
circle(cx, cy, r, "red");



//10 kör rajzolása ciklussal
cx=150;
cy=350;
r=50;

for(var i=0; i<10; i=i+1)
{
	circle(cx+i*5, cy, r, "blue");
}

//az i változó máshol is szerepel. Több kör, sürübben, növekvo sugárral
cx=150;
cy=50;
r=25;
for(var i=0; i<20; i++)
{
	circle(cx+i*5, cy+i, r+0.5*i, "blue");
}




