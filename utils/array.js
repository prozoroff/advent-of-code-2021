exports.sum = arr => arr
	.reduce((a, b) => a + b, 0);

exports.times = (func, n) =>
	new Array(n)
	.fill(true)
	.map((_,i) => func(null, i));
