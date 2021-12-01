const data = [
	199,
	200,
	208,
	210,
	200,
	207,
	240,
	269,
	260,
	263,
];

const countPositive = array => array.filter(item => item > 0).length;
const getWindowDiff = (ind, size) => ind < data.length - size && (data[ind + size] - data[ind]);
const getDiffsArray = windowSize => data.map((item, i) => getWindowDiff(i, windowSize));
const increasesCount = windowSize => countPositive(getDiffsArray(windowSize));

console.log('Measurement increases', increasesCount(1), 'times');
console.log('Sliding window increases', increasesCount(3), 'times');
