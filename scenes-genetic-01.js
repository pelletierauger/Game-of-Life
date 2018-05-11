let geneticScene01 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 0r, y: 100 },
    // fixedGridSize: { width: 1000, height: 1000 },
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


let lastRules = geneticScene01.geneticRules;

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

scene = geneticScene01;