/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  09 DOUBLY LINKED LIST – PRAKTICKÉ ÚLOHY (príklady 10–12)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Funkcie dostávajú objekt zoznamu { head, tail, length },
 * uzly sú { val, prev, next }. Pole ako pomôcku nepoužívaj.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) isPalindromeList – číta sa zoznam rovnako odpredu aj odzadu?
//     Jeden ukazovateľ ide od head, druhý od tail; stretnú sa v strede.
//     Pamäť O(1). Pozor na párny počet – ukazovatele sa „prekrížia“.
// ─────────────────────────────────────────────────────────────────────
function isPalindromeList(list) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) insertSorted – zoznam je zoradený vzostupne. Vlož nový uzol
//     { val, prev, next } tak, aby ostal zoradený (rovnaké hodnoty:
//     nový ide ZA existujúce). Uprav head/tail/length a vráť list.
// ─────────────────────────────────────────────────────────────────────
function insertSorted(list, val) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) partitionList – presuň všetky uzly s val < x pred uzly s val >= x.
//     Relatívne poradie v rámci oboch skupín zachovaj.
//     1⇄4⇄3⇄2⇄5⇄2, x = 3  ⇒  1⇄2⇄2⇄4⇄3⇄5
//     Nevytváraj nové uzly – prepoj existujúce. Vráť list.
// ─────────────────────────────────────────────────────────────────────
function partitionList(list, x) {
}

module.exports = { isPalindromeList, insertSorted, partitionList };

if (require.main === module) {
  require('../../lib/test-runner').spusti('09 Doubly Linked List – Praktické úlohy', require('./testy').prakticke, module.exports);
}
