//Resolution is the side length of the grid squares, any grid variables are responsive to resolution 
var resolution = 6;

/*What state the swap button is on, default is 0 "Random Grid" with solid grid displayed,
1 is "Solid Grid" with random grid displayed*/
var swapButtonState=0;

//Declaring variables
var gridArray;
var gridXSize;
var gridYSize;

/*Class for objects residing in the 2-dimensional array, only attribute they have is .ind which acts as 
an on/off or 1/0 indicator of the grid's state*/
class GridContent {
    constructor(ind) {
        this.ind = ind;
    }
}

function setup() {
    /*NOTE: canvas dimensions should be able to be divided evenly by resolution if you want grid squares that fill
    the canvas equally*/
    
    //Creating canvas
    /*Updated version, keeps the dimensions of the canvas divisible by the resolution,
    this gives an whole number of grid squares that are displayed instead of fractional grid squares.
    The hard coded numbers are used to keep the canvas from using the whole screen*/
    var myCanvas = createCanvas(((floor((window.innerWidth-50)/resolution))*resolution), ((floor((window.innerHeight-45)/resolution))*resolution));

    myCanvas.parent("myContainer");
    background(100);
    //Gives variables in terms of array indexes rather than pixels
    gridXSize = width / resolution;
    gridYSize = height / resolution;

    //Drawing initial grid
    createGrid();
}

function draw() {
    
}

/*windowResized() is a P5.js function, this calls setup() when screen/browser size changes. This in turn causes
the program to be drawn responsively to new screen/browser size*/
function windowResized(){
    setup();
}



/*NOTE: createGrid() function is only called during setup() function and swapGrid() function,
 fillGrid() function is only called during createGrid() function*/

//Creating two-dimensional array that will be represented by a grid of clickable squares
function createGrid() {
    gridArray = [];
    for (i = 0; i < gridXSize; i++) {
        gridArray[i] = [];
        for (j = 0; j < gridYSize; j++) {
            fillGrid(i, j);
        }
    }
}

/*Creating white or random grid squares with size being respect to pixels and creating "state" object 
in each cell that is initially set to 1 for white, and 1 or 0 for random. 
grid being solid or random is subject to swapButtonState*/
function fillGrid(x, y) {
    var fx=x;
    var fy=y;
    var indicator;
    //Drawing solid grid
    if(swapButtonState==0){
        fill("white");
        rect((fx * resolution), (fy * resolution), resolution, resolution);
        indicator = 1;
        gridArray[fx][fy] = new GridContent(indicator);
    }
    //Drawing random grid
    else if(swapButtonState==1){
        var rand = floor(random(0, 2));
        if (rand == 1) {
            fill("black");
            rect((fx * resolution), (fy * resolution), resolution, resolution);
            indicator = 0;
            gridArray[fx][fy] = new GridContent(indicator);
        } else {
            fill("white");
            rect((fx * resolution), (fy * resolution), resolution, resolution);
            indicator = 1;
            gridArray[fx][fy] = new GridContent(indicator);
        }
    }
    return;
}




 

