var canv = document.getElementById("myCanvas"); 
var c = canv.getContext("2d");
c.strokeStyle = "black";
c.beginPath();
c.arc(50, 50, 50, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();

//mosolygos
//fej
c.beginPath();
c.arc(200, 200, 100, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();
//szem
c.beginPath();
c.arc(150, 175, 20, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();
//szem
c.beginPath();
c.arc(250, 175, 20, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();
//száj
c.beginPath();
c.arc(200, 200, 75, 0.25 * Math.PI, 0.75 * Math.PI);  //2 * Math.PI = 360fok
c.stroke();


var cx, cy, r, sAngle, eAngle;
//kör 1
cx=150;
cy=175;
r=5;
sAngle=0;
eAngle=2* Math.PI ;
c.strokeStyle = "blue";
c.beginPath();
c.arc(cx, cy, r, sAngle, eAngle);
c.stroke();

//kör 2
cx=250;
cy=170;
r=5;
sAngle=0;
eAngle=2* Math.PI ;
c.strokeStyle = "green";
c.beginPath();
c.arc(cx, cy, r, sAngle, eAngle);
c.stroke();

//kör 3
cx=200;
cy=220;
r=20;
sAngle=0;
eAngle=2* Math.PI ;
c.strokeStyle = "purple";
c.beginPath();
c.arc(cx, cy, r, sAngle, eAngle);
c.stroke();

