var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "/Volumes/WD001/animation-frames/game-of-life/assorted-drips-one/assorted-drips-one-",
        start: 1,
        end: 708,
        copies: 1
    },
    {
        path: "/Volumes/WD001/genetic-render/excellent-drips-one-fadeout-2/excellent-drips-one-fadeout-2-",
        start: 1,
        end: 1188,
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

fs.writeFile('./ffmpeg-commands/study-no-2.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('study-no-2.txt written successfully.');
    }
});