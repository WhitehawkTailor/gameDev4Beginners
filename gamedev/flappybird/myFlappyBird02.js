////////////////////
/////Event handlers
///////////////////
function doClick()
{
   //minus equal 50
   bird.y-=50; //mouse click lifts the bird
}


////////////////////
/////Functions
///////////////////




////////////////////
///// gameLoop
///////////////////
function gameLoop()
{
    //CALCULATIONS
    pipeAndHole.x-=1; //pipe moves from right to left
    if(pipeAndHole.x<0) //if pipe is on the most left then jump to the most right
    {
        pipeAndHole.x = canv.width;
        pipeAndHole.height=Math.random()*(canv.height-100);  //
    }
    
    
    bird.y+=0.5; ////make bird fall down
    //if bird gous out down the screen then jump back to the middle
    if(bird.y>canv.height  || bird.y<0)
    {
        bird.y=150;
    }

    //v02
    //increase score
    score++;//player gets score for every frame without collision
    //recognize the best score
    if(score>bestScore)
    {
    bestScore = score;
    }


//DISPLAY
    //clear background
    c.fillStyle = "skyblue";
    c.fillRect(0,0,canv.width,canv.height); // Fill the whole canvas with sky
    
    //drax pipe
    c.fillStyle = "green";
    c.fillRect(pipeAndHole.x,0,15,canv.height);

    //draw bird
    c.fillStyle = "blue";
    c.fillRect(bird.x, bird.y, 40,40);

    //v02
    //print out scores
    c.font = "25px Verdana";
    c.fillStyle = "black";
    c.fillText(score, 200, 25);
    c.fillText("Best:"+bestScore, 5, 25);

} //END of gameLoop


////////////////////
/////Main
///////////////////


//get the gfx from the browser
var canv = document.getElementById("myCanvas");//elkérni a Canvast ID alapján
c = canv.getContext("2d"); //létrehozza a rajzoló objektumunkat c névvel.

//Global variables
//v02
var score =0;//store points
var bestScore =0;//store the most score


var bird = { x:0, y:150};
var pipeAndHole = { x:canv.width, y:0, height:100 };

//Register event handlers
canv.onclick = doClick;

//Register game loop
var interval = setInterval(gameLoop, 25); //1000ms/25ms = 40fps


