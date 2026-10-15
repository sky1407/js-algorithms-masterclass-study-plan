/*
 * s21 Stack a Queue – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy / funkcie sám. Úlohy 2–7 potrebujú hotový Node (úloha 1).
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) Node – uzol s val a next (next je na začiatku null)
class Node {
  constructor(val) {

  }
}

// 2) – 4) zásobník pomocou linked listu (vrch = first)
class LinkedStack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 2) push(val) – pridá na vrch, vráti novú veľkosť
  push(val) {

  }

  // 3) pop() – odoberie vrch a vráti jeho hodnotu; prázdny → null
  pop() {

  }

  // 4) peek() – hodnota navrchu bez odobratia; prázdny → null
  peek() {

  }
}

// 5) – 7) rad pomocou linked listu (von ide first, pridáva sa za last)
class LinkedQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // 5) enqueue(val) – pridá na koniec, vráti novú veľkosť
  enqueue(val) {

  }

  // 6) dequeue() – odoberie zo začiatku a vráti hodnotu; prázdny → null
  dequeue() {

  }

  // 7) front() – hodnota toho, kto je na rade, bez odobratia; prázdny → null
  front() {

  }
}

// 8) reverseWithStack – otočí text pomocou zásobníka (pole s push / pop), bez .reverse()
//    reverseWithStack('stack') → 'kcats'
function reverseWithStack(str) {

}

// 9) balancedBrackets – sú zátvorky ( ) [ ] { } správne uzavreté? Ostatné znaky ignoruj.
//    balancedBrackets('a(b[c]{d}e)') → true,   balancedBrackets('([)]') → false
function balancedBrackets(str) {

}

// 10) removeAdjacentDuplicates – opakovane odstraňuj dve rovnaké písmená vedľa seba
//     'abbaca' → odstráň 'bb' → 'aaca' → odstráň 'aa' → 'ca'
function removeAdjacentDuplicates(str) {

}

module.exports = { Node, LinkedStack, LinkedQueue, reverseWithStack, balancedBrackets, removeAdjacentDuplicates };

if (require.main === module) {
  require('../lib/test-runner').spusti('s21 Stack a Queue – Praktické úlohy', require('./testy').prakticke, module.exports);
}
