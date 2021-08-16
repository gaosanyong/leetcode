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
        unordered_map<int, int> seen; 
        for (int i = 0; i < nums.size(); ++i) {
            if (seen.count(target - nums[i])) return {seen[target-nums[i]], i}; 
            seen[nums[i]] = i; 
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


    /*16. 3Sum Closest (Medium)
	Given an array nums of n integers and an integer target, find three 
	integers in nums such that the sum is closest to target. Return the sum of 
	the three integers. You may assume that each input would have exactly one 
	solution.

	Example 1:
	Input: nums = [-1,2,1,-4], target = 1
	Output: 2
	Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

	Constraints:
	* 3 <= nums.length <= 10^3
	* -10^3 <= nums[i] <= 10^3
	* -10^4 <= target <= 10^4*/

    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end()); 
        int ans = nums[0] + nums[1] + nums[2]; 
        for (int i = 0; i < nums.size(); ++i) {
            int lo = i+1, hi = nums.size()-1; 
            while (lo < hi) {
                int sm = nums[i] + nums[lo] + nums[hi]; 
                if (abs(sm - target) < abs(ans - target)) ans = sm; 
                if (sm < target) ++lo; 
                else --hi; 
            }
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


    /*18. 4Sum (Medium)
	Given an array nums of n integers, return an array of all the unique 
	quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
	* 0 <= a, b, c, d < n
	* a, b, c, and d are distinct.
	* nums[a] + nums[b] + nums[c] + nums[d] == target
	You may return the answer in any order.

	Example 1:
	Input: nums = [1,0,-1,0,-2,2], target = 0
	Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

	Example 2:
	Input: nums = [2,2,2,2,2], target = 8
	Output: [[2,2,2,2]]

	Constraints:
	* 1 <= nums.length <= 200
	* -10^9 <= nums[i] <= 10^9
	* -10^9 <= target <= 10^9*/

    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end()); 

        vector<vector<int>> ans; 
        for (int i = 0; i < nums.size(); ++i) {
            if (i && nums[i-1] == nums[i]) continue; 
            for (int j = i+1; j < nums.size(); ++j) {
                if (i+1 < j && nums[j-1] == nums[j]) continue; 
                int lo = j+1, hi = nums.size()-1; 
                while (lo < hi) {
                    int sm = nums[i] + nums[j] + nums[lo] + nums[hi]; 
                    if (sm < target || (j+1 < lo && nums[lo-1] == nums[lo])) ++lo; 
                    else if (sm > target || (hi+1 < nums.size() && nums[hi] == nums[hi+1])) --hi; 
                    else ans.push_back({nums[i], nums[j], nums[lo++], nums[hi--]}); 
                }
            }
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


    /*22. Generate Parentheses (Medium)
	Given n pairs of parentheses, write a function to generate all combinations 
	of well-formed parentheses.

	Example 1:
	Input: n = 3
	Output: ["((()))","(()())","(())()","()(())","()()()"]

	Example 2:
	Input: n = 1
	Output: ["()"]

	Constraints: 1 <= n <= 8*/

    vector<string> generateParenthesis(int n) {
        vector<vector<string>> ans = {{""}}; 
        for (int k = 1; k <= n; ++k) {
            ans.push_back({}); 
            for (int i = 0; i < k; ++i) 
                for (auto& x : ans[i]) 
                    for (auto& y : ans[k-i-1]) 
                        ans.back().push_back(x + "(" + y + ")"); 
        }
        return ans.back(); 
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


    /*42. Trapping Rain Water (Hard)
	Given n non-negative integers representing an elevation map where the width 
	of each bar is 1, compute how much water it can trap after raining.

	Example 1:
	Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
	Output: 6
	Explanation: The above elevation map (black section) is represented by 
	             array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain 
	             water (blue section) are being trapped.
	
	Example 2:
	Input: height = [4,2,0,3,2,5]
	Output: 9

	Constraints:
	* n == height.length
	* 0 <= n <= 3 * 10^4
	* 0 <= height[i] <= 10^5*/

    int trap(vector<int>& height) {
        int ans = 0, left = 0, right = 0, lo = 0, hi = height.size()-1; 
        while (lo < hi) {
            if (height[lo] < height[hi]) {
                left = max(left, height[lo]); 
                ans += left - height[lo++]; 
            } else {
                right = max(right, height[hi]); 
                ans += right - height[hi--]; 
            }
        }
        return ans; 
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


    /*49. Group Anagrams (Medium)
	Given an array of strings strs, group the anagrams together. You can return 
	the answer in any order. An Anagram is a word or phrase formed by 
	rearranging the letters of a different word or phrase, typically using all 
	the original letters exactly once.

	Example 1:
	Input: strs = ["eat","tea","tan","ate","nat","bat"]
	Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

	Example 2:
	Input: strs = [""]
	Output: [[""]]

	Example 3:
	Input: strs = ["a"]
	Output: [["a"]]

	Constraints:
	* 1 <= strs.length <= 10^4
	* 0 <= strs[i].length <= 100
	* strs[i] consists of lower-case English letters.*/

    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp; 
        for (auto& word : strs) {
            string key = word; 
            sort(key.begin(), key.end()); 
            mp[key].push_back(word); 
        }
        vector<vector<string>> ans; 
        for (auto& [k, v] : mp) ans.push_back(v); 
        return ans; 
    }


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


    /*73. Set Matrix Zeroes (Medium)
	Given an m x n integer matrix matrix, if an element is 0, set its entire 
	row and column to 0's, and return the matrix. You must do it in place.

	Example 1:
	Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
	Output: [[1,0,1],[0,0,0],[1,0,1]]

	Example 2:
	Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
	Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

	Constraints:
	* m == matrix.length
	* n == matrix[0].length
	* 1 <= m, n <= 200
	* -2^31 <= matrix[i][j] <= 2^31 - 1

	Follow up:
	* A straightforward solution using O(mn) space is probably a bad idea.
	* A simple improvement uses O(m + n) space, but still not the best solution.
	* Could you devise a constant space solution?*/

    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), flag = 0; 
        for (int i = 0; i < m; ++i) {
            if (matrix[i][0] == 0) flag = 1; 
            for (int j = 1; j < n; ++j) 
                if (matrix[i][j] == 0)
                    matrix[i][0] = matrix[0][j] = 0; 
        }
        
        for (int i = m-1; i >= 0; --i) {
            for (int j = n-1; j >= 1; --j) 
                if (matrix[i][0] == 0 || matrix[0][j] == 0) 
                    matrix[i][j] = 0; 
            if (flag) matrix[i][0] = 0; 
        }
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


    /*89. Gray Code (Medium)
	An n-bit gray code sequence is a sequence of 2n integers where:
	* Every integer is in the inclusive range [0, 2n - 1],
	* The first integer is 0,
	* An integer appears no more than once in the sequence,
	* The binary representation of every pair of adjacent integers differs by 
	  exactly one bit, and
	* The binary representation of the first and last integers differs by 
	  exactly one bit.
	Given an integer n, return any valid n-bit gray code sequence.

	Example 1:
	Input: n = 2
	Output: [0,1,3,2]
	Explanation: The binary representation of [0,1,3,2] is [00,01,11,10].
	             - 00 and 01 differ by one bit
	             - 01 and 11 differ by one bit
	             - 11 and 10 differ by one bit
	             - 10 and 00 differ by one bit
	             [0,2,3,1] is also a valid gray code sequence, whose binary 
	             representation is [00,10,11,01].
	             - 00 and 10 differ by one bit
	             - 10 and 11 differ by one bit
	             - 11 and 01 differ by one bit
	             - 01 and 00 differ by one bit
	
	Example 2:
	Input: n = 1
	Output: [0,1]

	Constraints: 1 <= n <= 16*/

    vector<int> grayCode(int n) {
        vector<int> ans(1); 
        for (int i = 1; i < (1 << n); ++i) 
            ans.push_back(ans.back() ^ (i & -i)); 
        return ans; 
    }


    /*90. Subsets II (Medium)
	Given an integer array nums that may contain duplicates, return all 
	possible subsets (the power set). The solution set must not contain 
	duplicate subsets. Return the solution in any order.

	Example 1:
	Input: nums = [1,2,2]
	Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

	Example 2:
	Input: nums = [0]
	Output: [[],[0]]

	Constraints:
	* 1 <= nums.length <= 10
	* -10 <= nums[i] <= 10*/

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end()); 
        vector<vector<int>> ans; 
        vector<int> stk; 
        
        function<void(int)> fn = [&](int i) {
            if (i == nums.size()) ans.push_back(stk); 
            else {
                if (stk.empty() || stk.back() != nums[i]) fn(i+1); 
                stk.push_back(nums[i]); 
                fn(i+1); 
                stk.pop_back(); 
            }
        }; 
        
        fn(0); 
        return ans; 
    }


    /*92. Reverse Linked List II (Medium)
	Given the head of a singly linked list and two integers left and right 
	where left <= right, reverse the nodes of the list from position left to 
	position right, and return the reversed list.

	Example 1:
	Input: head = [1,2,3,4,5], left = 2, right = 4
	Output: [1,4,3,2,5]

	Example 2:
	Input: head = [5], left = 1, right = 1
	Output: [5]

	Constraints:
	* The number of nodes in the list is n.
	* 1 <= n <= 500
	* -500 <= Node.val <= 500
	* 1 <= left <= right <= n

	Follow up: Could you do it in one pass?*/

    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode *dummy = new ListNode(0, head), *node = dummy, *prev = nullptr; 
        for (int i = 0; i < left; ++i) {
            prev = node; 
            node = node->next; 
        }
        
        ListNode *pp = prev, *nn = node; 
        for (int i = left; i <= right; ++i) {
            ListNode* temp = node->next; 
            node->next = prev; 
            prev = node; 
            node = temp; 
        }
        
        pp->next = prev; 
        nn->next = node; 
        
        return dummy->next; 
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


    /*97. Interleaving String (Medium)
	Given strings s1, s2, and s3, find whether s3 is formed by an interleaving 
	of s1 and s2. An interleaving of two strings s and t is a configuration 
	where they are divided into non-empty substrings such that:
	* s = s1 + s2 + ... + sn
	* t = t1 + t2 + ... + tm
	* |n - m| <= 1
	* The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or 
	  t1 + s1 + t2 + s2 + t3 + s3 + ...
	Note: a + b is the concatenation of strings a and b.

	Example 1:
	Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
	Output: true

	Example 2:
	Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
	Output: false

	Example 3:
	Input: s1 = "", s2 = "", s3 = ""
	Output: true

	Constraints:
	* 0 <= s1.length, s2.length <= 100
	* 0 <= s3.length <= 200
	* s1, s2, and s3 consist of lowercase English letters.

	Follow up: Could you solve it using only O(s2.length) additional memory 
	           space?*/

    bool isInterleave(string s1, string s2, string s3) {
        if (size(s1) + size(s2) != size(s3)) return false; 
        
        vector<bool> dp(size(s2)+1, false); 
        dp.back() = true; 
        for (int i = size(s1); i >= 0; --i) {
            for (int j = size(s2); j >= 0; --j) {
                if (i < size(s1)) dp[j] = dp[j] && s1[i] == s3[i+j]; 
                if (j < size(s2)) dp[j] = dp[j] || (dp[j+1] && s2[j] == s3[i+j]); 
            }
        }
        return dp[0]; 
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


    /*105. Construct Binary Tree from Preorder and Inorder Traversal (Medium)
	Given two integer arrays preorder and inorder where preorder is the 
	preorder traversal of a binary tree and inorder is the inorder traversal of 
	the same tree, construct and return the binary tree.

	Example 1:
	Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
	Output: [3,9,20,null,null,15,7]

	Example 2:
	Input: preorder = [-1], inorder = [-1]
	Output: [-1]

	Constraints:
	* 1 <= preorder.length <= 3000
	* inorder.length == preorder.length
	* -3000 <= preorder[i], inorder[i] <= 3000
	* preorder and inorder consist of unique values.
	* Each value of inorder also appears in preorder.
	* preorder is guaranteed to be the preorder traversal of the tree.
	* inorder is guaranteed to be the inorder traversal of the tree.*/

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> loc; 
        for (int i = 0; i < size(inorder); ++i) loc[inorder[i]] = i; 
        
        TreeNode *root = NULL, *node = NULL; 
        stack<TreeNode*> stk; 
        
        for (auto& x : preorder) {
            if (!root) {
                node = root = new TreeNode(x); 
            } else if (loc[x] < loc[node->val]) {
                stk.push(node); 
                node = node->left = new TreeNode(x); 
            } else {
                while (size(stk) && loc[stk.top()->val] < loc[x]) {
                    node = stk.top(); stk.pop(); 
                }
                node = node->right = new TreeNode(x); 
            }
        }
        return root; 
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

    TreeNode* sortedArrayToBST(vector<int>& nums) {
        
        function<TreeNode*(int, int)> fn = [&](int lo, int hi) -> TreeNode* {
            if (lo == hi) return nullptr; 
            int mid = lo + (hi - lo)/2; 
            return new TreeNode(nums[mid], fn(lo, mid), fn(mid+1, hi)); 
        }; 
        
        return fn(0, nums.size()); 
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


    /*113. Path Sum II (Medium)
	Given the root of a binary tree and an integer targetSum, return all root-
	to-leaf paths where each path's sum equals targetSum. A leaf is a node with 
	no children.

	Example 1:
	Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
	Output: [[5,4,11,2],[5,8,4,5]]

	Example 2:
	Input: root = [1,2,3], targetSum = 5
	Output: []

	Example 3:
	Input: root = [1,2], targetSum = 0
	Output: []

	Constraints:
	* The number of nodes in the tree is in the range [0, 5000].
	* -1000 <= Node.val <= 1000
	* -1000 <= targetSum <= 1000*/

    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> ans; 
        if (root) {
            unordered_map<TreeNode*, TreeNode*> parent; 
            vector<TreeNode*> leaf; 
            stack<pair<TreeNode*, int>> stk; 
            stk.emplace(root, root->val); 
            while (stk.size()) {
                auto [node, val] = stk.top(); stk.pop(); 
                if (!node->left && !node->right && val == targetSum) leaf.push_back(node); 
                if (node->left) {
                    parent[node->left] = node; 
                    stk.emplace(node->left, val + node->left->val); 
                }
                if (node->right) {
                    parent[node->right] = node; 
                    stk.emplace(node->right, val + node->right->val); 
                }
            }
            
            for (auto& node : leaf) {
                vector<int> path; 
                while (node) {
                    path.push_back(node->val); 
                    node = parent[node]; 
                }
                reverse(path.begin(), path.end()); 
                ans.push_back(path); 
            }
        }
        return ans; 
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


    /*118. Pascal's Triangle (Easy)
	Given an integer numRows, return the first numRows of Pascal's triangle. In 
	Pascal's triangle, each number is the sum of the two numbers directly above 
	it as shown:
	 
	Example 1:
	Input: numRows = 5
	Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

	Example 2:
	Input: numRows = 1
	Output: [[1]]

	Constraints: 1 <= numRows <= 30*/

    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> ans(numRows); 
        for (int i = 0; i < numRows; ++i) {
            ans[i].resize(i+1); 
            ans[i][0] = ans[i][i] = 1; 
            for (int j = 1; j < i; ++j) {
                ans[i][j] = ans[i-1][j-1] + ans[i-1][j]; 
            }
        }
        return ans; 
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


    /*126. Word Ladder II (Hard)
	A transformation sequence from word beginWord to word endWord using a 
	dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> 
	sk such that:
	* Every adjacent pair of words differs by a single letter.
	* Every si for 1 <= i <= k is in wordList. Note that beginWord does not 
	  need to be in wordList.
	* sk == endWord
	Given two words, beginWord and endWord, and a dictionary wordList, return 
	all the shortest transformation sequences from beginWord to endWord, or an 
	empty list if no such sequence exists. Each sequence should be returned as 
	a list of the words [beginWord, s1, s2, ..., sk].

	Example 1:
	Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
	Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
	Explanation: There are 2 shortest transformation sequences:
	             "hit" -> "hot" -> "dot" -> "dog" -> "cog"
	             "hit" -> "hot" -> "lot" -> "log" -> "cog"
	
	Example 2:
	Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
	Output: []
	Explanation: The endWord "cog" is not in wordList, therefore there is no 
	             valid transformation sequence.

	Constraints:
	* 1 <= beginWord.length <= 5
	* endWord.length == beginWord.length
	* 1 <= wordList.length <= 1000
	* wordList[i].length == beginWord.length
	* beginWord, endWord, and wordList[i] consist of lowercase English letters.
	* beginWord != endWord
	* All the words in wordList are unique.*/

    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        auto it = find(wordList.begin(), wordList.end(), endWord); 
        if (it == wordList.end()) return {}; 
        
        unordered_map<string, vector<string>> graph; 
        for (auto& word : wordList) 
            for (int i = 0; i < word.size(); ++i) {
                string key = word.substr(0, i) + "*" + word.substr(i+1); 
                graph[key].push_back(word); 
            }
        
        queue<string> q; 
        q.push(beginWord); 
        unordered_map<string, unordered_set<string>> prev({{beginWord, {}}}); 
        
        while (q.size()) {
            unordered_map<string, unordered_set<string>> pp; 
            for (int n = q.size(); n; --n) {
                string w = q.front(); q.pop(); 
                for (int i = 0; i < w.size(); ++i) {
                    string key = w.substr(0, i) + "*" + w.substr(i+1); 
                    for (auto& ww : graph[key]) 
                        if (!prev.count(ww)) {
                            q.push(ww); 
                            pp[ww].insert(w); 
                        }
                }
            }
            for (auto& [k, v] : pp) prev[k] = v; 
            if (prev.count(endWord)) break; 
        }
        
        if (!prev.count(endWord)) return {}; 
        
        vector<vector<string>> ans = {{endWord}}; 
        while (prev[ans[0].back()].size()) {
            vector<vector<string>> newq; 
            for (auto& x : ans) 
                for (auto& ww : prev[x.back()]) {
                    vector<string> xx = x; 
                    xx.push_back(ww); 
                    newq.push_back(xx); 
                }
            ans = newq; 
        }
        for (auto& x : ans) reverse(x.begin(), x.end()); 
        return ans; 
    }


    /*128. Longest Consecutive Sequence (Medium)
	Given an unsorted array of integers nums, return the length of the longest 
	consecutive elements sequence. You must write an algorithm that runs in O(n) 
	time.

	Example 1:
	Input: nums = [100,4,200,1,3,2]
	Output: 4
	Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. 
	             Therefore its length is 4.
	
	Example 2:
	Input: nums = [0,3,7,2,5,8,4,6,0,1]
	Output: 9

	Constraints:
	* 0 <= nums.length <= 10^5
	* -10^9 <= nums[i] <= 10^9*/

    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> seen (begin(nums), end(nums)); 
        int ans = 0; 
        for (auto& x : nums) {
            if (!seen.count(x-1)) {
                int xx = x+1; 
                while (seen.count(xx)) ++xx; 
                ans = max(ans, xx-x); 
            }
        }
        return ans; 
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


    /*162. Find Peak Element (Medium)
	A peak element is an element that is strictly greater than its neighbors. 
	Given an integer array nums, find a peak element, and return its index. If 
	the array contains multiple peaks, return the index to any of the peaks.
	You may imagine that nums[-1] = nums[n] = -∞. You must write an algorithm 
	that runs in O(log n) time.

	Example 1:
	Input: nums = [1,2,3,1]
	Output: 2
	Explanation: 3 is a peak element and your function should return the index 
	             number 2.
	
	Example 2:
	Input: nums = [1,2,1,3,5,6,4]
	Output: 5
	Explanation: Your function can return either index number 1 where the peak 
	             element is 2, or index number 5 where the peak element is 6.

	Constraints:
	* 1 <= nums.length <= 1000
	* -2^31 <= nums[i] <= 2^31 - 1
	* nums[i] != nums[i + 1] for all valid i.*/

    int findPeakElement(vector<int>& nums) {
        int lo = 0, hi = nums.size()-1; 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (nums[mid] > nums[mid+1]) hi = mid;
            else lo = mid + 1; 
        }
        return lo; 
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


    /*205. Isomorphic Strings (Easy)
	Given two strings s and t, determine if they are isomorphic. Two strings s 
	and t are isomorphic if the characters in s can be replaced to get t. All 
	occurrences of a character must be replaced with another character while 
	preserving the order of characters. No two characters may map to the same 
	character, but a character may map to itself.

	Example 1:
	Input: s = "egg", t = "add"
	Output: true

	Example 2:
	Input: s = "foo", t = "bar"
	Output: false

	Example 3:
	Input: s = "paper", t = "title"
	Output: true

	Constraints:
	* 1 <= s.length <= 5 * 10^4
	* t.length == s.length
	* s and t consist of any valid ascii character.*/

    bool isIsomorphic(string s, string t) {
        int mps[256] = {0}, mpt[256] = {0}; 
        for (int i = 0; i < s.size(); ++i) {
            if (mps[s[i]] != mpt[t[i]]) return false; 
            mps[s[i]] = mpt[t[i]] = i+1; 
        }
        return true; 
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
        if (p->val > q->val) swap(p, q); 
        TreeNode* node = root; 
        while (node) {
            if (node->val < p->val) node = node->right; 
            else if (p->val <= node->val && node->val <= q->val) break; 
            else node = node->left; 
        }
        return node; 
    }


    /*236. Lowest Common Ancestor of a Binary Tree (Medium)
	Given a binary tree, find the lowest common ancestor (LCA) of two given 
	nodes in the tree. According to the definition of LCA on Wikipedia: “The 
	lowest common ancestor is defined between two nodes p and q as the lowest 
	node in T that has both p and q as descendants (where we allow a node to 
	be a descendant of itself).”

	Example 1:
	Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
	Output: 3
	Explanation: The LCA of nodes 5 and 1 is 3.

	Example 2:
	Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
	Output: 5
	Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a 
	             descendant of itself according to the LCA definition.
	
	Example 3:
	Input: root = [1,2], p = 1, q = 2
	Output: 1

	Constraints:
	* The number of nodes in the tree is in the range [2, 10^5].
	* -10^9 <= Node.val <= 10^9
	* All Node.val are unique.
	* p != q
	* p and q will exist in the tree.*/

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root; 
        TreeNode *left = lowestCommonAncestor(root->left, p, q), *right = lowestCommonAncestor(root->right, p, q); 
        if (left && right) return root; 
        return left ? left : right; 
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


    /*276. Paint Fence (Medium)
	You are painting a fence of n posts with k different colors. You must paint 
	the posts following these rules:
	* Every post must be painted exactly one color.
	* There cannot be three or more consecutive posts with the same color.
	Given the two integers n and k, return the number of ways you can paint the 
	fence.

	Example 1:
	Input: n = 3, k = 2
	Output: 6
	Explanation: All the possibilities are shown. Note that painting all the 
	             posts red or all the posts green is invalid because there 
	             cannot be three posts in a row with the same color.
	
	Example 2:
	Input: n = 1, k = 1
	Output: 1

	Example 3:
	Input: n = 7, k = 2
	Output: 42

	Constraints:
	* 1 <= n <= 50
	* 1 <= k <= 10^5
	* The testcases are generated such that the answer is in the range 
	  [0, 2^31 - 1] for the given n and k.*/

    int numWays(int n, int k) {
        if (n == 0) return 0; 
        if (n == 1) return k; 
        int f0 = k, f1 = k*k; 
        for (int i = 2; i < n; ++i) {
            int tmp = f1; 
            f1 = (f0 + f1) * (k-1); 
            f0 = tmp; 
        }
        return f1; 
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


    /*363. Max Sum of Rectangle No Larger Than K (Hard)
	Given an m x n matrix matrix and an integer k, return the max sum of a 
	rectangle in the matrix such that its sum is no larger than k. It is 
	guaranteed that there will be a rectangle with a sum no larger than k.

	Example 1:
	Input: matrix = [[1,0,1],[0,-2,3]], k = 2
	Output: 2
	Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, 
	             and 2 is the max number no larger than k (k = 2).
	
	Example 2:
	Input: matrix = [[2,2,-1]], k = 3
	Output: 3

	Constraints:
	* m == matrix.length
	* n == matrix[i].length
	* 1 <= m, n <= 100
	* -100 <= matrix[i][j] <= 100
	* -10^5 <= k <= 10^5

	Follow up: What if the number of rows is much larger than the number of 
	           columns?*/

    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        int m = size(matrix), n = size(matrix[0]); 
        vector<vector<int>> rsum(m, vector<int>(n+1)); 
        
        int ans = INT_MIN; 
        for (int j = 0; j < n; ++j) {
            for (int i = 0; i < m; ++i) rsum[i][j+1] = matrix[i][j] + rsum[i][j]; 
            for (int jj = 0; jj <= j; ++jj) {
                int prefix = 0; 
                set<int> seen; 
                for (int i = 0; i < m; ++i) {
                    seen.insert(prefix); 
                    prefix += rsum[i][j+1] - rsum[i][jj]; 
                    auto it = seen.lower_bound(prefix - k); 
                    if (it != seen.end()) ans = max(ans, prefix - *it); 
                }
            }
        }
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


    /*378. Kth Smallest Element in a Sorted Matrix (Medium)
	Given an n x n matrix where each of the rows and columns are sorted in 
	ascending order, return the kth smallest element in the matrix. Note that 
	it is the kth smallest element in the sorted order, not the kth distinct 
	element.

	Example 1:
	Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
	Output: 13
	Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and 
	             the 8th smallest number is 13
	
	Example 2:
	Input: matrix = [[-5]], k = 1
	Output: -5

	Constraints:
	* n == matrix.length
	* n == matrix[i].length
	* 1 <= n <= 300
	* -10^9 <= matrix[i][j] <= 10^9
	* All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
	* 1 <= k <= n^2*/

    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size(); 
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq; // min-heap 
        for (int i = 0; i < n; ++i) 
            pq.emplace(matrix[i][0], i*n); 
        
        while (--k) {
            auto [val, i] = pq.top(); pq.pop(); 
            int j = i%n; 
            if (j+1 < n) pq.emplace(matrix[i/n][j+1], i+1); 
        }
        return pq.top().first; 
    }


    /*403. Frog Jump (Hard)
	A frog is crossing a river. The river is divided into some number of units, 
	and at each unit, there may or may not exist a stone. The frog can jump on 
	a stone, but it must not jump into the water. Given a list of stones' 
	positions (in units) in sorted ascending order, determine if the frog can 
	cross the river by landing on the last stone. Initially, the frog is on the 
	first stone and assumes the first jump must be 1 unit. If the frog's last 
	jump was k units, its next jump must be either k - 1, k, or k + 1 units. 
	The frog can only jump in the forward direction.

	Example 1:
	Input: stones = [0,1,3,5,6,8,12,17]
	Output: true
	Explanation: The frog can jump to the last stone by jumping 1 unit to the 
	             2nd stone, then 2 units to the 3rd stone, then 2 units to the 
	             4th stone, then 3 units to the 6th stone, 4 units to the 7th 
	             stone, and 5 units to the 8th stone.
	
	Example 2:
	Input: stones = [0,1,2,3,4,8,9,11]
	Output: false
	Explanation: There is no way to jump to the last stone as the gap between 
	             the 5th and 6th stone is too large.

	Constraints:
	* 2 <= stones.length <= 2000
	* 0 <= stones[i] <= 2^31 - 1
	* stones[0] == 0*/

    bool canCross(vector<int>& stones) {
        int n = size(stones); 
        unordered_map<int, int> loc; 
        for (int i = 0; i < n; ++i) loc[stones[i]] = i; 
        
        vector<unordered_set<int>> dp(n); 
        dp[0].insert(1); 
        
        for (int i = 0; i < n; ++i) 
            for (auto& step : dp[i])
                if (0 < step) {
                    int pos = stones[i] + step; 
                    if (pos == stones.back()) return true; 
                    if (loc.count(pos)) {
                        int ii = loc[pos]; 
                        dp[ii].insert(step-1); 
                        dp[ii].insert(step); 
                        dp[ii].insert(step+1); 
                    }
                }
        return false; 
    }


    /*415. Add Strings (Easy)
	Given two non-negative integers, num1 and num2 represented as string, 
	return the sum of num1 and num2 as a string. You must solve the problem 
	without using any built-in library for handling large integers (such as 
	BigInteger). You must also not convert the inputs to integers directly.

	Example 1:
	Input: num1 = "11", num2 = "123"
	Output: "134"

	Example 2:
	Input: num1 = "456", num2 = "77"
	Output: "533"

	Example 3:
	Input: num1 = "0", num2 = "0"
	Output: "0"

	Constraints:
	* 1 <= num1.length, num2.length <= 10^4
	* num1 and num2 consist of only digits.
	* num1 and num2 don't have any leading zeros except for the zero itself.*/

    string addStrings(string num1, string num2) {
        string ans;
        for (int i = num1.size()-1, j = num2.size()-1, carry = 0; 0 <= i || 0 <= j || carry; --i, --j) {
            if (0 <= i) carry += num1[i] - '0'; 
            if (0 <= j) carry += num2[j] - '0'; 
            ans.push_back(carry % 10 + '0'); 
            carry /= 10; 
        }
        reverse(ans.begin(), ans.end()); 
        return ans; 
    }


    /*429. N-ary Tree Level Order Traversal (Medium)
	Given an n-ary tree, return the level order traversal of its nodes' values. 
	Nary-Tree input serialization is represented in their level order traversal, 
	each group of children is separated by the null value (See examples).

	Example 1:
	Input: root = [1,null,3,2,4,null,5,6]
	Output: [[1],[3,2,4],[5,6]]

	Example 2:
	Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
	Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

	Constraints:
	* The height of the n-ary tree is less than or equal to 1000
	* The total number of nodes is between [0, 10^4]*/

    vector<vector<int>> levelOrder(Node* root) {
        vector<vector<int>> ans; 
        if (root) {
            queue<Node*> q; 
            q.push(root); 
            while (q.size()) {
                vector<int> vals; 
                for (int sz = q.size(); sz; --sz) {
                    Node* node = q.front(); q.pop(); 
                    vals.push_back(node->val); 
                    for (auto& child : node->children) q.push(child); 
                }
                ans.push_back(vals); 
            }
        }
        return ans; 
    }


    /*446. Arithmetic Slices II - Subsequence (Hard)
	Given an integer array nums, return the number of all the arithmetic 
	subsequences of nums. A sequence of numbers is called arithmetic if it 
	consists of at least three elements and if the difference between any two 
	consecutive elements is the same.
	* For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are 
	  arithmetic sequences.
	* For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
	A subsequence of an array is a sequence that can be formed by removing some 
	elements (possibly none) of the array.
	* For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
	The answer is guaranteed to fit in 32-bit integer.

	Example 1:
	Input: nums = [2,4,6,8,10]
	Output: 7
	Explanation: All arithmetic subsequence slices are:
	             [2,4,6]
	             [4,6,8]
	             [6,8,10]
	             [2,4,6,8]
	             [4,6,8,10]
	             [2,4,6,8,10]
	             [2,6,10]
	
	Example 2:
	Input: nums = [7,7,7,7,7]
	Output: 16
	Explanation: Any subsequence of this array is arithmetic.

	Constraints:
	* 1  <= nums.length <= 1000
	* -2^31 <= nums[i] <= 2^31 - 1*/

    int numberOfArithmeticSlices(vector<int>& nums) {
        int ans = 0, n = size(nums); 
        vector<unordered_map<int, int>> freq(n); 
        for (size_t i = 0; i < n; ++i) {
            for (size_t ii = 0; ii < i; ++ii) {
                long temp = (long) nums[i] - nums[ii]; 
                if (temp > INT_MAX || temp < INT_MIN) continue;
                int diff = nums[i] - nums[ii]; 
                ans += freq[ii][diff]; 
                freq[i][diff] += 1 + freq[ii][diff]; 
            }
        }
        return ans; 
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


    /*514. Freedom Trail (Hard)
	In the video game Fallout 4, the quest "Road to Freedom" requires players 
	to reach a metal dial called the "Freedom Trail Ring" and use the dial to 
	spell a specific keyword to open the door. Given a string ring that 
	represents the code engraved on the outer ring and another string key that 
	represents the keyword that needs to be spelled, return the minimum number 
	of steps to spell all the characters in the keyword. Initially, the first 
	character of the ring is aligned at the "12:00" direction. You should spell 
	all the characters in key one by one by rotating ring clockwise or 
	anticlockwise to make each character of the string key aligned at the 
	"12:00" direction and then by pressing the center button. At the stage of 
	rotating the ring to spell the key character key[i]:
	* You can rotate the ring clockwise or anticlockwise by one place, which 
	  counts as one step. The final purpose of the rotation is to align one of 
	  ring's characters at the "12:00" direction, where this character must 
	  equal key[i].
	* If the character key[i] has been aligned at the "12:00" direction, press 
	  the center button to spell, which also counts as one step. After the 
	  pressing, you could begin to spell the next character in the key (next 
	  stage). Otherwise, you have finished all the spelling.

	Example 1:
	Input: ring = "godding", key = "gd"
	Output: 4
	Explanation: For the first key character 'g', since it is already in place, 
	             we just need 1 step to spell this character. For the second 
	             key character 'd', we need to rotate the ring "godding" 
	             anticlockwise by two steps to make it become "ddinggo". Also, 
	             we need 1 more step for spelling. So the final output is 4.
	
	Example 2:
	Input: ring = "godding", key = "godding"
	Output: 13

	Constraints:
	* 1 <= ring.length, key.length <= 100
	* ring and key consist of only lower case English letters.
	* It is guaranteed that key could always be spelled by rotating ring.*/

    int findRotateSteps(string ring, string key) {
        int m = ring.size(), n = key.size(); 
        unordered_map<char, vector<int>> locs; 
        for (int i = 0; i < m; ++i) locs[ring[i]].push_back(i); 
        
        vector<vector<int>> dp(m, vector<int>(n+1)); 
        for (int j = n-1; j >= 0; --j) {
            vector<int> loc = locs[key[j]]; 
            for (int i = 0; i < m; ++i) {
                auto it = lower_bound(loc.begin(), loc.end(), i); 
                if (it == loc.end()) it = loc.begin(); 
                dp[i][j] = min(abs(i-*it), m - abs(i-*it)) + dp[*it][j+1]; 
                if (it == loc.begin()) it = loc.end(); 
                it = prev(it); 
                dp[i][j] = min(dp[i][j], min(abs(i-*it), m - abs(i-*it)) + dp[*it][j+1]); 
            }
        }
        return dp[0][0] + n; 
    }


    /*542. 01 Matrix (Medium)
	Given an m x n binary matrix mat, return the distance of the nearest 0 for 
	each cell. The distance between two adjacent cells is 1.

	Example 1:
	Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
	Output: [[0,0,0],[0,1,0],[0,0,0]]

	Example 2:
	Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
	Output: [[0,0,0],[0,1,0],[1,2,1]]

	Constraints:
	* m == mat.length
	* n == mat[i].length
	* 1 <= m, n <= 10^4
	* 1 <= m * n <= 10^4
	* mat[i][j] is either 0 or 1.
	* There is at least one 0 in mat.*/

    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size(); 
        vector<vector<int>> ans(m, vector<int>(n, m*n)); 
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (!mat[i][j]) ans[i][j] = 0; 
                else {
                    if (i) ans[i][j] = min(ans[i][j], 1 + ans[i-1][j]); 
                    if (j) ans[i][j] = min(ans[i][j], 1 + ans[i][j-1]); 
                }
            }
        }
        
        for (int i = m-1; i >= 0; --i) {
            for (int j = n-1; j >= 0; --j) {
                if (mat[i][j]) {
                    if (i+1 < m) ans[i][j] = min(ans[i][j], 1 + ans[i+1][j]); 
                    if (j+1 < n) ans[i][j] = min(ans[i][j], 1 + ans[i][j+1]); 
                }
            }
        }
        return ans; 
    }


    /*546. Remove Boxes (Hard)
	You are given several boxes with different colors represented by different 
	positive numbers. You may experience several rounds to remove boxes until 
	there is no box left. Each time you can choose some continuous boxes with 
	the same color (i.e., composed of k boxes, k >= 1), remove them and get 
	k * k points. Return the maximum points you can get.

	Example 1:
	Input: boxes = [1,3,2,2,2,3,4,3,1]
	Output: 23
	Explanation: [1, 3, 2, 2, 2, 3, 4, 3, 1] 
	             ----> [1, 3, 3, 4, 3, 1] (3*3=9 points) 
	             ----> [1, 3, 3, 3, 1] (1*1=1 points) 
	             ----> [1, 1] (3*3=9 points) 
	             ----> [] (2*2=4 points)
	
	Example 2:
	Input: boxes = [1,1,1]
	Output: 9

	Example 3:
	Input: boxes = [1]
	Output: 1

	Constraints:
	* 1 <= boxes.length <= 100
	* 1 <= boxes[i] <= 100*/

    int removeBoxes(vector<int>& boxes) {
        int n = boxes.size(), memo[n+1][n+1][n+1]; 
        memset(memo, -1, sizeof(memo)); 
        
        function<int(int, int, int)> fn = [&](int lo, int hi, int k) {
            if (memo[lo][hi][k] == -1) {
                if (lo == hi) memo[lo][hi][k] = 0; 
                else if (lo+1 < hi && boxes[lo] == boxes[lo+1]) memo[lo][hi][k] = fn(lo+1, hi, k+1); 
                else {
                    memo[lo][hi][k] = (k+1)*(k+1) + fn(lo+1, hi, 0); 
                    for (int mid = lo+2; mid < hi; ++mid) {
                        if (boxes[lo] == boxes[mid])
                            memo[lo][hi][k] = max(memo[lo][hi][k], fn(lo+1, mid, 0) + fn(mid, hi, k+1)); 
                    }
                }
            }
            return memo[lo][hi][k]; 
        };
        
        return fn(0, n, 0); 
    }


    /*552. Student Attendance Record II (Hard)
	An attendance record for a student can be represented as a string where 
	each character signifies whether the student was absent, late, or present 
	on that day. The record only contains the following three characters:
	* 'A': Absent.
	* 'L': Late.
	* 'P': Present.
	Any student is eligible for an attendance award if they meet both of the 
	following criteria:
	* The student was absent ('A') for strictly fewer than 2 days total.
	* The student was never late ('L') for 3 or more consecutive days.
	Given an integer n, return the number of possible attendance records of 
	length n that make a student eligible for an attendance award. The answer 
	may be very large, so return it modulo 10^9 + 7.

	Example 1:
	Input: n = 2
	Output: 8
	Explanation: There are 8 records with length 2 that are eligible for an 
	             award: "PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL". Only 
	             "AA" is not eligible because there are 2 absences (there need 
	             to be fewer than 2).
	
	Example 2:
	Input: n = 1
	Output: 3

	Example 3:
	Input: n = 10101
	Output: 183236316

	Constraints: 1 <= n <= 10^5*/

    int checkRecord(int n) {
        vector<long> dp = {1, 2, 4}; 
        for (int i = 3; i <= n; ++i) 
            dp.push_back((dp[i-3] + dp[i-2] + dp[i-1]) % 1'000'000'007);
        int ans = dp[n]; 
        for (int i = 0; i < n; ++i) 
            ans = (ans + dp[i] * dp[n-1-i]) % 1'000'000'007; 
        return ans; 
    }


    /*553. Optimal Division (Medium)
	You are given an integer array nums. The adjacent integers in nums will 
	perform the float division. For example, for nums = [2,3,4], we will 
	evaluate the expression "2/3/4". However, you can add any number of 
	parenthesis at any position to change the priority of operations. You want 
	to add these parentheses such the value of the expression after the 
	evaluation is maximum. Return the corresponding expression that has the 
	maximum value in string format. Note: your expression should not contain 
	redundant parenthesis.

	Example 1:
	Input: nums = [1000,100,10,2]
	Output: "1000/(100/10/2)"
	Explanation: 1000/(100/10/2) = 1000/((100/10)/2) = 200. However, the bold 
	             parenthesis in "1000/((100/10)/2)" are redundant, since they 
	             don't influence the operation priority. So you should return 
	             "1000/(100/10/2)".
	             Other cases:
	             1000/(100/10)/2 = 50
	             1000/(100/(10/2)) = 50
	             1000/100/10/2 = 0.5
	             1000/100/(10/2) = 2
	
	Example 2:
	Input: nums = [2,3,4]
	Output: "2/(3/4)"

	Example 3:
	Input: nums = [2]
	Output: "2"

	Constraints:
	* 1 <= nums.length <= 10
	* 2 <= nums[i] <= 1000
	* There is only one optimal division for the given iput.*/

    string optimalDivision(vector<int>& nums) {
        string ans = to_string(nums[0]); 
        if (size(nums) == 1) return ans;
        
        ans += "/"; 
        if (size(nums) == 2) return ans + to_string(nums[1]); 
        
        ans += "(" + to_string(nums[1]); 
        for (int i = 2; i < size(nums); ++i) 
            ans += "/" + to_string(nums[i]); 
        return ans + ")";
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

    vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {
        int m = mat.size(), n = mat[0].size(); 
        if (m * n != r * c) return mat; 
        vector<vector<int>> ans(r, vector<int>(c)); 
        for (int i = 0; i < m * n; ++i) ans[i/c][i%c] = mat[i/n][i%n]; 
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


    /*576. Out of Boundary Paths (Medium)
	There is an m x n grid with a ball. The ball is initially at the position 
	[startRow, startColumn]. You are allowed to move the ball to one of the 
	four adjacent four cells in the grid (possibly out of the grid crossing the 
	grid boundary). You can apply at most maxMove moves to the ball. Given the 
	five integers m, n, maxMove, startRow, startColumn, return the number of 
	paths to move the ball out of the grid boundary. Since the answer can be 
	very large, return it modulo 10^9 + 7.

	Example 1:
	Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
	Output: 6

	Example 2:
	Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
	Output: 12

	Constraints:
	* 1 <= m, n <= 50
	* 0 <= maxMove <= 50
	* 0 <= startRow <= m
	* 0 <= startColumn <= n*/

    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        long memo[m][n][maxMove+1]; 
        memset(memo, -1, sizeof(memo)); 
        
        function<long(int, int, int)> fn = [&](int i, int j, int mv) {
            if (i < 0 || i >= m || j < 0 || j >= n) return 1l; 
            if (mv == 0) return 0l; 
            if (memo[i][j][mv] < 0) 
                memo[i][j][mv] = (fn(i-1, j, mv-1) + fn(i, j-1, mv-1) + fn(i, j+1, mv-1) + fn(i+1, j, mv-1)) % 1'000'000'007; 
            return memo[i][j][mv]; 
        }; 
        
        return fn(startRow, startColumn, maxMove); 
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


    /*600. Non-negative Integers without Consecutive Ones (Hard)
	Given a positive integer n, return the number of the integers in the range 
	[0, n] whose binary representations do not contain consecutive ones.

	Example 1:
	Input: n = 5
	Output: 5
	Explanation: Here are the non-negative integers <= 5 with their 
	             corresponding binary representations:
	             0 : 0
	             1 : 1
	             2 : 10
	             3 : 11
	             4 : 100
	             5 : 101
	             Among them, only integer 3 disobeys the rule (two consecutive 
	             ones) and the other 5 satisfy the rule. 
	
	Example 2:
	Input: n = 1
	Output: 2

	Example 3:
	Input: n = 2
	Output: 3

	Constraints: 1 <= n <= 10^9*/

    int findIntegers(int n) {
        vector<int> fib = {1, 2}; 
        for (int i = 2; i < 32; ++i) fib.push_back(fib[i-2] + fib[i-1]); 
        
        int ans = 0, prev = 0; 
        for (int i = 31; i >= 0; --i) {
            if (n & (1 << i)) {
                ans += fib[i]; 
                if (prev) return ans; 
                else prev = 1; 
            } else prev = 0; 
        }
        return ans + 1; 
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
	* 1 <= paths.length <= 2 * 10^4
	* 1 <= paths[i].length <= 3000
	* 1 <= sum(paths[i].length) <= 5 * 10^5
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


    /*611. Valid Triangle Number (Medium)
	Given an integer array nums, return the number of triplets chosen from the 
	array that can make triangles if we take them as side lengths of a triangle.

	Example 1:
	Input: nums = [2,2,3,4]
	Output: 3
	Explanation: Valid combinations are: 
	             2,3,4 (using the first 2)
	             2,3,4 (using the second 2)
	             2,2,3
	
	Example 2:
	Input: nums = [4,2,3,4]
	Output: 4

	Constraints:
	* 1 <= nums.length <= 1000
	* 0 <= nums[i] <= 1000*/

    int triangleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end()); 
        int ans = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            int lo = 0, hi = i-1; 
            while (lo < hi) {
                if (nums[lo] + nums[hi] > nums[i]) ans += (hi--) - lo; 
                else ++lo; 
            }
        }
        return ans; 
    }


    /*629. K Inverse Pairs Array (Hard)
	For an integer array nums, an inverse pair is a pair of integers [i, j] 
	where 0 <= i < j < nums.length and nums[i] > nums[j]. Given two integers n 
	and k, return the number of different arrays consist of numbers from 1 to n 
	such that there are exactly k inverse pairs. Since the answer can be huge, 
	return it modulo 10^9 + 7.

	Example 1:
	Input: n = 3, k = 0
	Output: 1
	Explanation: Only the array [1,2,3] which consists of numbers from 1 to 3 
	             has exactly 0 inverse pairs.
	
	Example 2:
	Input: n = 3, k = 1
	Output: 2
	Explanation: The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.

	Constraints:
	* 1 <= n <= 1000
	* 0 <= k <= 1000*/

    int kInversePairs(int n, int k) {
        int const MOD = 1'000'000'007;
        vector<vector<int>> dp(n+1, vector<int>(k+1)); 
        dp[0][0] = 1; 
        for (int i = 1; i <= n; ++i) {
            dp[i][0] = 1; 
            for (int j = 1; j <= k; ++j) {
                dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % MOD; 
                if (i <= j) dp[i][j] = (dp[i][j] - dp[i-1][j-i] + MOD) % MOD; 
            }
        }
        return dp.back().back(); 
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


    /*632. Smallest Range Covering Elements from K Lists (Hard)
	You have k lists of sorted integers in non-decreasing order. Find the 
	smallest range that includes at least one number from each of the k lists.
	We define the range [a, b] is smaller than range [c, d] if b - a < d - c or 
	a < c if b - a == d - c.

	Example 1:
	Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
	Output: [20,24]
	Explanation: List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
	             List 2: [0, 9, 12, 20], 20 is in range [20,24].
	             List 3: [5, 18, 22, 30], 22 is in range [20,24].
	
	Example 2:
	Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
	Output: [1,1]

	Example 3:
	Input: nums = [[10,10],[11,11]]
	Output: [10,11]

	Example 4:
	Input: nums = [[10],[11]]
	Output: [10,11]

	Example 5:
	Input: nums = [[1],[2],[3],[4],[5],[6],[7]]
	Output: [1,7]

	Constraints:
	* nums.length == k
	* 1 <= k <= 3500
	* 1 <= nums[i].length <= 50
	* -10^5 <= nums[i][j] <= 10^5
	* nums[i] is sorted in non-decreasing order.*/

    vector<int> smallestRange(vector<vector<int>>& nums) {
        
        struct Compare {
            bool operator() (array<int,3>&lhs, array<int,3>&rhs) { return lhs[0] > rhs[0]; }
        };
        
        priority_queue<array<int,3>, vector<array<int,3>>, Compare> pq; 
        int mx = INT_MIN, lo = -100'000, hi = 100'000; 
        for (int i = 0; i < size(nums); ++i) {
            pq.push({nums[i][0], i, 0}); 
            mx = max(mx, nums[i][0]); 
        }
        
        while (size(pq)) {
            if (mx - pq.top()[0] < hi - lo) {
                lo = pq.top()[0]; 
                hi = mx; 
            }
            auto elem = pq.top(); pq.pop(); 
            int i = elem[1], j = elem[2]; 
            if (j+1 == size(nums[i])) break;
            mx = max(mx, nums[i][j+1]); 
            pq.push({nums[i][j+1], i, j+1}); 
        }
        return {lo, hi}; 
    }


    /*639. Decode Ways II (Hard)
	A message containing letters from A-Z can be encoded into numbers using the 
	following mapping:
	'A' -> "1"
	'B' -> "2"
	...
	'Z' -> "26"
	To decode an encoded message, all the digits must be grouped then mapped 
	back into letters using the reverse of the mapping above (there may be 
	multiple ways). For example, "11106" can be mapped into:
	* "AAJF" with the grouping (1 1 10 6)
	* "KJF" with the grouping (11 10 6)
	Note that the grouping (1 11 06) is invalid because "06" cannot be mapped 
	into 'F' since "6" is different from "06". In addition to the mapping above, 
	an encoded message may contain the '*' character, which can represent any 
	digit from '1' to '9' ('0' is excluded). For example, the encoded message 
	"1*" may represent any of the encoded messages "11", "12", "13", "14", "15", 
	"16", "17", "18", or "19". Decoding "1*" is equivalent to decoding any of 
	the encoded messages it can represent. Given a string s consisting of 
	digits and '*' characters, return the number of ways to decode it. Since 
	the answer may be very large, return it modulo 10^9 + 7.

	Example 1:
	Input: s = "*"
	Output: 9
	Explanation: The encoded message can represent any of the encoded messages 
	             "1", "2", "3", "4", "5", "6", "7", "8", or "9". Each of these 
	             can be decoded to the strings "A", "B", "C", "D", "E", "F", 
	             "G", "H", and "I" respectively. Hence, there are a total of 9 
	             ways to decode "*".
	
	Example 2:
	Input: s = "1*"
	Output: 18
	Explanation: The encoded message can represent any of the encoded messages 
	             "11", "12", "13", "14", "15", "16", "17", "18", or "19". Each 
	             of these encoded messages have 2 ways to be decoded (e.g. "11" 
	             can be decoded to "AA" or "K"). Hence, there are a total of 
	             9 * 2 = 18 ways to decode "1*".
	
	Example 3:
	Input: s = "2*"
	Output: 15
	Explanation: The encoded message can represent any of the encoded messages 
	             "21", "22", "23", "24", "25", "26", "27", "28", or "29". "21", 
	             "22", "23", "24", "25", and "26" have 2 ways of being decoded, 
	             but "27", "28", and "29" only have 1 way. Hence, there are a 
	             total of (6 * 2) + (3 * 1) = 12 + 3 = 15 ways to decode "2*".

	Constraints:
	* 1 <= s.length <= 10^5
	* s[i] is a digit or '*'.*/

    int numDecodings(string s) {
        if (s[0] == '0') return 0; // edge case 
        int n = s.size(); 
        vector<long> dp(n+1); 
        dp[0] = dp[1] = 1; 
        if (s[0] == '*') dp[1] = 9; 
        
        for (int i = 2; i <= n; ++i) {
            if (s[i-1] == '*') {
                dp[i] = 9*dp[i-1]; 
                if (s[i-2] == '1') dp[i] += 9*dp[i-2]; 
                else if (s[i-2] == '2') dp[i] += 6*dp[i-2]; 
                else if (s[i-2] == '*') dp[i] += 15*dp[i-2]; 
            } else if (s[i-1] == '0') {
                if (s[i-2] == '1' || s[i-2] == '2') dp[i] += dp[i-2]; 
                else if (s[i-2] == '*') dp[i] += 2*dp[i-2]; 
            } else {
                dp[i] = dp[i-1]; 
                if (s[i-2] == '1') dp[i] += dp[i-2]; 
                else if (s[i-2] == '2' and s[i-1] <= '6') dp[i] += dp[i-2]; 
                else if (s[i-2] == '*') {
                    dp[i] += dp[i-2]; 
                    if (s[i-1] <= '6') dp[i] += dp[i-2]; 
                }
            }
            dp[i] %= 1'000'000'007; 
        }
        return dp.back(); 
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


    /*658. Find K Closest Elements (Medium)
	Given a sorted integer array arr, two integers k and x, return the k 
	closest integers to x in the array. The result should also be sorted in 
	ascending order. An integer a is closer to x than an integer b if:
	* |a - x| < |b - x|, or
	* |a - x| == |b - x| and a < b

	Example 1:
	Input: arr = [1,2,3,4,5], k = 4, x = 3
	Output: [1,2,3,4]

	Example 2:
	Input: arr = [1,2,3,4,5], k = 4, x = -1
	Output: [1,2,3,4]

	Constraints:
	* 1 <= k <= arr.length
	* 1 <= arr.length <= 10^4
	* arr is sorted in ascending order.
	* -10^4 <= arr[i], x <= 10^4*/

    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int hi = lower_bound(arr.begin(), arr.end(), x) - arr.begin(), lo = hi - 1; 
        deque<int> ans; 
        while (k--) {
            if (arr.size() <= hi or 0 <= lo and x - arr[lo] <= arr[hi] - x) 
                ans.push_front(arr[lo--]); 
            else 
                ans.push_back(arr[hi++]); 
        }
        return vector<int>(ans.begin(), ans.end()); 
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


    /*668. Kth Smallest Number in Multiplication Table (Hard)
	Nearly everyone has used the Multiplication Table. The multiplication table 
	of size m x n is an integer matrix mat where mat[i][j] == i * j (1-indexed).
	Given three integers m, n, and k, return the kth smallest element in the 
	m x n multiplication table.

	Example 1:
	Input: m = 3, n = 3, k = 5
	Output: 3
	Explanation: The 5th smallest number is 3.

	Example 2:
	Input: m = 2, n = 3, k = 6
	Output: 6
	Explanation: The 6th smallest number is 6.

	Constraints:
	* 1 <= m, n <= 3 * 10^4
	* 1 <= k <= m * n*/

    int findKthNumber(int m, int n, int k) {
        int lo = 0, hi = m*n + 1; 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            int x = 0; 
            for (int i = 1; i <= m; ++i)
                x += min(n, mid/i); 
            if (x < k) lo = mid + 1; 
            else hi = mid; 
        }
        return lo; 
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


    /*689. Maximum Sum of 3 Non-Overlapping Subarrays (Hard)
	Given an integer array nums and an integer k, find three non-overlapping 
	subarrays of length k with maximum sum and return them. Return the result 
	as a list of indices representing the starting position of each interval 
	(0-indexed). If there are multiple answers, return the lexicographically 
	smallest one.

	Example 1:
	Input: nums = [1,2,1,2,6,7,5,1], k = 2
	Output: [0,3,5]
	Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting 
	             indices [0, 3, 5]. We could have also taken [2, 1], but an 
	             answer of [1, 3, 5] would be lexicographically larger.
	
	Example 2:
	Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
	Output: [0,2,4]

	Constraints:
	* 1 <= nums.length <= 2 * 10^4
	* 1 <= nums[i] < 2^16
	* 1 <= k <= floor(nums.length / 3)*/

    vector<int> maxSumOfThreeSubarrays(vector<int>& nums, int k) {
        int rs0 = 0, rs1 = 0, rs2 = 0; 
        for (int i = 0; i < k*3; ++i) {
            if (i < k) rs0 += nums[i]; 
            else if (i < 2*k) rs1 += nums[i]; 
            else rs2 += nums[i]; 
        }
        
        int m0 = rs0, m1 = m0 + rs1, m2 = m1 + rs2; 
        vector<int> i0 = {0}, i1 = {0, k}, i2 = {0, k, 2*k}; 
        
        for (int i = 0; i < nums.size() - 3*k; ++i) {
            rs0 += nums[i+k] - nums[i]; 
            rs1 += nums[i+2*k] - nums[i+k]; 
            rs2 += nums[i+3*k] - nums[i+2*k]; 
            if (rs0 > m0) { m0 = rs0; i0 = {i+1}; }
            if (m0 + rs1 > m1) { m1 = m0 + rs1; i1 = {i0[0], i+k+1}; }
            if (m1 + rs2 > m2) { m2 = m1 + rs2; i2 = {i1[0], i1[1], i+2*k+1}; }
        }
        return i2; 
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


    /*691. Stickers to Spell Word (Hard)
	We are given n different types of stickers. Each sticker has a lowercase 
	English word on it. You would like to spell out the given string target by 
	cutting individual letters from your collection of stickers and rearranging 
	them. You can use each sticker more than once if you want, and you have 
	infinite quantities of each sticker. Return the minimum number of stickers 
	that you need to spell out target. If the task is impossible, return -1.
	Note: In all test cases, all words were chosen randomly from the 1000 most 
	common US English words, and target was chosen as a concatenation of two 
	random words.

	Example 1:
	Input: stickers = ["with","example","science"], target = "thehat"
	Output: 3
	Explanation: We can use 2 "with" stickers, and 1 "example" sticker. After 
	             cutting and rearrange the letters of those stickers, we can 
	             form the target "thehat". Also, this is the minimum number of 
	             stickers necessary to form the target string.
	
	Example 2:
	Input: stickers = ["notice","possible"], target = "basicbasic"
	Output: -1
	Explanation: We cannot form the target "basicbasic" from cutting letters 
	             from the given stickers.

	Constraints:
	* n == stickers.length
	* 1 <= n <= 50
	* 1 <= stickers[i].length <= 10
	* 1 <= target <= 15
	* stickers[i] and target consist of lowercase English letters.*/

    int minStickers(vector<string>& stickers, string target) {
        int n = target.size(); 
        vector<uint> dp(1 << n, -1); 
        dp[0] = 0; 
        for (int mask = 0; mask < (1 << n); ++mask) 
            if (dp[mask] != -1) 
                for (auto& sticker : stickers) {
                    int mask0 = mask; 
                    for (auto& ch : sticker) 
                        for (int j = 0; j < n; ++j) 
                            if (ch == target[j] && (mask0 & (1<<j)) == 0) {
                                mask0 ^= 1 << j; 
                                break; 
                            }
                    dp[mask0] = min(dp[mask0], 1 + dp[mask]);
                }
        return dp.back(); 
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


    /*726. Number of Atoms (Hard)
	Given a string formula representing a chemical formula, return the count of 
	each atom. The atomic element always starts with an uppercase character, 
	then zero or more lowercase letters, representing the name. One or more 
	digits representing that element's count may follow if the count is greater 
	than 1. If the count is 1, no digits will follow. For example, "H2O" and 
	"H2O2" are possible, but "H1O2" is impossible. Two formulas are 
	concatenated together to produce another formula. For example, "H2O2He3Mg4" 
	is also a formula. A formula placed in parentheses, and a count (optionally 
	added) is also a formula. For example, "(H2O2)" and "(H2O2)3" are formulas.
	Return the count of all elements as a string in the following form: the 
	first name (in sorted order), followed by its count (if that count is more 
	than 1), followed by the second name (in sorted order), followed by its 
	count (if that count is more than 1), and so on.

	Example 1:
	Input: formula = "H2O"
	Output: "H2O"
	Explanation: The count of elements are {'H': 2, 'O': 1}.

	Example 2:
	Input: formula = "Mg(OH)2"
	Output: "H2MgO2"
	Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.

	Example 3:
	Input: formula = "K4(ON(SO3)2)2"
	Output: "K4N2O14S4"
	Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.

	Example 4:
	Input: formula = "Be32"
	Output: "Be32"

	Constraints:
	* 1 <= formula.length <= 1000
	* formula consists of English letters, digits, '(', and ')'.
	* formula is always valid.
	* All the values in the output will fit in a 32-bit integer.*/

    string countOfAtoms(string formula) {
        unordered_map<int, int> mp; 
        stack<int> stk; 
        for (int i = 0; i < formula.size(); ++i) {
            if (formula[i] == '(') stk.push(i); 
            else if (formula[i] == ')') { mp[stk.top()] = i; stk.pop(); }
        }
        
        function<map<string, int>(int, int)> fn = [&](int lo, int hi) {
            map<string, int> ans; 
            for (int k = lo; k < hi; ) {
                int cnt = 0; 
                if (formula[k] == '(') {
                    map<string, int> freq = fn(k+1, mp[k]); 
                    k = mp[k] + 1; 
                    for (; k < hi && isdigit(formula[k]); ++k) 
                        cnt = 10*cnt + (formula[k] - '0'); 
                    for (auto& [key, val] : freq) 
                        ans[key] += val * max(1, cnt); 
                } else {
                    string atom; 
                    atom.push_back(formula[k++]); 
                    for (; k < hi && formula[k] != '(' && !isupper(formula[k]); ++k) {
                        if (isalpha(formula[k])) atom.push_back(formula[k]); 
                        else cnt = 10*cnt + (formula[k] - '0'); 
                    }
                    ans[atom] += max(1, cnt); 
                }
            }
            return ans; 
        };
        
        string ans; 
        map<string, int> freq = fn(0, formula.size()); 
        for (auto& [key, val] : freq) {
            ans += key; 
            if (val > 1) ans += to_string(val); 
        }
        return ans; 
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


    /*746. Min Cost Climbing Stairs (Easy)
	You are given an integer array cost where cost[i] is the cost of ith step 
	on a staircase. Once you pay the cost, you can either climb one or two 
	steps. You can either start from the step with index 0, or the step with 
	index 1. Return the minimum cost to reach the top of the floor.

	Example 1:
	Input: cost = [10,15,20]
	Output: 15
	Explanation: Cheapest is: start on cost[1], pay that cost, and go to the 
	             top.
	
	Example 2:
	Input: cost = [1,100,1,1,1,100,1,1,100,1]
	Output: 6
	Explanation: Cheapest is: start on cost[0], and only step on 1s, skipping 
	             cost[3].

	Constraints:
	* 2 <= cost.length <= 1000
	* 0 <= cost[i] <= 999*/

    int minCostClimbingStairs(vector<int>& cost) {
        int f0 = 0, f1 = 0; 
        for (int i = size(cost)-1; i >= 0; --i) {
            int tmp = f0; 
            f0 = cost[i] + min(f0, f1); 
            f1 = tmp; 
        }
        return min(f0, f1); 
    }


    /*753. Cracking the Safe (Hard)
	There is a box protected by a password. The password is a sequence of n 
	digits where each digit can be in the range [0, k - 1]. While entering a 
	password, the last n digits entered will automatically be matched against 
	the correct password. For example, assuming the correct password is "345", 
	if you type "012345", the box will open because the correct password 
	matches the suffix of the entered password. Return any password of minimum 
	length that is guaranteed to open the box at some point of entering it.

	Example 1:
	Input: n = 1, k = 2
	Output: "10"
	Explanation: "01" will be accepted too.

	Example 2:
	Input: n = 2, k = 2
	Output: "01100"
	Explanation: "01100", "10011", "11001" will be accepted too.

	Constraints:
	* 1 <= n <= 4
	* 1 <= k <= 10
	* 1 <= kn <= 4096*/

    string crackSafe(int n, int k) {
        string ans; // De Bruijn sequence
        if (n == 1) {
            for (int x = k-1; x >= 0; --x) 
                ans.push_back(x + '0'); 
        } else {
            unordered_map<string, int> mp; 
            
            /* Return Eulerian path via Hierholzer algo */
            function<void(string)> fn = [&](string s) {
                while (mp[s]++ < k) 
                    fn(s.substr(1) + to_string(mp[s]-1)); 
                if (ans.empty()) ans += s; 
                else ans.push_back(s[0]); 
            };
            
            fn(string(n-1, '0')); 
        }
        return ans; 
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


    /*768. Max Chunks To Make Sorted II (Hard)
	You are given an integer array arr. We split arr into some number of chunks 
	(i.e., partitions), and individually sort each chunk. After concatenating 
	them, the result should equal the sorted array. Return the largest number 
	of chunks we can make to sort the array.

	Example 1:
	Input: arr = [5,4,3,2,1]
	Output: 1
	Explanation: Splitting into two or more chunks will not return the required 
	             result. For example, splitting into [5, 4], [3, 2, 1] will 
	             result in [4, 5, 1, 2, 3], which isn't sorted.
	
	Example 2:
	Input: arr = [2,1,3,4,4]
	Output: 4
	Explanation: We can split into two chunks, such as [2, 1], [3, 4, 4]. 
	             However, splitting into [2, 1], [3], [4], [4] is the highest 
	             number of chunks possible.

	Constraints:
	* 1 <= arr.length <= 2000
	* 0 <= arr[i] <= 10^8*/

    int maxChunksToSorted(vector<int>& arr) {
        stack<int> stk; 
        for (auto& x : arr) {
            int most = x; 
            while (stk.size() && stk.top() > x) {
                most = max(most, stk.top()); 
                stk.pop(); 
            }
            stk.push(most); 
        }
        return stk.size(); 
    }


    /*778. Swim in Rising Water (Hard)
	On an N x N grid, each square grid[i][j] represents the elevation at that 
	point (i,j). Now rain starts to fall. At time t, the depth of the water 
	everywhere is t. You can swim from a square to another 4-directionally 
	adjacent square if and only if the elevation of both squares individually 
	are at most t. You can swim infinite distance in zero time. Of course, you 
	must stay within the boundaries of the grid during your swim. You start at 
	the top left square (0, 0). What is the least time until you can reach the 
	bottom right square (N-1, N-1)?

	Example 1:
	Input: [[0,2],[1,3]]
	Output: 3
	Explanation: At time 0, you are in grid location (0, 0). You cannot go 
	             anywhere else because 4-directionally adjacent neighbors have 
	             a higher elevation than t = 0. You cannot reach point (1, 1) 
	             until time 3. When the depth of water is 3, we can swim 
	             anywhere inside the grid.
	
	Example 2:
	Input: [[ 0, 1, 2, 3, 4],
	        [24,23,22,21, 5],
	        [12,13,14,15,16],
	        [11,17,18,19,20],
	        [10, 9, 8, 7, 6]]
	Output: 16
	Explanation:
	 0  1  2  3  4
	24 23 22 21  5
	12 13 14 15 16
	11 17 18 19 20
	10  9  8  7  6

	The final route is marked in bold. We need to wait until time 16 so that 
	(0, 0) and (4, 4) are connected.
	
	Note:
	* 2 <= N <= 50.
	* grid[i][j] is a permutation of [0, ..., N*N - 1].*/

    int swimInWater(vector<vector<int>>& grid) {
        int n = size(grid), dir[5] = {-1, 0, 1, 0, -1}; 
        
        struct Compare{
            bool operator()(array<int,3>& lhs, array<int,3>& rhs) { return lhs[0] > rhs[0]; } // greater<>
        };

        priority_queue<array<int,3>, vector<array<int,3>>, Compare> pq; // min-heap 
        pq.push({grid[0][0], 0, 0}); 
        grid[0][0] = -1; // mark as visited 
        
        while (size(pq)) {
            auto [v, i, j] = pq.top(); pq.pop(); 
            if (i == n-1 && j == n-1) return v; 
            for (int k = 0; k < 4; ++k) {
                int ii = i + dir[k], jj = j + dir[k+1]; 
                if (0 <= ii && ii < n && 0 <= jj && jj < n && grid[ii][jj] >= 0) {
                    pq.push({max(v, grid[ii][jj]), ii, jj}); 
                    grid[ii][jj] = -1; 
                }
            }
        }
        return -1; 
    }


    /*780. Reaching Points (Hard)
	Given four integers sx, sy, tx, and ty, return true if it is possible to 
	convert the point (sx, sy) to the point (tx, ty) through some operations, 
	or false otherwise. The allowed operation on some point (x, y) is to 
	convert it to either (x, x + y) or (x + y, y).

	Example 1:
	Input: sx = 1, sy = 1, tx = 3, ty = 5
	Output: true
	Explanation: One series of moves that transforms the starting point to the 
	             target is:
	             (1, 1) -> (1, 2)
	             (1, 2) -> (3, 2)
	             (3, 2) -> (3, 5)
	
	Example 2:
	Input: sx = 1, sy = 1, tx = 2, ty = 2
	Output: false

	Example 3:
	Input: sx = 1, sy = 1, tx = 1, ty = 1
	Output: true

	Constraints: 1 <= sx, sy, tx, ty <= 10^9*/

    bool reachingPoints(int sx, int sy, int tx, int ty) {
        while (sx < tx || sy < ty) {
            if (tx > ty) {
                int k = (tx - sx)/ty; 
                if (k == 0) break; 
                tx -= k * ty; 
            } else {
                int k = (ty - sy)/tx; 
                if (k == 0) break; 
                ty -= k * tx; 
            }
        }
        return sx == tx && sy == ty; 
    }


    /*782. Transform to Chessboard (Hard)
	You are given an n x n binary grid board. In each move, you can swap any 
	two rows with each other, or any two columns with each other. Return the 
	minimum number of moves to transform the board into a chessboard board. If 
	the task is impossible, return -1. A chessboard board is a board where no 
	0's and no 1's are 4-directionally adjacent.

	Example 1:
	Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
	Output: 2
	Explanation: One potential sequence of moves is shown. The first move swaps 
	             the first and second column. The second move swaps the second 
	             and third row.
	
	Example 2:
	Input: board = [[0,1],[1,0]]
	Output: 0
	Explanation: Also note that the board with 0 in the top left corner, is 
	             also a valid chessboard.
	
	Example 3:
	Input: board = [[1,0],[1,0]]
	Output: -1
	Explanation: No matter what sequence of moves you make, you cannot end with 
	             a valid chessboard.

	Constraints:
	* n == board.length
	* n == board[i].length
	* 2 <= n <= 30
	* board[i][j] is either 0 or 1.*/

    int movesToChessboard(vector<vector<int>>& board) {
        int n = size(board); 
        
        auto fn = [&](vector<int>& vals) {
            int total = 0, odd = 0; 
            for (int i = 0; i < size(vals); ++i) {
                if (vals[0] == vals[i]) {
                    ++total; 
                    if (i&1) ++odd; 
                } else if ((vals[0] ^ vals[i]) != (1 << n) - 1) return 100; 
            }
            int ans = 100; 
            if (size(vals) <= 2*total && 2*total <= size(vals)+1) ans = min(ans, odd); 
            if (size(vals)-1 <= 2*total && 2*total <= size(vals)) ans = min(ans, total - odd); 
            return ans; 
        }; 
        
        vector<int> rows(n), cols(n); 
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < n; ++j) 
                if (board[i][j]) {
                    rows[i] ^= 1 << j; 
                    cols[j] ^= 1 << i; 
                }
        int ans = fn(rows) + fn(cols); 
        return ans < 100 ? ans : -1; 
    }


    /*786. K-th Smallest Prime Fraction (Hard)
	You are given a sorted integer array arr containing 1 and prime numbers, 
	where all the integers of arr are unique. You are also given an integer k.
	For every i and j where 0 <= i < j < arr.length, we consider the fraction 
	arr[i] / arr[j]. Return the kth smallest fraction considered. Return your 
	answer as an array of integers of size 2, where answer[0] == arr[i] and 
	answer[1] == arr[j].

	Example 1:
	Input: arr = [1,2,3,5], k = 3
	Output: [2,5]
	Explanation: The fractions to be considered in sorted order are:
	             1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
	             The third fraction is 2/5.
	
	Example 2:
	Input: arr = [1,7], k = 1
	Output: [1,7]

	Constraints:
	* 2 <= arr.length <= 1000
	* 1 <= arr[i] <= 3 * 10^4
	* arr[0] == 1
	* arr[i] is a prime number for i > 0.
	* All the numbers of arr are unique and sorted in strictly increasing order.
	* 1 <= k <= arr.length * (arr.length - 1) / 2*/

    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
        int n = size(arr); 
        priority_queue<pair<double, pair<int, int>>, vector<pair<double, pair<int, int>>>, greater<>> pq; 
        for (int i = 0; i < n-1; ++i) 
            pq.push({(double) arr[i]/arr[n-1], {i, n-1}}); 
        
        int i = 0, j = 0; 
        while (k--) {
            auto elem = pq.top(); pq.pop(); 
            i = elem.second.first;
            j = elem.second.second; 
            if (i < j-1) pq.push({(double) arr[i]/arr[j-1], {i, j-1}}); 
        }
        return {arr[i], arr[j]}; 
    }


    /*791. Custom Sort String (Medium)
	order and str are strings composed of lowercase letters. In order, no 
	letter occurs more than once. order was sorted in some custom order 
	previously. We want to permute the characters of str so that they match the 
	order that order was sorted. More specifically, if x occurs before y in 
	order, then x should occur before y in the returned string. Return any 
	permutation of str (as a string) that satisfies this property.

	Example:
	Input: order = "cba"
	       str = "abcd"
	Output: "cbad"
	Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c" 
	             should be "c", "b", and "a". Since "d" does not appear in 
	             order, it can be at any position in the returned string. "dcba", 
	             "cdba", "cbda" are also valid outputs.

	Note:
	* order has length at most 26, and no character is repeated in order.
	* str has length at most 200.
	* order and str consist of lowercase letters only.*/

    string customSortString(string order, string str) {
        int freq[26] = {0}; 
        for (auto& ch : str) ++freq[ch-'a']; 
        
        string ans;
        for (auto& ch : order) {
            if (freq[ch-'a']) {
                ans += string(freq[ch-'a'], ch); 
                freq[ch-'a'] = 0; 
            }
        }
        for (int i = 0; i < 26; ++i) 
            if (freq[i]) ans += string(freq[i], 'a'+i); 
        return ans; 
    }


    /*792. Number of Matching Subsequences (Medium)
	Given a string s and an array of strings words, return the number of 
	words[i] that is a subsequence of s. A subsequence of a string is a new 
	string generated from the original string with some characters (can be 
	none) deleted without changing the relative order of the remaining 
	characters. For example, "ace" is a subsequence of "abcde".

	Example 1:
	Input: s = "abcde", words = ["a","bb","acd","ace"]
	Output: 3
	Explanation: There are three strings in words that are a subsequence of s: 
	             "a", "acd", "ace".
	
	Example 2:
	Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
	Output: 2

	Constraints:
	* 1 <= s.length <= 5 * 10^4
	* 1 <= words.length <= 5000
	* 1 <= words[i].length <= 50
	* s and words[i] consist of only lowercase English letters.*/

    int numMatchingSubseq(string s, vector<string>& words) {
        unordered_map<char, vector<int>> loc; 
        for (int i = 0; i < s.size(); ++i) loc[s[i]].push_back(i); 
        
        int ans = 0; 
        for (auto& word : words) {
            int x = 0; 
            bool found = true; 
            for (auto& ch : word) {
                auto it = lower_bound(loc[ch].begin(), loc[ch].end(), x); 
                if (it == loc[ch].end()) {
                    found = false;
                    break; 
                }
                x = *it + 1;
            }
            if (found) ++ans; 
        }
        return ans; 
    }


    /*793. Preimage Size of Factorial Zeroes Function (Hard)
	Let f(x) be the number of zeroes at the end of x!. (Recall that 
	x! = 1 * 2 * 3 * ... * x, and by convention, 0! = 1.) For example, f(3) = 0 
	because 3! = 6 has no zeroes at the end, while f(11) = 2 because 
	11! = 39916800 has 2 zeroes at the end. Given k, find how many non-negative 
	integers x have the property that f(x) = k.

	Example 1:
	Input: k = 0
	Output: 5
	Explanation: 0!, 1!, 2!, 3!, and 4! end with k = 0 zeroes.

	Example 2:
	Input: k = 5
	Output: 0
	Explanation: There is no x such that x! ends in k = 5 zeroes.
	
	Note: k will be an integer in the range [0, 10^9].*/

    int preimageSizeFZF(int k) {
        
        auto fn = [](int k) {
            long lo = 0, hi = 1l << 32; 
            while (lo < hi) {
                long mid = lo + (hi - lo)/2, y = 0; 
                for (long x = mid/5; x; x /= 5) y += x; 
                if (y < k) lo = mid + 1; 
                else hi = mid; 
            }
            return lo; 
        }; 
        
        return fn(k+1) - fn(k); 
    }


    /*795. Number of Subarrays with Bounded Maximum (Medium)
	We are given an array nums of positive integers, and two positive integers 
	left and right (left <= right). Return the number of (contiguous, non-empty) 
	subarrays such that the value of the maximum array element in that subarray 
	is at least left and at most right.

	Example:
	Input: nums = [2, 1, 4, 3]
	       left = 2
	       right = 3
	Output: 3
	Explanation: There are three subarrays that meet the requirements: 
	             [2], [2, 1], [3].
	
	Note:
	* left, right, and nums[i] will be an integer in the range [0, 10^9].
	* The length of nums will be in the range of [1, 50000].*/

    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        int ans = 0, inc = 0, cnt = 0; 
        for (auto& x : nums) {
            if (x < left) ++cnt; 
            else if (left <= x && x <= right) inc = ++cnt; 
            else inc = cnt = 0; 
            ans += inc; 
        }
        return ans; 
    }


    /*798. Smallest Rotation with Highest Score (Hard)
	Given an array nums, we may rotate it by a non-negative integer k so that 
	the array becomes nums[k], nums[k+1], nums[k+2], ... nums[nums.length - 1], 
	nums[0], nums[1], ..., nums[k-1].  Afterward, any entries that are less 
	than or equal to their index are worth 1 point. For example, if we have 
	[2, 4, 1, 3, 0], and we rotate by k = 2, it becomes [1, 3, 0, 2, 4]. This 
	is worth 3 points because 1 > 0 [no points], 3 > 1 [no points], 
	0 <= 2 [one point], 2 <= 3 [one point], 4 <= 4 [one point]. Over all 
	possible rotations, return the rotation index k that corresponds to the 
	highest score we could receive. If there are multiple answers, return the 
	smallest such index k.

	Example 1:
	Input: [2, 3, 1, 4, 0]
	Output: 3
	Explanation: Scores for each k are listed below: 
	             k = 0,  nums = [2,3,1,4,0],    score 2
	             k = 1,  nums = [3,1,4,0,2],    score 3
	             k = 2,  nums = [1,4,0,2,3],    score 3
	             k = 3,  nums = [4,0,2,3,1],    score 4
	             k = 4,  nums = [0,2,3,1,4],    score 3
	             So we should choose k = 3, which has the highest score.

	Example 2:
	Input: [1, 3, 0, 2, 4]
	Output: 0
	Explanation: nums will always have 3 points no matter how it shifts. So we 
	             will choose the smallest k, which is 0.
	
	Note:
	* nums will have length at most 20000.
	* nums[i] will be in the range [0, nums.length].*/

    int bestRotation(vector<int>& nums) {
        int n = size(nums); 

        vector<int> diff(n, 1); 
        for (int i = 0; i < n; ++i) 
            diff[(i+n-nums[i]+1) % n]--; 
        
        int ans = 0, prefix = 0, mx = INT_MIN; 
        for (int i = 0; i < n; ++i) {
            prefix += diff[i]; 
            if (prefix > mx) {
                mx = prefix; 
                ans = i; 
            }
        }
        return ans; 
    }


    /*810. Chalkboard XOR Game (Hard)
	We are given non-negative integers nums[i] which are written on a 
	chalkboard. Alice and Bob take turns erasing exactly one number from the 
	chalkboard, with Alice starting first.  If erasing a number causes the 
	bitwise XOR of all the elements of the chalkboard to become 0, then that 
	player loses.  (Also, we'll say the bitwise XOR of one element is that 
	element itself, and the bitwise XOR of no elements is 0.) Also, if any 
	player starts their turn with the bitwise XOR of all the elements of the 
	chalkboard equal to 0, then that player wins. Return True if and only if 
	Alice wins the game, assuming both players play optimally.

	Example:
	Input: nums = [1, 1, 2]
	Output: false
	Explanation: Alice has two choices: erase 1 or erase 2. If she erases 1, 
	             the nums array becomes [1, 2]. The bitwise XOR of all the 
	             elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove 
	             any element he wants, because Alice will be the one to erase 
	             the last element and she will lose. If Alice erases 2 first, 
	             now nums becomes [1, 1]. The bitwise XOR of all the elements 
	             of the chalkboard is 1 XOR 1 = 0. Alice will lose.

	Notes:
	* 1 <= N <= 1000. 
	* 0 <= nums[i] <= 2^16.*/

    bool xorGame(vector<int>& nums) {
        int val = 0; 
        for (auto& x : nums) val ^= x; 
        return val == 0 || size(nums) % 2 == 0; 
    }


    /*814. Binary Tree Pruning (Medium)
	Given the root of a binary tree, return the same tree where every subtree 
	(of the given tree) not containing a 1 has been removed. A subtree of a 
	node node is node plus every node that is a descendant of node.

	Example 1:
	Input: root = [1,null,0,0,1]
	Output: [1,null,0,null,1]
	Explanation: Only the red nodes satisfy the property "every subtree not 
	             containing a 1". The diagram on the right represents the 
	             answer.
	
	Example 2:
	Input: root = [1,0,1,0,0,0,1]
	Output: [1,null,1,null,1]

	Example 3:
	Input: root = [1,1,0,1,1,0,1,0]
	Output: [1,1,0,1,1,null,1]

	Constraints:
	* The number of nodes in the tree is in the range [1, 200].
	* Node.val is either 0 or 1.*/

    TreeNode* pruneTree(TreeNode* root) {
        if (root) {
            root->left = pruneTree(root->left); 
            root->right = pruneTree(root->right); 
            return root->left || root->val || root->right ? root : nullptr; 
        }
        return nullptr; 
    }


    /*815. Bus Routes (Hard)
	You are given an array routes representing bus routes where routes[i] is a 
	bus route that the ith bus repeats forever. For example, if 
	routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 
	1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever. You will start at the bus 
	stop source (You are not on any bus initially), and you want to go to the 
	bus stop target. You can travel between bus stops by buses only. Return the 
	least number of buses you must take to travel from source to target. Return 
	-1 if it is not possible.

	Example 1:
	Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
	Output: 2
	Explanation: The best strategy is take the first bus to the bus stop 7, 
	             then take the second bus to the bus stop 6.

	Example 2:
	Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
	Output: -1

	Constraints:
	* 1 <= routes.length <= 500.
	* 1 <= routes[i].length <= 10^5
	* All the values of routes[i] are unique.
	* sum(routes[i].length) <= 10^5
	* 0 <= routes[i][j] < 10^6
	* 0 <= source, target < 10^6*/

    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        unordered_map<int, vector<int>> mp; 
        for (int i = 0; i < size(routes); ++i) 
            for (auto& x : routes[i]) 
                mp[x].push_back(i); 
        
        int ans = 0; 
        queue<int> q; q.push(source); 
        unordered_set<int> seen = {source}; 
        
        while (size(q)) {
            for (int n = size(q); n > 0; --n) {
                int x = q.front(); q.pop(); 
                if (x == target) return ans; 
                for (auto i : mp[x]) {
                    for (auto xx : routes[i]) 
                        if (seen.find(xx) == seen.end()) {
                            seen.insert(xx); 
                            q.push(xx); 
                        }
                    routes[i].clear(); 
                }
            }
            ++ans; 
        }
        return -1; 
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


    /*827. Making A Large Island (Hard)
	You are given an n x n binary matrix grid. You are allowed to change at 
	most one 0 to be 1. Return the size of the largest island in grid after 
	applying this operation. An island is a 4-directionally connected group 
	of 1s.

	Example 1:
	Input: grid = [[1,0],[0,1]]
	Output: 3
	Explanation: Change one 0 to 1 and connect two 1s, then we get an island 
	             with area = 3.
	
	Example 2:
	Input: grid = [[1,1],[1,0]]
	Output: 4
	Explanation: Change the 0 to 1 and make the island bigger, only one island 
	             with area = 4.
	
	Example 3:
	Input: grid = [[1,1],[1,1]]
	Output: 4
	Explanation: Can't change any 0 to 1, only one island with area = 4.

	Constraints:
	* n == grid.length
	* n == grid[i].length
	* 1 <= n <= 500
	* grid[i][j] is either 0 or 1.*/

    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size(), v = 2, d[5] = {1, 0, -1, 0, 1}; 
        unordered_map<int, int> freq; 
        
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < n; ++j) 
                if (grid[i][j] == 1) {
                    stack<pair<int, int>> stk; 
                    stk.emplace(i, j); 
                    grid[i][j] = v; 
                    while (stk.size()) {
                        auto [i, j] = stk.top(); stk.pop(); 
                        ++freq[v]; 
                        for (int k = 0; k < 4; ++k) {
                            int ii = i + d[k], jj = j + d[k+1]; 
                            if (0 <= ii && ii < n && 0 <= jj && jj < n && grid[ii][jj] == 1) {
                                stk.emplace(ii, jj); 
                                grid[ii][jj] = v; 
                            }
                        }
                    }
                    ++v; 
                }
        
        int ans = 0; 
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < n; ++j) 
                if (grid[i][j]) ans = max(ans, freq[grid[i][j]]); 
                else {
                    int cand = 1; 
                    unordered_set<int> seen; 
                    for (int k = 0; k < 4; ++k) {
                        int ii = i + d[k], jj = j + d[k+1]; 
                        if (0 <= ii && ii < n && 0 <= jj && jj < n && grid[ii][jj] && !seen.count(grid[ii][jj])) {
                            seen.insert(grid[ii][jj]); 
                            cand += freq[grid[ii][jj]]; 
                        }
                    }
                    ans = max(ans, cand); 
                }
        return ans; 
    }


    /*828. Count Unique Characters of All Substrings of a Given String (Hard)
	Let's define a function countUniqueChars(s) that returns the number of 
	unique characters on s. 
	* For example if s = "LEETCODE" then "L", "T", "C", "O", "D" are the unique 
	characters since they appear only once in s, therefore countUniqueChars(s) = 5.
	Given a string s, return the sum of countUniqueChars(t) where t is a 
	substring of s. Notice that some substrings can be repeated so in this case 
	you have to count the repeated ones too.

	Example 1:
	Input: s = "ABC"
	Output: 10
	Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
	             Evey substring is composed with only unique letters. Sum of 
	             lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
	
	Example 2:
	Input: s = "ABA"
	Output: 8
	Explanation: The same as example 1, except countUniqueChars("ABA") = 1.

	Example 3:
	Input: s = "LEETCODE"
	Output: 92

	Constraints:
	* 1 <= s.length <= 10^5
	* s consists of uppercase English letters only.*/

    int uniqueLetterString(string s) {
        vector<vector<int>> locs(26, vector<int>(1, -1)); 
        for (int i = 0; i < s.size(); ++i) locs[s[i] - 'A'].push_back(i); 
        
        int ans = 0; 
        for (int i = 0; i < 26; ++i) {
            locs[i].push_back(s.size()); 
            for (int k = 1; k < locs[i].size()-1; ++k) 
                ans += (locs[i][k] - locs[i][k-1]) * (locs[i][k+1] - locs[i][k]); 
        }
        return ans; 
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


    /*834. Sum of Distances in Tree (Hard)
	An undirected, connected tree with n nodes labelled 0...n-1 and n-1 edges 
	are given. The ith edge connects nodes edges[i][0] and edges[i][1] together.
	Return a list ans, where ans[i] is the sum of the distances between node i 
	and all other nodes.

	Example 1:
	Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
	Output: [8,12,6,10,10,10]
	Explanation: Here is a diagram of the given tree:
	  0
	 / \
	1   2
	   /|\
	  3 4 5
	We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
	equals 1 + 1 + 2 + 2 + 2 = 8.  Hence, answer[0] = 8, and so on.
	Note: 1 <= n <= 10000*/

    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        unordered_map<int, vector<int>> graph; 
        for (auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]); 
            graph[edge[1]].push_back(edge[0]); 
        }
        
        vector<int> size(n); 
        
        function<pair<int, int>(int, int)> fn = [&](int x, int p) {
            int c = 1, s = 0; 
            for (auto& xx : graph[x]) {
                if (xx != p) {
                    auto [cc, ss] = fn(xx, x); 
                    c += cc; 
                    s += ss + cc; 
                }
            }
            size[x] = c; 
            return make_pair(c, s); 
        };
        
        vector<int> ans(n); 
        ans[0] = fn(0, -1).second; 
        
        stack<int> stk; 
        stk.push(0); 
        while (stk.size()) {
            int x = stk.top(); stk.pop(); 
            for (auto& xx : graph[x]) {
                if (!ans[xx]) {
                    ans[xx] = ans[x] + n - 2*size[xx]; 
                    stk.push(xx); 
                }
            }
        }
        return ans; 
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


    /*838. Push Dominoes (Medium)
	There are n dominoes in a line, and we place each domino vertically upright. 
	In the beginning, we simultaneously push some of the dominoes either to the 
	left or to the right. After each second, each domino that is falling to the 
	left pushes the adjacent domino on the left. Similarly, the dominoes 
	falling to the right push their adjacent dominoes standing on the right.
	When a vertical domino has dominoes falling on it from both sides, it stays 
	still due to the balance of the forces. For the purposes of this question, 
	we will consider that a falling domino expends no additional force to a 
	falling or already fallen domino. You are given a string dominoes 
	representing the initial state where:
	* dominoes[i] = 'L', if the ith domino has been pushed to the left,
	* dominoes[i] = 'R', if the ith domino has been pushed to the right, and
	* dominoes[i] = '.', if the ith domino has not been pushed.
	Return a string representing the final state.

	Example 1:
	Input: dominoes = "RR.L"
	Output: "RR.L"
	Explanation: The first domino expends no additional force on the second 
	             domino.
	
	Example 2:
	Input: dominoes = ".L.R...LR..L.."
	Output: "LL.RR.LLRRLL.."

	Constraints:
	* n == dominoes.length
	* 1 <= n <= 10^5
	* dominoes[i] is either 'L', 'R', or '.'.*/

    string pushDominoes(string dominoes) {
        int n = dominoes.size(); 
        vector<int> mp(n); 
        for (int i = n-1, ii = n; i >= 0; --i) {
            if (dominoes[i] != '.') ii = i; 
            mp[i] = ii; 
        }
        
        string ans; 
        for (int i = 0, ii = -1; i < n; ++i) {
            if (dominoes[i] == 'L' || dominoes[i] == 'R') {
                ans.push_back(dominoes[i]); 
                ii = i; 
            } else {
                char ll = ii == -1 ? 'L' : dominoes[ii], rr = mp[i] == n ? 'R' : dominoes[mp[i]]; 
                if (ll == rr) ans.push_back(ll); 
                else if (ll == 'L') ans.push_back('.'); 
                else {
                    if (i - ii < mp[i] - i) ans.push_back('R'); 
                    else if (i - ii > mp[i] - i) ans.push_back('L'); 
                    else ans.push_back('.'); 
                }
            }
        }
        return ans; 
    }


    /*843. Guess the Word (Hard)
	This is an interactive problem. You are given an array of unique strings 
	wordlist where wordlist[i] is 6 letters long, and one word in this list is 
	chosen as secret. You may call Master.guess(word) to guess a word. The 
	guessed word should have type string and must be from the original list 
	with 6 lowercase letters. This function returns an integer type, 
	representing the number of exact matches (value and position) of your guess 
	to the secret word. Also, if your guess is not in the given wordlist, it 
	will return -1 instead. For each test case, you have exactly 10 guesses to 
	guess the word. At the end of any number of calls, if you have made 10 or 
	fewer calls to Master.guess and at least one of these guesses was secret, 
	then you pass the test case.

	Example 1:
	Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"], numguesses = 10
	Output: You guessed the secret word correctly.
	Explanation: master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
	             master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
	             master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
	             master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
	             master.guess("abcczz") returns 4, because "abcczz" has 4 matches.
	             We made 5 calls to master.guess and one of them was the secret, so we pass the test case.

	Example 2:
	Input: secret = "hamada", wordlist = ["hamada","khaled"], numguesses = 10
	Output: You guessed the secret word correctly.

	Constraints:
	* 1 <= wordlist.length <= 100
	* wordlist[i].length == 6
	* wordlist[i] consist of lowercase English letters.
	* All the strings of wordlist are unique.
	* secret exists in wordlist.
	* numguesses == 10*/

    void findSecretWord(vector<string>& wordlist, Master& master) {
        srand(1); 
        random_shuffle(wordlist.begin(), wordlist.end()); 
        for (int step = 0; step < 10; ++step) 
            if (wordlist.size()) {
                string w = wordlist.back(); 
                wordlist.pop_back(); 
                int m = master.guess(w); 
                vector<string> temp; 
                for (auto& ww : wordlist) {
                    int cnt = 0; 
                    for (int i = 0; i < w.size(); ++i) 
                        if (w[i] == ww[i]) ++cnt; 
                    if (cnt == m) temp.push_back(ww); 
                }
                wordlist = temp; 
            }
    }


    /*847. Shortest Path Visiting All Nodes (Hard)
	You have an undirected, connected graph of n nodes labeled from 0 to n - 1. 
	You are given an array graph where graph[i] is a list of all the nodes 
	connected with node i by an edge. Return the length of the shortest path 
	that visits every node. You may start and stop at any node, you may revisit 
	nodes multiple times, and you may reuse edges.

	Example 1:
	Input: graph = [[1,2,3],[0],[0],[0]]
	Output: 4
	Explanation: One possible path is [1,0,2,0,3]

	Example 2:
	Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
	Output: 4
	Explanation: One possible path is [0,1,4,2,3]

	Constraints:
	* n == graph.length
	* 1 <= n <= 12
	* 0 <= graph[i].length < n
	* graph[i] does not contain i.
	* If graph[a] contains b, then graph[b] contains a.
	* The input graph is always connected.*/

    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size(); 
        queue<pair<int, int>> q; 
        vector<vector<bool>> seen(n, vector<bool>(1 << n, false)); 
        
        for (int i = 0; i < n; ++i) {
            q.emplace(i, 1 << i);
            seen[i][1 << i] = true;  
        }
        
        int ans = 0; 
        while (q.size()) {
            for (int k = q.size(); k; --k) {
                auto [i, mask] = q.front(); q.pop(); 
                if (mask == (1 << n) - 1) return ans;  
                for (auto& ii : graph[i]) 
                    if (!seen[ii][mask | (1 << ii)]) {
                        q.emplace(ii, mask | (1 << ii));
                        seen[ii][mask | (1 << ii)] = true; 
                    }
            }
            ++ans; 
        }
        return ans; 
    }


    /*850. Rectangle Area II (Hard)
	We are given a list of (axis-aligned) rectangles. Each 
	rectangle[i] = [xi1, yi1, xi2, yi2], where (xi1, yi1) are the coordinates 
	of the bottom-left corner, and (xi2, yi2) are the coordinates of the top-
	right corner of the ith rectangle. Find the total area covered by all 
	rectangles in the plane. Since the answer may be too large, return it 
	modulo 10^9 + 7.

	Example 1:
	Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
	Output: 6
	Explanation: As illustrated in the picture.

	Example 2:
	Input: rectangles = [[0,0,1000000000,1000000000]]
	Output: 49
	Explanation: The answer is 1018 modulo (109 + 7), which is (109)2 = (-7)2 = 49.

	Constraints:
	* 1 <= rectangles.length <= 200
	* rectanges[i].length = 4
	* 0 <= rectangles[i][j] <= 10^9
	* The total area covered by all rectangles will never exceed 2^63 - 1 and 
	  thus will fit in a 64-bit signed integer.*/

    int rectangleArea(vector<vector<int>>& rectangles) {
        vector<vector<int>> line; 
        for (auto& rectangle : rectangles) {
            int x1 = rectangle[0], y1 = rectangle[1], x2 = rectangle[2], y2 = rectangle[3]; 
            line.push_back({y1, x1, x2, 1}); 
            line.push_back({y2, x1, x2, 0}); 
        }
        
        sort(line.begin(), line.end()); 
        
        long ans = 0, val = 0; 
        int yy = 0, prev = 0; 
        multiset<vector<int>> segments; 
        for (auto& elem : line) {
            int y = elem[0], x1 = elem[1], x2 = elem[2], tf = elem[3]; 
            ans = (ans + val * (y - yy)) % 1'000'000'007;
            yy = y; 
            if (tf) segments.insert({x1, x2}); 
            else segments.erase(segments.find({x1, x2})); 
            val = prev = 0;
            for (auto& seg : segments) {
                x1 = seg[0];
                x2 = seg[1]; 
                val += max(0, x2 - max(x1, prev)); 
                prev = max(prev, x2); 
            }
        }
        return ans; 
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


    /*857. Minimum Cost to Hire K Workers (Hard)
	There are n workers. The i-th worker has a quality[i] and a minimum wage 
	expectation wage[i]. Now we want to hire exactly k workers to form a paid 
	group. When hiring a group of k workers, we must pay them according to the 
	following rules:
	* Every worker in the paid group should be paid in the ratio of their 
	  quality compared to other workers in the paid group.
	* Every worker in the paid group must be paid at least their minimum wage 
	  expectation.
	Return the least amount of money needed to form a paid group satisfying the 
	above conditions.

	Example 1:
	Input: quality = [10,20,5], wage = [70,50,30], k = 2
	Output: 105.00000
	Explanation: We pay 70 to 0-th worker and 35 to 2-th worker.

	Example 2:
	Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
	Output: 30.66667
	Explanation: We pay 4 to 0-th worker, 13.33333 to 2-th and 3-th workers 
	             seperately. 

	Note:
	* 1 <= k <= n <= 10000, where n = quality.length = wage.length
	* 1 <= quality[i] <= 10000
	* 1 <= wage[i] <= 10000
	* Answers within 10-5 of the correct answer will be considered correct.*/

    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        vector<pair<int, int>> data; // zipped quality & wage 
        for (int i = 0; i < size(quality); ++i) 
            data.emplace_back(quality[i], wage[i]); 
        
        sort(begin(data), end(data), [](auto& lhs, auto& rhs) { return (double) lhs.second/lhs.first < (double) rhs.second/rhs.first; }); 
        
        double ans = DBL_MAX, rsm = 0; // range sum 
        priority_queue<int> pq; // max-heap 
        for (auto& [q, w] : data) {
            rsm += q; 
            pq.push(q); 
            if (size(pq) > k) rsm -= pq.top(), pq.pop(); 
            if (size(pq) == k) ans = min(ans, rsm * w/q); 
        }
        return ans; 
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


    /*871. Minimum Number of Refueling Stops (Hard)
	A car travels from a starting position to a destination which is target 
	miles east of the starting position. Along the way, there are gas stations.  
	Each station[i] represents a gas station that is station[i][0] miles east 
	of the starting position, and has station[i][1] liters of gas. The car 
	starts with an infinite tank of gas, which initially has startFuel liters 
	of fuel in it.  It uses 1 liter of gas per 1 mile that it drives. When the 
	car reaches a gas station, it may stop and refuel, transferring all the gas 
	from the station into the car. What is the least number of refueling stops 
	the car must make in order to reach its destination?  If it cannot reach 
	the destination, return -1. Note that if the car reaches a gas station with 
	0 fuel left, the car can still refuel there.  If the car reaches the 
	destination with 0 fuel left, it is still considered to have arrived.

	Example 1:
	Input: target = 1, startFuel = 1, stations = []
	Output: 0
	Explanation: We can reach the target without refueling.

	Example 2:
	Input: target = 100, startFuel = 1, stations = [[10,100]]
	Output: -1
	Explanation: We can't reach the target (or even the first gas station).

	Example 3:
	Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
	Output: 2
	Explanation: We start with 10 liters of fuel. We drive to position 10, 
	             expending 10 liters of fuel.  We refuel from 0 liters to 60 
	             liters of gas. Then, we drive from position 10 to position 60 
	             (expending 50 liters of fuel), and refuel from 10 liters to 50 
	             liters of gas.  We then drive to and reach the target. We made 
	             2 refueling stops along the way, so we return 2.

	Note:
	* 1 <= target, startFuel, stations[i][1] <= 10^9
	* 0 <= stations.length <= 500
	* 0 < stations[0][0] < stations[1][0] < ... < stations[stations.length-1][0] < target*/

    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        int ans = 0, k = 0, total = startFuel; 
        priority_queue<int> pq; 
        while (total < target) {
            for(; k < size(stations) && stations[k][0] <= total; ++k) 
                pq.push(stations[k][1]); 
            if (pq.empty()) return -1; 
            total += pq.top(), pq.pop(); 
            ans += 1; 
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


    /*877. Stone Game (Medium)
	Alex and Lee play a game with piles of stones. There are an even number of 
	piles arranged in a row, and each pile has a positive integer number of 
	stones piles[i]. The objective of the game is to end with the most stones.  
	The total number of stones is odd, so there are no ties. Alex and Lee take 
	turns, with Alex starting first. Each turn, a player takes the entire pile 
	of stones from either the beginning or the end of the row. This continues 
	until there are no more piles left, at which point the person with the most 
	stones wins. Assuming Alex and Lee play optimally, return True if and only 
	if Alex wins the game.

	Example 1:
	Input: piles = [5,3,4,5]
	Output: true
	Explanation: 
	Alex starts first, and can only take the first 5 or the last 5.
	Say he takes the first 5, so that the row becomes [3, 4, 5].
	If Lee takes 3, then the board is [4, 5], and Alex takes 5 to win with 10 points.
	If Lee takes the last 5, then the board is [3, 4], and Alex takes 4 to win with 9 points.
	This demonstrated that taking the first 5 was a winning move for Alex, so we return true.

	Constraints:
	* 2 <= piles.length <= 500
	* piles.length is even.
	* 1 <= piles[i] <= 500
	* sum(piles) is odd.*/

    bool stoneGame(vector<int>& piles) {
        int n = piles.size(); 
        vector<vector<int>> dp(n, vector<int>(n)); 
        for (int i = n-1; i >= 0; --i) 
            for (int j = i; j < n; ++j) 
                if (i == j) dp[i][j] = piles[i]; 
                else dp[i][j] = max(piles[i] + dp[i+1][j], piles[j] + dp[i][j-1]); 
        return dp[0][n-1] > 0; 
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


    /*899. Orderly Queue (Hard)
	A string s of lowercase letters is given. Then, we may make any number of 
	moves. In each move, we choose one of the first k letters (starting from 
	the left), remove it, and place it at the end of the string. Return the 
	lexicographically smallest string we could have after any number of moves.

	Example 1:
	Input: s = "cba", k = 1
	Output: "acb"
	Explanation: In the first move, we move the 1st character ("c") to the end, 
	             obtaining the string "bac". In the second move, we move the 
	             1st character ("b") to the end, obtaining the final result 
	             "acb".
	
	Example 2:
	Input: s = "baaca", k = 3
	Output: "aaabc"
	Explanation: In the first move, we move the 1st character ("b") to the end, 
	             obtaining the string "aacab". In the second move, we move the 
	             3rd character ("c") to the end, obtaining the final result 
	             "aaabc".

	Note:
	* 1 <= k <= s.length <= 1000
	* s consists of lowercase letters only.*/

    string orderlyQueue(string s, int k) {
        string ans = s; 
        if (k == 1) 
            for (int i = 1; i < s.size(); ++i) 
                ans = min(ans, s.substr(i) + s.substr(0, i)); 
        else 
            sort(ans.begin(), ans.end()); 
        return ans; 
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


    /*915. Partition Array into Disjoint Intervals (Medium)
	Given an array nums, partition it into two (contiguous) subarrays left and 
	right so that:
	* Every element in left is less than or equal to every element in right.
	* left and right are non-empty.
	* left has the smallest possible size.
	Return the length of left after such a partitioning.  It is guaranteed that 
	such a partitioning exists.

	Example 1:
	Input: nums = [5,0,3,8,6]
	Output: 3
	Explanation: left = [5,0,3], right = [8,6]

	Example 2:
	Input: nums = [1,1,1,0,6,12]
	Output: 4
	Explanation: left = [1,1,1,0], right = [6,12]

	Note:
	* 2 <= nums.length <= 30000
	* 0 <= nums[i] <= 106
	* It is guaranteed there is at least one way to partition nums as described.*/

    int partitionDisjoint(vector<int>& nums) {
        int ans = 0, mx = nums[0], threshold = nums[0]; 
        for (int i = 0; i < nums.size(); ++i) {
            mx = max(mx, nums[i]); 
            if (nums[i] < threshold) {
                ans = i; 
                threshold = mx; 
            }
        }
        return ans + 1; 
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


    /*920. Number of Music Playlists (Hard)
	Your music player contains n different songs and she wants to listen to 
	goal (not necessarily different) songs during your trip.  You create a 
	playlist so that:
	* Every song is played at least once
	* A song can only be played again only if k other songs have been played
	Return the number of possible playlists.  As the answer can be very large, 
	return it modulo 10^9 + 7.

	Example 1:
	Input: n = 3, goal = 3, k = 1
	Output: 6
	Explanation: There are 6 possible playlists. [1, 2, 3], [1, 3, 2], 
	             [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1].
	
	Example 2:
	Input: n = 2, goal = 3, k = 0
	Output: 6
	Explanation: There are 6 possible playlists. [1, 1, 2], [1, 2, 1], 
	             [2, 1, 1], [2, 2, 1], [2, 1, 2], [1, 2, 2]
	
	Example 3:
	Input: n = 2, goal = 3, k = 1
	Output: 2
	Explanation: There are 2 possible playlists. [1, 2, 1], [2, 1, 2]

	Note: 0 <= k < n <= goal <= 100*/

    int numMusicPlaylists(int n, int goal, int k) {
        const int MOD = 1'000'000'007; 
        vector<vector<long>> dp(goal+1, vector<long>(n+1, 0)); 
        dp[goal][n] = 1l; 
        for (int i = goal-1; i >= 0; --i) {
            for (int j = n; j >= 0; --j) {
                if (j < n) dp[i][j] = (dp[i][j] + (n-j) * dp[i+1][j+1]) % MOD; 
                if (k < j) dp[i][j] = (dp[i][j] + (j-k) * dp[i+1][j]) % MOD; 
            }
        }
        return dp[0][0]; 
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


    /*926. Flip String to Monotone Increasing (Medium)
	A binary string is monotone increasing if it consists of some number of 0's 
	(possibly none), followed by some number of 1's (also possibly none). You 
	are given a binary string s. You can flip s[i] changing it from 0 to 1 or 
	from 1 to 0. Return the minimum number of flips to make s monotone 
	increasing.

	Example 1:
	Input: s = "00110"
	Output: 1
	Explanation: We flip the last digit to get 00111.

	Example 2:
	Input: s = "010110"
	Output: 2
	Explanation: We flip to get 011111, or alternatively 000111.

	Example 3:
	Input: s = "00011000"
	Output: 2
	Explanation: We flip to get 00000000.

	Constraints:
	* 1 <= s.length <= 10^5
	* s[i] is either '0' or '1'.*/

    int minFlipsMonoIncr(string s) {
        int ones = 0, flip = 0; 
        for (auto& ch : s) {
            if (ch == '1') ones += 1; 
            else flip = min(ones, flip + 1); 
        }
        return flip; 
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


    /*932. Beautiful Array (Medium)
	For some fixed n, an array nums is beautiful if it is a permutation of the 
	integers 1, 2, ..., n, such that for every i < j, there is no k with 
	i < k < j such that nums[k] * 2 = nums[i] + nums[j]. Given n, return any 
	beautiful array nums. (It is guaranteed that one exists.)

	Example 1:
	Input: n = 4
	Output: [2,1,4,3]

	Example 2:
	Input: n = 5
	Output: [3,1,2,5,4]

	Note: 1 <= n <= 1000*/

    vector<int> beautifulArray(int n) {
        vector<int> ans = {1}; 
        while (ans.size() < n) {
            vector<int> tmp; 
            for (auto& x : ans) if (2*x-1 <= n) tmp.push_back(2*x-1); 
            for (auto& x : ans) if (2*x <= n) tmp.push_back(2*x); 
            ans = tmp; 
        }
        return ans; 
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


    /*954. Array of Doubled Pairs (Medium)
	Given an array of integers arr of even length, return true if and only if 
	it is possible to reorder it such that arr[2 * i + 1] = 2 * arr[2 * i] for 
	every 0 <= i < len(arr) / 2.

	Example 1:
	Input: arr = [3,1,3,6]
	Output: false

	Example 2:
	Input: arr = [2,1,2,6]
	Output: false

	Example 3:
	Input: arr = [4,-2,2,-4]
	Output: true
	Explanation: We can take two groups, [-2,-4] and [2,4] to form [-2,-4,2,4] 
	             or [2,4,-2,-4].

	Example 4:
	Input: arr = [1,2,4,16,8,4]
	Output: false

	Constraints:
	* 0 <= arr.length <= 3 * 10^4
	* arr.length is even.
	* -10^5 <= arr[i] <= 10^5*/

    bool canReorderDoubled(vector<int>& arr) {
        sort(arr.begin(), arr.end()); 
        
        unordered_map<int, int> freq; 
        for (auto& x : arr) ++freq[x]; 
        
        for (auto& x : arr) 
            if (freq[x] && freq[2*x]) { --freq[x]; --freq[2*x]; }
        for (auto& [k, v] : freq) 
            if (v) return false; 
        return true; 
    }


    /*955. Delete Columns to Make Sorted II (Medium)
	You are given an array of n strings strs, all of the same length. We may 
	choose any deletion indices, and we delete all the characters in those 
	indices for each string. For example, if we have strs = ["abcdef","uvwxyz"] 
	and deletion indices {0, 2, 3}, then the final array after deletions is 
	["bef", "vyz"]. Suppose we chose a set of deletion indices answer such that 
	after deletions, the final array has its elements in lexicographic order 
	(i.e., strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]). Return the 
	minimum possible value of answer.length.

	Example 1:
	Input: strs = ["ca","bb","ac"]
	Output: 1
	Explanation: After deleting the first column, strs = ["a", "b", "c"]. Now 
	             strs is in lexicographic order (ie. strs[0] <= strs[1] <= strs[2]).
	             We require at least 1 deletion since initially strs was not in 
	             lexicographic order, so the answer is 1.
	
	Example 2:
	Input: strs = ["xc","yb","za"]
	Output: 0
	Explanation: strs is already in lexicographic order, so we do not need to 
	             delete anything. Note that the rows of strs are not 
	             necessarily in lexicographic order: i.e., it is NOT 
	             necessarily true that (strs[0][0] <= strs[0][1] <= ...)
	
	Example 3:
	Input: strs = ["zyx","wvu","tsr"]
	Output: 3
	Explanation: We have to delete every column.

	Constraints:
	* n == strs.length
	* 1 <= n <= 100
	* 1 <= strs[i].length <= 100
	* strs[i] consists of lowercase English letters.*/

    int minDeletionSize(vector<string>& strs) {
        int ans = 0, m = size(strs), n = size(strs[0]); 
        vector<int> grp(m); 
        for (int j = 0; j < n; ++j) {
            bool found = false; 
            for (int i = 1; i < m; ++i) 
                if (grp[i-1] == grp[i] && strs[i-1][j] > strs[i][j]) {
                    ++ans; 
                    found = true; 
                    break; 
                }
            if (!found) 
                for (int i = 1; i < m; ++i) {
                    grp[i] = max(grp[i-1], grp[i]); 
                    if (grp[i-1] == grp[i] && strs[i-1][j] < strs[i][j]) grp[i] = i; 
                }
        }
        return ans; 
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


    /*964. Least Operators to Express Number (Hard)
	Given a single positive integer x, we will write an expression of the form 
	x (op1) x (op2) x (op3) x ... where each operator op1, op2, etc. is either 
	addition, subtraction, multiplication, or division (+, -, *, or /). For 
	example, with x = 3, we might write 3 * 3 / 3 + 3 - 3 which is a value of 3.
	When writing such an expression, we adhere to the following conventions:
	* The division operator (/) returns rational numbers.
	* There are no parentheses placed anywhere.
	* We use the usual order of operations: multiplication and division happen 
	  before addition and subtraction.
	* It is not allowed to use the unary negation operator (-). For example, 
	  "x - x" is a valid expression as it only uses subtraction, but "-x + x" 
	  is not because it uses negation.
	We would like to write an expression with the least number of operators 
	such that the expression equals the given target. Return the least number 
	of operators used.

	Example 1:
	Input: x = 3, target = 19
	Output: 5
	Explanation: 3 * 3 + 3 * 3 + 3 / 3. The expression contains 5 operations.
	
	Example 2:
	Input: x = 5, target = 501
	Output: 8
	Explanation: 5 * 5 * 5 * 5 - 5 * 5 * 5 + 5 / 5. The expression contains 8 
	             operations.
	
	Example 3:
	Input: x = 100, target = 100000000
	Output: 3
	Explanation: 100 * 100 * 100 * 100. The expression contains 3 operations.

	Constraints:
	* 2 <= x <= 100
	* 1 <= target <= 2 * 10^8*/

    int leastOpsExpressTarget(int x, int target) {
        unordered_map<int, int> memo; 
        
        function<int(int)> fn = [&](int val) {
            if (val < x) return min(2*val-1, 2*(x-val)); 
            if (memo.find(val) == memo.end()) {
                int k = log(val)/log(x); 
                memo[val] = k + fn(val - pow(x, k)); 
                if (pow(x, k+1) < 2*val) 
                    memo[val] = min(memo[val], k+1+fn(pow(x, k+1) - val)); 
            }
            return memo[val]; 
        }; 
        
        return fn(target); 
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


    /*975. Odd Even Jump (Hard)
	You are given an integer array arr. From some starting index, you can make 
	a series of jumps. The (1st, 3rd, 5th, ...) jumps in the series are called 
	odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps in the series are 
	called even-numbered jumps. Note that the jumps are numbered, not the 
	indices. You may jump forward from index i to index j (with i < j) in the 
	following way:
	* During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the 
	  index j such that arr[i] <= arr[j] and arr[j] is the smallest possible 
	  value. If there are multiple such indices j, you can only jump to the 
	  smallest such index j.
	* During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the 
	  index j such that arr[i] >= arr[j] and arr[j] is the largest possible 
	  value. If there are multiple such indices j, you can only jump to the 
	  smallest such index j.
	* It may be the case that for some index i, there are no legal jumps.
	A starting index is good if, starting from that index, you can reach the 
	end of the array (index arr.length - 1) by jumping some number of times 
	(possibly 0 or more than once). Return the number of good starting indices.

	Example 1:
	Input: arr = [10,13,12,14,15]
	Output: 2
	Explanation: From starting index i = 0, we can make our 1st jump to i = 2 (since arr[2] is the smallest among arr[1], arr[2], arr[3], arr[4] that is greater or equal to arr[0]), then we cannot jump any more.
	             From starting index i = 1 and i = 2, we can make our 1st jump to i = 3, then we cannot jump any more.
	             From starting index i = 3, we can make our 1st jump to i = 4, so we have reached the end.
	             From starting index i = 4, we have reached the end already.
	             In total, there are 2 different starting indices i = 3 and 
	             i = 4, where we can reach the end with some number of jumps.
	
	Example 2:
	Input: arr = [2,3,1,1,4]
	Output: 3
	Explanation: From starting index i = 0, we make jumps to i = 1, i = 2, i = 3:
	             During our 1st jump (odd-numbered), we first jump to i = 1 because arr[1] is the smallest value in [arr[1], arr[2], arr[3], arr[4]] that is greater than or equal to arr[0].
	             During our 2nd jump (even-numbered), we jump from i = 1 to i = 2 because arr[2] is the largest value in [arr[2], arr[3], arr[4]] that is less than or equal to arr[1]. arr[3] is also the largest value, but 2 is a smaller index, so we can only jump to i = 2 and not i = 3
	             During our 3rd jump (odd-numbered), we jump from i = 2 to i = 3 because arr[3] is the smallest value in [arr[3], arr[4]] that is greater than or equal to arr[2].
	             We can't jump from i = 3 to i = 4, so the starting index i = 0 
	             is not good. In a similar manner, we can deduce that:
	             From starting index i = 1, we jump to i = 4, so we reach the end.
	             From starting index i = 2, we jump to i = 3, and then we can't jump anymore.
	             From starting index i = 3, we jump to i = 4, so we reach the end.
	             From starting index i = 4, we are already at the end.
	             In total, there are 3 different starting indices i = 1, i = 3, 
	             and i = 4, where we can reach the end with some number of jumps.
	
	Example 3:
	Input: arr = [5,1,3,4,2]
	Output: 3
	Explanation: We can reach the end from starting indices 1, 2, and 4.

	Constraints:
	* 1 <= arr.length <= 2 * 10^4
	* 0 <= arr[i] < 10^5*/

    int oddEvenJumps(vector<int>& arr) {
        int n = arr.size(), ans = 0; 
        vector<int> odd(n, 0), even(n, 0); 
        odd[n-1] = even[n-1] = 1; 
        
        set<int> st; 
        unordered_map<int, int> mp; 
        for (int i = n-1; i >= 0; --i) {
            auto lo = st.lower_bound(arr[i]), hi = st.upper_bound(arr[i]);  
            if (lo != st.end()) odd[i] = even[mp[*lo]]; 
            if (hi != st.begin()) even[i] = odd[mp[*prev(hi)]]; 
            st.insert(arr[i]); 
            mp[arr[i]] = i; 
            ans += odd[i]; 
        }
        return ans; 
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


    /*982. Triples with Bitwise AND Equal To Zero (Hard)
	Given an array of integers nums, find the number of triples of indices 
	(i, j, k) such that:
	* 0 <= i < nums.length
	* 0 <= j < nums.length
	* 0 <= k < nums.length
	* nums[i] & nums[j] & nums[k] == 0, where & represents the bitwise-AND 
	  operator.

	Example 1:
	Input: nums = [2,1,3]
	Output: 12
	Explanation: We could choose the following i, j, k triples:
	(i=0, j=0, k=1) : 2 & 2 & 1
	(i=0, j=1, k=0) : 2 & 1 & 2
	(i=0, j=1, k=1) : 2 & 1 & 1
	(i=0, j=1, k=2) : 2 & 1 & 3
	(i=0, j=2, k=1) : 2 & 3 & 1
	(i=1, j=0, k=0) : 1 & 2 & 2
	(i=1, j=0, k=1) : 1 & 2 & 1
	(i=1, j=0, k=2) : 1 & 2 & 3
	(i=1, j=1, k=0) : 1 & 1 & 2
	(i=1, j=2, k=0) : 1 & 3 & 2
	(i=2, j=0, k=1) : 3 & 2 & 1
	(i=2, j=1, k=0) : 3 & 1 & 2

	Note:
	* 1 <= nums.length <= 1000
	* 0 <= nums[i] < 2^16*/

    int countTriplets(vector<int>& nums) {
        unordered_map<int, int> freq; 
        for (auto& x : nums) 
            for (auto& y : nums) 
                ++freq[x&y]; 
        
        int ans = 0; 
        for (auto& x : nums) {
            x ^= 0xffff; 
            for (int mask = x; x; x = mask & (x-1)) 
                ans += freq[x]; 
        }
        return ans + size(nums)*freq[0]; 
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


    /*992. Subarrays with K Different Integers (Hard)
	Given an array nums of positive integers, call a (contiguous, not 
	necessarily distinct) subarray of nums good if the number of different 
	integers in that subarray is exactly k. (For example, [1,2,3,1,2] has 3 
	different integers: 1, 2, and 3.) Return the number of good subarrays of 
	nums.

	Example 1:
	Input: nums = [1,2,1,2,3], k = 2
	Output: 7
	Explanation: Subarrays formed with exactly 2 different integers: 
	             [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
	
	Example 2:
	Input: nums = [1,2,1,3,4], k = 3
	Output: 3
	Explanation: Subarrays formed with exactly 3 different integers: 
	             [1,2,1,3], [2,1,3], [1,3,4].

	Note:
	* 1 <= nums.length <= 20000
	* 1 <= nums[i] <= nums.length
	* 1 <= k <= nums.length*/

    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int ans = 0, ii = -1; 
        unordered_map<int, int> freq; 
        queue<int> q; 
        
        for (int i = 0; i < nums.size(); ++i) {
            freq[nums[i]]++; 
            q.push(i); 
            if (freq.size() > k) {
                ii = q.front(); q.pop(); 
                freq.erase(nums[ii]); 
            }
            
            while (freq[nums[q.front()]] > 1) {
                int k = q.front(); q.pop(); 
                freq[nums[k]]--; 
            }
            
            if (freq.size() == k) ans += q.front() - ii; 
        }
        return ans; 
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


    /*995. Minimum Number of K Consecutive Bit Flips (Hard)
	In an array nums containing only 0s and 1s, a k-bit flip consists of 
	choosing a (contiguous) subarray of length k and simultaneously changing 
	every 0 in the subarray to 1, and every 1 in the subarray to 0. Return the 
	minimum number of k-bit flips required so that there is no 0 in the array.  
	If it is not possible, return -1.

	Example 1:
	Input: nums = [0,1,0], k = 1
	Output: 2
	Explanation: Flip nums[0], then flip nums[2].

	Example 2:
	Input: nums = [1,1,0], k = 2
	Output: -1
	Explanation: No matter how we flip subarrays of size 2, we can't make the 
	             array become [1,1,1].
	
	Example 3:
	Input: nums = [0,0,0,1,0,1,1,0], k = 3
	Output: 3
	Explanation:
	Flip nums[0],nums[1],nums[2]: nums becomes [1,1,1,1,0,1,1,0]
	Flip nums[4],nums[5],nums[6]: nums becomes [1,1,1,1,1,0,0,0]
	Flip nums[5],nums[6],nums[7]: nums becomes [1,1,1,1,1,1,1,1]

	Note:
	* 1 <= nums.length <= 30000
	* 1 <= k <= nums.length*/

    int minKBitFlips(vector<int>& nums, int k) {
        deque<int> dq; 
        int ans = 0, flip = 0; 
        
        for (int i = 0; i < size(nums); ++i) {
            if (size(dq) && dq.front() == i) {
                dq.pop_front(); 
                flip ^= 1; 
            }
            if (nums[i] == flip) {
                if (size(nums)-i < k) return -1; 
                ++ans; 
                flip ^= 1; 
                dq.push_back(i+k); 
            }
        }
        return ans; 
    }


    /*997. Find the Town Judge (Easy)
	In a town, there are n people labelled from 1 to n. There is a rumor that 
	one of these people is secretly the town judge. If the town judge exists, 
	then:
	* The town judge trusts nobody.
	* Everybody (except for the town judge) trusts the town judge.
	* There is exactly one person that satisfies properties 1 and 2.
	You are given trust, an array of pairs trust[i] = [a, b] representing that 
	the person labelled a trusts the person labelled b. If the town judge 
	exists and can be identified, return the label of the town judge. Otherwise, 
	return -1.

	Example 1:
	Input: n = 2, trust = [[1,2]]
	Output: 2

	Example 2:
	Input: n = 3, trust = [[1,3],[2,3]]
	Output: 3

	Example 3:
	Input: n = 3, trust = [[1,3],[2,3],[3,1]]
	Output: -1

	Example 4:
	Input: n = 3, trust = [[1,2],[2,3]]
	Output: -1

	Example 5:
	Input: n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
	Output: 3

	Constraints:
	* 1 <= n <= 1000
	* 0 <= trust.length <= 10^4
	* trust[i].length == 2
	* trust[i] are all different
	* trust[i][0] != trust[i][1]
	* 1 <= trust[i][0], trust[i][1] <= n*/

    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> degree(n+1, 0); 
        for (auto& x : trust) {
            --degree[x[0]]; 
            ++degree[x[1]]; 
        }
        for (int i = 1; i <= n; ++i) 
            if (degree[i] == n-1) return i; 
        return -1; 
    }


    /*999. Available Captures for Rook (Easy)
	On an 8 x 8 chessboard, there is exactly one white rook 'R' and some number 
	of white bishops 'B', black pawns 'p', and empty squares '.'. When the rook 
	moves, it chooses one of four cardinal directions (north, east, south, or 
	west), then moves in that direction until it chooses to stop, reaches the 
	edge of the board, captures a black pawn, or is blocked by a white bishop. 
	A rook is considered attacking a pawn if the rook can capture the pawn on 
	the rook's turn. The number of available captures for the white rook is the 
	number of pawns that the rook is attacking. Return the number of available 
	captures for the white rook.

	Example 1:
	Input: board = [[".",".",".",".",".",".",".","."],
	                [".",".",".","p",".",".",".","."],
	                [".",".",".","R",".",".",".","p"],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".","p",".",".",".","."],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".",".",".",".",".","."]]
	Output: 3
	Explanation: In this example, the rook is attacking all the pawns.
	
	Example 2:
	Input: board = [[".",".",".",".",".",".",".","."],
	                [".","p","p","p","p","p",".","."],
	                [".","p","p","B","p","p",".","."],
	                [".","p","B","R","B","p",".","."],
	                [".","p","p","B","p","p",".","."],
	                [".","p","p","p","p","p",".","."],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".",".",".",".",".","."]]
	Output: 0
	Explanation: The bishops are blocking the rook from attacking any of the pawns.
	
	Example 3:
	Input: board = [[".",".",".",".",".",".",".","."],
	                [".",".",".","p",".",".",".","."],
	                [".",".",".","p",".",".",".","."],
	                ["p","p",".","R",".","p","B","."],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".","B",".",".",".","."],
	                [".",".",".","p",".",".",".","."],
	                [".",".",".",".",".",".",".","."]]
	Output: 3
	Explanation: The rook is attacking the pawns at positions b5, d6, and f5.

	Constraints:
	* board.length == 8
	* board[i].length == 8
	* board[i][j] is either 'R', '.', 'B', or 'p'
	* There is exactly one cell with board[i][j] == 'R'*/

    int numRookCaptures(vector<vector<char>>& board) {
        for (int i = 0; i < 8; ++i) 
            for (int j = 0; j < 8; ++j) 
                if (board[i][j] == 'R') {
                    int ans = 0; 
                    vector<pair<int, int>> dir = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}}; 
                    for (auto& [di, dj] : dir) {
                        for (int ii = i, jj = j; 0 <= ii && ii < 8 && 0 <= jj && jj < 8; ii += di, jj += dj) {
                            if (board[ii][jj] == 'B') break; 
                            if (board[ii][jj] == 'p') {
                                ++ans; 
                                break; 
                            }
                        }
                    }
                    return ans; 
                }
        return 0; 
    }


    /*1002. Find Common Characters (Easy)
	Given an array words of strings made only from lowercase letters, return a 
	list of all characters that show up in all strings within the list 
	(including duplicates).  For example, if a character occurs 3 times in all 
	strings but not 4 times, you need to include that character three times in 
	the final answer. You may return the answer in any order.

	Example 1:
	Input: ["bella","label","roller"]
	Output: ["e","l","l"]

	Example 2:
	Input: ["cool","lock","cook"]
	Output: ["c","o"]

	Note:
	* 1 <= words.length <= 100
	* 1 <= words[i].length <= 100
	* words[i] consists of lowercase English letters.*/

    vector<string> commonChars(vector<string>& words) {
        vector<int> freq(26, INT_MAX); 
        
        for (auto& word : words) {
            vector<int> temp(26, 0); 
            for (auto& ch : word) 
                ++temp[ch - 'a']; 
            for (int i = 0; i < 26; ++i) 
                freq[i] = min(freq[i], temp[i]); 
        }
        vector<string> ans; 
        for (int i = 0; i < 26; ++i) {
            while (freq[i]--) 
                ans.push_back(string(1, 'a' + i)); 
        }
        return ans; 
    }


    /*1004. Max Consecutive Ones III (Medium)
	Given a binary array nums and an integer k, return the maximum number of 
	consecutive 1's in the array if you can flip at most k 0's.

	Example 1:
	Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
	Output: 6
	Explanation: [1,1,1,0,0,1,1,1,1,1,1] 
	             Bolded numbers were flipped from 0 to 1. The longest subarray 
	             is underlined.
	
	Example 2:
	Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
	Output: 10
	Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
	             Bolded numbers were flipped from 0 to 1. The longest subarray 
	             is underlined.

	Constraints:
	* 1 <= nums.length <= 10^5
	* nums[i] is either 0 or 1.
	* 0 <= k <= nums.length*/

    int longestOnes(vector<int>& nums, int k) {
        int ans = 0; 
        for (int i = 0, ii = 0; i < size(nums); ++i) {
            if (nums[i] == 0) --k; 
            for (; k < 0; ++ii) 
                if (nums[ii] == 0) ++k; 
            ans = max(ans, i - ii + 1); 
        }
        return ans; 
    }


    /*1005. Maximize Sum Of Array After K Negations (Easy)
	Given an array nums of integers, we must modify the array in the following 
	way: we choose an i and replace nums[i] with -nums[i], and we repeat this 
	process k times in total.  (We may choose the same index i multiple times.)
	Return the largest possible sum of the array after modifying it in this way.

	Example 1:
	Input: nums = [4,2,3], k = 1
	Output: 5
	Explanation: Choose indices (1,) and nums becomes [4,-2,3].

	Example 2:
	Input: nums = [3,-1,0,2], k = 3
	Output: 6
	Explanation: Choose indices (1, 2, 2) and nums becomes [3,1,0,2].

	Example 3:
	Input: nums = [2,-3,-1,5,-4], k = 2
	Output: 13
	Explanation: Choose indices (1, 4) and nums becomes [2,3,-1,5,4].

	Note:
	* 1 <= nums.length <= 10000
	* 1 <= k <= 10000
	* -100 <= nums[i] <= 100*/

    int largestSumAfterKNegations(vector<int>& nums, int k) {
        sort(begin(nums), end(nums)); 
        for (int i = 0; i < size(nums) && k; ++i, --k) {
            if (nums[i] >= 0) break; 
            nums[i] *= -1; 
        }
        int sm = accumulate(begin(nums), end(nums), 0), mn = *min_element(begin(nums), end(nums)); 
        return sm - 2 * mn * (k%2); 
    }


    /*1036. Escape a Large Maze (Hard)
	There is a 1 million by 1 million grid on an XY-plane, and the coordinates 
	of each grid square are (x, y). We start at the source = [sx, sy] square 
	and want to reach the target = [tx, ty] square. There is also an array of 
	blocked squares, where each blocked[i] = [xi, yi] represents a blocked 
	square with coordinates (xi, yi). Each move, we can walk one square north, 
	east, south, or west if the square is not in the array of blocked squares. 
	We are also not allowed to walk outside of the grid. Return true if and 
	only if it is possible to reach the target square from the source square 
	through a sequence of valid moves.

	Example 1:
	Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
	Output: false
	Explanation: The target square is inaccessible starting from the source 
	             square because we cannot move. We cannot move north or east 
	             because those squares are blocked. We cannot move south or 
	             west because we cannot go outside of the grid.
	
	Example 2:
	Input: blocked = [], source = [0,0], target = [999999,999999]
	Output: true
	Explanation: Because there are no blocked cells, it is possible to reach 
	             the target square.

	Constraints:
	* 0 <= blocked.length <= 200
	* blocked[i].length == 2
	* 0 <= xi, yi < 10^6
	* source.length == target.length == 2
	* 0 <= sx, sy, tx, ty < 10^6
	* source != target
	* It is guaranteed that source and target are not blocked.*/

    bool isEscapePossible(vector<vector<int>>& blocked, vector<int>& source, vector<int>& target) {
        vector<int> dir = {1, 0, -1, 0, 1}; 
        
        unordered_set<long long> forbid; 
        for (auto blk : blocked) forbid.insert(((long long)blk[0] << 32) + blk[1]); 
        
        function<bool(int, int, int, int)> dfs = [&](int sx, int sy, int tx, int ty) {
            stack<pair<int, int>> stk; 
            stk.emplace(sx, sy); 
            unordered_set<long long> seen = {((long long)sx << 32) + sy}; 
            while (stk.size()) {
                auto [x, y] = stk.top(); stk.pop(); 
                if (abs(x - sx) + abs(y - sy) > 200 || x == tx && y == ty) return true; 
                for (int k = 0; k < 4; ++k) {
                    int xx = x + dir[k], yy = y + dir[k+1]; 
                    if (0 <= xx && xx < 1e6 && 0 <= yy && yy < 1e6) {
                        long long key = ((long long)xx << 32) + yy; 
                        if (forbid.find(key) == forbid.end() && seen.find(key) == seen.end()) {
                            stk.emplace(xx, yy); 
                            seen.emplace(key); 
                        }
                    }
                }
            }
            return false; 
        }; 
        
        return dfs(source[0], source[1], target[0], target[1]) && dfs(target[0], target[1], source[0], source[1]); 
    }


    /*1040. Moving Stones Until Consecutive II (Medium)
	On an infinite number line, the position of the i-th stone is given by 
	stones[i].  Call a stone an endpoint stone if it has the smallest or 
	largest position. Each turn, you pick up an endpoint stone and move it to 
	an unoccupied position so that it is no longer an endpoint stone. In 
	particular, if the stones are at say, stones = [1,2,5], you cannot move the 
	endpoint stone at position 5, since moving it to any position (such as 0, 
	or 3) will still keep that stone as an endpoint stone. The game ends when 
	you cannot make any more moves, ie. the stones are in consecutive positions.
	When the game ends, what is the minimum and maximum number of moves that 
	you could have made?  Return the answer as an length 2 array: 
	answer = [minimum_moves, maximum_moves]

	Example 1:
	Input: [7,4,9]
	Output: [1,2]
	Explanation: We can move 4 -> 8 for one move to finish the game. Or, we can 
	             move 9 -> 5, 4 -> 6 for two moves to finish the game.
	
	Example 2:
	Input: [6,5,4,3,10]
	Output: [2,3]
	Explanation: We can move 3 -> 8 then 10 -> 7 to finish the game. Or, we can 
	             move 3 -> 7, 4 -> 8, 5 -> 9 to finish the game. Notice we 
	             cannot move 10 -> 2 to finish the game, because that would be 
	             an illegal move.
	
	Example 3:
	Input: [100,101,104,102,103]
	Output: [0,0]

	Note:
	* 3 <= stones.length <= 10^4
	* 1 <= stones[i] <= 10^9
	* stones[i] have distinct values.*/

    vector<int> numMovesStonesII(vector<int>& stones) {
        sort(begin(stones), end(stones)); 
        int n = size(stones), ii = 0, low = INT_MAX, high = max(stones[n-2] - stones[0], stones[n-1] - stones[1]) - (n - 2); 
        
        for (int i = 0; i < n; ++i) {
            while (stones[i] - stones[ii] >= n) ++ii; 
            if (i - ii + 1 == n - 1 && stones[i] - stones[ii] == n - 2) low = min(low, 2); 
            else low = min(low, n - (i - ii + 1)); 
        }
        return {low, high}; 
    }


    /*1047. Remove All Adjacent Duplicates In String (Easy)
	You are given a string s consisting of lowercase English letters. A 
	duplicate removal consists of choosing two adjacent and equal letters and 
	removing them. We repeatedly make duplicate removals on s until we no 
	longer can. Return the final string after all such duplicate removals have 
	been made. It can be proven that the answer is unique.

	Example 1:
	Input: s = "abbaca"
	Output: "ca"
	Explanation: For example, in "abbaca" we could remove "bb" since the 
	             letters are adjacent and equal, and this is the only possible 
	             move.  The result of this move is that the string is "aaca", 
	             of which only "aa" is possible, so the final string is "ca".
	
	Example 2:
	Input: s = "azxxzy"
	Output: "ay"

	Constraints:
	* 1 <= s.length <= 10^5
	* s consists of lowercase English letters.*/

    string removeDuplicates(string s) {
        vector<char> stk; 
        for (auto& ch : s) {
            if (size(stk) && stk.back() == ch) stk.pop_back(); 
            else stk.push_back(ch); 
        }
        string ans; 
        for (auto& ch : stk) ans.push_back(ch); 
        return ans; 
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


    /*1055. Shortest Way to Form String (Medium)
	A subsequence of a string is a new string that is formed from the original 
	string by deleting some (can be none) of the characters without disturbing 
	the relative positions of the remaining characters. (i.e., "ace" is a 
	subsequence of "abcde" while "aec" is not). Given two strings source and 
	target, return the minimum number of subsequences of source such that their 
	concatenation equals target. If the task is impossible, return -1.

	Example 1:
	Input: source = "abc", target = "abcbc"
	Output: 2
	Explanation: The target "abcbc" can be formed by "abc" and "bc", which are 
	             subsequences of source "abc".
	
	Example 2:
	Input: source = "abc", target = "acdbc"
	Output: -1
	Explanation: The target string cannot be constructed from the subsequences 
	             of source string due to the character "d" in target string.
	
	Example 3:
	Input: source = "xyz", target = "xzyxz"
	Output: 3
	Explanation: The target string can be constructed as follows 
	             "xz" + "y" + "xz".

	Constraints:
	* 1 <= source.length, target.length <= 1000
	* source and target consist of lowercase English letters.*/

    int shortestWay(string source, string target) {
        unordered_map<char, vector<int>> locs; 
        for (int i = 0; i < source.size(); ++i) 
            locs[source[i]].push_back(i); 
        
        int ans = 1, i = 0; 
        for (auto& x : target) {
            if (locs.find(x) == locs.end()) return -1; 
            auto it = lower_bound(locs[x].begin(), locs[x].end(), i); 
            if (it == locs[x].end()) {
                ++ans; 
                it = locs[x].begin(); 
            }
            i = (*it) + 1; 
        }
        return ans; 
    }


    /*1057. Campus Bikes (Medium)
	On a campus represented on the X-Y plane, there are n workers and m bikes, 
	with n <= m. You are given an array workers of length n where 
	workers[i] = [xi, yi] is the position of the ith worker. You are also given 
	an array bikes of length m where bikes[j] = [xj, yj] is the position of the 
	jth bike. All the given positions are unique. Assign a bike to each worker. 
	Among the available bikes and workers, we choose the (workeri, bikej) pair 
	with the shortest Manhattan distance between each other and assign the bike 
	to that worker. If there are multiple (workeri, bikej) pairs with the same 
	shortest Manhattan distance, we choose the pair with the smallest worker 
	index. If there are multiple ways to do that, we choose the pair with the 
	smallest bike index. Repeat this process until there are no available 
	workers. Return an array answer of length n, where answer[i] is the index 
	(0-indexed) of the bike that the ith worker is assigned to. The Manhattan 
	distance between two points p1 and p2 is 
	Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.

	Example 1:
	Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
	Output: [1,0]
	Explanation: Worker 1 grabs Bike 0 as they are closest (without ties), and 
	             Worker 0 is assigned Bike 1. So the output is [1, 0].
	
	Example 2:
	Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
	Output: [0,2,1]
	Explanation: Worker 0 grabs Bike 0 at first. Worker 1 and Worker 2 share 
	             the same distance to Bike 2, thus Worker 1 is assigned to Bike 
	             2, and Worker 2 will take Bike 1. So the output is [0,2,1].

	Constraints:
	* n == workers.length
	* m == bikes.length
	* 1 <= n <= m <= 1000
	* workers[i].length == bikes[j].length == 2
	* 0 <= xi, yi < 1000
	* 0 <= xj, yj < 1000
	* All worker and bike locations are unique.*/

    vector<int> assignBikes(vector<vector<int>>& workers, vector<vector<int>>& bikes) {
        vector<vector<int>> vals; 
        for (int i = 0; i < workers.size(); ++i) 
            for (int j = 0; j < bikes.size(); ++j) {
                int dist = abs(workers[i][0] - bikes[j][0]) + abs(workers[i][1] - bikes[j][1]); 
                vals.push_back({dist, i, j}); 
            }
        
        sort(vals.begin(), vals.end()); 
        vector<int> ans(workers.size(), -1), seen(bikes.size(), 0); 
        for (auto& x : vals) {
            int i = x[1], j = x[2]; 
            if (ans[i] == -1 && !seen[j]) {
                ans[i] = j; 
                seen[j] = 1; 
            }
        }
        return ans; 
    }


    /*1058. Minimize Rounding Error to Meet Target (Medium)
	Given an array of prices [p1,p2...,pn] and a target, round each price pi to 
	Roundi(pi) so that the rounded array [Round1(p1),Round2(p2)...,Roundn(pn)] 
	sums to the given target. Each operation Roundi(pi) could be either 
	Floor(pi) or Ceil(pi). Return the string "-1" if the rounded array is 
	impossible to sum to target. Otherwise, return the smallest rounding error, 
	which is defined as Σ |Roundi(pi) - (pi)| for i from 1 to n, as a string 
	with three places after the decimal.

	Example 1:
	Input: prices = ["0.700","2.800","4.900"], target = 8
	Output: "1.000"
	Explanation: Use Floor, Ceil and Ceil operations to get 
	             (0.7 - 0) + (3 - 2.8) + (5 - 4.9) = 0.7 + 0.2 + 0.1 = 1.0 .
	
	Example 2:
	Input: prices = ["1.500","2.500","3.500"], target = 10
	Output: "-1"
	Explanation: It is impossible to meet the target.

	Example 3:
	Input: prices = ["1.500","2.500","3.500"], target = 9
	Output: "1.500"

	Constraints:
	* 1 <= prices.length <= 500
	* Each string prices[i] represents a real number in the range [0.0, 1000.0] 
	  and has exactly 3 decimal places.
	* 0 <= target <= 10^6*/

    string minimizeError(vector<string>& prices, int target) {
        vector<double> err; 
        double ans = 0, lo = 0, hi = 0; 
        for (auto& price : prices) {
            double x = stod(price); 
            lo += floor(x); 
            hi += ceil(x); 
            if (floor(x) < x && x < ceil(x)) err.push_back(x - floor(x)); 
        }
        if (target < lo || hi < target) return "-1"; 
        sort(err.begin(), err.end()); 
        int k = hi - target; 
        for (int i = 0; i < err.size(); ++i) {
            if (i < k) ans += err[i]; 
            else ans -= err[i]; 
        }
        ans += err.size() - k; 
        stringstream stream; 
        stream << fixed << setprecision(3) << ans; 
        return stream.str(); 
    }


    /*1059. All Paths from Source Lead to Destination (Medium)
	Given the edges of a directed graph where edges[i] = [ai, bi] indicates 
	there is an edge between nodes ai and bi, and two nodes source and 
	destination of this graph, determine whether or not all paths starting from 
	source eventually, end at destination, that is:
	* At least one path exists from the source node to the destination node
	* If a path exists from the source node to a node with no outgoing edges, 
	  then that node is equal to destination.
	* The number of possible paths from source to destination is a finite number.
	Return true if and only if all roads from source lead to destination.

	Example 1:
	Input: n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2
	Output: false
	Explanation: It is possible to reach and get stuck on both node 1 and node 2.

	Example 2:
	Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
	Output: false
	Explanation: We have two possibilities: to end at node 3, or to loop over 
	             node 1 and node 2 indefinitely.
	
	Example 3:
	Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
	Output: true

	Example 4:
	Input: n = 3, edges = [[0,1],[1,1],[1,2]], source = 0, destination = 2
	Output: false
	Explanation: All paths from the source node end at the destination node, 
	             but there are an infinite number of paths, such as 0-1-2, 
	             0-1-1-2, 0-1-1-1-2, 0-1-1-1-1-2, and so on.
	
	Example 5:
	Input: n = 2, edges = [[0,1],[1,1]], source = 0, destination = 1
	Output: false
	Explanation: There is infinite self-loop at destination node.

	Constraints:
	* 1 <= n <= 10^4
	* 0 <= edges.length <= 10^4
	* edges.length == 2
	* 0 <= ai, bi <= n - 1
	* 0 <= source <= n - 1
	* 0 <= destination <= n - 1
	* The given graph may have self-loops and parallel edges.*/

    bool leadsToDestination(int n, vector<vector<int>>& edges, int source, int destination) {
        unordered_map<int, vector<int>> graph; 
        for (auto&& edge : edges) 
            graph[edge[0]].push_back(edge[1]); 
        
        vector<int> color(n, 0); 
        
        function<bool(int)> fn = [&](int x) {
            if (color[x]) return color[x] == 1; 
            if (!graph[x].size()) return x == destination; 
            color[x] = -1; 
            for (auto&& xx : graph[x]) 
                if (!fn(xx)) return false; 
            color[x] = 1; 
            return true; 
        }; 
        
        return fn(source); 
    }


    /*1060. Missing Element in Sorted Array (Medium)
	Given an integer array nums which is sorted in ascending order and all of 
	its elements are unique and given also an integer k, return the kth missing 
	number starting from the leftmost number of the array.

	Example 1:
	Input: nums = [4,7,9,10], k = 1
	Output: 5
	Explanation: The first missing number is 5.

	Example 2:
	Input: nums = [4,7,9,10], k = 3
	Output: 8
	Explanation: The missing numbers are [5,6,8,...], hence the third missing 
	             number is 8.

	Example 3:
	Input: nums = [1,2,4], k = 3
	Output: 6
	Explanation: The missing numbers are [3,5,6,7,...], hence the third missing 
	             number is 6.

	Constraints:
	* 1 <= nums.length <= 5 * 104
	* 1 <= nums[i] <= 107
	* nums is sorted in ascending order, and all the elements are unique.
	* 1 <= k <= 108

	Follow up: Can you find a logarithmic time complexity (i.e., O(log(n))) 
	           solution?*/

    int missingElement(vector<int>& nums, int k) {
        int lo = 0, hi = nums.size(); 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (nums[mid] - nums[0] - mid < k) lo = mid + 1; 
            else hi = mid; 
        }
        return nums[0] + k + lo - 1; 
    }


    /*1061. Lexicographically Smallest Equivalent String (Medium)
	You are given two strings of the same length s1 and s2 and a string baseStr.
	We say s1[i] and s2[i] are equivalent characters.
	* For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 
	  'b' == 'd', and 'c' == 'e'.
	Equivalent characters follow the usual rules of any equivalence relation:
	* Reflexivity: 'a' == 'a'.
	* Symmetry: 'a' == 'b' implies 'b' == 'a'.
	* Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
	For example, given the equivalency information from s1 = "abc" and 
	s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed", and 
	"aab" is the lexicographically smallest equivalent string of baseStr. 
	Return the lexicographically smallest equivalent string of baseStr by using 
	the equivalency information from s1 and s2.

	Example 1:
	Input: s1 = "parker", s2 = "morris", baseStr = "parser"
	Output: "makkek"
	Explanation: Based on the equivalency information in s1 and s2, we can 
	             group their characters as [m,p], [a,o], [k,r,s], [e,i]. The 
	             characters in each group are equivalent and sorted in 
	             lexicographical order. So the answer is "makkek".
	
	Example 2:
	Input: s1 = "hello", s2 = "world", baseStr = "hold"
	Output: "hdld"
	Explanation: Based on the equivalency information in s1 and s2, we can 
	             group their characters as [h,w], [d,e,o], [l,r]. So only the 
	             second letter 'o' in baseStr is changed to 'd', the answer is 
	             "hdld".
	
	Example 3:
	Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
	Output: "aauaaaaada"
	Explanation: We group the equivalent characters in s1 and s2 as 
	             [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in 
	             baseStr except 'u' and 'd' are transformed to 'a', the answer 
	             is "aauaaaaada".

	Constraints:
	* 1 <= s1.length, s2.length, baseStr <= 1000
	* s1.length == s2.length
	* s1, s2, and baseStr consist of lowercase English letters.

class UnionFind {
unordered_map<char, char> parent; 
public: 
    char find(char p) {
        if (!parent.count(p)) parent[p] = p; 
        if (p != parent[p]) 
            parent[p] = find(parent[p]); 
        return parent[p]; 
    }
    
    void connect(char p, char q) {
        char prt = find(p), qrt = find(q); 
        if (prt < qrt) swap(prt, qrt); 
        parent[prt] = qrt; 
    }
}; */

    string smallestEquivalentString(string s1, string s2, string baseStr) {
        UnionFind* uf = new UnionFind(); 
        for (int i = 0; i < s1.size(); ++i) 
            uf->connect(s1[i], s2[i]); 
        string ans; 
        for (auto& ch : baseStr) 
            ans.push_back(uf->find(ch)); 
        delete uf; // release heap memory
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


    /*1095. Find in Mountain Array (Hard)
	(This problem is an interactive problem.)
	You may recall that an array A is a mountain array if and only if:
	* A.length >= 3
	* There exists some i with 0 < i < A.length - 1 such that:
	  * A[0] < A[1] < ... A[i-1] < A[i]
	  * A[i] > A[i+1] > ... > A[A.length - 1]
	Given a mountain array mountainArr, return the minimum index such that 
	mountainArr.get(index) == target.  If such an index doesn't exist, return 
	-1. You can't access the mountain array directly.  You may only access the 
	array using a MountainArray interface:
	* MountainArray.get(k) returns the element of the array at index k (0-
	  indexed).
	* MountainArray.length() returns the length of the array.
	Submissions making more than 100 calls to MountainArray.get will be judged 
	Wrong Answer.  Also, any solutions that attempt to circumvent the judge 
	will result in disqualification.

	Example 1:
	Input: array = [1,2,3,4,5,3,1], target = 3
	Output: 2
	Explanation: 3 exists in the array, at index=2 and index=5. Return the 
	             minimum index, which is 2.
	
	Example 2:
	Input: array = [0,1,2,4,2,1], target = 3
	Output: -1
	Explanation: 3 does not exist in the array, so we return -1.

	Constraints:
	* 3 <= mountain_arr.length() <= 10000
	* 0 <= target <= 10^9
	* 0 <= mountain_arr.get(index) <= 10^9*/

    int findInMountainArray(int target, MountainArray &mountainArr) {
        
        function<int(int, int, int)> fn = [&](int lo, int hi, int mult) {
            while (lo < hi) {
                int mid = lo + (hi - lo)/2; 
                if (mountainArr.get(mid) == target) return mid; 
                else if (mountainArr.get(mid) * mult < target * mult) lo = mid + 1; 
                else hi = mid; 
            }
            return -1; 
        };
        
        int lo = 0, hi = mountainArr.length(); 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (mid && mountainArr.get(mid-1) < mountainArr.get(mid)) lo = mid + 1; 
            else hi = mid; 
        }
        int ans = 0; 
        if ((ans = fn(0, lo, 1)) != -1) return ans; 
        if ((ans = fn(lo, mountainArr.length(), -1)) != -1) return ans; 
        return -1; 
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


    /*1338. Reduce Array Size to The Half (Medium)
	Given an array arr.  You can choose a set of integers and remove all the 
	occurrences of these integers in the array. Return the minimum size of the 
	set so that at least half of the integers of the array are removed.

	Example 1:
	Input: arr = [3,3,3,3,5,5,5,2,2,7]
	Output: 2
	Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has 
	             size 5 (i.e equal to half of the size of the old array). 
	             Possible sets of size 2 are {3,5},{3,2},{5,2}. Choosing set 
	             {2,7} is not possible as it will make the new array 
	             [3,3,3,3,5,5,5] which has size greater than half of the size 
	             of the old array.
	
	Example 2:
	Input: arr = [7,7,7,7,7,7]
	Output: 1
	Explanation: The only possible set you can choose is {7}. This will make 
	             the new array empty.
	
	Example 3:
	Input: arr = [1,9]
	Output: 1

	Example 4:
	Input: arr = [1000,1000,3,7]
	Output: 1

	Example 5:
	Input: arr = [1,2,3,4,5,6,7,8,9,10]
	Output: 5

	Constraints:
	* 1 <= arr.length <= 10^5
	* arr.length is even.
	* 1 <= arr[i] <= 10^5*/

    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> freq; 
        for (auto& x : arr) freq[x]++; 
        
        vector<int> vals; 
        for (auto& [key, val] : freq) vals.push_back(val); 
        
        sort(vals.begin(), vals.end(), greater<int>()); 
        for (int i = 0, ans = 0; i < vals.size(); ++i) {
            ans += vals[i]; 
            if (ans >= arr.size()/2) return i + 1; 
        }
        return -1; 
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


    /*1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts (Medium)
	Given a rectangular cake with height h and width w, and two arrays of 
	integers horizontalCuts and verticalCuts where horizontalCuts[i] is the 
	distance from the top of the rectangular cake to the ith horizontal cut and 
	similarly, verticalCuts[j] is the distance from the left of the rectangular 
	cake to the jth vertical cut. Return the maximum area of a piece of cake 
	after you cut at each horizontal and vertical position provided in the 
	arrays horizontalCuts and verticalCuts. Since the answer can be a huge 
	number, return this modulo 10^9 + 7.

	Example 1:
	Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
	Output: 4 
	Explanation: The figure above represents the given rectangular cake. Red 
	             lines are the horizontal and vertical cuts. After you cut the 
	             cake, the green piece of cake has the maximum area.
	
	Example 2:
	Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
	Output: 6
	Explanation: The figure above represents the given rectangular cake. Red 
	             lines are the horizontal and vertical cuts. After you cut the 
	             cake, the green and yellow pieces of cake have the maximum 
	             area.
	
	Example 3:
	Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
	Output: 9

	Constraints:
	* 2 <= h, w <= 10^9
	* 1 <= horizontalCuts.length < min(h, 10^5)
	* 1 <= verticalCuts.length < min(w, 10^5)
	* 1 <= horizontalCuts[i] < h
	* 1 <= verticalCuts[i] < w
	* It is guaranteed that all elements in horizontalCuts are distinct.
	* It is guaranteed that all elements in verticalCuts are distinct.*/

    int maxArea(int h, int w, vector<int>& horizontalCuts, vector<int>& verticalCuts) {
        sort(begin(horizontalCuts), end(horizontalCuts));
        sort(begin(verticalCuts), end(verticalCuts)); 
        int hmx = max(horizontalCuts.front(), h - horizontalCuts.back()); 
        for (int i = 1; i < size(horizontalCuts); ++i) 
            hmx = max(hmx, horizontalCuts[i] - horizontalCuts[i-1]); 
        int vmx = max(verticalCuts.front(), w - verticalCuts.back()); 
        for (int i = 1; i < size(verticalCuts); ++i) 
            vmx = max(vmx, verticalCuts[i] - verticalCuts[i-1]); 
        return (long) hmx * vmx % 1'000'000'007; 
    }


    /*1485. Clone Binary Tree With Random Pointer (Medium)
	A binary tree is given such that each node contains an additional random 
	pointer which could point to any node in the tree or null. Return a deep 
	copy of the tree. The tree is represented in the same input/output way as 
	normal binary trees where each node is represented as a pair of 
	[val, random_index] where:
	* val: an integer representing Node.val
	* random_index: the index of the node (in the input) where the random 
	  pointer points to, or null if it does not point to any node.
	You will be given the tree in class Node and you should return the cloned 
	tree in class NodeCopy. NodeCopy class is just a clone of Node class with 
	the same attributes and constructors.

	Example 1:
	Input: root = [[1,null],null,[4,3],[7,0]]
	Output: [[1,null],null,[4,3],[7,0]]
	Explanation: The original binary tree is [1,null,4,7]. The random pointer 
	             of node one is null, so it is represented as [1, null]. The 
	             random pointer of node 4 is node 7, so it is represented as 
	             [4, 3] where 3 is the index of node 7 in the array 
	             representing the tree. The random pointer of node 7 is node 1, 
	             so it is represented as [7, 0] where 0 is the index of node 1 
	             in the array representing the tree.

	Example 2:
	Input: root = [[1,4],null,[1,0],null,[1,5],[1,5]]
	Output: [[1,4],null,[1,0],null,[1,5],[1,5]]
	Explanation: The random pointer of a node can be the node itself.

	Example 3:
	Input: root = [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]
	Output: [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]

	Example 4:
	Input: root = []
	Output: []

	Example 5:
	Input: root = [[1,null],null,[2,null],null,[1,null]]
	Output: [[1,null],null,[2,null],null,[1,null]]

	Constraints:
	* The number of nodes in the tree is in the range [0, 1000].
	* Each node's value is between [1, 10^6].*/

    NodeCopy* copyRandomBinaryTree(Node* root) {
        if (!root) return nullptr; 
        unordered_map<Node*, NodeCopy*> mp; 
        stack<Node*> stk; 
        stk.push(root); 
        
        while (stk.size()) {
            Node* node = stk.top(); stk.pop(); 
            if (!mp[node]) mp[node] = new NodeCopy(); 
            mp[node]->val = node->val; 
            if (node->left) {
                if (!mp[node->left]) mp[node->left] = new NodeCopy(); 
                mp[node]->left = mp[node->left]; 
                stk.push(node->left); 
            }
            if (node->right) {
                if (!mp[node->right]) mp[node->right] = new NodeCopy(); 
                mp[node]->right = mp[node->right]; 
                stk.push(node->right); 
            }
            if (node->random) {
                if (!mp[node->random]) mp[node->random] = new NodeCopy(); 
                mp[node]->random = mp[node->random]; 
            }
        }
        return mp[root]; 
    }


    /*1490. Clone N-ary Tree (Medium)
	Given a root of an N-ary tree, return a deep copy (clone) of the tree. Each 
	node in the n-ary tree contains a val (int) and a list (List[Node]) of its 
	children.

	class Node {
	    public int val;
	    public List<Node> children;
	}
	
	Nary-Tree input serialization is represented in their level order traversal, 
	each group of children is separated by the null value (See examples).

	Example 1:
	Input: root = [1,null,3,2,4,null,5,6]
	Output: [1,null,3,2,4,null,5,6]

	Example 2:
	Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
	Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]

	Constraints:
	* The depth of the n-ary tree is less than or equal to 1000.
	* The total number of nodes is between [0, 104].

	Follow up: Can your solution work for the graph problem?*/

    Node* cloneTree(Node* root) {
        if (!root) return nullptr; 
        Node* ans = new Node(root->val); 
        for (auto& child : root->children) 
            ans->children.push_back(cloneTree(child));
        return ans; 
    }


    /*1506. Find Root of N-Ary Tree (Medium)
	You are given all the nodes of an N-ary tree as an array of Node objects, 
	where each node has a unique value. Return the root of the N-ary tree.

	Custom testing: An N-ary tree can be serialized as represented in its level 
	order traversal where each group of children is separated by the null value 
	(see examples). For example, the above tree is serialized as 
	[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14].

	The testing will be done in the following way:
	* The input data should be provided as a serialization of the tree.
	* The driver code will construct the tree from the serialized input data 
	  and put each Node object into an array in an arbitrary order.
	* The driver code will pass the array to findRoot, and your function should 
	  find and return the root Node object in the array.
	* The driver code will take the returned Node object and serialize it. If 
	  the serialized value and the input data are the same, the test passes.

	Example 1:
	Input: tree = [1,null,3,2,4,null,5,6]
	Output: [1,null,3,2,4,null,5,6]
	Explanation: The tree from the input data is shown above. The driver code 
	             creates the tree and gives findRoot the Node objects in an 
	             arbitrary order. For example, the passed array could be 
	             [Node(5),Node(4),Node(3),Node(6),Node(2),Node(1)] or 
	             [Node(2),Node(6),Node(1),Node(3),Node(5),Node(4)]. The 
	             findRoot function should return the root Node(1), and the 
	             driver code will serialize it and compare with the input data.
	             The input data and serialized Node(1) are the same, so the 
	             test passes.
	
	Example 2:
	Input: tree = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
	Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]

	Constraints:
	* The total number of nodes is between [1, 5 * 10^4].
	* Each node has a unique value.

	Follow up: Could you solve this problem in constant space complexity with a 
	           linear time algorithm?*/

    Node* findRoot(vector<Node*> tree) {
        int val = 0; 
        for (auto& node : tree) {
            val ^= node->val; 
            for (auto& child : node->children) 
                val ^= child->val; 
        }
        for (auto& node : tree) 
            if (node->val == val) return node; 
        return nullptr; 
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


    /*1690. Stone Game VII (Medium)
	Alice and Bob take turns playing a game, with Alice starting first. There 
	are n stones arranged in a row. On each player's turn, they can remove 
	either the leftmost stone or the rightmost stone from the row and receive 
	points equal to the sum of the remaining stones' values in the row. The 
	winner is the one with the higher score when there are no stones left to 
	remove. Bob found that he will always lose this game (poor Bob, he always 
	loses), so he decided to minimize the score's difference. Alice's goal is 
	to maximize the difference in the score. Given an array of integers stones 
	where stones[i] represents the value of the ith stone from the left, return 
	the difference in Alice and Bob's score if they both play optimally.

	Example 1:
	Input: stones = [5,3,1,4,2]
	Output: 6
	Explanation: 
	- Alice removes 2 and gets 5 + 3 + 1 + 4 = 13 points. Alice = 13, Bob = 0, stones = [5,3,1,4].
	- Bob removes 5 and gets 3 + 1 + 4 = 8 points. Alice = 13, Bob = 8, stones = [3,1,4].
	- Alice removes 3 and gets 1 + 4 = 5 points. Alice = 18, Bob = 8, stones = [1,4].
	- Bob removes 1 and gets 4 points. Alice = 18, Bob = 12, stones = [4].
	- Alice removes 4 and gets 0 points. Alice = 18, Bob = 12, stones = [].
	The score difference is 18 - 12 = 6.

	Example 2:
	Input: stones = [7,90,5,1,100,10,10,2]
	Output: 122

	Constraints:
	* n == stones.length
	* 2 <= n <= 1000
	* 1 <= stones[i] <= 1000*/

    int stoneGameVII(vector<int>& stones) {
        vector<int> prefix = {0}; 
        for (auto& x : stones) prefix.push_back(prefix.back() + x); 
        
        int n = size(stones); 
        vector<vector<int>> dp(n, vector<int>(n, 0)); 
        for (int i = n-1; i >= 0; --i) {
            for (int j = i+1; j < n; ++j) {
                dp[i][j] = max(prefix[j+1] - prefix[i+1] - dp[i+1][j], prefix[j] - prefix[i] - dp[i][j-1]); 
            }
        }
        return dp[0][n-1]; 
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


    /*1696. Jump Game VI (Medium)
	You are given a 0-indexed integer array nums and an integer k. You are 
	initially standing at index 0. In one move, you can jump at most k steps 
	forward without going outside the boundaries of the array. That is, you can 
	jump from index i to any index in the range [i + 1, min(n - 1, i + k)] 
	inclusive. You want to reach the last index of the array (index n - 1). 
	Your score is the sum of all nums[j] for each index j you visited in the 
	array. Return the maximum score you can get.

	Example 1:
	Input: nums = [1,-1,-2,4,-7,3], k = 2
	Output: 7
	Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] 
	             (underlined above). The sum is 7.
	
	Example 2:
	Input: nums = [10,-5,-2,4,0,3], k = 3
	Output: 17
	Explanation: You can choose your jumps forming the subsequence [10,4,3] 
	             (underlined above). The sum is 17.
	
	Example 3:
	Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
	Output: 0

	Constraints:
	* 1 <= nums.length, k <= 10^5
	* -10^4 <= nums[i] <= 10^4*/

    int maxResult(vector<int>& nums, int k) {
        deque<pair<int, int>> dq; 
        int ans = 0; 
        for (int i = size(nums)-1; i >= 0; --i) {
            while (size(dq) && dq.front().second - i > k) dq.pop_front(); 
            ans = nums[i]; 
            if (size(dq)) ans += dq.front().first; 
            while (size(dq) && dq.back().first <= ans) dq.pop_back(); 
            dq.emplace_back(ans, i); 
        }
        return ans; 
    }


    /*1710. Maximum Units on a Truck (Easy)
	You are assigned to put some amount of boxes onto one truck. You are given 
	a 2D array boxTypes, where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]:
	* numberOfBoxesi is the number of boxes of type i.
	* numberOfUnitsPerBoxi is the number of units in each box of the type i.
	You are also given an integer truckSize, which is the maximum number of 
	boxes that can be put on the truck. You can choose any boxes to put on the 
	truck as long as the number of boxes does not exceed truckSize. Return the 
	maximum total number of units that can be put on the truck.

	Example 1:
	Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
	Output: 8
	Explanation: There are:
	             - 1 box of the first type that contains 3 units.
	             - 2 boxes of the second type that contain 2 units each.
	             - 3 boxes of the third type that contain 1 unit each.
	             You can take all the boxes of the first and second types, and 
	             one box of the third type. The total number of units will be 
	             = (1 * 3) + (2 * 2) + (1 * 1) = 8.
	
	Example 2:
	Input: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
	Output: 91

	Constraints:
	* 1 <= boxTypes.length <= 1000
	* 1 <= numberOfBoxesi, numberOfUnitsPerBoxi <= 1000
	* 1 <= truckSize <= 10^6*/

    int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {
        sort(begin(boxTypes), end(boxTypes), [](auto& lhs, auto& rhs) { return lhs[1] > rhs[1]; }); 
        int ans = 0; 
        for (auto& boxType : boxTypes) {
            auto boxes = boxType[0], units = boxType[1]; 
            boxes = min(boxes, truckSize); 
            ans += boxes * units; 
            truckSize -= boxes; 
        }
        return ans; 
    }


    /*1790. Check if One String Swap Can Make Strings Equal (Easy)
	You are given two strings s1 and s2 of equal length. A string swap is an 
	operation where you choose two indices in a string (not necessarily 
	different) and swap the characters at these indices. Return true if it is 
	possible to make both strings equal by performing at most one string swap 
	on exactly one of the strings. Otherwise, return false.

	Example 1:
	Input: s1 = "bank", s2 = "kanb"
	Output: true
	Explanation: For example, swap the first character with the last character 
	             of s2 to make "bank".
	
	Example 2:
	Input: s1 = "attack", s2 = "defend"
	Output: false
	Explanation: It is impossible to make them equal with one string swap.

	Example 3:
	Input: s1 = "kelb", s2 = "kelb"
	Output: true
	Explanation: The two strings are already equal, so no string swap operation is required.

	Example 4:
	Input: s1 = "abcd", s2 = "dcba"
	Output: false

	Constraints:
	* 1 <= s1.length, s2.length <= 100
	* s1.length == s2.length
	* s1 and s2 consist of only lowercase English letters.*/

    bool areAlmostEqual(string s1, string s2) {
        vector<int> diff; 
        for (int i = 0; i < size(s1); ++i) 
            if (s1[i] != s2[i]) diff.push_back(i); 
        return size(diff) == 0 || (size(diff) == 2 && s1[diff[0]] == s2[diff[1]] && s1[diff[1]] == s2[diff[0]]); 
    }


    /*1791. Find Center of Star Graph (Medium)
	There is an undirected star graph consisting of n nodes labeled from 1 to n. 
	A star graph is a graph where there is one center node and exactly n - 1 
	edges that connect the center node with every other node. You are given a 
	2D integer array edges where each edges[i] = [ui, vi] indicates that there 
	is an edge between the nodes ui and vi. Return the center of the given star 
	graph.

	Example 1:
	Input: edges = [[1,2],[2,3],[4,2]]
	Output: 2
	Explanation: As shown in the figure above, node 2 is connected to every 
	             other node, so 2 is the center.
	
	Example 2:
	Input: edges = [[1,2],[5,1],[1,3],[1,4]]
	Output: 1

	Constraints:
	* 3 <= n <= 10^5
	* edges.length == n - 1
	* edges[i].length == 2
	* 1 <= ui, vi <= n
	* ui != vi
	* The given edges represent a valid star graph.*/

    int findCenter(vector<vector<int>>& edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0]; 
        return edges[0][1]; 
    }


    /*1792. Maximum Average Pass Ratio (Medium)
	There is a school that has classes of students and each class will be 
	having a final exam. You are given a 2D integer array classes, where 
	classes[i] = [passi, totali]. You know beforehand that in the ith class, 
	there are totali total students, but only passi number of students will 
	pass the exam. You are also given an integer extraStudents. There are 
	another extraStudents brilliant students that are guaranteed to pass the 
	exam of any class they are assigned to. You want to assign each of the 
	extraStudents students to a class in a way that maximizes the average pass 
	ratio across all the classes. The pass ratio of a class is equal to the 
	number of students of the class that will pass the exam divided by the 
	total number of students of the class. The average pass ratio is the sum of 
	pass ratios of all the classes divided by the number of the classes. Return 
	the maximum possible average pass ratio after assigning the extraStudents 
	students. Answers within 10-5 of the actual answer will be accepted.

	Example 1:
	Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
	Output: 0.78333
	Explanation: You can assign the two extra students to the first class. The 
	             average pass ratio will be equal to 
	             (3/4 + 3/5 + 2/2) / 3 = 0.78333.
	
	Example 2:
	Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
	Output: 0.53485

	Constraints:
	* 1 <= classes.length <= 10^5
	* classes[i].length == 2
	* 1 <= passi <= totali <= 10^5
	* 1 <= extraStudents <= 10^5*/

    double maxAverageRatio(vector<vector<int>>& classes, int extraStudents) {
        auto diff = [](int pass, int total) { return (double)(pass+1)/(total+1) - (double)pass/total; };
        
        double ans = 0; 
        priority_queue<pair<double, array<int,2>>> pq; 
        for (auto& cls : classes) {
            ans += (double) cls[0]/cls[1]; 
            pq.push({diff(cls[0], cls[1]), {cls[0], cls[1]}}); 
        }
        
        while (extraStudents--) {
            auto [chg, elem] = pq.top(); pq.pop(); 
            ans += chg;  
            pq.push({diff(elem[0]+1, elem[1]+1), {elem[0]+1, elem[1]+1}}); 
        }
        
        return ans/size(classes); 
    }


    /*1793. Maximum Score of a Good Subarray (Hard)
	You are given an array of integers nums (0-indexed) and an integer k. The 
	score of a subarray (i, j) is defined as 
	
	min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1). 
	
	A good subarray is a subarray where i <= k <= j. Return the maximum 
	possible score of a good subarray.

	Example 1:
	Input: nums = [1,4,3,7,4,5], k = 3
	Output: 15
	Explanation: The optimal subarray is (1, 5) with a score of 
	             min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15. 
	
	Example 2:
	Input: nums = [5,5,4,5,4,1,1,1], k = 0
	Output: 20
	Explanation: The optimal subarray is (0, 4) with a score of 
	             min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 2 * 10^4
	* 0 <= k < nums.length*/

    int maximumScore(vector<int>& nums, int k) {
        int i = k, j = k, ans = nums[k], val = nums[k]; ; 
        while (0 <= i-1 || j+1 < size(nums)) {
            if (j+1 == size(nums) || (0 < i && nums[i-1] > nums[j+1])) 
                val = min(val, nums[--i]); 
            else 
                val = min(val, nums[++j]); 
            ans = max(ans, val * (j-i+1)); 
        }
        return ans; 
    }


    /*1796. Second Largest Digit in a String (Easy)
	Given an alphanumeric string s, return the second largest numerical digit 
	that appears in s, or -1 if it does not exist. An alphanumeric string is a 
	string consisting of lowercase English letters and digits.

	Example 1:
	Input: s = "dfa12321afd"
	Output: 2
	Explanation: The digits that appear in s are [1, 2, 3]. The second largest 
	             digit is 2.
	
	Example 2:
	Input: s = "abc1111"
	Output: -1
	Explanation: The digits that appear in s are [1]. There is no second 
	             largest digit. 

	Constraints:
	* 1 <= s.length <= 500
	* s consists of only lowercase English letters and/or digits.*/

    int secondHighest(string s) {
        set<char> ss; 
        for (auto& ch : s) 
            if ('0' <= ch && ch <= '9') ss.insert(ch); 
        return size(ss) > 1 ? *next(rbegin(ss)) - '0' : -1; 
    }


    /*1798. Maximum Number of Consecutive Values You Can Make (Medium)
	You are given an integer array coins of length n which represents the n 
	coins that you own. The value of the ith coin is coins[i]. You can make 
	some value x if you can choose some of your n coins such that their values 
	sum up to x. Return the maximum number of consecutive integer values that 
	you can make with your coins starting from and including 0. Note that you 
	may have multiple coins of the same value.

	Example 1:
	Input: coins = [1,3]
	Output: 2
	Explanation: You can make the following values:
	             - 0: take []
	             - 1: take [1]
	             You can make 2 consecutive integer values starting from 0.

	Example 2:
	Input: coins = [1,1,1,4]
	Output: 8
	Explanation: You can make the following values:
	             - 0: take []
	             - 1: take [1]
	             - 2: take [1,1]
	             - 3: take [1,1,1]
	             - 4: take [4]
	             - 5: take [4,1]
	             - 6: take [4,1,1]
	             - 7: take [4,1,1,1]
	             You can make 8 consecutive integer values starting from 0.
	
	Example 3:
	Input: nums = [1,4,10,3,1]
	Output: 20

	Constraints:
	* coins.length == n
	* 1 <= n <= 4 * 10^4
	* 1 <= coins[i] <= 4 * 10^4*/

    int getMaximumConsecutive(vector<int>& coins) {
        sort(begin(coins), end(coins)); 
        int ans = 1; 
        for (auto& x : coins) {
            if (ans < x) break; 
            ans += x; 
        }
        return ans; 
    }


    /*1799. Maximize Score After N Operations (Hard)
	You are given nums, an array of positive integers of size 2 * n. You must 
	perform n operations on this array. In the ith operation (1-indexed), you 
	will:
	* Choose two elements, x and y.
	* Receive a score of i * gcd(x, y).
	* Remove x and y from nums.
	Return the maximum score you can receive after performing n operations. The 
	function gcd(x, y) is the greatest common divisor of x and y.

	Example 1:
	Input: nums = [1,2]
	Output: 1
	Explanation: The optimal choice of operations is: (1 * gcd(1, 2)) = 1
	
	Example 2:
	Input: nums = [3,4,6,8]
	Output: 11
	Explanation: The optimal choice of operations is:
	             (1 * gcd(3, 6)) + (2 * gcd(4, 8)) = 3 + 8 = 11
	
	Example 3:
	Input: nums = [1,2,3,4,5,6]
	Output: 14
	Explanation: The optimal choice of operations is:
	             (1 * gcd(1, 5)) + (2 * gcd(2, 4)) + (3 * gcd(3, 6)) = 1 + 4 + 9 = 14

	Constraints:
	* 1 <= n <= 7
	* nums.length == 2 * n
	* 1 <= nums[i] <= 10^6*/

    int maxScore(vector<int>& nums) {
        int n = size(nums); 
        map<pair<int, int>, int> memo; 
        
        function<int(int, int)> fn = [&](int k, int mask) {
            pair<int, int> key = make_pair(k, mask); 
            if (!memo.count(key)) 
                for (int i = 0; i < n; ++i) 
                    if (mask & (1 << i)) 
                        for (int j = i+1; j < n; ++j)
                            if (mask & (1 << j)) 
                                memo[key] = max(memo[key], k*gcd(nums[i], nums[j]) + fn(k+1, mask^(1<<i)^(1<<j))); 
            return memo[key]; 
        };
        
        return fn(1, (1 << n)-1); 
    }


    /*1800. Maximum Ascending Subarray Sum (Easy)
	Given an array of positive integers nums, return the maximum possible sum 
	of an ascending subarray in nums. A subarray is defined as a contiguous 
	sequence of numbers in an array. A subarray [numsl, numsl+1, ..., numsr-1, numsr] 
	is ascending if for all i where l <= i < r, numsi < numsi+1. Note that a 
	subarray of size 1 is ascending.

	Example 1:
	Input: nums = [10,20,30,5,10,50]
	Output: 65
	Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.

	Example 2:
	Input: nums = [10,20,30,40,50]
	Output: 150
	Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.

	Example 3:
	Input: nums = [12,17,15,13,10,11,12]
	Output: 33
	Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.

	Example 4:
	Input: nums = [100,10,1]
	Output: 100

	Constraints:
	* 1 <= nums.length <= 100
	* 1 <= nums[i] <= 100*/

    int maxAscendingSum(vector<int>& nums) {
        int ans = 0, val = 0; 
        for (int i = 0; i < size(nums); ++i) {
            if (i == 0 || nums[i-1] >= nums[i]) val = 0; 
            val += nums[i]; 
            ans = max(ans, val); 
        }
        return ans; 
    }


    /*1801. Number of Orders in the Backlog (Medium)
	You are given a 2D integer array orders, where each 
	orders[i] = [pricei, amounti, orderTypei] denotes that amounti orders have 
	been placed of type orderTypei at the price pricei. The orderTypei is:
	* 0 if it is a batch of buy orders, or
	* 1 if it is a batch of sell orders.
	Note that orders[i] represents a batch of amounti independent orders with 
	the same price and order type. All orders represented by orders[i] will be 
	placed before all orders represented by orders[i+1] for all valid i. There 
	is a backlog that consists of orders that have not been executed. The 
	backlog is initially empty. When an order is placed, the following happens:
	* If the order is a buy order, you look at the sell order with the smallest 
	  price in the backlog. If that sell order's price is smaller than or equal 
	  to the current buy order's price, they will match and be executed, and 
	  that sell order will be removed from the backlog. Else, the buy order is 
	  added to the backlog.
	* Vice versa, if the order is a sell order, you look at the buy order with 
	  the largest price in the backlog. If that buy order's price is larger 
	  than or equal to the current sell order's price, they will match and be 
	  executed, and that buy order will be removed from the backlog. Else, the 
	  sell order is added to the backlog.
	Return the total amount of orders in the backlog after placing all the 
	orders from the input. Since this number can be large, return it modulo 
	10^9 + 7.

	Example 1:
	Input: orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]
	Output: 6
	Explanation: Here is what happens with the orders:
	- 5 orders of type buy with price 10 are placed. There are no sell orders, so the 5 orders are added to the backlog.
	- 2 orders of type sell with price 15 are placed. There are no buy orders with prices larger than or equal to 15, so the 2 orders are added to the backlog.
	- 1 order of type sell with price 25 is placed. There are no buy orders with prices larger than or equal to 25 in the backlog, so this order is added to the backlog.
	- 4 orders of type buy with price 30 are placed. The first 2 orders are matched with the 2 sell orders of the least price, which is 15 and these 2 sell orders are removed from the backlog. The 3rd order is matched with the sell order of the least price, which is 25 and this sell order is removed from the backlog. Then, there are no more sell orders in the backlog, so the 4th order is added to the backlog.
	Finally, the backlog has 5 buy orders with price 10, and 1 buy order with price 30. So the total number of orders in the backlog is 6.

	Example 2:
	Input: orders = [[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]]
	Output: 999999984
	Explanation: Here is what happens with the orders:
	- 109 orders of type sell with price 7 are placed. There are no buy orders, so the 109 orders are added to the backlog.
	- 3 orders of type buy with price 15 are placed. They are matched with the 3 sell orders with the least price which is 7, and those 3 sell orders are removed from the backlog.
	- 999999995 orders of type buy with price 5 are placed. The least price of a sell order is 7, so the 999999995 orders are added to the backlog.
	- 1 order of type sell with price 5 is placed. It is matched with the buy order of the highest price, which is 5, and that buy order is removed from the backlog.
	Finally, the backlog has (1000000000-3) sell orders with price 7, and (999999995-1) buy orders with price 5. So the total number of orders = 1999999991, which is equal to 999999984 % (109 + 7).

	Constraints:
	* 1 <= orders.length <= 10^5
	* orders[i].length == 3
	* 1 <= pricei, amounti <= 10^9
	* orderTypei is either 0 or 1.*/

    int getNumberOfBacklogOrders(vector<vector<int>>& orders) {
        priority_queue<pair<int, int>> buy; // max-heap 
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> sell; // min-heap 
        
        for (auto& order : orders) {
            auto price = order[0], qty = order[1], type = order[2]; 
            if (type == 0) buy.emplace(price, qty); 
            else sell.emplace(price, qty); 
            
            while (size(buy) && size(sell) && buy.top().first >= sell.top().first) {
                auto [bp, bq] = buy.top(); buy.pop(); 
                auto [sp, sq] = sell.top(); sell.pop(); 
                if (bq > sq) {
                    bq -= sq; 
                    buy.emplace(bp, bq); 
                } else if (bq < sq) {
                    sq -= bq; 
                    sell.emplace(sp, sq); 
                }
            }
        }
        
        int ans = 0; 
        while (size(buy)) { ans = (ans + buy.top().second) % 1'000'000'007; buy.pop(); }
        while (size(sell)) { ans = (ans + sell.top().second) % 1'000'000'007; sell.pop(); }
        return ans; 
    }


    /*1802. Maximum Value at a Given Index in a Bounded Array (Medium)
	You are given three positive integers: n, index, and maxSum. You want to 
	construct an array nums (0-indexed) that satisfies the following conditions:
	* nums.length == n
	* nums[i] is a positive integer where 0 <= i < n.
	* abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
	* The sum of all the elements of nums does not exceed maxSum.
	* nums[index] is maximized.
	Return nums[index] of the constructed array. Note that abs(x) equals x if 
	x >= 0, and -x otherwise.

	Example 1:
	Input: n = 4, index = 2,  maxSum = 6
	Output: 2
	Explanation: nums = [1,2,2,1] is one array that satisfies all the conditions.
 	             There are no arrays that satisfy all the conditions and have 
 	             nums[2] == 3, so 2 is the maximum nums[2].
	
	Example 2:
	Input: n = 6, index = 1,  maxSum = 10
	Output: 3

	Constraints:
	* 1 <= n <= maxSum <= 10^9
	* 0 <= index < n*/

    int maxValue(int n, int index, int maxSum) {
        auto fn = [](int n, long x) { return n <= x ? n*(2*x - n + 1)/2 : x*(1+x)/2 + n - x; };
        
        long lo = 0, hi = maxSum; 
        while (lo < hi) {
            long mid = lo + (hi - lo + 1)/2; 
            if (fn(index, mid-1) + fn(n - index, mid) > maxSum) hi = mid-1; 
            else lo = mid; 
        }
        return lo; 
    }


    /*1803. Count Pairs With XOR in a Range (Hard)
	Given a (0-indexed) integer array nums and two integers low and high, 
	return the number of nice pairs. A nice pair is a pair (i, j) where 
	0 <= i < j < nums.length and low <= (nums[i] XOR nums[j]) <= high.

	Example 1:
	Input: nums = [1,4,2,7], low = 2, high = 6
	Output: 6
	Explanation: All nice pairs (i, j) are as follows:
	    - (0, 1): nums[0] XOR nums[1] = 5 
	    - (0, 2): nums[0] XOR nums[2] = 3
	    - (0, 3): nums[0] XOR nums[3] = 6
	    - (1, 2): nums[1] XOR nums[2] = 6
	    - (1, 3): nums[1] XOR nums[3] = 3
	    - (2, 3): nums[2] XOR nums[3] = 5

	Example 2:
	Input: nums = [9,8,4,2,1], low = 5, high = 14
	Output: 8
	Explanation: All nice pairs (i, j) are as follows:
        - (0, 2): nums[0] XOR nums[2] = 13
	    - (0, 3): nums[0] XOR nums[3] = 11
	    - (0, 4): nums[0] XOR nums[4] = 8
	    - (1, 2): nums[1] XOR nums[2] = 12
	    - (1, 3): nums[1] XOR nums[3] = 10
	    - (1, 4): nums[1] XOR nums[4] = 9
	    - (2, 3): nums[2] XOR nums[3] = 6
	    - (2, 4): nums[2] XOR nums[4] = 5
	 
	Constraints:
	* 1 <= nums.length <= 2 * 10^4
	* 1 <= nums[i] <= 2 * 10^4
	* 1 <= low <= high <= 2 * 10^4

	class TrieNode {
	    TrieNode* child[2] = {nullptr}; 
	    int cnt = 0; 
	    friend class Trie; 
	};


	class Trie {
	    TrieNode* root; 
	public: 
	    Trie() {root = new TrieNode(); }
	    
	    void insert(int val) {
	        TrieNode* node = root; 
	        for (int i = 14; i >= 0; --i) {
	            int bit = (val >> i) & 1; 
	            if (!node->child[bit]) node->child[bit] = new TrieNode(); 
	            node = node->child[bit]; 
	            ++node->cnt; 
	        }
	    }
	    
	    int count(int val, int high) {
	        int ans = 0; 
	        TrieNode* node = root; 
	        for (int i = 14; i >= 0; --i) {
	            if (!node) break; 
	            int bit = (val >> i) & 1, cmp = (high >> i) & 1; 
	            if (cmp) {
	                if (node->child[bit]) ans += node->child[bit]->cnt; 
	                node = node->child[1^bit]; 
	            } else {
	                node = node->child[bit]; 
	            }
	        }
	        return ans; 
	    }
	};*/

    int countPairs(vector<int>& nums, int low, int high) {
        Trie* trie = new Trie(); 
        int ans = 0; 
        for (auto& x : nums) {
            ans += trie->count(x, high+1) - trie->count(x, low); 
            trie->insert(x); 
        }
        return ans; 
    }


    /*1805. Number of Different Integers in a String (Easy)
	You are given a string word that consists of digits and lowercase English 
	letters. You will replace every non-digit character with a space. For 
	example, "a123bc34d8ef34" will become " 123  34 8  34". Notice that you are 
	left with some integers that are separated by at least one space: "123", 
	"34", "8", and "34". Return the number of different integers after 
	performing the replacement operations on word. Two integers are considered 
	different if their decimal representations without any leading zeros are 
	different.

	Example 1:
	Input: word = "a123bc34d8ef34"
	Output: 3
	Explanation: The three different integers are "123", "34", and "8". Notice 
	             that "34" is only counted once.
	
	Example 2:
	Input: word = "leet1234code234"
	Output: 2

	Example 3:
	Input: word = "a1b01c001"
	Output: 1
	Explanation: The three integers "1", "01", and "001" all represent the same 
	             integer because the leading zeros are ignored when comparing 
	             their decimal values.

	Constraints:
	* 1 <= word.length <= 1000
	* word consists of digits and lowercase English letters.*/

    int numDifferentIntegers(string word) {
        unordered_set<string> seen; 
        for (int i = 0, j = 0; i < size(word); i = ++j) {
            for (; isdigit(word[j]); ++j);
            for (; word[i] == '0' && i+1 < j; ++i); // remove leading "0"
            if (i < j) {
                string s = word.substr(i, j-i); 
                seen.insert(s); 
            }
        }
        return size(seen); 
    }


    /*1806. Minimum Number of Operations to Reinitialize a Permutation (Medium)
	You are given an even integer n. You initially have a permutation perm of 
	size n where perm[i] == i (0-indexed). In one operation, you will create a 
	new array arr, and for each i:
	* If i % 2 == 0, then arr[i] = perm[i / 2].
	* If i % 2 == 1, then arr[i] = perm[n / 2 + (i - 1) / 2].
	You will then assign arr to perm. Return the minimum non-zero number of 
	operations you need to perform on perm to return the permutation to its 
	initial value.

	Example 1:
	Input: n = 2
	Output: 1
	Explanation: perm = [0,1] initially. 
	             After the 1st operation, perm = [0,1]. 
	             So it takes only 1 operation.
	
	Example 2:
	Input: n = 4
	Output: 2
	Explanation: perm = [0,1,2,3] initially.
	             After the 1st operation, perm = [0,2,1,3]
	             After the 2nd operation, perm = [0,1,2,3]
	             So it takes only 2 operations.
	
	Example 3:
	Input: n = 6
	Output: 4

	Constraints:
	* 2 <= n <= 1000
	* n is even.*/

    int reinitializePermutation(int n) {
        vector<int> perm(n), arr(n); 
        for (int i = 0; i < n; ++i) perm[i] = arr[i] = i; 
        
        for (int k = 1; ; ++k) {
            vector<int> tmp = arr; 
            bool flag = true; 
            for (int i = 0; i < n; ++i) {
                if (i&1) arr[i] = tmp[n/2 + (i-1)/2]; 
                else arr[i] = tmp[i/2]; 
                if (perm[i] != arr[i]) flag = false; 
            }
            if (flag) return k; 
        }
        return 0; 
    }


    /*1807. Evaluate the Bracket Pairs of a String (Medium)
	You are given a string s that contains some bracket pairs, with each pair 
	containing a non-empty key. 
	* For example, in the string "(name)is(age)yearsold", there are two bracket 
	  pairs that contain the keys "name" and "age".
	You know the values of a wide range of keys. This is represented by a 2D 
	string array knowledge where each knowledge[i] = [keyi, valuei] indicates 
	that key keyi has a value of valuei. You are tasked to evaluate all of the 
	bracket pairs. When you evaluate a bracket pair that contains some key keyi, 
	you will:
	* Replace keyi and the bracket pair with the key's corresponding valuei.
	* If you do not know the value of the key, you will replace keyi and the 
	  bracket pair with a question mark "?" (without the quotation marks).
	Each key will appear at most once in your knowledge. There will not be any 
	nested brackets in s. Return the resulting string after evaluating all of 
	the bracket pairs.

	Example 1:
	Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
	Output: "bobistwoyearsold"
	Explanation: The key "name" has a value of "bob", so replace "(name)" with "bob".
	             The key "age" has a value of "two", so replace "(age)" with "two".
	
	Example 2:
	Input: s = "hi(name)", knowledge = [["a","b"]]
	Output: "hi?"
	Explanation: As you do not know the value of the key "name", replace "(name)" 
	             with "?".

	Example 3:
	Input: s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
	Output: "yesyesyesaaa"
	Explanation: The same key can appear multiple times. The key "a" has a 
	             value of "yes", so replace all occurrences of "(a)" with "yes".
	             Notice that the "a"s not in a bracket pair are not evaluated.
	
	Example 4:
	Input: s = "(a)(b)", knowledge = [["a","b"],["b","a"]]
	Output: "ba"

	Constraints:
	* 1 <= s.length <= 10^5
	* 0 <= knowledge.length <= 10^5
	* knowledge[i].length == 2
	* 1 <= keyi.length, valuei.length <= 10
	* s consists of lowercase English letters and round brackets '(' and ')'.
	* Every open bracket '(' in s will have a corresponding close bracket ')'.
	* The key in each bracket pair of s will be non-empty.
	* There will not be any nested bracket pairs in s.
	* keyi and valuei consist of lowercase English letters.
	* Each keyi in knowledge is unique.*/

    string evaluate(string s, vector<vector<string>>& knowledge) {
        unordered_map<string, string> mp; 
        for (auto& x : knowledge) mp[x[0]] = x[1]; 
        
        stringstream ans; 
        for (int i = 0, j = 0; i < size(s); ) {
            if (s[i] == '(') {
                for (j = 0; s[i+1+j] != ')'; ++j);
                string key = s.substr(i+1, j); 
                ans << (mp.count(key) ? mp[key] : "?"); 
                i += j+2; 
            } else {
                ans << s[i++]; 
            }
        }
        return ans.str(); 
    }


    /*1808. Maximize Number of Nice Divisors (Hard)
	You are given a positive integer primeFactors. You are asked to construct a 
	positive integer n that satisfies the following conditions:
	* The number of prime factors of n (not necessarily distinct) is at most 
	  primeFactors.
	* The number of nice divisors of n is maximized. Note that a divisor of n 
	  is nice if it is divisible by every prime factor of n. For example, if 
	  n = 12, then its prime factors are [2,2,3], then 6 and 12 are nice 
	  divisors, while 3 and 4 are not.
	Return the number of nice divisors of n. Since that number can be too large, 
	return it modulo 10^9 + 7. Note that a prime number is a natural number 
	greater than 1 that is not a product of two smaller natural numbers. The 
	prime factors of a number n is a list of prime numbers such that their 
	product equals n.

	Example 1:
	Input: primeFactors = 5
	Output: 6
	Explanation: 200 is a valid value of n. It has 5 prime factors: [2,2,2,5,5], 
	             and it has 6 nice divisors: [10,20,40,50,100,200]. There is 
	             not other value of n that has at most 5 prime factors and more 
	             nice divisors.
	
	Example 2:
	Input: primeFactors = 8
	Output: 18

	Constraints: 1 <= primeFactors <= 10^9*/

    int maxNiceDivisors(int primeFactors) {
        if (primeFactors <= 3) return primeFactors; 
        int q = primeFactors/3, r = primeFactors%3, mod = 1'000'000'007; 
        
        auto mpow = [&](long x, int k) {
            long ans = 1; 
            for (; k; k /= 2) {
                if (k&1) ans = (ans * x) % mod; 
                x = (x * x) % mod; 
            }
            return ans; 
        };
        
        if (r == 0) return mpow(3, q); 
        if (r == 1) return mpow(3, q-1) * 4 % mod;
        return mpow(3, q) * 2 % mod; 
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
	* 0 <= xi, yi <= 500
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


    /*1874. Minimize Product Sum of Two Arrays (Medium)
	The product sum of two equal-length arrays a and b is equal to the sum of 
	a[i] * b[i] for all 0 <= i < a.length (0-indexed). For example, if 
	a = [1,2,3,4] and b = [5,2,3,1], the product sum would be 
	1*5 + 2*2 + 3*3 + 4*1 = 22. Given two arrays nums1 and nums2 of length n, 
	return the minimum product sum if you are allowed to rearrange the order 
	of the elements in nums1. 

	Example 1:
	Input: nums1 = [5,3,4,2], nums2 = [4,2,2,5]
	Output: 40
	Explanation: We can rearrange nums1 to become [3,5,4,2]. The product sum of 
	             [3,5,4,2] and [4,2,2,5] is 3*4 + 5*2 + 4*2 + 2*5 = 40.
	
	Example 2:
	Input: nums1 = [2,1,4,5,7], nums2 = [3,2,4,8,6]
	Output: 65
	Explanation: We can rearrange nums1 to become [5,7,4,1,2]. The product sum 
	             of [5,7,4,1,2] and [3,2,4,8,6] is 
	             5*3 + 7*2 + 4*4 + 1*8 + 2*6 = 65.

	Constraints:
	* n == nums1.length == nums2.length
	* 1 <= n <= 10^5
	* 1 <= nums1[i], nums2[i] <= 100*/

    int minProductSum(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end()); 
        sort(nums2.begin(), nums2.end(), greater<int>());
        int ans = 0; 
        for (int i = 0; i < nums1.size(); ++i)
            ans += nums1[i] * nums2[i]; 
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
	* 1 <= n.length <= 10^5
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


    /*1884. Egg Drop With 2 Eggs and N Floors (Medium)
	You are given two identical eggs and you have access to a building with n 
	floors labeled from 1 to n. You know that there exists a floor f where 
	0 <= f <= n such that any egg dropped at a floor higher than f will break, 
	and any egg dropped at or below floor f will not break. In each move, you 
	may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). 
	If the egg breaks, you can no longer use it. However, if the egg does not 
	break, you may reuse it in future moves. Return the minimum number of moves 
	that you need to determine with certainty what the value of f is.

	Example 1:
	Input: n = 2
	Output: 2
	Explanation: We can drop the first egg from floor 1 and the second egg from floor 2.
	             If the first egg breaks, we know that f = 0.
	             If the second egg breaks but the first egg didn't, we know that f = 1.
	             Otherwise, if both eggs survive, we know that f = 2.
	
	Example 2:
	Input: n = 100
	Output: 14
	Explanation: One optimal strategy is:
	- Drop the 1st egg at floor 9. If it breaks, we know f is between 0 and 8. 
	  Drop the 2nd egg starting from floor 1 and going up one at a time to find 
	  f within 7 more drops. Total drops is 1 + 7 = 8.
	- If the 1st egg does not break, drop the 1st egg again at floor 22. If it 
	  breaks, we know f is between 9 and 21. Drop the 2nd egg starting from 
	  floor 10 and going up one at a time to find f within 12 more drops. Total 
	  drops is 2 + 12 = 14.
	- If the 1st egg does not break again, follow a similar process dropping 
	  the 1st egg from floors 34, 45, 55, 64, 72, 79, 85, 90, 94, 97, 99, and 
	  100.
	Regardless of the outcome, it takes at most 14 drops to determine f.

	Constraints: 1 <= n <= 1000*/

    int twoEggDrop(int n) {
        vector<vector<int>> dp(n+1, vector<int>(2, INT_MAX)); 
        for (int i = 0; i <= n; ++i) dp[i][0] = i; 
        dp[0][0] = dp[0][1] = 0; 
        
        for (int i = 1; i <= n; ++i) 
            for (int ii = 1; ii <= i; ++ii) 
                dp[i][1] = min(dp[i][1], 1 + max(dp[ii-1][0], dp[i-ii][1])); 
        return dp[n][1]; 
    }


    /*1886. Determine Whether Matrix Can Be Obtained By Rotation (Easy)
	Given two n x n binary matrices mat and target, return true if it is 
	possible to make mat equal to target by rotating mat in 90-degree 
	increments, or false otherwise.

	Example 1:
	Input: mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
	Output: true
	Explanation: We can rotate mat 90 degrees clockwise to make mat equal target.

	Example 2:
	Input: mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
	Output: false
	Explanation: It is impossible to make mat equal to target by rotating mat.

	Example 3:
	Input: mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]
	Output: true
	Explanation: We can rotate mat 90 degrees clockwise two times to make mat equal target.

	Constraints:
	* n == mat.length == target.length
	* n == mat[i].length == target[i].length
	* 1 <= n <= 10
	* mat[i][j] and target[i][j] are either 0 or 1.*/

    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        int n = size(target); 
        vector<bool> can(4, true); 
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (target[i][j] != mat[i][j]) can[0] = false; 
                if (target[i][j] != mat[n-1-j][i]) can[1] = false; 
                if (target[i][j] != mat[n-1-i][n-1-j]) can[2] = false; 
                if (target[i][j] != mat[j][n-1-i]) can[3] = false; 
            }
        }
        return can[0] || can[1] || can[2] || can[3]; 
    }


    /*1887. Reduction Operations to Make the Array Elements Equal (Medium)
	Given an integer array nums, your goal is to make all elements in nums 
	equal. To complete one operation, follow these steps:
	* Find the largest value in nums. Let its index be i (0-indexed) and its 
	  value be largest. If there are multiple elements with the largest value, 
	  pick the smallest i.
	* Find the next largest value in nums strictly smaller than largest. Let 
	  its value be nextLargest.
	Reduce nums[i] to nextLargest. Return the number of operations to make all 
	elements in nums equal.

	Example 1:
	Input: nums = [5,1,3]
	Output: 3
	Explanation: It takes 3 operations to make all elements in nums equal:
	1. largest = 5 at index 0. nextLargest = 3. Reduce nums[0] to 3. nums = [3,1,3].
	2. largest = 3 at index 0. nextLargest = 1. Reduce nums[0] to 1. nums = [1,1,3].
	3. largest = 3 at index 2. nextLargest = 1. Reduce nums[2] to 1. nums = [1,1,1].

	Example 2:
	Input: nums = [1,1,1]
	Output: 0
	Explanation: All elements in nums are already equal.

	Example 3:
	Input: nums = [1,1,2,2,3]
	Output: 4
	Explanation: It takes 4 operations to make all elements in nums equal:
	1. largest = 3 at index 4. nextLargest = 2. Reduce nums[4] to 2. nums = [1,1,2,2,2].
	2. largest = 2 at index 2. nextLargest = 1. Reduce nums[2] to 1. nums = [1,1,1,2,2].
	3. largest = 2 at index 3. nextLargest = 1. Reduce nums[3] to 1. nums = [1,1,1,1,2].
	4. largest = 2 at index 4. nextLargest = 1. Reduce nums[4] to 1. nums = [1,1,1,1,1].

	Constraints:
	* 1 <= nums.length <= 5 * 10^4
	* 1 <= nums[i] <= 5 * 10^4*/

    int reductionOperations(vector<int>& nums) {
        sort(begin(nums), end(nums)); 
        int ans = 0, chg = 0; 
        for (int i = 1; i < size(nums); ++i) {
            if (nums[i-1] < nums[i]) ++chg; 
            ans += chg; 
        }
        return ans; 
    }


    /*1888. Minimum Number of Flips to Make the Binary String Alternating (Medium)
	You are given a binary string s. You are allowed to perform two types of 
	operations on the string in any sequence:
	* Type-1: Remove the character at the start of the string s and append it 
	  to the end of the string.
	* Type-2: Pick any character in s and flip its value, i.e., if its value is 
	  '0' it becomes '1' and vice-versa.
	Return the minimum number of type-2 operations you need to perform such 
	that s becomes alternating. The string is called alternating if no two 
	adjacent characters are equal. For example, the strings "010" and "1010" 
	are alternating, while the string "0100" is not.

	Example 1:
	Input: s = "111000"
	Output: 2
	Explanation: Use the first operation two times to make s = "100011". Then, 
	             use the second operation on the third and sixth elements to 
	             make s = "101010".
	
	Example 2:
	Input: s = "010"
	Output: 0
	Explanation: The string is already alternating.

	Example 3:
	Input: s = "1110"
	Output: 1
	Explanation: Use the second operation on the second element to make s = "1010".

	Constraints:
	* 1 <= s.length <= 10^5
	* s[i] is either '0' or '1'.*/

    int minFlips(string s) {
        int ans = INT_MAX, x01 = 0, x10 = 0; 
        for (int i = 0; i < 2*size(s); ++i) {
            x01 += (s[i%size(s)]^i)&1; 
            x10 += (s[i%size(s)]^(i+1))&1; 
            if (i+1 >= size(s)) {
                if (i >= size(s)) {
                    x01 -= (s[i-size(s)]^(i-size(s)))&1; 
                    x10 -= (s[i-size(s)]^(i-size(s)+1))&1; 
                }
                ans = min(ans, min(x01, x10)); 
            }
        }
        return ans; 
    }


    /*1889. Minimum Space Wasted From Packaging (Hard)
	You have n packages that you are trying to place in boxes, one package in 
	each box. There are m suppliers that each produce boxes of different sizes 
	(with infinite supply). A package can be placed in a box if the size of the 
	package is less than or equal to the size of the box. The package sizes are 
	given as an integer array packages, where packages[i] is the size of the 
	ith package. The suppliers are given as a 2D integer array boxes, where 
	boxes[j] is an array of box sizes that the jth supplier produces. You want 
	to choose a single supplier and use boxes from them such that the total 
	wasted space is minimized. For each package in a box, we define the space 
	wasted to be size of the box - size of the package. The total wasted space 
	is the sum of the space wasted in all the boxes. For example, if you have 
	to fit packages with sizes [2,3,5] and the supplier offers boxes of sizes 
	[4,8], you can fit the packages of size-2 and size-3 into two boxes of 
	size-4 and the package with size-5 into a box of size-8. This would result 
	in a waste of (4-2) + (4-3) + (8-5) = 6. Return the minimum total wasted 
	space by choosing the box supplier optimally, or -1 if it is impossible to 
	fit all the packages inside boxes. Since the answer may be large, return it 
	modulo 10^9 + 7.

	Example 1:
	Input: packages = [2,3,5], boxes = [[4,8],[2,8]]
	Output: 6
	Explanation: It is optimal to choose the first supplier, using two size-4 
	             boxes and one size-8 box. The total waste is 
	             (4-2) + (4-3) + (8-5) = 6.
	
	Example 2:
	Input: packages = [2,3,5], boxes = [[1,4],[2,3],[3,4]]
	Output: -1
	Explanation: There is no box that the package of size 5 can fit in.

	Example 3:
	Input: packages = [3,5,8,10,11,12], boxes = [[12],[11,9],[10,5,14]]
	Output: 9
	Explanation: It is optimal to choose the third supplier, using two size-5 
	             boxes, two size-10 boxes, and two size-14 boxes. The total 
	             waste is (5-3) + (5-5) + (10-8) + (10-10) + (14-11) + (14-12) = 9.

	Constraints:
	* n == packages.length
	* m == boxes.length
	* 1 <= n <= 10^5
	* 1 <= m <= 10^5
	* 1 <= packages[i] <= 10^5
	* 1 <= boxes[j].length <= 10^5
	* 1 <= boxes[j][k] <= 10^5
	* sum(boxes[j].length) <= 10^5
	* The elements in boxes[j] are distinct.*/

    int minWastedSpace(vector<int>& packages, vector<vector<int>>& boxes) {
        sort(begin(packages), end(packages)); 
        long ans = LONG_MAX; 
        for (auto& box : boxes) {
            sort(begin(box), end(box)); 
            if (packages.back() <= box.back()) {
                int kk = 0; 
                long val = 0; 
                for (auto& x : box) {
                    long k = upper_bound(begin(packages), end(packages), x) - begin(packages); 
                    val += (long) x * (k - kk); 
                    kk = k; 
                }
                ans = min(ans, val); 
            }
        }
        return ans < LONG_MAX ? (ans - accumulate(begin(packages), end(packages), (long) 0)) % 1'000'000'007 : -1; 
    }


    /*1893. Check if All the Integers in a Range Are Covered (Easy)
	You are given a 2D integer array ranges and two integers left and right. 
	Each ranges[i] = [starti, endi] represents an inclusive interval between 
	starti and endi. Return true if each integer in the inclusive range 
	[left, right] is covered by at least one interval in ranges. Return false 
	otherwise. An integer x is covered by an interval ranges[i] = [starti, endi] 
	if starti <= x <= endi.

	Example 1:
	Input: ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5
	Output: true
	Explanation: Every integer between 2 and 5 is covered:
	             - 2 is covered by the first range.
	             - 3 and 4 are covered by the second range.
	             - 5 is covered by the third range.
	
	Example 2:
	Input: ranges = [[1,10],[10,20]], left = 21, right = 21
	Output: false
	Explanation: 21 is not covered by any range.

	Constraints:
	* 1 <= ranges.length <= 50
	* 1 <= starti <= endi <= 50
	* 1 <= left <= right <= 50*/

    bool isCovered(vector<vector<int>>& ranges, int left, int right) {
        vector<int> vals(52); 
        for (auto& rng : ranges) 
            ++vals[rng[0]], --vals[rng[1]+1]; 
        for (int i = 0, prefix = 0; i < size(vals); ++i) {
            prefix += vals[i]; 
            if (left <= i && i <= right && prefix == 0) return false;  
        }
        return true; 
    }


    /*1894. Find the Student that Will Replace the Chalk (Medium)
	There are n students in a class numbered from 0 to n - 1. The teacher will 
	give each student a problem starting with the student number 0, then the 
	student number 1, and so on until the teacher reaches the student number 
	n - 1. After that, the teacher will restart the process, starting with the 
	student number 0 again. You are given a 0-indexed integer array chalk and 
	an integer k. There are initially k pieces of chalk. When the student 
	number i is given a problem to solve, they will use chalk[i] pieces of 
	chalk to solve that problem. However, if the current number of chalk pieces 
	is strictly less than chalk[i], then the student number i will be asked to 
	replace the chalk. Return the index of the student that will replace the 
	chalk.

	Example 1:
	Input: chalk = [5,1,5], k = 22
	Output: 0
	Explanation: The students go in turns as follows:
	             - Student number 0 uses 5 chalk, so k = 17.
	             - Student number 1 uses 1 chalk, so k = 16.
	             - Student number 2 uses 5 chalk, so k = 11.
	             - Student number 0 uses 5 chalk, so k = 6.
	             - Student number 1 uses 1 chalk, so k = 5.
	             - Student number 2 uses 5 chalk, so k = 0.
	             Student number 0 does not have enough chalk, so they will have 
	             to replace it.
	
	Example 2:
	Input: chalk = [3,4,1,2], k = 25
	Output: 1
	Explanation: The students go in turns as follows:
	             - Student number 0 uses 3 chalk so k = 22.
	             - Student number 1 uses 4 chalk so k = 18.
	             - Student number 2 uses 1 chalk so k = 17.
	             - Student number 3 uses 2 chalk so k = 15.
	             - Student number 0 uses 3 chalk so k = 12.
	             - Student number 1 uses 4 chalk so k = 8.
	             - Student number 2 uses 1 chalk so k = 7.
	             - Student number 3 uses 2 chalk so k = 5.
	             - Student number 0 uses 3 chalk so k = 2.
	             Student number 1 does not have enough chalk, so they will have 
	             to replace it.

	Constraints:
	* chalk.length == n
	* 1 <= n <= 10^5
	* 1 <= chalk[i] <= 10^5
	* 1 <= k <= 10^9*/

    int chalkReplacer(vector<int>& chalk, int k) {
        k %= accumulate(begin(chalk), end(chalk), 0l); 
        for (int i = 0; i < size(chalk); ++i) {
            if ((k -= chalk[i]) < 0) return i; 
        }
        return -1; 
    }


    /*1895. Largest Magic Square (Medium)
	A k x k magic square is a k x k grid filled with integers such that every 
	row sum, every column sum, and both diagonal sums are all equal. The 
	integers in the magic square do not have to be distinct. Every 1 x 1 grid 
	is trivially a magic square. Given an m x n integer grid, return the size 
	(i.e., the side length k) of the largest magic square that can be found 
	within this grid.

	Example 1:
	Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
	Output: 3
	Explanation: The largest magic square has a size of 3. Every row sum, 
	             column sum, and diagonal sum of this magic square is equal to 
	             12.
	             - Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
	             - Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
	             - Diagonal sums: 5+4+3 = 6+4+2 = 12
	
	Example 2:
	Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
	Output: 2

	Constraints:
	* m == grid.length
	* n == grid[i].length
	* 1 <= m, n <= 50
	* 1 <= grid[i][j] <= 10^6*/

    int largestMagicSquare(vector<vector<int>>& grid) {
        int m = size(grid), n = size(grid[0]); // dimensions 
        
        vector<vector<int>> rows(m, vector<int>(n+1)), cols(m+1, vector<int>(n)), diag(m+1, vector<int>(n+1)), anti(m+1, vector<int>(n+1)); 
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                rows[i][j+1] = grid[i][j] + rows[i][j]; 
                cols[i+1][j] = grid[i][j] + cols[i][j]; 
                diag[i+1][j+1] = grid[i][j] + diag[i][j]; 
                anti[i+1][j] = grid[i][j] + anti[i][j+1]; 
            }
        }
        
        int ans = 1; 
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                for (int k = 1; k <= min(i, j); ++k) {
                    int ii = i-k, jj = j-k; 
                    if (k >= ans) {
                        int val = diag[i+1][j+1] - diag[ii][jj]; 
                        bool match = val == anti[i+1][jj] - anti[ii][j+1]; 
                        for (int r = ii; r <= i; ++r) match &= val == rows[r][j+1] - rows[r][jj]; 
                        for (int c = jj; c <= j; ++c) match &= val == cols[i+1][c] - cols[ii][c]; 
                        if (match) ans = max(ans, k+1); 
                    }
                }
            }
        }
        return ans; 
    }


    /*1896. Minimum Cost to Change the Final Value of Expression (Hard)
	You are given a valid boolean expression as a string expression consisting 
	of the characters '1','0','&' (bitwise AND operator),'|' (bitwise OR 
	operator),'(', and ')'. For example, "()1|1" and "(1)&()" are not valid 
	while "1", "(((1))|(0))", and "1|(0&(1))" are valid expressions. Return the 
	minimum cost to change the final value of the expression. For example, if 
	expression = "1|1|(0&0)&1", its value is 1|1|(0&0)&1 = 1|1|0&1 = 1|0&1 = 1&1 = 1. 
	We want to apply operations so that the new expression evaluates to 0. The 
	cost of changing the final value of an expression is the number of 
	operations performed on the expression. The types of operations are 
	described as follows:
	* Turn a '1' into a '0'.
	* Turn a '0' into a '1'.
	* Turn a '&' into a '|'.
	* Turn a '|' into a '&'.
	Note: '&' does not take precedence over '|' in the order of calculation. 
	Evaluate parentheses first, then in left-to-right order.

	Example 1:
	Input: expression = "1&(0|1)"
	Output: 1
	Explanation: We can turn "1&(0|1)" into "1&(0&1)" by changing the '|' to a 
	             '&' using 1 operation. The new expression evaluates to 0. 
	
	Example 2:
	Input: expression = "(0&0)&(0&0&0)"
	Output: 3
	Explanation: We can turn "(0&0)&(0&0&0)" into "(0|1)|(0&0&0)" using 3 
	             operations. The new expression evaluates to 1.
	
	Example 3:
	Input: expression = "(0|(1|0&1))"
	Output: 1
	Explanation: We can turn "(0|(1|0&1))" into "(0|(0|0&1))" using 1 operation.
	             The new expression evaluates to 0.

	Constraints:
	* 1 <= expression.length <= 10^5
	* expression only contains '1','0','&','|','(', and ')'
	* All parentheses are properly matched.
	* There will be no empty parentheses (i.e: "()" is not a substring of expression).*/

    int minOperationsToFlip(string expression) {
        unordered_map<int, int> mp; 
        stack<int> stk; 
        for (int i = size(expression)-1; i >= 0; --i) {
            if (expression[i] == ')') stk.push(i); 
            else if (expression[i] == '(') mp[stk.top()] = i, stk.pop(); 
        }
        
        function<pair<int, int>(int, int)> fn = [&](int lo, int hi) {
            if (lo == hi) return make_pair(expression[lo]-'0', 1); // single number 
            if (expression[hi] == ')' && lo == mp[hi]) return fn(lo+1, hi-1); // single parenthesis
            int mid = (mp.count(hi) ? mp[hi] : hi) - 1; 
            auto [v, c] = fn(mid+1, hi); 
            auto [vv, cc] = fn(lo, mid-1); 
            int val = 0, chg = 0; 
            if (expression[mid] == '|') {
                val = v | vv; 
                if (v == 1 && vv == 1) chg = 1 + min(c, cc); 
                else if (v == 0 && vv == 0) chg = min(c, cc); 
                else chg = 1; 
            } else {
                val = v & vv; 
                if (v == 1 && vv == 1) chg = min(c, cc); 
                else if (v == 0 && vv == 0) chg = 1 + min(c, cc); 
                else chg = 1; 
            }
            return make_pair(val, chg); 
        };
        
        return fn(0, size(expression)-1).second; 
    }


    /*1897. Redistribute Characters to Make All Strings Equal (Easy)
	You are given an array of strings words (0-indexed). In one operation, pick 
	two distinct indices i and j, where words[i] is a non-empty string, and 
	move any character from words[i] to any position in words[j]. Return true 
	if you can make every string in words equal using any number of operations, 
	and false otherwise.

	Example 1:
	Input: words = ["abc","aabc","bc"]
	Output: true
	Explanation: Move the first 'a' in words[1] to the front of words[2], to 
	             make words[1] = "abc" and words[2] = "abc". All the strings 
	             are now equal to "abc", so return true.
	
	Example 2:
	Input: words = ["ab","a"]
	Output: false
	Explanation: It is impossible to make all the strings equal using the 
	             operation.

	Constraints:
	* 1 <= words.length <= 100
	* 1 <= words[i].length <= 100
	* words[i] consists of lowercase English letters.*/

    bool makeEqual(vector<string>& words) {
        vector<int> freq(26); 
        for (auto& word : words) 
            for (auto& ch : word) ++freq[ch-'a']; 
        for (int i = 0; i < 26; ++i) 
            if (freq[i] % size(words)) return false; 
        return true; 
    }


    /*1898. Maximum Number of Removable Characters (Medium)
	You are given two strings s and p where p is a subsequence of s. You are 
	also given a distinct 0-indexed integer array removable containing a subset 
	of indices of s (s is also 0-indexed). You want to choose an integer k 
	(0 <= k <= removable.length) such that, after removing k characters from s 
	using the first k indices in removable, p is still a subsequence of s. More 
	formally, you will mark the character at s[removable[i]] for each 0 <= i < k, 
	then remove all marked characters and check if p is still a subsequence. 
	Return the maximum k you can choose such that p is still a subsequence of s 
	after the removals. A subsequence of a string is a new string generated from 
	the original string with some characters (can be none) deleted without 
	changing the relative order of the remaining characters.

	Example 1:
	Input: s = "abcacb", p = "ab", removable = [3,1,0]
	Output: 2
	Explanation: After removing the characters at indices 3 and 1, "abcacb" 
	             becomes "accb". "ab" is a subsequence of "accb". If we remove 
	             the characters at indices 3, 1, and 0, "abcacb" becomes "ccb", 
	             and "ab" is no longer a subsequence. Hence, the maximum k is 2.
	
	Example 2:
	Input: s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]
	Output: 1
	Explanation: After removing the character at index 3, "abcbddddd" becomes 
	             "abcddddd". "abcd" is a subsequence of "abcddddd".
	
	Example 3:
	Input: s = "abcab", p = "abc", removable = [0,1,2,3,4]
	Output: 0
	Explanation: If you remove the first index in the array removable, "abc" is no longer a subsequence.

	Constraints:
	* 1 <= p.length <= s.length <= 10^5
	* 0 <= removable.length < s.length
	* 0 <= removable[i] < s.length
	* p is a subsequence of s.
	* s and p both consist of lowercase English letters.
	* The elements in removable are distinct.*/

    int maximumRemovals(string s, string p, vector<int>& removable) {
        unordered_map<int, int> mp; 
        for (int i = 0; i < size(removable); ++i) mp[removable[i]] = i; 
        
        auto fn = [&](int x) {
            int k = 0; 
            for (int i = 0; i < size(s); ++i) {
                if (mp.count(i) && mp[i] < x) continue; 
                if (k < size(p) && s[i] == p[k]) ++k; 
            }
            return k == size(p); 
        }; 
        
        int lo = -1, hi = size(removable); 
        while (lo < hi) {
            int mid = lo + (hi - lo + 1)/2; 
            if (fn(mid)) lo = mid; 
            else hi = mid - 1; 
        }
        return lo; 
    }


    /*1899. Merge Triplets to Form Target Triplet (Medium)
	A triplet is an array of three integers. You are given a 2D integer array 
	triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You 
	are also given an integer array target = [x, y, z] that describes the 
	triplet you want to obtain. To obtain target, you may apply the following 
	operation on triplets any number of times (possibly zero):
	* Choose two indices (0-indexed) i and j (i != j) and update triplets[j] 
	  to become [max(ai, aj), max(bi, bj), max(ci, cj)].
	For example, if triplets[i] = [2, 5, 3] and triplets[j] = [1, 7, 5], 
	triplets[j] will be updated to [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5].
	Return true if it is possible to obtain the target triplet [x, y, z] as an 
	element of triplets, or false otherwise.

	Example 1:
	Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
	Output: true
	Explanation: Perform the following operations:
	             - Choose the first and last triplets [[2,5,3],[1,8,4],[1,7,5]]. 
	             Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. 
	             triplets = [[2,5,3],[1,8,4],[2,7,5]]. The target triplet [2,7,5] 
	             is now an element of triplets.
	
	Example 2:
	Input: triplets = [[1,3,4],[2,5,8]], target = [2,5,8]
	Output: true
	Explanation: The target triplet [2,5,8] is already an element of triplets.

	Example 3:
	Input: triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
	Output: true
	Explanation: Perform the following operations:
	             - Choose the first and third triplets [[2,5,3],[2,3,4],[1,2,5],[5,2,3]]. 
	               Update the third triplet to be [max(2,1), max(5,2), max(3,5)] = [2,5,5]. 
	               triplets = [[2,5,3],[2,3,4],[2,5,5],[5,2,3]].
	             - Choose the third and fourth triplets [[2,5,3],[2,3,4],[2,5,5],[5,2,3]]. 
	               Update the fourth triplet to be [max(2,5), max(5,2), max(5,3)] = [5,5,5]. 
	               triplets = [[2,5,3],[2,3,4],[2,5,5],[5,5,5]].
	             The target triplet [5,5,5] is now an element of triplets.
	
	Example 4:
	Input: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
	Output: false
	Explanation: It is impossible to have [3,2,5] as an element because there 
	             is no 2 in any of the triplets.

	Constraints:
	* 1 <= triplets.length <= 10^5
	* triplets[i].length == target.length == 3
	* 1 <= ai, bi, ci, x, y, z <= 1000*/

    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        vector<int> ans(3); 
        for (auto& triplet : triplets) {
            if (triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {
                ans[0] = max(ans[0], triplet[0]); 
                ans[1] = max(ans[1], triplet[1]); 
                ans[2] = max(ans[2], triplet[2]); 
            }
        }
        return ans == target; 
    }


    /*1900. The Earliest and Latest Rounds Where Players Compete (Hard)
	There is a tournament where n players are participating. The players are 
	standing in a single row and are numbered from 1 to n based on their 
	initial standing position (player 1 is the first player in the row, player 
	2 is the second player in the row, etc.). The tournament consists of 
	multiple rounds (starting from round number 1). In each round, the ith 
	player from the front of the row competes against the ith player from the 
	end of the row, and the winner advances to the next round. When the number 
	of players is odd for the current round, the player in the middle 
	automatically advances to the next round.

	* For example, if the row consists of players 1, 2, 4, 6, 7
	  - Player 1 competes against player 7.
	  - Player 2 competes against player 6.
	  - Player 4 automatically advances to the next round.
	After each round is over, the winners are lined back up in the row based on 
	the original ordering assigned to them initially (ascending order). The 
	players numbered firstPlayer and secondPlayer are the best in the tournament. 
	They can win against any other player before they compete against each other. 
	If any two other players compete against each other, either of them might 
	win, and thus you may choose the outcome of this round. Given the integers n, 
	firstPlayer, and secondPlayer, return an integer array containing two values, 
	the earliest possible round number and the latest possible round number in 
	which these two players will compete against each other, respectively.

	Example 1:
	Input: n = 11, firstPlayer = 2, secondPlayer = 4
	Output: [3,4]
	Explanation: One possible scenario which leads to the earliest round number:
	             First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	             Second round: 2, 3, 4, 5, 6, 11
	             Third round: 2, 3, 4
	             One possible scenario which leads to the latest round number:
	             First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	             Second round: 1, 2, 3, 4, 5, 6
	             Third round: 1, 2, 4
	             Fourth round: 2, 4
	
	Example 2:
	Input: n = 5, firstPlayer = 1, secondPlayer = 5
	Output: [1,1]
	Explanation: The players numbered 1 and 5 compete in the first round. There 
	             is no way to make them compete in any other round.

	Constraints:
	* 2 <= n <= 28
	* 1 <= firstPlayer < secondPlayer <= n*/

    vector<int> earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        firstPlayer -= 1; 
        secondPlayer -= 1; 
        
        map<int, vector<int>> memo; 
        
        function<vector<int>(int, int, int, int)> fn = [&](int r, int mask, int i, int j) {
            if (memo.find(mask) == memo.end()) {
                if (i >= j) return fn(r+1, mask, 0, n-1); 
                if (!(mask & (1 << i))) return fn(r, mask, i+1, j); 
                if (!(mask & (1 << j))) return fn(r, mask, i, j-1); 
                if ((i == firstPlayer && j == secondPlayer) || (i == secondPlayer && j == firstPlayer)) return vector<int>(2, r); 
                if (i == firstPlayer || i == secondPlayer) return fn(r, mask^(1<<j), i+1, j-1); 
                if (j == firstPlayer || j == secondPlayer) return fn(r, mask^(1<<i), i+1, j-1); 
                else {
                    vector<int> x = fn(r, mask^(1<<j), i+1, j-1); 
                    vector<int> y = fn(r, mask^(1<<i), i+1, j-1); 
                    memo[mask] = {min(x[0], y[0]), max(x[1], y[1])}; 
                }
            }
            return memo[mask]; 
        };
        
        return fn(1, (1<<n)-1, 0, n-1); 
    }


    /*1901. Find a Peak Element II (Medium)
	A peak element in a 2D grid is an element that is strictly greater than all 
	of its adjacent neighbors to the left, right, top, and bottom. Given a 
	0-indexed m x n matrix mat where no two adjacent cells are equal, find any 
	peak element mat[i][j] and return the length 2 array [i,j]. You may assume 
	that the entire matrix is surrounded by an outer perimeter with the value 
	-1 in each cell. You must write an algorithm that runs in O(m log(n)) or 
	O(n log(m)) time.

	Example 1:
	Input: mat = [[1,4],[3,2]]
	Output: [0,1]
	Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both 
	             acceptable answers.
	
	Example 2:
	Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
	Output: [1,1]
	Explanation: Both 30 and 32 are peak elements so [1,1] and [2,2] are both 
	             acceptable answers.

	Constraints:
	* m == mat.length
	* n == mat[i].length
	* 1 <= m, n <= 500
	* 1 <= mat[i][j] <= 10^5
	* No two adjacent cells are equal.*/

    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int m = size(mat), n = size(mat[0]); 
        
        function<vector<int>(int, int)> fn = [&](int lo, int hi) {
            if (lo == hi) return vector<int>{}; 
            int mid = (lo + hi)/2; 
            vector<int> left = fn(lo, mid), right = fn(mid+1, hi); 
            if (size(left)) return left; 
            if (size(right)) return right;
            for (int i = 0; i < m; ++i) {
                if ((i == 0 || mat[i-1][mid] < mat[i][mid]) && (i+1 == m || mat[i][mid] > mat[i+1][mid]) && (mid == 0 || mat[i][mid-1] < mat[i][mid]) && (mid+1 == n || mat[i][mid] > mat[i][mid+1]))
                    return vector<int>{i, mid}; 
            }
            return vector<int>{}; 
        };
        
        return fn(0, n); 
    }


    /*1903. Largest Odd Number in String (Easy)
	You are given a string num, representing a large integer. Return the 
	largest-valued odd integer (as a string) that is a non-empty substring of 
	num, or an empty string "" if no odd integer exists. A substring is a 
	contiguous sequence of characters within a string.

	Example 1:
	Input: num = "52"
	Output: "5"
	Explanation: The only non-empty substrings are "5", "2", and "52". "5" is 
	             the only odd number.
	
	Example 2:
	Input: num = "4206"
	Output: ""
	Explanation: There are no odd numbers in "4206".

	Example 3:
	Input: num = "35427"
	Output: "35427"
	Explanation: "35427" is already an odd number.

	Constraints:
	* 1 <= num.length <= 10^5
	* num only consists of digits and does not contain any leading zeros.*/

    string largestOddNumber(string num) {
        for (int i = num.size()-1; i >= 0; --i) 
            if ((num[i]-'0') & 1) return num.substr(0, i+1); 
        return ""; 
    }


    /*1904. The Number of Full Rounds You Have Played (Medium)
	A new online video game has been released, and in this video game, there 
	are 15-minute rounds scheduled every quarter-hour period. This means that 
	at HH:00, HH:15, HH:30 and HH:45, a new round starts, where HH represents 
	an integer number from 00 to 23. A 24-hour clock is used, so the earliest 
	time in the day is 00:00 and the latest is 23:59. Given two strings 
	startTime and finishTime in the format "HH:MM" representing the exact time 
	you started and finished playing the game, respectively, calculate the 
	number of full rounds that you played during your game session. For example, 
	if startTime = "05:20" and finishTime = "05:59" this means you played only 
	one full round from 05:30 to 05:45. You did not play the full round from 
	05:15 to 05:30 because you started after the round began, and you did not 
	play the full round from 05:45 to 06:00 because you stopped before the 
	round ended. If finishTime is earlier than startTime, this means you have 
	played overnight (from startTime to the midnight and from midnight to 
	finishTime). Return the number of full rounds that you have played if you 
	had started playing at startTime and finished at finishTime.

	Example 1:
	Input: startTime = "12:01", finishTime = "12:44"
	Output: 1
	Explanation: You played one full round from 12:15 to 12:30. You did not 
	             play the full round from 12:00 to 12:15 because you started 
	             playing at 12:01 after it began. You did not play the full 
	             round from 12:30 to 12:45 because you stopped playing at 
	             12:44 before it ended.
	
	Example 2:
	Input: startTime = "20:00", finishTime = "06:00"
	Output: 40
	Explanation: You played 16 full rounds from 20:00 to 00:00 and 24 full 
	             rounds from 00:00 to 06:00. 16 + 24 = 40.
	
	Example 3:
	Input: startTime = "00:00", finishTime = "23:59"
	Output: 95
	Explanation: You played 4 full rounds each hour except for the last hour 
	             where you played 3 full rounds.

	Constraints:
	* startTime and finishTime are in the format HH:MM.
	* 00 <= HH <= 23
	* 00 <= MM <= 59
	* startTime and finishTime are not equal.*/

    int numberOfRounds(string startTime, string finishTime) {
        int ts = 60 * stoi(startTime.substr(0, 2)) + stoi(startTime.substr(3, 2)); 
        int tf = 60 * stoi(finishTime.substr(0, 2)) + stoi(finishTime.substr(3, 2)); 
        if (0 <= tf - ts && tf - ts < 15) return 0; 
        return tf/15 - (ts + 14)/15 + (ts > tf)*96; 
    }


    /*1905. Count Sub Islands (Medium)
	You are given two m x n binary matrices grid1 and grid2 containing only 0's 
	(representing water) and 1's (representing land). An island is a group of 
	1's connected 4-directionally (horizontal or vertical). Any cells outside 
	of the grid are considered water cells. An island in grid2 is considered a 
	sub-island if there is an island in grid1 that contains all the cells that 
	make up this island in grid2. Return the number of islands in grid2 that 
	are considered sub-islands.

	Example 1:
	Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], 
	       grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
	Output: 3
	Explanation: In the picture above, the grid on the left is grid1 and the 
	             grid on the right is grid2. The 1s colored red in grid2 are 
	             those considered to be part of a sub-island. There are three 
	             sub-islands.
	
	Example 2:
	Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], 
	       grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
	Output: 2 
	Explanation: In the picture above, the grid on the left is grid1 and the 
	             grid on the right is grid2. The 1s colored red in grid2 are 
	             those considered to be part of a sub-island. There are two 
	             sub-islands.

	Constraints:
	* m == grid1.length == grid2.length
	* n == grid1[i].length == grid2[i].length
	* 1 <= m, n <= 500
	* grid1[i][j] and grid2[i][j] are either 0 or 1.*/

    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        int m = size(grid1), n = size(grid1[0]), ans = 0, dir[5] = {1, 0, -1, 0, 1}; 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j) {
                if (grid2[i][j]) {
                    grid2[i][j] = 0; // mark as visited 
                    stack<pair<int, int>> stk; 
                    stk.emplace(i, j); 
                    int val = 1; 
                    while (size(stk)) {
                        auto [r, c] = stk.top(); stk.pop(); 
                        val &= grid1[r][c]; 
                        for (int k = 0; k < 4; ++k) {
                            int rr = r + dir[k], cc = c + dir[k+1]; 
                            if (0 <= rr && rr < m && 0 <= cc && cc < n && grid2[rr][cc]) {
                                grid2[rr][cc] = 0; 
                                stk.emplace(rr, cc); 
                            }
                        }
                    }
                if (val) ++ans;
                } 
            }
        return ans; 
    }


    /*1906. Minimum Absolute Difference Queries (Medium)
	The minimum absolute difference of an array a is defined as the minimum 
	value of |a[i] - a[j]|, where 0 <= i < j < a.length and a[i] != a[j]. If 
	all elements of a are the same, the minimum absolute difference is -1.
	For example, the minimum absolute difference of the array [5,2,3,7,2] is 
	|2 - 3| = 1. Note that it is not 0 because a[i] and a[j] must be different.
	You are given an integer array nums and the array queries where 
	queries[i] = [li, ri]. For each query i, compute the minimum absolute 
	difference of the subarray nums[li...ri] containing the elements of nums 
	between the 0-based indices li and ri (inclusive). Return an array ans 
	where ans[i] is the answer to the ith query. A subarray is a contiguous 
	sequence of elements in an array. The value of |x| is defined as:
	* x if x >= 0.
	* -x if x < 0.

	Example 1:
	Input: nums = [1,3,4,8], queries = [[0,1],[1,2],[2,3],[0,3]]
	Output: [2,1,4,1]
	Explanation: The queries are processed as follows:
	             - queries[0] = [0,1]: The subarray is [1,3] and the minimum absolute difference is |1-3| = 2.
	             - queries[1] = [1,2]: The subarray is [3,4] and the minimum absolute difference is |3-4| = 1.
	             - queries[2] = [2,3]: The subarray is [4,8] and the minimum absolute difference is |4-8| = 4.
	             - queries[3] = [0,3]: The subarray is [1,3,4,8] and the minimum absolute difference is |3-4| = 1.
	Example 2:
	Input: nums = [4,5,2,2,7,10], queries = [[2,3],[0,2],[0,5],[3,5]]
	Output: [-1,1,1,3]
	Explanation: The queries are processed as follows:
	             - queries[0] = [2,3]: The subarray is [2,2] and the minimum absolute difference is -1 because all the elements are the same.
	             - queries[1] = [0,2]: The subarray is [4,5,2] and the minimum absolute difference is |4-5| = 1.
	             - queries[2] = [0,5]: The subarray is [4,5,2,2,7,10] and the minimum absolute difference is |4-5| = 1.
	             - queries[3] = [3,5]: The subarray is [2,7,10] and the minimum absolute difference is |7-10| = 3.

	Constraints:
	* 2 <= nums.length <= 10^5
	* 1 <= nums[i] <= 100
	* 1 <= queries.length <= 2 * 10^4
	* 0 <= li < ri < nums.length*/

    vector<int> minDifference(vector<int>& nums, vector<vector<int>>& queries) {
        vector<vector<int>> loc(101); 
        for (int i = 0; i < size(nums); ++i) 
            loc[nums[i]].push_back(i); 
        
        vector<int> ans; 
        for (auto& query : queries) {
            int prev = 0, val = INT_MAX; 
            for (int x = 1; x <= 100; ++x) {
                auto it = lower_bound(loc[x].begin(), loc[x].end(), query[0]); 
                if (it != loc[x].end() && *it <= query[1]) {
                    if (prev) val = min(val, x - prev); 
                    prev = x; 
                }
            }
            ans.push_back(val < INT_MAX ? val : -1); 
        }
        return ans; 
    }


    /*1909. Remove One Element to Make the Array Strictly Increasing (Easy)
	Given a 0-indexed integer array nums, return true if it can be made 
	strictly increasing after removing exactly one element, or false otherwise. 
	If the array is already strictly increasing, return true. The array nums is 
	strictly increasing if nums[i - 1] < nums[i] for each index 
	(1 <= i < nums.length).

	Example 1:
	Input: nums = [1,2,10,5,7]
	Output: true
	Explanation: By removing 10 at index 2 from nums, it becomes [1,2,5,7].
	             [1,2,5,7] is strictly increasing, so return true.
	
	Example 2:
	Input: nums = [2,3,1,2]
	Output: false
	Explanation: [3,1,2] is the result of removing the element at index 0.
	             [2,1,2] is the result of removing the element at index 1.
	             [2,3,2] is the result of removing the element at index 2.
	             [2,3,1] is the result of removing the element at index 3.
	             No resulting array is strictly increasing, so return false.
	
	Example 3:
	Input: nums = [1,1,1]
	Output: false
	Explanation: The result of removing any element is [1,1]. [1,1] is not 
	             strictly increasing, so return false.

	Example 4:
	Input: nums = [1,2,3]
	Output: true
	Explanation: [1,2,3] is already strictly increasing, so return true.

	Constraints:
	* 2 <= nums.length <= 1000
	* 1 <= nums[i] <= 1000*/

    bool canBeIncreasing(vector<int>& nums) {
        int prev = INT_MIN; 
        bool seen = false; 
        for (int i = 0; i < size(nums); ++i) {
            if (prev < nums[i]) prev = nums[i]; 
            else {
                if (seen) return false; 
                seen = true; 
                if (i == 1 || nums[i-2] < nums[i]) prev = nums[i]; 
            }
        }
        return true; 
    }


    /*1910. Remove All Occurrences of a Substring (Medium)
	Given two strings s and part, perform the following operation on s until 
	all occurrences of the substring part are removed:
	* Find the leftmost occurrence of the substring part and remove it from s.
	Return s after removing all occurrences of part. A substring is a 
	contiguous sequence of characters in a string.

	Example 1:
	Input: s = "daabcbaabcbc", part = "abc"
	Output: "dab"
	Explanation: The following operations are done:
	             - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
	             - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
	             - s = "dababc", remove "abc" starting at index 3, so s = "dab".
	             Now s has no occurrences of "abc".
	
	Example 2:
	Input: s = "axxxxyyyyb", part = "xy"
	Output: "ab"
	Explanation: The following operations are done:
	             - s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
	             - s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
	             - s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
	             - s = "axyb", remove "xy" starting at index 1 so s = "ab".
	             Now s has no occurrences of "xy".

	Constraints:
	* 1 <= s.length <= 1000
	* 1 <= part.length <= 1000
	* s and part consists of lowercase English letters.*/

    string removeOccurrences(string s, string part) {
        vector<int> lps = {0}; 
        int k = 0; 
        for (int i = 1; i < size(part); ++i) {
            while (k && part[k] != part[i]) k = lps[k-1]; 
            if (part[k] == part[i]) ++k; 
            lps.push_back(k); 
        }
        
        vector<pair<char, int>> stk; 
        for (auto& ch : s) {
            int k = size(stk) ? stk.back().second : 0; 
            while (k && part[k] != ch) k = lps[k-1]; 
            if (part[k] == ch) ++k; 
            stk.emplace_back(ch, k); 
            if (k == size(part)) 
                while (k--) stk.pop_back(); 
        }
        
        string ans; 
        for (auto& [ch, k] : stk) ans.push_back(ch); 
        return ans; 
    }


    /*1911. Maximum Alternating Subsequence Sum (Medium)
	The alternating sum of a 0-indexed array is defined as the sum of the 
	elements at even indices minus the sum of the elements at odd indices.
	* For example, the alternating sum of [4,2,5,3] is (4 + 5) - (2 + 3) = 4.
	Given an array nums, return the maximum alternating sum of any subsequence 
	of nums (after reindexing the elements of the subsequence). A subsequence 
	of an array is a new array generated from the original array by deleting 
	some elements (possibly none) without changing the remaining elements' 
	relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] 
	(the underlined elements), while [2,4,2] is not.

	Example 1:
	Input: nums = [4,2,5,3]
	Output: 7
	Explanation: It is optimal to choose the subsequence [4,2,5] with 
	             alternating sum (4 + 5) - 2 = 7.

	Example 2:
	Input: nums = [5,6,7,8]
	Output: 8
	Explanation: It is optimal to choose the subsequence [8] with alternating 
	             sum 8.
	
	Example 3:
	Input: nums = [6,2,1,2,4,5]
	Output: 10
	Explanation: It is optimal to choose the subsequence [6,1,5] with 
	             alternating sum (6 + 5) - 1 = 10.

	Constraints:
	* 1 <= nums.length <= 10^5
	* 1 <= nums[i] <= 10^5*/

    long long maxAlternatingSum(vector<int>& nums) {
        long long ans = 0; 
        for (int i = 1; i < size(nums); ++i) {
            if (nums[i-1] > nums[i]) 
                ans += nums[i-1] - nums[i]; 
        }
        return ans + nums.back(); 
    }


    /*1913. Maximum Product Difference Between Two Pairs (Easy)
	The product difference between two pairs (a, b) and (c, d) is defined as 
	(a * b) - (c * d). For example, the product difference between (5, 6) and 
	(2, 7) is (5 * 6) - (2 * 7) = 16. Given an integer array nums, choose four 
	distinct indices w, x, y, and z such that the product difference between 
	pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized. Return the 
	maximum such product difference.

	Example 1:
	Input: nums = [5,6,2,7,4]
	Output: 34
	Explanation: We can choose indices 1 and 3 for the first pair (6, 7) and 
	             indices 2 and 4 for the second pair (2, 4). The product 
	             difference is (6 * 7) - (2 * 4) = 34.
	
	Example 2:
	Input: nums = [4,2,5,9,7,4,8]
	Output: 64
	Explanation: We can choose indices 3 and 6 for the first pair (9, 8) and 
	             indices 1 and 5 for the second pair (2, 4). The product 
	             difference is (9 * 8) - (2 * 4) = 64.

	Constraints:
	* 4 <= nums.length <= 10^4
	* 1 <= nums[i] <= 10^4*/

    int maxProductDifference(vector<int>& nums) {
        sort(begin(nums), end(nums)); 
        int n = size(nums); 
        return nums[n-1] * nums[n-2] - nums[1] * nums[0]; 
    }


    /*1914. Cyclically Rotating a Grid (Medium)
	You are given an m x n integer matrix grid, where m and n are both even 
	integers, and an integer k. The matrix is composed of several layers, which 
	is shown in the below image, where each color is its own layer.
	A cyclic rotation of the matrix is done by cyclically rotating each layer 
	in the matrix. To cyclically rotate a layer once, each element in the layer 
	will take the place of the adjacent element in the counter-clockwise 
	direction. Return the matrix after applying k cyclic rotations to it.

	Example 1:
	Input: grid = [[40,10],[30,20]], k = 1
	Output: [[10,20],[40,30]]
	Explanation: The figures above represent the grid at every state.

	Example 2:
	Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
	Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
	Explanation: The figures above represent the grid at every state.

	Constraints:
	* m == grid.length
	* n == grid[i].length
	* 2 <= m, n <= 50
	* Both m and n are even integers.
	* 1 <= grid[i][j] <= 5000
	* 1 <= k <= 10^9*/

    vector<vector<int>> rotateGrid(vector<vector<int>>& grid, int k) {
        int m = size(grid), n = size(grid[0]); 
        vector<vector<int>> ans(m, vector<int>(n)); 
        
        for (int r = 0; r < min(m, n)/2; ++r) {
            int i = r, j = r; 
            vector<int> vals; 
            for (int jj = j; jj < n-1-j; ++jj) vals.push_back(grid[i][jj]); 
            for (int ii = i; ii < m-1-i; ++ii) vals.push_back(grid[ii][n-1-j]);
            for (int jj = n-1-j; jj > j; --jj) vals.push_back(grid[m-1-j][jj]); 
            for (int ii = m-1-i; ii > i; --ii) vals.push_back(grid[ii][j]); 
            
            int kk = k % size(vals); 
            for (int jj = j; jj < n-1-j; ++jj) ans[i][jj]     = vals[kk++ % size(vals)]; 
            for (int ii = i; ii < m-1-i; ++ii) ans[ii][n-1-j] = vals[kk++ % size(vals)]; 
            for (int jj = n-1-j; jj > j; --jj) ans[m-1-j][jj] = vals[kk++ % size(vals)]; 
            for (int ii = m-1-i; ii > i; --ii) ans[ii][j]     = vals[kk++ % size(vals)]; 
        }
        return ans; 
    }


    /*1915. Number of Wonderful Substrings (Medium)
	A wonderful string is a string where at most one letter appears an odd 
	number of times. For example, "ccjjc" and "abab" are wonderful, but "ab" is 
	not. Given a string word that consists of the first ten lowercase English 
	letters ('a' through 'j'), return the number of wonderful non-empty 
	substrings in word. If the same substring appears multiple times in word, 
	then count each occurrence separately. A substring is a contiguous sequence 
	of characters in a string.

	Example 1:
	Input: word = "aba"
	Output: 4
	Explanation: The four wonderful substrings are underlined below:
	             - "aba" -> "a"
	             - "aba" -> "b"
	             - "aba" -> "a"
	             - "aba" -> "aba"
	
	Example 2:
	Input: word = "aabb"
	Output: 9
	Explanation: The nine wonderful substrings are underlined below:
	             - "aabb" -> "a"
	             - "aabb" -> "aa"
	             - "aabb" -> "aab"
	             - "aabb" -> "aabb"
	             - "aabb" -> "a"
	             - "aabb" -> "abb"
	             - "aabb" -> "b"
	             - "aabb" -> "bb"
	             - "aabb" -> "b"
	
	Example 3:
	Input: word = "he"
	Output: 2
	Explanation: The two wonderful substrings are underlined below:
	             - "he" -> "h"
	             - "he" -> "e"

	Constraints:
	* 1 <= word.length <= 10^5
	* word consists of lowercase English letters from 'a' to 'j'.*/

    long long wonderfulSubstrings(string word) {
        long long ans = 0; 
        int mask = 0; 
        unordered_map<int, long long> freq = {{0, 1}}; 
        
        for (auto& ch : word) {
            mask ^= 1 << (ch - 'a'); 
            ans += freq[mask]; 
            for (int i = 0; i < 10; ++i) 
                ans += freq[mask ^ (1 << i)]; 
            ++freq[mask]; 
        }
        return ans; 
    }


    /*1916. Count Ways to Build Rooms in an Ant Colony (Hard)
	You are an ant tasked with adding n new rooms numbered 0 to n-1 to your 
	colony. You are given the expansion plan as a 0-indexed integer array of 
	length n, prevRoom, where prevRoom[i] indicates that you must build room 
	prevRoom[i] before building room i, and these two rooms must be connected 
	directly. Room 0 is already built, so prevRoom[0] = -1. The expansion plan 
	is given such that once all the rooms are built, every room will be 
	reachable from room 0. You can only build one room at a time, and you can 
	travel freely between rooms you have already built only if they are 
	connected. You can choose to build any room as long as its previous room is 
	already built. Return the number of different orders you can build all the 
	rooms in. Since the answer may be large, return it modulo 10^9 + 7.

	Example 1:
	Input: prevRoom = [-1,0,1]
	Output: 1
	Explanation: There is only one way to build the additional rooms: 0 → 1 → 2

	Example 2:
	Input: prevRoom = [-1,0,0,1,2]
	Output: 6
	Explanation: The 6 ways are:
	             0 → 1 → 3 → 2 → 4
	             0 → 2 → 4 → 1 → 3
	             0 → 1 → 2 → 3 → 4
	             0 → 1 → 2 → 4 → 3
	             0 → 2 → 1 → 3 → 4
	             0 → 2 → 1 → 4 → 3

	Constraints:
	* n == prevRoom.length
	* 2 <= n <= 10^5
	* prevRoom[0] == -1
	* 0 <= prevRoom[i] < n for all 1 <= i < n
	* Every room is reachable from room 0 once all the rooms are built.*/

    int waysToBuildRooms(vector<int>& prevRoom) {
        int n = size(prevRoom); 
        unordered_map<int, vector<int>> tree(n); 
        for (int i = 0; i < size(prevRoom); ++i) 
            if (prevRoom[i] >= 0) tree[prevRoom[i]].push_back(i); 
        
        const int MOD = 1'000'000'007, N = 100001; 
        int inv[N], fact[N], ifact[N]; 
        inv[1] = 1; 
        
        for (int i = 2; i < N; ++i) 
            inv[i] = (long long) (MOD - MOD/i) * inv[MOD % i] % MOD; 
        
        fact[0] = ifact[0] = 1; 
        for (int i = 1; i < N; ++i) {
            fact[i] = (long long) fact[i-1] * i % MOD; 
            ifact[i] = (long long) ifact[i-1] * inv[i] % MOD; 
        }
        
        function<pair<int, long long>(int)> fn = [&](int x) {
            if (size(tree[x]) == 0) return make_pair(1, 1ll); 
            int c = 0; 
            long long m = 1; 
            for (auto& xx : tree[x]) {
                auto [cc, mm] = fn(xx); 
                c += cc; 
                m = m * mm % MOD * ifact[cc] % MOD; 
            }
            m = m * fact[c] % MOD; 
            return make_pair(c+1, m); 
        };
        
        return fn(0).second; 
    }


    /*1925. Count Square Sum Triples (Easy)
	A square triple (a,b,c) is a triple where a, b, and c are integers and 
	a^2 + b^2 = c^2. Given an integer n, return the number of square triples 
	such that 1 <= a, b, c <= n.

	Example 1:
	Input: n = 5
	Output: 2
	Explanation: The square triples are (3,4,5) and (4,3,5).

	Example 2:
	Input: n = 10
	Output: 4
	Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

	Constraints: 1 <= n <= 250*/

    int countTriples(int n) {
        int ans = 0; 
        for (int a = 1; a < n; ++a) {
            for (int b = a+1; b < n; ++b) {
                int cc = a*a + b*b, c = sqrt(cc); 
                if (c*c == cc && c <= n) ans += 2; 
            }
        }
        return ans; 
    }


    /*1926. Nearest Exit from Entrance in Maze (Medium)
	You are given an m x n matrix maze (0-indexed) with empty cells 
	(represented as '.') and walls (represented as '+'). You are also given the 
	entrance of the maze, where entrance = [entrancerow, entrancecol] denotes 
	the row and column of the cell you are initially standing at. In one step, 
	you can move one cell up, down, left, or right. You cannot step into a cell 
	with a wall, and you cannot step outside the maze. Your goal is to find the 
	nearest exit from the entrance. An exit is defined as an empty cell that is 
	at the border of the maze. The entrance does not count as an exit. Return 
	the number of steps in the shortest path from the entrance to the nearest 
	exit, or -1 if no such path exists.

	Example 1:
	Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
	Output: 1
	Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
	             Initially, you are at the entrance cell [1,2].
	             - You can reach [1,0] by moving 2 steps left.
	             - You can reach [0,2] by moving 1 step up.
	             It is impossible to reach [2,3] from the entrance.
	             Thus, the nearest exit is [0,2], which is 1 step away.
	
	Example 2:
	Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
	Output: 2
	Explanation: There is 1 exit in this maze at [1,2].
	             [1,0] does not count as an exit since it is the entrance cell.
	             Initially, you are at the entrance cell [1,0].
	             - You can reach [1,2] by moving 2 steps right.
	             Thus, the nearest exit is [1,2], which is 2 steps away.
	
	Example 3:
	Input: maze = [[".","+"]], entrance = [0,0]
	Output: -1
	Explanation: There are no exits in this maze.

	Constraints:
	* maze.length == m
	* maze[i].length == n
	* 1 <= m, n <= 100
	* maze[i][j] is either '.' or '+'.
	* entrance.length == 2
	* 0 <= entrancerow < m
	* 0 <= entrancecol < n
	* entrance will always be an empty cell.*/

    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        int ans = 0, m = maze.size(), n = maze[0].size(), d[5] = {1, 0, -1, 0, 1}; 
        queue<int> q; 
        q.push(entrance[0]*n + entrance[1]); 
        while (q.size()) {
            for (int k = q.size(); k; --k) {
                int x = q.front()/n, y = q.front()%n; 
                q.pop();
                if ((x == 0 || x == m-1 || y == 0 || y == n-1) && (x != entrance[0] || y != entrance[1])) return ans; 
                for (int i = 0; i < 4; ++i) {
                    int xx = x + d[i], yy = y + d[i+1]; 
                    if (0 <= xx && xx < m && 0 <= yy && yy < n && maze[xx][yy] == '.') {
                        maze[xx][yy] = '+'; 
                        q.push(xx*n + yy); 
                    }
                }
            }
            ++ans; 
        }
        return -1; 
    }


    /*1927. Sum Game (Medium)
	Alice and Bob take turns playing a game, with Alice starting first. You are 
	given a string num of even length consisting of digits and '?' characters. 
	On each turn, a player will do the following if there is still at least one 
	'?' in num:
	* Choose an index i where num[i] == '?'.
	* Replace num[i] with any digit between '0' and '9'.
	The game ends when there are no more '?' characters in num. For Bob to win, 
	the sum of the digits in the first half of num must be equal to the sum of 
	the digits in the second half. For Alice to win, the sums must not be equal.
	* For example, if the game ended with num = "243801", then Bob wins because 
	  2+4+3 = 8+0+1. If the game ended with num = "243803", then Alice wins 
	  because 2+4+3 != 8+0+3.
	Assuming Alice and Bob play optimally, return true if Alice will win and 
	false if Bob will win.

	Example 1:
	Input: num = "5023"
	Output: false
	Explanation: There are no moves to be made. The sum of the first half is 
	             equal to the sum of the second half: 5 + 0 = 2 + 3.
	
	Example 2:
	Input: num = "25??"
	Output: true
	Explanation: Alice can replace one of the '?'s with '9' and it will be 
	             impossible for Bob to make the sums equal.
	
	Example 3:
	Input: num = "?3295???"
	Output: false
	Explanation: It can be proven that Bob will always win. One possible outcome is:
	             - Alice replaces the first '?' with '9'. num = "93295???".
	             - Bob replaces one of the '?' in the right half with '9'. num = "932959??".
	             - Alice replaces one of the '?' in the right half with '2'. num = "9329592?".
	             - Bob replaces the last '?' in the right half with '7'. num = "93295927".
	             Bob wins because 9 + 3 + 2 + 9 = 5 + 9 + 2 + 7.

	Constraints:
	* 2 <= num.length <= 10^5
	* num.length is even.
	* num consists of only digits and '?'.*/

    bool sumGame(string num) {
        int diff = 0, qm = 0; 
        for (int i = 0; i < num.size(); ++i) {
            if (num[i] == '?') qm += i < num.size()/2 ? 1 : -1; 
            else diff += i < num.size()/2 ? num[i] - '0' : '0' - num[i]; 
        }
        return diff * 2 + qm * 9 != 0; 
    }


    /*1928. Minimum Cost to Reach Destination in Time (Hard)
	There is a country of n cities numbered from 0 to n - 1 where all the 
	cities are connected by bi-directional roads. The roads are represented as 
	a 2D integer array edges where edges[i] = [xi, yi, timei] denotes a road 
	between cities xi and yi that takes timei minutes to travel. There may be 
	multiple roads of differing travel times connecting the same two cities, 
	but no road connects a city to itself. Each time you pass through a city, 
	you must pay a passing fee. This is represented as a 0-indexed integer 
	array passingFees of length n where passingFees[j] is the amount of dollars 
	you must pay when you pass through city j. In the beginning, you are at 
	city 0 and want to reach city n - 1 in maxTime minutes or less. The cost of 
	your journey is the summation of passing fees for each city that you passed 
	through at some moment of your journey (including the source and 
	destination cities). Given maxTime, edges, and passingFees, return the 
	minimum cost to complete your journey, or -1 if you cannot complete it 
	within maxTime minutes.

	Example 1:
	Input: maxTime = 30, 
	       edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], 
	       passingFees = [5,1,2,20,20,3]
	Output: 11
	Explanation: The path to take is 0 -> 1 -> 2 -> 5, which takes 30 minutes 
	             and has $11 worth of passing fees.

	Example 2:
	Input: maxTime = 29, 
	       edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], 
	       passingFees = [5,1,2,20,20,3]
	Output: 48
	Explanation: The path to take is 0 -> 3 -> 4 -> 5, which takes 26 minutes 
	             and has $48 worth of passing fees. You cannot take path 
	             0 -> 1 -> 2 -> 5 since it would take too long.
	
	Example 3:
	Input: maxTime = 25, 
	       edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], 
	       passingFees = [5,1,2,20,20,3]
	Output: -1
	Explanation: There is no way to reach city 5 from city 0 within 25 minutes.

	Constraints:
	* 1 <= maxTime <= 1000
	* n == passingFees.length
	* 2 <= n <= 1000
	* n - 1 <= edges.length <= 1000
	* 0 <= xi, yi <= n - 1
	* 1 <= timei <= 1000
	* 1 <= passingFees[j] <= 1000 
	* The graph may contain multiple edges between two nodes.
	* The graph does not contain self loops.*/

    int minCost(int maxTime, vector<vector<int>>& edges, vector<int>& passingFees) {
        unordered_map<int, vector<pair<int, int>>> graph; 
        for (auto& edge : edges) {
            graph[edge[0]].emplace_back(edge[1], edge[2]); 
            graph[edge[1]].emplace_back(edge[0], edge[2]); 
        }
        
        // Dijkstra's algo
        priority_queue<array<int, 3>, vector<array<int, 3>>, greater<>> pq; // min-heap 
        pq.push({passingFees[0], 0, 0}); 
        unordered_map<int, int> dist = {{0, passingFees[0]}}; 
        while (pq.size()) {
            auto [cost, k, t] = pq.top(); pq.pop(); 
            if (k == passingFees.size()-1) return cost; 
            for (auto& [kk, tt] : graph[k]) {
                if (t + tt <= maxTime && (!dist.count(kk) || t + tt < dist[kk])) {
                    dist[kk] = t + tt; 
                    pq.push({cost + passingFees[kk], kk, t + tt}); 
                }
            }
        }
        return -1; 
    }


    /*1929. Concatenation of Array (Easy)
	Given an integer array nums of length n, you want to create an array ans of 
	length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n 
	(0-indexed). Specifically, ans is the concatenation of two nums arrays. 
	Return the array ans.

	Example 1:
	Input: nums = [1,2,1]
	Output: [1,2,1,1,2,1]
	Explanation: The array ans is formed as follows:
	             - ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
	             - ans = [1,2,1,1,2,1]
	
	Example 2:
	Input: nums = [1,3,2,1]
	Output: [1,3,2,1,1,3,2,1]
	Explanation: The array ans is formed as follows:
	             - ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
	             - ans = [1,3,2,1,1,3,2,1]

	Constraints:
	* n == nums.length
	* 1 <= n <= 1000
	* 1 <= nums[i] <= 1000*/

    vector<int> getConcatenation(vector<int>& nums) {
        vector<int> ans; 
        for (int i = 0; i < 2*nums.size(); ++i) 
            ans.push_back(nums[i % nums.size()]); 
        return ans; 
    }


    /*1930. Unique Length-3 Palindromic Subsequences (Medium)
	Given a string s, return the number of unique palindromes of length three 
	that are a subsequence of s. Note that even if there are multiple ways to 
	obtain the same subsequence, it is still only counted once. A palindrome is 
	a string that reads the same forwards and backwards. A subsequence of a 
	string is a new string generated from the original string with some 
	characters (can be none) deleted without changing the relative order of the 
	remaining characters. For example, "ace" is a subsequence of "abcde".

	Example 1:
	Input: s = "aabca"
	Output: 3
	Explanation: The 3 palindromic subsequences of length 3 are:
	             - "aba" (subsequence of "aabca")
	             - "aaa" (subsequence of "aabca")
	             - "aca" (subsequence of "aabca")
	
	Example 2:
	Input: s = "adc"
	Output: 0
	Explanation: There are no palindromic subsequences of length 3 in "adc".

	Example 3:
	Input: s = "bbcbaba"
	Output: 4
	Explanation: The 4 palindromic subsequences of length 3 are:
	             - "bbb" (subsequence of "bbcbaba")
	             - "bcb" (subsequence of "bbcbaba")
	             - "bab" (subsequence of "bbcbaba")
	             - "aba" (subsequence of "bbcbaba")

	Constraints:
	* 3 <= s.length <= 10^5
	* s consists of only lowercase English letters.*/

    int countPalindromicSubsequence(string s) {
        unordered_map<char, vector<int>> locs; 
        for (int i = 0; i < s.size(); ++i) locs[s[i]].push_back(i); 
        
        int ans = 0; 
        string ascii_lowercase = "abcdefghijklmnopqrstuvwxyz"; 
        for (auto& c : ascii_lowercase) 
            if (locs[c].size() > 1) {
                if (locs[c].size() > 2) ++ans; 
                for (auto& cc : ascii_lowercase) 
                    if (c != cc) {
                        auto lo = lower_bound(locs[cc].begin(), locs[cc].end(), locs[c].front()); 
                        auto hi = lower_bound(locs[cc].begin(), locs[cc].end(), locs[c].back()); 
                        if (lo != hi) ++ans; 
                    }
            }
        return ans; 
    }


    /*1931. Painting a Grid With Three Different Colors (Hard)
	You are given two integers m and n. Consider an m x n grid where each cell 
	is initially white. You can paint each cell red, green, or blue. All cells 
	must be painted. Return the number of ways to color the grid with no two 
	adjacent cells having the same color. Since the answer can be very large, 
	return it modulo 10^9 + 7.

	Example 1:
	Input: m = 1, n = 1
	Output: 3
	Explanation: The three possible colorings are shown in the image above.

	Example 2:
	Input: m = 1, n = 2
	Output: 6
	Explanation: The six possible colorings are shown in the image above.

	Example 3:
	Input: m = 5, n = 5
	Output: 580986

	Constraints:
	* 1 <= m <= 5
	* 1 <= n <= 1000*/

    int colorTheGrid(int m, int n) {
        long memo[m][n][1<<2*m]; 
        memset(memo, 0, sizeof(memo));
        
        function<long(int, int, int)> fn = [&](int i, int j, int mask) {
            if (j == n) return 1l; 
            if (i == m) return fn(0, j+1, mask); 
            if (!memo[i][j][mask]) 
                for (const int& x : {1<<(2*i), 1<<(2*i+1), 3<<(2*i)}) {
                    int mask0 = mask ^ x; 
                    if ((mask0 & 3<<2*i) != 0 && (i == 0 || (mask0>>2*i & 3) != (mask0>>2*i-2 & 3))) {
                        memo[i][j][mask] = (memo[i][j][mask] + fn(i+1, j, mask0)) % 1'000'000'007; 
                    }
                }
            return memo[i][j][mask]; 
        };
        
        return fn(0, 0, 0); 
    }


    /*1932. Merge BSTs to Create Single BST (Hard)
	You are given n BST (binary search tree) root nodes for n separate BSTs 
	stored in an array trees (0-indexed). Each BST in trees has at most 3 nodes, 
	and no two roots have the same value. In one operation, you can:
	* Select two distinct indices i and j such that the value stored at one of 
	  the leaves of trees[i] is equal to the root value of trees[j].
	* Replace the leaf node in trees[i] with trees[j].
	* Remove trees[j] from trees.
	Return the root of the resulting BST if it is possible to form a valid BST 
	after performing n - 1 operations, or null if it is impossible to create a 
	valid BST. A BST (binary search tree) is a binary tree where each node 
	satisfies the following property:
	* Every node in the node's left subtree has a value strictly less than the 
	  node's value.
	* Every node in the node's right subtree has a value strictly greater than 
	  the node's value.
	A leaf is a node that has no children.

	Example 1:
	Input: trees = [[2,1],[3,2,5],[5,4]]
	Output: [3,2,5,1,null,4]
	Explanation: In the first operation, pick i=1 and j=0, and merge trees[0] 
	             into trees[1]. Delete trees[0], so trees = [[3,2,5,1],[5,4]].
 	             In the second operation, pick i=0 and j=1, and merge trees[1] 
 	             into trees[0]. Delete trees[1], so trees = [[3,2,5,1,null,4]].
	             The resulting tree, shown above, is a valid BST, so return its 
	             root.
	
	Example 2:
	Input: trees = [[5,3,8],[3,2,6]]
	Output: []
	Explanation: Pick i=0 and j=1 and merge trees[1] into trees[0]. Delete 
	             trees[1], so trees = [[5,3,8,2,6]]. The resulting tree is 
	             shown above. This is the only valid operation that can be 
	             performed, but the resulting tree is not a valid BST, so 
	             return null.
	
	Example 3:
	Input: trees = [[5,4],[3]]
	Output: []
	Explanation: It is impossible to perform any operations.

	Example 4:
	Input: trees = [[2,1,3]]
	Output: [2,1,3]
	Explanation: There is only one tree, and it is already a valid BST, so 
	             return its root.

	Constraints:
	* n == trees.length
	* 1 <= n <= 5 * 10^4
	* The number of nodes in each tree is in the range [1, 3].
	* Each node in the input may have children but no grandchildren.
	* No two roots of trees have the same value.
	* All the trees in the input are valid BSTs.
	* 1 <= TreeNode.val <= 5 * 10^4.*/

    TreeNode* canMerge(vector<TreeNode*>& trees) {
        unordered_map<int, int> freq; 
        stack<TreeNode*> stk; 
        
        for (auto& tree : trees) {
            stk.push(tree); 
            while (stk.size()) {
                TreeNode* node = stk.top(); stk.pop(); 
                if (node) {
                    ++freq[node->val]; 
                    stk.push(node->left); 
                    stk.push(node->right); 
                }
            }
        }
        
        int cnt = 0; 
        TreeNode* root = NULL; 
        unordered_map<int, TreeNode*> mp; 
        
        for (auto& tree : trees) {
            mp[tree->val] = tree; 
            if (freq[tree->val] & 1) {
                ++cnt; 
                root = tree; 
            }
        }
        
        if (cnt != 1) return NULL; 
        
        stk.push(root); 
        int total = trees.size(); 
        while (stk.size()) {
            TreeNode* node = stk.top(); stk.pop(); 
            if (node->left && !node->left->left && !node->left->right && mp.count(node->left->val)) {
                node->left = mp[node->left->val]; 
                --total; 
            }
            if (node->right && !node->right->left && !node->right->right && mp.count(node->right->val)) {
                node->right = mp[node->right->val]; 
                --total; 
            }
            if (node->left) stk.push(node->left); 
            if (node->right) stk.push(node->right); 
        }
        
        if (total != 1) return NULL; 
        
        int prev = INT_MIN; 
        TreeNode* node = root; 
        while (stk.size() || node) {
            if (node) {
                stk.push(node); 
                node = node->left; 
            } else {
                node = stk.top(); stk.pop(); 
                if (prev >= node->val) return NULL; 
                prev = node->val; 
                node = node->right; 
            }
        }
        return root; 
    }


    /*1933. Check if String Is Decomposable Into Value-Equal Substrings (Easy)
	A value-equal string is a string where all characters are the same. 
	* For example, "1111" and "33" are value-equal strings.
	* In contrast, "123" is not a value-equal string.
	Given a digit string s, decompose the string into some number of 
	consecutive value-equal substrings where exactly one substring has a length 
	of 2 and the remaining substrings have a length of 3. Return true if you 
	can decompose s according to the above rules. Otherwise, return false. A 
	substring is a contiguous sequence of characters in a string.

	Example 1:
	Input: s = "000111000"
	Output: false
	Explanation: s cannot be decomposed according to the rules because 
	             ["000", "111", "000"] does not have a substring of length 2.
	
	Example 2:
	Input: s = "00011111222"
	Output: true
	Explanation: s can be decomposed into ["000", "111", "11", "222"].

	Example 3:
	Input: s = "011100022233"
	Output: false
	Explanation: s cannot be decomposed according to the rules because of the 
	             first '0'.

	Constraints:
	* 1 <= s.length <= 1000
	* s consists of only digits '0' through '9'.*/

    bool isDecomposable(string s) {
        int ii = 0, found = 0; 
        for (int i = 0; i <= s.size(); ++i) 
            if (i == s.size() || (i and s[i-1] != s[i])) {
                int r = (i - ii) % 3; 
                ii = i; 
                if (r == 2 && not found) found = 1; 
                else if (r) return false; 
            }
        return found; 
    }


    /*1935. Maximum Number of Words You Can Type (Easy)
	There is a malfunctioning keyboard where some letter keys do not work. All 
	other keys on the keyboard work properly. Given a string text of words 
	separated by a single space (no leading or trailing spaces) and a string 
	brokenLetters of all distinct letter keys that are broken, return the 
	number of words in text you can fully type using this keyboard.

	Example 1:
	Input: text = "hello world", brokenLetters = "ad"
	Output: 1
	Explanation: We cannot type "world" because the 'd' key is broken.

	Example 2:
	Input: text = "leet code", brokenLetters = "lt"
	Output: 1
	Explanation: We cannot type "leet" because the 'l' and 't' keys are broken.

	Example 3:
	Input: text = "leet code", brokenLetters = "e"
	Output: 0
	Explanation: We cannot type either word because the 'e' key is broken.

	Constraints:
	* 1 <= text.length <= 10^4
	* 0 <= brokenLetters.length <= 26
	* text consists of words separated by a single space without any leading or 
	  trailing spaces.
	* Each word only consists of lowercase English letters.
	* brokenLetters consists of distinct lowercase English letters.*/

    int canBeTypedWords(string text, string brokenLetters) {
        unordered_set<char> broken(brokenLetters.begin(), brokenLetters.end()); 
        int ans = 0; 
        string word; 
        istringstream iss(text); 
        while (iss >> word) {
            bool found = false; 
            for (auto& ch : word) 
                if (broken.count(ch)) found = true; 
            if (!found) ++ans; 
        }
        return ans; 
    }


    /*1936. Add Minimum Number of Rungs (Medium)
	You are given a strictly increasing integer array rungs that represents the 
	height of rungs on a ladder. You are currently on the floor at height 0, 
	and you want to reach the last rung. You are also given an integer dist. 
	You can only climb to the next highest rung if the distance between where 
	you are currently at (the floor or on a rung) and the next rung is at most 
	dist. You are able to insert rungs at any positive integer height if a rung 
	is not already there. Return the minimum number of rungs that must be added 
	to the ladder in order for you to climb to the last rung.

	Example 1:
	Input: rungs = [1,3,5,10], dist = 2
	Output: 2
	Explanation: You currently cannot reach the last rung. Add rungs at heights 
	             7 and 8 to climb this ladder. The ladder will now have rungs 
	             at [1,3,5,7,8,10].
	
	Example 2:
	Input: rungs = [3,6,8,10], dist = 3
	Output: 0
	Explanation: This ladder can be climbed without adding additional rungs.
	
	Example 3:
	Input: rungs = [3,4,6,7], dist = 2
	Output: 1
	Explanation: You currently cannot reach the first rung from the ground. Add 
	             a rung at height 1 to climb this ladder. The ladder will now 
	             have rungs at [1,3,4,6,7].
	
	Example 4:
	Input: rungs = [5], dist = 10
	Output: 0
	Explanation: This ladder can be climbed without adding additional rungs.

	Constraints:
	* 1 <= rungs.length <= 10^5
	* 1 <= rungs[i] <= 10^9
	* 1 <= dist <= 10^9
	* rungs is strictly increasing.*/

    int addRungs(vector<int>& rungs, int dist) {
        int ans = 0, prev = 0; 
        for (auto& x : rungs) {
            ans += (x - prev - 1)/dist; 
            prev = x; 
        }
        return ans; 
    }


    /*1937. Maximum Number of Points with Cost (Medium)
	You are given an m x n integer matrix points (0-indexed). Starting with 0 
	points, you want to maximize the number of points you can get from the 
	matrix. To gain points, you must pick one cell in each row. Picking the 
	cell at coordinates (r, c) will add points[r][c] to your score. However, 
	you will lose points if you pick a cell too far from the cell that you 
	picked in the previous row. For every two adjacent rows r and r + 1 (where 
	0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will 
	subtract abs(c1 - c2) from your score. Return the maximum number of points 
	you can achieve. abs(x) is defined as:
	* x for x >= 0.
	* -x for x < 0.

	Example 1:
	Input: points = [[1,2,3],[1,5,1],[3,1,1]]
	Output: 9
	Explanation: The blue cells denote the optimal cells to pick, which have 
	             coordinates (0, 2), (1, 1), and (2, 0). You add 3 + 5 + 3 = 11 
	             to your score. However, you must subtract 
	             abs(2 - 1) + abs(1 - 0) = 2 from your score. Your final score 
	             is 11 - 2 = 9.
	
	Example 2:
	Input: points = [[1,5],[2,3],[4,2]]
	Output: 11
	Explanation: The blue cells denote the optimal cells to pick, which have 
	             coordinates (0, 1), (1, 1), and (2, 0). You add 5 + 3 + 4 = 12 
	             to your score. However, you must subtract 
	             abs(1 - 1) + abs(1 - 0) = 1 from your score. Your final score 
	             is 12 - 1 = 11.

	Constraints:
	* m == points.length
	* n == points[r].length
	* 1 <= m, n <= 10^5
	* 1 <= m * n <= 10^5
	* 0 <= points[r][c] <= 10^5*/

    long long maxPoints(vector<vector<int>>& points) {
        int m = points.size(), n = points[0].size(); 
        vector<vector<long>> dp(m, vector<long>(n, 0)); 
        for (int j = 0; j < n; ++j) dp[0][j] = points[0][j]; 
        
        for (int i = 1; i < m; ++i) {
            for (int j = n-2; j >= 0; --j) 
                dp[i-1][j] = max(dp[i-1][j], dp[i-1][j+1]-1); 
            
            long prefix = 0; 
            for (int j = 0; j < n; ++j) {
                dp[i][j] = points[i][j] + max(prefix, dp[i-1][j]); 
                prefix = max(prefix, dp[i-1][j]) - 1; 
            }
        }
        return *max_element(dp[m-1].begin(), dp[m-1].end()); 
    }


    /*1938. Maximum Genetic Difference Query (Hard)
	There is a rooted tree consisting of n nodes numbered 0 to n - 1. Each 
	node's number denotes its unique genetic value (i.e. the genetic value of 
	node x is x). The genetic difference between two genetic values is defined 
	as the bitwise-XOR of their values. You are given the integer array parents, 
	where parents[i] is the parent for node i. If node x is the root of the 
	tree, then parents[x] == -1. You are also given the array queries where 
	queries[i] = [nodei, vali]. For each query i, find the maximum genetic 
	difference between vali and pi, where pi is the genetic value of any node 
	that is on the path between nodei and the root (including nodei and the 
	root). More formally, you want to maximize vali XOR pi. Return an array ans 
	where ans[i] is the answer to the ith query.

	Example 1:
	Input: parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
	Output: [2,3,7]
	Explanation: The queries are processed as follows:
	- [0,2]: The node with the maximum genetic difference is 0, with a difference of 2 XOR 0 = 2.
	- [3,2]: The node with the maximum genetic difference is 1, with a difference of 2 XOR 1 = 3.
	- [2,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.

	Example 2:
	Input: parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
	Output: [6,14,7]
	Explanation: The queries are processed as follows:
	- [4,6]: The node with the maximum genetic difference is 0, with a difference of 6 XOR 0 = 6.
	- [1,15]: The node with the maximum genetic difference is 1, with a difference of 15 XOR 1 = 14.
	- [0,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.

	Constraints:
	* 2 <= parents.length <= 10^5
	* 0 <= parents[i] <= parents.length - 1 for every node i that is not the root.
	* parents[root] == -1
	* 1 <= queries.length <= 3 * 10^4
	* 0 <= nodei <= parents.length - 1
	* 0 <= vali <= 2 * 10^5

class TrieNode {
    TrieNode* child[2] = {}; 
    int mult = 0; 
    int val = -1; 
friend class Trie; 
};

class Trie {
    TrieNode* root; 
public: 
    Trie() { root = new TrieNode(); }
    void insert(int val) {
        TrieNode* node = root; 
        for (int i = 18; i >= 0; --i) {
            int bit = (val >> i) & 1; 
            if (!node->child[bit]) node->child[bit] = new TrieNode(); 
            node = node->child[bit]; 
            node->mult += 1; 
        }
        node->val = val; 
    }
    
    int search(int val) {
        TrieNode* node = root; 
        for (int i = 18; i >= 0; --i) {
            int bit = (val >> i) & 1; 
            if (node->child[1^bit]) node = node->child[1^bit]; 
            else node = node->child[bit]; 
        }
        return val ^ node->val; 
    }
    
    void remove(int val) {
        TrieNode* node = root; 
        for (int i = 18; i >= 0; --i) {
            int bit = (val >> i) & 1; 
            --node->child[bit]->mult; 
            if (node->child[bit]->mult == 0) {
                delete node->child[bit]; 
                node->child[bit] = nullptr; 
                break; 
            }
            node = node->child[bit]; 
        }
    }
};*/

    vector<int> maxGeneticDifference(vector<int>& parents, vector<vector<int>>& queries) {
        int root = -1; 
        unordered_map<int, vector<int>> tree; 
        
        for (int i = 0; i < parents.size(); ++i) {
            if (parents[i] == -1) root = i; 
            else tree[parents[i]].push_back(i); 
        }
        
        unordered_map<int, vector<pair<int, int>>> mp; 
        for (int i = 0; i < queries.size(); ++i) {
            int node = queries[i][0], val = queries[i][1]; 
            mp[node].emplace_back(val, i); 
        }
        
        vector<int> ans(queries.size(), 0); 
        Trie* trie = new Trie(); 
        
        function<void(int)> fn = [&](int x) {
            trie->insert(x); 
            for (auto& [v, i] : mp[x]) ans[i] = trie->search(v); 
            for (auto& xx : tree[x]) fn(xx); 
            trie->remove(x); 
        }; 
    
        fn(root); 
        return ans; 
    }


    /*1940. Longest Common Subsequence Between Sorted Arrays (Medium)
	Given an array of integer arrays arrays where each arrays[i] is sorted in 
	strictly increasing order, return an integer array representing the longest 
	common subsequence between all the arrays. A subsequence is a sequence that 
	can be derived from another sequence by deleting some elements (possibly 
	none) without changing the order of the remaining elements.

	Example 1:
	Input: arrays = [[1,3,4],
	                 [1,4,7,9]]
	Output: [1,4]
	Explanation: The longest common subsequence in the two arrays is [1,4].

	Example 2:
	Input: arrays = [[2,3,6,8],
	                 [1,2,3,5,6,7,10],
	                 [2,3,4,6,9]]
	Output: [2,3,6]
	Explanation: The longest common subsequence in all three arrays is [2,3,6].

	Example 3:
	Input: arrays = [[1,2,3,4,5],
	                 [6,7,8]]
	Output: []
	Explanation: There is no common subsequence between the two arrays.

	Constraints:
	* 2 <= arrays.length <= 100
	* 1 <= arrays[i].length <= 100
	* 1 <= arrays[i][j] <= 100
	* arrays[i] is sorted in strictly increasing order.*/

    vector<int> longestCommomSubsequence(vector<vector<int>>& arrays) {
        vector<int> ans; 
        unordered_map<int, int> freq; 
        for (auto& array : arrays) 
            for (auto& x : array) 
                if (++freq[x] == arrays.size()) ans.push_back(x); 
        return ans; 
    }


    /*1941. Check if All Characters Have Equal Number of Occurrences (Easy)
	Given a string s, return true if s is a good string, or false otherwise. A 
	string s is good if all the characters that appear in s have the same 
	number of occurrences (i.e., the same frequency).

	Example 1:
	Input: s = "abacbc"
	Output: true
	Explanation: The characters that appear in s are 'a', 'b', and 'c'. All 
	             characters occur 2 times in s.
	
	Example 2:
	Input: s = "aaabb"
	Output: false
	Explanation: The characters that appear in s are 'a' and 'b'. 'a' occurs 3 
	             times while 'b' occurs 2 times, which is not the same number 
	             of times.

	Constraints:
	* 1 <= s.length <= 1000
	* s consists of lowercase English letters.*/

    bool areOccurrencesEqual(string s) {
        unordered_map<char, int> freq; 
        for (auto& ch : s) ++freq[ch]; 
        
        int prev = 0; 
        for (auto& [k, v] : freq) {
            if (!prev) prev = v; 
            else if (prev != v) return false; 
        }
        return true; 
    }


    /*1942. The Number of the Smallest Unoccupied Chair (Medium)
	There is a party where n friends numbered from 0 to n - 1 are attending. 
	There is an infinite number of chairs in this party that are numbered from 
	0 to infinity. When a friend arrives at the party, they sit on the 
	unoccupied chair with the smallest number. For example, if chairs 0, 1, and 
	5 are occupied when a friend comes, they will sit on chair number 2. When a 
	friend leaves the party, their chair becomes unoccupied at the moment they 
	leave. If another friend arrives at that same moment, they can sit in that 
	chair. You are given a 0-indexed 2D integer array times where 
	times[i] = [arrivali, leavingi], indicating the arrival and leaving times 
	of the ith friend respectively, and an integer targetFriend. All arrival 
	times are distinct. Return the chair number that the friend numbered 
	targetFriend will sit on.

	Example 1:
	Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
	Output: 1
	Explanation: - Friend 0 arrives at time 1 and sits on chair 0.
	             - Friend 1 arrives at time 2 and sits on chair 1.
	             - Friend 1 leaves at time 3 and chair 1 becomes empty.
	             - Friend 0 leaves at time 4 and chair 0 becomes empty.
	             - Friend 2 arrives at time 4 and sits on chair 0.
	             Since friend 1 sat on chair 1, we return 1.
	
	Example 2:
	Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
	Output: 2
	Explanation: - Friend 1 arrives at time 1 and sits on chair 0.
	             - Friend 2 arrives at time 2 and sits on chair 1.
	             - Friend 0 arrives at time 3 and sits on chair 2.
	             - Friend 1 leaves at time 5 and chair 0 becomes empty.
	             - Friend 2 leaves at time 6 and chair 1 becomes empty.
	             - Friend 0 leaves at time 10 and chair 2 becomes empty.
	             Since friend 0 sat on chair 2, we return 2.

	Constraints:
	* n == times.length
	* 2 <= n <= 10^4
	* times[i].length == 2
	* 1 <= arrivali < leavingi <= 10^5
	* 0 <= targetFriend <= n - 1
	* Each arrivali time is distinct.*/

    int smallestChair(vector<vector<int>>& times, int targetFriend) {
        vector<vector<int>> vals; 
        for (int i = 0; i < times.size(); ++i) {
            vals.push_back({times[i][0], 1, i}); 
            vals.push_back({times[i][1], 0, i}); 
        }
        sort(vals.begin(), vals.end()); 
        
        int k = 0; 
        priority_queue<int, vector<int>, greater<>> pq; 
        unordered_map<int, int> mp; 
        
        for (auto& val : vals) {
            int i = val[2], s = 0; 
            if (val[1]) {
                if (pq.size()) {
                    s = pq.top(); pq.pop(); 
                } else 
                    s = k++; 
                if (i == targetFriend) return s; 
                mp[i] = s; 
            } else 
                pq.push(mp[i]); 
        }
        return -1; 
    }


    /*1943. Describe the Painting (Medium)
	There is a long and thin painting that can be represented by a number line. 
	The painting was painted with multiple overlapping segments where each 
	segment was painted with a unique color. You are given a 2D integer array 
	segments, where segments[i] = [starti, endi, colori] represents the half-
	closed segment [starti, endi) with colori as the color. The colors in the 
	overlapping segments of the painting were mixed when it was painted. When 
	two or more colors mix, they form a new color that can be represented as a 
	set of mixed colors.

	* For example, if colors 2, 4, and 6 are mixed, then the resulting mixed 
	  color is {2,4,6}.
	For the sake of simplicity, you should only output the sum of the elements 
	in the set rather than the full set. You want to describe the painting with 
	the minimum number of non-overlapping half-closed segments of these mixed 
	colors. These segments can be represented by the 2D array painting where 
	painting[j] = [leftj, rightj, mixj] describes a half-closed segment 
	[leftj, rightj) with the mixed color sum of mixj.

	* For example, the painting created with segments = [[1,4,5],[1,7,7]] can 
	  be described by painting = [[1,4,12],[4,7,7]] because:
	  + [1,4) is colored {5,7} (with a sum of 12) from both the first and 
	    second segments.
	  + [4,7) is colored {7} from only the second segment.
	Return the 2D array painting describing the finished painting (excluding 
	any parts that are not painted). You may return the segments in any order.
	A half-closed segment [a, b) is the section of the number line between 
	points a and b including point a and not including point b.

	Example 1:
	Input: segments = [[1,4,5],[4,7,7],[1,7,9]]
	Output: [[1,4,14],[4,7,16]]
	Explanation: The painting can be described as follows:
	             - [1,4) is colored {5,9} (with a sum of 14) from the first and third segments.
	             - [4,7) is colored {7,9} (with a sum of 16) from the second and third segments.
	
	Example 2:
	Input: segments = [[1,7,9],[6,8,15],[8,10,7]]
	Output: [[1,6,9],[6,7,24],[7,8,15],[8,10,7]]
	Explanation: The painting can be described as follows:
	             - [1,6) is colored 9 from the first segment.
	             - [6,7) is colored {9,15} (with a sum of 24) from the first and second segments.
	             - [7,8) is colored 15 from the second segment.
	             - [8,10) is colored 7 from the third segment.
	
	Example 3:
	Input: segments = [[1,4,5],[1,4,7],[4,7,1],[4,7,11]]
	Output: [[1,4,12],[4,7,12]]
	Explanation: The painting can be described as follows:
	             - [1,4) is colored {5,7} (with a sum of 12) from the first and second segments.
	             - [4,7) is colored {1,11} (with a sum of 12) from the third and fourth segments.
	             Note that returning a single segment [1,7) is incorrect 
	             because the mixed color sets are different.

	Constraints:
	* 1 <= segments.length <= 2 * 10^4
	* segments[i].length == 3
	* 1 <= starti < endi <= 10^5
	* 1 <= colori <= 10^9
	* Each colori is distinct.*/

    vector<vector<long long>> splitPainting(vector<vector<int>>& segments) {
        vector<vector<int>> vals; 
        for (auto& segment : segments) {
            vals.push_back({segment[0],  segment[2]}); 
            vals.push_back({segment[1], -segment[2]}); 
        }
        sort(vals.begin(), vals.end()); 
        
        int prev = 0; 
        long long prefix = 0; 
        vector<vector<long long>> ans; 
        
        for (auto& val : vals) {
            if (prev < val[0] && prefix) ans.push_back({prev, val[0], prefix}); 
            prev = val[0]; 
            prefix += val[1]; 
        }
        return ans; 
    }


    /*1944. Number of Visible People in a Queue (Hard)
	There are n people standing in a queue, and they numbered from 0 to n - 1 
	in left to right order. You are given an array heights of distinct integers 
	where heights[i] represents the height of the ith person. A person can see 
	another person to their right in the queue if everybody in between is 
	shorter than both of them. More formally, the ith person can see the jth 
	person if 
	* i < j and 
	* min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1]).
	Return an array answer of length n where answer[i] is the number of people 
	the ith person can see to their right in the queue.

	Example 1:
	Input: heights = [10,6,8,5,11,9]
	Output: [3,1,2,1,1,0]
	Explanation: Person 0 can see person 1, 2, and 4.
	             Person 1 can see person 2.
	             Person 2 can see person 3 and 4.
	             Person 3 can see person 4.
	             Person 4 can see person 5.
	             Person 5 can see no one since nobody is to the right of them.
	
	Example 2:
	Input: heights = [5,1,2,3,10]
	Output: [4,1,1,1,0]

	Constraints:
	* n == heights.length
	* 1 <= n <= 10^5
	* 1 <= heights[i] <= 10^5
	* All the values of heights are unique.*/

    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size(); 
        vector<int> ans(n); 
        stack<int> stk; 
        for (int i = n-1; i >= 0; --i) {
            while (stk.size() && stk.top() <= heights[i]) {
                ++ans[i]; 
                stk.pop(); 
            }
            if (stk.size()) ++ans[i]; 
            stk.push(heights[i]); 
        }
        return ans; 
    }


    /*1945. Sum of Digits of String After Convert (Easy)
	You are given a string s consisting of lowercase English letters, and an 
	integer k. First, convert s into an integer by replacing each letter with 
	its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 
	'z' with 26). Then, transform the integer by replacing it with the sum of 
	its digits. Repeat the transform operation k times in total. For example, 
	if s = "zbax" and k = 2, then the resulting integer would be 8 by the 
	following operations:
	* Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
	* Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
	* Transform #2: 17 ➝ 1 + 7 ➝ 8
	Return the resulting integer after performing the operations described 
	above.

	Example 1:
	Input: s = "iiii", k = 1
	Output: 36
	Explanation: The operations are as follows:
	             - Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
	             - Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
	             Thus the resulting integer is 36.
	
	Example 2:
	Input: s = "leetcode", k = 2
	Output: 6
	Explanation: The operations are as follows:
	             - Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
	             - Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
	             - Transform #2: 33 ➝ 3 + 3 ➝ 6
	             Thus the resulting integer is 6.
	
	Example 3:
	Input: s = "zbax", k = 2
	Output: 8

	Constraints:
	* 1 <= s.length <= 100
	* 1 <= k <= 10
	* s consists of lowercase English letters.*/

    int getLucky(string s, int k) {
        int ans = 0; 
        for (auto& ch : s) {
            int x = ch - 'a' + 1; 
            ans += x/10 + x%10; 
        }
        
        while (--k) {
            int sm = 0; 
            for (; ans; ans /= 10) sm += ans % 10; 
            ans = sm; 
        }
        return ans; 
    }


    /*1946. Largest Number After Mutating Substring (Medium)
	You are given a string num, which represents a large integer. You are also 
	given a 0-indexed integer array change of length 10 that maps each digit 
	0-9 to another digit. More formally, digit d maps to digit change[d]. You 
	may choose to mutate any substring of num. To mutate a substring, replace 
	each digit num[i] with the digit it maps to in change (i.e. replace num[i] 
	with change[num[i]]). Return a string representing the largest possible 
	integer after mutating (or choosing not to) any substring of num. A 
	substring is a contiguous sequence of characters within the string.

	Example 1:
	Input: num = "132", change = [9,8,5,0,3,6,4,2,6,8]
	Output: "832"
	Explanation: Replace the substring "1":
	             - 1 maps to change[1] = 8.
	             Thus, "132" becomes "832". "832" is the largest number that 
	             can be created, so return it.
	
	Example 2:
	Input: num = "021", change = [9,4,3,5,7,2,1,9,0,6]
	Output: "934"
	Explanation: Replace the substring "021":
	             - 0 maps to change[0] = 9.
	             - 2 maps to change[2] = 3.
	             - 1 maps to change[1] = 4.
	             Thus, "021" becomes "934". "934" is the largest number that 
	             can be created, so return it.
	
	Example 3:
	Input: num = "5", change = [1,4,7,5,3,2,5,6,9,4]
	Output: "5"
	Explanation: "5" is already the largest number that can be created, so 
	             return it.

	Constraints:
	* 1 <= num.length <= 10^5
	* num consists of only digits 0-9.
	* change.length == 10
	* 0 <= change[d] <= 9*/

    string maximumNumber(string num, vector<int>& change) {
        bool on = false; 
        for (int i = 0; i < num.size(); ++i) {
            int x = num[i] - '0'; 
            if (x < change[x]) {
                on = true; 
                num[i] = change[x] + '0'; 
            } else if (x > change[x] && on) break; 
        }
        return num; 
    }


    /*1947. Maximum Compatibility Score Sum (Medium)
	There is a survey that consists of n questions where each question's answer 
	is either 0 (no) or 1 (yes). The survey was given to m students numbered 
	from 0 to m - 1 and m mentors numbered from 0 to m - 1. The answers of the 
	students are represented by a 2D integer array students where students[i] 
	is an integer array that contains the answers of the ith student (0-indexed). 
	The answers of the mentors are represented by a 2D integer array mentors 
	where mentors[j] is an integer array that contains the answers of the jth 
	mentor (0-indexed). Each student will be assigned to one mentor, and each 
	mentor will have one student assigned to them. The compatibility score of a 
	student-mentor pair is the number of answers that are the same for both the 
	student and the mentor.

	* For example, if the student's answers were [1, 0, 1] and the mentor's 
	  answers were [0, 0, 1], then their compatibility score is 2 because only 
	  the second and the third answers are the same.
	You are tasked with finding the optimal student-mentor pairings to maximize 
	the sum of the compatibility scores. Given students and mentors, return the 
	maximum compatibility score sum that can be achieved.

	Example 1:
	Input: students = [[1,1,0],[1,0,1],[0,0,1]], 
	       mentors = [[1,0,0],[0,0,1],[1,1,0]]
	Output: 8
	Explanation: We assign students to mentors in the following way:
	             - student 0 to mentor 2 with a compatibility score of 3.
	             - student 1 to mentor 0 with a compatibility score of 2.
	             - student 2 to mentor 1 with a compatibility score of 3.
	             The compatibility score sum is 3 + 2 + 3 = 8.
	
	Example 2:
	Input: students = [[0,0],[0,0],[0,0]], 
	       mentors = [[1,1],[1,1],[1,1]]
	Output: 0
	Explanation: The compatibility score of any student-mentor pair is 0.

	Constraints:
	* m == students.length == mentors.length
	* n == students[i].length == mentors[j].length
	* 1 <= m, n <= 8
	* students[i][k] is either 0 or 1.
	* mentors[j][k] is either 0 or 1.*/

    int maxCompatibilitySum(vector<vector<int>>& students, vector<vector<int>>& mentors) {
        int m = students.size(), n = students[0].size(); 
        vector<vector<int>> score(m, vector<int>(m)); 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < m; ++j) 
                for (int k = 0; k < n; ++k) 
                    if (students[i][k] == mentors[j][k]) ++score[i][j]; 
        
        vector<int> dp(1 << m); 
        for (int mask = 0; mask < (1 << m); ++mask) {
            int i = __builtin_popcount(mask); 
            for (int j = 0; j < m; ++j) 
                if (!(mask & (1 << j))) 
                    dp[mask^(1 << j)] = max(dp[mask^(1 << j)], dp[mask] + score[i][j]); 
        }
        return dp.back(); 
    }


    /*1948. Delete Duplicate Folders in System (Hard)
	Due to a bug, there are many duplicate folders in a file system. You are 
	given a 2D array paths, where paths[i] is an array representing an absolute 
	path to the ith folder in the file system.

	* For example, ["one", "two", "three"] represents the path "/one/two/three".
	Two folders (not necessarily on the same level) are identical if they 
	contain the same non-empty set of identical subfolders and underlying 
	subfolder structure. The folders do not need to be at the root level to be 
	identical. If two or more folders are identical, then mark the folders as 
	well as all their subfolders.

	* For example, folders "/a" and "/b" in the file structure below are 
	  identical. They (as well as their subfolders) should all be marked:
	  - /a
	  - /a/x
	  - /a/x/y
	  - /a/z
	  - /b
	  - /b/x
	  - /b/x/y
	  - /b/z
	* However, if the file structure also included the path "/b/w", then the 
	  folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" 
	  would still be considered identical even with the added folder.
	Once all the identical folders and their subfolders have been marked, the 
	file system will delete all of them. The file system only runs the deletion 
	once, so any folders that become identical after the initial deletion are 
	not deleted. Return the 2D array ans containing the paths of the remaining 
	folders after deleting all the marked folders. The paths may be returned in 
	any order.

	Example 1:
	Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
	Output: [["d"],["d","a"]]
	Explanation: Folders "/a" and "/c" (and their subfolders) are marked for 
	             deletion because they both contain an empty folder named "b".
	
	Example 2:
	Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
	Output: [["c"],["c","b"],["a"],["a","b"]]
	Explanation: Folders "/a/b/x" and "/w" (and their subfolders) are marked 
	             for deletion because they both contain an empty folder named 
	             "y". Note that folders "/a" and "/c" are identical after the 
	             deletion, but they are not deleted because they were not 
	             marked beforehand.
	
	Example 3:
	Input: paths = [["a","b"],["c","d"],["c"],["a"]]
	Output: [["c"],["c","d"],["a"],["a","b"]]
	Explanation: All folders are unique in the file system. Note that the 
	             returned array can be in a different order as the order does 
	             not matter.
	
	Example 4:
	Input: paths = [["a"],["a","x"],["a","x","y"],["a","z"],["b"],["b","x"],["b","x","y"],["b","z"]]
	Output: []
	Explanation: Folders "/a/x" and "/b/x" (and their subfolders) are marked 
	             for deletion because they both contain an empty folder named 
	             "y". Folders "/a" and "/b" (and their subfolders) are marked 
	             for deletion because they both contain an empty folder "z" and 
	             the folder "x" described above.
	
	Example 5:
	Input: paths = [["a"],["a","x"],["a","x","y"],["a","z"],["b"],["b","x"],["b","x","y"],["b","z"],["b","w"]]
	Output: [["b"],["b","w"],["b","z"],["a"],["a","z"]]
	Explanation: This has the same structure as the previous example, except 
	             with the added "/b/w". Folders "/a/x" and "/b/x" are still 
	             marked, but "/a" and "/b" are no longer marked because "/b" 
	             has the empty folder named "w" and "/a" does not. Note that 
	             "/a/z" and "/b/z" are not marked because the set of identical 
	             subfolders must be non-empty, but these folders are empty.

	Constraints:
	* 1 <= paths.length <= 2 * 10^4
	* 1 <= paths[i].length <= 500
	* 1 <= paths[i][j].length <= 10
	* 1 <= sum(paths[i][j].length) <= 2 * 10^5
	* path[i][j] consists of lowercase English letters.
	* No two paths lead to the same folder.
	* For any folder not at the root level, its parent folder will also be in the input.

class Node {
public: 
    bool mark = false; 
    int index = -1; 
    unordered_map<string, Node*> next; 
};*/

    vector<vector<string>> deleteDuplicateFolder(vector<vector<string>>& paths) {
        sort(paths.begin(), paths.end());
        
        Node* tree = new Node(); 
        for (int i = 0; i < paths.size(); ++i) {
            Node* node = tree; 
            for (auto& x : paths[i]) {
                if (node->next.count(x) == 0) node->next[x] = new Node(); 
                node = node->next[x]; 
            }
            node->index = i; 
        }
        
        unordered_map<string, vector<int>> mp; 
        
        function<string(Node*)> fn = [&](Node* node) -> string {
            if (node->next.size() == 0) return "$"; 
            string ans; 
            for (auto& [k, nn] : node->next) 
                ans += "$" + k + "$" + fn(nn); 
            mp[ans].push_back(node->index); 
            return ans; 
        };
        
        fn(tree); 
        
        unordered_set<int> mark; 
        for (auto& [k, v] : mp) 
            if (v.size() > 1) 
                for (auto& vv : v) mark.insert(vv); 
        
        vector<vector<string>> ans; 
        stack<Node*> stk; 
        stk.push(tree); 
        
        while(stk.size()) {
            Node* node = stk.top(); stk.pop(); 
            if (node->index >= 0) ans.push_back(paths[node->index]); 
            for (auto& [k, nn] : node->next) {
                if (mark.find(nn->index) == mark.end()) 
                    stk.push(nn); 
            }
        }
        return ans; 
    }


    /*1950. Maximum of Minimum Values in All Subarrays (Medium)
	You are given an integer array nums of size n. You are asked to solve n 
	queries for each integer i in the range 0 <= i < n. To solve the ith query:
	* Find the minimum value in each possible subarray of size i + 1 of the 
	  array nums.
	* Find the maximum of those minimum values. This maximum is the answer to 
	  the query.
	Return a 0-indexed integer array ans of size n such that ans[i] is the 
	answer to the ith query. A subarray is a contiguous sequence of elements in 
	an array.

	Example 1:
	Input: nums = [0,1,2,4]
	Output: [4,2,1,0]
	Explanation: i=0:
	             - The subarrays of size 1 are [0], [1], [2], [4]. The minimum values are 0, 1, 2, 4.
	             - The maximum of the minimum values is 4.
	             i=1:
	             - The subarrays of size 2 are [0,1], [1,2], [2,4]. The minimum values are 0, 1, 2.
	             - The maximum of the minimum values is 2.
	             i=2:
	             - The subarrays of size 3 are [0,1,2], [1,2,4]. The minimum values are 0, 1.
	             - The maximum of the minimum values is 1.
	             i=3:
	             - There is one subarray of size 4, which is [0,1,2,4]. The minimum value is 0.
	             - There is only one value, so the maximum is 0.
	
	Example 2:
	Input: nums = [10,20,50,10]
	Output: [50,20,10,10]
	Explanation: i=0:
	             - The subarrays of size 1 are [10], [20], [50], [10]. The minimum values are 10, 20, 50, 10.
	             - The maximum of the minimum values is 50.
	             i=1:
	             - The subarrays of size 2 are [10,20], [20,50], [50,10]. The minimum values are 10, 20, 10.
	             - The maximum of the minimum values is 20.
	             i=2:
	             - The subarrays of size 3 are [10,20,50], [20,50,10]. The minimum values are 10, 10.
	             - The maximum of the minimum values is 10.
	             i=3:
	             - There is one subarray of size 4, which is [10,20,50,10]. The minimum value is 10.
	             - There is only one value, so the maximum is 10.

	Constraints:
	* n == nums.length
	* 1 <= n <= 10^5
	* 0 <= nums[i] <= 10^9*/

    vector<int> findMaximums(vector<int>& nums) {
        vector<int> ans(nums.size()), stk; 
        
        nums.push_back(0); 
        for (int i = 0; i < nums.size(); ++i) {
            while (stk.size() && nums[stk.back()] >= nums[i]) {
                int val = nums[stk.back()], k = i-1; 
                stk.pop_back(); 
                if (stk.size()) k = i-stk.back()-2; 
                ans[k] = max(ans[k], val); 
            }
            stk.push_back(i); 
        }
        for (int i = ans.size()-1; i; --i) ans[i-1] = max(ans[i-1], ans[i]); 
        return ans; 
    }


    /*1952. Three Divisors (Easy)
	Given an integer n, return true if n has exactly three positive divisors. 
	Otherwise, return false. An integer m is a divisor of n if there exists an 
	integer k such that n = k * m.

	Example 1:
	Input: n = 2
	Output: false
	Explantion: 2 has only two divisors: 1 and 2.

	Example 2:
	Input: n = 4
	Output: true
	Explantion: 4 has three divisors: 1, 2, and 4.

	Constraints: 1 <= n <= 10^4*/


    bool isThree(int n) {
        if (n == 1) return false; 
        int x = sqrt(n); 
        if (x*x != n) return false; 
        
        for (int i = 2; i <= sqrt(x); ++i) 
            if (x % i == 0) return false; 
        return true; 
    }


    /*1953. Maximum Number of Weeks for Which You Can Work (Medium)
	There are n projects numbered from 0 to n - 1. You are given an integer 
	array milestones where each milestones[i] denotes the number of milestones 
	the ith project has. You can work on the projects following these two rules:
	* Every week, you will finish exactly one milestone of one project. You 
	  must work every week.
	* You cannot work on two milestones from the same project for two 
	  consecutive weeks.
	Once all the milestones of all the projects are finished, or if the only 
	milestones that you can work on will cause you to violate the above rules, 
	you will stop working. Note that you may not be able to finish every 
	project's milestones due to these constraints. Return the maximum number of 
	weeks you would be able to work on the projects without violating the rules 
	mentioned above.

	Example 1:
	Input: milestones = [1,2,3]
	Output: 6
	Explanation: One possible scenario is:
	             - During the 1st week, you will work on a milestone of project 0.
	             - During the 2nd week, you will work on a milestone of project 2.
	             - During the 3rd week, you will work on a milestone of project 1.
	             - During the 4th week, you will work on a milestone of project 2.
	             - During the 5th week, you will work on a milestone of project 1.
	             - During the 6th week, you will work on a milestone of project 2.
	             The total number of weeks is 6.
	
	Example 2:
	Input: milestones = [5,2,1]
	Output: 7
	Explanation: One possible scenario is:
	             - During the 1st week, you will work on a milestone of project 0.
	             - During the 2nd week, you will work on a milestone of project 1.
	             - During the 3rd week, you will work on a milestone of project 0.
	             - During the 4th week, you will work on a milestone of project 1.
	             - During the 5th week, you will work on a milestone of project 0.
	             - During the 6th week, you will work on a milestone of project 2.
	             - During the 7th week, you will work on a milestone of project 0.
	             The total number of weeks is 7. Note that you cannot work on 
	             the last milestone of project 0 on 8th week because it would 
	             violate the rules. Thus, one milestone in project 0 will 
	             remain unfinished.

	Constraints:
	* n == milestones.length
	* 1 <= n <= 10^5
	* 1 <= milestones[i] <= 10^9*/

    long long numberOfWeeks(vector<int>& milestones) {
        long long m = *max_element(milestones.begin(), milestones.end()), s = accumulate(milestones.begin(), milestones.end(), 0ll); 
        return s - max(0ll, 2*m - s - 1); 
    }


    /*1954. Minimum Garden Perimeter to Collect Enough Apples (Medium)
	In a garden represented as an infinite 2D grid, there is an apple tree 
	planted at every integer coordinate. The apple tree planted at an integer 
	coordinate (i, j) has |i| + |j| apples growing on it. You will buy an axis-
	aligned square plot of land that is centered at (0, 0). Given an integer 
	neededApples, return the minimum perimeter of a plot such that at least 
	neededApples apples are inside or on the perimeter of that plot.

	The value of |x| is defined as:
	* x if x >= 0
	* -x if x < 0

	Example 1:
	Input: neededApples = 1
	Output: 8
	Explanation: A square plot of side length 1 does not contain any apples. 
	             However, a square plot of side length 2 has 12 apples inside 
	             (as depicted in the image above). The perimeter is 2 * 4 = 8.
	
	Example 2:
	Input: neededApples = 13
	Output: 16

	Example 3:
	Input: neededApples = 1000000000
	Output: 5040

	Constraints: 1 <= neededApples <= 10^15*/

    long long minimumPerimeter(long long neededApples) {
        long long lo = 0, hi = 100000; 
        while (lo < hi) {
            long long mid = lo + (hi - lo)/2; 
            if (2*mid*(mid+1)*(2*mid+1) < neededApples) lo = mid+1; 
            else hi = mid; 
        }
        return lo*8; 
    }


    /*1955. Count Number of Special Subsequences (Hard)
	A sequence is special if it consists of a positive number of 0s, followed 
	by a positive number of 1s, then a positive number of 2s.
	* For example, [0,1,2] and [0,0,1,1,1,2] are special.
	* In contrast, [2,1,0], [1], and [0,1,2,0] are not special.
	Given an array nums (consisting of only integers 0, 1, and 2), return the 
	number of different subsequences that are special. Since the answer may be 
	very large, return it modulo 10^9 + 7. A subsequence of an array is a 
	sequence that can be derived from the array by deleting some or no elements 
	without changing the order of the remaining elements. Two subsequences are 
	different if the set of indices chosen are different.

	Example 1:
	Input: nums = [0,1,2,2]
	Output: 3
	Explanation: The special subsequences are [0,1,2,2], [0,1,2,2], and 
	             [0,1,2,2].

	Example 2:
	Input: nums = [2,2,0,0]
	Output: 0
	Explanation: There are no special subsequences in [2,2,0,0].

	Example 3:
	Input: nums = [0,1,2,0,1,2]
	Output: 7
	Explanation: The special subsequences are:
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]
	             - [0,1,2,0,1,2]

	Constraints:
	* 1 <= nums.length <= 10^5
	* 0 <= nums[i] <= 2*/

    int countSpecialSubsequences(vector<int>& nums) {
        const int MOD = 1'000'000'007; 
        long s0 = 0, s1 = 0, s2 = 0; 
        for (auto& x : nums) {
            if (x == 0) s0 = (1 + 2*s0) % MOD; 
            else if (x == 1) s1 = (s0 + 2*s1) % MOD; 
            else s2 = (s1 + 2*s2) % MOD; 
        }
        return s2; 
    }


    /*1957. Delete Characters to Make Fancy String (Easy)
	A fancy string is a string where no three consecutive characters are equal. 
	Given a string s, delete the minimum possible number of characters from s 
	to make it fancy. Return the final string after the deletion. It can be 
	shown that the answer will always be unique.

	Example 1:
	Input: s = "leeetcode"
	Output: "leetcode"
	Explanation: Remove an 'e' from the first group of 'e's to create 
	             "leetcode". No three consecutive characters are equal, so 
	             return "leetcode".
	
	Example 2:
	Input: s = "aaabaaaa"
	Output: "aabaa"
	Explanation: Remove an 'a' from the first group of 'a's to create "aabaaaa".
	             Remove two 'a's from the second group of 'a's to create "aabaa".
	             No three consecutive characters are equal, so return "aabaa".
	
	Example 3:
	Input: s = "aab"
	Output: "aab"
	Explanation: No three consecutive characters are equal, so return "aab".

	Constraints:
	* 1 <= s.length <= 10^5
	* s consists only of lowercase English letters.*/

    string makeFancyString(string s) {
        int ii = 1; 
        for (int i = 2; i < s.size(); ++i) {
            if (s[ii-1] == s[ii] && s[ii] == s[i]) continue; 
            s[++ii] = s[i]; 
        }
        return s.substr(0, ++ii); 
    }


    /*1958. Check if Move is Legal (Medium)
	You are given a 0-indexed 8 x 8 grid board, where board[r][c] represents 
	the cell (r, c) on a game board. On the board, free cells are represented 
	by '.', white cells are represented by 'W', and black cells are represented 
	by 'B'. Each move in this game consists of choosing a free cell and 
	changing it to the color you are playing as (either white or black). 
	However, a move is only legal if, after changing it, the cell becomes the 
	endpoint of a good line (horizontal, vertical, or diagonal). A good line is 
	a line of three or more cells (including the endpoints) where the endpoints 
	of the line are one color, and the remaining cells in the middle are the 
	opposite color (no cells in the line are free). Given two integers rMove 
	and cMove and a character color representing the color you are playing as 
	(white or black), return true if changing cell (rMove, cMove) to color 
	color is a legal move, or false if it is not legal.

	Example 1:
	Input: board = [[".",".",".","B",".",".",".","."],
	                [".",".",".","W",".",".",".","."],
	                [".",".",".","W",".",".",".","."],
	                [".",".",".","W",".",".",".","."],
	                ["W","B","B",".","W","W","W","B"],
	                [".",".",".","B",".",".",".","."],
	                [".",".",".","B",".",".",".","."],
	                [".",".",".","W",".",".",".","."]], 
	       rMove = 4, cMove = 3, color = "B"
	Output: true
	Explanation: '.', 'W', and 'B' are represented by the colors blue, white, 
	             and black respectively, and cell (rMove, cMove) is marked with 
	             an 'X'. The two good lines with the chosen cell as an endpoint 
	             are annotated above with the red rectangles.
	
	Example 2:
	Input: board = [[".",".",".",".",".",".",".","."],
	                [".","B",".",".","W",".",".","."],
	                [".",".","W",".",".",".",".","."],
	                [".",".",".","W","B",".",".","."],
	                [".",".",".",".",".",".",".","."],
	                [".",".",".",".","B","W",".","."],
	                [".",".",".",".",".",".","W","."],
	                [".",".",".",".",".",".",".","B"]], 
	       rMove = 4, cMove = 4, color = "W"
	Output: false
	Explanation: While there are good lines with the chosen cell as a middle 
	             cell, there are no good lines with the chosen cell as an 
	             endpoint.

	Constraints:
	* board.length == board[r].length == 8
	* 0 <= rMove, cMove < 8
	* board[rMove][cMove] == '.'
	* color is either 'B' or 'W'.*/

    bool checkMove(vector<vector<char>>& board, int rMove, int cMove, char color) {
        int dir[9] = {1, 0, -1, 0, 1, 1, -1, -1, 1}; 
        for (int k = 0; k < 8; ++k) {
            for (int i = rMove, j = cMove, step = 0; 0 <= i && i < 8 && 0 <= j && j < 8; i += dir[k], j += dir[k+1], ++step) {
                if (board[i][j] == color && step > 1) return true; 
                if ((board[i][j] == '.' && step > 0) || (board[i][j] == color && step == 1)) break; 
            }
        }
        return false; 
    }


    /*1959. Minimum Total Space Wasted With K Resizing Operations (Medium)
	You are currently designing a dynamic array. You are given a 0-indexed 
	integer array nums, where nums[i] is the number of elements that will be in 
	the array at time i. In addition, you are given an integer k, the maximum 
	number of times you can resize the array (to any size). The size of the 
	array at time t, sizet, must be at least nums[t] because there needs to be 
	enough space in the array to hold all the elements. The space wasted at 
	time t is defined as sizet - nums[t], and the total space wasted is the sum 
	of the space wasted across every time t where 0 <= t < nums.length. Return 
	the minimum total space wasted if you can resize the array at most k times.
	Note: The array can have any size at the start and does not count towards 
	the number of resizing operations.

	Example 1:
	Input: nums = [10,20], k = 0
	Output: 10
	Explanation: size = [20,20]. We can set the initial size to be 20. The 
	             total wasted space is (20 - 10) + (20 - 20) = 10.
	
	Example 2:
	Input: nums = [10,20,30], k = 1
	Output: 10
	Explanation: size = [20,20,30]. We can set the initial size to be 20 and 
	             resize to 30 at time 2. The total wasted space is 
	             (20 - 10) + (20 - 20) + (30 - 30) = 10.
	
	Example 3:
	Input: nums = [10,20,15,30,20], k = 2
	Output: 15
	Explanation: size = [10,20,20,30,30]. We can set the initial size to 10, 
	             resize to 20 at time 1, and resize to 30 at time 3. The total 
	             wasted space is 
	             (10 - 10) + (20 - 20) + (20 - 15) + (30 - 30) + (30 - 20) = 15.

	Constraints:
	* 1 <= nums.length <= 200
	* 1 <= nums[i] <= 10^6
	* 0 <= k <= nums.length - 1*/

    int minSpaceWastedKResizing(vector<int>& nums, int k) {
        int n = nums.size(); 
        vector<vector<int>> dp(n+1, vector<int>(k+1, INT_MAX)); 
        
        for (int j = 0; j <= k; ++j) dp[n][j] = 0; 
        int total = 0, most = 0; 
        for (int i = n-1; i >= 0; --i) {
            most = max(most, nums[i]); 
            total += nums[i]; 
            dp[i][0] = most * (n - i) - total; 
        }
        
        for (int i = n-1; i >= 0; --i) 
            for (int j = 1; j <= k; ++j) {
                total = most = 0; 
                for (int ii = i; ii < n; ++ii) {
                    total += nums[ii]; 
                    most = max(most, nums[ii]); 
                    dp[i][j] = min(dp[i][j], most * (ii - i + 1) - total + dp[ii+1][j-1]); 
                }
            }
        return dp[0][k]; 
    }


    /*1960. Maximum Product of the Length of Two Palindromic Substrings (Hard)
	You are given a 0-indexed string s and are tasked with finding two non-
	intersecting palindromic substrings of odd length such that the product of 
	their lengths is maximized. More formally, you want to choose four integers 
	i, j, k, l such that 0 <= i <= j < k <= l < s.length and both the 
	substrings s[i...j] and s[k...l] are palindromes and have odd lengths. 
	s[i...j] denotes a substring from index i to index j inclusive. Return the 
	maximum possible product of the lengths of the two non-intersecting 
	palindromic substrings. A palindrome is a string that is the same forward 
	and backward. A substring is a contiguous sequence of characters in a 
	string.

	Example 1:
	Input: s = "ababbb"
	Output: 9
	Explanation: Substrings "aba" and "bbb" are palindromes with odd length. 
	             product = 3 * 3 = 9.
	
	Example 2:
	Input: s = "zaaaxbbby"
	Output: 9
	Explanation: Substrings "aaa" and "bbb" are palindromes with odd length. 
	             product = 3 * 3 = 9.

	Constraints:
	* 2 <= s.length <= 10^5
	* s consists of lowercase English letters.*/

    long long maxProduct(string s) {
        int n = s.size(), center = 0, right = 0; 
        vector<int> hlen(n, 0), prefix(n, 0), suffix(n, 0); 
        for (int i = 0; i < n; ++i) {
            if (i < right) hlen[i] = min(right - i, hlen[2*center - i]); 
            while (0 <= i-1-hlen[i] && i+1+hlen[i] < n && s[i-1-hlen[i]] == s[i+1+hlen[i]]) ++hlen[i]; 
            if (right < i + hlen[i]) {
                center = i; 
                right = i + hlen[i]; 
            }
        }
        
        for (int i = 0; i < n; ++i) {
            prefix[i+hlen[i]] = max(prefix[i+hlen[i]], 2*hlen[i] + 1); 
            suffix[i-hlen[i]] = max(suffix[i-hlen[i]], 2*hlen[i] + 1); 
        }
        
        for (int i = 1; i < n; ++i) {
            prefix[n-1-i] = max(prefix[n-1-i], prefix[n-i]-2); 
            suffix[i] = max(suffix[i], suffix[i-1]-2); 
        }
        
        for (int i = 1; i < n; ++i) {
            prefix[i] = max(prefix[i-1], prefix[i]); 
            suffix[n-1-i] = max(suffix[n-1-i], suffix[n-i]); 
        }
        
        long long ans = 0ll; 
        for (int i = 1; i < n; ++i) ans = max(ans, (long long) prefix[i-1] * suffix[i]); 
        return ans; 
    }


    /*1961. Check If String Is a Prefix of Array (Easy)
	Given a string s and an array of strings words, determine whether s is a 
	prefix string of words. A string s is a prefix string of words if s can be 
	made by concatenating the first k strings in words for some positive k no 
	larger than words.length. Return true if s is a prefix string of words, or 
	false otherwise.

	Example 1:
	Input: s = "iloveleetcode", words = ["i","love","leetcode","apples"]
	Output: true
	Explanation: s can be made by concatenating "i", "love", and "leetcode" 
	             together.
	
	Example 2:
	Input: s = "iloveleetcode", words = ["apples","i","love","leetcode"]
	Output: false
	Explanation: It is impossible to make s using a prefix of arr.

	Constraints:
	* 1 <= words.length <= 100
	* 1 <= words[i].length <= 20
	* 1 <= s.length <= 1000
	* words[i] and s consist of only lowercase English letters.*/

    bool isPrefixString(string s, vector<string>& words) {
        int i = 0; 
        for (auto& word : words) {
            if (s.substr(i, word.size()) != word) return false; 
            i += word.size(); 
            if (i == s.size()) return true; 
        }
        return false; 
    }


    /*1962. Remove Stones to Minimize the Total (Medium)
	You are given a 0-indexed integer array piles, where piles[i] represents 
	the number of stones in the ith pile, and an integer k. You should apply 
	the following operation exactly k times:
	* Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
	Notice that you can apply the operation on the same pile more than once.
	Return the minimum possible total number of stones remaining after applying 
	the k operations. floor(x) is the greatest integer that is smaller than or 
	equal to x (i.e., rounds x down).

	Example 1:
	Input: piles = [5,4,9], k = 2
	Output: 12
	Explanation: Steps of a possible scenario are:
	             - Apply the operation on pile 2. The resulting piles are [5,4,5].
	             - Apply the operation on pile 0. The resulting piles are [3,4,5].
	             The total number of stones in [3,4,5] is 12.
	
	Example 2:
	Input: piles = [4,3,6,7], k = 3
	Output: 12
	Explanation: Steps of a possible scenario are:
	             - Apply the operation on pile 3. The resulting piles are [4,3,3,7].
	             - Apply the operation on pile 4. The resulting piles are [4,3,3,4].
	             - Apply the operation on pile 0. The resulting piles are [2,3,3,4].
	             The total number of stones in [2,3,3,4] is 12.

	Constraints:
	* 1 <= piles.length <= 10^5
	* 1 <= piles[i] <= 10^4
	* 1 <= k <= 10^5*/

    int minStoneSum(vector<int>& piles, int k) {
        priority_queue<int> pq; 
        for (auto& x : piles) pq.push(x); 
        while (k--) {
            int x = pq.top(); pq.pop(); 
            x -= x/2; 
            pq.push(x); 
        }
        int ans = 0; 
        while (pq.size()) {
            ans += pq.top(); pq.pop(); 
        }
        return ans; 
    }


    /*1963. Minimum Number of Swaps to Make the String Balanced (Medium)
	You are given a 0-indexed string s of even length n. The string consists of 
	exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'. A string 
	is called balanced if and only if:
	* It is the empty string, or
	* It can be written as AB, where both A and B are balanced strings, or
	* It can be written as [C], where C is a balanced string.
	You may swap the brackets at any two indices any number of times. Return 
	the minimum number of swaps to make s balanced.

	Example 1:
	Input: s = "][]["
	Output: 1
	Explanation: You can make the string balanced by swapping index 0 with 
	             index 3. The resulting string is "[[]]".
	
	Example 2:
	Input: s = "]]][[["
	Output: 2
	Explanation: You can do the following to make the string balanced:
	             - Swap index 0 with index 4. s = "[]][[]".
	             - Swap index 1 with index 5. s = "[[][]]".
	             The resulting string is "[[][]]".
	
	Example 3:
	Input: s = "[]"
	Output: 0
	Explanation: The string is already balanced.

	Constraints:
	* n == s.length
	* 2 <= n <= 106
	* n is even.
	* s[i] is either '[' or ']'.
	* The number of opening brackets '[' equals n / 2, and the number of 
	  closing brackets ']' equals n / 2.*/

    int minSwaps(string s) {
        int ans = 0, prefix = 0; 
        for (auto& ch : s) {
            if (ch == '[') prefix += 1; 
            else prefix -= 1; 
            if (prefix == -1) {
                ++ans; 
                prefix = 1; 
            }
        }
        return ans; 
    }


    /*1964. Find the Longest Valid Obstacle Course at Each Position (Hard)
	You want to build some obstacle courses. You are given a 0-indexed integer 
	array obstacles of length n, where obstacles[i] describes the height of the 
	ith obstacle. For every index i between 0 and n - 1 (inclusive), find the 
	length of the longest obstacle course in obstacles such that:
	* You choose any number of obstacles between 0 and i inclusive.
	* You must include the ith obstacle in the course.
	* You must put the chosen obstacles in the same order as they appear in 
	  obstacles.
	* Every obstacle (except the first) is taller than or the same height as 
	  the obstacle immediately before it.
	Return an array ans of length n, where ans[i] is the length of the longest 
	obstacle course for index i as described above.

	Example 1:
	Input: obstacles = [1,2,3,2]
	Output: [1,2,3,3]
	Explanation: The longest valid obstacle course at each position is:
	             - i = 0: [1], [1] has length 1.
	             - i = 1: [1,2], [1,2] has length 2.
	             - i = 2: [1,2,3], [1,2,3] has length 3.
	             - i = 3: [1,2,3,2], [1,2,2] has length 3.
	
	Example 2:
	Input: obstacles = [2,2,1]
	Output: [1,2,1]
	Explanation: The longest valid obstacle course at each position is:
	             - i = 0: [2], [2] has length 1.
	             - i = 1: [2,2], [2,2] has length 2.
	             - i = 2: [2,2,1], [1] has length 1.
	
	Example 3:
	Input: obstacles = [3,1,5,6,4,2]
	Output: [1,1,2,3,2,2]
	Explanation: The longest valid obstacle course at each position is:
	             - i = 0: [3], [3] has length 1.
	             - i = 1: [3,1], [1] has length 1.
	             - i = 2: [3,1,5], [3,5] has length 2. [1,5] is also valid.
	             - i = 3: [3,1,5,6], [3,5,6] has length 3. [1,5,6] is also valid.
	             - i = 4: [3,1,5,6,4], [3,4] has length 2. [1,4] is also valid.
	             - i = 5: [3,1,5,6,4,2], [1,2] has length 2.

	Constraints:
	* n == obstacles.length
	* 1 <= n <= 10^5
	* 1 <= obstacles[i] <= 10^7*/

    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {
        vector<int> vals, ans; 
        for (auto& x : obstacles) {
            auto it = upper_bound(vals.begin(), vals.end(), x); 
            ans.push_back(it-vals.begin()+1); 
            if (it == vals.end()) vals.push_back(x); 
            else *it = x; 
        }
        return ans; 
    }


    /*1966. Binary Searchable Numbers in an Unsorted Array (Medium)
	Consider a function that implements an algorithm similar to Binary Search. 
	The function has two input parameters: sequence is a sequence of integers, 
	and target is an integer value. The purpose of the function is to find if 
	the target exists in the sequence. The pseudocode of the function is as 
	follows:

	func(sequence, target)
	  while sequence is not empty
	    randomly choose an element from sequence as the pivot
	    if pivot = target, return true
	    else if pivot < target, remove pivot and all elements to its left from the sequence
	    else, remove pivot and all elements to its right from the sequence
	  end while
	  return false
	
	When the sequence is sorted, the function works correctly for all values. 
	When the sequence is not sorted, the function does not work for all values, 
	but may still work for some values. Given an integer array nums, 
	representing the sequence, that contains unique numbers and may or may not 
	be sorted, return the number of values that are guaranteed to be found 
	using the function, for every possible pivot selection.

	Example 1:
	Input: nums = [7]
	Output: 1
	Explanation: Searching for value 7 is guaranteed to be found. Since the 
	             sequence has only one element, 7 will be chosen as the pivot. 
	             Because the pivot equals the target, the function will return 
	             true.
	
	Example 2:
	Input: nums = [-1,5,2]
	Output: 1
	Explanation: Searching for value -1 is guaranteed to be found. If -1 was 
	             chosen as the pivot, the function would return true. If 5 was 
	             chosen as the pivot, 5 and 2 would be removed. In the next 
	             loop, the sequence would have only -1 and the function would 
	             return true. If 2 was chosen as the pivot, 2 would be removed. 
	             In the next loop, the sequence would have -1 and 5. No matter 
	             which number was chosen as the next pivot, the function would 
	             find -1 and return true. Searching for value 5 is NOT 
	             guaranteed to be found. If 2 was chosen as the pivot, -1, 5 
	             and 2 would be removed. The sequence would be empty and the 
	             function would return false. Searching for value 2 is NOT 
	             guaranteed to be found. If 5 was chosen as the pivot, 5 and 2 
	             would be removed. In the next loop, the sequence would have 
	             only -1 and the function would return false. Because only -1 
	             is guaranteed to be found, you should return 1.
	 
	Constraints:
	* 1 <= nums.length <= 10^5
	* -10^5 <= nums[i] <= 10^5
	* All the values of nums are unique.

	Follow-up: If nums has duplicates, would you modify your algorithm? If so, 
	           how?*/

    int binarySearchableNumbers(vector<int>& nums) {
        vector<int> suffix = {INT_MAX}; 
        for (int i = nums.size()-1; i >= 0; --i) 
            suffix.push_back(min(suffix.back(), nums[i])); 
        reverse(suffix.begin(), suffix.end()); 
        
        int prefix = INT_MIN, ans = 0; 
        for (int i = 0; i < nums.size(); ++i) {
            prefix = max(prefix, nums[i]); 
            if (prefix == nums[i] && nums[i] == suffix[i]) ++ans; 
        }
        return ans; 
    }


    /*1967. Number of Strings That Appear as Substrings in Word (Easy)
	Given an array of strings patterns and a string word, return the number of 
	strings in patterns that exist as a substring in word. A substring is a 
	contiguous sequence of characters within a string.

	Example 1:
	Input: patterns = ["a","abc","bc","d"], word = "abc"
	Output: 3
	Explanation: - "a" appears as a substring in "abc".
	             - "abc" appears as a substring in "abc".
	             - "bc" appears as a substring in "abc".
	             - "d" does not appear as a substring in "abc".
	             3 of the strings in patterns appear as a substring in word.
	
	Example 2:
	Input: patterns = ["a","b","c"], word = "aaaaabbbbb"
	Output: 2
	Explanation: - "a" appears as a substring in "aaaaabbbbb".
	             - "b" appears as a substring in "aaaaabbbbb".
	             - "c" does not appear as a substring in "aaaaabbbbb".
	             2 of the strings in patterns appear as a substring in word.
	
	Example 3:
	Input: patterns = ["a","a","a"], word = "ab"
	Output: 3
	Explanation: Each of the patterns appears as a substring in word "ab".

	Constraints:
	* 1 <= patterns.length <= 100
	* 1 <= patterns[i].length <= 100
	* 1 <= word.length <= 100
	* patterns[i] and word consist of lowercase English letters.*/

    int numOfStrings(vector<string>& patterns, string word) {
        int ans = 0; 
        for (auto& x : patterns) 
            if (word.find(x) != string::npos) ++ans; 
        return ans; 
    }


    /*1968. Array With Elements Not Equal to Average of Neighbors (Medium)
	You are given a 0-indexed array nums of distinct integers. You want to 
	rearrange the elements in the array such that every element in the 
	rearranged array is not equal to the average of its neighbors. More 
	formally, the rearranged array should have the property such that for every 
	i in the range 1 <= i < nums.length - 1, (nums[i-1] + nums[i+1]) / 2 is not 
	equal to nums[i]. Return any rearrangement of nums that meets the 
	requirements.

	Example 1:
	Input: nums = [1,2,3,4,5]
	Output: [1,2,4,5,3]
	Explanation:
	When i=1, nums[i] = 2, and the average of its neighbors is (1+4) / 2 = 2.5.
	When i=2, nums[i] = 4, and the average of its neighbors is (2+5) / 2 = 3.5.
	When i=3, nums[i] = 5, and the average of its neighbors is (4+3) / 2 = 3.5.

	Example 2:
	Input: nums = [6,2,0,9,7]
	Output: [9,7,6,2,0]
	Explanation:
	When i=1, nums[i] = 7, and the average of its neighbors is (9+6) / 2 = 7.5.
	When i=2, nums[i] = 6, and the average of its neighbors is (7+2) / 2 = 4.5.
	When i=3, nums[i] = 2, and the average of its neighbors is (6+0) / 2 = 3.

	Constraints:
	* 3 <= nums.length <= 10^5
	* 0 <= nums[i] <= 10^5*/

    vector<int> rearrangeArray(vector<int>& nums) {
        for (int i = 1; i < nums.size()-1; ++i) 
            if ((nums[i-1] < nums[i] && nums[i] < nums[i+1]) || (nums[i-1] > nums[i] && nums[i] > nums[i+1])) 
                swap(nums[i], nums[i+1]); 
        return nums; 
    }


    /*1969. Minimum Non-Zero Product of the Array Elements (Medium)
	You are given a positive integer p. Consider an array nums (1-indexed) that 
	consists of the integers in the inclusive range [1, 2p - 1] in their binary 
	representations. You are allowed to do the following operation any number 
	of times:
	* Choose two elements x and y from nums.
	* Choose a bit in x and swap it with its corresponding bit in y. 
	  Corresponding bit refers to the bit that is in the same position in the 
	  other integer.
	For example, if x = 1101 and y = 0011, after swapping the 2nd bit from the 
	right, we have x = 1111 and y = 0001. Find the minimum non-zero product of 
	nums after performing the above operation any number of times. Return this 
	product modulo 10^9 + 7. Note: The answer should be the minimum product 
	before the modulo operation is done.

	Example 1:
	Input: p = 1
	Output: 1
	Explanation: nums = [1]. There is only one element, so the product equals 
	             that element.
	
	Example 2:
	Input: p = 2
	Output: 6
	Explanation: nums = [01, 10, 11]. Any swap would either make the product 0 
	             or stay the same. Thus, the array product of 1 * 2 * 3 = 6 is 
	             already minimized.
	
	Example 3:
	Input: p = 3
	Output: 1512
	Explanation: nums = [001, 010, 011, 100, 101, 110, 111]
	             - In the first operation we can swap the leftmost bit of the second and fifth elements.
	                 - The resulting array is [001, 110, 011, 100, 001, 110, 111].
	             - In the second operation we can swap the middle bit of the third and fourth elements.
	                 - The resulting array is [001, 110, 001, 110, 001, 110, 111].
	             The array product is 1 * 6 * 1 * 6 * 1 * 6 * 7 = 1512, which is the minimum possible product.

	Constraints: 1 <= p <= 60*/

    int minNonZeroProduct(int p) {
        const int MOD = 1'000'000'007;
        long x =  (1l << p) - 1; 
        
        auto power = [](long n, long k, int m) {
            long ans = 1; 
            while (k) {
                if (k & 1) {
                    ans = (ans * n) % MOD; 
                    k--; 
                } else {
                    n = (n * n) % MOD; 
                    k /= 2; 
                }
            }
            return ans; 
        };
        
        return power((x-1) % MOD, (x-1)/2, MOD) * (x % MOD) % MOD; 
    }


    /*1970. Last Day Where You Can Still Cross (Hard)
	There is a 1-based binary matrix where 0 represents land and 1 represents 
	water. You are given integers row and col representing the number of rows 
	and columns in the matrix, respectively. Initially on day 0, the entire 
	matrix is land. However, each day a new cell becomes flooded with water. 
	You are given a 1-based 2D array cells, where cells[i] = [ri, ci] 
	represents that on the ith day, the cell on the rith row and cith column 
	(1-based coordinates) will be covered with water (i.e., changed to 1).You 
	want to find the last day that it is possible to walk from the top to the 
	bottom by only walking on land cells. You can start from any cell in the 
	top row and end at any cell in the bottom row. You can only travel in the 
	four cardinal directions (left, right, up, and down). Return the last day 
	where it is possible to walk from the top to the bottom by only walking on 
	land cells.

	Example 1:
	Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
	Output: 2
	Explanation: The above image depicts how the matrix changes each day 
	             starting from day 0. The last day where it is possible to 
	             cross from top to bottom is on day 2.
	
	Example 2:
	Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
	Output: 1
	Explanation: The above image depicts how the matrix changes each day 
	             starting from day 0. The last day where it is possible to 
	             cross from top to bottom is on day 1.
	
	Example 3:
	Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
	Output: 3
	Explanation: The above image depicts how the matrix changes each day 
	             starting from day 0. The last day where it is possible to 
	             cross from top to bottom is on day 3.

	Constraints:
	* 2 <= row, col <= 2 * 10^4
	* 4 <= row * col <= 2 * 10^4
	* cells.length == row * col
	* 1 <= ri <= row
	* 1 <= ci <= col
	* All the values of cells are unique.

class UnionFind {
    vector<int> parent, rank; 
public: 
    UnionFind(int n) {
        parent.resize(n); 
        iota(parent.begin(), parent.end(), 0); 
        rank = vector<int>(n, 1); 
    }
    
    int find(int p) {
        if (p != parent[p]) 
            parent[p] = find(parent[p]); // find w. path compression
        return parent[p]; 
    }
    
    bool connect(int p, int q) {
        int prt = find(p), qrt = find(q); 
        if (prt == qrt) return false; 
        if (rank[prt] > rank[qrt]) swap(prt, qrt); 
        parent[prt] = qrt; 
        rank[qrt] += rank[prt]; 
        return true; 
    }
};*/

    int latestDayToCross(int row, int col, vector<vector<int>>& cells) {
        int n = row * col; 
        vector<vector<int>> grid(row, vector<int>(col, 0)), span(n, {n, 0}); 
        UnionFind* uf = new UnionFind(n); 
        
        for (int step = 0; step < cells.size(); ++step) {
            int i = cells[step][0]-1, j = cells[step][1]-1, x = i*col + j; 
            grid[i][j] = 1; 
            for (auto&& di : {-1, 0, 1}) 
                for (auto&& dj : {-1, 0, 1}) 
                    if (di || dj) {
                        int ii = i + di, jj = j + dj; 
                        if (0 <= ii && ii < row && 0 <= jj && jj < col && grid[ii][jj]) {
                            int xx = ii*col+jj, r = uf->find(x), rr = uf->find(xx); 
                            span[r][0] = span[rr][0] = min(span[r][0], min(span[rr][0], min(j, jj))); 
                            span[r][1] = span[rr][1] = max(span[r][1], max(span[rr][1], max(j, jj))); 
                            if (span[r][0] == 0 && span[r][1] == col - 1) {
                                delete uf; 
                                return step; 
                            }
                            uf->connect(x, xx); 
                        }
                    }
        }
        return -1; 
    }


    /*1971. Find if Path Exists in Graph (Easy)
	There is a bi-directional graph with n vertices, where each vertex is 
	labeled from 0 to n - 1 (inclusive). The edges in the graph are represented 
	as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a 
	bi-directional edge between vertex ui and vertex vi. Every vertex pair is 
	connected by at most one edge, and no vertex has an edge to itself. You 
	want to determine if there is a valid path that exists from vertex start to 
	vertex end. Given edges and the integers n, start, and end, return true if 
	there is a valid path from start to end, or false otherwise.

	Example 1:
	Input: n = 3, edges = [[0,1],[1,2],[2,0]], start = 0, end = 2
	Output: true
	Explanation: There are two paths from vertex 0 to vertex 2:
	             - 0 → 1 → 2
	             - 0 → 2
	
	Example 2:
	Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], start = 0, end = 5
	Output: false
	Explanation: There is no path from vertex 0 to vertex 5.

	Constraints:
	* 1 <= n <= 2 * 10^5
	* 0 <= edges.length <= 2 * 10^5
	* edges[i].length == 2
	* 1 <= ui, vi <= n - 1
	* ui != vi
	* 1 <= start, end <= n - 1
	* There are no duplicate edges.
	* There are no self edges.*/

    bool validPath(int n, vector<vector<int>>& edges, int start, int end) {
        unordered_map<int, vector<int>> graph; 
        for (auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]); 
            graph[edge[1]].push_back(edge[0]); 
        }
        stack<int> stk; 
        stk.push(start); 
        unordered_set<int> seen = {start}; 
        while (stk.size()) {
            int n = stk.top(); stk.pop(); 
            if (n == end) return true; 
            for (auto& nn : graph[n]) 
                if (!seen.count(nn)) {
                    seen.insert(nn); 
                    stk.push(nn); 
                }
        }
        return false; 
    }
};


/*295. Find Median from Data Stream (Hard)
The median is the middle value in an ordered integer list. If the size of the 
list is even, there is no middle value and the median is the mean of the two 
middle values.
* For example, for arr = [2,3,4], the median is 3.
* For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.

Implement the MedianFinder class:
* MedianFinder() initializes the MedianFinder object.
* void addNum(int num) adds the integer num from the data stream to the data 
  structure.
* double findMedian() returns the median of all elements so far. Answers within 
  10^-5 of the actual answer will be accepted.

Example 1:
Input: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
       [[], [1], [2], [], [3], []]
Output: [null, null, null, 1.5, null, 2.0]
Explanation:
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0

Constraints:
-10^5 <= num <= 10^5
There will be at least one element in the data structure before calling findMedian.
At most 5 * 10^4 calls will be made to addNum and findMedian.

Follow up:
* If all integer numbers from the stream are in the range [0, 100], how would 
  you optimize your solution?
* If 99% of all integer numbers from the stream are in the range [0, 100], how 
  would you optimize your solution?*/

class MedianFinder {
    priority_queue<int, vector<int>, greater<>> small; 
    priority_queue<int> large; 
    
public:
    /** initialize your data structure here. */
    MedianFinder() {}
    
    void addNum(int num) {
        if (small.empty() || num >= small.top()) small.push(num); 
        else large.push(num); 
        if (small.size() > 1 + large.size()) {
            large.push(small.top()); small.pop(); 
        } else if (small.size() < large.size()) {
            small.push(large.top()); large.pop(); 
        }
    }
    
    double findMedian() {
        if (small.size() == large.size()) return ((double) small.top() + large.top())/2; 
        return small.top(); 
    }
};


/*303. Range Sum Query - Immutable (Easy)
Given an integer array nums, handle multiple queries of the following type:
* Calculate the sum of the elements of nums between indices left and right 
  inclusive where left <= right.
Implement the NumArray class:
* NumArray(int[] nums) Initializes the object with the integer array nums.
* int sumRange(int left, int right) Returns the sum of the elements of nums 
  between indices left and right inclusive (i.e. 
  nums[left] + nums[left + 1] + ... + nums[right]).

Example 1:
Input: ["NumArray", "sumRange", "sumRange", "sumRange"]
       [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output: [null, 1, -1, -3]
Explanation: 
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

Constraints:
* 1 <= nums.length <= 10^4
* -10^5 <= nums[i] <= 10^5
* 0 <= left <= right < nums.length
* At most 10^4 calls will be made to sumRange.*/

class NumArray {
    vector<int> prefix; 
public:
    NumArray(vector<int>& nums) : prefix(1) {
        for (auto& x : nums) 
            prefix.push_back(prefix.back() + x); 
    }
    
    int sumRange(int left, int right) {
        return prefix[right+1] - prefix[left]; 
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


/*352. Data Stream as Disjoint Intervals (Hard)
Given a data stream input of non-negative integers a1, a2, ..., an, summarize 
the numbers seen so far as a list of disjoint intervals. Implement the 
SummaryRanges class:
* SummaryRanges() Initializes the object with an empty stream.
* void addNum(int val) Adds the integer val to the stream.
* int[][] getIntervals() Returns a summary of the integers in the stream 
  currently as a list of disjoint intervals [starti, endi].

Example 1:
Input: ["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
       [[], [1], [], [3], [], [7], [], [2], [], [6], []]
Output: [null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]
Explanation:
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // return [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]

Constraints:
* 0 <= val <= 10^4
* At most 3 * 10^4 calls will be made to addNum and getIntervals.

Follow up: What if there are lots of merges and the number of disjoint 
           intervals is small compared to the size of the data stream?*/

class SummaryRanges {
    set<vector<int>> data; 
public:
    /** Initialize your data structure here. */
    SummaryRanges() {}
    
    void addNum(int val) {
        auto it = data.lower_bound({val, val}); 
        int start = val, end = val; 
        if (it != data.end() && (*it)[0] <= val+1) {
            end = max(end, (*it)[1]); 
            it = data.erase(it); 
        }
        if (it != data.begin()) {
            --it;
            if (val <= (*it)[1]+1) {
                start = min(start, (*it)[0]); 
                end = max(end, (*it)[1]); 
                it = data.erase(it); 
            }
        }
        data.insert({start, end}); 
    }
    
    vector<vector<int>> getIntervals() {
        vector<vector<int>> ans; 
        for (auto it = begin(data); it != end(data); ++it) 
            ans.push_back(*it); 
        return ans; 
    }
};


/*384. Shuffle an Array (Medium)
Given an integer array nums, design an algorithm to randomly shuffle the array. 
All permutations of the array should be equally likely as a result of the 
shuffling. Implement the Solution class:
* Solution(int[] nums) Initializes the object with the integer array nums.
* int[] reset() Resets the array to its original configuration and returns it.
* int[] shuffle() Returns a random shuffling of the array.

Example 1:
Input: ["Solution", "shuffle", "reset", "shuffle"]
       [[[1, 2, 3]], [], [], []]
Output: [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
Explanation: 
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely to be returned.
                       // Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]

Constraints:
* 1 <= nums.length <= 200
* -10^6 <= nums[i] <= 10^6
* All the elements of nums are unique.
* At most 5 * 10^4 calls in total will be made to reset and shuffle.*/

class Solution {
    vector<int> orig; 
    vector<int> nums; 
public:
    Solution(vector<int>& nums) {
        orig = nums; 
        this->nums = nums; 
    }
    
    /** Resets the array to its original configuration and return it. */
    vector<int> reset() {
        return orig; 
    }
    
    /** Returns a random shuffling of the array. */
    vector<int> shuffle() {
        for (int i = 0; i < nums.size(); ++i) {
            int ii = rand() % (i + 1); 
            swap(nums[ii], nums[i]); 
        }
        return nums; 
    }
};


/*432. All O`one Data Structure (Hard)
Design a data structure to store the strings' count with the ability to return 
the strings with minimum and maximum counts. Implement the AllOne class:
* AllOne() Initializes the object of the data structure.
* inc(String key) Increments the count of the string key by 1. If key does not 
  exist in the data structure, insert it with count 1.
* dec(String key) Decrements the count of the string key by 1. If the count of 
  key is 0 after the decrement, remove it from the data structure. It is 
  guaranteed that key exists in the data structure before the decrement.
* getMaxKey() Returns one of the keys with the maximal count. If no element 
  exists, return an empty string "".
* getMinKey() Returns one of the keys with the minimum count. If no element 
  exists, return an empty string "".

Example 1:
Input: ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
       [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output: [null, null, null, "hello", "hello", null, "hello", "leet"]
Explanation
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"

Constraints:
* 1 <= key.length <= 10
* key consists of lowercase English letters.
* It is guaranteed that for each call to dec, key is existing in the data structure.
* At most 5 * 10^4 calls will be made to inc, dec, getMaxKey, and getMinKey.*/

class Node {
public: 
    unordered_set<string> keys; 
    int freq; 
    Node *prev, *next; 
    
    Node(unordered_set<string> keys, int freq, Node* prev, Node* next) {
        this->keys = keys; 
        this->freq = freq; 
        this->prev = prev; 
        this->next = next; 
    }
};


class AllOne {
    unordered_map<string, Node*> mp; 
    Node *head, *tail; 
public:
    /** Initialize your data structure here. */
    AllOne() {
        head = new Node({}, 0, nullptr, nullptr); 
        tail = new Node({}, 0, nullptr, nullptr); 
        head->next = tail; 
        tail->prev = head; 
    }
    
    /** Inserts a new key <Key> with value 1. Or increments an existing key by 1. */
    void inc(string key) {
        Node* node = head; 
        if (mp.find(key) != mp.end()) {
            node = mp[key]; 
            node->keys.erase(key); 
        }
        if (node->freq + 1 == node->next->freq) {
            node->next->keys.insert(key); 
            mp[key] = node->next; 
        } else {
            Node* newn = new Node({key}, node->freq+1, node, node->next); 
            mp[key] = node->next = node->next->prev = newn; 
        }
        
        if (node != head && node->keys.empty()) {
            node->prev->next = node->next; 
            node->next->prev = node->prev; 
            delete node; 
        }
    }
    
    /** Decrements an existing key by 1. If Key's value is 1, remove it from the data structure. */
    void dec(string key) {
        Node* node = mp[key]; 
        node->keys.erase(key); 
        if (node->freq == 1) {
            mp.erase(key);
        } else if (node->prev->freq + 1 == node->freq) {
            node->prev->keys.insert(key); 
            mp[key] = node->prev; 
        } else {
            Node* newn = new Node({key}, node->freq-1, node->prev, node); 
            mp[key] = node->prev = node->prev->next = newn;
        }
        if (node->keys.empty()) {
            node->prev->next = node->next; 
            node->next->prev = node->prev; 
            delete node; 
        }
    }
    
    /** Returns one of the keys with maximal value. */
    string getMaxKey() {
        return head != tail->prev ? *begin(tail->prev->keys) : ""; 
    }
    
    /** Returns one of the keys with Minimal value. */
    string getMinKey() {
        return head->next != tail ? *begin(head->next->keys) : ""; 
    }
};


/*677. Map Sum Pairs (Medium)
Implement the MapSum class:
* MapSum() Initializes the MapSum object.
* void insert(String key, int val) Inserts the key-val pair into the map. If 
  the key already existed, the original key-value pair will be overridden to 
  the new one.
* int sum(string prefix) Returns the sum of all the pairs' value whose key 
  starts with the prefix.

Example 1:
Input: ["MapSum", "insert", "sum", "insert", "sum"]
       [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output: [null, null, 3, null, 5]
Explanation:
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 
Constraints:
* 1 <= key.length, prefix.length <= 50
* key and prefix consist of only lowercase English letters.
* 1 <= val <= 1000
* At most 50 calls will be made to insert and sum.*/

struct TrieNode {
    int val = 0; 
    TrieNode* child[26] = {}; 
};


class MapSum {
    TrieNode* root = new TrieNode(); 
    unordered_map<string, int> seen; 
public:
    MapSum() {}
    
    void insert(string key, int val) {
        val -= seen[key]; 
        TrieNode* node = root; 
        for (auto& ch : key) {
            if (!node->child[ch-'a']) node->child[ch-'a'] = new TrieNode(); 
            node = node->child[ch-'a']; 
            node->val += val; 
        }
        seen[key] += val; 
    }
    
    int sum(string prefix) {
        TrieNode* node = root; 
        for (auto& ch : prefix) {
            if (!node->child[ch-'a']) return 0; 
            node = node->child[ch-'a']; 
        }
        return node->val; 
    }
};


/*684. Redundant Connection (Medium)
In this problem, a tree is an undirected graph that is connected and has no 
cycles. You are given a graph that started as a tree with n nodes labeled from 
1 to n, with one additional edge added. The added edge has two different 
vertices chosen from 1 to n, and was not an edge that already existed. The 
graph is represented as an array edges of length n where edges[i] = [ai, bi] 
indicates that there is an edge between nodes ai and bi in the graph. Return an 
edge that can be removed so that the resulting graph is a tree of n nodes. If 
there are multiple answers, return the answer that occurs last in the input.

Example 1:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Example 2:
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]

Constraints:
* n == edges.length
* 3 <= n <= 1000
* edges[i].length == 2
* 1 <= ai < bi <= edges.length
* ai != bi
* There are no repeated edges.
* The given graph is connected.*/

class UnionFind {
    vector<int> parent, rank; 
public: 
    UnionFind(int n) {
        parent.resize(n); 
        iota(begin(parent), end(parent), 0); 
        rank = vector<int>(n, 1); 
    } 
    
    int find(int p) {
        /* find with path compression */
        if (parent[p] != p) 
            parent[p] = find(parent[p]); 
        return parent[p]; 
    }
    
    bool connect(int p, int q) {
        /* union with rank */
        int prt = find(p), qrt = find(q); 
        if (prt == qrt) return false; 
        if (rank[prt] > rank[qrt]) swap(prt, qrt);
        parent[prt] = qrt; 
        rank[qrt] += rank[prt]; 
        return true; 
    }
};


class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        UnionFind uf = UnionFind(size(edges)); 
        for (auto& edge : edges) 
            if (!uf.connect(edge[0]-1, edge[1]-1)) return edge; 
        return {}; 
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


/*729. My Calendar I (Medium)
Implement a MyCalendar class to store your events. A new event can be added if 
adding the event will not cause a double booking. Your class will have the 
method, book(int start, int end). Formally, this represents a booking on the 
half open interval [start, end), the range of real numbers x such that 
start <= x < end. A double booking happens when two events have some non-empty 
intersection (ie., there is some time that is common to both events.) For each 
call to the method MyCalendar.book, return true if the event can be added to 
the calendar successfully without causing a double booking. Otherwise, return 
false and do not add the event to the calendar. Your class will be called like 
this: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)

Example 1:
MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(15, 25); // returns false
MyCalendar.book(20, 30); // returns true
Explanation: The first event can be booked.  The second can't because time 15 
             is already booked by another event. The third event can be booked, 
             as the first event takes every time less than 20, but not 
             including 20.

Note:
* The number of calls to MyCalendar.book per test case will be at most 1000.
* In calls to MyCalendar.book(start, end), start and end are integers in the 
  range [0, 10^9].*/

class MyCalendar {
    set<pair<int, int>> cal; 
public:
    MyCalendar() {}
    
    bool book(int start, int end) {
        auto it = cal.lower_bound({start, end}); 
        if (it != cal.begin() && prev(it)->second > start) return false; 
        if (it != cal.end() && end > it->first) return false; 
        cal.insert({start, end}); 
        return true; 
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


/*1797. Design Authentication Manager (Medium)
There is an authentication system that works with authentication tokens. For 
each session, the user will receive a new authentication token that will expire 
timeToLive seconds after the currentTime. If the token is renewed, the expiry 
time will be extended to expire timeToLive seconds after the (potentially 
different) currentTime. Implement the AuthenticationManager class:
* AuthenticationManager(int timeToLive) constructs the AuthenticationManager 
  and sets the timeToLive.
* generate(string tokenId, int currentTime) generates a new token with the 
  given tokenId at the given currentTime in seconds.
* renew(string tokenId, int currentTime) renews the unexpired token with the 
  given tokenId at the given currentTime in seconds. If there are no unexpired 
  tokens with the given tokenId, the request is ignored, and nothing happens.
* countUnexpiredTokens(int currentTime) returns the number of unexpired tokens 
  at the given currentTime.
Note that if a token expires at time t, and another action happens on time t 
(renew or countUnexpiredTokens), the expiration takes place before the other 
actions.

Example 1:
Input: ["AuthenticationManager", "renew", "generate", "countUnexpiredTokens", "generate", "renew", "renew", "countUnexpiredTokens"]
       [[5], ["aaa", 1], ["aaa", 2], [6], ["bbb", 7], ["aaa", 8], ["bbb", 10], [15]]
Output: [null, null, null, 1, null, null, null, 0]
Explanation: 
AuthenticationManager authenticationManager = new AuthenticationManager(5); // Constructs the AuthenticationManager with timeToLive = 5 seconds.
authenticationManager.renew("aaa", 1); // No token exists with tokenId "aaa" at time 1, so nothing happens.
authenticationManager.generate("aaa", 2); // Generates a new token with tokenId "aaa" at time 2.
authenticationManager.countUnexpiredTokens(6); // The token with tokenId "aaa" is the only unexpired one at time 6, so return 1.
authenticationManager.generate("bbb", 7); // Generates a new token with tokenId "bbb" at time 7.
authenticationManager.renew("aaa", 8); // The token with tokenId "aaa" expired at time 7, and 8 >= 7, so at time 8 the renew request is ignored, and nothing happens.
authenticationManager.renew("bbb", 10); // The token with tokenId "bbb" is unexpired at time 10, so the renew request is fulfilled and now the token will expire at time 15.
authenticationManager.countUnexpiredTokens(15); // The token with tokenId "bbb" expires at time 15, and the token with tokenId "aaa" expired at time 7, so currently no token is unexpired, so return 0.

Constraints:
* 1 <= timeToLive <= 10^8
* 1 <= currentTime <= 10^8
* 1 <= tokenId.length <= 5
* tokenId consists only of lowercase letters.
* All calls to generate will contain unique values of tokenId.
* The values of currentTime across all the function calls will be strictly increasing.
* At most 2000 calls will be made to all functions combined.*/

class AuthenticationManager {
    int timeToLive = 0; 
    unordered_map<string, int> expiry; 
    
public:
    AuthenticationManager(int timeToLive) : timeToLive(timeToLive) {}
    
    void generate(string tokenId, int currentTime) {
        expiry[tokenId] = currentTime + timeToLive; 
    }
    
    void renew(string tokenId, int currentTime) {
        if (expiry.count(tokenId) && expiry[tokenId] > currentTime) 
            expiry[tokenId] = currentTime + timeToLive; 
    }
    
    int countUnexpiredTokens(int currentTime) {
        int ans = 0; 
        vector<string> expired; 
        for (auto& x : expiry) {
            if (x.second > currentTime) ++ans; 
            else expired.push_back(x.first); 
        }
        for (auto& x : expired) expiry.erase(x); 
        return ans; 
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


/*1912. Design Movie Rental System (Hard)
You have a movie renting company consisting of n shops. You want to implement a 
renting system that supports searching for, booking, and returning movies. The 
system should also support generating a report of the currently rented movies.
Each movie is given as a 2D integer array entries where 
entries[i] = [shopi, moviei, pricei] indicates that there is a copy of movie 
moviei at shop shopi with a rental price of pricei. Each shop carries at most 
one copy of a movie moviei. 

The system should support the following functions:
* Search: Finds the cheapest 5 shops that have an unrented copy of a given 
  movie. The shops should be sorted by price in ascending order, and in case of 
  a tie, the one with the smaller shopi should appear first. If there are less 
  than 5 matching shops, then all of them should be returned. If no shop has an 
  unrented copy, then an empty list should be returned.
* Rent: Rents an unrented copy of a given movie from a given shop.
* Drop: Drops off a previously rented copy of a given movie at a given shop.
* Report: Returns the cheapest 5 rented movies (possibly of the same movie ID) 
  as a 2D list res where res[j] = [shopj, moviej] describes that the jth 
  cheapest rented movie moviej was rented from the shop shopj. The movies in 
  res should be sorted by price in ascending order, and in case of a tie, the 
  one with the smaller shopj should appear first, and if there is still tie, 
  the one with the smaller moviej should appear first. If there are fewer than 
  5 rented movies, then all of them should be returned. If no movies are 
  currently being rented, then an empty list should be returned.

Implement the MovieRentingSystem class:
* MovieRentingSystem(int n, int[][] entries) Initializes the MovieRentingSystem 
  object with n shops and the movies in entries.
* List<Integer> search(int movie) Returns a list of shops that have an unrented 
  copy of the given movie as described above.
* void rent(int shop, int movie) Rents the given movie from the given shop.
* void drop(int shop, int movie) Drops off a previously rented movie at the 
  given shop.
* List<List<Integer>> report() Returns a list of cheapest rented movies as 
  described above.

Note: The test cases will be generated such that rent will only be called if 
the shop has an unrented copy of the movie, and drop will only be called if the 
shop had previously rented out the movie.

Example 1:
Input: ["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
       [[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
Output: [null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]
Explanation: 
MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
movieRentingSystem.search(1);  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
movieRentingSystem.report();   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
movieRentingSystem.search(2);  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.

Constraints:
* 1 <= n <= 3 * 10^5
* 1 <= entries.length <= 10^5
* 0 <= shopi < n
* 1 <= moviei, pricei <= 10^4
* Each shop carries at most one copy of a movie moviei.
* At most 105 calls in total will be made to search, rent, drop and report.*/

class MovieRentingSystem {
    unordered_map<int, set<array<int,2>>> avail; 
    map<array<int,2> int> cost; 
    set<array<int,3>> rented; 
public:
    MovieRentingSystem(int n, vector<vector<int>>& entries) {
        for (auto& entry : entries) {
            int shop = entry[0], movie = entry[1], price = entry[2]; 
            avail.insert({movie, {price, shop}}); 
            cost.insert({{shop, movie}, price}); 
        }
    }
    
    vector<int> search(int movie) {
        if (avail.find(movie) == avail.end()) return {}; 
        vector<int> ans; 
        for (auto it = begin(avail[movie]), k = 0; it != end(avail[end]) && k < 5; ++it, ++k) {
            ans.push_back(*it[1]); 
        }
        return ans; 
    }
    
    void rent(int shop, int movie) {
        int price = cost[{shop, movie}]; 
        avail[movie].erase({price, shop}); 
        rented.insert({price, shop, movie}); 
    }
    
    void drop(int shop, int movie) {
        int price = cost[{shop, movie}]; 
        avail[movie].insert({price, shop}); 
        rented.erase({price, shop, movie}); 
    }
    
    vector<vector<int>> report() {
        vector<vector<int>> ans; 
        for (auto it = begin(rented), k = 0; it != end(rented) && k < 5; ++it, ++k) {
            ans.push_back(*it); 
        }
        return ans; 
    }
};