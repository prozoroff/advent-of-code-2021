const {floor, ceil} = Math;

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

class Node {
	constructor(values, parent){
		this.init(values);
		this.parent = parent;
	}

	init(values) {
		if (!values.length) {
			this.value = values;
			this.isLeaf = true;
		} else {
			const [left, right] = values;
			this.left = this.createItem(left);
			this.right = this.createItem(right);
		}
	}

	createItem(value) {
		if (value instanceof Node) {
			value.parent = this;
			return value;
		} else {
			return new Node(value, this);
		}
	}

	leaves() {
		return this.isLeaf ? [this] : this.left.leaves().concat(this.right.leaves());
	}

	magnitude() {
		return this.isLeaf ? this.value : 3 * this.left.magnitude() + 2 * this.right.magnitude();
	}

	depth(depth = 0) {
		return this.parent ? this.parent.depth(depth + 1) : depth;
	}

	root() {
		return this.parent ? this.parent.root() : this;
	}

	explode() {
		const {left, right, parent} = this;
		const depth = this.depth();
		if (left.isLeaf && right.isLeaf && depth >= 4) {
			const zeroLeaf = new Node(0, parent);
			(parent.left === this) && (parent.left = zeroLeaf);
			(parent.right === this) && (parent.right = zeroLeaf);

			const leaves = this.root().leaves();
			const i = leaves.indexOf(zeroLeaf);
			(i > 0) && (leaves[i - 1].value += left.value);
			(i < leaves.length - 1) && (leaves[i + 1].value += right.value);

			return true;
		} else {
			return (!left.isLeaf && left.explode()) || (!right.isLeaf && right.explode());
		}
	}

	split() {
		const {left, right} = this;

		if (left.isLeaf && left.value >= 10) {
			this.left = new Node([floor(left.value / 2), ceil(left.value / 2)], this);
			return true;
		}

		if (right.isLeaf && right.value >= 10) {
			this.right = new Node([floor(right.value / 2), ceil(right.value / 2)], this);
			return true;
		}

		return !left.isLeaf && left.split() || !right.isLeaf && right.split();
	}

	reduce() {
		while (this.explode() || this.split()) {}
		return this;
	}
}

const result = lines.reduce((acc, line, i) => {
	return i ? new Node([acc, line]).reduce() : acc;
}, new Node(lines[0]))

console.log('Part 1 result: ', result.magnitude());