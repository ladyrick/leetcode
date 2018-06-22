---
title: 10. Regular Expression Matching
category: Hard
order: 10010
date: 2018-06-22 15:12:05
tags:
- String
- Dynamic Programming
- Backtracking
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/regular-expression-matching

Given an input string (`s`) and a pattern (`p`), implement regular expression matching with support for `'.'` and `'*'`.

```
'.' Matches any single character.
'*' Matches zero or more of the preceding element.
```
The matching should cover the entire input string (not partial).

Note:

`s` could be empty and contains only lowercase letters `a-z`.
`p` could be empty and contains only lowercase letters `a-z`, and characters like `.` or `*`.
Example 1:
```
Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```
Example 2:
```
Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```
Example 3:
```
Input:
s = "ab"
p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```
Example 4:
```
Input:
s = "aab"
p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
```
Example 5:
```
Input:
s = "mississippi"
p = "mis*is*p*."
Output: false
```

----------
# Solution
```c++
static auto _ = []()
{
    ios::sync_with_stdio(false);
    cin.tie();
    return 0;
}();

class Solution {
public:
    bool isMatch(string s, string p) {
        int slen = s.size();
        int plen = p.size();
        bool *dict = new bool[(slen + 1) * (plen + 1)]{false};
        int plenp1 = plen + 1;
        #define dict(i,j) (dict[(i) * plenp1 + (j)])
        dict(slen, plen) = true;
        for (int i = slen; i >= 0; i--){
            for (int j = plen - 1; j >= 0; j--){
                bool first_match = i < slen && (s[i] == p[j] || p[j] == '.');
                if (j < plen - 1 && p[j + 1] == '*'){
                    dict(i, j) = dict(i, j + 2) ||
                        (first_match && dict(i + 1, j));
                } else {
                    dict(i, j) = first_match && dict(i + 1,j + 1);
                }
            }
        }
        bool result = dict[0];
        delete dict;
        return result;
    }
};
```
----------
# Discussion

使用动态规划的方法，用`dict(i,j)`表示`text[i::]`跟`pattern[j::]`是否匹配，然后建立一个数组，用来遍历`i`和`j`。遍历完成后，输出`dict(0,0)`即可。

需要注意的是，生成的数组需要在`i`和`j`方向各扩展一个维度，用来表示空串。
其中，当`pattern[j::]`为空串时，`dict(i,j) = false`；
其中，当`text[i::]`为空串时，`dict(i,j)`的值需要计算。

数组中每一位的计算方法是：
- 判断`pattern[j::]`的第二个字符是不是`'*'`。如果是的话
 - 判断`text[i::]`跟`pattern[j+2::]`是否匹配，也就是说略过两个字符，认为他们匹配到了空串。
 - 如果上一条判断失败，再判断`text[i]`跟`pattern[j]`是否匹配，以及`text[i+1::]`跟`pattern[j::]`是否匹配。
- 如果不是的话，判断`text[i]`跟`pattern[j]`是否匹配，以及`text[i+1::]`跟`pattern[j::]`是否匹配。

需要注意一下`new`的初始化，从c++11开始，可以使用`int* p = new int[cnt]();`和`int* p = new int[cnt]{};`两种方式初始化，而且可以用`int* a = new int[10] { 1,2,3,4,5,6,7,8,9,10 };`这个方式给每个成员赋值。
在这道题中，最后一次wrong answer就是因为没有初始化数组。