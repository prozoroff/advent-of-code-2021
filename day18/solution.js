const {Node} = require('./node');
const {array: {max, pairs}} = require('../utils');

const lines = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`.split('\n').filter(x => x).map(l => JSON.parse(l));

const fullMagnitude = lines.reduce((acc, line, i) => {
	return i ? new Node([acc, line]).reduce() : acc;
}, new Node(lines[0])).magnitude();

const maxMagnitude = max(pairs(0, lines.length - 1).map(([i, j]) => 
	new Node([lines[i], lines[j]]).reduce().magnitude()));

console.log('Part 1 result: ', fullMagnitude);
console.log('Part 2 result: ', maxMagnitude);