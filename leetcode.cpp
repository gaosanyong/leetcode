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


    /*17. Letter Combinations of a Phone Number (Medium)
	Given a string containing digits from 2-9 inclusive, return all possible 
	letter combinations that the number could represent. Return the answer in 
	any order. A mapping of digit to letters (just like on the telephone 
	buttons) is given below. Note that 1 does not map to any letters.

	Example 1:
	Input: digits = "23"
	Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

	Example 2:
	Input: digits = ""
	Output: []

	Example 3:
	Input: digits = "2"
	Output: ["a","b","c"]

	Constraints:
	* 0 <= digits.length <= 4
	* digits[i] is a digit in the range ['2', '9'].*/

    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {}; 
        
        const vector<string> mp = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> ans = {""}; 
        for (auto& c : digits) {
            vector<string> tmp; 
            for (auto& x : ans) {
                for (auto& xx : mp[c - '2']) {
                    tmp.push_back(x + xx); 
                }
            }
            ans = tmp; 
        }
        return ans; 
    }


    /*19. Remove Nth Node From End of List (Medium)
	Given the head of a linked list, remove the nth node from the end of the 
	list and return its head. Follow up: Could you do this in one pass?

	Example 1:
	Input: head = [1,2,3,4,5], n = 2
	Output: [1,2,3,5]

	Example 2:
	Input: head = [1], n = 1
	Output: []

	Example 3:
	Input: head = [1,2], n = 1
	Output: [1]

	Constraints:
	* The number of nodes in the list is sz.
	* 1 <= sz <= 30
	* 0 <= Node.val <= 100
	* 1 <= n <= sz*/

    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head), *fast = &dummy, *slow = &dummy; 
        while (fast) {
            fast = fast->next; 
            if (n-- < 0) slow = slow->next; 
        }
        ListNode* temp = slow->next; 
        slow->next = slow->next->next; 
        delete temp; 
        return dummy.next; 
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


    /*34. Find First and Last Position of Element in Sorted Array (Medium)
	Given an array of integers nums sorted in ascending order, find the starting 
	and ending position of a given target value. If target is not found in the 
	array, return [-1, -1].

	Follow up: Could you write an algorithm with O(log n) runtime complexity?

	Example 1:
	Input: nums = [5,7,7,8,8,10], target = 8
	Output: [3,4]

	Example 2:
	Input: nums = [5,7,7,8,8,10], target = 6
	Output: [-1,-1]

	Example 3:
	Input: nums = [], target = 0
	Output: [-1,-1]

	Constraints:
	* 0 <= nums.length <= 10^5
	* -10^9 <= nums[i] <= 10^9
	* nums is a non-decreasing array.
	* -10^9 <= target <= 10^9*/

    vector<int> searchRange(vector<int>& nums, int target) {
        int lo = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
        int hi = upper_bound(nums.begin(), nums.end(), target) - nums.begin() - 1; 
        if (lo < nums.size() && nums[lo] == target) return {lo, hi}; 
        return {-1, -1};
    }


    /*45. Jump Game II (Medium)
	Given an array of non-negative integers nums, you are initially positioned 
	at the first index of the array. Each element in the array represents your 
	maximum jump length at that position. Your goal is to reach the last index 
	in the minimum number of jumps. You can assume that you can always reach 
	the last index.

	Example 1:
	Input: nums = [2,3,1,1,4]
	Output: 2
	Explanation: The minimum number of jumps to reach the last index is 2. Jump 
	             1 step from index 0 to 1, then 3 steps to the last index.
	
	Example 2:
	Input: nums = [2,3,0,1,4]
	Output: 2

	Constraints:
	* 1 <= nums.length <= 1000
	* 0 <= nums[i] <= 10^5*/

    int jump(vector<int>& nums) {
        int ans = 0, prev = 0, curr = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            if (i > prev) {
                prev = curr; 
                ++ans; 
            }
            curr = max(curr, i + nums[i]); 
        }
        return ans; 
    }


    /*48. Rotate Image (Medium)
	You are given an n x n 2D matrix representing an image, rotate the image by 
	90 degrees (clockwise). You have to rotate the image in-place, which means 
	you have to modify the input 2D matrix directly. DO NOT allocate another 2D 
	matrix and do the rotation.

	Example 1:
	Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
	Output: [[7,4,1],[8,5,2],[9,6,3]]

	Example 2:
	Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
	Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

	Example 3:
	Input: matrix = [[1]]
	Output: [[1]]

	Example 4:
	Input: matrix = [[1,2],[3,4]]
	Output: [[3,1],[4,2]]

	Constraints:
	* matrix.length == n
	* matrix[i].length == n
	* 1 <= n <= 20
	* -1000 <= matrix[i][j] <= 1000*/

    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size(); 
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < i; ++j) 
                swap(matrix[i][j], matrix[j][i]); 
        
        for (auto& row : matrix) 
            reverse(row.begin(), row.end()); 


    /*51. N-Queens (Hard)
	The n-queens puzzle is the problem of placing n queens on an n x n 
	chessboard such that no two queens attack each other. Given an integer n, 
	return all distinct solutions to the n-queens puzzle. Each solution 
	contains a distinct board configuration of the n-queens' placement, where 
	'Q' and '.' both indicate a queen and an empty space, respectively.

	Example 1:
	Input: n = 4
	Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
	Explanation: There exist two distinct solutions to the 4-queens puzzle as 
	             shown above

	Example 2:
	Input: n = 1
	Output: [["Q"]]

	Constraints: 1 <= n <= 9*/

    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.')); 
        vector<bool> cols(n, false), diag(2*n-1, false), anti(2*n-1, false); 
        vector<vector<string>> ans; 
        
        function<void(int)> fn = [&](int i) {
            if (i == n) {
                ans.push_back(board); 
            } else {
                for (int j = 0; j < n; ++j) {
                    if (!cols[j] && !diag[i-j+n-1] && !anti[i+j]) {
                        board[i][j] = 'Q'; 
                        cols[j] = diag[i-j+n-1] = anti[i+j] = true; 
                        fn(i+1); 
                        board[i][j] = '.'; 
                        cols[j] = diag[i-j+n-1] = anti[i+j] = false; 
                    }
                }
            }
        };
        
        fn(0); 
        return ans; 
    }


    /*63. Unique Paths II (Medium)
	A robot is located at the top-left corner of a m x n grid (marked 'Start' 
	in the diagram below). The robot can only move either down or right at any 
	point in time. The robot is trying to reach the bottom-right corner of the 
	grid (marked 'Finish' in the diagram below). Now consider if some obstacles 
	are added to the grids. How many unique paths would there be? An obstacle 
	and space is marked as 1 and 0 respectively in the grid.

	Example 1:
	Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
	Output: 2
	Explanation: There is one obstacle in the middle of the 3x3 grid above.
	There are two ways to reach the bottom-right corner:
	1. Right -> Right -> Down -> Down
	2. Down -> Down -> Right -> Right

	Example 2:
	Input: obstacleGrid = [[0,1],[0,0]]
	Output: 1

	Constraints:
	* m == obstacleGrid.length
	* n == obstacleGrid[i].length
	* 1 <= m, n <= 100
	* obstacleGrid[i][j] is 0 or 1.*/

    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size(), n = obstacleGrid[0].size(); 
        vector<vector<int>> dp(m, vector<int>(n, 0)); 
        if (obstacleGrid[0][0] == 0) {
            dp[0][0] = 1; 
            for (int i = 0; i < m; ++i) {
                for (int j = 0; j < n; ++j) {
                    if (obstacleGrid[i][j] == 0) {
                        if (i) dp[i][j] += dp[i-1][j];
                        if (j) dp[i][j] += dp[i][j-1]; 
                    }
                }
            }
        }
        return dp[m-1][n-1]; 
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


    /*86. Partition List (Medium)
	Given the head of a linked list and a value x, partition it such that all 
	nodes less than x come before nodes greater than or equal to x. You should 
	preserve the original relative order of the nodes in each of the two 
	partitions.

	Example 1:
	Input: head = [1,4,3,2,5,2], x = 3
	Output: [1,2,2,4,3,5]

	Example 2:
	Input: head = [2,1], x = 2
	Output: [1,2]

	Constraints:
	* The number of nodes in the list is in the range [0, 200].
	* -100 <= Node.val <= 100
	* -200 <= x <= 200*/

    ListNode* partition(ListNode* head, int x) {
        ListNode dummy1(0), dummy2(0); 
        ListNode *node1 = &dummy1, *node2 = &dummy2, *node = head; 
        
        while (node) {
            if (node->val < x) {
                node1 = node1->next = node;
            } else {
                node2 = node2->next = node;
            }
            node = node->next; 
        }
        node1->next = dummy2.next; 
        node2->next = NULL; 
        return dummy1.next; 
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


    /*94. Binary Tree Inorder Traversal (Medium)
	Given the root of a binary tree, return the inorder traversal of its 
	nodes' values.

	Example 1:
	Input: root = [1,null,2,3]
	Output: [1,3,2]

	Example 2:
	Input: root = []
	Output: []

	Example 3:
	Input: root = [1]
	Output: [1]

	Example 4:
	Input: root = [1,2]
	Output: [2,1]

	Example 5:
	Input: root = [1,null,2]
	Output: [1,2]

	Constraints:
	* The number of nodes in the tree is in the range [0, 100].
	* -100 <= Node.val <= 100

	Follow up: Recursive solution is trivial, could you do it iteratively?*/

    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans; 
        TreeNode* node = root; 
        stack<TreeNode*> stk; 
        while (node || !stk.empty()) {
            if (node) {
                stk.push(node); 
                node = node->left; 
            } else {
                node = stk.top(); 
                stk.pop(); 
                ans.push_back(node->val); 
                node = node->right;
            }
        }
        return ans; 
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


    /*102. Binary Tree Level Order Traversal (Medium)
	Given the root of a binary tree, return the level order traversal of its 
	nodes' values. (i.e., from left to right, level by level).

	Example 1:
	Input: root = [3,9,20,null,null,15,7]
	Output: [[3],[9,20],[15,7]]

	Example 2:
	Input: root = [1]
	Output: [[1]]

	Example 3:
	Input: root = []
	Output: []

	Constraints:
	* The number of nodes in the tree is in the range [0, 2000].
	* -1000 <= Node.val <= 1000*/

    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans; 
        queue<TreeNode*> queue; 
        queue.push(root); 
        
        while (queue.size()) {
            vector<int> vals; 
            for (int i = 0, n = queue.size(); i < n; ++i) {
                TreeNode* node = queue.front(); 
                queue.pop(); 
                if (node) {
                    vals.push_back(node->val); 
                    queue.push(node->left);
                    queue.push(node->right); 
                }
            }
            if (vals.size()) ans.push_back(vals); 
        }
        return ans; 
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


    /*114. Flatten Binary Tree to Linked List (Medium)
	Given the root of a binary tree, flatten the tree into a "linked list":
	* The "linked list" should use the same TreeNode class where the right 
	  child pointer points to the next node in the list and the left child 
	  pointer is always null.
	* The "linked list" should be in the same order as a pre-order traversal of 
	  the binary tree.

	Example 1:
	Input: root = [1,2,5,3,4,null,6]
	Output: [1,null,2,null,3,null,4,null,5,null,6]

	Example 2:
	Input: root = []
	Output: []

	Example 3:
	Input: root = [0]
	Output: [0]

	Constraints:
	* The number of nodes in the tree is in the range [0, 2000].
	* -100 <= Node.val <= 100

	Follow up: Can you flatten the tree in-place (with O(1) extra space)?*/

    void flatten(TreeNode* root) {
        
        function<TreeNode*(TreeNode*, TreeNode*)> fn = [&fn](TreeNode* node, TreeNode* tail) {
            if (!node) return tail; 
            node->right = fn(node->left, fn(node->right, tail)); 
            node->left = NULL; 
            return node; 
        };
        
        fn(root, NULL); 
    }


    /*120. Triangle (Medium)
	Given a triangle array, return the minimum path sum from top to bottom. For 
	each step, you may move to an adjacent number of the row below. More 
	formally, if you are on index i on the current row, you may move to either 
	index i or index i + 1 on the next row.

	Example 1:
	Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
	Output: 11
	Explanation: The triangle looks like:
	   2
	  3 4
	 6 5 7
	4 1 8 3
	The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

	Example 2:
	Input: triangle = [[-10]]
	Output: -10

	Constraints:
	* 1 <= triangle.length <= 200
	* triangle[0].length == 1
	* triangle[i].length == triangle[i - 1].length + 1
	* -104 <= triangle[i][j] <= 104

	Follow up: Could you do this using only O(n) extra space, where n is the 
	           total number of rows in the triangle?*/

    int minimumTotal(vector<vector<int>>& triangle) {
        vector<int> ans(triangle.back()); 
        for (int i = triangle.size()-2; i >= 0; --i) {
            for (int j = 0; j <= i; ++j) {
                ans[j] = triangle[i][j] + min(ans[j], ans[j+1]); 
            }
        }
        return ans[0]; 
    }


    /*144. Binary Tree Preorder Traversal (Medium)
	Given the root of a binary tree, return the preorder traversal of its 
	nodes' values.

	Example 1:
	Input: root = [1,null,2,3]
	Output: [1,2,3]

	Example 2:
	Input: root = []
	Output: []

	Example 3:
	Input: root = [1]
	Output: [1]

	Example 4:
	Input: root = [1,2]
	Output: [1,2]

	Example 5:
	Input: root = [1,null,2]
	Output: [1,2]

	Constraints:
	* The number of nodes in the tree is in the range [0, 100].
	* -100 <= Node.val <= 100

	Follow up: Recursive solution is trivial, could you do it iteratively?*/

    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans; 
        stack<TreeNode*> stk; 
        stk.push(root); 
        while (!stk.empty()) {
            TreeNode* node = stk.top(); 
            stk.pop(); 
            if (node) {
                ans.push_back(node->val); 
                stk.push(node->right);
                stk.push(node->left); 
            }
        }
        return ans; 
    }


    /*145. Binary Tree Postorder Traversal (Medium)
	Given the root of a binary tree, return the postorder traversal of its 
	nodes' values.

	Example 1:
	Input: root = [1,null,2,3]
	Output: [3,2,1]

	Example 2:
	Input: root = []
	Output: []

	Example 3:
	Input: root = [1]
	Output: [1]

	Example 4:
	Input: root = [1,2]
	Output: [2,1]

	Example 5:
	Input: root = [1,null,2]
	Output: [2,1]

	Constraints:
	* The number of the nodes in the tree is in the range [0, 100].
	* -100 <= Node.val <= 100

	Follow up: Recursive solution is trivial, could you do it iteratively?*/

    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans; 
        TreeNode *node = root, *prev = NULL; 
        stack<TreeNode*> stk; 
        while (node || !stk.empty()) {
            if (node) {
                stk.push(node); 
                node = node->left; 
            } else {
                node = stk.top(); 
                if (node->right && node->right != prev) 
                    node = node->right; 
                else {
                    ans.push_back(node->val); 
                    stk.pop(); 
                    prev = node; 
                    node = NULL; 
                }
            }
        }
        return ans; 
    }


    /*150. Evaluate Reverse Polish Notation (Medium)
	Evaluate the value of an arithmetic expression in Reverse Polish Notation. 
	Valid operators are +, -, *, and /. Each operand may be an integer or 
	another expression. Note that division between two integers should truncate 
	toward zero. It is guaranteed that the given RPN expression is always valid. 
	That means the expression would always evaluate to a result, and there will 
	not be any division by zero operation.

	Example 1:
	Input: tokens = ["2","1","+","3","*"]
	Output: 9
	Explanation: ((2 + 1) * 3) = 9

	Example 2:
	Input: tokens = ["4","13","5","/","+"]
	Output: 6
	Explanation: (4 + (13 / 5)) = 6

	Example 3:
	Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
	Output: 22
	Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
	           = ((10 * (6 / (12 * -11))) + 17) + 5
	           = ((10 * (6 / -132)) + 17) + 5
	           = ((10 * 0) + 17) + 5
	           = (0 + 17) + 5
	           = 17 + 5
	           = 22

	Constraints:
	* 1 <= tokens.length <= 10^4
	* tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in 
	  the range [-200, 200].*/

    int evalRPN(vector<string>& tokens) {
        stack<int> stk; 
        string ops = "+-*/"; 
        for (auto& token : tokens) {
            if (ops.find(token) != string::npos) {
                int rr = stk.top(); stk.pop(); 
                int ll = stk.top(); stk.pop(); 
                if (token == "+") stk.push(ll + rr); 
                else if (token == "-") stk.push(ll - rr); 
                else if (token == "*") stk.push(ll * rr); 
                else stk.push(ll / rr); 
            } else 
                stk.push(stoi(token)); 
        }
        return stk.top(); 
    }


    /*204. Count Primes (Easy)
	Count the number of prime numbers less than a non-negative number, n.

	Example 1:
	Input: n = 10
	Output: 4
	Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

	Example 2:
	Input: n = 0
	Output: 0

	Example 3:
	Input: n = 1
	Output: 0

	Constraints: 0 <= n <= 5 * 10^6*/

    int countPrimes(int n) {
        if (n < 2) return false; // edge case 
        
        vector<bool> sieve(n, true); 
        sieve[0] = sieve[1] = false; 
        for (int i = 2; i < sqrt(n); ++i) {
            if (sieve[i]) {
                for (int ii = i*i; ii < n; ii += i) {
                    sieve[ii] = false; 
                }
            }
        }
        return count(sieve.begin(), sieve.end(), true); 
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
        ListNode* temp = node->next; 
        node->val = node->next->val;
        node->next = node->next->next; 
        delete temp; 
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


    /*318. Maximum Product of Word Lengths (Medium)
	Given a string array words, return the maximum value of 
	length(word[i]) * length(word[j]) where the two words do not share common 
	letters. If no such two words exist, return 0.

	Example 1:
	Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
	Output: 16
	Explanation: The two words can be "abcw", "xtfn".

	Example 2:
	Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
	Output: 4
	Explanation: The two words can be "ab", "cd".
	
	Example 3:
	Input: words = ["a","aa","aaa","aaaa"]
	Output: 0
	Explanation: No such pair of words.

	Constraints:
	* 2 <= words.length <= 1000
	* 1 <= words[i].length <= 1000
	* words[i] consists only of lowercase English letters.*/

    int maxProduct(vector<string>& words) {
        unordered_map<int, int> mp; 
        for (auto& word : words) {
            int mask = 0; 
            for (auto& c : word) 
                mask |= 1 << (c - 'a'); 
            mp[mask] = max(mp[mask], (int) size(word)); 
        }
        
        int ans = 0; 
        for (auto& x : mp) {
            for (auto& y : mp) {
                if ((x.first & y.first) == 0) {
                    ans = max(ans, x.second * y.second); 
                }
            }
        }
        return ans; 
    }


    /*329. Longest Increasing Path in a Matrix (Hard)
	Given an m x n integers matrix, return the length of the longest increasing 
	path in matrix. From each cell, you can either move in four directions: 
	left, right, up, or down. You may not move diagonally or move outside the 
	boundary (i.e., wrap-around is not allowed).

	Example 1:
	Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
	Output: 4
	Explanation: The longest increasing path is [1, 2, 6, 9].

	Example 2:
	Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
	Output: 4
	Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

	Example 3:
	Input: matrix = [[1]]
	Output: 1

	Constraints:
	* m == matrix.length
	* n == matrix[i].length
	* 1 <= m, n <= 200
	* 0 <= matrix[i][j] <= 2^31 - 1*/

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(); 
        
        vector<vector<int>> memo(m, vector<int>(n, 0)); 
        function<int(int, int)> fn = [&](int i, int j) {
            if (memo[i][j] == 0) {
                memo[i][j] = 1; 
                for (auto &d : vector<vector<int>>{{-1, 0}, {0, -1}, {0, 1}, {1, 0}}) {
                    int ii = i + d[0], jj = j + d[1]; 
                    if (0 <= ii && ii < m && 0 <= jj && jj < n && matrix[i][j] < matrix[ii][jj]) {
                        memo[i][j] = max(memo[i][j], 1 + fn(ii, jj)); 
                    }
                }
            } 
            return memo[i][j]; 
        };
        
        int ans = 0; 
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                ans = max(ans, fn(i, j)); 
            }
        }
        return ans; 
    }


    /*330. Patching Array (Hard)
	Given a sorted integer array nums and an integer n, add/patch elements to 
	the array such that any number in the range [1, n] inclusive can be formed 
	by the sum of some elements in the array. Return the minimum number of 
	patches required.

	Example 1:
	Input: nums = [1,3], n = 6
	Output: 1
	Explanation: Combinations of nums are [1], [3], [1,3], which form possible 
	             sums of: 1, 3, 4. Now if we add/patch 2 to nums, the 
	             combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3]. 
	             Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range 
	             [1, 6]. So we only need 1 patch.
	
	Example 2:
	Input: nums = [1,5,10], n = 20
	Output: 2
	Explanation: The two patches can be [2, 4].

	Example 3:
	Input: nums = [1,2,2], n = 5
	Output: 0

	Constraints:
	* 1 <= nums.length <= 1000
	* 1 <= nums[i] <= 10^4
	* nums is sorted in ascending order.
	* 1 <= n <= 2^31 - 1*/

    int minPatches(vector<int>& nums, int n) {
        int ans = 0, k = 0; 
        long prefix = 0; 
        while (prefix < n) {
            if (k < nums.size() && nums[k] <= prefix + 1) {
                prefix += nums[k++]; 
            } else {
                ++ans; 
                prefix += prefix + 1; 
            }
        }
        return ans; 
    }


    /*338. Counting Bits (Easy)
	Given an integer n, return an array ans of length n + 1 such that for each 
	i (0 <= i <= n), ans[i] is the number of 1's in the binary representation 
	of i.

	Example 1:
	Input: n = 2
	Output: [0,1,1]
	Explanation: 0 --> 0
	             1 --> 1
	             2 --> 10
	
	Example 2:
	Input: n = 5
	Output: [0,1,1,2,1,2]
	Explanation: 0 --> 0
	             1 --> 1
	             2 --> 10
	             3 --> 11
	             4 --> 100
	             5 --> 101

	Constraints: 0 <= n <= 10^5

	Follow up: It is very easy to come up with a solution with a runtime of 
	           O(n log n). Can you do it in linear time O(n) and possibly in a 
	           single pass? Can you do it without using any built-in function 
	           (i.e., like __builtin_popcount in C++)?*/

    vector<int> countBits(int n) {
        vector<int> ans(n+1, 0); 
        for (int x = 1; x <= n; ++x) 
            ans[x] = 1 + ans[x&(x-1)];
        return ans; 
    }


    /*377. Combination Sum IV (Medium)
	Given an array of distinct integers nums and a target integer target, 
	return the number of possible combinations that add up to target. The 
	answer is guaranteed to fit in a 32-bit integer.

	Example 1:
	Input: nums = [1,2,3], target = 4
	Output: 7
	Explanation:
	The possible combination ways are:
	(1, 1, 1, 1)
	(1, 1, 2)
	(1, 2, 1)
	(1, 3)
	(2, 1, 1)
	(2, 2)
	(3, 1)
	Note that different sequences are counted as different combinations.

	Example 2:
	Input: nums = [9], target = 3
	Output: 0

	Constraints:
	* 1 <= nums.length <= 200
	* 1 <= nums[i] <= 1000
	* All the elements of nums are unique.
	* 1 <= target <= 1000

	Follow up: What if negative numbers are allowed in the given array? How 
	           does it change the problem? What limitation we need to add to 
	           the question to allow negative numbers?*/

    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned int> dp(1+target, 0); 
        dp[0] = 1; 
        for (int i = 0; i < dp.size(); ++i) {
            if (dp[i]) {
                for (auto x: nums) {
                    if (i + x < dp.size()) 
                        dp[i+x] += dp[i]; 
                }
            }
        } 
        return dp.back(); 
    }


    /*462. Minimum Moves to Equal Array Elements II (Medium)
	Given an integer array nums of size n, return the minimum number of moves 
	required to make all array elements equal. In one move, you can increment 
	or decrement an element of the array by 1.

	Example 1:
	Input: nums = [1,2,3]
	Output: 2
	Explanation: Only two moves are needed (remember each move increments or 
	             decrements one element): [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
	
	Example 2:
	Input: nums = [1,10,2,9]
	Output: 16

	Constraints:
	* n == nums.length
	* 1 <= nums.length <= 10^5
	* -10^9 <= nums[i] <= 10^9*/

    int minMoves2(vector<int>& nums) {
        nth_element(nums.begin(), nums.begin() + nums.size()/2, nums.end()); 
        int ans = 0, m = nums[nums.size()/2]; 
        for (auto& x : nums) {
            ans += abs(x - m); 
        }
        return ans; 
    }


    /*495. Teemo Attacking (Easy)
	Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo 
	attacks Ashe, Ashe gets poisoned for a exactly duration seconds. More 
	formally, an attack at second t will mean Ashe is poisoned during the 
	inclusive time interval [t, t + duration - 1]. If Teemo attacks again 
	before the poison effect ends, the timer for it is reset, and the poison 
	effect will end duration seconds after the new attack. You are given a 
	non-decreasing integer array timeSeries, where timeSeries[i] denotes that 
	Teemo attacks Ashe at second timeSeries[i], and an integer duration. Return 
	the total number of seconds that Ashe is poisoned.

	Example 1:
	Input: timeSeries = [1,4], duration = 2
	Output: 4
	Explanation: Teemo's attacks on Ashe go as follows:
	- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
	- At second 4, Teemo attacks, and Ashe is poisoned for seconds 4 and 5.
	Ashe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in total.

	Example 2:
	Input: timeSeries = [1,2], duration = 2
	Output: 3
	Explanation: Teemo's attacks on Ashe go as follows:
	- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
	- At second 2 however, Teemo attacks again and resets the poison timer. 
	  Ashe is poisoned for seconds 2 and 3.
	Ashe is poisoned for seconds 1, 2, and 3, which is 3 seconds in total.

	Constraints:
	* 1 <= timeSeries.length <= 10^4
	* 0 <= timeSeries[i], duration <= 10^7
	* timeSeries is sorted in non-decreasing order.*/

    int findPoisonedDuration(vector<int>& timeSeries, int duration) {
        int ans = 0; 
        for (int i = 0; i < size(timeSeries)-1; ++i) 
            ans += min(duration, timeSeries[i+1] - timeSeries[i]); 
        return ans + duration; 
    }


    /*504. Base 7 (Easy)
	Given an integer, return its base 7 string representation.

	Example 1:
	Input: 100
	Output: "202"
	
	Example 2:
	Input: -7
	Output: "-10"
	
	Note: The input will be in range of [-1e7, 1e7].*/

    string convertToBase7(int num) {
        if (num == 0) return "0"; // edge case 
        
        string ans; 
        bool neg = num < 0; 
        num = abs(num); 
        while (num) {
            ans = to_string(num%7) + ans; 
            num /= 7; 
        }
        return neg ? "-" + ans : ans; 
    }


    /*554. Brick Wall (Medium)
	There is a brick wall in front of you. The wall is rectangular and has 
	several rows of bricks. The bricks have the same height but different width. 
	You want to draw a vertical line from the top to the bottom and cross the 
	least bricks. The brick wall is represented by a list of rows. Each row is 
	a list of integers representing the width of each brick in this row from 
	left to right. If your line go through the edge of a brick, then the brick 
	is not considered as crossed. You need to find out how to draw the line to 
	cross the least bricks and return the number of crossed bricks. You cannot 
	draw a line just along one of the two vertical edges of the wall, in which 
	case the line will obviously cross no bricks.

	Example:
	Input: [[1,2,2,1],
	        [3,1,2],
	        [1,3,2],
	        [2,4],
	        [3,1,2],
	        [1,3,1,1]]

	Output: 2

	Note:
	* The width sum of bricks in different rows are the same and won't exceed 
	  INT_MAX.
	* The number of bricks in each row is in range [1,10,000]. The height of 
	  wall is in range [1,10,000]. Total number of bricks of the wall won't 
	  exceed 20,000.*/

    int leastBricks(vector<vector<int>>& wall) {
        int mx = 0; 
        unordered_map<int, int> freq; 
        for (auto row : wall) {
            int prefix = 0; 
            for (int i = 0; i < row.size()-1; ++i) {
                prefix += row[i]; 
                mx = max(mx, ++freq[prefix]); 
            }
        }
        return wall.size() - mx; 
    }


    /*559. Maximum Depth of N-ary Tree (Easy)
	Given a n-ary tree, find its maximum depth. The maximum depth is the number 
	of nodes along the longest path from the root node down to the farthest 
	leaf node. Nary-Tree input serialization is represented in their level 
	order traversal, each group of children is separated by the null value (See 
	examples).

	Example 1:
	Input: root = [1,null,3,2,4,null,5,6]
	Output: 3

	Example 2:
	Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
	Output: 5

	Constraints:
	* The depth of the n-ary tree is less than or equal to 1000.
	* The total number of nodes is between [0, 10^4].*/

    int maxDepth(Node* root) {
        if (!root) return 0; // edge case 
        
        queue<Node*> q; 
        q.push(root); 
        int ans = 0; 
        while (!q.empty()) {
            ++ans; 
            for (int i = 0, n = q.size(); i < n; ++i) {
                Node* node = q.front(); 
                q.pop(); 
                for (auto &child : node->children) {
                    q.push(child); 
                }
            }
        }
        return ans; 
    }


    /*561. Array Partition I (Easy)
	Given an integer array nums of 2n integers, group these integers into n 
	pairs (a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) 
	for all i is maximized. Return the maximized sum.

	Example 1:
	Input: nums = [1,4,3,2]
	Output: 4
	Explanation: All possible pairings (ignoring the ordering of elements) are:
	1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
	2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
	3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
	So the maximum possible sum is 4.

	Example 2:
	Input: nums = [6,2,6,5,1,2]
	Output: 9
	Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.

	Constraints:
	* 1 <= n <= 10^4
	* nums.length == 2 * n
	* -10^4 <= nums[i] <= 10^4*/

    int arrayPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end()); 
        int ans = 0; 
        for (int i = 0; i < nums.size(); i += 2)
            ans += nums[i]; 
        return ans; 
    }


    /*566. Reshape the Matrix (Easy)
	In MATLAB, there is a very useful function called 'reshape', which can 
	reshape a matrix into a new one with different size but keep its original 
	data. You're given a matrix represented by a two-dimensional array, and two 
	positive integers r and c representing the row number and column number of 
	the wanted reshaped matrix, respectively. The reshaped matrix need to be 
	filled with all the elements of the original matrix in the same row-
	traversing order as they were. If the 'reshape' operation with given 
	parameters is possible and legal, output the new reshaped matrix; Otherwise, 
	output the original matrix.

	Example 1:
	Input: nums = [[1,2], [3,4]], r = 1, c = 4
	Output:	[[1,2,3,4]]
	Explanation: The row-traversing of nums is [1,2,3,4]. The new reshaped 
	             matrix is a 1 * 4 matrix, fill it row by row by using the 
	             previous list.
	
	Example 2: 
	Input: nums = [[1,2], [3,4]], r = 2, c = 4
	Output: [[1,2],  [3,4]]
	Explanation: There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. 
	             So output the original matrix.
	
	Note:
	* The height and width of the given matrix is in range [1, 100].
	* The given r and c are all positive.*/

    vector<vector<int>> matrixReshape(vector<vector<int>>& nums, int r, int c) {
        int m = nums.size(), n = nums[0].size(); 
        if (m * n != r * c) return nums; // incompatable 
        
        vector<vector<int>> ans(r, vector<int>(c)); 
        for (int i = 0; i < r*c; ++i) {
            ans[i/c][i%c] = nums[i/n][i%n]; 
        }
        return ans; 
    }


    /*572. Subtree of Another Tree (Easy)
	Given two non-empty binary trees s and t, check whether tree t has exactly 
	the same structure and node values with a subtree of s. A subtree of s is a 
	tree consists of a node in s and all of this node's descendants. The tree s 
	could also be considered as a subtree of itself.

	Example 1:
	Given tree s:

	     3
	    / \
	   4   5
	  / \
	 1   2
	Given tree t:
	   4 
	  / \
	 1   2
	Return true, because t has the same structure and node values with a subtree of s.

	Example 2:
	Given tree s:

	     3
	    / \
	   4   5
	  / \
	 1   2
	    /
	   0
	Given tree t:
	   4
	  / \
	 1   2
	Return false.*/

    /*
    bool check(TreeNode* ss, TreeNode* tt) {
        if (!ss && !tt) return true; 
        if (!ss || !tt) return false; 
        return (ss->val == tt->val) && check(ss->left, tt->left) && check(ss->right, tt->right); 
    }*/
    
    bool isSubtree(TreeNode* s, TreeNode* t) {
        stack<TreeNode*> stk; 
        stk.push(s); 
        
        while (!stk.empty()) {
            TreeNode* node = stk.top(); 
            stk.pop();
            if (node) {
                if (check(node, t)) return true; 
                stk.push(node->right); 
                stk.push(node->left); 
            }
        }
        return false; 
    }


    /*575. Distribute Candies (Easy)
	Alice has n candies, where the ith candy is of type candyType[i]. Alice 
	noticed that she started to gain weight, so she visited a doctor. The 
	doctor advised Alice to only eat n / 2 of the candies she has (n is always 
	even). Alice likes her candies very much, and she wants to eat the maximum 
	number of different types of candies while still following the doctor's 
	advice. Given the integer array candyType of length n, return the maximum 
	number of different types of candies she can eat if she only eats n / 2 of 
	them.

	Example 1:
	Input: candyType = [1,1,2,2,3,3]
	Output: 3
	Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3 
	             types, she can eat one of each type.

	Example 2:
	Input: candyType = [1,1,2,3]
	Output: 2
	Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types 
	             [1,2], [1,3], or [2,3], she still can only eat 2 different 
	             types.
	
	Example 3:
	Input: candyType = [6,6,6,6]
	Output: 1
	Explanation: Alice can only eat 4 / 2 = 2 candies. Even though she can eat 
	             2 candies, she only has 1 type.

	Constraints:
	* n == candyType.length
	* 2 <= n <= 10^4
	* n is even.
	* -10^5 <= candyType[i] <= 10^5*/

    int distributeCandies(vector<int>& candyType) {
        unordered_map<int, int> freq; 
        for (auto &x : candyType) {
            ++freq[x]; 
        }
        return min(candyType.size()/2, freq.size()); 
    }


    /*583. Delete Operation for Two Strings (Medium)
	Given two strings word1 and word2, return the minimum number of steps 
	required to make word1 and word2 the same. In one step, you can delete 
	exactly one character in either string.

	Example 1:
	Input: word1 = "sea", word2 = "eat"
	Output: 2
	Explanation: You need one step to make "sea" to "ea" and another step to 
	             make "eat" to "ea".

	Example 2:
	Input: word1 = "leetcode", word2 = "etco"
	Output: 4

	Constraints:
	* 1 <= word1.length, word2.length <= 500
	* word1 and word2 consist of only lowercase English letters.*/

    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size(); 
        vector<vector<int>> dp (m+1, vector<int>(n+1, 0)); 
        for (int i = 0; i < m; ++i) dp[i][n] = m - i; 
        for (int j = 0; j < n; ++j) dp[m][j] = n - j; 
        for (int i = m-1; i >= 0; --i) {
            for (int j = n-1; j >= 0; --j) {
                if (word1[i] == word2[j]) 
                    dp[i][j] = dp[i+1][j+1]; 
                else
                    dp[i][j] = 1 + min(dp[i+1][j], dp[i][j+1]); 
            }
        }
        return dp[0][0]; 
    }


    /*589. N-ary Tree Preorder Traversal (Easy)
	Given the root of an n-ary tree, return the preorder traversal of its nodes' 
	values. Nary-Tree input serialization is represented in their level order 
	traversal. Each group of children is separated by the null value (See examples)

	Example 1:
	Input: root = [1,null,3,2,4,null,5,6]
	Output: [1,3,5,6,2,4]

	Example 2:
	Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
	Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

	Constraints:
	* The number of nodes in the tree is in the range [0, 104].
	* 0 <= Node.val <= 104
	* The height of the n-ary tree is less than or equal to 1000.

	Follow up: Recursive solution is trivial, could you do it iteratively? */

    vector<int> preorder(Node* root) {
        vector<int> ans; 
        if (root) {
            stack<Node*> stk; 
            stk.push(root); 
            while (stk.size()) {
                Node* node = stk.top(); 
                stk.pop(); 
                ans.push_back(node->val); 
                for (int i = (node->children).size()-1; i >= 0; --i) {
                    stk.push(node->children[i]); 
                }
            }
        }
        return ans; 
    }


    /*637. Average of Levels in Binary Tree (Easy)
	Given the root of a binary tree, return the average value of the nodes on 
	each level in the form of an array. Answers within 10-5 of the actual 
	answer will be accepted.

	Example 1:
	Input: root = [3,9,20,null,15,7]
	Output: [3.00000,14.50000,11.00000]
	Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, 
	             and on level 2 is 11. Hence return [3, 14.5, 11].

	Example 2:
	Input: root = [3,9,20,15,7]
	Output: [3.00000,14.50000,11.00000]

	Constraints:
	* The number of nodes in the tree is in the range [1, 10^4].
	* -2^31 <= Node.val <= 2^31 - 1*/

    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> ans; 
        
        queue<TreeNode*> q; 
        q.push(root); 
        while (!q.empty()) {
            double sm = 0, cnt = 0; 
            for (int i = 0, n = q.size(); i < n; ++i) {
                TreeNode* node = q.front(); 
                q.pop(); 
                if (node) {
                    sm += node->val; 
                    ++cnt; 
                    q.push(node->left);
                    q.push(node->right); 
                }
            }
            if (cnt) ans.push_back(sm/cnt); 
        }
        return ans; 
    }


    /*609. Find Duplicate File in System (Medium)
	Given a list paths of directory info, including the directory path, and all 
	the files with contents in this directory, return all the duplicate files 
	in the file system in terms of their paths. You may return the answer in 
	any order. A group of duplicate files consists of at least two files that 
	have the same content. A single directory info string in the input list has 
	the following format:
	* "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"

	It means there are n files (f1.txt, f2.txt ... fn.txt) with content 
	(f1_content, f2_content ... fn_content) respectively in the directory 
	"root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the 
	directory is just the root directory. The output is a list of groups of 
	duplicate file paths. For each group, it contains all the file paths of the 
	files that have the same content. A file path is a string that has the 
	following format:
	*"directory_path/file_name.txt"

	Example 1:
	Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
	Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]

	Example 2:
	Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]
	Output: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]

	Constraints:
	* 1 <= paths.length <= 2 * 104
	* 1 <= paths[i].length <= 3000
	* 1 <= sum(paths[i].length) <= 5 * 105
	* paths[i] consist of English letters, digits, '/', '.', '(', ')', and ' '.
	* You may assume no files or directories share the same name in the same directory.
	* You may assume each given directory info represents a unique directory. A single blank space separates the directory path and file info.
	 

	Follow up:
	* Imagine you are given a real file system, how will you search files? DFS or BFS?
	* If the file content is very large (GB level), how will you modify your solution?
	* If you can only read the file by 1kb each time, how will you modify your solution?
	* What is the time complexity of your modified solution? What is the most time-consuming part and memory-consuming part of it? How to optimize?
	* How to make sure the duplicated files you find are not false positive?*/

    vector<vector<string>> findDuplicate(vector<string>& paths) {
        unordered_map<string, vector<string>> mp; 
        
        for (auto& path : paths) {
            istringstream iss (path); 
            string file; 
            vector<string> files; 
            while (iss >> file) 
                files.push_back(file); 
            
            for (int i = 1; i < files.size(); ++i) {
                int k = files[i].find("("); 
                mp[files[i].substr(k)].push_back(files[0] + "/" + files[i].substr(0, k)); 
            }
        }
        
        vector<vector<string>> ans; 
        for (auto x: mp) {
            if (x.second.size() > 1) {
                ans.push_back(x.second); 
            }
        }
        return ans; 
    }


    /*630. Course Schedule III (Hard)
	There are n different online courses numbered from 1 to n. You are given an 
	array courses where courses[i] = [durationi, lastDayi] indicate that the ith 
	course should be taken continuously for durationi days and must be finished 
	before or on lastDayi. You will start on the 1st day and you cannot take two 
	or more courses simultaneously. Return the maximum number of courses that 
	you can take.

	Example 1:
	Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
	Output: 3
	Explanation: There are totally 4 courses, but you can take 3 courses at most:
	             - First, take the 1st course, it costs 100 days so you will 
	               finish it on the 100th day, and ready to take the next course 
	               on the 101st day.
	             - Second, take the 3rd course, it costs 1000 days so you will 
	               finish it on the 1100th day, and ready to take the next 
	               course on the 1101st day. 
	             - Third, take the 2nd course, it costs 200 days so you will 
	               finish it on the 1300th day. 
	             - The 4th course cannot be taken now, since you will finish it 
	               on the 3300th day, which exceeds the closed date.
	
	Example 2:
	Input: courses = [[1,2]]
	Output: 1

	Example 3:
	Input: courses = [[3,2],[4,3]]
	Output: 0

	Constraints:
	* 1 <= courses.length <= 10^4
	* 1 <= durationi, lastDayi <= 10^4*/

    int scheduleCourse(vector<vector<int>>& courses) {
        sort(courses.begin(), courses.end(), [](auto& lhs, auto& rhs) { return lhs[1] < rhs[1]; }); 
        
        int prefix = 0; 
        priority_queue<int> pq; 
        for (auto& course : courses) {
            prefix += course[0]; 
            pq.push(course[0]); 
            while (prefix > course[1]) {
                prefix -= pq.top(); 
                pq.pop(); 
            }
        }
        return pq.size(); 
    }


    /*643. Maximum Average Subarray I (Easy)
	Given an array consisting of n integers, find the contiguous subarray of 
	given length k that has the maximum average value. And you need to output 
	the maximum average value.

	Example 1:
	Input: [1,12,-5,-6,50,3], k = 4
	Output: 12.75
	Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75

	Note:
	* 1 <= k <= n <= 30,000.
	* Elements of the given array will be in the range [-10,000, 10,000].*/

    double findMaxAverage(vector<int>& nums, int k) {
        int ans = INT_MIN, sm = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            sm += nums[i]; 
            if (i >= k) sm -= nums[i-k]; 
            if (i >= k-1) ans = max(ans, sm);
        }
        return (double) ans/k; 
    }


    /*653. Two Sum IV - Input is a BST (Easy)
	Given the root of a Binary Search Tree and a target number k, return true 
	if there exist two elements in the BST such that their sum is equal to the 
	given target.

	Example 1:
	Input: root = [5,3,6,2,4,null,7], k = 9
	Output: true

	Example 2:
	Input: root = [5,3,6,2,4,null,7], k = 28
	Output: false

	Example 3:
	Input: root = [2,1,3], k = 4
	Output: true

	Example 4:
	Input: root = [2,1,3], k = 1
	Output: false

	Example 5:
	Input: root = [2,1,3], k = 3
	Output: true

	Constraints:
	* The number of nodes in the tree is in the range [1, 10^4].
	* -10^4 <= Node.val <= 10^4
	* root is guaranteed to be a valid binary search tree.
	* -10^5 <= k <= 10^5*/

    bool findTarget(TreeNode* root, int k) {
        unordered_set<int> seen; 
        stack<TreeNode*> stk; 
        stk.push(root); 
        
        while (!stk.empty()) {
            TreeNode* node = stk.top(); 
            stk.pop(); 
            if (node) {
                if (seen.count(k - node->val)) return true; 
                seen.insert(node->val); 
                stk.push(node->right);
                stk.push(node->left); 
            }
        }
        return false; 
    }


    /*665. Non-decreasing Array (Medium)
	Given an array nums with n integers, your task is to check if it could 
	become non-decreasing by modifying at most one element. We define an array 
	is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) 
	such that (0 <= i <= n - 2).

	Example 1:
	Input: nums = [4,2,3]
	Output: true
	Explanation: You could modify the first 4 to 1 to get a non-decreasing array.

	Example 2:
	Input: nums = [4,2,1]
	Output: false
	Explanation: You can't get a non-decreasing array by modify at most one element.

	Constraints:
	* n == nums.length
	* 1 <= n <= 10^4
	* -10^5 <= nums[i] <= 10^5*/

    bool checkPossibility(vector<int>& nums) {
        int cnt = 0; 
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i-1] > nums[i]) {
                if ((i==1 || nums[i-2] <= nums[i]) || (i+1 == nums.size() || nums[i-1] <= nums[i+1])) 
                    ++cnt; 
                else
                    return false; 
            }
        }
        return cnt <= 1; 
    }


    /*680. Valid Palindrome II (Easy)
	Given a non-empty string s, you may delete at most one character. Judge 
	whether you can make it a palindrome.

	Example 1:
	Input: "aba"
	Output: True
	
	Example 2:
	Input: "abca"
	Output: True
	Explanation: You could delete the character 'c'.
	
	Note: The string will only contain lowercase characters a-z. The maximum 
	length of the string is 50000.*/

    bool validPalindrome(string s) {
        for (int lo = 0, hi = s.size()-1; lo < hi; ++lo, --hi) {
            if (s[lo] != s[hi]) {
                for (int l = lo+1, h = hi; s[l] == s[h]; ++l, --h) 
                    if (l >= h) return true; 
                for (int l = lo, h = hi-1; s[l] == s[h]; ++l, --h) 
                    if (l >= h) return true; 
                return false; 
            }
        }
        return true; 
    }


    /*682. Baseball Game (Easy)
	You are keeping score for a baseball game with strange rules. The game 
	consists of several rounds, where the scores of past rounds may affect 
	future rounds' scores. At the beginning of the game, you start with an 
	empty record. You are given a list of strings ops, where ops[i] is the 
	ith operation you must apply to the record and is one of the following:
	* An integer x - Record a new score of x.
	* "+" - Record a new score that is the sum of the previous two scores. It 
	  is guaranteed there will always be two previous scores.
	* "D" - Record a new score that is double the previous score. It is 
	  guaranteed there will always be a previous score.
	* "C" - Invalidate the previous score, removing it from the record. It is 
	  guaranteed there will always be a previous score.
	Return the sum of all the scores on the record.

	Example 1:
	Input: ops = ["5","2","C","D","+"]
	Output: 30
	Explanation:
	"5" - Add 5 to the record, record is now [5].
	"2" - Add 2 to the record, record is now [5, 2].
	"C" - Invalidate and remove the previous score, record is now [5].
	"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
	"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
	The total sum is 5 + 10 + 15 = 30.

	Example 2:
	Input: ops = ["5","-2","4","C","D","9","+","+"]
	Output: 27
	Explanation:
	"5" - Add 5 to the record, record is now [5].
	"-2" - Add -2 to the record, record is now [5, -2].
	"4" - Add 4 to the record, record is now [5, -2, 4].
	"C" - Invalidate and remove the previous score, record is now [5, -2].
	"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
	"9" - Add 9 to the record, record is now [5, -2, -4, 9].
	"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
	"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
	The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

	Example 3:
	Input: ops = ["1"]
	Output: 1

	Constraints:
	* 1 <= ops.length <= 1000
	* ops[i] is "C", "D", "+", or a string representing an integer in the range [-3 * 104, 3 * 104].
	* For operation "+", there will always be at least two previous scores on the record.
	* For operations "C" and "D", there will always be at least one previous score on the record.*/

    int calPoints(vector<string>& ops) {
        vector<int> vec; 
        for (auto& op : ops) {
            if (op == "+") {
                vec.push_back(vec[vec.size()-2] + vec[vec.size()-1]); 
            } else if (op == "D") {
                vec.push_back(vec.back() * 2); 
            } else if (op == "C") {
                vec.pop_back(); 
            } else {
                vec.push_back(stoi(op)); 
            }
        }
        return accumulate(vec.begin(), vec.end(), 0); 
    }


    /*690. Employee Importance (Easy)
	You are given a data structure of employee information, which includes the 
	employee's unique id, their importance value and their direct subordinates' 
	id. For example, employee 1 is the leader of employee 2, and employee 2 is 
	the leader of employee 3. They have importance value 15, 10 and 5, 
	respectively. Then employee 1 has a data structure like [1, 15, [2]], and 
	employee 2 has [2, 10, [3]], and employee 3 has [3, 5, []]. Note that 
	although employee 3 is also a subordinate of employee 1, the relationship 
	is not direct. Now given the employee information of a company, and an 
	employee id, you need to return the total importance value of this employee 
	and all their subordinates.

	Example 1:
	Input: [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
	Output: 11
	Explanation: Employee 1 has importance value 5, and he has two direct 
	             subordinates: employee 2 and employee 3. They both have 
	             importance value 3. So the total importance value of employee 
	             1 is 5 + 3 + 3 = 11.

	Note:
	* One employee has at most one direct leader and may have several subordinates.
	* The maximum number of employees won't exceed 2000.*/

    int getImportance(vector<Employee*> employees, int id) {
        unordered_map<int, Employee*> mp; 
        for (auto& employee : employees) 
            mp.insert({employee->id, employee}); 
        
        stack<int> stk; 
        stk.push(id); 
        int ans = 0; 
        while (!stk.empty()) {
            int id = stk.top(); 
            stk.pop(); 
            Employee* employee = mp[id]; 
            ans += employee->importance; 
            for (auto& x : employee->subordinates) 
                stk.push(x); 
        }
        return ans; 
    }


    /*693. Binary Number with Alternating Bits (Easy)
	Given a positive integer, check whether it has alternating bits: namely, if 
	two adjacent bits will always have different values.

	Example 1:
	Input: n = 5
	Output: true
	Explanation: The binary representation of 5 is: 101

	Example 2:
	Input: n = 7
	Output: false
	Explanation: The binary representation of 7 is: 111.

	Example 3:
	Input: n = 11
	Output: false
	Explanation: The binary representation of 11 is: 1011.

	Example 4:
	Input: n = 10
	Output: true
	Explanation: The binary representation of 10 is: 1010.

	Example 5:
	Input: n = 3
	Output: false

	Constraints: 1 <= n <= 2^31 - 1*/

    bool hasAlternatingBits(int n) {
        long nn = n ^ (n >> 1); 
        return (nn & (nn+1)) == 0;
    }


    /*695. Max Area of Island (Medium)
	You are given an m x n binary matrix grid. An island is a group of 1's 
	(representing land) connected 4-directionally (horizontal or vertical.) You 
	may assume all four edges of the grid are surrounded by water. The area of 
	an island is the number of cells with a value 1 in the island. Return the 
	maximum area of an island in grid. If there is no island, return 0.

	Example 1:
	Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
	               [0,0,0,0,0,0,0,1,1,1,0,0,0],
	               [0,1,1,0,1,0,0,0,0,0,0,0,0],
	               [0,1,0,0,1,1,0,0,1,0,1,0,0],
	               [0,1,0,0,1,1,0,0,1,1,1,0,0],
	               [0,0,0,0,0,0,0,0,0,0,1,0,0],
	               [0,0,0,0,0,0,0,1,1,1,0,0,0],
	               [0,0,0,0,0,0,0,1,1,0,0,0,0]]
	Output: 6
	Explanation: The answer is not 11, because the island must be connected 
	             4-directionally.
	
	Example 2:
	Input: grid = [[0,0,0,0,0,0,0,0]]
	Output: 0

	Constraints:
	* m == grid.length
	* n == grid[i].length
	* 1 <= m, n <= 50
	* grid[i][j] is either 0 or 1.*/

    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int ans = 0, m = size(grid), n = size(grid[0]); 
        vector<pair<int, int>> dir = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}}; 
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j]) {
                    int val = 0; 
                    stack<pair<int, int>> stk; 
                    stk.push(make_pair(i, j)); 
                    while (!stk.empty()) {
                        auto [i, j] = stk.top(); 
                        stk.pop(); 
                        if (grid[i][j]) {
                            ++val; 
                            grid[i][j] = 0; 
                            for (auto& [di, dj] : dir) {
                                int ii = i + di, jj = j + dj; 
                                if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj] == 1) 
                                    stk.push(make_pair(ii, jj)); 
                            }
                        }
                    }
                    ans = max(ans, val); 
                }
            }
        }
        return ans; 
    }


    /*696. Count Binary Substrings (Easy)
	Give a string s, count the number of non-empty (contiguous) substrings that 
	have the same number of 0's and 1's, and all the 0's and all the 1's in 
	these substrings are grouped consecutively. Substrings that occur multiple 
	times are counted the number of times they occur.

	Example 1:
	Input: "00110011"
	Output: 6
	Explanation: There are 6 substrings that have equal number of consecutive 
	             1's and 0's: "0011", "01", "1100", "10", "0011", and "01". 
	             Notice that some of these substrings repeat and are counted 
	             the number of times they occur. Also, "00110011" is not a 
	             valid substring because all the 0's (and 1's) are not grouped 
	             together.

	Example 2:
	Input: "10101"
	Output: 4
	Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal 
	             number of consecutive 1's and 0's.
	
	Note:
	* s.length will be between 1 and 50,000.
	* s will only consist of "0" or "1" characters.*/

    int countBinarySubstrings(string s) {
        int ans = 0, prev = 0, curr = 0; 
        for (int i = 0; i < s.size(); ++i) {
            if (i && s[i-1] != s[i]) {
                prev = curr; 
                curr = 0; 
            }
            if (prev >= ++curr) ans += 1; 
        }
        return ans; 
    }


    /*697. Degree of an Array (Easy)
	Given a non-empty array of non-negative integers nums, the degree of this 
	array is defined as the maximum frequency of any one of its elements. Your 
	task is to find the smallest possible length of a (contiguous) subarray of 
	nums, that has the same degree as nums.

	Example 1:
	Input: nums = [1,2,2,3,1]
	Output: 2
	Explanation: 
	The input array has a degree of 2 because both elements 1 and 2 appear twice.
	Of the subarrays that have the same degree:
	[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
	The shortest length is 2. So return 2.

	Example 2:
	Input: nums = [1,2,2,3,1,4,2]
	Output: 6
	Explanation: 
	The degree is 3 because the element 2 is repeated 3 times.
	So [2,2,3,1,4,2] is the shortest subarray, therefore returning 6.

	Constraints:
	* nums.length will be between 1 and 50,000.
	* nums[i] will be an integer between 0 and 49,999.*/

    int findShortestSubArray(vector<int>& nums) {
        unordered_map<int, int> freq, seen; 
        int ans = INT_MAX, most = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            seen.insert({nums[i], i}); 
            if (most <= ++freq[nums[i]]) {
                if (most < freq[nums[i]]) ans = i - seen[nums[i]] + 1; 
                else ans = min(ans, i - seen[nums[i]] + 1); 
                most = freq[nums[i]]; 
            }
        }
        return ans; 
    }


    /*700. Search in a Binary Search Tree (Easy)
	You are given the root of a binary search tree (BST) and an integer val. 
	Find the node in the BST that the node's value equals val and return the 
	subtree rooted with that node. If such a node does not exist, return null.

	Example 1:
	Input: root = [4,2,7,1,3], val = 2
	Output: [2,1,3]

	Example 2:
	Input: root = [4,2,7,1,3], val = 5
	Output: []

	Constraints:
	* The number of nodes in the tree is in the range [1, 5000].
	* 1 <= Node.val <= 10^7
	* root is a binary search tree.
	* 1 <= val <= 10^7*/

    TreeNode* searchBST(TreeNode* root, int val) {
        while (root) {
            if (root->val == val) return root; 
            if (root->val < val) root = root->right; 
            else root = root->left; 
        }
        return NULL; 
    }


    /*709. To Lower Case (Easy)
	Implement function ToLowerCase() that has a string parameter str, and 
	returns the same string in lowercase.

	Example 1:
	Input: "Hello"
	Output: "hello"

	Example 2:
	Input: "here"
	Output: "here"

	Example 3:
	Input: "LOVELY"
	Output: "lovely"*/

    string toLowerCase(string s) {
        for (auto& c : s) 
            if (isupper(c)) c |= 32; 
        return s; 
    }


    /*717. 1-bit and 2-bit Characters (Easy)
	We have two special characters. The first character can be represented by 
	one bit 0. The second character can be represented by two bits (10 or 11).
	Now given a string represented by several bits. Return whether the last 
	character must be a one-bit character or not. The given string will always 
	end with a zero.

	Example 1:
	Input: bits = [1, 0, 0]
	Output: True
	Explanation: The only way to decode it is two-bit character and one-bit 
	             character. So the last character is one-bit character.
	
	Example 2:
	Input: bits = [1, 1, 1, 0]
	Output: False
	Explanation: The only way to decode it is two-bit character and two-bit 
	             character. So the last character is NOT one-bit character.
	
	Note:
	* 1 <= len(bits) <= 1000.
	* bits[i] is always 0 or 1.*/

    bool isOneBitCharacter(vector<int>& bits) {
        bool ans = false; 
        for (int i = 0; i < bits.size(); ++i) {
            if (bits[i]) {
                ++i; 
                ans = false; 
            } else {
                ans = true; 
            }
        }
        return ans; 
    }


    /*720. Longest Word in Dictionary (Easy)
	Given an array of strings words representing an English Dictionary, return 
	the longest word in words that can be built one character at a time by 
	other words in words. If there is more than one possible answer, return the 
	longest word with the smallest lexicographical order. If there is no answer, 
	return the empty string.

	Example 1:
	Input: words = ["w","wo","wor","worl","world"]
	Output: "world"
	Explanation: The word "world" can be built one character at a time by 
	             "w", "wo", "wor", and "worl".

	Example 2:
	Input: words = ["a","banana","app","appl","ap","apply","apple"]
	Output: "apple"
	Explanation: Both "apply" and "apple" can be built from other words in the 
	             dictionary. However, "apple" is lexicographically smaller than 
	             "apply".

	Constraints:
	* 1 <= words.length <= 1000
	* 1 <= words[i].length <= 30
	* words[i] consists of lowercase English letters.*/

    string longestWord(vector<string>& words) {
        sort(words.begin(), words.end()); 
        
        string ans; 
        unordered_set<string> seen = {""}; 
        for (int i = 0; i < words.size(); ++i) {
            int n = words[i].size(); 
            if (seen.count(words[i].substr(0, n-1))) {
                if (n > ans.size())
                    ans = words[i]; 
                seen.insert(words[i]); 
            }
        }
        return ans; 
    }


    /*724. Find Pivot Index (Easy)
	Given an array of integers nums, calculate the pivot index of this array. 
	The pivot index is the index where the sum of all the numbers strictly to 
	the left of the index is equal to the sum of all the numbers strictly to 
	the index's right. If the index is on the left edge of the array, then the 
	left sum is 0 because there are no elements to the left. This also applies 
	to the right edge of the array. Return the leftmost pivot index. If no such 
	index exists, return -1.

	Example 1:
	Input: nums = [1,7,3,6,5,6]
	Output: 3
	Explanation:
	The pivot index is 3.
	Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
	Right sum = nums[4] + nums[5] = 5 + 6 = 11

	Example 2:
	Input: nums = [1,2,3]
	Output: -1
	Explanation:
	There is no index that satisfies the conditions in the problem statement.

	Example 3:
	Input: nums = [2,1,-1]
	Output: 0
	Explanation:
	The pivot index is 0.
	Left sum = 0 (no elements to the left of index 0)
	Right sum = nums[1] + nums[2] = 1 + -1 = 0

	Constraints:
	* 1 <= nums.length <= 10^4
	* -1000 <= nums[i] <= 1000*/

    int pivotIndex(vector<int>& nums) {
        int prefix = 0, suffix = 0; 
        for (auto& x : nums) 
            suffix += x; 
        
        for (int i = 0; i < nums.size(); ++i) {
            suffix -= nums[i]; 
            if (prefix == suffix) return i; 
            prefix += nums[i]; 
        }
        return -1; 
    }


    /*728. Self Dividing Numbers (Easy)
	A self-dividing number is a number that is divisible by every digit it 
	contains. For example, 128 is a self-dividing number because 128 % 1 == 0, 
	128 % 2 == 0, and 128 % 8 == 0. Also, a self-dividing number is not allowed 
	to contain the digit zero. Given a lower and upper number bound, output a 
	list of every possible self dividing number, including the bounds if 
	possible.

	Example 1:
	Input: 
	left = 1, right = 22
	Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
	
	Note: The boundaries of each input argument are 1 <= left <= right <= 10000.*/

    vector<int> selfDividingNumbers(int left, int right) {
        vector<int> ans; 
        for (int x = left, n = 0; x <= right; ++x) {
            for (n = x; n; n /= 10) {
                if (n % 10 == 0 || x % (n%10) != 0) break; 
            }
            if (n == 0) ans.push_back(x); 
        }
        return ans; 
    }


    /*733. Flood Fill (Easy)
	An image is represented by a 2-D array of integers, each integer 
	representing the pixel value of the image (from 0 to 65535). Given a 
	coordinate (sr, sc) representing the starting pixel (row and column) of the 
	flood fill, and a pixel value newColor, "flood fill" the image. To perform 
	a "flood fill", consider the starting pixel, plus any pixels connected 4-
	directionally to the starting pixel of the same color as the starting pixel, 
	plus any pixels connected 4-directionally to those pixels (also with the 
	same color as the starting pixel), and so on. Replace the color of all of 
	the aforementioned pixels with the newColor. At the end, return the 
	modified image.

	Example 1:
	Input: image = [[1,1,1],[1,1,0],[1,0,1]]
	       sr = 1, sc = 1, newColor = 2
	Output: [[2,2,2],[2,2,0],[2,0,1]]
	Explanation: 
	From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
	by a path of the same color as the starting pixel are colored with the new color.
	Note the bottom corner is not colored 2, because it is not 4-directionally connected
	to the starting pixel.
	
	Note:
	* The length of image and image[0] will be in the range [1, 50].
	* The given starting pixel will satisfy 0 <= sr < image.length and 0 <= sc < image[0].length.
	* The value of each color in image[i][j] and newColor will be an integer in [0, 65535].*/

    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        if (image[sr][sc] != newColor) {
            int m = image.size(), n = image[0].size(), oldColor = image[sr][sc]; 
            stack<vector<int>> stk; 
            stk.push({sr, sc}); 

            while (!stk.empty()) {
                int i = stk.top()[0], j = stk.top()[1]; 
                stk.pop(); 
                for (auto& d : vector<vector<int>>{{-1, 0}, {0, -1}, {0, 1}, {1, 0}}) {
                    int ii = i + d[0], jj = j + d[1];
                    if (0 <= ii && ii < m && 0 <= jj && jj < n && image[ii][jj] == oldColor) {
                        stk.push({ii, jj}); 
                    }
                }
                image[i][j] = newColor; 
            }
        } 
        return image; 
    }


    /*744. Find Smallest Letter Greater Than Target (Easy)
	Given a list of sorted characters letters containing only lowercase 
	letters, and given a target letter target, find the smallest element in the 
	list that is larger than the given target. Letters also wrap around. For 
	example, if the target is target = 'z' and letters = ['a', 'b'], the answer 
	is 'a'.

	Examples:
	Input: letters = ["c", "f", "j"]
	       target = "a"
	Output: "c"

	Input: letters = ["c", "f", "j"]
	       target = "c"
	Output: "f"

	Input: letters = ["c", "f", "j"]
	       target = "d"
	Output: "f"

	Input: letters = ["c", "f", "j"]
	       target = "g"
	Output: "j"

	Input: letters = ["c", "f", "j"]
	       target = "j"
	Output: "c"

	Input: letters = ["c", "f", "j"]
	       target = "k"
	Output: "c"
	
	Note:
	* letters has a length in range [2, 10000].
	* letters consists of lowercase letters, and contains at least 2 unique 
	  letters.
	* target is a lowercase letter.*/

    char nextGreatestLetter(vector<char>& letters, char target) {
        int lo = 0, hi = letters.size(); 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (letters[mid] <= target) lo = mid + 1; 
            else hi = mid; 
        }
        return letters[lo % letters.size()]; 
    }


    /*762. Prime Number of Set Bits in Binary Representation (Easy)
	Given two integers L and R, find the count of numbers in the range [L, R] 
	(inclusive) having a prime number of set bits in their binary representation.
	(Recall that the number of set bits an integer has is the number of 1s 
	present when written in binary. For example, 21 written in binary is 10101 
	which has 3 set bits. Also, 1 is not a prime.)

	Example 1:
	Input: L = 6, R = 10
	Output: 4
	Explanation:
	6 -> 110 (2 set bits, 2 is prime)
	7 -> 111 (3 set bits, 3 is prime)
	9 -> 1001 (2 set bits , 2 is prime)
	10->1010 (2 set bits , 2 is prime)

	Example 2:
	Input: L = 10, R = 15
	Output: 5
	Explanation:
	10 -> 1010 (2 set bits, 2 is prime)
	11 -> 1011 (3 set bits, 3 is prime)
	12 -> 1100 (2 set bits, 2 is prime)
	13 -> 1101 (3 set bits, 3 is prime)
	14 -> 1110 (3 set bits, 3 is prime)
	15 -> 1111 (4 set bits, 4 is not prime)

	Note:
	* L, R will be integers L <= R in the range [1, 10^6].
	* R - L will be at most 10000.*/

    int countPrimeSetBits(int L, int R) {
        int ans = 0; 
        for (int x = L; x <= R; ++x) {
            int cnt = __builtin_popcount(x); 
            if (cnt > 1) {
                int d = 2;
                for (; d <= sqrt(cnt); ++d) {
                    if (cnt % d == 0) break; 
                }
                if (d > sqrt(cnt)) ++ans; 
            }
        }
        return ans; 
    }


    /*766. Toeplitz Matrix (Easy)
	Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, 
	return false. A matrix is Toeplitz if every diagonal from top-left to 
	bottom-right has the same elements.

	Example 1:
	Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
	Output: true
	Explanation: In the above grid, the diagonals are:
	"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
	In each diagonal all elements are the same, so the answer is True.

	Example 2:
	Input: matrix = [[1,2],[2,2]]
	Output: false
	Explanation: The diagonal "[1, 2]" has different elements.

	Constraints:
	* m == matrix.length
	* n == matrix[i].length
	* 1 <= m, n <= 20
	* 0 <= matrix[i][j] <= 99
 
	Follow up:
	* What if the matrix is stored on disk, and the memory is limited such that 
	  you can only load at most one row of the matrix into the memory at once?
	* What if the matrix is so large that you can only load up a partial row 
	  into the memory at once?*/

    bool isToeplitzMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(); 
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                if (matrix[i-1][j-1] != matrix[i][j]) return false; 
            }
        }
        return true; 
    }


    /*816. Ambiguous Coordinates (Medium)
	We had some 2-dimensional coordinates, like "(1, 3)" or "(2, 0.5)". Then, 
	we removed all commas, decimal points, and spaces, and ended up with the 
	string s. Return a list of strings representing all possibilities for what 
	our original coordinates could have been. Our original representation never 
	had extraneous zeroes, so we never started with numbers like "00", "0.0", 
	"0.00", "1.0", "001", "00.01", or any other number that can be represented 
	with less digits.  Also, a decimal point within a number never occurs 
	without at least one digit occuring before it, so we never started with 
	numbers like ".1". The final answer list can be returned in any order. Also 
	note that all coordinates in the final answer have exactly one space 
	between them (occurring after the comma.)

	Example 1:
	Input: s = "(123)"
	Output: ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"]
	
	Example 2:
	Input: s = "(00011)"
	Output:  ["(0.001, 1)", "(0, 0.011)"]
	Explanation: 0.0, 00, 0001 or 00.01 are not allowed.
	
	Example 3:
	Input: s = "(0123)"
	Output: ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)", "(0.12, 3)"]
	
	Example 4:
	Input: s = "(100)"
	Output: [(10, 0)]
	Explanation: 1.0 is not allowed.

	Note:
	* 4 <= s.length <= 12.
	* s[0] = "(", s[s.length - 1] = ")", and the other elements in s are digits.*/

    vector<string> ambiguousCoordinates(string s) {
                
        auto fn = [](string&& s) {
            vector<string> ans; 
            if (s.size() == 1) 
                ans.push_back(s); 
            else if (s.front() == '0' and s.back() == '0') ; 
            else if (s.front() == '0') 
                ans.push_back("0." + s.substr(1)); 
            else if (s.back() == '0') 
                ans.push_back(s); 
            else {
                for (int i = 1; i < s.size(); ++i)
                    ans.push_back(s.substr(0, i) + "." + s.substr(i)); 
                ans.push_back(s); 
            }
            return ans;
        };
        
        vector<string> ans; 
        for (int i = 2; i < s.size()-1; ++i) 
            for (auto& x : fn(s.substr(1, i-1))) 
                for (auto& y : fn(s.substr(i, s.size()-1-i))) 
                    ans.push_back("(" + x + ", " + y + ")"); 
        return ans; 
    }


    /*819. Most Common Word (Easy)
	Given a string paragraph and a string array of the banned words banned, 
	return the most frequent word that is not banned. It is guaranteed there is 
	at least one word that is not banned, and that the answer is unique. The 
	words in paragraph are case-insensitive and the answer should be returned 
	in lowercase.

	Example 1:
	Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
	Output: "ball"
	Explanation: 
	"hit" occurs 3 times, but it is a banned word.
	"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
	Note that words in the paragraph are not case sensitive,
	that punctuation is ignored (even if adjacent to words, such as "ball,"), 
	and that "hit" isn't the answer even though it occurs more because it is banned.

	Example 2:
	Input: paragraph = "a.", banned = []
	Output: "a"

	Constraints:
	* 1 <= paragraph.length <= 1000
	* paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
	* 0 <= banned.length <= 100
	* 1 <= banned[i].length <= 10
	* banned[i] consists of only lowercase English letters.*/

    string mostCommonWord(string paragraph, vector<string>& banned) {
        for (auto& c : paragraph) 
            c = isalpha(c) ? tolower(c) : ' '; 
        
        unordered_map<string, int> freq; 
        unordered_set<string> ss(banned.begin(), banned.end()); 
        
        int cnt = 0; 
        istringstream iss(paragraph); 
        string ans, word; 
        while (iss >> word) {
            if (ss.find(word) == ss.end()) {
                ++freq[word]; 
                if (cnt < freq[word]) {
                    ans = word; 
                    cnt = freq[word]; 
                }
            }
        }
        return ans; 
    }


    /*821. Shortest Distance to a Character (Easy)
	Given a string s and a character c that occurs in s, return an array of 
	integers answer where answer.length == s.length and answer[i] is the 
	distance from index i to the closest occurrence of character c in s. The 
	distance between two indices i and j is abs(i - j), where abs is the 
	absolute value function.

	Example 1:
	Input: s = "loveleetcode", c = "e"
	Output: [3,2,1,0,1,0,0,1,2,2,1,0]
	Explanation: The character 'e' appears at indices 3, 5, 6, and 11 (0-indexed).
	The closest occurrence of 'e' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.
	The closest occurrence of 'e' for index 1 is at index 3, so the distance is abs(1 - 3) = 3.
	For index 4, there is a tie between the 'e' at index 3 and the 'e' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.
	The closest occurrence of 'e' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.

	Example 2:
	Input: s = "aaab", c = "b"
	Output: [3,2,1,0]

	Constraints:
	* 1 <= s.length <= 10^4
	* s[i] and c are lowercase English letters.
	* It is guaranteed that c occurs at least once in s.*/

    vector<int> shortestToChar(string s, char c) {
        vector<int> loc; 
        for (int i = 0; i < s.size(); ++i)
            if (s[i] == c) loc.push_back(i); 
        
        vector<int> ans; 
        int k = 0; 
        for (int i = 0; i < s.size(); ++i) {
            if (k+1 < loc.size() && abs(loc[k+1]-i) < abs(loc[k]-i)) ++k; 
            ans.push_back(abs(loc[k]-i));
        }
        return ans; 
    }


    /*824. Goat Latin (Easy)
	A sentence S is given, composed of words separated by spaces. Each word 
	consists of lowercase and uppercase letters only. We would like to convert 
	the sentence to "Goat Latin" (a made-up language similar to Pig Latin.)

	The rules of Goat Latin are as follows:
	* If a word begins with a vowel (a, e, i, o, or u), append "ma" to the end 
	  of the word. For example, the word 'apple' becomes 'applema'.
	* If a word begins with a consonant (i.e. not a vowel), remove the first 
	  letter and append it to the end, then add "ma". For example, the word 
	  "goat" becomes "oatgma".
	* Add one letter 'a' to the end of each word per its word index in the 
	  sentence, starting with 1. For example, the first word gets "a" added to 
	  the end, the second word gets "aa" added to the end and so on.
	Return the final sentence representing the conversion from S to Goat Latin. 

	Example 1:
	Input: "I speak Goat Latin"
	Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"

	Example 2:
	Input: "The quick brown fox jumped over the lazy dog"
	Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"

	Notes:
	* S contains only uppercase, lowercase and spaces. Exactly one space between each word.
	* 1 <= S.length <= 150.*/

    string toGoatLatin(string S) {
        string ans, word, vowels = "aeiouAEIOU", suffix; 
        istringstream iss(S); 
        ostringstream oss; 
        
        while (iss >> word) {
            suffix.push_back('a'); 
            if (vowels.find(word[0]) == string::npos) 
                word = word.substr(1) + word[0]; 
            oss << " " << word << "ma" << suffix; 
        }
        return oss.str().substr(1); 
    }


    /*830. Positions of Large Groups (Easy)
	In a string s of lowercase letters, these letters form consecutive groups 
	of the same character. For example, a string like s = "abbxxxxzyy" has the 
	groups "a", "bb", "xxxx", "z", and "yy". A group is identified by an 
	interval [start, end], where start and end denote the start and end indices 
	(inclusive) of the group. In the above example, "xxxx" has the interval 
	[3,6]. A group is considered large if it has 3 or more characters. Return 
	the intervals of every large group sorted in increasing order by start index.

	Example 1:
	Input: s = "abbxxxxzzy"
	Output: [[3,6]]
	Explanation: "xxxx" is the only large group with start index 3 and end index 6.

	Example 2:
	Input: s = "abc"
	Output: []
	Explanation: We have groups "a", "b", and "c", none of which are large groups.

	Example 3:
	Input: s = "abcdddeeeeaabbbcd"
	Output: [[3,5],[6,9],[12,14]]
	Explanation: The large groups are "ddd", "eeee", and "bbb".

	Example 4:
	Input: s = "aba"
	Output: []

	Constraints:
	* 1 <= s.length <= 1000
	* s contains lower-case English letters only.*/

    vector<vector<int>> largeGroupPositions(string s) {
        vector<vector<int>> ans; 
        for (int i = 0, ii = 0; i <= s.size(); ++i) {
            if (i == s.size() || (i > 0 && s[i-1] != s[i])) {
                if (i - ii >= 3) 
                    ans.push_back({ii, i-1}); 
                ii = i; 
            }
        }
        return ans; 
    }


    /*832. Flipping an Image (Easy)
	Given an n x n binary matrix image, flip the image horizontally, then 
	invert it, and return the resulting image. To flip an image horizontally 
	means that each row of the image is reversed. For example, flipping 
	[1,1,0] horizontally results in [0,1,1]. To invert an image means that 
	each 0 is replaced by 1, and each 1 is replaced by 0. For example, 
	inverting [0,1,1] results in [1,0,0].

	Example 1:
	Input: image = [[1,1,0],[1,0,1],[0,0,0]]
	Output: [[1,0,0],[0,1,0],[1,1,1]]
	Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
	Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]

	Example 2:
	Input: image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
	Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
	Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
	Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]

	Constraints:
	* n == image.length
	* n == image[i].length
	* 1 <= n <= 20
	* images[i][j] is either 0 or 1.*/

    vector<vector<int>> flipAndInvertImage(vector<vector<int>>& image) {
        for (auto& row : image) {
            reverse(row.begin(), row.end()); 
            for (auto& x : row) 
                x ^= 1; 
        }
        return image; 
    }


    /*836. Rectangle Overlap (Easy)
	An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], where 
	(x1, y1) is the coordinate of its bottom-left corner, and (x2, y2) is the 
	coordinate of its top-right corner. Its top and bottom edges are parallel 
	to the X-axis, and its left and right edges are parallel to the Y-axis. 
	Two rectangles overlap if the area of their intersection is positive. To be 
	clear, two rectangles that only touch at the corner or edges do not overlap.
	Given two axis-aligned rectangles rec1 and rec2, return true if they 
	overlap, otherwise return false.

	Example 1:
	Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
	Output: true

	Example 2:
	Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
	Output: false

	Example 3:
	Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
	Output: false

	Constraints:
	* rect1.length == 4
	* rect2.length == 4
	* -10^9 <= rec1[i], rec2[i] <= 10^9
	* rec1[0] <= rec1[2] and rec1[1] <= rec1[3]
	* rec2[0] <= rec2[2] and rec2[1] <= rec2[3]*/

    bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {
        return max(rec1[0], rec2[0]) < min(rec1[2], rec2[2]) && max(rec1[1], rec2[1]) < min(rec1[3], rec2[3]);
    }


    /*852. Peak Index in a Mountain Array (Easy)
	Let's call an array arr a mountain if the following properties hold:
	* arr.length >= 3
	* There exists some i with 0 < i < arr.length - 1 such that:
	  + arr[0] < arr[1] < ... arr[i-1] < arr[i]
	  + arr[i] > arr[i+1] > ... > arr[arr.length - 1]
	Given an integer array arr that is guaranteed to be a mountain, return any 
	i such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > 
	arr[arr.length - 1].

	Example 1:
	Input: arr = [0,1,0]
	Output: 1

	Example 2:
	Input: arr = [0,2,1,0]
	Output: 1

	Example 3:
	Input: arr = [0,10,5,2]
	Output: 1

	Example 4:
	Input: arr = [3,4,5,1]
	Output: 2

	Example 5:
	Input: arr = [24,69,100,99,79,78,67,36,26,19]
	Output: 2

	Constraints:
	* 3 <= arr.length <= 10^4
	* 0 <= arr[i] <= 10^6
	* arr is guaranteed to be a mountain array.

	Follow up: Finding the O(n) is straightforward, could you find an O(log(n)) 
	           solution?*/

    int peakIndexInMountainArray(vector<int>& arr) {
        int i = 0; 
        for (; arr[i] < arr[i+1]; ++i) {}
        return i; 
    }


    /*859. Buddy Strings (Easy)
	Given two strings a and b, return true if you can swap two letters in a so 
	the result is equal to b, otherwise, return false. Swapping letters is 
	defined as taking two indices i and j (0-indexed) such that i != j and 
	swapping the characters at a[i] and a[j]. For example, swapping at indices 
	0 and 2 in "abcd" results in "cbad".

	Example 1:
	Input: a = "ab", b = "ba"
	Output: true
	Explanation: You can swap a[0] = 'a' and a[1] = 'b' to get "ba", which is 
	             equal to b.

	Example 2:
	Input: a = "ab", b = "ab"
	Output: false
	Explanation: The only letters you can swap are a[0] = 'a' and a[1] = 'b', 
	             which results in "ba" != b.

	Example 3:
	Input: a = "aa", b = "aa"
	Output: true
	Explanation: You can swap a[0] = 'a' and a[1] = 'a' to get "aa", which is 
	             equal to b.
	
	Example 4:
	Input: a = "aaaaaaabc", b = "aaaaaaacb"
	Output: true

	Constraints:
	* 1 <= a.length, b.length <= 2 * 104
	* a and b consist of lowercase letters.*/

    bool buddyStrings(string a, string b) {
        if (a.size() != b.size()) return false; 
        
        int most = 0; 
        vector<int> loc; 
        unordered_map<char, int> freq; 
        
        for (int i = 0; i < a.size(); ++i) {
            most = max(most, ++freq[a[i]]); 
            if (a[i] != b[i]) loc.push_back(i); 
        }
        if (loc.size() == 0) return most > 1; 
        if (loc.size() == 2) return a[loc[0]] == b[loc[1]] && a[loc[1]] == b[loc[0]]; 
        return false; 
    }


    /*860. Lemonade Change (Easy)
	At a lemonade stand, each lemonade costs $5. Customers are standing in a 
	queue to buy from you, and order one at a time (in the order specified by 
	bills). Each customer will only buy one lemonade and pay with either a $5, 
	$10, or $20 bill.  You must provide the correct change to each customer, 
	so that the net transaction is that the customer pays $5. Note that you 
	don't have any change in hand at first. Return true if and only if you can 
	provide every customer with correct change.

	Example 1:
	Input: [5,5,5,10,20]
	Output: true
	Explanation: 
	From the first 3 customers, we collect three $5 bills in order.
	From the fourth customer, we collect a $10 bill and give back a $5.
	From the fifth customer, we give a $10 bill and a $5 bill.
	Since all customers got correct change, we output true.

	Example 2:
	Input: [5,5,10]
	Output: true

	Example 3:
	Input: [10,10]
	Output: false

	Example 4:
	Input: [5,5,10,10,20]
	Output: false
	Explanation: 
	From the first two customers in order, we collect two $5 bills.
	For the next two customers in order, we collect a $10 bill and give back a $5 bill.
	For the last customer, we can't give change of $15 back because we only have two $10 bills.
	Since not every customer received correct change, the answer is false.

	Note:
	* 0 <= bills.length <= 10000
	* bills[i] will be either 5, 10, or 20.*/

    bool lemonadeChange(vector<int>& bills) {
        int x05 = 0, x10 = 0; 
        for (auto bill : bills) {
            if (bill == 5) ++x05; 
            else if (bill == 10) --x05, ++x10; 
            else if (x10 > 0) --x05, --x10; 
            else x05 -= 3; 
            if (x05 < 0) return false; 
        }
        return true; 
    }


    /*867. Transpose Matrix (Easy)
	Given a 2D integer array matrix, return the transpose of matrix. The 
	transpose of a matrix is the matrix flipped over its main diagonal, 
	switching the matrix's row and column indices.

	Example 1:
	Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
	Output: [[1,4,7],[2,5,8],[3,6,9]]

	Example 2:
	Input: matrix = [[1,2,3],[4,5,6]]
	Output: [[1,4],[2,5],[3,6]]

	Constraints:
	* m == matrix.length
	* n == matrix[i].length
	* 1 <= m, n <= 1000
	* 1 <= m * n <= 10^5
	* -10^9 <= matrix[i][j] <= 10^9*/

    vector<vector<int>> transpose(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(); 
        vector<vector<int>> ans(n, vector<int>(m, 0)); 
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                ans[j][i] = matrix[i][j]; 
            }
        }
        return ans; 
    }


    /*868. Binary Gap (Easy)
	Given a positive integer n, find and return the longest distance between 
	any two adjacent 1's in the binary representation of n. If there are no two 
	adjacent 1's, return 0. Two 1's are adjacent if there are only 0's 
	separating them (possibly no 0's). The distance between two 1's is the 
	absolute difference between their bit positions. For example, the two 1's 
	in "1001" have a distance of 3.

	Example 1:
	Input: n = 22
	Output: 2
	Explanation: 22 in binary is "10110".
	             The first adjacent pair of 1's is "10110" with a distance of 2.
	             The second adjacent pair of 1's is "10110" with a distance of 1.
	             The answer is the largest of these two distances, which is 2.
	             Note that "10110" is not a valid pair since there is a 1 
	             separating the two 1's underlined.

	Example 2:
	Input: n = 5
	Output: 2
	Explanation: 5 in binary is "101".

	Example 3:
	Input: n = 6
	Output: 1
	Explanation: 6 in binary is "110".

	Example 4:
	Input: n = 8
	Output: 0
	Explanation: 8 in binary is "1000". There aren't any adjacent pairs of 1's 
	             in the binary representation of 8, so we return 0.

	Example 5:
	Input: n = 1
	Output: 0

	Constraints: 1 <= n <= 10^9*/

    int binaryGap(int n) {
        int ans = 0; 
        for (int cnt = -1; n; n /= 2) {
            int x = n % 2; 
            if (x == 1) {
                ans = max(ans, cnt); 
                cnt = 0; 
            }
            if (cnt >= 0) ++cnt; 
        }
        return ans; 
    }


    /*872. Leaf-Similar Trees (Easy)
	Consider all the leaves of a binary tree, from left to right order, the 
	values of those leaves form a leaf value sequence. For example, in the 
	given tree above, the leaf value sequence is (6, 7, 4, 9, 8). Two binary 
	trees are considered leaf-similar if their leaf value sequence is the same.
	Return true if and only if the two given trees with head nodes root1 and 
	root2 are leaf-similar.

	Example 1:
	Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], 
	       root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
	Output: true
	
	Example 2:
	Input: root1 = [1], root2 = [1]
	Output: true

	Example 3:
	Input: root1 = [1], root2 = [2]
	Output: false

	Example 4:
	Input: root1 = [1,2], root2 = [2,2]
	Output: true

	Example 5:
	Input: root1 = [1,2,3], root2 = [1,3,2]
	Output: false

	Constraints:
	* The number of nodes in each tree will be in the range [1, 200].
	* Both of the given trees will have values in the range [0, 200].*/

    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        
        function<void(TreeNode*, vector<int>&)> dfs = [&dfs](TreeNode* node, vector<int>& vec) {
            if (node->left == NULL && node->right == NULL) vec.push_back(node->val); 
            if (node->left) dfs(node->left, vec); 
            if (node->right) dfs(node->right, vec); 
        };
        
        vector<int> vec1, vec2; 
        dfs(root1, vec1); 
        dfs(root2, vec2); 
        return vec1 == vec2; 
    }


    /*874. Walking Robot Simulation (Easy)
	A robot on an infinite XY-plane starts at point (0, 0) and faces north. The 
	robot can receive one of three possible types of commands:
	* -2: turn left 90 degrees,
	* -1: turn right 90 degrees, or
	* 1 <= k <= 9: move forward k units.
	Some of the grid squares are obstacles. The ith obstacle is at grid point 
	obstacles[i] = (xi, yi). If the robot would try to move onto them, the robot 
	stays on the previous grid square instead (but still continues following the 
	rest of the route.) Return the maximum Euclidean distance that the robot will 
	be from the origin squared (i.e. if the distance is 5, return 25).

	Note:
	North means +Y direction.
	East means +X direction.
	South means -Y direction.
	West means -X direction.

	Example 1:
	Input: commands = [4,-1,3], obstacles = []
	Output: 25
	Explanation: The robot starts at (0, 0):
	1. Move north 4 units to (0, 4).
	2. Turn right.
	3. Move east 3 units to (3, 4).
	The furthest point away from the origin is (3, 4), which is 32 + 42 = 25 units away.

	Example 2:
	Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
	Output: 65
	Explanation: The robot starts at (0, 0):
	1. Move north 4 units to (0, 4).
	2. Turn right.
	3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
	4. Turn left.
	5. Move north 4 units to (1, 8).
	The furthest point away from the origin is (1, 8), which is 12 + 82 = 65 units away.

	Constraints:
	* 1 <= commands.length <= 10^4
	* commands[i] is one of the values in the list [-2,-1,1,2,3,4,5,6,7,8,9].
	* 0 <= obstacles.length <= 10^4
	* -3 * 10^4 <= xi, yi <= 3 * 10^4
	* The answer is guaranteed to be less than 2^31.*/

    int robotSim(vector<int>& commands, vector<vector<int>>& obstacles) {
        struct myhash {
            size_t operator()(const pair<int, int> &x) const {
                return (97 * x.first + x.second) + (x.first ^ x.second); 
            } 
        };
        
        unordered_set<pair<int, int>, myhash> seen; 
        for (auto obstacle : obstacles) {
            seen.insert(make_pair(obstacle[0], obstacle[1])); 
        }
        
        int ans = 0, x = 0, y = 0, dx = 0, dy = 1; 
        for (auto command : commands) {
            if (command == -2) {
                dy *= -1; 
                swap(dx, dy); 
            } else if (command == -1) {
                dx *= -1; 
                swap(dx, dy); 
            } else {
                for (; command; --command) {
                    if (seen.find(make_pair(x+dx, y+dy)) == seen.end()) {
                        x += dx; 
                        y += dy; 
                    } else break; 
                }
            }
            ans = max(ans, x*x + y*y);
        }
        return ans; 
    }


    /*876. Middle of the Linked List (Easy)
	Given a non-empty, singly linked list with head node head, return a middle 
	node of linked list. If there are two middle nodes, return the second 
	middle node.

	Example 1:
	Input: [1,2,3,4,5]
	Output: Node 3 from this list (Serialization: [3,4,5])
	The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
	Note that we returned a ListNode object ans, such that:
	ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.

	Example 2:
	Input: [1,2,3,4,5,6]
	Output: Node 4 from this list (Serialization: [4,5,6])
	Since the list has two middle nodes with values 3 and 4, we return the second one.

	Note: The number of nodes in the given list will be between 1 and 100.*/

    ListNode* middleNode(ListNode* head) {
        ListNode *fast = head, *slow = head; 
        while (fast && fast->next) {
            fast = fast->next->next; 
            slow = slow->next; 
        }
        return slow; 
    }


    /*883. Projection Area of 3D Shapes (Easy)
	You are given an n x n grid where we place some 1 x 1 x 1 cubes that are 
	axis-aligned with the x, y, and z axes. Each value v = grid[i][j] 
	represents a tower of v cubes placed on top of the cell (i, j). We view the 
	projection of these cubes onto the xy, yz, and zx planes. A projection is 
	like a shadow, that maps our 3-dimensional figure to a 2-dimensional plane. 
	We are viewing the "shadow" when looking at the cubes from the top, the 
	front, and the side. Return the total area of all three projections.

	Example 1:
	Input: grid = [[1,2],[3,4]]
	Output: 17
	Explanation: Here are the three projections ("shadows") of the shape made 
	             with each axis-aligned plane.

	Example 2:
	Input: grid = [[2]]
	Output: 5
	
	Example 3:
	Input: grid = [[1,0],[0,2]]
	Output: 8

	Example 4:
	Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
	Output: 14

	Example 5:
	Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
	Output: 21

	Constraints:
	* n == grid.length
	* n == grid[i].length
	* 1 <= n <= 50
	* 0 <= grid[i][j] <= 50*/

    int projectionArea(vector<vector<int>>& grid) {
        int n = grid.size(), ans = 0; 
        for (int i = 0; i < n; ++i) {
            int cmx = 0, rmx = 0; 
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] > 0) ++ans; 
                cmx = max(cmx, grid[j][i]); 
                rmx = max(rmx, grid[i][j]); 
            }
            ans += cmx + rmx; 
        }
        return ans; 
    }


    /*884. Uncommon Words from Two Sentences (Easy)
	We are given two sentences A and B.  (A sentence is a string of space 
	separated words.  Each word consists only of lowercase letters.) A word is 
	uncommon if it appears exactly once in one of the sentences, and does not 
	appear in the other sentence. Return a list of all uncommon words. You may 
	return the list in any order.

	Example 1:
	Input: A = "this apple is sweet", B = "this apple is sour"
	Output: ["sweet","sour"]

	Example 2:
	Input: A = "apple apple", B = "banana"
	Output: ["banana"]

	Note:
	* 0 <= A.length <= 200
	* 0 <= B.length <= 200
	* A and B both contain only spaces and lowercase letters.*/

    vector<string> uncommonFromSentences(string A, string B) {
        istringstream iss(A + " " + B); 
        unordered_map<string, int> freq; 
        string word; 
        while (iss >> word) ++freq[word]; 
        
        vector<string> ans; 
        for (auto x : freq) {
            if (x.second == 1) ans.push_back(x.first); 
        }
        return ans; 
    }


    /*888. Fair Candy Swap (Easy)
	Alice and Bob have candy bars of different sizes: A[i] is the size of the 
	i-th bar of candy that Alice has, and B[j] is the size of the j-th bar of 
	candy that Bob has. Since they are friends, they would like to exchange one 
	candy bar each so that after the exchange, they both have the same total 
	amount of candy.  (The total amount of candy a person has is the sum of the 
	sizes of candy bars they have.) Return an integer array ans where ans[0] is 
	the size of the candy bar that Alice must exchange, and ans[1] is the size 
	of the candy bar that Bob must exchange. If there are multiple answers, you 
	may return any one of them.  It is guaranteed an answer exists.

	Example 1:
	Input: A = [1,1], B = [2,2]
	Output: [1,2]

	Example 2:
	Input: A = [1,2], B = [2,3]
	Output: [1,2]
	
	Example 3:
	Input: A = [2], B = [1,3]
	Output: [2,3]

	Example 4:
	Input: A = [1,2,5], B = [2,4]
	Output: [5,4]

	Note:
	* 1 <= A.length <= 10000
	* 1 <= B.length <= 10000
	* 1 <= A[i] <= 100000
	* 1 <= B[i] <= 100000
	* It is guaranteed that Alice and Bob have different total amounts of candy.
	* It is guaranteed there exists an answer.*/

    vector<int> fairCandySwap(vector<int>& A, vector<int>& B) {
        int diff = accumulate(A.begin(), A.end(), 0) - accumulate(B.begin(), B.end(), 0); 
        unordered_set<int> seen(A.begin(), A.end()); 
        for (auto x : B) {
            if (seen.find(x + diff/2) != seen.end()) {
                return {x + diff/2, x}; 
            }
        }
        return {}; 
    }


    /*890. Find and Replace Pattern (Medium)
	Given a list of strings words and a string pattern, return a list of words[i] 
	that match pattern. You may return the answer in any order. A word matches 
	the pattern if there exists a permutation of letters p so that after 
	replacing every letter x in the pattern with p(x), we get the desired word.
	Recall that a permutation of letters is a bijection from letters to letters: 
	every letter maps to another letter, and no two letters map to the same 
	letter.

	Example 1:
	Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
	Output: ["mee","aqq"]
	Explanation: "mee" matches the pattern because there is a permutation 
	             {a -> m, b -> e, ...}. "ccc" does not match the pattern 
	             because {a -> c, b -> c, ...} is not a permutation, since a 
	             and b map to the same letter.

	Example 2:
	Input: words = ["a","b","c"], pattern = "a"
	Output: ["a","b","c"]

	Constraints:
	* 1 <= pattern.length <= 20
	* 1 <= words.length <= 50
	* words[i].length == pattern.length
	* pattern and words[i] are lowercase English letters.*/

    vector<string> findAndReplacePattern(vector<string>& words, string pattern) {
        vector<string> ans; 
        for (auto& word : words) {
            bool flag = true; 
            unordered_map<char, char> mpw, mpp; 
            for (int i = 0; i < size(word); ++i) {
                if (mpw[word[i]] != mpp[pattern[i]]) {
                    flag = false; 
                    break; 
                }
                mpw[word[i]] = mpp[pattern[i]] = i+1; 
            }
            if (flag) ans.push_back(word); 
        }
        return ans; 
    }


    /*892. Surface Area of 3D Shapes (Easy)
	You are given an n x n grid where you have placed some 1 x 1 x 1 cubes. 
	Each value v = grid[i][j] represents a tower of v cubes placed on top of 
	cell (i, j). After placing these cubes, you have decided to glue any 
	directly adjacent cubes to each other, forming several irregular 3D shapes.
	Return the total surface area of the resulting shapes. Note: The bottom 
	face of each shape counts toward its surface area.

	Example 1:
	Input: grid = [[2]]
	Output: 10

	Example 2:
	Input: grid = [[1,2],[3,4]]
	Output: 34

	Example 3:
	Input: grid = [[1,0],[0,2]]
	Output: 16

	Example 4:
	Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
	Output: 32

	Example 5:
	Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
	Output: 46

	Constraints:
	* n == grid.length
	* n == grid[i].length
	* 1 <= n <= 50
	* 0 <= grid[i][j] <= 50*/

    int surfaceArea(vector<vector<int>>& grid) {
        int ans = 0, n = grid.size(); 
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j]) {
                    ans += 4*grid[i][j] + 2; 
                    if (i) ans -= 2*min(grid[i][j], grid[i-1][j]); 
                    if (j) ans -= 2*min(grid[i][j], grid[i][j-1]); 
                }
            }
        }
        return ans; 
    }


    /*893. Groups of Special-Equivalent Strings (Easy)
	You are given an array A of strings. A move onto S consists of swapping any 
	two even indexed characters of S, or any two odd indexed characters of S. 
	Two strings S and T are special-equivalent if after any number of moves 
	onto S, S == T. For example, S = "zzxy" and T = "xyzz" are special-
	equivalent because we may make the moves "zzxy" -> "xzzy" -> "xyzz" that 
	swap S[0] and S[2], then S[1] and S[3]. Now, a group of special-equivalent 
	strings from A is a non-empty subset of A such that:
	1) Every pair of strings in the group are special equivalent, and;
	2) The group is the largest size possible (ie., there isn't a string S not 
	   in the group such that S is special equivalent to every string in the 
	   group)
	Return the number of groups of special-equivalent strings from A.
	 
	Example 1:
	Input: ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
	Output: 3
	Explanation: One group is ["abcd", "cdab", "cbad"], since they are all 
	             pairwise special equivalent, and none of the other strings are 
	             all pairwise special equivalent to these. The other two groups 
	             are ["xyzz", "zzxy"] and ["zzyx"].  Note that in particular, 
	             "zzxy" is not special equivalent to "zzyx".
	
	Example 2:
	Input: ["abc","acb","bac","bca","cab","cba"]
	Output: 3

	Note:
	* 1 <= A.length <= 1000
	* 1 <= A[i].length <= 20
	* All A[i] have the same length.
	* All A[i] consist of only lowercase letters.*/

    int numSpecialEquivGroups(vector<string>& A) {
        unordered_set<string> seen; 
        for (auto word : A) {
            string even, odd; 
            for (int i = 0; i < word.size(); ++i) {
                if (i&1) odd.push_back(word[i]); 
                else even.push_back(word[i]); 
            }
            sort(even.begin(), even.end()); 
            sort(odd.begin(), odd.end()); 
            seen.insert(even+odd); 
        }
        return seen.size(); 
    }


    /*896. Monotonic Array (Easy)
	An array is monotonic if it is either monotone increasing or monotone 
	decreasing. An array A is monotone increasing if for all i <= j, A[i] <= A[j].  
	An array A is monotone decreasing if for all i <= j, A[i] >= A[j]. Return 
	true if and only if the given array A is monotonic.

	Example 1:
	Input: [1,2,2,3]
	Output: true

	Example 2:
	Input: [6,5,4,4]
	Output: true

	Example 3:
	Input: [1,3,2]
	Output: false

	Example 4:
	Input: [1,2,4,5]
	Output: true

	Example 5:
	Input: [1,1,1]
	Output: true

	Note:
	* 1 <= A.length <= 50000
	* -100000 <= A[i] <= 100000*/

    bool isMonotonic(vector<int>& A) {
        bool increase = true, decrease = true; 
        for (int i = 1; i < A.size(); ++i) {
            if (A[i-1] < A[i]) decrease = false; 
            if (A[i-1] > A[i]) increase = false; 
        }
        return increase || decrease; 
    }


    /*897. Increasing Order Search Tree (Easy)
	Given the root of a binary search tree, rearrange the tree in in-order so 
	that the leftmost node in the tree is now the root of the tree, and every 
	node has no left child and only one right child.

	Example 1:
	Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
	Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]

	Example 2:
	Input: root = [5,1,7]
	Output: [1,null,5,null,7]

	Constraints:
	* The number of nodes in the given tree will be in the range [1, 100].
	* 0 <= Node.val <= 1000*/

    TreeNode* increasingBST(TreeNode* root) {
        stack<TreeNode*> stk;
        TreeNode *node = root, *prev = NULL, *head = NULL; 
        
        while (stk.size() || node) {
            if (node) {
                stk.push(node); 
                node = node->left; 
            } else {
                node = stk.top(); 
                stk.pop(); 
                if (prev == NULL) {
                    head = prev = node; 
                } else {
                    prev = prev->right = node; 
                }
                node->left = NULL; 
                node = node->right; 
            }
        }
        return head; 
    }


    /*905. Sort Array By Parity (Easy)
	Given an array A of non-negative integers, return an array consisting of 
	all the even elements of A, followed by all the odd elements of A. You may 
	return any answer array that satisfies this condition.

	Example 1:
	Input: [3,1,2,4]
	Output: [2,4,3,1]
	The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

	Note:
	* 1 <= A.length <= 5000
	* 0 <= A[i] <= 5000*/

    vector<int> sortArrayByParity(vector<int>& A) {
        sort(A.begin(), A.end(), [](int i, int j){return (i&1) < (j&1);});
        return A; 
    }


    /*908. Smallest Range I (Easy)
	Given an array A of integers, for each integer A[i] we may choose any x 
	with -K <= x <= K, and add x to A[i]. After this process, we have some 
	array B. Return the smallest possible difference between the maximum value 
	of B and the minimum value of B.

	Example 1:
	Input: A = [1], K = 0
	Output: 0
	Explanation: B = [1]

	Example 2:
	Input: A = [0,10], K = 2
	Output: 6
	Explanation: B = [2,8]

	Example 3:
	Input: A = [1,3,6], K = 3
	Output: 0
	Explanation: B = [3,3,3] or B = [4,4,4]

	Note:
	* 1 <= A.length <= 10000
	* 0 <= A[i] <= 10000
	* 0 <= K <= 10000*/

    int smallestRangeI(vector<int>& A, int K) {
        int mn = *min_element(A.begin(), A.end());
        int mx = *max_element(A.begin(), A.end()); 
        return max(0, mx - mn - 2*K); 
    }


    /*914. X of a Kind in a Deck of Cards (Easy)
	In a deck of cards, each card has an integer written on it. Return true if 
	and only if you can choose X >= 2 such that it is possible to split the 
	entire deck into 1 or more groups of cards, where:
	* Each group has exactly X cards.
	* All the cards in each group have the same integer.

	Example 1:
	Input: deck = [1,2,3,4,4,3,2,1]
	Output: true
	Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].

	Example 2:
	Input: deck = [1,1,1,2,2,2,3,3]
	Output: false
	Explanation: No possible partition.

	Example 3:
	Input: deck = [1]
	Output: false
	Explanation: No possible partition.

	Example 4:
	Input: deck = [1,1]
	Output: true
	Explanation: Possible partition [1,1].

	Example 5:
	Input: deck = [1,1,2,2,2,2]
	Output: true
	Explanation: Possible partition [1,1],[2,2],[2,2].

	Constraints:
	* 1 <= deck.length <= 10^4
	* 0 <= deck[i] < 10^4*/

    bool hasGroupsSizeX(vector<int>& deck) {
        unordered_map<int, int> freq; 
        for (auto x : deck) ++freq[x]; 
        
        int ans = 0; 
        for (auto x : freq) 
            ans = gcd(ans, x.second);
        return ans >= 2; 
    }


    /*917. Reverse Only Letters (Easy)
	Given a string S, return the "reversed" string where all characters that 
	are not a letter stay in the same place, and all letters reverse their 
	positions.

	Example 1:
	Input: "ab-cd"
	Output: "dc-ba"

	Example 2:
	Input: "a-bC-dEf-ghIj"
	Output: "j-Ih-gfE-dCba"

	Example 3:
	Input: "Test1ng-Leet=code-Q!"
	Output: "Qedo1ct-eeLg=ntse-T!"

	Note:
	* S.length <= 100
	* 33 <= S[i].ASCIIcode <= 122 
	* S doesn't contain \ or "*/

    string reverseOnlyLetters(string S) {
        for (int lo = 0, hi = S.size() - 1; lo < hi; ) {
            if (!isalpha(S[lo])) ++lo; 
            else if (!isalpha(S[hi])) --hi; 
            else swap(S[lo++], S[hi--]);
        }
        return S; 
    }


    /*922. Sort Array By Parity II (Easy)
	Given an array of integers nums, half of the integers in nums are odd, and 
	the other half are even. Sort the array so that whenever nums[i] is odd, i 
	is odd, and whenever nums[i] is even, i is even. Return any answer array 
	that satisfies this condition.

	Example 1:
	Input: nums = [4,2,5,7]
	Output: [4,5,2,7]
	Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.

	Example 2:
	Input: nums = [2,3]
	Output: [2,3]

	Constraints:
	* 2 <= nums.length <= 2 * 10^4
	* nums.length is even.
	* Half of the integers in nums are even.
	* 0 <= nums[i] <= 1000

	Follow Up: Could you solve it in-place?*/

    vector<int> sortArrayByParityII(vector<int>& nums) {
        for (int i = 0, j = 1; i < nums.size() && j < nums.size(); ) {
            if (!(nums[i]&1)) i += 2; 
            else if (nums[j]&1) j += 2; 
            else {
                swap(nums[i], nums[j]); 
                i += 2; 
                j += 2; 
            }
        }
        return nums; 
    }


    /*925. Long Pressed Name (Easy)
	Your friend is typing his name into a keyboard. Sometimes, when typing a 
	character c, the key might get long pressed, and the character will be 
	typed 1 or more times. You examine the typed characters of the keyboard. 
	Return True if it is possible that it was your friends name, with some 
	characters (possibly none) being long pressed.

	Example 1:
	Input: name = "alex", typed = "aaleex"
	Output: true
	Explanation: 'a' and 'e' in 'alex' were long pressed.

	Example 2:
	Input: name = "saeed", typed = "ssaaedd"
	Output: false
	Explanation: 'e' must have been pressed twice, but it wasn't in the typed output.

	Example 3:
	Input: name = "leelee", typed = "lleeelee"
	Output: true

	Example 4:
	Input: name = "laiden", typed = "laiden"
	Output: true
	Explanation: It's not necessary to long press any character.

	Constraints:
	* 1 <= name.length <= 1000
	* 1 <= typed.length <= 1000
	* name and typed contain only lowercase English letters.*/

    bool isLongPressedName(string name, string typed) {
        int i = 0; 
        for (int j = 0; j < typed.size(); ++j) {
            if (i < name.size() && name[i] == typed[j]) ++i; 
            else if (i == 0 || name[i-1] != typed[j]) return false; 
        }
        return i == name.size(); 
    }


    /*929. Unique Email Addresses (Easy)
	Every valid email consists of a local name and a domain name, separated by 
	the '@' sign. Besides lowercase letters, the email may contain one or more 
	'.' or '+'. For example, in "alice@leetcode.com", "alice" is the local name, 
	and "leetcode.com" is the domain name. If you add periods '.' between some 
	characters in the local name part of an email address, mail sent there will 
	be forwarded to the same address without dots in the local name. Note that 
	this rule does not apply to domain names. 

	For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to 
	the same email address. If you add a plus '+' in the local name, everything 
	after the first plus sign will be ignored. This allows certain emails to be 
	filtered. Note that this rule does not apply to domain names. For example, 
	"m.y+name@email.com" will be forwarded to "my@email.com". It is possible to 
	use both of these rules at the same time. Given an array of strings emails 
	where we send one email to each email[i], return the number of different 
	addresses that actually receive mails.

	Example 1:
	Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
	Output: 2
	Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.

	Example 2:
	Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
	Output: 3

	Constraints:
	* 1 <= emails.length <= 100
	* 1 <= emails[i].length <= 100
	* email[i] consist of lowercase English letters, '+', '.' and '@'.
	* Each emails[i] contains exactly one '@' character.
	* All local and domain names are non-empty.
	* Local names do not start with a '+' character.*/

    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> ans; 
        for (auto email : emails) {
            string key = ""; 
            for (auto x : email) {
                if (x == '+' || x == '@') break; 
                if (x != '.') key.push_back(x); 
            }
            key += email.substr(email.find('@')); 
            ans.insert(key); 
        }
        return ans.size(); 
    }


    /*937. Reorder Data in Log Files (Easy)
	You are given an array of logs. Each log is a space-delimited string of 
	words, where the first word is the identifier. There are two types of logs:
	* Letter-logs: All words (except the identifier) consist of lowercase 
	  English letters.
	* Digit-logs: All words (except the identifier) consist of digits.
	
	Reorder these logs so that:
	* The letter-logs come before all digit-logs.
	* The letter-logs are sorted lexicographically by their contents. If their 
	  contents are the same, then sort them lexicographically by their 
	  identifiers.
	* The digit-logs maintain their relative ordering.
	Return the final order of the logs.

	Example 1:
	Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
	Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
	Explanation:
	The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
	The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".

	Example 2:
	Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
	Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]

	Constraints:
	* 1 <= logs.length <= 100
	* 3 <= logs[i].length <= 100
	* All the tokens of logs[i] are separated by a single space.
	* logs[i] is guaranteed to have an identifier and at least one word after 
	  the identifier.*/

    vector<string> reorderLogFiles(vector<string>& logs) {
        vector<pair<string, string>> letter_logs; 
        vector<string> digit_logs; 
        for (auto log : logs) {
            int i = log.find(' '); 
            if (isalpha(log[i+1])) 
                letter_logs.emplace_back(log.substr(0, i), log.substr(i+1)); 
            else 
                digit_logs.push_back(log); 
        }
        
        sort(letter_logs.begin(), letter_logs.end(), [&](auto& lhs, auto& rhs) {
            return lhs.second < rhs.second || (lhs.second == rhs.second && lhs.first < rhs.first); 
        });
        
        vector<string> ans; 
        for (auto x : letter_logs) 
            ans.push_back(x.first + " " + x.second); 
        
        ans.insert(ans.end(), digit_logs.begin(), digit_logs.end());
        return ans; 
    }


    /*938. Range Sum of BST (Easy)
	Given the root node of a binary search tree, return the sum of values of 
	all nodes with a value in the range [low, high].

	Example 1:
	Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
	Output: 32

	Example 2:
	Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
	Output: 23

	Constraints:
	* The number of nodes in the tree is in the range [1, 2 * 10^4].
	* 1 <= Node.val <= 10^5
	* 1 <= low <= high <= 10^5
	* All Node.val are unique.*/

    int rangeSumBST(TreeNode* root, int low, int high) {
        int ans = 0; 
        stack<TreeNode*> stk; 
        stk.push(root); 
        while (stk.size()) {
            TreeNode* node = stk.top(); 
            stk.pop(); 
            if (node) {
                if (low <= node->val && node->val <= high) ans += node->val; 
                if (node->val < high) stk.push(node->right); 
                if (low < node->val) stk.push(node->left); 
            }
        }
        return ans; 
    }


    /*941. Valid Mountain Array (Easy)
	Given an array of integers arr, return true if and only if it is a valid 
	mountain array. Recall that arr is a mountain array if and only if:
	* arr.length >= 3
	* There exists some i with 0 < i < arr.length - 1 such that:
	  - arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
	  - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

	Example 1:
	Input: arr = [2,1]
	Output: false

	Example 2:
	Input: arr = [3,5,5]
	Output: false

	Example 3:
	Input: arr = [0,3,2,1]
	Output: true

	Constraints:
	* 1 <= arr.length <= 10^4
	* 0 <= arr[i] <= 10^4*/

    bool validMountainArray(vector<int>& arr) {
        int lo = 0, hi = arr.size() - 1; 
        for (; lo < hi && arr[lo] < arr[lo+1]; ++lo) {}
        for (; lo < hi && arr[hi-1] > arr[hi]; --hi) {}
        return 0 < lo && hi < arr.size() - 1 && lo == hi; 
    }


    /*942. DI String Match (Easy)
	A permutation perm of n + 1 integers of all the integers in the range [0, n] 
	can be represented as a string s of length n where:
	* s[i] == 'I' if perm[i] < perm[i + 1], and
	* s[i] == 'D' if perm[i] > perm[i + 1].
	Given a string s, reconstruct the permutation perm and return it. If there 
	are multiple valid permutations perm, return any of them.

	Example 1:
	Input: s = "IDID"
	Output: [0,4,1,3,2]

	Example 2:
	Input: s = "III"
	Output: [0,1,2,3]

	Example 3:
	Input: s = "DDI"
	Output: [3,2,0,1]

	Constraints:
	* 1 <= s.length <= 10^5
	* s[i] is either 'I' or 'D'.*/

    vector<int> diStringMatch(string s) {
        vector<int> ans; 
        for (int i = 0, lo = 0, hi = s.size(); i <= s.size(); i++) {
            if (i == s.size() || s[i] == 'I') ans.push_back(lo++); 
            else ans.push_back(hi--); 
        }
        return ans; 
    }


    /*943. Find the Shortest Superstring (Hard)
	Given an array of strings words, return the smallest string that contains 
	each string in words as a substring. If there are multiple valid strings of 
	the smallest length, return any of them. You may assume that no string in 
	words is a substring of another string in words.

	Example 1:
	Input: words = ["alex","loves","leetcode"]
	Output: "alexlovesleetcode"
	Explanation: All permutations of "alex","loves","leetcode" would also be 
	             accepted.

	Example 2:
	Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
	Output: "gctaagttcatgcatc"

	Constraints:
	* 1 <= words.length <= 12
	* 1 <= words[i].length <= 20
	* words[i] consists of lowercase English letters.
	* All the strings of words are unique.*/

    string shortestSuperstring(vector<string>& words) {
        int n = size(words); 
        
        vector<vector<int>> ovlp (n, vector<int>(n)); 
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < n; ++j)
                for (int k = 0; k < min(size(words[i]), size(words[j])); ++k)
                    if (words[i].substr(size(words[i]) - k) == words[j].substr(0, k)) {
                        ovlp[i][j] = k; 
                    }
        
        vector<vector<int>> dp(1<<n, vector<int>(n)); // min length of mask ending at bit 
        vector<vector<int>> parent(1<<n, vector<int>(n, -1)); 
        for (int mask = 0; mask < (1 << n); ++mask) {
            for (int bit = 0; bit < n; ++bit) {
                if (mask & 1<<bit) {
                    int pmask = mask ^ (1<<bit); 
                    if (pmask) {
                        for (int i = 0; i < n; ++i) {
                            if (pmask & 1<<i) {
                                int val = dp[pmask][i] + size(words[bit]) - ovlp[i][bit]; 
                                if (dp[mask][bit] == 0 || val < dp[mask][bit]) {
                                    dp[mask][bit] = val; 
                                    parent[mask][bit] = i; 
                                }
                            }
                        }
                    }
                    else dp[mask][bit] = size(words[bit]); 
                }
            }
        }
        
        auto it = min_element(begin(dp.back()), end(dp.back())); 
        int mask = (1<<n) - 1, p = it - begin(dp.back()); 
        string ans; 
        while (mask) {
            int pp = parent[mask][p]; 
            if (pp == -1) ans = words[p] + ans; 
            else ans = words[p].substr(ovlp[pp][p]) + ans; 
            mask ^= 1 << p; 
            p = pp; 
        }
        return ans; 
    }


    /*944. Delete Columns to Make Sorted (Easy)
	You are given an array of n strings strs, all of the same length. The 
	strings can be arranged such that there is one on each line, making a grid. 
	For example, strs = ["abc", "bce", "cae"] can be arranged as:
	abc
	bce
	cae
	You want to delete the columns that are not sorted lexicographically. In 
	the above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 
	('c', 'e', 'e') are sorted while column 1 ('b', 'c', 'a') is not, so you 
 	would delete column 1. Return the number of columns that you will delete.

	Example 1:
	Input: strs = ["cba","daf","ghi"]
	Output: 1
	Explanation: The grid looks as follows:
	  cba
	  daf
	  ghi
	Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 
	1 column.

	Example 2:
	Input: strs = ["a","b"]
	Output: 0
	Explanation: The grid looks as follows:
	  a
	  b
	Column 0 is the only column and is sorted, so you will not delete any columns.

	Example 3:
	Input: strs = ["zyx","wvu","tsr"]
	Output: 3
	Explanation: The grid looks as follows:
	  zyx
	  wvu
	  tsr
	All 3 columns are not sorted, so you will delete all 3.

	Constraints:
	* n == strs.length
	* 1 <= n <= 100
	* 1 <= strs[i].length <= 1000
	* strs[i] consists of lowercase English letters.*/

    int minDeletionSize(vector<string>& strs) {
        int ans = 0; 
        for (int j = 0; j < strs[0].size(); ++j) {
            for (int i = 1; i < strs.size(); ++i) {
                if (strs[i-1][j] > strs[i][j]) {
                    ++ans; 
                    break; 
                }
            }
        }
        return ans; 
    }


    /*953. Verifying an Alien Dictionary (Easy)
	In an alien language, surprisingly they also use english lowercase letters, 
	but possibly in a different order. The order of the alphabet is some 
	permutation of lowercase letters. Given a sequence of words written in the 
	alien language, and the order of the alphabet, return true if and only if 
	the given words are sorted lexicographicaly in this alien language.

	Example 1:
	Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
	Output: true
	Explanation: As 'h' comes before 'l' in this language, then the sequence is 
	             sorted.

	Example 2:
	Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
	Output: false
	Explanation: As 'd' comes after 'l' in this language, then 
	             words[0] > words[1], hence the sequence is unsorted.

	Example 3:
	Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
	Output: false
	Explanation: The first three characters "app" match, and the second string 
	             is shorter (in size.) According to lexicographical rules 
	             "apple" > "app", because 'l' > '∅', where '∅' is defined as 
	             the blank character which is less than any other character 
	             (More info).

	Constraints:
	* 1 <= words.length <= 100
	* 1 <= words[i].length <= 20
	* order.length == 26
	* All characters in words[i] and order are English lowercase letters.*/

    bool isAlienSorted(vector<string>& words, string order) {
        unordered_map<char, int> mp; 
        for (int i = 0; i < order.size(); ++i)
            mp[order[i]] = i; 
        
        for (int i = 1; i < words.size(); ++i) {
            for (int k; k < words[i-1].size(); ++k) {
                if (k == words[i].size()) return false; 
                if (mp[words[i-1][k]] < mp[words[i][k]]) break; 
                if (mp[words[i-1][k]] > mp[words[i][k]]) return false; 
            }
        }
        return true; 
    }


    /*961. N-Repeated Element in Size 2N Array (Easy)
	In a array nums of size 2 * n, there are n + 1 unique elements, and exactly 
	one of these elements is repeated n times. Return the element repeated n 
	times.

	Example 1:
	Input: nums[1,2,3,3]
	Output: 3

	Example 2:
	Input: nums[2,1,2,5,3,2]
	Output: 2

	Example 3:
	Input: nums[5,1,5,2,5,3,5,4]
	Output: 5

	Note:
	* 4 <= nums.length <= 10000
	* 0 <= nums[i] < 10000
	* nums.length is even*/

    int repeatedNTimes(vector<int>& nums) {
        for (int i = 0; i < size(nums); ++i) 
            for (int k = 1; k <= 2; ++k) 
                if (i+k < size(nums) && nums[i] == nums[i+k]) return nums[i]; 
        return nums[0]; 
    }


    /*965. Univalued Binary Tree (Easy)
	A binary tree is univalued if every node in the tree has the same value.
	Return true if and only if the given tree is univalued.

	Example 1:
	Input: [1,1,1,1,1,null,1]
	Output: true

	Example 2:
	Input: [2,2,2,5,2]
	Output: false

	Note:
	* The number of nodes in the given tree will be in the range [1, 100].
	* Each node's value will be an integer in the range [0, 99].*/

    bool isUnivalTree(TreeNode* root) {
        
        function<bool(TreeNode*, int)> fn = [&](TreeNode* node, int val) {
            if (!node) return true; 
            return node->val == val && fn(node->left, val) && fn(node->right, val);
        };
        
        return fn(root, root->val); 
    }


    /*968. Binary Tree Cameras (Hard)
	Given a binary tree, we install cameras on the nodes of the tree. Each 
	camera at a node can monitor its parent, itself, and its immediate children. 
	Calculate the minimum number of cameras needed to monitor all nodes of the 
	tree.

	Example 1:
	Input: [0,0,null,0,0]
	Output: 1
	Explanation: One camera is enough to monitor all nodes if placed as shown.

	Example 2:
	Input: [0,0,null,0,null,0,null,null,0]
	Output: 2
	Explanation: At least two cameras are needed to monitor all nodes of the 
	             tree. The above image shows one of the valid configurations of 
	             camera placement.

	Note:
	* The number of nodes in the given tree will be in the range [1, 1000].
	* Every node has value 0.*/

    int minCameraCover(TreeNode* root) {
        int ans = 0; 
        
        function<int(TreeNode*)> fn = [&](TreeNode* node) {
            if (node == NULL) return 1; 
            int left = fn(node->left), right = fn(node->right); 
            if (left == 0 || right == 0) {
                ++ans; 
                return 2; 
            } 
            if (left == 2 || right == 2) {
                return 1; 
            }
            return 0; 
        };
        
        int val = fn(root); 
        return (val == 0) + ans; 
    }


    /*970. Powerful Integers (Medium)
	Given three integers x, y, and bound, return a list of all the powerful 
	integers that have a value less than or equal to bound. An integer is 
	powerful if it can be represented as xi + yj for some integers i >= 0 and 
	j >= 0. You may return the answer in any order. In your answer, each value 
	should occur at most once.

	Example 1:
	Input: x = 2, y = 3, bound = 10
	Output: [2,3,4,5,7,9,10]
	Explanation: 2 = 20 + 30
	             3 = 21 + 30
	             4 = 20 + 31
	             5 = 21 + 31
	             7 = 22 + 31
	             9 = 23 + 30
	             10 = 20 + 32
	
	Example 2:
	Input: x = 3, y = 5, bound = 15
	Output: [2,4,6,8,10,14]

	Constraints:
	* 1 <= x, y <= 100
	* 0 <= bound <= 10^6*/

    vector<int> powerfulIntegers(int x, int y, int bound) {
        unordered_set<int> ans; 
        for (int xx = 1; xx <= bound; xx *= x) {
            for (int yy = 1; xx + yy <= bound; yy *= y) {
                ans.insert(xx + yy); 
                if (y == 1) break; 
            }
            if (x == 1) break; 
        }
        return vector<int>(ans.begin(), ans.end()); 
    }


    /*976. Largest Perimeter Triangle (Easy)
	Given an integer array nums, return the largest perimeter of a triangle 
	with a non-zero area, formed from three of these lengths. If it is 
	impossible to form any triangle of a non-zero area, return 0.

	Example 1:
	Input: nums = [2,1,2]
	Output: 5

	Example 2:
	Input: nums = [1,2,1]
	Output: 0

	Example 3:
	Input: nums = [3,2,3,4]
	Output: 10

	Example 4:
	Input: nums = [3,6,2,3]
	Output: 8

	Constraints:
	* 3 <= nums.length <= 10^4
	* 1 <= nums[i] <= 10^6*/

    int largestPerimeter(vector<int>& nums) {
        sort(begin(nums), end(nums)); 
        for (int i = size(nums)-1; i >= 2; --i) 
            if (nums[i-2] + nums[i-1] > nums[i]) 
                return nums[i-2] + nums[i-1] + nums[i]; 
        return 0; 
    }


    /*985. Sum of Even Numbers After Queries (Easy)
	We have an array nums of integers, and an array queries of queries. For the 
	i-th query val = queries[i][0], index = queries[i][1], we add val to 
	nums[index].  Then, the answer to the i-th query is the sum of the even 
	values of A. (Here, the given index = queries[i][1] is a 0-based index, and 
	each query permanently modifies the array nums.) Return the answer to all 
	queries.  Your answer array should have answer[i] as the answer to the i-th 
	query.

	Example 1:
	Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
	Output: [8,6,2,4]
	Explanation: 
	At the beginning, the array is [1,2,3,4].
	After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.
	After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.
	After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.
	After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.
	 
	Note:
	* 1 <= nums.length <= 10000
	* -10000 <= nums[i] <= 10000
	* 1 <= queries.length <= 10000
	* -10000 <= queries[i][0] <= 10000
	* 0 <= queries[i][1] < nums.length*/

    vector<int> sumEvenAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        int sm = accumulate(begin(nums), end(nums), 0, [](int s, int x) {return x%2 == 0 ? s + x : s; }); 

        vector<int> ans; 
        for (auto& query : queries) {
            int val = query[0], i = query[1]; 
            if (nums[i]%2 == 0) sm -= nums[i]; 
            nums[i] += val; 
            if (nums[i]%2 == 0) sm += nums[i]; 
            ans.push_back(sm); 
        }
        return ans; 
    }


    /*989. Add to Array-Form of Integer (Easy)
	The array-form of an integer num is an array representing its digits in 
	left to right order. 
	* For example, for num = 1321, the array form is [1,3,2,1].
	Given num, the array-form of an integer, and an integer k, return the 
	array-form of the integer num + k.

	Example 1:
	Input: num = [1,2,0,0], k = 34
	Output: [1,2,3,4]
	Explanation: 1200 + 34 = 1234

	Example 2:
	Input: num = [2,7,4], k = 181
	Output: [4,5,5]
	Explanation: 274 + 181 = 455

	Example 3:
	Input: num = [2,1,5], k = 806
	Output: [1,0,2,1]
	Explanation: 215 + 806 = 1021

	Example 4:
	Input: num = [9,9,9,9,9,9,9,9,9,9], k = 1
	Output: [1,0,0,0,0,0,0,0,0,0,0]
	Explanation: 9999999999 + 1 = 10000000000

	Constraints:
	* 1 <= num.length <= 10^4
	* 0 <= num[i] <= 9
	* num does not contain any leading zeros except for the zero itself.
	* 1 <= k <= 10^4*/

    vector<int> addToArrayForm(vector<int>& num, int k) {
        reverse(begin(num), end(num)); 
        for (int i = 0; k; ++i) {
            if (i == size(num)) num.push_back(0); 
            num[i] += k; 
            k = num[i]/10; 
            num[i] %= 10; 
        }
        reverse(begin(num), end(num)); 
        return num; 
    }


    /*993. Cousins in Binary Tree (Easy)
	In a binary tree, the root node is at depth 0, and children of each depth k 
	node are at depth k+1. Two nodes of a binary tree are cousins if they have 
	the same depth, but have different parents. We are given the root of a 
	binary tree with unique values, and the values x and y of two different 
	nodes in the tree. Return true if and only if the nodes corresponding to 
	the values x and y are cousins.

	Example 1:
	Input: root = [1,2,3,4], x = 4, y = 3
	Output: false

	Example 2:
	Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
	Output: true

	Example 3:
	Input: root = [1,2,3,null,4], x = 2, y = 3
	Output: false

	Constraints:
	* The number of nodes in the tree will be between 2 and 100.
	* Each node has a unique integer value from 1 to 100.*/

    bool isCousins(TreeNode* root, int x, int y) {
        queue<pair<TreeNode*, TreeNode*>> q; 
        q.push(make_pair(root, nullptr)); 
        
        while (q.size()) {
            queue<pair<TreeNode*, TreeNode*>> newq; 
            TreeNode* seen = nullptr; 
            for (int i = 0, n = size(q); i < n; ++i) {
                auto [node, par] = q.front(); q.pop(); 
                if (node->val == x || node->val == y) {
                    if (seen) return seen != par; 
                    else seen = par; 
                } 
                if (node->left) q.push(make_pair(node->left, node));
                if (node->right) q.push(make_pair(node->right, node)); 
            }
            if (seen) return false; 
        }
        return false; 
    }


    /*1048. Longest String Chain (Medium)
	Given a list of words, each word consists of English lowercase letters. 
	Let's say word1 is a predecessor of word2 if and only if we can add exactly 
	one letter anywhere in word1 to make it equal to word2. For example, "abc" 
	is a predecessor of "abac". A word chain is a sequence of words 
	[word_1, word_2, ..., word_k] with k >= 1, where word_1 is a predecessor of 
	word_2, word_2 is a predecessor of word_3, and so on. Return the longest 
	possible length of a word chain with words chosen from the given list of 
	words.

	Example 1:
	Input: words = ["a","b","ba","bca","bda","bdca"]
	Output: 4
	Explanation: One of the longest word chain is "a","ba","bda","bdca".

	Example 2:
	Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
	Output: 5

	Constraints:
	* 1 <= words.length <= 1000
	* 1 <= words[i].length <= 16
	* words[i] only consists of English lowercase letters.*/

    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](string lhs, string rhs) { return lhs.size() < rhs.size(); });
        
        unordered_map<string, int> seen; 
        int ans = 1; 
        for (auto word : words) {
            seen[word] = 1; 
            for (int i = 0; i < word.size(); ++i) {
                string key = word.substr(0, i) + word.substr(i+1); 
                if (seen.count(key)) {
                    seen[word] = max(seen[word], 1 + seen[key]); 
                    ans = max(ans, seen[word]); 
                }
            }
        }
        return ans; 
    }


    /*1074. Number of Submatrices That Sum to Target (Hard)
	Given a matrix and a target, return the number of non-empty submatrices 
	that sum to target. A submatrix x1, y1, x2, y2 is the set of all cells 
	matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2. Two submatrices 
	(x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some 
	coordinate that is different: for example, if x1 != x1'.

	Example 1:
	Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
	Output: 4
	Explanation: The four 1x1 submatrices that only contain 0.

	Example 2:
	Input: matrix = [[1,-1],[-1,1]], target = 0
	Output: 5
	Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.

	Example 3:
	Input: matrix = [[904]], target = 0
	Output: 0

	Constraints:
	* 1 <= matrix.length <= 100
	* 1 <= matrix[0].length <= 100
	* -1000 <= matrix[i] <= 1000
	* -10^8 <= target <= 10^8*/

    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int ans = 0, m = matrix.size(), n = matrix[0].size(); // dimensions 
        vector<vector<int>> prefix(m+1, vector<int>(n+1, 0)); 
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) 
                prefix[i+1][j+1] = matrix[i][j] + prefix[i][j+1] + prefix[i+1][j] - prefix[i][j]; 
            
            for (int ii = 0; ii <= i; ++ii) {
                unordered_map<int, int> freq; 
                freq[0] = 1; 
                for (int j = 0; j < n; ++j) {
                    int diff = prefix[i+1][j+1] - prefix[ii][j+1]; 
                    ans += freq[diff - target]; 
                    ++freq[diff]; 
                }
            }
        }
        return ans;         
    }


    /*1209. Remove All Adjacent Duplicates in String II (Medium)
	Given a string s, a k duplicate removal consists of choosing k adjacent and 
	equal letters from s and removing them causing the left and the right side 
	of the deleted substring to concatenate together. We repeatedly make k 
	duplicate removals on s until we no longer can. Return the final string 
	after all such duplicate removals have been made. It is guaranteed that the 
	answer is unique.

	Example 1:
	Input: s = "abcd", k = 2
	Output: "abcd"
	Explanation: There's nothing to delete.

	Example 2:
	Input: s = "deeedbbcccbdaa", k = 3
	Output: "aa"
	Explanation: 
	First delete "eee" and "ccc", get "ddbbbdaa"
	Then delete "bbb", get "dddaa"
	Finally delete "ddd", get "aa"

	Example 3:
	Input: s = "pbbcggttciiippooaais", k = 2
	Output: "ps"

	Constraints:
	* 1 <= s.length <= 10^5
	* 2 <= k <= 10^4
	* s only contains lower case English letters.*/

    string removeDuplicates(string s, int k) {
        vector<vector<int>> vec; 
        for (auto c : s) {
            if (vec.size() && vec.back()[1] == c) {
                ++vec.back()[0]; 
            } else {
                vec.push_back({1, c}); 
            }
            if (vec.back()[0] == k) vec.pop_back();
        }
        
        string ans; 
        for (auto x : vec) {
            ans += string(x[0], x[1]); 
        }
        return ans; 
    }


    /*1268. Search Suggestions System (Medium)
	Given an array of strings products and a string searchWord. We want to 
	design a system that suggests at most three product names from products 
	after each character of searchWord is typed. Suggested products should have 
	common prefix with the searchWord. If there are more than three products 
	with a common prefix return the three lexicographically minimums products.
	Return list of lists of the suggested products after each character of 
	searchWord is typed. 

	Example 1:
	Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], 
	       searchWord = "mouse"
	Output: [["mobile","moneypot","monitor"],
	         ["mobile","moneypot","monitor"],
	         ["mouse","mousepad"],
	         ["mouse","mousepad"],
	         ["mouse","mousepad"]]
	Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
	             After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
	             After typing mou, mous and mouse the system suggests ["mouse","mousepad"]
	
	Example 2:
	Input: products = ["havana"], 
	       searchWord = "havana"
	Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

	Example 3:
	Input: products = ["bags","baggage","banner","box","cloths"], 
	       searchWord = "bags"
	Output: [["baggage","bags","banner"],
	         ["baggage","bags","banner"],
	         ["baggage","bags"],
	         ["bags"]]
	
	Example 4:
	Input: products = ["havana"], 
	       searchWord = "tatiana"
	Output: [[],[],[],[],[],[],[]]

	Constraints:
	* 1 <= products.length <= 1000
	* There are no repeated elements in products.
	* 1 <= Σ products[i].length <= 2 * 10^4
	* All characters of products[i] are lower-case English letters.
	* 1 <= searchWord.length <= 1000
	* All characters of searchWord are lower-case English letters.*/

    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        sort(begin(products), end(products)); 
        vector<vector<string>> ans; 
        int lo = 0, hi = size(products)-1; 
        for (int i = 0 ; i < size(searchWord); ++i) {
            for (; lo < size(products) && (size(products[lo]) <= i || products[lo][i] < searchWord[i]); ++lo); 
            for (; 0 <= hi && (size(products[hi]) <= i || products[hi][i] > searchWord[i]); --hi); 
            if (lo <= hi) {
                vector<string> elem; 
                for (auto i = lo; i < min(lo+3, hi+1); ++i) elem.push_back(products[i]); 
                ans.push_back(elem); 
            }
            else ans.push_back({}); 
        }
        return ans; 
    }


    /*1354. Construct Target Array With Multiple Sums (Hard)
	Given an array of integers target. From a starting array, A consisting of 
	all 1's, you may perform the following procedure :
	* let x be the sum of all elements currently in your array.
	* choose index i, such that 0 <= i < target.size and set the value of A at 
	  index i to x.
	* You may repeat this procedure as many times as needed.
	Return True if it is possible to construct the target array from A 
	otherwise return False.

	Example 1:
	Input: target = [9,3,5]
	Output: true
	Explanation: Start with [1, 1, 1] 
	[1, 1, 1], sum = 3 choose index 1
	[1, 3, 1], sum = 5 choose index 2
	[1, 3, 5], sum = 9 choose index 0
	[9, 3, 5] Done

	Example 2:
	Input: target = [1,1,1,2]
	Output: false
	Explanation: Impossible to create target array from [1,1,1,1].

	Example 3:
	Input: target = [8,5]
	Output: true

	Constraints:
	* N == target.length
	* 1 <= target.length <= 5 * 10^4
	* 1 <= target[i] <= 10^9*/

    bool isPossible(vector<int>& target) {
        if (target.size() == 1) return target[0] == 1; // edge case 
        
        long total = 0; 
        priority_queue<int> pq; 
        for (auto x : target) {
            total += x; 
            pq.push(x); 
        }
        
        while (pq.top() > 1) {
            int x = pq.top(); 
            pq.pop(); 
            total -= x; 
            if (x <= total) return false; 
            x = (x-1) % total + 1; 
            total += x; 
            pq.push(x); 
        }
        return true; 
    }


    /*1423. Maximum Points You Can Obtain from Cards (Medium)
	There are several cards arranged in a row, and each card has an associated 
	number of points The points are given in the integer array cardPoints. In 
	one step, you can take one card from the beginning or from the end of the 
	row. You have to take exactly k cards. Your score is the sum of the points 
	of the cards you have taken. Given the integer array cardPoints and the 
	integer k, return the maximum score you can obtain.

	Example 1:
	Input: cardPoints = [1,2,3,4,5,6,1], k = 3
	Output: 12
	Explanation: After the first step, your score will always be 1. However, 
	             choosing the rightmost card first will maximize your total 
	             score. The optimal strategy is to take the three cards on the 
	             right, giving a final score of 1 + 6 + 5 = 12.
	
	Example 2:
	Input: cardPoints = [2,2,2], k = 2
	Output: 4
	Explanation: Regardless of which two cards you take, your score will always 
	             be 4.
	
	Example 3:
	Input: cardPoints = [9,7,7,9,7,7,9], k = 7
	Output: 55
	Explanation: You have to take all the cards. Your score is the sum of 
	             points of all cards.
	
	Example 4:
	Input: cardPoints = [1,1000,1], k = 1
	Output: 1
	Explanation: You cannot take the card in the middle. Your best score is 1. 

	Example 5:
	Input: cardPoints = [1,79,80,1,1,1,200,1], k = 3
	Output: 202

	Constraints:
	* 1 <= cardPoints.length <= 10^5
	* 1 <= cardPoints[i] <= 10^4
	* 1 <= k <= cardPoints.length*/

    int maxScore(vector<int>& cardPoints, int k) {
        int ans = 0, n = cardPoints.size(); 
        for (int i = 0; i < k; ++i) {
            ans += cardPoints[i]; 
        }
        
        for (int i = 0, val = ans; i < k; ++i) {
            val += cardPoints[n-1-i] - cardPoints[k-1-i]; 
            ans = max(ans, val); 
        }
        return ans; 
    }


    /*1642. Furthest Building You Can Reach (Medium)
	You are given an integer array heights representing the heights of 
	buildings, some bricks, and some ladders. You start your journey from 
	building 0 and move to the next building by possibly using bricks or 
	ladders. While moving from building i to building i+1 (0-indexed),
	* If the current building's height is greater than or equal to the next 
	  building's height, you do not need a ladder or bricks.
	* If the current building's height is less than the next building's height, 
	  you can either use one ladder or (h[i+1] - h[i]) bricks.
	Return the furthest building index (0-indexed) you can reach if you use the 
	given ladders and bricks optimally.

	Example 1:
	Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
	Output: 4
	Explanation: Starting at building 0, you can follow these steps:
	- Go to building 1 without using ladders nor bricks since 4 >= 2.
	- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
	- Go to building 3 without using ladders nor bricks since 7 >= 6.
	- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
	It is impossible to go beyond building 4 because you do not have any more bricks or ladders.

	Example 2:
	Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
	Output: 7

	Example 3:
	Input: heights = [14,3,19,3], bricks = 17, ladders = 0
	Output: 3

	Constraints:
	* 1 <= heights.length <= 10^5
	* 1 <= heights[i] <= 10^6
	* 0 <= bricks <= 10^9
	* 0 <= ladders <= heights.length*/

    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int> pq; // max heap 
        
        for (int i = 1; i < heights.size(); ++i) {
            int diff = heights[i] - heights[i-1]; 
            if (diff > 0) {
                pq.push(diff); 
                bricks -= diff; 
                if (bricks < 0) {
                    if (ladders) {
                        bricks += pq.top(); 
                        pq.pop(); 
                        ladders -= 1; 
                    } else return i-1; 
                }
            }
        }
        return heights.size() - 1; 
    }


    /*1689. Partitioning Into Minimum Number Of Deci-Binary Numbers (Medium)
	A decimal number is called deci-binary if each of its digits is either 0 or 
	1 without any leading zeros. For example, 101 and 1100 are deci-binary, 
	while 112 and 3001 are not. Given a string n that represents a positive 
	decimal integer, return the minimum number of positive deci-binary numbers 
	needed so that they sum up to n.

	Example 1:
	Input: n = "32"
	Output: 3
	Explanation: 10 + 11 + 11 = 32

	Example 2:
	Input: n = "82734"
	Output: 8

	Example 3:
	Input: n = "27346209830709182346"
	Output: 9

	Constraints:
	* 1 <= n.length <= 10^5
	* n consists of only digits.
	* n does not contain any leading zeros and represents a positive integer.*/

    int minPartitions(string n) {
        return *max_element(begin(n), end(n)) - '0'; 
    }


    /*1695. Maximum Erasure Value (Medium)
	You are given an array of positive integers nums and want to erase a 
	subarray containing unique elements. The score you get by erasing the 
	subarray is equal to the sum of its elements. Return the maximum score you 
	can get by erasing exactly one subarray. An array b is called to be a 
	subarray of a if it forms a contiguous subsequence of a, that is, if it is 
	equal to a[l],a[l+1],...,a[r] for some (l,r).

	Example 1:
	Input: nums = [4,2,4,5,6]
	Output: 17
	Explanation: The optimal subarray here is [2,4,5,6].

	Example 2:
	Input: nums = [5,2,1,2,5,2,1,2,5]
	Output: 8
	Explanation: The optimal subarray here is [5,2,1] or [1,2,5].

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^4*/

    int maximumUniqueSubarray(vector<int>& nums) {
        unordered_map<int, int> freq; 
        int ans = 0, val = 0, ii = 0; 
        for (auto& x : nums) {
            val += x; 
            ++freq[x]; 
            for (; freq[x] > 1; ++ii) {
                val -= nums[ii]; 
                --freq[nums[ii]]; 
            }
            ans = max(ans, val); 
        }
        return ans; 
    }


    /*1812. Determine Color of a Chessboard Square (Easy)
	You are given coordinates, a string that represents the coordinates of a 
	square of the chessboard. Below is a chessboard for your reference. Return
	true if the square is white, and false if the square is black. The 
	coordinate will always represent a valid chessboard square. The coordinate 
	will always have the letter first, and the number second.

	Example 1:
	Input: coordinates = "a1"
	Output: false
	Explanation: From the chessboard above, the square with coordinates "a1" is 
	             black, so return false.
	
	Example 2:
	Input: coordinates = "h3"
	Output: true
	Explanation: From the chessboard above, the square with coordinates "h3" is 
	             white, so return true.
	
	Example 3:
	Input: coordinates = "c7"
	Output: false

	Constraints:
	* coordinates.length == 2
	* 'a' <= coordinates[0] <= 'h'
	* '1' <= coordinates[1] <= '8'*/

    bool squareIsWhite(string coordinates) {
        return (coordinates[0] & 1) != (coordinates[1] & 1); 
    }



    /*1814. Count Nice Pairs in an Array (Medium)
	You are given an array nums that consists of non-negative integers. Let us 
	define rev(x) as the reverse of the non-negative integer x. For example, 
	rev(123) = 321, and rev(120) = 21. A pair of indices (i, j) is nice if it 
	satisfies all of the following conditions:
	* 0 <= i < j < nums.length
	* nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
	Return the number of nice pairs of indices. Since that number can be too 
	large, return it modulo 109 + 7.

	Example 1:
	Input: nums = [42,11,1,97]
	Output: 2
	Explanation: The two pairs are:
	 - (0,3) : 42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121.
	 - (1,2) : 11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12.

	Example 2:
	Input: nums = [13,10,35,24,76]
	Output: 4

	Constraints:
	* 1 <= nums.length <= 10^5
	* 0 <= nums[i] <= 10^9*/

    int countNicePairs(vector<int>& nums) {
        long ans = 0; 
        unordered_map<int, int> freq; 
        for (auto& x : nums) {
            int rev = 0; 
            for (int xx = x; xx; xx /= 10) rev = 10*rev + xx % 10; 
            x -= rev; 
            ans = (ans + freq[x]) % 1'000'000'007; 
            ++freq[x]; 
        }
        return ans; 
    }


    /*1813. Sentence Similarity III (Medium)
	A sentence is a list of words that are separated by a single space with no 
	leading or trailing spaces. For example, "Hello World", "HELLO", "hello 
	world hello world" are all sentences. Words consist of only uppercase and 
	lowercase English letters. Two sentences sentence1 and sentence2 are 
	similar if it is possible to insert an arbitrary sentence (possibly empty) 
	inside one of these sentences such that the two sentences become equal. For 
	example, sentence1 = "Hello my name is Jane" and sentence2 = "Hello Jane" 
	can be made equal by inserting "my name is" between "Hello" and "Jane" in 
	sentence2. Given two sentences sentence1 and sentence2, return true if 
	sentence1 and sentence2 are similar. Otherwise, return false.

	Example 1:
	Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
	Output: true
	Explanation: sentence2 can be turned to sentence1 by inserting "name is" 
	             between "My" and "Haley".
	
	Example 2:
	Input: sentence1 = "of", sentence2 = "A lot of words"
	Output: false
	Explanation: No single sentence can be inserted inside one of the sentences 
	             to make it equal to the other.
	
	Example 3:
	Input: sentence1 = "Eating right now", sentence2 = "Eating"
	Output: true
	Explanation: sentence2 can be turned to sentence1 by inserting "right now" 
	             at the end of the sentence.
	
	Example 4:
	Input: sentence1 = "Luky", sentence2 = "Lucccky"
	Output: false

	Constraints:
	* 1 <= sentence1.length, sentence2.length <= 100
	* sentence1 and sentence2 consist of lowercase and uppercase English 
	  letters and spaces.
	* The words in sentence1 and sentence2 are separated by a single space.*/

    bool areSentencesSimilar(string sentence1, string sentence2) {
        if (size(sentence1) < size(sentence2)) swap(sentence1, sentence2); 
        
        vector<string> words1, words2; 
        
        string word; 
        istringstream iss1(sentence1); 
        while (iss1 >> word) words1.push_back(word); 
        
        istringstream iss2(sentence2); 
        while (iss2 >> word) words2.push_back(word); 
        
        int i = 0; 
        for (; i < size(words2) && words1[i] == words2[i]; ++i); 
        int j = size(words2)-1;
        for (; 0 <= j && words1[size(words1)-size(words2)+j] == words2[j]; --j); 
        return j < i; 
    }


    /*1815. Maximum Number of Groups Getting Fresh Donuts (Hard)
	There is a donuts shop that bakes donuts in batches of batchSize. They have 
	a rule where they must serve all of the donuts of a batch before serving 
	any donuts of the next batch. You are given an integer batchSize and an 
	integer array groups, where groups[i] denotes that there is a group of 
	groups[i] customers that will visit the shop. Each customer will get 
	exactly one donut. When a group visits the shop, all customers of the group 
	must be served before serving any of the following groups. A group will be 
	happy if they all get fresh donuts. That is, the first customer of the 
	group does not receive a donut that was left over from the previous group.
	You can freely rearrange the ordering of the groups. Return the maximum 
	possible number of happy groups after rearranging the groups.

	Example 1:
	Input: batchSize = 3, groups = [1,2,3,4,5,6]
	Output: 4
	Explanation: You can arrange the groups as [6,2,4,5,1,3]. Then the 1st, 2nd, 
	             4th, and 6th groups will be happy.
	
	Example 2:
	Input: batchSize = 4, groups = [1,3,2,5,2,2,1,6]
	Output: 4

	Constraints:
	* 1 <= batchSize <= 9
	* 1 <= groups.length <= 30
	* 1 <= groups[i] <= 10^9*/

    int maxHappyGroups(int batchSize, vector<int>& groups) {
        vector<int> freq(batchSize, 0); 
        int ans = 0; 
        for (auto group : groups) {
            group %= batchSize; 
            if (group == 0) ++ans; 
            else if (freq[batchSize - group]) {
                ++ans; 
                --freq[batchSize - group]; 
            } 
            else ++freq[group]; 
        }
        
        map<vector<int>, int> memo; 
        
        function<int(int)> fn = [&](int left) {
            if (memo.find(freq) == memo.end()) {
                int ans = 0, more = 0; 
                for (int i = 0; i < batchSize; ++i) {
                    if (freq[i]) {
                        --freq[i]; 
                        ans = max(ans, fn((left + i) % batchSize)); 
                        ++freq[i]; 
                        more = 1; 
                    }
                }
                if (left == 0 && more) ans += 1; 
                memo[freq] = ans;
            }
            return memo[freq]; 
        };
        
        return ans + fn(0); 
    }


    /*1816. Truncate Sentence (Easy)
	A sentence is a list of words that are separated by a single space with no 
	leading or trailing spaces. Each of the words consists of only uppercase 
	and lowercase English letters (no punctuation). For example, "Hello World", 
	"HELLO", and "hello world hello world" are all sentences. You are given a 
	sentence s and an integer k. You want to truncate s such that it contains 
	only the first k words. Return s after truncating it.

	Example 1:
	Input: s = "Hello how are you Contestant", k = 4
	Output: "Hello how are you"
	Explanation:
	The words in s are ["Hello", "how" "are", "you", "Contestant"].
	The first 4 words are ["Hello", "how", "are", "you"].
	Hence, you should return "Hello how are you".

	Example 2:
	Input: s = "What is the solution to this problem", k = 4
	Output: "What is the solution"
	Explanation:
	The words in s are ["What", "is" "the", "solution", "to", "this", "problem"].
	The first 4 words are ["What", "is", "the", "solution"].
	Hence, you should return "What is the solution".

	Example 3:
	Input: s = "chopper is not a tanuki", k = 5
	Output: "chopper is not a tanuki"

	Constraints:
	* 1 <= s.length <= 500
	* k is in the range [1, the number of words in s].
	* s consist of only lowercase and uppercase English letters and spaces.
	* The words in s are separated by a single space.
	* There are no leading or trailing spaces.*/

    string truncateSentence(string s, int k) {
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == ' ') {
                if (--k == 0) return s.substr(0, i); 
            }
        }
        return s; 
    }


    /*1817. Finding the Users Active Minutes (Medium)
	You are given the logs for users' actions on LeetCode, and an integer k. 
	The logs are represented by a 2D integer array logs where each 
	logs[i] = [IDi, timei] indicates that the user with IDi performed an action
	at the minute timei. Multiple users can perform actions simultaneously, 
	and a single user can perform multiple actions in the same minute. The 
	user active minutes (UAM) for a given user is defined as the number of 
	unique minutes in which the user performed an action on LeetCode. A minute 
	can only be counted once, even if multiple actions occur during it. You 
	are to calculate a 1-indexed array answer of size k such that, for each j 
	(1 <= j <= k), answer[j] is the number of users whose UAM equals j. Return 
	the array answer as described above.

	Example 1:
	Input: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5
	Output: [0,2,0,0,0]
	Explanation:
	The user with ID=0 performed actions at minutes 5, 2, and 5 again. Hence, they have a UAM of 2 (minute 5 is only counted once).
	The user with ID=1 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.
	Since both users have a UAM of 2, answer[2] is 2, and the remaining answer[j] values are 0.

	Example 2:
	Input: logs = [[1,1],[2,2],[2,3]], k = 4
	Output: [1,1,0,0]
	Explanation:
	The user with ID=1 performed a single action at minute 1. Hence, they have a UAM of 1.
	The user with ID=2 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.
	There is one user with a UAM of 1 and one with a UAM of 2.
	Hence, answer[1] = 1, answer[2] = 1, and the remaining values are 0.

	Constraints:
	* 1 <= logs.length <= 10^4
	* 0 <= IDi <= 10^9
	* 1 <= timei <= 10^5
	* k is in the range [The maximum UAM for a user, 10^5].*/

    vector<int> findingUsersActiveMinutes(vector<vector<int>>& logs, int k) {
        unordered_map<int, unordered_set<int>> mp; 
        for (auto &log : logs) {
            mp[log[0]].insert(log[1]); 
        }
        
        vector<int> ans(k, 0); 
        for (auto &x : mp) {
            if (x.second.size() <= k) 
                ++ans[x.second.size() - 1]; 
        }
        return ans; 
    }


    /*1818. Minimum Absolute Sum Difference (Medium)
	You are given two positive integer arrays nums1 and nums2, both of length n. 
	The absolute sum difference of arrays nums1 and nums2 is defined as the sum 
	of |nums1[i] - nums2[i]| for each 0 <= i < n (0-indexed). You can replace 
	at most one element of nums1 with any other element in nums1 to minimize 
	the absolute sum difference. Return the minimum absolute sum difference 
	after replacing at most one element in the array nums1. Since the answer 
	may be large, return it modulo 10^9 + 7. |x| is defined as:
	* x if x >= 0, or
	* -x if x < 0.

	Example 1:
	Input: nums1 = [1,7,5], nums2 = [2,3,5]
	Output: 3
	Explanation: There are two possible optimal solutions:
	- Replace the second element with the first: [1,7,5] => [1,1,5], or
	- Replace the second element with the third: [1,7,5] => [1,5,5].
	Both will yield an absolute sum difference of |1-2| + (|1-3| or |5-3|) + |5-5| = 3.

	Example 2:
	Input: nums1 = [2,4,6,8,10], nums2 = [2,4,6,8,10]
	Output: 0
	Explanation: nums1 is equal to nums2 so no replacement is needed. This will result in an 
	absolute sum difference of 0.

	Example 3:
	Input: nums1 = [1,10,4,4,2,7], nums2 = [9,3,5,1,7,4]
	Output: 20
	Explanation: Replace the first element with the second: [1,10,4,4,2,7] => [10,10,4,4,2,7].
	This yields an absolute sum difference of |10-9| + |10-3| + |4-5| + |4-1| + |2-7| + |7-4| = 20

	Constraints:
	* n == nums1.length
	* n == nums2.length
	* 1 <= n <= 10^5
	* 1 <= nums1[i], nums2[i] <= 10^5*/

    int minAbsoluteSumDiff(vector<int>& nums1, vector<int>& nums2) {
        vector<int> s1 = nums1; 
        sort(s1.begin(), s1.end()); 
        
        long ans = 0, bnft = 0; 
        for (int i = 0; i < nums1.size(); ++i) {
            long term = abs(nums1[i] - nums2[i]); 
            ans += term; 
            auto it = lower_bound(s1.begin(), s1.end(), nums2[i]); 
            if (it < s1.end())
                bnft = max(bnft, term - (*it - nums2[i]));
            if (s1.begin() < it) 
                bnft = max(bnft, term - (nums2[i] - *prev(it)));
        }
        return (ans - bnft) % 1'000'000'007; 
    }


    /*1819. Number of Different Subsequences GCDs (Hard)
	You are given an array nums that consists of positive integers. The GCD of 
	a sequence of numbers is defined as the greatest integer that divides all 
	the numbers in the sequence evenly. For example, the GCD of the sequence 
	[4,6,16] is 2. A subsequence of an array is a sequence that can be formed 
	by removing some elements (possibly none) of the array. For example, 
	[2,5,10] is a subsequence of [1,2,1,2,4,1,5,10]. Return the number of 
	different GCDs among all non-empty subsequences of nums.

	Example 1:
	Input: nums = [6,10,3]
	Output: 5
	Explanation: The figure shows all the non-empty subsequences and their GCDs.
	The different GCDs are 6, 10, 3, 2, and 1.

	Example 2:
	Input: nums = [5,15,40,5,6]
	Output: 7

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 2 * 10^5*/

    int countDifferentSubsequenceGCDs(vector<int>& nums) {
        auto mx = *max_element(nums.begin(), nums.end()); 
        vector<bool> seen (mx+1, false); 
        for (auto& x : nums) 
            seen[x] = true; 
        
        int ans = 0; 
        for (int x = 1; x <= mx; ++x) {
            int g = 0; 
            for (int xx = x; xx <= mx; xx += x) {
                if (seen[xx]) g = __gcd(g, xx);
            }
            if (g == x) ++ans; 
        }
        return ans; 
    }


    /*1827. Minimum Operations to Make the Array Increasing (Easy)
	You are given an integer array nums (0-indexed). In one operation, you can 
	choose an element of the array and increment it by 1. For example, if 
	nums = [1,2,3], you can choose to increment nums[1] to make nums = [1,3,3].
	Return the minimum number of operations needed to make nums strictly 
	increasing. An array nums is strictly increasing if nums[i] < nums[i+1] for 
	all 0 <= i < nums.length - 1. An array of length 1 is trivially strictly 
	increasing.

	Example 1:
	Input: nums = [1,1,1]
	Output: 3
	Explanation: You can do the following operations:
	             1) Increment nums[2], so nums becomes [1,1,2].
	             2) Increment nums[1], so nums becomes [1,2,2].
	             3) Increment nums[2], so nums becomes [1,2,3].
	
	Example 2:
	Input: nums = [1,5,2,4,1]
	Output: 14

	Example 3:
	Input: nums = [8]
	Output: 0

	Constraints:
	* 1 <= nums.length <= 5000
	* 1 <= nums[i] <= 10^4*/

    int minOperations(vector<int>& nums) {
        int ans = 0, prev = 0; 
        for (auto& x : nums) {
            ans += max(0, 1 + prev - x); 
            prev = max(1 + prev, x); 
        }
        return ans; 
    }


    /*1828. Queries on Number of Points Inside a Circle (Medium)
	You are given an array points where points[i] = [xi, yi] is the coordinates 
	of the ith point on a 2D plane. Multiple points can have the same coordinates.
	You are also given an array queries where queries[j] = [xj, yj, rj] describes 
	a circle centered at (xj, yj) with a radius of rj. For each query queries[j], 
	compute the number of points inside the jth circle. Points on the border of 
	the circle are considered inside. Return an array answer, where answer[j] 
	is the answer to the jth query.

	Example 1:
	Input: points = [[1,3],[3,3],[5,3],[2,2]], queries = [[2,3,1],[4,3,1],[1,1,2]]
	Output: [3,2,2]
	Explanation: The points and circles are shown above. queries[0] is the green 
	             circle, queries[1] is the red circle, and queries[2] is the blue 
	             circle.

	Example 2:
	Input: points = [[1,1],[2,2],[3,3],[4,4],[5,5]], queries = [[1,2,2],[2,2,2],[4,3,2],[4,3,3]]
	Output: [2,3,2,4]
	Explanation: The points and circles are shown above. queries[0] is green, 
	             queries[1] is red, queries[2] is blue, and queries[3] is purple.

	Constraints:
	* 1 <= points.length <= 500
	* points[i].length == 2
	* 0 <= x​​​​​​i, y​​​​​​i <= 500
	* 1 <= queries.length <= 500
	* queries[j].length == 3
	* 0 <= xj, yj <= 500
	* 1 <= rj <= 500
	* All coordinates are integers.

	Follow up: Could you find the answer for each query in better complexity than O(n)?*/

    vector<int> countPoints(vector<vector<int>>& points, vector<vector<int>>& queries) {
        vector<int> ans; 
        for (auto& query : queries) {
            int cnt = 0, r = query[2]; 
            for (auto& point : points) {
                if (pow(query[0]-point[0], 2) + pow(query[1]-point[1], 2) <= r*r) ++cnt; 
            }
            ans.push_back(cnt); 
        }
        return ans; 
    }


    /*1829. Maximum XOR for Each Query (Medium)
	You are given a sorted array nums of n non-negative integers and an integer 
	maximumBit. You want to perform the following query n times:
	* Find a non-negative integer k < 2maximumBit such that nums[0] XOR nums[1] 
	  XOR ... XOR nums[nums.length-1] XOR k is maximized. k is the answer to 
	  the ith query.
	* Remove the last element from the current array nums.
	Return an array answer, where answer[i] is the answer to the ith query.

	Example 1:
	Input: nums = [0,1,1,3], maximumBit = 2
	Output: [0,3,2,3]
	Explanation: The queries are answered as follows:
	             1st query: nums = [0,1,1,3], k = 0 since 0 XOR 1 XOR 1 XOR 3 XOR 0 = 3.
	             2nd query: nums = [0,1,1], k = 3 since 0 XOR 1 XOR 1 XOR 3 = 3.
	             3rd query: nums = [0,1], k = 2 since 0 XOR 1 XOR 2 = 3.
	             4th query: nums = [0], k = 3 since 0 XOR 3 = 3.

	Example 2:
	Input: nums = [2,3,4,7], maximumBit = 3
	Output: [5,2,6,5]
	Explanation: The queries are answered as follows:
	             1st query: nums = [2,3,4,7], k = 5 since 2 XOR 3 XOR 4 XOR 7 XOR 5 = 7.
	             2nd query: nums = [2,3,4], k = 2 since 2 XOR 3 XOR 4 XOR 2 = 7.
	             3rd query: nums = [2,3], k = 6 since 2 XOR 3 XOR 6 = 7.
	             4th query: nums = [2], k = 5 since 2 XOR 5 = 7.
	
	Example 3:
	Input: nums = [0,1,2,2,5,7], maximumBit = 3
	Output: [4,3,6,4,6,7]

	Constraints:
	* nums.length == n
	* 1 <= n <= 10^5
	* 1 <= maximumBit <= 20
	* 0 <= nums[i] < 2maximumBit
	* nums​​​ is sorted in ascending order.*/

    vector<int> getMaximumXor(vector<int>& nums, int maximumBit) {
        int prefix = 0; 
        vector<int> ans(size(nums), 0); 
        for (int i = 0; i < size(nums); ++i) {
            prefix ^= nums[i]; 
            ans[size(nums)-i-1] = prefix ^ ((1 << maximumBit) - 1); 
        }
        return ans; 
    }


    /*1830. Minimum Number of Operations to Make String Sorted (Hard)
	You are given a string s (0-indexed)​​​​​​. You are asked to perform the 
	following operation on s​​​​​​ until you get a sorted string:
	* Find the largest index i such that 1 <= i < s.length and s[i] < s[i - 1].
	* Find the largest index j such that i <= j < s.length and s[k] < s[i - 1] 
	  for all the possible values of k in the range [i, j] inclusive.
	* Swap the two characters at indices i - 1​​​​ and j​​​​​.
	* Reverse the suffix starting at index i​​​​​​.
	Return the number of operations needed to make the string sorted. Since the 
	answer can be too large, return it modulo 109 + 7.

	Example 1:
	Input: s = "cba"
	Output: 5
	Explanation: The simulation goes as follows:
	Operation 1: i=2, j=2. Swap s[1] and s[2] to get s="cab", then reverse the suffix starting at 2. Now, s="cab".
	Operation 2: i=1, j=2. Swap s[0] and s[2] to get s="bac", then reverse the suffix starting at 1. Now, s="bca".
	Operation 3: i=2, j=2. Swap s[1] and s[2] to get s="bac", then reverse the suffix starting at 2. Now, s="bac".
	Operation 4: i=1, j=1. Swap s[0] and s[1] to get s="abc", then reverse the suffix starting at 1. Now, s="acb".
	Operation 5: i=2, j=2. Swap s[1] and s[2] to get s="abc", then reverse the suffix starting at 2. Now, s="abc".

	Example 2:
	Input: s = "aabaa"
	Output: 2
	Explanation: The simulation goes as follows:
	Operation 1: i=3, j=4. Swap s[2] and s[4] to get s="aaaab", then reverse the substring starting at 3. Now, s="aaaba".
	Operation 2: i=4, j=4. Swap s[3] and s[4] to get s="aaaab", then reverse the substring starting at 4. Now, s="aaaab".

	Example 3:
	Input: s = "cdbea"
	Output: 63

	Example 4:
	Input: s = "leetcodeleetcodeleetcode"
	Output: 982157772

	Constraints:
	* 1 <= s.length <= 3000
	* s​​​​​​ consists only of lowercase English letters.*/

    int makeStringSorted(string s) {
        int freq[26] = {}, n = size(s), MOD = 1'000'000'007; 
        for (auto& c : s) ++freq[c - 'a']; 
        
        auto power = [](long x, int p, int m) {
            long ans = 1; 
            while (p) {
                if (p&1) {
                    ans = (ans * x) % m; 
                    p -= 1; 
                } else {
                    x = (x * x) % m; 
                    p /= 2; 
                } 
            }
            return ans; 
        };
        
        long ans = 0, fac = 1; 
        vector<long> ifac(n+1, 1); // +1 buffer 
        
        for (int i = 1; i < n; ++i) {
            fac = fac * i % MOD; 
            ifac[i] = power(fac, MOD-2, MOD); // Fermat's little theorem
        }
        
        for (auto& x : freq) fac = fac * ifac[x] % MOD; 
        
        for (int i = 0; i < n; ++i) {
            for (int k = 0; k < s[i] - 'a'; ++k) 
                ans = (ans + fac * freq[k]) % MOD; 
            fac = fac * power(n-i-1, MOD-2, MOD) % MOD; 
            fac = fac * freq[s[i] - 'a'] % MOD; 
            --freq[s[i] - 'a']; 
        }
        return ans; 
    }


    /*1832. Check if the Sentence Is Pangram (Easy)
	A pangram is a sentence where every letter of the English alphabet appears 
	at least once. Given a string sentence containing only lowercase English 
	letters, return true if sentence is a pangram, or false otherwise.

	Example 1:
	Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
	Output: true
	Explanation: sentence contains at least one of every letter of the English alphabet.

	Example 2:
	Input: sentence = "leetcode"
	Output: false

	Constraints:
	* 1 <= sentence.length <= 1000
	* sentence consists of lowercase English letters.*/

    bool checkIfPangram(string sentence) {
        unordered_set<char> seen; 
        for (auto x : sentence) {
            seen.insert(x); 
        }
        return seen.size() == 26; 
    }


    /*1833. Maximum Ice Cream Bars (Medium)
	It is a sweltering summer day, and a boy wants to buy some ice cream bars. 
	At the store, there are n ice cream bars. You are given an array costs of 
	length n, where costs[i] is the price of the ith ice cream bar in coins. 
	The boy initially has coins coins to spend, and he wants to buy as many ice 
	cream bars as possible. Return the maximum number of ice cream bars the boy 
	can buy with coins coins. Note: The boy can buy the ice cream bars in any 
	order.

	Example 1:
	Input: costs = [1,3,2,4,1], coins = 7
	Output: 4
	Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total 
	             price of 1 + 3 + 2 + 1 = 7.

	Example 2:
	Input: costs = [10,6,8,7,7,8], coins = 5
	Output: 0
	Explanation: The boy cannot afford any of the ice cream bars.

	Example 3:
	Input: costs = [1,6,3,1,2,5], coins = 20
	Output: 6
	Explanation: The boy can buy all the ice cream bars for a total price of 
	             1 + 6 + 3 + 1 + 2 + 5 = 18.

	Constraints:
	* costs.length == n
	* 1 <= n <= 10^5
	* 1 <= costs[i] <= 10^5
	* 1 <= coins <= 10^8*/

    int maxIceCream(vector<int>& costs, int coins) {
        int ans = 0; 
        sort(costs.begin(), costs.end()); 
        for (int i = 0; i < costs.size(); ++i) {
            if (costs[i] <= coins) {
                ++ans; 
                coins -= costs[i]; 
            } else break; 
        }
        return ans; 
    }


    /*1834. Single-Threaded CPU (Medium)
	You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D 
	integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] 
	means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei 
	and will take processingTimei to finish processing. You have a single-
	threaded CPU that can process at most one task at a time and will act in 
	the following way:
	* If the CPU is idle and there are no available tasks to process, the CPU 
	  remains idle.
	* If the CPU is idle and there are available tasks, the CPU will choose the 
	  one with the shortest processing time. If multiple tasks have the same 
	  shortest processing time, it will choose the task with the smallest index.
	* Once a task is started, the CPU will process the entire task without stopping.
	* The CPU can finish a task then start a new one instantly.
	Return the order in which the CPU will process the tasks.

	Example 1:
	Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
	Output: [0,2,3,1]
	Explanation: The events go as follows: 
	- At time = 1, task 0 is available to process. Available tasks = {0}.
	- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
	- At time = 2, task 1 is available to process. Available tasks = {1}.
	- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
	- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
	- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
	- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
	- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
	- At time = 10, the CPU finishes task 1 and becomes idle.
	
	Example 2:
	Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
	Output: [4,3,2,0,1]
	Explanation: The events go as follows:
	- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
	- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
	- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
	- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
	- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
	- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
	- At time = 40, the CPU finishes task 1 and becomes idle.

	Constraints:
	* tasks.length == n
	* 1 <= n <= 10^5
	* 1 <= enqueueTimei, processingTimei <= 10^9*/

    vector<int> getOrder(vector<vector<int>>& tasks) {
        for (int i = 0; i < tasks.size(); ++i) tasks[i].push_back(i); 
        sort(tasks.begin(), tasks.end()); // ascending order 
        
        vector<int> ans; 
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq; // min-heap 
        
        for (long i = 0, time = 0; pq.size() || i < tasks.size(); ) {
            for ( ; i < tasks.size() && tasks[i][0] <= time; ++i) {
                pq.emplace(tasks[i][1], tasks[i][2]); 
            }
            
            if (pq.size()) {
                auto [prc, index] = pq.top(); 
                pq.pop(); 
                ans.push_back(index); 
                time += prc; 
            } else {
                time = tasks[i][0]; 
            }
        }
        return ans; 
    }


    /*1835. Find XOR Sum of All Pairs Bitwise AND (Hard)
	The XOR sum of a list is the bitwise XOR of all its elements. If the list 
	only contains one element, then its XOR sum will be equal to this element.
	For example, the XOR sum of [1,2,3,4] is equal to 1 XOR 2 XOR 3 XOR 4 = 4, 
	and the XOR sum of [3] is equal to 3. You are given two 0-indexed arrays 
	arr1 and arr2 that consist only of non-negative integers. Consider the list 
	containing the result of arr1[i] AND arr2[j] (bitwise AND) for every (i, j) 
	pair where 0 <= i < arr1.length and 0 <= j < arr2.length. Return the XOR 
	sum of the aforementioned list.

	Example 1:
	Input: arr1 = [1,2,3], arr2 = [6,5]
	Output: 0
	Explanation: The list = [1 AND 6, 1 AND 5, 2 AND 6, 2 AND 5, 3 AND 6, 3 AND 5] = [0,1,2,0,2,1].
	The XOR sum = 0 XOR 1 XOR 2 XOR 0 XOR 2 XOR 1 = 0.

	Example 2:
	Input: arr1 = [12], arr2 = [4]
	Output: 4
	Explanation: The list = [12 AND 4] = [4]. The XOR sum = 4.

	Constraints:
	* 1 <= arr1.length, arr2.length <= 10^5
	* 0 <= arr1[i], arr2[j] <= 10^9*/

    int getXORSum(vector<int>& arr1, vector<int>& arr2) {
        return accumulate(arr1.begin(), arr1.end(), 0, bit_xor()) & accumulate(arr2.begin(), arr2.end(), 0, bit_xor());
    }


    /*1837. Sum of Digits in Base K (Easy)
	Given an integer n (in base 10) and a base k, return the sum of the digits 
	of n after converting n from base 10 to base k. After converting, each 
	digit should be interpreted as a base 10 number, and the sum should be 
	returned in base 10.

	Example 1:
	Input: n = 34, k = 6
	Output: 9
	Explanation: 34 (base 10) expressed in base 6 is 54. 5 + 4 = 9.

	Example 2:
	Input: n = 10, k = 10
	Output: 1
	Explanation: n is already in base 10. 1 + 0 = 1.

	Constraints:
	* 1 <= n <= 100
	* 2 <= k <= 10*/

    int sumBase(int n, int k) {
        int ans = 0; 
        while (n) {
            ans += n % k; 
            n /= k; 
        }
        return ans; 
    }


    /*1838. Frequency of the Most Frequent Element (Medium)
	The frequency of an element is the number of times it occurs in an array. 
	You are given an integer array nums and an integer k. In one operation, you 
	can choose an index of nums and increment the element at that index by 1. 
	Return the maximum possible frequency of an element after performing at 
	most k operations.

	Example 1:
	Input: nums = [1,2,4], k = 5
	Output: 3
	Explanation: Increment the first element three times and the second element 
	             two times to make nums = [4,4,4]. 4 has a frequency of 3.

	Example 2:
	Input: nums = [1,4,8,13], k = 5
	Output: 2
	Explanation: There are multiple optimal solutions:
	- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
	- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
	- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.

	Example 3:
	Input: nums = [3,9,6], k = 2
	Output: 1

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^5
	* 1 <= k <= 10^5*/

    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end()); 
        
        int ans = 0, ii = 0; 
        long sm = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            sm += nums[i]; 
            while (sm + k < (long) nums[i]*(i-ii+1)) {
                sm -= nums[ii]; 
                ii += 1; 
            }
            ans = max(ans, i - ii + 1); 
        }
        return ans; 
    }


    /*1839. Longest Substring Of All Vowels in Order (Medium)
	A string is considered beautiful if it satisfies the following conditions:
	* Each of the 5 English vowels ('a', 'e', 'i', 'o', 'u') must appear at 
	  least once in it.
	* The letters must be sorted in alphabetical order (i.e. all 'a's before 
	  'e's, all 'e's before 'i's, etc.).
	For example, strings "aeiou" and "aaaaaaeiiiioou" are considered beautiful, 
	but "uaeio", "aeoiu", and "aaaeeeooo" are not beautiful. Given a string 
	word consisting of English vowels, return the length of the longest 
	beautiful substring of word. If no such substring exists, return 0. A 
	substring is a contiguous sequence of characters in a string.

	Example 1:
	Input: word = "aeiaaioaaaaeiiiiouuuooaauuaeiu"
	Output: 13
	Explanation: The longest beautiful substring in word is "aaaaeiiiiouuu" of 
	             length 13.

	Example 2:
	Input: word = "aeeeiiiioooauuuaeiou"
	Output: 5
	Explanation: The longest beautiful substring in word is "aeiou" of length 5.
	
	Example 3:
	Input: word = "a"
	Output: 0
	Explanation: There is no beautiful substring, so return 0.

	Constraints:
	* 1 <= word.length <= 5 * 10^5
	* word consists of characters 'a', 'e', 'i', 'o', and 'u'.*/

    int longestBeautifulSubstring(string word) {
        int ans = 0, cnt = 1, unique = 1; 
        for (int i = 1; i < word.size(); ++i) {
            if (word[i-1] <= word[i]) {
                ++cnt; 
                if (word[i-1] < word[i]) ++unique; 
            } else {
                cnt = unique = 1; 
            }
            if (unique == 5) ans = max(ans, cnt); 
        }
        return ans; 
    }


    /*1840. Maximum Building Height (Hard)
	You want to build n new buildings in a city. The new buildings will be 
	built in a line and are labeled from 1 to n. However, there are city 
	restrictions on the heights of the new buildings:
	* The height of each building must be a non-negative integer.
	* The height of the first building must be 0.
	* The height difference between any two adjacent buildings cannot exceed 1.
	Additionally, there are city restrictions on the maximum height of specific 
	buildings. These restrictions are given as a 2D integer array restrictions 
	where restrictions[i] = [idi, maxHeighti] indicates that building idi must 
	have a height less than or equal to maxHeighti. It is guaranteed that each 
	building will appear at most once in restrictions, and building 1 will not 
	be in restrictions. Return the maximum possible height of the tallest 
	building.

	Example 1:
	Input: n = 5, restrictions = [[2,1],[4,1]]
	Output: 2
	Explanation: The green area in the image indicates the maximum allowed 
	             height for each building. We can build the buildings with 
	             heights [0,1,2,1,2], and the tallest building has a height of
	             2.

	Example 2:
	Input: n = 6, restrictions = []
	Output: 5
	Explanation: The green area in the image indicates the maximum allowed 
	             height for each building. We can build the buildings with 
	             heights [0,1,2,3,4,5], and the tallest building has a height 
	             of 5.
	
	Example 3:
	Input: n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
	Output: 5
	Explanation: The green area in the image indicates the maximum allowed 
	             height for each building. We can build the buildings with 
	             heights [0,1,2,3,3,4,4,5,4,3], and the tallest building has a 
	             height of 5.

	Constraints:
	* 2 <= n <= 10^9
	* 0 <= restrictions.length <= min(n - 1, 10^5)
	* 2 <= idi <= n
	* idi is unique.
	* 0 <= maxHeighti <= 10^9*/

    int maxBuilding(int n, vector<vector<int>>& restrictions) {
        restrictions.push_back({1, 0});
        restrictions.push_back({n, n-1}); 
        sort(restrictions.begin(), restrictions.end()); 
        for (int i = restrictions.size()-2; i >= 0; --i) {
            restrictions[i][1] = min(restrictions[i][1], restrictions[i+1][1] + restrictions[i+1][0] - restrictions[i][0]); 
        }
        
        int ans = 0; 
        for (int i = 1; i < restrictions.size(); ++i) {
            restrictions[i][1] = min(restrictions[i][1], restrictions[i-1][1] + restrictions[i][0] - restrictions[i-1][0]); 
            ans = max(ans, (restrictions[i-1][1] + restrictions[i][0] - restrictions[i-1][0] + restrictions[i][1])/2); 
        }
        return ans; 
    }


    /*1844. Replace All Digits with Characters (Easy)
	You are given a 0-indexed string s that has lowercase English letters in 
	its even indices and digits in its odd indices. There is a function 
	shift(c, x), where c is a character and x is a digit, that returns the xth 
	character after c.
	* For example, shift('a', 5) = 'f' and shift('x', 0) = 'x'.
	For every odd index i, you want to replace the digit s[i] with 
	shift(s[i-1], s[i]). Return s after replacing all digits. It is guaranteed 
	that shift(s[i-1], s[i]) will never exceed 'z'.

	Example 1:
	Input: s = "a1c1e1"
	Output: "abcdef"
	Explanation: The digits are replaced as follows:
	             - s[1] -> shift('a',1) = 'b'
	             - s[3] -> shift('c',1) = 'd'
	             - s[5] -> shift('e',1) = 'f'

	Example 2:
	Input: s = "a1b2c3d4e"
	Output: "abbdcfdhe"
	Explanation: The digits are replaced as follows:
	             - s[1] -> shift('a',1) = 'b'
	             - s[3] -> shift('b',2) = 'd'
	             - s[5] -> shift('c',3) = 'f'
	             - s[7] -> shift('d',4) = 'h'

	Constraints:
	* 1 <= s.length <= 100
	* s consists only of lowercase English letters and digits.
	* shift(s[i-1], s[i]) <= 'z' for all odd indices i.*/

    string replaceDigits(string s) {
        for (int i = 1; i < s.size(); i += 2) 
            s[i] += s[i-1] - '0'; 
        return s; 
    }


    /*1846. Maximum Element After Decreasing and Rearranging (Medium)
	You are given an array of positive integers arr. Perform some operations 
	(possibly none) on arr so that it satisfies these conditions:
	* The value of the first element in arr must be 1.
	* The absolute difference between any 2 adjacent elements must be less than 
	  or equal to 1. In other words, abs(arr[i] - arr[i - 1]) <= 1 for each i 
	  where 1 <= i < arr.length (0-indexed). abs(x) is the absolute value of x.
	There are 2 types of operations that you can perform any number of times:
	* Decrease the value of any element of arr to a smaller positive integer.
	* Rearrange the elements of arr to be in any order.
	Return the maximum possible value of an element in arr after performing the 
	operations to satisfy the conditions.

	Example 1:
	Input: arr = [2,2,1,2,1]
	Output: 2
	Explanation: We can satisfy the conditions by rearranging arr so it becomes 
	             [1,2,2,2,1]. The largest element in arr is 2.
	
	Example 2:
	Input: arr = [100,1,1000]
	Output: 3
	Explanation: One possible way to satisfy the conditions is by doing the 
	             following:
	             1. Rearrange arr so it becomes [1,100,1000].
	             2. Decrease the value of the second element to 2.
	             3. Decrease the value of the third element to 3.
	             Now arr = [1,2,3], which satisfies the conditions. The largest 
	             element in arr is 3.

	Example 3:
	Input: arr = [1,2,3,4,5]
	Output: 5
	Explanation: The array already satisfies the conditions, and the largest 
	             element is 5.

	Constraints:
	* 1 <= arr.length <= 10^5
	* 1 <= arr[i] <= 10^9*/

    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end()); 
        int ans = 0; 
        for (auto& x : arr) ans = min(1 + ans, x); 
        return ans; 
    }


    /*1847. Closest Room (Hard)
	There is a hotel with n rooms. The rooms are represented by a 2D integer 
	array rooms where rooms[i] = [roomIdi, sizei] denotes that there is a room 
	with room number roomIdi and size equal to sizei. Each roomIdi is 
	guaranteed to be unique. You are also given k queries in a 2D array queries 
	where queries[j] = [preferredj, minSizej]. The answer to the jth query is 
	the room number id of a room such that:
	* The room has a size of at least minSizej, and
	* abs(id - preferredj) is minimized, where abs(x) is the absolute value of 
	  x.
	If there is a tie in the absolute difference, then use the room with the 
	smallest such id. If there is no such room, the answer is -1. Return an 
	array answer of length k where answer[j] contains the answer to the jth 
	query.

	Example 1:
	Input: rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
	Output: [3,-1,3]
	Explanation: The answers to the queries are as follows:
	Query = [3,1]: Room number 3 is the closest as abs(3 - 3) = 0, and its size of 2 is at least 1. The answer is 3.
	Query = [3,3]: There are no rooms with a size of at least 3, so the answer is -1.
	Query = [5,2]: Room number 3 is the closest as abs(3 - 5) = 2, and its size of 2 is at least 2. The answer is 3.

	Example 2:
	Input: rooms = [[1,4],[2,3],[3,5],[4,1],[5,2]], queries = [[2,3],[2,4],[2,5]]
	Output: [2,1,3]
	Explanation: The answers to the queries are as follows:
	Query = [2,3]: Room number 2 is the closest as abs(2 - 2) = 0, and its size of 3 is at least 3. The answer is 2.
	Query = [2,4]: Room numbers 1 and 3 both have sizes of at least 4. The answer is 1 since it is smaller.
	Query = [2,5]: Room number 3 is the only room with a size of at least 5. The answer is 3.

	Constraints:
	* n == rooms.length
	* 1 <= n <= 10^5
	* k == queries.length
	* 1 <= k <= 10^4
	* 1 <= roomIdi, preferredj <= 10^7
	* 1 <= sizei, minSizej <= 10^7*/

    vector<int> closestRoom(vector<vector<int>>& rooms, vector<vector<int>>& queries) {
        for (int i = 0; i < queries.size(); ++i) queries[i].push_back(i); 
        
        sort(rooms.begin(), rooms.end(), [](auto& lhs, auto& rhs){ return lhs[1] > rhs[1]; }); 
        sort(queries.begin(), queries.end(), [](auto& lhs, auto& rhs){ return lhs[1] > rhs[1]; }); 
        
        set<int> st; // symbol table 
        vector<int> ans(queries.size(), -1); 
        for (int i = 0, k = 0; i < queries.size(); ++i) {
            while (k < rooms.size() && rooms[k][1] >= queries[i][1]) 
                st.insert(rooms[k++][0]); 
            if (st.size()) {
                auto it = st.upper_bound(queries[i][0]); 
                int diff = INT_MAX; 
                if (it != st.end()) diff = *it - queries[i][0]; 
                if (it != st.begin() && queries[i][0] - *prev(it) <= diff) --it; 
                ans[queries[i][2]] = *it; 
            } 
        }
        return ans; 
    }


    /*1848. Minimum Distance to the Target Element (Easy)
	Given an integer array nums (0-indexed) and two integers target and start, 
	find an index i such that nums[i] == target and abs(i - start) is minimized. 
	Note that abs(x) is the absolute value of x. Return abs(i - start). It is 
	guaranteed that target exists in nums.

	Example 1:
	Input: nums = [1,2,3,4,5], target = 5, start = 3
	Output: 1
	Explanation: nums[4] = 5 is the only value equal to target, so the answer 
	             is abs(4 - 3) = 1.

	Example 2:
	Input: nums = [1], target = 1, start = 0
	Output: 0
	Explanation: nums[0] = 1 is the only value equal to target, so the answer 
	             is abs(0 - 0) = 0.
	
	Example 3:
	Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
	Output: 0
	Explanation: Every value of nums is 1, but nums[0] minimizes abs(i - start), 
	             which is abs(0 - 0) = 0.

	Constraints:
	* 1 <= nums.length <= 1000
	* 1 <= nums[i] <= 10^4
	* 0 <= start < nums.length
	* target is in nums.*/

    int getMinDistance(vector<int>& nums, int target, int start) {
        int ans = INT_MAX;
        for (int i = 0; i < nums.size() && ans > abs(start - i); ++i)
            if (nums[i] == target)
                ans = abs(start - i);
        return ans;
    }


    /*1849. Splitting a String Into Descending Consecutive Values (Medium)
	You are given a string s that consists of only digits. Check if we can 
	split s into two or more non-empty substrings such that the numerical 
	values of the substrings are in descending order and the difference between 
	numerical values of every two adjacent substrings is equal to 1. For 
	example, the string s = "0090089" can be split into ["0090", "089"] with 
	numerical values [90,89]. The values are in descending order and adjacent 
	values differ by 1, so this way is valid. Another example, the string 
	s = "001" can be split into ["0", "01"], ["00", "1"], or ["0", "0", "1"]. 
	However all the ways are invalid because they have numerical values [0,1], 
	[0,1], and [0,0,1] respectively, all of which are not in descending order. 
	Return true if it is possible to split s​​​​​​ as described above, or false 
	otherwise. A substring is a contiguous sequence of characters in a string.

	Example 1:
	Input: s = "1234"
	Output: false
	Explanation: There is no valid way to split s.

	Example 2:
	Input: s = "050043"
	Output: true
	Explanation: s can be split into ["05", "004", "3"] with numerical values 
	             [5,4,3]. The values are in descending order with adjacent 
	             values differing by 1.
	
	Example 3:
	Input: s = "9080701"
	Output: false
	Explanation: There is no valid way to split s.

	Example 4:
	Input: s = "10009998"
	Output: true
	Explanation: s can be split into ["100", "099", "98"] with numerical values 
	             [100,99,98]. The values are in descending order with adjacent 
	             values differing by 1.

	Constraints:
	* 1 <= s.length <= 20
	* s only consists of digits.*/

    bool splitString(string s) {
        
        function<bool(int, double)> fn = [&](int i, long prev) {
            if (i == s.size()) return true; 
            long curr = 0; 
            for (int ii = i; ii < s.size() - (prev < 0) && curr < 10'000'000'000; ++ii) {
                curr = curr*10 + (s[ii] - '0'); 
                if ((prev < 0 || prev - 1 == curr) && fn(ii+1, curr)) return true;  
            }
            return false; 
        };
        
        return fn(0, -1); 
    }


    /*1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number (Medium)
	You are given a string num, representing a large integer, and an integer k. 
	We call some integer wonderful if it is a permutation of the digits in num 
	and is greater in value than num. There can be many wonderful integers. 
	However, we only care about the smallest-valued ones.

	For example, when num = "5489355142":
	* The 1st smallest wonderful integer is "5489355214".
	* The 2nd smallest wonderful integer is "5489355241".
	* The 3rd smallest wonderful integer is "5489355412".
	* The 4th smallest wonderful integer is "5489355421".
	Return the minimum number of adjacent digit swaps that needs to be applied 
	to num to reach the kth smallest wonderful integer. The tests are generated 
	in such a way that kth smallest wonderful integer exists.

	Example 1:
	Input: num = "5489355142", k = 4
	Output: 2
	Explanation: The 4th smallest wonderful number is "5489355421". To get this 
	             number:
	             - Swap index 7 with index 8: "5489355142" -> "5489355412"
	             - Swap index 8 with index 9: "5489355412" -> "5489355421"

	Example 2:
	Input: num = "11112", k = 4
	Output: 4
	Explanation: The 4th smallest wonderful number is "21111". To get this number:
  	             - Swap index 3 with index 4: "11112" -> "11121"
  	             - Swap index 2 with index 3: "11121" -> "11211"
  	             - Swap index 1 with index 2: "11211" -> "12111"
  	             - Swap index 0 with index 1: "12111" -> "21111"
	
	Example 3:
	Input: num = "00123", k = 1
	Output: 1
	Explanation: The 1st smallest wonderful number is "00132". To get this number:
	             - Swap index 3 with index 4: "00123" -> "00132"

	Constraints:
	* 2 <= num.length <= 1000
	* 1 <= k <= 1000
	* num only consists of digits.*/

    int getMinSwaps(string num, int k) {
        string perm = num; 
        while (k--) 
            next_permutation(perm.begin(), perm.end()); 
        
        int ans = 0; 
        for (int i = 0; i < num.size(); ++i) {
            int ii = i; 
            while (num[i] != perm[i]) {
                ++ans; 
                swap(perm[i], perm[++ii]); 
            }
        }
        return ans;         
    }


    /*1851. Minimum Interval to Include Each Query (Hard)
	You are given a 2D integer array intervals, where 
	intervals[i] = [lefti, righti] describes the ith interval starting at lefti 
	and ending at righti (inclusive). The size of an interval is defined as the 
	number of integers it contains, or more formally righti - lefti + 1. You 
	are also given an integer array queries. The answer to the jth query is the 
	size of the smallest interval i such that lefti <= queries[j] <= righti. If 
	no such interval exists, the answer is -1. Return an array containing the 
	answers to the queries.

	Example 1:
	Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
	Output: [3,3,1,4]
	Explanation: The queries are processed as follows:
	- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
	- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
	- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
	- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.

	Example 2:
	Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
	Output: [2,-1,4,6]
	Explanation: The queries are processed as follows:
	- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
	- Query = 19: None of the intervals contain 19. The answer is -1.
	- Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
	- Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.

	Constraints:
	* 1 <= intervals.length <= 10^5
	* 1 <= queries.length <= 10^5
	* intervals[i].length == 2
	* 1 <= lefti <= righti <= 10^7
	* 1 <= queries[j] <= 10^7*/
    
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        sort(intervals.begin(), intervals.end()); 
        
        vector<pair<int, int>> aug; // augmented array to queries
        for (int i = 0; i < queries.size(); ++i) 
            aug.emplace_back(queries[i], i); 
        sort(aug.begin(), aug.end()); 
        
        int k = 0; 
        vector<int> ans(queries.size(), -1); 
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq; // min-heap 
        for (auto& [query, i] : aug) {
            for (; k < intervals.size() && intervals[k][0] <= query; ++k) 
                pq.emplace(intervals[k][1] - intervals[k][0], intervals[k][1]); 
            while (pq.size() && pq.top().second < query) 
                pq.pop();
            if (pq.size()) 
                ans[i] = 1 + pq.top().first; 
        }
        return ans; 
    }


    /*1854. Maximum Population Year (Easy)
	You are given a 2D integer array logs where each logs[i] = [birthi, deathi] 
	indicates the birth and death years of the ith person. The population of 
	some year x is the number of people alive during that year. The ith person 
	is counted in year x's population if x is in the inclusive range 
	[birthi, deathi - 1]. Note that the person is not counted in the year that 
	they die. Return the earliest year with the maximum population.

	Example 1:
	Input: logs = [[1993,1999],[2000,2010]]
	Output: 1993
	Explanation: The maximum population is 1, and 1993 is the earliest year 
	             with this population.

	Example 2:
	Input: logs = [[1950,1961],[1960,1971],[1970,1981]]
	Output: 1960
	Explanation: The maximum population is 2, and it had happened in years 1960 
	             and 1970. The earlier year between them is 1960.

	Constraints:
	* 1 <= logs.length <= 100
	* 1950 <= birthi < deathi <= 2050*/

    int maximumPopulation(vector<vector<int>>& logs) {
        vector<pair<int, int>> vals; 
        for (auto log : logs) {
            vals.push_back(make_pair(log[0], 1));
            vals.push_back(make_pair(log[1], -1)); 
        }
        sort(vals.begin(), vals.end()); 
        
        int ans = 0, prefix = 0, most = 0; 
        for (auto val : vals) {
            prefix += val.second; 
            if (prefix > most) {
                most = prefix; 
                ans = val.first; 
            }
        }
        return ans; 
    }


    /*1855. Maximum Distance Between a Pair of Values (Medium)
	You are given two non-increasing 0-indexed integer arrays nums1​​​​​​ and 
	nums2​​​​​​. A pair of indices (i, j), where 0 <= i < nums1.length and 
	0 <= j < nums2.length, is valid if both i <= j and nums1[i] <= nums2[j]. 
	The distance of the pair is j - i​​​​. Return the maximum distance of any 
	valid pair (i, j). If there are no valid pairs, return 0. An array arr 
	is non-increasing if arr[i-1] >= arr[i] for every 1 <= i < arr.length.

	Example 1:
	Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
	Output: 2
	Explanation: The valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), 
	             and (4,4). The maximum distance is 2 with pair (2,4).

	Example 2:
	Input: nums1 = [2,2,2], nums2 = [10,10,1]
	Output: 1
	Explanation: The valid pairs are (0,0), (0,1), and (1,1). The maximum 
	             distance is 1 with pair (0,1).

	Example 3:
	Input: nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
	Output: 2
	Explanation: The valid pairs are (2,2), (2,3), (2,4), (3,3), and (3,4). 
	             The maximum distance is 2 with pair (2,4).
	
	Example 4:
	Input: nums1 = [5,4], nums2 = [3,2]
	Output: 0
	Explanation: There are no valid pairs, so return 0.

	Constraints:
	* 1 <= nums1.length <= 10^5
	* 1 <= nums2.length <= 10^5
	* 1 <= nums1[i], nums2[j] <= 10^5
	* Both nums1 and nums2 are non-increasing.*/

    int maxDistance(vector<int>& nums1, vector<int>& nums2) {
        int ans = 0, i = 0; 
        for (int j = 0; j < nums2.size(); ++j) {
            while (i < nums1.size() && nums1[i] > nums2[j]) ++i; 
            if (i < nums1.size()) 
                ans = max(ans, j - i); 
        }
        return ans; 
    }


    /*1856. Maximum Subarray Min-Product (Medium)
	The min-product of an array is equal to the minimum value in the array 
	multiplied by the array's sum. For example, the array [3,2,5] (minimum 
	value is 2) has a min-product of 2 * (3+2+5) = 2 * 10 = 20. Given an array 
	of integers nums, return the maximum min-product of any non-empty subarray 
	of nums. Since the answer may be large, return it modulo 10^9 + 7. Note 
	that the min-product should be maximized before performing the modulo 
	operation. Testcases are generated such that the maximum min-product 
	without modulo will fit in a 64-bit signed integer. A subarray is a 
	contiguous part of an array.

	Example 1:
	Input: nums = [1,2,3,2]
	Output: 14
	Explanation: The maximum min-product is achieved with the subarray [2,3,2] 
	             (minimum value is 2). 2 * (2+3+2) = 2 * 7 = 14.
	
	Example 2:
	Input: nums = [2,3,3,1,2]
	Output: 18
	Explanation: The maximum min-product is achieved with the subarray [3,3] 
	             (minimum value is 3). 3 * (3+3) = 3 * 6 = 18.
	
	Example 3:
	Input: nums = [3,1,5,6,4,2]
	Output: 60
	Explanation: The maximum min-product is achieved with the subarray [5,6,4] 
	             (minimum value is 4). 4 * (5+6+4) = 4 * 15 = 60.

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^7*/

    int maxSumMinProduct(vector<int>& nums) {
        vector<long> prefix = {0}; 
        for (auto x : nums) 
            prefix.push_back(prefix.back() + x); 
        
        long ans = 0; 
        stack<pair<int, int>> stk; 
        nums.push_back(0); 
        
        for (int i = 0; i < nums.size(); ++i) {
            int ii = i; 
            while (stk.size() && stk.top().second >= nums[i]) {
                ii = stk.top().first; 
                int val = stk.top().second; 
                ans = max(ans, val * (prefix[i] - prefix[ii])); 
                stk.pop(); 
            }
            stk.push(make_pair(ii, nums[i])); 
        }
        return ans % 1'000'000'007; 
    }


    /*1857. Largest Color Value in a Directed Graph (Hard)
	There is a directed graph of n colored nodes and m edges. The nodes are 
	numbered from 0 to n - 1. You are given a string colors where colors[i] is 
	a lowercase English letter representing the color of the ith node in this 
	graph (0-indexed). You are also given a 2D array edges where 
	edges[j] = [aj, bj] indicates that there is a directed edge from node aj to 
	node bj. A valid path in the graph is a sequence of nodes 
	x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to 
	xi+1 for every 1 <= i < k. The color value of the path is the number of 
	nodes that are colored the most frequently occurring color along that path. 
	Return the largest color value of any valid path in the given graph, or -1 
	if the graph contains a cycle.

	Example 1:
	Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
	Output: 3
	Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" 
	             (red in the above image).

	Example 2:
	Input: colors = "a", edges = [[0,0]]
	Output: -1
	Explanation: There is a cycle from 0 to 0.

	Constraints:
	* n == colors.length
	* m == edges.length
	* 1 <= n <= 10^5
	* 0 <= m <= 10^5
	* colors consists of lowercase English letters.
	* 0 <= aj, bj < n*/

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        int n = colors.size(); 
        
        unordered_map<int, vector<int>> graph; 
        vector<int> indeg(n); 
        for (auto edge : edges) {
            ++indeg[edge[1]]; 
            graph[edge[0]].push_back(edge[1]); 
        }
        
        stack<int> stk; 
        for (int i = 0; i < n; ++i) {
            if (indeg[i] == 0) stk.push(i); 
        }
        
        // topological sort via Kahn's algo 
        int ans = 0, cnt = 0; 
        vector<vector<int>> dp(n, vector<int>(26, 0)); 
        while (stk.size()) {
            int node = stk.top(); 
            stk.pop(); 
            ++cnt; 
            ans = max(ans, ++dp[node][colors[node] - 'a']); 
            
            for (auto child : graph[node]) {
                if (--indeg[child] == 0) stk.push(child); 
                for (int i = 0; i < 26; ++i) {
                    dp[child][i] = max(dp[node][i], dp[child][i]); 
                    ans = max(ans, dp[child][i]); 
                }
            }
        }
        return cnt == n ? ans : -1; 
    }


    /*1859. Sorting the Sentence (Easy)
	A sentence is a list of words that are separated by a single space with no 
	leading or trailing spaces. Each word consists of lowercase and uppercase 
	English letters. A sentence can be shuffled by appending the 1-indexed word 
	position to each word then rearranging the words in the sentence. For 
	example, the sentence "This is a sentence" can be shuffled as 
	"sentence4 a3 is2 This1" or "is2 sentence4 This1 a3". Given a shuffled 
	sentence s containing no more than 9 words, reconstruct and return the 
	original sentence.

	Example 1:
	Input: s = "is2 sentence4 This1 a3"
	Output: "This is a sentence"
	Explanation: Sort the words in s to their original positions 
	             "This1 is2 a3 sentence4", then remove the numbers.

	Example 2:
	Input: s = "Myself2 Me1 I4 and3"
	Output: "Me Myself and I"
	Explanation: Sort the words in s to their original positions 
	             "Me1 Myself2 and3 I4", then remove the numbers.

	Constraints:
	* 2 <= s.length <= 200
	* s consists of lowercase and uppercase English letters, spaces, and digits from 1 to 9.
	* The number of words in s is between 1 and 9.
	* The words in s are separated by a single space.
	* s contains no leading or trailing spaces.*/

    string sortSentence(string s) {
        vector<string> vals(9); 
        
        istringstream iss(s);
        string word; 
        while (iss >> word) {
            vals[word.back()-'1'] = word.substr(0, word.size()-1); 
        }
        
        string ans; 
        for (int i = 0; i < vals.size() && vals[i].size(); ++i) {
            if (i) ans += " "; 
            ans += vals[i]; 
        }
        return ans; 
    }


    /*1860. Incremental Memory Leak (Medium)
	You are given two integers memory1 and memory2 representing the available 
	memory in bits on two memory sticks. There is currently a faulty program 
	running that consumes an increasing amount of memory every second. At the 
	ith second (starting from 1), i bits of memory are allocated to the stick 
	with more available memory (or from the first memory stick if both have the 
	same available memory). If neither stick has at least i bits of available 
	memory, the program crashes. Return an array containing 
	[crashTime, memory1crash, memory2crash], where crashTime is the time (in 
	seconds) when the program crashed and memory1crash and memory2crash are the 
	available bits of memory in the first and second sticks respectively.

	Example 1:
	Input: memory1 = 2, memory2 = 2
	Output: [3,1,0]
	Explanation: The memory is allocated as follows:
	- At the 1st second, 1 bit of memory is allocated to stick 1. The first stick now has 1 bit of available memory.
	- At the 2nd second, 2 bits of memory are allocated to stick 2. The second stick now has 0 bits of available memory.
	- At the 3rd second, the program crashes. The sticks have 1 and 0 bits available respectively.

	Example 2:
	Input: memory1 = 8, memory2 = 11
	Output: [6,0,4]
	Explanation: The memory is allocated as follows:
	- At the 1st second, 1 bit of memory is allocated to stick 2. The second stick now has 10 bit of available memory.
	- At the 2nd second, 2 bits of memory are allocated to stick 2. The second stick now has 8 bits of available memory.
	- At the 3rd second, 3 bits of memory are allocated to stick 1. The first stick now has 5 bits of available memory.
	- At the 4th second, 4 bits of memory are allocated to stick 2. The second stick now has 4 bits of available memory.
	- At the 5th second, 5 bits of memory are allocated to stick 1. The first stick now has 0 bits of available memory.
	- At the 6th second, the program crashes. The sticks have 0 and 4 bits available respectively.

	Constraints: 0 <= memory1, memory2 <= 231 - 1*/

    vector<int> memLeak(int memory1, int memory2) {
        int ans = 1; 
        while (ans <= memory1 || ans <= memory2) {
            if (memory1 < memory2)
                memory2 -= ans; 
            else 
                memory1 -= ans; 
            ans += 1; 
        }
        return {ans, memory1, memory2}; 
    }


    /*1861. Rotating the Box (Medium)
	You are given an m x n matrix of characters box representing a side-view of 
	a box. Each cell of the box is one of the following:
	* A stone '#'
	* A stationary obstacle '*'
	* Empty '.'
	The box is rotated 90 degrees clockwise, causing some of the stones to fall 
	due to gravity. Each stone falls down until it lands on an obstacle, another 
	stone, or the bottom of the box. Gravity does not affect the obstacles' 
	positions, and the inertia from the box's rotation does not affect the 
	stones' horizontal positions. It is guaranteed that each stone in box rests 
	on an obstacle, another stone, or the bottom of the box. Return an n x m 
	matrix representing the box after the rotation described above.

	Example 1:
	Input: box = [["#",".","#"]]
	Output: [["."],
	         ["#"],
	         ["#"]]

	Example 2:
	Input: box = [["#",".","*","."],
	              ["#","#","*","."]]
	Output: [["#","."],
	         ["#","#"],
	         ["*","*"],
	         [".","."]]

	Example 3:
	Input: box = [["#","#","*",".","*","."],
	              ["#","#","#","*",".","."],
	              ["#","#","#",".","#","."]]
	Output: [[".","#","#"],
	         [".","#","#"],
	         ["#","#","*"],
	         ["#","*","."],
	         ["#",".","*"],
	         ["#",".","."]]

	Constraints:
	* m == box.length
	* n == box[i].length
	* 1 <= m, n <= 500
	* box[i][j] is either '#', '*', or '.'.*/

    vector<vector<char>> rotateTheBox(vector<vector<char>>& box) {
        int m = box.size(), n = box[0].size(); // dimensions 
        vector<vector<char>> ans(n, vector<char>(m)); 
        
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                ans[j][i] = box[m-1-i][j]; 
        
        for (int j = 0; j < m; ++j) {
            int k = 0; 
            for (int i = 0; i < n; ++i) {
                if (ans[i][j] == '#') {
                    ans[i][j] = '.';
                    ++k; 
                }
                if (i+1 == n || ans[i+1][j] == '*') {
                    while (k) {
                        ans[i+1-k][j] = '#'; 
                        --k; 
                    }
                }
            }
        }
        return ans; 
    }


    /*1862. Sum of Floored Pairs (Hard)
	Given an integer array nums, return the sum of floor(nums[i] / nums[j]) for 
	all pairs of indices 0 <= i, j < nums.length in the array. Since the answer 
	may be too large, return it modulo 10^9 + 7. The floor() function returns 
	the integer part of the division.

	Example 1:
	Input: nums = [2,5,9]
	Output: 10
	Explanation:
	floor(2 / 5) = floor(2 / 9) = floor(5 / 9) = 0
	floor(2 / 2) = floor(5 / 5) = floor(9 / 9) = 1
	floor(5 / 2) = 2
	floor(9 / 2) = 4
	floor(9 / 5) = 1
	We calculate the floor of the division for every pair of indices in the 
	array then sum them up.

	Example 2:
	Input: nums = [7,7,7,7,7,7,7]
	Output: 49

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^5*/

    int sumOfFlooredPairs(vector<int>& nums) {
        int m = *max_element(nums.begin(), nums.end()); 
        vector<int> vals(m+1); 
        for (auto x : nums) 
            ++vals[x]; 
        
        for (int x = m; x > 0; --x) 
            for (int xx = 2*x; xx <= m; xx += x) 
                vals[xx] += vals[x]; 
        
        for (int i = 1; i < vals.size(); ++i) 
            vals[i] += vals[i-1]; 
        
        int ans = 0; 
        for (auto x : nums) 
            ans = (ans + vals[x]) % 1'000'000'007; 
        return ans; 
    }


    /*1863. Sum of All Subset XOR Totals (Easy)
	The XOR total of an array is defined as the bitwise XOR of all its elements, 
	or 0 if the array is empty.
	* For example, the XOR total of the array [2,5,6] is 2 XOR 5 XOR 6 = 1.
	Given an array nums, return the sum of all XOR totals for every subset of 
	nums. Note that subsets with the same elements should be counted multiple 
	times. An array a is a subset of an array b if a can be obtained from b by 
	deleting some (possibly zero) elements of b.

	Example 1:
	Input: nums = [1,3]
	Output: 6
	Explanation: The 4 subsets of [1,3] are:
	- The empty subset has an XOR total of 0.
	- [1] has an XOR total of 1.
	- [3] has an XOR total of 3.
	- [1,3] has an XOR total of 1 XOR 3 = 2.
	0 + 1 + 3 + 2 = 6

	Example 2:
	Input: nums = [5,1,6]
	Output: 28
	Explanation: The 8 subsets of [5,1,6] are:
	- The empty subset has an XOR total of 0.
	- [5] has an XOR total of 5.
	- [1] has an XOR total of 1.
	- [6] has an XOR total of 6.
	- [5,1] has an XOR total of 5 XOR 1 = 4.
	- [5,6] has an XOR total of 5 XOR 6 = 3.
	- [1,6] has an XOR total of 1 XOR 6 = 7.
	- [5,1,6] has an XOR total of 5 XOR 1 XOR 6 = 2.
	0 + 5 + 1 + 6 + 4 + 3 + 7 + 2 = 28

	Example 3:
	Input: nums = [3,4,5,6,7,8]
	Output: 480
	Explanation: The sum of all XOR totals for every subset is 480.

	Constraints:
	* 1 <= nums.length <= 12
	* 1 <= nums[i] <= 20*/

    int subsetXORSum(vector<int>& nums) {
        int ans = 0; 
        for (auto x : nums) 
            ans |= x; 
        return ans * pow(2, nums.size()-1); 
    }


    /*1864. Minimum Number of Swaps to Make the Binary String Alternating (Medium)
	Given a binary string s, return the minimum number of character swaps to 
	make it alternating, or -1 if it is impossible. The string is called 
	alternating if no two adjacent characters are equal. For example, the 
	strings "010" and "1010" are alternating, while the string "0100" is not.
	Any two characters may be swapped, even if they are not adjacent.

	Example 1:
	Input: s = "111000"
	Output: 1
	Explanation: Swap positions 1 and 4: "111000" -> "101010". The string is 
	             now alternating.

	Example 2:
	Input: s = "010"
	Output: 0
	Explanation: The string is already alternating, no swaps are needed.

	Example 3:
	Input: s = "1110"
	Output: -1

	Constraints:
	* 1 <= s.length <= 1000
	* s[i] is either '0' or '1'.*/

    int minSwaps(string s) {
        int ones = 0; 
        for (auto c : s) {
            if (c == '1') ++ones; 
        }
        int zeros = s.size() - ones; 
        
        if (abs(ones - zeros) > 1) return -1; // impossible 
        
        auto fn = [&s](char x){
            int cnt = 0; 
            for (auto c : s) {
                if (x != c) ++cnt; 
                x = x == '0' ? '1' : '0'; 
            }
            return cnt/2; 
        };
        
        if (ones > zeros) return fn('1'); 
        else if (ones < zeros) return fn('0'); 
        else return min(fn('1'), fn('0'));
    }


    /*1866. Number of Ways to Rearrange Sticks With K Sticks Visible (Hard)
	There are n uniquely-sized sticks whose lengths are integers from 1 to n. 
	You want to arrange the sticks such that exactly k sticks are visible from 
	the left. A stick is visible from the left if there are no longer sticks to 
	the left of it. For example, if the sticks are arranged [1,3,2,5,4], then 
	the sticks with lengths 1, 3, and 5 are visible from the left. Given n and 
	k, return the number of such arrangements. Since the answer may be large, 
	return it modulo 109 + 7.

	Example 1:
	Input: n = 3, k = 2
	Output: 3
	Explanation: [1,3,2], [2,3,1], and [2,1,3] are the only arrangements such 
	             that exactly 2 sticks are visible. The visible sticks are 
	             underlined.
	
	Example 2:
	Input: n = 5, k = 5
	Output: 1
	Explanation: [1,2,3,4,5] is the only arrangement such that all 5 sticks are 
	             visible. The visible sticks are underlined.
	
	Example 3:
	Input: n = 20, k = 11
	Output: 647427950
	Explanation: There are 647427950 (mod 109 + 7) ways to rearrange the sticks 
	             such that exactly 11 sticks are visible.

	Constraints:
	* 1 <= n <= 1000
	* 1 <= k <= n*/

    int rearrangeSticks(int n, int k) {
        vector<vector<long>> dp(n+1, vector<long>(k+1, 0));
        
        for (int i = 0; i <= k; ++i) dp[i][i] = 1; 
        
        for (int j = 1; j <= k; ++j) {
            for (int i = j+1; i <= n; ++i) {
                dp[i][j] = ((i-1)*dp[i-1][j] + dp[i-1][j-1]) % 1'000'000'007; 
            }
        }
        return dp[n][k]; 
    }



    /*1869. Longer Contiguous Segments of Ones than Zeros (Easy)
	Given a binary string s, return true if the longest contiguous segment of 
	1s is strictly longer than the longest contiguous segment of 0s in s. 
	Return false otherwise. For example, in s = "110100010" the longest 
	contiguous segment of 1s has length 2, and the longest contiguous segment 
	of 0s has length 3. Note that if there are no 0s, then the longest 
	contiguous segment of 0s is considered to have length 0. The same applies 
	if there are no 1s.

	Example 1:
	Input: s = "1101"
	Output: true
	Explanation:
	The longest contiguous segment of 1s has length 2: "1101"
	The longest contiguous segment of 0s has length 1: "1101"
	The segment of 1s is longer, so return true.

	Example 2:
	Input: s = "111000"
	Output: false
	Explanation:
	The longest contiguous segment of 1s has length 3: "111000"
	The longest contiguous segment of 0s has length 3: "111000"
	The segment of 1s is not longer, so return false.

	Example 3:
	Input: s = "110100010"
	Output: false
	Explanation:
	The longest contiguous segment of 1s has length 2: "110100010"
	The longest contiguous segment of 0s has length 3: "110100010"
	The segment of 1s is not longer, so return false.

	Constraints:
	* 1 <= s.length <= 100
	* s[i] is either '0' or '1'.*/

    bool checkZeroOnes(string s) {
        int ones = 0, zeros = 0, cnt = 0; 
        for (int i = 0; i < s.size(); ++i) {
            if (i == 0 || s[i-1] != s[i]) cnt = 0; 
            ++cnt; 
            if (s[i] == '0') zeros = max(zeros, cnt); 
            else ones = max(ones, cnt); 
        }
        return ones > zeros; 
    }


    /*1870. Minimum Speed to Arrive on Time (Medium)
	You are given a floating-point number hour, representing the amount of time 
	you have to reach the office. To commute to the office, you must take n 
	trains in sequential order. You are also given an integer array dist of 
	length n, where dist[i] describes the distance (in kilometers) of the ith 
	train ride. Each train can only depart at an integer hour, so you may need 
	to wait in between each train ride. For example, if the 1st train ride 
	takes 1.5 hours, you must wait for an additional 0.5 hours before you can 
	depart on the 2nd train ride at the 2 hour mark. Return the minimum 
	positive integer speed (in kilometers per hour) that all the trains must 
	travel at for you to reach the office on time, or -1 if it is impossible to 
	be on time. Tests are generated such that the answer will not exceed 10^7 
	and hour will have at most two digits after the decimal point.

	Example 1:
	Input: dist = [1,3,2], hour = 6
	Output: 1
	Explanation: At speed 1:
	- The first train ride takes 1/1 = 1 hour.
	- Since we are already at an integer hour, we depart immediately at the 1 hour mark. The second train takes 3/1 = 3 hours.
	- Since we are already at an integer hour, we depart immediately at the 4 hour mark. The third train takes 2/1 = 2 hours.
	- You will arrive at exactly the 6 hour mark.

	Example 2:
	Input: dist = [1,3,2], hour = 2.7
	Output: 3
	Explanation: At speed 3:
	- The first train ride takes 1/3 = 0.33333 hours.
	- Since we are not at an integer hour, we wait until the 1 hour mark to depart. The second train ride takes 3/3 = 1 hour.
	- Since we are already at an integer hour, we depart immediately at the 2 hour mark. The third train takes 2/3 = 0.66667 hours.
	- You will arrive at the 2.66667 hour mark.

	Example 3:
	Input: dist = [1,3,2], hour = 1.9
	Output: -1
	Explanation: It is impossible because the earliest the third train can depart is at the 2 hour mark.

	Constraints:
	* n == dist.length
	* 1 <= n <= 10^5
	* 1 <= dist[i] <= 10^5
	* 1 <= hour <= 10^9
	* There will be at most two digits after the decimal point in hour.*/

    int minSpeedOnTime(vector<int>& dist, double hour) {
        int lo = 1, hi = 10'000'001; 
        while (lo < hi) {
            double mid = lo + (hi - lo)/2, tm = dist.back()/mid; 
            for (int i = 0; i < dist.size()-1; ++i) 
                tm += ceil(dist[i]/mid); 
            if (tm <= hour) hi = mid; 
            else lo = mid + 1; 
        }
        return lo < 10'000'001 ? lo : -1; 
    }


    /*1871. Jump Game VII (Medium)
	You are given a 0-indexed binary string s and two integers minJump and 
	maxJump. In the beginning, you are standing at index 0, which is equal to 
	'0'. You can move from index i to index j if the following conditions are 
	fulfilled:
	* i + minJump <= j <= min(i + maxJump, s.length - 1), and
	* s[j] == '0'.
	Return true if you can reach index s.length - 1 in s, or false otherwise.

	Example 1:
	Input: s = "011010", minJump = 2, maxJump = 3
	Output: true
	Explanation: In the first step, move from index 0 to index 3. 
	             In the second step, move from index 3 to index 5.
	
	Example 2:
	Input: s = "01101110", minJump = 2, maxJump = 3
	Output: false

	Constraints:
	* 2 <= s.length <= 10^5
	* s[i] is either '0' or '1'.
	* s[0] == '0'
	* 1 <= minJump <= maxJump < s.length*/

    bool canReach(string s, int minJump, int maxJump) {
        queue<int> q; 
        q.push(0); 
        int lo = 0; 
        while (q.size()) {
            int i = q.front(); 
            q.pop(); 
            if (i+1 == size(s)) return true; 
            for (int ii = max(lo+1, i+minJump); ii < min(i+maxJump+1, (int) size(s)); ++ii) {
                if (s[ii] == '0') q.push(ii); 
            }
            lo = max(lo, i+maxJump); 
        }
        return false; 
    }


    /*1872. Stone Game VIII (Hard)
	Alice and Bob take turns playing a game, with Alice starting first. There 
	are n stones arranged in a row. On each player's turn, while the number of 
	stones is more than one, they will do the following:
	* Choose an integer x > 1, and remove the leftmost x stones from the row.
	* Add the sum of the removed stones' values to the player's score.
	* Place a new stone, whose value is equal to that sum, on the left side of 
	  the row.
	The game stops when only one stone is left in the row. The score difference 
	between Alice and Bob is (Alice's score - Bob's score). Alice's goal is to 
	maximize the score difference, and Bob's goal is the minimize the score 
	difference. Given an integer array stones of length n where stones[i] 
	represents the value of the ith stone from the left, return the score 
	difference between Alice and Bob if they both play optimally.

	Example 1:
	Input: stones = [-1,2,-3,4,-5]
	Output: 5
	Explanation:
	- Alice removes the first 4 stones, adds (-1) + 2 + (-3) + 4 = 2 to her 
	  score, and places a stone of value 2 on the left. stones = [2,-5].
	- Bob removes the first 2 stones, adds 2 + (-5) = -3 to his score, and 
	  places a stone of value -3 on the left. stones = [-3].
	The difference between their scores is 2 - (-3) = 5.

	Example 2:
	Input: stones = [7,-6,5,10,5,-2,-6]
	Output: 13
	Explanation:
	- Alice removes all stones, adds 7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13 
	  to her score, and places a stone of value 13 on the left. stones = [13].
	The difference between their scores is 13 - 0 = 13.

	Example 3:
	Input: stones = [-10,-12]
	Output: -22
	Explanation: 
	- Alice can only make one move, which is to remove both stones. She adds 
	  (-10) + (-12) = -22 to her score and places a stone of value -22 on the 
	  left. stones = [-22].
	The difference between their scores is (-22) - 0 = -22.

	Constraints:
	* n == stones.length
	* 2 <= n <= 10^5
	* -10^4 <= stones[i] <= 10^4*/

    int stoneGameVIII(vector<int>& stones) {
        int prefix = 0; 
        for (auto& x : stones) prefix += x; 
        
        int ans = prefix; 
        for (int i = size(stones)-2; i >= 1; --i) {
            prefix -= stones[i+1]; 
            ans = max(ans, prefix - ans); 
        }
        return ans; 
    }


    /*1876. Substrings of Size Three with Distinct Characters (Easy)
	A string is good if there are no repeated characters. Given a string s, 
	return the number of good substrings of length three in s. Note that if 
	there are multiple occurrences of the same substring, every occurrence 
	should be counted. A substring is a contiguous sequence of characters in a 
	string.

	Example 1:
	Input: s = "xyzzaz"
	Output: 1
	Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and 
	             "zaz". The only good substring of length 3 is "xyz".

	Example 2:
	Input: s = "aababcabc"
	Output: 4
	Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", 
	             "bca", "cab", and "abc". The good substrings are "abc", "bca", 
	             "cab", and "abc".

	Constraints:
	* 1 <= s.length <= 100
	* s consists of lowercase English letters.*/

    int countGoodSubstrings(string s) {
        int ans = 0; 
        for (int i = 2; i < size(s); ++i) {
            if (s[i-2] != s[i-1] && s[i-1] != s[i] && s[i-2] != s[i]) 
                ++ans; 
        }
        return ans; 
    }


    /*1877. Minimize Maximum Pair Sum in Array (Medium)
	The pair sum of a pair (a,b) is equal to a + b. The maximum pair sum is the 
	largest pair sum in a list of pairs. 
	* For example, if we have pairs (1,5), (2,3), and (4,4), the maximum pair 
	  sum would be max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8.
	Given an array nums of even length n, pair up the elements of nums into 
	n / 2 pairs such that:
	* Each element of nums is in exactly one pair, and
	* The maximum pair sum is minimized.
	Return the minimized maximum pair sum after optimally pairing up the elements.
	 
	Example 1:
	Input: nums = [3,5,2,3]
	Output: 7
	Explanation: The elements can be paired up into pairs (3,3) and (5,2). The 
	             maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.
	
	Example 2:
	Input: nums = [3,5,4,2,4,6]
	Output: 8
	Explanation: The elements can be paired up into pairs (3,5), (4,4), and 
	             (6,2). The maximum pair sum is 
	             max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.

	Constraints:
	* n == nums.length
	* 2 <= n <= 10^5
	* n is even.
	* 1 <= nums[i] <= 10^5*/

    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int ans = 0; 
        for (int i = 0; i < size(nums)/2; ++i) {
            ans = max(ans, nums[i] + nums[size(nums)-1-i]); 
        }
        return ans; 
    }


    /*1878. Get Biggest Three Rhombus Sums in a Grid (Medium)
	You are given an m x n integer matrix grid. A rhombus sum is the sum of the 
	elements that form the border of a regular rhombus shape in grid. The 
	rhombus must have the shape of a square rotated 45 degrees with each of the 
	corners centered in a grid cell. Below is an image of four valid rhombus 
	shapes with the corresponding colored cells that should be included in each 
	rhombus sum. Note that the rhombus can have an area of 0, which is depicted 
	by the purple rhombus in the bottom right corner. Return the biggest three 
	distinct rhombus sums in the grid in descending order. If there are less 
	than three distinct values, return all of them.

	Example 1:
	Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
	Output: [228,216,211]
	Explanation: The rhombus shapes for the three biggest distinct rhombus sums 
	             are depicted above.
	             - Blue: 20 + 3 + 200 + 5 = 228
	             - Red: 200 + 2 + 10 + 4 = 216
	             - Green: 5 + 200 + 4 + 2 = 211
	
	Example 2:
	Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
	Output: [20,9,8]
	Explanation: The rhombus shapes for the three biggest distinct rhombus sums 
	             are depicted above.
	             - Blue: 4 + 2 + 6 + 8 = 20
	             - Red: 9 (area 0 rhombus in the bottom right corner)
	             - Green: 8 (area 0 rhombus in the bottom middle)
	
	Example 3:
	Input: grid = [[7,7,7]]
	Output: [7]
	Explanation: All three possible rhombus sums are the same, so return [7].

	Constraints:
	* m == grid.length
	* n == grid[i].length
	* 1 <= m, n <= 50
	* 1 <= grid[i][j] <= 10^5*/

    vector<int> getBiggestThree(vector<vector<int>>& grid) {
        int m = size(grid), n = size(grid[0]); // dimensions 
        set<int> s; 
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                for (int k = 0; 0 <= i-k && i+k < m && 0 <= j-k && j+k < n; ++k) {
                    int sm = 0, x = i-k, y = j, dx = 1, dy = 1; 
                    if (k == 0) sm = grid[i][j]; 
                    else {
                        for (int d = 0; d < 4; ++d) {
                            for (int step = 0; step < k; ++step) {
                                sm += grid[x][y]; 
                                x += dx; 
                                y += dy; 
                            }
                            swap(dx, dy); 
                            dy *= -1; 
                        }
                    }
                    s.insert(sm);
                    if (size(s) > 3) s.erase(begin(s)); 
                }
            }
        }
        return vector<int>(rbegin(s), rend(s)); 
    }


    /*1879. Minimum XOR Sum of Two Arrays (Hard)
	You are given two integer arrays nums1 and nums2 of length n. The XOR sum 
	of the two integer arrays is 
	(nums1[0] XOR nums2[0]) + (nums1[1] XOR nums2[1]) + ... + (nums1[n - 1] XOR nums2[n - 1]) (0-indexed).
	* For example, the XOR sum of [1,2,3] and [3,2,1] is equal to 
	  (1 XOR 3) + (2 XOR 2) + (3 XOR 1) = 2 + 0 + 2 = 4.
	Rearrange the elements of nums2 such that the resulting XOR sum is 
	minimized. Return the XOR sum after the rearrangement.

	Example 1:
	Input: nums1 = [1,2], nums2 = [2,3]
	Output: 2
	Explanation: Rearrange nums2 so that it becomes [3,2]. The XOR sum is 
	             (1 XOR 3) + (2 XOR 2) = 2 + 0 = 2.
	
	Example 2:
	Input: nums1 = [1,0,3], nums2 = [5,3,4]
	Output: 8
	Explanation: Rearrange nums2 so that it becomes [5,4,3]. The XOR sum is 
	             (1 XOR 5) + (0 XOR 4) + (3 XOR 3) = 4 + 4 + 0 = 8.

	Constraints:
	* n == nums1.length
	* n == nums2.length
	* 1 <= n <= 14
	* 0 <= nums1[i], nums2[i] <= 10^7*/

    int minimumXORSum(vector<int>& nums1, vector<int>& nums2) {
        int n = size(nums1); 
        vector<int> dp(1<<n, INT_MAX);
        dp[0] = 0; 
        
        for (int mask = 0; mask < (1<<n); ++mask) {
            int k = __builtin_popcount(mask); // count set bits 
            for (int bit = 0; bit < n; ++bit) {
                if (mask & (1<<bit)) {
                    dp[mask] = min(dp[mask], (nums1[bit] ^ nums2[k-1]) + dp[mask ^ (1<<bit)]); 
                }
            }
        }
        return dp.back(); 
    }


    /*1880. Check if Word Equals Summation of Two Words (Easy)
	The letter value of a letter is its position in the alphabet starting from 
	0 (i.e. 'a' -> 0, 'b' -> 1, 'c' -> 2, etc.). The numerical value of some 
	string of lowercase English letters s is the concatenation of the letter 
	values of each letter in s, which is then converted into an integer. 
	* For example, if s = "acb", we concatenate each letter's letter value, 
	  resulting in "021". After converting it, we get 21.
	
	You are given three strings firstWord, secondWord, and targetWord, each 
	consisting of lowercase English letters 'a' through 'j' inclusive. Return 
	true if the summation of the numerical values of firstWord and secondWord 
	equals the numerical value of targetWord, or false otherwise.

	Example 1:
	Input: firstWord = "acb", secondWord = "cba", targetWord = "cdb"
	Output: true
	Explanation:
	The numerical value of firstWord is "acb" -> "021" -> 21.
	The numerical value of secondWord is "cba" -> "210" -> 210.
	The numerical value of targetWord is "cdb" -> "231" -> 231.
	We return true because 21 + 210 == 231.

	Example 2:
	Input: firstWord = "aaa", secondWord = "a", targetWord = "aab"
	Output: false
	Explanation: 
	The numerical value of firstWord is "aaa" -> "000" -> 0.
	The numerical value of secondWord is "a" -> "0" -> 0.
	The numerical value of targetWord is "aab" -> "001" -> 1.
	We return false because 0 + 0 != 1.

	Example 3:
	Input: firstWord = "aaa", secondWord = "a", targetWord = "aaaa"
	Output: true
	Explanation: 
	The numerical value of firstWord is "aaa" -> "000" -> 0.
	The numerical value of secondWord is "a" -> "0" -> 0.
	The numerical value of targetWord is "aaaa" -> "0000" -> 0.
	We return true because 0 + 0 == 0.

	Constraints:
	* 1 <= firstWord.length, secondWord.length, targetWord.length <= 8
	* firstWord, secondWord, and targetWord consist of lowercase English 
	  letters from 'a' to 'j' inclusive.*/

    bool isSumEqual(string firstWord, string secondWord, string targetWord) {
        
        auto fn = [](string s) {
            int ans = 0; 
            for (auto& c : s) ans = 10*ans + (c - 'a'); 
            return ans; 
        };
        
        return fn(firstWord) + fn(secondWord) == fn(targetWord); 
    }


    /*1881. Maximum Value after Insertion (Medium)
	You are given a very large integer n, represented as a string, and an 
	integer digit x. The digits in n and the digit x are in the inclusive range 
	[1, 9], and n may represent a negative number. You want to maximize n's 
	numerical value by inserting x anywhere in the decimal representation of n. 
	You cannot insert x to the left of the negative sign. 
	* For example, if n = 73 and x = 6, it would be best to insert it between 7 
	  and 3, making n = 763.
	* If n = -55 and x = 2, it would be best to insert it before the first 5, 
	  making n = -255.
	Return a string representing the maximum value of n after the insertion.

	Example 1:
	Input: n = "99", x = 9
	Output: "999"
	Explanation: The result is the same regardless of where you insert 9.

	Example 2:
	Input: n = "-13", x = 2
	Output: "-123"
	Explanation: You can make n one of {-213, -123, -132}, and the largest of 
	             those three is -123.

	Constraints:
	* 1 <= n.length <= 105
	* 1 <= x <= 9
	* The digits in n are in the range [1, 9].
	* n is a valid representation of an integer.
	* In the case of a negative n, it will begin with '-'.*/ 

    string maxValue(string n, int x) {
        for (int i = 0; i < size(n); ++i) {
            if ((n[0] == '-' && x < n[i] - '0') || (n[0] != '-' && x > n[i] - '0')) 
                return n.substr(0, i) + to_string(x) + n.substr(i); 
        }
        return n + to_string(x); 
    }


    /*1882. Process Tasks Using Servers (Medium)
	You are given two 0-indexed integer arrays servers and tasks of lengths n 
	and m respectively. servers[i] is the weight of the ith server, and 
	tasks[j] is the time needed to process the jth task in seconds. You are 
	running a simulation system that will shut down after all tasks are 
	processed. Each server can only process one task at a time. You will be 
	able to process the jth task starting from the jth second beginning with 
	the 0th task at second 0. To process task j, you assign it to the server 
	with the smallest weight that is free, and in case of a tie, choose the 
	server with the smallest index. If a free server gets assigned task j at 
	second t, it will be free again at the second t + tasks[j]. If there are 
	no free servers, you must wait until one is free and execute the free tasks 
	as soon as possible. If multiple tasks need to be assigned, assign them in 
	order of increasing index. You may assign multiple tasks at the same second 
	if there are multiple free servers. Build an array ans of length m, where 
	ans[j] is the index of the server the jth task will be assigned to. Return 
	the array ans.

	Example 1:
	Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
	Output: [2,2,0,2,1,2]
	Explanation: Events in chronological order go as follows:
	- At second 0, task 0 is added and processed using server 2 until second 1.
	- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
	- At second 2, task 2 is added and processed using server 0 until second 5.
	- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
	- At second 4, task 4 is added and processed using server 1 until second 5.
	- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.

	Example 2:
	Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
	Output: [1,4,1,4,1,3,2]
	Explanation: Events in chronological order go as follows: 
	- At second 0, task 0 is added and processed using server 1 until second 2.
	- At second 1, task 1 is added and processed using server 4 until second 2.
	- At second 2, servers 1 and 4 become free. Task 2 is added and processed using server 1 until second 4. 
	- At second 3, task 3 is added and processed using server 4 until second 7.
	- At second 4, server 1 becomes free. Task 4 is added and processed using server 1 until second 9. 
	- At second 5, task 5 is added and processed using server 3 until second 7.
	- At second 6, task 6 is added and processed using server 2 until second 7.

	Constraints:
	* servers.length == n
	* tasks.length == m
	* 1 <= n, m <= 2 * 10^5
	* 1 <= servers[i], tasks[j] <= 2 * 10^5*/

    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        priority_queue<array<int, 2>, vector<array<int, 2>>, greater<>> free;
        priority_queue<array<int, 3>, vector<array<int, 3>>, greater<>> busy; 
        
        for (int i = 0; i < size(servers); ++i) 
            free.push({servers[i], i}); 
        
        vector<int> ans; 
        for (int t = 0; t < size(tasks); ++t) {
            while (size(busy) && busy.top()[0] <= t) {
                auto [tm, wt, i] = busy.top(); busy.pop(); 
                free.push({wt, i}); 
            }
            
            if (size(free)) {
                auto [wt, i] = free.top(); free.pop(); 
                ans.push_back(i); 
                busy.push({t + tasks[t], wt, i}); 
            } else {
                auto [tm, wt, i] = busy.top(); busy.pop(); 
                ans.push_back(i);
                busy.push({tm + tasks[t], wt, i}); 
            }
        }
        return ans; 
    }


    /*1883. Minimum Skips to Arrive at Meeting On Time (Hard)
	You are given an integer hoursBefore, the number of hours you have to 
	travel to your meeting. To arrive at your meeting, you have to travel 
	through n roads. The road lengths are given as an integer array dist of 
	length n, where dist[i] describes the length of the ith road in kilometers. 
	In addition, you are given an integer speed, which is the speed (in km/h) 
	you will travel at. After you travel road i, you must rest and wait for the 
	next integer hour before you can begin traveling on the next road. Note 
	that you do not have to rest after traveling the last road because you are 
	already at the meeting.
	* For example, if traveling a road takes 1.4 hours, you must wait until the 
	  2 hour mark before traveling the next road. If traveling a road takes 
	  exactly 2 hours, you do not need to wait.
	However, you are allowed to skip some rests to be able to arrive on time, 
	meaning you do not need to wait for the next integer hour. Note that this 
	means you may finish traveling future roads at different hour marks.
	* For example, suppose traveling the first road takes 1.4 hours and 
	  traveling the second road takes 0.6 hours. Skipping the rest after the 
	  first road will mean you finish traveling the second road right at the 2 
	  hour mark, letting you start traveling the third road immediately.
	Return the minimum number of skips required to arrive at the meeting on 
	time, or -1 if it is impossible.

	Example 1:
	Input: dist = [1,3,2], speed = 4, hoursBefore = 2
	Output: 1
	Explanation: Without skipping any rests, you will arrive in (1/4 + 3/4) + (3/4 + 1/4) + (2/4) = 2.5 hours. 
	             You can skip the first rest to arrive in ((1/4 + 0) + (3/4 + 0)) + (2/4) = 1.5 hours.
	             Note that the second rest is shortened because you finish 
	             traveling the second road at an integer hour due to skipping 
	             the first rest.
	
	Example 2:
	Input: dist = [7,3,5,5], speed = 2, hoursBefore = 10
	Output: 2
	Explanation: Without skipping any rests, you will arrive in 
	             (7/2 + 1/2) + (3/2 + 1/2) + (5/2 + 1/2) + (5/2) = 11.5 hours.
	             You can skip the first and third rest to arrive in 
	             ((7/2 + 0) + (3/2 + 0)) + ((5/2 + 0) + (5/2)) = 10 hours.
	
	Example 3:
	Input: dist = [7,3,5,5], speed = 1, hoursBefore = 10
	Output: -1
	Explanation: It is impossible to arrive at the meeting on time even if you 
	             skip all the rests.

	Constraints:
	* n == dist.length
	* 1 <= n <= 1000
	* 1 <= dist[i] <= 10^5
	* 1 <= speed <= 10^6
	* 1 <= hoursBefore <= 10^7*/

    int minSkips(vector<int>& dist, int speed, int hoursBefore) {
        int n = size(dist); 
        vector<vector<long>> dp(n, vector<long>(n, 0)); 
        
        for (int i = 1; i < n; ++i) 
            for (int j = 0; j < n; ++j) {
                dp[i][j] = (dp[i-1][j] + dist[i-1] + speed - 1)/speed*speed; 
                if (j) dp[i][j] = min(dp[i][j], dp[i-1][j-1] + dist[i-1]); 
            }
        
        for (int j = 0; j < n; ++j) {
            if (dp.back()[j] + dist.back() <= (long) speed * hoursBefore) return j; 
        }
        return -1; 
    }
};


/*304. Range Sum Query 2D - Immutable (Medium)
Given a 2D matrix matrix, handle multiple queries of the following type:
* Calculate the sum of the elements of matrix inside the rectangle defined by 
  its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:
* NumMatrix(int[][] matrix) Initializes the object with the integer matrix 
  matrix.
* int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the 
  elements of matrix inside the rectangle defined by its upper left corner 
  (row1, col1) and lower right corner (row2, col2).

Example 1:
Input: ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
       [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output: [null, 8, 11, 12]
Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)

Constraints:
* m == matrix.length
* n == matrix[i].length
* 1 <= m, n <= 200
* -105 <= matrix[i][j] <= 105
* 0 <= row1 <= row2 < m
* 0 <= col1 <= col2 < n
* At most 104 calls will be made to sumRegion.*/

class NumMatrix {
private: 
    vector<vector<int>> prefix; 
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        prefix = vector<vector<int>>(m+1, vector<int>(n+1, 0));
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                prefix[i+1][j+1] = matrix[i][j] + prefix[i+1][j] + prefix[i][j+1] - prefix[i][j]; 
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1] - prefix[row2+1][col1] - prefix[row1][col2+1] + prefix[row1][col1]; 
    }
};


/*703. Kth Largest Element in a Stream (Easy)
Design a class to find the kth largest element in a stream. Note that it is the 
kth largest element in the sorted order, not the kth distinct element. 
Implement KthLargest class:
* KthLargest(int k, int[] nums) Initializes the object with the integer k and 
  the stream of integers nums.
* int add(int val) Returns the element representing the kth largest element in 
  the stream.

Example 1:
Input: ["KthLargest", "add", "add", "add", "add", "add"]
       [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation: 
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

Constraints:
* 1 <= k <= 10^4
* 0 <= nums.length <= 10^4
* -104 <= nums[i] <= 10^4
* -104 <= val <= 10^4
* At most 10^4 calls will be made to add.
* It is guaranteed that there will be at least k elements in the array when you 
  search for the kth element.*/

class KthLargest {
private: 
    int k = 0; 
    priority_queue<int, vector<int>, greater<int>> pq; // min heap 
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k; 
        for (auto& x : nums) {
            pq.push(x); 
            if (pq.size() > k) 
                pq.pop(); 
        }
    }
    
    int add(int val) {
        pq.push(val); 
        if (pq.size() > k) 
            pq.pop();
        return pq.top(); 
    }
};


/*745. Prefix and Suffix Search (Hard)
Design a special dictionary with some words that searchs the words in it by a 
prefix and a suffix. Implement the WordFilter class:
* WordFilter(string[] words) Initializes the object with the words in the 
  dictionary.
* f(string prefix, string suffix) Returns the index of the word in the 
  dictionary, which has the prefix prefix and the suffix suffix. If there is 
  more than one valid index, return the largest of them. If there is no such 
  word in the dictionary, return -1.

Example 1:
Input: ["WordFilter", "f"]
       [[["apple"]], ["a", "e"]]
Output: [null, 0]
Explanation:
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = 'e".

Constraints:
* 1 <= words.length <= 15000
* 1 <= words[i].length <= 10
* 1 <= prefix.length, suffix.length <= 10
* words[i], prefix and suffix consist of lower-case English letters only.
* At most 15000 calls will be made to the function f.

class TrieNode {
public: 
    unordered_map<char, TrieNode*> children = {};
    int index = 0;
    ~TrieNode() {
        for (auto& child : children) 
            delete child.second; 
    }
};


class Trie {
public: 
    TrieNode* root; 
    Trie() { root = new TrieNode(); }
    ~Trie() { delete root; }

    void insert(string word, int index) {
        TrieNode* node = root; 
        for (auto& letter : word) {
            if (!node->children[letter]) 
                node->children[letter] = new TrieNode(); 
            node = node->children[letter];
            node->index = index; 
        }
    }

    int prefix(string word) {
        TrieNode* node = root; 
        for (auto& letter : word) {
            node = node->children[letter]; 
            if (!node) return -1; 
        }
        return node->index; 
    }
}; */


class WordFilter {
    Trie* trie; 
public:
    WordFilter(vector<string>& words) {
        trie = new Trie(); 
        for (int i = 0; i < size(words); ++i) {
            for (int j = 0; j < size(words[i]); ++j) {
                string key = words[i].substr(j) + "$" + words[i]; 
                trie->insert(key, i); 
            }
        }
    }
    
    int f(string prefix, string suffix) {
        string key = suffix + "$" + prefix; 
        return trie->prefix(key); 
    }
};


/*933. Number of Recent Calls (Easy)
You have a RecentCounter class which counts the number of recent requests 
within a certain time frame. Implement the RecentCounter class:
* RecentCounter() Initializes the counter with zero recent requests.
* int ping(int t) Adds a new request at time t, where t represents some time in 
  milliseconds, and returns the number of requests that has happened in the 
  past 3000 milliseconds (including the new request). Specifically, return the 
  number of requests that have happened in the inclusive range [t - 3000, t].
It is guaranteed that every call to ping uses a strictly larger value of t than 
the previous call.

Example 1:
Input: ["RecentCounter", "ping", "ping", "ping", "ping"]
       [[], [1], [100], [3001], [3002]]
Output: [null, 1, 2, 3, 3]
Explanation: 
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

Constraints:
* 1 <= t <= 10^9
* Each test case will call ping with strictly increasing values of t.
* At most 10^4 calls will be made to ping.*/

class RecentCounter {
private: 
    queue<int> q; 
    
public:
    RecentCounter() {}
    
    int ping(int t) {
        q.push(t); 
        while (q.front() < t-3000) {
            q.pop(); 
        }
        return q.size(); 
    }
};


/*1845. Seat Reservation Manager (Medium)
Design a system that manages the reservation state of n seats that are numbered 
from 1 to n. Implement the SeatManager class:
* SeatManager(int n) Initializes a SeatManager object that will manage n seats 
  numbered from 1 to n. All seats are initially available.
* int reserve() Fetches the smallest-numbered unreserved seat, reserves it, and 
  returns its number.
* void unreserve(int seatNumber) Unreserves the seat with the given seatNumber.

Example 1:
Input: ["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"]
       [[5], [], [], [2], [], [], [], [], [5]]
Output: [null, 1, 2, null, 2, 3, 4, 5, null]
Explanation: 
SeatManager seatManager = new SeatManager(5); // Initializes a SeatManager with 5 seats.
seatManager.reserve();    // All seats are available, so return the lowest numbered seat, which is 1.
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.unreserve(2); // Unreserve seat 2, so now the available seats are [2,3,4,5].
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.reserve();    // The available seats are [3,4,5], so return the lowest of them, which is 3.
seatManager.reserve();    // The available seats are [4,5], so return the lowest of them, which is 4.
seatManager.reserve();    // The only available seat is seat 5, so return 5.
seatManager.unreserve(5); // Unreserve seat 5, so now the available seats are [5].

Constraints:
* 1 <= n <= 10^5
* 1 <= seatNumber <= n
* For each call to reserve, it is guaranteed that there will be at least one unreserved seat.
* For each call to unreserve, it is guaranteed that seatNumber will be reserved.
* At most 10^5 calls in total will be made to reserve and unreserve.*/

class SeatManager {
private: 
    priority_queue<int, vector<int>, greater<>> pq; // min-heap 
public:
    SeatManager(int n) {
        for (int x = 1; x <= n; ++x) 
            pq.push(x); 
    }
    
    int reserve() {
        int ans = pq.top(); 
        pq.pop(); 
        return ans; 
    }
    
    void unreserve(int seatNumber) {
        pq.push(seatNumber); 
    }
};


/*1865. Finding Pairs With a Certain Sum (Medium)
You are given two integer arrays nums1 and nums2. You are tasked to implement a 
data structure that supports queries of two types:
* Add a positive integer to an element of a given index in the array nums2.
* Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given 
  value (0 <= i < nums1.length and 0 <= j < nums2.length).

Implement the FindSumPairs class:
* FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object 
  with two integer arrays nums1 and nums2.
* void add(int index, int val) Adds val to nums2[index], i.e., apply 
  nums2[index] += val.
* int count(int tot) Returns the number of pairs (i, j) such that 
  nums1[i] + nums2[j] == tot.

Example 1:
Input: ["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
       [[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output: [null, 8, null, 2, 1, null, null, 11]
Explanation
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4

Constraints:
* 1 <= nums1.length <= 1000
* 1 <= nums2.length <= 10^5
* 1 <= nums1[i] <= 10^9
* 1 <= nums2[i] <= 10^5
* 0 <= index < nums2.length
* 1 <= val <= 10^5
* 1 <= tot <= 10^9
* At most 1000 calls are made to add and count each.*/

class FindSumPairs {
    vector<int> nums1, nums2; 
    unordered_map<int, int> freq; 
public:
    FindSumPairs(vector<int>& nums1, vector<int>& nums2) {
        this->nums1 = nums1; 
        this->nums2 = nums2; 
        for (auto x : nums2) 
            ++freq[x]; 
    }
    
    void add(int index, int val) {
        --freq[nums2[index]]; 
        nums2[index] += val; 
        ++freq[nums2[index]]; 
    }
    
    int count(int tot) {
        int ans = 0; 
        for (auto x : nums1) {
            ans += freq[tot - x]; 
        }
        return ans; 
    }
};