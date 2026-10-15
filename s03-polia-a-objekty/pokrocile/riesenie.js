/*
 * RIEŠENIA – 01 Polia a objekty
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function countWords(text) {
  const counts = {};
  for (const word of text.toLowerCase().split(/\s+/)) {
    if (word === '') continue;
    counts[word] = (counts[word] || 0) + 1;
  }
  return counts;
}
const zlozitost1 = 'O(n)';

function lastN(arr, n) {
  if (n <= 0) return [];
  return arr.slice(-n);
}

function mergeSettings(defaults, user) {
  return { ...defaults, ...user };
}

function invert(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    result[obj[key]] = key;
  }
  return result;
}
const zlozitost4 = 'O(n)';

function groupBy(items, keyFn) {
  const groups = {};
  for (const item of items) {
    const k = keyFn(item);
    if (!(k in groups)) groups[k] = [];
    groups[k].push(item);
  }
  return groups;
}

function removeAt(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
const zlozitost6 = 'O(n)';

function mostFrequent(arr) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) || 0) + 1);
  let best;
  let bestCount = 0;
  for (const [x, c] of counts) {
    if (c > bestCount) {
      best = x;
      bestCount = c;
    }
  }
  return best;
}
const protipriklad7 = [[1, 1, 2]];

function unique(arr) {
  return [...new Set(arr)];
}
const protipriklad8 = [[1, '1']];

function removeValue(arr, value) {
  let write = 0;
  for (let read = 0; read < arr.length; read++) {
    if (arr[read] !== value) arr[write++] = arr[read];
  }
  arr.length = write;
  return arr;
}
const protipriklad9 = [[1, 2, 2, 3], 2];

const zlozitosti = {
  objektVlozenie: 'O(1)',
  objektPristupKlucom: 'O(1)',
  objektHladanieHodnoty: 'O(n)',
  objectKeys: 'O(n)',
  poleIndex: 'O(1)',
  polePush: 'O(1)',
  polePop: 'O(1)',
  poleUnshift: 'O(n)',
  poleShift: 'O(n)',
  poleIncludes: 'O(n)',
  poleSort: 'O(n log n)',
};

function rotateLeft(arr, k) {
  if (arr.length === 0) return [];
  const s = k % arr.length;
  return [...arr.slice(s), ...arr.slice(0, s)];
}

function diffObjects(a, b) {
  const added = Object.keys(b).filter((k) => !Object.hasOwn(a, k)).sort();
  const removed = Object.keys(a).filter((k) => !Object.hasOwn(b, k)).sort();
  const changed = Object.keys(a).filter((k) => Object.hasOwn(b, k) && a[k] !== b[k]).sort();
  return { added, removed, changed };
}

function applyOrders(stock, orders) {
  const next = { ...stock };
  const rejected = [];
  orders.forEach((order, i) => {
    if (!Object.hasOwn(next, order.sku) || next[order.sku] < order.qty) {
      rejected.push(i);
      return;
    }
    next[order.sku] -= order.qty;
  });
  return { stock: next, rejected };
}

function topSpenders(transactions, n) {
  const totals = new Map();
  for (const t of transactions) totals.set(t.customer, (totals.get(t.customer) || 0) + t.amount);
  return [...totals]
    .sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1))
    .slice(0, n)
    .map(([customer, total]) => ({ customer, total }));
}

module.exports = {
  countWords, zlozitost1, lastN, mergeSettings,
  invert, zlozitost4, groupBy, removeAt, zlozitost6,
  mostFrequent, protipriklad7, unique, protipriklad8, removeValue, protipriklad9,
  zlozitosti, rotateLeft, diffObjects,
  applyOrders, topSpenders,
};
