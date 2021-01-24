////////////////////
/////Event handlers
///////////////////
function doClick()
{
   //m�nusz egyenlo 50
   bird.y-=50; //eg�rkattint�sra emelkedjen a mad�r
}


////////////////////
/////Functions
///////////////////




////////////////////
///// gameLoop
///////////////////
function gameLoop()
{
    //SZ�MOL�S
    pipeAndHole.x-=1; //menjen a cso jobbr�l balra
    if(pipeAndHole.x<0) //ha el�r a sz�l�re, akkor ugorjon vissza az elej�re
    {
        pipeAndHole.x = canv.width;
        pipeAndHole.height=Math.random()*(canv.height-100);  //�j v�letlenszeru magass�g
    }
    
    //esik lefel� a mad�r
    bird.y+=0.5; //40fps-n�l 40*0.5=20pixelt halad lefel� m�sodpercenk�nt
    //Ha kiesik alul  mad�r ugorjon vissza k�z�pre
    if(bird.y>canv.height)
    {
        bird.y=150;
    }

//MEGJELEN�T�S
    //clear background
    c.fillStyle = "skyblue";
    c.fillRect(0,0,canv.width,canv.height); // Fill the whole canvas with sky
    
    //akad�ly rajzol�sa
    c.fillStyle = "green";
    c.fillRect(pipeAndHole.x,0,15,canv.height);

    //mad�r rajzol�sa
    c.fillStyle = "blue";
    c.fillRect(bird.x, bird.y, 40,40);

} //END of gameLoop


////////////////////
/////Main
///////////////////


//get the gfx from the browser
var canv = document.getElementById("myCanvas");//elk�rni a Canvast ID alapj�n
c = canv.getContext("2d"); //l�trehozza a rajzol� objektumunkat c n�vvel.

//Global variables
var bird = { x:0, y:150};
var pipeAndHole = { x:canv.width, y:0, height:100 };

//Register event handlers
canv.onclick = doClick;

//Register game loop
var interval = setInterval(gameLoop, 25); //1000ms/25ms = 40fps


