# s10 – Vyhľadávanie (Udemy sekcia 10)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Lineárne vyhľadávanie (linear search)

Hľadáš kľúče v taške: vyťahuješ vec po veci, kým ich nenájdeš. To je **lineárne vyhľadávanie**.

```js
function linearSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;   // našiel som → hneď vráť index
  }
  return -1;                      // prešiel som všetko a nič → -1
}
```

- Funguje na **akomkoľvek** poli, aj nezotriedenom.
- Najlepší prípad: hľadaný prvok je prvý → **O(1)**.
- Najhorší prípad: je posledný alebo tam nie je → **O(n)**.
- ⚠ `return -1` patrí **za cyklus**! Keby bol v `else` vnútri cyklu, funkcia by skončila už po prvom prvku.

### `break` – okamžite ukonči cyklus

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) break;   // pri 2 cyklus skončí
  console.log(i);       // 0, 1
}
```

## 2. Hotové funkcie JavaScriptu (všetky sú lineárne, O(n))

| Metóda | Čo vráti | Príklad |
|---|---|---|
| `arr.indexOf(x)` | index prvého výskytu, alebo **-1** | `[5, 8].indexOf(8)` → `1` |
| `arr.includes(x)` | `true` / `false` | `[5, 8].includes(9)` → `false` |
| `arr.find(fn)` | **prvý prvok**, pre ktorý `fn` vráti true, alebo `undefined` | `[3, 7].find(x => x > 5)` → `7` |
| `arr.findIndex(fn)` | **index** toho prvku, alebo **-1** | `[3, 7].findIndex(x => x > 5)` → `1` |
| `text.includes(kus)` | je kus v texte? | `'ahoj'.includes('ho')` → `true` |
| `text.indexOf(kus)` | kde začína kus, alebo -1 | `'ahoj'.indexOf('ho')` → `1` |

⚠ `includes` a `indexOf` porovnávajú cez `===`, takže `[1, 2, 3].includes('2')` je `false` (text ≠ číslo).

### Šípková funkcia (arrow function)

`x => x > 5` je krátky zápis funkcie. Znamená: „dostanem `x` a vrátim, či je `x > 5`“.
Je to to isté ako:

```js
function jeVacsieAko5(x) {
  return x > 5;
}
```

`find` túto funkciu zavolá postupne na každý prvok, kým nevráti `true`.

```js
const ludia = [{ meno: 'Eva' }, { meno: 'Adam' }];
ludia.find(u => u.meno === 'Adam');   // { meno: 'Adam' }
```

## 3. Binárne vyhľadávanie (binary search) – opakovanie

Funguje **len na zotriedenom poli**. Každý krok zahodí polovicu.

```js
function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);   // stred musí byť CELÉ číslo!
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

| Prípad | Big O |
|---|---|
| najlepší (hľadaný je hneď v strede) | O(1) |
| priemerný a najhorší | O(log n) |

⚠ Bez `Math.floor` by mid mohol byť `1.5` a `arr[1.5]` je `undefined`.

**Lineárne alebo binárne?** Ak pole nie je zotriedené, binárne nefunguje. Zotriedenie stojí
O(n log n), takže pri jednom hľadaní sa oplatí lineárne. Pri mnohých hľadaniach v tom istom poli
sa oplatí raz zotriediť a potom hľadať binárne.

## 4. Naivné hľadanie v texte (naive string search)

Koľkokrát je slovo `'lol'` v texte `'lorie loled'`? Priložíš `'lol'` na každé miesto textu
a porovnávaš písmeno po písmene:

```
text:    l o r i e   l o l e d
i = 0:   l o l          ← 'r' ≠ 'l', break
i = 1:     l o l        ← 'o' ≠ 'l', break
...
i = 6:             l o l   ← všetky 3 písmená sedia → count++
```

```js
function naiveSearch(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {          // kde v texte začínam
    for (let j = 0; j < pattern.length; j++) {     // ktoré písmeno vzoru porovnávam
      if (text[i + j] !== pattern[j]) break;       // nesedí → skús ďalšie i
      if (j === pattern.length - 1) count++;       // sedelo aj posledné písmeno vzoru
    }
  }
  return count;
}
```

- `i` = kde v texte priložím vzor. `j` = koľké písmeno vzoru práve kontrolujem.
- Písmeno v texte je **`text[i + j]`** (začiatok + posun), vo vzore **`pattern[j]`**.
- Celé slovo sedí, keď sme úspešne prešli aj **posledné** písmeno: `j === pattern.length - 1`.
- Big O: **O(n · m)** (n = dĺžka textu, m = dĺžka vzoru) – cyklus v cykle.

## 5. Zhrnutie

| Algoritmus | Podmienka | Big O |
|---|---|---|
| lineárne | žiadna | O(n) |
| binárne | zotriedené pole | O(log n) |
| naivné v texte | žiadna | O(n · m) |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
