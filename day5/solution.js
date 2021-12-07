const {input: {parseVectors}, array: {sum, times}} = require('../utils');
const {abs, sign, max} = Math;

const vectors = parseVectors(`
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`);

const getLine = ([x1, y1, x2, y2], allowDiagonal=false) => {
    const [xd, yd] = [sign(x2 - x1), sign(y2 - y1)];
    const steps = max(abs(x2 - x1), abs(y2 - y1)) + 1;
    const isDiagonal = xd === yd || xd === -yd;
    return isDiagonal && !allowDiagonal ? [] : times((i) => [x1 + i * xd, y1 + i * yd], steps);
};

const getOverlaps = allowDiagonal => vectors
    .reduce((acc, point) => [...acc, ...getLine(point, allowDiagonal)],[])
    .reduce((acc, [x, y]) => {
        acc[y] = acc[y] || [];
        acc[y][x] = (acc[y][x] || 0) + 1;
        return acc;
    }, [])
    .reduce((acc, row) => acc + sum(row.map(cell => cell > 1 ? 1 : 0)), 0);

console.log(getOverlaps(), 'points overlap');
console.log(getOverlaps(true), 'points overlap considering diagonal lines');
