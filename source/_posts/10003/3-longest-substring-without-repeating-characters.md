---
title: 3. Longest Substring Without Repeating Characters
category: Medium
order: 10003
date: 2018-06-15 02:45:17
tags:
- Hash Table
- Two Pointers
- String
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/longest-substring-without-repeating-characters

Given a string, find the length of the longest substring without repeating characters.

Examples:

Given `"abcabcbb"`, the answer is `"abc"`, which the length is 3.

Given `"bbbbb"`, the answer is `"b"`, with the length of 1.

Given `"pwwkew"`, the answer is `"wke"`, with the length of 3. Note that the answer must be a substring, `"pwke"` is a subsequence and not a substring.



----------
# Solution
```c++
static int _ = [](){
    std::ios::sync_with_stdio(false);
    cin.tie();
    return 0;
}();

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int i = 0, j = 0, longest = 0;
        unordered_map<char, int> cmap;
        while (j < s.length()){
            if (cmap.find(s[j]) != cmap.end()){
                i = max(i, cmap[s[j]] + 1);
            }
            cmap[s[j]] = j;
            j++;
            longest = max(longest, j - i);
        }
        return longest;
    }
};
```
----------
# Discussion
采用hashmap记录每个字符最后出现的位置。
采用滑窗法，每次向右滑动一位，判断有没有出现过。如果出现过的话，就把滑窗的前端移动到该字符上一次出现的位置（查找hashmap）或者不滑动。
假如已知字符串中的字符都是ascii字符的话，还可以直接采用数组作为hashmap。
一般来说，涉及到子串的算法，大多采用滑窗法。