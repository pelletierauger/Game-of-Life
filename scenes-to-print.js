//-------------------------------------------------------------

let templeOfGosia = new Scene({
    fileName: "./frames/warmth-of-april-11/warmth-of-april-11",
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

    // Full screen with bleed
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",
    paletteName: "palette-sun-apr-29-2018-135522",
    paletteName: "palette-thu-dec-28-2017-025052",
    paletteName: "palette-tue-apr-24-2018-181237",
    // gridSeedName: "gridseed-sun-apr-29-2018-135650",
    // gridSeedName: "gridseed-sun-apr-29-2018-141131",

    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058

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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

templeOfGosia.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);
    let startX = (this.gridXAmount / 4 * 3) - 5;
    let endX = startX + 10;
    let startY = 30;
    for (let x = startX; x < endX; x++) {
        for (let y = startY; y <= startY + 1; y++) {
            this.setGridValue(x, y, 1);
        }
    }
    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

templeOfGosia.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    if (this.currentState == 50) {
        let startX = (this.gridXAmount / 7);
        let endX = startX + 6;
        let startY = this.gridYAmount * 0.65;
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y <= startY + 1; y++) {
                this.setGridValue(x, y, 1);
            }
        }
    }
    if (this.currentState == 105) {
        this.setGridValue(200, 120, 1);
        this.setGridValue(201, 120, 1);
    }


    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.6) {
    //         let y = map(this.currentState, 0, 150, this.gridYAmount - 0, 0);
    //         let x = Math.random() * this.gridXAmount;
    //         let w = Math.random() * 40;
    //         let yModifier = 0;
    //         let modifier = (Math.random() >= 0.5) ? true : false;
    //         for (let i = 0; i < w; i++) {
    //             let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
    //             // if (modifier) {
    //             yModifier += plusMinus;
    //             // }
    //             let oneDValue = (Math.floor(x + i)) + ((Math.floor(y + yModifier)) * xAmount);
    //             if (this.changes[oneDValue] == 0) {
    //                 this.setGridValue(x + i, y + yModifier, 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             // this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }
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
                if (neighbors == 2 || neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighbors <= 4 && neighbors >= 2) {
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

templeOfGosia.calculateNeighbors = function(x, y) {
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
templeOfGosia.update = function() {
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
templeOfGosia.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 70, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 70, 100, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 20, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 250, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let sunset01 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },
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
    paletteName: "palette-thu-mar-22-2018-010754",

    // Pink, green, and blue
    paletteName: "palette-sat-mar-17-2018-190341",


    // Subtler pink, green and blue
    paletteName: "palette-sun-dec-24-2017-003950",

    // Classic The Dig
    // paletteName: "palette-mon-dec-11-2017-211645",

    // paletteName: "palette-mon-dec-18-2017-005144",


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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

sunset01.applyShapes = function() {
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

sunset01.updateGrid = function() {
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
        let yBase = map(this.currentState, 0, 125, this.gridYAmount - 25, 0);
        let ran = Math.random() * 50;
        let increment = Math.random() * 20;
        for (var x = this.gridXAmount * 0.5; x < this.gridXAmount; x += increment) {
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
    if (this.currentState % 10 == 0) {
        let yBase = map(this.currentState, 0, 275, this.gridYAmount, 0);
        let ran = Math.random() * 50;
        let increment = Math.random() * 20;
        for (var x = 0; x < this.gridXAmount * 0.5; x += increment) {
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
                        this.changes[oneDValue] = this.currentState * 0.35;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 2 && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.35;
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

sunset01.calculateNeighbors = function(x, y) {
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
sunset01.update = function() {
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
sunset01.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    c += 5;
    let blueLerp = map(c, 0, 30, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 30, 45, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 45, 60, 0, 1);
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

//-------------------------------------------------------------

let warmthOfApril3HD = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
    gridScalar: 16,
    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

    //Full page with bleed
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },

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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",

    // Beau avec warmthOfApril3 : 
    // palette-sun-mar-04-2018-035212
    // paletteName: "palette-sun-mar-04-2018-035212",
    // palette-sat-dec-16-2017-142619
    // palette-sat-dec-16-2017-012406
    // palette-sat-apr-28-2018-014136
    paletteName: "palette-sat-dec-16-2017-142619",
    // palette-sat-apr-28-2018-041317
    // palette-sat-apr-28-2018-134043

    // gridSeedName: "gridseed-sat-apr-28-2018-011300",
    // gridSeedName: "gridseed-sat-apr-28-2018-011705",
    gridSeedName: "gridseed-sat-apr-28-2018-011819",
    // gridSeedName: "gridseed-mon-jun-25-2018-224059",

    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058


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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

warmthOfApril3HD.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril3HD.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 5; i++) {
        if (Math.random() <= 0.9) {
            let y = map(this.currentState, 0, 150, this.gridYAmount - 0, 0);
            let x = Math.random() * this.gridXAmount;
            let w = Math.random() * 40;
            let yModifier = 0;
            let modifier = (Math.random() >= 0.5) ? true : false;
            for (let i = 0; i < w; i++) {
                let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
                // if (modifier) {
                yModifier += plusMinus;
                // }



                let oneDValue = (Math.floor(x + i)) + ((Math.floor(y + yModifier)) * xAmount);
                if (this.changes[oneDValue] == 0) {
                    this.setGridValue(x + i, y + yModifier, 1);
                    this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }
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
                if (neighbors == 2 || neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (this.currentState % 10 !== 0) {
                    if (neighborBottom == 1 && neighborTopLeft && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 3 && neighborTopRight && neighborTop) {
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

warmthOfApril3HD.calculateNeighbors = function(x, y) {
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
warmthOfApril3HD.update = function() {
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
warmthOfApril3HD.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 70, 0.5, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 70, 100, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };

    // a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


warmthOfApril3HD.initialize = function() {
    this.gridSeed = [];
    if (this.fixedGridSize) {
        this.gridXAmount = (this.horizontalScalar * this.gridScalar) + 1;
        this.gridYAmount = (this.verticalScalar * this.gridScalar) + 1;
        this.tileWidth = width / this.gridXAmount - 1 / this.gridXAmount;
        // Fill the grid with 0 values and the changes array with 0 values.
        for (var i = 0; i < this.fixedGridSize.width * this.fixedGridSize.height; i++) {
            this.grid.push({ state: 0, changed: false });
            this.changes.push(0);
            // This is only there for some experimental, inconclusive scenes.
            this.next.push({ state: 0, changed: false });
        }
    } else {
        this.gridXAmount = (this.horizontalScalar * this.gridScalar) + 1;
        this.gridYAmount = (this.verticalScalar * this.gridScalar) + 1;
        this.tileWidth = width / this.gridXAmount - 1 / this.gridXAmount;
        // Fill the grid with 0 values and the changes array with 0 values.
        for (var i = 0; i < this.gridXAmount * this.gridYAmount; i++) {
            this.grid.push({ state: 0, changed: false });
            this.changes.push(0);
            // This is only there for some experimental, inconclusive scenes.
            this.next.push({ state: 0, changed: false });
        }
    }
    if (this.gridSeedName) {
        let seed = this.fetchGridSeed(this.gridSeedName);
        // this.gridScalar = seed.data.gridScalar;
        // this.gridXAmount = (this.horizontalScalar * this.gridScalar) + 1;
        // this.gridYAmount = (this.verticalScalar * this.gridScalar) + 1;
        // this.tileWidth = width / this.gridXAmount - 1 / this.gridXAmount;
        for (let x = 0; x < 257; x++) {
            for (let y = 0; y < 145; y++) {
                let oneDValue = x + (y * 257);
                if (this.grid[oneDValue] !== null && this.gridSeed[oneDValue] !== null) {
                    // console.log("yup");
                    this.grid[oneDValue].state = seed.data.gridSeed[oneDValue];
                }
            }
        }
        // for (var i = 0; i < seed.data.gridSeed.length; i++) {
        //     this.gridSeed.push(seed.data.gridSeed[i]);
        //     this.grid.push({ state: seed.data.gridSeed[i], changed: false });
        //     this.changes.push(0);
        //     // This is only there for some experimental, inconclusive scenes.
        //     this.next.push({ state: 0, changed: false });
        // }
    }

    // initialize() is only called when the palettes are loaded,
    // so we can now define the scene's palette.
    this.palette = this.fetchPalette(this.paletteName);

    if (this.applyShapes) {
        this.applyShapes();
        //Once the shapes are applied, the grid is copied to gridSeed for archiving.
        // for (var i = 0; i < this.grid.length; i++) {
        //     this.gridSeed[i] = this.grid[i].state;
        // }
    }
    // This counter is incremented each time the Scene is hit by the x-sheet,
    // and a modulo function controls at what frequency the scene upgrades its grid.
    this.counter = 1;
    this.initialized = true;
};

//-------------------------------------------------------------

let canyon = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },

    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },


    // Full screen with bleed
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },

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
    paletteName: "palette-mon-dec-11-2017-211401",
    paletteName: "palette-sat-dec-16-2017-142619",

    paletteName: "palette-sun-dec-24-2017-003950",

    paletteName: "palette-tue-dec-19-2017-173106",

    // palette-fri-jan-12-2018-024639
    // palette-sun-mar-04-2018-154033
    // palette-tue-dec-19-2017-173106
    // palette-sun-may-13-2018-003057
    // palette-sun-may-13-2018-004305



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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

canyon.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

canyon.updateGrid = function() {
    for (var i = 0; i < 4; i++) {
        if (Math.random() <= 0.75) {
            let x = map(this.currentState, 0, 50, 30, this.gridXAmount);
            let y = Math.random() * this.gridYAmount;
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
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 ||  neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottomRight <= 3 && neighborBottom && neighborTopLeft) {
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

canyon.calculateNeighbors = function(x, y) {
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
canyon.update = function() {
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
canyon.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 30, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 30, 40, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 40, 50, 0, 1);
    thirdLerp = constrain(thirdLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 50, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    a.r = lerp(a.r, 50, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    return color(a.r, a.g, a.b);
};


//-------------------------------------------------------------

let nightsOfMarch22b = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",
horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

    // Full page with bleed
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },
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


    paletteName: "palette-thu-jan-11-2018-172555",
    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058

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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

nightsOfMarch22b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch22b.updateGrid = function() {
    if (Math.random() <= 0.5) {
        let x = map(this.currentState, 0, 100, this.gridXAmount, 0);
        let y = Math.random() * this.gridYAmount;
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

nightsOfMarch22b.calculateNeighbors = function(x, y) {
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
nightsOfMarch22b.update = function() {
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
nightsOfMarch22b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 50, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 50, 150, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 75, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let nightsOfMarch33b = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

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

    paletteName: "palette-fri-may-04-2018-010806",


    paletteName: "palette-wed-mar-28-2018-003835",

    // paletteName: "palette-mon-dec-18-2017-003135",
    paletteName: "palette-mon-dec-11-2017-211645",
    paletteName: "palette-thu-may-03-2018-033923",

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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

nightsOfMarch33b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch33b.updateGrid = function() {
    for (var i = 0; i < 6; i++) {
        if (Math.random() <= 0.25) {
            let y = map(this.currentState, 0, 50, this.gridYAmount, 0);
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
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 ||  neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborBottom && neighborTop) {
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

nightsOfMarch33b.calculateNeighbors = function(x, y) {
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
nightsOfMarch33b.update = function() {
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
nightsOfMarch33b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 30, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 30, 60, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 60, 70, 0, 1);
    thirdLerp = constrain(thirdLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 25, blueLerp);
    a.b = lerp(a.b, 50, blueLerp);
    a.r = lerp(a.r, 15, blackLerp);
    a.g = lerp(a.g, 15, blackLerp);
    a.b = lerp(a.b, 60, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(255, 255, 255);
};

//-------------------------------------------------------------

let nightsOfMarch22c = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

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


    paletteName: "palette-thu-jan-11-2018-172555",
    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058

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
    dotPerTile: 3500 / 16 * 1.8,
    maxSteps: 129
});

nightsOfMarch22c.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch22c.updateGrid = function() {

    // if (Math.random() <= 0.9) {
    for (let u = 0; u < 10; u++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        let w = Math.random() * 10;
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
    // }
    // if (Math.random() <= 0.5) {
    //     let x = map(this.currentState, 0, 100, this.gridXAmount, 0);
    //     let y = Math.random() * this.gridYAmount;
    //     let w = Math.random() * 40;
    //     let yModifier = 0;
    //     let modifier = (Math.random() >= 0.5) ? true : false;
    //     for (let i = 0; i < w; i++) {
    //         let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
    //         // if (modifier) {
    //         yModifier += plusMinus;
    //         // }
    //         let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    //         let oneDValue = (Math.floor(x) + i) + ((Math.floor(y) + yModifier) * xAmount);
    //         if (this.changes[oneDValue] == 0) {
    //             this.setGridValue(x + i, y + yModifier, 1);
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

nightsOfMarch22c.calculateNeighbors = function(x, y) {
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
nightsOfMarch22c.update = function() {
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
nightsOfMarch22c.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 50, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 50, 150, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 75, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(255, 255, 255);
};


//-------------------------------------------------------------

let nightsOfMarch22d = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
    gridScalar: 16,
    // offset: { x: 500, y: 500 },
    // fixedGridSize: { width: 1000, height: 1000 },
    // paletteName: "palette-fri-dec-15-2017-185009",
    // paletteName: "palette-tue-dec-19-2017-173106",

    horizontalScalar: 16,
    verticalScalar: 11,
    fixedGridSize: { width: 257, height: 173 },

    // Full page with bleed
    horizontalScalar: 16,
    verticalScalar: 12,
    fixedGridSize: { width: 257, height: 179 },
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


    // paletteName: "palette-thu-jan-11-2018-172555",
    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058

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
    dotPerTile: 3500 / 16 * 2,
    maxSteps: 129
});

nightsOfMarch22d.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

nightsOfMarch22d.updateGrid = function() {
    // if (Math.random() <= 0.5) {
    //     let x = map(this.currentState, 0, 100, this.gridXAmount, 0);
    //     let y = Math.random() * this.gridYAmount;
    //     let w = Math.random() * 40;
    //     let yModifier = 0;
    //     let modifier = (Math.random() >= 0.5) ? true : false;
    //     for (let i = 0; i < w; i++) {
    //         let plusMinus = (Math.random() >= 0.5) ? -1 : 1;
    //         // if (modifier) {
    //         yModifier += plusMinus;
    //         // }
    //         let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    //         let oneDValue = (Math.floor(x) + i) + ((Math.floor(y) + yModifier) * xAmount);
    //         if (this.changes[oneDValue] == 0) {
    //             this.setGridValue(x + i, y + yModifier, 1);
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

nightsOfMarch22d.calculateNeighbors = function(x, y) {
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
nightsOfMarch22d.update = function() {
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
nightsOfMarch22d.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 50, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 50, 150, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 75, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 0, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

scene = nightsOfMarch22b;