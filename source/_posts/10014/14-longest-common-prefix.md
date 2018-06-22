---
title: 14. Longest Common Prefix
category: Easy
order: 10014
date: 2018-06-22 22:24:50
tags:
- String
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** 

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

Example 1:
```
Input: ["flower","flow","flight"]
Output: "fl"
```
Example 2:
```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```
Note:

All given inputs are in lowercase letters `a-z`.


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
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty() || strs[0].empty()) return "";
        if (strs.size() == 1) return strs[0];
        int len = 0;
        char ch = strs[0][0];
        while (true) {
            int i;
            for (i = strs.size() - 1; i > 0 && strs[i][len] == ch; i--);
            if (i == 0) ch = strs[0][++len];
            else break;
        }
        return strs[0].substr(0, len);
    }
};
```
----------
# Discussion
