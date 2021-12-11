const {array: {sum, times}, input: {parseMatrix}} = require('../utils');
const {abs} = Math;

class Octopus {
    constructor(value, j, i) {
        this.level = parseInt(value);
        this.coords = [j, i];
        this.isFlashed = false;
    }

    increase() {
        !this.isFlashed && this.level++ > 8 && this.flash();
    }

    reset() {
        this.isFlashed = false;
    }

    flash() {
        this.isFlashed = true;
        this.level = 0;
        const [j, i] = this.coords;

        matrix.coordinates((y, x) => abs(j - y) < 2 && abs(i - x) < 2 && (y !== j || x !== i))
            .forEach(([y, x]) => matrix.cell(y, x).increase());
    }
}

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
`, (value, j, i) => new Octopus(value, j, i));

const flashes = times(() => {
    matrix.forEach(octopus => octopus.reset());
    matrix.forEach(octopus => octopus.increase());
    return matrix.filter(octopus => octopus.isFlashed).length;
}, 1000)

console.log('Part 1 result:', sum(flashes.slice(0, 100)), 'flashes');
console.log('Part 2 result:', flashes.indexOf(matrix.rows * matrix.columns) + 1, 'step');

