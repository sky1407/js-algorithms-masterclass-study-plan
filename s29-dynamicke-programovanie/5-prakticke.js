/*
 * s29 Dynamické programovanie – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Postup: base case → vzorec → memo alebo tabuľka.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) fibMemoP – n-té Fibonacciho číslo s memoizáciou (memo posielaj ďalej v rekurzii)
//    fibMemoP(10) → 55,   fibMemoP(70) → 190392490709135
function fibMemoP(n, memo = {}) {

}

// 2) fibTabP – n-té Fibonacciho číslo tabuláciou (cyklus, bez rekurzie)
//    fibTabP(10) → 55
function fibTabP(n) {

}

// 3) climbStairsP – koľkými spôsobmi vyjdeš n schodov po 1 alebo 2
//    climbStairsP(5) → 8,   climbStairsP(0) → 1
function climbStairsP(n) {

}

// 4) climbStairs3 – koľkými spôsobmi vyjdeš n schodov po 1, 2 alebo 3
//    climbStairs3(3) → 4   (1+1+1, 1+2, 2+1, 3)
function climbStairs3(n) {

}

// 5) coinWaysP – koľkými spôsobmi zaplatíš amount mincami coins (poradie mincí sa nepočíta)
//    coinWaysP([1, 2, 5], 5) → 4
function coinWaysP(coins, amount) {

}

// 6) minCoinsP – najmenší počet mincí na sumu amount; ak sa nedá, -1
//    minCoinsP([1, 2, 5], 11) → 3
function minCoinsP(coins, amount) {

}

// 7) gridPathsP – počet ciest v mriežke r × c (len doprava a dole)
//    gridPathsP(3, 3) → 6
function gridPathsP(r, c, memo = {}) {

}

// 8) maxSubarrayP – najväčší súčet súvislého úseku poľa
//    maxSubarrayP([5, 4, -1, 7, 8]) → 23
function maxSubarrayP(arr) {

}

// 9) houseRobberP – najviac peňazí, keď nesmieš vykradnúť dva susedné domy
//    houseRobberP([2, 7, 9, 3, 1]) → 12
function houseRobberP(houses) {

}

// 10) lcsLength – dĺžka najdlhšej spoločnej podpostupnosti dvoch textov
//     lcsLength('abcde', 'ace') → 3   ('ace')
function lcsLength(a, b) {

}

module.exports = {
  fibMemoP, fibTabP, climbStairsP, climbStairs3, coinWaysP, minCoinsP, gridPathsP, maxSubarrayP, houseRobberP, lcsLength,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s29 Dynamické programovanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
