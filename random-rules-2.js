var fs = require('fs');
let b = 4;
let r;
let population = [];
for (let j = 0; j < 20; j++) {
    r = "";
    let rl = Math.pow(b, 9);
    for (let i = 0; i < rl; i++) {
        r += Math.floor(Math.random() * b);
    }
    population.push(r);
}

// console.log(r.length);
let data = JSON.stringify(population);

fs.writeFile('random-population.js', data, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('random-rules.txt written successfully.');
    }
});