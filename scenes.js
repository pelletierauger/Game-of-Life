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

hugeFractal.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
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
    fileName: "./frames/biggest-fractal/biggest-fractal",
    gridScalar: 16,
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
    fileName: "./frames/ultimate-fractal-2/ultimate-fractal",
    gridScalar: 32,
    offset: { x: 500, y: 500 },
    fixedGridSize: { width: 1000, height: 1000 },
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

let scene = beforeTheRiverFractal2;