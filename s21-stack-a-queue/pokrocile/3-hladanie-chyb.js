/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  10 STACK A QUEUE – HĽADANIE CHÝB (príklady 7–9)                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš vstup, na ktorom pôvodný kód zlyhá:
 *      - pre triedy POLE OPERÁCIÍ: [['enqueue', 1], ['dequeue']]
 *      - pre funkcie POLE ARGUMENTOV: [[1, 2, 3]]
 *   2. Oprav kód.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 7) Queue – enqueue je správne, chyba je v dequeue
// ─────────────────────────────────────────────────────────────────────
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    this.first = this.first.next;
    if (this.first === this.last) this.last = null;
    this.size--;
    return temp.value;
  }
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) dailyTemperatures – pre každý deň: o koľko dní príde PRÍSNE TEPLEJŠÍ
//    deň? (0, ak už nepríde). Monotónny zásobník indexov, O(n).
//    [73, 74, 75, 71, 69, 72, 76, 73] → [1, 1, 4, 2, 1, 1, 0, 0]
// ─────────────────────────────────────────────────────────────────────
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length > 0 && temps[i] >= temps[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
  }
  return result;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) MinStack – zásobník, ktorý vie v O(1) povedať aktuálne minimum.
//    push(x), pop() → hodnota alebo null, getMin() → minimum alebo null
// ─────────────────────────────────────────────────────────────────────
class MinStack {
  constructor() {
    this.items = [];
    this.min = null;
  }

  push(value) {
    this.items.push(value);
    if (this.min === null || value < this.min) this.min = value;
  }

  pop() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  getMin() {
    return this.min;
  }
}
const protipriklad9 = ___;

module.exports = { Queue, protipriklad7, dailyTemperatures, protipriklad8, MinStack, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('10 Stack a Queue – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
