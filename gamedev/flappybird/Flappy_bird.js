/**
 * Flappy Bird clone
 * 2021-01-28
 * Author - Akos Szabo - aaszabo@gmail.com - www.axigen.hu
 * GitHub - WhitehawkTailor - https://github.com/WhitehawkTailor/gameDev4Beginners
 * 
 * This program belongs to a 4 days training for beginners in programing.
 * The second part of the training is to create a simple game.
 * The training builds up this program step-by step.
 * This is the end result with all the function, feature and demonstration possibilities 
 * 
 * The game is not perfect from development point of view.
 * Many thing could be better, like Object orinted strucure or collision detection etc.
 * The intention is to demonstrate how easy is to create a game even for beginners.
 * No need for complex structures, real objects, etc.
 * 
 * Presentations of the training and the program phases in separated files are also on GitHub.
 */


////////////////////////
//// Event listeners
////////////////////////

/**
 * Mouse click event handler
 * Program reacts on mouse click according to the game status.
 */
function doClick()
{
  if(status==1) //most possible scenario, so check this first
  {
    //jump the bird
    bird.dy = -bird.jump;
    return;
  }
  
  if(status == 2)return;  //skip it during the blast animation
  
  if(status == 0) //if game waits for start click
  {
    //unfreeze the game
    status = 1;
    if(soundVersion==1)audioAmbient.play();   
    return;
  }

  
}

/**
 * Browser calls this when a key is pressed
 * @param e event
 * it is used to sense SPACE hit
 * If we are in game mode (status=1) then it makes jump the bird
 */
function doKeyDown(e)
{	
	if ( e.keyCode == 32 ) // if key code is 32 SPACE
	{
    if(status==1)bird.dy = -bird.jump; //do it only in play game mode
	}
}

/**
 * Set parameters of the game.
 * Handles the event fired by the HTML forms on the parent HTML page.
 * This notifies the change in the From.
 * Ask the actual values and set the internal variables accordingly
 */
function doSetting()
{
  //if formerly was 0 then play
  try
  {
    if(soundVersion==0 && document.forms.setup.sound.value==1)audioAmbient.play();
    if(soundVersion==1 && document.forms.setup.sound.value==0)audioAmbient.pause();      
  } catch (error)
  {
    console.log("doSetting audio is not ready");
  }

  soundVersion = document.forms.setup.sound.value;
  bckgVersion = document.forms.setup.bckg.value;
  birdVersion = document.forms.setup.bird.value;
  pipeVersion = document.forms.setup.column.value;
  collisionShow  = document.forms.setup.collision.value;

  if(status==0)gameRestart();
}


/////////////////////////////////
////////// Game Loop
/////////////////////////////////

/**
 * Stabilize the fps by calculationg cycle time.
 * Run the doTheGame with perfect timing for required fps
 */
function gameLoop()
{
  var start = new Date().getMilliseconds();
  doTheGame();
  var elapsed = new Date().getMilliseconds() - start;
  
  var myVar;
  var diff = 30-elapsed;
  if(diff>5)
  {
    myVar = setTimeout(gameLoop, diff);
  }
  else
  {
    myVar = setTimeout(gameLoop, 5);
  }  
}//END of gameLoop

/*
@DESC Main function of the game.
Cyclicly called by the gameLoop
Calculates movements and collisions
Draws the game area and objects
*/
  function doTheGame()
  {
    //This is the blast effect
    if( status == 2)//collision
    {
      if(collisionTimer==0)
      {
        if(soundVersion==1)audioCrash.play();
        collisionPhase=0;
      }
      
      drawBackground();
      drawPipe();  
      printScore();    
      //draw blast
      try{
      c.drawImage(explPic,(collisionPhase%16)*expW, 0, expW, 70, bird.x, bird.y, expW, 70);
    }
      catch(err)
      {
        console.log("Err:" + err 
        + " img complete:" + explPic.complete 
        + " img width:" + explPic.width
        + " img height:" + explPic.height
        + " expW:" + expW
        + " collisionPhase:"+collisionPhase);
      }

      
      //measure collision time
      collisionTimer++;
      if(collisionTimer>120)
      {
        gameRestart();
      }
      //make the collision animation step
      if(collisionTimer%8==0)collisionPhase++;
    }//end of blast effect
    
    //manage game status
    //go on only if we are in  game play status, otherwise return
    if(status != 1)
    {
      return;
    }
    
    //CALCULATION
		//calculate bird movement
		bird.dy += 0.5;//add gravity to move vector
		bird.y += bird.dy;//add move vector to former position

    //calculate if bird is out of the game area (fall or fly away)
    if(bird.y>canv.height || bird.y < 0)//left the canvas on top or on the bottom
    {
      //bird left the screen, so play some sound effect
      if(soundVersion==1)audioSplash.play();
      gameRestart();//end of the game, so restart
      return;
    }

		//calculate pipe movement
    //step speed pixels left in every frame
    pipeAndHole.x-=pipeAndHole.speed;
    //if go off the screen => come back on right, but with another hole position
    if(pipeAndHole.x < -pipeAndHole.width)
		{
			pipeAndHole.x = canv.width;
			pipeAndHole.holeY = Math.random() * (canv.height - pipeAndHole.holeSize);
    }

    //check collision with coordinates
    //check x coordinates
    if(pipeAndHole.x<bird.size)
    {
      //check y coordinates
      if( bird.y<pipeAndHole.holeY 
        || bird.y+bird.size > pipeAndHole.holeY+pipeAndHole.holeSize)
        {
          //if program gets here then there was a collision
          if(collisionShow==1)
          {
            //so play the collision effect
            status = 2; //indicatge the bird collision
            collisionTimer=0; //reset the collision timer
          }
          else
          {
            gameRestart();
            return;
          }
        }
    }
   
    //increase score
    score++;//player gets score for every frame without collision
    //recognize the best score
    if(score>bestScore)
    {
      bestScore = score;
    }

    //DRAW
    //draw the game
    drawBackground();    
    //draw the pipe
    drawPipe();
    //draw bird
		drawBird();
    //display score information
    printScore();

    //inc loop counter
    loopCnt++;
  }// END of gameLoop



/////////////////////////
///// FUNCTIONS
/////////////////////////

/**
 * This detects and returns the name of the variable type.
 * @param argVariable the variable to check the type
 * @return A string with the name of the type.
 */
function getType(argVariable)
{
  const ret = Object.prototype.toString.call(argVariable);  
  //proces the content of ret, like [object Date]
  const type = ret.substring(ret.indexOf(" ") + 1, ret.indexOf("]"));
  
  //return the variable type
  return type.toLowerCase();
}





/**
 * Print the score information
 */
function printScore()
{
   //print out scores
   c.font = "30px Verdana";
   c.fillStyle = "black";   
   if(status==1 || status == 2)//game or blast effect
   {
     c.fillText(score, canv.width/2-c.measureText(score).width/2, 25);
   }
   else //game start
   {
    c.fillText(lastScore, canv.width/2-c.measureText(lastScore).width/2, 25);    
   }
   
   c.font = "20px Verdana";
   c.fillText("Best:"+bestScore, 5, 25);
}

/**
 * Draw the background
 */
function drawBackground()
{
    if(bckgVersion==0)
    {
      //clear background
      //v1 solid fill background
      c.fillStyle = "skyblue";
      c.fillRect(0,0,canv.width,canv.height); // Fill the whole canvas with sky
      return;
    }

    if(bckgVersion==1)
    {
      //v2 pic background
      c.drawImage(bcgPic, 0, 0);
      return;
    }

    if(bckgVersion==2)
    {
      //v3 loop scroll
      //var offset = score%400;
      var offset = loopCnt%400;
      c.drawImage(bcgPic, offset, 0, 400-offset, 400, 0, 0, 400-offset, 400);
      if(offset!=0)
      {
        c.drawImage(bcgPic,0, 0, offset, 400, 400-offset, 0, offset, 400);
      }
      return;
    }
}

/**
 * Draw the pipe - enemy
 */
function drawPipe()
{
//draw pipe
    
    if(pipeVersion==0)
    {
      //v1 solid pipe
      c.fillStyle = 'green';
      c.fillRect(pipeAndHole.x, pipeAndHole.y, pipeAndHole.width, pipeAndHole.holeY);
      c.fillRect(pipeAndHole.x, pipeAndHole.y+pipeAndHole.holeY+pipeAndHole.holeSize, pipeAndHole.width, canv.height-(pipeAndHole.holeY+pipeAndHole.holeSize));
    }
    
    if(pipeVersion==1)
    {
      //v2 nice pipe
      c.drawImage(pipePic, 0,0,68, pipeAndHole.holeY-pipeHeadUpPic.height,pipeAndHole.x, 0, 68, pipeAndHole.holeY-pipeHeadUpPic.height);
      c.drawImage(pipeHeadUpPic, pipeAndHole.x-2, pipeAndHole.holeY-pipeHeadUpPic.height);

      c.drawImage(pipePic, 0,0,68, canv.height-(pipeAndHole.holeY+pipeAndHole.holeSize),  pipeAndHole.x, pipeAndHole.y+pipeAndHole.holeY+pipeAndHole.holeSize, 68, canv.height-(pipeAndHole.holeY+pipeAndHole.holeSize));
      c.drawImage(pipeHeadDownPic, pipeAndHole.x-2,pipeAndHole.y+pipeAndHole.holeY+pipeAndHole.holeSize);
    }
}//END of drawPipe()

  
/*
* @DESC draw the bird.
* There are 4 variations to display the main character
*/
  function drawBird()
  {
    //controll the version, so what to display
    
    //display just a simple rectangle
    if( birdVersion==0)
    {
      c.fillStyle = "#2196F3";
      c.fillRect(bird.x, bird.y, bird.size, bird.size);
      return;
    }

    //Flappyng bird  
    if(birdVersion==3)
    {
      if(bird.dy<0)
      {
        if(loopCnt%2==0)c.drawImage(birdPic2ph1,bird.x, bird.y, bird.size, bird.size);
        else c.drawImage(birdPic2ph2,bird.x, bird.y, bird.size, bird.size);
      }
      else
      {
        c.drawImage(birdPic2ph1,bird.x, bird.y, bird.size, bird.size);
      }
    }

    //display the preload static image
    if(birdVersion==2)
    {
      c.drawImage(birdPic, bird.x, bird.y, bird.size, bird.size); // Draw bird    
      return;
    }

    //draw a bird from basic shapes
    if(birdVersion==1)
    {
      //body
      c.fillStyle = "#2196F3";
      c.beginPath();
      c.arc(bird.x+bird.size/2, bird.y+bird.size/2, bird.size/2-bird.size/8, 0, 2*Math.PI);
      c.fill();
      c.strokeStyle = "black";
      c.beginPath();
      c.arc(bird.x+bird.size/2, bird.y+bird.size/2, bird.size/2-bird.size/8, 0, 2*Math.PI);
      c.stroke();

      //wings
      c.fillStyle = "white";
      c.beginPath();
      c.moveTo(bird.x+bird.size/2, bird.y+bird.size/2);
      //c.lineTo(bird.x,bird.y+bird.size/2);
      c.lineTo(bird.x+bird.size/2,bird.y+bird.size/2+bird.size/4);
      c.lineTo(bird.x, bird.y+bird.size/2);
      c.fill();

      //eye
      c.fillStyle = "white";
      c.beginPath();
      c.arc(bird.x+bird.size*2/3, bird.y+bird.size*0.4, bird.size/6, 0, 2*Math.PI);
      c.fill();
      c.strokeStyle = "black";
      c.beginPath();
      c.arc(bird.x+bird.size*2/3, bird.y+bird.size*0.4, bird.size/6, 0, 2*Math.PI);
      c.stroke();
      //pupilla
      c.fillStyle = "black";
      c.beginPath();
      c.arc(bird.x+bird.size*2/3+2, bird.y+bird.size*0.4, bird.size/16, 0, 2*Math.PI);
      c.fill();

      //lips, beak
      c.fillStyle = "#FEC107";
      c.beginPath();
      c.moveTo(bird.x+bird.size*0.7, bird.y+bird.size*0.6);
      c.lineTo(bird.x+bird.size,bird.y+bird.size*0.6);
      c.lineTo(bird.x+bird.size*1.1,bird.y+bird.size*0.7);
      c.lineTo(bird.x+bird.size,bird.y+bird.size*0.8);
      c.lineTo(bird.x+bird.size*0.7, bird.y+bird.size*0.8);
      c.lineTo(bird.x+bird.size*0.6, bird.y+bird.size*0.7);
      c.fill();
      c.fillStyle = "black";
      c.beginPath();
      c.moveTo(bird.x+bird.size*0.7, bird.y+bird.size*0.6);
      c.lineTo(bird.x+bird.size,bird.y+bird.size*0.6);
      c.lineTo(bird.x+bird.size*1.1,bird.y+bird.size*0.7);
      c.lineTo(bird.x+bird.size,bird.y+bird.size*0.8);
      c.lineTo(bird.x+bird.size*0.7, bird.y+bird.size*0.8);
      c.lineTo(bird.x+bird.size*0.6, bird.y+bird.size*0.7);
      c.moveTo(bird.x+bird.size*0.6, bird.y+bird.size*0.7);
      c.lineTo(bird.x+bird.size*1.1,bird.y+bird.size*0.7);
      c.stroke();
      return;
    }  
  }

/*
  @DESC
  this resets the game.
  Initiates all the variables for a restart
  Freeze the game. It makes the game to wait for a click to continue
  */
 function gameRestart()
 {
   audioAmbient.pause(); //stop the ambient music
   //set the freeze status - this does not allow to run the gameloop
   status = 0;//the doClick will change it to 1
   console.log("gameRestart");

   //reset the pipe
   pipeAndHole.x = canv.width-40;//put it to the right end
   pipeAndHole.holeY = Math.random() * (canv.height - pipeAndHole.holeSize);

   //reset bird position, x is alwways 0
   bird.y=canv.height*0.4; //stand by position
   bird.dy = -bird.jump; //let's start with fly up

   //clear background
   drawBackground();
   //draw pipe
   drawPipe();//show the pipes too
   //draw the bird
   drawBird(bird.x, bird.y, bird.size);
   //print the message
   var txt = "Click 2 Start!";
   var txt2 = "Hit Space or click to fly";
   c.fillStyle = "black";
   c.font = "40px Verdana"; //sets a bigger font size
   c.fillText(txt, canv.width/2-c.measureText(txt).width/2, canv.height*0.3);
   c.font = "30px Verdana"; //sets a bigger font size
   c.fillText(txt2, canv.width/2-c.measureText(txt2).width/2, canv.height*0.6);
   c.font = "12px Verdana";//set the font size back to normal for score printing
  //dsplay the score information
  if(lastScore!=score && score!=0)lastScore = score;
   printScore();
   //reset the score
   score = 0;
 }//END of gameRestart


 /**
   * Media load in manager
   * It counts media need to be loaded in.
   * Also it makes all the media to call the countOnLoad function, when load is done.
   */
  var mediaCount = {image:0, audio:0};
  function addMedia( argMedia )
  {    
    
    if(getType(argMedia)=="htmlaudioelement")
    {
        mediaCount.audio++;
        argMedia.oncanplay = function(){countOnload("audio");};
    }

    if(getType(argMedia)=="htmlimageelement")
    {
        mediaCount.image++;
        argMedia.onload = function(){countOnload("image");};
    }
    
    console.log("add count image:"+mediaCount.image+" audio:"+mediaCount.audio);
  }


 /**
   * This is called every time when a media is loaded
   * This counts the loaded media and calls the start game,
   * when all registered media are loaded in.
   */
  function countOnload(argMedia)
  {
    if(argMedia=="image")
    {
      mediaCount.image--;
    }
    if(argMedia=="audio")
    {
      mediaCount.audio--;
    }
    
    console.log("loaded status image:"+mediaCount.image+" audio:"+mediaCount.audio);

    if(mediaCount.image == 0 && mediaCount.audio==0)
    {
      //calculate frame size, when pic has been loaded in
      expW = explPic.width/16;
      startGame();
    }
  }

 
/**
 * This method starts the game looping if media files are loaded in
 */
function startGame()
{
  if(mediaCount.image == 0 && mediaCount.audio==0 && canStart==1)
  {
    //Initiate the game
    gameRestart();//initiate the game

    //Start the game
    gameLoop();//this sets automatically the game looping
    //var interval = setInterval(gameLoop, 30); //runs gameLoop ciclicly
  }
  else
  {
    console.log("Wait for " + (canStart==1?"media":"Main") );
  }
}

////////////////////
////// MAIN
////////////////////

//get the gfx from the browser
var canv = document.getElementById("myCanvas");//elkérni a Canvast
c = canv.getContext("2d");

var canStart = 0;
var collisionShow =0;
//IMAGES load manager variables
var imageCount = 0;
var imageExpected = 0;

//load bird image into the memory
var birdVersion=0; //0 is for rect; 1 is for dwrw; 2 is for blue; 3 is for animated fly
const birdPic = new Image();
birdPic.src = "pic/bird_mini.png"; //static bird image to display
addMedia(birdPic);

const birdPic2ph1 = new Image();
birdPic2ph1.src = "pic/bird-phase1.png"; //first phase of flying bird
addMedia(birdPic2ph1);

const birdPic2ph2 = new Image();
birdPic2ph2.src = "pic/bird-phase2.png"; //second phase of flying bird
addMedia(birdPic2ph2);

//explosion
//it uses a picture that contains 16 frame.
//the animation displays the frames after each other
const explPic = new Image();
explPic.src = "pic/xplosev2.png"; //contains 16 frames in size 68x70 pixel
addMedia(explPic);
var collisionPhase=0;
//width of one frame
var expW = explPic.width/16; //width of one frame
var collisionTimer=0;

//background
var bckgVersion = 0;
const bcgPic = new Image();
bcgPic.src = "pic/bcg3.jpg";//symetric immage to support scrolled background effect
addMedia(bcgPic);

//pipe images
//pipe body
var pipeVersion = 0;
const pipePic = new Image();
pipePic.src = "pic/column.jpg"; //body of the column
addMedia(pipePic);
//pipe head top
const pipeHeadUpPic = new Image();    
pipeHeadUpPic.src = "pic/column_head_up.jpg"; //head of the column on the top
addMedia(pipeHeadUpPic);
//pipe head on the bottom
const pipeHeadDownPic = new Image();    
pipeHeadDownPic.src = "pic/column_head_down.jpg"; //head of the column on the bottom
addMedia(pipeHeadDownPic);

//SOUNDS
var soundVersion = 0; //to controll sound on/off from HTML page
var audioCrash = new Audio("sound/explosion.mp3");
addMedia(audioCrash);
var audioAmbient = new Audio("sound/ambient.mp3");
addMedia(audioAmbient);
var audioSplash = new Audio("sound/toccs_nagy.mp3");
addMedia(audioSplash);

//VARIABLES
var score = lastScore = bestScore = 0;//store the actual and the best score
var status = 0;//a variable to indicate game status. Start with freeze
var loopCnt = 0;

//Object for bird
var bird =
{
  x:0, //x position on the canvas
  y:150, //y position on the canvas
  dy:0, // delta of y. It helps to fake gravity
  size:40,
  jump:10 //size of the jump
};

  //Object for pipe
var pipeAndHole =
{
  x:canv.width, //start position is the roght end of the canvas
  y:0, //starting from the top
  holeY:100,//will be radom
  holeSize:200,//it is constant, but later can be random, or decreasing
  width:68, //pipe is 20 pixcel wide
  speed:8 //pipe steps speed pixels per frame
};

//EVENTHANDLER
canv.onclick = doClick; //specify which function process the click event
document.onkeydown = doKeyDown;  //key press on the document - this is the whole browser

//set the form defaults to the max
document.forms.setup.sound.value=1;//0,1
document.forms.setup.bckg.value=2;//0-2
document.forms.setup.bird.value=3;//0-3
document.forms.setup.column.value=1;//0-1
document.forms.setup.collision.value=1;//0-1
//get the setting from the form and set internal variables accordingly
doSetting();
//sense and act when any setting changes on the HTML form
document.forms.setup.onchange=doSetting;

//start the game loop
canStart = 1;//indicate that Main is done
startGame();

