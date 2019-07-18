//Resolution is the side length of the grid squares, any grid variables are responsive to resolution 
const resolution = 10;

/*What state the pause button is on, default is 0 "Unpaused" with "Pause" displayed,
1 is "Paused" with "Resume" displayed*/
let pauseButtonState = 0;

//Declaring variables
let gridArray;
let gridXSize;
let gridYSize;
let innerGridSize;

//Frame Rate
let cycleSpeed = 25;

//Flags
let brainStarted;
let programComplete;

function setup() {
    /*NOTE: canvas dimensions should be able to be divided evenly by resolution if you want grid squares that fill
    the canvas equally*/

    //Creating canvas
    /*Updated version, keeps the dimensions of the canvas divisible by the resolution,
    this gives an whole number of grid squares that are displayed instead of fractional grid squares.
    The hard coded numbers are used to keep the canvas from using the whole screen*/
    let myCanvas = createCanvas(((floor((window.innerWidth - 50) / resolution)) * resolution), ((floor((window.innerHeight - 45) / resolution)) * resolution));

    myCanvas.parent("myContainer");
    background(100);
    //Gives variables in terms of array indexes rather than pixels
    gridXSize = width / resolution;
    gridYSize = height / resolution;

    //Used later to check if the grid is empty
    innerGridSize = ((gridXSize - 2) * (gridYSize - 2))

    //Creating two-dimensional array that will be represented by a grid of clickable squares
    gridArray = [];

    //Setting flags
    programComplete = false;
    brainStarted = false;

    //Drawing initial grid
    createGrid();
    drawGrid();
}

function draw() {

}

//Controlled by start button click event
function startBrain() {

    if (pauseButtonState == 1) {
        return;
    }

    brainStarted = true;
    document.getElementById("startButton").disabled = true;

    createNextGeneration();
    drawGrid();

    //If grid not empty re-run startBrain function, else re-run program from start
    if (!programComplete) {
        setTimeout(startBrain, cycleSpeed);
    }else if(programComplete) {
        setup();
        startBrain();
    }
}

/*pauseBrain() is called on pauseButton click, this changes the word displayed on pauseButton,
 pauseButtonState, and calls startAnt() if button has been unpaused*/
function pauseBrain() {
    //If startBrain() has been started
    if (brainStarted) {
        //If paused
        if (pauseButtonState == 0) {
            pauseButtonState = 1;
            document.getElementById("pauseButton").innerHTML = "Resume";
            //If unpaused    
        } else if (pauseButtonState == 1) {
            document.getElementById("pauseButton").innerHTML = "Pause";
            pauseButtonState = 0;
            startBrain();
        }
    }
}

/*windowResized() is a P5.js function, this calls setup() when screen/browser size changes. This in turn causes
the program to be drawn responsively to new screen/browser size*/
function windowResized() {
    setup();
}

//Creating a 2 dimensional array and filling with random numbers between 0 and 2
function createGrid() {
    for (x = 0; x < gridXSize; x++) {
        gridArray[x] = [];
        for (y = 0; y < gridYSize; y++) {
            gridArray[x][y] = (floor(random(0, 3)));
        }
    }
}

//Creating a 2 dimensional array and filling with all zeros
function createArray() {
    let array = [];
    for (i = 0; i < gridXSize; i++) {
        array[i] = [];
        for (j = 0; j < gridYSize; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}

function createNextGeneration() {
    //Counter to check if grid is all dead
    let emptyCheck = 0;

    //Creating a new array filled with zeros
    let newArray = createArray();

    //Cycle through all cells except perimeter cells
    for (i = 1; i < gridXSize - 1; i++) {
        for (j = 1; j < gridYSize - 1; j++) {

            //Check if the cell is on, if so switch to dying
            if (gridArray[i][j] == 1) {
                newArray[i][j] = 2;
                continue;
            }

            //Check if the cell is dying, if so switch to dead
            if (gridArray[i][j] == 2) {
                newArray[i][j] = 0;
                continue;
            }

            //Calculate neighbors
            let neighbors = 0;

            for (k = -1; k <= 1; k++) {
                for (l = -1; l <= 1; l++) {
                    if (gridArray[i + k][j + l] < 2) {
                        neighbors += gridArray[i + k][j + l];
                    }
                }
            }

            //Subtract current cell
            neighbors -= gridArray[i][j];

            //At this point the cell is definately off, if it has 2 neighbors turn on. Else count as dead cell.
            if (neighbors == 2) {
                newArray[i][j] = 1;
            } else if (neighbors == 0) {
                emptyCheck++;
            }


        }
    }
    //If all cells are dead program is completed
    if (emptyCheck == innerGridSize) {
        programComplete = true;
        return;
    }
    //Set old array to updated array
    gridArray = newArray;
}

//Cycle through all cells and draw them according to the state of the array at that location.
function drawGrid() {
    for (i = 0; i < gridXSize; i++) {
        for (j = 0; j < gridYSize; j++) {
            if (gridArray[i][j] == 1) {
                fill("black");
                rect((i * resolution), (j * resolution), resolution, resolution);
            } else if (gridArray[i][j] == 2) {
                fill("grey");
                rect((i * resolution), (j * resolution), resolution, resolution);
            } else {
                fill("white");
                rect((i * resolution), (j * resolution), resolution, resolution);
            }
        }
    }
}