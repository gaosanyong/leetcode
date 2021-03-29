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


    /*104. Maximum Depth of Binary Tree (Easy)
	Given the root of a binary tree, return its maximum depth. A binary tree's 
	maximum depth is the number of nodes along the longest path from the root 
	node down to the farthest leaf node.

	Example 1:
	Input: root = [3,9,20,null,null,15,7]
	Output: 3

	Example 2:
	Input: root = [1,null,2]
	Output: 2

	Example 3:
	Input: root = []
	Output: 0

	Example 4:
	Input: root = [0]
	Output: 1

	Constraints:
	* The number of nodes in the tree is in the range [0, 10^4].
	* -100 <= Node.val <= 100*/

    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0; 
        return 1 + max(maxDepth(root->left), maxDepth(root->right)); 
    }


    /*108. Convert Sorted Array to Binary Search Tree (Easy)
	Given an integer array nums where the elements are sorted in ascending 
	order, convert it to a height-balanced binary search tree. A height-
	balanced binary tree is a binary tree in which the depth of the two 
	subtrees of every node never differs by more than one.

	Example 1:
	Input: nums = [-10,-3,0,5,9]
	Output: [0,-3,9,-10,null,5]
	Explanation: [0,-10,5,null,-3,null,9] is also accepted:

	Example 2:
	Input: nums = [1,3]
	Output: [3,1]
	Explanation: [1,3] and [3,1] are both a height-balanced BSTs.

	Constraints:
	* 1 <= nums.length <= 10^4
	* -10^4 <= nums[i] <= 10^4
	* nums is sorted in a strictly increasing order.*/

	/**
	 * Definition for a binary tree node.
	 * struct TreeNode {
	 *     int val;
	 *     TreeNode *left;
	 *     TreeNode *right;
	 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
	 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
	 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
	 * };
	 */

    TreeNode* sortedArrayToBST(vector<int>& nums, int lo = 0, int hi = -1) {
        if (hi == -1) hi = nums.size(); 
        if (lo == hi) return NULL; 
        int mid = lo + (hi - lo)/2; 
        TreeNode *node = new TreeNode(nums[mid]); 
        node->left = sortedArrayToBST(nums, lo, mid); 
        node->right = sortedArrayToBST(nums, mid+1, hi); 
        return node; 
    }


    /*111. Minimum Depth of Binary Tree (Easy)
	Given a binary tree, find its minimum depth. The minimum depth is the 
	number of nodes along the shortest path from the root node down to the 
	nearest leaf node. Note that a leaf is a node with no children.

	Example 1:
	Input: root = [3,9,20,null,null,15,7]
	Output: 2

	Example 2:
	Input: root = [2,null,3,null,4,null,5,null,6]
	Output: 5

	Constraints:
	* The number of nodes in the tree is in the range [0, 10^5].
	* -1000 <= Node.val <= 1000*/

    int minDepth(TreeNode* root) {
        if (root != NULL) {
            int ans = 0; 
            queue<TreeNode*> q; 
            q.push(root); 

            while (!q.empty()) {
                ++ans; 
                for (int i = 0, n = q.size(); i < n; ++i) {
                    TreeNode* node = q.front(); 
                    q.pop(); 
                    if (node->left == NULL && node->right == NULL) return ans; 
                    if (node->left != NULL) q.push(node->left); 
                    if (node->right != NULL) q.push(node->right); 
                }
            }
        }
        return 0; 
    }


    /*234. Palindrome Linked List (Easy)
	Given the head of a singly linked list, return true if it is a palindrome.

	Example 1:
	Input: head = [1,2,2,1]
	Output: true

	Example 2:
	Input: head = [1,2]
	Output: false

	Constraints:
	* The number of nodes in the list is in the range [1, 10^5].
	* 0 <= Node.val <= 9

	Follow up: Could you do it in O(n) time and O(1) space?*/

    bool isPalindrome(ListNode* head) {
        // find mid-point
        ListNode *fast = head, *slow = head; 
        
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next; 
        }
        
        // reverse 2nd half
        ListNode *prev = NULL; 
        while (slow) {
            ListNode* temp = slow->next; 
            slow->next = prev; 
            prev = slow;
            slow = temp; 
        }
        
        // check for palindrome 
        while (head && prev) {
            if (head->val != prev->val) return false; 
            head = head->next; 
            prev = prev->next; 
        }
        return true; 
    }



    /*235. Lowest Common Ancestor of a Binary Search Tree (Easy)
	Given a binary search tree (BST), find the lowest common ancestor (LCA) of 
	two given nodes in the BST. According to the definition of LCA on Wikipedia: 
	“The lowest common ancestor is defined between two nodes p and q as the 
	lowest node in T that has both p and q as descendants (where we allow a 
	node to be a descendant of itself).”

	Example 1:
	Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
	Output: 6
	Explanation: The LCA of nodes 2 and 8 is 6.

	Example 2:
	Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
	Output: 2
	Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant 
	             of itself according to the LCA definition.

	Example 3:
	Input: root = [2,1], p = 2, q = 1
	Output: 2

	Constraints:
	* The number of nodes in the tree is in the range [2, 10^5].
	* -10^9 <= Node.val <= 10^9
	* All Node.val are unique.
	* p != q
	* p and q will exist in the BST.*/

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (p->val > q->val) {
            TreeNode* temp = p; 
            p = q; 
            q = temp; 
        }
        
        TreeNode* node = root; 
        while (node) {
            if (node->val < p->val) 
                node = node->right; 
            else if (q->val < node->val)
                node = node->left;
            else 
                break; 
        }
        return node; 
    }


    /*237. Delete Node in a Linked List (Easy)
	Write a function to delete a node in a singly-linked list. You will not be 
	given access to the head of the list, instead you will be given access to 
	the node to be deleted directly. It is guaranteed that the node to be 
	deleted is not a tail node in the list.

	Example 1:
	Input: head = [4,5,1,9], node = 5
	Output: [4,1,9]
	Explanation: You are given the second node with value 5, the linked list 
	             should become 4 -> 1 -> 9 after calling your function.

	Example 2:
	Input: head = [4,5,1,9], node = 1
	Output: [4,5,9]
	Explanation: You are given the third node with value 1, the linked list 
	             should become 4 -> 5 -> 9 after calling your function.
	
	Example 3:
	Input: head = [1,2,3,4], node = 3
	Output: [1,2,4]

	Example 4:
	Input: head = [0,1], node = 0
	Output: [1]

	Example 5:
	Input: head = [-3,5,-99], node = -3
	Output: [5,-99]

	Constraints:
	* The number of the nodes in the given list is in the range [2, 1000].
	* -1000 <= Node.val <= 1000
	* The value of each node in the list is unique.
	* The node to be deleted is in the list and is not a tail node*/

    void deleteNode(ListNode* node) {
        node->val = node->next->val;
        node->next = node->next->next; 
    }


    /*242. Valid Anagram (Easy)
	Given two strings s and t, return true if t is an anagram of s, and false 
	otherwise.

	Example 1:
	Input: s = "anagram", t = "nagaram"
	Output: true

	Example 2:
	Input: s = "rat", t = "car"
	Output: false

	Constraints:
	* 1 <= s.length, t.length <= 5 * 10^4
	* s and t consist of lowercase English letters.

	Follow up: What if the inputs contain Unicode characters? How would you 
	           adapt your solution to such a case?*/

    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false; 
        
        vector<int> freq(26, 0); 
        for (int i = 0; i < s.length(); ++i) {
            ++freq[s[i] - 'a']; 
            --freq[t[i] - 'a'];
        }
        
        for (auto x : freq) {
            if (x) return false; 
        }
        return true; 
    }


    /*257. Binary Tree Paths (Easy)
	Given the root of a binary tree, return all root-to-leaf paths in any 
	order. A leaf is a node with no children.

	Example 1:
	Input: root = [1,2,3,null,5]
	Output: ["1->2->5","1->3"]

	Example 2:
	Input: root = [1]
	Output: ["1"]

	Constraints:
	* The number of nodes in the tree is in the range [1, 100].
	* -100 <= Node.val <= 100*/

    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> ans; 
        
        stack<pair<TreeNode*, string>> stk; 
        stk.push(make_pair(root, to_string(root->val))); 
        
        while(!stk.empty()) {
            TreeNode* node = stk.top().first;
            string path = stk.top().second; 
            stk.pop(); 
            
            if (node->left == NULL && node->right == NULL)
                ans.push_back(path); 
            
            if (node->left) {
                stk.push(make_pair(node->left, path+"->"+to_string(node->left->val))); 
            }
            if (node->right) {
                stk.push(make_pair(node->right, path+"->"+to_string(node->right->val))); 
            }
        }
        return ans; 
    }


    /*258. Add Digits (Easy)
	Given an integer num, repeatedly add all its digits until the result has 
	only one digit, and return it.

	Example 1:
	Input: num = 38
	Output: 2
	Explanation: The process is
	38 --> 3 + 8 --> 11
	11 --> 1 + 1 --> 2 
	Since 2 has only one digit, return it.

	Example 2:
	Input: num = 0
	Output: 0

	Constraints: 0 <= num <= 2^31 - 1

	Follow up: Could you do it without any loop/recursion in O(1) runtime?*/

    int addDigits(int num) {
        return 1 + (num - 1) % 9; 
    }


    /*263. Ugly Number (Easy)
	Given an integer n, return true if n is an ugly number. Ugly number is a 
	positive number whose prime factors only include 2, 3, and/or 5.

	Example 1:
	Input: n = 6
	Output: true
	Explanation: 6 = 2 × 3

	Example 2:
	Input: n = 8
	Output: true
	Explanation: 8 = 2 × 2 × 2

	Example 3:
	Input: n = 14
	Output: false
	Explanation: 14 is not ugly since it includes another prime factor 7.

	Example 4:
	Input: n = 1
	Output: true
	Explanation: 1 is typically treated as an ugly number.

	Constraints: -2^31 <= n <= 2^31 - 1*/

    bool isUgly(int n) {
        if (n <= 0) return false; 
        
        while (n > 1) {
            if (n % 2 == 0) n /= 2; 
            else if (n % 3 == 0) n /= 3; 
            else if (n % 5 == 0) n /= 5; 
            else return false;
        }
        return true; 
    }


    /*268. Missing Number (Easy)
	Given an array nums containing n distinct numbers in the range [0, n], 
	return the only number in the range that is missing from the array. 

	Follow up: Could you implement a solution using only O(1) extra space 
	           complexity and O(n) runtime complexity?

	Example 1:
	Input: nums = [3,0,1]
	Output: 2
	Explanation: n = 3 since there are 3 numbers, so all numbers are in the 
	             range [0,3]. 2 is the missing number in the range since it 
	             does not appear in nums.
	
	Example 2:
	Input: nums = [0,1]
	Output: 2
	Explanation: n = 2 since there are 2 numbers, so all numbers are in the 
	             range [0,2]. 2 is the missing number in the range since it 
	             does not appear in nums.
	
	Example 3:
	Input: nums = [9,6,4,2,3,5,7,0,1]
	Output: 8
	Explanation: n = 9 since there are 9 numbers, so all numbers are in the 
	             range [0,9]. 8 is the missing number in the range since it 
	             does not appear in nums.
	
	Example 4:
	Input: nums = [0]
	Output: 1
	Explanation: n = 1 since there is 1 number, so all numbers are in the range 
	             [0,1]. 1 is the missing number in the range since it does not 
	             appear in nums.

	Constraints:
	* n == nums.length
	* 1 <= n <= 10^4
	* 0 <= nums[i] <= n
	* All the numbers of nums are unique.*/

    int missingNumber(vector<int>& nums) {
        int ans = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            ans ^= i+1; 
            ans ^= nums[i]; 
        }
        return ans; 
    }


    /*278. First Bad Version (Easy)
	You are a product manager and currently leading a team to develop a new 
	product. Unfortunately, the latest version of your product fails the 
	quality check. Since each version is developed based on the previous 
	version, all the versions after a bad version are also bad. Suppose you 
	have n versions [1, 2, ..., n] and you want to find out the first bad one, 
	which causes all the following ones to be bad. You are given an API bool 
	isBadVersion(version) which returns whether version is bad. Implement a 
	function to find the first bad version. You should minimize the number of 
	calls to the API.

	Example 1:
	Input: n = 5, bad = 4
	Output: 4
	Explanation:
	call isBadVersion(3) -> false
	call isBadVersion(5) -> true
	call isBadVersion(4) -> true
	Then 4 is the first bad version.

	Example 2:
	Input: n = 1, bad = 1
	Output: 1

	Constraints: 1 <= bad <= n <= 2^31 - 1*/

    int firstBadVersion(int n) {
        int lo = 1, hi = n; 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (isBadVersion(mid)) {
                hi = mid; 
            } else {
                lo = mid + 1; 
            }
        }
        return lo; 
    }


    /*283. Move Zeroes (Easy)
	Given an integer array nums, move all 0's to the end of it while 
	maintaining the relative order of the non-zero elements. Note that you must 
	do this in-place without making a copy of the array.

	Example 1:
	Input: nums = [0,1,0,3,12]
	Output: [1,3,12,0,0]

	Example 2:
	Input: nums = [0]
	Output: [0]

	Constraints:
	* 1 <= nums.length <= 10^4
	* -2^31 <= nums[i] <= 2^31 - 1

	Follow up: Could you minimize the total number of operations done?*/

    void moveZeroes(vector<int>& nums) {
        int ii = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != 0) {
                swap(nums[ii], nums[i]); 
                ++ii; 
            }
        }
    }


    /*290. Word Pattern (Easy)
	Given a pattern and a string s, find if s follows the same pattern. Here 
	follow means a full match, such that there is a bijection between a letter 
	in pattern and a non-empty word in s.

	Example 1:
	Input: pattern = "abba", s = "dog cat cat dog"
	Output: true

	Example 2:
	Input: pattern = "abba", s = "dog cat cat fish"
	Output: false

	Example 3:
	Input: pattern = "aaaa", s = "dog cat cat dog"
	Output: false

	Example 4:
	Input: pattern = "abba", s = "dog dog dog dog"
	Output: false

	Constraints:
	* 1 <= pattern.length <= 300
	* pattern contains only lower-case English letters.
	* 1 <= s.length <= 3000
	* s contains only lower-case English letters and spaces ' '.
	* s does not contain any leading or trailing spaces.
	* All the words in s are separated by a single space.*/

    bool wordPattern(string pattern, string s) {
        istringstream iss(s); 
        string buf; 
        vector<string> words; 
        while (iss >> buf) {
            words.push_back(buf); 
        }

        if (pattern.size() != words.size()) return false; 
        
        unordered_map<char, int> mpp; 
        unordered_map<string, int> mpw; 
        
        for (int i = 0; i < pattern.length(); ++i) {
            if (mpp[pattern[i]] != mpw[words[i]])
                return false; 
            mpp[pattern[i]] = mpw[words[i]] = i+1; 
        }
        return true; 
    }


    /*292. Nim Game (Easy)
	You are playing the following Nim Game with your friend:
	* Initially, there is a heap of stones on the table.
	* You and your friend will alternate taking turns, and you go first.
	* On each turn, the person whose turn it is will remove 1 to 3 stones from 
	  the heap.
	* The one who removes the last stone is the winner.
	Given n, the number of stones in the heap, return true if you can win the 
	game assuming both you and your friend play optimally, otherwise return 
	false.

	Example 1:
	Input: n = 4
	Output: false
	Explanation: These are the possible outcomes:
	1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
	2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
	3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
	In all outcomes, your friend wins.

	Example 2:
	Input: n = 1
	Output: true

	Example 3:
	Input: n = 2
	Output: true

	Constraints: 1 <= n <= 2^31 - 1*/

    bool canWinNim(int n) {
        return n % 4; 
    }
};