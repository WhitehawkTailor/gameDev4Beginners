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
    pipeAndHole.x-=pipeAndHole.speed; //v03 speed - pipe moves from right to left
    if(pipeAndHole.x<0) //if pipe is on the most left then jump to the most right
    {      
        pipeAndHole.x = canv.width;
        //v03
        pipeAndHole.holeY = Math.random() * (canv.height - pipeAndHole.holeSize);        
    }
    
    
    bird.y+=0.5; ////make bird fall down
    //if bird gous out down the screen then jump back to the middle
    if(bird.y>canv.height)
    {
        bird.y=150;
    }

    //v03
    //check collision with coordinates
    //check x coordinates
    if(pipeAndHole.x<bird.size)
    {
      //check y coordinates
      if( bird.y<pipeAndHole.holeY 
        || bird.y+bird.size > pipeAndHole.holeY+pipeAndHole.holeSize)
        {
          //if program gets here then there was a collision
          score = 0; //reset score
          pipeAndHole.x = canv.width; //pipe back to the right edge         
        }
    }




    
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
    
    //draw pipe
    //v03    
    c.fillStyle = 'green';
    c.fillRect(pipeAndHole.x, pipeAndHole.y, pipeAndHole.width, pipeAndHole.holeY);
    c.fillRect(pipeAndHole.x, pipeAndHole.y+pipeAndHole.holeY+pipeAndHole.holeSize, pipeAndHole.width, canv.height-(pipeAndHole.holeY+pipeAndHole.holeSize));
    

    //draw bird
    c.fillStyle = "blue";
    c.fillRect(bird.x, bird.y, 40,40);

    
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


var bird = 
{ 
    x:0, //left side of the canvas
    y:150, //start position
    //v03
    size:40 //size of the bird both in x and y direction
};
 //Object for pipe
 var pipeAndHole =
 {
   x:canv.width, //start position is the roght end of the canvas
   y:0, //starting from the top
   //v03
   holeY:100,//will be radom
   holeSize:200,//it is constant, but later can be random, or decreasing
   width:68, //pipe is 20 pixcel wide
   speed:8 //pipe steps speed pixels per frame
 };
 
//Register event handlers
canv.onclick = doClick;

//Register game loop
var interval = setInterval(gameLoop, 25); //1000ms/25ms = 40fps


