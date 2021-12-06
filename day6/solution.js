const {array: {sum}, function: {memoize}} = require('../utils');

const fish = '3,4,3,1,2'.split(',');

const countFish = memoize((age, days) => days
	? countFish(age === 0 ? 6 : age - 1, days - 1) + (age === 0 ? countFish(8, days - 1) : 0)
	: 1
);

const total = sum(fish.map(f => countFish(f, 256)));

console.log('There would be a total of', total, 'lanternfish');
