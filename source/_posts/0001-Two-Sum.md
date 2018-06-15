---
title: 1. Two Sum
category: Easy
order: 1
date: 2018-06-15 02:34:34
tags:
- Array
- Hash Table
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
----------
# Solution

```C++
static auto x = [](){
    // turn off sync
    std::ios::sync_with_stdio(false);
    // untie in/out streams
    cin.tie(nullptr);
    return 0;
}();

class Solution {
private:
    unordered_map<int, int> umap;
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int size = nums.size();
        for (int i = 0; i < size; i++){
            auto r = umap.find(target - nums[i]);
            if (r != umap.end()){
                return vector<int>{i, r->second};
            }
            umap[nums[i]] = i;
        }
    }
};
```

----------
# Discussion

前面那一段，用来解决频繁输出到stdout中很费时间的问题。

后面，用unordered_map实现快速查找，很神奇。

另外，把`unordered_map<int, int> umap;`的初始化放到函数外面，进一步提速（很trick）。