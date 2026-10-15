/*
 * s03 Polia a objekty – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

function lastItem(arr) {
  return arr[arr.length - 1];
}

function total(arr) {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    s = s + arr[i];
  }
  return s;
}

function countItem(arr, x) {
  let pocet = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      pocet++;
    }
  }
  return pocet;
}

function findMax(arr) {
  let best = arr[0];
  for (const x of arr) {
    if (x > best) {
      best = x;
    }
  }
  return best;
}

function getValue(obj, key) {
  return obj[key];
}

function addItem(cart, item) {
  cart.push(item);
  return cart;
}

function frequency(arr) {
  const counts = {};
  for (const x of arr) {
    counts[x] = (counts[x] || 0) + 1;
  }
  return counts;
}

function hasKey(obj, key) {
  return key in obj;
}

function reverseCopy(arr) {
  return arr.slice().reverse();
}

function sortNumbers(arr) {
  return arr.sort((a, b) => a - b);
}

function first(arr) {
  return arr[0];
}

function last(arr) {
  return arr[arr.length - 1];
}

function addToEnd(arr, x) {
  arr.push(x);
  return arr;
}

function removeFirst(arr) {
  return arr.shift();
}

function sumAll(arr) {
  let s = 0;
  for (const x of arr) {
    s = s + x;
  }
  return s;
}

function getName(person) {
  return person['name'];
}

function countKeys(obj) {
  return Object.keys(obj).length;
}

function isEmpty(arr) {
  return arr.length === 0;
}

function contains(arr, x) {
  return arr.includes(x);
}

function tally(arr) {
  const c = {};
  for (const x of arr) {
    c[x] = (c[x] || 0) + 1;
  }
  return c;
}

function count(arr) {
  return arr.length;
}

function firstAndLast(arr) {
  return [arr[0], arr[arr.length - 1]];
}

function sum(arr) {
  let s = 0;
  for (const x of arr) {
    s = s + x;
  }
  return s;
}

function countEven(arr) {
  let pocet = 0;
  for (const x of arr) {
    if (x % 2 === 0) pocet++;
  }
  return pocet;
}

function onlyPositive(arr) {
  const v = [];
  for (const x of arr) {
    if (x > 0) v.push(x);
  }
  return v;
}

function doubleAll(arr) {
  const v = [];
  for (const x of arr) {
    v.push(x * 2);
  }
  return v;
}

function makePerson(name, age) {
  return { name: name, age: age };
}

function countLetters(word) {
  const pocty = {};
  for (const p of word) {
    pocty[p] = (pocty[p] || 0) + 1;
  }
  return pocty;
}

function sumValues(obj) {
  let s = 0;
  for (const x of Object.values(obj)) {
    s = s + x;
  }
  return s;
}

function mostCommon(arr) {
  const c = {};
  for (const x of arr) {
    c[x] = (c[x] || 0) + 1;
  }
  let best = arr[0];
  for (const x of arr) {
    if (c[x] > c[best]) best = x;
  }
  return best;
}

module.exports = {
  lastItem, total, countItem, findMax, getValue, addItem, frequency, hasKey, reverseCopy, sortNumbers,
  first, last, addToEnd, removeFirst, sumAll, getName, countKeys, isEmpty, contains, tally,
  count, firstAndLast, sum, countEven, onlyPositive, doubleAll, makePerson, countLetters, sumValues, mostCommon,
};
