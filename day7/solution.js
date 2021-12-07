const {array: {max, min, range, zeros}} = require('../utils');

const data = `
16,1,2,0,4,2,7,1,2,14
`.split(',').map(d => parseInt(d));

const plain = (a, b) => Math.abs(a - b);
const progressive = (a, b) => zeros(Math.abs(a - b)).reduce((acc, _, i) => acc + i + 1, 0);
const sum = criteria => position => data.reduce((acc, d) => acc + criteria(position, d), 0);

console.log('Part 1 result', min(range(sum(plain), min(data), max(data))));
console.log('Part 2 result', min(range(sum(progressive), min(data), max(data))));
