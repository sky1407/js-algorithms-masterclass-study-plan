'use strict';

const HRANY = [['A', 'B', 4], ['A', 'C', 2], ['B', 'E', 3], ['C', 'D', 2], ['C', 'F', 4], ['D', 'E', 3], ['D', 'F', 1], ['E', 'F', 1]];

function graf(Trieda, hrany = HRANY, vrcholy = []) {
  const g = new Trieda();
  g.adjacencyList = {};
  for (const v of vrcholy) g.adjacencyList[v] = [];
  for (const [a, b, w] of hrany) {
    if (!g.adjacencyList[a]) g.adjacencyList[a] = [];
    if (!g.adjacencyList[b]) g.adjacencyList[b] = [];
    g.adjacencyList[a].push({ node: b, weight: w });
    g.adjacencyList[b].push({ node: a, weight: w });
  }
  return g;
}

const CESTA_AE = ['A', 'C', 'D', 'F', 'E'];
const VZDIALENOSTI_A = { A: 0, B: 4, C: 2, D: 4, E: 6, F: 5 };

const teoria = [
  {
    id: 1,
    otazka: 'Čo hľadá Dijkstrov algoritmus?',
    moznosti: [
      'Najkratšiu cestu vo váženom grafe z jedného vrcholu.',
      'Najväčší prvok v poli.',
      'Cestu s najmenej hranami v neváženom grafe.',
      'Zotriedené poradie vrcholov.',
    ],
    spravna: 'a',
    napoveda: 'Spomeň si na GPS navigáciu.',
    vysvetlenie: 'Dijkstra nájde najkratšie cesty (podľa súčtu váh) zo štartového vrcholu. Najmenej hrán nájde BFS.',
  },
  {
    id: 2,
    otazka: 'Ako sa vo váženom grafe ukladá sused v zozname susedov?',
    moznosti: ["Ako objekt { node: 'B', weight: 4 }.", "Len ako text 'B'.", 'Ako číslo 4.', "Ako pole ['B']."],
    spravna: 'a',
    napoveda: 'Potrebujeme vedieť, kam hrana vedie aj aká je dlhá.',
    vysvetlenie: 'Každý sused má meno vrcholu (node) aj váhu hrany (weight).',
  },
  {
    id: 3,
    otazka: 'Aké sú na začiatku hodnoty v distances?',
    moznosti: ['Štart 0, všetky ostatné Infinity.', 'Všetky 0.', 'Všetky Infinity.', 'Štart Infinity, ostatné 0.'],
    spravna: 'a',
    napoveda: 'Ako ďaleko je štart sám od seba? A čo vieme o ostatných?',
    vysvetlenie: 'Do štartu je to 0. K ostatným zatiaľ nepoznáme žiadnu cestu, preto Infinity – každá nájdená cesta bude lepšia.',
  },
  {
    id: 4,
    otazka: 'Ktorý vrchol Dijkstra spracuje v ďalšom kroku?',
    moznosti: [
      'Ten s najmenšou zatiaľ známou vzdialenosťou od štartu.',
      'Ten, ktorý bol pridaný ako prvý.',
      'Ten s najviac susedmi.',
      'Náhodný vrchol.',
    ],
    spravna: 'a',
    napoveda: 'Na to slúži prioritný rad.',
    vysvetlenie: 'Vždy sa vyberie najbližší ešte nespracovaný vrchol. Jeho vzdialenosť je už určite najkratšia.',
  },
  {
    id: 5,
    otazka: 'Čo je relaxácia hrany?',
    moznosti: [
      'Ak je cesta cez aktuálny vrchol kratšia ako doteraz známa cesta k susedovi, ulož novú vzdialenosť.',
      'Odstránenie hrany z grafu.',
      'Zdvojnásobenie váhy.',
      'Otočenie smeru hrany.',
    ],
    spravna: 'a',
    napoveda: 'candidate < distances[sused] → …',
    vysvetlenie: 'Vypočítame candidate = distances[smallest] + weight. Ak je menší ako distances[sused], našli sme lepšiu cestu a uložíme ju.',
  },
  {
    id: 6,
    otazka: 'Na čo slúži objekt previous?',
    moznosti: [
      'Pamätá si, z ktorého vrcholu sme do každého vrcholu prišli najkratšou cestou – aby sme poskladali cestu.',
      'Pamätá si predchádzajúcu vzdialenosť.',
      'Počíta kroky algoritmu.',
      'Ukladá váhy hrán.',
    ],
    spravna: 'a',
    napoveda: 'Ako zistíme celú trasu, nielen jej dĺžku?',
    vysvetlenie: 'previous[E] = F, previous[F] = D… Od cieľa ideme po previous späť až na štart a výsledok otočíme.',
  },
  {
    id: 7,
    otazka: 'Prečo Dijkstra používa prioritný rad?',
    moznosti: [
      'Aby rýchlo vybral vrchol s najmenšou vzdialenosťou.',
      'Aby vrcholy spracoval v poradí, v akom prišli.',
      'Aby zotriedil hrany podľa abecedy.',
      'Nepoužíva ho.',
    ],
    spravna: 'a',
    napoveda: 'Čo potrebujeme v každom kroku vybrať?',
    vysvetlenie: 'Prioritný rad (najlepšie heap) vráti vrchol s najmenšou vzdialenosťou rýchlo, bez prehľadávania všetkých.',
  },
  {
    id: 8,
    otazka: 'Kedy Dijkstra NEfunguje správne?',
    moznosti: ['Keď sú v grafe záporné váhy.', 'Keď má graf viac ako 10 vrcholov.', 'Keď je graf neorientovaný.', 'Keď sú všetky váhy rovnaké.'],
    spravna: 'a',
    napoveda: 'Môže byť vzdialenosť cesty záporná?',
    vysvetlenie: 'Dijkstra predpokladá, že pridaním hrany sa cesta nikdy neskráti. So zápornými váhami to neplatí.',
  },
  {
    id: 9,
    otazka: 'Graf: A–B 4, A–C 2, C–D 2, D–F 1, F–E 1, B–E 3. Aká je najkratšia vzdialenosť A → E?',
    moznosti: ['6', '7', '5', '4'],
    spravna: 'a',
    napoveda: 'Porovnaj A → B → E a A → C → D → F → E.',
    vysvetlenie: 'A → B → E = 4 + 3 = 7. A → C → D → F → E = 2 + 2 + 1 + 1 = 6. Viac hrán, ale kratšia cesta.',
  },
  {
    id: 10,
    otazka: 'Prečo na konci skladania cesty voláme reverse()?',
    moznosti: [
      'Lebo cestu skladáme od cieľa k štartu (po previous) a chceme ju od štartu k cieľu.',
      'Aby bola cesta kratšia.',
      'Lebo pole je zotriedené zostupne.',
      'Nevoláme, je to chyba.',
    ],
    spravna: 'a',
    napoveda: 'previous ukazuje dozadu.',
    vysvetlenie: 'Pozbierame E, F, D, C, A (smerom dozadu). Po reverse() dostaneme A, C, D, F, E.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: "const hrana = { node: 'B', weight: 4 };\nconsole.log(hrana.node, hrana.weight);",
    moznosti: ['B 4', '4 B', 'node weight', 'B undefined'],
    spravna: 'a',
    napoveda: 'node je meno suseda, weight je váha.',
    vysvetlenie: 'Vypíše sa B 4.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Infinity + 5, Infinity > 1000000);',
    moznosti: ['Infinity true', 'Infinity5 true', 'NaN false', '1000005 true'],
    spravna: 'a',
    napoveda: 'Nekonečno plus niečo je…',
    vysvetlenie: 'Infinity + 5 je stále Infinity a je väčšie ako akékoľvek číslo.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: "const q = [{ val: 'A', priority: 5 }, { val: 'B', priority: 1 }, { val: 'C', priority: 3 }];\nq.sort((a, b) => a.priority - b.priority);\nconsole.log(q[0].val, q.shift().val, q.length);",
    moznosti: ['B B 2', 'A A 2', 'B A 3', 'C B 2'],
    spravna: 'a',
    napoveda: 'Po zotriedení je najmenšia priorita na začiatku.',
    vysvetlenie: 'Poradie je B (1), C (3), A (5). q[0].val je B, shift vyberie B a ostanú 2 prvky.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód? (relaxácia)',
    kod: 'const dist = { A: 0, B: Infinity };\nconst candidate = dist.A + 4;\nif (candidate < dist.B) dist.B = candidate;\nconsole.log(dist.B);',
    moznosti: ['4', 'Infinity', '0', 'NaN'],
    spravna: 'a',
    napoveda: 'Je 4 menej ako Infinity?',
    vysvetlenie: '4 < Infinity, takže B dostane vzdialenosť 4.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód? (relaxácia bez zmeny)',
    kod: 'const dist = { A: 0, B: 3 };\nconst candidate = dist.A + 4;\nif (candidate < dist.B) dist.B = candidate;\nconsole.log(dist.B);',
    moznosti: ['3', '4', '7', '0'],
    spravna: 'a',
    napoveda: 'Je 4 menej ako 3?',
    vysvetlenie: 'Cesta s dĺžkou 4 nie je lepšia ako známa cesta 3, takže sa nič nezmení.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód? (skladanie cesty)',
    kod: "const previous = { A: null, C: 'A', D: 'C', F: 'D' };\nlet cur = 'F';\nconst cesta = [];\nwhile (cur) {\n  cesta.push(cur);\n  cur = previous[cur];\n}\nconsole.log(cesta.reverse().join(' → '));",
    moznosti: ['A → C → D → F', 'F → D → C → A', 'A → F', 'C → D → F'],
    spravna: 'a',
    napoveda: 'Pozbierame F, D, C, A a potom otočíme.',
    vysvetlenie: 'Od F ideme po previous: F, D, C, A. previous[A] je null, cyklus končí. Po reverse: A → C → D → F.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.min(...Object.values({ A: 0, B: 4, C: 2 })));',
    moznosti: ['0', '2', '4', 'A'],
    spravna: 'a',
    napoveda: 'Object.values dá [0, 4, 2].',
    vysvetlenie: 'Najmenšia hodnota z [0, 4, 2] je 0.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "const g = { A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }] };\nconsole.log(g.A.find(e => e.node === 'C').weight);",
    moznosti: ['2', '4', 'C', 'undefined'],
    spravna: 'a',
    napoveda: 'find vráti objekt hrany do C.',
    vysvetlenie: 'Hrana A–C je { node: "C", weight: 2 }, jej váha je 2.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (dĺžka cesty A → C → D → F → E)',
    kod: 'let spolu = 0;\nfor (const w of [2, 2, 1, 1]) spolu += w;\nconsole.log(spolu);',
    moznosti: ['6', '4', '7', '5'],
    spravna: 'a',
    napoveda: 'Sčítaj váhy.',
    vysvetlenie: '2 + 2 + 1 + 1 = 6.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "const obj = { A: 1, B: 2 };\nfor (const kluc in obj) console.log(kluc);",
    moznosti: ['A\nB', '1\n2', 'A 1\nB 2', '0\n1'],
    spravna: 'a',
    napoveda: 'for...in prechádza KĽÚČE objektu.',
    vysvetlenie: 'for...in prejde kľúče A a B. (for...of by na objekte nefungoval.)',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'addEdge – hrana oboma smermi',
    napovedy: [
      'U vrcholu B je hrana do B namiesto do A. Čo sa ukladá do zoznamu v2?',
      'Sused vrcholu v2 je v1.',
      'V druhom push zmeň node: v2 na node: v1.',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.WeightedGraph, [], ['A', 'B']);
      g.addEdge('A', 'B', 7);
      rovne(g.adjacencyList, { A: [{ node: 'B', weight: 7 }], B: [{ node: 'A', weight: 7 }] }, 'adjacencyList po addEdge(A, B, 7)');
    },
  },
  {
    id: 2,
    nazov: 'neighbors – mená susedov',
    napovedy: ["neighbors('A') vráti čísla. Ktorú vlastnosť hrany treba vrátiť?", 'Meno suseda je v node, weight je váha.', 'Zmeň e => e.weight na e => e.node.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).neighbors('A'), ['B', 'C'], "neighbors('A')");
    },
  },
  {
    id: 3,
    nazov: 'PriorityQueue.enqueue – najmenšia priorita dopredu',
    napovedy: [
      'Po vložení je navrchu najväčšia priorita. Ako sa triedi?',
      'a.priority - b.priority triedi vzostupne (najmenšie dopredu).',
      'Zmeň b.priority - a.priority na a.priority - b.priority.',
    ],
    testy: (m, { rovne }) => {
      const q = new m.PriorityQueue();
      q.enqueue('A', 5);
      q.enqueue('B', 1);
      q.enqueue('C', 3);
      rovne(q.values.map(x => x.val), ['B', 'C', 'A'], 'poradie values po enqueue A(5), B(1), C(3)');
    },
  },
  {
    id: 4,
    nazov: 'PriorityQueue.dequeue – vyber najmenšiu prioritu',
    napovedy: ['Vráti prvok s najväčšou prioritou. Kde je najmenšia?', 'values je zotriedené vzostupne – najmenšia je na začiatku.', 'Zmeň this.values.pop() na this.values.shift().'],
    testy: (m, { rovne }) => {
      const q = new m.PriorityQueue();
      q.values = [{ val: 'B', priority: 1 }, { val: 'C', priority: 3 }, { val: 'A', priority: 5 }];
      rovne(q.dequeue(), { val: 'B', priority: 1 }, 'dequeue()');
    },
  },
  {
    id: 5,
    nazov: 'dijkstra – počiatočné vzdialenosti',
    napovedy: [
      'Vráti zlú cestu. Akú vzdialenosť majú na začiatku vrcholy okrem štartu?',
      'Kým nepoznáme cestu, vzdialenosť je Infinity. S nulou sa žiadna cesta nikdy nezlepší.',
      'V else vetve zmeň 0 na Infinity (v distances aj v enqueue).',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).dijkstra('A', 'E'), CESTA_AE, "dijkstra('A', 'E')");
    },
  },
  {
    id: 6,
    nazov: 'dijkstra2 – výpočet kandidáta',
    napovedy: [
      'candidate má byť vzdialenosť do suseda CEZ aktuálny vrchol. Ku ktorej vzdialenosti pripočítavaš váhu?',
      'Cesta ide cez smallest: distances[smallest] + váha hrany.',
      'Zmeň distances[neighbor.node] + neighbor.weight na distances[smallest] + neighbor.weight.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).dijkstra2('A', 'E'), CESTA_AE, "dijkstra2('A', 'E')");
    },
  },
  {
    id: 7,
    nazov: 'dijkstra3 – kedy je cesta lepšia',
    napovedy: [
      'Vráti prázdnu alebo zlú cestu. Kedy sa má vzdialenosť suseda zmeniť?',
      'Lepšia cesta je KRATŠIA, teda candidate < distances[sused].',
      'Zmeň candidate > distances[…] na candidate < distances[…].',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).dijkstra3('A', 'E'), CESTA_AE, "dijkstra3('A', 'E')");
    },
  },
  {
    id: 8,
    nazov: 'dijkstra4 – poradie cesty',
    napovedy: [
      'Cesta vyjde odzadu (E … A). Ako ju skladáme?',
      'Ideme od cieľa po previous, preto je pole otočené.',
      'Zmeň return path.concat(smallest) na return path.concat(smallest).reverse().',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).dijkstra4('A', 'E'), CESTA_AE, "dijkstra4('A', 'E')");
    },
  },
  {
    id: 9,
    nazov: 'shortestDistance – dĺžka najkratšej cesty',
    napovedy: ["shortestDistance('A', 'E') vráti 0. Vzdialenosť ktorého vrcholu vraciaš?", 'Chceme vzdialenosť cieľa, nie štartu.', 'Zmeň return distances[start] na return distances[finish].'],
    testy: (m, { rovne }) => {
      const g = graf(m.WeightedGraph);
      rovne([g.shortestDistance('A', 'E'), g.shortestDistance('A', 'F')], [6, 5], "[shortestDistance('A', 'E'), ('A', 'F')]");
    },
  },
  {
    id: 10,
    nazov: 'pathCost – dĺžka zadanej cesty',
    napovedy: [
      'Pre A → C → D → F → E vráti 4 namiesto 6. Započíta sa prvá hrana A–C?',
      'Hrany sú medzi path[i] a path[i + 1] pre i od 0.',
      'Zmeň let i = 1 na let i = 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WeightedGraph).pathCost(CESTA_AE), 6, 'pathCost([A, C, D, F, E])');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'addEdge – ulož váhu',
    napovedy: ['Hrana má node a ešte čo?', 'Tretí parameter metódy.', 'Nahraď ___ slovom weight.'],
    testy: (m, { rovne }) => {
      const g = graf(m.WG, [], ['A', 'B']);
      g.addEdge('A', 'B', 3);
      rovne(g.adjacencyList.A, [{ node: 'B', weight: 3 }], 'zoznam A po addEdge(A, B, 3)');
    },
  },
  {
    id: 2,
    nazov: 'addEdge2 – druhý smer',
    napovedy: ['Do zoznamu v2 patrí hrana do ktorého vrcholu?', 'Druhý koniec hrany.', 'Nahraď ___ s v1.'],
    testy: (m, { rovne }) => {
      const g = graf(m.WG, [], ['A', 'B']);
      g.addEdge2('A', 'B', 3);
      rovne(g.adjacencyList.B, [{ node: 'A', weight: 3 }], 'zoznam B po addEdge2(A, B, 3)');
    },
  },
  {
    id: 3,
    nazov: 'PQ.enqueue – triedenie podľa priority',
    napovedy: ['Porovnávame prioritu a s prioritou b.', 'b.…', 'Nahraď ___ slovom priority.'],
    testy: (m, { rovne }) => {
      const q = new m.PQ();
      q.enqueue('A', 5);
      q.enqueue('B', 1);
      rovne(q.values.map(x => x.val), ['B', 'A'], 'poradie values');
    },
  },
  {
    id: 4,
    nazov: 'PQ.dequeue – vyber prvý',
    napovedy: ['Ktorá metóda poľa vyberie prvý prvok?', 'Opak unshift.', 'Nahraď ___ slovom shift.'],
    testy: (m, { rovne }) => {
      const q = new m.PQ();
      q.values = [{ val: 'B', priority: 1 }, { val: 'A', priority: 5 }];
      rovne(q.dequeue().val, 'B', 'dequeue().val');
    },
  },
  {
    id: 5,
    nazov: 'dijkstra – neznáma vzdialenosť',
    napovedy: ['Akú vzdialenosť majú vrcholy, ku ktorým ešte nepoznáme cestu?', 'Nekonečno.', 'Nahraď ___ slovom Infinity.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra('A', 'E'), CESTA_AE, "dijkstra('A', 'E')");
    },
  },
  {
    id: 6,
    nazov: 'dijkstra2 – pripočítaj váhu hrany',
    napovedy: ['K vzdialenosti smallest pripočítame čo z hrany?', 'neighbor.…', 'Nahraď ___ slovom weight.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra2('A', 'E'), CESTA_AE, "dijkstra2('A', 'E')");
    },
  },
  {
    id: 7,
    nazov: 'dijkstra3 – vzdialenosť suseda',
    napovedy: ['Porovnávame s doteraz známou vzdialenosťou suseda. Ako sa volá meno suseda v hrane?', 'neighbor.…', 'Nahraď ___ slovom node.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra3('A', 'E'), CESTA_AE, "dijkstra3('A', 'E')");
    },
  },
  {
    id: 8,
    nazov: 'dijkstra4 – odkiaľ sme prišli',
    napovedy: ['Do suseda sme prišli z ktorého vrcholu?', 'Z aktuálne spracovaného vrcholu.', 'Nahraď ___ slovom smallest.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra4('A', 'E'), CESTA_AE, "dijkstra4('A', 'E')");
    },
  },
  {
    id: 9,
    nazov: 'dijkstra5 – otoč cestu',
    napovedy: ['Cesta je poskladaná od cieľa. Ktorá metóda poľa ju otočí?', 'reverse = otočiť.', 'Nahraď ___ slovom reverse.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra5('A', 'E'), CESTA_AE, "dijkstra5('A', 'E')");
    },
  },
  {
    id: 10,
    nazov: 'dijkstra6 – hlavná slučka (dve ___)',
    napovedy: [
      'Prvé ___: dequeue vráti { val, priority } – čo z toho je vrchol? Druhé ___: kedy sme v cieli?',
      'Vrchol je val. V cieli sme, keď smallest je finish.',
      'Prvé ___ nahraď val, druhé ___ nahraď finish.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WG).dijkstra6('A', 'E'), CESTA_AE, "dijkstra6('A', 'E')");
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'addVertex – vrchol s prázdnym zoznamom (existujúci neprepíš)',
    napovedy: ['Rovnaké ako v s26-27.', 'if (!this.adjacencyList[v]) …', 'if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];'],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph, [['A', 'B', 1]]);
      g.addVertex('C');
      g.addVertex('A');
      rovne(g.adjacencyList, { A: [{ node: 'B', weight: 1 }], B: [{ node: 'A', weight: 1 }], C: [] }, 'adjacencyList po addVertex C a A');
    },
  },
  {
    id: 2,
    nazov: 'addEdge – vážená neorientovaná hrana',
    napovedy: ['Do oboch zoznamov pridaj objekt s node a weight.', '{ node: v2, weight } do v1 a { node: v1, weight } do v2.', 'Celé riešenie je v teórii v časti 2.'],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph, [], ['X', 'Y']);
      g.addEdge('X', 'Y', 9);
      rovne(g.adjacencyList, { X: [{ node: 'Y', weight: 9 }], Y: [{ node: 'X', weight: 9 }] }, 'adjacencyList po addEdge(X, Y, 9)');
    },
  },
  {
    id: 3,
    nazov: 'NaivePQ.enqueue – vlož a zotrieď',
    napovedy: ['Pridaj { val, priority } a zotrieď podľa priority vzostupne.', 'this.values.sort((a, b) => a.priority - b.priority)', 'Celé riešenie je v teórii v časti 3.'],
    testy: (m, { rovne }) => {
      const q = new m.NaivePQ();
      for (const [v, p] of [['A', 5], ['B', 1], ['C', 3]]) q.enqueue(v, p);
      rovne(q.values, [{ val: 'B', priority: 1 }, { val: 'C', priority: 3 }, { val: 'A', priority: 5 }], 'values');
    },
  },
  {
    id: 4,
    nazov: 'NaivePQ.dequeue – vyber prvok s najmenšou prioritou',
    napovedy: ['values je zotriedené – najmenšia priorita je prvá.', 'shift()', 'return this.values.shift();'],
    testy: (m, { rovne }) => {
      const q = new m.NaivePQ();
      q.values = [{ val: 'B', priority: 1 }, { val: 'A', priority: 5 }];
      rovne([q.dequeue(), q.values.length], [{ val: 'B', priority: 1 }, 1], '[dequeue(), zostávajúci počet]');
    },
  },
  {
    id: 5,
    nazov: 'NaivePQ.isEmpty – je rad prázdny?',
    napovedy: ['Pozri sa na dĺžku poľa values.', 'Prázdne = dĺžka 0.', 'return this.values.length === 0;'],
    testy: (m, { rovne }) => {
      const q = new m.NaivePQ();
      const prazdny = q.isEmpty();
      q.values = [{ val: 'A', priority: 1 }];
      rovne([prazdny, q.isEmpty()], [true, false], '[isEmpty() prázdneho, isEmpty() s jedným prvkom]');
    },
  },
  {
    id: 6,
    nazov: 'dijkstraDistances – najkratšie vzdialenosti zo štartu ku všetkým',
    napovedy: [
      'Ako dijkstra z teórie, ale nezastavuj sa v cieli a na konci vráť objekt distances.',
      'Použi NaivePQ (alebo jednoduché pole a sort). Vrchol, ktorý už má menšiu vzdialenosť, preskakuj.',
      'Celý postup je v teórii v časti 4 – vynechaj skladanie cesty a vráť distances.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.WGraph).dijkstraDistances('A'), VZDIALENOSTI_A, "dijkstraDistances('A')");
      rovne(graf(m.WGraph, [['A', 'B', 1]], ['Z']).dijkstraDistances('A'), { A: 0, B: 1, Z: Infinity }, 'nedosiahnuteľný vrchol Z');
    },
  },
  {
    id: 7,
    nazov: 'dijkstraPath – najkratšia cesta ako pole vrcholov',
    napovedy: [
      'Dijkstra s previous. Keď vyberieš cieľ, poskladaj cestu po previous a otoč ju.',
      'Ak cieľ nie je dosiahnuteľný, vráť [].',
      'Celé riešenie je v teórii v časti 4.',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph);
      rovne([g.dijkstraPath('A', 'E'), g.dijkstraPath('E', 'A')], [CESTA_AE, ['E', 'F', 'D', 'C', 'A']], "[dijkstraPath('A', 'E'), ('E', 'A')]");
      rovne(graf(m.WGraph, [['A', 'B', 1]], ['Z']).dijkstraPath('A', 'Z'), [], 'cesta do nedosiahnuteľného Z');
    },
  },
  {
    id: 8,
    nazov: 'pathCost – súčet váh pozdĺž cesty',
    napovedy: [
      'Pre každú dvojicu za sebou path[i], path[i + 1] nájdi hranu a pripočítaj jej váhu.',
      'this.adjacencyList[path[i]].find(e => e.node === path[i + 1]).weight',
      'let s = 0; for (let i = 0; i < path.length - 1; i++) s += this.adjacencyList[path[i]].find(e => e.node === path[i + 1]).weight; return s;',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph);
      rovne([g.pathCost(CESTA_AE), g.pathCost(['A', 'B', 'E']), g.pathCost(['A'])], [6, 7, 0], '[pathCost cez C-D-F, cez B, jeden vrchol]');
    },
  },
  {
    id: 9,
    nazov: 'nearestNeighbor – najbližší sused (najmenšia váha)',
    napovedy: [
      'Prejdi hrany vrcholu a zapamätaj si tú s najmenšou váhou.',
      'Na začiatku best = null a bestWeight = Infinity.',
      'let best = null, bw = Infinity; for (const e of this.adjacencyList[vertex]) { if (e.weight < bw) { bw = e.weight; best = e.node; } } return best;',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph, HRANY, ['Z']);
      rovne([g.nearestNeighbor('A'), g.nearestNeighbor('D'), g.nearestNeighbor('Z')], ['C', 'F', null], "[nearestNeighbor('A'), ('D'), ('Z')]");
    },
  },
  {
    id: 10,
    nazov: 'reachableWithin – vrcholy do vzdialenosti maxDist (abecedne)',
    napovedy: [
      'Použi dijkstraDistances z úlohy 6.',
      'Vyber vrcholy, ktorých vzdialenosť je <= maxDist, a zotrieď ich.',
      'const d = this.dijkstraDistances(start); return Object.keys(d).filter(v => d[v] <= maxDist).sort();',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.WGraph);
      rovne([g.reachableWithin('A', 4), g.reachableWithin('A', 0)], [['A', 'B', 'C', 'D'], ['A']], "[reachableWithin('A', 4), ('A', 0)]");
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
