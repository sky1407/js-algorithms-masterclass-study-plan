# s28 – Dijkstrov algoritmus (Udemy sekcia 28)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Potrebuješ **grafy** (s26-27) a **prioritný rad** (s24).

---

## 1. Čo rieši

**Najkratšiu cestu vo váženom grafe** z jedného vrcholu do ostatných.
Presne to robí **GPS navigácia**: mestá sú vrcholy, cesty hrany a **váha** hrany je dĺžka cesty v km.

BFS (s26-27) nájde cestu s najmenej **hranami**. Ale cesta cez 3 krátke úseky môže byť kratšia
ako jedna dlhá diaľnica – preto treba Dijkstru.

⚠ Dijkstra funguje len pre **nezáporné** váhy (vzdialenosť nemôže byť záporná).

## 2. Vážený graf

Sused sa ukladá spolu s váhou: `{ node: 'B', weight: 4 }`.

```js
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });   // { weight } = { weight: weight }
    this.adjacencyList[v2].push({ node: v1, weight });
  }
}
```

Graf, ktorý používajú všetky príklady a testy:

```
        A
     4 / \ 2
      B   C
    3 |   | \ 2
      |   |  D
      E   F /    hrany: A-B 4, A-C 2, B-E 3, C-D 2,
                        C-F 4, D-E 3, D-F 1, E-F 1
```

Najkratšia cesta **A → E**: `A → C → D → F → E` s dĺžkou 2 + 2 + 1 + 1 = **6**
(priama cesta A → B → E má dĺžku 7).

## 3. Jednoduchý prioritný rad

Dijkstra potrebuje vždy vybrať vrchol s **najmenšou** vzdialenosťou. Colt najprv používa
jednoduchú verziu, ktorá po každom vložení **zotriedi** pole (pomalšie, ale ľahké):

```js
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.priority);   // najmenšia priorita dopredu
  }
  dequeue() {
    return this.values.shift();                             // vyber prvý = najmenší
  }
}
```

(Rýchlejšia verzia je binárny heap zo s24 – funguje rovnako, len enqueue/dequeue sú O(log n).)

## 4. Dijkstrov algoritmus krok za krokom

Tri pomocné objekty:
- **distances** – najkratšia **zatiaľ známa** vzdialenosť od štartu ku každému vrcholu.
  Na začiatku: štart **0**, všetky ostatné **Infinity** (ešte nevieme, ako sa tam dostať).
- **previous** – **odkiaľ** sme do vrcholu prišli najkratšou cestou (na poskladanie cesty).
- **pq** – prioritný rad vrcholov podľa vzdialenosti.

Postup:
1. Vyber z `pq` vrchol s **najmenšou** vzdialenosťou (`smallest`).
2. Ak je to cieľ → hotovo, poskladaj cestu.
3. Pre každého suseda vypočítaj `candidate = distances[smallest] + váha hrany`.
4. Ak je `candidate` **menší** ako doteraz známa vzdialenosť suseda → **našli sme kratšiu cestu**:
   ulož novú vzdialenosť, zapamätaj si `previous[sused] = smallest` a vlož suseda do `pq`.
   (Tomuto kroku sa hovorí **relaxácia**.)
5. Opakuj.

```js
dijkstra(start, finish) {
  const pq = new PriorityQueue();
  const distances = {};
  const previous = {};
  const path = [];

  for (const v in this.adjacencyList) {              // for...in prejde kľúče objektu
    if (v === start) {
      distances[v] = 0;
      pq.enqueue(v, 0);
    } else {
      distances[v] = Infinity;
      pq.enqueue(v, Infinity);
    }
    previous[v] = null;
  }

  while (pq.values.length) {
    let smallest = pq.dequeue().val;
    if (smallest === finish) {
      while (previous[smallest]) {                  // ideme od cieľa späť po previous
        path.push(smallest);
        smallest = previous[smallest];
      }
      return path.concat(smallest).reverse();       // pridaj štart a otoč
    }
    if (distances[smallest] === Infinity) break;    // zvyšok je nedosiahnuteľný
    for (const neighbor of this.adjacencyList[smallest]) {
      const candidate = distances[smallest] + neighbor.weight;
      if (candidate < distances[neighbor.node]) {   // kratšia cesta!
        distances[neighbor.node] = candidate;
        previous[neighbor.node] = smallest;
        pq.enqueue(neighbor.node, candidate);
      }
    }
  }
  return path;
}
```

### Ukážka (A → E)

| krok | smallest | čo sa zmení |
|---|---|---|
| 1 | A (0) | B = 4 (cez A), C = 2 (cez A) |
| 2 | C (2) | D = 4 (cez C), F = 6 (cez C) |
| 3 | B (4) | E = 7 (cez B) |
| 4 | D (4) | F = 5 (cez D) – lepšie ako 6! E cez D by bolo 7, nie lepšie |
| 5 | F (5) | E = 6 (cez F) – lepšie ako 7! |
| 6 | E (6) | cieľ → cesta podľa previous: E ← F ← D ← C ← A |

### Skladanie cesty z previous

```
previous = { A: null, B: 'A', C: 'A', D: 'C', E: 'F', F: 'D' }
E → previous[E] = F → previous[F] = D → previous[D] = C → previous[C] = A → previous[A] = null (stop)
pozbierané: [E, F, D, C] + A → otočíme → [A, C, D, F, E]
```

## 5. Rýchlosť

S binárnym heapom: **O((V + E) · log V)**, kde V = počet vrcholov, E = počet hrán.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš triedy a metódy sám.

Testy si graf pripravia samy, takže poradie úloh je jedno.
Vzorové riešenia sú v `riesenie.js`.
