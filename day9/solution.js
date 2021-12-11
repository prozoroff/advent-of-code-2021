const {array: {sum, mul, sort}, input: {parseMatrix}} = require('../utils');

const matrix = parseMatrix(`
2199943210
3987894921
9856789892
8767896789
9899965678
`);

const notLessThan = (j, i) => ([dj, di]) => matrix.cell(j + dj, i + di) <= matrix.cell(j, i); 
const isMin = ([j, i]) => ![[0, 1], [0, -1], [1, 0], [-1, 0]].find(notLessThan(j, i));
const isBigger = (j, i, n) => (matrix.cell(j, i) > n) && (matrix.cell(j, i) !== 9);

const findBasin = arr => {
    const [j, i] = arr[0];
    return [
        ...arr,
        ...[].concat(
            ...[[0, 1], [0, -1], [1, 0], [-1, 0]]
                .map(([dj, di]) => isBigger(j + dj, i + di, matrix.cell(j, i)) ? findBasin([[j + dj, i + di], ...arr]) : []))
    ];
};

const getBasinSize = start => new Set(findBasin([start]).map(b => b.join(','))).size;

const minimums = matrix.coordinates().filter(isMin).map(([j, i]) => matrix.cell(j, i));
console.log('Part 1 result', sum(minimums) + minimums.length);

const basinSizes = matrix.coordinates().filter(isMin).map(getBasinSize);
console.log('Part 2 result', mul(sort(basinSizes).reverse().slice(0, 3)));
