/*
 * s22-23 Binary Search Tree a prechádzanie – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy si strom pripravia samy (okrem testov insert), takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) TreeNode – uzol stromu
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = ___;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // 2) insert
  insert(value) {
    const node = { value, left: null, right: null };
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.___) {
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

  // 3) insert2 – to isté, iná medzera
  insert2(value) {
    const node = { value, left: null, right: null };
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = ___;
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

  // 4) find
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.___;
    }
    return undefined;
  }

  // 5) contains
  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return ___;
  }

  // 6) bfs
  bfs() {
    const visited = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const node = queue.___();
      visited.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  // 7) bfs2 – to isté, iná medzera
  bfs2() {
    const visited = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      visited.push(node.value);
      if (node.left) queue.push(node.___);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  // 8) preOrder
  preOrder() {
    const visited = [];
    function traverse(node) {
      visited.push(node.___);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  // 9) inOrder
  inOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.___);
    return visited;
  }

  // 10) postOrder (dve ___)
  postOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.___) traverse(node.right);
      visited.push(node.___);
    }
    if (this.root) traverse(this.root);
    return visited;
  }
}

module.exports = { TreeNode, BST };

if (require.main === module) {
  require('../lib/test-runner').spusti('s22-23 BST a prechádzanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
