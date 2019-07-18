//Resolution is the side length of the grid squares, any grid variables are responsive to resolution 
var resolution = 10;

/*What state the pause button is on, default is 0 "Unpaused" with "Pause" displayed,
1 is "Paused" with "Resume" displayed*/
var pauseButtonState=0;

//Declaring variables
var gridArray;
var gridXSize;
var gridYSize;

var cycleSpeed=25;

var brainStarted;
var programComplete;


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

    //Creating two-dimensional array that will be represented by a grid of clickable squares
    gridArray = [];
    programComplete=false;
    brainStarted=false;
    //Drawing initial grid
    createGrid();
    drawGrid();
}

function draw() {
    
}

function startBrain(){
      
        if(pauseButtonState==1){
            return;
        }

        brainStarted=true;
        document.getElementById("startButton").disabled=true;
        createNextGeneration();
        drawGrid(); 
        if(!programComplete){    
            setTimeout(startBrain, cycleSpeed);  
        }   
    if(programComplete){
        setup();
        startBrain();
    }
}

/*pauseAnt() is called on pauseButton click, this changes the word displayed on pauseButton,
 pauseButtonState, and calls startAnt() if button has been unpaused*/
 function pauseBrain(){
        //If startAnt() has been started
        if(brainStarted){
            //If paused
            if(pauseButtonState==0){
                pauseButtonState=1;
                document.getElementById("pauseButton").innerHTML = "Resume";
            //If unpaused    
            }else if(pauseButtonState==1){
                document.getElementById("pauseButton").innerHTML = "Pause";
                pauseButtonState=0;
                startBrain();
            }
        }        
}

/*windowResized() is a P5.js function, this calls setup() when screen/browser size changes. This in turn causes
the program to be drawn responsively to new screen/browser size*/
function windowResized(){
    setup();
}

function createGrid() {
    for (x = 0; x < gridXSize; x++) {
        gridArray[x] = [];
        for (y = 0; y < gridYSize; y++) {
            gridArray[x][y]=(floor(random(0, 2)));
        }
    }
}

function createArray(){
    var array=[];
    for(i=0;i<gridXSize;i++){
        array[i]=[];
        for(j=0;j<gridYSize;j++){
            array[i][j]=0;
        }
    }
    return array;
}

function createNextGeneration(){
    var emptyCheck=0;
    var newArray=createArray();

    for (i = 1; i < gridXSize-1; i++) {
        for (j = 1; j < gridYSize-1; j++) {

            //Check if the cell is on
            if(gridArray[i][j]==1){
                newArray[i][j]=2;
                continue;
            }

            //Check if the cell is dying
            if(gridArray[i][j]==2){
                newArray[i][j]=0;
                continue;
            }


            var neighbors=0;

            for (k = -1; k <= 1; k++) {
                for (l = -1; l <= 1; l++) {
                    if(gridArray[i+k][j+l]<2){
                        neighbors += gridArray[i+k][j+l];
                    } 
                }
            }

            neighbors -= gridArray[i][j];
            
            //Rules for Conway's Game of Life
            // if((gridArray[i][j]==1) && (neighbors<2)){
            //     newArray[i][j]=0;
            // }else if((gridArray[i][j]==1) && (neighbors>3)){
            //     newArray[i][j]=0;
            // }else if((gridArray[i][j]==0) && (neighbors==3)){
            //     newArray[i][j]=1;
            // }else{
            //     newArray[i][j]=gridArray[i][j];                
            // }

            //Rules for Seeds
            // if((gridArray[i][j]==0) && (neighbors==2)){
            //     newArray[i][j]=1;
            // }else{
            //     newArray[i][j]=0;
            // }

            //Rules for Brians Brain
            if(neighbors==2){
                newArray[i][j]=1;
            }else if(neighbors==0){
                emptyCheck++;
            }


        }
    }
    if(emptyCheck==((gridXSize-2)*(gridYSize-2))){
        programComplete=true;
        return;
    }
    gridArray=newArray;
}

function drawGrid(){
    for(i=0;i<gridXSize;i++){
        for(j=0;j<gridYSize;j++){
            if(gridArray[i][j] == 1){
                fill("black");
                rect((i * resolution), (j * resolution), resolution, resolution);
            }else if(gridArray[i][j]==2){
                fill("grey");
                rect((i * resolution), (j * resolution), resolution, resolution);
            }else{
                fill("white");
                rect((i * resolution), (j * resolution), resolution, resolution);
            }
        }
    }
}