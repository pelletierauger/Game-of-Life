let looping = false;
let printing = false;
let socket, cnvs, ctx, canvasDOM;
let JSONs;
let frameToExport = 1;
let printedBackground = false;
let boxToPrint = 0;

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    if (printing) {
        noStroke();
    } else {
        stroke(255, 20);
    }
    socket.on('pushJSONs', function(data) {
        JSONs = data;
    });
    socket.emit('pullJSONs', "");

    // setGridValue(gridXAmount / 2, gridYAmount / 2, 1);
    // setGridValue((gridXAmount / 2) + 0, (gridYAmount / 2) + 1, 1);
    // x = 0
    // y = gridYAmount / 2;
    // for (let i = 0; i < gridXAmount; i++) {
    //     x = i;
    //     setGridValue(x, y, 1);
    // }
}

function draw() {
    if (JSONs && !scene.initialized) {
        scene.initialize();
    }
    if (scene.initialized) {
        if (!printing) {
            scene.update();
            for (var x = 0; x < scene.gridXAmount; x++) {
                for (var y = 0; y < scene.gridYAmount; y++) {
                    var oneDValue = x + (y * scene.gridXAmount);
                    var value = scene.grid[oneDValue].state;
                    if (scene.grid[oneDValue].changed) {
                        var change = scene.changes[oneDValue];
                        var light = setLight(change, scene.palette.data);
                        if (value) {
                            fill(light);
                        } else {
                            fill(0);
                        }
                        var tW = scene.tileWidth;
                        rect(x * tW, y * tW, tW, tW);
                    }
                }
            }
        } else {
            for (let i = 0; i < 3; i++) {
                if (!printedBackground) {
                    background(0);
                    printedBackground = true;
                }
                let y = floor(boxToPrint / scene.gridXAmount);
                let x = boxToPrint - (y * scene.gridXAmount);
                if (scene.grid[boxToPrint]) {
                    if (scene.grid[boxToPrint].state == 1) {
                        let change = scene.changes[boxToPrint];
                        let color = setLight(change, scene.palette.data);
                        fill(red(color), green(color), blue(color), 55);
                        let tW = scene.tileWidth;
                        for (let i = 0; i < scene.dotPerTile; i++) {
                            var randomX = random(x * tW, (x + 1) * tW);
                            var randomY = random(y * tW, (y + 1) * tW);
                            ellipse(randomX, randomY, 1.25);
                        }
                    }
                }
                if (scene.grid[boxToPrint]) {
                    if (scene.grid[boxToPrint].state == 1) {
                        boxToPrint++;
                    } else {
                        while (scene.grid[boxToPrint].state == 0 && boxToPrint < scene.grid.length - 1) {
                            boxToPrint++;
                        }
                    }
                }
                if (boxToPrint >= scene.grid.length - 1 && exporting == true) {
                    console.log(`Frame ${frameToExport} is done printing.`);
                    boxToPrint = 0;
                    frameExport(frameToExport);
                    frameToExport++;
                    scene.update();
                    printedBackground = false;
                }
            }


        }
        if (!printing) {
            noStroke();
        }
        if (!looping) {
            noLoop();
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            looping = false;
            noLoop();
        } else {
            looping = true;
            loop();
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport(p);
    }
    if (key == 'l' || key == 'L') {
        printing = true;
        looping = true;
        loop();
    }
    if (key == 'k' || key == 'K') {
        printing = true;
        loop();
        looping = true;
        exporting = true;
    }
    if (key == 'i' || key == 'I') {
        socket.emit('saveJSON', {
            data: {
                gridScalar: scene.gridScalar,
                gridSeed: scene.gridSeed
            },
            path: "./objects/gridseed-"
        });
    }
    if (key == 'o' || key == 'O') {
        socket.emit('saveJSON', { data: scene.palette.data, path: "./objects/palette-" });
    }
    if (key == 'h' || key == 'H') {
        scene.palette = seedPalette();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }

}

function mousePressed() {
    if (!exporting && !printing) {
        var x = floor(map(mouseX, 0, width, 0, scene.gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, scene.gridYAmount));
        scene.setGridValue(x, y, 1);
        scene.setGridSeedValue(x, y, 1);
        fill(255);
        let tW = scene.tileWidth;
        rect(x * tW, y * tW, tW, tW);
        // pressed.push({ x: x, y: y });
    }
}

function mouseDragged() {
    if (!exporting && !printing) {
        var x = floor(map(mouseX, 0, width, 0, scene.gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, scene.gridYAmount));
        scene.setGridValue(x, y, 1);
        scene.setGridSeedValue(x, y, 1);
        fill(255);
        let tW = scene.tileWidth;
        rect(x * tW, y * tW, tW, tW);
        // pressed.push({ x: x, y: y });
    }
}