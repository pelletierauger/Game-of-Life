let aprilAtTheDocks = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

aprilAtTheDocks.applyShapes = function() {
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        this.grid[i].b = 1;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setAValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setBValue(this.gridXAmount / 2, this.gridYAmount / 2, 0);
    // for (let i = 0; i < 25; i++) {
    //     let randomX = Math.floor(random(0, this.gridXAmount));
    //     let randomY = Math.floor(random(0, this.gridYAmount));
    //     this.setGridValue(randomX, randomY, 1);
    //     this.setAValue(randomX, randomY, 1);
    // }
};

aprilAtTheDocks.setAValue = function(x, y, newA) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    if (this.grid[oneDValue]) {
        this.grid[oneDValue].a = newA;
        this.grid[oneDValue].changed = true;
    }
};
aprilAtTheDocks.getAValue = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    return this.grid[oneDValue] ? this.grid[oneDValue].a : 0;
};

aprilAtTheDocks.setBValue = function(x, y, newA) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    if (this.grid[oneDValue]) {
        this.grid[oneDValue].b = newA;
        this.grid[oneDValue].changed = true;
    }
};
aprilAtTheDocks.getBValue = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    return this.grid[oneDValue] ? this.grid[oneDValue].b : 0;
};
aprilAtTheDocks.getNeighbor = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    if (this.grid[oneDValue]) {
        return this.grid[oneDValue];
    } else {
        return { state: 1, changed: false, a: 0 };
    }
}

aprilAtTheDocks.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var presentState = this.grid[oneDValue].state;
            let presentA = this.grid[oneDValue].a;
            let neighbors = this.calculateNeighbors(x, y);
            let neighborsB = this.calculateNeighborsB(x, y);
            let neighborTopLeft = this.getNeighbor(x, y - 1);
            let neighborTop = this.getNeighbor(x, y - 1);
            let neighborTopRight = this.getNeighbor(x + 1, y - 1);
            let neighborRight = this.getNeighbor(x + 1, y);
            let neighborBottomRight = this.getNeighbor(x + 1, y + 1);
            let neighborBottom = this.getNeighbor(x, y + 1);
            let neighborBottomLeft = this.getNeighbor(x - 1, y + 1);
            let neighborLeft = this.getNeighbor(x - 1, y);
            let modif = map(this.currentState, 0, 200, 0, 0.25);
            let newA = presentA + (neighbors * 0.25);
            let presentB = this.grid[oneDValue].b;
            let newB = presentB + (neighborsB * 0.125);
            // newA = constrain(newA, 0, 2);
            // newA = Math.max(0, newA - 0.01);
            // newA *= 0.9r;
            let changed = false;
            if ((presentA !== newA) &&
                (neighborLeft.a <= 0.25 || neighborRight.a <= 0.25)
            ) {
                // let st = (newA > 3) ? 0 : 1;
                // newA = (newA > 3) ? 0 : newA;
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: newA,
                    b: newB
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
                this.incrementChanges(x, y);
            }


            // if (value == 1) {
            //     if (neighbors >= 3 || neighbors <= 2) {
            //         this.next[oneDValue] = { state: 0, changed: true };
            //         changed = true;
            //         this.incrementChanges(x, y);
            //     }
            // } else {
            //     if (neighbors == 3 || neighbors == 1) {
            //         this.next[oneDValue] = { state: 1, changed: true };
            //         changed = true;
            //         this.incrementChanges(x, y);
            //     }
            // }
            if (!changed) {
                this.next[oneDValue] = { state: presentState, changed: false, a: presentA, b: presentB };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

aprilAtTheDocks.calculateNeighbors = function(x, y) {
    var sum = 0;
    sum += this.getAValue(x - 1, y - 1);
    sum += this.getAValue(x, y - 1);
    sum += this.getAValue(x + 1, y - 1);
    sum += this.getAValue(x - 1, y);
    sum += this.getAValue(x + 1, y);
    sum += this.getAValue(x - 1, y + 1);
    sum += this.getAValue(x, y + 1);
    sum += this.getAValue(x + 1, y + 1);
    return sum;
};

aprilAtTheDocks.calculateNeighborsB = function(x, y) {
    var sum = 0;
    sum += this.getBValue(x - 1, y - 1);
    sum += this.getBValue(x, y - 1);
    sum += this.getBValue(x + 1, y - 1);
    sum += this.getBValue(x - 1, y);
    sum += this.getBValue(x + 1, y);
    sum += this.getBValue(x - 1, y + 1);
    sum += this.getBValue(x, y + 1);
    sum += this.getBValue(x + 1, y + 1);
    return sum;
};

aprilAtTheDocks.getColor = function(oneDValue, optionalArray) {
    let p = this.palette.data;
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    c = this.grid[oneDValue].a;
    // let col = map(c, 0, 1, 0, 255);
    // let r = map(c, 0, 1, 0, 255);
    // let g = map(c, 0, 1, 0, 70);
    // let b = map(c, 0, 1, 0, 155);
    let red, green, blue;
    if (c) {
        red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
        green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
        blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    } else {
        red = 0;
        green = 0;
        blue = 0;
    }

    let a = adjustLevels(-30, 0, 150, { r: red, g: green, b: blue });
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};

let aprilAtTheDocks2 = new Scene({
    fileName: "./frames/april-at-the-docks-02b/april-at-the-docks-02b",
    gridScalar: 16,
    // Gros S italique
    // gridSeedName: "gridseed-wed-apr-04-2018-174600",
    // Gros S italique peaufiné
    // gridSeedName: "gridseed-thu-apr-05-2018-140942",
    // gridSeedName: "gridseed-wed-apr-04-2018-183131",
    // gridSeedName: "gridseed-wed-apr-04-2018-200014",
    // gridSeedName: "gridseed-wed-apr-04-2018-203428",
    // gridSeedName: "gridseed-thu-apr-05-2018-013601",

    // With fixedGridSize
    // gridSeedName: "gridseed-thu-apr-05-2018-015411",
    // Le plus beau "s"
    // gridSeedName: "gridseed-thu-apr-05-2018-144628",
    // gridSeedName: "gridseed-fri-apr-06-2018-161736",
    // gridSeedName: "gridseed-fri-apr-06-2018-175747",
    // fixedGridSize: { width: 145, height: 145 },
    // gridSeedName: "gridseed-sat-apr-07-2018-130357",
    // gridSeedName: "gridseed-sat-apr-07-2018-131303",
    // gridSeedName: "gridseed-sat-apr-07-2018-132011",
    // gridSeedName: "gridseed-sat-apr-07-2018-134126",
    // gridSeedName: "gridseed-sat-apr-07-2018-134439",
    // gridSeedName: "gridseed-sat-apr-07-2018-135146",
    // gridSeedName: "gridseed-sat-apr-07-2018-143624",
    // gridSeedName: "gridseed-sat-apr-07-2018-144154",
    // gridSeedName: "gridseed-sat-apr-07-2018-144459",
    // gridSeedName: "gridseed-sat-apr-07-2018-145202",
    // gridSeedName: "gridseed-sat-apr-07-2018-231422",
    // gridSeedName: "gridseed-sat-apr-07-2018-232009",
    // C
    // gridSeedName: "gridseed-sat-apr-07-2018-232948",

    // gridScalar: 8,
    // horizontalScalar: 16,
    // verticalScalar: 16,
    paletteName: "palette-thu-dec-21-2017-163412",
    paletteName: "palette-mon-dec-18-2017-010316",
    paletteName: "palette-fri-jan-12-2018-024639",
    paletteName: "palette-thu-apr-05-2018-143158",
    paletteName: "palette-thu-apr-05-2018-143252",
    paletteName: "palette-tue-dec-12-2017-141143",
    // paletteName: "palette-sun-mar-04-2018-163620",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

aprilAtTheDocks2.applyShapes = function() {
    this.ant = new Ant();
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // for (let i = 0; i < 25; i++) {
    //     let randomX = Math.floor(random(0, this.gridXAmount));
    //     let randomY = Math.floor(random(0, this.gridYAmount));
    //     this.setGridValue(randomX, randomY, 1);
    //     this.setAValue(randomX, randomY, 1);
    // }
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            var value = this.grid[oneDValue].state;
            if (value == 1) {
                scene.changes[oneDValue] = Math.random() * 10;
                scene.grid[oneDValue].changed = true;
            }
        }
    }
};

aprilAtTheDocks2.updateGrid = function() {
    for (let i = 0; i < 100000; i++) {
        this.ant.walk();
    }
    // let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    // let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    // for (var x = 0; x < xAmount; x++) {
    //     for (var y = 0; y < yAmount; y++) {
    //         var oneDValue = x + (y * xAmount);
    //         var value = this.grid[oneDValue].state;
    //         var previousChanged = this.grid[oneDValue].changed;
    //         var neighbors = this.calculateNeighbors(x, y);
    //         let changed = false;
    //         if ((value == 0) && (neighbors == 4)) {
    //             this.next[oneDValue] = { state: 1, changed: true, noAnt:  1};
    //             scene.changes[oneDValue] = scene.currentState * 0.5;
    //             changed = true;
    //         }
    //         // if (value == 1) {
    //         //     if (neighbors >= 3 || neighbors <= 2) {
    //         //         this.next[oneDValue] = { state: 0, changed: true };
    //         //         changed = true;
    //         //         this.incrementChanges(x, y);
    //         //     }
    //         // } else {
    //         //     if (neighbors == 3 || neighbors == 1) {
    //         //         this.next[oneDValue] = { state: 1, changed: true };
    //         //         changed = true;
    //         //         this.incrementChanges(x, y);
    //         //     }
    //         // }
    //         if (!changed) {
    //             this.next[oneDValue] = { state: value, changed: previousChanged };
    //         }
    //     }
    // }
    // for (var i = 0; i < this.grid.length; i++) {
    //     this.grid[i] = this.next[i];
    // }
    this.currentState++;
};

aprilAtTheDocks2.getColor = function(oneDValue, optionalArray) {
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
    let a = adjustLevels(0, 0, 50, { r: red, g: green, b: blue });
    return color(a.r, a.g, a.b);
};


let Ant = function() {
    let xAmount = (scene.fixedGridSize) ? scene.fixedGridSize.width : scene.gridXAmount;
    this.x = 0;
    this.y = 0;
    this.walk = function() {
        let oldNeighbors = scene.calculateNeighbors(this.x, this.y);
        if (scene.getGridCell(this.x, this.y).state == 1 || oldNeighbors) {
            let newStart = this.pickNewStart();
            this.x = newStart.x;
            this.y = newStart.y;
        } else {
            let newX = this.x + Math.round((Math.random() * 2) - 1);
            let newY = this.y + Math.round((Math.random() * 2) - 1);
            if (scene.getGridCell(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
            let neighbors = scene.calculateNeighbors(newX, newY);
            if (neighbors) {
                scene.setGridValue(newX, newY, 1);
                // scene.setGridValue(newX, newY + 1, 1);
                var oneDValue = newX + (newY * xAmount);
                scene.changes[oneDValue] = scene.currentState * 0.1;
                // scene.incrementChanges(newX, newY);
                let n = this.pickNewStart();
                // let tries = 0;
                // let newNeighbors = scene.calculateNeighbors(n.x, n.y);
                // while (newNeighbors) {
                //     n = this.pickNewStart();
                //     newNeighbors = scene.calculateNeighbors(n.x, n.y);
                // }
                // while (scene.getGridCell(n.x, n.y).state == 1) {
                //     console.log(scene.currentState + ", picking");
                //     n = this.pickNewStart();
                //     tries++;
                //     if (tries > 10000) {
                //         noLoop();
                //     }
                // }
                this.x = n.x;
                this.y = n.y;
            }
        }
    };
    this.pickNewStart = function() {
        let xAmount = (scene.fixedGridSize) ? scene.fixedGridSize.width : scene.gridXAmount;
        let yAmount = (scene.fixedGridSize) ? scene.fixedGridSize.height : scene.gridYAmount;
        let x, y;
        let horizontal = (random() <  0.5) ? true : false;
        if (horizontal) {
            x = Math.floor(random() * xAmount);
            y = (random() < 0.5) ? 0 : yAmount - 1;
        } else {
            x = (random() < 0.5) ? 0 : xAmount - 1;
            y = Math.floor(random() * yAmount);
        }
        // y = 0;
        // x = Math.floor(random() * scene.gridXAmount);
        // x = Math.floor(random() * xAmount);
        // y = Math.floor(random() * yAmount);
        return { x: x, y: y };
    };
};

let aprilAtTheDocks3 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-thu-dec-21-2017-163412",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

aprilAtTheDocks3.applyShapes = function() {
    this.ant = new Ant();
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // for (let i = 0; i < 25; i++) {
    //     let randomX = Math.floor(random(0, this.gridXAmount));
    //     let randomY = Math.floor(random(0, this.gridYAmount));
    //     this.setGridValue(randomX, randomY, 1);
    //     this.setAValue(randomX, randomY, 1);
    // }
};


aprilAtTheDocks3.updateGrid = function() {
    for (let i = 0; i < 100000; i++) {
        this.ant.walk();
    }
    // let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    // let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    // for (var x = 0; x < xAmount; x++) {
    //     for (var y = 0; y < yAmount; y++) {
    //         var oneDValue = x + (y * xAmount);
    //         var value = this.grid[oneDValue].state;
    //         var previousChanged = this.grid[oneDValue].changed;
    //         var neighbors = this.calculateNeighbors(x, y);
    //         let changed = false;
    //         if ((value == 0) && (neighbors == 4)) {
    //             this.next[oneDValue] = { state: 1, changed: true, noAnt:  1};
    //             scene.changes[oneDValue] = scene.currentState * 0.5;
    //             changed = true;
    //         }
    //         // if (value == 1) {
    //         //     if (neighbors >= 3 || neighbors <= 2) {
    //         //         this.next[oneDValue] = { state: 0, changed: true };
    //         //         changed = true;
    //         //         this.incrementChanges(x, y);
    //         //     }
    //         // } else {
    //         //     if (neighbors == 3 || neighbors == 1) {
    //         //         this.next[oneDValue] = { state: 1, changed: true };
    //         //         changed = true;
    //         //         this.incrementChanges(x, y);
    //         //     }
    //         // }
    //         if (!changed) {
    //             this.next[oneDValue] = { state: value, changed: previousChanged };
    //         }
    //     }
    // }
    // for (var i = 0; i < this.grid.length; i++) {
    //     this.grid[i] = this.next[i];
    // }
    this.currentState++;
};

//-------------------------------------------------------------

let warmthOfApril = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    if (Math.random() <= 0.9) {
        let y = map(this.currentState, 0, 200, this.gridYAmount - 0, 0);
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
                if (this.currentState % 3 == 0) {
                    if (neighborBottom <= 3 && neighborTop && neighborLeft) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.5;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 3 && neighborRight) {
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

warmthOfApril.calculateNeighbors = function(x, y) {
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
warmthOfApril.update = function() {
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
warmthOfApril.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril2 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril2.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril2.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    if (Math.random() <= 0.9) {
        let y = map(this.currentState, 0, 100, this.gridYAmount - 0, 0);
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
                if (this.currentState % 2 == 0) {
                    if (neighborBottom <= 3 && neighborTopLeft && neighborTop) {
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

warmthOfApril2.calculateNeighbors = function(x, y) {
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
warmthOfApril2.update = function() {
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
warmthOfApril2.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


//-------------------------------------------------------------

let warmthOfApril3 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    gridSeedName: "gridseed-sat-apr-28-2018-011300",
    gridSeedName: "gridseed-sat-apr-28-2018-011705",
    gridSeedName: "gridseed-sat-apr-28-2018-011819",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril3.updateGrid = function() {
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

warmthOfApril3.calculateNeighbors = function(x, y) {
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
warmthOfApril3.update = function() {
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
warmthOfApril3.getColor = function(oneDValue, optionalArray) {
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

//-------------------------------------------------------------

let warmthOfApril4 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",

    // Aussi beau avec warmthOfApril4
    // palette-tue-apr-24-2018-031103
    // palette-tue-apr-24-2018-032249
    paletteName: "palette-tue-apr-24-2018-032249",

    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058
    // paletteName: "palette-tue-dec-12-2017-220058",
    // palette-tue-apr-24-2018-181237

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

warmthOfApril4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril4.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 3; i++) {
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
                    if (neighborBottom == 1 && neighborTop == 1) {
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

warmthOfApril4.calculateNeighbors = function(x, y) {
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
warmthOfApril4.update = function() {
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
warmthOfApril4.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril5 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril5.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 || neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighbors <= 4 && neighbors >= 1) {
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

warmthOfApril5.calculateNeighbors = function(x, y) {
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
warmthOfApril5.update = function() {
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
warmthOfApril5.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 50, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


//-------------------------------------------------------------

let warmthOfApril6 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril6.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril6.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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

warmthOfApril6.calculateNeighbors = function(x, y) {
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
warmthOfApril6.update = function() {
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
warmthOfApril6.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 50, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril7 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",
    paletteName: "palette-fri-jan-12-2018-034139",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril7.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril7.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 2; i++) {
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
                if (neighborBottom <= 2 || neighbors == 3 ||  neighbors == 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborRight && neighborLeft && neighborTop) {
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

warmthOfApril7.calculateNeighbors = function(x, y) {
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
warmthOfApril7.update = function() {
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
warmthOfApril7.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 10, blueLerp);
    a.b = lerp(a.b, 25, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril8 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",
    paletteName: "palette-fri-jan-12-2018-034139",

    // Beau avec warmthOfApril8 :
    // palette-tue-apr-24-2018-025125
    // palette-tue-apr-24-2018-025306

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril8.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril8.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 2; i++) {
        if (Math.random() <= 0.5) {
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
                if (neighbors == 3 || neighbors == 2) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop && neighborRight && neighborLeft) {
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

warmthOfApril8.calculateNeighbors = function(x, y) {
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
warmthOfApril8.update = function() {
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
warmthOfApril8.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 10, blueLerp);
    a.b = lerp(a.b, 25, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


//-------------------------------------------------------------

let warmthOfApril9 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",
    paletteName: "palette-sun-mar-04-2018-042627",
    gridSeedName: "gridseed-sat-apr-28-2018-015857",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril9.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril9.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                if (neighbors == 0 || neighbors == 1 || neighbors == 2 || neighbors == 3) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighbors <= 4 && neighbors >= 1) {
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

warmthOfApril9.calculateNeighbors = function(x, y) {
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
warmthOfApril9.update = function() {
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
warmthOfApril9.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 70, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 70, 80, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 50, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 250, { r: a.r, g: a.g, b: a.b });
    // a = adjustLevels(0, 0, 250, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril10 = new Scene({
    fileName: "./frames/warmth-of-april-10/warmth-of-april-10",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",
    paletteName: "palette-sat-dec-16-2017-010605",
    paletteName: "palette-sun-apr-29-2018-135522",
    // gridSeedName: "gridseed-sun-apr-29-2018-135650",
    gridSeedName: "gridseed-sun-apr-29-2018-141131",

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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril10.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril10.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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

warmthOfApril10.calculateNeighbors = function(x, y) {
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
warmthOfApril10.update = function() {
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
warmthOfApril10.getColor = function(oneDValue, optionalArray) {
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
    a.r = lerp(a.r, 0, blueLerp);
    a.g = lerp(a.g, 50, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};


//-------------------------------------------------------------

let warmthOfApril11 = new Scene({
    fileName: "./frames/warmth-of-april-11/warmth-of-april-11",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfApril11.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);
    let startX = (this.gridXAmount / 2) - 5;
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

warmthOfApril11.updateGrid = function() {
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

warmthOfApril11.calculateNeighbors = function(x, y) {
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
warmthOfApril11.update = function() {
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
warmthOfApril11.getColor = function(oneDValue, optionalArray) {
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
    a = adjustLevels(0, 150, 250, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};

//-------------------------------------------------------------

let warmthOfApril4b = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-jan-11-2018-161632",
    paletteName: "palette-sat-mar-17-2018-184849",
    paletteName: "palette-mon-dec-18-2017-005144",
    paletteName: "palette-thu-mar-22-2018-010754",
    paletteName: "palette-sun-mar-18-2018-152840",
    paletteName: "palette-mon-mar-19-2018-020051",

    // Aussi beau avec warmthOfApril4
    // palette-tue-apr-24-2018-031103
    // palette-tue-apr-24-2018-032249
    paletteName: "palette-tue-apr-24-2018-032249",
    paletteName: "palette-tue-dec-12-2017-131801",
    // Matin rose
    // paletteName: "palette-thu-jan-11-2018-172555",
    // Vert et rose
    paletteName: "palette-thu-may-03-2018-033923",

    // Jaune, orange, rouge cerise foncé.
    // paletteName: "palette-fri-may-04-2018-010806",


    gridSeedName: "gridseed-thu-may-03-2018-024727",
    // gridSeedName: "gridseed-thu-may-03-2018-025248",

    // nightsOfMarch22 aussi très beau avec :
    // palette-sat-dec-16-2017-142619
    // palette-tue-dec-19-2017-172500
    // palette-tue-dec-12-2017-220058
    // paletteName: "palette-tue-dec-12-2017-220058",
    // palette-tue-apr-24-2018-181237

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

warmthOfApril4b.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

};

warmthOfApril4b.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (let i = 0; i < 3; i++) {
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
                    this.changes[oneDValue] = this.currentState * 0.25;
                    changed = true;
                }
            } else {
                if (this.currentState % 10 !== 0) {
                    if (neighborBottom == 1 && neighborTop == 1) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.25;
                        changed = true;
                    }
                } else {
                    if (neighborBottom <= 3 && neighborTopRight && neighborTop) {
                        this.next[oneDValue] = { state: 1, changed: true };
                        this.changes[oneDValue] = this.currentState * 0.25;
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

warmthOfApril4b.calculateNeighbors = function(x, y) {
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
warmthOfApril4b.update = function() {
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
warmthOfApril4b.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 40, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 40, 70, 0, 1);
    blackLerp = constrain(blackLerp, 0, 1);
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    // let a = adjustLevels(0, 0, 150, { r: red, g: green, b: blue });
    let a = { r: red, g: green, b: blue };
    a.r = lerp(a.r, 50, blueLerp);
    a.g = lerp(a.g, 0, blueLerp);
    a.b = lerp(a.b, 15, blueLerp);
    a.r = lerp(a.r, 0, blackLerp);
    a.g = lerp(a.g, 0, blackLerp);
    a.b = lerp(a.b, 0, blackLerp);
    a = adjustLevels(0, 60, 150, { r: a.r, g: a.g, b: a.b });
    return color(a.r, a.g, a.b);
};




//-------------------------------------------------------------

let warmthOfMay = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


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
                if (neighbors == 3 || neighbors == 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 3 && neighbors <= 2 && neighbors >= 1) {
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

warmthOfMay.calculateNeighbors = function(x, y) {
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

warmthOfMay.update = function() {
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
warmthOfMay.getColor = function(oneDValue, optionalArray) {
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

let warmthOfMay2 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay2.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay2.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                if (neighborTop <= 3 && neighborBottom >= 2 && neighbors >= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 3 && neighborLeft && neighbors >= 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
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

warmthOfMay2.calculateNeighbors = function(x, y) {
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

warmthOfMay2.update = function() {
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
warmthOfMay2.getColorz = function(oneDValue, optionalArray) {
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

let warmthOfMay3 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-dec-21-2017-162500",
    paletteName: "palette-sun-dec-24-2017-140250",
    paletteName: "palette-sun-mar-04-2018-045707",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay3.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay3.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
    //         let y = map(this.currentState, 0, 700, this.gridYAmount, 0);
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
    //                 this.changes[oneDValue] = this.currentState * 0.25;
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
                if (neighborTop <= 2 && neighborBottom >= 2 && neighbors >= 1) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop && neighbors >= 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
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

warmthOfMay3.calculateNeighbors = function(x, y) {
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

warmthOfMay3.update = function() {
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
warmthOfMay3.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 350, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 350, 400, 0, 1);
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

let warmthOfMay4 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-dec-21-2017-162500",
    paletteName: "palette-sun-dec-24-2017-140250",
    paletteName: "palette-sun-mar-04-2018-045707",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay4.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay4.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
    //         let y = map(this.currentState, 0, 700, this.gridYAmount, 0);
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
    //                 this.changes[oneDValue] = this.currentState * 0.25;
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
                if (neighborTop <= 2 && neighborBottom >= 2 && neighbors >= 4) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighborTop && neighbors >= 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
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

warmthOfMay4.calculateNeighbors = function(x, y) {
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

warmthOfMay4.update = function() {
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
warmthOfMay4.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 350, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 350, 400, 0, 1);
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

let warmthOfMay5 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-thu-dec-21-2017-162500",
    paletteName: "palette-sun-dec-24-2017-140250",
    paletteName: "palette-sun-mar-04-2018-045707",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay5.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay5.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
    //         let y = map(this.currentState, 0, 700, this.gridYAmount, 0);
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
    //                 this.changes[oneDValue] = this.currentState * 0.25;
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
                if (neighborTop <= 1 && neighborBottom >= 2 && neighbors >= 4) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 1 && neighborTop && neighbors >= 1) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.25;
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

warmthOfMay5.calculateNeighbors = function(x, y) {
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

warmthOfMay5.update = function() {
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
warmthOfMay5.getColor = function(oneDValue, optionalArray) {
    let c;
    if (optionalArray) {
        c = optionalArray[oneDValue];
    } else {
        c = this.changes[oneDValue];
    }
    let blueLerp = map(c, 0, 350, 0, 1);
    blueLerp = constrain(blueLerp, 0, 1);
    let blackLerp = map(c, 350, 400, 0, 1);
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

let warmthOfMay6 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay6.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay6.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                // if ((neighborBottom <= 3 && neighbors) || ((neighborLeft >= 4 && neighborRight >= 4))) {
                if (neighborBottom <= 4 && neighbors) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 1 && neighbors) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
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

warmthOfMay6.calculateNeighbors = function(x, y) {
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

warmthOfMay6.update = function() {
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
warmthOfMay6.getColorz = function(oneDValue, optionalArray) {
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

let warmthOfMay7 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay7.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay7.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                // if ((neighborBottom <= 3 && neighbors) || ((neighborLeft >= 4 && neighborRight >= 4))) {
                if (neighborTop <= 4 && neighbors) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 1 && neighbors) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
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

warmthOfMay7.calculateNeighbors = function(x, y) {
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

warmthOfMay7.update = function() {
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
warmthOfMay7.getColorz = function(oneDValue, optionalArray) {
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

let warmthOfMay8 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay8.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay8.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                // if ((neighborBottom <= 3 && neighbors) || ((neighborLeft >= 4 && neighborRight >= 4))) {
                if (neighborTop <= 4 && neighbors) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 2 && neighbors) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
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

warmthOfMay8.calculateNeighbors = function(x, y) {
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

warmthOfMay8.update = function() {
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
warmthOfMay8.getColorz = function(oneDValue, optionalArray) {
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

let warmthOfMay9 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-sat-mar-17-2018-184849",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay9.applyShapes = function() {
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setGridValue(0, 0, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay9.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                // if ((neighborBottom <= 3 && neighbors) || ((neighborLeft >= 4 && neighborRight >= 4))) {
                if (neighborTop <= 4 && neighborLeft && neighbors) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
                    changed = true;
                }
            } else {
                if (neighborBottom <= 4 && neighborLeft && neighbors) {
                    this.next[oneDValue] = { state: 1, changed: true };
                    this.changes[oneDValue] = this.currentState * 1;
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

warmthOfMay9.calculateNeighbors = function(x, y) {
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

warmthOfMay9.update = function() {
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
warmthOfMay9.getColorz = function(oneDValue, optionalArray) {
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

let warmthOfMay10 = new Scene({
    fileName: "./frames/nights-of-march-22-levels/nights-of-march-22",
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
    paletteName: "palette-sat-mar-17-2018-184849",
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
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

warmthOfMay10.applyShapes = function() {
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setGridValue(0, 0, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount / 2 + 1, this.gridYAmount / 2 + 1, 1);
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2 + 1, 1);

    // this.setGridValue(this.gridXAmount / 2, 0, 1);
    // this.setGridValue(0, this.gridYAmount / 2, 1);
    // this.setGridValue(this.gridXAmount * 0.22, this.gridYAmount * 0.12, 1);
    // this.setGridValue(this.gridXAmount * 0.8, this.gridYAmount * 0.5, 1);

    // let startX = (this.gridXAmount / 2) - 5;
    // let endX = startX + 10;
    // let startY = 30;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }

    // startX = (this.gridXAmount / 6);
    // endX = startX + 6;
    // startY = this.gridYAmount * 0.65;
    // for (let x = startX; x < endX; x++) {
    //     for (let y = startY; y <= startY + 1; y++) {
    //         this.setGridValue(x, y, 1);
    //     }
    // }
};

warmthOfMay10.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;


    // if (this.currentState == 50) {
    //     let startX = (this.gridXAmount / 7);
    //     let endX = startX + 6;
    //     let startY = this.gridYAmount * 0.65;
    //     for (let x = startX; x < endX; x++) {
    //         for (let y = startY; y <= startY + 1; y++) {
    //             this.setGridValue(x, y, 1);
    //         }
    //     }
    // }
    // if (this.currentState == 105) {
    //     this.setGridValue(200, 120, 1);
    //     this.setGridValue(201, 120, 1);
    // }


    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.6) {
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
                    // this.setGridValue(x + i, y + yModifier, 1);
                    // this.changes[oneDValue] = this.currentState * this.gradientSpeed;
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
                // if ((neighborBottom <= 3 && neighbors) || ((neighborLeft >= 4 && neighborRight >= 4))) {
                if ((neighborTop <= 3 || neighborBottom <= 3) && neighbors) {
                    this.next[oneDValue] = { state: 0, changed: true };
                    this.changes[oneDValue] = this.currentState * 0.5;
                    changed = true;
                }
            } else {
                if ((neighborTop <= 3 && neighborBottom <= 3) && neighbors) {
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

warmthOfMay10.calculateNeighbors = function(x, y) {
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

warmthOfMay10.update = function() {
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
warmthOfMay10.getColorz = function(oneDValue, optionalArray) {
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

// scene = warmthOfApril4b;