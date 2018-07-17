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
                this.incrementChanges(x, y);
                // this.changes[oneDValue] = value;
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
        // a = { name: "", r: fade, g: fade, b: fade };
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
    // fileName: "./frames/genetic-scene-05-montage/genetic-scene-05-montage",
    fileName: "genetic-scene-05",
    folderPath: "/Volumes/WD001/genetic-render/",
    // /Volumes/WD001/genetic-render
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 9,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145,r height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-mon-dec-18-2017-003351",
    // paletteName: "palette-tue-dec-19-2017-173106",
    // paletteName: "palette-sat-dec-16-2017-011302",
    // paletteName: "palette-sat-dec-16-2017-014035",
    // paletteName: "palette-sun-mar-04-2018-154033",
    paletteName: "palette-sat-dec-16-2017-160319",
    paletteName: "palette-thu-mar-01-2018-184734",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene05.geneticBase = 2;

geneticScene05.applyShapes = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < this.grid.length; i++) {
        // this.grid[i].geneticState = Math.floor(Math.random() * 4);
        this.grid[i].state = 0;
        // this.grid[i].geneticState = 0;
        this.grid[i].changed = true;
        this.changes[i] = 0;
    }
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "geneticState", 1);
    this.setGridValue(xAmount / 2, yAmount / 2, 1);
    scene.applyPalette();
};

geneticScene05.updateGrid = function() {
    if (this.currentState >= this.newListOfRules[this.rulesIndex].d) {
        // this.mutateRules();
        if (this.rulesIndex < this.newListOfRules.length) {
            this.rulesIndex++;
            this.fileName = this.newListOfRules[this.rulesIndex].name;
            this.geneticRules = this.newListOfRules[this.rulesIndex].r;
            this.applyShapes();
            this.currentState = 0;
            frameToExport = 1;
        }
    }
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
                // this.changes[oneDValue] = this.currentState * 0.5;
                this.changes[oneDValue] = 1;
                // this.changes[oneDValue] = newValue;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    // geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
                // this.changes[oneDValue] = this.currentState * 0.25;
                this.changes[oneDValue] = 4;
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
// geneticScene05.geneticRules = "0110011001101111";

// Complex and strange:
// "0110101110001110"
// Almost perfect arrowhead:
// "0110101110000010"
// Landscape:
// "0010100010011110"
// Paper planes:
// "0010100010011011"
// Trees of Finland:
// "0010100010010001"
// Medium Shimmer:
// "0110100010010000"
// Shimmer 2:
// "0111100010011000"
// Symmetrical Shimmer:
// "0111100110011000"
// Arrows:
// "0111100110011110"
// Stellar Cauliflower:
// "0110100010000101"
// Bauhaus Descending:
// "0110100011000101"
// Hills
// "0110000010001001"
// Emperess
// "0110100000000001"
// Sun Queen
// "0110100010000001"
// The Shining Brain of Sofia Kovalevskaya
// "0111100010000001"
// Shining Brain Medley
// "0110100010000001"
// Serpinsk
// "0111100001100000"
// Iridescent Cube
// "0011111101111110"
// Ska
// "0110100010000000"
// Lakes and Hills
// "0100100010001001"
// Rocks in a pond
// "0101111001100001"
// The Machinery of Sunset
// Inner Fractal
// "0000111011100001"
// Self-Similar Ruler
// "0001111111111001"
// Box
// "0110111111110000"
// "0100011111110000"
// "0101111111110000"
// "0101111111110100"
// Perfect Box
// "0110111111110110"
// The Pool Tables of Rural Canada
// "0101111111110000"
// Mazes upon Mazes
// "0101111111111100"
// Rainy Saturday
// "0101111001100001"
// Rainy Two
// "0110011001101001"
// Dancing Hills
// "0101100000001011"
// Staircase
// "0100010011101110"
// Inner Staircase
// "0100010111101110"
// Sideway table
// "0101001100111101"
// Sideway disappearing table
// "0100001100111101"
// Treelike table
// "0100101010101001"
// Big H
// "0010011001101101"
// Flickering Snakes
// "0011010101111000"
// The Other Pool Table
// "0110100010110011"
// The Eye
// "0111000100011010"
// Frantic Eye
// "0111000100011000"
// Half-Stable Eye
// "0111000100011010"
// Other Half-Stable Eye
// "0111000100011100"
// "0111000100011100"
// Water Up
//"0111100100001010"
// Up in the Trees
// "0100011010001110"
// Upper Left Ruler
// "0001011001111011"
// Better Upper Left Ruler
// "0011011011001001"
// Solid Upper Left Growth
// "0011011011011011"
// Perfect Table
// "0111111111111100"
// Shaky Table
// "0010111110110010"
// V
// "0100011010000111"
// North-East Arrow
// "0100001010011101"
// East Ruler
// "0100001110111101"
// Better East Ruler
// "0100101110110101"
// Big C
// "0101111111111101"
// "0101111101111101"
// "0100111101111001"
// Self-Digesting Pool Table
// "0101111111111100"
// Other Shaky Table
// "0101111111011100"
// Wood Panels of Southern Finland
// "0101111001011110"
// Vague Ruler
// "0001011000011011"
// North Ruler
// "0001011010111011"
// South Cartesian Growth
// "0100100001100111"
// South East Ruler
// "0100100000110011"
// Wooden Box
// "0101111011100110"
// Perfect Wooden Box
// "0111111011100110"
// Western Pool Table of Rural Canada
// "0011111111110000"
// Reflecting Brain
// "0110100110010000"
// Downward Serpinski
// "0110100111000000"
// Traveling Boat
// "0100100110010001"
// Other Traveling Boat
// "0101100110010001"
// Messy Traveling Boat
// "0100100010010001"
// East Traveling Boat
// "0011100110010001"
// East Messy Traveling Boat
// "0011100110000001"
// Le vaisseau d'or
// "0011100110011001"
// Slightly Fuller East Traveling Boat
// "0011100110011001"
// Big Ruler
// "0001011001111011"
// Fuzzy Triangle
// "0100011110000100"
// Tower
// "0110011010001110"
// Shims
// "0111100110001000"
// Crawl
// "0010100000001101"
// Pretty Good Ruler
// "0011100000011101"
// Reflecting Frog
// "0100101010100001"
// Little Wow
// "0110101010100001"
// West Ruler
// "0100101110111001"
// Little Maze
// "0100010011110000"
// Normal Serpinski
// "0010010110001100"
// "0010010110001101"
// South West Growth
// "0011111001101001"
// River Run
// "0101010111101000"
// Reverted Shaky Pool Table
// "0011111111110010"
// Reverted Pool Table of Rural Canada
// "0011111111110000"
// Bland Pool Table
// "0111111111110100"
// Arrows of a New Day
// "0111001010101000"
// Symmetrical Arrows of a New Day
// "0111101010101000"
// Fire Arrow
// "0110101010101001"
// Shimmering Wood
// "0010011001101110"
// Vertical Pool Table of Rural Canada
// "0010111001101110"
// Symmetrical Vertical Pool Table of Rural Canada
// "0110111001101110"
// Carpet
// "0010011110100010"
// Sideway Tower
// "0001111101110000"
// Perfect Sideway Tower
// "0001111111110000"
// Big Tree
// "0111111001111000"
// North West Ruler
// "0110010110001101"
// North East Ornate
// "0110101010000001"
// Balloon
// "0001011010011001"
// Mallet Inflorescence
// "0111100110011110"
// North Little Thing
// "0111100011101000"
// More Symmetrical
// "0111111011101000"
// Floating Tower
// "0011010110010000"
// Smoke in the Sky
// "0111010110010100"
// Video Games of Yore
// "0000111111100000"
// North West Mountains
// "0110010010000101"
// Feely
// "0011000010001101"
// Feely Two
// "0011000010000101"
// Sunflowers
// "0011000010001001"
// The North-West of Tasmania
// "0111000010001001"
// Painting
// "0111000010000001"
// "0110000010000001"
// "0110000010001111"
// "0100000010001011"


geneticScene05.geneticRules = "0110100010000001";
geneticScene05.geneticRules = "0100100010001001";
geneticScene05.geneticRules = "0111100010000001";
geneticScene05.geneticRules = "0001111111111001";
geneticScene05.geneticRules = "0010100010011110";
geneticScene05.geneticRules = "0000111011100001";
// "0000111101100001"
geneticScene05.geneticRules = "0110011001101001";
geneticScene05.geneticRules = "0111100010000001";



geneticScene05.geneticRules = "0100011110000100";

geneticScene05.newListOfRules = [


    // { name: "emperess", r: "0110100010000001", d: 425 },

    // Sofia
    // "0111100010000001",
    // { name: "sofia-kovalevskaya", r: "0111100010000001", d: 350 },

    // Ska Shimmer
    // "0111100010000000",
    // Downward landscape
    { name: "downward-landscape", r: "0110000010000101", d: 400 },
    // Sideway Medusa
    { name: "sideway-medusa", r: "0011100010000001", d: 500 },
    // Right boat
    { name: "right-boat", r: "0110100010000101", d: 325 },
    // Mid Boat
    // "0110100010000111",
    // Big boat
    { name: "big-boat", r: "0111100110000001", d: 350 },
    // Sideway boat
    { name: "sideway-boat", r: "0101100010000011", d: 450 },
    // 45 Serpinski
    { name: "45-serpinski", r: "0111110010000000", d: 700 },
    // Mangled 45 Serpinski
    { name: "mangled-45-serpinski", r: "0111110010010000", d: 380 },
    // Mangled More
    // I don't like this one... { name: "mangled-more", r: "0111110010010010", d: 200 },
    // Mast
    { name: "mast", r: "0010010010010011", d: 330 },
    // Sideway Pine Tree
    { name: "sideway-pine-tree", r: "0010010011000001", d: 360 },
    // Towards serpinski
    // "0010010010000000",
    // Rotten Mast
    { name: "rotten-mast", r: "0010010010000001", d: 360 },
    // Horizontal Serpinski
    { name: "horizontal-serpinski", r: "0010010011000000", d: 300 },
    // Surprise Serpinski
    { name: "surprise-serpinski", r: "0010011011000000", d: 129 },
    // Facing Serpinski
    { name: "facing-serpinski", r: "0011011010000000", d: 260 },
    // Forest Serpinski
    { name: "forest-serpinski", r: "0010011010000011", d: 350 },
    // Mossy Serpinski
    { name: "mossy-serpinski", r: "0001011010010001", d: 250 },
    // Calculated Mossy
    { name: "calculated-mossy", r: "0001011010011111", d: 305 },
    // "0001011000011111",
    // Bauhaus Descending:
    { name: "bauhaus-descending", r: "0110100011000101", d: 400 },
    // The New Rulers
    { name: "the-new-rulers", r: "0111100001010101", d: 350 },
    // Downward Serpinski
    // "0111100001011100",
    // The Boring One
    // Don't use this one { name: "the-boring-one", r: "0001001001111111", d: 200 },
    // Don't use this one { name: "the-boring-two", r: "0001001001111110", d: 200 },
    { name: "the-boring-three", r: "0101001100111010", d: 385 },
    { name: "the-boring-four", r: "0101001100110010", d: 300 },
    // Shining and Glorious Serpinski
    { name: "shining-and-glorious-serpinski", r: "0101001100110000", d: 600 },
    // The Pool Tables of Rural Canada
    { name: "the-pool-tables-of-rural-canada", r: "0101111111110000", d: 450 },
    // Cranky Serpinski
    // "0100001100110000",
    // Cranky but Growing
    { name: "cranky-but-growing", r: "0101101110100001", d: 250 },
    // Frantic Pinewood Forest
    { name: "frantic-pinewood-forest", r: "0101001010100001", d: 880 },
    // Serene Landscape
    { name: "serene-landscape", r: "0101001110000001", d: 400 },
    // Broken Landscape
    { name: "broken-landscape", r: "0101101110000001", d: 400 },
    // Good Growth
    { name: "good-growth", r: "0100011010100101", d: 300 },
    // Rainy Two
    { name: "rainy-two", r: "0110011001101001", d: 220 },
    // Inner Fractal
    { name: "inner-fractal", r: "0000111011100001", d: 375 },
    // Self-Similar Ruler
    { name: "self-similar-ruler", r: "0001111111111001", d: 250 },
    // Between Rain and Maze
    // Don't use this one { name: "between rain and maze", r: "0110011011111100", d: 200 },
    // Mazes upon Mazes
    { name: "mazes-upon-mazes", r: "0101111111111100", d: 600 },
    { name: "big-c", r: "0101111111111101", d: 200 },
    { name: "feely", r: "0011000010001101", d: 540 },
    { name: "emperess", r: "0110100000000001", d: 425 },
    { name: "rocks-in-a-pond", r: "0101111001100001", d: 400 },
    { name: "sunflowers", r: "0011000010001001", d: 1200 },
    { name: "golden-ship", r: "0011100110011001", d: 800 },
    // Between Mazes and Perfect Box
    // Don't use this one { name: "between-mazes-and-perfect-box", r: "0101111111110110", d: 200 },
    // Perfect Box
    // Don't use this one { name: "perfect-box", r: "0110111111110110", d: 200 }
];

geneticScene05.listOfRules = [
    "0111100010000001",
    "0111101010000001",
    "0111001010000001",
    "0111001010000011",
    "0111011000000001",
    "0100111000001000",
    "0000110000000000",
    // "0000110100100010",
    // "0000110110100010",
    "0000111110100010",
    "0010111110110010",
    "0011111100110010",
    "0011011100110010",
    "0011011100110000",
    "0011111100110000",
    "0011111000110000",
    "0001011000010000",
    // Mossy Serpinski
    "0001011010010001",
    // "0001011011011101",
    // "0101011010011101",
    // Calculated Mossy
    "0001011010011111",
    "0001011000011111",
    // "0001001000111111",
    "0001001001111111",
    "0001001001111110",
    "0101001001111110",
    "0101001000111010",
    "0101001100111010",
    "0101001100110010",
    // Shining and Glorious Serpinski
    "0101001100110000",
    "0101101100110000",
    "0101101100100000",
    // Cranky but Growing
    "0101101110100001",
    // Frantic Pinewood Forest
    "0101001010100001",
    // Serene Landscape
    "0101001110000001",
    // Broken Landscape
    "0101101110000001",
    // "0101101110100001",
    "0101001110100101",
    "0100001010100101",
    // Good Growth
    "0100011010100101",
    "0001011010100101"
];

geneticScene05.lastRules = geneticScene05.geneticRules;

geneticScene05.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    if (this.grid[oneDValue].state == 0) {
        return color(0, 0, 0);
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 350, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
}


geneticScene05.rulesIndex = 0;
geneticScene05.fileName = geneticScene05.newListOfRules[geneticScene05.rulesIndex].name;
geneticScene05.geneticRules = geneticScene05.newListOfRules[geneticScene05.rulesIndex].r;


//-------------------------------------------------------------------------------------------------//

let geneticScene06 = new Scene({
    fileName: "/Volumes/WD001/animation-frames/game-of-life/assorted-drips-one/assorted-drips-one",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-wed-dec-20-2017-043203",
    // paletteName: "palette-mon-dec-18-2017-003351",
    // paletteName: "palette-tue-dec-19-2017-173106",
    // paletteName: "palette-sat-dec-16-2017-011302",
    // paletteName: "palette-sat-dec-16-2017-014035",
    // paletteName: "palette-sun-mar-04-2018-154033",
    paletteName: "palette-sat-dec-16-2017-160319",
    paletteName: "palette-thu-mar-01-2018-184734",

    // Summer
    paletteName: "palette-sat-mar-17-2018-152553",
    // "palette-sun-dec-24-2017-140250"


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16 * 1.4,
    maxSteps: 129
});

geneticScene06.geneticBase = 2;

geneticScene06.applyShapes = function() {
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

geneticScene06.updateGrid = function() {
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
                this.changes[oneDValue] = this.currentState * 0.25;
                // this.changes[oneDValue] = 1;
                // this.changes[oneDValue] = newValue;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    // geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
                // this.changes[oneDValue] = this.currentState * 0.5;
                // this.changes[oneDValue] = 4;
                // this.changes[oneDValue] = value;
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene06.calculateNeighbors = function(x, y) {
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

geneticScene06.update = function() {
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

geneticScene06.getNeighborhood = function(x, y) {
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
    neighborhood += this.getGridValue(x, y);
    return neighborhood;
};

geneticScene06.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 5);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.round(Math.random());
    }
};
geneticScene06.createRandomRules();
geneticScene06.geneticRules = "00110111100111000000110111011101";
geneticScene06.geneticRules = "00110111000111010000110111010101";
geneticScene06.geneticRules = "01111111000000001100010101000011";

// Assorted Drips 1
// 00110111110101001001000111010011

// Excellent Drips
// "01011111010100001100010111000011"

// 

// Filling Drip
// 01101010000001011100010100010011


// "00111110000100001100001010111101"
// "00111011000100001100000111111101"
// "01011001101101000011000100010101"
// "01001101100000111100000110000101"
// "01001100000100111100000110000101"
// "00011110001100111100000110000101"
// Tapestry
// "00110111000111010000110111010101"
// "00110111010011010000110111011101"

// Stacks of Offices
// "00110011000100101001010110001101"
// Desert
// "00110111000100101001100110001101"
// "00110111000000110101100110001101"
// Runes
// "00110111000001110101100110001101"
// Towards New Hills
// "00110111000001110100100110001101"
// "00110111000000110100100110001101"
// "00110111000000110100100110001001"
// "00110101000000110100100100001001"
// "00110101000000110101100100001001"
// Traveling Rocks
// "00011000111101111000000011100001"
// "01011010111100111100000011100001"
// Gazebos of Northern Caucasius
// "01011000111100111100000011000101"
// Super Weird Writing
// "00011111100001011100000110010101"
// Super Weird Writing 2 - Peculiar Handwriting
// "00011111100001010100000111010101"
// "01011111100001010100000111010101"
// Odd Fire
// "01111111100101010100000110000111"
// "01101000110110100010000000110001"
// Serpinski
// "01100111001100000111100111110001"
// Erosion on Serpinski
// "01100111000100000110100111110001"
// Destroyed Pattern
// "01100111010000001110100111110001"
// "00100111000100000110100111110001"
// Mountain
// "00100100010100000110101110100001"
// "00100001010100000110101110001001"
// "00100001110100000110101110010001"
// "00110001110100000110101111000001"
// "00110001110100010110101111000001"
// "00111000101000001100111101100101"
// "00111100101000001100011101100101"
// "00010111110000001101100000111101"
// "00010111110000001001100000111101"
// "00010110110000001001000010111101"
// "01011010100000000000011101011001"
// Rolling Shadows on a Mountain Range
// "01011010100001000000011101001101"
// Strangely Dripping Colours
// "00110110110101001001010001010011"
// Even Better Dripping
// "00110110110101001001000001010011"
// Dripping Middle
// "00111110110101001101000001010011"
// Assorted Drips
// "00110111110101001001000111010011"
// "00110111110001001001000111010011"
// "00110111110001001001000110010011"
// Pattern Making Wiper
// "00110111010001001001000100010011"
// "01110111010001011001000101010011"
// "01110111010001011001010101010011"
// Streets and Hotels
// "00000010111110010001010111001101"
// "00000010111110010001011111001101"
// "00000110111111010001011111001101"
// "00000110111111010000010111001101"
// Space-Filling Pyramids
// "01010111010111011100101101010001"
// "01110111110111001010111001010001"

// "00110111111101101110111011111110"
// "01101000001101011100000000101010"
// Drips of the New Spring
// "01101111000001001100010101010011"
// "01101110000000001100010101010011"
// "01101110000001001100010101010011"
// "01101110000001011100010101010011"
// "01101110000000011100010100010011"
// "01101110000000011100000100010011"
// "01101010000000011100010100010011"
// "01101010000001011100010100010011"
// "01111010000000011100010100010111"
// "01111111000001001100010101000011"
// Excellent Drips
// "01111111000000001100010101000011"
// "01011111010100001100010111000011"
// Sunny Drips
// "01110010100101000101000011010011"
// Soft Mountains
// "00111111000110010100110111011101"
// "00111111010110010100110111011101"
// "00100101000110010110111111010001"
// "00111101000111001110111111010001"
// "00111001000111000110101111010001"
// "00011001000111000100101111010001"
// "00011101000111000110101111010001"
// "00001101000111001110101111010001"
// "00011101000100011111111111110001"
// "00011101010101011111111111110001"
// Soft Mountains with No Contour
// "00010101010101011111111111000011"

// Offices for Everyone
// "00100111100100011111000111010100"
// "00100111100000011011010101010000"
// "00001111000000011011010111010000"
// "00100010010101000111100001101101"
// "00010100101100011011000110011101"
// with "palette-fri-jan-12-2018-034139"
// "01100111100111011001000111010100"
// "01000101100111010011010111010100"
// "01100111100111011111010111010000"
// "00000111101111011111010111010000"
// Maze Out of Nowhere
// "00000111111111011111110111010000"
// "00000110111111011111110111010000"
// "00000110111111011111110111010100"
// "00010110111111011111110111010100"
// "00000010111111011111110111010101"
// "00000010111111011111110111000101"
// "01000010111111011111110111000101"
// Perfect version of the preceding one
// "01010010111111011111110111010101"
// "01010010111101001011111111011101"
// "00001001111101011111010101001101"
// "00001101111101011111010101001101"
// "01001101111101011111010101001101"
// "01011101111101011111010101001101"
// "01011111111101011111000100001101"
// "00101000110100001101000011000011"
// "01010011111111011111110111010100"

// Ocre Sunset
// "00100000110111110101001000010001"
// "palette-tue-mar-20-2018-015216"

// Teal Sunset
// "01111001000110110011000010000101"
// "palette-tue-apr-24-2018-031103"

// Labours / Boustrophédons
// "00101110010011101011111000101000"
// "00111110011111101011111010101000"
// "00001101100110000110101101010001"
// "00011111110100000110101111010001"

// Towering Boustrophédons
// "00011111110101000110101111010001"
// "palette-sat-mar-17-2018-155419"

// Flowy Mountains
// "00001111010101000110101101010001"

// Serpinksi Mountain Range
// "01000101010001010110101100011001"
// "01010101010101010110101100011001"

// A Confusing Summer
// "00110111100011001100110111010100"
// palette-sat-mar-17-2018-152553

// Cute Serpinski
// "00001111010101000110101101000001"

// Quilt
// "01101011110001001001000001000010"

geneticScene06.lastRules = geneticScene06.geneticRules;

geneticScene06.getColors = function(oneDValue, optionalArray) {
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
    let a = adjustLevels(0, 0, 350, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

geneticScene06.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    if (this.grid[oneDValue].state == 0) {
        return color(0, 0, 0);
    } else {
        // return color(255);
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 350, { r: red, g: green, b: blue });
    a = { r: 255, g: 255, b: 255 };
    return color(a.r, a.g, a.b);
};
//-------------------------------------------------------------------------------------------------//

let geneticScene07 = new Scene({
    fileName: "./frames/genetic-scene-05b/genetic-scene-05",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 145, height: 145 },
    paletteName: "palette-thu-mar-01-2018-184734",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

geneticScene07.geneticBase = 4;

geneticScene07.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].state = 0;
        this.grid[i].changed = true;
        this.changes[i] = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    scene.applyPalette();
};

geneticScene07.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            let neighborhood = this.getNeighborhood(x, y);
            let oldNeighborhood = this.calculateNeighbors(x, y);
            let newValue = this.applyRules(neighborhood);
            let changed = false;
            if (!value) {
                if (oldNeighborhood <= 1 && oldNeighborhood) {
                    this.next[oneDValue] = {
                        state: newValue,
                        // geneticState: newValue,
                        changed: true
                    };
                    changed = true;
                    // this.incrementChanges(x, y);
                    this.changes[oneDValue] = this.currentState * 0.25;
                }
            } else if (value !== newValue) {
                this.next[oneDValue] = {
                    state: newValue,
                    // geneticState: newValue,
                    changed: true
                };
                changed = true;
                // this.incrementChanges(x, y);
                this.changes[oneDValue] = this.currentState * 0.25;
                // this.changes[oneDValue] = 1;
                // this.changes[oneDValue] = newValue;
            }
            if (!changed) {
                this.next[oneDValue] = {
                    state: this.grid[oneDValue].state,
                    // geneticState: this.grid[oneDValue].geneticState,
                    changed: false
                };
                // this.changes[oneDValue] = this.currentState * 0.5;
                // this.changes[oneDValue] = 4;
                // this.changes[oneDValue] = value;
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

geneticScene07.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getGridValue(x - 1, y - 1);
    sum += this.getGridValue(x, y - 1);
    sum += this.getGridValue(x + 1, y - 1);
    sum += this.getGridValue(x - 1, y);
    sum += this.getGridValue(x + 1, y);
    sum += this.getGridValue(x - 1, y + 1);
    sum += this.getGridValue(x, y + 1);
    // sum += this.getGridValue(x, y);
    sum += this.getGridValue(x + 1, y + 1);
    return sum;
};

geneticScene07.update = function() {
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

geneticScene07.getNeighborhood = function(x, y) {
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
    neighborhood += upNeighborhood;
    let downNeighborhood = 0;
    downNeighborhood += this.getGridValue(left, down);
    downNeighborhood += this.getGridValue(x, down);
    downNeighborhood += this.getGridValue(right, down);
    neighborhood += downNeighborhood;
    let leftNeighborhood = 0;
    leftNeighborhood += this.getGridValue(left, up);
    leftNeighborhood += this.getGridValue(left, y);
    leftNeighborhood += this.getGridValue(left, down);
    neighborhood += leftNeighborhood;
    let rightNeighborhood = 0;
    rightNeighborhood += this.getGridValue(right, up);
    rightNeighborhood += this.getGridValue(right, y);
    rightNeighborhood += this.getGridValue(right, down);
    neighborhood += rightNeighborhood;
    return neighborhood;
};

geneticScene07.createRandomRules = function() {
    let b = this.geneticBase;
    let n = 8;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, n);
    rulesLength = 4;
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.floor(Math.random() * this.geneticBase);
    }
};

geneticScene07.createRandomSecondRules = function() {
    let b = 2;
    let n = 2;
    this.geneticSecondRules = "";
    let rulesLength = Math.pow(b, n);
    // rulesLength = 16;
    for (let i = 0; i < rulesLength; i++) {
        this.geneticSecondRules += Math.round(Math.random());
    }
};

geneticScene07.applySecondRules = function(s) {
    // This receives a number in base this.geneticBase, 
    // as a string, and returns a decimal number, as an integer.
    let b = 4;
    let ns = "";
    for (let i = s.length - 1; i >= 0; i--) {
        ns += s[i];
    }
    // console.log('ns : ' + ns);
    let decimal = 0;
    for (let i = 0; i <= ns.length - 1; i++) {
        decimal += parseInt(ns[i]) * Math.pow(b, i);
        // console.log(ns[i], parseInt(ns[i]) * Math.pow(b, i));
    }
    return this.geneticSecondRules[decimal];
};

geneticScene07.createRandomRules();
geneticScene07.createRandomSecondRules();
geneticScene07.lastRules = geneticScene07.geneticRules;

geneticScene07.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    if (this.grid[oneDValue].state == 0) {
        return color(0, 0, 0);
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    return color(red, green, blue);
};

geneticScene07.applyRules = function(n) {
    // This receives a neighbor n, that goes from 0 to this.geneticBase - 1 as a string.
    let g = this.geneticRules;
    let nn = "";
    let truth = 0;
    let test0 = (n[0] >= g[0]) ? true : false;
    if (test0) {
        truth++;
    }
    let test1 = (n[1] >= g[1]) ? true : false;
    if (test1) {
        truth++;
    }
    let test2 = (n[2] >= g[2]) ? true : false;
    if (test2) {
        truth++;
    }
    let test3 = (n[3] >= g[3]) ? true : false;
    if (test3) {
        truth++;
    }
    return (truth == 0 || truth == 2) ? 1 : 0;
};

geneticScene07.mutateSecondRules = function() {
    this.lastSecondRules = this.geneticSecondRules;
    let r = Math.floor(Math.random() * this.geneticSecondRules.length);
    for (let i = 0; i < this.geneticSecondRules.length; i++) {
        if (Math.random() < 0.25) {
            let newS = "";
            for (let t = 0; t < this.geneticSecondRules.length; t++) {
                if (t !== i) {
                    newS += this.geneticSecondRules[t];
                } else {
                    newS += Math.round(Math.random());
                }
            }
            this.geneticSecondRules = newS;
        }
    }
    this.applyShapes();
};
geneticScene07.applyPalette = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            let oneDValue;
            if (this.fixedGridSize) {
                oneDValue = (x + this.offset.x) + ((y + this.offset.y) * this.fixedGridSize.width);
            } else {
                oneDValue = x + (y * this.gridXAmount);
            }
            var value = this.grid[oneDValue].state;
            var change = this.changes[oneDValue];
            // if (change !== 0) {
            // if (value) {
            var light = this.getColor(oneDValue);
            fill(light);
            var tW = this.tileWidth;
            rect(x * tW, y * tW, tW, tW);
            // }
            // }
        }
    }
};
// "02213312"
// "03322312"
// "21023311"
// "23023311"
//------------------
// "13110013"
// "02022313"
// "1111"
// "1213"
// "1212"
// "1212"
// "2232"
// "2312"
// "1003"
// Fractal and space filling
// "3003"
// "3122"
// "3123"
// Fractal and space filling, perfect
// "3300"
scene = geneticScene06;