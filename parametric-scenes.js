let windyMay = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = (neighborsA + cell.a) / 9;
            let changed = false;
            if (a > 0.009) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            } else if (cell.state && a > 0.9) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay2 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay2.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 150; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay2.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = (neighborsA + cell.a) / 9;
            let changed = false;
            if (cell.state && a <= 0.001) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            } else if (!cell.state && a > 0.001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            }
            // else {
            //     // console.log("This never happens!");
            //     this.next[oneDValue] = {
            //         state: 0,
            //         changed: true,
            //         a: a
            //     };
            //     this.changes[oneDValue] = this.currentState;
            //     changed = true;
            // }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay3 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay3.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 150; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay3.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = (neighborsA + cell.a) / 9;
            let changed = false;
            if (cell.state && a <= 0.0005) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            } else if (!cell.state && a > 0.0001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = this.currentState;
                changed = true;
            }
            // else {
            //     // console.log("This never happens!");
            //     this.next[oneDValue] = {
            //         state: 0,
            //         changed: true,
            //         a: a
            //     };
            //     this.changes[oneDValue] = this.currentState;
            //     changed = true;
            // }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay4 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay4.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 150; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay4.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = (neighborsA + cell.a) / 9;
            let changed = false;
            if (cell.state && a <= 0.0001) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = a * 100000;
                changed = true;
            } else if (!cell.state && a > 0.0001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a * 0.1
                };
                this.changes[oneDValue] = a * 100000;
                changed = true;
            }
            // else {
            //     // console.log("This never happens!");
            //     this.next[oneDValue] = {
            //         state: 0,
            //         changed: true,
            //         a: a
            //     };
            //     this.changes[oneDValue] = this.currentState;
            //     changed = true;
            // }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay5 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay5.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 50; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay5.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (topA >= 0.001 || bottomA >= 0.001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = a * 10000;
                changed = true;
            } else if (leftA >= 0.01 || rightA >= 0.01) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = a * 10000;
                changed = true;
            }
            // else {
            //     // console.log("This never happens!");
            //     this.next[oneDValue] = {
            //         state: 0,
            //         changed: true,
            //         a: a
            //     };
            //     this.changes[oneDValue] = this.currentState;
            //     changed = true;
            // }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay6 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay6.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay6.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (topA >= 0.02 && !cell.state) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = a * 10000;
                changed = true;
            } else if (leftA >= 0.02 && cell.state) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a
                };
                this.changes[oneDValue] = a * 10000;
                changed = true;
            }
            // else {
            //     // console.log("This never happens!");
            //     this.next[oneDValue] = {
            //         state: 0,
            //         changed: true,
            //         a: a
            //     };
            //     this.changes[oneDValue] = this.currentState;
            //     changed = true;
            // }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay7 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay7.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay7.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (!cell.state) {
                if (leftA > 0.1 && rightA < 0.1) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 0.1 && bottomA < 0.1) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay8 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay8.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay8.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (!cell.state) {
                if (leftA > 0.1 && rightA < 0.1) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 0.1 && bottomA < 0.1) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay9 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay9.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay9.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (!cell.state) {
                if (leftA > 1 / 9 && rightA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 1 / 9 && bottomA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay10 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay10.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay10.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (cell.state) {
                if (leftA > 1 / 9 && rightA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 1 / 9 && bottomA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay11 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay11.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay11.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (cell.state) {
                if (leftA > 3 / 9 && bottomA < 3 / 9) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 3 / 9 && rightA < 3 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 4.5
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay12 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay12.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 3, this.gridYAmount / 4, 1);
    this.setParameter(this.gridXAmount / 3, this.gridYAmount / 4, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 50; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay12.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                    this.setParameter(x + i, y + yModifier, "a", 1);
                    this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (cell.state) {
                if (bottomA > 1 / 9 && topA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (bottomA < 1 / 9 && topA > 1 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 6
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};


let windyMay13 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay13.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 4, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 4, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 50; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay13.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                // if (this.changes[oneDValue] == 0) {
                //     this.setGridValue(x + i, y + yModifier, 1);
                //     this.setParameter(x + i, y + yModifier, "a", 1);
                //     this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                // }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            if (cell.state) {
                if (bottomA > 1 / 9 || topA < 1 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: 0
                    };
                    // this.changes[oneDValue] = a * 0.01;
                    changed = true;
                }
            } else {
                if (bottomA < 1 / 9 && topA > 1 / 9) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 6
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay14 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay14.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay14.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                // if (this.changes[oneDValue] == 0) {
                //     this.setGridValue(x + i, y + yModifier, 1);
                //     this.setParameter(x + i, y + yModifier, "a", 1);
                //     this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                // }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.01));
            limit = 0.01;
            if (cell.state) {
                if (bottomA > limit || topA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (bottomA > limit * 2 && topA > limit * 2) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 5
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};



let windyMay15 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay15.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay15.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                // if (this.changes[oneDValue] == 0) {
                //     this.setGridValue(x + i, y + yModifier, 1);
                //     this.setParameter(x + i, y + yModifier, "a", 1);
                //     this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                // }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.01));
            limit = 0.001;
            if (cell.state) {
                if (bottomA < limit && topA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (leftA < limit && rightA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay15.getColor = function(oneDValue, optionalArray) {
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


let windyMay16 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay16.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * this.gridXAmount;
        let y = Math.random() * this.gridYAmount;
        this.setGridValue(x, y, 1);
        this.setParameter(x, y, "a", 1);
    }
};

windyMay16.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                // if (this.changes[oneDValue] == 0) {
                //     this.setGridValue(x + i, y + yModifier, 1);
                //     this.setParameter(x + i, y + yModifier, "a", 1);
                //     this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                // }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.01));
            limit = 0.01;
            if (cell.state) {
                if (bottomA < limit && topA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (leftA < limit && rightA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay16.getColor = function(oneDValue, optionalArray) {
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


let windyMay17 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay17.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay17.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                // if (this.changes[oneDValue] == 0) {
                //     this.setGridValue(x + i, y + yModifier, 1);
                //     this.setParameter(x + i, y + yModifier, "a", 1);
                //     this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                // }
                // this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.01)) * 0.0001;
            // limit = 0.001;
            if (cell.state) {
                if (bottomA < limit && topA > limit) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (leftA < limit && rightA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 2
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay17.getColors = function(oneDValue, optionalArray) {
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


let windyMay18 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay18.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay18.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                    this.setParameter(x + i, y + yModifier, "a", 1);
                    this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.01)) * 0.01;
            // limit = 0.001;
            if (cell.state) {
                if (leftA < limit && rightA > limit) {

                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (bottomA < limit && topA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 3
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay18.getColors = function(oneDValue, optionalArray) {
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

let windyMay19 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay19.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    // this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay19.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    for (let i = 0; i < 1; i++) {
        if (Math.random() <= 0.1) {
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
                    this.setParameter(x + i, y + yModifier, "a", 1);
                    this.changes[oneDValue] = this.currentState * this.gradientSpeed;
                }
                this.setGridValue(x + i, y + yModifier, 1);
            }
        }
    }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 1)) * 0.1;
            // limit = 0.001;
            if (cell.state) {
                if (leftA < limit && rightA > limit) {

                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (bottomA < limit && topA > limit) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 1
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay19.getColors = function(oneDValue, optionalArray) {
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


let windyMay20 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay20.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay20.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.1)) * 0.1;
            limit = 0.01;
            if (cell.state) {
                if (bottomA > 0.5 && bottomA < 1) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 0.01 && topA < 0.5) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 5
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay20.getColors = function(oneDValue, optionalArray) {
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


let windyMay21 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay21.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay21.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;
            let limit = Math.abs(Math.sin(scene.currentState * 0.1)) * 0.1;
            limit = 0.01;
            if (cell.state) {
                if (bottomA > 0.5 && bottomA < 1) {
                    this.next[oneDValue] = {
                        state: 0,
                        changed: true,
                        a: 0
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            } else {
                if (topA > 0.01 && topA < 0.5) {
                    this.next[oneDValue] = {
                        state: 1,
                        changed: true,
                        a: a * 10
                    };
                    this.changes[oneDValue] = scene.currentState * 0.1;
                    changed = true;
                }
            }
            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay21.getColors = function(oneDValue, optionalArray) {
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


let windyMay22 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay22.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay22.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;

            if (bottomA > 0.5 && bottomA < 1) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = scene.currentState * 0.1;
                changed = true;
            } else if (topA > 0.001 && topA < 0.5) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a * 5
                };
                this.changes[oneDValue] = scene.currentState * 0.1;
                changed = true;
            }

            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay22.getColors = function(oneDValue, optionalArray) {
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


let windyMay23 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay23.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay23.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;

            if (bottomA > 0.1 || topA > 0.1) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = scene.currentState * 0.1;
                changed = true;
            } else if (topA > 0.001 && topA < 0.1) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a * 10
                };
                this.changes[oneDValue] = scene.currentState * 0.1;
                changed = true;
            }

            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay23.getColors = function(oneDValue, optionalArray) {
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


let windyMay24 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    paletteName: "palette-sun-mar-18-2018-205032",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay24.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay24.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;

            if (bottomA > 1 && topA > 1) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: 0
                };
                this.changes[oneDValue] = a * 50;
                changed = true;
            } else if (topA > 0.001 && bottomA > 0.001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a + 0.01
                };
                this.changes[oneDValue] = a * 50;
                changed = true;
            }

            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay24.getColors = function(oneDValue, optionalArray) {
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


let windyMay25 = new Scene({
    fileName: "./frames/inner-january-14/inner-january-14",
    gridScalar: 16,
    paletteName: "palette-wed-apr-04-2018-031607",
    paletteName: "palette-tue-mar-20-2018-015216",
    paletteName: "palette-wed-mar-28-2018-003835",
    paletteName: "palette-tue-dec-12-2017-141143",
    paletteName: "palette-sun-mar-04-2018-042627",
    paletteName: "palette-sun-dec-24-2017-134749",
    paletteName: "palette-sat-mar-17-2018-034609",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-dec-21-2017-162500",
    paletteName: "palette-sun-mar-18-2018-205032",
    paletteName: "palette-thu-apr-05-2018-143252",
    speedModulo: 1,
    zoom: 1,
    dotPerTile: 3500 / 16,
    maxSteps: 129
});

windyMay25.applyShapes = function() {
    // Here, we are assigning two continous parameters as properties of each cell.
    // A cell has three states : one called 'state' (this is not so elegant),
    // one called 'a' and one called 'b'.
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i].a = 0;
        // this.grid[i].b = 0;
    }
    this.setGridValue(this.gridXAmount / 2, this.gridYAmount / 2, 1);
    this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "a", 1);
    // // this.setParameter(this.gridXAmount / 2, this.gridYAmount / 2, "b", 1);
    // for (let i = 0; i < 10; i++) {
    //     let x = Math.random() * this.gridXAmount;
    //     let y = Math.random() * this.gridYAmount;
    //     this.setGridValue(x, y, 1);
    //     this.setParameter(x, y, "a", 1);
    // }
};

windyMay25.updateGrid = function() {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;

    // for (let i = 0; i < 1; i++) {
    //     if (Math.random() <= 0.1) {
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
    //                 this.setParameter(x + i, y + yModifier, "a", 1);
    //                 this.changes[oneDValue] = this.currentState * this.gradientSpeed;
    //             }
    //             this.setGridValue(x + i, y + yModifier, 1);
    //         }
    //     }
    // }


    for (var x = 0; x < xAmount; x++) {
        for (var y = 0; y < yAmount; y++) {
            var oneDValue = x + (y * xAmount);
            let cell = this.grid[oneDValue];
            let a;
            let neighborsA = this.calculateParametricNeighbors(x, y, "a");
            a = ((neighborsA + cell.a) / 9);
            let topA = this.getParameter(x, y - 1, "a");
            let bottomA = this.getParameter(x, y + 1, "a");
            let leftA = this.getParameter(x - 1, y, "a");
            let rightA = this.getParameter(x + 1, y, "a");
            let changed = false;

            if (bottomA > 0.5 || topA > 0.5) {
                this.next[oneDValue] = {
                    state: 0,
                    changed: true,
                    a: a * 0.001
                };
                this.changes[oneDValue] = a * 50;
                changed = true;
            } else if (topA > 0.001 || bottomA > 0.001) {
                this.next[oneDValue] = {
                    state: 1,
                    changed: true,
                    a: a * 1.1
                };
                this.changes[oneDValue] = a * 50;
                changed = true;
            }

            if (!changed) {
                this.next[oneDValue] = { state: cell.state, changed: false, a: a };
            }
        }
    }
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = this.next[i];
    }
    this.currentState++;
};

windyMay25.getColors = function(oneDValue, optionalArray) {
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

// scene = windyMay25;