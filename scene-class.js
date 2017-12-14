class Scene {
    constructor(input) {
        // gridScalar = 1 means that the grid is 16 * 9.
        this.gridScalar = input.gridScalar || 8;
        this.paletteName = input.paletteName || null;
        this.speedModulo = input.speedModulo || 1;
        this.tileWidth = width / gridXAmount - 1 / gridXAmount;
        this.grid = [];
        this.changes = [];
        this.initialized = false;
    }
    initialize() {
        for (var i = 0; i < gridXAmount * gridYAmount; i++) {
            this.grid.push({ state: 0, changed: true });
            this.changes.push(0);
        }
        // initialize() is only called when the palettes are loaded,
        // so we can now define the scene's palette.
        this.palette = this.fetchPalette(this.paletteName);
        this.applyShapes();
        // This counter is incremented each time the Scene is hit by the x-sheet,
        // and a modulo function controls at what frequency the scene upgrades its grid.
        this.counter = 0;
        this.initialized = true;
    }
    run() {
        if (this.counter % this.speedModulo == 0) {
            this.updateGrid();
            if (mode == "simple") {
                displayGridSimple();
            } else if (mode == "grainy") {
                displayGridGrainy();
            }
        }
        if (mode == "grainy") {
            displayGridGrainy();
        }
        this.counter++;
    }
    updateGrid() {

    }
    displayGridSimple() {

    }

    displayGridGrainy() {

    }
}