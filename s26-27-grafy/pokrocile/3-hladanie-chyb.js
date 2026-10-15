/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  14 GRAFY – HĽADANIE CHÝB (príklady 7–9)                         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Graf zapíš ako zoznam susedov (neorientovaný = hrana na oboch stranách):
 *        [{ A: ['B'], B: ['A', 'C'], C: ['B'] }, 'A', 'C']
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) shortestPathLength – najmenší počet hrán zo start do end,
//    alebo -1, ak sa nedá dostať.
// ─────────────────────────────────────────────────────────────────────
function shortestPathLength(graph, start, end) {
  if (!(start in graph) || !(end in graph)) return -1;
  const visited = new Set();
  const dfs = (v, depth) => {
    if (v === end) return depth;
    visited.add(v);
    for (const w of graph[v]) {
      if (!visited.has(w)) {
        const d = dfs(w, depth + 1);
        if (d !== -1) return d;
      }
    }
    return -1;
  };
  return dfs(start, 0);
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) hasCycle – obsahuje NEORIENTOVANÝ graf cyklus?
//    (Hrana späť na rodiča sa nepočíta – A–B nie je cyklus.)
// ─────────────────────────────────────────────────────────────────────
function hasCycle(graph) {
  const vertices = Object.keys(graph);
  if (vertices.length === 0) return false;
  const visited = new Set();
  const dfs = (v, parent) => {
    visited.add(v);
    for (const w of graph[v]) {
      if (w === parent) continue;
      if (visited.has(w) || dfs(w, v)) return true;
    }
    return false;
  };
  return dfs(vertices[0], null);
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) canFinish – numCourses predmetov (0 … n-1), prerequisites = [[a, b], ...]
//    znamená „na predmet a potrebuješ najprv b“ (ORIENTOVANÁ hrana b → a).
//    Dajú sa absolvovať všetky? = je orientovaný graf bez cyklu?
// ─────────────────────────────────────────────────────────────────────
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) adj[pre].push(course);
  const visited = new Set();
  const dfs = (v) => {
    if (visited.has(v)) return false;
    visited.add(v);
    for (const w of adj[v]) if (!dfs(w)) return false;
    return true;
  };
  for (let i = 0; i < numCourses; i++) {
    if (!visited.has(i) && !dfs(i)) return false;
  }
  return true;
}
const protipriklad9 = ___;

module.exports = { shortestPathLength, protipriklad7, hasCycle, protipriklad8, canFinish, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('14 Grafy – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
