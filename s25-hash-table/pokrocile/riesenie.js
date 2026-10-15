/*
 * RIEŠENIA – 13 Hash Tables
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const value = key.charCodeAt(i) - 96;
      total = (((total * PRIME + value) % this.keyMap.length) + this.keyMap.length) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    const bucket = this.keyMap[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return this;
      }
    }
    bucket.push([key, value]);
    return this;
  }

  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return undefined;
    for (const [k, v] of bucket) if (k === key) return v;
    return undefined;
  }

  delete(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return false;
    const i = bucket.findIndex(([k]) => k === key);
    if (i === -1) return false;
    bucket.splice(i, 1);
    return true;
  }

  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const [k] of bucket) if (!result.includes(k)) result.push(k);
    }
    return result;
  }

  values() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const [, v] of bucket) if (!result.includes(v)) result.push(v);
    }
    return result;
  }
}

class ResizableHashTable extends HashTable {
  constructor(size = 4) {
    super(size);
    this.count = 0;
  }

  set(key, value) {
    const exists = this.get(key) !== undefined;
    super.set(key, value);
    if (!exists) this.count++;
    if (this.count / this.keyMap.length > 0.75) this._resize();
    return this;
  }

  _resize() {
    const old = this.keyMap;
    this.keyMap = new Array(old.length * 2);
    for (const bucket of old) {
      if (!bucket) continue;
      for (const [k, v] of bucket) super.set(k, v);
    }
  }
}

const protipriklad7 = [['set', 'A', 1], ['keys']];

function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
const protipriklad8 = [[3, 2, 4], 6];

function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
const protipriklad9 = [['ad', 'bc']];

function firstUniqueChar(s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) if (counts.get(s[i]) === 1) return i;
  return -1;
}

function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue;
    let length = 1;
    while (set.has(n + length)) length++;
    best = Math.max(best, length);
  }
  return best;
}

function subarraySum(nums, k) {
  const prefixCounts = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;
  for (const n of nums) {
    sum += n;
    count += prefixCounts.get(sum - k) || 0;
    prefixCounts.set(sum, (prefixCounts.get(sum) || 0) + 1);
  }
  return count;
}

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  allow(userId, time) {
    if (!this.requests.has(userId)) this.requests.set(userId, []);
    const times = this.requests.get(userId);
    while (times.length > 0 && times[0] <= time - this.windowMs) times.shift();
    if (times.length >= this.limit) return false;
    times.push(time);
    return true;
  }
}

function findDuplicateFiles(files) {
  const byContent = new Map();
  for (const f of files) {
    if (!byContent.has(f.content)) byContent.set(f.content, []);
    byContent.get(f.content).push(f.path);
  }
  return [...byContent.values()]
    .filter((paths) => paths.length > 1)
    .map((paths) => [...paths].sort())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

module.exports = {
  HashTable, ResizableHashTable,
  protipriklad7, twoSum, protipriklad8, groupAnagrams, protipriklad9,
  firstUniqueChar, longestConsecutive, subarraySum,
  RateLimiter, findDuplicateFiles,
};
