"use strict";
//Cassy Smithies
//Demo 10-2 3/26/18

let cnv; //canvas
let stBut; //stroke button
let mxDvSlider;
let mxDvLabel;
let clSzSlider;
let clSzLabel;
let resetBut;
let transSlider;
let transLabel;
let radio;
let checkbox;
let alterSel;
let hG; //huegrid


function setup() {
    
    //everything below is used to set up the canvas and UI controls
    //canvas set up
    cnv = createCanvas(400, 300);
    cnv.position(20, 80);
    colorMode(HSB);
    background(100);
    noStroke();
    
    //stroke button setup
    stBut = createButton("Stroke On/Off");
    stBut.position(cnv.width - 80, 20);
    stBut.mousePressed(toggleStroke);

    //slider setup for max div
    mxDvSlider = createSlider(0, 50, 2, 0);
    mxDvSlider.position(20, 20);
    mxDvLabel = createDiv("Max Div: ");
    mxDvLabel.position(mxDvSlider.x, mxDvSlider.y + 25);
    
    //sldier set up for cell size
    clSzSlider = createSlider(2, 20, 5, 1);
    clSzSlider.position(20, 80 + cnv.height + 20);
    clSzLabel = createDiv("Cell Size: ");
    clSzLabel.position(clSzSlider.x, clSzSlider.y + 25)

    //slider set up for opacity
    transSlider = createSlider(0.0, 1.0, 1.0, 0);
    transSlider.position(175, 20);
    transLabel = createDiv("Opacity: ");
    transLabel.position(transSlider.x, transSlider.y + 25)

    //radio buttons set up
    radio = createRadio();
    radio.option('Style 1');
    radio.option('Style 2');
    radio.option('Style 3');
    radio.option('Style 4');
    radio.position(20, 460);
    radio.style('width', '80px'); 
    radio.value('Style 1'); //sets initial value to be style 1
    
    // Select the hue value alteration method
	alterSel = createSelect();
	alterSel.option("Wave");
	alterSel.option("Poisson Twinkle");
	alterSel.option("Increment");
	alterSel.position(cnv.width - 80, cnv.height + 150);
	alterSel.value("Wave"); // Set the initial value
    
    //set up for reset button
    resetBut = createButton("Reset");
    resetBut.position(cnv.width /2 , cnv.height + 110);
    resetBut.mousePressed(reset);
    //reset();
    
    checkbox = createCheckbox('Pause');
    checkbox.checked(false);
    checkbox.position(cnv.width - 80, cnv.height + 110)
    
    hG = new HueGrid(); //creates new huegrid

}

function draw() {

    mxDvLabel.html("Max Dev: " + Math.round(mxDvSlider.value()));

    //cellSize = clSzSlider.value();
    clSzLabel.html("Cell Size: " + Math.round(clSzSlider.value()));

    transLabel.html("Opacity: " + Math.round(transSlider.value()));

    hG.display(); ///displays huegrid
}


function toggleStroke() {
    hG.stToggle(); //better formatting to change class attributes within class in method, not in main
}

//this function exists to the call the reset in the class
//resetBut.mousePressed(reset); calls this function because it cannot directly call hG.reset
function reset(){
    hG.reset();
}


