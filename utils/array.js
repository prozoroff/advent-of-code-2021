exports.sum = arr => arr
    .reduce((a, b) => a + b, 0);

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

exports.sort = arr =>
    arr.sort((a, b) => a > b ? 1 : -1);

exports.zeros = n =>
    new Array(n).fill(0);

