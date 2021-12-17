exports.sum = arr => arr
    .reduce((a, b) => a + b, 0);

exports.mul = arr => arr
    .reduce((a, b) => a * b, 1);

exports.times = (func, n) =>
    this.zeros(n)
    .map((_,i) => func(i));

exports.min = arr =>
    Math.min.apply(null, arr);

exports.max = arr =>
    Math.max.apply(null, arr);

exports.range = (func, from, to) =>
    this.zeros(to + 1 - from)
    .map((_,i) => func(i + from));

exports.pairs = (from, to) =>
    this.range((x) =>
		this.range((y) => [x, y],
		from, to),
	from, to).flat();

exports.sort = (arr, getter=x=>x) =>
    arr.sort((a, b) => getter(a) > getter(b) ? 1 : -1);

exports.zeros = n =>
    new Array(n).fill(0);

exports.range = (func, from, to) =>
    this.zeros(to - from)
    .map((_,i) => func(i + from));

