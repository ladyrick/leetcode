---
title: 7. Reverse Integer
category: Easy
order: 7
date: 2018-06-20 13:52:20
tags:
- Math
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/reverse-integer

Given a 32-bit signed integer, reverse digits of an integer.

Example 1:
```
Input: 123
Output: 321
```
Example 2:
```
Input: -123
Output: -321
```
Example 3:
```
Input: 120
Output: 21
```
Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.


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
    int reverse(int x) {
        int y = 0;
        int yt;
        while (x) {
            yt = y * 10 + x % 10;
            if (yt / 10 != y)
                return 0;
            y = yt;
            x = x / 10;
        }
        return y;
    }
};
```
----------
# Discussion
了解原理后非常简单。
需要注意的是，在每一步都判断是否越界，最简单的方法就是乘以10之后再除以10，看看跟原来想等不。
这个方法还是看别人的解答得出的。
想起了在头条面试也遇到过类似的实时判断越界，当时我是判断每一步操作是否改变结果的符号，其实是错误的方法。
因为他乘以10之后不会只越界一位，而是会越界好几位。不保证符号位会变号。