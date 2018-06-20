---
title: 4. Median of Two Sorted Arrays
category: Hard
order: 4
date: 2018-06-19 15:42:06
tags:
- Array
- Binary Search
- Divide and Conquer
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/median-of-two-sorted-arrays

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Example 1:
```C++
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
```

Example 2:
```C++
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
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
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);

        int n1size = nums1.size();
        int n2size = nums2.size();
        int half_len = (n1size + n2size + 1) / 2;
        int imin = 0;
        int imax = n1size;
        while (imin <= imax){
            int i = (imin + imax) / 2;
            int j = half_len - i;
            if (i < n1size && nums1[i] < nums2[j-1]){
                // i is too small;
                imin = i + 1;
            } else if (i > 0 && nums2[j] < nums1[i-1]) {
                // i is too large;
                imax = i - 1;
            } else {
                // i is perfect;
                cout << i << j << endl;
                int leftpart;
                if (i == 0) leftpart = nums2[j-1];
                else if (j == 0) leftpart = nums1[i-1];
                else leftpart = max(nums1[i-1], nums2[j-1]);
                if ((n1size+n2size)%2) return leftpart;
                else {
                    int rightpart;
                    if (i == n1size) rightpart = nums2[j];
                    else if (j == n2size) rightpart = nums1[i];
                    else rightpart = min(nums1[i], nums2[j]);
                    return (leftpart + rightpart) / 2.0;
                }
            }
        }
    }
};
```
----------
# Discussion

太神了，本以为很复杂的问题，用数学知识，直接简化到时间复杂度为O(min(m,n))，可见数学的威力有多大。
具体解析：https://leetcode.com/problems/median-of-two-sorted-arrays/solution/