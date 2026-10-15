# s24 – Binary Heap a Priority Queue (Udemy sekcia 24)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Nadväzuje na **stromy** (s22-23).

---

## 1. Čo je binary heap (halda)

Heap je **binárny strom** s dvomi pravidlami:

1. **Max heap:** každý rodič je **väčší** ako jeho deti. (Min heap: rodič je **menší**.)
   Na poradí ľavé/pravé dieťa nezáleží – to nie je BST!
2. Strom je **čo najkompaktnejší**: poschodia sa plnia **zľava doprava** a nové poschodie
   začne až po zaplnení predchádzajúceho.

```
          41            ← najväčší je vždy v koreni
        /    \
      39      33
     /  \    /
   18    27 12
```

Predstav si **firmu**: šéf je nad všetkými (najväčší), pod ním vedúci, pod nimi zamestnanci.
Kto je nad kým, je dané – ale medzi kolegami na rovnakej úrovni sa nič neporovnáva.

## 2. Heap v poli

Heap sa ukladá do **obyčajného poľa** – po poschodiach, zľava doprava:

```
index:   0   1   2   3   4   5
pole:  [41, 39, 33, 18, 27, 12]
```

Pre prvok na indexe **n**:
- ľavé dieťa: **2n + 1**
- pravé dieťa: **2n + 2**
- rodič: **Math.floor((n - 1) / 2)**

Skúška: 39 je na indexe 1. Jeho deti: 2·1+1 = **3** (18) a 2·1+2 = **4** (27). Jeho rodič: floor(0/2) = **0** (41). ✓

## 3. Max Binary Heap

```js
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
}
```

### insert – pridaj na koniec a nechaj „vybublať“ hore (bubble up)

```js
insert(element) {
  this.values.push(element);              // 1. na koniec
  let idx = this.values.length - 1;
  while (idx > 0) {                       // 2. kým nie som koreň
    const parentIdx = Math.floor((idx - 1) / 2);
    const parent = this.values[parentIdx];
    if (element <= parent) break;         //    rodič je väčší → som na mieste
    this.values[parentIdx] = element;     //    inak sa vymeň s rodičom
    this.values[idx] = parent;
    idx = parentIdx;                      //    a pokračuj z jeho miesta
  }
  return this;
}
```

```
insert(55) do [41, 39, 33, 18, 27, 12]:
[41, 39, 33, 18, 27, 12, 55]   55 na index 6, rodič index 2 (33) → vymeň
[41, 39, 55, 18, 27, 12, 33]   55 na index 2, rodič index 0 (41) → vymeň
[55, 39, 41, 18, 27, 12, 33]   55 je koreň → koniec
```

### extractMax – vyber najväčší a oprav heap (sink down)

1. Odlož si koreň (to je maximum).
2. **Posledný** prvok daj na miesto koreňa.
3. Nechaj ho **klesať** (sink down): vymieňaj ho s **väčším** z detí, kým je niektoré dieťa väčšie.

```js
extractMax() {
  const max = this.values[0];
  const end = this.values.pop();
  if (this.values.length > 0) {           // ak niečo ostalo
    this.values[0] = end;
    this.sinkDown();
  }
  return max;
}

sinkDown() {
  let idx = 0;
  const length = this.values.length;
  const element = this.values[0];
  while (true) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let swap = null;
    if (leftIdx < length && this.values[leftIdx] > element) {
      swap = leftIdx;
    }
    if (rightIdx < length) {
      const right = this.values[rightIdx];
      if ((swap === null && right > element) ||
          (swap !== null && right > this.values[leftIdx])) {
        swap = rightIdx;                  // pravé je ešte väčšie
      }
    }
    if (swap === null) break;             // žiadne dieťa nie je väčšie → hotovo
    [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
    idx = swap;
  }
}
```

⚠ Ak by si v `extractMax` vynechal `if (this.values.length > 0)`, pri poslednom prvku by si ho
`pop`-om vybral a hneď vrátil späť na index 0 – heap by sa nikdy nevyprázdnil.

## 4. Priority Queue (prioritný rad)

**Pohotovosť v nemocnici:** neošetruje sa podľa príchodu, ale podľa **závažnosti**.
Každý prvok má **prioritu**; von ide ten s **najvyššou prioritou**.

Colt používa **min heap podľa priority**: menšie číslo = dôležitejšie (priorita 1 ide prvá).

```js
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const node = new Node(val, priority);
    this.values.push(node);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (node.priority >= parent.priority) break;   // MIN heap: rodič má menšiu prioritu
      this.values[parentIdx] = node;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      // sinkDown rovnako ako pri heape, len porovnávaš .priority a hľadáš MENŠIE dieťa
    }
    return min;
  }
}
```

## 5. Rýchlosť

| Operácia | Big O |
|---|---|
| insert / enqueue | O(log n) |
| extractMax / dequeue | O(log n) |
| pozrieť maximum (peek) | O(1) |
| hľadanie ľubovoľnej hodnoty | O(n) |

Heap je **vždy vyvážený** (plní sa po poschodiach), takže jeho výška je log n – na rozdiel od BST
nemôže vzniknúť „palica“.

Heap sa používa v prioritných radoch, v **Dijkstrovom algoritme** (s28) a v triedení **heap sort**.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš triedy a funkcie sám.

Testy si `values` pripravia samy, takže poradie úloh je jedno.
Vzorové riešenia sú v `riesenie.js`.
