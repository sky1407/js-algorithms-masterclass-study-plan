/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  06 ZÁKLADNÉ TRIEDENIA – DEBUGGING (príklady 1–3)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU. Všetky triedia čísla vzostupne NA MIESTE
 * (menia pôvodné pole) a vracajú to isté pole. Vstavané .sort() je zakázané.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: Vizualizácia: https://visualgo.net/en/sorting
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) bubbleSort – najväčší prvok „vybuble“ na koniec v každom prechode
// ─────────────────────────────────────────────────────────────────────
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = arr[j];
      }
    }
  }
  return arr;
}
const zlozitost1 = '___';

// ─────────────────────────────────────────────────────────────────────
// 2) selectionSort – nájdi minimum zvyšku a daj ho na pozíciu i
// ─────────────────────────────────────────────────────────────────────
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) lowest = j;
    }
    if (lowest !== i) [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
}
const zlozitost2 = '___';

// ─────────────────────────────────────────────────────────────────────
// 3) insertionSort – ľavá časť je zoradená, každý ďalší prvok do nej
//    „zasunieš“ na správne miesto.
//    Zložitosť: aká je pre pole, ktoré už JE zoradené (best case)?
// ─────────────────────────────────────────────────────────────────────
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j > 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const zlozitost3 = '___';

module.exports = { bubbleSort, zlozitost1, selectionSort, zlozitost2, insertionSort, zlozitost3 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('06 Základné triedenia – Debugging', require('./testy').debug, module.exports);
}
