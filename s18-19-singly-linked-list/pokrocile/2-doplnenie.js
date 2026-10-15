/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  08 SINGLY LINKED LIST – DOPLŇ KÓD (príklady 4–6)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  v metódach pop, reverse a removeAll.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // 4) pop – prejdi zoznam a zapamätaj si PREDPOSLEDNÝ uzol (newTail)
  // ───────────────────────────────────────────────────────────────────
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = ___;
    this.length--;
    if (this.length === ___) {
      this.head = null;
      this.tail = null;
    }
    return ___;
  }

  // ───────────────────────────────────────────────────────────────────
  // 5) reverse – otočí zoznam NA MIESTE (žiadne nové uzly, žiadne pole)
  //    1→2→3  ⇒  3→2→1
  // ───────────────────────────────────────────────────────────────────
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = ___;
    let prev = null;
    while (node) {
      const next = node.___;
      node.next = prev;
      prev = ___;
      node = next;
    }
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // 6) removeAll – odstráni VŠETKY uzly s hodnotou val, vráti ich počet.
  //    Najprv vyrieš uzly na začiatku (mení sa head), potom zvyšok.
  // ───────────────────────────────────────────────────────────────────
  removeAll(val) {
    let removed = 0;
    while (this.head && this.head.val === val) {
      this.head = this.head.___;
      removed++;
    }
    let current = this.head;
    while (current && current.next) {
      if (current.next.val === val) {
        current.next = current.next.next;
        removed++;
      } else {
        current = ___;
      }
    }
    this.tail = ___;
    this.length -= ___;
    return removed;
  }
}

module.exports = { SinglyLinkedList };

if (require.main === module) {
  require('../../lib/test-runner').spusti('08 Singly Linked List – Doplň kód', require('./testy').doplnenie, module.exports);
}
