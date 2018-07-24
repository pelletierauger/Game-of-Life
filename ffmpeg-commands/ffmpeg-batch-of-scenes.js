var fs = require('fs');
let computedInput = "";

let listOfScenes = [
    { name: "sofia-kovalevskaya", r: "0111100010000001", d: 350 },
    // Ska Shimmer
    // "0111100010000000",
    // Downward landscape
    { name: "downward-landscape", r: "0110000010000101", d: 400 },
    // Sideway Medusa
    { name: "sideway-medusa", r: "0011100010000001", d: 500 },
    // Right boat
    { name: "right-boat", r: "0110100010000101", d: 325 },
    // Mid Boat
    // "0110100010000111",
    // Big boat
    { name: "big-boat", r: "0111100110000001", d: 350 },
    // Sideway boat
    { name: "sideway-boat", r: "0101100010000011", d: 450 },
    // 45 Serpinski
    { name: "45-serpinski", r: "0111110010000000", d: 700 },
    // Mangled 45 Serpinski
    { name: "mangled-45-serpinski", r: "0111110010010000", d: 380 },
    // Mangled More
    // I don't like this one... { name: "mangled-more", r: "0111110010010010", d: 200 },
    // Mast
    { name: "mast", r: "0010010010010011", d: 330 },
    // Sideway Pine Tree
    { name: "sideway-pine-tree", r: "0010010011000001", d: 360 },
    // Towards serpinski
    // "0010010010000000",
    // Rotten Mast
    { name: "rotten-mast", r: "0010010010000001", d: 360 },
    // Horizontal Serpinski
    { name: "horizontal-serpinski", r: "0010010011000000", d: 300 },
    // Surprise Serpinski
    { name: "surprise-serpinski", r: "0010011011000000", d: 129 },
    // Facing Serpinski
    { name: "facing-serpinski", r: "0011011010000000", d: 260 },
    // Forest Serpinski
    { name: "forest-serpinski", r: "0010011010000011", d: 350 },
    // Mossy Serpinski
    { name: "mossy-serpinski", r: "0001011010010001", d: 250 },
    // Calculated Mossy
    { name: "calculated-mossy", r: "0001011010011111", d: 305 },
    // "0001011000011111",
    // Bauhaus Descending:
    { name: "bauhaus-descending", r: "0110100011000101", d: 400 },
    // The New Rulers
    { name: "the-new-rulers", r: "0111100001010101", d: 350 },
    // Downward Serpinski
    // "0111100001011100",
    // The Boring One
    // Don't use this one { name: "the-boring-one", r: "0001001001111111", d: 200 },
    // Don't use this one { name: "the-boring-two", r: "0001001001111110", d: 200 },
    { name: "the-boring-three", r: "0101001100111010", d: 385 },
    { name: "the-boring-four", r: "0101001100110010", d: 300 },
    // Shining and Glorious Serpinski
    { name: "shining-and-glorious-serpinski", r: "0101001100110000", d: 600 },
    // The Pool Tables of Rural Canada
    { name: "the-pool-tables-of-rural-canada", r: "0101111111110000", d: 450 },
    // Cranky Serpinski
    // "0100001100110000",
    // Cranky but Growing
    { name: "cranky-but-growing", r: "0101101110100001", d: 250 },
    // Frantic Pinewood Forest
    { name: "frantic-pinewood-forest", r: "0101001010100001", d: 880 },
    // Serene Landscape
    { name: "serene-landscape", r: "0101001110000001", d: 400 },
    // Broken Landscape
    { name: "broken-landscape", r: "0101101110000001", d: 400 },
    // Good Growth
    { name: "good-growth", r: "0100011010100101", d: 300 },
    // Rainy Two
    { name: "rainy-two", r: "0110011001101001", d: 220 },
    // Inner Fractal
    { name: "inner-fractal", r: "0000111011100001", d: 375 },
    // Self-Similar Ruler
    { name: "self-similar-ruler", r: "0001111111111001", d: 250 },
    // Between Rain and Maze
    // Don't use this one { name: "between rain and maze", r: "0110011011111100", d: 200 },
    // Mazes upon Mazes
    { name: "mazes-upon-mazes", r: "0101111111111100", d: 600 },
    { name: "big-c", r: "0101111111111101", d: 200 },
    { name: "feely", r: "0011000010001101", d: 540 },
    { name: "emperess", r: "0110100000000001", d: 425 },
    { name: "rocks-in-a-pond", r: "0101111001100001", d: 400 },
    { name: "sunflowers", r: "0011000010001001", d: 1200 },
    { name: "golden-ship", r: "0011100110011001", d: 800 },
    // Between Mazes and Perfect Box
    // Don't use this one { name: "between-mazes-and-perfect-box", r: "0101111111110110", d: 200 },
    // Perfect Box
    // Don't use this one { name: "perfect-box", r: "0110111111110110", d: 200 }
];

for (let i = 0; i < listOfScenes.length; i++) {
    // for (let i = 0; i < 16; i++) {
    let name = listOfScenes[i].name;
    computedInput += `ffmpeg -f image2 -framerate 12 -i /Volumes/WD001/genetic-render/${name}/${name}-%05d.png -c:v libx264 -s 2560x1440 -pix_fmt yuv420p -shortest /Volumes/WD001/animation-video-renders/game-of-life/study-no-1/${name}-12fps.mp4`;
    if (i < listOfScenes.length - 1) {
        computedInput += " && ";
    }
}

fs.writeFile('./ffmpeg-commands/batch-of-scenes.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('batch-of-scenes.txt written successfully.');
    }
});