'use strict';
const spravne = require('./riesenie');

const povodne = {
  containsNearbyDuplicate(nums, k) {
    const window = new Set();
    for (let i = 0; i < nums.length; i++) {
      if (i >= k) window.delete(nums[i - k]);
      if (window.has(nums[i])) return true;
      window.add(nums[i]);
    }
    return false;
  },
  findMin(arr) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] > arr[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
    return arr[lo];
  },
  countInRange(arr, low, high) {
    const lowerBound = (x) => {
      let lo = 0;
      let hi = arr.length;
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (arr[mid] < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    };
    if (low > high) return 0;
    return lowerBound(high) - lowerBound(low);
  },
};

function pocitanePole(hodnoty) {
  let pocet = 0;
  const pole = new Proxy(hodnoty, {
    get(ciel, kluc, prijemca) {
      if (typeof kluc === 'string' && /^\d+$/.test(kluc)) pocet++;
      return Reflect.get(ciel, kluc, prijemca);
    },
  });
  return { pole, pocet: () => pocet };
}

const debug = [
  {
    id: 1,
    nazov: 'maxSubarraySum – najväčší súčet num susedných prvkov',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2), 10, 'maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)');
      rovne(m.maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4), 17, 'maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)');
      rovne(m.maxSubarraySum([4, 2, 1, 6], 1), 6, 'maxSubarraySum([4, 2, 1, 6], 1)');
      rovne(m.maxSubarraySum([-3, -1, -4, -2], 2), -4, 'maxSubarraySum([-3, -1, -4, -2], 2)');
      rovne(m.maxSubarraySum([1, 2], 2), 3, 'maxSubarraySum([1, 2], 2)');
      rovne(m.maxSubarraySum([], 4), null, 'maxSubarraySum([], 4)');
      zlozitost(m.zlozitost1, 'O(n)');
    },
  },
  {
    id: 2,
    nazov: 'countZeroes – počet núl (binárne vyhľadávanie)',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.countZeroes([1, 1, 1, 1, 0, 0]), 2, 'countZeroes([1, 1, 1, 1, 0, 0])');
      rovne(m.countZeroes([1, 0, 0, 0, 0]), 4, 'countZeroes([1, 0, 0, 0, 0])');
      rovne(m.countZeroes([0, 0, 0]), 3, 'countZeroes([0, 0, 0])');
      rovne(m.countZeroes([1, 1, 1, 1]), 0, 'countZeroes([1, 1, 1, 1])');
      rovne(m.countZeroes([1]), 0, 'countZeroes([1])');
      rovne(m.countZeroes([]), 0, 'countZeroes([])');
      zlozitost(m.zlozitost2, 'O(log n)');
    },
  },
  {
    id: 3,
    nazov: 'findLongestSubstring – najdlhší úsek bez opakovania',
    testy: (m, { rovne }) => {
      rovne(m.findLongestSubstring(''), 0, "findLongestSubstring('')");
      rovne(m.findLongestSubstring('rithmschool'), 7, "findLongestSubstring('rithmschool')");
      rovne(m.findLongestSubstring('thisisawesome'), 6, "findLongestSubstring('thisisawesome')");
      rovne(m.findLongestSubstring('bbbbbb'), 1, "findLongestSubstring('bbbbbb')");
      rovne(m.findLongestSubstring('abba'), 2, "findLongestSubstring('abba')");
      rovne(m.findLongestSubstring('longestsubstring'), 8, "findLongestSubstring('longestsubstring')");
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'minSubArrayLen – najkratší úsek so súčtom ≥ sum',
    testy: (m, { rovne }) => {
      rovne(m.minSubArrayLen([2, 3, 1, 2, 4, 3], 7), 2, 'minSubArrayLen([2, 3, 1, 2, 4, 3], 7)');
      rovne(m.minSubArrayLen([2, 1, 6, 5, 4], 9), 2, 'minSubArrayLen([2, 1, 6, 5, 4], 9)');
      rovne(m.minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52), 1, 'minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)');
      rovne(m.minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95), 0, 'minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)');
      rovne(m.minSubArrayLen([], 1), 0, 'minSubArrayLen([], 1)');
    },
  },
  {
    id: 5,
    nazov: 'sortedFrequency – počet výskytov v zoradenom poli',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2), 4, 'sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)');
      rovne(m.sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3), 1, 'sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)');
      rovne(m.sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1), 2, 'sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)');
      rovne(m.sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4), -1, 'sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)');
      rovne(m.sortedFrequency([], 4), -1, 'sortedFrequency([], 4)');
      zlozitost(m.zlozitost5, 'O(log n)');
    },
  },
  {
    id: 6,
    nazov: 'insertPosition – kam vložiť, aby pole ostalo zoradené',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.insertPosition([1, 3, 5, 6], 5), 2, 'insertPosition([1, 3, 5, 6], 5)');
      rovne(m.insertPosition([1, 3, 5, 6], 2), 1, 'insertPosition([1, 3, 5, 6], 2)');
      rovne(m.insertPosition([1, 3, 5, 6], 7), 4, 'insertPosition([1, 3, 5, 6], 7)');
      rovne(m.insertPosition([1, 3, 5, 6], 0), 0, 'insertPosition([1, 3, 5, 6], 0)');
      rovne(m.insertPosition([2, 2, 2], 2), 0, 'insertPosition([2, 2, 2], 2)');
      rovne(m.insertPosition([], 9), 0, 'insertPosition([], 9)');
      zlozitost(m.zlozitost6, 'O(log n)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'containsNearbyDuplicate – duplikát vo vzdialenosti ≤ k',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.containsNearbyDuplicate, spravne.containsNearbyDuplicate);
      rovne(m.containsNearbyDuplicate([1, 2, 3, 1], 3), true, 'containsNearbyDuplicate([1, 2, 3, 1], 3)');
      rovne(m.containsNearbyDuplicate([1, 0, 1, 1], 1), true, 'containsNearbyDuplicate([1, 0, 1, 1], 1)');
      rovne(m.containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), false, 'containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)');
      rovne(m.containsNearbyDuplicate([5, 5], 0), false, 'containsNearbyDuplicate([5, 5], 0)');
    },
  },
  {
    id: 8,
    nazov: 'findMin – minimum v otočenom zoradenom poli',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.findMin, spravne.findMin);
      rovne(m.findMin([4, 5, 6, 7, 0, 1, 2]), 0, 'findMin([4, 5, 6, 7, 0, 1, 2])');
      rovne(m.findMin([2, 3, 4, 5, 1]), 1, 'findMin([2, 3, 4, 5, 1])');
      rovne(m.findMin([1, 2, 3]), 1, 'findMin([1, 2, 3])');
      rovne(m.findMin([2, 1]), 1, 'findMin([2, 1])');
      rovne(m.findMin([5, 6, 1, 2, 3, 4]), 1, 'findMin([5, 6, 1, 2, 3, 4])');
      rovne(m.findMin([7]), 7, 'findMin([7])');
    },
  },
  {
    id: 9,
    nazov: 'countInRange – koľko hodnôt je v intervale [low, high]',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.countInRange, spravne.countInRange);
      const arr = [1, 3, 3, 5, 8, 8, 8, 10];
      rovne(m.countInRange(arr, 3, 8), 6, 'countInRange([1, 3, 3, 5, 8, 8, 8, 10], 3, 8)');
      rovne(m.countInRange(arr, 2, 7), 3, 'countInRange([1, 3, 3, 5, 8, 8, 8, 10], 2, 7)');
      rovne(m.countInRange(arr, 11, 20), 0, 'countInRange([1, 3, 3, 5, 8, 8, 8, 10], 11, 20)');
      rovne(m.countInRange(arr, 10, 10), 1, 'countInRange([1, 3, 3, 5, 8, 8, 8, 10], 10, 10)');
      rovne(m.countInRange(arr, 9, 2), 0, 'countInRange([1, 3, 3, 5, 8, 8, 8, 10], 9, 2)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'longestSubarrayWithSumAtMost – najdlhší úsek so súčtom ≤ limit',
    testy: (m, { rovne }) => {
      rovne(m.longestSubarrayWithSumAtMost([1, 2, 1, 0, 1, 1, 0], 4), 5, 'longestSubarrayWithSumAtMost([1, 2, 1, 0, 1, 1, 0], 4)');
      rovne(m.longestSubarrayWithSumAtMost([3, 1, 2, 7, 4, 2, 1, 1, 5], 8), 4, 'longestSubarrayWithSumAtMost([3, 1, 2, 7, 4, 2, 1, 1, 5], 8)');
      rovne(m.longestSubarrayWithSumAtMost([10, 20], 5), 0, 'longestSubarrayWithSumAtMost([10, 20], 5)');
      rovne(m.longestSubarrayWithSumAtMost([], 5), 0, 'longestSubarrayWithSumAtMost([], 5)');
      rovne(m.longestSubarrayWithSumAtMost([0, 0, 0], 0), 3, 'longestSubarrayWithSumAtMost([0, 0, 0], 0)');
    },
  },
  {
    id: 11,
    nazov: 'findRotatedIndex – hľadanie v otočenom poli v O(log n)',
    testy: (m, { rovne, pravda }) => {
      rovne(m.findRotatedIndex([3, 4, 1, 2], 4), 1, 'findRotatedIndex([3, 4, 1, 2], 4)');
      rovne(m.findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8), 2, 'findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)');
      rovne(m.findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3), 6, 'findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)');
      rovne(m.findRotatedIndex([37, 44, 66, 102, 10, 22], 14), -1, 'findRotatedIndex([37, 44, 66, 102, 10, 22], 14)');
      rovne(m.findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16), 5, 'findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)');
      rovne(m.findRotatedIndex([1, 2, 3], 1), 0, 'findRotatedIndex([1, 2, 3], 1)');
      rovne(m.findRotatedIndex([], 1), -1, 'findRotatedIndex([], 1)');
      const hodnoty = Array.from({ length: 4096 }, (_, i) => ((i + 1000) % 4096) * 2);
      for (const ciel of [0, 1998, 2000, 8190, 7, 4096]) {
        const { pole, pocet } = pocitanePole(hodnoty);
        rovne(m.findRotatedIndex(pole, ciel), hodnoty.indexOf(ciel), `findRotatedIndex(4096 prvkov, ${ciel})`);
        pravda(pocet() <= 150, `findRotatedIndex pozrel do poľa ${pocet()}× – to nie je O(log n)`);
      }
    },
  },
  {
    id: 12,
    nazov: 'sqrtFloor – celá časť odmocniny bez Math.sqrt',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.sqrtFloor, /Math\.sqrt|\*\*\s*0?\.5|Math\.pow/, 'nepoužívaj Math.sqrt, Math.pow ani ** 0.5 – použi binárne vyhľadávanie');
      for (const [n, r] of [[0, 0], [1, 1], [4, 2], [8, 2], [15, 3], [16, 4], [99, 9], [2147395599, 46339], [1e12, 1e6]]) {
        rovne(m.sqrtFloor(n), r, `sqrtFloor(${n})`);
      }
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'peakTraffic – špička návštevnosti servera',
    testy: (m, { rovne, pravda }) => {
      const req = [5, 8, 3, 10, 12, 4, 1, 9, 11, 2];
      rovne(m.peakTraffic(req, 3), { start: 3, total: 26 }, 'peakTraffic(req, 3)');
      rovne(m.peakTraffic(req, 1), { start: 4, total: 12 }, 'peakTraffic(req, 1)');
      rovne(m.peakTraffic(req, 10), { start: 0, total: 65 }, 'peakTraffic(req, 10)');
      rovne(m.peakTraffic([4, 1, 1, 4], 2), { start: 0, total: 5 }, 'peakTraffic([4, 1, 1, 4], 2) – pri zhode najskoršie okno');
      rovne(m.peakTraffic(req, 11), null, 'peakTraffic(req, 11)');
      rovne(m.peakTraffic([], 1), null, 'peakTraffic([], 1)');
      const den = Array.from({ length: 1440 * 30 }, (_, i) => (i * 7919) % 1000);
      const start = Date.now();
      rovne(m.peakTraffic(den, 60), spravne.peakTraffic(den, 60), 'peakTraffic(30 dní po minútach, 60)');
      pravda(Date.now() - start < 300, 'príliš pomalé – nepočítaj každé okno odznova (sliding window)');
    },
  },
  {
    id: 14,
    nazov: 'findFirstBadDeploy – git bisect',
    testy: (m, { rovne, pravda }) => {
      const deploys = Array.from({ length: 1000 }, (_, i) => `v${i + 1}`);
      for (const zly of [1, 2, 500, 999, 1000]) {
        let volania = 0;
        const isBroken = (d) => {
          volania++;
          return Number(d.slice(1)) >= zly;
        };
        rovne(m.findFirstBadDeploy(deploys, isBroken), `v${zly}`, `prvý zlý deploy v${zly}`);
        pravda(volania <= 11, `isBroken volaný ${volania}× – každý test trvá 10 minút, zvládni to do 11 volaní`);
      }
      rovne(m.findFirstBadDeploy(deploys, () => false), null, 'žiadny zlý deploy');
      rovne(m.findFirstBadDeploy([], () => true), null, 'prázdny zoznam');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
