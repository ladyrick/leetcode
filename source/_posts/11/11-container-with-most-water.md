---
title: 11. Container With Most Water
category: Medium
order: 11
date: 2018-06-22 17:01:36
tags:
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/container-with-most-water

Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

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
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxvolumn = 0;
        while (left < right) {
            int lh = height[left];
            int rh = height[right];
            int curvolumn = (right - left) * min(height[left], height[right]);
            if (curvolumn > maxvolumn) maxvolumn = curvolumn;
            if (lh < rh) while (height[++left] <= lh);
            else while (height[--right] <= rh);
        }
        return maxvolumn;
    }
};
```
----------
# Discussion

思路很简单，从两头开始，不断缩小范围。
缩小的方法是，每次从较低的那一头缩小，一直缩小到第一个比它高的。然后再计算容积。