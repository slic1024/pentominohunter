
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

var randomPointXcollection =[];
var randomPointYcollection =[];

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

    var c,d,m = 0,distance = 4 ;
    for (i = 0; i < randomPointXcollection.length; i++) {
            c = randomPointXcollection[i] - a;
            d = b - randomPointYcollection[i];
        distance = Math.sqrt((c * c) + (d * d));
        if(distance <   6*kStep)
            m=1;
    }
        console.log('distance is'+ distance + 'm is' +m + 'kstep is ' + (6*kStep));
        if (m==1)
            return true;
        else
            return false;
}
//========================================================================================

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
    }


    randomPointX = Math.floor(randomPointX / kStep) * kStep;
    randomPointY = Math.floor(randomPointY / kStep) * kStep;

    if (isRandomPointOccupied(randomPointX, randomPointY)) {
            randomPointGenerator();
    }
        randomPointXcollection.push(randomPointX);
        randomPointYcollection.push(randomPointY);

    //pentomino style 1 locations
    c1 = new RandomPoint(0, 0);
    c2 = new RandomPoint(kStep, 0);
    c3 = new RandomPoint(0, kStep);
    c4 = new RandomPoint(kStep, kStep);
    c5 = new RandomPoint(0, 2 * kStep);
}
// =======================================================================================
// generates the first cell for the random Pentomino
function initialCellGenerator(){
    gGameContext.beginPath();

    // Pentomino Color
    gGameContext.fillStyle = blue;
    //rectangle location
    for(i=0;i<=2;i++) {
        randomPointGenerator();
        gGameContext.fillRect(c1.x + randomPointXcollection[i] + 1, c1.y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
        gGameContext.fillRect(c2.x + randomPointXcollection[i] + 1, c2.y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
        gGameContext.fillRect(c3.x + randomPointXcollection[i] + 1, c3.y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
        gGameContext.fillRect(c4.x + randomPointXcollection[i] + 1, c4.y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
        gGameContext.fillRect(c5.x + randomPointXcollection[i] + 1, c5.y + randomPointYcollection[i] + 1, kStep - 1, kStep - 1);
    }
    gGameContext.closePath();
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
    var cell = new Cell(y,x);
    return cell;
}

// =======================================================================================
function vitruviaOnClick(e) {
    var cell   = getCursorPalletPosition(e);
    var row    = cell.row;
    var column = cell.column;

    bleep.play();
    
    fillColor  = document.getElementById('stampColor').value;

       if ((column < xEnd - 1) && (row < yEnd - 1) ) {
           var x = Math.floor(column/kStep) * kStep;
           var y = Math.floor(row/kStep) * kStep;

           // gDrawingContext.beginPath();
            
            gDrawingContext.fillStyle = fillColor;
             gDrawingContext.fillRect(x+1, y+1, kStep-1, kStep-1); // box lines don't get redrawn with empty color
        }
//    }
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
    gDrawingContext.fillStyle = white;    
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
    var v              = document.getElementById('size').value;
    
    // squares per side
    if (v < 1) { 
        alert('Smallest size is 2');
        side = 2;
    }
    
    if (64 < v) { 
        alert('Largest size is 64');
        side = 64;
    }
    else { side = v; }

    
    
   
    //var boardSize  = 500;
    var boardSize;
    var delta = 0.3;
    
    if (window.innerWidth < window.innerHeight)
    { 
        boardSize = window.innerWidth - delta * window.innerWidth ;
    }
    else
    { 
        boardSize = window.innerHeight - delta * window.innerHeight;
    }

  
    kStep = Math.floor(boardSize / side)            
               
    
    //size of canvas we want to use
    kPixelWidth  = kStep * side + 1;
    kPixelHeight = kStep * side + 1;
    
    kBoardWidth  = kPixelWidth;
    kBoardHeight = kPixelHeight;
    
 
    gCanvasElement        = canvasElement;
    gCanvasElement.width  = kPixelWidth   // + 2*kStep // the kSteps make room for the pallet
    gCanvasElement.height = kPixelHeight // + 2*kStep
    gCanvasElement.addEventListener("click", vitruviaOnClick, false);
    gDrawingContext       = gCanvasElement.getContext("2d");
    gGameContext          = gCanvasElement.getContext("2d");

//    drawPallet();
    drawBoard();

    //generates random pentominos on the game board
    randomPointXcollection = [];
    randomPointYcollection = [];
    initialCellGenerator();
   // save canvas image as data url (png format by default)
    //var dataURL = canvas.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    document.getElementById('vitruvia_canvas').src = dataURL;    
    
    // makes save canvas possible
    saveCanvas();
}

// =======================================================================================





