---
title: 13. Roman to Integer
category: Easy
order: 10013
date: 2018-06-22 22:41:15
tags:
- Math
- String
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/roman-to-integer

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

Example 1:
```
Input: "III"
Output: 3
```
Example 2:
```
Input: "IV"
Output: 4
```Example 3:
```
Input: "IX"
Output: 9
```Example 4:
```
Input: "LVIII"
Output: 58
Explanation: C = 100, L = 50, XXX = 30 and III = 3.
```Example 5:
```
Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

----------
# Solution
```c++
static int _ = []() {
    ios::sync_with_stdio(false);
    cin.tie();
    return 0;
}();

class Solution {
public:
    int romanToInt(string s) {
        int map[128] = {0};
        map['I'] = 1;
        map['V'] = 5;
        map['X'] = 10;
        map['L'] = 50;
        map['C'] = 100;
        map['D'] = 500;
        map['M'] = 1000;
        int t = 0;
        int result = 0;
        for (int i = s.size() - 1; i >= 0; i--){
            int c = map[s[i]];
            if (c >= t) result += c;
            else result -= c;
            t = c;
        }
        return result;
    }
};
```
----------
# Discussion

从右到左累加，每次判断比前一个（右一个）大还是小。大于等于的话就加，小于的话就减。