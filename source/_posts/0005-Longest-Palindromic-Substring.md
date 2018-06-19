---
title: 5. Longest Palindromic Substring
category: Medium
order: 5
date: 2018-06-19 23:26:15
tags:
- String
- Dynamic Programming
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/longest-palindromic-substring

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:
```
Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```
Example 2:
```
Input: "cbbd"
Output: "bb"
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
    string longestPalindrome(string s) {
        if (s.size() <= 1) return s;
        string t(2*s.size()+3, '^');
        int len = 1;
        for (int i = 0; i < s.size(); i++){
            t[len++] = '#';
            t[len++] = s[i];
        }
        t[len++] = '#';
        t[len++] = '$';
        int *p = new int[len];
        p[0] = 0;
        int c = 0, l = 0, r = 0;
        for (int i = 1; i < len; i++){
            if (i > r){
                c = i;
                l = i;
                r = i;
                while (t[l - 1] == t[r + 1]){
                    l--;
                    r++;
                }
                p[i] = r - c;
            } else if(p[2 * c - i] < r - i){
                p[i] = p[2*c-i];
            } else {
                c = i;
                l = 2*c - r;
                while (t[l - 1] == t[r + 1]){
                    l--;
                    r++;
                }
                p[i] = r - c;
            }
        }
        int max = 0;
        for (int i = 0; i < len; i++){
            if (p[i] > p[max]) max = i;
        }
        delete p;
        return s.substr((max-p[max]) / 2, p[max]);
    }
};
```
----------
# Discussion

神奇的马拉车算法(Manacher’s Algorithm)，找回文子串只需要O(n)的时间复杂度。
算法介绍：https://articles.leetcode.com/longest-palindromic-substring-part-ii/
基本思路是，把字符串扩展，两两之间插入一个特殊字符，例如'#'。
接着用一个数组P来记录以每个点为中心的回文串最长的长度。
这样的好处是，不管回文串长度是奇数还是偶数，都可以很自然地包含在内。
而且，假设中心为i，从i-d到i+d为最长的回文串，那么d刚好就是原字符串中该位置的回文子串长度。

得到数组P的算法流程：
```
init L = 0, R = 0, C = 0;

if i > R,
    then expand L and R, update C = i

else if P[ i’ ] < R – i,
    then P[ i ] ← P[ i’ ]
else
    P[ i ] >= P[ i’ ]. (Which we have to expand past the right edge (R) to find P[ i ].
    update C = i
```

另外，string的初始化，可以用
```C++
string t(10,'^');
```
表示初始化为10个`'^'`。