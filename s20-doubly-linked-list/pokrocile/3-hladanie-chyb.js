/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  09 DOUBLY LINKED LIST – HĽADANIE CHÝB (príklady 7–9)            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Metódy remove, insert a set vyzerajú správne a na bežných vstupoch
 * fungujú. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE OPERÁCIÍ (od prázdneho zoznamu),
 *      po ktorých pôvodný kód vráti zlý výsledok, skončí v zlom stave
 *      alebo spadne:  [['push', 1], ['push', 2], ['pop']]
 *   2. Oprav metódu.
 *
 * Ostatné metódy sú správne.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
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
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    const popped = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popped.prev;
      this.tail.next = null;
      popped.prev = null;
    }
    this.length--;
    return popped;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) current = current.next;
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) current = current.prev;
    }
    return current;
  }

  // ───────────────────────────────────────────────────────────────────
  // 7) remove – odstráni uzol na indexe a vráti ho (neplatný → undefined)
  // ───────────────────────────────────────────────────────────────────
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length) return this.pop();
    const removed = this.get(index);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }

  // ───────────────────────────────────────────────────────────────────
  // 8) insert – vloží hodnotu na index (0 … length), vráti true/false
  // ───────────────────────────────────────────────────────────────────
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    const before = this.get(index - 1);
    const after = before.next;
    const node = new Node(val);
    node.prev = before;
    node.next = after;
    before.next = node;
    after.prev = node;
    this.length++;
    return true;
  }

  // ───────────────────────────────────────────────────────────────────
  // 9) set – zmení hodnotu na indexe; vráti true, ak sa to podarilo,
  //    inak false
  // ───────────────────────────────────────────────────────────────────
  set(index, val) {
    const node = this.get(index);
    if (node) node.val = val;
    return true;
  }
}

const protipriklad7 = ___;
const protipriklad8 = ___;
const protipriklad9 = ___;

module.exports = { DoublyLinkedList, protipriklad7, protipriklad8, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('09 Doubly Linked List – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
