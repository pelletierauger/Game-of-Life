var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "../frames/little-fractal-square/little-fractal-",
        start: 1,
        end: 32
    },
    {
        path: "../frames/huge-fractal-square/huge-fractal-",
        start: 33,
        end: 64
    },
    {
        path: "../frames/biggest-fractal-square/biggest-fractal-",
        start: 65,
        end: 128
    },
    {
        path: "../frames/ultimate-fractal-square/ultimate-fractal-",
        start: 129,
        end: 256
    }
];

for (s of sequences) {
    for (let f = s.start; f <= s.end; f++) {
        var formattedF = "" + f;
        while (formattedF.length < 5) {
            formattedF = "0" + formattedF;
        }
        let line = `file '${s.path}${formattedF}.png'\n`;
        computedInput += line;
    }
}

fs.writeFile('frames-square-little.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('frames-square-little.txt written successfully.');
    }
});