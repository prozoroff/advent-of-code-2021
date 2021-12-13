const {array: {sum, times}, input: {parseMatrix}} = require('../utils');
const {Octopus} = require('./octopus');

const matrix = parseMatrix(`
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`, (...args) => new Octopus(...args));

const flashes = times(() => {
    matrix.forEach(octopus => octopus.reset());
    matrix.forEach(octopus => octopus.increase());
    return matrix.filter(octopus => octopus.isFlashed).length;
}, 1000)

console.log('Part 1 result:', sum(flashes.slice(0, 100)), 'flashes');
console.log('Part 2 result:', flashes.indexOf(matrix.rows * matrix.columns) + 1, 'step');
