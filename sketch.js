p5.disableFriendlyErrors = true;

let looping = exporting || false;
let printing = exporting || false;
let socket, cnvs, ctx, canvasDOM;
let JSONs;
let frameToExport = 1;
let printedBackground = false;
let drawnGrid = false;
let boxToPrint = 0;
let grainyYellowTiles = [];
let grainyRedTiles = [];

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    imageMode(CENTER);
    noStroke();
    textSize(16);
    socket.on('pushJSONs', function(data) {
        JSONs = data;
    });
    socket.emit('pullJSONs', "");
}

function draw() {
    if (JSONs && !scene.initialized) {
        scene.initialize();
    }
    if (scene.initialized) {
        let zoomReciprocal;
        if (scene.zoom) {
            let z = scene.zoom;
            zoomReciprocal = 1 / z;
            scale(scene.zoom, scene.zoom);
            translate(((width * z) - width) / (z * -2), ((height * z) - height) / (z * -2));
        }
        if (!printing) {
            if (!drawnGrid) {
                stroke(255, 50);
                strokeWeight(0.5);
                var tW = scene.tileWidth;
                for (let x = 0; x < scene.gridXAmount; x++) {
                    line(tW * x, 0, tW * x, height);
                }
                for (let y = 0; y < scene.gridYAmount; y++) {
                    line(0, tW * y, width, tW * y);
                }
                noStroke();
                drawnGrid = true;
            }
            scene.update();
            let xAmount = (scene.fixedGridSize) ? scene.fixedGridSize.width : scene.gridXAmount;
            let yAmount = (scene.fixedGridSize) ? scene.fixedGridSize.height : scene.gridYAmount;
            for (let x = 0; x < xAmount; x++) {
                for (let y = 0; y < yAmount; y++) {
                    let oneDValue = (x + scene.offset.x) + ((y + scene.offset.y) * xAmount);
                    // console.log(oneDValue);
                    var value = scene.grid[oneDValue].state;
                    if (scene.grid[oneDValue].changed || (value && scene.animatedColors)) {
                        var light = scene.getColor(oneDValue);
                        if (value) {
                            fill(light);
                            // console.log(`oneDValue : ${oneDValue}, x: ${x}, y: ${y}.`);
                        } else {
                            fill(0);
                        }
                        var tW = scene.tileWidth;
                        rect(x * tW, y * tW, tW, tW);
                    }
                }
            }
            // fill(255);
            // text(scene.fileName, 50, height - 50);
        } else {
            if (scene.fixedGridSize) {
                for (let i = 0; i < 15 * (scene.gridScalar / 16); i++) {
                    if (!printedBackground) {
                        background(0);
                        printedBackground = true;
                    }
                    let printingArray = [];
                    let printingChanges = [];
                    for (let y = 0; y < scene.gridYAmount; y++) {
                        for (let x = 0; x < scene.gridXAmount; x++) {
                            let oneDValue = (x + scene.offset.x) + ((y + scene.offset.y) * scene.fixedGridSize.width);
                            printingArray.push(scene.grid[oneDValue]);
                            printingChanges.push(scene.changes[oneDValue]);
                        }
                    }
                    let y = floor(boxToPrint / scene.gridXAmount);
                    let x = boxToPrint - (y * scene.gridXAmount);
                    if (printingArray[boxToPrint]) {
                        if (printingArray[boxToPrint].state == 1) {
                            let color = scene.getColor(boxToPrint, printingChanges);
                            fill(red(color), green(color), blue(color), 55);
                            let tW = scene.tileWidth;
                            for (let i = 0; i < scene.dotPerTile; i++) {
                                var randomX = random(x * tW, (x + 1) * tW);
                                var randomY = random(y * tW, (y + 1) * tW);
                                if (scene.zoom) {
                                    ellipse(randomX, randomY, 1.25 * zoomReciprocal);
                                } else {
                                    ellipse(randomX, randomY, 1.25);
                                }

                            }
                        }
                    }
                    if (printingArray[boxToPrint]) {
                        if (printingArray[boxToPrint].state == 1) {
                            boxToPrint++;
                        } else {
                            while (printingArray[boxToPrint].state == 0 && boxToPrint < printingArray.length - 1) {
                                boxToPrint++;
                            }
                        }
                    }
                    if (boxToPrint >= printingArray.length - 1 && exporting == true) {
                        console.log(`Frame ${frameToExport} is done printing.`);
                        boxToPrint = 0;
                        frameExport(frameToExport);
                        frameToExport++;
                        scene.update();
                        printedBackground = false;
                    }
                }
                // When scene.fixedGridSize is false
            } else {
                for (let i = 0; i < 500 * (scene.gridScalar / 16); i++) {
                    if (!printedBackground) {
                        background(0);
                        printedBackground = true;
                    }
                    let y = floor(boxToPrint / scene.gridXAmount);
                    let x = boxToPrint - (y * scene.gridXAmount);
                    if (scene.grid[boxToPrint]) {
                        if (scene.grid[boxToPrint].state == 1) {

                            let changes = scene.changes[boxToPrint];
                            let tW = scene.tileWidth;
                            let randomTile = Math.floor(random(0, grainyYellowTiles.length));
                            let rotateDice = Math.floor(random(0, 4));
                            let rotateAngle;
                            switch (rotateDice) {
                                case 0:
                                    rotateAngle = 0;
                                    break;
                                case 1:
                                    rotateAngle = PI / 2;
                                    break;
                                case 2:
                                    rotateAngle = PI;
                                    break;
                                case 3:
                                    rotateAngle = PI * 1.5;
                                    break;
                            }


                            printOptimizedTile(x, y, tW, changes);

                            // if (changes == 1) {
                            //     // push();
                            //     // translate(x * tW + (tW * 0.5), y * tW + (tW * 0.5));
                            //     // rotate(rotateAngle);
                            //     // image(grainyYellowTiles[randomTile], 0, 0);
                            //     // pop();
                            //     image(grainyYellowTiles[randomTile], x * tW + (tW * 0.5), y * tW + (tW * 0.5));
                            // } else if (changes == 4) {
                            //     // push();
                            //     // translate(x * tW + (tW * 0.5), y * tW + (tW * 0.5));
                            //     // rotate(rotateAngle);
                            //     // image(grainyRedTiles[randomTile], 0, 0);
                            //     // pop();
                            //     image(grainyRedTiles[randomTile], x * tW + (tW * 0.5), y * tW + (tW * 0.5));
                            // }
                            // let color = scene.getColor(boxToPrint);
                            // fill(red(color), green(color), blue(color), 55);
                            // let tW = scene.tileWidth;
                            // for (let i = 0; i < scene.dotPerTile; i++) {
                            //     var randomX = random(x * tW, (x + 1) * tW);
                            //     var randomY = random(y * tW, (y + 1) * tW);
                            //     if (scene.zoom) {
                            //         ellipse(randomX, randomY, 1.25 * zoomReciprocal);
                            //     } else {
                            //         ellipse(randomX, randomY, 1.25);
                            //     }

                            // }

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
    if (key == 'd' || key == 'D') {
        scene.applyPalette();
    }
    if (key == 'f' || key == 'F') {
        let i = floor(random(JSONs.length));
        while (JSONs[i].name[0] !== "p") {
            i = floor(random(JSONs.length));
        }
        scene.palette = JSONs[i];
        scene.applyPalette();
    }

    if (key == 'g' || key == 'G') {
        scene.palette = seedPalette();
        scene.applyPalette();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'b' || key == 'B') {
        scene.mutateRules();
    }
    if (key == 'v' || key == 'V') {
        scene.geneticRules = scene.lastRules;
        scene.applyShapes();
    }
    if (key == 'c' || key == 'C') {
        scene.createRandomRules();
        scene.applyShapes();
    }
    if (key == 'n' || key == 'N') {
        // scene.createRandomRules();
        scene.applyShapes();
    }
}

function mousePressed() {
    if (!exporting && !printing) {
        var x = floor(map(mouseX, 0, width, 0, scene.gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, scene.gridYAmount));
        let oX = scene.offset.x;
        let oY = scene.offset.y;
        scene.setGridValue(x + oX, y + oY, 1);
        scene.setGridSeedValue(x + oX, y + oY, 1);
        scene.setParameter(x + oX, y + oY, "geneticState", 1);
        fill(255);
        let tW = scene.tileWidth;
        rect(x * tW, y * tW, tW, tW);
    }
}

function mouseDragged() {
    if (!exporting && !printing) {
        var x = floor(map(mouseX, 0, width, 0, scene.gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, scene.gridYAmount));
        let oX = scene.offset.x;
        let oY = scene.offset.y;
        scene.setGridValue(x + oX, y + oY, 1);
        scene.setGridSeedValue(x + oX, y + oY, 1);
        scene.setParameter(x + oX, y + oY, "geneticState", 1);
        fill(255);
        let tW = scene.tileWidth;
        rect(x * tW, y * tW, tW, tW);
    }
}