var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "./frames/huge-fractal/huge-fractal-",
        start: 1,
        end: 64
    },
    {
        path: "./frames/biggest-fractal/biggest-fractal-",
        start: 65,
        end: 128
    },
    {
        path: "./frames/ultimate-fractal/ultimate-fractal-",
        start: 129,
        end: 203
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

fs.writeFile('ffmpeg-input3.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('ffmpeg-input3.txt written successfully.');
    }
});