////////////////////
/////Event handlers
///////////////////
function doClick()
{
   //mínusz egyenlo 50
   bird.y-=50; //egérkattintásra emelkedjen a madár
}


////////////////////
/////Functions
///////////////////




////////////////////
///// gameLoop
///////////////////
function gameLoop()
{
    //SZÁMOLÁS
    pipeAndHole.x-=1; //menjen a cso jobbról balra
    if(pipeAndHole.x<0) //ha elér a szélére, akkor ugorjon vissza az elejére
    {
        pipeAndHole.x = canv.width;
        pipeAndHole.height=Math.random()*(canv.height-100);  //új véletlenszeru magasság
    }
    
    //esik lefelé a madár
    bird.y+=0.5; //40fps-nél 40*0.5=20pixelt halad lefelé másodpercenként
    //Ha kiesik alul  madár ugorjon vissza középre
    if(bird.y>canv.height  || bird.y<0)
    {
        bird.y=150;
    }

//MEGJELENÍTÉS
    //clear background
    c.fillStyle = "skyblue";
    c.fillRect(0,0,canv.width,canv.height); // Fill the whole canvas with sky
    
    //akadály rajzolása
    c.fillStyle = "green";
    c.fillRect(pipeAndHole.x,0,15,canv.height);

    //madár rajzolása
    c.fillStyle = "blue";
    c.fillRect(bird.x, bird.y, 40,40);

} //END of gameLoop


////////////////////
/////Main
///////////////////


//get the gfx from the browser
var canv = document.getElementById("myCanvas");//elkérni a Canvast ID alapján
c = canv.getContext("2d"); //létrehozza a rajzoló objektumunkat c névvel.

//Global variables
var bird = { x:0, y:150};
var pipeAndHole = { x:canv.width, y:0, height:100 };

//Register event handlers
canv.onclick = doClick;

//Register game loop
var interval = setInterval(gameLoop, 25); //1000ms/25ms = 40fps


