/*
 * RIEŠENIA – 11 Binary Search Tree a prechádzanie stromu
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value < current.value) current = current.left;
      else if (value > current.value) current = current.right;
      else return current;
    }
    return undefined;
  }

  contains(value) {
    return this.find(value) !== undefined;
  }

  BFS() {
    const data = [];
    if (!this.root) return data;
    const queue = [this.root];
    let head = 0;
    while (head < queue.length) {
      const node = queue[head++];
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  DFSPreOrder() {
    const data = [];
    const traverse = (node) => {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    if (this.root) traverse(this.root);
    return data;
  }

  DFSPostOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    };
    if (this.root) traverse(this.root);
    return data;
  }

  DFSInOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    };
    if (this.root) traverse(this.root);
    return data;
  }

  remove(value) {
    const removeNode = (node, val) => {
      if (!node) return null;
      if (val < node.value) {
        node.left = removeNode(node.left, val);
        return node;
      }
      if (val > node.value) {
        node.right = removeNode(node.right, val);
        return node;
      }
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let succ = node.right;
      while (succ.left) succ = succ.left;
      node.value = succ.value;
      node.right = removeNode(node.right, succ.value);
      return node;
    };
    this.root = removeNode(this.root, value);
    return this;
  }

  findSecondLargest() {
    let parent = null;
    let current = this.root;
    if (!current) return undefined;
    while (current.right) {
      parent = current;
      current = current.right;
    }
    if (current.left) {
      let node = current.left;
      while (node.right) node = node.right;
      return node.value;
    }
    return parent ? parent.value : undefined;
  }
}

function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

function validateBST(root) {
  const check = (node, min, max) => {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return check(node.left, min, node.value) && check(node.right, node.value, max);
  };
  return check(root, -Infinity, Infinity);
}
const protipriklad7 = [{ value: 5, left: { value: 3, right: { value: 6 } } }];
const protipriklad8 = [['insert', 5], ['insert', 3], ['insert', 8], ['insert', 6], ['insert', 7], ['remove', 5]];
const protipriklad9 = [['insert', 5], ['insert', 10], ['insert', 7], ['findSecondLargest']];

function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    count++;
    if (count === k) return current.value;
    current = current.right;
  }
  return undefined;
}

function isBalanced(root) {
  const check = (node) => {
    if (!node) return 0;
    const l = check(node.left);
    if (l === -1) return -1;
    const r = check(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return check(root) !== -1;
}

function lowestCommonAncestor(root, a, b) {
  let current = root;
  while (current) {
    if (a < current.value && b < current.value) current = current.left;
    else if (a > current.value && b > current.value) current = current.right;
    else return current.value;
  }
  return undefined;
}

function priceRange(root, low, high) {
  const result = [];
  const walk = (node) => {
    if (!node) return;
    const v = node.value;
    if (v > low) walk(node.left);
    if (v >= low && v <= high) result.push(v);
    if (v < high) walk(node.right);
  };
  walk(root);
  return result;
}

function orgLevels(ceo) {
  if (!ceo) return [];
  const levels = [];
  let level = [ceo];
  while (level.length > 0) {
    levels.push(level.map((e) => e.name));
    const next = [];
    for (const e of level) next.push(...(e.reports || []));
    level = next;
  }
  return levels;
}

module.exports = {
  Node, BinarySearchTree, height,
  validateBST, protipriklad7, protipriklad8, protipriklad9,
  kthSmallest, isBalanced, lowestCommonAncestor,
  priceRange, orgLevels,
};
