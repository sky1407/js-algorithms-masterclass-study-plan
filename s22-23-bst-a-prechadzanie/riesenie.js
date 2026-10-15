/*
 * s22-23 Binary Search Tree a prechádzanie – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * Trieda BST obsahuje všetky metódy. BinarySearchTree (2-debug.js) je ten istý strom.
 */
'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
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
        if (current.left === null) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }

  insert2(value) {
    return this.insert(value);
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return undefined;
  }

  contains(value) {
    return this.find(value) !== undefined;
  }

  min() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.value;
  }

  findMin() {
    return this.min();
  }

  findMax() {
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }

  bfs() {
    const visited = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      visited.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  bfs2() {
    return this.bfs();
  }

  preOrder() {
    const visited = [];
    function traverse(node) {
      visited.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  postOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.value);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  inOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  height() {
    function h(node) {
      if (!node) return 0;
      return 1 + Math.max(h(node.left), h(node.right));
    }
    return h(this.root);
  }
}

module.exports = { Node, TreeNode: Node, BST, BinarySearchTree: BST };
