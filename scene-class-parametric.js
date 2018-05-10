Scene.prototype.setParameter = function(x, y, param, value) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    if (this.grid[oneDValue]) {
        this.grid[oneDValue][param] = value;
        this.grid[oneDValue].changed = true;
    }
};

Scene.prototype.getParameter = function(x, y, param) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    return this.grid[oneDValue] ? this.grid[oneDValue][param] : 0;
};

Scene.prototype.getNeighbor = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
    if (this.grid[oneDValue]) {
        return this.grid[oneDValue];
    } else {
        return { state: 1, changed: false, a: 0 };
    }
};

Scene.prototype.calculateParametricNeighbors = function(x, y, param) {
    var sum = 0;
    sum += this.getParameter(x - 1, y - 1, param);
    sum += this.getParameter(x, y - 1, param);
    sum += this.getParameter(x + 1, y - 1, param);
    sum += this.getParameter(x - 1, y, param);
    sum += this.getParameter(x + 1, y, param);
    sum += this.getParameter(x - 1, y + 1, param);
    sum += this.getParameter(x, y + 1, param);
    sum += this.getParameter(x + 1, y + 1, param);
    return sum;
};