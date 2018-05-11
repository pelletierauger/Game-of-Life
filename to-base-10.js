let s = "10402";
let b = 5;
let ns = "";
for (let i = s.length - 1; i >= 0; i--) {
    ns += s[i];
}
console.log('ns : ' + ns);
let decimal = 0;
for (let i = 0; i <= ns.length - 1; i++) {
    decimal += parseInt(ns[i]) * Math.pow(b, i);
    console.log(ns[i], parseInt(ns[i]) * Math.pow(b, i));
}

console.log(decimal);