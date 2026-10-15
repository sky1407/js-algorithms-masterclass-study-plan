/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  10 STACK A QUEUE – DEBUGGING (príklady 1–3)                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Stack = LIFO (posledný dnu, prvý von), Queue = FIFO (prvý dnu, prvý von).
 * Obe sú tu postavené na spájanom zozname, aby push/pop/enqueue/dequeue
 * boli O(1). Každá trieda / funkcia má CHYBY.
 *
 * Testy porovnávajú návratové hodnoty a stav (hodnoty od first po next,
 * size, či last ukazuje na posledný uzol).
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 1) Stack – push pridá na VRCH (first) a vráti novú veľkosť,
//    pop odoberie z vrchu a vráti HODNOTU (prázdny → null)
// ─────────────────────────────────────────────────────────────────────
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      const temp = this.first;
      this.first = node;
      this.first.next = temp;
    }
    return this.size++;
  }

  pop() {
    if (!this.first) return null;
    const temp = this.first;
    this.first = this.first.next;
    this.size--;
    return temp;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 2) Queue – enqueue pridá na KONIEC (last) a vráti novú veľkosť,
//    dequeue odoberie zo začiatku (first) a vráti hodnotu (prázdna → null)
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
    this.size--;
    return temp.value;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 3) evalRPN – vypočíta výraz v postfixovej (reverse Polish) notácii.
//    ['2', '1', '+', '3', '*']  =  (2 + 1) * 3  =  9
//    Delenie je celočíselné, zaokrúhľuje sa SMEROM K NULE: 7 / -2 = -3
// ─────────────────────────────────────────────────────────────────────
function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (['+', '-', '*', '/'].includes(t)) {
      const a = stack.pop();
      const b = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.floor(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack.pop();
}

module.exports = { Stack, Queue, evalRPN };

if (require.main === module) {
  require('../../lib/test-runner').spusti('10 Stack a Queue – Debugging', require('./testy').debug, module.exports);
}
