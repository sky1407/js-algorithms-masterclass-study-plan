/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  08 SINGLY LINKED LIST – SCENÁRE Z PRAXE (príklady 13–14)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) Playlist – fronta skladieb v hudobnom prehrávači.
//     Skladby drž v SPÁJANOM ZOZNAME (head/tail), nie v poli.
//
//     add(song)        – pridá na koniec, vráti počet skladieb      O(1)
//     playNext(song)   – zaradí ako nasledujúcu (na začiatok), vráti počet  O(1)
//     play()           – odoberie a vráti prvú skladbu, prázdny → null      O(1)
//     removeSong(song) – odstráni prvý výskyt, vráti true/false
//     toArray()        – pole skladieb v poradí (tu pole použiť smieš)
//
//     Pozor na tail pri odstránení POSLEDNEJ skladby!
// ─────────────────────────────────────────────────────────────────────
class Playlist {
}

// ─────────────────────────────────────────────────────────────────────
// 14) addBigNumbers – banka potrebuje sčítať čísla, ktoré sa nezmestia
//     do Number (viac ako 15 cifier). Číslo je uložené ako spájaný zoznam
//     cifier v OPAČNOM poradí (jednotky sú v head):
//       342  →  2 → 4 → 3
//     Vráť head zoznamu so súčtom v rovnakom formáte.
//       (2→4→3) + (5→6→4)  ⇒  7→0→8     (342 + 465 = 807)
//     Bez BigInt a bez prevodu na Number/String.
// ─────────────────────────────────────────────────────────────────────
function addBigNumbers(a, b) {
}

module.exports = { Playlist, addBigNumbers };

if (require.main === module) {
  require('../../lib/test-runner').spusti('08 Singly Linked List – Scenáre z praxe', require('./testy').scenare, module.exports);
}
