var fs = require('fs');
let computedInput = "";

let sequences = [{
    path: "/Volumes/WD001/animation-frames/game-of-life/warmth-of-april-4b/warmth-of-april-4b-",
    start: 2,
    end: 263,
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

fs.writeFile('./ffmpeg-commands/warmth-of-april-4b.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('warmth-of-april-4b.txt written successfully.');
    }
});