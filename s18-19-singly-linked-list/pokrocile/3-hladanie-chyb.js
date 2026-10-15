/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  08 SINGLY LINKED LIST – HĽADANIE CHÝB (príklady 7–9)            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Metódy remove, insert a rotate vyzerajú správne a na bežných vstupoch
 * fungujú. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE OPERÁCIÍ (začína sa od prázdneho zoznamu),
 *      po ktorých pôvodný kód skončí v zlom stave alebo spadne:
 *        [['push', 1], ['push', 2], ['pop']]
 *      znamená list.push(1); list.push(2); list.pop();
 *   2. Oprav metódu.
 *
 * Ostatné metódy (push, pop, shift, unshift, get) sú správne.
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

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;
    return oldHead;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
    return current;
  }

  // ───────────────────────────────────────────────────────────────────
  // 7) remove – odstráni uzol na indexe a vráti ho; neplatný index → undefined
  // ───────────────────────────────────────────────────────────────────
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    removed.next = null;
    this.length--;
    return removed;
  }

  // ───────────────────────────────────────────────────────────────────
  // 8) insert – vloží hodnotu na index (0 … length) a vráti true;
  //    neplatný index → false
  // ───────────────────────────────────────────────────────────────────
  insert(index, val) {
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const prev = this.get(index - 1);
    const node = new Node(val);
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
  }

  // ───────────────────────────────────────────────────────────────────
  // 9) rotate – otočí zoznam o k pozícií DOĽAVA (záporné k = doprava)
  //    1→2→3→4→5, rotate(2)  ⇒ 3→4→5→1→2
  //    1→2→3→4→5, rotate(-1) ⇒ 5→1→2→3→4
  // ───────────────────────────────────────────────────────────────────
  rotate(k) {
    if (this.length <= 1) return this;
    const steps = k % this.length;
    for (let i = 0; i < steps; i++) {
      const node = this.shift();
      this.push(node.val);
    }
    return this;
  }
}

const protipriklad7 = ___;
const protipriklad8 = ___;
const protipriklad9 = ___;

module.exports = { SinglyLinkedList, protipriklad7, protipriklad8, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('08 Singly Linked List – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
