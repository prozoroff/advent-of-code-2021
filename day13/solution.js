const {array: {max, times}, input: {parsePaper}} = require('../utils');

const {dots, folds} = parsePaper(`
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`);

const foldPaper = folds => folds.reduce((acc, [coord, value]) => acc.map(
    dot => dot[coord] < value ? dot : {...dot, [coord]: 2 * value - dot[coord]}
), [...dots]);

const printPaper = paper => times(y => {
    console.log(times(x => paper.find(dot => dot.x === x && dot.y === y) ? '█' : ' ', max(paper.map(d => d.x)) + 1).join(''));
}, max(paper.map(d => d.y)) + 1);

console.log('Part 1 result:', new Set(foldPaper(folds.slice(0, 1)).map(JSON.stringify)).size);
console.log('Part 2 result:') || printPaper(foldPaper(folds));
