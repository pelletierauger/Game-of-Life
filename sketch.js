let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames2/game-of-life";
let maxFrames = 20;
let JSONs;

var gridScalar = 8;
var gridXAmount = 16 * gridScalar;
var gridYAmount = 9 * gridScalar;
var tileWidth;
var grid = [];
var next = [];
var changes = [];
let pressed = [];
let frameToExport = 1;

let paletteSeed = seedPalette();

// Super beau rouge et bleu : 
// 222, 60, 4, 9, 116, 4, 205, 26, 3
// paletteSeed = makePalette(3, 26, 205, 4, 116, 9, 4, 60, 222);

//Rose, gris et vert
// 151, 110, 6, 37, 250, 5, 213, 46, 6
// paletteSeed = makePalette(6, 46, 213, 5, 250, 37, 6, 110, 151);

// Cyan, brun, jaune
// 249, 1, 2, 209, 77, 6, 137, 223, 4
// paletteSeed = makePalette(4, 223, 137, 6, 77, 209, 2, 1, 249);

//
let printing = false;
let printedBackground = false;
let boxOfDots = [];
let boxToPrint = 0;

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    // angleMode(DEGREES);
    // noStroke();
    if (printing) {
        noStroke();
    } else {
        stroke(255, 20);
    }
    if (!looping) {
        noLoop();
    }
    tileWidth = width / gridXAmount - 1 / gridXAmount;
    // tileWidth = width / (8 * 16) - 1 / (8 * 16);
    for (var i = 0; i < gridXAmount * gridYAmount; i++) {
        grid.push({ state: 0, changed: true });
        changes.push(0);
    }

    socket.on('pushJSONs', function(data) {
        JSONs = data;
    });
    socket.emit('pullJSONs', "");
    console.log(JSONs);

    // for (var x = 10; x < 120; x += 10) {
    //     for (var y = 10; y < 70; y += 10) {
    //         setGridValue(x, y, 1);
    //         setGridValue(x + 7, y + 1, 1);
    //         setGridValue(x + 6, y + 1, 1);
    //         setGridValue(x + 5, y + 1, 1);
    //         setGridValue(x + 4, y + 1, 1);
    //         setGridValue(x + 3, y + 5, 1);
    //         setGridValue(x + 2, y + 6, 1);
    //         setGridValue(x + 1, y + 7, 1);
    //     }
    // }
    // for (var x = 20; x < 100; x += 30) {
    //     for (var y = 20; y < 50; y += 10) {
    //         setGridValue(x, y, 1);
    //         setGridValue(x + 7, y + 1, 1);
    //         setGridValue(x + 6, y + 1, 1);
    //         setGridValue(x + 5, y + 1, 1);
    //         setGridValue(x + 4, y + 1, 1);
    //         setGridValue(x + 3, y + 5, 1);
    //         setGridValue(x + 2, y + 6, 1);
    //         setGridValue(x + 1, y + 7, 1);
    //     }
    // }
    let wX = 30;
    let wY = 10;
    let x = wX;
    let y = wY;
    for (let i = 0; i < gridYAmount - wY * 2; i++) {
        setGridValue(x, y, 1);
        y++;
    }
    y = wY;
    x = gridXAmount - wX;
    for (let i = 0; i < gridYAmount - wY * 2; i++) {
        setGridValue(x, y, 1);
        y++;
    }
    x = wX;
    y = wY;
    for (let i = 0; i < gridXAmount - wX * 2; i++) {
        setGridValue(x, y, 1);
        x++;
    }
    x = wX;
    y = wY + (gridYAmount - wY * 2) - 1;
    for (let i = 0; i < gridXAmount - wX * 2; i++) {
        setGridValue(x, y, 1);
        x++;
    }
    setGridValue(gridXAmount / 2, gridYAmount / 2, 1);
    setGridValue((gridXAmount / 2) + 0, (gridYAmount / 2) + 1, 1);
    x = 0
    y = gridYAmount / 2;
    for (let i = 0; i < gridXAmount; i++) {
        x = i;
        setGridValue(x, y, 1);
    }
}

function draw() {
    // translate(width / 2, -height);
    // rotate(45);
    if (!printing) {
        for (var x = 0; x < gridXAmount; x++) {
            for (var y = 0; y < gridYAmount; y++) {
                var oneDValue = x + (y * gridXAmount);
                var value = grid[oneDValue].state;
                if (grid[oneDValue].changed) {
                    // fill(value * 255);
                    var change = changes[oneDValue];
                    var dark = setDark(change);
                    var light = setLight(change, paletteSeed);
                    if (value) {
                        fill(light);
                    } else {
                        fill(dark);
                    }
                    rect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
                }
            }
        }
        updateGrid();
    } else {
        for (let i = 0; i < 3; i++) {
            if (!printedBackground) {
                background(0);
                printedBackground = true;
            }
            let y = floor(boxToPrint / gridXAmount);
            let x = boxToPrint - (y * gridXAmount);
            if (grid[boxToPrint]) {
                if (grid[boxToPrint].state == 1) {
                    let change = changes[boxToPrint];
                    let color = setLight(change, paletteSeed);
                    fill(red(color), green(color), blue(color), 50);
                    // console.log(color);
                    for (let i = 0; i < 3500 / 4; i++) {
                        var randomX = random(x * tileWidth, (x + 1) * tileWidth);
                        var randomY = random(y * tileWidth, (y + 1) * tileWidth);
                        ellipse(randomX, randomY, 1.25);
                    }
                } else {
                    // fill(0);
                    // rect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
                }
            }
            // fill(255);
            if (grid[boxToPrint]) {
                if (grid[boxToPrint].state == 1) {
                    boxToPrint++;
                } else {
                    while (grid[boxToPrint].state == 0 && boxToPrint < grid.length - 1) {
                        boxToPrint++;
                    }
                }
            }
            if (boxToPrint >= grid.length - 1 && exporting == true) {
                console.log("This is working");
                boxToPrint = 0;
                frameExport(frameToExport);
                frameToExport++;
                updateGrid();
                printedBackground = false;
            }
        }


    }
    // if (exporting && frameCount < maxFrames) {
    //     frameExport(p);
    // }
    if (frameCount == 1 && !printing) {
        noStroke();
        // stroke(255, 10);
    }
}

function updateGrid() {
    for (var x = 0; x < gridXAmount; x++) {
        for (var y = 0; y < gridYAmount; y++) {
            var oneDValue = x + (y * gridXAmount);
            var value = grid[oneDValue].state;
            var neighbors = calculateNeighbors(x, y);
            let changed = false;
            if (value == 1) {
                if (neighbors >= 4 || neighbors <= 1) {
                    next[oneDValue] = { state: 0, changed: true };
                    changed = true;
                    incrementChanges(x, y);
                }
            } else {
                if (neighbors == 3 || neighbors == 2) {
                    next[oneDValue] = { state: 1, changed: true };
                    changed = true;
                    incrementChanges(x, y);
                }
            }
            if (!changed) {
                next[oneDValue] = { state: value, changed: false };
            }
        }
    }
    for (var i = 0; i < grid.length; i++) {
        grid[i] = next[i];
    }
    // grid = next;
}

function calculateNeighbors(x, y) {
    var sum = 0;
    var n1 = getGridValue(x - 1, y - 1);
    sum += n1;
    var n2 = getGridValue(x, y - 1);
    sum += n2;
    var n3 = getGridValue(x + 1, y - 1);
    sum += n3;
    var n4 = getGridValue(x - 1, y);
    sum += n4;
    if (sum >= 4) {
        return sum;
    }
    var n5 = getGridValue(x + 1, y);
    sum += n5;
    if (sum >= 4) {
        return sum;
    }
    var n6 = getGridValue(x - 1, y + 1);
    sum += n6;
    if (sum >= 4) {
        return sum;
    }
    var n7 = getGridValue(x, y + 1);
    sum += n7;
    if (sum >= 4) {
        return sum;
    }
    var n8 = getGridValue(x + 1, y + 1);
    sum += n8;
    return sum;
}

function getGridValue(x, y) {
    var oneDValue = x + (y * gridXAmount);
    return grid[oneDValue] ? grid[oneDValue].state : 0;
}

function setGridValue(x, y, newState) {
    var oneDValue = x + (y * gridXAmount);
    if (grid[oneDValue]) {
        grid[oneDValue].state = newState;
        grid[oneDValue].changed = true;
    }
}

function incrementChanges(x, y) {
    var oneDValue = x + (y * gridXAmount);
    if (changes[oneDValue] !== null) {
        changes[oneDValue]++;
    }
}

function seedPalette() {
    let redOsc = Math.floor(Math.random() * 10);
    let redMin = Math.floor(Math.random() * 255);
    let redMax = Math.floor(Math.random() * 255);
    let greenOsc = Math.floor(Math.random() * 10);
    let greenMin = Math.floor(Math.random() * 255);
    let greenMax = Math.floor(Math.random() * 255);
    let blueOsc = Math.floor(Math.random() * 10);
    let blueMin = Math.floor(Math.random() * 255);
    let blueMax = Math.floor(Math.random() * 255);
    return {
        redOsc: redOsc,
        redMin: redMin,
        redMax: redMax,
        greenOsc: greenOsc,
        greenMin: greenMin,
        greenMax: greenMax,
        blueOsc: blueOsc,
        blueMin: blueMin,
        blueMax: blueMax,
    }
}


// Good seedPalettes : format : blue, green, red (Max, Min, Osc);
// 38, 72, 7, 196, 88, 4, 169, 215, 5
// 86, 173, 8, 190, 133, 7, 114, 31, 4
// 81, 12, 5, 191, 140, 6, 167, 37, 4
// 208, 34, 2, 250, 228, 7, 184, 63, 6
// 47, 143, 2, 32, 249, 6, 112, 233, 1

// Super beau rouge et bleu : 
// 222, 60, 4, 9, 116, 4, 205, 26, 3
// Gris, rose, vert :
// 151,110,6,37,250,5,213,46,6
// Vert et brun
// 56, 6, 2, 104, 191, 9, 83, 239, 5
// Terre, gris
// 33, 120, 6, 120, 9, 9, 232, 180, 2
// Cyan, brun, jaune
// 249, 1, 2, 209, 77, 6, 137, 223, 4
// Rose, gris, vert
// 163, 0, 9, 178, 145, 8, 244, 144, 2
// Mauve et turquoise
// 208, 153, 5, 50, 136, 1, 122, 80, 6
// Autre mauve et turquoise, moins bon
// 111, 204, 7, 53, 141, 1, 86, 62, 7
// Orange et brun verdâtre
// 99, 71, 9, 78, 93, 1, 130, 253, 3
// Surprenant mélange de rose, orange et brun
// 12, 111, 3, 57, 16, 4, 92, 248, 7
// Autre mauve et turquoise
// 252, 212, 5, 80, 26, 8, 99, 25, 2
// Saumon, vert et gris
// 25, 181, 2, 133, 60, 8, 88, 231, 8
// Orange brunâtre et rose
// 216, 62, 4, 67, 100, 6, 153, 90, 9
// Orange vif et rose
// 174, 39, 9, 54, 43, 9, 243, 94, 8

function makePalette(rO, rMi, rMa, gO, gMi, gMa, bO, bMi, bMax) {
    return {
        redOsc: rO,
        redMin: rMi,
        redMax: rMa,
        greenOsc: gO,
        greenMin: gMi,
        greenMax: gMa,
        blueOsc: bO,
        blueMin: bMi,
        blueMax: bMax,
    }
}

function setLight(c, p) {
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    return color(red, green, blue);
}

function setDark(c, p) {
    let red = map(sin(c / p.redOsc), -1, 1, p.redMin, p.redMax);
    let green = map(sin(c / p.greenOsc), -1, 1, p.greenMin, p.greenMax);
    let blue = map(sin(c / p.blueOsc), 1, -1, p.blueMin, p.blueMax);
    return color(red, green, blue);
}


// function setLight(c) {
//     let red = map(sin(c / 2), 1, -1, 0, 55);
//     let green = map(sin(c / 2), 1, -1, 20, 30);
//     let blue = map(sin(c / 4), 1, -1, 70, 5);
//     return color(red, green, blue);
// }

function setDark(c) {
    let red = map(sin(c / 2), 1, -1, 0, 55);
    let green = map(sin(c / 2), 1, -1, 20, 30);
    let blue = map(sin(c / 4), 1, -1, 70, 5);
    return color(0);
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport(p);
    }
    if (key == 'l' || key == 'L') {
        printing = true;
        loop();
        looping = true;
    }
    if (key == 'k' || key == 'K') {
        printing = true;
        loop();
        looping = true;
        exporting = true;
    }

    if (key == 'o' || key == 'O') {
        socket.emit('saveJSON', { data: paletteSeed, path: "./objects/palette-" });
    }
    if (key == 'h' || key == 'H') {
        paletteSeed = seedPalette();
    }

}

function mousePressed() {
    if (!exporting) {
        var x = floor(map(mouseX, 0, width, 0, gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, gridYAmount));
        setGridValue(x, y, 1);
        fill(255);
        rect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
        // pressed.push({ x: x, y: y });
    }
}

function mouseDragged() {
    if (!exporting) {
        var x = floor(map(mouseX, 0, width, 0, gridXAmount));
        var y = floor(map(mouseY, 0, height, 0, gridYAmount));
        setGridValue(x, y, 1);
        fill(255);
        rect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
        // pressed.push({ x: x, y: y });
    }
}