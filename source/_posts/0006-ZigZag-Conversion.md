---
title: 6. ZigZag Conversion
category: Medium
order: 6
date: 2018-06-20 13:19:38
tags:
- String
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/zigzag-conversion

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```
And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:
```
string convert(string s, int numRows);
```
Example 1:
```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```
Example 2:
```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

----------
# Solution
```c++
static auto _ = []()
{
    ios::sync_with_stdio(false);
    cin.tie();
    return nullptr;
}();

class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;
        int len = s.size();
        string rs(len, '#');
        int it = 0;
        int period = 2*numRows - 2;
        
        
        for (int i = 0; i < numRows; i++) {
            int skip = 2 * i;
            for (int j = i; j < len;){
                rs[it++] = s[j];
                if (skip != period)
                    skip = period - skip;
                j += skip;
            }
        }
        return rs;
    }
};
```
----------
# Discussion

非常简单的一道题