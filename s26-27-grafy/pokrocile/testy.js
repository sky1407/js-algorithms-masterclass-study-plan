'use strict';
const spravne = require('./riesenie');
const { Graph: Vzor } = spravne;

const povodne = {
  shortestPathLength(graph, start, end) {
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
  },
  hasCycle(graph) {
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
  },
  canFinish(numCourses, prerequisites) {
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
  },
};

function stav(x, navrat) {
  if (navrat) return x;
  const kopia = {};
  for (const [k, v] of Object.entries(x.adjacencyList)) kopia[k] = [...v];
  return kopia;
}

function popisOps(ops) {
  return ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
}

function overOps(Trieda, scenare, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', 'trieda Graph nie je exportovaná');
  for (const ops of scenare) rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popisOps(ops));
}

function zGrafu(Trieda, hrany) {
  const g = new Trieda();
  const vzor = new Vzor();
  for (const [a, b] of hrany) vzor.addEdge(a, b);
  g.adjacencyList = stav(vzor, false);
  return g;
}

const HRANY_KURZ = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E'], ['D', 'F'], ['E', 'F']];
const E = (...pary) => pary.map(([a, b]) => ['addEdge', a, b]);

const debug = [
  {
    id: 1,
    nazov: 'addVertex a addEdge',
    testy: (m, p) => overOps(m.Graph, [
      [['addVertex', 'Tokyo'], ['addVertex', 'Dallas'], ['addEdge', 'Tokyo', 'Dallas']],
      [['addVertex', 'A'], ['addEdge', 'A', 'B'], ['addVertex', 'A'], ['addEdge', 'A', 'C']],
      E(...HRANY_KURZ),
    ], p),
  },
  {
    id: 2,
    nazov: 'removeEdge a removeVertex',
    testy: (m, { rovne }) => {
      const pripady = [
        [HRANY_KURZ, (g) => g.removeEdge('A', 'B'), "removeEdge('A', 'B')"],
        [HRANY_KURZ, (g) => g.removeVertex('D'), "removeVertex('D')"],
        [[['X', 'Y'], ['Y', 'Z']], (g) => { g.removeVertex('Y'); g.removeVertex('Q'); }, "removeVertex('Y'), removeVertex('Q')"],
      ];
      for (const [hrany, akcia, popis] of pripady) {
        const g = zGrafu(m.Graph, hrany);
        const v = zGrafu(Vzor, hrany);
        akcia(g);
        akcia(v);
        rovne(stav(g, false), stav(v, false), `${popis} na grafe ${JSON.stringify(hrany)}`);
      }
    },
  },
  {
    id: 3,
    nazov: 'depthFirstRecursive',
    testy: (m, { rovne }) => {
      rovne(zGrafu(m.Graph, HRANY_KURZ).depthFirstRecursive('A'), ['A', 'B', 'D', 'E', 'C', 'F'], "depthFirstRecursive('A')");
      rovne(zGrafu(m.Graph, [['1', '2'], ['1', '3'], ['1', '4']]).depthFirstRecursive('1'), ['1', '2', '3', '4'], "depthFirstRecursive('1') – hviezda");
      rovne(zGrafu(m.Graph, [['a', 'b'], ['c', 'd']]).depthFirstRecursive('c'), ['c', 'd'], "depthFirstRecursive('c') – len komponent c");
      rovne(zGrafu(m.Graph, HRANY_KURZ).depthFirstRecursive('Z'), [], "depthFirstRecursive('Z') – neexistujúci vrchol");
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'breadthFirst',
    testy: (m, { rovne }) => {
      rovne(zGrafu(m.Graph, HRANY_KURZ).breadthFirst('A'), ['A', 'B', 'C', 'D', 'E', 'F'], "breadthFirst('A')");
      rovne(zGrafu(m.Graph, HRANY_KURZ).breadthFirst('F'), ['F', 'D', 'E', 'B', 'C', 'A'], "breadthFirst('F')");
      rovne(zGrafu(m.Graph, HRANY_KURZ).breadthFirst('Z'), [], "breadthFirst('Z')");
    },
  },
  {
    id: 5,
    nazov: 'depthFirstIterative',
    testy: (m, { rovne }) => {
      rovne(zGrafu(m.Graph, HRANY_KURZ).depthFirstIterative('A'), ['A', 'C', 'E', 'F', 'D', 'B'], "depthFirstIterative('A')");
      rovne(zGrafu(m.Graph, [['a', 'b']]).depthFirstIterative('b'), ['b', 'a'], "depthFirstIterative('b')");
      rovne(zGrafu(m.Graph, HRANY_KURZ).depthFirstIterative('Z'), [], "depthFirstIterative('Z')");
    },
  },
  {
    id: 6,
    nazov: 'countComponents – počet súvislých komponentov',
    testy: (m, { rovne }) => {
      rovne(m.countComponents(5, [[0, 1], [1, 2], [3, 4]]), 2, 'countComponents(5, [[0, 1], [1, 2], [3, 4]])');
      rovne(m.countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]), 1, 'countComponents(5, reťaz)');
      rovne(m.countComponents(4, []), 4, 'countComponents(4, [])');
      rovne(m.countComponents(0, []), 0, 'countComponents(0, [])');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'shortestPathLength – najmenej hrán medzi vrcholmi',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.shortestPathLength, spravne.shortestPathLength);
      const g = { A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D', 'E'], D: ['B', 'C', 'E'], E: ['C', 'D'] };
      rovne(m.shortestPathLength(g, 'A', 'E'), 2, "shortestPathLength(g, 'A', 'E')");
      rovne(m.shortestPathLength(g, 'B', 'E'), 2, "shortestPathLength(g, 'B', 'E')");
      rovne(m.shortestPathLength(g, 'A', 'A'), 0, "shortestPathLength(g, 'A', 'A')");
      rovne(m.shortestPathLength({ A: ['B'], B: ['A'], C: [] }, 'A', 'C'), -1, 'nedosiahnuteľný vrchol');
      const kruh = { 1: ['2', '6'], 2: ['1', '3'], 3: ['2', '4'], 4: ['3', '5'], 5: ['4', '6'], 6: ['5', '1'] };
      rovne(m.shortestPathLength(kruh, '1', '5'), 2, "shortestPathLength(kruh zo 6 vrcholov, '1', '5')");
    },
  },
  {
    id: 8,
    nazov: 'hasCycle – má neorientovaný graf cyklus?',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.hasCycle, spravne.hasCycle);
      rovne(m.hasCycle({ A: ['B'], B: ['A', 'C'], C: ['B'] }), false, 'hasCycle(A–B–C)');
      rovne(m.hasCycle({ A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] }), true, 'hasCycle(trojuholník)');
      rovne(m.hasCycle({ A: [], B: ['C'], C: ['B'] }), false, 'hasCycle(osamotený A, B–C)');
      rovne(m.hasCycle({ X: [], Y: ['Z', 'W', 'V'], Z: ['Y', 'W'], W: ['Y', 'Z'], V: ['Y'] }), true, 'hasCycle(cyklus až v 2. komponente)');
      rovne(m.hasCycle({}), false, 'hasCycle({})');
    },
  },
  {
    id: 9,
    nazov: 'canFinish – dajú sa absolvovať všetky predmety?',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.canFinish, spravne.canFinish);
      rovne(m.canFinish(2, [[1, 0]]), true, 'canFinish(2, [[1, 0]])');
      rovne(m.canFinish(2, [[1, 0], [0, 1]]), false, 'canFinish(2, [[1, 0], [0, 1]])');
      rovne(m.canFinish(3, [[1, 0], [2, 1], [0, 2]]), false, 'canFinish(3, kruh)');
      rovne(m.canFinish(5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]), true, 'canFinish(5, diamant + chvost)');
      rovne(m.canFinish(3, []), true, 'canFinish(3, [])');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'numIslands – počet ostrovov na mape',
    testy: (m, { rovne }) => {
      const g1 = ['11110', '11010', '11000', '00000'].map((r) => [...r]);
      const g2 = ['11000', '11000', '00100', '00011'].map((r) => [...r]);
      const g3 = ['101', '010', '101'].map((r) => [...r]);
      rovne(m.numIslands(g1), 1, 'numIslands(mapa 1)');
      rovne(m.numIslands(g2), 3, 'numIslands(mapa 2)');
      rovne(m.numIslands(g3), 5, 'numIslands(šachovnica – diagonála sa neráta)');
      rovne(m.numIslands([]), 0, 'numIslands([])');
      rovne(g1[0][0], '1', 'vstupná mapa sa nesmie zmeniť');
    },
  },
  {
    id: 11,
    nazov: 'shortestPath – samotná cesta (nielen dĺžka)',
    testy: (m, { rovne }) => {
      const metro = {
        Hlavna: ['Mlyny', 'Most'],
        Mlyny: ['Hlavna', 'Park'],
        Most: ['Hlavna', 'Park', 'Letisko'],
        Park: ['Mlyny', 'Most'],
        Letisko: ['Most'],
        Depo: [],
      };
      rovne(m.shortestPath(metro, 'Mlyny', 'Letisko'), ['Mlyny', 'Hlavna', 'Most', 'Letisko'], "shortestPath(metro, 'Mlyny', 'Letisko')");
      rovne(m.shortestPath(metro, 'Park', 'Letisko'), ['Park', 'Most', 'Letisko'], "shortestPath(metro, 'Park', 'Letisko')");
      rovne(m.shortestPath(metro, 'Hlavna', 'Hlavna'), ['Hlavna'], "shortestPath(metro, 'Hlavna', 'Hlavna')");
      rovne(m.shortestPath(metro, 'Hlavna', 'Depo'), null, "shortestPath(metro, 'Hlavna', 'Depo')");
      rovne(m.shortestPath(metro, 'Hlavna', 'Mars'), null, "shortestPath(metro, 'Hlavna', 'Mars')");
    },
  },
  {
    id: 12,
    nazov: 'topologicalSort – poradie úloh so závislosťami',
    testy: (m, { rovne }) => {
      const tasks = ['deploy', 'test', 'build', 'lint', 'install'];
      const deps = [['install', 'lint'], ['install', 'build'], ['build', 'test'], ['lint', 'test'], ['test', 'deploy']];
      rovne(m.topologicalSort(tasks, deps), ['install', 'build', 'lint', 'test', 'deploy'], 'topologicalSort(CI pipeline)');
      rovne(m.topologicalSort(['c', 'b', 'a'], []), ['a', 'b', 'c'], "topologicalSort(['c', 'b', 'a'], []) – bez závislostí abecedne");
      rovne(m.topologicalSort(['a', 'b'], [['a', 'b'], ['b', 'a']]), null, 'topologicalSort(cyklus)');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'suggestFriends – „Ľudia, ktorých možno poznáte“',
    testy: (m, { rovne }) => {
      const siet = {
        ja: ['eva', 'adam', 'ivan'],
        eva: ['ja', 'zuzka', 'peter'],
        adam: ['ja', 'zuzka', 'marek'],
        ivan: ['ja', 'eva', 'peter', 'zuzka'],
        zuzka: ['eva', 'adam', 'ivan'],
        peter: ['eva', 'ivan'],
        marek: ['adam'],
        cudzi: [],
      };
      rovne(
        m.suggestFriends(siet, 'ja'),
        [{ name: 'zuzka', mutual: 3 }, { name: 'peter', mutual: 2 }, { name: 'marek', mutual: 1 }],
        "suggestFriends(siet, 'ja')",
      );
      rovne(m.suggestFriends(siet, 'cudzi'), [], "suggestFriends(siet, 'cudzi')");
    },
  },
  {
    id: 14,
    nazov: 'spreadTime – za koľko dní sa správa rozšíri',
    testy: (m, { rovne }) => {
      const firma = {
        sef: ['anna', 'boris'],
        anna: ['sef', 'cyril'],
        boris: ['sef', 'cyril', 'dana'],
        cyril: ['anna', 'boris', 'emil'],
        dana: ['boris'],
        emil: ['cyril'],
        brigadnik: [],
        externista: ['brigadnik'],
      };
      rovne(m.spreadTime(firma, 'sef'), { days: 3, unreachable: ['brigadnik', 'externista'] }, "spreadTime(firma, 'sef')");
      rovne(m.spreadTime(firma, 'emil'), { days: 3, unreachable: ['brigadnik', 'externista'] }, "spreadTime(firma, 'emil')");
      rovne(m.spreadTime({ x: [] }, 'x'), { days: 0, unreachable: [] }, "spreadTime({ x: [] }, 'x')");
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
