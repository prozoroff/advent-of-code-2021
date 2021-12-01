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

const diffs = data.map((item, i) => i && item - data[i - 1]);
const increases = diffs.filter(item => item > 0);

console.log('Measurement increases', increases.length, 'times');
