class Solution {
public:

    /*1. Two Sum (Easy)
	Given an array of integers nums and an integer target, return indices of 
	the two numbers such that they add up to target. You may assume that each 
	input would have exactly one solution, and you may not use the same element 
	twice. You can return the answer in any order.

	Example 1:
	Input: nums = [2,7,11,15], target = 9
	Output: [0,1]
	Output: Because nums[0] + nums[1] == 9, we return [0, 1].

	Example 2:
	Input: nums = [3,2,4], target = 6
	Output: [1,2]

	Example 3:
	Input: nums = [3,3], target = 6
	Output: [0,1]

	Constraints:
	* 2 <= nums.length <= 103
	* -109 <= nums[i] <= 109
	* -109 <= target <= 109
	* Only one valid answer exists.*/

    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp; // value to index mapping
        for (int i = 0; i < nums.size(); ++i) {
            int x = target - nums[i]; 
            if (mp.find(x) != mp.end())
                return {mp[x], i};
            mp[nums[i]] = i; 
        }
        return {}; 
    }


	/*7. Reverse Integer (Easy)
	Given a 32-bit signed integer, reverse digits of an integer. Note that 
	assume we are dealing with an environment that could only store integers 
	within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose 
	of this problem, assume that your function returns 0 when the reversed 
	integer overflows.

	Example 1:
	Input: x = 123
	Output: 321

	Example 2:
	Input: x = -123
	Output: -321

	Example 3:
	Input: x = 120
	Output: 21

	Example 4:
	Input: x = 0
	Output: 0

	Constraints: -2^31 <= x <= 2^31 - 1*/

    int reverse(int x) {
        int ans = 0; 
        while (x) { 
            if ((ans > INT_MAX/10) or (ans == INT_MAX/10 and x > INT_MAX%10)) return 0;
            if ((ans < INT_MIN/10) or (ans == INT_MIN/10 and x < INT_MIN%10)) return 0;
            ans = 10*ans + x%10; 
            x /= 10; 
        }
        return ans; 
    }


    /*9. Palindrome Number (Easy)
	Determine whether an integer is a palindrome. An integer is a palindrome 
	when it reads the same backward as forward. 
	Follow up: Could you solve it without converting the integer to a string?

	Example 1:
	Input: x = 121
	Output: true

	Example 2:
	Input: x = -121
	Output: false
	Explanation: From left to right, it reads -121. From right to left, it 
	             becomes 121-. Therefore it is not a palindrome.

	Example 3:
	Input: x = 10
	Output: false
	Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
	
	Example 4:
	Input: x = -101
	Output: false

	Constraints: -2^31 <= x <= 2^31 - 1*/

    bool isPalindrome(int x) {
        if (x < 0) return false; // edge case 
        
        long val = x, rev = 0;
        while (x) {
            rev = 10*rev + x%10; 
            x /= 10; 
        }
        return val == rev; 
    }


    /*13. Roman to Integer (Easy)
	Roman numerals are represented by seven different symbols: I, V, X, L, C, D 
	and M.
	Symbol       Value
	I             1
	V             5
	X             10
	L             50
	C             100
	D             500
	M             1000
	For example, 2 is written as II in Roman numeral, just two one's added 
	together. 12 is written as XII, which is simply X + II. The number 27 is 
	written as XXVII, which is XX + V + II. Roman numerals are usually written 
	largest to smallest from left to right. However, the numeral for four is 
	not IIII. Instead, the number four is written as IV. Because the one is 
	before the five we subtract it making four. The same principle applies to 
	the number nine, which is written as IX. There are six instances where 
	subtraction is used:
	* I can be placed before V (5) and X (10) to make 4 and 9. 
	* X can be placed before L (50) and C (100) to make 40 and 90. 
	* C can be placed before D (500) and M (1000) to make 400 and 900.
	Given a roman numeral, convert it to an integer.

	Example 1:
	Input: s = "III"
	Output: 3

	Example 2:
	Input: s = "IV"
	Output: 4

	Example 3:
	Input: s = "IX"
	Output: 9

	Example 4:
	Input: s = "LVIII"
	Output: 58
	Explanation: L = 50, V= 5, III = 3.

	Example 5:
	Input: s = "MCMXCIV"
	Output: 1994
	Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
	 
	Constraints:
	* 1 <= s.length <= 15
	* s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
	* It is guaranteed that s is a valid roman numeral in the range [1, 3999].*/

    int romanToInt(string s) {
        unordered_map<char, int> mp = {
            {'I', 1}, 
            {'V', 5}, 
            {'X', 10}, 
            {'L', 50}, 
            {'C', 100}, 
            {'D', 500}, 
            {'M', 1000}}; 
        int ans = 0; 
        for (int i = 0; i < s.size(); ++i) {
            if (i+1 < s.size() and mp[s[i]] < mp[s[i+1]]) 
                ans -= mp[s[i]];
            else 
                ans += mp[s[i]]; 
        }
        return ans; 
    }


    /*20. Valid Parentheses (Easy)
	Given a string s containing just the characters '(', ')', '{', '}', '[' and 
	']', determine if the input string is valid. An input string is valid if:
	* Open brackets must be closed by the same type of brackets.
	* Open brackets must be closed in the correct order.
	 
	Example 1:
	Input: s = "()"
	Output: true

	Example 2:
	Input: s = "()[]{}"
	Output: true

	Example 3:
	Input: s = "(]"
	Output: false

	Example 4:
	Input: s = "([)]"
	Output: false

	Example 5:
	Input: s = "{[]}"
	Output: true

	Constraints:
	* 1 <= s.length <= 104
	* s consists of parentheses only '()[]{}'.*/

    bool isValid(string s) {
        stack<char> stk; 
        for (auto& c : s) {
            switch(c) {
                case '(': stk.push(')'); break; 
                case '[': stk.push(']'); break; 
                case '{': stk.push('}'); break; 
                default: 
                    if (stk.empty() or stk.top() != c) return false; 
                    stk.pop(); 
            }
        }
        return stk.empty(); 
    }


    /*21. Merge Two Sorted Lists (Easy)
	Merge two sorted linked lists and return it as a new sorted list. The new 
	list should be made by splicing together the nodes of the first two lists.

	Example 1:
	Input: l1 = [1,2,4], l2 = [1,3,4]
	Output: [1,1,2,3,4,4]

	Example 2:
	Input: l1 = [], l2 = []
	Output: []

	Example 3:
	Input: l1 = [], l2 = [0]
	Output: [0]

	Constraints:
	* The number of nodes in both lists is in the range [0, 50].
	* -100 <= Node.val <= 100
	* Both l1 and l2 are sorted in non-decreasing order.

	Definition for singly-linked list.
	struct ListNode {
	    int val;
	    ListNode *next;
	    ListNode() : val(0), next(nullptr) {}
	    ListNode(int x) : val(x), next(nullptr) {}
	    ListNode(int x, ListNode *next) : val(x), next(next) {}
	};

	*/

    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); 
        ListNode* node = &dummy; 
        while (l1 and l2) {
            if (l1->val < l2->val) {
                node->next = l1; 
                l1 = l1->next; 
            } else {
                node->next = l2; 
                l2 = l2->next; 
            }
            node = node->next; 
        }
        node->next = l1 ? l1 : l2; 
        return dummy.next; 
    }


    /*26. Remove Duplicates from Sorted Array (Easy)
	Given a sorted array nums, remove the duplicates in-place such that each 
	element appears only once and returns the new length. Do not allocate extra 
	space for another array, you must do this by modifying the input array in-
	place with O(1) extra memory.

	Clarification:
	Confused why the returned value is an integer but your answer is an array? 
	Note that the input array is passed in by reference, which means a 
	modification to the input array will be known to the caller as well.

	Internally you can think of this:
	// nums is passed in by reference. (i.e., without making a copy)
	int len = removeDuplicates(nums);
	// any modification to nums in your function would be known by the caller.
	// using the length returned by your function, it prints the first len elements.
	for (int i = 0; i < len; i++) {
	    print(nums[i]);
	}
	 
	Example 1:
	Input: nums = [1,1,2]
	Output: 2, nums = [1,2]
	Explanation: Your function should return length = 2, with the first two 
	             elements of nums being 1 and 2 respectively. It doesn't matter 
	             what you leave beyond the returned length.

	Example 2:
	Input: nums = [0,0,1,1,1,2,2,3,3,4]
	Output: 5, nums = [0,1,2,3,4]
	Explanation: Your function should return length = 5, with the first five 
	             elements of nums being modified to 0, 1, 2, 3, and 4 
	             respectively. It doesn't matter what values are set beyond the 
	             returned length.
	
	Constraints:
	* 0 <= nums.length <= 3 * 104
	* -104 <= nums[i] <= 104
	* nums is sorted in ascending order.*/

    int removeDuplicates(vector<int>& nums) {
        int i = 0; 
        for (auto& x : nums) {
            if (i == 0 or nums[i-1] < x) {
                nums[i++] = x; 
            }
        }
        return i; 
    }


    /*28. Implement strStr() (Easy)
	Implement strStr(). Return the index of the first occurrence of needle in 
	haystack, or -1 if needle is not part of haystack. 

	Clarification:
	What should we return when needle is an empty string? This is a great 
	question to ask during an interview. For the purpose of this problem, we 
	will return 0 when needle is an empty string. This is consistent to C's 
	strstr() and Java's indexOf().

	Example 1:
	Input: haystack = "hello", needle = "ll"
	Output: 2

	Example 2:
	Input: haystack = "aaaaa", needle = "bba"
	Output: -1

	Example 3:
	Input: haystack = "", needle = ""
	Output: 0

	Constraints:
	* 0 <= haystack.length, needle.length <= 5 * 104
	* haystack and needle consist of only lower-case English characters.*/

    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0; // edge case 
        
        int n = (int) needle.size(); 
        vector<int> lps(n, 0); // longest prefix-suffix array 
        int k = 0; 
        for (int i = 1; i < n; ++i) {
            while (k > 0 and needle[k] != needle[i]) k = lps[k-1]; 
            if (needle[k] == needle[i]) k++; 
            lps[i] = k; 
        }
        
        int m = (int) haystack.size(); 
        k = 0; 
        for (int i = 0; i < m; ++i) {
            while (k > 0 and needle[k] != haystack[i]) k = lps[k-1]; 
            if (needle[k] == haystack[i]) k++; 
            if (k == n) return i + 1 - n;  
        }
        return -1; 
    }


	/*83. Remove Duplicates from Sorted List (Easy)
	Given the head of a sorted linked list, delete all duplicates such that 
	each element appears only once. Return the linked list sorted as well.

	Example 1:
	Input: head = [1,1,2]
	Output: [1,2]

	Example 2:
	Input: head = [1,1,2,3,3]
	Output: [1,2,3]

	Constraints:
	* The number of nodes in the list is in the range [0, 300].
	* -100 <= Node.val <= 100
	* The list is guaranteed to be sorted in ascending order.*/

    ListNode* deleteDuplicates(ListNode* head) {
        if (head != NULL) {
            ListNode* node = head; 
            while (node->next != NULL) {
                if (node->val == node->next->val) {
                    node->next = node->next->next; 
                } else {
                    node = node->next; 
                }
            }
        }
        return head; 
    }


    /*88. Merge Sorted Array (Easy)
	Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as 
	one sorted array. The number of elements initialized in nums1 and nums2 are 
	m and n respectively. You may assume that nums1 has a size equal to m + n 
	such that it has enough space to hold additional elements from nums2.

	Example 1:
	Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
	Output: [1,2,2,3,5,6]

	Example 2:
	Input: nums1 = [1], m = 1, nums2 = [], n = 0
	Output: [1]

	Constraints:
	* nums1.length == m + n
	* nums2.length == n
	* 0 <= m, n <= 200
	* 1 <= m + n <= 200
	* -109 <= nums1[i], nums2[i] <= 10^9*/

    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m-1, j = n-1; 
        for (int k = m+n-1; k >= 0; --k) {
            if (j < 0 || (i >= 0 && nums1[i] > nums2[j])) {
                nums1[k] = nums1[i--]; 
            } else {
                nums1[k] = nums2[j--]; 
            }
        }
    }


    /*100. Same Tree (Easy)
	Given the roots of two binary trees p and q, write a function to check if 
	they are the same or not. Two binary trees are considered the same if they 
	are structurally identical, and the nodes have the same value.

	Example 1:
	Input: p = [1,2,3], q = [1,2,3]
	Output: true

	Example 2:
	Input: p = [1,2], q = [1,null,2]
	Output: false

	Example 3:
	Input: p = [1,2,1], q = [1,1,2]
	Output: false

	Constraints:
	* The number of nodes in both trees is in the range [0, 100].
	* -10^4 <= Node.val <= 10^4*/

    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == NULL && q == NULL) return true; 
        if (p == NULL || q == NULL) return false; 
        return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right); 
    }

    
    /*101. Symmetric Tree (Easy)
	Given the root of a binary tree, check whether it is a mirror of itself 
	(i.e., symmetric around its center).

	Example 1:
	Input: root = [1,2,2,3,4,4,3]
	Output: true

	Example 2:
	Input: root = [1,2,2,null,3,null,3]
	Output: false

	Constraints:
	* The number of nodes in the tree is in the range [1, 1000].
	* -100 <= Node.val <= 100

	Follow up: Could you solve it both recursively and iteratively?*/

    bool isSymmetric(TreeNode* root) {
        TreeNode* p, *q; 
        
        stack<TreeNode*> stk; 
        stk.push(root->left);
        stk.push(root->right); 
        
        while (!stk.empty()) {
            p = stk.top(); // stack::pop() doesn't return
            stk.pop(); 
            q = stk.top();
            stk.pop(); 
            if (p == NULL && q == NULL) continue; 
            if (p == NULL || q == NULL || p->val != q->val) return false; 
            stk.push(p->left); 
            stk.push(q->right);
            stk.push(p->right);
            stk.push(q->left); 
        }
        return true; 
    }
};
