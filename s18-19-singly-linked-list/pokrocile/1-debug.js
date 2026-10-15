/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  08 SINGLY LINKED LIST – DEBUGGING (príklady 1–3)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Metódy označené ⚠ majú CHYBY. Ostatné (push, unshift) sú správne.
 * Testy robia sériu operácií a porovnávajú výsledok so správnou implementáciou:
 *   hodnoty  – čo nájdeš, keď prejdeš zoznam od head po next
 *   length   – musí sedieť s počtom uzlov
 *   head / tail – hodnoty prvého a posledného uzla
 *   tailJePoslednyUzol – tail musí byť naozaj posledný uzol v reťazi
 * Návratová hodnota { uzol: 5 } znamená „vrátil uzol s hodnotou 5“.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: nakresli si krabičky a šípky na papier. Vždy sa pýtaj:
 *      „Čo sa stane s head, tail a length pri 0, 1 a viac prvkoch?“
 */
'use strict';

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

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) pop – odoberie POSLEDNÝ uzol a vráti ho (prázdny zoznam → undefined)
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
    this.length--;
    return current;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2) shift – odoberie PRVÝ uzol a vráti ho (prázdny zoznam → undefined)
  // ───────────────────────────────────────────────────────────────────
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = this.head.next;
    return oldHead;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 3a) get – vráti UZOL na indexe, neplatný index → null
  // ───────────────────────────────────────────────────────────────────
  get(index) {
    if (index < 0 || index > this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 3b) insert – vloží novú hodnotu na index a vráti true;
  //       neplatný index (< 0 alebo > length) → false
  // ───────────────────────────────────────────────────────────────────
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const prev = this.get(index);
    const node = new Node(val);
    node.next = prev.next;
    prev.next = node;
    return true;
  }
}

module.exports = { SinglyLinkedList };

if (require.main === module) {
  require('../../lib/test-runner').spusti('08 Singly Linked List – Debugging', require('./testy').debug, module.exports);
}
