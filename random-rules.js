var fs = require('fs');
let b = 4;
let r = "";
let rl = Math.pow(b, 9);
for (let i = 0; i < rl; i++) {
    r += Math.floor(Math.random() * b);
}
console.log(r.length);

fs.writeFile('random-rules.txt', r, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('random-rules.txt written successfully.');
    }
});