let originalNumber = Math.pow(5, 2);
// originalNumber -= 1;
let base = 7;
let factors = [];
let n = originalNumber;
let powers = [1];

let b = base;
for (let i = 0; i < 10; i++) {
    powers.push(b);
    b *= base;
}

let counter = 0;
while (originalNumber > base) {
    while (originalNumber >= powers[counter]) {
        n = powers[counter];
        counter++;
    }
    originalNumber -= n;
    factors.push([n, counter - 1]);
    counter = 0;
}

if (originalNumber) {
    if (originalNumber == base) {
        factors.push([originalNumber, 1]);
    } else {
        factors.push([originalNumber, 0]);
    }
}

let convertedNumber = [];
for (let i = 0; i < factors.length; i++) {
    let increment = factors[i][1];
    if (increment == 0) {
        convertedNumber[increment] = factors[i][0];
    } else {
        if (!convertedNumber[increment]) {
            convertedNumber[increment] = 1;
        } else {
            convertedNumber[increment]++;
        }
    }
}

let revertedNumber = "";
for (let i = convertedNumber.length - 1; i >= 0; i--) {
    if (convertedNumber[i] > 0) {
        revertedNumber += convertedNumber[i];
    } else {
        revertedNumber += 0;
    }
}

console.log(factors);
console.log(convertedNumber);
console.log(revertedNumber.toString());