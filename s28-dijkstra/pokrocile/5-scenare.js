/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  15 DIJKSTROV ALGORITMUS – SCENÁRE Z PRAXE (príklady 13–14)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) fastestRoute – navigácia hľadá NAJRÝCHLEJŠIU, nie najkratšiu trasu.
//     roads = [{ from: 'BA', to: 'TT', km: 60, speed: 120 }, ...]
//     (cesty sú obojsmerné, čas úseku v minútach = km / speed * 60)
//
//     Vráť { minutes: <celkový čas zaokrúhlený na celé minúty>,
//            route: ['BA', 'TT', ...] }, alebo null, ak sa nedá dostať.
//     Rovnaké mesto → { minutes: 0, route: [mesto] }.
// ─────────────────────────────────────────────────────────────────────
function fastestRoute(roads, from, to) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) deliveryOrder – kuriér vyráža z depa a chce zákazníkov obísť
//     od najbližšieho (podľa najkratšej cesty po cestnej sieti).
//     graph = vážený graf (obojsmerné cesty), depot = názov depa.
//
//     Vráť { order: [{ customer, distance }, ...]   (zoradené podľa distance,
//                                                    pri zhode podľa mena),
//            unreachable: [...]                     (abecedne) }
//     Depo samotné do výsledku nepatrí.
// ─────────────────────────────────────────────────────────────────────
function deliveryOrder(graph, depot) {
}

module.exports = { fastestRoute, deliveryOrder };

if (require.main === module) {
  require('../../lib/test-runner').spusti('15 Dijkstra – Scenáre z praxe', require('./testy').scenare, module.exports);
}
