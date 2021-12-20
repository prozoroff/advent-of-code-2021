const {array: {times}, input: {parseMatrix}, matrix: {Matrix}} = require('../utils');
const {floor} = Math;

let risks = parseMatrix(`
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`);

const getFullMap = (map, n) => new Matrix(times(j => times(i =>
        (map.cell(j % map.rows, i % map.columns) + floor(j / map.rows) + floor(i / map.columns)) % 9 || 9,
        map.columns * n), map.rows * n));

const getPathRisk = map => {
    const riskMap = new Matrix(times(() => times(() => Infinity, map.columns), map.rows));
    const wave = (j = 0, i = 0, risk = 0) => {
        riskMap.set(j, i, risk);
        [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dj, di]) => {
            if (map.cell(j + dj, i + di) + risk < riskMap.cell(j + dj, i + di)) {
                wave(j + dj, i + di, risk + map.cell(j + dj, i + di));
            }
        })
    };
    wave();
    return riskMap.cell(riskMap.rows - 1, riskMap.columns - 1);
}

console.log('Part 1 result:', getPathRisk(risks));
console.log('Part 2 result:', getPathRisk(getFullMap(risks, 5)));
