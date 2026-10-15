/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  09 DOUBLY LINKED LIST – SCENÁRE Z PRAXE (príklady 13–14)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) BrowserHistory – tlačidlá Späť / Dopredu v prehliadači.
//
//     new BrowserHistory('google.com') – začínaš na domovskej stránke
//     visit(url)     – prejde na url; celá „dopredná“ história sa zahodí
//     back(steps)    – o steps krokov späť (najviac po začiatok), vráti url
//     forward(steps) – o steps krokov dopredu (najviac po koniec), vráti url
//
//     Každá stránka = uzol { url, prev, next }.
// ─────────────────────────────────────────────────────────────────────
class BrowserHistory {
}

// ─────────────────────────────────────────────────────────────────────
// 14) LRUCache – cache s obmedzenou kapacitou (napr. naposledy otvorené
//     súbory, cache API odpovedí). Keď je plná, vyhodí NAJDLHŠIE
//     NEPOUŽITÝ kľúč.
//
//     new LRUCache(capacity)
//     get(key)        – hodnota alebo -1; kľúč sa tým stáva „naposledy použitý“
//     put(key, value) – vloží/aktualizuje; tiež „použitie“
//
//     get aj put v O(1): Map (kľúč → uzol) + DLL (poradie použitia).
//     Najnovší na začiatku, najstarší na konci → vyhadzuješ tail.
// ─────────────────────────────────────────────────────────────────────
class LRUCache {
}

module.exports = { BrowserHistory, LRUCache };

if (require.main === module) {
  require('../../lib/test-runner').spusti('09 Doubly Linked List – Scenáre z praxe', require('./testy').scenare, module.exports);
}
