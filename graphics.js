let graphicsScalar = 5;
let tW = this.tileWidth;
let margin = ((graphicsScalar - 1) * 0.5);
for (let i = 0; i < 128; i++) {
    let graphics = createGraphics(tW * graphicsScalar, tW * graphicsScalar);
    // graphics.background(255, 255, 0);
    graphics.clear();
    graphics.noStroke();
    let c = 1;
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 350, { r: red, g: green, b: blue });
    // console.log(a);
    graphics.fill(a.r, a.g, a.b, 55);
    for (let i = 0; i < this.dotPerTile; i++) {
        var randomX = random(tW * margin, tW + (tW * margin));
        var randomY = random(tW * margin, tW + (tW * margin));
        // var randomX = random(0, tW);
        // var randomY = random(0, tW);
        graphics.ellipse(randomX, randomY, 1.25);
        // console.log("Just relax");
    }
    grainyYellowTiles.push(graphics);
}
for (let i = 0; i < 128; i++) {
    let tW = this.tileWidth;
    let graphics = createGraphics(tW * graphicsScalar, tW * graphicsScalar);
    // graphics.background(255, 0, 0);
    graphics.clear();
    graphics.noStroke();
    let c = 4;
    let p = this.palette.data;
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    let a = adjustLevels(0, 0, 350, { r: red, g: green, b: blue });
    // console.log(a);
    graphics.fill(a.r, a.g, a.b, 55);
    for (let i = 0; i < this.dotPerTile; i++) {
        var randomX = random(tW * margin, tW + (tW * margin));
        var randomY = random(tW * margin, tW + (tW * margin));
        // var randomX = random(0, tW);
        // var randomY = random(0, tW);
        graphics.ellipse(randomX, randomY, 1.25);
    }
    grainyRedTiles.push(graphics);
}