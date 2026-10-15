/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02 FREQUENCY COUNTER A MULTIPLE POINTERS – SCENÁRE (13–14)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) findDoubleBookings – hotelový rezervačný systém mal výpadok
//     a niektoré izby predal viackrát. Nájdi konflikty.
//
//     bookings = [{ room: 12, date: '2026-10-20', guest: 'Novák' }, ...]
//
//     Vráť pole { room, date, guests } pre každú kombináciu izba + dátum,
//     ktorá je rezervovaná VIAC ako raz. guests = mená v poradí zo vstupu.
//     Zoraď podľa dátumu, potom podľa čísla izby (vzostupne).
// ─────────────────────────────────────────────────────────────────────
function findDoubleBookings(bookings) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) bestGiftPair – kupuješ DVA rôzne darčeky (nie dvakrát ten istý).
//     prices = ZORADENÉ ceny v e-shope, budget = koľko môžeš minúť.
//     Vráť najväčší možný súčet dvoch cien, ktorý NEPREKROČÍ rozpočet.
//     Ak sa nedá kúpiť nič, vráť null.
//
//     bestGiftPair([10, 20, 30, 40, 50], 65) → 60
//
//     E-shop má 200 000 produktov → riešenie musí byť O(n).
// ─────────────────────────────────────────────────────────────────────
function bestGiftPair(prices, budget) {
}

module.exports = { findDoubleBookings, bestGiftPair };

if (require.main === module) {
  require('../../lib/test-runner').spusti('02 Frequency Counter a Pointers – Scenáre z praxe', require('./testy').scenare, module.exports);
}
