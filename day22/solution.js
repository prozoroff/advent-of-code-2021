const fs = require('fs');
const {array: {sum, mul, times}} = require('../utils');

const input = fs.readFileSync('./input.txt', 'utf8')
	.split('\n').filter(l => l).map(line => {
	[_, x1, x2, _, y1, y2, _, z1, z2] = line
		.split(' ')[1].split(/=(-?\d+)..(-?\d+)/)
		.map(coord => parseInt(coord));
	return {
		isOn: line.split(' ')[0] === 'on',
		ranges: [[x1, x2], [y1, y2], [z1, z2]],
	};
});

const intersects = (cuboid1, cuboid2) => {
	const intersections = times((i) => [
	  Math.max(cuboid1[i][0], cuboid2[i][0]),
	  Math.min(cuboid1[i][1], cuboid2[i][1]),
	], 3);
	return !intersections.some(([min, max]) => min > max) && intersections;
}

function countOn(range) {
	const cuboids = [];

	input.forEach(({isOn, ranges}) => {
		const cuboid1 = ranges.map(([min, max]) =>
			[Math.max(range[0], min), Math.min(range[1], max)]);
		
		if (!cuboid1.some(([min, max]) => min > max)) {
			cuboids.forEach(({isOn: isOn2, cuboid: cuboid2}) => {
				const intersection = intersects(cuboid1, cuboid2);
				intersection && cuboids.push({isOn: !isOn2, cuboid: intersection});
			});

			isOn && cuboids.push({isOn, cuboid: cuboid1});
		}
	})

	return sum(cuboids.map(({ isOn, cuboid }) =>
		(isOn ? 1 : -1) * mul(cuboid.map(([min, max]) => max + 1 - min))));
}

console.log('Part 1 result:', countOn([-50, 50]));
console.log('Part 1 result:', countOn([-Infinity, Infinity]));
