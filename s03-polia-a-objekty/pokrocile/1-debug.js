/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01 POLIA A OBJEKTY – DEBUGGING (príklady 1–3)                   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU (niekedy viac). Spusti testy, prečítaj si, čo zlyhalo,
 * a oprav kód. Kde je premenná `zlozitostX`, doplň časovú zložitosť.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: vo VS Code klikni vľavo od čísla riadku (breakpoint) a stlač F5 → Node.js.
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) countWords – spočítaj výskyty slov (bez ohľadu na veľké/malé písmená)
//    countWords('Ahoj ahoj  svet') → { ahoj: 2, svet: 1 }
//    Prázdne „slová“ (viac medzier za sebou) ignoruj.
// ─────────────────────────────────────────────────────────────────────
function countWords(text) {
  const counts = {};
  for (const word of text.toLowerCase().split(' ')) {
    if (word === '') continue;
    if (counts[word]) {
      counts[word]++;
    } else {
      counts[word] = 1;
    }
  }
  return counts;
}
const zlozitost1 = 'O(n)';

// ─────────────────────────────────────────────────────────────────────
// 2) lastN – vráti posledných n prvkov v pôvodnom poradí
//    lastN([1, 2, 3, 4], 2) → [3, 4]
//    lastN([1, 2, 3], 5)    → [1, 2, 3]
//    lastN([1, 2, 3], 0)    → []
// ─────────────────────────────────────────────────────────────────────
function lastN(arr, n) {
  return arr.slice(-n);
}

// ─────────────────────────────────────────────────────────────────────
// 3) mergeSettings – spojí predvolené nastavenia s nastaveniami používateľa.
//    Používateľské majú prednosť. Vstupné objekty sa NESMÚ zmeniť.
//    mergeSettings({ theme: 'light', lang: 'sk' }, { theme: 'dark' })
//      → { theme: 'dark', lang: 'sk' }
// ─────────────────────────────────────────────────────────────────────
function mergeSettings(defaults, user) {
  return Object.assign(defaults, user);
}

module.exports = { countWords, zlozitost1, lastN, mergeSettings };

if (require.main === module) {
  require('../../lib/test-runner').spusti('01 Polia a objekty – Debugging', require('./testy').debug, module.exports);
}
