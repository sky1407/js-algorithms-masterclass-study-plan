# s15-17 – Merge Sort, Quick Sort, Radix Sort (Udemy sekcie 15–17)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Táto téma stavia na **rekurzii** (s07-09) – ak si ju ešte neprešiel, začni tam.

---

## 1. Nové pomôcky

```js
10 ** 3;                          // 1000  – mocnina (10 na tretiu)
Math.log10(1000);                 // 3     – „koľkokrát 10 na koľkú je 1000?“
Math.abs(-45);                    // 45    – absolútna hodnota (bez mínusu)
Math.max(...[3, 9, 2]);           // 9     – ... „vysype“ pole ako samostatné čísla
[].concat(...[[1], [2, 3], []]);  // [1, 2, 3] – spojí viac polí do jedného
Array.from({ length: 3 }, () => []);  // [[], [], []] – 3 prázdne „košíky“
```

## 2. Merge Sort – rozdeľ, zotrieď, spoj

**Myšlienka:** pole s 0 alebo 1 prvkom je **vždy zotriedené**. Takže:
1. Rozdeľ pole na **polovice**, tie zase na polovice… až kým nemáš kúsky s 1 prvkom.
2. Potom ich **spájaj** (merge) po dvojiciach tak, aby výsledok bol zotriedený.

```
        [8, 3, 5, 1]
       /            \
   [8, 3]          [5, 1]
   /    \          /    \
 [8]    [3]      [5]    [1]      ← 1 prvok = zotriedené
   \    /          \    /
   [3, 8]          [1, 5]        ← merge
       \            /
        [1, 3, 5, 8]             ← merge
```

### Spojenie (merge) dvoch ZOTRIEDENÝCH polí

Dva kopčeky zotriedených kariet. Vždy porovnáš **vrchné** karty a menšiu dáš do výsledku.

```js
function merge(a, b) {
  const result = [];
  let i = 0;                               // ukazovateľ do a
  let j = 0;                               // ukazovateľ do b
  while (i < a.length && j < b.length) {   // kým sú karty v oboch kopčekoch
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }   // zvyšok z a
  while (j < b.length) { result.push(b[j]); j++; }   // zvyšok z b
  return result;
}
```

### Merge Sort

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;                 // base case
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));       // ľavá polovica (indexy 0 … mid-1)
  const right = mergeSort(arr.slice(mid));         // pravá polovica (mid … koniec)
  return merge(left, right);
}
```

- `slice(0, mid)` a `slice(mid)` – spolu dajú **celé** pole, nič sa nestratí.
- Delení na polovice je log n, pri každej úrovni spájame n prvkov → **O(n log n) vždy**.
- Vytvára nové polia → pamäť **O(n)**.

## 3. Quick Sort – pivot

**Myšlienka:** vyber jeden prvok – **pivot**. Všetky menšie prvky daj **vľavo** od neho,
väčšie **vpravo**. Pivot je potom na **svojom definitívnom mieste**. To isté zopakuj
rekurzívne pre ľavú a pravú časť.

### Pomocná funkcia `pivot`

Pivot = prvý prvok. `swapIdx` počíta, koľko prvkov je menších ako pivot.

```js
function pivot(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {                     // našiel som menší prvok
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];  // presuň ho dopredu
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];  // pivot na svoje miesto
  return swapIdx;                         // kde pivot skončil
}
```

```
pivot([4, 8, 2, 1, 5, 7, 6, 3])
menšie ako 4: 2, 1, 3  → swapIdx = 3
výsledok: [3, 2, 1, 4, 5, 7, 6, 8], vráti 3   (4 je na indexe 3, vľavo menšie, vpravo väčšie)
```

`start = 0` v hlavičke funkcie znamená **predvolenú hodnotu** – ak parameter nezadáš, použije sa 0.

### Quick Sort

```js
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {                       // aspoň 2 prvky
    const p = pivot(arr, left, right);
    quickSort(arr, left, p - 1);            // ľavá časť (bez pivota)
    quickSort(arr, p + 1, right);           // pravá časť (bez pivota)
  }
  return arr;
}
```

- Pivot sa do rekurzie **nezahŕňa** (`p - 1` a `p + 1`) – už je na správnom mieste.
- Priemerne **O(n log n)**, ale **najhorší prípad O(n²)**: keď je pole už zotriedené a pivot
  je vždy prvý (najmenší) prvok, delí sa to na 0 a n-1 prvkov.
- Triedi **na mieste**, pamäť O(log n) (na rekurziu).

## 4. Radix Sort – triedenie podľa číslic

Radix sort **vôbec neporovnáva** čísla medzi sebou! Funguje len na **celých nezáporných číslach**.

Máš **10 košíkov** (0–9). Rozhádžeš čísla do košíkov podľa **poslednej číslice**, potom ich
vyberieš v poradí košíkov. Zopakuješ podľa **predposlednej číslice**, atď.

```
[902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]
podľa jednotiek:  0:[] 1:[] 2:[902] 3:[593] 4:[4] 5:[] 6:[1556,3556,4386,86] 7:[7,9637,8157] 8:[408] 9:[29]
→ [902, 593, 4, 1556, 3556, 4386, 86, 7, 9637, 8157, 408, 29]
podľa desiatok, stoviek, tisícok… → na konci je pole zotriedené
```

### Tri pomocné funkcie

```js
function getDigit(num, i) {             // i-ta číslica sprava (0 = jednotky)
  return Math.floor(Math.abs(num) / 10 ** i) % 10;
}
getDigit(12345, 0);  // 5
getDigit(12345, 2);  // 3   → 12345 / 100 = 123.45 → floor 123 → % 10 = 3

function digitCount(num) {              // počet číslic
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}
digitCount(423);     // 3   → log10(423) = 2.6… → floor 2 → + 1 = 3

function mostDigits(nums) {             // najviac číslic v poli
  let max = 0;
  for (const n of nums) max = Math.max(max, digitCount(n));
  return max;
}
```

### Radix Sort

```js
function radixSort(nums) {
  const kola = mostDigits(nums);
  for (let k = 0; k < kola; k++) {
    const buckets = Array.from({ length: 10 }, () => []);   // NOVÉ prázdne košíky v každom kole
    for (const n of nums) {
      buckets[getDigit(n, k)].push(n);
    }
    nums = [].concat(...buckets);                            // vysyp košíky po poradí
  }
  return nums;
}
```

- Košíky musia byť v **každom kole nové**, inak by sa čísla zdvojovali.
- Big O: **O(n · k)**, kde k = počet číslic najdlhšieho čísla.

## 5. Porovnanie

| Algoritmus | Najlepší | Priemer | Najhorší | Pamäť |
|---|---|---|---|---|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | **O(n²)** | O(log n) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n + k) |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám (bez `.sort()`).

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
