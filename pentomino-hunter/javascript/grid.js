
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

var moves;
var score;
var streak;

var pentominoPointsCollection = [];

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
bleep.src = 'click_real_short.mp3';

// =======================================================================================
// =======================================================================================
function Cell(row, column) {
    this.row = row;
    this.column = column;
}


// =======================================================================================
function isRandomPointOccupied(a,b) {

    var c,d,flag = false,distance = 4 ;
    for (i = 0; i < randomPointXcollection.length; i++) {
            c = randomPointXcollection[i] - a;
            d = b - randomPointYcollection[i];
        distance = Math.sqrt((c * c) + (d * d));
        if(distance <   4*kStep)
            flag = true;
    }
        return flag;
}
//========================================================================================
// constructor for saving the random points
function RandomPoint(a,b) {
    this.x = a;
    this.y = b;
}
// =======================================================================================
// generates a random point on the canvas
function randomPointGenerator() {
    randomPointX = Math.floor(Math.random() * (xEnd - (3 * kStep)));
    randomPointY = Math.floor(Math.random() * yEnd);
    if (randomPointY > (yEnd - (3 * kStep))) {
        randomPointY = randomPointY - (3 * kStep);
    }else if (randomPointY < (2*kStep)){
        randomPointY = randomPointY +kStep;
    }else if (randomPointX < (2*kStep)){
        randomPointX = randomPointX +(2*kStep);
    }


    randomPointX = Math.floor(randomPointX / kStep) * kStep;
    randomPointY = Math.floor(randomPointY / kStep) * kStep;
    if (isRandomPointOccupied(randomPointX, randomPointY)) {
            randomPointGenerator();
    }
        randomPointXcollection.push(randomPointX);
        randomPointYcollection.push(randomPointY);

    //pentomino style 1 locations
    //use c1 to c5 for pentomino style 1
    //use c1 to c4 and pentominoTemplateCollection[5] for pentomino style 2
    //use c1 to c5 and pentominoTemplateCollection[6] forpentomino style 3
    //use c1 to c4 and pentominoTemplateCollection[7] for pentomino style 4
    //use c1 to c5 and pentominoTemplateCollection[8] pentomino style 5
    //use c1 to c4 and pentominoTemplateCollection[9] for pentomino style 6
    pentominoTemplateCollection.push(new RandomPoint(0,         0         ));
    pentominoTemplateCollection.push(new RandomPoint(kStep,     0         ));
    pentominoTemplateCollection.push(new RandomPoint(0,         kStep     ));
    pentominoTemplateCollection.push(new RandomPoint(kStep,     kStep     ));
    pentominoTemplateCollection.push(new RandomPoint(0,         2 * kStep ));
    pentominoTemplateCollection.push(new RandomPoint(kStep,     2 * kStep ));
    pentominoTemplateCollection.push(new RandomPoint(2*kStep,   kStep     ));
    pentominoTemplateCollection.push(new RandomPoint(2*kStep,   0         ));
    pentominoTemplateCollection.push(new RandomPoint(kStep,     -kStep    ));
    pentominoTemplateCollection.push(new RandomPoint(0,         -kStep    ));
    pentominoTemplateCollection.push(new RandomPoint(-kStep,    0         ));
    pentominoTemplateCollection.push(new RandomPoint(-kStep,    kStep     ));
}
//================================================================================
// generates the first cell for the random Pentomino
function layRandomPentominosOnBoard(){
//    gGameContext.beginPath();

    // Pentomino Color
  //  gGameContext.fillStyle = blue;
    //rectangle location
    for(i=0;i<=3;i++) {
        randomPointGenerator();
        for(j=0;j<4;j++) {
    //        gGameContext.fillRect(pentominoTemplateCollection[j].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[j].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
            pentominoX_LocationCollection.push(pentominoTemplateCollection[j].x+randomPointXcollection[i]);
            pentominoY_LocationCollection.push(pentominoTemplateCollection[j].y+randomPointYcollection[i]);
        }
        switch (Math.floor((Math.random() * 8) + 1))
        {
            case 1:
      //          gGameContext.fillRect(pentominoTemplateCollection[4].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[4].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[4].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[4].y+randomPointYcollection[i]);
                break;
            case 2:
        //        gGameContext.fillRect(pentominoTemplateCollection[5].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[5].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[5].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[5].y+randomPointYcollection[i]);
                break;
            case 3:
          //      gGameContext.fillRect(pentominoTemplateCollection[6].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[6].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[6].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[6].y+randomPointYcollection[i]);
                break;
            case 4:
            //    gGameContext.fillRect(pentominoTemplateCollection[7].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[7].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[7].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[7].y+randomPointYcollection[i]);
                break;
            case 5:
           //     gGameContext.fillRect(pentominoTemplateCollection[8].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[8].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[8].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[8].y+randomPointYcollection[i]);
                break;
            case 6:
           //     gGameContext.fillRect(pentominoTemplateCollection[9].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[9].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[9].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[9].y+randomPointYcollection[i]);
                break;
            case 7:
             //   gGameContext.fillRect(pentominoTemplateCollection[10].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[10].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[10].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[10].y+randomPointYcollection[i]);
                break;
            case 8:
               // gGameContext.fillRect(pentominoTemplateCollection[11].x + randomPointXcollection[i] + 1, pentominoTemplateCollection[11].y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
                pentominoX_LocationCollection.push(pentominoTemplateCollection[11].x+randomPointXcollection[i]);
                pentominoY_LocationCollection.push(pentominoTemplateCollection[11].y+randomPointYcollection[i]);
                break;
        }
    }
    //gGameContext.closePath();
    //gGameContext.save();
}
// =======================================================================================
function getCursorPosition(e) {
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
    var cell = new Cell(Math.floor(y/kStep), Math.floor(x/kStep));
    return cell;
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

    //bleep.play();
    
   // fillColor  = document.getElementById('stampColor').value;

    //gDrawingContext.beginPath();
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
function saveCanvas() {
    
    
// http://weworkweplay.com/play/saving-html5-canvas-as-image/    
    
var canvas = document.getElementById('vitruvia_canvas'),
    ctx    = canvas.getContext('2d'),
    mirror = document.getElementById('mirror');


    canvas.width = mirror.width = window.innerWidth;
    canvas.height = mirror.height = window.innerHeight;

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });  
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
    // squares per side
    /*if (v < 1) {
        alert('Smallest size is 2');
        side = 2;
    }
    
    if (64 < v) { 
        alert('Largest size is 64');
        side = 64;
    }
    else { side = v; } */

    
    
   
    //var boardSize  = 500;
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
    
 
    gCanvasElement        = canvasElement;
    gCanvasElement.width  = kPixelWidth;   // + 2*kStep // the kSteps make room for the pallet
    gCanvasElement.height = kPixelHeight; // + 2*kStep
    gCanvasElement.addEventListener("click", vitruviaOnClick, false);
    gDrawingContext       = gCanvasElement.getContext("2d");
    //gGameContext          = gCanvasElement.getContext("2d");

//    drawPallet();
    //drawBoard();

    //generates random pentominos on the game board
    randomPointXcollection = [];
    randomPointYcollection = [];
    pentominoTemplateCollection =[];
    pentominoX_LocationCollection =[];
    pentominoY_LocationCollection =[];
    //drawLines(lineColor);
    xEnd = kPixelWidth;
    yEnd = kPixelHeight;
    //drawBoard();
    layRandomPentominosOnBoard();
    drawBoard();
    //layRandomMines();
   // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    document.getElementById('vitruvia_canvas').src = dataURL;    
    
    // makes save canvas possible
    saveCanvas();
}

// =======================================================================================





