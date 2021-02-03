var canv = document.getElementById("myCanvas"); 
var c = canv.getContext("2d");
c.strokeStyle = "black";
c.beginPath();
c.arc(100, 75, 50, 0, 2 * Math.PI);  //2 * Math.PI = 360fok
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
