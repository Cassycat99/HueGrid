//Cassy Smithies
//HueGrid
//ICE 9-3 3/26/18


class HueGrid {
    constructor() {
        this.hueVal; // 2D array of hue values
        this.cellSize = 5; //cellsize set by slider
        this.maxDev = 2; //amount of twinkle set by slider
        this.strokeOn = false;

        this.reset();
    }

    reset() {

        background(100);
        this.cellSize = clSzSlider.value();

        let rowLeng = Math.floor(width / this.cellSize);
        let colLeng = Math.floor(height / this.cellSize);
        //floor ensures that you will get a number that fits on the canvas

        this.hueVal = []; //array

        for (let i = 0; i < rowLeng; i++) {
            this.hueVal[i] = [];
            for (let j = 0; j < colLeng; j++) {

                switch (radio.value()) {

                    //switch here is for style options          

                    case 'Style 1':
                        this.hueVal[i][j] = random(0, 360);
                        break;

                    case 'Style 2':
                        this.hueVal[i][j] = (i ^ j);
                        break;

                    case 'Style 3':
                        this.hueVal[i][j] = (i * j);
                        break;

                    case 'Style 4':
                        this.hueVal[i][j] = (i - j);
                        break;

                    default:
                        this.hueVal[i][j] = random(0, 360);

                        break;
                }
            }
        }
    }

    display() {
        if (this.strokeOn) { //toggles stroke on and off
            stroke(360);
        } else {
            noStroke();
        }

        this.maxDev = mxDvSlider.value();

        if (checkbox.checked()) //enables pause checkbox
            this.maxDev = 0; //sets dev to 0 to stop movement

        for (let i = 0; i < this.hueVal.length; i++) {
            for (let j = 0; j < this.hueVal.length; j++) {

                this.hueVal[i][j] = this.alterHue(this.hueVal[i][j], i, j);
                // Use the hueValue to set the fill for this cell
                fill(this.hueVal[i][j], 100, 100, transSlider.value()); //sets fill
                // Location is the loop indices scaled by the cell size
                rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize); //draws pixels
            }
        }
    }
    


    alterHue(hue, i, j) { //not set up to work in ICE 9-2, uses default
        // Perturb the hue value & wrap around the color wheel

        switch (alterSel.value()) {

            case 'Wave':
                hue += this.maxDev;
                //hue += random(-this.maxDev, this.maxDev);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;

                break;
            case 'Poisson Twinkle':
                let bound = random(this.maxDev * 5);
                hue = hue + random(-bound, bound);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;

            case 'Increment':
                hue = (hue + this.maxDev) % 360;	// Increment by maxDev
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;

            default:
                hue += this.maxDev;
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;

                break;

                //hueVal[i][j] = (i * j);
                //hueVal[i][j] = (i + j) * 15;
                //hueVal[i][j] = (i + j) %360;
                //hueVal[i][j] = ( i ^ j);
                //hueVal[i][j] = (j * sin(i));
                //hueVal[i][j] = (tan(i/j));
                //hueVal[i][j] = (i^3+i^2);
                //hueVal[i][j] = ((i^500));
        }
        return hue;
    }

    stToggle() {
        this.strokeOn = !this.strokeOn;
    }

}
