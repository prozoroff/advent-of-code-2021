const times = (func, n) => new Array(n).fill(true).map((_,i) => func(null, i));
const sumArray = arr => arr.reduce((a, b) => a + b, 0)

const input = [
'0,9 -> 5,9',
'8,0 -> 0,8',
'9,4 -> 3,4',
'2,2 -> 2,1',
'7,0 -> 7,4',
'6,4 -> 2,0',
'0,9 -> 2,9',
'3,4 -> 1,4',
'0,0 -> 8,8',
'5,5 -> 8,2',
];

const getLine = (point, allowDiagonal=false) => {
    const [x1, y1, _, x2, y2] = point.split(/\s|,/).map(c => parseInt(c));
    const [xd, yd] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) + 1;
    const isDiagonal = xd === yd || xd === -yd;
    return isDiagonal && !allowDiagonal ? [] : times((_, i) => [x1 + i * xd, y1 + i * yd], steps);
}

const getOverlaps = allowDiagonal => {
    const points = input.reduce((acc, point) => [...acc, ...getLine(point, allowDiagonal)],[]);
    return sumArray(points.reduce((acc, [x, y]) => {
        acc[y] = acc[y] || [];
        acc[y][x] = (acc[y][x] || 0) + 1;
        return acc;
    }, []).map(row => sumArray(row.map(cell => cell > 1 ? 1 : 0))));
}

console.log(getOverlaps(), 'points overlap');
console.log(getOverlaps(true), 'points overlap considering diagonal lines');
