//speedModulo 1 = 24fps, 2 = 12fps, 3 = 8 fps, 4 = 6 fps, 6 = 4fps, 8 = 3fps, 12 = 2fps

//dotPerTile chart :
// gridScalar   : dotPerTile
// 4            : 3500 / 1
// 8            : 3500 / 4
// 16           : 3500 / 16
// 32           : 3500 / 64
// 64           : 3500 / 256    

let firstScene = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 16,
    paletteName: "palette-mon-dec-11-2017-211401",
    speedModulo: 3,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});

firstScene.applyShapes = function() {
    // let wX = 30;
    // let wY = 10;
    // let x = this.gridXAmount / 2;
    // let y = wY;
    // for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
    //     this.setGridValue(x, y, 1);
    //     y++;
    // }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
};

let secondScene = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridSeedName: "gridseed-fri-dec-15-2017-175306",
    paletteName: "palette-mon-dec-11-2017-211401",
    speedModulo: 3,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});

//----------scene002d----------------------------------------------//

let scene002d = new Scene({
    fileName: "./frames/scene002d-tests/game-of-life",
    gridScalar: 8,
    paletteName: "red-blue-pink",
    speedModulo: 6,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});

scene002d.applyShapes = function() {
    let wX = 30;
    let wY = 10;
    let x = wX;
    // let y = wY + (this.gridYAmount - wY * 2) - 1;
    let y = this.gridYAmount / 2;
    for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
        this.setGridValue(x, y, 1);
        x++;
    }
};

scene002d.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 4 || neighbors <= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 2) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----------bigFractal----------------------------------------------//

let bigFractal = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 16,
    paletteName: "red-blue-pink",
    speedModulo: 3,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});

bigFractal.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
};

bigFractal.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3 || neighbors <= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----------scene001----------------------------------------------//

let scene001 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "red-blue-pink",
    speedModulo: 3,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});

scene001.applyShapes = function() {
    let wX = 30;
    let wY = 10;
    let x = wX;
    // let x = gridXAmount / 2;
    let y = wY;
    for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
        this.setGridValue(x, y, 1);
        y++;
    }
    y = wY;
    x = this.gridXAmount - wX;
    for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
        this.setGridValue(x, y, 1);
        y++;
    }
    x = wX;
    y = wY;
    for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
        this.setGridValue(x, y, 1);
        x++;
    }
    x = wX;
    y = wY + (this.gridYAmount - wY * 2) - 1;
    // y = gridYAmount / 2;
    for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
        this.setGridValue(x, y, 1);
        x++;
    }
};

scene001.updateGrid = scene002d.updateGrid;

//----------biggerFractal----------------------------------------------//

let biggerFractal = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 16,
    paletteName: "red-blue-pink",
    speedModulo: 3,
    zoom: 2,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});

biggerFractal.applyShapes = bigFractal.applyShapes;
biggerFractal.updateGrid = bigFractal.updateGrid;

//----------otherFractal----------------------------------------------//

let otherFractal = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridSeedName: "gridseed-sat-dec-16-2017-012528",
    paletteName: "palette-sat-dec-16-2017-015606",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});
otherFractal.updateGrid = scene002d.updateGrid;

//----------gameOfLife----------------------------------------------//

let gameOfLife = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 4,
    paletteName: "palette-sat-dec-16-2017-015606",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 1,
    maxFrames: 40
});
gameOfLife.applyShapes = function() {
    let wX = 4;
    let wY = 4;
    let x = wX;
    // let x = gridXAmount / 2;
    let y = wY;
    for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
        this.setGridValue(x, y, 1);
        y++;
    }
    y = wY;
    x = this.gridXAmount - wX;
    for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
        this.setGridValue(x, y, 1);
        y++;
    }
    x = wX;
    y = wY;
    for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
        this.setGridValue(x, y, 1);
        x++;
    }
    x = wX;
    y = wY + (this.gridYAmount - wY * 2) - 1;
    // y = gridYAmount / 2;
    for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
        this.setGridValue(x, y, 1);
        x++;
    }
};
gameOfLife.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 4 || neighbors <= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


//----------gameOfLife----------------------------------------------//

let gameOfLifeAlt = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 16,
    paletteName: "palette-sat-dec-16-2017-015606",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});
gameOfLifeAlt.applyShapes = function() {
    // let wX = 60;
    // let wY = 60;
    // let x = wX;
    // // let x = gridXAmount / 2;
    // let y = wY;
    // for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
    //     this.setGridValue(x, y, 1);
    //     y++;
    // }
    // y = wY;
    // x = this.gridXAmount - wX;
    // for (let i = 0; i < this.gridYAmount - wY * 2; i++) {
    //     this.setGridValue(x, y, 1);
    //     y++;
    // }
    // x = wX;
    // y = wY;
    // for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
    //     this.setGridValue(x, y, 1);
    //     x++;
    // }
    // x = wX;
    // y = wY + (this.gridYAmount - wY * 2) - 1;
    // // y = gridYAmount / 2;
    // for (let i = 0; i < this.gridXAmount - wX * 2; i++) {
    //     this.setGridValue(x, y, 1);
    //     x++;
    // }
};
gameOfLifeAlt.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 6 || neighbors <= 1 || neighbors == 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 5 || neighbors == 2) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----

let gridUponGrid = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-003351",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
gridUponGrid.applyShapes = function() {
    let xSections = 2;
    let ySections = 2;
    let xOffset = 50;
    let yOffset = 50;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x - 1), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
gridUponGrid.updateGrid = bigFractal.updateGrid;

//----

let gridUponGrid2 = new Scene({
    fileName: "./frames/grid-upon-grid-2/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-023411",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
gridUponGrid2.applyShapes = function() {
    let xSections = 3;
    let ySections = 2;
    let xOffset = 30;
    let yOffset = 30;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
gridUponGrid2.updateGrid = bigFractal.updateGrid;

//----

let gridUponGrid3 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-023411",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
gridUponGrid3.applyShapes = function() {
    let xSections = 1;
    let ySections = 1;
    let xOffset = this.gridXAmount / 2;
    let yOffset = this.gridYAmount / 2;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
gridUponGrid3.updateGrid = bigFractal.updateGrid;
gridUponGrid3.update = function() {
    if (this.currentState % 4 !== 0) {
        this.updateGrid = gameOfLife.updateGrid;
    } else {
        this.updateGrid = scene002d.updateGrid;
    }
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

//----

let gridUponGrid4 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-023411",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
gridUponGrid4.applyShapes = function() {
    let xSections = 10;
    let ySections = 5;
    let xOffset = 20;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
gridUponGrid4.updateGrid = bigFractal.updateGrid;
gridUponGrid4.update = function() {
    if (this.currentState % 4 !== 0) {
        this.updateGrid = gameOfLife.updateGrid;
    } else {
        this.updateGrid = scene002d.updateGrid;
    }
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

//----

let newFractalExperiment = new Scene({
    fileName: "./frames/newFractalExperiment/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-023411",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
newFractalExperiment.applyShapes = function() {
    let xSections = 5;
    let ySections = 5;
    let xOffset = 20;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
newFractalExperiment.updateGrid = function() {
    // if (this.currentState % (10) == 0) {
    //     console.log("Inserted random!");
    //     var randomX = random(0, this.gridXAmount);
    //     var randomY = random(0, this.gridYAmount);
    //     let oneDValue = randomX + (randomY * this.gridXAmount);
    //     this.grid[oneDValue] = { state: 1, changed: false };
    //     // this.incrementChanges(randomX, randomY);
    // }
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            let oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                this.setNextValue(x - 2, y, { state: 1, changed: true });
                this.setNextValue(x, y - 2, { state: 1, changed: true });
                this.setNextValue(x + 2, y, { state: 1, changed: true });
                this.setNextValue(x, y + 2, { state: 1, changed: true });
                this.next[oneDValue] = { state: 0, changed: true };
                // if (neighbors >= 6 || neighbors <= 1 || neighbors == 2) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     
                //     
                // }
                changed = true;
                this.incrementChanges(x, y);
            } else {
                // if (neighbors == 5 || neighbors == 2) {
                //     this.next[oneDValue] = { state: 1, changed: true };
                //     changed = true;
                //     this.incrementChanges(x, y);
                // }
            }
            if (!changed && !this.next[oneDValue].changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----

let newFractalExperiment2 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-023411",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
newFractalExperiment2.applyShapes = function() {
    let xSections = 1;
    let ySections = 1;
    let xOffset = this.gridXAmount / 2;
    let yOffset = this.gridYAmount / 2;
    // xOffset = 20;
    // yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
newFractalExperiment2.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {

                if (neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                } else if (neighbors == 1 || neighbors == 3) {
                    //Do nothing
                } else if (neighbors == 2 ||  neighbors >= 4) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed && !this.next[oneDValue].changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----

let newFractalExperiment3 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-171422",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
newFractalExperiment3.applyShapes = function() {
    let xSections = 1;
    let ySections = 1;
    let xOffset = this.gridXAmount / 2;
    let yOffset = this.gridYAmount / 2;
    // xOffset = 20;
    // yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
newFractalExperiment3.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                } else if (neighbors == 1 || neighbors == 4) {
                    // Do nothing
                } else if (neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed && !this.next[oneDValue].changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----

let newFractalExperiment4 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 16,
    paletteName: "palette-mon-dec-18-2017-173007",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});
newFractalExperiment4.applyShapes = function() {
    let xSections = 10;
    let ySections = 5;
    let xOffset = this.gridXAmount / 2;
    let yOffset = this.gridYAmount / 2;
    xOffset = 20;
    yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
newFractalExperiment4.updateGrid = function() {
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                } else if (neighbors == 1 || neighbors == 4) {
                    // Do nothing
                } else if (neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed && !this.next[oneDValue].changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};
//----

let newFractalExperiment5 = new Scene({
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "palette-mon-dec-18-2017-171422",
    speedModulo: 3,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxFrames: 40
});
newFractalExperiment5.applyShapes = function() {
    let xSections = 10;
    let ySections = 5;
    let xOffset = 0;
    let yOffset = this.gridYAmount / 2;
    xOffset = 20;
    yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset;
    let y = yOffset;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x - 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y - 1), 1);
            // this.setGridValue(Math.floor(x + 1), Math.floor(y), 1);
            // this.setGridValue(Math.floor(x), Math.floor(y + 1), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset;
    }
};
newFractalExperiment5.updateGrid = function() {
    let n = this.currentState;
    for (var x = 0; x < this.gridXAmount; x++) {
        for (var y = 0; y < this.gridYAmount; y++) {
            var oneDValue = x + (y * this.gridXAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            let tl = this.getGridValue(x - 1, y - 1);
            let t = this.getGridValue(x, y - 1);
            let tr = this.getGridValue(x + 1, y - 1);
            let l = this.getGridValue(x - 1, y);
            let r = this.getGridValue(x + 1, y);
            let bl = this.getGridValue(x - 1, y + 1);
            let b = this.getGridValue(x, y + 1);
            let br = this.getGridValue(x + 1, y + 1);
            if (value == 1) {
                if ((tl && br)) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if ((tl || bl) || (bl && tr)) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

let hugeFractal = new Scene({
    fileName: "./frames/huge-fractal-square/huge-fractal",
    gridScalar: 8,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxSteps: 129
});

hugeFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    console.log(`gridXAmount: ${this.gridXAmount}, gridYAmount: ${this.gridYAmount}`);
    let x = 500 + (this.gridXAmount / 2);
    let y = 500 + (this.gridYAmount / 2);
    console.log(`x: ${x}, y: ${y}`);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

hugeFractal.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3 || neighbors <= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

let biggestFractal = new Scene({
    fileName: "./frames/biggest-fractal-square/biggest-fractal",
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxFrames: 40
});

biggestFractal.applyShapes = hugeFractal.applyShapes;
biggestFractal.updateGrid = hugeFractal.updateGrid;

let ultimateFractal = new Scene({
    fileName: "./frames/ultimate-fractal-square/ultimate-fractal",
    gridScalar: 32,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1500, height: 1500 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxFrames: 40
});

ultimateFractal.applyShapes = hugeFractal.applyShapes;
ultimateFractal.updateGrid = hugeFractal.updateGrid;

let moreUltimateFractal = new Scene({
    fileName: "./frames/ultimate-fractal-2/ultimate-fractal",
    gridScalar: 64,
    offset: { x: 1000, y: 1000 },
    fixedGridSize: { width: 2000, height: 2000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 256,
    maxFrames: 40
});

moreUltimateFractal.applyShapes = function() {
    this.setGridValue(1000 + (this.gridXAmount / 2), 1000 + (this.gridYAmount / 2), 1);
};
moreUltimateFractal.updateGrid = hugeFractal.updateGrid;

//----Before the River---//

let beforeTheRiverFractal = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 8,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-mon-dec-11-2017-211401",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxSteps: 129
});

beforeTheRiverFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);
    let xSections = 4;
    let ySections = 2;
    let xOffset = 20;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset + this.offset.x;
    let y = yOffset + this.offset.y;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset + this.offset.y;
    }

};
beforeTheRiverFractal.updateGrid = hugeFractal.updateGrid;

//----Before the River-2--//

let beforeTheRiverFractal2 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 8,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-mon-dec-11-2017-211401",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxSteps: 129
});

beforeTheRiverFractal2.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);
    let xSections = 3;
    let ySections = 2;
    let xOffset = 20;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset + this.offset.x;
    let y = yOffset + this.offset.y;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset + this.offset.y;
    }

};
beforeTheRiverFractal2.updateGrid = hugeFractal.updateGrid;

//----Before the River-3--//

let beforeTheRiverFractal3 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-mon-dec-11-2017-211401",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);
    let xSections = 3;
    let ySections = 2;
    let xOffset = 40;
    let yOffset = 40;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset + this.offset.x;
    let y = yOffset + this.offset.y;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset + this.offset.y;
    }

};
beforeTheRiverFractal3.updateGrid = hugeFractal.updateGrid;

//----Before the River-4--//

let beforeTheRiverFractal4 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-sun-dec-24-2017-003950",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);
    let xSections = 4;
    let ySections = 4;
    let xOffset = 40;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset + this.offset.x;
    let y = yOffset + this.offset.y;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset + this.offset.y;
    }

};
beforeTheRiverFractal4.updateGrid = hugeFractal.updateGrid;

//----Before the River-5--//

let beforeTheRiverFractal5 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-sun-dec-24-2017-003950",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);
    let xSections = 3;
    let ySections = 3;
    let xOffset = 40;
    let yOffset = 20;
    let xSize = (this.gridXAmount - (xOffset * 2)) / (xSections - 1);
    let ySize = (this.gridYAmount - (yOffset * 2)) / (ySections - 1);
    // console.log(`xSize : ${xSize}, ySize: ${ySize}`);
    let x = xOffset + this.offset.x;
    let y = yOffset + this.offset.y;
    // this.setGridValue(x, y, 1);
    for (let i = 0; i < xSections; i++) {
        for (let j = 0; j < ySections; j++) {
            this.setGridValue(Math.floor(x), Math.floor(y), 1);
            y += ySize;

        }
        x += xSize;
        y = yOffset + this.offset.y;
    }

};
beforeTheRiverFractal5.updateGrid = hugeFractal.updateGrid;

//-----//
let beforeTheRiverFractal6 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 8,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 4,
    maxSteps: 129
});

beforeTheRiverFractal6.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

beforeTheRiverFractal6.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 8 || neighbors <= 6) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors <= 4 && neighbors > 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

beforeTheRiverFractal6.calculateNeighbors = function(x, y) {
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


//-----//
let beforeTheRiverFractal7 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal7.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

beforeTheRiverFractal7.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 7) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            } else {
                if (neighbors <= 1 && neighbors > 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

beforeTheRiverFractal7.calculateNeighbors = function(x, y) {
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
beforeTheRiverFractal7.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
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

//-----//
let beforeTheRiverFractal8 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal8.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

beforeTheRiverFractal8.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 8) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            } else {
                if (neighbors <= 2 && neighbors > 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

beforeTheRiverFractal8.calculateNeighbors = function(x, y) {
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
beforeTheRiverFractal8.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
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

//-----//
let beforeTheRiverFractal9 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal9.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

beforeTheRiverFractal9.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 6) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            } else {
                if (neighbors <= 2 && neighbors > 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

beforeTheRiverFractal9.calculateNeighbors = function(x, y) {
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
beforeTheRiverFractal9.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
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

//-----//
let beforeTheRiverFractal10 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

beforeTheRiverFractal10.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

beforeTheRiverFractal10.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (this.currentState % 2 == 0) {
                if (value == 1) {
                    if (neighbors == 8) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                    }
                } else {
                    if (neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                    }
                }
            } else {
                if (value == 1) {
                    if (neighbors == 8 ||  neighbors >= 5) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                    }
                } else {
                    if (neighbors >= 3) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                    }
                }
            }

            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

beforeTheRiverFractal10.calculateNeighbors = function(x, y) {
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
beforeTheRiverFractal10.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
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

//----//

let littleFractal = new Scene({
    fileName: "./frames/little-fractal-square/little-fractal",
    gridScalar: 4,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 * 1,
    maxSteps: 129
});

littleFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    console.log(`gridXAmount: ${this.gridXAmount}, gridYAmount: ${this.gridYAmount}`);
    let x = 500 + (this.gridXAmount / 2);
    let y = 500 + (this.gridYAmount / 2);
    console.log(`x: ${x}, y: ${y}`);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

littleFractal.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3 || neighbors <= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//----//

let middleFractal = new Scene({
    fileName: "./frames/middle-fractal-square/middle-fractal",
    gridScalar: 12,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 8,
    maxSteps: 129
});

middleFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    console.log(`gridXAmount: ${this.gridXAmount}, gridYAmount: ${this.gridYAmount}`);
    let x = 500 + (this.gridXAmount / 2);
    let y = 500 + (this.gridYAmount / 2);
    console.log(`x: ${x}, y: ${y}`);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

middleFractal.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3 || neighbors <= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let microFractal = new Scene({
    fileName: "./frames/middle-fractal-square/middle-fractal",
    gridScalar: 2,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 8,
    maxSteps: 129
});

middleFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    console.log(`gridXAmount: ${this.gridXAmount}, gridYAmount: ${this.gridYAmount}`);
    let x = 500 + (this.gridXAmount / 2);
    let y = 500 + (this.gridYAmount / 2);
    console.log(`x: ${x}, y: ${y}`);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

middleFractal.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3 || neighbors <= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

//-----//
let bigRiver = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 32,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxSteps: 129
});

bigRiver.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            } else {
                if (neighbors == 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver.calculateNeighbors = function(x, y) {
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
bigRiver.update = function() {
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

//-----//
let bigRiver2 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver2.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver2.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 2 && scene.currentState % 2 !== 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            } else {
                if (neighbors == 1 && scene.currentState % 2 == 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver2.calculateNeighbors = function(x, y) {
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
bigRiver2.update = function() {
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


//-----//
let bigRiver3 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-thu-dec-28-2017-025052",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver3.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 4 && scene.currentState % 4 == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            } else {
                if (neighbors == 1 && scene.currentState % 2 == 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver3.calculateNeighbors = function(x, y) {
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
bigRiver3.update = function() {
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

//-----//
let bigRiver4 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "palette-thu-dec-28-2017-025052",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver4.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 6 && scene.currentState % 2 == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            } else {
                if (neighbors == 1 && scene.currentState % 2 !== 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver4.calculateNeighbors = function(x, y) {
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
bigRiver4.update = function() {
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

//-----//
let bigRiver5 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-172555",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver5.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if (neighborsRight == 2 && neighborsLeft == 2) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 2 && neighborsBottom == 2) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                }
            } else {
                if (scene.currentState % 2 == 0) {
                    if (neighborsRight == 1 && neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 1 && neighborsBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver5.calculateNeighbors = function(x, y) {
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
bigRiver5.update = function() {
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
bigRiver5.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let bigRiver6 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // palette-sun-dec-24-2017-135502
    // palette-sun-dec-24-2017-023644
    paletteName: "palette-sun-dec-24-2017-135502",
    speedModulo: 1,
    // animatedColors: true,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver6.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver6.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if (neighborsRight == 3 && neighborsLeft == 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 5;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 3 && neighborsBottom == 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 5;
                        changed = true;
                    }
                }
            } else {
                if (scene.currentState % 2 == 0) {
                    if (neighborsRight == 1 && neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 5;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 1 && neighborsBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 5;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver6.calculateNeighbors = function(x, y) {
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
bigRiver6.update = function() {

    //An interesting experimental way to animate colors :
    // this.changes = this.changes.map(x => x + 1);


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

//-----//
let bigRiver7 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    paletteName: "palette-fri-dec-15-2017-185009",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver7.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver7.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if ((neighborsRight == 3 && neighborsLeft == 3)) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 2 && neighborsBottom == 2) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                }
            } else {
                if (scene.currentState % 2 == 0) {
                    if (neighborsLeft == 1 && neighborsRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 1 && neighborsBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState / 10;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver7.calculateNeighbors = function(x, y) {
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
bigRiver7.update = function() {
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


//-----//
let bigRiver8 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    paletteName: "palette-fri-dec-15-2017-185009",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver8.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver8.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 4 == 0) {
                    if ((neighborsRight == 2 && neighborsLeft == 2)) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 3 && neighborsBottom == 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                }
            } else {
                if (scene.currentState % 4 == 0) {
                    if (neighborsLeft == 1 && neighborsRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 1 && neighborsBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver8.calculateNeighbors = function(x, y) {
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
bigRiver8.update = function() {
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

//-----//
let bigRiver9 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    paletteName: "palette-fri-dec-15-2017-185009",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver9.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver9.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if ((neighborsRight == 3 && neighborsLeft == 3)) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 3 && neighborsBottom == 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                }
            } else {
                if (scene.currentState % 2 !== 0) {
                    if (neighborsLeft == 1 && neighborsRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                } else {
                    if (neighborsTop == 1 && neighborsBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver9.calculateNeighbors = function(x, y) {
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
bigRiver9.update = function() {
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


//-----//
let bigRiver10 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 16,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
    paletteName: "red-blue-pink",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

bigRiver10.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(500 + (this.gridXAmount / 2), 500 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

bigRiver10.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 7) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            } else {
                if (neighbors <= 1 && neighbors > 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    // this.incrementChanges(x, y);
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

bigRiver10.calculateNeighbors = function(x, y) {
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
bigRiver10.update = function() {
    // this.palette.data.redOsc *= 0.9;
    // this.palette.data.greenOsc *= 0.9;
    // this.palette.data.blueOsc *= 0.9;
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

bigRiver10.getColor = function(oneDValue, optionalArray) {
    let da = 0;
    let mi = 0;
    let li = 150;
    let st = 50;
    let en = 135;
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }

    let q = {
        name: "palette-fri-dec-29-2017-024251",
        redOsc: 6,
        redMin: 213,
        redMax: 162,
        greenOsc: 1,
        greenMin: 82,
        greenMax: 154,
        blueOsc: 3,
        blueMin: 27,
        blueMax: 132
    };

    let red0 = map(sin(c / q.redOsc), -1, 1, q.redMin, q.redMax);
    let green0 = map(sin(c / q.greenOsc), -1, 1, q.greenMin, q.greenMax);
    let blue0 = map(sin(c / q.blueOsc), 1, -1, q.blueMin, q.blueMax);
    let a = adjustLevels(da, mi, li, { r: red0, g: green0, b: blue0 });


    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let adjusted = adjustLevels(da, mi, li, { r: red, g: green, b: blue });

    adjusted = { r: (adjusted.r + a.r) / 2, g: (adjusted.g + a.g) / 2, b: (adjusted.b + a.b) / 2 };
    let fade = map(c, st, en, 0, 1);
    fade = constrain(fade, 0, 1);
    let redFade = 0;
    let greenFade = 0;
    let blueFade = 50;
    let redLerp = lerp(adjusted.r, redFade, fade);
    let greenLerp = lerp(adjusted.g, greenFade, fade);
    let blueLerp = lerp(adjusted.b, blueFade, fade);
    return color(redLerp, greenLerp, blueLerp);
};

//-----//
let innerJanuary = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-172555",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

innerJanuary.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if (neighborsRight == 1 || neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue]++;
                    changed = true;
                }
            } else {
                if (scene.currentState % 4 == 0) {
                    if (neighborsRight == 1 || neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    if (neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary.calculateNeighbors = function(x, y) {
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
innerJanuary.update = function() {
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
innerJanuary.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-----//
let innerJanuary2 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-172555",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary2.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

innerJanuary2.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 16 == 0) {
                    if (neighborsRight == 1 || neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue]++;
                    changed = true;
                }
            } else {
                if (scene.currentState % 16 == 0) {
                    if (neighborsRight == 1 && neighborsLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    if (neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary2.calculateNeighbors = function(x, y) {
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
innerJanuary2.update = function() {
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
innerJanuary2.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary3 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-172555",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

innerJanuary3.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborsTop = this.calculateNeighbors(x, y - 1);
            var neighborsBottom = this.calculateNeighbors(x, y + 1);
            var neighborsLeft = this.calculateNeighbors(x - 1, y);
            var neighborsRight = this.calculateNeighbors(x + 1, y);
            let changed = false;
            if (value == 1) {
                if (scene.currentState % 2 == 0) {
                    if (neighbors >= 2) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue]++;
                    changed = true;
                }
            } else {
                if (scene.currentState % 2 == 0) {
                    if (neighbors >= 2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                } else {
                    if (neighbors == 1 || neighbors == 2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue]++;
                        changed = true;
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary3.calculateNeighbors = function(x, y) {
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
innerJanuary3.update = function() {
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
innerJanuary3.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary4 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

let januaryCounter = 0;

innerJanuary4.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            let changed = false;
            if (value == 1) {
                this.next[oneDValue] = { state: 0, changed: true };
                this.changes[oneDValue] += 5;
                changed = true;
            } else {
                if (januaryCounter == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter++;
                    }

                } else if (januaryCounter == 1) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter++;
                    }

                } else if (januaryCounter == 2) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter++;
                    }

                } else if (januaryCounter == 3) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter = 0;
                    }

                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary4.calculateNeighbors = function(x, y) {
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
innerJanuary4.update = function() {
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
innerJanuary4.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-----//
let innerJanuary5 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary5.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }

            } else {
                let increment = 0.2;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary5.calculateNeighbors = function(x, y) {
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
innerJanuary5.update = function() {
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
innerJanuary5.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};



//-----//
let innerJanuary6 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary6.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary6.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }

            } else {

                let increment = 0.2;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary6.calculateNeighbors = function(x, y) {
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
innerJanuary6.update = function() {
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
innerJanuary6.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-----//
let innerJanuary7 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 32,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxSteps: 129
});

innerJanuary7.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary7.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }


            } else {

                let increment = 0.15;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1 && neighbors == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary7.calculateNeighbors = function(x, y) {
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
innerJanuary7.update = function() {
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
innerJanuary7.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-----//
let innerJanuary8 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 32,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxSteps: 129
});

innerJanuary8.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary8.updateGrid = function() {
    console.log(januaryCounter);
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {

                let increment = 0.15;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.1;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary8.calculateNeighbors = function(x, y) {
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
innerJanuary8.update = function() {
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
innerJanuary8.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(red, green, blue);
};

//-----//
let innerJanuary9 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary9.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary9.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {
                let changeIncrement = 0.1;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary9.calculateNeighbors = function(x, y) {
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
innerJanuary9.update = function() {
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
innerJanuary9.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-----//
let innerJanuary10 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary10.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary10.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 2 == 0) {
                    if (neighbors >= 2) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {
                let changeIncrement = 0.1;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary10.calculateNeighbors = function(x, y) {
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
innerJanuary10.update = function() {
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
innerJanuary10.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary11 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary11.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 3) * 2, 0 + (this.gridYAmount / 4), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary11.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 2 == 0) {
                    if (neighbors >= 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary11.calculateNeighbors = function(x, y) {
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
innerJanuary11.update = function() {
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
innerJanuary11.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary12 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-thu-jan-11-2018-190338",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary12.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 3) * 2, 0 + (this.gridYAmount / 4), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary12.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 3 == 0) {
                    if (neighbors >= 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.1;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary12.calculateNeighbors = function(x, y) {
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
innerJanuary12.update = function() {
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
innerJanuary12.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary13 = new Scene({
    fileName: "./frames/huge-fractal/huge-fractal",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-fri-jan-12-2018-034139",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary13.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 4) * 3, 0 + (this.gridYAmount / 5), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary13.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 3 == 0) {
                    if (neighbors >= 3) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                    }
                } else {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary13.calculateNeighbors = function(x, y) {
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
innerJanuary13.update = function() {
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
innerJanuary13.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----//
let innerJanuary14 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    paletteName: "palette-sat-dec-16-2017-010605",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

innerJanuary14.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    let padding = 50;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
    this.setGridValue(0 + (this.gridXAmount / 5) * 4, 0 + (this.gridYAmount / 5), 1);
    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);
    // this.setGridValue(501, 501, 1);

};

januaryCounter = 0;

innerJanuary14.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 2 == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                } else {
                    if (neighbors == 3 ||  neighbors == 1) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 5;
                        changed = true;
                    }

                }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

innerJanuary14.calculateNeighbors = function(x, y) {
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
innerJanuary14.update = function() {
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
innerJanuary14.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",
    paletteName: "palette-sun-mar-04-2018-034653",
    // paletteName: "palette-sun-mar-04-2018-154033",


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);

    //Very good one
    // let padding = 100;
    // let y = this.gridYAmount / 2;
    // for (let x = padding; x < this.gridXAmount - padding; x++) {
    //     for (let yD = -3; yD < 6; yD++) {
    //         this.setGridValue(x, y + yD, 1);
    //     }
    // }

    // let padding = 120;
    // let y = this.gridYAmount / 2;
    // for (let x = padding; x < this.gridXAmount - padding; x++) {
    //     for (let yD = -3; yD < 6; yD++) {
    //         this.setGridValue(x, y + yD, 1);

    //         this.setGridValue(0, y + yD, 1);

    //         this.setGridValue(this.gridXAmount - 6, y + yD, 1);
    //     }
    // }

    // for (let i = 0; i < 20; i++) {
    //     let x = floor(random(this.gridXAmount / 2));
    //     let y = floor(random(this.gridYAmount));
    //     this.setGridValue(x, y, 1);
    // }

    //------------------Intéressant
    // for (let i = 0; i < 100; i++) {
    //     let x = floor(random(this.gridXAmount / 4));
    //     let y = floor(random(this.gridYAmount));
    //     this.setGridValue(x, y, 1);
    // }
    // let padding = 0;
    // let y = this.gridYAmount / 2;
    // for (let x = padding; x < this.gridXAmount - padding; x++) {
    //     // for (let yD = -3; yD < 6; yD++) {
    //     this.setGridValue(x, y, 1);
    //     // }
    // }




    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        this.setGridValue(x, 0, 1);
        this.setGridValue(x, this.gridYAmount - 1, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        this.setGridValue(0, y, 1);
        this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }




    // let padding = 20;
    // let y = this.gridYAmount / 2;
    // for (let x = padding; x < this.gridXAmount - padding * 2; x++) {
    //     // for (let yD = -3; yD < 6; yD++) {
    //     this.setGridValue(x + padding, 0, 1);
    //     this.setGridValue(x + padding, this.gridYAmount - 1, 1);
    //     // }
    // }

    // padding = 50;
    // // let y = this.gridYAmount / 2;
    // for (let y = padding; y < this.gridYAmount - padding; y++) {
    //     // for (let yD = -3; yD < 6; yD++) {
    //     this.setGridValue(0, y, 1);
    //     this.setGridValue(this.gridXAmount - 1, y, 1);
    //     // }
    // }
    // padding = 100;
    // y = this.gridYAmount / 4 * 3;
    // for (let x = padding; x < this.gridXAmount - padding; x++) {
    //     this.setGridValue(x, y, 1);
    // }
    // y = this.gridYAmount / 4;
    // for (let x = padding; x < this.gridXAmount - padding; x++) {
    //     this.setGridValue(x, y, 1);
    // }
    // this.setGridValue(0 + (this.gridXAmount / 5) * 4, 0 + (this.gridYAmount / 5), 1);




    // for (let i = 0; i < 100; i++) {
    //     let x = floor(random(this.gridXAmount));
    //     let y = floor(random(this.gridYAmount / 20 * 19, this.gridYAmount));
    //     this.setGridValue(x, y, 1);
    // }
    // for (let i = 0; i < 100; i++) {
    //     let x = floor(random(this.gridXAmount));
    //     let y = floor(random(this.gridYAmount / 20));
    //     this.setGridValue(x, y, 1);
    // }




    // this.setGridValue(1 + (this.gridXAmount / 2), 0 + (this.gridYAmount / 2), 1);

};

nightsOfMarch.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     if (neighbors == 6) {
                //         this.next[oneDValue] = { state: 0, changed: true };
                //         this.changes[oneDValue] += 5;
                //         changed = true;
                //     }
                // } else {
                if (neighbors == 4) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // 
                // }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1 && this.currentState % 2 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch.calculateNeighbors = function(x, y) {
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
nightsOfMarch.update = function() {
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
nightsOfMarch.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch2 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",
    paletteName: "palette-sun-mar-04-2018-034653",
    // paletteName: "palette-sun-mar-04-2018-154033",


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch2.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
};

nightsOfMarch2.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.getGridValue(x - 1, y - 1);
            var neighborTop = this.getGridValue(x, y - 1);
            var neighborTopRight = this.getGridValue(x + 1, y - 1);
            var neighborRight = this.getGridValue(x + 1, y);
            var neighborBottomRight = this.getGridValue(x + 1, y + 1);
            var neighborBottom = this.getGridValue(x, y + 1);
            var neighborBottomLeft = this.getGridValue(x - 1, y + 1);
            var neighborLeft = this.getGridValue(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (this.currentState % 2 == 0) {
                    // if (neighbors >= 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 5;
                    changed = true;
                    // }
                } else {
                    if (neighbors >= 1) {
                        this.next[oneDValue] = { state: 0, changed: true };
                        this.changes[oneDValue] += 1;
                        changed = true;
                    }
                    // 
                }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.05;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == 1 && this.currentState % 1 == 0) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] += changeIncrement;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch2.calculateNeighbors = function(x, y) {
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
nightsOfMarch2.update = function() {
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
nightsOfMarch2.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


//-------------
let nightsOfMarch3 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",
    paletteName: "palette-sun-mar-04-2018-034653",
    // paletteName: "palette-sun-mar-04-2018-154033",


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0, 0, 1);

};

nightsOfMarch3.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2) {
                    console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.00001;
                let neighborValue = 1;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop <= neighborValue && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight <= neighborValue && neighborTopRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight <= neighborValue && neighborRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight <= neighborValue && neighborBottomRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom <= neighborValue && neighborBottom) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft <= neighborValue && neighborBottomLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft <= neighborValue && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch3.calculateNeighbors = function(x, y) {
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
nightsOfMarch3.update = function() {
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
nightsOfMarch3.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch4 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",


    // paletteName: "palette-sun-mar-04-2018-034653",
    paletteName: "palette-sun-mar-04-2018-045707",

    // paletteName: "palette-sun-mar-04-2018-154033",


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0, 0, 1);

};

nightsOfMarch4.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 2 || neighbors == 3) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let changeIncrement = 0.5;
                let increment = 0.00001;
                let neighborValue = 2;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop <= neighborValue && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight <= neighborValue && neighborTopRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight <= neighborValue && neighborRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight <= neighborValue && neighborBottomRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom <= neighborValue && neighborBottom) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft <= neighborValue && neighborBottomLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft <= neighborValue && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch4.calculateNeighbors = function(x, y) {
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
nightsOfMarch4.update = function() {
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
nightsOfMarch4.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch5 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",




    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch5.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 1;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop <= neighborValue && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight <= neighborValue && neighborTopRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight <= neighborValue && neighborRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight <= neighborValue && neighborBottomRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom <= neighborValue && neighborBottom) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft <= neighborValue && neighborBottomLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft <= neighborValue && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch5.calculateNeighbors = function(x, y) {
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
nightsOfMarch5.update = function() {
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
nightsOfMarch5.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch6 = new Scene({
    fileName: "./frames/nights-of-march-6/nights-of-march-6",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",


    // paletteName: "palette-sat-dec-16-2017-150022",
    paletteName: "palette-sat-mar-17-2018-062204",

    // paletteName: "palette-sun-mar-04-2018-154033",


    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch6.applyShapes = function() {
    this.setGridValue(this.gridXAmount - 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);

    // let padding = 50;
    let y = this.gridYAmount - 1;
    for (let x = 0; x < this.gridXAmount; x++) {
        // this.setGridValue(x, y, 1);
        // this.setGridValue(x, y - 1, 1);
        // this.setGridValue(x, y - 1, 1);

        // this.setGridValue(x, y + 1, 1);
    }
};

nightsOfMarch6.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors <= 3 && neighbors) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 3;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let neighborValue2 = 2;
                let stateScalar = 0.5;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft == neighborValue || neighborTopLeft == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop == neighborValue || neighborTop == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight == neighborValue || neighborTopRight == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight == neighborValue || neighborRight == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight == neighborValue || neighborBottomRight == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom == neighborValue || neighborBottom == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft == neighborValue || neighborBottomLeft == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft == neighborValue || neighborLeft == neighborValue2) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch6.calculateNeighbors = function(x, y) {
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
nightsOfMarch6.update = function() {
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
nightsOfMarch6.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};



let nightsOfMarch7 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 32,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    paletteName: "palette-sat-mar-17-2018-180634",




    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxSteps: 129
});

nightsOfMarch7.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    this.setGridValue(0, 0, 1);

};

nightsOfMarch7.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var chosenNeighbor = this.calculateNeighbors(x - 2, y - 2);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = (this.currentState % 2 == 0) ? 7 : 3;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.25;
                if (chosenNeighbor == neighborValue && chosenNeighbor) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState;
                    changed = true;
                    januaryCounter += increment;
                    if (januaryCounter >= 8) {
                        januaryCounter = 0;
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch7.calculateNeighbors = function(x, y) {
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
nightsOfMarch7.update = function() {
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
nightsOfMarch7.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----------

let nightsOfMarch8 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 32,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-180634",
    paletteName: "palette-sat-mar-17-2018-183102",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 64,
    maxSteps: 129
});

nightsOfMarch8.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch8.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var chosenNeighbor = this.calculateNeighbors(x - 1, y);
            var chosenNeighbor2 = this.calculateNeighbors(x + 1, y);
            var chosenNeighbor3 = this.calculateNeighbors(x, y - 1);
            var chosenNeighbor4 = this.calculateNeighbors(x, y + 1);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                // if (chosenNeighbor3 == 1 && chosenNeighbor4 == 1) {
                // console.log("YEAh");
                if (neighbors == 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                //
                // }
            } else {
                let januaryCounter = (this.currentState % 2 == 0) ? 7 : 3;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.5;
                if (this.currentState % 2 == 0) {
                    if ((chosenNeighbor == neighborValue) && (chosenNeighbor2 == neighborValue)) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                } else {
                    if ((chosenNeighbor3 == neighborValue) && (chosenNeighbor4 == neighborValue)) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch8.calculateNeighbors = function(x, y) {
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
nightsOfMarch8.update = function() {
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
nightsOfMarch8.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//-----------

let nightsOfMarch9 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-180634",
    // paletteName: "palette-sat-mar-17-2018-183102",
    paletteName: "palette-sat-mar-17-2018-184849",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch9.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch9.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var chosenNeighbor = this.calculateNeighbors(x - 1, y);
            var chosenNeighbor2 = this.calculateNeighbors(x + 1, y);
            var chosenNeighbor3 = this.calculateNeighbors(x, y - 1);
            var chosenNeighbor4 = this.calculateNeighbors(x, y + 1);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                // if (chosenNeighbor3 == 1 && chosenNeighbor4 == 1) {
                // console.log("YEAh");
                // if (chosenNeighbor == 4 && chosenNeighbor2 == 4) {
                if (neighbors == 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // }
                //
                // }
            } else {
                let januaryCounter = (this.currentState % 2 == 0) ? 7 : 3;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.5;
                if (neighbors == 1 && this.currentState % 2 == 0) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                    if (januaryCounter >= 8) {
                        januaryCounter = 0;
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch9.calculateNeighbors = function(x, y) {
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
nightsOfMarch9.update = function() {
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
nightsOfMarch9.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

//----------------------

//-------------
let nightsOfMarch10 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    paletteName: "palette-sun-mar-18-2018-001237",




    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch10.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);


    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(x, 0, 1);
        // this.setGridValue(x, 0, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(this.gridXAmount / 2, y, 1);
        // this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }
};

nightsOfMarch10.updateGrid = function() {


    if (Math.random() <= 0.05) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            if (modifier) {
                yModifier += plusMinus;
            }
            this.setGridValue(x + i, y + yModifier, 1);
        }
    }



    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x, y - 2);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 0;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch10.calculateNeighbors = function(x, y) {
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
nightsOfMarch10.update = function() {
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
nightsOfMarch10.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 900, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 150, blueLerp);
    return color(a.r, a.g, a.b);
};


//-------------
let nightsOfMarch11 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    // paletteName: "palette-sat-mar-17-2018-040207",
    paletteName: "palette-sun-mar-18-2018-042739",




    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch11.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);


    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(x, 0, 1);
        // this.setGridValue(x, 0, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(this.gridXAmount / 2, y, 1);
        // this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }
};

nightsOfMarch11.updateGrid = function() {


    if (Math.random() <= 0.1) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            // if (modifier) {
            yModifier += plusMinus;
            // }
            this.setGridValue(x + i, y + yModifier, 1);
        }
    }



    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x, y - 3);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3  ||  neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 0;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.5;
                if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch11.calculateNeighbors = function(x, y) {
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
nightsOfMarch11.update = function() {
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
nightsOfMarch11.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 900, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 150, blueLerp);
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch12 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    // paletteName: "palette-sat-mar-17-2018-040207",
    paletteName: "palette-sun-mar-18-2018-042739",


    paletteName: "palette-sun-mar-18-2018-050402",


    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch12.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);


    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(x, 0, 1);
        // this.setGridValue(x, 0, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(this.gridXAmount / 2, y, 1);
        // this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }
};

nightsOfMarch12.updateGrid = function() {

    for (let i = 0; i < 2; i++) {
        if (Math.random() <= 0.9) {
            let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
            let x = Math.random() * this.gridXAmount;
            let w = Math.random() * 40;
            let yModifier = 0;
            let modifier = (Math.random() >= 0.5) ? true : false;
            for (let i = 0; i < w; i++) {
                let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
                // if (modifier) {
                yModifier += plusMinus;
                // }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }

    for (let i = 0; i < 2; i++) {
        if (Math.random() <= 0.9) {
            let y = Math.random() * this.gridYAmount * 0.2;
            let x = this.gridXAmount * 0.2 + (Math.random() * this.gridXAmount * 0.25);
            let w = Math.random() * 40;
            let yModifier = 0;
            let modifier = (Math.random() >= 0.5) ? true : false;
            for (let i = 0; i < w; i++) {
                let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
                // if (modifier) {
                yModifier += plusMinus;
                // }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }

    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x, y - 8);
            var neighborTop = this.calculateNeighbors(x, y + 4);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3  ||  neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 0;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.05;
                // if (this.currentState % 2 == 0) {
                if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }
                // } else {
                // if (neighborTop <= neighborValue && neighborTop) {
                //     this.next[oneDValue] = { state: 1, changed: true };
                //     this.changes[oneDValue] = this.currentState * stateScalar;
                //     changed = true;
                //     januaryCounter += increment;
                // }
                // }


            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch12.calculateNeighbors = function(x, y) {
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
nightsOfMarch12.update = function() {
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
nightsOfMarch12.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 500 * 0.05, 750 * 0.05, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch13 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    // paletteName: "palette-sat-mar-17-2018-040207",
    paletteName: "palette-sun-mar-18-2018-042739",


    paletteName: "palette-sun-mar-18-2018-050402",
    paletteName: "palette-sun-mar-18-2018-054224",

    paletteName: "palette-sun-mar-18-2018-152840",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch13.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);


    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(x, 0, 1);
        // this.setGridValue(x, 0, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(this.gridXAmount / 2, y, 1);
        // this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }
};

nightsOfMarch13.updateGrid = function() {

    for (let i = 0; i < 2; i++) {
        if (Math.random() <= 0.9) {
            let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
            let x = Math.random() * this.gridXAmount;
            let w = Math.random() * 40;
            let yModifier = 0;
            let modifier = (Math.random() >= 0.5) ? true : false;
            for (let i = 0; i < w; i++) {
                let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
                // if (modifier) {
                yModifier += plusMinus;
                // }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }

    for (let i = 0; i < 2; i++) {
        if (Math.random() <= 0.9) {
            let y = Math.random() * this.gridYAmount * 0.2;
            let x = this.gridXAmount * 0.7 + (Math.random() * this.gridXAmount * 0.02);
            let w = Math.random() * 100;
            let yModifier = 0;
            let modifier = (Math.random() >= 0.5) ? true : false;
            for (let i = 0; i < w; i++) {
                let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
                // if (modifier) {
                yModifier += plusMinus;
                // }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }

    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x, y - 16);
            var neighborTop = this.calculateNeighbors(x, y + 4);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3  ||  neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 0;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 1;
                let stateScalar = 0.05;
                // if (this.currentState % 2 == 0) {
                if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }
                // } else {
                // if (neighborTop <= neighborValue && neighborTop) {
                //     this.next[oneDValue] = { state: 1, changed: true };
                //     this.changes[oneDValue] = this.currentState * stateScalar;
                //     changed = true;
                //     januaryCounter += increment;
                // }
                // }


            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch13.calculateNeighbors = function(x, y) {
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
nightsOfMarch13.update = function() {
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
nightsOfMarch13.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 400 * 0.05, 850 * 0.05, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch14 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    // paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    paletteName: "palette-sun-mar-18-2018-001237",




    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch14.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, 0, 1);


    let padding = 0;
    let y = this.gridYAmount / 2;
    for (let x = padding; x < this.gridXAmount - padding; x++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(x, 0, 1);
        // this.setGridValue(x, 0, 1);
        // }
    }

    padding = 0;
    // let y = this.gridYAmount / 2;
    for (let y = padding; y < this.gridYAmount - padding; y++) {
        // for (let yD = -3; yD < 6; yD++) {
        // this.setGridValue(this.gridXAmount / 2, y, 1);
        // this.setGridValue(this.gridXAmount - 1, y, 1);
        // }
    }
};

nightsOfMarch14.updateGrid = function() {

    // let h = (this.currentState <= 10) ? 120 : 20;

    if (this.currentState == 1) {
        let x = this.gridXAmount * 0.75 + (Math.random() * this.gridXAmount * 0.05);
        let y = this.gridyAmount * 0.15 + (Math.random() * this.gridYAmount * 0.05);
        this.setGridValue(220, 20, 1);
    }
    if (Math.random() <= 0.05) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            if (modifier) {
                yModifier += plusMinus;
            }
            this.setGridValue(x + i, y + yModifier, 1);
        }
    }



    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x, y - 2);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 0;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }

            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch14.calculateNeighbors = function(x, y) {
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
nightsOfMarch14.update = function() {
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
nightsOfMarch14.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 900, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 150, blueLerp);
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch15 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",

    paletteName: "palette-sun-mar-18-2018-205032",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch15.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0, 0, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch15.updateGrid = function() {
    // console.log("Updating the grid!");
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x - 1, y);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                //     // if (neighbors == 6) {
                //     this.next[oneDValue] = { state: 0, changed: true };
                //     this.changes[oneDValue] += 5;
                //     changed = true;
                //     // }
                // console.log("YEAh");r
                // } else {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    // console.log("YEAh");
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
                // //
                // }
            } else {
                let januaryCounter = 1;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (Math.floor(januaryCounter) == 0) {
                    if (neighborTopLeft <= neighborValue && neighborTopLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 1) {
                    if (neighborTop <= neighborValue && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 2) {
                    if (neighborTopRight <= neighborValue && neighborTopRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 3) {
                    if (neighborRight <= neighborValue && neighborRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 4) {
                    if (neighborBottomRight <= neighborValue && neighborBottomRight) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 5) {
                    if (neighborBottom <= neighborValue && neighborBottom) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 6) {
                    if (neighborBottomLeft <= neighborValue && neighborBottomLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                    }
                } else if (Math.floor(januaryCounter) == 7) {
                    if (neighborLeft <= neighborValue && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * stateScalar;
                        changed = true;
                        januaryCounter += increment;
                        if (januaryCounter >= 8) {
                            januaryCounter = 0;
                        }
                    }
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch15.calculateNeighbors = function(x, y) {
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
nightsOfMarch15.update = function() {
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
nightsOfMarch15.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 300, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    // a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 150, blueLerp);
    return color(a.r, a.g, a.b);
};

//-------------
let nightsOfMarch16 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",

    paletteName: "palette-sun-mar-18-2018-205032",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch16.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch16.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
            } else {
                let januaryCounter = 1;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (neighborLeft <= neighborValue && neighborTop) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch16.calculateNeighbors = function(x, y) {
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
nightsOfMarch16.update = function() {
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
nightsOfMarch16.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 300, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    // a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 150, blueLerp);
    return color(a.r, a.g, a.b);
};

//----------------------------------------------------------------------

let nightsOfMarch17 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",

    paletteName: "palette-wed-dec-20-2017-044411",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch17.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch17.updateGrid = function() {
    if (Math.random() <= 0.2) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            if (modifier) {
                yModifier += plusMinus;
            }
            this.setGridValue(x + i, y + yModifier, 1);
        }
    }
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
            } else {
                let januaryCounter = 1;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (neighborLeft <= 2 && neighborLeft && neighborBottom <= 2 && neighborTop) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch17.calculateNeighbors = function(x, y) {
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
nightsOfMarch17.update = function() {
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
nightsOfMarch17.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c * 2, 0, 900, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    // a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    return color(a.r, a.g, a.b);
};

//----------------------------------------------------------------------

let nightsOfMarch18 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",

    paletteName: "palette-wed-dec-20-2017-044411",
    paletteName: "palette-mon-mar-19-2018-020051",



    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch18.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(0, 0, 1);

};

nightsOfMarch18.updateGrid = function() {
    // console.log("yup");
    if (Math.random() <= 0.2) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            if (modifier) {
                yModifier += plusMinus;
            }
            this.setGridValue(x + i, y + yModifier, 1);
        }
    }
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] += 1;
                    changed = true;
                }
            } else {
                let januaryCounter = 1;
                let changeIncrement = 0.5;
                let increment = 0.0000001;
                let neighborValue = 2;
                let stateScalar = 0.5;
                if (neighborLeft <= 3 && neighborLeft && neighborBottom <= 3 && neighborTopLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * stateScalar;
                    changed = true;
                    januaryCounter += increment;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch18.calculateNeighbors = function(x, y) {
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
nightsOfMarch18.update = function() {
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
nightsOfMarch18.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let redLerp = map(c * 2, 0, 600, 0, 1);
    redLerp = constrain(redLerp, 0, 1);
    let blackLerp = map(c * 2, 600, 800, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 50, { r: red, g: green, b: blue });
    a = { r: red, g: green, b: blue };
    // a.r = lerp(a.r, 50, redLerp);
    // a.g = lerp(a.g, 0, redLerp);
    // a.b = lerp(a.b, 0, redLerp);
    // a.r = lerp(a.r, 0, blackLerp);
    // a.g = lerp(a.g, 0, blackLerp);
    // a.b = lerp(a.b, 0, blackLerp);
    // // a.r = Math.min(a.r, 255);
    // a.g = Math.min(a.g, 255);
    // a.b = Math.min(a.b, 255);
    let blueLerp = map(c * 2, 0, 900, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    return color(a.r, a.g, a.b);
};


//-------------
let nightsOfMarch19 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    // beau
    // paletteName: "palette-sat-dec-16-2017-150022",
    // très beau
    paletteName: "palette-tue-dec-12-2017-141143",
    // aussi très beau
    // paletteName: "palette-sat-mar-17-2018-153848",


    // Beau avec nightsOfMarch19
    paletteName: "palette-sun-mar-18-2018-205032",


    paletteName: "palette-sun-dec-24-2017-140250",

    //----------------------------------------

    // Other nice options for nightsOfMarch19:
    // palette-mon-dec-11-2017-211545
    // palette-thu-jan-11-2018-172555
    // palette-sat-mar-17-2018-152553
    // palette-mon-mar-19-2018-224024
    // palette-mon-mar-19-2018-224330

    // Wonderful for nightsOfMarch19:
    // palette-mon-mar-19-2018-224636

    //palette-mon-mar-19-2018-225739
    //palette-mon-mar-19-2018-231044
    //palette-tue-mar-20-2018-013327
    //palette-tue-mar-20-2018-015216

    //----------------------------------------

    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

nightsOfMarch19.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch19.updateGrid = function() {
    if (Math.random() <= 0.2) {
        let y = map(this.currentState, 0, 800, this.gridYAmount - 20, 0);
        let x = Math.random() * this.gridXAmount;
        let w = Math.random() * 40;
        let yModifier = 0;
        let modifier = (Math.random() >= 0.5) ? true : false;
        for (let i = 0; i < w; i++) {
            let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
            // if (modifier) {
            yModifier += plusMinus;
            // }
            let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
            let oneDValue = (Math.floor(x) + i) + ((Math.floor(y) + yModifier) * xAmount);
            if (this.changes[oneDValue] == 0) {
                this.setGridValue(x + i, y + yModifier, 1);
                this.changes[oneDValue] = this.currentState * 0.5;
            }
        }
    }
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            var neighbors = this.calculateNeighbors(x, y);
            var neighborTopLeft = this.calculateNeighbors(x - 1, y - 1);
            var neighborTop = this.calculateNeighbors(x, y - 1);
            var neighborTopRight = this.calculateNeighbors(x + 1, y - 1);
            var neighborRight = this.calculateNeighbors(x + 1, y);
            var neighborBottomRight = this.calculateNeighbors(x + 1, y + 1);
            var neighborBottom = this.calculateNeighbors(x, y + 2);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                if (neighbors == 1 || neighbors == 2 || neighbors == 3 || neighbors == 0) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

nightsOfMarch19.calculateNeighbors = function(x, y) {
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
nightsOfMarch19.update = function() {
    // console.log("UPDATED!!!!");
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
nightsOfMarch19.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 300, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 300, 400, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    return color(a.r, a.g, a.b);
};

let scene = nightsOfMarch19;