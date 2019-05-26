//-------------------------------------------------------------

let newSpring = new Scene({
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

    // paletteName: "palette-sat-apr-28-2018-041749",

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

newSpring.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

newSpring.updateGrid = function() {
    for (var i = 0; i < 6; i++) {
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
                if (neighborBottom <= 2 && neighborTop && neighborBottomLeft) {
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

newSpring.calculateNeighbors = function(x, y) {
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
newSpring.update = function() {
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
newSpring.getColor = function(oneDValue, optionalArray) {
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

let newSpring2 = new Scene({
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

    // paletteName: "palette-sat-apr-28-2018-041749",

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
    paletteName: "palette-sun-dec-24-2017-053456",
    // "palette-fri-jan-12-2018-024639"

    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

newSpring2.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

newSpring2.updateGrid = function() {
    for (var i = 0; i < 1; i++) {
        if (Math.random() <= 0.5) {
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
                if (neighbors <= 3 && neighborTop >= 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
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

newSpring2.calculateNeighbors = function(x, y) {
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
newSpring2.update = function() {
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
newSpring2.getColor = function(oneDValue, optionalArray) {
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

let newSpring3 = new Scene({
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

    // paletteName: "palette-sat-apr-28-2018-041749",

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
    paletteName: "palette-sun-dec-24-2017-053456",
    // "palette-fri-jan-12-2018-024639"

    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

newSpring3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

newSpring3.updateGrid = function() {
    for (var i = 0; i < 1; i++) {
        if (Math.random() <= 0.25) {
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
                if (neighbors <= 3 && neighborTop >= 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
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

newSpring3.calculateNeighbors = function(x, y) {
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
newSpring3.update = function() {
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
newSpring3.getColor = function(oneDValue, optionalArray) {
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

let newSpring4 = new Scene({
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

    // paletteName: "palette-sat-apr-28-2018-041749",

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
    paletteName: "palette-sun-dec-24-2017-053456",
    paletteName: "palette-sat-apr-28-2018-041749",
    // "palette-fri-jan-12-2018-024639"

    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

newSpring4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

newSpring4.updateGrid = function() {
    for (var i = 0; i < 1; i++) {
        if (Math.random() <= 0.5) {
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
                if (neighbors <= 3 && neighborTop >= 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop && neighborLeft) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
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

newSpring4.calculateNeighbors = function(x, y) {
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
newSpring4.update = function() {
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
newSpring4.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 40, blackLerp);
    a.b = lerp(a.b, 50, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    return color(a.r, a.g, a.b);
};





//-------------------------------------------------------------

let newSpring5 = new Scene({
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

    // paletteName: "palette-sat-apr-28-2018-041749",

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
    paletteName: "palette-sun-dec-24-2017-053456",
    paletteName: "palette-sat-apr-28-2018-041749",


    paletteName: "palette-tue-dec-12-2017-221300",
    // "palette-fri-jan-12-2018-024639"

    // paletteName: "palette-sun-mar-04-2018-154033",
    // palette-tue-dec-12-2017-141143

    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

newSpring5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

newSpring5.updateGrid = function() {
    // for (var i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.125) {
    //         let y = map(this.currentState, 0, 100, this.gridYAmount, 0);
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
    //             let oneDValue = (Math.floor(x)) + ((Math.floor(y) + yModifier + i) * xAmount);
    //             if (this.changes[oneDValue] == 0) {
    //                 this.setGridValue(x, y + yModifier + i, 1);
    //                 this.changes[oneDValue] = this.currentState * 0.5;
    //             }
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
                if (neighbors <= 3 && (neighborTop >= 2 || neighborBottom >= 2)) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
                    changed = true;
                }
            } else {
                if ((neighborBottom <= 2 && neighbors <= 2) &&
                    (neighborBottom || neighborTop  || neighborLeft ||  neighborRight)) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.4;
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

newSpring5.calculateNeighbors = function(x, y) {
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
newSpring5.update = function() {
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
newSpring5.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 18, 45, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 45, 65, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let thirdLerp = map(c, 65, 85, 0, 1);
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
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 40, blackLerp);
    a.b = lerp(a.b, 50, blackLerp);
    a.r = lerp(a.r, 0, thirdLerp);
    a.g = lerp(a.g, 0, thirdLerp);
    a.b = lerp(a.b, 0, thirdLerp);
    return color(a.r, a.g, a.b);
};

scene = newSpring3;