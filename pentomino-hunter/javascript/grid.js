
var kBoardWidth;
var kBoardHeight;

var kStep;
var side;

var kPixelWidth;
var kPixelHeight;

var yEnd;
var xEnd;

var gCanvasElement;
var gDrawingContext;
var gGameContext;

var randomPointX;
var randomPointY;

var pentominoTemplateCollection =[];
var pentominoX_LocationCollection=[];
var pentominoY_LocationCollection=[];
var clickedX_collection = [];
var clickedY_collection = [];

var randomPointXcollection =[];
var randomPointYcollection =[];
var blockedPointXcollection = [];
var blockedPointYcollection = [];

var moves;
var score;
var streak;
var generations;


var red        = "#B40404";
var green      = "#04B404";
var blue       = "#2E64FE";
var yellow     = "#D7DF01";
var white      = "#FFFFFF"; // "#F2F2F2";
var black      = "#000000";
var blueviolet = "#8A2BE2";

var palletSize = 50;

var fillColor = white;
var lineColor = "#ccc"; // "black";

var bleep = new Audio();
bleep.src = 'javascript/click_real_short.mp3';

var game_music = new Audio();
game_music.src = 'javascript/game_music.mp3';

// =======================================================================================
// =======================================================================================
function Cell(row, column) {
    this.row = row;
    this.column = column;
}

// =======================================================================================
function rotatePentomino(){
    var tx,ty;
    var numberOfRotations= Math.floor( Math.random()*4);
    var max = 0;
    var lastX = randomPointXcollection.pop();
    var lastY = randomPointYcollection.pop();
    console.log(randomPointXcollection);
    for(m=0;m<pentominoTemplateCollection.length;m++){
        if(max<pentominoTemplateCollection[m].x){
            max = pentominoTemplateCollection[m].x;
        }
        if(max<pentominoTemplateCollection[m].y){
            max = pentominoTemplateCollection[m].y;
        }
    }


    for(r=0;r<numberOfRotations;r++){
        for(n=0;n<5;n++) {
            tx = pentominoTemplateCollection[n].x;
            ty = pentominoTemplateCollection[n].y;
            pentominoTemplateCollection[n].x = ty;
            pentominoTemplateCollection[n].y = max- tx;
        }
    }

    for(i=0;i<5;i++){
        pentominoX_LocationCollection.push(pentominoTemplateCollection[i].x + lastX);
        pentominoY_LocationCollection.push(pentominoTemplateCollection[i].y + lastY);
    }
   // randomPointXcollection =[]; randomPointYcollection = [];
    pentominoTemplateCollection =[];
}
// =======================================================================================
function rotateFlip() {
    var max=0;
    for (m=0;m<pentominoTemplateCollection.length;m++){
        if(max<pentominoTemplateCollection[m].x){
            max = pentominoTemplateCollection[m].x;
        }
    }
    switch(Math.floor(Math.random()*2+1)){
        case 1:
            rotatePentomino();
            break;
        case 2:
            //flipping
            for(f=0;f<5;f++){
                pentominoTemplateCollection[f].x = max - pentominoTemplateCollection[f].x;
            }
            rotatePentomino();
            break;
    }

}

// =======================================================================================
function selectPentomino(){
    var case_style = Math.floor(Math.random()*12 + 1);
    switch(case_style)
    {
        case 1:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            rotateFlip();
            break;
        case 2:
            pentominoTemplateCollection.push(new RandomPoint(kStep,0));
            pentominoTemplateCollection.push(new RandomPoint(kStep , kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,2*kStep));
            rotateFlip();
            break;
        case 3:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(0,1*kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,3*kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,4*kStep));
            rotateFlip();
            break;
        case 4:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,3*kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep,0));
            rotateFlip();
            break;
        case 5:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep,3*kStep));
            rotateFlip();
            break;
        case 6:
            pentominoTemplateCollection.push(new RandomPoint(kStep,0));
            pentominoTemplateCollection.push(new RandomPoint(kStep , kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,2*kStep));
            rotateFlip();
            break;
        case 7:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(0, kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep,0));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,kStep));
            rotateFlip();
            break;
        case 8:
            pentominoTemplateCollection.push(new RandomPoint(0,0));
            pentominoTemplateCollection.push(new RandomPoint(0 , kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,0));
            rotateFlip();
            break;
        case 9:
            pentominoTemplateCollection.push(new RandomPoint(kStep,0));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            rotateFlip();
            break;
        case 10:
            pentominoTemplateCollection.push(new RandomPoint(0,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(kStep,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,kStep));
            rotateFlip();
            break;
        case 11:
            pentominoTemplateCollection.push(new RandomPoint(kStep, 0));
            pentominoTemplateCollection.push(new RandomPoint(kStep ,2*kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep, kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep ,3*kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            rotateFlip();
            break;
        case 12:
            pentominoTemplateCollection.push(new RandomPoint(2*kStep,0));
            pentominoTemplateCollection.push(new RandomPoint(kStep , 0));
            pentominoTemplateCollection.push(new RandomPoint(kStep,kStep));
            pentominoTemplateCollection.push(new RandomPoint(kStep ,2* kStep));
            pentominoTemplateCollection.push(new RandomPoint(0,2*kStep));
            rotateFlip();
            break;
    }
}
// =======================================================================================

function randomPointGenerator() {
    var xLimit = xEnd - 5 * kStep;
    var yLimit = yEnd - 5 * kStep;
    var a = 0;
    var b = 0;
    while (a < xLimit) {
        a = Math.floor(Math.random() * (2 * kStep)) + a;
        a = Math.floor(a / kStep) * kStep;
        b=0;
        console.log("sec" + randomPointXcollection);
        while (b < yLimit) {
            b = Math.floor(Math.random() * (2 * kStep)) + b;
            b = Math.floor(b / kStep) * kStep;
            if(a<=xLimit && b<= yLimit) {
                randomPointXcollection.push(a);
                randomPointYcollection.push(b);
            }
            console.log(randomPointYcollection);
            b = b + 5 * kStep;
        }
        a= a + 5*kStep;
    }
}
//================================================================================
function RandomPoint(x,y) {
    this.x = x;
    this.y = y;
}
// ================================================================================
// generates the first cell for the random Pentomino
function layRandomPentominosOnBoard(){
    randomPointGenerator();
    var numberofPentominoes = randomPointXcollection.length;
    for(j=0;j<numberofPentominoes;j++) {
        console.log("executed");
        selectPentomino();
    }
}
// =======================================================================================
function getCursorPalletPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    x = Math.min(x, kBoardWidth * kStep);
    y = Math.min(y, kBoardHeight * kStep);
    var co_ordinates = new Cell(y,x);
    return co_ordinates;
}
//========================================================================================
function isLocationClicked(x1,y1){
    for(i=0;i<clickedX_collection.length;i++) {

        if ((clickedX_collection[i] == x1) && (clickedY_collection[i] == y1)) {
            return true;
        }
    }
    return false;
}
// =======================================================================================
function vitruviaOnClick(e) {
    var current_click   = getCursorPalletPosition(e);
    var row    = current_click.row;
    var column = current_click.column;
    var currentFillStyle;

    moves++;
    bleep.play();

       if ((column < xEnd - 1) && (row < yEnd - 1) ) {
           var x = Math.floor(column / kStep) * kStep;
           var y = Math.floor(row / kStep) * kStep;
       }
       for(i=0;i<1;i++) {
           if (isLocationClicked(x, y)) {
               break;
           }
           for (i = 0; i < pentominoX_LocationCollection.length; i++) {

               if ((pentominoX_LocationCollection[i] == x) && (pentominoY_LocationCollection[i] == y)) {
                   //gDrawingContext.fillStyle = blue;
                   pentominoX_LocationCollection.splice(i, 1);
                   pentominoY_LocationCollection.splice(i, 1);
                   clickedX_collection.push(x);
                   clickedY_collection.push(y);
                   currentFillStyle = blue;
                   streak++;
                   break;
               }
               else {
                   clickedX_collection.push(x);
                   clickedY_collection.push(y);
                   currentFillStyle = yellow;
                   gDrawingContext.fillStyle = yellow;
               }
           }
           if (currentFillStyle != blue)
               streak = 0;
           score = score + (streak * 1000) - 100;
           if(score<0)
               score = 0;
           document.getElementById("gameScore").innerHTML = "Score : " + score;
           document.getElementById("numberOfMoves").innerHTML = "Moves : " + moves;
           gDrawingContext.fillStyle = currentFillStyle;
           gDrawingContext.fillRect(x + 1, y + 1, kStep - 1, kStep - 1);
           if (pentominoX_LocationCollection.length == 0) {

               gCanvasElement.removeEventListener("click", vitruviaOnClick);
               gDrawingContext.clearRect(0, 0, xEnd, yEnd);
               gDrawingContext.font = "30px Arial";
               gDrawingContext.fillText("Game Over", 40, 50);
               gDrawingContext.fillText("Number of Moves: " + moves, 40, 130);
               gDrawingContext.fillText("Your Final Score: " + score, 40, 210);
           }
       }

    //gDrawingContext.closePath();
}

// =======================================================================================
function drawLines(color) {
    xEnd = kPixelWidth;
    yEnd = kPixelHeight;

    //gDrawingContext.clearRect(0, 0, xEnd, yEnd);

    gDrawingContext.beginPath();

    /* vertical lines */
    for (var x = 0; x <= xEnd; x += kStep) {
        gDrawingContext.moveTo(0.5 + x, 0);
        gDrawingContext.lineTo(0.5 + x, yEnd);
    }

    /* horizontal lines */
    for (var y = 0; y <= yEnd; y += kStep) {
        gDrawingContext.moveTo(0    , 0.5 + y);
        gDrawingContext.lineTo(xEnd, 0.5 +  y);
    }

    /* draw it! */
    gDrawingContext.strokeStyle = color;
    gDrawingContext.stroke();

    gDrawingContext.closePath();
}

// =======================================================================================
function drawBoard() {

    xEnd = kPixelWidth;
    yEnd = kPixelHeight;

    gDrawingContext.clearRect(0, 0, xEnd, yEnd);

    gDrawingContext.beginPath();

    // Canvas base color
    gDrawingContext.fillStyle = red;
    gDrawingContext.rect(0, 0, xEnd, yEnd);
    gDrawingContext.fill();
    drawLines(lineColor);
    gDrawingContext.closePath();
}

// =======================================================================================
function clearGrid() {
    drawBoard();
}

// =======================================================================================
function hideGridLines(color) {
    drawLines(color);
}

// =======================================================================================
function initGame() {
    var canvasElement  = document.getElementById("vitruvia_canvas");
    var v              = 16; //document.getElementById('size').value;
    side = v;
    var boardSize;
    var delta = 0.3;
    moves = 0;
    score = 0;
    streak = 0;

    if (window.innerWidth < window.innerHeight)
    {
        boardSize = window.innerWidth - delta * window.innerWidth ;
    }
    else
    {
        boardSize = window.innerHeight - delta * window.innerHeight;
    }


    kStep = Math.floor(boardSize / side);


    //size of canvas we want to use
    kPixelWidth  = kStep * side + 1;
    kPixelHeight = kStep * side + 1;

    kBoardWidth  = kPixelWidth;
    kBoardHeight = kPixelHeight;

    clickedX_collection =[];
    clickedY_collection = [];

    game_music.loop = "true";
    game_music.play();

    gCanvasElement        = canvasElement;
    gCanvasElement.width  = kPixelWidth;   // + 2*kStep // the kSteps make room for the pallet
    gCanvasElement.height = kPixelHeight; // + 2*kStep
    gCanvasElement.addEventListener("click", vitruviaOnClick, false);
    gDrawingContext       = gCanvasElement.getContext("2d");

    randomPointXcollection = [];
    randomPointYcollection = [];
    pentominoTemplateCollection =[];
    pentominoX_LocationCollection =[];
    pentominoY_LocationCollection =[];
    blockedPointXcollection =[];
    blockedPointYcollection = [];
    generations = 0;
    //drawLines(lineColor);
    xEnd = kPixelWidth;
    yEnd = kPixelHeight;
    drawBoard();
    layRandomPentominosOnBoard();
    //drawBoard();
    document.getElementById("gameScore").innerHTML = "Score : " + score;
    document.getElementById("numberOfMoves").innerHTML = "Moves : " + moves;
}

// =======================================================================================





