//speedModulo 1 = 24fps, 2 = 12fps, 3 = 8 fps, 4 = 6 fps, 6 = 4fps, 8 = 3fps, 12 = 2fps

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

let scene = secondScene;