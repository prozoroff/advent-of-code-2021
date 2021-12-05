const {input: {parseInts}} = require('../utils');

const data = parseInts(`
199
200
208
210
200
207
240
269
260
263
`);

const increasesCount = windowSize => data
	.map((_, i) => i < data.length - windowSize && (data[i + windowSize] - data[i]))
	.filter(item => item > 0).length;

console.log('Measurement increases', increasesCount(1), 'times');
console.log('Sliding window increases', increasesCount(3), 'times');
