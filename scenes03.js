//-------------------------------------------------------------

let nightsOfMarch25b = new Scene({
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

    paletteName: "palette-tue-dec-12-2017-132118",

    paletteName: "palette-tue-dec-12-2017-221300",


    paletteName: "palette-sat-dec-16-2017-142619",

    // palette-tue-dec-19-2017-172500
    // palette-tue-mar-20-2018-031234

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

nightsOfMarch25b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch25b.updateGrid = function() {
    for (var i = 0; i < 2; i++) {
        if (Math.random() <= 0.75) {
            let y = map(this.currentState, 0, 100, this.gridYAmount, 0);
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
                let oneDValue = (Math.floor(x)) + ((Math.floor(y) + yModifier + i) * xAmount);
                if (this.changes[oneDValue] == 0) {
                    this.setGridValue(x, y + yModifier + i, 1);
                    this.changes[oneDValue] = this.currentState * 0.5;
                }
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
            var neighborBottom = this.calculateNeighbors(x, y + 1);
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
                if (neighborBottom <= 2 && neighborTopLeft && neighborBottomLeft) {
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

nightsOfMarch25b.calculateNeighbors = function(x, y) {
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
nightsOfMarch25.update = function() {
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
nightsOfMarch25b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 18, 45, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 45, 55, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 55, 65, 0, 1);
    thirdLerp = constrain(thirdLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = { r: red, g: green, b: blue };
    // a = adjustLevels(0, 0, 50, { r: a.r, g: a.g, b: a.b });
    a.r = lerp(a.r, 75, blueLerp);
    a.g = lerp(a.g, 75, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    a.r = lerp(a.r, 50, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 50, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let nightsOfMarch37b = new Scene({
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

    paletteName: "palette-tue-dec-12-2017-132118",

    paletteName: "palette-tue-dec-12-2017-221300",

    // for nightsOfMarch27
    paletteName: "palette-fri-jan-12-2018-024639",
    paletteName: "palette-sat-dec-16-2017-014035",

    // nightsOfMarch30
    paletteName: "palette-mon-mar-19-2018-225739",
    paletteName: "palette-tue-dec-12-2017-132913",
    paletteName: "palette-sat-mar-17-2018-034450",
    paletteName: "palette-fri-dec-15-2017-185711",
    paletteName: "palette-fri-jan-12-2018-024639",
    paletteName: "palette-sat-dec-16-2017-144333",
    // paletteName: "palette-mon-dec-18-2017-140253",

    paletteName: "palette-tue-mar-20-2018-015216",

    paletteName: "palette-mon-dec-11-2017-211545",
    paletteName: "palette-mon-dec-11-2017-211645",


    paletteName: "palette-mon-mar-19-2018-224024",
    paletteName: "palette-mon-mar-19-2018-225739",
    paletteName: "palette-sat-dec-16-2017-143417",
    paletteName: "palette-tue-mar-20-2018-015216",

    paletteName: "palette-sat-mar-17-2018-034609",

    // paletteName: "palette-sat-apr-28-2018-041749",
    paletteName: "palette-fri-may-11-2018-004246",
    paletteName: "palette-sat-mar-17-2018-190341",
    paletteName: "palette-fri-may-04-2018-010806",
    paletteName: "palette-sat-mar-17-2018-190341",
    paletteName: "palette-mon-dec-18-2017-005144",


    // gridSeedName: "gridseed-fri-may-11-2018-005524",
    // gridSeedName: "gridseed-fri-may-11-2018-010444",
    // gridSeedName: "gridseed-fri-may-11-2018-010815",
    // gridSeedName: "gridseed-fri-may-11-2018-010852",
    // gridSeedName: "gridseed-fri-may-11-2018-012446",
    // gridSeedName: "gridseed-fri-may-11-2018-025014",
    // gridSeedName: "gridseed-fri-may-11-2018-025058",
    // gridSeedName: "gridseed-fri-may-11-2018-025139",
    // gridSeedName: "gridseed-fri-may-11-2018-025245",


    // paletteName: "palette-sat-dec-16-2017-010605",
    // palette-mon-dec-11-2017-211401

    //Très beau avec nightsOfMarch37 :
    // palette-wed-mar-28-2018-003835
    // palette-sat-dec-16-2017-010605


    // palette-fri-jan-12-2018-024639
    // palette-sat-dec-16-2017-142619
    // palette-tue-mar-20-2018-040327
    // palette-sat-dec-16-2017-010605


    // palette-tue-dec-19-2017-172500
    // palette-tue-mar-20-2018-031234

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

nightsOfMarch37b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);
    // for (let y = 40; y < this.gridYAmount - 40; y++) {
    //     this.setGridValue(0, y, 1);
    // }
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount - 1, 1);
};

nightsOfMarch37b.updateGrid = function() {
    for (var i = 0; i < 6; i++) {
        if (Math.random() <= 0.25) {
            let y = map(this.currentState, 0, 75, this.gridYAmount, 0);
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
                let oneDValue = (Math.floor(x) + i) + ((Math.floor(y) + yModifier + i) * xAmount);
                if (this.changes[oneDValue] == 0) {
                    this.setGridValue(x + i, y + yModifier + i, 1);
                    this.changes[oneDValue] = this.currentState * 0.5;
                }
            }
        }
    }
    // if (this.currentState % 10 == 0 || this.currentState == 1) {
    //     let yBase = map(this.currentState, 0, 75, this.gridYAmount, 0);
    //     let ran = Math.random() * 50;
    //     let increment = Math.random() * 20;
    //     for (var x = 0; x < this.gridXAmount; x += increment) {
    //         let y = yBase + (Math.sin(x + this.currentState) * 50);
    //         let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    //         let oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    //         if (this.changes[oneDValue] == 0) {
    //             let rando = (Math.round(Math.random())) ? -1 : 1;
    //             this.setGridValue(x, y, 1);
    //             this.setGridValue(x + 1, y + rando, 1);
    //             this.changes[oneDValue] = this.currentState * 0.5;
    //         }
    //     }
    // }

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
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 ||  neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
                // } else {
                //     if (neighbors == 0 || neighbors == 1) {
                //         this.next[oneDValue] = { state: 0, changed: true };
                //         this.changes[oneDValue] = this.currentState * 0.5;
                //         changed = true;
                //     }
                // }
            } else {
                if (this.currentState % 2 == 0) {
                    if (neighborBottom <= 2 && neighborBottomRight <= 3 && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 1 && neighborBottomRight <= 2 && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
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

nightsOfMarch37b.calculateNeighbors = function(x, y) {
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
nightsOfMarch37b.update = function() {
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
nightsOfMarch37b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 10, 60, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 50, 55, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 55, 60, 0, 1);
    thirdLerp = constrain(thirdLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = { r: red, g: green, b: blue };
    a = adjustLevels(0, 0, 150, { r: a.r, g: a.g, b: a.b });
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    // a.r = lerp(a.r, 0, blackLerp);
    // a.g = lerp(a.g, 0, blackLerp);
    // a.b = lerp(a.b, 50, blackLerp);
    // a.r = lerp(a.r, 0, thirdLerp);
    // a.g = lerp(a.g, 0, thirdLerp);
    // a.b = lerp(a.b, 0, thirdLerp);
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let nightsOfMarch38b = new Scene({
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

    paletteName: "palette-tue-dec-12-2017-132118",

    paletteName: "palette-tue-dec-12-2017-221300",

    // for nightsOfMarch27
    paletteName: "palette-fri-jan-12-2018-024639",
    paletteName: "palette-sat-dec-16-2017-014035",

    // nightsOfMarch30
    paletteName: "palette-mon-mar-19-2018-225739",
    paletteName: "palette-tue-dec-12-2017-132913",
    paletteName: "palette-sat-mar-17-2018-034450",
    paletteName: "palette-fri-dec-15-2017-185711",
    paletteName: "palette-fri-jan-12-2018-024639",
    paletteName: "palette-sat-dec-16-2017-144333",
    // paletteName: "palette-mon-dec-18-2017-140253",

    paletteName: "palette-tue-mar-20-2018-015216",

    paletteName: "palette-mon-dec-11-2017-211545",
    paletteName: "palette-mon-dec-11-2017-211645",


    paletteName: "palette-mon-mar-19-2018-224024",
    paletteName: "palette-mon-mar-19-2018-225739",
    paletteName: "palette-sat-dec-16-2017-143417",
    paletteName: "palette-tue-mar-20-2018-015216",

    paletteName: "palette-sat-mar-17-2018-034609",
    // paletteName: "palette-sat-dec-16-2017-010605",

    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-mon-dec-18-2017-005144",
    // paletteName: "palette-sun-dec-24-2017-142611",
    // palette-sun-dec-24-2017-053932
    // palette-mon-dec-18-2017-005144


    // palette-fri-jan-12-2018-024639
    // palette-sat-dec-16-2017-142619
    // palette-tue-mar-20-2018-040327
    // palette-sat-dec-16-2017-010605


    // palette-tue-dec-19-2017-172500
    // palette-tue-mar-20-2018-031234

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

nightsOfMarch38b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);
    // for (let y = 40; y < this.gridYAmount - 40; y++) {
    //     this.setGridValue(0, y, 1);
    // }
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount - 1, 1);
};

nightsOfMarch38b.updateGrid = function() {
    // for (var i = 0; i < 6; i++) {
    //     if (Math.random() <= 0.25) {
    //         let y = map(this.currentState, 0, 75, this.gridYAmount, 0);
    //         let x = Math.random() * this.gridXAmount;
    //         let w = Math.random() * 40;
    //         let yModifier = 0;
    //         let modifier = (Math.random() >= 0.5) ? true : false;
    //         for (let i = 0; i < w; i++) {
    //             let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
    //             // if (modifier) {
    //             yModifier += plusMinus;
    //             // }
    //             let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    //             let oneDValue = (Math.floor(x) + i) + ((Math.floor(y) + yModifier + i) * xAmount);
    //             if (this.changes[oneDValue] == 0) {
    //                 this.setGridValue(x + i, y + yModifier + i, 1);
    //                 this.changes[oneDValue] = this.currentState * 0.5;
    //             }
    //         }
    //     }
    // }
    if (this.currentState % 10 == 0 || this.currentState == 1) {
        let yBase = map(this.currentState, 0, 75, this.gridYAmount, 0);
        let ran = Math.random() * 50;
        let increment = Math.random() * 20;
        for (var x = 0; x < this.gridXAmount; x += increment) {
            let y = yBase + (Math.sin(x + ran) * 50);
            let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
            let oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
            if (this.changes[oneDValue] == 0) {
                this.setGridValue(x, y, 1);
                this.changes[oneDValue] = this.currentState * 0.5;
            }
            let rando = (Math.round(Math.random())) ? -1 : 1;
            let oneDValue2 = (Math.floor(x) + 1) + ((Math.floor(y) + rando) * xAmount);
            if (this.changes[oneDValue2] == 0) {
                this.setGridValue(x + 1, y + rando, 1);
                this.changes[oneDValue2] = this.currentState * 0.5;
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
            var neighborBottom = this.calculateNeighbors(x, y + 1);
            var neighborBottomLeft = this.calculateNeighbors(x - 1, y + 1);
            var neighborLeft = this.calculateNeighbors(x - 1, y);
            let changed = false;
            if (value == 1) {
                // if (this.currentState % 2 == 0) {
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 ||  neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
                // } else {
                //     if (neighbors == 0 || neighbors == 1) {
                //         this.next[oneDValue] = { state: 0, changed: true };
                //         this.changes[oneDValue] = this.currentState * 0.5;
                //         changed = true;
                //     }
                // }
            } else {
                if (this.currentState % 2 == 0) {
                    if (neighborBottom <= 2 && neighborBottomRight <= 3 && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 2 && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
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

nightsOfMarch38b.calculateNeighbors = function(x, y) {
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
nightsOfMarch38b.update = function() {
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
nightsOfMarch38b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    c += 5;
    let blueLerp = map(c, 0, 40, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 40, 60, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 60, 80, 0, 1);
    thirdLerp = constrain(thirdLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 25, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 50, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    a = adjustLevels(0, 0, 175, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


scene = nightsOfMarch38b;