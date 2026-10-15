/*
 * s22-23 Binary Search Tree a prechádzanie – DEBUGGING (10 úloh)
 *
 * Každá metóda má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy si strom pripravia samy (okrem testu insert), takže poradie úloh je jedno.
 * Testovací strom:        10
 *                       /    \
 *                      6      15
 *                     / \       \
 *                    3   8       20
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// pomocná – správna: uzol stromu
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

  // 1) insert – vloží hodnotu, vráti this (duplikát → undefined)
  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value > current.value) {
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

  // 2) find – vráti uzol s hodnotou, inak undefined
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.left;
    }
    return undefined;
  }

  // 3) contains – je hodnota v strome?
  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return true;
  }

  // 4) findMin – najmenšia hodnota
  findMin() {
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }

  // 5) findMax – najväčšia hodnota
  findMax() {
    let current = this.root.left;
    while (current.right) current = current.right;
    return current.value;
  }

  // 6) bfs – hodnoty po poschodiach
  bfs() {
    const visited = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const node = queue.pop();
      visited.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  // 7) preOrder – uzol, ľavý, pravý
  preOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  // 8) postOrder – ľavý, pravý, uzol
  postOrder() {
    const visited = [];
    function traverse(node) {
      if (node.right) traverse(node.right);
      if (node.left) traverse(node.left);
      visited.push(node.value);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  // 9) inOrder – ľavý, uzol, pravý
  inOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.left);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  // 10) height – počet poschodí stromu
  height() {
    function h(node) {
      if (!node) return 0;
      return 1 + Math.min(h(node.left), h(node.right));
    }
    return h(this.root);
  }
}

module.exports = { BinarySearchTree };

if (require.main === module) {
  require('../lib/test-runner').spusti('s22-23 BST a prechádzanie – Debugging', require('./testy').debug, module.exports);
}
