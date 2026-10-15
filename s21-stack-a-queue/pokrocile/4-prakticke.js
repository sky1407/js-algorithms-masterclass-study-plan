/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  10 STACK A QUEUE – PRAKTICKÉ ÚLOHY (príklady 10–12)             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) decodeString – rozbaľ zápis k[text] (text sa zopakuje k-krát,
//     môže byť vnorený, k môže mať viac cifier).
//     '3[a]2[bc]' → 'aaabcbc'
//     '3[a2[c]]'  → 'accaccacc'
//     Tip: dva zásobníky – počty a „čo bolo rozpísané pred zátvorkou“.
// ─────────────────────────────────────────────────────────────────────
function decodeString(s) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) slidingWindowMax – maximum každého okna veľkosti k.
//     [1, 3, -1, -3, 5, 3, 6, 7], k = 3 → [3, 3, 5, 5, 6, 7]
//     Musí to byť O(n): drž si frontu INDEXOV, v ktorej hodnoty klesajú
//     (monotónna deque). Zľava vyhadzuj indexy mimo okna, sprava menšie
//     hodnoty, než je nový prvok.
// ─────────────────────────────────────────────────────────────────────
function slidingWindowMax(nums, k) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) CircularQueue – fronta s pevnou kapacitou nad poľom (kruhový buffer),
//     všetky operácie O(1), žiadne shift/unshift/splice.
//
//     new CircularQueue(capacity)
//     enqueue(x) → true / false (plná)
//     dequeue()  → hodnota / null (prázdna)
//     front(), rear() → prvý / posledný prvok alebo null
//     isEmpty(), isFull()
//
//     Tip: index ďalšieho voľného miesta = (head + count) % capacity
// ─────────────────────────────────────────────────────────────────────
class CircularQueue {
}

module.exports = { decodeString, slidingWindowMax, CircularQueue };

if (require.main === module) {
  require('../../lib/test-runner').spusti('10 Stack a Queue – Praktické úlohy', require('./testy').prakticke, module.exports);
}
