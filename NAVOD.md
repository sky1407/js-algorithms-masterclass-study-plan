# JS Algorithms & Data Structures Masterclass – cvičenia pre začiatočníkov

Precvičovanie ku kurzu Colta Steela na Udemy. 16 tém, v každej 50 úloh (spolu 800),
všetko s automatickými testami a nápovedami. Netreba nič inštalovať, stačí Node.js.

## Ako na to

V každej téme postupuj v tomto poradí:

| Súbor | Čo robíš | Počet |
|---|---|---|
| `0-teoria.md` | Vysvetlenie ako pre začiatočníka – prečítaj si ho celé | – |
| `1-teoria.js` | Kvíz z teórie v termináli (odpovedáš písmenom) | 10 |
| `2-debug.js` | Každá funkcia má **jednu** chybu – nájdi a oprav ju | 10 |
| `3-doplnenie.js` | Nahraď `___` správnou vecou | 10 |
| `4-co-vypise.js` | Kvíz „čo vypíše tento kód?“ | 10 |
| `5-prakticke.js` | Napíš funkcie sám, od najľahšej po ťažšiu | 10 |
| `riesenie.js` | Vzorové riešenia – pozri sa až po vlastnom pokuse | – |
| `pokrocile/` | Pôvodné ťažšie úlohy na neskôr | – |

## Príkazy

```bash
cd ~/algoritmy/masterclass/s03-polia-a-objekty

node 1-teoria.js                 # kvíz (n = nápoveda, q = koniec)
node 1-teoria.js --chyby         # zopakuj len otázky, ktoré ešte nemáš správne

node 2-debug.js                  # všetky úlohy
node 2-debug.js 3                # len úloha 3
node 2-debug.js 3 --napoveda 2   # 2. nápoveda k úlohe 3 (sú tri, tretia je skoro riešenie)

cd ~/algoritmy/masterclass
node lib/over.js                 # prehľad pokroku vo všetkých témach
```

Pri prvej chybnej úlohe sa nápoveda 1 ukáže automaticky.
Odpovede v kvízoch sa ukladajú do `.pokrok.json` v priečinku témy a prehľad pokroku ich započíta.
Poradie možností v kvíze sa pri každom spustení zamieša.

## Témy

| Priečinok | Sekcie kurzu na Udemy |
|---|---|
| `s03-polia-a-objekty` | 3 – Analyzing Performance of Arrays and Objects |
| `s04-06-frequency-counter-a-pointers` | 4, 5, 6 – Problem Solving Approach, Frequency Counter, Multiple Pointers |
| `s05-06-sliding-window-a-divide-conquer` | 5, 6 – Sliding Window, Divide and Conquer |
| `s07-09-rekurzia` | 7, 8, 9 – Recursion + problem sety |
| `s10-vyhladavanie` | 10 – Linear, Binary, Naive String Search |
| `s11-14-zakladne-triedenia` | 11–14 – Bubble, Selection, Insertion Sort |
| `s15-17-merge-quick-radix` | 15–17 – Merge, Quick, Radix Sort |
| `s18-19-singly-linked-list` | 18, 19 – Classes, Singly Linked Lists |
| `s20-doubly-linked-list` | 20 – Doubly Linked Lists |
| `s21-stack-a-queue` | 21 – Stacks + Queues |
| `s22-23-bst-a-prechadzanie` | 22, 23 – Binary Search Trees, Tree Traversal |
| `s24-binary-heap` | 24 – Binary Heaps, Priority Queue |
| `s25-hash-table` | 25 – Hash Tables |
| `s26-27-grafy` | 26, 27 – Graphs, Graph Traversal |
| `s28-dijkstra` | 28 – Dijkstra's Algorithm |
| `s29-dynamicke-programovanie` | 29 – Dynamic Programming |

Big O (sekcia 2) je zvlášť v `../big-o-cvicenia`.

## Kontrola úloh

```bash
node lib/over.js --riesenia
```

Overí, že všetky vzorové riešenia prejdú testami, že každé neupravené zadanie zlyhá
a že správna odpoveď v kvíze „čo vypíše“ naozaj zodpovedá výstupu kódu.

## Tipy

- Debugger vo VS Code: klikni vľavo od čísla riadku (breakpoint) a stlač F5 → Node.js.
  Vľavo vo Variables uvidíš hodnoty premenných, v Call Stack rekurziu.
- Kúsky kódu z teórie si skúšaj v pomocnom súbore: `node skuska.js`.
- Vizualizácie: <https://visualgo.net>
