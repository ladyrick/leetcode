---
title: 2. Add Two Numbers
category: Medium
order: 2
date: 2018-06-15 02:37:32
tags:
- Linked List
- Math
---

<!-- 记得完善 tags 和 category 字段 -->

# Description

**LINK:** https://leetcode.com/problems/add-two-numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```
----------
# Solution
```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */

static int _ = [](){
    std::ios::sync_with_stdio(false);
    cin.tie();
    return 0;
}();

class Solution {
private:
    ListNode * head = new ListNode(0);
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        auto result = head;
        int val, car=0;
        while (l1||l2){
            val = (l1?l1->val:0) + (l2?l2->val:0) + car;
            result->next = new ListNode(val % 10);
            car = val / 10;
            result = result->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        if (car != 0){
            result->next = new ListNode(car);
        }
        return head->next;
    }
};
```
----------
# Discussion

使用一个head节点，避免在循环内部每次都判断是不是首次创建节点，这样比较快。