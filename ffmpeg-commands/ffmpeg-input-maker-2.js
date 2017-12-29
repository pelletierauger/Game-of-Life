var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "../frames/little-fractal-square/little-fractal-",
        start: 1,
        end: 32,
        copies: 1
    },
    {
        path: "../frames/huge-fractal-square/huge-fractal-",
        start: 33,
        end: 64,
        copies: 1
    },
    {
        path: "../frames/middle-fractal-square/middle-fractal-",
        start: 65,
        end: 96,
        copies: 1
    },
    {
        path: "../frames/biggest-fractal-square/biggest-fractal-",
        start: 97,
        end: 128,
        copies: 1
    }
];

for (s of sequences) {
    for (let f = s.start; f <= s.end; f++) {
        var formattedF = "" + f;
        while (formattedF.length < 5) {
            formattedF = "0" + formattedF;
        }
        let line = `file '${s.path}${formattedF}.png'\n`;
        for (let i = 0; i < s.copies; i++) {
            computedInput += line;
        }
    }
}

fs.writeFile('frames-square-withmiddle.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('frames-square-withmiddle.txt written successfully.');
    }
});