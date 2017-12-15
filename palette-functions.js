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