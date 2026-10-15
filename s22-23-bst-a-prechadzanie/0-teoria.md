# s22-23 – Binary Search Tree a prechádzanie stromu (Udemy sekcie 22, 23)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Potrebuješ **triedy** (s18-19), **rekurziu** (s07-09) a **queue** (s21).

---

## 1. Strom – slovník

Predstav si **rodokmeň** otočený hore nohami alebo **priečinky v počítači**.

```
            10          ← root (koreň) – jediný uzol bez rodiča
          /    \
         6      15      ← deti uzla 10; 10 je ich parent (rodič)
        / \       \
       3   8       20   ← 3, 8, 20 sú leaf (list) – uzly bez detí
```

- **root** – koreň, úplne hore.
- **child / parent** – dieťa / rodič.
- **siblings** – súrodenci (6 a 15).
- **leaf** – list, uzol bez detí.
- **edge** – hrana, spojenie medzi rodičom a dieťaťom.
- Strom **nemá cykly** – z dieťaťa sa nedá ísť späť hore po hranách nadol.

Príklady: priečinky v počítači, HTML stránka (DOM), menu s podmenu, rozhodovací strom.

## 2. Binárny strom a Binary Search Tree (BST)

**Binárny strom:** každý uzol má **najviac 2 deti** – `left` a `right`.

**BST** má navyše pravidlo pre **každý** uzol:
- všetko **vľavo** je **menšie**,
- všetko **vpravo** je **väčšie**.

Strom vyššie je BST: vľavo od 10 sú 6, 3, 8 (menšie), vpravo 15, 20 (väčšie).

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
}
```

### insert – vlož hodnotu

Začni v koreni. Menšia hodnota → choď **doľava**, väčšia → **doprava**. Keď je tam voľno (`null`), vlož.

```js
insert(value) {
  const node = new Node(value);
  if (!this.root) {
    this.root = node;
    return this;
  }
  let current = this.root;
  while (true) {
    if (value === current.value) return undefined;    // duplikáty nevkladáme
    if (value < current.value) {
      if (current.left === null) {
        current.left = node;
        return this;
      }
      current = current.left;
    } else {
      if (current.right === null) {
        current.right = node;
        return this;
      }
      current = current.right;
    }
  }
}
```

### find / contains – nájdi hodnotu

Ako binárne vyhľadávanie: každým krokom zahodíš celú jednu stranu.

```js
find(value) {
  let current = this.root;
  while (current) {
    if (value === current.value) return current;
    if (value < current.value) current = current.left;
    else current = current.right;
  }
  return undefined;
}

contains(value) {
  return this.find(value) !== undefined;
}
```

### Rýchlosť

| | priemer (vyvážený strom) | najhorší prípad |
|---|---|---|
| insert, find | **O(log n)** | **O(n)** |

Najhorší prípad nastane, keď vkladáš **zotriedené** čísla 1, 2, 3, 4, 5:
každé ide doprava a strom vyzerá ako **zoznam** (palica).

## 3. Prechádzanie stromu (traversal)

Ako navštíviť **všetky** uzly? Dve rodiny:

### BFS – Breadth First Search (do šírky) – po poschodiach

Navštívi **celé poschodie**, potom ďalšie. Pomáha si **frontom (queue)**.

```js
bfs() {
  const visited = [];
  const queue = [];
  if (this.root) queue.push(this.root);
  while (queue.length) {
    const node = queue.shift();          // zober prvého z radu
    visited.push(node.value);
    if (node.left) queue.push(node.left);    // deti sa postavia na koniec radu
    if (node.right) queue.push(node.right);
  }
  return visited;
}
```

Pre strom hore: `[10, 6, 15, 3, 8, 20]`.

### DFS – Depth First Search (do hĺbky) – najprv dole

Ide **čo najhlbšie** po jednej vetve, až potom sa vracia. Používa **rekurziu**.
Tri varianty sa líšia len tým, **kedy** zapíšeš uzol:

```js
preOrder() {                                 // UZOL, ľavý, pravý
  const visited = [];
  function traverse(node) {
    visited.push(node.value);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  if (this.root) traverse(this.root);
  return visited;
}
// [10, 6, 3, 8, 15, 20]

postOrder() {                                // ľavý, pravý, UZOL
  ...
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    visited.push(node.value);
  ...
}
// [3, 8, 6, 20, 15, 10]

inOrder() {                                  // ľavý, UZOL, pravý
  ...
    if (node.left) traverse(node.left);
    visited.push(node.value);
    if (node.right) traverse(node.right);
  ...
}
// [3, 6, 8, 10, 15, 20]   ← v BST vyjde ZOTRIEDENÉ!
```

Pomôcka: **pre** = uzol **pred** deťmi, **post** = uzol **po** deťoch, **in** = uzol **medzi** deťmi.

| Prechádzanie | Kedy sa hodí |
|---|---|
| BFS | po úrovniach, najkratšia cesta; pri širokom strome zaberie veľa pamäte (queue) |
| PreOrder | kopírovanie / uloženie stromu (koreň ide prvý) |
| PostOrder | mazanie stromu (najprv deti, potom rodič) |
| InOrder | v BST dá hodnoty **zotriedené** |

### Výška stromu

Počet poschodí. Rekurzívne: prázdny strom má 0, inak 1 + výška vyššieho podstromu.

```js
function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}
```

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá metóda má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš metódy sám.

Testy si strom pripravia samy (okrem testu insert), takže poradie úloh je jedno.
Vo väčšine testov sa používa strom z teórie: 10, 6, 15, 3, 8, 20.
Vzorové riešenia sú v `riesenie.js`.
