# s05-06 – Sliding Window a Divide and Conquer (Udemy sekcie 5, 6)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Pomocníci: Math.max, Math.min, Math.floor, Infinity

```js
Math.max(3, 7, 2);    // 7  – najväčšie z čísel
Math.min(3, 7, 2);    // 2  – najmenšie
Math.floor(3.7);      // 3  – odsekne desatinnú časť (zaokrúhli nadol)
Math.floor(7 / 2);    // 3
Infinity;             // nekonečno – väčšie ako akékoľvek číslo
Math.min(Infinity, 4) // 4
```

**Trik s Infinity:** keď hľadáš **najmenšie** číslo, začni s `let min = Infinity`.
Prvé skutočné číslo bude určite menšie a nahradí ho.

Text sa dá krájať ako pole: `'abcd'.slice(1, 3)` → `'bc'`.

## 2. Sliding Window (posuvné okno)

Predstav si vlak a okno, cez ktoré vidíš presne **k** vagónov. Keď sa vlak pohne o jeden vagón,
jeden vagón z okna **odíde** a jeden nový **príde**. Ostatné vidíš stále.

### Úloha: najväčší súčet k susedných čísel

`maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)` → `10` (dvojica 2 + 8).

**Naivne** by si pre každý začiatok sčítal k čísel znova: cyklus v cykle, O(n · k).

**S oknom:**

```
[1, 2, 5, 2, 8, 1, 5]      k = 2
[1, 2]                     súčet 3   (prvé okno spočítame celé)
   [2, 5]                  3 - 1 + 5 = 7   (1 odišla, 5 prišla)
      [5, 2]               7 - 2 + 2 = 7
         [2, 8]            7 - 5 + 8 = 10  ← najväčší
            [8, 1]         ...
```

```js
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];   // 1. prvé okno
  let max = sum;                               //    zatiaľ najlepšie = prvé okno
  for (let i = k; i < arr.length; i++) {       // 2. posúvam okno
    sum = sum - arr[i - k] + arr[i];           //    odíde arr[i - k], príde arr[i]
    max = Math.max(max, sum);
  }
  return max;
}
```

- `sum += arr[i]` je skratka za `sum = sum + arr[i]`.
- Keď nové okno končí na indexe `i`, prvok, ktorý práve odišiel, je na indexe **`i - k`**.
- `max` začína **prvým oknom**, nie nulou! Ak sú všetky čísla záporné, 0 by bola zlá odpoveď.
- Každý prvok raz príde a raz odíde → **O(n)**.

### Okno s meniacou sa veľkosťou

**Úloha `minSubArrayLen`:** najkratší kus poľa, ktorého súčet je **aspoň** `target`. Ak neexistuje, vráť 0.

Okno je ako húsenica: **natiahne sa** doprava (pridá číslo), a kým je súčet dosť veľký,
**stiahne zadok** zľava (skúsi byť kratšia).

```js
function minSubArrayLen(arr, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];                         // natiahni sa doprava
    while (sum >= target) {                    // kým je súčet dosť veľký
      minLen = Math.min(minLen, right - left + 1);  // dĺžka okna
      sum -= arr[left];                        // stiahni sa zľava
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;     // nič nenašla → 0
}
```

- Dĺžka okna od `left` po `right` (vrátane) je `right - left + 1`.
- `podmienka ? a : b` znamená „ak platí podmienka, tak a, inak b“.

### Najdlhší kus textu bez opakujúceho sa písmena

`findLongestSubstring('abcabcbb')` → `3` (`'abc'`).

```js
function findLongestSubstring(str) {
  let start = 0;
  let best = 0;
  const seen = {};                             // písmeno → index, kde som ho naposledy videl
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) {              // písmeno som už videl
      start = Math.max(start, seen[ch] + 1);   // okno začne ZA jeho starým výskytom
    }
    best = Math.max(best, i - start + 1);
    seen[ch] = i;
  }
  return best;
}
```

⚠ Prečo `seen[ch] !== undefined` a nie len `if (seen[ch])`? Lebo index môže byť **0** a 0 je falsy!

## 3. Divide and Conquer (rozdeľ a panuj)

Veľký problém rozdelíš na **menšie časti** (často polovice) a riešiš len tú, ktorá treba.

### Binárne vyhľadávanie (binary search)

Hra „myslím si číslo od 1 do 100“. Nehádaš 1, 2, 3…, ale **50**. „Viac.“ → **75**. „Menej.“ → **62**…
Každou otázkou zahodíš **polovicu** možností.

**Funguje len na ZOTRIEDENOM poli.**

```js
function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {                      // kým je čo prehľadávať
    const mid = Math.floor((left + right) / 2);// stred
    if (arr[mid] === x) return mid;            // našiel som
    if (arr[mid] < x) left = mid + 1;          // stred je malý → hľadaj vpravo
    else right = mid - 1;                      // stred je veľký → hľadaj vľavo
  }
  return -1;                                   // nie je tam
}
```

- `left <= right` (s rovná sa!), lebo aj jeden zostávajúci prvok treba skontrolovať.
- `mid + 1` a `mid - 1`, lebo `mid` sme už skontrolovali.

### Prečo je to tak rýchle: O(log n)

Koľkokrát môžeš číslo deliť dvoma, kým nedostaneš 1?
- 8 → 4 → 2 → 1: **3** delenia
- 1024 → … → 1: **10** delení
- 1 000 000 → … → 1: asi **20** delení

Tomuto počtu sa hovorí **logaritmus** (log₂ n). Binárne vyhľadávanie v milióne prvkov
potrebuje najviac ~20 krokov. Lineárne (prvok po prvku) až 1 000 000.

## 4. Zhrnutie

| Technika | Kedy | Big O |
|---|---|---|
| súčet každého okna znova | naivne | O(n · k) |
| Sliding Window | súvislé kúsky poľa / textu | O(n) |
| lineárne hľadanie | nezotriedené pole | O(n) |
| binárne hľadanie | **zotriedené** pole | O(log n) |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
