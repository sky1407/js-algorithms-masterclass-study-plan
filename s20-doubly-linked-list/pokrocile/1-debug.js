/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  09 DOUBLY LINKED LIST – DEBUGGING (príklady 1–3)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Metódy označené ⚠ majú CHYBY. push je správny.
 * Testy robia sériu operácií a porovnávajú stav so správnou implementáciou:
 *   hodnoty – prechod od head po next
 *   dozadu  – prechod od tail po prev (musí byť presný opak!)
 *   prevSedia – každý uzol.prev ukazuje na uzol pred ním (head.prev = null)
 *   tailJePoslednyUzol – tail je naozaj posledný uzol
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: pri DLL má každá zmena DVE strany – ak meníš a.next, skontroluj aj b.prev.
 */
'use strict';

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

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) pop – odoberie posledný uzol a vráti ho
  // ───────────────────────────────────────────────────────────────────
  pop() {
    if (!this.head) return undefined;
    const popped = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popped.prev;
      popped.prev = null;
    }
    this.length--;
    return popped;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2a) shift – odoberie prvý uzol a vráti ho
  // ───────────────────────────────────────────────────────────────────
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2b) unshift – pridá uzol na začiatok
  // ───────────────────────────────────────────────────────────────────
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
  // ⚠ 3) get – ak je index v prvej polovici, ide od head dopredu,
  //    inak od tail dozadu (to je výhoda DLL). Neplatný index → null.
  // ───────────────────────────────────────────────────────────────────
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) current = current.next;
    } else {
      current = this.tail;
      let count = this.length;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }
}

module.exports = { DoublyLinkedList };

if (require.main === module) {
  require('../../lib/test-runner').spusti('09 Doubly Linked List – Debugging', require('./testy').debug, module.exports);
}
