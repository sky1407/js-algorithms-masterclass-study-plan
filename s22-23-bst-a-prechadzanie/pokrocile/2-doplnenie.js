/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  11 BST A PRECHÁDZANIE STROMU – DOPLŇ KÓD (príklady 4–6)         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

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

  // ───────────────────────────────────────────────────────────────────
  // 4) BFS – prechod po úrovniach (zhora nadol, zľava doprava)
  //        10
  //       /  \
  //      6    15        → [10, 6, 15, 3, 8, 20]
  //     / \     \
  //    3   8     20
  //    Používa FRONTU: vyber zo začiatku, deti pridaj na koniec.
  // ───────────────────────────────────────────────────────────────────
  BFS() {
    const data = [];
    if (!this.root) return data;
    const queue = [this.root];
    while (queue.length) {
      const node = queue[___]();
      data.push(node.value);
      if (node.left) queue.push(node.___);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  // ───────────────────────────────────────────────────────────────────
  // 5) DFSPostOrder – ľavý, pravý, až potom uzol → [3, 8, 6, 20, 15, 10]
  //    (Využitie: mazanie stromu – deti zmažeš skôr ako rodiča.)
  // ───────────────────────────────────────────────────────────────────
  DFSPostOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.___);
      if (node.right) traverse(node.right);
      data[___](node.value);
    };
    if (this.root) traverse(this.root);
    return data;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 6) height – výška stromu = počet uzlov na najdlhšej ceste od koreňa
//    k listu. Prázdny strom → 0, jeden uzol → 1.
// ─────────────────────────────────────────────────────────────────────
function height(node) {
  if (!node) return ___;
  return ___ + Math.max(height(node.left), height(node.right));
}

module.exports = { BinarySearchTree, height };

if (require.main === module) {
  require('../../lib/test-runner').spusti('11 BST a prechádzanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
