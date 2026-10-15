/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  11 BST A PRECHÁDZANIE STROMU – PRAKTICKÉ ÚLOHY (10–12)          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Funkcie dostávajú KOREŇ stromu – uzly { value, left, right }.
 * Prázdny strom = null.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) kthSmallest – k-ta najmenšia hodnota v BST (k od 1), alebo undefined.
//     Tip: in-order prechod ide v zoradenom poradí – zastav sa pri k-tom.
//     Bonus: iteratívne so zásobníkom, bez prechodu celého stromu.
// ─────────────────────────────────────────────────────────────────────
function kthSmallest(root, k) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) isBalanced – pre KAŽDÝ uzol sa výšky ľavého a pravého podstromu
//     líšia najviac o 1?
//     Bonus: O(n) – jedna rekurzia, ktorá vracia výšku, alebo -1 ako
//     signál „už je nevyvážený“.
// ─────────────────────────────────────────────────────────────────────
function isBalanced(root) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) lowestCommonAncestor – najnižší spoločný predok hodnôt a a b v BST
//     (obe v strome sú). Uzol je predkom aj sám sebe.
//            20
//          /    \
//        10      30        LCA(5, 15) = 10
//       /  \               LCA(5, 35) = 20
//      5    15
//     Využi BST vlastnosť – O(výška), bez prechodu celého stromu.
// ─────────────────────────────────────────────────────────────────────
function lowestCommonAncestor(root, a, b) {
}

module.exports = { kthSmallest, isBalanced, lowestCommonAncestor };

if (require.main === module) {
  require('../../lib/test-runner').spusti('11 BST a prechádzanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
