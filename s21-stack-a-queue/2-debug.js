/*
 * s21 Stack a Queue – DEBUGGING (10 úloh)
 *
 * Každá úloha má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy si zásobník / rad pripravia samy, takže poradie úloh je jedno.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 */
'use strict';

// pomocná – správna: uzol
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 1) – 3) Stack pomocou linked listu (vrch = first)
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 1) push – pridá na vrch, vráti novú veľkosť
  push(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      const temp = this.first;
      this.first = node;
      this.first.next = this.first;
    }
    return ++this.size;
  }

  // 2) pop – odoberie vrch a vráti jeho hodnotu (prázdny → null)
  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return this.first.val;
  }

  // 3) peek – hodnota navrchu, nič neodoberie
  peek() {
    if (!this.first) return null;
    return this.last.val;
  }
}

// 4) – 5) Queue pomocou linked listu (von ide first, pridáva sa za last)
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 4) enqueue – pridá na koniec radu, vráti novú veľkosť
  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.first.next = node;
      this.last = node;
    }
    return ++this.size;
  }

  // 5) dequeue – odoberie zo začiatku radu a vráti hodnotu (prázdny → null)
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp;
  }
}

// 6) ArrayStack – zásobník pomocou poľa
class ArrayStack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.shift();
  }
}

// 7) ArrayQueue – rad pomocou poľa
class ArrayQueue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    return this.items.pop();
  }
}

// 8) isBalanced – sú zátvorky ( ) [ ] { } správne uzavreté?
//    isBalanced('({[]})') → true,   isBalanced('((') → false
function isBalanced(str) {
  const pary = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pary) {
      if (stack.pop() !== pary[ch]) return false;
    }
  }
  return true;
}

// 9) reverseString – otočí text pomocou zásobníka
//    reverseString('ahoj') → 'joha'
function reverseString(str) {
  const stack = [];
  for (const ch of str) stack.push(ch);
  let result = '';
  while (stack.length > 0) {
    result += stack.shift();
  }
  return result;
}

// 10) backTo – história prehliadača; steps-krát stlač Späť a vráť aktuálnu stránku
//     backTo(['a', 'b', 'c', 'd'], 2) → 'b'
function backTo(history, steps) {
  const stack = history.slice();
  for (let i = 0; i <= steps; i++) {
    stack.pop();
  }
  return stack[stack.length - 1];
}

module.exports = { Stack, Queue, ArrayStack, ArrayQueue, isBalanced, reverseString, backTo };

if (require.main === module) {
  require('../lib/test-runner').spusti('s21 Stack a Queue – Debugging', require('./testy').debug, module.exports);
}
