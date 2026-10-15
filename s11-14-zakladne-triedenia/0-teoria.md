# s11-14 – Bubble, Selection, Insertion Sort (Udemy sekcie 11–14)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Výmena dvoch prvkov (swap)

Všetky triedenia neustále **vymieňajú** dva prvky. Ako vymeniť obsah dvoch pohárov?
Potrebuješ **tretí, prázdny pohár**:

```js
function swap(arr, i, j) {
  const temp = arr[i];   // obsah prvého si odložím
  arr[i] = arr[j];       // do prvého nalejem druhý
  arr[j] = temp;         // do druhého dám odložený
}
```

Bez `temp` by si prvú hodnotu prepísal a stratil.

Moderný skrátený zápis (robí to isté):

```js
[arr[i], arr[j]] = [arr[j], arr[i]];
```

## 2. Hotové triedenie a porovnávacia funkcia

```js
[3, 1, 2].sort((a, b) => a - b);   // [1, 2, 3]  vzostupne
[3, 1, 2].sort((a, b) => b - a);   // [3, 2, 1]  zostupne
['b', 'a'].sort();                  // ['a', 'b'] texty abecedne
[10, 9, 1].sort();                  // [1, 10, 9] ⚠ čísla ako text!
```

Porovnávacia funkcia `(a, b) => …` musí vrátiť **číslo**:
- **záporné** → `a` ide pred `b`,
- **kladné** → `b` ide pred `a`,
- **0** → je to jedno.

`a - b` je záporné, keď je `a` menšie, takže menšie ide dopredu → vzostupne.

**Objekty** triediš podľa vlastnosti: `ludia.sort((a, b) => a.vek - b.vek)`.
Texty podľa dĺžky: `slova.sort((a, b) => a.length - b.length)`.

⚠ Funkcia musí vrátiť číslo, nie `true`/`false`. `(a, b) => a > b` nefunguje spoľahlivo.

## 3. Bubble Sort (bublinkové triedenie)

Porovnávaš **susedov**. Keď je ľavý väčší, vymeníš ich. Najväčšie číslo tak ako bublina
„vybuble“ na koniec. Potom to zopakuješ pre zvyšok.

```
[5, 3, 4, 1]
 5>3 swap → [3, 5, 4, 1]
 5>4 swap → [3, 4, 5, 1]
 5>1 swap → [3, 4, 1, 5]   ← po 1. prechode je najväčšie (5) na konci
```

```js
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {         // koľko prvkov ešte nie je na mieste
    for (let j = 0; j < i - 1; j++) {             // prechádzam susedov
      if (arr[j] > arr[j + 1]) {                  // ľavý väčší ako pravý?
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // vymeň
      }
    }
  }
  return arr;
}
```

**Optimalizácia `noSwaps`:** ak počas celého prechodu nenastala **ani jedna výmena**, pole je
už zotriedené a môžeš skončiť.

```js
for (let i = arr.length; i > 0; i--) {
  let noSwaps = true;                 // predpokladám, že výmena nebude
  for (let j = 0; j < i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      noSwaps = false;                // výmena bola
    }
  }
  if (noSwaps) break;                 // žiadna výmena → hotovo
}
```

## 4. Selection Sort (triedenie výberom)

Nájdeš **najmenší** prvok zo zvyšku a dáš ho **na začiatok zvyšku**.

```
[5, 3, 4, 1]   najmenší je 1 (index 3) → vymeň s indexom 0 → [1, 3, 4, 5]
[1 | 3, 4, 5]  najmenší zo zvyšku je 3, už je na mieste
...
```

```js
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;                                // zatiaľ najmenší = prvý zo zvyšku
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;           // našiel som menší → zapamätaj si jeho INDEX
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];  // daj ho na miesto i
    }
  }
  return arr;
}
```

- `min` je **index**, nie hodnota.
- Robí málo výmen (najviac n), ale porovnaní vždy veľa → O(n²) vždy.

## 5. Insertion Sort (triedenie vkladaním)

Ako keď **triediš karty v ruke**: berieš kartu po karte a **vkladáš ju na správne miesto**
medzi už zotriedené karty vľavo.

```
[2, 5, 4, 1]
 [2, 5 | 4, 1]     vezmem 4: 5 > 4 → posuň 5 doprava, 2 < 4 → vlož 4 → [2, 4, 5, 1]
 [2, 4, 5 | 1]     vezmem 1: posuň 5, 4, 2 doprava, vlož 1 na začiatok → [1, 2, 4, 5]
```

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];             // karta, ktorú vkladám
    let j = i - 1;                      // začnem porovnávať s kartou vľavo
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];              // väčšiu kartu posuň o miesto doprava
      j--;
    }
    arr[j + 1] = current;               // vlož kartu do vzniknutej medzery
  }
  return arr;
}
```

- `j >= 0` – nesmieme ísť pred začiatok poľa (index 0 ešte treba skontrolovať).
- Medzera je na `j + 1`, lebo `j` sme posunuli o jedno ďalej, než treba.
- Na **takmer zotriedenom** poli je veľmi rýchly – O(n).

## 6. Porovnanie

| Algoritmus | Najlepší | Priemer | Najhorší | Pamäť |
|---|---|---|---|---|
| Bubble (s noSwaps) | O(n) | O(n²) | O(n²) | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |

- Všetky tri sú **jednoduché, ale pomalé** pri veľkých poliach.
- Pamäť O(1): triedia **na mieste** (v tom istom poli), nepotrebujú nové pole.
- Insertion sort je super, keď je pole skoro zotriedené alebo keď prvky prichádzajú postupne.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
