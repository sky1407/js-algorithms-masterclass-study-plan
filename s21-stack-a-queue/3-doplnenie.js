/*
 * s21 Stack a Queue – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy si zásobník / rad pripravia samy, takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class StackD {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 1) push
  push(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      const temp = this.first;
      this.first = node;
      this.first.next = ___;
    }
    return ++this.size;
  }

  // 2) push2 – to isté, iná medzera
  push2(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    return ++this.___;
  }

  // 3) pop
  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.___;
    this.size--;
    return temp.val;
  }

  // 4) pop2 – to isté, iná medzera
  pop2() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.___;
  }
}

class QueueD {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 5) enqueue
  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.___ = node;
      this.last = node;
    }
    return ++this.size;
  }

  // 6) enqueue2 – to isté, iná medzera
  enqueue2(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = ___;
    }
    return ++this.size;
  }

  // 7) dequeue
  dequeue() {
    if (!this.first) return null;
    const temp = this.___;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}

// 8) ArrStack – zásobník z poľa
class ArrStack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.___();
  }
}

// 9) ArrQueue – rad z poľa
class ArrQueue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    return this.items.___();
  }
}

// 10) balanced – sú zátvorky v poriadku? (dve ___)
//     balanced('[()]') → true
function balanced(str) {
  const pary = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pary) {
      if (stack.___() !== pary[ch]) return false;
    }
  }
  return stack.length === ___;
}

module.exports = { StackD, QueueD, ArrStack, ArrQueue, balanced };

if (require.main === module) {
  require('../lib/test-runner').spusti('s21 Stack a Queue – Doplň kód', require('./testy').doplnenie, module.exports);
}
