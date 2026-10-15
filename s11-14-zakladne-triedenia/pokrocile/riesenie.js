/*
 * RIEŠENIA – 06 Základné triedenia (bubble, selection, insertion)
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
const zlozitost1 = 'O(n^2)';

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (lowest !== i) [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
}
const zlozitost2 = 'O(n^2)';

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const zlozitost3 = 'O(n)';

function bubbleSortOptimized(arr, cmp = (a, b) => a - b) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (cmp(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) return arr;
  }
  return arr;
}

function insertionSortCmp(arr, cmp) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && cmp(arr[j], current) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

function sortBy(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j][key] < arr[lowest][key]) lowest = j;
    }
    [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
}

function sortByAge(people) {
  const arr = [...people];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j].age > current.age) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const protipriklad7 = [[{ name: 'Adam', age: 30 }, { name: 'Bea', age: 30 }]];

function selectionSortAny(arr) {
  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[lowest]) lowest = j;
    }
    [result[i], result[lowest]] = [result[lowest], result[i]];
  }
  return result;
}
const protipriklad8 = [['b', 'a']];

function sortDates(dates) {
  const key = (d) => {
    const [day, month, year] = d.split('.');
    return `${year}${month}${day}`;
  };
  const arr = [...dates];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && key(arr[j]) > key(current)) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const protipriklad9 = [['02.01.2026', '01.02.2026']];

function bubbleSortCmp(arr, cmp) {
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (cmp(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

function countSwaps(arr) {
  const copy = [...arr];
  let swaps = 0;
  for (let i = copy.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (copy[j] > copy[j + 1]) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
        swaps++;
      }
    }
  }
  return swaps;
}

function sortColors(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

function leaderboard(players) {
  const before = (a, b) => {
    if (a.score !== b.score) return a.score > b.score;
    if (a.time !== b.time) return a.time < b.time;
    return a.name < b.name;
  };
  const arr = [...players];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && before(current, arr[j])) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr.map((p, i) => `${i + 1}. ${p.name} (${p.score})`);
}

function sortNearlySorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

module.exports = {
  bubbleSort, zlozitost1, selectionSort, zlozitost2, insertionSort, zlozitost3,
  bubbleSortOptimized, insertionSortCmp, sortBy,
  sortByAge, protipriklad7, selectionSortAny, protipriklad8, sortDates, protipriklad9,
  bubbleSortCmp, countSwaps, sortColors,
  leaderboard, sortNearlySorted,
};
