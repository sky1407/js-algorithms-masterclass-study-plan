/*
 * RIEŠENIA – 05 Vyhľadávanie
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}
const zlozitost1 = 'O(n)';

function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
const zlozitost2 = 'O(log n)';

function naiveCount(long, short) {
  if (short.length === 0) return 0;
  let count = 0;
  for (let i = 0; i <= long.length - short.length; i++) {
    let j = 0;
    while (j < short.length && long[i + j] === short[j]) j++;
    if (j === short.length) count++;
  }
  return count;
}

function binarySearchRec(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === val) return mid;
  if (arr[mid] < val) return binarySearchRec(arr, val, mid + 1, right);
  return binarySearchRec(arr, val, left, mid - 1);
}

function naiveIndexOf(long, short) {
  for (let i = 0; i <= long.length - short.length; i++) {
    let j = 0;
    while (j < short.length && long[i + j] === short[j]) j++;
    if (j === short.length) return i;
  }
  return -1;
}

function searchMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = rows ? matrix[0].length : 0;
  let left = 0;
  let right = rows * cols - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = matrix[Math.floor(mid / cols)][mid % cols];
    if (value === target) return true;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
const zlozitost6 = 'O(log n)';

function lastIndexOf(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) {
      result = mid;
      left = mid + 1;
    } else if (arr[mid] < val) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
const protipriklad7 = [[1, 2, 2, 2, 3], 2];

function containsValue(arr, val) {
  const sorted = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid] === val) return true;
    if (sorted[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
const protipriklad8 = [[1, 2, 10], 2];

function findClosest(arr, target) {
  if (arr.length === 0) return null;
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  if (left > 0 && target - arr[left - 1] <= arr[left] - target) return arr[left - 1];
  return arr[left];
}
const protipriklad9 = [[1, 5, 10], 6];

function searchRange(arr, target) {
  const bound = (first) => {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        result = mid;
        if (first) right = mid - 1;
        else left = mid + 1;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  };
  return [bound(true), bound(false)];
}

function findPeak(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}

function minEatingSpeed(piles, hours) {
  let left = 1;
  let right = Math.max(...piles);
  while (left < right) {
    const speed = Math.floor((left + right) / 2);
    let needed = 0;
    for (const p of piles) needed += Math.ceil(p / speed);
    if (needed <= hours) right = speed;
    else left = speed + 1;
  }
  return left;
}

function highlight(text, query) {
  if (query === '') return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let result = '';
  let i = 0;
  while (i < text.length) {
    let j = 0;
    while (j < lowerQuery.length && lowerText[i + j] === lowerQuery[j]) j++;
    if (j === lowerQuery.length) {
      result += `<mark>${text.slice(i, i + j)}</mark>`;
      i += j;
    } else {
      result += text[i];
      i++;
    }
  }
  return result;
}

function valueAt(history, time) {
  let left = 0;
  let right = history.length - 1;
  let result = null;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (history[mid].time <= time) {
      result = history[mid].value;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

module.exports = {
  linearSearch, zlozitost1, binarySearch, zlozitost2, naiveCount,
  binarySearchRec, naiveIndexOf, searchMatrix, zlozitost6,
  lastIndexOf, protipriklad7, containsValue, protipriklad8, findClosest, protipriklad9,
  searchRange, findPeak, minEatingSpeed,
  highlight, valueAt,
};
