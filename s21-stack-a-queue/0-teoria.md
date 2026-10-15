# s21 – Stack a Queue (Udemy sekcia 21)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).
Linked-list verzie nadväzujú na **s18-19**.

---

## 1. Stack (zásobník) – LIFO

**Kôpka tanierov.** Tanier dávaš **navrch** a berieš tiež **zvrchu**.
Posledný, ktorý prišiel, ide prvý von: **LIFO = Last In, First Out**.

Kde sa používa:
- **call stack** pri volaní funkcií (pamätáš si z rekurzie),
- **Undo (Ctrl+Z)** – vráti posledný krok,
- tlačidlo **Späť** v prehliadači,
- kontrola **zátvoriek** `({[ ]})`.

### Stack pomocou poľa

Používaj **koniec** poľa – `push` a `pop` sú O(1).

```js
const stack = [];
stack.push('a');                  // ['a']
stack.push('b');                  // ['a', 'b']
stack[stack.length - 1];          // 'b'  – peek: pozri vrch bez odobratia
stack.pop();                      // 'b'  – ['a']
```

(`unshift` + `shift` by tiež bol stack, ale O(n) – nepoužívaj.)

### Stack pomocou linked listu

Colt používa názvy **first**, **last**, **size**. Vrch zásobníka je `first`
(pridávame aj odoberáme na **začiatku**, lebo to je v jednosmernom zozname O(1)).

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;   // vrch
    this.last = null;    // spodok
    this.size = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      const temp = this.first;   // odlož starý vrch
      this.first = node;         // nový je navrchu
      this.first.next = temp;    // pod ním je starý vrch
    }
    return ++this.size;          // vráti novú veľkosť
  }

  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.val;             // vraciame HODNOTU, nie uzol
  }
}
```

**`++this.size` vs `this.size++`:**
- `++x` najprv zvýši, potom vráti **novú** hodnotu.
- `x++` vráti **starú** hodnotu, potom zvýši.

## 2. Queue (front, rad) – FIFO

**Rad v obchode.** Kto prvý príde, ide prvý na rad: **FIFO = First In, First Out**.
Pridávanie na koniec radu = **enqueue**, odchod zo začiatku = **dequeue**.

Kde sa používa: tlačiareň (tlačí v poradí), rad úloh na serveri, prehľadávanie
grafu do šírky (BFS, uvidíš v s26-27).

### Queue pomocou poľa

```js
const q = [];
q.push('a');      // enqueue na koniec
q.push('b');
q.shift();        // dequeue zo začiatku → 'a'
```

⚠ `shift` je O(n) (prečísluje celé pole). Pri veľkých radoch je lepší linked list.

### Queue pomocou linked listu

Pridávame na **koniec** (`last`), odoberáme zo **začiatku** (`first`) – oboje O(1).

```js
class Queue {
  constructor() {
    this.first = null;   // začiatok radu (ide von)
    this.last = null;    // koniec radu (pridávame sem)
    this.size = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;   // za posledného sa postaví nový
      this.last = node;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}
```

## 3. Príklad: zátvorky

Je `'({[]})'` správne uzátvorkované? Otváracie zátvorky dávaj na stack.
Pri zatváracej musí byť **navrchu** zodpovedajúca otváracia.

```js
function isBalanced(str) {
  const pary = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pary) {
      if (stack.pop() !== pary[ch]) return false;   // zlá alebo chýbajúca otváracia
    }
  }
  return stack.length === 0;   // nesmie ostať nič neuzavreté
}
isBalanced('({[]})');  // true
isBalanced('(]');      // false
isBalanced('((');      // false – ostali neuzavreté
```

## 4. Zhrnutie

| | Stack | Queue |
|---|---|---|
| princíp | LIFO (kôpka tanierov) | FIFO (rad v obchode) |
| pridanie | push – O(1) | enqueue – O(1) |
| odobratie | pop – O(1) | dequeue – O(1) (linked list) |
| hľadanie / prístup | O(n) | O(n) |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš triedy a funkcie sám.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
