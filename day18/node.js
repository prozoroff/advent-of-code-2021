const { floor, ceil } = Math;

class Node {
  constructor(values, parent) {
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
    return this.isLeaf
      ? [this]
      : this.left.leaves().concat(this.right.leaves());
  }

  magnitude() {
    return this.isLeaf
      ? this.value
      : 3 * this.left.magnitude() + 2 * this.right.magnitude();
  }

  depth(depth = 0) {
    return this.parent ? this.parent.depth(depth + 1) : depth;
  }

  root() {
    return this.parent ? this.parent.root() : this;
  }

  explode() {
    const { left, right, parent } = this;
    const depth = this.depth();
    if (left.isLeaf && right.isLeaf && depth >= 4) {
      const zeroLeaf = new Node(0, parent);
      parent.left === this && (parent.left = zeroLeaf);
      parent.right === this && (parent.right = zeroLeaf);

      const leaves = this.root().leaves();
      const i = leaves.indexOf(zeroLeaf);
      i > 0 && (leaves[i - 1].value += left.value);
      i < leaves.length - 1 && (leaves[i + 1].value += right.value);

      return true;
    } else {
      return (
        (!left.isLeaf && left.explode()) || (!right.isLeaf && right.explode())
      );
    }
  }

  split() {
    const { left, right } = this;

    if (left.isLeaf && left.value >= 10) {
      this.left = new Node([floor(left.value / 2), ceil(left.value / 2)], this);
      return true;
    }

    if (right.isLeaf && right.value >= 10) {
      this.right = new Node(
        [floor(right.value / 2), ceil(right.value / 2)],
        this
      );
      return true;
    }

    return (!left.isLeaf && left.split()) || (!right.isLeaf && right.split());
  }

  reduce() {
    while (this.explode() || this.split()) {}
    return this;
  }
}

exports.Node = Node;
