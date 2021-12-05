const {input: {parseBits}, formatting: {toDecimal}} = require('../utils');

const report = parseBits(`
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`);

const mostCommon = (arr, i) => arr
    .reduce((acc, n) => acc + n[i], 0) >= arr.length / 2 ? 1 : 0;

const filterByCriteria = (bitCriteria, arr=report, i=0) => {
    const filtered = arr.filter(n => n[i] === bitCriteria(arr, i));
    return arr.length === 1 ? arr[0] : filterByCriteria(bitCriteria, filtered, i + 1);
}

const gammaRate = report[0].map((_, i) => mostCommon(report, i));
const omegaRate = report[0].map((_, i) => 1 - mostCommon(report, i));

const oxygenRating = filterByCriteria(mostCommon);
const CO2Rating = filterByCriteria((...args) => 1 - mostCommon(...args));

console.log('Power consumption is:', toDecimal(gammaRate) * toDecimal(omegaRate));
console.log('Life support rating:', toDecimal(oxygenRating) * toDecimal(CO2Rating));
