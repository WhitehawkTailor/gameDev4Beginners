////////////////////
/////Event handlers
///////////////////
function doClick()
{
  //v05
  if(status==1)//check this first, because more click will be in status 1
  {   
   bird.dy = -bird.jump; //add antigravity to the accelerate vector
   return; //don't vaste time on testing the status==0
  }

  if(status==0) //game is stopped
  {
    status=1;
    return;
  }
}//END of doClick


////////////////////
/////Functions
///////////////////

//v05
/**
 * Displays the score information
 */
function printScore()
{
    //print out scores
    c.font = "25px Verdana";
    c.fillStyle = "black";
    c.fillText(score, canv.width/2-c.measureText(score).width/2, 25); //aim the middle
    c.fillText("Best:"+bestScore, 5, 25);
}

//v05
/**
 * Displays the bird
 */
function drawBird()
{
    //draw bird
    c.fillStyle = "blue";
    c.fillRect(bird.x, bird.y, 40,40);
}


//v05
/**
 * Displays the background
 */
function drawBackground()
{
  //clear background
  c.fillStyle = "skyblue";
  c.fillRect(0,0,canv.width,canv.height); // Fill the whole canvas with sky
}

//v05
/**
 * Display the pipe
*/
function drawPipe()
{
  //draw pipe
    //v03    
    c.fillStyle = 'green';
    c.fillRect(pipeAndHole.x, pipeAndHole.y, pipeAndHole.width, pipeAndHole.holeY);
    c.fillRect(pipeAndHole.x, pipeAndHole.y+pipeAndHole.holeY+pipeAndHole.holeSize, pipeAndHole.width, canv.height-(pipeAndHole.holeY+pipeAndHole.holeSize));
}

function printStartMessage()
{

}

/**
 * Initiate the game variables and objects
 * Displays a screen with the objects (bird, pipe)
 * Displays score information and how to start.
 * Makes the game waiting for a click to start by setting the status to zero.
 */
function gameStart()
{
  status = 0; //set the status 
  //madár alaphelyzet
  bird.y = 150; 
  bird.dy = -bird.jump; //kezdjük egy ugrassal
  //akadály alaphelyzet
  pipeAndHole.x = canv.width-20;  //lógjon be egy kicsit a cső a képbe
  pipeAndHole.holeY = Math.random() * (canv.height - pipeAndHole.holeSize);        
  //megjelenítések
  drawBackground();
  drawPipe();
  drawBird();
  printScore();  
  //print the message
  var txt = "Click 2 Start!";
  var txt2 = "click to fly";
  c.fillStyle = "black";
  c.font = "40px Verdana"; //sets a bigger font size
  c.fillText(txt, canv.width/2-c.measureText(txt).width/2, canv.height*0.3);
  c.font = "30px Verdana"; //sets a bigger font size
  c.fillText(txt2, canv.width/2-c.measureText(txt2).width/2, canv.height*0.6);
  score = 0; //reset score
}

 
////////////////////
///// gameLoop
///////////////////
function gameLoop()
{

  if(status==0)return;


    //CALCULATIONS
    pipeAndHole.x-=pipeAndHole.speed; //v03 speed - pipe moves from right to left
    if(pipeAndHole.x<-pipeAndHole.width) //if pipe is on the most left then jump to the most right
    {      
        pipeAndHole.x = canv.width;
        //v03
        pipeAndHole.holeY = Math.random() * (canv.height - pipeAndHole.holeSize);        
    }
    
    //v04
    //calculate bird movement
		bird.dy += 0.5;//add gravity to move vector
		bird.y += bird.dy;//add move vector to former position
    
    //if bird gous out down or UP the screen then jump back to the middle
    if(bird.y>canv.height || bird.y<0)
    {   
      //05   
      gameStart();
      return;
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
          //v05     
          gameStart();
          return;
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
    drawBackground();
    drawPipe();    
    drawBird();
    printScore();

} //END of gameLoop


////////////////////
/////Main
///////////////////


//get the gfx from the browser
var canv = document.getElementById("myCanvas");//elkérni a Canvast ID alapján
c = canv.getContext("2d"); //létrehozza a rajzoló objektumunkat c névvel.

//Global variables
//v02
var score = 0;//store points
var bestScore =0;//store the most score
//v05
var status = 0; //0-start, 1-game

var bird = 
{ 
    x:0, //left side of the canvas
    y:150, //start position
    //v03
    size:40, //size of the bird both in x and y direction
    //v04
    dy:-10, //let's start with a jump
    jump:10 //size of the jump
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
//v05
gameStart();
//Register game loop
var interval = setInterval(gameLoop, 25); //1000ms/25ms = 40fps


