var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "./frames/nights-of-march-22-levels-2019-croppy-720/nights-of-march-22-",
        start: 1,
        end: 75,
        copies: 1
    },
    {
        path: "./frames/nights-of-march-22-levels-2019-croppy-b-720/nights-of-march-22-",
        start: 50,
        end: 208,
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

fs.writeFile('../march22-crop-longer.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('../march22-crop.txt written successfully.');
    }
});