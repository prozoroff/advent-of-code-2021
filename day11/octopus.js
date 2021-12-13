const {matrix: {MatrixItem}} = require('../utils');
const {abs} = Math;

exports.Octopus = class Octopus extends MatrixItem {
    constructor(value, j, i) {
        super();
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

        this.matrix.coordinates((y, x) => abs(j - y) < 2 && abs(i - x) < 2 && (y !== j || x !== i))
            .forEach(([y, x]) => this.matrix.cell(y, x).increase());
    }
}