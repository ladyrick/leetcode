---
title: 7. Reverse Integer
category: Easy
order: 10007
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
需要注意的是，在每一步都判断是否越界，最简单的方法就是乘以10之后再除以10，看看跟之前相等不相等。然后再加上尾数。
这个方法还是看别人的解答得出的。
想起了在头条面试也遇到过类似的实时判断越界，当时我是判断每一步操作是否改变结果的符号，其实是错误的方法。
因为他乘以10之后不会只越界一位，而是会越界好几位。不保证符号位会变号。

**更新：后来发现，乘以10再除以10的方法，只适用于int类型。**
因为，`int`类型最大的正数为`2^31-1 = 2147483647`；最小的负数为`-2^31 = -2147483648`。
这两个数有个特点，就是最后一位比第一位大。
假如存在某个数字，不妨假设它是正数。在反转过程中，最后一次乘以10，加上尾数的操作是：
```
num = __num__ * 10 + __tail__;
```
其中，`__num__ * 10`没有导致越界，但是加上尾数却导致越界。
这说明，在乘以10之前，`__num__`最大不超过`214748364`。
但是加上尾数后越界了，说明`__num__`只能等于`214748364`，且`__tail__ > 7`。
然而，正如我们之前看到的，如果`__tail__ > 7`的话，那么反转前的数字本身就已经越界了。

负数的话分析过程一样。

因此，**乘以10之后再除以10**的方法，对`int`类型来说是没有问题的。

但是，这个方法对于`long long`类型不再适用。
因为`long long`类型最大的正数为`2^63-1 = 9223372036854775807`；最小的负数为`-2^63 = -9223372036854775808`。
不满足最后一位比第一位大。
因此我可以很轻易地构造出反例：`8085774586302733229`。
这个数字本身不越界，而且最后一次乘以10，也不越界。但是加上尾数8，导致越界。

**更新：这个问题可以通过以下方法解决，多计算一次加法。**
```
if ((num * 10 + tail) / 10 != num)
// 越界
```

**更新：找到一个更好的判断溢出的方法，参考{% post_link 8-string-to-integer-atoi 问题8 %}**