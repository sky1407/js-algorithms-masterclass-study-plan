/*
 * RIEŠENIA – 02 Frequency Counter a Multiple Pointers
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const f1 = {};
  const f2 = {};
  for (const v of arr1) f1[v] = (f1[v] || 0) + 1;
  for (const v of arr2) f2[v] = (f2[v] || 0) + 1;
  for (const key in f1) {
    if (!(key ** 2 in f2)) return false;
    if (f2[key ** 2] !== f1[key]) return false;
  }
  return true;
}
const zlozitost1 = 'O(n)';

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let count = 1;
  let last = arr[0];
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== last) {
      count++;
      last = arr[j];
    }
  }
  return count;
}

function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    if (sum > 0) right--;
    else left++;
  }
  return undefined;
}
const zlozitost3 = 'O(n)';

function validAnagram(a, b) {
  if (a.length !== b.length) return false;
  const lookup = {};
  for (const ch of a) lookup[ch] = (lookup[ch] || 0) + 1;
  for (const ch of b) {
    if (!lookup[ch]) return false;
    lookup[ch] -= 1;
  }
  return true;
}
const zlozitost4 = 'O(n)';

function areThereDuplicates(...args) {
  args.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) return true;
    start++;
    next++;
  }
  return false;
}
const zlozitost5 = 'O(n log n)';

function isSubsequence(s, t) {
  let i = 0;
  let j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) i += 1;
    j++;
  }
  return i === s.length;
}

function sameFrequency(a, b) {
  const s1 = String(a);
  const s2 = String(b);
  if (s1.length !== s2.length) return false;
  const freq = {};
  for (const d of s1) freq[d] = (freq[d] || 0) + 1;
  for (const d of s2) {
    if (!freq[d]) return false;
    freq[d]--;
  }
  return true;
}
const protipriklad7 = [112, 122];

function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) left++;
    else right--;
  }
  return false;
}
const protipriklad8 = [[2, 5], 2];

function findPair(arr, n) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) || 0) + 1);
  if (n === 0) return [...counts.values()].some((c) => c > 1);
  for (const x of arr) if (counts.has(x + n)) return true;
  return false;
}
const protipriklad9 = [[1, 2, 3], 0];

function constructNote(message, letters) {
  const available = {};
  for (const ch of letters) available[ch] = (available[ch] || 0) + 1;
  for (const ch of message) {
    if (!available[ch]) return false;
    available[ch]--;
  }
  return true;
}

function findAllDuplicates(arr) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) || 0) + 1);
  return [...counts].filter(([, c]) => c > 1).map(([x]) => x).sort((a, b) => a - b);
}

function countPairsWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let count = 0;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      count++;
      left++;
      right--;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return count;
}

function findDoubleBookings(bookings) {
  const groups = new Map();
  for (const b of bookings) {
    const key = `${b.date}|${b.room}`;
    if (!groups.has(key)) groups.set(key, { room: b.room, date: b.date, guests: [] });
    groups.get(key).guests.push(b.guest);
  }
  return [...groups.values()]
    .filter((g) => g.guests.length > 1)
    .sort((x, y) => (x.date < y.date ? -1 : x.date > y.date ? 1 : x.room - y.room));
}

function bestGiftPair(prices, budget) {
  let left = 0;
  let right = prices.length - 1;
  let best = null;
  while (left < right) {
    const sum = prices[left] + prices[right];
    if (sum > budget) {
      right--;
    } else {
      if (best === null || sum > best) best = sum;
      left++;
    }
  }
  return best;
}

module.exports = {
  same, zlozitost1, countUniqueValues, sumZero, zlozitost3,
  validAnagram, zlozitost4, areThereDuplicates, zlozitost5, isSubsequence,
  sameFrequency, protipriklad7, averagePair, protipriklad8, findPair, protipriklad9,
  constructNote, findAllDuplicates, countPairsWithSum,
  findDoubleBookings, bestGiftPair,
};
