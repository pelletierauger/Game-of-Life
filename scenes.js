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
    fileName: "./frames/scene002d/game-of-life",
    gridScalar: 8,
    paletteName: "red-blue-pink",
    speedModulo: 3,
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

let scene = bigFractal;