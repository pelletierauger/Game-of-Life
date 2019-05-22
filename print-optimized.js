let preparedTiles = {};

function printOptimizedTile(x, y, tW, changes) {
    // if a tile set with this color already exists
    let randomTile = Math.floor(random(0, 8));
    if (preparedTiles["" + changes]) {
        // select randomly from an array of premade tiles
        image(preparedTiles["" + changes][randomTile], x * tW + (tW * 0.5), y * tW + (tW * 0.5));
        // ellipse(x * tW, y * tW, 4);
    } else {
        // create 4 tiles with this color, and print one of them
        let tileSet = [];

        let xAmount = (scene.fixedGridSize) ? scene.fixedGridSize.width : scene.gridXAmount;
        var oneDValue = Math.floor(x) + (Math.floor(y) * xAmount);
        var color = scene.getColor(oneDValue);
        // console.log(color);
        let graphicsScalar = 5;
        let margin = ((graphicsScalar - 1) * 0.5);
        for (let i = 0; i < 8; i++) {
            let graphics = createGraphics(tW * graphicsScalar, tW * graphicsScalar);
            graphics.clear();
            graphics.noStroke();
            graphics.fill(red(color), green(color), blue(color), 250);
            // graphics.background(color)
            for (let i = 0; i < scene.dotPerTile; i++) {
                var randomX = random(tW * margin, tW + (tW * margin));
                var randomY = random(tW * margin, tW + (tW * margin));
                graphics.ellipse(randomX, randomY, 1.5);
            }
            tileSet.push(graphics);
        }
        preparedTiles["" + changes] = tileSet;
        image(preparedTiles["" + changes][randomTile], x * tW + (tW * 0.5), y * tW + (tW * 0.5));
        // fill(color);
        // ellipse(x * tW, y * tW, 4);
    }
}