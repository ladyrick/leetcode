---
title: 8. String to Integer (atoi)
category: Medium
order: 8
date: 2018-06-22 10:08:34
tags:
- Math
- String
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/string-to-integer-atoi

Implement `atoi` which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

Note:

Only the space character `' '` is considered as whitespace character.
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.
Example 1:
```
Input: "42"
Output: 42
```
Example 2:
```
Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
```
Example 3:
```
Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
```
Example 4:
```
Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed.
```
Example 5:
```
Input: "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
             Thefore INT_MIN (−231) is returned.
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
    int myAtoi(string str) {
        if (str.empty()) return 0;
        bool flag = true;
        bool prefix = true;
        int result = 0;
        for (char c : str) {
            if ('0' <= c && c <= '9'){
                prefix = false;
                int dig = c - '0';
                if (result > 214748364 || result == 214748364 && dig > 7)
                    return flag?INT_MAX:INT_MIN;
                result *= 10;
                result += dig;
            } else if (prefix){
                if (c == ' '){
                    continue;
                } else if (c == '+' || c == '-') {
                    flag = c == '+';
                    prefix = false;
                } else {
                    return 0;
                }
            } else {
                return flag?result:-result;
            }
        }
        return flag?result:-result;
    }
};
```
----------
# Discussion
学到一个更好的判断溢出的方法，不需要乘10除以10。
以`int`类型为例。
不论正数还是负数，只要绝对值大于`2147483647`，就看作是溢出。
对于负数，只有当输入刚好为`-2147483648`时，会产生误判。
但是根据规则，负数溢出的话，要求输出为`INT_MIN`，于是此时溢出或者不溢出，输出结果一样。
因此可以统一处理。

**PS：**此方法仅适用于当溢出时输出`INT_MAX`或`INT_MIN`的情况。
如果有其他要求，还是乖乖判断溢出吧，用乘10除以10的方法。