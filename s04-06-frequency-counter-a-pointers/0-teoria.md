# s04-06 – Ako riešiť úlohy, Frequency Counter, Multiple Pointers (Udemy sekcie 4, 5, 6)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Päť krokov, ako vyriešiť akúkoľvek úlohu (sekcia 4)

Keď dostaneš úlohu, **nezačni hneď písať kód**. Colt Steele odporúča 5 krokov:

1. **Pochop problém.** Povedz si ho vlastnými slovami. Čo je vstup? Čo má byť výstup?
2. **Konkrétne príklady.** Napíš si 2–3 príklady vstupu a výstupu. Aj zvláštne:
   prázdne pole, jeden prvok, záporné čísla. Takým zvláštnym vstupom sa hovorí **edge case** (okrajový prípad).
3. **Rozlož to na kroky.** Napíš si po slovensky, čo budeš robiť: „1. spočítam písmená, 2. porovnám…“
4. **Vyrieš to (alebo zjednoduš).** Keď nevieš celé, vyrieš najprv ľahšiu časť.
5. **Pozri sa späť a vylepši.** Dá sa to spraviť rýchlejšie? Je kód čitateľný?

## 2. Prečo je cyklus v cykle pomalý

```js
for (const a of pole1) {        // n krokov
  for (const b of pole2) {      //   × n krokov
    // ...
  }
}
```

Pri 1 000 prvkoch je to 1 000 × 1 000 = **1 000 000** krokov. To je **O(n²)**.
Dva cykly **za sebou** (nie v sebe) sú len 1 000 + 1 000 = 2 000 krokov, teda **O(n)**.

## 3. Vzor Frequency Counter (počítadlo výskytov)

**Kedy:** keď porovnávaš dve veci a zaujíma ťa, či majú **rovnaké prvky v rovnakom počte**
(anagramy, rovnaké číslice, rovnaké písmená…).

**Ako:** namiesto cyklu v cykle si výskyty spočítaš do objektu. To sú dva cykly za sebou → O(n).

### Príklad: anagram

Anagram = rovnaké písmená, iné poradie. `'listen'` a `'silent'` sú anagramy.

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;   // rôzna dĺžka → určite nie

  const pocty = {};
  for (const ch of a) {                        // 1. spočítam písmená prvého slova
    pocty[ch] = (pocty[ch] || 0) + 1;
  }
  for (const ch of b) {                        // 2. odškrtávam písmená druhého slova
    if (!pocty[ch]) return false;              //    písmeno chýba alebo už je minuté
    pocty[ch] = pocty[ch] - 1;
  }
  return true;
}
```

Predstav si to ako vrecko s kartičkami: z prvého slova kartičky **vložíš**, pri druhom ich **vyberáš**.
Keď chceš vybrať kartičku, ktorá vo vrecku nie je, slová nie sú anagramy.

### Číslice čísla

Číslo zmeníš na text cez `String(1234)` → `'1234'`. Potom ho prejdeš ako slovo: `for (const d of String(n))`.

## 4. Cyklus `while`

`while` opakuje, **kým** platí podmienka. Hodí sa, keď vopred nevieš, koľko krokov bude.

```js
let i = 0;
while (i < 3) {
  console.log(i);   // 0, 1, 2
  i++;              // nezabudni meniť premennú, inak sa cyklus nikdy neskončí!
}
```

## 5. Vzor Multiple Pointers (viac ukazovateľov)

**Pointer** (ukazovateľ) je obyčajná premenná s **indexom**, ktorá „ukazuje“ na nejaké miesto v poli.
Máme dva a posúvame ich podľa toho, čo vidíme.

### A) Z oboch koncov k sebe – `sumZero`

Úloha: v **zotriedenom** poli nájdi prvú dvojicu, ktorej súčet je 0.

```
[-4, -2, 0, 1, 2, 3]
  ↑                ↑
 left            right
```

```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {                 // kým sa nestretnú
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;                  // súčet je moc veľký → zmenši ho (doľava je menšie číslo)
    else left++;                         // súčet je moc malý → zväčši ho (doprava je väčšie číslo)
  }
  return undefined;                      // dvojica neexistuje
}
```

- Funguje to **len pre zotriedené pole**. Vďaka tomu vieme, že vľavo sú menšie a vpravo väčšie čísla.
- Podmienka je `left < right`, nie `<=`. Prvok nesmie tvoriť dvojicu sám so sebou.
- Každý krok posunie jeden pointer, takže je to **O(n)** namiesto O(n²).

Rovnako funguje **priemer dvojice** (`averagePair`): `(arr[left] + arr[right]) / 2`.
Pozor na zátvorky! `a + b / 2` je `a + (b / 2)`, lebo delenie má prednosť.

### B) Oba od začiatku – `countUniqueValues`

Úloha: koľko **rôznych** čísel je v zotriedenom poli? `[1, 1, 2, 3, 3]` → 3.

```js
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let i = 0;                             // i = posledné nájdené unikátne číslo
  for (let j = 1; j < arr.length; j++) { // j = prieskumník, ide dopredu
    if (arr[i] !== arr[j]) {             // našiel nové číslo
      i++;
      arr[i] = arr[j];                   // zapíše ho hneď za posledné unikátne
    }
  }
  return i + 1;                          // i je index, počet je o 1 viac
}
```

### C) Dve slová – `isSubsequence`

Je `'ace'` **podpostupnosť** `'abcde'`? Teda: sú písmená `a`, `c`, `e` v druhom slove
**v rovnakom poradí** (nemusia byť hneď vedľa seba)? Áno.

```js
function isSubsequence(a, b) {
  let i = 0;                       // koľko písmen z a sme už našli
  for (const ch of b) {            // prechádzam dlhšie slovo
    if (ch === a[i]) i++;          // našiel som ďalšie hľadané písmeno
  }
  return i === a.length;           // našli sme všetky?
}
```

`'aec'` v `'abcde'` **nie je** podpostupnosť – poradie nesedí.

## 6. Zhrnutie

| Vzor | Kedy | Big O |
|---|---|---|
| cyklus v cykle | naivné riešenie | O(n²) |
| Frequency Counter | porovnanie početností (anagram, rovnaké číslice) | O(n) |
| Multiple Pointers | zotriedené pole, hľadám dvojicu / unikáty, podpostupnosť | O(n) |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
