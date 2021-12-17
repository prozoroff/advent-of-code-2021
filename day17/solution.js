const {array: {max, pairs}} = require('../utils');

const [xFrom, xTo, yFrom, yTo] = 'target area: x=20..30, y=-10..-5'
	.match(/x=(\d+)..(\d+), y=(-?\d+)..(-?\d+)/).slice(1).map(m => parseInt(m));

const move = ([vx, vy], x = 0, y = 0, path = []) => {
	path.push({x, y});
	if (x >= xFrom && x <= xTo && y >= yFrom && y <= yTo) {
		return path;
	}
	return y > yFrom && move([vx - Math.sign(vx), vy - 1], x + vx, y + vy, path);
}

const variety = 2 * max([xFrom, xTo, yFrom, yTo].map(t => Math.abs(t)));
const result = pairs(-variety, variety).map(pair => move(pair))
	.filter(path => path).map(path => max(path.map(p => p.y)));

console.log('Part 1 result:', max(result));
console.log('Part 2 result:', result.length);