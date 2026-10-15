'use strict';

function graf(Trieda, zoznam) {
  const g = new Trieda();
  g.adjacencyList = {};
  for (const [v, susedia] of Object.entries(zoznam)) g.adjacencyList[v] = susedia.slice();
  return g;
}

const ZAKLAD = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B', 'E', 'F'],
  E: ['C', 'D', 'F'],
  F: ['D', 'E'],
};

const STVOREC = { A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D'], D: ['B', 'C'] };
const DVA_OSTROVY = { A: ['B'], B: ['A'], C: ['D'], D: ['C'], E: [] };

const zoradene = (arr) => arr.slice().sort();

const teoria = [
  {
    id: 1,
    otazka: 'Čo je graf?',
    moznosti: [
      'Vrcholy spojené hranami – bez koreňa a pravidla rodič–dieťa, môžu mať aj kruhy.',
      'Strom, ktorý má vždy koreň.',
      'Zotriedené pole.',
      'Tabuľka kľúč → hodnota.',
    ],
    spravna: 'a',
    napoveda: 'Spomeň si na mapu miest a ciest.',
    vysvetlenie: 'Graf sú body (vrcholy) a spojenia (hrany). Strom je špeciálny graf bez kruhov s jedným koreňom.',
  },
  {
    id: 2,
    otazka: 'Čo je v grafe vertex a čo edge?',
    moznosti: ['Vertex je vrchol (bod), edge je hrana (spojenie).', 'Vertex je hrana, edge je vrchol.', 'Oba znamenajú vrchol.', 'Vertex je váha hrany.'],
    spravna: 'a',
    napoveda: 'Mestá a cesty medzi nimi.',
    vysvetlenie: 'Vertex = vrchol, napr. mesto. Edge = hrana, napr. cesta medzi dvoma mestami.',
  },
  {
    id: 3,
    otazka: 'Aký je rozdiel medzi neorientovaným a orientovaným grafom?',
    moznosti: [
      'V neorientovanom platí hrana oboma smermi (priateľstvo), v orientovanom má smer (sledovanie).',
      'Orientovaný graf nemá hrany.',
      'Neorientovaný graf má vždy váhy.',
      'Žiadny rozdiel.',
    ],
    spravna: 'a',
    napoveda: 'Facebook priateľstvo vs. Instagram sledovanie.',
    vysvetlenie: 'Priateľstvo je obojstranné (neorientovaný graf). Sledovanie môže byť jednostranné (orientovaný graf).',
  },
  {
    id: 4,
    otazka: 'Čo je vážený graf?',
    moznosti: ['Graf, ktorého hrany majú hodnotu, napr. vzdialenosť v km.', 'Graf s veľa vrcholmi.', 'Graf bez kruhov.', 'Graf uložený v matici.'],
    spravna: 'a',
    napoveda: 'Váha = hodnota hrany.',
    vysvetlenie: 'Vo váženom grafe má každá hrana číslo (váhu), napr. dĺžku cesty. Využije sa pri Dijkstrovi.',
  },
  {
    id: 5,
    otazka: 'Ako vyzerá adjacency list (zoznam susedov)?',
    moznosti: [
      'Objekt, kde každý vrchol má pole svojich susedov, napr. { A: ["B", "C"] }.',
      'Tabuľka n × n s nulami a jednotkami.',
      'Jedno dlhé pole všetkých vrcholov.',
      'Strom s koreňom.',
    ],
    spravna: 'a',
    napoveda: 'List = zoznam. Zoznam čoho?',
    vysvetlenie: 'Adjacency list ukladá pre každý vrchol zoznam jeho susedov. Tabuľka n × n je adjacency matrix.',
  },
  {
    id: 6,
    otazka: 'Prečo sa častejšie používa adjacency list ako matica?',
    moznosti: [
      'Reálne grafy majú málo hrán, a zoznam zaberá pamäť len pre existujúce hrany.',
      'Lebo matica sa nedá v JavaScripte vytvoriť.',
      'Lebo zoznam je vždy rýchlejší vo všetkom.',
      'Lebo matica nevie uložiť neorientovaný graf.',
    ],
    spravna: 'a',
    napoveda: 'Koľko miesta zaberie matica pre milión ľudí?',
    vysvetlenie: 'Matica potrebuje n × n políčok, aj keď je väčšina núl. Zoznam ukladá len skutočné hrany.',
  },
  {
    id: 7,
    otazka: 'Pridávaš hranu A–B do NEorientovaného grafu. Čo treba urobiť?',
    moznosti: [
      'Pridať B do zoznamu A a zároveň A do zoznamu B.',
      'Pridať len B do zoznamu A.',
      'Vytvoriť nový vrchol AB.',
      'Pridať A do zoznamu A.',
    ],
    spravna: 'a',
    napoveda: 'Hrana platí oboma smermi.',
    vysvetlenie: 'Neorientovaná hrana platí oboma smermi, preto ide do zoznamu oboch vrcholov.',
  },
  {
    id: 8,
    otazka: 'Prečo si pri prechádzaní grafu pamätáme visited?',
    moznosti: [
      'Lebo graf môže mať kruhy a bez visited by sme chodili dookola donekonečna.',
      'Aby bol výsledok zotriedený.',
      'Lebo to vyžaduje JavaScript.',
      'Aby sme vedeli počet hrán.',
    ],
    spravna: 'a',
    napoveda: 'Čo ak A je sused B a B je sused A?',
    vysvetlenie: 'Z A ideme do B, z B by sme sa vrátili do A, z A znova do B… visited zabráni návratu do už navštívených vrcholov.',
  },
  {
    id: 9,
    otazka: 'Akého pomocníka používa BFS a akého iteratívne DFS?',
    moznosti: ['BFS queue (shift), DFS stack (pop).', 'BFS stack, DFS queue.', 'Oba používajú Set.', 'Oba používajú rekurziu.'],
    spravna: 'a',
    napoveda: 'BFS ide po vrstvách – kto prišiel prvý…',
    vysvetlenie: 'BFS berie najstarší vrchol z frontu (shift). Iteratívne DFS berie najnovší zo zásobníka (pop). Inak je kód rovnaký.',
  },
  {
    id: 10,
    otazka: 'Hľadáš najkratšiu cestu (najmenej hrán) v neváženom grafe. Ktorý algoritmus?',
    moznosti: ['BFS', 'DFS', 'Bubble sort', 'Binárne vyhľadávanie'],
    spravna: 'a',
    napoveda: 'Ktorý algoritmus navštívi najprv všetkých najbližších?',
    vysvetlenie: 'BFS ide po vrstvách: najprv vrcholy vo vzdialenosti 1, potom 2… Prvý raz, keď nájde cieľ, je to najkratšou cestou.',
  },
];

const GRAF_KOD = "const g = {\n  A: ['B', 'C'],\n  B: ['A', 'D'],\n  C: ['A'],\n  D: ['B'],\n};\n";

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: GRAF_KOD + 'console.log(g.A.length, g.D.length);',
    moznosti: ['2 1', '4 1', '2 2', '1 2'],
    spravna: 'a',
    napoveda: 'Koľko susedov má A a koľko D?',
    vysvetlenie: 'A má susedov B a C (2), D má len B (1).',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: GRAF_KOD + "console.log(g.B.includes('A'), g.C.includes('D'));",
    moznosti: ['true false', 'true true', 'false false', 'false true'],
    spravna: 'a',
    napoveda: 'Je A v zozname B? Je D v zozname C?',
    vysvetlenie: 'B je spojené s A (true). C nie je spojené s D (false).',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: GRAF_KOD + 'console.log(Object.keys(g).length);',
    moznosti: ['4', '3', '6', '8'],
    spravna: 'a',
    napoveda: 'Object.keys vráti vrcholy.',
    vysvetlenie: 'Vrcholy sú A, B, C, D, teda 4.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: GRAF_KOD + "g.A = g.A.filter(v => v !== 'B');\nconsole.log(g.A, g.B);",
    moznosti: ["[ 'C' ] [ 'A', 'D' ]", "[ 'C' ] [ 'D' ]", "[ 'B', 'C' ] [ 'A', 'D' ]", "[ 'B' ] [ 'A', 'D' ]"],
    spravna: 'a',
    napoveda: 'filter zmenil len zoznam A. Čo zoznam B?',
    vysvetlenie: 'Zo zoznamu A sa B odstránilo, ale B má stále A – hrana je odstránená len napoly. removeEdge musí upraviť oba zoznamy.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód? (BFS)',
    kod: GRAF_KOD + "const queue = ['A'];\nconst visited = { A: true };\nconst result = [];\nwhile (queue.length) {\n  const v = queue.shift();\n  result.push(v);\n  for (const s of g[v]) {\n    if (!visited[s]) {\n      visited[s] = true;\n      queue.push(s);\n    }\n  }\n}\nconsole.log(result);",
    moznosti: ["[ 'A', 'B', 'C', 'D' ]", "[ 'A', 'C', 'B', 'D' ]", "[ 'A', 'B', 'D', 'C' ]", "[ 'A', 'D', 'B', 'C' ]"],
    spravna: 'a',
    napoveda: 'BFS: najprv susedia A (B, C), potom susedia B (D).',
    vysvetlenie: 'Vrstva 0: A. Vrstva 1: B, C. Vrstva 2: D.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód? (DFS so zásobníkom)',
    kod: GRAF_KOD + "const stack = ['A'];\nconst visited = { A: true };\nconst result = [];\nwhile (stack.length) {\n  const v = stack.pop();\n  result.push(v);\n  for (const s of g[v]) {\n    if (!visited[s]) {\n      visited[s] = true;\n      stack.push(s);\n    }\n  }\n}\nconsole.log(result);",
    moznosti: ["[ 'A', 'C', 'B', 'D' ]", "[ 'A', 'B', 'C', 'D' ]", "[ 'A', 'B', 'D', 'C' ]", "[ 'A', 'D', 'C', 'B' ]"],
    spravna: 'a',
    napoveda: 'Po A sú na zásobníku B, C. pop vezme posledný – C.',
    vysvetlenie: 'A → na stack B, C. pop C (nové susedy nemá). pop B → na stack D. pop D. Výsledok A, C, B, D.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const visited = { A: true };\nconsole.log(visited.B, !visited.B);',
    moznosti: ['undefined true', 'false true', 'undefined false', 'null true'],
    spravna: 'a',
    napoveda: 'Kľúč B vo visited nie je.',
    vysvetlenie: 'visited.B je undefined a !undefined je true – preto if (!visited[s]) funguje aj pre vrcholy, ktoré ešte vo visited nie sú.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (počet hrán)',
    kod: "const g = { A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] };\nlet spolu = 0;\nfor (const susedia of Object.values(g)) spolu += susedia.length;\nconsole.log(spolu / 2);",
    moznosti: ['3', '6', '2', '9'],
    spravna: 'a',
    napoveda: 'V neorientovanom grafe je každá hrana zapísaná dvakrát.',
    vysvetlenie: 'Súčet dĺžok je 6, ale každá hrana je zapísaná u oboch vrcholov, preto hrán je 6 / 2 = 3 (trojuholník).',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: "const g = { A: [], B: [] };\ndelete g.A;\nconsole.log(Object.keys(g));",
    moznosti: ["[ 'B' ]", "[ 'A', 'B' ]", '[]', "[ 'A' ]"],
    spravna: 'a',
    napoveda: 'delete zmaže kľúč z objektu.',
    vysvetlenie: 'Po delete g.A ostane len kľúč B.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód? (matica susednosti)',
    kod: 'const m = [\n  [0, 1, 0],\n  [1, 0, 1],\n  [0, 1, 0],\n];\nconsole.log(m[0][1], m[0][2]);',
    moznosti: ['1 0', '0 1', '1 1', '0 0'],
    spravna: 'a',
    napoveda: 'm[riadok][stĺpec]. Je vrchol 0 spojený s 1? A s 2?',
    vysvetlenie: 'm[0][1] je 1 – vrcholy 0 a 1 sú spojené. m[0][2] je 0 – vrcholy 0 a 2 spojené nie sú.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'addVertex – nový vrchol (existujúci neprepíš)',
    napovedy: [
      'Po addVertex("A") zmiznú hrany vrcholu A. Čo sa stane, keď vrchol už existuje?',
      'Prázdne pole treba vytvoriť len vtedy, keď vrchol ešte nie je v adjacencyList.',
      'Pridaj podmienku: if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.Graph, STVOREC);
      g.addVertex('E');
      g.addVertex('A');
      rovne([g.adjacencyList.E, g.adjacencyList.A], [[], ['B', 'C']], '[zoznam E, zoznam A] po addVertex E a A');
    },
  },
  {
    id: 2,
    nazov: 'addEdge – hrana oboma smermi',
    napovedy: [
      'Po addEdge("A", "B") je B u A, ale A u B nie je. Čo sa pridáva do zoznamu v2?',
      'Do zoznamu v2 patrí v1.',
      'Zmeň this.adjacencyList[v2].push(v2) na this.adjacencyList[v2].push(v1).',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.Graph, { A: [], B: [] });
      g.addEdge('A', 'B');
      rovne(g.adjacencyList, { A: ['B'], B: ['A'] }, 'adjacencyList po addEdge(A, B)');
    },
  },
  {
    id: 3,
    nazov: 'removeEdge – odstráň hranu',
    napovedy: [
      'Po removeEdge ostane v zoznamoch LEN odstraňovaný vrchol. Čo nechá filter?',
      'filter nechá prvky, pre ktoré funkcia vráti true. My chceme nechať všetky OKREM v2.',
      'Zmeň v === v2 na v !== v2 (a v === v1 na v !== v1).',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.Graph, STVOREC);
      g.removeEdge('A', 'B');
      rovne([g.adjacencyList.A, g.adjacencyList.B], [['C'], ['D']], '[zoznam A, zoznam B] po removeEdge(A, B)');
    },
  },
  {
    id: 4,
    nazov: 'removeVertex – zmaž vrchol',
    napovedy: [
      'Hrany sa odstránia, ale vrchol D v adjacencyList zostane. Ako zmazať kľúč z objektu?',
      'Nastaviť hodnotu na undefined nestačí – kľúč stále existuje. Treba delete.',
      'Zmeň this.adjacencyList[vertex] = undefined na delete this.adjacencyList[vertex].',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.Graph, STVOREC);
      g.removeVertex('D');
      rovne(g.adjacencyList, { A: ['B', 'C'], B: ['A'], C: ['A'] }, 'adjacencyList po removeVertex(D)');
    },
  },
  {
    id: 5,
    nazov: 'dfsRecursive – choď do nenavštívených susedov',
    napovedy: [
      'Výsledok obsahuje len A. Kedy sa volá dfs(sused)?',
      'Do suseda chceme ísť, keď ešte NIE JE navštívený.',
      'Zmeň if (visited[sused]) na if (!visited[sused]).',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.Graph, ZAKLAD).dfsRecursive('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "dfsRecursive('A')");
    },
  },
  {
    id: 6,
    nazov: 'dfsRecursive2 – zapamätaj si navštívený vrchol',
    napovedy: [
      'RangeError = nekonečná rekurzia. Čo sa ukladá do visited?',
      'A navštívi B, B navštívi A, A znova B… lebo visited[vertex] je false.',
      'Zmeň visited[vertex] = false na visited[vertex] = true.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.Graph, ZAKLAD).dfsRecursive2('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "dfsRecursive2('A')");
    },
  },
  {
    id: 7,
    nazov: 'dfsIterative – so zásobníkom',
    napovedy: [
      'Poradie je ako pri BFS. Z ktorého konca berie zásobník?',
      'Stack berie posledný prvok – pop. shift je pre queue.',
      'Zmeň stack.shift() na stack.pop().',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.Graph, ZAKLAD).dfsIterative('A'), ['A', 'C', 'E', 'F', 'D', 'B'], "dfsIterative('A')");
    },
  },
  {
    id: 8,
    nazov: 'bfs – po vrstvách',
    napovedy: [
      'Poradie nie je po vrstvách. Z ktorého konca berie queue?',
      'Queue berie prvý prvok – shift.',
      'Zmeň queue.pop() na queue.shift().',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.Graph, ZAKLAD).bfs('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "bfs('A')");
    },
  },
  {
    id: 9,
    nazov: 'bfs2 – štart je navštívený od začiatku',
    napovedy: [
      'A je vo výsledku dvakrát. Prečo ho sused B znova zaradí do frontu?',
      'Štartovací vrchol nie je vo visited, takže ho sused považuje za nenavštívený.',
      'Zmeň const visited = {} na const visited = { [start]: true }.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.Graph, ZAKLAD).bfs2('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "bfs2('A')");
    },
  },
  {
    id: 10,
    nazov: 'countEdges – počet hrán neorientovaného grafu',
    napovedy: [
      'Pre štvorec A-B-D-C vráti 8 namiesto 4. Koľkokrát je každá hrana zapísaná?',
      'Hrana A–B je v zozname A aj v zozname B.',
      'Zmeň return spolu na return spolu / 2.',
    ],
    testy: (m, { rovne }) => {
      rovne([graf(m.Graph, STVOREC).countEdges(), graf(m.Graph, ZAKLAD).countEdges()], [4, 7], '[countEdges štvorca, countEdges základného grafu]');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'addVertex – prázdny zoznam susedov',
    napovedy: ['Čo dostane nový vrchol ako zoznam susedov?', 'Zatiaľ nemá žiadnych susedov.', 'Nahraď ___ s [].'],
    testy: (m, { rovne }) => {
      const g = graf(m.G, {});
      g.addVertex('X');
      rovne(g.adjacencyList, { X: [] }, 'adjacencyList po addVertex(X)');
    },
  },
  {
    id: 2,
    nazov: 'addEdge – pridaj suseda',
    napovedy: ['Ktorou metódou pridáš prvok do poľa?', 'Na koniec poľa.', 'Nahraď ___ slovom push.'],
    testy: (m, { rovne }) => {
      const g = graf(m.G, { A: [], B: [] });
      g.addEdge('A', 'B');
      rovne(g.adjacencyList, { A: ['B'], B: ['A'] }, 'adjacencyList po addEdge(A, B)');
    },
  },
  {
    id: 3,
    nazov: 'addEdge2 – druhý smer',
    napovedy: ['Do zoznamu v2 pridávame koho?', 'Druhý koniec hrany.', 'Nahraď ___ s v1.'],
    testy: (m, { rovne }) => {
      const g = graf(m.G, { A: [], B: [] });
      g.addEdge2('A', 'B');
      rovne(g.adjacencyList, { A: ['B'], B: ['A'] }, 'adjacencyList po addEdge2(A, B)');
    },
  },
  {
    id: 4,
    nazov: 'removeEdge – nechaj všetkých okrem v2',
    napovedy: ['Koho vyhadzujeme zo zoznamu v1?', 'Druhý koniec hrany.', 'Nahraď ___ s v2.'],
    testy: (m, { rovne }) => {
      const g = graf(m.G, STVOREC);
      g.removeEdge('A', 'B');
      rovne([g.adjacencyList.A, g.adjacencyList.B], [['C'], ['D']], '[zoznam A, zoznam B]');
    },
  },
  {
    id: 5,
    nazov: 'removeVertex – zmaž kľúč',
    napovedy: ['Ktorý kľúč mažeme z adjacencyList?', 'Parameter metódy.', 'Nahraď ___ slovom vertex.'],
    testy: (m, { rovne }) => {
      const g = graf(m.G, STVOREC);
      g.removeVertex('D');
      rovne(g.adjacencyList, { A: ['B', 'C'], B: ['A'], C: ['A'] }, 'adjacencyList po removeVertex(D)');
    },
  },
  {
    id: 6,
    nazov: 'dfsRecursive – označ navštívený',
    napovedy: ['Čo uložíme do visited pre navštívený vrchol?', 'Áno, bol som tu.', 'Nahraď ___ slovom true.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.G, ZAKLAD).dfsRecursive('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "dfsRecursive('A')");
    },
  },
  {
    id: 7,
    nazov: 'dfsRecursive2 – rekurzívne volanie',
    napovedy: ['Ktorú funkciu voláme pre nenavštíveného suseda?', 'Tú istú vnútornú funkciu – volá sa dfs.', 'Nahraď ___ slovom dfs.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.G, ZAKLAD).dfsRecursive2('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "dfsRecursive2('A')");
    },
  },
  {
    id: 8,
    nazov: 'dfsIterative – vezmi zo zásobníka',
    napovedy: ['Zásobník berie posledný prvok. Ktorá metóda?', 'Opak push.', 'Nahraď ___ slovom pop.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.G, ZAKLAD).dfsIterative('A'), ['A', 'C', 'E', 'F', 'D', 'B'], "dfsIterative('A')");
    },
  },
  {
    id: 9,
    nazov: 'bfs – vezmi z frontu',
    napovedy: ['Front berie prvý prvok. Ktorá metóda?', 'Opak unshift.', 'Nahraď ___ slovom shift.'],
    testy: (m, { rovne }) => {
      rovne(graf(m.G, ZAKLAD).bfs('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "bfs('A')");
    },
  },
  {
    id: 10,
    nazov: 'bfs2 – zaraď suseda (dve ___)',
    napovedy: [
      'Prvé ___: čo uložíš do visited? Druhé ___: ktorou metódou pridáš suseda na koniec frontu?',
      'Navštívený = true. Na koniec poľa pridáva push.',
      'Prvé ___ nahraď true, druhé ___ nahraď push.',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.G, ZAKLAD).bfs2('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "bfs2('A')");
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'addVertex – pridaj vrchol (existujúci neprepíš)',
    napovedy: ['Ak vrchol v adjacencyList nie je, vytvor mu prázdne pole.', 'if (!this.adjacencyList[v]) …', 'if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];'],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, { A: ['B'], B: ['A'] });
      g.addVertex('C');
      g.addVertex('A');
      rovne(g.adjacencyList, { A: ['B'], B: ['A'], C: [] }, 'adjacencyList po addVertex C a A');
    },
  },
  {
    id: 2,
    nazov: 'addEdge – neorientovaná hrana',
    napovedy: ['Do zoznamu v1 pridaj v2 a do zoznamu v2 pridaj v1.', 'Dva riadky s push.', 'this.adjacencyList[v1].push(v2); this.adjacencyList[v2].push(v1);'],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, { A: [], B: [], C: [] });
      g.addEdge('A', 'B');
      g.addEdge('A', 'C');
      rovne(g.adjacencyList, { A: ['B', 'C'], B: ['A'], C: ['A'] }, 'adjacencyList po addEdge(A, B), addEdge(A, C)');
    },
  },
  {
    id: 3,
    nazov: 'removeEdge – odstráň hranu z oboch zoznamov',
    napovedy: ['Použi filter na oba zoznamy.', 'Zo zoznamu v1 vyhoď v2, zo zoznamu v2 vyhoď v1.', 'Celé riešenie je v teórii v časti 3 (removeEdge).'],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, STVOREC);
      g.removeEdge('B', 'D');
      rovne([g.adjacencyList.B, g.adjacencyList.D], [['A'], ['C']], '[zoznam B, zoznam D]');
    },
  },
  {
    id: 4,
    nazov: 'removeVertex – odstráň vrchol aj všetky jeho hrany',
    napovedy: [
      'Pre každého suseda odstráň hranu (aj zo zoznamu suseda).',
      'Nakoniec delete this.adjacencyList[vertex].',
      'Celé riešenie je v teórii v časti 3 (removeVertex).',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, ZAKLAD);
      g.removeVertex('E');
      rovne(g.adjacencyList, { A: ['B', 'C'], B: ['A', 'D'], C: ['A'], D: ['B', 'F'], F: ['D'] }, 'adjacencyList po removeVertex(E)');
    },
  },
  {
    id: 5,
    nazov: 'dfsRecursive – DFS rekurzívne',
    napovedy: [
      'result = [], visited = {}. Vnútorná funkcia dfs(vertex): označ, pridaj, choď do nenavštívených susedov.',
      'Susedov prechádzaj v poradí, v akom sú v zozname (forEach alebo for...of).',
      'Celé riešenie je v teórii v časti 4 (DFS rekurzívne).',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.GraphP, ZAKLAD).dfsRecursive('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "dfsRecursive('A')");
      rovne(graf(m.GraphP, DVA_OSTROVY).dfsRecursive('C'), ['C', 'D'], "dfsRecursive('C') v grafe s dvoma ostrovmi");
    },
  },
  {
    id: 6,
    nazov: 'dfsIterative – DFS so zásobníkom',
    napovedy: [
      'stack = [start], visited = { [start]: true }.',
      'Kým stack nie je prázdny: v = stack.pop(), pridaj do výsledku, nenavštívených susedov označ a push.',
      'Celé riešenie je v teórii v časti 4 (DFS iteratívne).',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.GraphP, ZAKLAD).dfsIterative('A'), ['A', 'C', 'E', 'F', 'D', 'B'], "dfsIterative('A')");
    },
  },
  {
    id: 7,
    nazov: 'bfs – BFS s frontom',
    napovedy: [
      'Rovnaké ako dfsIterative, len namiesto pop použi shift.',
      'queue = [start], visited = { [start]: true }.',
      'Celé riešenie je v teórii v časti 4 (BFS).',
    ],
    testy: (m, { rovne }) => {
      rovne(graf(m.GraphP, ZAKLAD).bfs('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "bfs('A')");
      rovne(graf(m.GraphP, ZAKLAD).bfs('F'), ['F', 'D', 'E', 'B', 'C', 'A'], "bfs('F')");
    },
  },
  {
    id: 8,
    nazov: 'hasPath – existuje cesta z a do b?',
    napovedy: [
      'Spusti BFS (alebo DFS) z a.',
      'Ak sa b objaví medzi navštívenými, cesta existuje.',
      'return this.bfs(a).includes(b);',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, DVA_OSTROVY);
      rovne([g.hasPath('A', 'B'), g.hasPath('A', 'C'), g.hasPath('E', 'E')], [true, false, true], '[hasPath(A, B), (A, C), (E, E)]');
    },
  },
  {
    id: 9,
    nazov: 'countComponents – koľko je oddelených „ostrovov“',
    napovedy: [
      'Prechádzaj všetky vrcholy. Keď nájdeš nenavštívený, je to nový ostrov: pocet++ a navštív celý ostrov (BFS/DFS).',
      'Potrebuješ jeden spoločný visited pre všetky prechádzania.',
      'const visited = {}; let pocet = 0; for (const v of Object.keys(this.adjacencyList)) { if (visited[v]) continue; pocet++; const stack = [v]; visited[v] = true; while (stack.length) { const x = stack.pop(); for (const s of this.adjacencyList[x]) if (!visited[s]) { visited[s] = true; stack.push(s); } } } return pocet;',
    ],
    testy: (m, { rovne }) => {
      rovne([graf(m.GraphP, DVA_OSTROVY).countComponents(), graf(m.GraphP, ZAKLAD).countComponents(), graf(m.GraphP, {}).countComponents()], [3, 1, 0], '[dva ostrovy + osamelý E, základný graf, prázdny graf]');
    },
  },
  {
    id: 10,
    nazov: 'shortestPathLength – najmenej hrán z a do b (inak -1)',
    napovedy: [
      'BFS, ale vo fronte maj dvojice [vrchol, vzdialenosť].',
      'Začni [[a, 0]]. Keď vyberieš b, vráť jeho vzdialenosť. Susedov pridaj so vzdialenosťou + 1.',
      'if (a === b) return 0; const visited = { [a]: true }; const q = [[a, 0]]; while (q.length) { const [v, d] = q.shift(); for (const s of this.adjacencyList[v]) { if (s === b) return d + 1; if (!visited[s]) { visited[s] = true; q.push([s, d + 1]); } } } return -1;',
    ],
    testy: (m, { rovne }) => {
      const g = graf(m.GraphP, ZAKLAD);
      rovne([g.shortestPathLength('A', 'F'), g.shortestPathLength('A', 'B'), g.shortestPathLength('A', 'A')], [3, 1, 0], '[(A, F), (A, B), (A, A)]');
      rovne(graf(m.GraphP, DVA_OSTROVY).shortestPathLength('A', 'D'), -1, '(A, D) v grafe s ostrovmi');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
