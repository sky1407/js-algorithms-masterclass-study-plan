# s29 – Dynamické programovanie (Udemy sekcia 29)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Potrebuješ **rekurziu** (s07-09) – hlavne Fibonacciho čísla.

---

## 1. Čo je dynamické programovanie (DP)

**DP = rozlož veľký problém na menšie, každý menší vyrieš len RAZ a výsledok si zapíš.**

Predstav si, že ťa niekto spýta: „Koľko je 1 + 1 + 1 + 1 + 1?“ Spočítaš: 5.
Potom pridá ešte „+ 1“. Nezačneš počítať odznova – vieš, že predtým to bolo 5, takže je to **6**.
Pamätáš si medzivýsledok. To je celé DP.

DP sa dá použiť, keď problém má dve vlastnosti:

1. **Prekrývajúce sa podproblémy (overlapping subproblems)** – tie isté menšie úlohy sa počítajú
   znova a znova.
2. **Optimálna podštruktúra (optimal substructure)** – najlepšie riešenie celku sa dá poskladať
   z najlepších riešení častí.

⚠ Napríklad **merge sort** delí problém na časti, ale tie sa **neprekrývajú** (každá polovica je iná),
takže DP tam nepomôže.

## 2. Problém: naivný Fibonacci

```js
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
```

Strom volaní pre `fib(5)`:

```
                fib(5)
              /        \
         fib(4)          fib(3)      ← fib(3) sa počíta 2×
        /     \          /    \
    fib(3)   fib(2)  fib(2)  fib(1)
    /   \
fib(2) fib(1)
```

Tie isté hodnoty sa počítajú opakovane. Počet volaní rastie ako **O(2ⁿ)**:
`fib(10)` = 109 volaní, `fib(50)` by trval **minúty**.

## 3. Memoizácia (top-down) – pamätaj si výsledky

**Memo** = poznámkový blok. Pred výpočtom sa pozri, či to už nemáš zapísané.

```js
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];          // už to mám → hneď vráť
  if (n <= 2) return 1;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);   // vypočítaj a ZAPÍŠ
  return memo[n];
}
```

- `memo = {}` je **predvolená hodnota** – pri prvom volaní sa vytvorí prázdny blok,
  a ďalej ho **posielame ďalej** v rekurzii (inak by každé volanie malo svoj prázdny blok!).
- Každé `fib(k)` sa vypočíta len raz → **O(n)**. `fib(10)` = 17 volaní namiesto 109.
- Je to stále rekurzia → pri veľmi veľkom n hrozí **stack overflow**.

## 4. Tabulácia (bottom-up) – vyplň tabuľku odspodu

Namiesto rekurzie začneš od **najmenších** prípadov a cyklom ideš hore.

```js
function fibTab(n) {
  if (n <= 2) return 1;
  const table = [0, 1, 1];                 // table[i] = fib(i)
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}
```

- Žiadna rekurzia → žiadny stack overflow.
- Tiež **O(n)**.

| | Memoizácia | Tabulácia |
|---|---|---|
| smer | zhora nadol (od n k malým) | zdola nahor (od malých k n) |
| technika | rekurzia + memo | cyklus + pole |
| stack overflow | môže nastať | nenastane |

## 5. Ďalšie typické DP úlohy

### Schody (climbing stairs)

Koľkými spôsobmi vyjdeš n schodov, keď robíš kroky po **1 alebo 2**?
Na schod n si sa dostal buď zo schodu n-1, alebo n-2:
`ways(n) = ways(n - 1) + ways(n - 2)` – je to vlastne Fibonacci!

```js
function climbStairs(n) {
  const dp = [1, 1];                     // 0 schodov: 1 spôsob (nič nerob), 1 schod: 1 spôsob
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
climbStairs(4);   // 5
```

### Mince – počet spôsobov (coin change)

Koľkými spôsobmi zaplatíš sumu `amount` mincami `coins` (každú mincu môžeš použiť ľubovoľne krát)?

```js
function coinWays(coins, amount) {
  const dp = new Array(amount + 1).fill(0);   // dp[a] = počet spôsobov pre sumu a
  dp[0] = 1;                                  // sumu 0 zaplatíš jedným spôsobom: ničím
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];                  // k spôsobom pre a pridaj spôsoby pre a - coin
    }
  }
  return dp[amount];
}
coinWays([1, 2, 5], 5);   // 4  (5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1)
```

`new Array(n).fill(0)` vytvorí pole s n nulami.

### Mince – najmenej mincí

```js
function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);   // zatiaľ nevieme zaplatiť
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
minCoins([1, 2, 5], 11);   // 3  (5 + 5 + 1)
```

### Cesty v mriežke (grid paths)

Koľkými cestami prejdeš z ľavého horného rohu mriežky `r × c` do pravého dolného,
keď ideš len **doprava** alebo **dole**? Do políčka prídeš zhora alebo zľava:
`paths(r, c) = paths(r - 1, c) + paths(r, c - 1)`, a ak je mriežka len jeden riadok alebo stĺpec, cesta je 1.

```js
function gridPaths(r, c, memo = {}) {
  const key = r + ',' + c;              // kľúč musí obsahovať OBA rozmery!
  if (key in memo) return memo[key];
  if (r === 1 || c === 1) return 1;
  memo[key] = gridPaths(r - 1, c, memo) + gridPaths(r, c - 1, memo);
  return memo[key];
}
gridPaths(3, 3);   // 6
```

### Najväčší súčet súvislého úseku (Kadane)

```js
function maxSubarray(arr) {
  let cur = arr[0];
  let best = arr[0];                    // nie 0! pole môže mať len záporné čísla
  for (let i = 1; i < arr.length; i++) {
    cur = Math.max(arr[i], cur + arr[i]);   // začni odznova, alebo pokračuj?
    best = Math.max(best, cur);
  }
  return best;
}
maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);   // 6  (4 - 1 + 2 + 1)
```

## 6. Ako postupovať pri DP úlohe

1. Napíš si **naivné rekurzívne** riešenie (aký je base case a ako sa problém zmenší?).
2. Všimni si, či sa **podproblémy opakujú**.
3. Pridaj **memo** (objekt) – alebo prepíš na **tabuľku** a cyklus.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
