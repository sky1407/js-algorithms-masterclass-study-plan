/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01 POLIA A OBJEKTY – SCENÁRE Z PRAXE (príklady 13–14)           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Úlohy, aké reálne prídu v práci. Najprv si premysli dátovú štruktúru
 * (pole? objekt? Map?), až potom píš kód.
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) applyOrders – sklad e-shopu
//
//     stock  = { mys: 5, klavesnica: 1 }          (sku → počet kusov)
//     orders = [{ sku: 'mys', qty: 2 }, ...]      (spracuj V PORADÍ)
//
//     Objednávka sa ZAMIETNE, ak tovar na sklade neexistuje alebo ho je málo.
//     Inak sa kusy odpočítajú. Vráť:
//       { stock: <nový stav skladu>, rejected: [<indexy zamietnutých objednávok>] }
//
//     Pôvodný objekt stock sa NESMIE zmeniť (napr. kvôli histórii skladu).
//     Pozor: sku môže byť aj 'toString' – v obyčajnom objekte to „existuje“!
// ─────────────────────────────────────────────────────────────────────
function applyOrders(stock, orders) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) topSpenders – vernostný program, top n zákazníkov podľa útraty
//
//     transactions = [{ customer: 'eva', amount: 500 }, ...]   (suma v centoch)
//     Vráť pole { customer, total } zoradené podľa total zostupne.
//     Pri rovnakej útrate rozhodne meno abecedne.
//     Ak je zákazníkov menej ako n, vráť všetkých.
//
//     topSpenders([{ customer: 'eva', amount: 5 }, { customer: 'eva', amount: 1 }], 1)
//       → [{ customer: 'eva', total: 6 }]
// ─────────────────────────────────────────────────────────────────────
function topSpenders(transactions, n) {
}

module.exports = { applyOrders, topSpenders };

if (require.main === module) {
  require('../../lib/test-runner').spusti('01 Polia a objekty – Scenáre z praxe', require('./testy').scenare, module.exports);
}
