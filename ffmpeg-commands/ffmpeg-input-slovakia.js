var fs = require('fs');
let computedInput = "";
let fileName = "./ffmpeg-commands/study-two-slovakia.txt";

let sequences = [{
        path: "/Volumes/Volumina/frames/study-two/assorted-drips-one/assorted-drips-one-",
        start: 0,
        end: 707,
        copies: 1
    },
    {
        path: "/Volumes/Volumina/frames/study-two/excellent-drips-one-fadeout-2/excellent-drips-one-fadeout-2-",
        start: 0,
        end: 1187,
        copies: 1
    },

    // Credit sequence
    {
        path: "/Volumes/Volumina/frames/study-two/black-frame-",
        start: 1,
        end: 1,
        copies: 12 * 3
    },
    {
        path: "/Volumes/Volumina/frames/study-two/credits/1-title-",
        start: 1,
        end: 1,
        copies: 60
    },
    {
        path: "/Volumes/Volumina/frames/study-two/credits/2-credits-",
        start: 1,
        end: 1,
        copies: 48
    },
    {
        path: "/Volumes/Volumina/frames/study-two/credits/3-calq-",
        start: 1,
        end: 1,
        copies: 72
    },
    {
        path: "/Volumes/Volumina/frames/study-two/credits/4-montreal-",
        start: 1,
        end: 1,
        copies: 36
    },
    {
        path: "/Volumes/Volumina/frames/study-two/black-frame-",
        start: 1,
        end: 1,
        copies: 18
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

fs.writeFile(fileName, computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log(fileName + ' written successfully.');
    }
});