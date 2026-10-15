/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  11 BST A PRECHÁDZANIE STROMU – HĽADANIE CHÝB (príklady 7–9)     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš vstup, na ktorom pôvodný kód zlyhá:
 *      - príklad 7 (funkcia): POLE ARGUMENTOV, strom zapíš ako objekt;
 *        left/right môžeš vynechať:
 *          [{ value: 5, left: { value: 3 }, right: { value: 8 } }]
 *      - príklady 8, 9 (metódy): POLE OPERÁCIÍ od prázdneho stromu:
 *          [['insert', 5], ['insert', 3], ['remove', 5]]
 *   2. Oprav kód.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) validateBST – je strom platný BST? (Bez duplicít: ľavý podstrom
//    PRÍSNE menší, pravý PRÍSNE väčší – a to pre CELÉ podstromy.)
// ─────────────────────────────────────────────────────────────────────
function validateBST(root) {
  if (!root) return true;
  if (root.left && root.left.value >= root.value) return false;
  if (root.right && root.right.value <= root.value) return false;
  return validateBST(root.left) && validateBST(root.right);
}
const protipriklad7 = ___;

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
  // 8) remove – odstráni hodnotu zo stromu, vráti this.
  //    Uzol s 0 alebo 1 dieťaťom: nahradí ho dieťa.
  //    Uzol s 2 deťmi: nahradí ho nasledovník (najmenší v pravom podstrome).
  // ───────────────────────────────────────────────────────────────────
  remove(value) {
    let parent = null;
    let node = this.root;
    while (node && node.value !== value) {
      parent = node;
      node = value < node.value ? node.left : node.right;
    }
    if (!node) return this;
    if (node.left && node.right) {
      let succParent = node;
      let succ = node.right;
      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }
      node.value = succ.value;
      if (succParent === node) succParent.right = succ.right;
      else succParent.left = null;
      return this;
    }
    const child = node.left || node.right;
    if (!parent) this.root = child;
    else if (parent.left === node) parent.left = child;
    else parent.right = child;
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // 9) findSecondLargest – druhá najväčšia hodnota (menej ako 2 uzly → undefined)
  // ───────────────────────────────────────────────────────────────────
  findSecondLargest() {
    let parent = null;
    let current = this.root;
    if (!current) return undefined;
    while (current.right) {
      parent = current;
      current = current.right;
    }
    return parent ? parent.value : undefined;
  }
}
const protipriklad8 = ___;
const protipriklad9 = ___;

module.exports = { validateBST, protipriklad7, BinarySearchTree, protipriklad8, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('11 BST a prechádzanie – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
