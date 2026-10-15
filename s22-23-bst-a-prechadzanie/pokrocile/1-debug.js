/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  11 BST A PRECHÁDZANIE STROMU – DEBUGGING (príklady 1–3)         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * BST pravidlo: všetko v ĽAVOM podstrome je menšie, v PRAVOM väčšie.
 * Metódy označené ⚠ majú CHYBY.
 *
 * Testy porovnávajú tvar stromu ako vnorené polia [hodnota, ľavý, pravý]:
 *        10
 *       /  \        → [10, [6, null, null], [15, null, null]]
 *      6    15
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: https://visualgo.net/en/bst – nakresli si, kam má nová hodnota padnúť.
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

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) insert – vloží hodnotu a vráti this; duplicita → undefined
  // ───────────────────────────────────────────────────────────────────
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
        current = current.right;
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
  // ⚠ 2) find – vráti UZOL s hodnotou, alebo undefined
  //      contains – true/false
  // ───────────────────────────────────────────────────────────────────
  find(value) {
    let current = this.root;
    while (current) {
      if (value > current.value) current = current.left;
      else if (value < current.value) current = current.right;
      else return current;
    }
    return false;
  }

  contains(value) {
    return this.find(value) !== undefined;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 3) DFS prechody – vrátia pole hodnôt
  //    PreOrder:  uzol, ľavý, pravý   → [10, 6, 3, 8, 15, 20]
  //    InOrder:   ľavý, uzol, pravý   → [3, 6, 8, 10, 15, 20]  (zoradené!)
  // ───────────────────────────────────────────────────────────────────
  DFSPreOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return data;
  }

  DFSInOrder() {
    const data = [];
    const traverse = (node) => {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    if (this.root) traverse(this.root);
    return data;
  }
}

module.exports = { BinarySearchTree };

if (require.main === module) {
  require('../../lib/test-runner').spusti('11 BST a prechádzanie – Debugging', require('./testy').debug, module.exports);
}
