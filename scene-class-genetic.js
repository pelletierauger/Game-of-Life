Scene.prototype.getNeighborhood = function(x, y) {
    let xAmount = (this.fixedGridSize) ? this.fixedGridSize.width : this.gridXAmount;
    let yAmount = (this.fixedGridSize) ? this.fixedGridSize.height : this.gridYAmount;
    let up = (y > 0) ? y - 1 : yAmount - 1;
    let down = (y < yAmount - 1) ? y + 1 : 0;
    let left = (x > 0) ? x - 1 : xAmount - 1;
    let right = (x < xAmount - 1) ? x + 1 : 0;
    let neighborhood = "";
    neighborhood += this.getParameter(left, up, "geneticState");
    neighborhood += this.getParameter(x, up, "geneticState");
    neighborhood += this.getParameter(right, up, "geneticState");
    neighborhood += this.getParameter(right, y, "geneticState");
    neighborhood += this.getParameter(right, down, "geneticState");
    neighborhood += this.getParameter(x, down, "geneticState");
    neighborhood += this.getParameter(left, down, "geneticState");
    neighborhood += this.getParameter(left, y, "geneticState");
    neighborhood += this.getParameter(x, y, "geneticState");
    return neighborhood;
};

Scene.prototype.createRandomRules = function() {
    let b = this.geneticBase;
    this.geneticRules = "";
    let rulesLength = Math.pow(b, 9);
    for (let i = 0; i < rulesLength; i++) {
        this.geneticRules += Math.floor(Math.random() * b);
    }
};

Scene.prototype.applyRules = function(r) {
    // This receives a number in base this.geneticBase, 
    // as a string, and returns a decimal number, as an integer.
    let s = r;
    let b = this.geneticBase;
    let ns = "";
    for (let i = s.length - 1; i >= 0; i--) {
        ns += s[i];
    }
    // console.log('ns : ' + ns);
    let decimal = 0;
    for (let i = 0; i <= ns.length - 1; i++) {
        decimal += parseInt(ns[i]) * Math.pow(b, i);
        // console.log(ns[i], parseInt(ns[i]) * Math.pow(b, i));
    }
    return this.geneticRules[decimal];
};

Scene.prototype.reInitialize = function() {

};


Scene.prototype.mutateRules = function() {
    this.lastRules = this.geneticRules;
    let r = Math.floor(Math.random() * this.geneticRules.length);
    for (let i = 0; i < this.geneticRules.length; i++) {
        if (Math.random() < 0.1) {
            // let oldS = this.geneticBase;
            let newS = "";
            for (let t = 0; t < this.geneticRules.length; t++) {
                if (t !== i) {
                    newS += this.geneticRules[t];
                } else {
                    newS += Math.round(Math.random());
                }
            }
            this.geneticRules = newS;
            // this.geneticBase[i] = Math.round(Math.random());
        }
    }
    this.applyShapes();
};