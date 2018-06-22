---
title: 9. Palindrome Number
category: Easy
order: 10009
date: 2018-06-22 13:00:15
tags:
- Math
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/palindrome-number

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:
```
Input: 121
Output: true
```
Example 2:
```
Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```
Example 3:
```
Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

Follow up:

Coud you solve it without converting the integer to a string?


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
    bool isPalindrome(int x) {
        if (x == 0) return true;
        if (x < 0 || x % 10 == 0) return false;
        int r = 0;
        while (x > r){
            r = r * 10 + x % 10;
            x = x / 10;
        }
        return r == x || r / 10 == x;
    }
};
```
----------
# Discussion
一般方法是，把整数反过来，然后比较一下。而且，无需判断越界，因为既然输入没有越界，那么如果输出越界，则肯定不是回文数。

改进的方法是，只反转一半，然后跟剩下的一半进行比较。这样可以节省一半运算量。不过并不本质，因为最多也就进行10次运算吧。。。