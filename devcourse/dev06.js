var canv = document.getElementById("myCanvas"); 
var c = canv.getContext("2d");

function circle(argX, argY, argR, argColor)
{
	c.beginPath();
	c.strokeStyle = argColor;
	c.arc(argX, argY, argR, 0, 2*Math.PI);
	c.stroke();
}

//bal fent
c.strokeStyle = "black";
c.beginPath();
c.arc(50, 50, 50, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();

//mosolygos
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
