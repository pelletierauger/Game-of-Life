var fs = require('fs');
let computedInput = "";

let sequences = [{
    path: "../frames/april-at-the-docks/april-at-the-dock-02-",
    start: 1,
    end: 105,
    copies: 1
}];

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

fs.writeFile('april-at-the-dock-02.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('frames-square-withmiddle.txt written successfully.');
    }
});