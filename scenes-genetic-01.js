let geneticScene01 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-tue-dec-19-2017-173106",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene01.geneticBase = 2;
geneticScene01.createRandomRules();
geneticScene01.geneticRules = "00000100000100111001100111011000000001001101001110000000101101011000110100011000011011111011010100010110000110100011111011100110001111111000100101110010000100110101010010110111100110001011110010111011110001101110100011100001001100010111011000001010101011110101000101000111110001010100100001011111011010011110111101110001011001011100000010100101101100111011011001100101011000110100001000000101111000111001010011100111011010000011000111111110001110000101110101001010111011111111100001011010111111000010010110111101";
geneticScene01.geneticRules = "00011100001100101001011000111101000101100011110010110101110111101111110111101010001110011100110010011111100001110010111111111001001101000100111110011001010010110011110111010000100011101000000001000111000000000101110001010100011001011111100100100101101111011001000110000001110011000001011011100111111111100101100010111010010000011000001101101110000011001001111111000101000101101110000110001100110001101111001101001010000010000110110000001110011100111110000010000111100010101111001101011111101001011101001100111000";
// geneticScene01.geneticRules = "00001110000001111001111110110101000000101010100101010100111111001011110000111010010101010110100111010100011100010011000111000101011110110101100101011000110000100110010111011110100010110110010111111101001010100111000100111110000011111101011010010101110100101100001100111001110011000011010111011110111000110110101011101000001011001101011011101111000010011110011110011111011101111111000001001010001100010100011110111111101110111110010010100000111101100000110000111011011010001010100110110011010101000100100101001101";
geneticScene01.geneticRules = "00110001011110000100011100010011000000011011001000001110000101111001010100000111011001111001011110100101100000110100111010000101010010110110000011110101000000110010010000101100111101010000011101100000111100011011001011100011111011000010001010000100111001100001111111110000011011110101010000001001101001010011111111111111011001010000100010101101100011101011000101111000010010111100100011101011100000100011000000000100010001110110101111000001011100100111011111001011000000100011010000111111001110110011010011110111";


geneticScene01.lastRules = geneticScene01.geneticRules;

geneticScene01.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].geneticState = 0;
    }
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
};

geneticScene01.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].geneticState;
            let neighborhood = this.getNeighborhood(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (value !== newValue) {
                this.next[oneDValue] = {
                    state: 1,
                    geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                this.changes[oneDValue] = value;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene01.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    sum += this.getGridValue(x - 1, y + 1);
    sum += this.getGridValue(x, y + 1);
    sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene01.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
    // if (this.currentState % 2 == 0) {
    //     this.updateGrid = biggestFractal.updateGrid;
    // } else {
    //     this.updateGrid = beforeTheRiverFractal10.updateGrid;
    // }
    if (!exporting && this.currentState == 0) {
        this.currentState++;
    } else {
        if (!printing) {
            this.updateGrid();
        } else if (printing) {
            if (this.counter % this.speedModulo == 0) {
                this.updateGrid();
            }
            this.counter++;
        }
    }
};

geneticScene01.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let a;
    if (c) {
        a = { r: 0, g: 0, b: 0 };
    } else {
        a = { r: 255, g: 255, b: 255 };
    }
    // let p = this.palette.data;
    // let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    // let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    // let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------------------------------------------//

let geneticScene02 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-tue-dec-19-2017-173106",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene02.geneticBase = 2;
// geneticScene02.createRandomRules();
// geneticScene02.geneticRules = "00000100000100111001100111011000000001001101001110000000101101011000110100011000011011111011010100010110000110100011111011100110001111111000100101110010000100110101010010110111100110001011110010111011110001101110100011100001001100010111011000001010101011110101000101000111110001010100100001011111011010011110111101110001011001011100000010100101101100111011011001100101011000110100001000000101111000111001010011100111011010000011000111111110001110000101110101001010111011111111100001011010111111000010010110111101";
// geneticScene02.geneticRules = "00011100001100101001011000111101000101100011110010110101110111101111110111101010001110011100110010011111100001110010111111111001001101000100111110011001010010110011110111010000100011101000000001000111000000000101110001010100011001011111100100100101101111011001000110000001110011000001011011100111111111100101100010111010010000011000001101101110000011001001111111000101000101101110000110001100110001101111001101001010000010000110110000001110011100111110000010000111100010101111001101011111101001011101001100111000";
// geneticScene01.geneticRules = "00001110000001111001111110110101000000101010100101010100111111001011110000111010010101010110100111010100011100010011000111000101011110110101100101011000110000100110010111011110100010110110010111111101001010100111000100111110000011111101011010010101110100101100001100111001110011000011010111011110111000110110101011101000001011001101011011101111000010011110011110011111011101111111000001001010001100010100011110111111101110111110010010100000111101100000110000111011011010001010100110110011010101000100100101001101";
// geneticScene02.geneticRules = "00110001011110000100011100010011000000011011001000001110000101111001010100000111011001111001011110100101100000110100111010000101010010110110000011110101000000110010010000101100111101010000011101100000111100011011001011100011111011000010001010000100111001100001111111110000011011110101010000001001101001010011111111111111011001010000100010101101100011101011000101111000010010111100100011101011100000100011000000000100010001110110101111000001011100100111011111001011000000100011010000111111001110110011010011110111";

geneticScene02.geneticRules = "0111011111011101";
// "0111011101111001"
// "0001100010100111"
// "0001100010101111"
geneticScene02.geneticRules = "0000101010110010";
geneticScene02.geneticRules = "0001100010100111";

geneticScene02.lastRules = geneticScene02.geneticRules;

geneticScene02.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].geneticState = 0;
    }
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
};

geneticScene02.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].geneticState;
            let neighborhood = this.getNeighborhood(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (value !== newValue) {
                this.next[oneDValue] = {
                    state: 1,
                    geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                this.changes[oneDValue] = value;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene02.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    sum += this.getGridValue(x - 1, y + 1);
    sum += this.getGridValue(x, y + 1);
    sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene02.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
    // if (this.currentState % 2 == 0) {
    //     this.updateGrid = biggestFractal.updateGrid;
    // } else {
    //     this.updateGrid = beforeTheRiverFractal10.updateGrid;
    // }
    if (!exporting && this.currentState == 0) {
        this.currentState++;
    } else {
        if (!printing) {
            this.updateGrid();
        } else if (printing) {
            if (this.counter % this.speedModulo == 0) {
                this.updateGrid();
            }
            this.counter++;
        }
    }
};

geneticScene02.getColors = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let a;
    if (c) {
        a = { r: 0, g: 0, b: 0 };
    } else {
        a = { r: 255, g: 255, b: 255 };
    }
    // let p = this.palette.data;
    // let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    // let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    // let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

geneticScene02.getNeighborhood = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    let up = (y > 0) ? y - 1 : yAmount - 1;
    let down = (y < yAmount - 1) ? y + 1 : 0;
    let left = (x > 0) ? x - 1 : xAmount - 1;
    let right = (x < xAmount - 1) ? x + 1 : 0;
    let neighborhood = "";
    neighborhood += this.getParameter(left, up, "geneticState");
    // neighborhood += this.getParameter(x, up, "geneticState");
    neighborhood += this.getParameter(right, up, "geneticState");
    // neighborhood += this.getParameter(right, y, "geneticState");
    neighborhood += this.getParameter(right, down, "geneticState");
    // neighborhood += this.getParameter(x, down, "geneticState");
    neighborhood += this.getParameter(left, down, "geneticState");
    // neighborhood += this.getParameter(left, y, "geneticState");
    // neighborhood += this.getParameter(x, y, "geneticState");
    return neighborhood;
};

geneticScene02.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 4);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.floor(Math.random() * b);
    }
};

//-------------------------------------------------------------------------------------------------//

let geneticScene03 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    paletteName: "palette-sun-dec-24-2017-031908",
    // paletteName: "palette-tue-dec-19-2017-173106",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene03.geneticBase = 2;
// geneticScene02.createRandomRules();
// geneticScene02.geneticRules = "00000100000100111001100111011000000001001101001110000000101101011000110100011000011011111011010100010110000110100011111011100110001111111000100101110010000100110101010010110111100110001011110010111011110001101110100011100001001100010111011000001010101011110101000101000111110001010100100001011111011010011110111101110001011001011100000010100101101100111011011001100101011000110100001000000101111000111001010011100111011010000011000111111110001110000101110101001010111011111111100001011010111111000010010110111101";
// geneticScene02.geneticRules = "00011100001100101001011000111101000101100011110010110101110111101111110111101010001110011100110010011111100001110010111111111001001101000100111110011001010010110011110111010000100011101000000001000111000000000101110001010100011001011111100100100101101111011001000110000001110011000001011011100111111111100101100010111010010000011000001101101110000011001001111111000101000101101110000110001100110001101111001101001010000010000110110000001110011100111110000010000111100010101111001101011111101001011101001100111000";
// geneticScene01.geneticRules = "00001110000001111001111110110101000000101010100101010100111111001011110000111010010101010110100111010100011100010011000111000101011110110101100101011000110000100110010111011110100010110110010111111101001010100111000100111110000011111101011010010101110100101100001100111001110011000011010111011110111000110110101011101000001011001101011011101111000010011110011110011111011101111111000001001010001100010100011110111111101110111110010010100000111101100000110000111011011010001010100110110011010101000100100101001101";
// geneticScene02.geneticRules = "00110001011110000100011100010011000000011011001000001110000101111001010100000111011001111001011110100101100000110100111010000101010010110110000011110101000000110010010000101100111101010000011101100000111100011011001011100011111011000010001010000100111001100001111111110000011011110101010000001001101001010011111111111111011001010000100010101101100011101011000101111000010010111100100011101011100000100011000000000100010001110110101111000001011100100111011111001011000000100011010000111111001110110011010011110111";

geneticScene03.geneticRules = "0111011111011101";
// "0111011101111001"
// "0001100010100111"
// "0001100010101111"
geneticScene03.geneticRules = "0000101010110010";
// "0110111100100110"
// "0000101010110010"
// "0111110100011100"
// "0110100100000000"
// "0110100110000000"
// "0110110010000010"
// "0110110010010010"
geneticScene03.geneticRules = "0110110010000010";

geneticScene03.lastRules = geneticScene02.geneticRules;

geneticScene03.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].geneticState = 0;
        this.changes[i] = 0;
    }
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
};

geneticScene03.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].geneticState;
            let neighborhood = this.getNeighborhood(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (value !== newValue) {
                this.next[oneDValue] = {
                    state: 1,
                    geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                this.changes[oneDValue] = value;
                // this.changes[oneDValue] = this.currentState * 1;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene03.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    sum += this.getGridValue(x - 1, y + 1);
    sum += this.getGridValue(x, y + 1);
    sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene03.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
    // if (this.currentState % 2 == 0) {
    //     this.updateGrid = biggestFractal.updateGrid;
    // } else {
    //     this.updateGrid = beforeTheRiverFractal10.updateGrid;
    // }
    if (!exporting && this.currentState == 0) {
        this.currentState++;
    } else {
        if (!printing) {
            this.updateGrid();
        } else if (printing) {
            if (this.counter % this.speedModulo == 0) {
                this.updateGrid();
            }
            this.counter++;
        }
    }
};

geneticScene03.getColors = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let a;
    if (this.grid[oneDValue].state == 0) {
        let fade = map(c, 0, 100, 255, 0);
        a = { r: fade, g: fade, b: fade };
        // a = { r: fade, g: fade, b: fade };
        a = { r: 0, g: 0, b: 0 };
    } else {
        let fade = map(c, 0, 100, 0, 255);
        a = { r: fade, g: fade, b: fade };
        a = { r: 255, g: 255, b: 255 };
    }
    // let p = this.palette.data;
    // let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    // let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    // let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

geneticScene03.getNeighborhood = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    let up = (y > 0) ? y - 1 : yAmount - 1;
    let down = (y < yAmount - 1) ? y + 1 : 0;
    let left = (x > 0) ? x - 1 : xAmount - 1;
    let right = (x < xAmount - 1) ? x + 1 : 0;
    let neighborhood = "";
    // neighborhood += this.getParameter(left, up, "geneticState");
    neighborhood += this.getParameter(x, up, "geneticState");
    // neighborhood += this.getParameter(right, up, "geneticState");
    neighborhood += this.getParameter(right, y, "geneticState");
    // neighborhood += this.getParameter(right, down, "geneticState");
    neighborhood += this.getParameter(x, down, "geneticState");
    // neighborhood += this.getParameter(left, down, "geneticState");
    neighborhood += this.getParameter(left, y, "geneticState");
    // neighborhood += this.getParameter(x, y, "geneticState");
    return neighborhood;
};

geneticScene03.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 4);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.floor(Math.random() * b);
    }
};

//-------------------------------------------------------------------------------------------------//

let geneticScene04 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-tue-dec-19-2017-173106",
    // paletteName: "palette-sun-mar-04-2018-041924",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene04.geneticBase = 2;
// geneticScene02.createRandomRules();
// geneticScene02.geneticRules = "00000100000100111001100111011000000001001101001110000000101101011000110100011000011011111011010100010110000110100011111011100110001111111000100101110010000100110101010010110111100110001011110010111011110001101110100011100001001100010111011000001010101011110101000101000111110001010100100001011111011010011110111101110001011001011100000010100101101100111011011001100101011000110100001000000101111000111001010011100111011010000011000111111110001110000101110101001010111011111111100001011010111111000010010110111101";
// geneticScene02.geneticRules = "00011100001100101001011000111101000101100011110010110101110111101111110111101010001110011100110010011111100001110010111111111001001101000100111110011001010010110011110111010000100011101000000001000111000000000101110001010100011001011111100100100101101111011001000110000001110011000001011011100111111111100101100010111010010000011000001101101110000011001001111111000101000101101110000110001100110001101111001101001010000010000110110000001110011100111110000010000111100010101111001101011111101001011101001100111000";
// geneticScene01.geneticRules = "00001110000001111001111110110101000000101010100101010100111111001011110000111010010101010110100111010100011100010011000111000101011110110101100101011000110000100110010111011110100010110110010111111101001010100111000100111110000011111101011010010101110100101100001100111001110011000011010111011110111000110110101011101000001011001101011011101111000010011110011110011111011101111111000001001010001100010100011110111111101110111110010010100000111101100000110000111011011010001010100110110011010101000100100101001101";
// geneticScene02.geneticRules = "00110001011110000100011100010011000000011011001000001110000101111001010100000111011001111001011110100101100000110100111010000101010010110110000011110101000000110010010000101100111101010000011101100000111100011011001011100011111011000010001010000100111001100001111111110000011011110101010000001001101001010011111111111111011001010000100010101101100011101011000101111000010010111100100011101011100000100011000000000100010001110110101111000001011100100111011111001011000000100011010000111111001110110011010011110111";

geneticScene04.geneticRules = "0111011111011101";
// "0111011101111001"
// "0001100010100111"
// "0001100010101111"
geneticScene04.geneticRules = "0000101010110010";
// "0110111100100110"
// "0000101010110010"
// "0111110100011100"
// "0110100100000000"
// "0110100110000000"
// "0110110010000010"
// "0110110010010010"

geneticScene04.lastRules = geneticScene02.geneticRules;

geneticScene04.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].geneticState = 0;
    }
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
};

geneticScene04.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].geneticState;
            let neighborhood = this.getNeighborhood(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (value !== newValue) {
                this.next[oneDValue] = {
                    state: 1,
                    geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                this.changes[oneDValue] = value;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene04.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    sum += this.getGridValue(x - 1, y + 1);
    sum += this.getGridValue(x, y + 1);
    sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene04.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
    // if (this.currentState % 2 == 0) {
    //     this.updateGrid = biggestFractal.updateGrid;
    // } else {
    //     this.updateGrid = beforeTheRiverFractal10.updateGrid;
    // }
    if (!exporting && this.currentState == 0) {
        this.currentState++;
    } else {
        if (!printing) {
            this.updateGrid();
        } else if (printing) {
            if (this.counter % this.speedModulo == 0) {
                this.updateGrid();
            }
            this.counter++;
        }
    }
};

geneticScene04.getColors = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let a;
    if (c) {
        a = { r: 0, g: 0, b: 0 };
    } else {
        a = { r: 255, g: 255, b: 255 };
    }
    // let p = this.palette.data;
    // let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    // let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    // let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

geneticScene04.getNeighborhood = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    let up = (y > 0) ? y - 1 : yAmount - 1;
    let down = (y < yAmount - 1) ? y + 1 : 0;
    let left = (x > 0) ? x - 1 : xAmount - 1;
    let right = (x < xAmount - 1) ? x + 1 : 0;
    let neighborhood = "";
    neighborhood += this.getParameter(left, up, "geneticState");
    // neighborhood += this.getParameter(x, up, "geneticState");
    neighborhood += this.getParameter(right, up, "geneticState");
    // neighborhood += this.getParameter(right, y, "geneticState");
    neighborhood += this.getParameter(right, down, "geneticState");
    // neighborhood += this.getParameter(x, down, "geneticState");
    neighborhood += this.getParameter(left, down, "geneticState");
    // neighborhood += this.getParameter(left, y, "geneticState");
    neighborhood += this.getParameter(x, y, "geneticState");
    return neighborhood;
};

geneticScene04.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 5);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.floor(Math.random() * b);
    }
};
geneticScene04.createRandomRules();
geneticScene04.geneticRules = "01011001100110111101001100010101";

//-------------------------------------------------------------------------------------------------//

let geneticScene05 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-mon-dec-18-2017-003351",
    // paletteName: "palette-tue-dec-19-2017-173106",
    paletteName: "palette-sat-dec-16-2017-011302",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene05.geneticBase = 2;

geneticScene05.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        // this.grid[i].geneticState = Math.floor(Math.random() * 4);
        this.grid[i].state = 0;
        // this.grid[i].geneticState = 0;
        this.grid[i].changed = true;
        this.changes[i] = 0;
    }
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    scene.applyPalette();
};

geneticScene05.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            let neighborhood = this.getNeighborhood(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (value !== newValue) {
                this.next[oneDValue] = {
                    state: newValue,
                    // geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                // this.changes[oneDValue] = newValue;
                this.changes[oneDValue] = this.currentState * 0.25;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    // geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
                // this.changes[oneDValue] = value;
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene05.calculateNeighbors = function(x, y) {
    var sum = 0;
    // sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    // sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    // sum += this.getGridValue(x - 1, y + 1);
    // sum += this.getGridValue(x, y + 1);
    // sum += this.getGridValue(x, y);
    // sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene05.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
    // if (this.currentState % 2 == 0) {
    //     this.updateGrid = biggestFractal.updateGrid;
    // } else {
    //     this.updateGrid = beforeTheRiverFractal10.updateGrid;
    // }
    if (!exporting && this.currentState == 0) {
        this.currentState++;
    } else {
        if (!printing) {
            this.updateGrid();
        } else if (printing) {
            if (this.counter % this.speedModulo == 0) {
                this.updateGrid();
            }
            this.counter++;
        }
    }
};

geneticScene05.getNeighborhood = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    let up = (y > 0) ? y - 1 : yAmount - 1;
    let down = (y < yAmount - 1) ? y + 1 : 0;
    let left = (x > 0) ? x - 1 : xAmount - 1;
    let right = (x < xAmount - 1) ? x + 1 : 0;
    let neighborhood = "";

    let upNeighborhood = 0;
    upNeighborhood += this.getGridValue(left, up);
    upNeighborhood += this.getGridValue(x, up);
    upNeighborhood += this.getGridValue(right, up);
    neighborhood += Math.min(1, upNeighborhood);
    let downNeighborhood = 0;
    downNeighborhood += this.getGridValue(left, down);
    downNeighborhood += this.getGridValue(x, down);
    downNeighborhood += this.getGridValue(right, down);
    neighborhood += Math.min(1, downNeighborhood);
    let leftNeighborhood = 0;
    leftNeighborhood += this.getGridValue(left, up);
    leftNeighborhood += this.getGridValue(left, y);
    leftNeighborhood += this.getGridValue(left, down);
    neighborhood += Math.min(1, leftNeighborhood);
    let rightNeighborhood = 0;
    rightNeighborhood += this.getGridValue(right, up);
    rightNeighborhood += this.getGridValue(right, y);
    rightNeighborhood += this.getGridValue(right, down);
    neighborhood += Math.min(1, rightNeighborhood);
    // neighborhood += this.getGridValue(x, y);
    return neighborhood;
};

geneticScene05.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 4);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.round(Math.random());
    }
};
geneticScene05.createRandomRules();
// geneticScene05.geneticRules = "1001001001101100011010010011010111101001101000100111001100111111001001010001101101001111011100100011111111110110101111111111101000101001010111010111000100000100011101100100101000011001110011000100000001011011000100110111110001001001110010111100100001011101";
// geneticScene05.geneticRules = "0101000000001010100000101111101011110111011100101100001010010110001000001010110000000111111110011001001111010110010001110111001111111011100011111000010011111000000111111100010111110110001110110011100011110111010010111100010101110001110110101001011000011100";
// geneticScene05.geneticRules = "1101000010101000000011111101001011011101001001000001011101000000011100011111001010111110101101101000110010000010100110001110000010101101001000010010101000101100010001010101100101100011100111011001001000110101101011100111000001101011110110101010101011000100";
// geneticScene05.genetricRules = "0011110011011111110111110100011111111010010011000110101111000011111111001011100000011011001100001111101010110101111001101001101110110111110111100000010101101001110010100010000000100101010000001010001001111110011010110000100000001100111100110100000000111011";
// "0110111011111010011011000000010101111111011000101101011100000100011111001100100101001000110010110110100111011001011101100000110101110110110001100100000001010101000010110111101110100001111100011000101100111000001000101110110001100010100000010110010011111000"
// geneticScene05.geneticRules = "0011110101001100100100101011001110010011010010001100110111001111111001011000100001110100110101111101001011000101010001000110010001101000011011101000010111100011000110011111011011011011101111001101100101100010110101101011011111010000100010001111110100101010";
// "0011110101001100100100101010000110010110110010001100100111001111101001011000001001110100100111011100011011000111010001000110010000101000111011111000110101100011000110011010011011011011101111001111100101100010110001101011011110010000100010001111100100101010"
// "0001111101000010100001100100010011110001000101100111111101000111100101110111011110110100010101101101000100000100000100111000011011000010110111000001000010100101100111000111100011010111101100001010001101001011110100011011100100010100101010010110001010111000"
// geneticScene05.geneticRules = "00100000010100011010100001011101";
geneticScene05.geneticRules = "0110011001101111";
geneticScene05.lastRules = geneticScene05.geneticRules;

geneticScene05.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    if (c == 0) {
        return color(0, 0, 0);
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
}
scene = geneticScene03;