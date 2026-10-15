# s26-27 – Grafy a prechádzanie grafu (Udemy sekcie 26, 27)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Potrebuješ **rekurziu** (s07-09), **stack a queue** (s21) a **BFS/DFS na stromoch** (s22-23).

---

## 1. Čo je graf

Graf sú **body** (vrcholy) spojené **čiarami** (hranami). Na rozdiel od stromu tu **nie je**
koreň ani pravidlo rodič–dieťa a môžu tam byť **kruhy** (cykly).

Príklady:
- **mapa** – mestá sú vrcholy, cesty sú hrany,
- **Facebook** – ľudia sú vrcholy, priateľstvá hrany,
- **odporúčania** („ľudia, ktorí kúpili X, kúpili aj Y“),
- **internet** – stránky a odkazy.

### Slovník

- **vertex (vrchol, uzol)** – bod, napr. mesto `'Bánovce'`.
- **edge (hrana)** – spojenie dvoch vrcholov.
- **neorientovaný graf** – hrany platia **oboma smermi** (Facebook: keď som tvoj priateľ, si aj ty môj).
- **orientovaný graf** – hrany majú **smer** (Instagram: ja sledujem teba, ty mňa nemusíš).
- **vážený graf** – hrany majú **hodnotu** (napr. vzdialenosť v km). Uvidíš v s28.

## 2. Ako graf uložiť

```
  A ─── B
  │     │
  C ─── D
```

**Adjacency list (zoznam susedov)** – každý vrchol má pole svojich susedov:

```js
{
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C'],
}
```

**Adjacency matrix (matica susednosti)** – tabuľka, 1 = je hrana, 0 = nie je:

```
    A B C D
A [ 0 1 1 0 ]
B [ 1 0 0 1 ]
C [ 1 0 0 1 ]
D [ 0 1 1 0 ]
```

| | Zoznam susedov | Matica |
|---|---|---|
| pamäť | málo (len existujúce hrany) | veľa (n × n) |
| „sú A a D susedia?“ | O(počet susedov) | O(1) |
| prejsť všetkých susedov | rýchle | O(n) |

Reálne grafy majú málo hrán (nie si priateľ s každým na svete), preto sa väčšinou používa
**zoznam susedov**. Aj Colt a tieto úlohy ho používajú.

## 3. Trieda Graph (neorientovaný)

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];   // existujúci NEPREPÍŠ
  }

  addEdge(v1, v2) {                      // neorientovaný → do OBOCH zoznamov
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {                   // z OBOCH zoznamov
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const sused = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, sused);    // odstráň hranu aj zo zoznamu suseda
    }
    delete this.adjacencyList[vertex];   // nakoniec zmaž samotný vrchol
  }
}
```

- `arr.filter(v => v !== x)` vráti **nové pole bez** prvkov rovných `x`.
- `delete obj[kluc]` zmaže kľúč z objektu úplne.

## 4. Prechádzanie grafu

V grafe môžu byť **kruhy** (A → B → D → C → A). Keby sme si nepamätali, kde sme už boli,
chodili by sme dookola donekonečna. Preto vždy máme objekt **`visited`**:
`visited['A'] = true` znamená „vo vrchole A som už bol“.

Vo všetkých príkladoch nižšie a v testoch sa používa tento graf:

```
      A
    /   \
   B     C
   |     |
   D --- E
    \   /
      F
```

```js
A: ['B', 'C'],  B: ['A', 'D'],  C: ['A', 'E'],
D: ['B', 'E', 'F'],  E: ['C', 'D', 'F'],  F: ['D', 'E']
```

### DFS rekurzívne – choď čo najhlbšie

```js
dfsRecursive(start) {
  const result = [];
  const visited = {};
  const adj = this.adjacencyList;
  (function dfs(vertex) {               // funkcia, ktorá sa hneď sama zavolá
    visited[vertex] = true;
    result.push(vertex);
    adj[vertex].forEach(sused => {
      if (!visited[sused]) dfs(sused);  // nenavštívený sused → choď doňho
    });
  })(start);
  return result;
}
// ['A', 'B', 'D', 'E', 'C', 'F']
```

`arr.forEach(x => …)` zavolá funkciu pre každý prvok – ako `for (const x of arr)`.

### DFS iteratívne – so zásobníkom (stack)

```js
dfsIterative(start) {
  const stack = [start];
  const result = [];
  const visited = { [start]: true };    // [start] = kľúč z premennej
  while (stack.length) {
    const vertex = stack.pop();         // STACK – berieme posledný
    result.push(vertex);
    this.adjacencyList[vertex].forEach(sused => {
      if (!visited[sused]) {
        visited[sused] = true;
        stack.push(sused);
      }
    });
  }
  return result;
}
// ['A', 'C', 'E', 'F', 'D', 'B']
```

### BFS – po vrstvách, s frontom (queue)

```js
bfs(start) {
  const queue = [start];
  const result = [];
  const visited = { [start]: true };    // štart je navštívený hneď od začiatku!
  while (queue.length) {
    const vertex = queue.shift();       // QUEUE – berieme prvý
    result.push(vertex);
    this.adjacencyList[vertex].forEach(sused => {
      if (!visited[sused]) {
        visited[sused] = true;
        queue.push(sused);
      }
    });
  }
  return result;
}
// ['A', 'B', 'C', 'D', 'E', 'F']
```

Jediný rozdiel medzi DFS iteratívne a BFS: **`pop`** (stack) vs **`shift`** (queue)!

| | DFS | BFS |
|---|---|---|
| pomocník | rekurzia alebo **stack** | **queue** |
| poradie | najprv do hĺbky | po vrstvách (najbližší prví) |
| na čo sa hodí | prejsť všetko, nájsť cestu, bludisko | **najkratšia cesta** v počte hrán |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá metóda má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš metódy sám.

Testy si graf pripravia samy (priamo do `adjacencyList`), takže poradie úloh je jedno.
Vzorové riešenia sú v `riesenie.js`.
