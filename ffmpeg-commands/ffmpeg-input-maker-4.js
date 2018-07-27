var fs = require('fs');
let computedInput = "";


let measure = 64;
// Anacrouse: rien
// 2 mesures: 45 serpinski
// 1 mesure: forest serpinski
// 2 mesures: big boat
// 2 mesures: bauhaus descending
// 1 mesure: new rulers
// 2 mesures: calculated mossy

// 2 mesures: rainy two
// 1 mesure: downward landscape
// 2 mesures: emperess
// 2 mesures: rotten mast
// 1 mesure: mast
// jusqu'à la fin: sofia kovalevskaya


let sequences = [{
        path: "/Volumes/WD001/genetic-render/rainy-two/rainy-two-",
        start: 1,
        end: 1,
        copies: 18
    }, {
        path: "/Volumes/WD001/genetic-render/45-serpinski/45-serpinski-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/forest-serpinski/forest-serpinski-",
        start: 1,
        end: measure,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/big-boat/big-boat-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/bauhaus-descending/bauhaus-descending-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/the-new-rulers/the-new-rulers-",
        start: 1,
        end: measure,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/calculated-mossy/calculated-mossy-",
        start: 1,
        end: measure * 2,
        copies: 1
    },

    // Second phrase

    {
        path: "/Volumes/WD001/genetic-render/rainy-two/rainy-two-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/downward-landscape/downward-landscape-",
        start: 1,
        end: measure,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/old-render/emperess/emperess-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/old-render/rotten-mast/rotten-mast-",
        start: 1,
        end: measure * 2,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/old-render/mast/mast-",
        start: 1,
        end: measure,
        copies: 1
    }, {
        path: "/Volumes/WD001/genetic-render/sofia-kovalevskaya/sofia-kovalevskaya-",
        start: 1,
        end: 330,
        copies: 1
    },

    // Credit sequence

    {
        path: "/Volumes/WD001/genetic-render/credits/1c-title-",
        start: 1,
        end: 1,
        copies: 60
    },
    {
        path: "/Volumes/WD001/genetic-render/credits/2c-credits-",
        start: 1,
        end: 1,
        copies: 48
    },
    {
        path: "/Volumes/WD001/genetic-render/credits/3b-calq-",
        start: 1,
        end: 1,
        copies: 72
    },
    {
        path: "/Volumes/WD001/genetic-render/credits/4c-montreal-",
        start: 1,
        end: 1,
        copies: 36
    },
    {
        path: "/Volumes/WD001/genetic-render/rainy-two/rainy-two-",
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

fs.writeFile('./ffmpeg-commands/study-2.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('study-2.txt written successfully.');
    }
});