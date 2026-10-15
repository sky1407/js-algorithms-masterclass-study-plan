/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  10 STACK A QUEUE – DOPLŇ KÓD (príklady 4–6)                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 * Tu používame pole ako zásobník: push = vlož na vrch, pop = vyber z vrchu.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) isBalanced – sú všetky zátvorky (), [], {} správne spárované?
//    Ostatné znaky ignoruj.
//    isBalanced('{[()()]}') → true,  isBalanced('([)]') → false
// ─────────────────────────────────────────────────────────────────────
function isBalanced(str) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pairs) {
      if (stack.pop() !== pairs[___]) return false;
    }
  }
  return stack.length === ___;
}

// ─────────────────────────────────────────────────────────────────────
// 5) removeAdjacentDuplicates – opakovane maž dvojice rovnakých susedných
//    znakov, kým sa dá.
//    'abbaca' → 'aaca' → 'ca'
// ─────────────────────────────────────────────────────────────────────
function removeAdjacentDuplicates(str) {
  const stack = [];
  for (const ch of str) {
    if (stack.length > 0 && stack[stack.length - ___] === ch) stack.pop();
    else stack.push(ch);
  }
  return stack.join(___);
}

// ─────────────────────────────────────────────────────────────────────
// 6) QueueFromStacks – fronta (FIFO) postavená z DVOCH zásobníkov.
//    inbox: sem idú nové prvky. outbox: odtiaľto sa vyberá.
//    Keď je outbox prázdny, preleje sa doň celý inbox (tým sa otočí poradie).
//    Každý prvok sa presunie najviac raz → amortizovane O(1).
// ─────────────────────────────────────────────────────────────────────
class QueueFromStacks {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(value) {
    this.inbox.push(value);
    return this.size();
  }

  dequeue() {
    if (this.outbox.length === ___) {
      while (this.inbox.length > 0) this.outbox.push(this.inbox.pop());
    }
    return this.outbox.length > 0 ? this.outbox[___]() : null;
  }

  size() {
    return this.inbox.length + this.outbox.___;
  }
}

module.exports = { isBalanced, removeAdjacentDuplicates, QueueFromStacks };

if (require.main === module) {
  require('../../lib/test-runner').spusti('10 Stack a Queue – Doplň kód', require('./testy').doplnenie, module.exports);
}
