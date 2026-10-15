/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  11 BST A PRECHÁDZANIE STROMU – SCENÁRE Z PRAXE (13–14)          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) priceRange – e-shop má ceny produktov v BST (uzly { value, left, right }).
//     Používateľ nastaví filter „cena od low do high“ (vrátane).
//     Vráť zoradené ceny v rozsahu.
//
//     Pri 10 000 produktoch a úzkom rozsahu NESMIEŠ prejsť celý strom:
//     ak je hodnota uzla ≤ low, do ľavého podstromu nemá zmysel ísť
//     (a podobne vpravo). Test počíta, koľkokrát čítaš node.value.
// ─────────────────────────────────────────────────────────────────────
function priceRange(root, low, high) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) orgLevels – organizačná štruktúra firmy (VŠEOBECNÝ strom,
//     nie binárny): { name: 'CEO Eva', reports: [ ...podriadení ] }
//     (reports môže chýbať alebo byť prázdne)
//
//     Vráť mená po úrovniach riadenia:
//       [['CEO Eva'], ['CTO Adam', 'CFO Marta'], ['Dev Ján', ...], ...]
//     Poradie v úrovni = poradie v reports. Prázdna firma (null) → [].
// ─────────────────────────────────────────────────────────────────────
function orgLevels(ceo) {
}

module.exports = { priceRange, orgLevels };

if (require.main === module) {
  require('../../lib/test-runner').spusti('11 BST a prechádzanie – Scenáre z praxe', require('./testy').scenare, module.exports);
}
