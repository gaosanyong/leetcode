"""This file is a minimal colleciton of solutions to leetcode problems in 
Python3. No algorithm or reasoning is provided for the sake of saving spaces. 
For more details, the readers are suggested to explore on their own effort.
"""

from functools import lru_cache, reduce
from heapq import heappush, heappop
from itertools import groupby, zip_longest
from math import inf, sqrt
from operator import gt, lt, xor

class Solution:
=
	"""1. Two Sum (Easy)
	Given an array of integers, return indices of the two numbers such that 
	they add up to a specific target. You may assume that each input would have 
	exactly one solution, and you may not use the same element twice.

	Example:
	Given nums = [2, 7, 11, 15], target = 9,
	Because nums[0] + nums[1] = 2 + 7 = 9,
	return [0, 1]."""

    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = dict()
        for i, x in enumerate(nums): 
            if target - x in seen: return [seen[target-x], i]
            seen[x] = i


    """2. Add Two Numbers (Medium)
	You are given two non-empty linked lists representing two non-negative 
	integers. The digits are stored in reverse order and each of their nodes 
	contain a single digit. Add the two numbers and return it as a linked list. 
	You may assume the two numbers do not contain any leading zero, except the 
	number 0 itself.

	Example:
	Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
	Output: 7 -> 0 -> 8
	Explanation: 342 + 465 = 807."""

    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        head = node = ListNode()
        carry = 0
        while l1 or l2 or carry: 
            if l1: 
                carry += l1.val
                l1 = l1.next
            if l2: 
                carry += l2.val 
                l2 = l2.next 
            node.next = ListNode(carry%10)
            carry //= 10
            node = node.next 
        return head.next 


    """3. Longest Substring Without Repeating Characters (Medium)
	Given a string, find the length of the longest substring without repeating 
	characters.

	Example 1:
	Input: "abcabcbb"
	Output: 3 
	Explanation: The answer is "abc", with the length of 3. 

	Example 2:
	Input: "bbbbb"
	Output: 1
	Explanation: The answer is "b", with the length of 1.

	Example 3:
	Input: "pwwkew"
	Output: 3
	Explanation: The answer is "wke", with the length of 3. 
	Note that the answer must be a substring, "pwke" is a subsequence and not a 
	substring."""

    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = dict()
        ans = j = 0
        for i, x in enumerate(s): 
            if x in seen and seen[x] >= j: j = seen[x] + 1
            ans = max(ans, i-j+1)
            seen[x] = i
        return ans 


    """4. Median of Two Sorted Arrays (Hard)
	There are two sorted arrays nums1 and nums2 of size m and n respectively. 
	Find the median of the two sorted arrays. The overall run time complexity 
	should be O(log (m+n)). You may assume nums1 and nums2 cannot be both empty.

	Example 1:
	nums1 = [1, 3], nums2 = [2]
	The median is 2.0

	Example 2:
	nums1 = [1, 2], nums2 = [3, 4]
	The median is (2 + 3)/2 = 2.5"""

    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2): nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        lo, hi = 0, m
        
        while lo <= hi: 
            mid = (lo + hi)//2
            k = (m+n)//2 - mid 
            if mid > 0 and nums1[mid-1] > nums2[k]: hi = mid
            elif mid < m and nums1[mid] < nums2[k-1]: lo = mid+1
            else: 
                if mid == m: right = nums2[k]
                elif k == n: right = nums1[mid]
                else: right = min(nums1[mid], nums2[k])
                
                if (m+n)%2: return right
                
                if mid == 0: left = nums2[k-1]
                elif k == 0: left = nums1[mid-1]
                else: left = max(nums1[mid-1], nums2[k-1])
                
                return (left + right)/2


    """5. Longest Palindromic Substring (Medium)
	Given a string s, find the longest palindromic substring in s. You may 
	assume that the maximum length of s is 1000.

	Example 1:
	Input: "babad"
	Output: "bab"
	Note: "aba" is also a valid answer.

	Example 2:
	Input: "cbbd"
	Output: "bb"""

    def longestPalindrome(self, s: str) -> str:
        
        def fn(i, j): 
            """Return the length of longest Palindrome starting from i, j"""
            while i >= 0 and j < len(s) and s[i] == s[j]: i, j = i-1, j+1
            return j-i-1
        
        ans = ""
        for i in range(len(s)): 
            ll = max(fn(i, i), fn(i, i+1))
            ans = max(ans, s[i-(ll-1)//2 : i+1+ll//2], key=len)
        return ans 


	"""6. ZigZag Conversion (Medium)
	The string "PAYPALISHIRING" is written in a zigzag pattern on a given 
	number of rows like this: (you may want to display this pattern in a fixed 
	font for better legibility)

	P   A   H   N
	A P L S I I G
	Y   I   R
	And then read line by line: "PAHNAPLSIIGYIR"

	Write the code that will take a string and make this conversion given a 
	number of rows:

	string convert(string s, int numRows);

	Example 1:
	Input: s = "PAYPALISHIRING", numRows = 3
	Output: "PAHNAPLSIIGYIR"

	Example 2:
	Input: s = "PAYPALISHIRING", numRows = 4
	Output: "PINALSIGYAHRPI"

	Explanation:

	P     I    N
	A   L S  I G
	Y A   H R
	P     I"""

    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1: return s #edge case 
        ans = [[] for _ in range(numRows)]
        i, di = 0, 1
        for c in s: 
            ans[i].append(c)
            i += di
            if i == 0 or i == numRows-1: di *= -1
        return "".join("".join(x) for x in ans)


	"""7. Reverse Integer (Easy)
	Given a 32-bit signed integer, reverse digits of an integer.

	Example 1:
	Input: 123
	Output: 321

	Example 2:
	Input: -123
	Output: -321

	Example 3:
	Input: 120
	Output: 21

	Note:
	Assume we are dealing with an environment which could only store integers 
	within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose 
	of this problem, assume that your function returns 0 when the reversed 
	integer overflows."""

    def reverse(self, x: int) -> int:
        x = ((x>0) - (x<0)) * int(str(abs(x))[::-1])
        return x if x.bit_length() < 32 else 0


    """8. String to Integer (atoi) (Medium)
	Implement atoi which converts a string to an integer. The function first 
	discards as many whitespace characters as necessary until the first non-
	whitespace character is found. Then, starting from this character, takes 
	an optional initial plus or minus sign followed by as many numerical digits 
	as possible, and interprets them as a numerical value. The string can 
	contain additional characters after those that form the integral number, 
	which are ignored and have no effect on the behavior of this function. If 
	the first sequence of non-whitespace characters in str is not a valid 
	integral number, or if no such sequence exists because either str is empty 
	or it contains only whitespace characters, no conversion is performed. If 
	no valid conversion could be performed, a zero value is returned.

	Note:

	Only the space character ' ' is considered as whitespace character.
	Assume we are dealing with an environment which could only store integers 
	within the 32-bit signed integer range: [−2^31,  2^31 − 1]. If the numerical 
	value is out of the range of representable values, INT_MAX (231 − 1) or 
	INT_MIN (−231) is returned.

	Example 1:
	Input: "42"
	Output: 42

	Example 2:
	Input: "   -42"
	Output: -42
	Explanation: The first non-whitespace character is '-', which is the minus sign.
	             Then take as many numerical digits as possible, which gets 42.

	Example 3:
	Input: "4193 with words"
	Output: 4193
	Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.

	Example 4:
	Input: "words and 987"
	Output: 0
	Explanation: The first non-whitespace character is 'w', which is not a numerical 
	             digit or a +/- sign. Therefore no valid conversion could be performed.

	Example 5:
	Input: "-91283472332"
	Output: -2147483648
	Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
	Thefore INT_MIN (−231) is returned."""

    def myAtoi(self, str: str) -> int:
        str = "".join(re.findall('^[\+|\-]?\d+', str.lstrip()))
        return 0 if not str else min(2**31-1, max(-2**31, int(str)))


	"""9. Palindrome Number (Easy)
	Determine whether an integer is a palindrome. An integer is a palindrome 
	when it reads the same backward as forward.

	Example 1:
	Input: 121
	Output: true

	Example 2:
	Input: -121
	Output: false
	Explanation: From left to right, it reads -121. From right to left, it 
	becomes 121-. Therefore it is not a palindrome.

	Example 3:
	Input: 10
	Output: false
	Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

	Follow up: Coud you solve it without converting the integer to a string?"""

    def isPalindrome(self, x: int) -> bool:
        if x < 0 or x % 10 == 0 and x != 0: return False 
        y = 0
        while x > y: 
            y = 10*y + x % 10
            x //= 10
        return x == y or x == y//10 


    """10. Regular Expression Matching (Hard)
	Given an input string (s) and a pattern (p), implement regular expression 
	matching with support for '.' and '*'.

	'.' Matches any single character.
	'*' Matches zero or more of the preceding element.
	The matching should cover the entire input string (not partial).

	Note:
	s could be empty and contains only lowercase letters a-z.
	p could be empty and contains only lowercase letters a-z, and characters like . or *.

	Example 1:
	Input:
	s = "aa"
	p = "a"
	Output: false

	Example 2:
	Input:
	s = "aa"
	p = "a*"
	Output: true

	Example 3:
	Input:
	s = "ab"
	p = ".*"
	Output: true

	Example 4:
	Input:
	s = "aab"
	p = "c*a*b"
	Output: true

	Example 5:
	Input:
	s = "mississippi"
	p = "mis*is*p*."
	Output: false"""

    def isMatch(self, s: str, p: str) -> bool:
        
        @lru_cache(None)
        def fn(i, j): 
            """Return True if s[i:] matches p[j:]"""
            if j == len(p): return i == len(s)
            match = i < len(s) and (s[i] == p[j] or p[j] == ".")
            if j+1 < len(p) and p[j+1] == "*": 
                return fn(i, j+2) or match and fn(i+1, j)
            else: 
                return match and fn(i+1, j+1)
            
        return fn(0, 0)



    """11. Container With Most Water (Medium)
	Given n non-negative integers a1, a2, ..., an , where each represents a 
	point at coordinate (i, ai). n vertical lines are drawn such that the two 
	endpoints of line i is at (i, ai) and (i, 0). Find two lines, which 
	together with x-axis forms a container, such that the container contains 
	the most water.

	Note: You may not slant the container and n is at least 2.

	Example:
	Input: [1,8,6,2,5,4,8,3,7]
	Output: 49"""

    def maxArea(self, height: List[int]) -> int:
        ans = 0
        lo, hi = 0, len(height)-1
        while lo < hi: 
            ans = max(ans, (hi-lo)*min(height[lo], height[hi]))
            if height[lo] < height[hi]: lo += 1
            else: hi -= 1
        return ans 



    """12. Integer to Roman (Medium)
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
	For example, two is written as II in Roman numeral, just two one's added 
	together. Twelve is written as, XII, which is simply X + II. The number 
	twenty seven is written as XXVII, which is XX + V + II.

	Roman numerals are usually written largest to smallest from left to right. 
	However, the numeral for four is not IIII. Instead, the number four is 
	written as IV. Because the one is before the five we subtract it making 
	four. The same principle applies to the number nine, which is written as 
	IX. There are six instances where subtraction is used:

	I can be placed before V (5) and X (10) to make 4 and 9. 
	X can be placed before L (50) and C (100) to make 40 and 90. 
	C can be placed before D (500) and M (1000) to make 400 and 900.
	Given an integer, convert it to a roman numeral. Input is guaranteed to be 
	within the range from 1 to 3999.

	Example 1:
	Input: 3
	Output: "III"

	Example 2:
	Input: 4
	Output: "IV"

	Example 3:
	Input: 9
	Output: "IX"

	Example 4:
	Input: 58
	Output: "LVIII"
	Explanation: L = 50, V = 5, III = 3.

	Example 5:
	Input: 1994
	Output: "MCMXCIV"
	Explanation: M = 1000, CM = 900, XC = 90 and IV = 4."""

    def intToRoman(self, num: int) -> str:
        roman = {1000:"M", 900:"CM", 500:"D", 400:"CD", 100:"C", 90:"XC", 50:"L", 40:"XL", 10:"X", 9:"IX", 5:"V", 4:"IV", 1:"I"}
        ans = []
        for k, v in roman.items(): 
            ans.append(num//k * v)
            num %= k
        return "".join(ans)

	"""13. Roman to Integer (Easy)
	Roman numerals are represented by seven different symbols: I, V, X, L, C, 
	D and M.

	Symbol       Value
	I             1
	V             5
	X             10
	L             50
	C             100
	D             500
	M             1000
	For example, two is written as II in Roman numeral, just two one's added 
	together. Twelve is written as, XII, which is simply X + II. The number 
	twenty seven is written as XXVII, which is XX + V + II.

	Roman numerals are usually written largest to smallest from left to right. 
	However, the numeral for four is not IIII. Instead, the number four is 
	written as IV. Because the one is before the five we subtract it making 
	four. The same principle applies to the number nine, which is written as 
	IX. There are six instances where subtraction is used:

	I can be placed before V (5) and X (10) to make 4 and 9. 
	X can be placed before L (50) and C (100) to make 40 and 90. 
	C can be placed before D (500) and M (1000) to make 400 and 900.
	Given a roman numeral, convert it to an integer. Input is guaranteed to be 
	within the range from 1 to 3999.

	Example 1:
	Input: "III"
	Output: 3

	Example 2:
	Input: "IV"
	Output: 4

	Example 3:
	Input: "IX"
	Output: 9

	Example 4:
	Input: "LVIII"
	Output: 58
	Explanation: L = 50, V= 5, III = 3.

	Example 5:
	Input: "MCMXCIV"
	Output: 1994
	Explanation: M = 1000, CM = 900, XC = 90 and IV = 4."""

    def romanToInt(self, s: str) -> int:
        val = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
        ans = 0
        for i in range(len(s)):
            if i+1 < len(s) and val[s[i]] < val[s[i+1]]: ans -= val[s[i]]
            else: ans += val[s[i]]
        return ans


    """14. Longest Common Prefix (Easy)
	Write a function to find the longest common prefix string amongst an array 
	of strings. If there is no common prefix, return an empty string "".

	Example 1:
	Input: ["flower","flow","flight"]
	Output: "fl"

	Example 2:
	Input: ["dog","racecar","car"]
	Output: ""
	Explanation: There is no common prefix among the input strings."""

    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs: return ""
        for i, c in enumerate(zip(*strs)): 
            if len(set(c)) > 1: return strs[0][:i]
        return min(strs)


    """15. 3Sum (Medium)
	Given an array nums of n integers, are there elements a, b, c in nums such 
	that a + b + c = 0? Find all unique triplets in the array which gives the 
	sum of zero.

	Note: The solution set must not contain duplicate triplets.

	Example:
	Given array nums = [-1, 0, 1, 2, -1, -4],
	A solution set is:
	[
	  [-1, 0, 1],
	  [-1, -1, 2]
	]"""

    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        ans = []
        for i in range(len(nums)): 
            if nums[i] > 0: break
            if i and nums[i-1] == nums[i]: continue #remove duplicates
            lo, hi = i+1, len(nums)-1
            while lo < hi: 
                x = nums[lo] + nums[hi] + nums[i]
                if x > 0: hi -= 1
                elif x < 0: lo += 1
                else: 
                    ans.append([nums[i], nums[lo], nums[hi]])
                    lo += 1
                    while lo < hi and nums[lo-1] == nums[lo]: lo += 1
        return ans 


    """16. 3Sum Closest (Medium)
	Given an array nums of n integers and an integer target, find three 
	integers in nums such that the sum is closest to target. Return the sum of 
	the three integers. You may assume that each input would have exactly one 
	solution.

	Example 1:
	Input: nums = [-1,2,1,-4], target = 1
	Output: 2
	Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

	Constraints:
	3 <= nums.length <= 10^3
	-10^3 <= nums[i] <= 10^3
	-10^4 <= target <= 10^4"""

    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        ans = float("inf")
        for i in range(len(nums)): 
            lo, hi = i+1, len(nums)-1
            while lo < hi: 
                val = nums[i] + nums[lo] + nums[hi] 
                if val == target: return val
                elif val > target: hi -= 1
                else: lo += 1
                ans = min(ans, val, key=lambda x: abs(x-target))
        return ans 


    """17. Letter Combinations of a Phone Number (Medium)
	Given a string containing digits from 2-9 inclusive, return all possible 
	letter combinations that the number could represent.

	A mapping of digit to letters (just like on the telephone buttons) is given 
	below. Note that 1 does not map to any letters.

	Example:
	Input: "23"
	Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

	Note: Although the above answer is in lexicographical order, your answer 
	could be in any order you want."""

    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        phone = {"2":"abc", "3":"def", "4":"ghi", "5":"jkl", "6":"mno", "7":"pqrs", "8":"tuv", "9":"wxyz"}
        return reduce(lambda x, y: [xx+yy for xx in x for yy in phone[y]], digits, [""])


    """18. 4Sum (Medium)
	Given an array nums of n integers and an integer target, are there elements 
	a, b, c, and d in nums such that a + b + c + d = target? Find all unique 
	quadruplets in the array which gives the sum of target.

	Note: The solution set must not contain duplicate quadruplets.

	Example:
	Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

	A solution set is:
	[
	  [-1,  0, 0, 1],
	  [-2, -1, 1, 2],
	  [-2,  0, 0, 2]
	]"""

    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        ans = []
        for i in range(len(nums)):
            if i and nums[i-1] == nums[i]: continue
            for j in range(i+1, len(nums)):
                if j > i+1 and nums[j-1] == nums[j]: continue 
                lo, hi = j+1, len(nums)-1
                while lo < hi: 
                    val = nums[i] + nums[j] + nums[lo] + nums[hi]
                    if val < target: lo += 1
                    elif val > target: hi -= 1
                    else: 
                        ans.append([nums[i], nums[j], nums[lo], nums[hi]])
                        lo += 1
                        while lo < hi and nums[lo-1] == nums[lo]: lo += 1
        return ans


    """19. Remove Nth Node From End of List (Medium)
	Given a linked list, remove the n-th node from the end of list and return 
	its head.

	Example:
	Given linked list: 1->2->3->4->5, and n = 2.
	After removing the second node from the end, the linked list becomes 1->2->3->5.

	Note: Given n will always be valid.
	Follow up: Could you do this in one pass?"""

    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = ListNode(next=head)
        fast = slow = dummy
        i = 0
        while fast:
            fast = fast.next 
            if (i:=i+1) > n+1: slow = slow.next
        slow.next = slow.next.next
        return dummy.next 


    """20. Valid Parentheses (Easy)
	Given a string containing just the characters '(', ')', '{', '}', '[' and 
	']', determine if the input string is valid.

	An input string is valid if:
	* Open brackets must be closed by the same type of brackets.
	* Open brackets must be closed in the correct order.
	Note: an empty string is also considered valid.

	Example 1:
	Input: "()"
	Output: true
	
	Example 2:
	Input: "()[]{}"
	Output: true

	Example 3:
	Input: "(]"
	Output: false

	Example 4:
	Input: "([)]"
	Output: false

	Example 5:
	Input: "{[]}"
	Output: true"""

    def isValid(self, s: str) -> bool:
        match, stack = {"(":")", "[":"]", "{":"}"}, []
        for x in s:
            if x in match: stack.append(x)
            elif not stack or match[stack.pop()] != x: return False 
        return not stack 


    """21. Merge Two Sorted Lists (Easy)
	Merge two sorted linked lists and return it as a new list. The new list 
	should be made by splicing together the nodes of the first two lists.

	Example:

	Input: 1->2->4, 1->3->4
	Output: 1->1->2->3->4->4"""
    
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = node = ListNode()
        while l1 and l2: 
            if l1.val > l2.val: l1, l2 = l2, l1
            node.next = l1
            l1, node = l1.next, node.next
        node.next = l1 or l2
        return dummy.next 


    """22. Generate Parentheses (Medium)
	Given n pairs of parentheses, write a function to generate all 
	combinations of well-formed parentheses.

	For example, given n = 3, a solution set is:

	[
	  "((()))",
	  "(()())",
	  "(())()",
	  "()(())",
	  "()()()"
	]"""

    def generateParenthesis(self, n: int) -> List[str]:
        
        def fn(s, op, cl):
            """Backtracking to collect parentheses"""
            if cl == n: return ans.append(s)
            if op <  n: fn(s+"(", op+1, cl)
            if cl < op: fn(s+")", op, cl+1)
                
        ans = []
        fn("", 0, 0)
        return ans 


    """23. Merge k Sorted Lists (Hard)
	Merge k sorted linked lists and return it as one sorted list. Analyze and 
	describe its complexity.

	Example:
	Input:
	[
	  1->4->5,
	  1->3->4,
	  2->6
	]
	Output: 1->1->2->3->4->4->5->6"""
    
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        pq = []
        for i, ll in enumerate(lists):
            if ll: heappush(pq, (ll.val, i, ll))
                
        dummy = node = ListNode()
        while pq: 
            _, i, ll = heappop(pq)
            if ll.next: heappush(pq, (ll.next.val, i, ll.next))
            node.next = ll
            node = node.next 
        return dummy.next 


    """24. Swap Nodes in Pairs (Medium)
	Given a linked list, swap every two adjacent nodes and return its head.

	You may not modify the values in the list's nodes, only nodes itself may be 
	changed.

	Example:
	Given 1->2->3->4, you should return the list as 2->1->4->3."""

    def swapPairs(self, head: ListNode) -> ListNode:
        node = dummy = ListNode(0, head)
        while node.next and node.next.next: 
            node.next.next.next, node.next.next, node.next = node.next, node.next.next.next, node.next.next
            node = node.next.next 
        return dummy.next


    """25. Reverse Nodes in k-Group (Hard)
	Given a linked list, reverse the nodes of a linked list k at a time and 
	return its modified list. k is a positive integer and is less than or 
	equal to the length of the linked list. If the number of nodes is not a 
	multiple of k then left-out nodes in the end should remain as it is.

	Example:
	Given this linked list: 1->2->3->4->5
	For k = 2, you should return: 2->1->4->3->5
	For k = 3, you should return: 3->2->1->4->5

	Note: Only constant extra memory is allowed.
	You may not alter the values in the list's nodes, only nodes itself may be changed."""
    
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        node, i = head, 0
        while node:
            if (i:=i+1) == k: break
            node = node.next 
        if i < k: return head 
        
        prev, node = None, head 
        for _ in range(k): node.next, node, prev = prev, node.next, node
        head.next = self.reverseKGroup(node, k)
        return prev 


    """26. Remove Duplicates from Sorted Array (Easy)
	Given a sorted array nums, remove the duplicates in-place such that each 
	element appear only once and return the new length. Do not allocate extra 
	space for another array, you must do this by modifying the input array in-
	place with O(1) extra memory.

	Example 1:
	Given nums = [1,1,2], your function should return length = 2, with the 
	first two elements of nums being 1 and 2 respectively. It doesn't matter 
	what you leave beyond the returned length.

	Example 2:
	Given nums = [0,0,1,1,1,2,2,3,3,4], your function should return length = 5, 
	with the first five elements of nums being modified to 0, 1, 2, 3, and 4 
	respectively. It doesn't matter what values are set beyond the returned 
	length.
	
	Clarification: Confused why the returned value is an integer but your 
	answer is an array?

	Note that the input array is passed in by reference, which means 
	modification to the input array will be known to the caller as well.

	Internally you can think of this:
	// nums is passed in by reference. (i.e., without making a copy)
	int len = removeDuplicates(nums);
	// any modification to nums in your function would be known by the caller.
	// using the length returned by your function, it prints the first len 
	elements.
	for (int i = 0; i < len; i++) {
	    print(nums[i]);
	}"""

    def removeDuplicates(self, nums: List[int]) -> int:
        i = 0
        for num in nums:
            if i < 1 or nums[i-1] < num: 
                nums[i] = num
                i += 1
        return i


    """27. Remove Element (Easy)
	Given an array nums and a value val, remove all instances of that value in-
	place and return the new length. Do not allocate extra space for another 
	array, you must do this by modifying the input array in-place with O(1) 
	extra memory. The order of elements can be changed. It doesn't matter what 
	you leave beyond the new length.

	Example 1:
	Given nums = [3,2,2,3], val = 3, your function should return length = 2, 
	with the first two elements of nums being 2. It doesn't matter what you 
	leave beyond the returned length.
	
	Example 2:
	Given nums = [0,1,2,2,3,0,4,2], val = 2, your function should return 
	length = 5, with the first five elements of nums containing 0, 1, 3, 0, 
	and 4. Note that the order of those five elements can be arbitrary. It 
	doesn't matter what values are set beyond the returned length.
	
	Clarification:

	Confused why the returned value is an integer but your answer is an array?

	Note that the input array is passed in by reference, which means 
	modification to the input array will be known to the caller as well.

	Internally you can think of this:
	// nums is passed in by reference. (i.e., without making a copy)
	int len = removeElement(nums, val);
	// any modification to nums in your function would be known by the caller.
	// using the length returned by your function, it prints the first len elements.
	for (int i = 0; i < len; i++) {
	    print(nums[i]);
	}"""

    def removeElement(self, nums: List[int], val: int) -> int:
        i = 0
        for x in nums: 
            if x != val: nums[i], i = x, i+1
        return i


    """28. Implement strStr() (Easy)
	Implement strStr(). Return the index of the first occurrence of needle in 
	haystack, or -1 if needle is not part of haystack.

	Example 1:
	Input: haystack = "hello", needle = "ll"
	Output: 2

	Example 2:
	Input: haystack = "aaaaa", needle = "bba"
	Output: -1

	Clarification: 	What should we return when needle is an empty string? This 
	is a great question to ask during an interview. For the purpose of this 
	problem, we will return 0 when needle is an empty string. This is 
	consistent to C's strstr() and Java's indexOf()."""

    def strStr(self, haystack: str, needle: str) -> int:
        """Knuth-Morris-Pratt algo (1977)"""
        if not needle: return 0 #edge case 
        
        lps = [0]*len(needle) #longest prefix-suffix table 
        k = 0
        for i in range(1, len(needle)): 
            while k and needle[k] != needle[i]: k = lps[k-1]
            if needle[k] == needle[i]: k += 1
            lps[i] = k 
            
        k = 0
        for i in range(len(haystack)): 
            while k and needle[k] != haystack[i]: k = lps[k-1]
            if needle[k] == haystack[i]: k += 1
            if k == len(needle): return i - len(needle) + 1
        return -1


    """29. Divide Two Integers (Medium)
	Given two integers dividend and divisor, divide two integers without using 
	multiplication, division and mod operator. Return the quotient after 
	dividing dividend by divisor. The integer division should truncate toward 
	zero, which means losing its fractional part. 

	For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

	Example 1:
	Input: dividend = 10, divisor = 3
	Output: 3
	Explanation: 10/3 = truncate(3.33333..) = 3.

	Example 2:
	Input: dividend = 7, divisor = -3
	Output: -2
	Explanation: 7/-3 = truncate(-2.33333..) = -2.

	Note: Both dividend and divisor will be 32-bit signed integers. The divisor 
	will never be 0. Assume we are dealing with an environment which could only 
	store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. 
	For the purpose of this problem, assume that your function returns 2^31 − 1 
	when the division result overflows."""
    
    def divide(self, dividend: int, divisor: int) -> int:
        if dividend == -2147483648 and divisor == 1: return -2147483648 #edge case 
        
        neg = (dividend > 0) ^ (divisor > 0)
        ans, dividend, divisor = 0, abs(dividend), abs(divisor)
        for i in reversed(range(31)):
            if dividend >= divisor << i: 
                ans |= 1 << i
                dividend -= divisor << i
        return -ans if neg else ans 


    """30. Substring with Concatenation of All Words (Hard)
	You are given a string, s, and a list of words, words, that are all of the 
	same length. Find all starting indices of substring(s) in s that is a 
	concatenation of each word in words exactly once and without any 
	intervening characters.

	Example 1:
	Input:
	  s = "barfoothefoobarman",
	  words = ["foo","bar"]
	Output: [0,9]

	Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
	The output order does not matter, returning [9,0] is fine too.

	Example 2:
	Input:
	  s = "wordgoodgoodgoodbestword",
	  words = ["word","good","best","word"]
	Output: []"""

    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not words: return []
        
        target = dict()
        for word in words: target[word] = target.get(word, 0) + 1
            
        ans, n = [], len(words[0])
        for i in range(n): 
            freq, kk = dict(), i
            for j in range(i, len(s), n): 
                word = s[j:j+n]
                freq[word] = freq.get(word, 0) + 1
                while freq[word] > target.get(word, 0): 
                    freq[s[kk:(kk:=kk+n)]] -= 1
                if j + n - kk == n * len(words): ans.append(kk)
        return ans 


    """31. Next Permutation (Medium)
	Implement next permutation, which rearranges numbers into the 
	lexicographically next greater permutation of numbers. If such arrangement 
	is not possible, it must rearrange it as the lowest possible order (ie, 
	sorted in ascending order). The replacement must be in-place and use only 
	constant extra memory. Here are some examples. Inputs are in the left-hand 
	column and its corresponding outputs are in the right-hand column.

	1,2,3 → 1,3,2
	3,2,1 → 1,2,3
	1,1,5 → 1,5,1"""

    def nextPermutation(self, nums: List[int]) -> None:
        k = len(nums)-1
        while k and nums[k-1] >= nums[k]: k -= 1
            
        if k: 
            lo, hi = k, len(nums)
            while lo < hi:
                mid = (lo + hi)//2
                if nums[mid] <= nums[k-1]: hi = mid
                else: lo = mid+1
            nums[k-1], nums[lo-1] = nums[lo-1], nums[k-1]
        
        lo, hi = k, len(nums)-1
        while lo < hi: 
            nums[lo], nums[hi] = nums[hi], nums[lo]
            lo, hi = lo+1, hi-1  


    """32. Longest Valid Parentheses (Hard)
	Given a string containing just the characters '(' and ')', find the length 
	of the longest valid (well-formed) parentheses substring.

	Example 1:
	Input: "(()"
	Output: 2
	Explanation: The longest valid parentheses substring is "()"

	Example 2:
	Input: ")()())"
	Output: 4
	Explanation: The longest valid parentheses substring is "()()"""

    def longestValidParentheses(self, s: str) -> int:
        
        def fn(fwd, ans=0): 
            op = cl = 0
            for c in s if fwd else reversed(s): 
                if c == "(": op += 1
                else: cl += 1
                if (lt if fwd else gt)(op, cl): op = cl = 0
                elif op == cl: ans = max(ans, op + cl)
            return ans 
        
        return fn(False, fn(True))

    """33. Search in Rotated Sorted Array (Medium)
	Suppose an array sorted in ascending order is rotated at some pivot unknown 
	to you beforehand. (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]). 
	You are given a target value to search. If found in the array return its 
	index, otherwise return -1. You may assume no duplicate exists in the array. 
	Your algorithm's runtime complexity must be in the order of O(log n).

	Example 1:
	Input: nums = [4,5,6,7,0,1,2], target = 0
	Output: 4

	Example 2:
	Input: nums = [4,5,6,7,0,1,2], target = 3
	Output: -1"""

    def search(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)-1
        while lo <= hi: 
            mid = (lo + hi)//2
            if nums[mid] == target: return mid
            if nums[lo] <= nums[mid]: 
                if nums[lo] <= target < nums[mid]: hi = mid - 1
                else: lo = mid + 1
            else: 
                if nums[mid] < target <= nums[hi]: lo = mid + 1
                else: hi = mid - 1
        return -1


    """34. Find First and Last Position of Element in Sorted Array (Medium)
	Given an array of integers nums sorted in ascending order, find the 
	starting and ending position of a given target value. Your algorithm's 
	runtime complexity must be in the order of O(log n). If the target is not 
	found in the array, return [-1, -1].

	Example 1:
	Input: nums = [5,7,7,8,8,10], target = 8
	Output: [3,4]

	Example 2:
	Input: nums = [5,7,7,8,8,10], target = 6
	Output: [-1,-1]"""

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        
        def fn(x, lo=0, hi=len(nums)):
            while lo < hi:
                mid = (lo + hi)//2
                if nums[mid] >= x: hi = mid
                else: lo = mid+1
            return lo 
        
        lo = fn(target)
        if not lo < len(nums) or nums[lo] != target: return [-1, -1]
        return [lo, fn(target+1, lo)-1]


    """35. Search Insert Position (Easy)
	Given a sorted array and a target value, return the index if the target is 
	found. If not, return the index where it would be if it were inserted in 
	order. You may assume no duplicates in the array.

	Example 1:
	Input: [1,3,5,6], 5
	Output: 2

	Example 2:
	Input: [1,3,5,6], 2
	Output: 1

	Example 3:
	Input: [1,3,5,6], 7
	Output: 4

	Example 4:
	Input: [1,3,5,6], 0
	Output: 0"""

    def searchInsert(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi)//2
            if nums[mid] < target: lo = mid + 1
            else: hi = mid
        return lo 


    """36. Valid Sudoku (Medium)
	Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be 
	validated according to the following rules:

	+ Each row must contain the digits 1-9 without repetition.
	+ Each column must contain the digits 1-9 without repetition.
	+ Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 
	without repetition.

	A partially filled sudoku which is valid. The Sudoku board could be 
	partially filled, where empty cells are filled with the character '.'.

	Example 1:
	Input:
	[
	  ["5","3",".",".","7",".",".",".","."],
	  ["6",".",".","1","9","5",".",".","."],
	  [".","9","8",".",".",".",".","6","."],
	  ["8",".",".",".","6",".",".",".","3"],
	  ["4",".",".","8",".","3",".",".","1"],
	  ["7",".",".",".","2",".",".",".","6"],
	  [".","6",".",".",".",".","2","8","."],
	  [".",".",".","4","1","9",".",".","5"],
	  [".",".",".",".","8",".",".","7","9"]
	]
	Output: true

	Example 2:
	Input:
	[
	  ["8","3",".",".","7",".",".",".","."],
	  ["6",".",".","1","9","5",".",".","."],
	  [".","9","8",".",".",".",".","6","."],
	  ["8",".",".",".","6",".",".",".","3"],
	  ["4",".",".","8",".","3",".",".","1"],
	  ["7",".",".",".","2",".",".",".","6"],
	  [".","6",".",".",".",".","2","8","."],
	  [".",".",".","4","1","9",".",".","5"],
	  [".",".",".",".","8",".",".","7","9"]
	]
	Output: false

	Explanation: Same as Example 1, except with the 5 in the top left corner 
	being modified to 8. Since there are two 8's in the top left 3x3 sub-box, 
	it is invalid.
	
	Note:
	A Sudoku board (partially filled) could be valid but is not necessarily 
	solvable. Only the filled cells need to be validated according to the 
	mentioned rules. The given board contain only digits 1-9 and the character 
	'.'. The given board size is always 9x9."""

    def isValidSudoku(self, board: List[List[str]]) -> bool:
        seen = set()
        for i, j in product(range(9), range(9)):
            if board[i][j] != ".": 
                item = {(i, board[i][j]), (board[i][j], j), (i//3, board[i][j], j//3)}
                if seen & item: return False 
                seen |= item
        return True


    """37. Sudoku Solver (Hard)
	Write a program to solve a Sudoku puzzle by filling the empty cells. A 
	sudoku solution must satisfy all of the following rules:

	Each of the digits 1-9 must occur exactly once in each row.
	Each of the digits 1-9 must occur exactly once in each column.
	Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 
	sub-boxes of the grid.
	
	Empty cells are indicated by the character '.'.

	Note:
	The given board contain only digits 1-9 and the character '.'.
	You may assume that the given Sudoku puzzle will have a single unique solution.
	The given board size is always 9x9."""

    def solveSudoku(self, board: List[List[str]]) -> None:
        empty = []
        seen = set()
        for i in range(9):
            for j in range(9):
                if board[i][j] == ".": empty.append((i, j))
                else: seen |= {(i, board[i][j]), (board[i][j], j), (i//3, board[i][j], j//3)}
        
        def fn(k, seen): 
            """Return True if Sudoku is filled properly (for early termination)"""
            if k == len(empty): return True
            i, j = empty[k]
            for x in "123456789": 
                if seen & {(i, x), (x, j), (i//3, x, j//3)}: continue
                seen |= {(i, x), (x, j), (i//3, x, j//3)}
                board[i][j] = x
                if fn(k+1, seen): return True 
                seen -= {(i, x), (x, j), (i//3, x, j//3)}
        
        fn(0, seen)


    """38. Count and Say (Easy)
	The count-and-say sequence is the sequence of integers with the first five 
	terms as following:

	1.     1
	2.     11
	3.     21
	4.     1211
	5.     111221
	1 is read off as "one 1" or 11.
	11 is read off as "two 1s" or 21.
	21 is read off as "one 2, then one 1" or 1211.

	Given an integer n where 1 ≤ n ≤ 30, generate the nth term of the count-
	and-say sequence. You can do so recursively, in other words from the 
	previous member read off the digits, counting the number of digits in 
	groups of the same digit.

	Note: Each term of the sequence of integers will be represented as a string.

	Example 1:
	Input: 1
	Output: "1"
	Explanation: This is the base case.

	Example 2:
	Input: 4
	Output: "1211"
	Explanation: For n = 3 the term was "21" in which we have two groups "2" 
	and "1", "2" can be read as "12" which means frequency = 1 and value = 2, 
	the same way "1" is read as "11", so the answer is the concatenation of 
	"12" and "11" which is "1211"."""

    def countAndSay(self, n: int) -> str:
        if n == 1: return "1"
        return "".join(str(len(list(v))) + g for g, v in groupby(self.countAndSay(n-1)))


    """39. Combination Sum (Medium)
	Given a set of candidate numbers (candidates) (without duplicates) and a 
	target number (target), find all unique combinations in candidates where 
	the candidate numbers sums to target. The same repeated number may be 
	chosen from candidates unlimited number of times.

	Note:
	All numbers (including target) will be positive integers.
	The solution set must not contain duplicate combinations.

	Example 1:
	Input: candidates = [2,3,6,7], target = 7,
	A solution set is:
	[
	  [7],
	  [2,2,3]
	]

	Example 2:
	Input: candidates = [2,3,5], target = 8,
	A solution set is:
	[
	  [2,2,2,2],
	  [2,3,3],
	  [3,5]
	]"""

    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        
        def fn(stack, x, k=0):
            """backtracking using a stack"""
            if x == 0: return ans.append(stack.copy()) #store a copy 
            for i in range(k, len(candidates)): 
                if candidates[i] > x: break 
                stack.append(candidates[i])
                fn(stack, x-candidates[i], i)
                stack.pop()
        
        ans = []
        fn([], target)
        return ans 


    """40. Combination Sum II (Medium)
	Given a collection of candidate numbers (candidates) and a target number 
	(target), find all unique combinations in candidates where the candidate 
	numbers sums to target. Each number in candidates may only be used once in 
	the combination.

	Note:
	All numbers (including target) will be positive integers. The solution set 
	must not contain duplicate combinations.
	
	Example 1:
	Input: candidates = [10,1,2,7,6,1,5], target = 8,
	A solution set is:
	[
	  [1, 7],
	  [1, 2, 5],
	  [2, 6],
	  [1, 1, 6]
	]

	Example 2:
	Input: candidates = [2,5,2,1,2], target = 5,
	A solution set is:
	[
	  [1,2,2],
	  [5]
	]"""

    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        
        def fn(stack, x, k=0):
            """backtracking using a stack"""
            if x == 0: return ans.append(stack.copy())
            for i in range(k, len(candidates)):
                if candidates[i] > x: break 
                if i > k and candidates[i] == candidates[i-1]: continue
                stack.append(candidates[i])
                fn(stack, x - candidates[i], i+1)
                stack.pop()
                
        ans = []
        fn([], target)
        return ans 


    """41. First Missing Positive (Hard)
	Given an unsorted integer array, find the smallest missing positive integer.

	Example 1:

	Input: [1,2,0]
	Output: 3
	Example 2:

	Input: [3,4,-1,1]
	Output: 2
	Example 3:

	Input: [7,8,9,11,12]
	Output: 1
	Note:

	Your algorithm should run in O(n) time and uses constant extra space."""

    def firstMissingPositive(self, nums: List[int]) -> int:
        
        for i in range(len(nums)):
            k = nums[i]
            while k and 0 < k <= len(nums): 
                nums[k-1], k = None, nums[k-1]
                
        return next((i+1 for i in range(len(nums)) if nums[i] is not None), len(nums)+1)


    """42. Trapping Rain Water (Hard)
	Given n non-negative integers representing an elevation map where the width 
	of each bar is 1, compute how much water it is able to trap after raining.
	The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
	In this case, 6 units of rain water (blue section) are being trapped. 

	Example:
	Input: [0,1,0,2,1,0,1,3,2,1,2,1]
	Output: 6"""

    def trap(self, height: List[int]) -> int:
        ans = left = right = 0
        lo, hi = 0, len(height)-1
        while lo < hi: 
            if height[lo] < height[hi]: 
                left = max(left, height[lo])
                ans += left - height[lo]
                lo += 1
            else: 
                right = max(right, height[hi])
                ans += right - height[hi]
                hi -= 1
        return ans 



    """43. Multiply Strings (Medium)
	Given two non-negative integers num1 and num2 represented as strings, 
	return the product of num1 and num2, also represented as a string.

	Example 1:
	Input: num1 = "2", num2 = "3"
	Output: "6"

	Example 2:
	Input: num1 = "123", num2 = "456"
	Output: "56088"

	Note:
	+ The length of both num1 and num2 is < 110.
	+ Both num1 and num2 contain only digits 0-9.
	+ Both num1 and num2 do not contain any leading zero, except the number 0 
	  itself.
	+ You must not use any built-in BigInteger library or convert the inputs to 
	  integer directly."""

    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0": return "0" #edge case 
        
        ans = [0] * (len(num1) + len(num2))
        for i, x in enumerate(reversed(num1)):
            for j, y in enumerate(reversed(num2)): 
                num = (ord(x) - 48) * (ord(y) - 48)
                k = i + j
                while num: 
                    num, ans[k] = divmod(num + ans[k], 10)
                    k += 1
        return "".join(map(str, reversed(ans[:k])))


    """44. Wildcard Matching (Hard)
	Given an input string (s) and a pattern (p), implement wildcard pattern 
	matching with support for '?' and '*'.

	'?' Matches any single character.
	'*' Matches any sequence of characters (including the empty sequence).
	The matching should cover the entire input string (not partial).

	Note:
	s could be empty and contains only lowercase letters a-z.
	p could be empty and contains only lowercase letters a-z, and characters 
	like ? or *.
	
	Example 1:
	Input:
	s = "aa"
	p = "a"
	Output: false
	Explanation: "a" does not match the entire string "aa".
	
	Example 2:
	Input:
	s = "aa"
	p = "*"
	Output: true
	Explanation: '*' matches any sequence.

	Example 3:
	Input:
	s = "cb"
	p = "?a"
	Output: false
	Explanation: '?' matches 'c', but the second letter is 'a', which does not 
	match 'b'.

	Example 4:
	Input:
	s = "adceb"
	p = "*a*b"
	Output: true
	Explanation: The first '*' matches the empty sequence, while the second '*' 
	matches the substring "dce".
	
	Example 5:
	Input:
	s = "acdcb"
	p = "a*c?b"
	Output: false"""

    def isMatch(self, s: str, p: str) -> bool:
        
        @lru_cache(None)
        def fn(i, j): 
            """Return True if s[i:] matches p[j:]"""
            if j == len(p): return i == len(s)
            if i < len(s) and (s[i] == p[j] or p[j] == "?"): return fn(i+1, j+1)
            if p[j] == "*": return fn(i, j+1) or i < len(s) and fn(i+1, j)
            return False 
        
        return fn(0, 0)


    """45. Jump Game II (Hard)
	Given an array of non-negative integers, you are initially positioned at 
	the first index of the array. Each element in the array represents your 
	maximum jump length at that position. Your goal is to reach the last index 
	in the minimum number of jumps.

	Example:
	Input: [2,3,1,1,4]
	Output: 2
	Explanation: The minimum number of jumps to reach the last index is 2.
    Jump 1 step from index 0 to 1, then 3 steps to the last index.

	Note: You can assume that you can always reach the last index."""

    def jump(self, nums: List[int]) -> int:
        curr = next = jump = 0
        for i in range(len(nums)):
            if i > curr: 
                curr = next;
                jump += 1
            next = max(next, i + nums[i])
        return jump 


    """46. Permutations (Medium)
	Given a collection of distinct integers, return all possible permutations.

	Example:
	Input: [1,2,3]
	Output:
	[
	  [1,2,3],
	  [1,3,2],
	  [2,1,3],
	  [2,3,1],
	  [3,1,2],
	  [3,2,1]
	]"""

    def permute(self, nums: List[int]) -> List[List[int]]:
        
        def fn(i):
            """Backtracking to get permutations (not Heap's algo)"""
            if i == len(nums): ans.append(nums.copy())
            for j in range(i, len(nums)): 
                nums[i], nums[j] = nums[j], nums[i]
                fn(i+1)
                nums[i], nums[j] = nums[j], nums[i]
            
        ans = []
        fn(0)
        return ans 


    """47. Permutations II (Medium)
	Given a collection of numbers that might contain duplicates, return all 
	possible unique permutations.

	Example:
	Input: [1,1,2]
	Output:
	[
	  [1,1,2],
	  [1,2,1],
	  [2,1,1]
	]"""

    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        
        def fn(i):
            """Backtracking to get permutations (not Heap's algo)"""
            if i == len(nums): ans.append(nums.copy())
            seen = set()
            for k in range(i, len(nums)):
                if nums[k] not in seen:
                    seen.add(nums[k])
                    nums[i], nums[k] = nums[k], nums[i]
                    fn(i+1)
                    nums[i], nums[k] = nums[k], nums[i]
        
        ans = []
        fn(0)
        return ans 

    """48. Rotate Image (Medium)
	You are given an n x n 2D matrix representing an image. Rotate the image by 
	90 degrees (clockwise).

	Note:
	You have to rotate the image in-place, which means you have to modify the 
	input 2D matrix directly. DO NOT allocate another 2D matrix and do the 
	rotation.

	Example 1:
	Given input matrix = 
	[
	  [1,2,3],
	  [4,5,6],
	  [7,8,9]
	],
	rotate the input matrix in-place such that it becomes:
	[
	  [7,4,1],
	  [8,5,2],
	  [9,6,3]
	]

	Example 2:
	Given input matrix =
	[
	  [ 5, 1, 9,11],
	  [ 2, 4, 8,10],
	  [13, 3, 6, 7],
	  [15,14,12,16]
	], 
	rotate the input matrix in-place such that it becomes:
	[
	  [15,13, 2, 5],
	  [14, 3, 4, 1],
	  [12, 6, 8, 9],
	  [16, 7,10,11]
	]"""

    def rotate(self, matrix: List[List[int]]) -> None:
        matrix[:] = [list(x) for x in zip(*matrix[::-1])]


    """49. Group Anagrams (Medium)
	Given an array of strings, group anagrams together.

	Example:
	Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
	Output:
	[
	  ["ate","eat","tea"],
	  ["nat","tan"],
	  ["bat"]
	]
	
	Note:
	All inputs will be in lowercase.
	The order of your output does not matter."""
    
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        ans = dict()
        for word in strs:
            ans.setdefault("".join(sorted(word)), []).append(word)
        return ans.values()


    """50. Pow(x, n) (Medium)
	Implement pow(x, n), which calculates x raised to the power n (x^n).

	Example 1:
	Input: 2.00000, 10
	Output: 1024.00000

	Example 2:
	Input: 2.10000, 3
	Output: 9.26100

	Example 3:
	Input: 2.00000, -2
	Output: 0.25000
	Explanation: 2-2 = 1/22 = 1/4 = 0.25

	Note:
	-100.0 < x < 100.0
	n is a 32-bit signed integer, within the range [−2^31, 2^31 − 1]"""

    def myPow(self, x: float, n: int) -> float:
        if n < 0: x, n = 1/x, -n
        ans = 1
        while n: 
            if n & 1: ans *= x
            x, n = x*x, n//2
        return ans 


    """51. N-Queens (Hard)
	The n-queens puzzle is the problem of placing n queens on an n×n chessboard 
	such that no two queens attack each other. Given an integer n, return all 
	distinct solutions to the n-queens puzzle. Each solution contains a 
	distinct board configuration of the n-queens' placement, where 'Q' and '.' 
	both indicate a queen and an empty space respectively.

	Example:
	Input: 4
	Output: [
	 [".Q..",  // Solution 1
	  "...Q",
	  "Q...",
	  "..Q."],

	 ["..Q.",  // Solution 2
	  "Q...",
	  "...Q",
	  ".Q.."]
	]
	Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above."""

    def solveNQueens(self, n: int) -> List[List[str]]:
        
        def fn(i, seen):
            """Populate ans through backtracking row by row"""
            if i == n: ans.append(["".join(row) for row in sol])
            for j in range(n):
                place = {("col", j), ("diag", i-j), ("anti", i+j)}
                if not (place & seen): 
                    sol[i][j] = "Q"
                    seen |= place
                    fn(i+1, seen)
                    sol[i][j] = "."
                    seen -= place 
                    
        ans, sol = [], [["."]*n for _ in range(n)]
        fn(0, set())
        return ans 


    """52. N-Queens II (Hard)
	The n-queens puzzle is the problem of placing n queens on an n×n chessboard 
	such that no two queens attack each other. Given an integer n, return the 
	number of distinct solutions to the n-queens puzzle.

	Example:
	Input: 4
	Output: 2
	Explanation: There are two distinct solutions to the 4-queens puzzle as shown below.
	[
	 [".Q..",  // Solution 1
	  "...Q",
	  "Q...",
	  "..Q."],

	 ["..Q.",  // Solution 2
	  "Q...",
	  "...Q",
	  ".Q.."]
	]"""

    def totalNQueens(self, n: int) -> int:
        
        def fn(i, seen=set(), ans=0):
            """Return the number of solutions"""
            if i == n: ans += 1
            for j in range(n):
                place = {("col", j), ("diag", i-j), ("anti", i+j)}
                if not (place & seen): 
                    seen |= place
                    ans = fn(i+1, seen, ans)
                    seen -= place 
            return ans 
        
        return fn(0)


    """53. Maximum Subarray (Easy)
	Given an integer array nums, find the contiguous subarray (containing at 
	least one number) which has the largest sum and return its sum.

	Example:

	Input: [-2,1,-3,4,-1,2,1,-5,4],
	Output: 6
	Explanation: [4,-1,2,1] has the largest sum = 6.
	
	Follow up: If you have figured out the O(n) solution, try coding another 
	solution using the divide and conquer approach, which is more subtle."""

    def maxSubArray(self, nums: List[int]) -> int:
        ans, val = float("-inf"), 0
        for x in nums:
            val = max(0, val) + x
            ans = max(ans, val)
        return ans 


    """54. Spiral Matrix (Medium)
	Given a matrix of m x n elements (m rows, n columns), return all elements 
	of the matrix in spiral order.

	Example 1:
	Input:
	[
	 [ 1, 2, 3 ],
	 [ 4, 5, 6 ],
	 [ 7, 8, 9 ]
	]
	Output: [1,2,3,6,9,8,7,4,5]

	Example 2:
	Input:
	[
	  [1, 2, 3, 4],
	  [5, 6, 7, 8],
	  [9,10,11,12]
	]
	Output: [1,2,3,4,8,12,11,10,9,5,6,7]"""

    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix: return [] #edge case 
        ans = []
        m, n = len(matrix), len(matrix[0])
        i, j, di, dj, k = 0, 0, 0, 1, 0  #position, direction & side
        bd = [0, n, m, 0] #boundary (top|right|bottom|left)
        for _ in range(m*n): 
            ans.append(matrix[i][j])
            if not(bd[0] <= i + di < bd[2] and bd[3] <= j + dj < bd[1]): 
                di, dj = dj, -di           #rotate 
                if k in (0, 3): bd[k] += 1 #top or left boundary
                else: bd[k] -= 1           #bottom or right boundary
                k = (k+1)%4
            i, j = i+di, j+dj
        return ans 


    """55. Jump Game (Medium)
	Given an array of non-negative integers, you are initially positioned at 
	the first index of the array. Each element in the array represents your 
	maximum jump length at that position. Determine if you are able to reach 
	the last index.

	Example 1:
	Input: nums = [2,3,1,1,4]
	Output: true
	Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

	Example 2:
	Input: nums = [3,2,1,0,4]
	Output: false
	Explanation: You will always arrive at index 3 no matter what. Its maximum 
	jump length is 0, which makes it impossible to reach the last index.

	Constraints:
	1 <= nums.length <= 3 * 10^4
	0 <= nums[i][j] <= 10^5"""

    def canJump(self, nums: List[int]) -> bool:
        limit = 0
        for i in range(len(nums)): 
            if i > limit: return False 
            limit = max(limit, i + nums[i])
        return True 




    """56. Merge Intervals (Medium)
	Given a collection of intervals, merge all overlapping intervals.

	Example 1:
	Input: [[1,3],[2,6],[8,10],[15,18]]
	Output: [[1,6],[8,10],[15,18]]
	Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into 
	[1,6].

	Example 2:
	Input: [[1,4],[4,5]]
	Output: [[1,5]]
	Explanation: Intervals [1,4] and [4,5] are considered overlapping.

	NOTE: input types have been changed on April 15, 2019. Please reset to 
	default code definition to get new method signature."""

    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        ans = []
        for interval in intervals: 
            if ans and ans[-1][1] >= interval[0]: 
                ans[-1][1] = max(ans[-1][1], interval[1])
            else: ans.append(interval)
        return ans


    """57. Insert Interval (Hard)
	Given a set of non-overlapping intervals, insert a new interval into the 
	intervals (merge if necessary). You may assume that the intervals were 
	initially sorted according to their start times.

	Example 1:
	Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
	Output: [[1,5],[6,9]]

	Example 2:
	Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
	Output: [[1,2],[3,10],[12,16]]
	Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

	NOTE: input types have been changed on April 15, 2019. Please reset to 
	default code definition to get new method signature."""

    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        ans = []
        for i, interval in enumerate(intervals): 
            if interval[1] < newInterval[0]: ans.append(interval)
            elif not (newInterval[1] < interval[0]): 
                newInterval[0] = min(newInterval[0], interval[0])
                newInterval[1] = max(newInterval[1], interval[1])
            else: 
                ans.append(newInterval)
                return ans + intervals[i:]
        return ans + [newInterval]

    """58. Length of Last Word (Easy)
	Given a string s consists of upper/lower-case alphabets and empty space 
	characters ' ', return the length of last word (last word means the last 
	appearing word if we loop from left to right) in the string. If the last 
	word does not exist, return 0.

	Note: A word is defined as a maximal substring consisting of non-space 
	characters only.

	Example:
	Input: "Hello World"
	Output: 5"""

    def lengthOfLastWord(self, s: str) -> int:
        words = s.split()
        return len(words[-1]) if words else 0


    """59. Spiral Matrix II (Medium)
	Given a positive integer n, generate a square matrix filled with elements 
	from 1 to n2 in spiral order.

	Example:
	Input: 3
	Output:
	[
	 [ 1, 2, 3 ],
	 [ 8, 9, 4 ],
	 [ 7, 6, 5 ]
	]"""

    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0]*n for _ in range(n)]
        i, j, di, dj = 0, 0, 0, 1
        for v in range(1, n*n+1):
            matrix[i][j] = v
            if matrix[(i+di)%n][(j+dj)%n]: di, dj = dj, -di
            i, j = i+di, j+dj
        return matrix 


    """60. Permutation Sequence (Medium)
	The set [1,2,3,...,n] contains a total of n! unique permutations. By 
	listing and labeling all of the permutations in order, we get the following 
	sequence for n = 3:

	"123"
	"132"
	"213"
	"231"
	"312"
	"321"

	Given n and k, return the kth permutation sequence.

	Note:
	Given n will be between 1 and 9 inclusive.
	Given k will be between 1 and n! inclusive.

	Example 1:
	Input: n = 3, k = 3
	Output: "213"

	Example 2:
	Input: n = 4, k = 9
	Output: "2314" """

    def getPermutation(self, n: int, k: int) -> str:
        k -= 1
        ans, digits = [], list(range(1, n+1))
        for i in range(n):
            d, k = divmod(k, factorial(n-i-1))
            ans.append(digits.pop(d))
        return "".join(str(x) for x in ans)


    """61. Rotate List (Medium)
	Given a linked list, rotate the list to the right by k places, where k is 
	non-negative.

	Example 1:
	Input: 1->2->3->4->5->NULL, k = 2
	Output: 4->5->1->2->3->NULL
	Explanation:
	rotate 1 steps to the right: 5->1->2->3->4->NULL
	rotate 2 steps to the right: 4->5->1->2->3->NULL

	Example 2:
	Input: 0->1->2->NULL, k = 4
	Output: 2->0->1->NULL
	Explanation:
	rotate 1 steps to the right: 2->0->1->NULL
	rotate 2 steps to the right: 1->2->0->NULL
	rotate 3 steps to the right: 0->1->2->NULL
	rotate 4 steps to the right: 2->0->1->NULL"""

    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head: return None
        
        n, node = 0, head
        while node: n, node = n+1, node.next
        
        k %= n
        if k: 
            fast = slow = head 
            while fast.next: 
                if k == 0: slow = slow.next
                else: k -= 1
                fast = fast.next 
            head, fast.next, slow.next = slow.next, head, None
        return head


    """62. Unique Paths (Medium)
	A robot is located at the top-left corner of a m x n grid (marked 'Start' 
	in the diagram below). The robot can only move either down or right at any 
	point in time. The robot is trying to reach the bottom-right corner of the 
	grid (marked 'Finish' in the diagram below). How many possible unique paths 
	are there?

	Example 1:
	Input: m = 3, n = 2
	Output: 3
	Explanation:
	From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
	1. Right -> Right -> Down
	2. Right -> Down -> Right
	3. Down -> Right -> Right

	Example 2:
	Input: m = 7, n = 3
	Output: 28

	Constraints:
	1 <= m, n <= 100
	It's guaranteed that the answer will be less than or equal to 2 * 10 ^ 9."""
    
    def uniquePaths(self, m: int, n: int) -> int:
        
        def choose(n, k): 
            """Return n choose k"""
            ans, k = 1, min(k, n-k)
            for i in range(k):
                ans *= n-i
                ans //= i+1
            return ans 
        
        return choose(m+n-2, m-1)


    """63. Unique Paths II (Medium)
	A robot is located at the top-left corner of a m x n grid (marked 'Start' 
	in the diagram below). The robot can only move either down or right at any 
	point in time. The robot is trying to reach the bottom-right corner of the 
	grid (marked 'Finish' in the diagram below). Now consider if some obstacles 
	are added to the grids. How many unique paths would there be? An obstacle 
	and empty space is marked as 1 and 0 respectively in the grid.

	Note: m and n will be at most 100.

	Example 1:
	Input:
	[
	  [0,0,0],
	  [0,1,0],
	  [0,0,0]
	]
	Output: 2
	Explanation:
	There is one obstacle in the middle of the 3x3 grid above.
	There are two ways to reach the bottom-right corner:
	1. Right -> Right -> Down -> Down
	2. Down -> Down -> Right -> Right"""

    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        
        @lru_cache(None)
        def fn(i, j): 
            """Return number of unique paths ending at (i, j)"""
            if i < 0 or j < 0 or obstacleGrid[i][j]: return 0
            if i == 0 and j == 0: return 1 
            return fn(i-1, j) + fn(i, j-1)
        
        return fn(m-1, n-1)


    """64. Minimum Path Sum (Medium)
	Given a m x n grid filled with non-negative numbers, find a path from top 
	left to bottom right which minimizes the sum of all numbers along its path.
	Note: You can only move either down or right at any point in time.

	Example:

	Input:
	[
	  [1,3,1],
	  [1,5,1],
	  [4,2,1]
	]
	Output: 7
	Explanation: Because the path 1→3→1→1→1 minimizes the sum."""

    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        @lru_cache(None)
        def fn(i, j): 
            """Return min path sum ending at (i, j)"""
            if i == 0 and j == 0: return grid[i][j]
            if i < 0 or j < 0: return float("inf")
            return grid[i][j] + min(fn(i-1, j), fn(i, j-1))
        
        return fn(m-1, n-1)


    """65. Valid Number (Hard)
	Validate if a given string can be interpreted as a decimal number.

	Some examples:
	"0"         => true
	" 0.1 "     => true
	"abc"       => false
	"1 a"       => false
	"2e10"      => true
	" -90e3   " => true
	" 1e"       => false
	"e3"        => false
	" 6e-1"     => true
	" 99e2.5 "  => false
	"53.5e93"   => true
	" --6 "     => false
	"-+3"       => false
	"95a54e53"  => false

	Note: It is intended for the problem statement to be ambiguous. You should 
	gather all requirements up front before implementing one. However, here is 
	a list of characters that can be in a valid decimal number:

	Numbers 0-9
	Exponent - "e"
	Positive/negative sign - "+"/"-"
	Decimal point - "."
	Of course, the context of these characters also matters in the input.

	Update (2015-02-10): The signature of the C++ function had been updated. If 
	you still see your function signature accepts a const char * argument, 
	please click the reload button to reset your code definition."""

    def isNumber(self, s: str) -> bool:
        dfa = [{'space': 0, 'sign': 1, 'digit': 2, '.': 3}, #state 0 - leading space
               {'digit': 2, '.': 3},                        #state 1 - sign
               {'digit': 2, '.': 4, 'e': 5, 'space': 8},    #state 2 - digit (terminal)
               {'digit': 4},                                #state 3 - dot
               {'digit': 4, 'e': 5, 'space': 8},            #state 4 - digit post dot (terminal)
               {'sign': 6, 'digit': 7},                     #state 5 - exponential 
               {'digit': 7},                                #state 6 - sign post exponential 
               {'digit': 7, 'space': 8},                    #state 7 - digit post exponential (terminal)
               {'space': 8}                                 #state 8 - trailing space (terminal)
              ]
        
        state = 0
        for c in s: 
            if c in "0123456789": c = "digit"
            elif c == " ":  c = "space"
            elif c in "+-": c = "sign"
            
            if c not in dfa[state]: return False 
            state = dfa[state][c]
            
        return state in [2, 4, 7, 8]


    """66. Plus One (Easy)
	Given a non-empty array of digits representing a non-negative integer, plus 
	one to the integer. The digits are stored such that the most significant 
	digit is at the head of the list, and each element in the array contain a 
	single digit. You may assume the integer does not contain any leading zero, 
	except the number 0 itself.

	Example 1:
	Input: [1,2,3]
	Output: [1,2,4]
	Explanation: The array represents the integer 123.

	Example 2:
	Input: [4,3,2,1]
	Output: [4,3,2,2]
	Explanation: The array represents the integer 4321."""

    def plusOne(self, digits: List[int]) -> List[int]:
        carry = 1
        for i in reversed(range(len(digits))):
            carry, digits[i] = divmod(digits[i] + carry, 10)
            if not carry: return digits
        return [carry] + digits


    """67. Add Binary (Easy)
	Given two binary strings, return their sum (also a binary string). The 
	input strings are both non-empty and contains only characters 1 or 0.

	Example 1:
	Input: a = "11", b = "1"
	Output: "100"

	Example 2:
	Input: a = "1010", b = "1011"
	Output: "10101"

	Constraints:
	Each string consists only of '0' or '1' characters.
	1 <= a.length, b.length <= 10^4
	Each string is either "0" or doesn't contain any leading zero."""

    def addBinary(self, a: str, b: str) -> str:
        ans, carry = [], 0
        for x, y in zip_longest(reversed(a), reversed(b), fillvalue=0):
            carry += (x == "1") + (y == "1")
            carry, d = divmod(carry, 2)
            ans.append(d)
        if carry: ans.append(carry)
        return "".join(map(str, reversed(ans)))


    """68. Text Justification (Hard)
	Given an array of words and a width maxWidth, format the text such that 
	each line has exactly maxWidth characters and is fully (left and right) 
	justified. You should pack your words in a greedy approach; that is, pack 
	as many words as you can in each line. Pad extra spaces ' ' when necessary 
	so that each line has exactly maxWidth characters. Extra spaces between 
	words should be distributed as evenly as possible. If the number of spaces 
	on a line do not divide evenly between words, the empty slots on the left 
	will be assigned more spaces than the slots on the right. For the last line 
	of text, it should be left justified and no extra space is inserted between 
	words.

	Note:
	A word is defined as a character sequence consisting of non-space 
	characters only. Each word's length is guaranteed to be greater than 0 and 
	not exceed maxWidth. The input array words contains at least one word.

	Example 1:
	Input:
	words = ["This", "is", "an", "example", "of", "text", "justification."]
	maxWidth = 16
	Output:
	[
	   "This    is    an",
	   "example  of text",
	   "justification.  "
	]
	
	Example 2:
	Input:
	words = ["What","must","be","acknowledgment","shall","be"]
	maxWidth = 16
	Output:
	[
	  "What   must   be",
	  "acknowledgment  ",
	  "shall be        "
	]
	Explanation: Note that the last line is "shall be    " instead of "shall     be",
	             because the last line must be left-justified instead of fully-justified.
	             Note that the second line is also left-justified becase it contains only one word.

	Example 3:
	Input:
	words = ["Science","is","what","we","understand","well","enough","to","explain",
	         "to","a","computer.","Art","is","everything","else","we","do"]
	maxWidth = 20
	Output:
	[
	  "Science  is  what we",
	  "understand      well",
	  "enough to explain to",
	  "a  computer.  Art is",
	  "everything  else  we",
	  "do                  "
	]"""

    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        ans = []
        line, width = [], 0
        
        for word in words: 
            if width + len(line) + len(word) > maxWidth: 
                n, k = divmod(maxWidth - width, max(1, len(line)-1))
                for i in range(max(1, len(line)-1)): 
                    line[i] += " " * (n + (i < k))
                ans.append("".join(line))
                line, width = [], 0
            line.append(word)
            width += len(word)
            
        ans.append(" ".join(line).ljust(maxWidth))
        return ans 


    """64. Minimum Path Sum (Medium)
	Given a m x n grid filled with non-negative numbers, find a path from top 
	left to bottom right which minimizes the sum of all numbers along its path.

	Note: You can only move either down or right at any point in time.

	Example:
	Input:
	[
	  [1,3,1],
	  [1,5,1],
	  [4,2,1]
	]
	Output: 7
	Explanation: Because the path 1→3→1→1→1 minimizes the sum."""

    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        @lru_cache(None)
        def fn(i, j): 
            """Return min path sum ending at (i, j)"""
            if i == 0 and j == 0: return grid[i][j]
            if i < 0 or j < 0: return float("inf")
            return grid[i][j] + min(fn(i-1, j), fn(i, j-1))
        
        return fn(m-1, n-1)


    """70. Climbing Stairs (Easy)
	You are climbing a stair case. It takes n steps to reach to the top. Each 
	time you can either climb 1 or 2 steps. In how many distinct ways can you 
	climb to the top?

	Note: Given n will be a positive integer.

	Example 1:
	Input: 2
	Output: 2
	Explanation: There are two ways to climb to the top.
	1. 1 step + 1 step
	2. 2 steps

	Example 2:
	Input: 3
	Output: 3
	Explanation: There are three ways to climb to the top.
	1. 1 step + 1 step + 1 step
	2. 1 step + 2 steps
	3. 2 steps + 1 step"""

    def climbStairs(self, n: int) -> int:
        
        @lru_cache(None)
        def fn(k): 
            """Return kth Fibonacci number"""
            if k <= 1: return 1
            return fn(k-1) + fn(k-2)
        
        return fn(n)


    """71. Simplify Path (Medium)
	Given an absolute path for a file (Unix-style), simplify it. Or in other 
	words, convert it to the canonical path. In a UNIX-style file system, a 
	period . refers to the current directory. Furthermore, a double period .. 
	moves the directory up a level. Note that the returned canonical path must 
	always begin with a slash /, and there must be only a single slash / 
	between two directory names. The last directory name (if it exists) must 
	not end with a trailing /. Also, the canonical path must be the shortest 
	string representing the absolute path.

	Example 1:
	Input: "/home/"
	Output: "/home"
	Explanation: Note that there is no trailing slash after the last directory name.

	Example 2:
	Input: "/../"
	Output: "/"
	Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.

	Example 3:
	Input: "/home//foo/"
	Output: "/home/foo"
	Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.

	Example 4:
	Input: "/a/./b/../../c/"
	Output: "/c"

	Example 5:
	Input: "/a/../../b/../c//.//"
	Output: "/c"

	Example 6:
	Input: "/a//b////c/d//././/.."
	Output: "/a/b/c" """

    def simplifyPath(self, path: str) -> str:
        stack = []
        for file in path.split("/"):
            if file == "..": 
                if stack: stack.pop()
            elif file not in ("", "."): 
                stack.append(file)
        return "/" + "/".join(stack)


    """72. Edit Distance (Hard)
	Given two words word1 and word2, find the minimum number of operations 
	required to convert word1 to word2. You have the following 3 operations 
	permitted on a word:
	- Insert a character
	- Delete a character
	- Replace a character
	
	Example 1:
	Input: word1 = "horse", word2 = "ros"
	Output: 3
	Explanation: 
	horse -> rorse (replace 'h' with 'r')
	rorse -> rose (remove 'r')
	rose -> ros (remove 'e')

	Example 2:
	Input: word1 = "intention", word2 = "execution"
	Output: 5
	Explanation: 
	intention -> inention (remove 't')
	inention -> enention (replace 'i' with 'e')
	enention -> exention (replace 'n' with 'x')
	exention -> exection (replace 'n' with 'c')
	exection -> execution (insert 'u')"""

    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        
        @lru_cache(None)
        def fn(i, j): 
            """Return edit distance between word1[i:] and word2[j:]"""
            if i == m or j == n: return m + n - i - j
            if word1[i] == word2[j]: return fn(i+1, j+1)
            return 1 + min(fn(i+1, j), fn(i, j+1), fn(i+1, j+1))
        
        return fn(0, 0)


    """73. Set Matrix Zeroes (Medium)
	Given a m x n matrix, if an element is 0, set its entire row and column to 
	0. Do it in-place.

	Example 1:
	Input: 
	[
	  [1,1,1],
	  [1,0,1],
	  [1,1,1]
	]
	Output: 
	[
	  [1,0,1],
	  [0,0,0],
	  [1,0,1]
	]

	Example 2:
	Input: 
	[
	  [0,1,2,0],
	  [3,4,5,2],
	  [1,3,1,5]
	]
	Output: 
	[
	  [0,0,0,0],
	  [0,4,5,0],
	  [0,3,1,0]
	]

	Follow up:
	A straight forward solution using O(mn) space is probably a bad idea. A 
	simple improvement uses O(m + n) space, but still not the best solution.
	Could you devise a constant space solution?"""

    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        zero = False 
        
        for i in range(m):
            if not matrix[i][0]: zero = True
            for j in range(1, n): 
                if not matrix[i][j]: matrix[i][0] = matrix[0][j] = 0
        
        for i in reversed(range(m)):
            for j in reversed(range(1, n)):
                if not matrix[i][0] or not matrix[0][j]: matrix[i][j] = 0
            if zero: matrix[i][0] = 0


    """74. Search a 2D Matrix (Medium)
	Write an efficient algorithm that searches for a value in an m x n matrix. 
	This matrix has the following properties: 
	- Integers in each row are sorted from left to right.
	- The first integer of each row is greater than the last integer of the 
	previous row.
	
	Example 1:
	Input:
	matrix = [
	  [1,   3,  5,  7],
	  [10, 11, 16, 20],
	  [23, 30, 34, 50]
	]
	target = 3
	Output: true

	Example 2:
	Input:
	matrix = [
	  [1,   3,  5,  7],
	  [10, 11, 16, 20],
	  [23, 30, 34, 50]
	]
	target = 13
	Output: false"""

    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix: return False #edge case 
        
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m*n
        while lo < hi: 
            mid = (lo + hi)//2
            i, j = divmod(mid, n)
            if matrix[i][j] == target: return True
            elif matrix[i][j] > target: hi = mid
            else: lo = mid+1
        return False 


    """75. Sort Colors (Medium)
	Given an array with n objects colored red, white or blue, sort them in-
	place so that objects of the same color are adjacent, with the colors in 
	the order red, white and blue. Here, we will use the integers 0, 1, and 2 
	to represent the color red, white, and blue respectively.

	Note: You are not suppose to use the library's sort function for this problem.

	Example:
	Input: [2,0,2,1,1,0]
	Output: [0,0,1,1,2,2]
	Follow up:

	A rather straight forward solution is a two-pass algorithm using counting 
	sort. First, iterate the array counting number of 0's, 1's, and 2's, then 
	overwrite array with total number of 0's, then 1's and followed by 2's.
	Could you come up with a one-pass algorithm using only constant space?"""

    def sortColors(self, nums: List[int]) -> None:
        """Dijkstra's three-way partition"""
        lo, mid, hi = 0, 0, len(nums)
        
        while mid < hi: 
            if nums[mid] < 1: 
                nums[lo], nums[mid] = nums[mid], nums[lo]
                lo, mid = lo+1, mid+1
            elif nums[mid] > 1:
                hi -= 1
                nums[mid], nums[hi] = nums[hi], nums[mid]
            else:
                mid += 1
        

    """76. Minimum Window Substring (Hard)
	Given a string S and a string T, find the minimum window in S which will 
	contain all the characters in T in complexity O(n).

	Example:
	Input: S = "ADOBECODEBANC", T = "ABC"
	Output: "BANC"
	Note:

	If there is no such window in S that covers all characters in T, return the 
	empty string "". If there is such window, you are guaranteed that there 
	will always be only one unique minimum window in S."""

    def minWindow(self, s: str, t: str) -> str:
        freq = dict()
        for c in t: freq[c] = 1 + freq.get(c, 0) #target freq table 
        
        count = ii = jj = 0
        queue, ts = deque(), set(t)
        for j, c in enumerate(s):
            if c in ts: 
                queue.append((j, c))
                freq[c] -= 1
                if freq[c] == 0: count += 1 #enough c in s
                while count == len(ts): 
                    i, c = queue.popleft()
                    if not jj or j - i < jj - ii: ii, jj = i, j+1
                    if freq[c] == 0: count -= 1 #not enough c in s
                    freq[c] += 1
        return s[ii:jj]


    """77. Combinations (Medium)
	Given two integers n and k, return all possible combinations of k numbers 
	out of 1 ... n.

	Example:
	Input: n = 4, k = 2
	Output:
	[
	  [2,4],
	  [3,4],
	  [2,3],
	  [1,2],
	  [1,3],
	  [1,4],
	]"""

    def combine(self, n: int, k: int) -> List[List[int]]:
        
        def fn(i): 
            """Populate ans using a stack"""
            if len(stack) == k: return ans.append(stack.copy())
            for ii in range(i+1, n+1): 
                stack.append(ii)
                fn(ii)
                stack.pop()
        
        ans, stack = [], []
        fn(0)
        return ans 


    """78. Subsets (Medium)
	Given a set of distinct integers, nums, return all possible subsets (the 
	power set). Note that the solution set must not contain duplicate subsets.

	Example:
	Input: nums = [1,2,3]
	Output:
	[
	  [3],
	  [1],
	  [2],
	  [1,2,3],
	  [1,3],
	  [2,3],
	  [1,2],
	  []
	]"""

    def subsets(self, nums: List[int]) -> List[List[int]]:
        
        def fn(i):
            """Populate ans using a stack"""
            if len(nums) == i: return ans.append(stack.copy())
            fn(i+1)
            stack.append(nums[i])
            fn(i+1)
            stack.pop()
                
        ans, stack = [], []
        fn(0)
        return ans 


    """79. Word Search (Medium)
	Given a 2D board and a word, find if the word exists in the grid. The word 
	can be constructed from letters of sequentially adjacent cell, where 
	"adjacent" cells are those horizontally or vertically neighboring. The same 
	letter cell may not be used more than once.

	Example:
	board =
	[
	  ['A','B','C','E'],
	  ['S','F','C','S'],
	  ['A','D','E','E']
	]

	Given word = "ABCCED", return true.
	Given word = "SEE", return true.
	Given word = "ABCB", return false.

	Constraints:
	board and word consists only of lowercase and uppercase English letters.
	1 <= board.length <= 200
	1 <= board[i].length <= 200
	1 <= word.length <= 10^3"""

    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        
        def fn(i, j, k):
            """Return True if a series starting from (i, j) matches word[k:]"""
            if k == len(word): return True 
            if not (0 <= i < m and 0 <= j < n) or (i, j) in seen or board[i][j] != word[k]: return False 
            
            seen.add((i, j))
            ans = any(fn(i+di, j+dj, k+1) for di, dj in ((-1, 0), (0, -1), (1, 0), (0, 1)))
            seen.remove((i, j))
            return ans 
        
        seen = set()
        return any(fn(i, j, 0) for i in range(m) for j in range(n))


    """80. Remove Duplicates from Sorted Array II (Medium)
	Given a sorted array nums, remove the duplicates in-place such that 
	duplicates appeared at most twice and return the new length. Do not 
	allocate extra space for another array, you must do this by modifying the 
	input array in-place with O(1) extra memory.

	Example 1:
	Given nums = [1,1,1,2,2,3], your function should return length = 5, with 
	the first five elements of nums being 1, 1, 2, 2 and 3 respectively. It 
	doesn't matter what you leave beyond the returned length.
	
	Example 2:
	Given nums = [0,0,1,1,1,1,2,3,3], your function should return length = 7, 
	with the first seven elements of nums being modified to 0, 0, 1, 1, 2, 3 
	and 3 respectively. It doesn't matter what values are set beyond the 
	returned length.
	
	Clarification:
	Confused why the returned value is an integer but your answer is an array?
	Note that the input array is passed in by reference, which means 
	modification to the input array will be known to the caller as well.

	Internally you can think of this:
	// nums is passed in by reference. (i.e., without making a copy)
	int len = removeDuplicates(nums);

	// any modification to nums in your function would be known by the caller.
	// using the length returned by your function, it prints the first len 
	elements.
	for (int i = 0; i < len; i++) {
	    print(nums[i]);
	}"""

    def removeDuplicates(self, nums: List[int]) -> int:
        i = 0
        for num in nums:
            if i < 2 or nums[i-2] < num: 
                nums[i] = num
                i += 1
        return i


    """81. Search in Rotated Sorted Array II (Medium)
	Suppose an array sorted in ascending order is rotated at some pivot unknown 
	to you beforehand. (i.e., [0,0,1,2,2,5,6] might become [2,5,6,0,0,1,2]). 
	You are given a target value to search. If found in the array return true, 
	otherwise return false.

	Example 1:
	Input: nums = [2,5,6,0,0,1,2], target = 0
	Output: true

	Example 2:
	Input: nums = [2,5,6,0,0,1,2], target = 3
	Output: false

	Follow up: This is a follow up problem to Search in Rotated Sorted Array, 
	where nums may contain duplicates. Would this affect the run-time 
	complexity? How and why?"""

    def search(self, nums: List[int], target: int) -> bool:
        
        def fn(lo, hi):
            """Return True if target is found in nums[lo:hi+1]"""
            if hi < lo: return False 
            if lo == hi: return nums[lo] == target
            
            mid = (lo + hi)//2
            if nums[mid] == target: return True
            if nums[lo] < nums[mid]: 
                if nums[lo] <= target < nums[mid]: return fn(lo, mid-1)
                else: return fn(mid+1, hi)
            elif nums[mid] < nums[hi]:
                if nums[mid] < target <= nums[hi]: return fn(mid+1, hi)
                else: return fn(lo, mid-1)
            else: #nums[lo] == nums[mid] == nums[hi]
                return fn(lo, mid-1) or fn(mid+1, hi)
        
        return fn(0, len(nums)-1)


    """82. Remove Duplicates from Sorted List II (Medium)
	Given a sorted linked list, delete all nodes that have duplicate numbers, 
	leaving only distinct numbers from the original list. Return the linked 
	list sorted as well.

	Example 1:
	Input: 1->2->3->3->4->4->5
	Output: 1->2->5

	Example 2:
	Input: 1->1->1->2->3
	Output: 2->3"""

    def deleteDuplicates(self, head: ListNode) -> ListNode:
        slow = fast = dummy = ListNode(None, head)
        prev = None
        while fast: 
            if fast.val == prev or (fast.next and fast.val == fast.next.val): 
                slow.next = fast.next
            else: 
                slow = slow.next
            prev = fast.val
            fast = fast.next
        return dummy.next 


    """83. Remove Duplicates from Sorted List (Easy)
	Given a sorted linked list, delete all duplicates such that each element 
	appear only once.

	Example 1:
	Input: 1->1->2
	Output: 1->2

	Example 2:
	Input: 1->1->2->3->3
	Output: 1->2->3"""

    def deleteDuplicates(self, head: ListNode) -> ListNode:
        slow = fast = head 
        while fast:
            if slow.val == fast.val: slow.next = fast.next
            else: slow = slow.next
            fast = fast.next 
        return head 


    """84. Largest Rectangle in Histogram (Hard)
	Given n non-negative integers representing the histogram's bar height where 
	the width of each bar is 1, find the area of largest rectangle in the 
	histogram.

	Example:
	Input: [2,1,5,6,2,3]
	Output: 10"""

    def largestRectangleArea(self, heights: List[int]) -> int:
        ans, stack = 0, [] #mono-stack (non-decreasing)
        for i in range(len(heights)+1): 
            height = heights[i] if i < len(heights) else 0
            
            while stack and heights[stack[-1]] > height: 
                h = heights[stack.pop()]
                w = i - 1 - stack[-1] if stack else i
                ans = max(ans, h*w)
            stack.append(i)
        return ans 


    """85. Maximal Rectangle (Hard)
	Given a 2D binary matrix filled with 0's and 1's, find the largest 
	rectangle containing only 1's and return its area.

	Example:
	Input:
	[
	  ["1","0","1","0","0"],
	  ["1","0","1","1","1"],
	  ["1","1","1","1","1"],
	  ["1","0","0","1","0"]
	]
	Output: 6"""

    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix: return 0
        ans, m, n = 0, len(matrix), len(matrix[0])
        height, lo, hi = [0]*n, [0]*n, [n]*n #height, lower & upper bound 
        
        for i in range(m): 
            left, right = 0, n #[left:right]
            for j in range(n): 
                if matrix[i][j] == "0": 
                    height[j] = lo[j] = 0
                    left = j+1
                else: 
                    height[j] += 1
                    lo[j] = max(lo[j], left)
                    
                if matrix[i][~j] == "0": 
                    right = n-j-1
                    hi[~j] = n
                else: 
                    hi[~j] = min(hi[~j], right)
            ans = max(ans, max(x*(z-y) for x, y, z in zip(height, lo, hi)))
        return ans 


    """86. Partition List (Medium)
	Given a linked list and a value x, partition it such that all nodes less 
	than x come before nodes greater than or equal to x. You should preserve 
	the original relative order of the nodes in each of the two partitions.

	Example:
	Input: head = 1->4->3->2->5->2, x = 3
	Output: 1->2->2->4->3->5"""

    def partition(self, head: ListNode, x: int) -> ListNode:
        dummy1 = node1 = ListNode()
        dummy2 = node2 = ListNode()
        
        while head: 
            if head.val < x: 
                node1.next = head
                node1 = node1.next
            else:
                node2.next = head
                node2 = node2.next
            head = head.next 
        node2.next = None #terminate list (no cycle)
        node1.next = dummy2.next
        return dummy1.next 


    """87. Scramble String (Hard)
	Given a string s1, we may represent it as a binary tree by partitioning it 
	to two non-empty substrings recursively. Below is one possible 
	representation of s1 = "great":

	    great
	   /    \
	  gr    eat
	 / \    /  \
	g   r  e   at
	           / \
	          a   t
	
	To scramble the string, we may choose any non-leaf node and swap its two 
	children. For example, if we choose the node "gr" and swap its two 
	children, it produces a scrambled string "rgeat".

	    rgeat
	   /    \
	  rg    eat
	 / \    /  \
	r   g  e   at
	           / \
	          a   t
	
	We say that "rgeat" is a scrambled string of "great". Similarly, if we 
	continue to swap the children of nodes "eat" and "at", it produces a 
	scrambled string "rgtae".

	    rgtae
	   /    \
	  rg    tae
	 / \    /  \
	r   g  ta  e
	       / \
	      t   a
	
	We say that "rgtae" is a scrambled string of "great". Given two strings s1 
	and s2 of the same length, determine if s2 is a scrambled string of s1.

	Example 1:
	Input: s1 = "great", s2 = "rgeat"
	Output: true

	Example 2:
	Input: s1 = "abcde", s2 = "caebd"
	Output: false"""

    def isScramble(self, s1: str, s2: str) -> bool:
        
        def fn(s1, s2):
            """Return True if s1 is a scrambled string of s2"""
            if len(s1) == 1: return s1 == s2
            if sorted(s1) != sorted(s2): return False #160ms -> 50ms
            return any(fn(s1[:i], s2[:i]) and fn(s1[i:], s2[i:]) or fn(s1[:i], s2[-i:]) and fn(s1[i:], s2[:-i]) for i in range(1, len(s1)))
        
        return fn(s1, s2)


    """88. Merge Sorted Array (Easy)
	Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as 
	one sorted array.

	Note:
	The number of elements initialized in nums1 and nums2 are m and n respectively.
	You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.

	Example:
	Input:
	nums1 = [1,2,3,0,0,0], m = 3
	nums2 = [2,5,6],       n = 3
	Output: [1,2,2,3,5,6]"""

    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        while n: 
            if m and nums1[m-1] >= nums2[n-1]: 
                nums1[m+n] = nums1[(m:=m-1)]
            else: 
                nums1[m+n] = nums2[(n:=n-1)]


    """89. Gray Code (Medium)
	The gray code is a binary numeral system where two successive values differ 
	in only one bit. Given a non-negative integer n representing the total 
	number of bits in the code, print the sequence of gray code. A gray code 
	sequence must begin with 0.

	Example 1:
	Input: 2
	Output: [0,1,3,2]
	Explanation:
	00 - 0
	01 - 1
	11 - 3
	10 - 2

	For a given n, a gray code sequence may not be uniquely defined. For 
	example, [0,2,3,1] is also a valid gray code sequence.

	00 - 0
	10 - 2
	11 - 3
	01 - 1
	
	Example 2:
	Input: 0
	Output: [0]
	Explanation: We define the gray code sequence to begin with 0. A gray code 
	sequence of n has size = 2n, which for n = 0 the size is 20 = 1. Therefore, 
	for n = 0 the gray code sequence is [0]."""

    def grayCode(self, n: int) -> List[int]:
        return [i ^ (i>>1) for i in range(1 << n)]


    """90. Subsets II (Medium)
	Given a collection of integers that might contain duplicates, nums, return 
	all possible subsets (the power set). Note that the solution set must not 
	contain duplicate subsets.

	Example:
	Input: [1,2,2]
	Output:
	[
	  [2],
	  [1],
	  [1,2,2],
	  [2,2],
	  [1,2],
	  []
	]"""

    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        
        def fn(i):
            """Populate ans using a stack"""
            if len(nums) == i: return ans.append(stack.copy())
            if not stack or nums[i] != stack[-1]: fn(i+1)
            stack.append(nums[i])
            fn(i+1)
            stack.pop()
            
        nums.sort()
        ans, stack = [], []
        fn(0)
        return ans 


    """91. Decode Ways (Medium)
	A message containing letters from A-Z is being encoded to numbers using the 
	following mapping:

	'A' -> 1
	'B' -> 2
	...
	'Z' -> 26
	
	Given a non-empty string containing only digits, determine the total number 
	of ways to decode it.

	Example 1:
	Input: "12"
	Output: 2
	Explanation: It could be decoded as "AB" (1 2) or "L" (12).

	Example 2:
	Input: "226"
	Output: 3
	Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6)."""

    def numDecodings(self, s: str) -> int:
        
        @lru_cache(None)
        def fn(i): 
            """Return decode ways of s[i:]"""
            if i >= len(s): return i == len(s) #boundary condition
            return 0 if s[i] == "0" else fn(i+1) + (int(s[i:i+2]) <= 26)*fn(i+2)
            
        return fn(0)



    """92. Reverse Linked List II (Medium)
	Reverse a linked list from position m to n. Do it in one-pass. Note: 
	1 ≤ m ≤ n ≤ length of list.

	Example:
	Input: 1->2->3->4->5->NULL, m = 2, n = 4
	Output: 1->4->3->2->5->NULL"""

    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        dummy = node = ListNode(next=head)
        for _ in range(m-1): node = node.next 
            
        prev, curr = None, node.next 
        for _ in range(m, n+1): curr.next, curr, prev = prev, curr.next, curr
            
        node.next.next = curr
        node.next = prev
        
        return dummy.next 


    """93. Restore IP Addresses (Medium)
	Given a string containing only digits, restore it by returning all possible 
	valid IP address combinations. A valid IP address consists of exactly four 
	integers (each integer is between 0 and 255) separated by single points.

	Example:
	Input: "25525511135"
	Output: ["255.255.11.135", "255.255.111.35"]"""

    def restoreIpAddresses(self, s: str) -> List[str]:
        
        def fn(i, n): 
            """Populate ans with a stack through backtracking"""
            if not (n <= len(s)-i <= 3*n): return 
            if i == len(s): return ans.append(".".join(stack))
            k = i+1 if s[i] == "0" else i+3
            for j in range(i+1, min(k, len(s))+1): 
                if j == i+3 and s[i:j] > "255": continue
                stack.append(s[i:j])
                fn(j, n-1)
                stack.pop()
            
        ans, stack = [], []
        fn(0, 4)
        return ans 


    """94. Binary Tree Inorder Traversal (Medium)
	Given a binary tree, return the inorder traversal of its nodes' values.

	Example:
	Input: [1,null,2,3]
	   1
	    \
	     2
	    /
	   3

	Output: [1,3,2]"""

    def inorderTraversal(self, root: TreeNode) -> List[int]:
        ans, stack = [], []
        node = root
        while stack or node:
            if node: 
                stack.append(node)
                node = node.left
                continue
            node = stack.pop()
            ans.append(node.val)
            node = node.right
        return ans 


    """95. Unique Binary Search Trees II (Medium)
	Given an integer n, generate all structurally unique BST's (binary search 
	trees) that store values 1 ... n.

	Example:
	Input: 3
	Output:
	[
	  [1,null,3,2],
	  [3,2,null,1],
	  [3,1,null,null,2],
	  [2,1,3],
	  [1,null,2,null,3]
	]
	Explanation:
	The above output corresponds to the 5 unique BST's shown below:

	   1         3     3      2      1
	    \       /     /      / \      \
	     3     2     1      1   3      2
	    /     /       \                 \
	   2     1         2                 3
	 
	Constraints: 0 <= n <= 8"""

    def generateTrees(self, n: int) -> List[TreeNode]:
        
        @lru_cache(None)
        def fn(lo, hi): 
            """Return structurally uniq BST using numbers from lo (inclusive) to hi (exclusive)"""
            if lo == hi: return [None]
            ans = []
            for i in range(lo, hi):
                for left in fn(lo, i):
                    for right in fn(i+1, hi): 
                        ans.append(TreeNode(i, left, right))
            return ans 
        
        return fn(1, n+1) if n else []


    """96. Unique Binary Search Trees (Medium)
	Given n, how many structurally unique BST's (binary search trees) that 
	store values 1 ... n?

	Example:
	Input: 3
	Output: 5
	Explanation:
	Given n = 3, there are a total of 5 unique BST's:

	   1         3     3      2      1
	    \       /     /      / \      \
	     3     2     1      1   3      2
	    /     /       \                 \
	   2     1         2                 3"""

    def numTrees(self, n: int) -> int:
        
        @lru_cache(None)
        def fn(n):
            """Return Catalan number in recursive form"""
            if n == 0: return 1
            return sum(fn(i)*fn(n-i-1) for i in range(n))
        
        return fn(n)


    """97. Interleaving String (Hard)
	Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and 
	s2.

	Example 1:
	Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
	Output: true

	Example 2:
	Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
	Output: false"""

    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        
        @lru_cache(None)
        def fn(i, j): 
            """Return True if s3[i+j:] is formed by interleaving s1[i:] and s2[j:]"""
            if i == len(s1) and j == len(s2): return True
            ans = False
            if i < len(s1) and s1[i] == s3[i+j]: ans = ans or fn(i+1, j)
            if j < len(s2) and s2[j] == s3[i+j]: ans = ans or fn(i, j+1)
            return ans 
        
        if len(s1) + len(s2) != len(s3): return False 
        return fn(0, 0)


    """98. Validate Binary Search Tree (Medium)
	Given a binary tree, determine if it is a valid binary search tree (BST). 
	Assume a BST is defined as follows: The left subtree of a node contains 
	only nodes with keys less than the node's key. The right subtree of a node 
	contains only nodes with keys greater than the node's key. Both the left 
	and right subtrees must also be binary search trees.

	Example 1:

	    2
	   / \
	  1   3

	Input: [2,1,3]
	Output: true

	Example 2:

	    5
	   / \
	  1   4
	     / \
	    3   6

	Input: [5,1,4,null,null,3,6]
	Output: false
	Explanation: The root node's value is 5 but its right child's value is 4."""

    def isValidBST(self, root: TreeNode) -> bool:
         
        def fn(node, lo=-inf, hi=inf):
            """Return True if tree rooted at node is a valid BST bounded between lo and hi"""
            if not node: return True
            return fn(node.left, lo, node.val) and lo < node.val < hi and fn(node.right, node.val, hi)
        
        return fn(root)


    """99. Recover Binary Search Tree (Hard)
	Two elements of a binary search tree (BST) are swapped by mistake. Recover 
	the tree without changing its structure.

	Example 1:
	Input: [1,3,null,null,2]

	   1
	  /
	 3
	  \
	   2

	Output: [3,1,null,null,2]

	   3
	  /
	 1
	  \
	   2

	Example 2:
	Input: [3,1,4,null,null,2]

	  3
	 / \
	1   4
	   /
	  2

	Output: [2,1,4,null,null,3]

	  2
	 / \
	1   4
	   /
	  3

	Follow up:
	A solution using O(n) space is pretty straight forward.
	Could you devise a constant space solution?"""

    def recoverTree(self, root: TreeNode) -> None:
        node, stack = root, []
        prev = lo = hi = None
        while stack or node:
            if node:
                stack.append(node)
                node = node.left
                continue
            node = stack.pop()
            if prev and prev.val > node.val:
                if not lo: lo, hi = prev, node
                else: hi = node
            prev = node
            node = node.right 
        lo.val, hi.val = hi.val, lo.val 


    """100. Same Tree (Easy)
	Given two binary trees, write a function to check if they are the same or 
	not. Two binary trees are considered the same if they are structurally 
	identical and the nodes have the same value.

	Example 1:
	Input:     1         1
	          / \       / \
	         2   3     2   3

	        [1,2,3],   [1,2,3]

	Output: true

	Example 2:
	Input:     1         1
	          /           \
	         2             2

	        [1,2],     [1,null,2]

	Output: false

	Example 3:
	Input:     1         1
	          / \       / \
	         2   1     1   2

	        [1,2,1],   [1,1,2]

	Output: false"""

    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        
        def fn(p, q): 
            """Return True if trees rooted at p and q are structurally identical"""
            if not p or not q: return p is q
            return fn(p.left, q.left) and p.val == q.val and fn(p.right, q.right)
        
        return fn(p, q)


    """101. Symmetric Tree (Easy)
	Given a binary tree, check whether it is a mirror of itself (ie, symmetric 
	around its center). For example, this binary tree [1,2,2,3,4,4,3] is 
	symmetric:

	    1
	   / \
	  2   2
	 / \ / \
	3  4 4  3

	But the following [1,2,2,null,3,null,3] is not:

	    1
	   / \
	  2   2
	   \   \
	   3    3

	Follow up: Solve it both recursively and iteratively."""

    def isSymmetric(self, root: TreeNode) -> bool:
        
        def fn(m, n):
            """Return True if subtrees rooted at m and n are symmetric"""
            if not m or not n: return m is n
            return fn(m.left, n.right) and m.val == n.val and fn(m.right, n.left)
        
        return fn(root, root)


    """102. Binary Tree Level Order Traversal (Medium)
	Given a binary tree, return the level order traversal of its nodes' values. 
	(ie, from left to right, level by level).

	For example:
	Given binary tree [3,9,20,null,null,15,7],
	    3
	   / \
	  9  20
	    /  \
	   15   7
	return its level order traversal as:
	[
	  [3],
	  [9,20],
	  [15,7]
	]"""

    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        ans, queue = [], [root]
        while queue: 
            tmp, val = [], []
            for node in queue: 
                if node: 
                    val.append(node.val)
                    tmp.extend([node.left, node.right])
            if val: ans.append(val)
            queue = tmp 
        return ans 


    """103. Binary Tree Zigzag Level Order Traversal (Medium)
	Given a binary tree, return the zigzag level order traversal of its nodes' 
	values. (ie, from left to right, then right to left for the next level and 
	alternate between).

	For example:
	Given binary tree [3,9,20,null,null,15,7],
	    3
	   / \
	  9  20
	    /  \
	   15   7
	return its zigzag level order traversal as:
	[
	  [3],
	  [20,9],
	  [15,7]
	]"""

    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        ans, queue = [], [root]
        stride = 1
        while queue: 
            tmp, val = [], []
            for node in queue: 
                if node: 
                    val.append(node.val)
                    tmp.extend([node.left, node.right])
            if val: ans.append(val[::stride])
            stride *= -1
            queue = tmp
        return ans 


    """104. Maximum Depth of Binary Tree (Easy)
	Given a binary tree, find its maximum depth. The maximum depth is the 
	number of nodes along the longest path from the root node down to the 
	farthest leaf node. Note that a leaf is a node with no children.

	Example:
	Given binary tree [3,9,20,null,null,15,7],

	    3
	   / \
	  9  20
	    /  \
	   15   7"""

    def maxDepth(self, root: TreeNode) -> int:
        
        def fn(node):
            """Return depth of BST at given node"""
            if not node: return 0
            return 1 + max(fn(node.left), fn(node.right))
        
        return fn(root)


    """105. Construct Binary Tree from Preorder and Inorder Traversal (Medium)
	Given preorder and inorder traversal of a tree, construct the binary tree.

	Note: You may assume that duplicates do not exist in the tree.

	For example, given
	preorder = [3,9,20,15,7]
	inorder = [9,3,15,20,7]
	Return the following binary tree:

	    3
	   / \
	  9  20
	    /  \
	   15   7"""

    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        imap = {v: i for i, v in enumerate(inorder)}
        node = iter(preorder)
        
        def fn(lo, hi): 
            """Return node constructed from inorder[lo:hi]"""
            if lo == hi: return None
            k = imap[next(node)]
            return TreeNode(inorder[k], left=fn(lo, k), right=fn(k+1, hi))
        
        return fn(0, len(preorder))


    """106. Construct Binary Tree from Inorder and Postorder Traversal (Medium)
	Given inorder and postorder traversal of a tree, construct the binary tree.

	Note that you may assume that duplicates do not exist in the tree.

	For example, given inorder = [9,3,15,20,7] and postorder = [9,15,7,20,3], 
	return the following binary tree:

	    3
	   / \
	  9  20
	    /  \
	   15   7"""

    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        imap = {v: i for i, v in enumerate(inorder)}
        
        def fn(lo, hi): 
            """Return root of tree constructed from inorder[lo:hi]"""
            if lo == hi: return None
            mid = imap[postorder.pop()]
            return TreeNode(inorder[mid], right=fn(mid+1, hi), left=fn(lo, mid)) #right sub-tree needs to be created before left sub-tree
        
        return fn(0, len(inorder))


    """107. Binary Tree Level Order Traversal II (Easy)
	Given a binary tree, return the bottom-up level order traversal of its 
	nodes' values. (ie, from left to right, level by level from leaf to root).

	For example:
	Given binary tree [3,9,20,null,null,15,7],
	    3
	   / \
	  9  20
	    /  \
	   15   7
	return its bottom-up level order traversal as:
	[
	  [15,7],
	  [9,20],
	  [3]
	]"""

    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        ans, queue = [], [root]
        while queue: 
            tmp, val = [], []
            for node in queue: 
                if node: 
                    val.append(node.val)
                    tmp.extend([node.left, node.right])
            if val: ans.append(val)
            queue = tmp
        return ans[::-1]


    """108. Convert Sorted Array to Binary Search Tree (Easy)
	Given an array where elements are sorted in ascending order, convert it to 
	a height balanced BST. For this problem, a height-balanced binary tree is 
	defined as a binary tree in which the depth of the two subtrees of every 
	node never differ by more than 1.

	Example:
	Given the sorted array: [-10,-3,0,5,9], one possible answer is: 
	[0,-3,9,-10,null,5], which represents the following height balanced BST:

	      0
	     / \
	   -3   9
	   /   /
	 -10  5"""

    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        
        def fn(lo, hi):
            """Return BST using nums[lo:hi]"""
            if lo == hi: return None
            mid = (lo + hi)//2
            return TreeNode(nums[mid], fn(lo, mid), fn(mid+1, hi))
        
        return fn(0, len(nums))


    """109. Convert Sorted List to Binary Search Tree (Medium)
	Given a singly linked list where elements are sorted in ascending order, 
	convert it to a height balanced BST. For this problem, a height-balanced 
	binary tree is defined as a binary tree in which the depth of the two 
	subtrees of every node never differ by more than 1.

	Example:
	Given the sorted linked list: [-10,-3,0,5,9], one possible answer is: 
	[0,-3,9,-10,null,5], which represents the following height balanced BST:

	      0
	     / \
	   -3   9
	   /   /
	 -10  5"""

    def sortedListToBST(self, head: ListNode) -> TreeNode:
        node, n = head, 0
        while node: node, n = node.next, n+1
            
        def fn(lo, hi, node): 
            """Return root of tree using nodes from lo (inclusive) to hi (exclusive)"""
            if lo == hi: return None, node
            mid = (lo + hi)//2
            left, node = fn(lo, mid, node)
            ans = TreeNode(node.val, left=left)
            node = node.next
            ans.right, node = fn(mid+1, hi, node)
            return ans, node
        
        return fn(0, n, head)[0]


    """110. Balanced Binary Tree (Easy)
	Given a binary tree, determine if it is height-balanced. For this problem, 
	a height-balanced binary tree is defined as: a binary tree in which the 
	left and right subtrees of every node differ in height by no more than 1.

	Example 1:
	Given the following tree [3,9,20,null,null,15,7]:

	    3
	   / \
	  9  20
	    /  \
	   15   7
	Return true.

	Example 2:
	Given the following tree [1,2,2,3,3,null,null,4,4]:

	       1
	      / \
	     2   2
	    / \
	   3   3
	  / \
	 4   4
	Return false."""

    def isBalanced(self, root: TreeNode) -> bool:
        
        def fn(node):
            """Return flag of balance and height of given node"""
            if not node: return True, 0
            tf0, h0 = fn(node.left)
            tf1, h1 = fn(node.right)
            return tf0 and tf1 and abs(h0-h1) <= 1, 1 + max(h0, h1)
        
        return fn(root)[0]


    """111. Minimum Depth of Binary Tree (Easy)
	Given a binary tree, find its minimum depth. The minimum depth is the 
	number of nodes along the shortest path from the root node down to the 
	nearest leaf node. Note that a leaf is a node with no children.

	Example:
	Given binary tree [3,9,20,null,null,15,7],

	    3
	   / \
	  9  20
	    /  \
	   15   7
	return its minimum depth = 2."""

    def minDepth(self, root: TreeNode) -> int:
        
        def fn(node):
            """Return minimum depth of given node"""
            if not node: return 0
            if not node.left or not node.right: return 1 + fn(node.left) + fn(node.right)
            return 1 + min(fn(node.left), fn(node.right))
        
        return fn(root)


    """112. Path Sum (Easy)
	Given a binary tree and a sum, determine if the tree has a root-to-leaf 
	path such that adding up all the values along the path equals the given 
	sum. Note that a leaf is a node with no children.

	Example:
	Given the below binary tree and sum = 22,

	      5
	     / \
	    4   8
	   /   / \
	  11  13  4
	 /  \      \
	7    2      1
	return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22."""

    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        
        def fn(node, x): 
            """Return True if node is on root-to-leaf path"""
            if not node: return False 
            if not node.left and not node.right: return node.val == x
            return fn(node.left, x-node.val) or fn(node.right, x-node.val)
        
        return fn(root, sum)


    """113. Path Sum II (Medium)
	Given a binary tree and a sum, find all root-to-leaf paths where each 
	path's sum equals the given sum. Note that a leaf is a node with no 
	children.

	Example:
	Given the below binary tree and sum = 22,

	      5
	     / \
	    4   8
	   /   / \
	  11  13  4
	 /  \    / \
	7    2  5   1
	Return:

	[
	   [5,4,11,2],
	   [5,8,4,5]
	]"""

    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        
        def fn(node, x): 
            """Populate ans with a stack"""
            if not node: return 
            stack.append(node.val)
            if not node.left and not node.right and node.val == x: ans.append(stack.copy())
            fn(node.left, x-node.val) or fn(node.right, x-node.val)
            stack.pop()
            
        ans, stack = [], []
        fn(root, sum)
        return ans 


    """114. Flatten Binary Tree to Linked List (Medium)
	Given a binary tree, flatten it to a linked list in-place.

	For example, given the following tree:

	    1
	   / \
	  2   5
	 / \   \
	3   4   6

	The flattened tree should look like:

	1
	 \
	  2
	   \
	    3
	     \
	      4
	       \
	        5
	         \
	          6"""

    def flatten(self, root: TreeNode) -> None:
        
        def fn(node, tail=None):
            """Return head of flattened binary tree"""
            if not node: return tail
            node.left, node.right = None, fn(node.left, fn(node.right, tail))
            return node
        
        return fn(root)


    """115. Distinct Subsequences (Hard)
	Given a string S and a string T, count the number of distinct subsequences 
	of S which equals T. A subsequence of a string is a new string which is 
	formed from the original string by deleting some (can be none) of the 
	characters without disturbing the relative positions of the remaining 
	characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not). 
	It's guaranteed the answer fits on a 32-bit signed integer.

	Example 1:
	Input: S = "rabbbit", T = "rabbit"
	Output: 3
	Explanation:
	As shown below, there are 3 ways you can generate "rabbit" from S.
	(The caret symbol ^ means the chosen letters)

	rabbbit
	^^^^ ^^
	rabbbit
	^^ ^^^^
	rabbbit
	^^^ ^^^

	Example 2:
	Input: S = "babgbag", T = "bag"
	Output: 5
	Explanation:
	As shown below, there are 5 ways you can generate "bag" from S.
	(The caret symbol ^ means the chosen letters)

	babgbag
	^^ ^
	babgbag
	^^    ^
	babgbag
	^    ^^
	babgbag
	  ^  ^^
	babgbag
	    ^^^"""

    def numDistinct(self, s: str, t: str) -> int:
        pos = dict()
        for i, c in enumerate(t): pos.setdefault(c, []).append(i)
            
        ans = [0]*len(t) + [1]
        for c in reversed(s):
            for i in pos.get(c, []):
                ans[i] += ans[i+1]
        return ans[0]


    """116. Populating Next Right Pointers in Each Node (Medium)
	You are given a perfect binary tree where all leaves are on the same 
	level, and every parent has two children. The binary tree has the 
	following definition:

	struct Node {
	  int val;
	  Node *left;
	  Node *right;
	  Node *next;
	}

	Populate each next pointer to point to its next right node. If there is no 
	next right node, the next pointer should be set to NULL. Initially, all 
	next pointers are set to NULL.

	Follow up:
	You may only use constant extra space.
	Recursive approach is fine, you may assume implicit stack space does not 
	count as extra space for this problem.

	Example 1:
	Input: root = [1,2,3,4,5,6,7]
	Output: [1,#,2,3,#,4,5,6,7,#]
	Explanation: Given the above perfect binary tree (Figure A), your function 
	should populate each next pointer to point to its next right node, just 
	like in Figure B. The serialized output is in level order as connected by 
	the next pointers, with '#' signifying the end of each level.

	Constraints:
	The number of nodes in the given tree is less than 4096.
	-1000 <= node.val <= 1000"""

    def connect(self, root: 'Node') -> 'Node':
        head = root
        while head and head.left: 
            node = head
            while node: 
                node.left.next = node.right
                if node.next: node.right.next = node.next.left
                node = node.next
            head = head.left
        return root 


    """117. Populating Next Right Pointers in Each Node II (Medium)
	Given a binary tree

	struct Node {
	  int val;
	  Node *left;
	  Node *right;
	  Node *next;
	}

	Populate each next pointer to point to its next right node. If there is no 
	next right node, the next pointer should be set to NULL. Initially, all 
	next pointers are set to NULL.

	Follow up:
	You may only use constant extra space. Recursive approach is fine, you may 
	assume implicit stack space does not count as extra space for this problem.

	Example 1:
	Input: root = [1,2,3,4,5,null,7]
	Output: [1,#,2,3,#,4,5,7,#]
	Explanation: Given the above binary tree (Figure A), your function should 
	populate each next pointer to point to its next right node, just like in 
	Figure B. The serialized output is in level order as connected by the next 
	pointers, with '#' signifying the end of each level.

	Constraints:
	The number of nodes in the given tree is less than 6000.
	-100 <= node.val <= 100"""

    def connect(self, root: 'Node') -> 'Node':
        parent = root
        while parent:
            child = dummy = Node()
            while parent: 
                if parent.left: child.next = child = parent.left
                if parent.right: child.next = child = parent.right
                parent = parent.next 
            parent = dummy.next 
        return root 


    """118. Pascal's Triangle (Easy)
	Given a non-negative integer numRows, generate the first numRows of 
	Pascal's triangle. In Pascal's triangle, each number is the sum of the two 
	numbers directly above it.

	Example:
	Input: 5
	Output:
	[
	     [1],
	    [1,1],
	   [1,2,1],
	  [1,3,3,1],
	 [1,4,6,4,1]
	]"""

    def generate(self, numRows: int) -> List[List[int]]:
        ans, row = [], []
        for i in range(numRows): 
            row.append(1)
            for j in range(i-1, 0, -1): row[j] += row[j-1]
            ans.append(row.copy())
        return ans


    """119. Pascal's Triangle II (Easy)
	Given a non-negative index k where k ≤ 33, return the kth index row of the 
	Pascal's triangle. Note that the row index starts from 0. In Pascal's 
	triangle, each number is the sum of the two numbers directly above it.

	Example:
	Input: 3
	Output: [1,3,3,1]

	Follow up: Could you optimize your algorithm to use only O(k) extra space?"""

    def getRow(self, rowIndex: int) -> List[int]:
        ans = [1]*(rowIndex + 1)
        for i in range(1, rowIndex): 
            ans[i] = ans[i-1] * (rowIndex-i+1)//i
        return ans


    """120. Triangle (Medium)
	Given a triangle, find the minimum path sum from top to bottom. Each step 
	you may move to adjacent numbers on the row below. For example, given the 
	following triangle

	[
	     [2],
	    [3,4],
	   [6,5,7],
	  [4,1,8,3]
	]

	The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

	Note: Bonus point if you are able to do this using only O(n) extra space, 
	where n is the total number of rows in the triangle."""

    def minimumTotal(self, triangle: List[List[int]]) -> int:
        
        @lru_cache(None)
        def fn(i, j):
            """Return minimum path sum ending at (i, j)"""
            if i < 0: return 0
            if j < 0 or j > i: return inf
            return triangle[i][j] + min(fn(i-1, j-1), fn(i-1, j))
        
        m = len(triangle)
        return min(fn(m-1, j) for j in range(m))



    """121. Best Time to Buy and Sell Stock (Easy)
	Say you have an array for which the ith element is the price of a given 
	stock on day i. If you were only permitted to complete at most one 
	transaction (i.e., buy one and sell one share of the stock), design an 
	algorithm to find the maximum profit. Note that you cannot sell a stock 
	before you buy one.

	Example 1:
	Input: [7,1,5,3,6,4]
	Output: 5
	Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
	             Not 7-1 = 6, as selling price needs to be larger than buying price.

	Example 2:
	Input: [7,6,4,3,1]
	Output: 0
	Explanation: In this case, no transaction is done, i.e. max profit = 0."""

    def maxProfit(self, prices: List[int]) -> int:
        buy, pnl = inf, 0
        for price in prices:
            buy = min(buy, price)
            pnl = max(pnl, price - buy)
        return pnl 


    """122. Best Time to Buy and Sell Stock II (Easy)
	Say you have an array prices for which the ith element is the price of a 
	given stock on day i. Design an algorithm to find the maximum profit. You 
	may complete as many transactions as you like (i.e., buy one and sell one 
	share of the stock multiple times). Note: You may not engage in multiple 
	transactions at the same time (i.e., you must sell the stock before you buy 
	again).

	Example 1:
	Input: [7,1,5,3,6,4]
	Output: 7
	Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
	             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

	Example 2:
	Input: [1,2,3,4,5]
	Output: 4
	Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
	             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
	             engaging multiple transactions at the same time. You must sell before buying again.

	Example 3:
	Input: [7,6,4,3,1]
	Output: 0
	Explanation: In this case, no transaction is done, i.e. max profit = 0.

	Constraints:
	1 <= prices.length <= 3 * 10 ^ 4
	0 <= prices[i] <= 10 ^ 4"""

    def maxProfit(self, prices: List[int]) -> int:
        return sum(max(0, prices[i] - prices[i-1]) for i in range(1, len(prices))) 



    """123. Best Time to Buy and Sell Stock III (Hard)
	Say you have an array for which the ith element is the price of a given 
	stock on day i. Design an algorithm to find the maximum profit. You may 
	complete at most two transactions. Note that you may not engage in multiple 
	transactions at the same time (i.e., you must sell the stock before you buy 
	again).

	Example 1:
	Input: [3,3,5,0,0,3,1,4]
	Output: 6
	Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
	             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

	Example 2:
	Input: [1,2,3,4,5]
	Output: 4
	Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
	             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
	             engaging multiple transactions at the same time. You must sell before buying again.

	Example 3:
	Input: [7,6,4,3,1]
	Output: 0
	Explanation: In this case, no transaction is done, i.e. max profit = 0."""

    def maxProfit(self, prices: List[int]) -> int:
        buy, pnl = [inf]*2, [0]*2
        for price in prices: 
            buy[0] = min(buy[0], price)
            pnl[0] = max(pnl[0], price - buy[0])
            buy[1] = min(buy[1], price - pnl[0])
            pnl[1] = max(pnl[1], price - buy[1])
        return pnl[1]


    """124. Binary Tree Maximum Path Sum (Hard)
	Given a non-empty binary tree, find the maximum path sum. For this problem, 
	a path is defined as any sequence of nodes from some starting node to any 
	node in the tree along the parent-child connections. The path must contain 
	at least one node and does not need to go through the root.

	Example 1:
	Input: [1,2,3]

	       1
	      / \
	     2   3

	Output: 6

	Example 2:
	Input: [-10,9,20,null,null,15,7]

	   -10
	   / \
	  9  20
	    /  \
	   15   7

	Output: 42"""

    def maxPathSum(self, root: TreeNode) -> int:
        
        def fn(node): 
            """Return path sum ending at node and maximum path sum seen so far"""
            if not node: return 0, -inf
            lh, lps = fn(node.left)
            rh, rps = fn(node.right)
            return node.val + max(0, lh, rh), max(lps, rps, node.val + max(0, lh) + max(0, rh))
        
        return fn(root)[1]


    """125. Valid Palindrome (Easy)
	Given a string, determine if it is a palindrome, considering only 
	alphanumeric characters and ignoring cases. Note that for the purpose of 
	this problem, we define empty string as valid palindrome.

	Example 1:
	Input: "A man, a plan, a canal: Panama"
	Output: true

	Example 2:
	Input: "race a car"
	Output: false"""

    def isPalindrome(self, s: str) -> bool:
        s = "".join(c for c in s.lower() if c.isalnum())
        return s == s[::-1]


    """126. Word Ladder II (Hard)
	Given two words (beginWord and endWord), and a dictionary's word list, find 
	all shortest transformation sequence(s) from beginWord to endWord, such 
	that:
	1) Only one letter can be changed at a time
	2) Each transformed word must exist in the word list. Note that beginWord 
	is not a transformed word.
	
	Note:
	* Return an empty list if there is no such transformation sequence.
	* All words have the same length.
	* All words contain only lowercase alphabetic characters.
	* You may assume no duplicates in the word list.
	* You may assume beginWord and endWord are non-empty and are not the same.
	
	Example 1:
	Input:
	beginWord = "hit",
	endWord = "cog",
	wordList = ["hot","dot","dog","lot","log","cog"]

	Output:
	[
	  ["hit","hot","dot","dog","cog"],
	  ["hit","hot","lot","log","cog"]
	]
	
	Example 2:
	Input:
	beginWord = "hit"
	endWord = "cog"
	wordList = ["hot","dot","dog","lot","log"]

	Output: []

	Explanation: The endWord "cog" is not in wordList, therefore no possible 
	transformation."""

    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        if endWord not in wordList: return []
        
        graph = dict()
        for word in wordList:
            for i in range(len(word)):
                graph.setdefault(word[:i] + "*" + word[i+1:], []).append(word)
                
        ans = []
        front0, front1 = {beginWord: [[beginWord]]}, {endWord:[[endWord]]} #word & sequences ending in word
        seen = {beginWord, endWord}
        reverse = False 
        
        while front0 and front1 and not ans:
            if len(front0) > len(front1): front0, front1, reverse = front1, front0, not reverse 
            temp = dict()
            for word, seq in front0.items(): 
                for i in range(len(word)): 
                    for node in graph.get(word[:i] + "*" + word[i+1:], []): 
                        if node in front1: 
                            ans.extend([y + x[::-1] if reverse else x + y[::-1] for x in seq for y in front1[node]])
                        if node in seen: continue
                        for x in seq: 
                            temp.setdefault(node, []).append(x + [node])
            seen |= set(temp.keys()) #has to be updated level-by-level
            front0 = temp 
        return ans 


    """127. Word Ladder (Medium)
	Given two words (beginWord and endWord), and a dictionary's word list, 
	find the length of shortest transformation sequence from beginWord to 
	endWord, such that:
	1) Only one letter can be changed at a time.
	2) Each transformed word must exist in the word list.
	
	Note:
	* Return 0 if there is no such transformation sequence.
	* All words have the same length.
	* All words contain only lowercase alphabetic characters.
	* You may assume no duplicates in the word list.
	* You may assume beginWord and endWord are non-empty and are not the same.
	
	Example 1:
	Input:
	beginWord = "hit",
	endWord = "cog",
	wordList = ["hot","dot","dog","lot","log","cog"]

	Output: 5
	Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> 
	"dog" -> "cog", return its length 5.

	Example 2:
	Input:
	beginWord = "hit"
	endWord = "cog"
	wordList = ["hot","dot","dog","lot","log"]

	Output: 0
	Explanation: The endWord "cog" is not in wordList, therefore no possible 
	transformation."""

    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList: return 0 #shortcut 
        
        graph = dict()
        for word in wordList: 
            for i in range(len(word)):
                graph.setdefault(word[:i] + "*" + word[i+1:], []).append(word)
        
        #two-end bfs
        front0, front1 = {beginWord}, {endWord}
        seen = {beginWord, endWord}
        
        ans = 1
        while front0 and front1: 
            ans += 1
            if len(front0) > len(front1): front0, front1 = front1, front0
            #move forward frontier
            temp = set()
            for word in front0: 
                for i in range(len(word)):
                    for node in graph.get(word[:i] + "*" + word[i+1:], []):
                        if node in front1: return ans 
                        if node in seen: continue
                        temp.add(node)
                        seen.add(node)
            front0 = temp
        return 0


    """128. Longest Consecutive Sequence (Hard)
	Given an unsorted array of integers, find the length of the longest 
	consecutive elements sequence. Your algorithm should run in O(n) complexity.

	Example:
	Input: [100, 4, 200, 1, 3, 2]
	Output: 4
	Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. 
	Therefore its length is 4."""

    def longestConsecutive(self, nums: List[int]) -> int:
        nums = set(nums)
        ans = val = 0
        for x in nums: 
            if x-1 not in nums: 
                val = 0
                while x in nums: val, x = val+1, x+1
            ans = max(ans, val)
        return ans 


    """129. Sum Root to Leaf Numbers (Medium)
	Given a binary tree containing digits from 0-9 only, each root-to-leaf path 
	could represent a number. An example is the root-to-leaf path 1->2->3 which 
	represents the number 123. Find the total sum of all root-to-leaf numbers.
	Note that a leaf is a node with no children.

	Example:
	Input: [1,2,3]
	    1
	   / \
	  2   3
	Output: 25
	Explanation:
	The root-to-leaf path 1->2 represents the number 12.
	The root-to-leaf path 1->3 represents the number 13.
	Therefore, sum = 12 + 13 = 25.

	Example 2:
	Input: [4,9,0,5,1]
	    4
	   / \
	  9   0
	 / \
	5   1
	Output: 1026
	Explanation:
	The root-to-leaf path 4->9->5 represents the number 495.
	The root-to-leaf path 4->9->1 represents the number 491.
	The root-to-leaf path 4->0 represents the number 40.
	Therefore, sum = 495 + 491 + 40 = 1026."""

    def sumNumbers(self, root: TreeNode) -> int:
        
        def fn(node, val):
            """Return sum of node-to-leaf numbers"""
            if not node: return 0
            val = 10*val + node.val
            if not node.left and not node.right: return val 
            return fn(node.left, val) + fn(node.right, val)
            
        return fn(root, 0)


    """130. Surrounded Regions (Medium)
	Given a 2D board containing 'X' and 'O' (the letter O), capture all regions 
	surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in 
	that surrounded region.

	Example:
	X X X X
	X O O X
	X X O X
	X O X X
	After running your function, the board should be:

	X X X X
	X X X X
	X X X X
	X O X X

	Explanation:
	Surrounded regions shouldn’t be on the border, which means that any 'O' on 
	the border of the board are not flipped to 'X'. Any 'O' that is not on the 
	border and it is not connected to an 'O' on the border will be flipped to 
	'X'. Two cells are connected if they are adjacent cells connected 
	horizontally or vertically."""

    def solve(self, board: List[List[str]]) -> None:
        if not board: return [] #edge case 
        m, n = len(board), len(board[0])
        
        def fn(i, j):
            """Flood fill "O" with sentinel"""
            if not (0 <= i < m and 0 <= j < n) or board[i][j] != "O": return 
            board[i][j] = "#" #sentinel 
            for ii, jj in (i-1, j), (i, j-1), (i, j+1), (i+1, j): fn(ii, jj)
        
        for i in range(m): fn(i, 0) or fn(i, n-1)
        for j in range(n): fn(0, j) or fn(m-1, j)
        
        for i in range(m):
            for j in range(n):
                if board[i][j] == "O": board[i][j] = "X"
                if board[i][j] == "#": board[i][j] = "O"


    """131. Palindrome Partitioning (Medium)
	Given a string s, partition s such that every substring of the partition 
	is a palindrome. Return all possible palindrome partitioning of s.

	Example:
	Input: "aab"
	Output:
	[
	  ["aa","b"],
	  ["a","a","b"]
	]"""

    def partition(self, s: str) -> List[List[str]]:
        #pre-processing 
        palin = dict()
        for k in range(len(s)):
            for i, j in (k, k), (k, k+1):
                while 0 <= i and j < len(s) and s[i] == s[j]: 
                    palin.setdefault(i, []).append(j)
                    i, j = i-1, j+1
        
        @lru_cache(None)
        def fn(i): 
            """Return palindrome partitioning of s[i:]"""
            if i == len(s): return [[]] 
            return [[s[i:ii+1]] + y for ii in palin[i] for y in fn(ii+1)]
        
        return fn(0)


    """132. Palindrome Partitioning II (Hard)
	Given a string s, partition s such that every substring of the partition is 
	a palindrome. Return the minimum cuts needed for a palindrome partitioning of s.

	Example:
	Input: "aab"
	Output: 1
	Explanation: The palindrome partitioning ["aa","b"] could be produced using 
	1 cut."""

    def minCut(self, s: str) -> int:
        #pre-processing
        palin = dict()
        for k in range(len(s)):
            for i, j in (k, k), (k, k+1):
                while 0 <= i and j < len(s) and s[i] == s[j]: 
                    palin.setdefault(i, []).append(j)
                    i, j = i-1, j+1
                
        @lru_cache(None)
        def fn(i):
            """Return minimum palindrome partitioning of s[i:]"""
            if i == len(s): return 0
            return min(1 + fn(ii+1) for ii in palin[i])
        
        return fn(0)-1


    """133. Clone Graph (Medium)
	Given a reference of a node in a connected undirected graph. Return a deep 
	copy (clone) of the graph. Each node in the graph contains a val (int) and 
	a list (List[Node]) of its neighbors.

	class Node {
	    public int val;
	    public List<Node> neighbors;
	}
	 
	Test case format:
	For simplicity sake, each node's value is the same as the node's index 
	(1-indexed). For example, the first node with val = 1, the second node with 
	val = 2, and so on. The graph is represented in the test case using an 
	adjacency list. Adjacency list is a collection of unordered lists used to 
	represent a finite graph. Each list describes the set of neighbors of a 
	node in the graph. The given node will always be the first node with val = 1. 
	You must return the copy of the given node as a reference to the cloned graph.

	Example 1:
	Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
	Output: [[2,4],[1,3],[2,4],[1,3]]
	Explanation: There are 4 nodes in the graph.
	1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
	2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
	3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
	4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

	Example 2:
	Input: adjList = [[]]
	Output: [[]]
	Explanation: Note that the input contains one empty list. The graph consists 
	of only one node with val = 1 and it does not have any neighbors.

	Example 3:
	Input: adjList = []
	Output: []
	Explanation: This an empty graph, it does not have any nodes.
	
	Example 4:
	Input: adjList = [[2],[1]]
	Output: [[2],[1]]

	Constraints:
	+ 1 <= Node.val <= 100
	+ Node.val is unique for each node.
	+ Number of Nodes will not exceed 100.
	+ There is no repeated edges and no self-loops in the graph.
	+ The Graph is connected and all nodes can be visited starting from the given node."""

    def cloneGraph(self, node: 'Node') -> 'Node':
        memo = dict()
        
        def fn(n): 
            """Return (deep) clonded node"""
            if n not in memo: 
                cln = memo[n] = Node(n.val)
                cln.neighbors = [fn(nn) for nn in n.neighbors]
            return memo[n]
            
        return node and fn(node)


    """134. Gas Station (Medium)
	There are N gas stations along a circular route, where the amount of gas at 
	station i is gas[i]. You have a car with an unlimited gas tank and it costs 
	cost[i] of gas to travel from station i to its next station (i+1). You 
	begin the journey with an empty tank at one of the gas stations. Return the 
	starting gas station's index if you can travel around the circuit once in 
	the clockwise direction, otherwise return -1.

	Note:
	If there exists a solution, it is guaranteed to be unique.
	Both input arrays are non-empty and have the same length.
	Each element in the input arrays is a non-negative integer.

	Example 1:
	Input: 
	gas  = [1,2,3,4,5]
	cost = [3,4,5,1,2]

	Output: 3

	Explanation:
	Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
	Travel to station 4. Your tank = 4 - 1 + 5 = 8
	Travel to station 0. Your tank = 8 - 2 + 1 = 7
	Travel to station 1. Your tank = 7 - 3 + 2 = 6
	Travel to station 2. Your tank = 6 - 4 + 3 = 5
	Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
	Therefore, return 3 as the starting index.

	Example 2:
	Input: 
	gas  = [2,3,4]
	cost = [3,4,3]

	Output: -1

	Explanation:
	You can't start at station 0 or 1, as there is not enough gas to travel to the next station. 
	Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
	Travel to station 0. Your tank = 4 - 3 + 2 = 3
	Travel to station 1. Your tank = 3 - 3 + 3 = 3
	You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
	Therefore, you can't travel around the circuit once no matter where you start."""

    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        ans = prefix = lowest = 0
        for n, (g, c) in enumerate(zip(gas, cost), 1): 
            prefix += g - c
            if prefix < lowest: 
                lowest = prefix
                ans = n
        return -1 if prefix < 0 else ans%n


    """135. Candy (Hard)
	There are N children standing in a line. Each child is assigned a rating 
	value. You are giving candies to these children subjected to the following 
	requirements:
	+ Each child must have at least one candy.
	+ Children with a higher rating get more candies than their neighbors.
	
	What is the minimum candies you must give?

	Example 1:
	Input: [1,0,2]
	Output: 5
	Explanation: You can allocate to the first, second and third child with 2, 
	1, 2 candies respectively.

	Example 2:
	Input: [1,2,2]
	Output: 4
	Explanation: You can allocate to the first, second and third child with 1, 
	2, 1 candies respectively. The third child gets 1 candy because it 
	satisfies the above two conditions."""

    def candy(self, ratings: List[int]) -> int:
        if not ratings: return 0 # edge case 
        
        ans = 1
        down, up = 0, 1
        for i in range(1, len(ratings)):
            if ratings[i-1] < ratings[i]: 
                if down: down, up = 0, 1 #reset
                up += 1
                ans += up
            elif ratings[i-1] == ratings[i]: 
                down, up = 0, 1 #reset 
                ans += 1
            else: 
                down += 1
                ans += down if down < up else down + 1
        return ans 


    """136. Single Number (Easy)
	Given a non-empty array of integers, every element appears twice except for 
	one. Find that single one. Note that your algorithm should have a linear 
	runtime complexity. Could you implement it without using extra memory?

	Example 1:
	Input: [2,2,1]
	Output: 1

	Example 2:
	Input: [4,1,2,1,2]
	Output: 4"""

    def singleNumber(self, nums: List[int]) -> int:
        return reduce(xor, nums)


    """137. Single Number II (Medium)
	Given a non-empty array of integers, every element appears three times 
	except for one, which appears exactly once. Find that single one. Note that 
	your algorithm should have a linear runtime complexity. Could you implement 
	it without using extra memory?

	Example 1:
	Input: [2,2,3,2]
	Output: 3

	Example 2:
	Input: [0,1,0,1,0,1,99]
	Output: 99"""

    def singleNumber(self, nums: List[int]) -> int:
        one = two = 0
        for x in nums: 
            two |= one & x
            one ^= x
            common = two & one
            two &= ~common
            one &= ~common 
        return one 


    """138. Copy List with Random Pointer (Medium)
	A linked list is given such that each node contains an additional random 
	pointer which could point to any node in the list or null. Return a deep 
	copy of the list. The Linked List is represented in the input/output as a 
	list of n nodes. Each node is represented as a pair of [val, random_index] 
	where:

	val: an integer representing Node.val
	random_index: the index of the node (range from 0 to n-1) where random 
	pointer points to, or null if it does not point to any node.

	Example 1:
	Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
	Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

	Example 2:
	Input: head = [[1,1],[2,1]]
	Output: [[1,1],[2,1]]

	Example 3:
	Input: head = [[3,null],[3,0],[3,null]]
	Output: [[3,null],[3,0],[3,null]]

	Example 4:
	Input: head = []
	Output: []
	Explanation: Given linked list is empty (null pointer), so return null.

	Constraints:
	+ -10000 <= Node.val <= 10000
	+ Node.random is null or pointing to a node in the linked list.
	+ Number of Nodes will not exceed 1000."""

    def copyRandomList(self, head: 'Node') -> 'Node':
        memo = dict()
        
        def fn(n): 
            """Return (deep) copy of node"""
            if n and n not in memo: 
                cln = memo[n] = Node(n.val)
                cln.next, cln.random = fn(n.next), fn(n.random)
            return memo.get(n)
        
        return fn(head)


    """139. Word Break (Medium)
	Given a non-empty string s and a dictionary wordDict containing a list of 
	non-empty words, determine if s can be segmented into a space-separated 
	sequence of one or more dictionary words. Note that the same word in the 
	dictionary may be reused multiple times in the segmentation. You may assume 
	the dictionary does not contain duplicate words.
	
	Example 1:
	Input: s = "leetcode", wordDict = ["leet", "code"]
	Output: true
	Explanation: Return true because "leetcode" can be segmented as "leet code".

	Example 2:
	Input: s = "applepenapple", wordDict = ["apple", "pen"]
	Output: true
	Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
	             Note that you are allowed to reuse a dictionary word.

	Example 3:
	Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
	Output: false"""

    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        
        @lru_cache(None)
        def fn(i):
            """Return True if s[i:] can be segmented"""
            if i == len(s): return True 
            return any(s[i:i+len(word)] == word and fn(i+len(word)) for word in wordDict)
        
        return fn(0)


    """140. Word Break II (Hard)
	Given a non-empty string s and a dictionary wordDict containing a list of 
	non-empty words, add spaces in s to construct a sentence where each word is 
	a valid dictionary word. Return all such possible sentences. Note that the 
	same word in the dictionary may be reused multiple times in the segmentation.
	You may assume the dictionary does not contain duplicate words.
	
	Example 1:
	Input:
	s = "catsanddog"
	wordDict = ["cat", "cats", "and", "sand", "dog"]
	Output:
	[
	  "cats and dog",
	  "cat sand dog"
	]

	Example 2:
	Input:
	s = "pineapplepenapple"
	wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
	Output:
	[
	  "pine apple pen apple",
	  "pineapple pen apple",
	  "pine applepen apple"
	]
	Explanation: Note that you are allowed to reuse a dictionary word.

	Example 3:
	Input:
	s = "catsandog"
	wordDict = ["cats", "dog", "sand", "and", "cat"]
	Output:
	[]"""

    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        
        @lru_cache(None)
        def fn(i):
            """Return segmentation of s[i:]"""
            if i == len(s): return [[]]
            ans = []
            for word in wordDict: 
                if s[i:i+len(word)] == word: 
                    ans.extend([word] + x for x in fn(i+len(word)))
            return ans 
            
        return [" ".join(x) for x in fn(0)]


    
    """141. Linked List Cycle (Easy)
	Given a linked list, determine if it has a cycle in it. To represent a 
	cycle in the given linked list, we use an integer pos which represents the 
	position (0-indexed) in the linked list where tail connects to. If pos is 
	-1, then there is no cycle in the linked list.

	Example 1:
	Input: head = [3,2,0,-4], pos = 1
	Output: true
	Explanation: There is a cycle in the linked list, where tail connects to 
	the second node.

	Example 2:
	Input: head = [1,2], pos = 0
	Output: true
	Explanation: There is a cycle in the linked list, where tail connects to 
	the first node.

	Example 3:
	Input: head = [1], pos = -1
	Output: false
	Explanation: There is no cycle in the linked list.

	Follow up:
	Can you solve it using O(1) (i.e. constant) memory?"""

    def hasCycle(self, head: ListNode) -> bool:
        """Floyd's tortoise and hare (phase 1)"""
        fast = slow = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow: return True
        return False 


    """142. Linked List Cycle II (Medium)
	Given a linked list, return the node where the cycle begins. If there is no 
	cycle, return null. To represent a cycle in the given linked list, we use 
	an integer pos which represents the position (0-indexed) in the linked list 
	where tail connects to. If pos is -1, then there is no cycle in the linked 
	list. Note that do not modify the linked list.

	Example 1:
	Input: head = [3,2,0,-4], pos = 1
	Output: tail connects to node index 1
	Explanation: There is a cycle in the linked list, where tail connects to 
	the second node.

	Example 2:
	Input: head = [1,2], pos = 0
	Output: tail connects to node index 0
	Explanation: There is a cycle in the linked list, where tail connects to 
	the first node.

	Example 3:
	Input: head = [1], pos = -1
	Output: no cycle
	Explanation: There is no cycle in the linked list.

	Follow-up:
	Can you solve it without using extra space?"""

    def detectCycle(self, head: ListNode) -> ListNode:
        """Floyd's tortoise & hare (phase 2)"""
        fast = slow = head 
        while fast and fast.next:
            fast, slow = fast.next.next, slow.next
            if fast == slow: 
                fast = head 
                while fast != slow: fast, slow = fast.next, slow.next
                return fast
        return None 


    """143. Reorder List (Medium)
	Given a singly linked list L: L0→L1→…→Ln-1→Ln, reorder it to: 
	L0→Ln→L1→Ln-1→L2→Ln-2→… You may not modify the values in the list's nodes, 
	only nodes itself may be changed.

	Example 1:
	Given 1->2->3->4, reorder it to 1->4->2->3.

	Example 2:
	Given 1->2->3->4->5, reorder it to 1->5->2->4->3."""

    def reorderList(self, head: ListNode) -> None:
        fast = slow = head 
        while fast and fast.next: 
            fast = fast.next.next
            slow = slow.next 
        if slow: slow.next, slow = None, slow.next
        
        hi = None
        while slow: 
            slow.next, slow, hi = hi, slow.next, slow
            
        lo = head 
        while hi: 
            hi.next, hi, lo.next, lo = lo.next, hi.next, hi, lo.next
            
        return head 

    
    """144. Binary Tree Preorder Traversal (Medium)
	Given a binary tree, return the preorder traversal of its nodes' values.

	Example:
	Input: [1,null,2,3]
	   1
	    \
	     2
	    /
	   3

	Output: [1,2,3]
	Follow up: Recursive solution is trivial, could you do it iteratively?"""

    def preorderTraversal(self, root: TreeNode) -> List[int]:
        ans = []
        stack = [root]
        while stack: 
            node = stack.pop()
            if node: 
                ans.append(node.val)
                stack.append(node.right)
                stack.append(node.left)
        return ans 


    """145. Binary Tree Postorder Traversal (Hard)
	Given a binary tree, return the postorder traversal of its nodes' values.

	Example:
	Input: [1,null,2,3]
	   1
	    \
	     2
	    /
	   3

	Output: [3,2,1]
	Follow up: Recursive solution is trivial, could you do it iteratively?"""

    def postorderTraversal(self, root: TreeNode) -> List[int]:
        ans = []
        node, stack = root, []
        while node or stack: 
            if node: 
                if node.right: stack.append(node.right)
                stack.append(node)
                node = node.left
                continue
            node = stack.pop()
            if stack and stack[-1] == node.right: 
                stack.pop()
                stack.append(node)
                node = node.right
            else:
                ans.append(node.val)
                node = None
        return ans 


    """147. Insertion Sort List (Medium)
	Sort a linked list using insertion sort. A graphical example of insertion 
	sort. The partial sorted list (black) initially contains only the first 
	element in the list. With each iteration one element (red) is removed from 
	the input data and inserted in-place into the sorted list

	Algorithm of Insertion Sort:
	Insertion sort iterates, consuming one input element each repetition, and 
	growing a sorted output list. At each iteration, insertion sort removes one 
	element from the input data, finds the location it belongs within the 
	sorted list, and inserts it there. It repeats until no input elements remain.

	Example 1:
	Input: 4->2->1->3
	Output: 1->2->3->4

	Example 2:
	Input: -1->5->3->4->0
	Output: -1->0->3->4->5"""

    def insertionSortList(self, head: ListNode) -> ListNode:
        node, prev = head, None
        while node: 
            if not prev or prev.val <= node.val: #append node 
                node.next, node, prev = prev, node.next, node
            else: 
                temp = prev
                while temp.next and temp.next.val > node.val: 
                    temp = temp.next
                node.next, node, temp.next = temp.next, node.next, node
                
        node, prev = prev, None
        while node:
            node.next, node, prev = prev, node.next, node
        return prev 


    """148. Sort List (Medium)
	Sort a linked list in O(NlogN) time using constant space complexity.

	Example 1:
	Input: 4->2->1->3
	Output: 1->2->3->4

	Example 2:
	Input: -1->5->3->4->0
	Output: -1->0->3->4->5"""

    def sortList(self, head: ListNode) -> ListNode:
        #break list into two parts 
        fast = prev = slow = head
        while fast and fast.next:
            fast, prev, slow = fast.next.next, slow, slow.next
        if prev: prev.next = None #break list into two parts
        
        #slow == head of 2nd half
        if not slow or head == slow: return head

        list1 = self.sortList(head) #sort 1st half
        list2 = self.sortList(slow) #sort 2nd half
        
        #merge two sorted sub-lists
        dummy = node = ListNode()
        while list1 and list2:
            if list1.val > list2.val: list1, list2 = list2, list1
            node.next = node = list1
            list1 = list1.next
        node.next = list1 or list2
        return dummy.next 


    """149. Max Points on a Line (Hard)
	Given n points on a 2D plane, find the maximum number of points that lie on 
	the same straight line.

	Example 1:
	Input: [[1,1],[2,2],[3,3]]
	Output: 3
	Explanation:
	^
	|
	|        o
	|     o
	|  o  
	+------------->
	0  1  2  3  4

	Example 2:
	Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
	Output: 4
	Explanation:
	^
	|
	|  o
	|     o        o
	|        o
	|  o        o
	+------------------->
	0  1  2  3  4  5  6

	NOTE: input types have been changed on April 15, 2019. Please reset to 
	default code definition to get new method signature."""

    def maxPoints(self, points: List[List[int]]) -> int:
        ans = 0
        for i, (x0, y0) in enumerate(points): #reference 
            dupe = 1 #count of duplicates
            freq = dict() #frequency table 
            for x, y in points[i+1:]:
                if x0 == x and y0 == y: dupe += 1
                elif x0 == x: freq[0, inf] = 1 + freq.get((0, inf), 0)
                elif y0 == y: freq[inf, 0] = 1 + freq.get((inf, 0), 0)
                else: 
                    g = gcd(x-x0, y-y0)
                    x, y = (x-x0)//g, (y-y0)//g
                    if x < 0: x, y = -x, -y
                    freq[x, y] = 1 + freq.get((x, y), 0)
            ans = max(ans, dupe + max(freq.values(), default=0))
        return ans 


    """150. Evaluate Reverse Polish Notation (Medium)
	Evaluate the value of an arithmetic expression in Reverse Polish Notation. 
	Valid operators are +, -, *, /. Each operand may be an integer or another 
	expression.

	Note:
	Division between two integers should truncate toward zero. The given RPN 
	expression is always valid. That means the expression would always evaluate 
	to a result and there won't be any divide by zero operation.
	
	Example 1:
	Input: ["2", "1", "+", "3", "*"]
	Output: 9
	Explanation: ((2 + 1) * 3) = 9

	Example 2:
	Input: ["4", "13", "5", "/", "+"]
	Output: 6
	Explanation: (4 + (13 / 5)) = 6

	Example 3:
	Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
	Output: 22
	Explanation: 
	  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
	= ((10 * (6 / (12 * -11))) + 17) + 5
	= ((10 * (6 / -132)) + 17) + 5
	= ((10 * 0) + 17) + 5
	= (0 + 17) + 5
	= 17 + 5
	= 22"""

    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens: 
            if token not in "+-*/": stack.append(int(token))
            else: 
                y, x = stack.pop(), stack.pop()
                if token == "/": x = int(x/y)
                else: x = eval(f"{x}{token}{y}")
                stack.append(x)
        return stack.pop()


    """151. Reverse Words in a String (Medium)
	Given an input string, reverse the string word by word.

	Example 1:
	Input: "the sky is blue"
	Output: "blue is sky the"

	Example 2:
	Input: "  hello world!  "
	Output: "world! hello"
	Explanation: Your reversed string should not contain leading or trailing 
	spaces.

	Example 3:
	Input: "a good   example"
	Output: "example good a"
	Explanation: You need to reduce multiple spaces between two words to a 
	single space in the reversed string.

	Note:
	+ A word is defined as a sequence of non-space characters.
	+ Input string may contain leading or trailing spaces. However, your 
	reversed string should not contain leading or trailing spaces.
	+ You need to reduce multiple spaces between two words to a single space in 
	the reversed string.

	Follow up:
	For C programmers, try to solve it in-place in O(1) extra space."""

    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))



    """152. Maximum Product Subarray (Medium)
	Given an integer array nums, find the contiguous subarray within an array 
	(containing at least one number) which has the largest product.

	Example 1:
	Input: [2,3,-2,4]
	Output: 6
	Explanation: [2,3] has the largest product 6.

	Example 2:
	Input: [-2,0,-1]
	Output: 0
	Explanation: The result cannot be 2, because [-2,-1] is not a subarray."""

    def maxProduct(self, nums: List[int]) -> int:
        mn = mx = 1
        ans = -inf
        for x in nums:
            if x < 0: mn, mx = mx, mn
            mn, mx = min(x, mn*x), max(x, mx*x)
            ans = max(ans, mx)
        return ans 



    """153. Find Minimum in Rotated Sorted Array (Medium)
	Suppose an array sorted in ascending order is rotated at some pivot unknown 
	to you beforehand. (i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]). 
	Find the minimum element. You may assume no duplicate exists in the array.

	Example 1:
	Input: [3,4,5,1,2] 
	Output: 1

	Example 2:
	Input: [4,5,6,7,0,1,2]
	Output: 0"""

    def findMin(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums)-1
        while lo < hi:
            mid = (lo + hi)//2
            if nums[mid] < nums[hi]: hi = mid
            else: lo = mid + 1
        return nums[lo]


    """154. Find Minimum in Rotated Sorted Array II (Hard)
	Suppose an array sorted in ascending order is rotated at some pivot unknown 
	to you beforehand. (i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]). 
	Find the minimum element. The array may contain duplicates.

	Example 1:
	Input: [1,3,5]
	Output: 1

	Example 2:
	Input: [2,2,2,0,1]
	Output: 0

	Note:
	This is a follow up problem to Find Minimum in Rotated Sorted Array.
	Would allow duplicates affect the run-time complexity? How and why?"""

    def findMin(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums)-1
        while lo < hi:
            mid = (lo + hi)//2
            if nums[mid] < nums[hi]: hi = mid
            elif nums[mid] > nums[hi]: lo = mid + 1
            else: hi -= 1
        return nums[lo]



    """160. Intersection of Two Linked Lists (Easy)
	Write a program to find the node at which the intersection of two singly 
	linked lists begins. 

	Example 1:
	Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], 
	skipA = 2, skipB = 3
	Output: Reference of the node with value = 8
	Input Explanation: The intersected node's value is 8 (note that this must 
	not be 0 if the two lists intersect). From the head of A, it reads as 
	[4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 
	nodes before the intersected node in A; There are 3 nodes before the 
	intersected node in B.
	 
	Example 2:
	Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, 
	skipB = 1
	Output: Reference of the node with value = 2
	Input Explanation: The intersected node's value is 2 (note that this must 
	not be 0 if the two lists intersect). From the head of A, it reads as 
	[1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes 
	before the intersected node in A; There are 1 node before the intersected 
	node in B.

	Example 3:
	Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, 
	skipB = 2
	Output: null
	Input Explanation: From the head of A, it reads as [2,6,4]. From the head 
	of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal 
	must be 0, while skipA and skipB can be arbitrary values.
	Explanation: The two lists do not intersect, so return null.

	Notes:
	If the two linked lists have no intersection at all, return null.
	The linked lists must retain their original structure after the function returns.
	You may assume there are no cycles anywhere in the entire linked structure.
	Each value on each linked list is in the range [1, 10^9].
	Your code should preferably run in O(n) time and use only O(1) memory."""

    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        nodeA, nodeB = headA, headB
        while nodeA != nodeB:
            nodeA = nodeA.next if nodeA else headB
            nodeB = nodeB.next if nodeB else headA
        return nodeA and nodeB

   
    """162. Find Peak Element (Medium)
	A peak element is an element that is greater than its neighbors. Given an 
	input array nums, where nums[i] ≠ nums[i+1], find a peak element and return 
	its index. The array may contain multiple peaks, in that case return the 
	index to any one of the peaks is fine. You may imagine that 
	nums[-1] = nums[n] = -∞.

	Example 1:
	Input: nums = [1,2,3,1]
	Output: 2
	Explanation: 3 is a peak element and your function should return the index 
	number 2.

	Example 2:
	Input: nums = [1,2,1,3,5,6,4]
	Output: 1 or 5 
	Explanation: Your function can return either index number 1 where the peak 
	element is 2, or index number 5 where the peak element is 6.

	Follow up: Your solution should be in logarithmic complexity."""

    def findPeakElement(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums)-1
        while lo < hi:
            mid = (lo + hi)//2
            if nums[mid] < nums[mid+1]: lo = mid + 1
            else: hi = mid
        return lo


    """164. Maximum Gap (Hard)
	Given an unsorted array, find the maximum difference between the successive 
	elements in its sorted form. Return 0 if the array contains less than 2 
	elements.

	Example 1:
	Input: [3,6,9,1]
	Output: 3
	Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or 
	             (6,9) has the maximum difference 3.

	Example 2:
	Input: [10]
	Output: 0
	Explanation: The array contains less than 2 elements, therefore return 0.
	
	Note:
	You may assume all elements in the array are non-negative integers and fit 
	in the 32-bit signed integer range. Try to solve it in linear time/space."""

    def maximumGap(self, nums: List[int]) -> int:
        if len(nums) < 2: return 0 #edge case 
        
        mn, mx = min(nums), max(nums)
        step = max(1, (mx - mn)//(len(nums) - 1))
        size = (mx - mn)//step + 1
        buckets = [[inf, -inf] for _ in range(size)]
        
        for num in nums: 
            i = (num - mn)//step
            x, xx = buckets[i]
            buckets[i] = [min(x, num), max(xx, num)]
        
        ans = 0
        prev = mn
        for i in range(len(buckets)): 
            x, xx = buckets[i]
            if x < inf: 
                ans = max(ans, x - prev)
                prev = xx
        return ans 


    """165. Compare Version Numbers (Medium)
	Compare two version numbers version1 and version2. If version1 > version2 
	return 1; if version1 < version2 return -1;otherwise return 0. You may 
	assume that the version strings are non-empty and contain only digits and 
	the . character. The . character does not represent a decimal point and is 
	used to separate number sequences. For instance, 2.5 is not "two and a half" 
	or "half way to version three", it is the fifth second-level revision of 
	the second first-level revision. You may assume the default revision number 
	for each level of a version number to be 0. For example, version number 3.4 
	has a revision number of 3 and 4 for its first and second level revision 
	number. Its third and fourth level revision number are both 0.

	Example 1:
	Input: version1 = "0.1", version2 = "1.1"
	Output: -1

	Example 2:
	Input: version1 = "1.0.1", version2 = "1"
	Output: 1

	Example 3:
	Input: version1 = "7.5.2.4", version2 = "7.5.3"
	Output: -1

	Example 4:
	Input: version1 = "1.01", version2 = "1.001"
	Output: 0
	Explanation: Ignoring leading zeroes, both “01” and “001" represent the 
	same number “1”

	Example 5:
	Input: version1 = "1.0", version2 = "1.0.0"
	Output: 0
	Explanation: The first version number does not have a third level revision 
	number, which means its third level revision number is default to "0"
	 
	Note:
	* Version strings are composed of numeric strings separated by dots . and 
	  this numeric strings may have leading zeroes.
	* Version strings do not start or end with dots, and they will not be two 
	  consecutive dots."""

    def compareVersion(self, version1: str, version2: str) -> int:
        version1 = [int(x) for x in version1.split(".")]
        version2 = [int(x) for x in version2.split(".")]
        for x1, x2 in zip_longest(version1, version2, fillvalue=0):
            if x1 > x2: return 1
            if x1 < x2: return -1
        return 0


    """166. Fraction to Recurring Decimal (Medium)
	Given two integers representing the numerator and denominator of a 
	fraction, return the fraction in string format. If the fractional part 
	is repeating, enclose the repeating part in parentheses.

	Example 1:
	Input: numerator = 1, denominator = 2
	Output: "0.5"

	Example 2:
	Input: numerator = 2, denominator = 1
	Output: "2"

	Example 3:
	Input: numerator = 2, denominator = 3
	Output: "0.(6)" """

    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        sign = "-" if numerator * denominator < 0 else ""
        q, r = divmod(abs(numerator), abs(denominator))
        if not r: return sign + str(q)
        
        seen = {r : (i := 0)}
        dcml = ""
        while r: 
            d, r = divmod(10*r, abs(denominator))
            dcml += str(d)
            if r in seen: 
                k = seen[r]
                return sign + f"{q}.{dcml[:k]}({dcml[k:]})"
            seen[r] = (i := i+1)
        return sign + f"{q}.{dcml}"


    """167. Two Sum II - Input array is sorted (Easy)
	Given an array of integers that is already sorted in ascending order, find 
	two numbers such that they add up to a specific target number. The function 
	twoSum should return indices of the two numbers such that they add up to 
	the target, where index1 must be less than index2.

	Note:
	Your returned answers (both index1 and index2) are not zero-based.
	You may assume that each input would have exactly one solution and you may 
	not use the same element twice.

	Example:
	Input: numbers = [2,7,11,15], target = 9
	Output: [1,2]
	Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2."""

    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        lo, hi = 0, len(numbers)-1
        while lo < hi: 
            val = numbers[lo] + numbers[hi]
            if val == target: return [lo+1, hi+1]
            elif val > target: hi -= 1
            else: lo += 1



    """168. Excel Sheet Column Title (Easy)
	Given a positive integer, return its corresponding column title as appear 
	in an Excel sheet. 	For example:
	    1 -> A
	    2 -> B
	    3 -> C
	    ...
	    26 -> Z
	    27 -> AA
	    28 -> AB 
	    ...

	Example 1:
	Input: 1
	Output: "A"

	Example 2:
	Input: 28
	Output: "AB"

	Example 3:
	Input: 701
	Output: "ZY" """

    def convertToTitle(self, n: int) -> str:
        ans = []
        while n: 
            n, r = divmod(n-1, 26)
            ans.append(r)
        return "".join(chr(r+65) for r in reversed(ans))


    """169. Majority Element (Easy)
	Given an array of size n, find the majority element. The majority element 
	is the element that appears more than ⌊ n/2 ⌋ times. You may assume that 
	the array is non-empty and the majority element always exist in the array.

	Example 1:
	Input: [3,2,3]
	Output: 3

	Example 2:
	Input: [2,2,1,1,1,2,2]
	Output: 2"""

    def majorityElement(self, nums: List[int]) -> int:
        """Boyer-Moore majority voting"""
        vote = 0
        for x in nums:
            if not vote: ans = x
            vote += 1 if x == ans else -1
        return ans


    """171. Excel Sheet Column Number (Easy)
	Given a column title as appear in an Excel sheet, return its corresponding 
	column number. For example:
	    A -> 1
	    B -> 2
	    C -> 3
	    ...
	    Z -> 26
	    AA -> 27
	    AB -> 28 
	    ...

	Example 1:
	Input: "A"
	Output: 1

	Example 2:
	Input: "AB"
	Output: 28

	Example 3:
	Input: "ZY"
	Output: 701

	Constraints:
	* 1 <= s.length <= 7
	* s consists only of uppercase English letters.
	* s is between "A" and "FXSHRXW"."""

    def titleToNumber(self, s: str) -> int:
        ans = 0
        for c in s:
            ans = 26*ans + ord(c) - 64
        return ans 


    """172. Factorial Trailing Zeroes (Easy)
	Given an integer n, return the number of trailing zeroes in n!.

	Example 1:
	Input: 3
	Output: 0
	Explanation: 3! = 6, no trailing zero.

	Example 2:
	Input: 5
	Output: 1
	Explanation: 5! = 120, one trailing zero.

	Note: Your solution should be in logarithmic time complexity."""

    def trailingZeroes(self, n: int) -> int:
        ans = 0
        while n:
            n //= 5
            ans += n
        return ans 


    """174. Dungeon Game (Hard)
	The demons had captured the princess (P) and imprisoned her in the bottom-
	right corner of a dungeon. The dungeon consists of M x N rooms laid out in 
	a 2D grid. Our valiant knight (K) was initially positioned in the top-left 
	room and must fight his way through the dungeon to rescue the princess. The 
	knight has an initial health point represented by a positive integer. If at 
	any point his health point drops to 0 or below, he dies immediately. Some 
	of the rooms are guarded by demons, so the knight loses health (negative 
	integers) upon entering these rooms; other rooms are either empty (0's) or 
	contain magic orbs that increase the knight's health (positive integers). 
	In order to reach the princess as quickly as possible, the knight decides 
	to move only rightward or downward in each step.

	Write a function to determine the knight's minimum initial health so that 
	he is able to rescue the princess. For example, given the dungeon below, 
	the initial health of the knight must be at least 7 if he follows the 
	optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

	-2 (K)	-3	3
	-5	-10	1
	10	30	-5 (P)

	Note:
	* The knight's health has no upper bound.
	* Any room can contain threats or power-ups, even the first room the knight 
	  enters and the bottom-right room where the princess is imprisoned."""

    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        
        @lru_cache(None)
        def fn(i, j): 
            """Return minimum health at cell (i, j)"""
            if i == m-1 and j == n-1: return max(1, 1 - dungeon[i][j])
            if i > m-1 or j > n-1: return inf
            return max(1, min(fn(i+1, j), fn(i, j+1)) - dungeon[i][j])
        
        return fn(0, 0)


    """179. Largest Number (Medium)
	Given a list of non negative integers, arrange them such that they form the 
	largest number.

	Example 1:
	Input: [10,2]
	Output: "210"

	Example 2:
	Input: [3,30,34,5,9]
	Output: "9534330"

	Note: The result may be very large, so you need to return a string instead 
	of an integer."""

    def largestNumber(self, nums: List[int]) -> str:
        
        def cmp(x, y):
            """Compure two strings and return an integer based on outcome"""
            if x + y > y + x: return 1
            elif x + y == y + x: return 0
            else: return -1
                
        nums = [str(x) for x in nums]
        return "".join(sorted(nums, key=cmp_to_key(cmp), reverse=True)).lstrip("0") or "0"


    """187. Repeated DNA Sequences (Medium)
	All DNA is composed of a series of nucleotides abbreviated as A, C, G, and 
	T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to 
	identify repeated sequences within the DNA. Write a function to find all 
	the 10-letter-long sequences (substrings) that occur more than once in a 
	DNA molecule.

	Example:
	Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
	Output: ["AAAAACCCCC", "CCCCCAAAAA"]"""

    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        htab = {"A":0, "C":1, "G":2, "T":3} #hash table
        
        ans, seen = set(), set()
        hs = 0 
        for i in range(len(s)):
            hs = 4*hs + htab[s[i]]
            if i >= 10: hs -= htab[s[i-10]]*4**10 #rolling hash
            if hs in seen: ans.add(s[i-9:i+1])
            if i >= 9: seen.add(hs)
        return ans


    """188. Best Time to Buy and Sell Stock IV (Hard)
	Say you have an array for which the i-th element is the price of a given 
	stock on day i. Design an algorithm to find the maximum profit. You may 
	complete at most k transactions.

	Note: You may not engage in multiple transactions at the same time (ie, 
	you must sell the stock before you buy again).

	Example 1:
	Input: [2,4,1], k = 2
	Output: 2
	Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), 
	             profit = 4-2 = 2.

	Example 2:
	Input: [3,2,6,5,0,3], k = 2
	Output: 7
	Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), 
	             profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on 
	             day 6 (price = 3), profit = 3-0 = 3."""

    def maxProfit(self, k: int, prices: List[int]) -> int:
        if k >= len(prices)//2: 
            return sum(max(0, prices[i] - prices[i-1]) for i in range(1, len(prices)))
        
        buy, pnl = [inf]*k, [0]*k
        for price in prices:
            for i in range(k):
                buy[i] = min(buy[i], price - (pnl[i-1] if i else 0))
                pnl[i] = max(pnl[i], price - buy[i])
        return pnl[-1] if prices and k else 0


    """189. Rotate Array (Easy)
	Given an array, rotate the array to the right by k steps, where k is non-
	negative. 

	Follow up:
	Try to come up as many solutions as you can, there are at least 3 different 
	ways to solve this problem. Could you do it in-place with O(1) extra space?

	Example 1:
	Input: nums = [1,2,3,4,5,6,7], k = 3
	Output: [5,6,7,1,2,3,4]
	Explanation:
	rotate 1 steps to the right: [7,1,2,3,4,5,6]
	rotate 2 steps to the right: [6,7,1,2,3,4,5]
	rotate 3 steps to the right: [5,6,7,1,2,3,4]

	Example 2:
	Input: nums = [-1,-100,3,99], k = 2
	Output: [3,99,-1,-100]
	Explanation: 
	rotate 1 steps to the right: [99,-1,-100,3]
	rotate 2 steps to the right: [3,99,-1,-100]

	Constraints:
	* 1 <= nums.length <= 2 * 10^4
	* It's guaranteed that nums[i] fits in a 32 bit-signed integer.
	* k >= 0"""

    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        g = gcd(k, (n := len(nums)))
        for i in range(g):
            ii = i
            for _ in range(n//g): 
                ii = (ii + k)%n
                nums[i], nums[ii] = nums[ii], nums[i]


    """190. Reverse Bits (Easy)
	Reverse bits of a given 32 bits unsigned integer.

	Example 1:
	Input: 00000010100101000001111010011100
	Output: 00111001011110000010100101000000
	Explanation: The input binary string 00000010100101000001111010011100 
	represents the unsigned integer 43261596, so return 964176192 which its 
	binary representation is 00111001011110000010100101000000.
	
	Example 2:

	Input: 11111111111111111111111111111101
	Output: 10111111111111111111111111111111
	Explanation: The input binary string 11111111111111111111111111111101 
	represents the unsigned integer 4294967293, so return 3221225471 which its 
	binary representation is 10111111111111111111111111111111.

	Note:
	Note that in some languages such as Java, there is no unsigned integer type. 
	In this case, both input and output will be given as signed integer type and 
	should not affect your implementation, as the internal binary representation 
	of the integer is the same whether it is signed or unsigned. In Java, the 
	compiler represents the signed integers using 2's complement notation. 
	Therefore, in Example 2 above the input represents the signed integer -3 and 
	the output represents the signed integer -1073741825.

	Follow up: If this function is called many times, how would you optimize it?"""

    def reverseBits(self, n: int) -> int:
        return int(bin(n)[2:].zfill(32)[::-1], 2)


    """191. Number of 1 Bits (Easy)
	Write a function that takes an unsigned integer and return the number of 
	'1' bits it has (also known as the Hamming weight).

	Example 1:
	Input: 00000000000000000000000000001011
	Output: 3
	Explanation: The input binary string 00000000000000000000000000001011 has a 
	total of three '1' bits.

	Example 2:
	Input: 00000000000000000000000010000000
	Output: 1
	Explanation: The input binary string 00000000000000000000000010000000 has a 
	total of one '1' bit.

	Example 3:
	Input: 11111111111111111111111111111101
	Output: 31
	Explanation: The input binary string 11111111111111111111111111111101 has a 
	total of thirty one '1' bits.

	Note:
	Note that in some languages such as Java, there is no unsigned integer type. 
	In this case, the input will be given as signed integer type and should not 
	affect your implementation, as the internal binary representation of the 
	integer is the same whether it is signed or unsigned. In Java, the compiler 
	represents the signed integers using 2's complement notation. Therefore, in 
	Example 3 above the input represents the signed integer -3.
	 
	Follow up: If this function is called many times, how would you optimize it?"""

    def hammingWeight(self, n: int) -> int:
        return bin(n).count("1")


    """198. House Robber (Easy)
	You are a professional robber planning to rob houses along a street. Each 
	house has a certain amount of money stashed, the only constraint stopping 
	you from robbing each of them is that adjacent houses have security system 
	connected and it will automatically contact the police if two adjacent 
	houses were broken into on the same night. Given a list of non-negative 
	integers representing the amount of money of each house, determine the 
	maximum amount of money you can rob tonight without alerting the police.

	Example 1:
	Input: nums = [1,2,3,1]
	Output: 4
	Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
	             Total amount you can rob = 1 + 3 = 4.

	Example 2:
	Input: nums = [2,7,9,3,1]
	Output: 12
	Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 
	             5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.

	Constraints:
	0 <= nums.length <= 100
	0 <= nums[i] <= 400"""

    def rob(self, nums: List[int]) -> int:
        
        @lru_cache(None)
        def fn(i):
            """Return the maximum amount of money after robbing ith house"""
            if i < 0: return 0
            return max(fn(i-1), fn(i-2) + nums[i])
        
        return fn(len(nums)-1)


    """199. Binary Tree Right Side View (Medium)
	Given a binary tree, imagine yourself standing on the right side of it, 
	return the values of the nodes you can see ordered from top to bottom.

	Example:
	Input: [1,2,3,null,5,null,4]
	Output: [1, 3, 4]
	Explanation:

	   1            <---
	 /   \
	2     3         <---
	 \     \
	  5     4       <---"""

    def rightSideView(self, root: TreeNode) -> List[int]:
        ans = []
        queue, k = [root], 0
        while queue: 
            tmp = []
            for node in queue: 
                if node: 
                    if len(ans) == k: ans.append(node.val)
                    tmp.append(node.right)
                    tmp.append(node.left)
            queue, k = tmp, k+1
        return ans 


    """200. Number of Islands (Medium)
	Given a 2d grid map of '1's (land) and '0's (water), count the number of 
	islands. An island is surrounded by water and is formed by connecting 
	adjacent lands horizontally or vertically. You may assume all four edges 
	of the grid are all surrounded by water.

	Example 1:
	Input: grid = [
	  ["1","1","1","1","0"],
	  ["1","1","0","1","0"],
	  ["1","1","0","0","0"],
	  ["0","0","0","0","0"]
	]
	Output: 1

	Example 2:
	Input: grid = [
	  ["1","1","0","0","0"],
	  ["1","1","0","0","0"],
	  ["0","0","1","0","0"],
	  ["0","0","0","1","1"]
	]
	Output: 3"""

    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        m, n = len(grid), len(grid[0])
        
        def fn(i, j):
            """Flood fill cell with "0"."""
            if 0 <= i < m and 0 <= j < n and grid[i][j] == "1": 
                grid[i][j] = "0"
                for ii, jj in (i-1, j), (i, j-1), (i, j+1), (i+1, j):
                    fn(ii, jj)
                return 1
            return 0
                
        return sum(fn(i, j) for i in range(m) for j in range(n))


   """201. Bitwise AND of Numbers Range (Medium)
	Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise 
	AND of all numbers in this range, inclusive.

	Example 1:
	Input: [5,7]
	Output: 4

	Example 2:
	Input: [0,1]
	Output: 0"""

    def rangeBitwiseAnd(self, m: int, n: int) -> int:
        while n > m: 
            n &= n-1 #unset last set bit
        return n 


    """202. Happy Number (Easy)
	Write an algorithm to determine if a number n is "happy". A happy number is 
	a number defined by the following process: Starting with any positive 
	integer, replace the number by the sum of the squares of its digits, and 
	repeat the process until the number equals 1 (where it will stay), or it 
	loops endlessly in a cycle which does not include 1. Those numbers for 
	which this process ends in 1 are happy numbers. Return True if n is a happy 
	number, and False if not.

	Example: 
	Input: 19
	Output: true
	Explanation: 
	12 + 92 = 82
	82 + 22 = 68
	62 + 82 = 100
	12 + 02 + 02 = 1"""

    def isHappy(self, n: int) -> bool:
        fn = lambda n: sum(int(x)**2 for x in str(n))
        fast, slow = fn(n), n
        while fast != slow:
            fast = fn(fn(fast))
            slow = fn(slow)
        return fast == 1


    """203. Remove Linked List Elements (Easy)
	Remove all elements from a linked list of integers that have value val.

	Example:
	Input:  1->2->6->3->4->5->6, val = 6
	Output: 1->2->3->4->5"""

    def removeElements(self, head: ListNode, val: int) -> ListNode:
        dummy = node = ListNode(next=head) #head could be removed
        while node.next: 
            if node.next.val == val: node.next = node.next.next 
            else: node = node.next 
        return dummy.next 


    """204. Count Primes (Easy)
	Count the number of prime numbers less than a non-negative number, n.

	Example:
	Input: 10
	Output: 4
	Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7."""

    def countPrimes(self, n: int) -> int:
        """Sieve of Eratosthenes"""
        prime = [False] *2 + [True] * (n-2) #0 and 1 are not prime
        for i in range(int(sqrt(n))+1):
            if prime[i]:
                for k in range(i*i, n, i): 
                    prime[k] = False 
        return sum(prime)


    """205. Isomorphic Strings (Easy)
	Given two strings s and t, determine if they are isomorphic. Two strings 
	are isomorphic if the characters in s can be replaced to get t. All 
	occurrences of a character must be replaced with another character while 
	preserving the order of characters. No two characters may map to the same 
	character but a character may map to itself.

	Example 1:
	Input: s = "egg", t = "add"
	Output: true

	Example 2:
	Input: s = "foo", t = "bar"
	Output: false

	Example 3:
	Input: s = "paper", t = "title"
	Output: true
	Note:
	You may assume both s and t have the same length."""

    def isIsomorphic(self, s: str, t: str) -> bool:
        return len(set(zip(s, t))) == len(set(s)) == len(set(t))


    """206. Reverse Linked List (Easy)
	Reverse a singly linked list.

	Example:
	Input: 1->2->3->4->5->NULL
	Output: 5->4->3->2->1->NULL

	Follow up: A linked list can be reversed either iteratively or recursively. 
	Could you implement both?"""

    def reverseList(self, head: ListNode) -> ListNode:
        prev, node = None, head
        while node:
            node.next, node, prev = prev, node.next, node
        return prev


    """207. Course Schedule (Medium)
	There are a total of numCourses courses you have to take, labeled from 0 to 
	numCourses-1. Some courses may have prerequisites, for example to take 
	course 0 you have to first take course 1, which is expressed as a pair: 
	[0,1]. Given the total number of courses and a list of prerequisite pairs, 
	is it possible for you to finish all courses?

	Example 1:
	Input: numCourses = 2, prerequisites = [[1,0]]
	Output: true
	Explanation: There are a total of 2 courses to take. To take course 1 you 
	             should have finished course 0. So it is possible.

	Example 2:
	Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
	Output: false
	Explanation: There are a total of 2 courses to take. To take course 1 you 
	             should have finished course 0, and to take course 0 you should 
	             also have finished course 1. So it is impossible.
	 

	Constraints:
	* The input prerequisites is a graph represented by a list of edges, not 
	  adjacency matrices. Read more about how a graph is represented.
	* You may assume that there are no duplicate edges in the input 
	  prerequisites.
	* 1 <= numCourses <= 10^5"""

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        #graph as adjacency list
        digraph = dict()
        for u, v in prerequisites: digraph.setdefault(u, []).append(v)
            
        def cyclic(n):
            """Return True if cycle is detected involving given node"""
            if seen[n]: return seen[n] == -1
            seen[n] = -1 #GRAY
            if any(cyclic(nn) for nn in digraph.get(n, [])): return True
            seen[n] = 1 #BLACK
            return False 
            
        seen = [0]*numCourses #WHITE
        return not any(cyclic(i) for i in range(numCourses))


    """209. Minimum Size Subarray Sum (Medium)
	Given an array of n positive integers and a positive integer s, find the 
	minimal length of a contiguous subarray of which the sum ≥ s. If there 
	isn't one, return 0 instead.

	Example: 
	Input: s = 7, nums = [2,3,1,2,4,3]
	Output: 2
	Explanation: the subarray [4,3] has the minimal length under the problem 
	             constraint.

	Follow up: If you have figured out the O(n) solution, try coding another 
	           solution of which the time complexity is O(n log n). """

    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        ans, lo = inf, 0
        for hi in range(len(nums)):
            s -= nums[hi]
            while s <= 0:
                ans = min(ans, hi - lo + 1)
                s += nums[lo]
                lo += 1
        return ans if ans < inf else 0


    """210. Course Schedule II (Medium)
	There are a total of n courses you have to take, labeled from 0 to n-1. 
	Some courses may have prerequisites, for example to take course 0 you have 
	to first take course 1, which is expressed as a pair: [0,1]. Given the 
	total number of courses and a list of prerequisite pairs, return the 
	ordering of courses you should take to finish all courses. There may be 
	multiple correct orders, you just need to return one of them. If it is 
	impossible to finish all courses, return an empty array.

	Example 1:
	Input: 2, [[1,0]] 
	Output: [0,1]
	Explanation: There are a total of 2 courses to take. To take course 1 you 
	             should have finished course 0. So the correct course order is 
	             [0,1].

	Example 2:
	Input: 4, [[1,0],[2,0],[3,1],[3,2]]
	Output: [0,1,2,3] or [0,2,1,3]
	Explanation: There are a total of 4 courses to take. To take course 3 you 
	             should have finished both courses 1 and 2. Both courses 1 and 
	             2 should be taken after you finished course 0. So one correct 
	             course order is [0,1,2,3]. Another correct ordering is [0,2,1,3] .

	Note:
	* The input prerequisites is a graph represented by a list of edges, not 
	  adjacency matrices. Read more about how a graph is represented.
	* You may assume that there are no duplicate edges in the input prerequisites."""

    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        #graph as adjacency list
        digraph = dict()
        for u, v in prerequisites: digraph.setdefault(u, []).append(v)
            
        def cyclic(n):
            """Return True if cycle is detected involving given node"""
            if seen[n]: return seen[n] == -1
            seen[n] = -1 #GRAY
            if any(cyclic(nn) for nn in digraph.get(n, []) if seen[nn] != 1): return True
            seen[n] = 1 #BLACK
            ans.append(n)
            return False 
        
        ans = []
        seen = [0]*numCourses #WHITE
        return [] if any(cyclic(i) for i in range(numCourses)) else ans 


    """212. Word Search II (Hard)
	Given a 2D board and a list of words from the dictionary, find all words in 
	the board. Each word must be constructed from letters of sequentially 
	adjacent cell, where "adjacent" cells are those horizontally or vertically 
	neighboring. The same letter cell may not be used more than once in a word.

	Example:
	Input: 
	board = [
	  ['o','a','a','n'],
	  ['e','t','a','e'],
	  ['i','h','k','r'],
	  ['i','f','l','v']
	]
	words = ["oath","pea","eat","rain"]

	Output: ["eat","oath"]

	Note:
	All inputs are consist of lowercase letters a-z.
	The values of words are distinct."""

    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        m, n = len(board), len(board[0])
        
        trie = Trie()
        for word in words: trie.insert(word)
            
        def fn(i, j, node): 
            """Populate ans through backtracking"""
            if node.word: 
                ans.append("".join(stack))
                node.word = False 
            if not (0 <= i < m and 0 <= j < n) or board[i][j] not in node.children: return 
            stack.append(board[i][j])
            board[i][j] = "#" #mark as visited
            for ii, jj in (i-1, j), (i, j-1), (i, j+1), (i+1, j):
                fn(ii, jj, node.children[stack[-1]])
            board[i][j] = stack.pop()
        
        ans, stack = [], []
        for i in range(m):
            for j in range(n): 
                fn(i, j, trie.root)
        return ans


    """213. House Robber II (Medium)
	You are a professional robber planning to rob houses along a street. Each 
	house has a certain amount of money stashed. All houses at this place are 
	arranged in a circle. That means the first house is the neighbor of the 
	last one. Meanwhile, adjacent houses have security system connected and it 
	will automatically contact the police if two adjacent houses were broken 
	into on the same night. Given a list of non-negative integers representing 
	the amount of money of each house, determine the maximum amount of money 
	you can rob tonight without alerting the police.

	Example 1:
	Input: [2,3,2]
	Output: 3
	Explanation: You cannot rob house 1 (money = 2) and then rob house 3 
	             (money = 2), because they are adjacent houses.

	Example 2:
	Input: [1,2,3,1]
	Output: 4
	Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
	             Total amount you can rob = 1 + 3 = 4."""

    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1: return nums[0] #edge case 
        
        def fn(lo, hi):
            """Return money after robbing houses[lo:hi]"""
            f0 = f1 = 0
            for i in range(lo, hi):
                f0, f1 = f1, max(f1, f0 + nums[i])
            return f1
        
        return max(fn(0, len(nums)-1), fn(1, len(nums)))


    """214. Shortest Palindrome (Hard)
	Given a string s, you are allowed to convert it to a palindrome by adding 
	characters in front of it. Find and return the shortest palindrome you can 
	find by performing this transformation.

	Example 1:
	Input: "aacecaaa"
	Output: "aaacecaaa"

	Example 2:
	Input: "abcd"
	Output: "dcbabcd" """

    def shortestPalindrome(self, s: str) -> str:
        ss = s + "#" + s[::-1]
        lps = [0]*len(ss) #longest prefix suffix array
        k = 0
        for i in range(1, len(ss)):
            while k and ss[k] != ss[i]: 
                k = lps[k-1]
            if ss[k] == ss[i]: k += 1
            lps[i] = k
        return s[k:][::-1] + s


    """215. Kth Largest Element in an Array (Medium)
	Find the kth largest element in an unsorted array. Note that it is the kth 
	largest element in the sorted order, not the kth distinct element.

	Example 1:
	Input: [3,2,1,5,6,4] and k = 2
	Output: 5

	Example 2:
	Input: [3,2,3,1,2,4,5,5,6] and k = 4
	Output: 4

	Note: You may assume k is always valid, 1 ≤ k ≤ array's length."""

    def findKthLargest(self, nums: List[int], k: int) -> int:
        h = []
        for x in nums: 
            heappush(h, x)
            if len(h) > k: heappop(h)
        return h[0]


    """216. Combination Sum III (Medium)
	Find all possible combinations of k numbers that add up to a number n, 
	given that only numbers from 1 to 9 can be used and each combination should 
	be a unique set of numbers.

	Note: All numbers will be positive integers. The solution set must not 
	contain duplicate combinations.

	Example 1:
	Input: k = 3, n = 7
	Output: [[1,2,4]]

	Example 2:
	Input: k = 3, n = 9
	Output: [[1,2,6], [1,3,5], [2,3,4]]"""

    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        
        def fn(n, i=1):
            """Populate ans with a stack."""
            if n == 0 and len(stack) == k: return ans.append(stack.copy())
            if n < 0 or len(stack) == k: return 
            for nn in range(i, 10):
                stack.append(nn)
                fn(n-nn, nn+1)
                stack.pop()
            
        ans, stack = [], []
        fn(n)
        return ans 


    """217. Contains Duplicate (Easy)
	Given an array of integers, find if the array contains any duplicates. Your 
	function should return true if any value appears at least twice in the 
	array, and it should return false if every element is distinct.

	Example 1:
	Input: [1,2,3,1]
	Output: true

	Example 2:
	Input: [1,2,3,4]
	Output: false

	Example 3:
	Input: [1,1,1,3,3,4,3,2,4,2]
	Output: true"""

    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))


    """218. The Skyline Problem (Hard)
	A city's skyline is the outer contour of the silhouette formed by all the 
	buildings in that city when viewed from a distance. Now suppose you are 
	given the locations and height of all the buildings as shown on a cityscape 
	photo (Figure A), write a program to output the skyline formed by these 
	buildings collectively (Figure B).

	Buildings Skyline Contour
	The geometric information of each building is represented by a triplet of 
	integers [Li, Ri, Hi], where Li and Ri are the x coordinates of the left 
	and right edge of the ith building, respectively, and Hi is its height. It 
	is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. 
	You may assume all buildings are perfect rectangles grounded on an 
	absolutely flat surface at height 0. For instance, the dimensions of all 
	buildings in Figure A are recorded as: [ [2 9 10], [3 7 15], [5 12 12], 
	[15 20 10], [19 24 8] ]. The output is a list of "key points" (red dots in 
	Figure B) in the format of [ [x1,y1], [x2, y2], [x3, y3], ... ] that 
	uniquely defines a skyline. A key point is the left endpoint of a 
	horizontal line segment. Note that the last key point, where the rightmost 
	building ends, is merely used to mark the termination of the skyline, and 
	always has zero height. Also, the ground in between any two adjacent 
	buildings should be considered part of the skyline contour. For instance, 
	the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], 
	[12 0], [15 10], [20 8], [24, 0] ].

	Notes:
	The number of buildings in any input list is guaranteed to be in the range 
	[0, 10000]. The input list is already sorted in ascending order by the left 
	x position Li. The output list must be sorted by the x position. There must 
	be no consecutive horizontal lines of equal height in the output skyline. 
	For instance, [...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; 
	the three lines of height 5 should be merged into one in the final output as 
	such: [...[2 3], [4 5], [12 7], ...]"""

    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        ans, hp = [], [] #front of heap => current height 
        buildings.append([inf, inf, 0]) #trick
        for li, ri, hi in buildings:
            #down-slope
            while hp and -hp[0][1] < li:                  #current height cannot reach li
                _, rj = heappop(hp)                       #current height ends at rj
                while hp and -hp[0][1] <= -rj: heappop(hp) #useless height ends earlier than rj
                hj = hp[0][0] if hp else 0                #next height
                ans.append((-rj, -hj))
            #up-slope 
            if hi > 0 and (not hp or -hp[0][0] < hi):     #new height higher than current height
                if ans and ans[-1][0] == li: ans.pop()    #same left => update in-place 
                ans.append([li, hi])
            heappush(hp, (-hi, -ri))
        return ans 


    """219. Contains Duplicate II (Easy)
	Given an array of integers and an integer k, find out whether there are two 
	distinct indices i and j in the array such that nums[i] = nums[j] and the 
	absolute difference between i and j is at most k.

	Example 1:
	Input: nums = [1,2,3,1], k = 3
	Output: true

	Example 2:
	Input: nums = [1,0,1,1], k = 1
	Output: true

	Example 3:
	Input: nums = [1,2,3,1,2,3], k = 2
	Output: false"""

    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        seen = dict()
        for i, x in enumerate(nums):
            if x in seen and i - seen[x] <= k: return True 
            seen[x] = i
        return False 


    """220. Contains Duplicate III (Medium)
	Given an array of integers, find out whether there are two distinct indices 
	i and j in the array such that the absolute difference between nums[i] and 
	nums[j] is at most t and the absolute difference between i and j is at most 
	k.

	Example 1:
	Input: nums = [1,2,3,1], k = 3, t = 0
	Output: true

	Example 2:
	Input: nums = [1,0,1,1], k = 1, t = 2
	Output: true

	Example 3:
	Input: nums = [1,5,9,1,5,9], k = 2, t = 3
	Output: false"""

    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if t < 0: return False #edge case 
        seen = dict()
        for i in range(len(nums)):
            bkt = nums[i]//(t + 1) #bucket 
            if any(bkt+ii in seen and abs(nums[i]-seen[bkt+ii]) <= t for ii in (-1, 0, 1)): return True 
            seen[bkt] = nums[i]
            if i >= k: seen.pop(nums[i-k]//(t+1)) #memory of length k
        return False 


    """221. Maximal Square (Medium)
	Given a 2D binary matrix filled with 0's and 1's, find the largest square 
	containing only 1's and return its area.

	Example:
	Input: 
	1 0 1 0 0
	1 0 1 1 1
	1 1 1 1 1
	1 0 0 1 0
	Output: 4"""

    def maximalSquare(self, matrix: List[List[str]]) -> int:
        
        @lru_cache(None)
        def fn(i, j):
            """Return the length of max square ending at (i, j)."""
            if i < 0 or j < 0 or matrix[i][j] == "0": return 0
            return 1 + min(fn(i-1, j-1), fn(i-1, j), fn(i, j-1))
        
        return max((fn(i, j) for i in range(len(matrix)) for j in range(len(matrix[0]))), default=0)**2


    """222. Count Complete Tree Nodes (Medium)
	Given a complete binary tree, count the number of nodes. Note the 
	definition of a complete binary tree from Wikipedia: in a complete binary
	tree every level, except possibly the last, is completely filled, and all 
	nodes in the last level are as far left as possible. It can have between 1 
	and 2h nodes inclusive at the last level h.

	Example:
	Input: 
	    1
	   / \
	  2   3
	 / \  /
	4  5 6
	Output: 6"""

    def countNodes(self, root: TreeNode) -> int:
        
        def ht(node):
            """Return height of given node."""
            n = 0
            while node: n, node = n+1, node.left
            return n
        
        def fn(node):
            """Return number of nodes in the tree rooted at given node."""
            if not node: return 0
            h = ht(node.left)
            if h == ht(node.right): return 2**h + fn(node.right)
            else: return 2**(h-1) + fn(node.left)
            
        return fn(root)


    """223. Rectangle Area (Medium)
	Find the total area covered by two rectilinear rectangles in a 2D plane. 
	Each rectangle is defined by its bottom left corner and top right corner as 
	shown in the figure.

	Example:
	Input: A = -3, B = 0, C = 3, D = 4, E = 0, F = -1, G = 9, H = 2
	Output: 45

	Note: Assume that the total area is never beyond the maximum possible value 
	of int."""

    def computeArea(self, A: int, B: int, C: int, D: int, E: int, F: int, G: int, H: int) -> int:
        area1 = (C-A) * (D-B)
        area2 = (G-E) * (H-F)
        overlap = max(0, min(C, G) - max(A, E)) * max(0, min(D, H) - max(B, F))
        return area1 + area2 - overlap


    """224. Basic Calculator (Hard)
	Implement a basic calculator to evaluate a simple expression string. The 
	expression string may contain open ( and closing parentheses ), the plus + 
	or minus sign -, non-negative integers and empty spaces .

	Example 1:
	Input: "1 + 1"
	Output: 2

	Example 2:
	Input: " 2-1 + 2 "
	Output: 3

	Example 3:
	Input: "(1+(4+5+2)-3)+(6+8)"
	Output: 23

	Note:
	You may assume that the given expression is always valid.
	Do not use the eval built-in library function."""

    def calculate(self, s: str) -> int:
        ans, sign, val = 0, 1, 0
        stack = []
        for c in s:
            if c.isdigit():
                val = 10*val + int(c)
            elif c in "+-":
                ans += sign * val
                sign = 1 if c == "+" else -1
                val = 0
            elif c == "(":
                stack.append(ans)
                stack.append(sign)
                ans, sign = 0, 1
            elif c == ")":
                ans += sign * val
                ans *= stack.pop()
                ans += stack.pop()
                sign, val = 1, 0
        return ans + sign * val 


    """226. Invert Binary Tree (Easy)
	Invert a binary tree.

	Example:
	Input:
	     4
	   /   \
	  2     7
	 / \   / \
	1   3 6   9

	Output:

	     4
	   /   \
	  7     2
	 / \   / \
	9   6 3   1
	
	Trivia: This problem was inspired by this original tweet by Max Howell:
	Google: 90% of our engineers use the software you wrote (Homebrew), but you 
	can’t invert a binary tree on a whiteboard so f*** off."""

    def invertTree(self, root: TreeNode) -> TreeNode:
        
        def fn(node):
            """Return root of tree that is inverted"""
            if not node: return 
            node.left, node.right = fn(node.right), fn(node.left)
            return node 
        
        return fn(root)


    """227. Basic Calculator II (Medium)
	Implement a basic calculator to evaluate a simple expression string. The 
	expression string contains only non-negative integers, +, -, *, / operators 
	and empty spaces . The integer division should truncate toward zero.

	Example 1:
	Input: "3+2*2"
	Output: 7

	Example 2:
	Input: " 3/2 "
	Output: 1

	Example 3:
	Input: " 3+5 / 2 "
	Output: 5

	Note:
	You may assume that the given expression is always valid. Do not use the 
	eval built-in library function."""

    def calculate(self, s: str) -> int:
        op, val = "+", 0
        stack = []
        for i, c in enumerate(s): 
            if c.isdigit(): val = 10*val + int(c)
            if i == len(s) - 1 or c in "+-*/": 
                if   op == "+": stack.append(val)
                elif op == "-": stack.append(-val)
                elif op == "*": stack.append(stack.pop()*val)
                elif op == "/": stack.append(int(stack.pop()/val))
                op, val = c, 0
        return sum(stack)


    """228. Summary Ranges (Medium)
	Given a sorted integer array without duplicates, return the summary of its 
	ranges.

	Example 1:
	Input:  [0,1,2,4,5,7]
	Output: ["0->2","4->5","7"]
	Explanation: 0,1,2 form a continuous range; 4,5 form a continuous range.

	Example 2:
	Input:  [0,2,3,4,6,8,9]
	Output: ["0","2->4","6","8->9"]
	Explanation: 2,3,4 form a continuous range; 8,9 form a continuous range."""

    def summaryRanges(self, nums: List[int]) -> List[str]:
        ans = []
        for i, x in enumerate(nums):
            if not i or nums[i-1]+1 != x: val = [x] #start of a range
            if i == len(nums)-1 or x+1 != nums[i+1]: 
                if val[-1] != x: val.append(x) #end of a range
                ans.append(val)
        return ["->".join(map(str, x)) for x in ans]


    """229. Majority Element II (Medium)
	Given an integer array of size n, find all elements that appear more than 
	⌊ n/3 ⌋ times. Note: The algorithm should run in linear time and in O(1) 
	space.

	Example 1:
	Input: [3,2,3]
	Output: [3]

	Example 2:
	Input: [1,1,1,3,3,2,2,2]
	Output: [1,2]"""

    def majorityElement(self, nums: List[int]) -> List[int]:
        ans, vote = [0]*2, [0]*2
        for x in nums:
            if   x == ans[0]: vote[0] += 1
            elif x == ans[1]: vote[1] += 1
            elif vote[0] == 0: ans[0], vote[0] = x, 1
            elif vote[1] == 0: ans[1], vote[1] = x, 1
            else: vote = [x - 1 for x in vote]
        return [x for x in set(ans) if nums.count(x) > len(nums)//3]


    """230. Kth Smallest Element in a BST (Medium)
	Given a binary search tree, write a function kthSmallest to find the kth 
	smallest element in it.

	Example 1:
	Input: root = [3,1,4,null,2], k = 1
	   3
	  / \
	 1   4
	  \
	   2
	Output: 1

	Example 2:
	Input: root = [5,3,6,2,4,null,null,1], k = 3
	       5
	      / \
	     3   6
	    / \
	   2   4
	  /
	 1
	Output: 3

	Follow up: What if the BST is modified (insert/delete operations) often and 
	you need to find the kth smallest frequently? How would you optimize the 
	kth Smallest routine?

	Constraints:
	The number of elements of the BST is between 1 to 10^4.
	You may assume k is always valid, 1 ≤ k ≤ BST's total elements."""

    def kthSmallest(self, root: TreeNode, k: int) -> int:
        node = root
        stack = []
        while node or stack:
            if node:
                stack.append(node)
                node = node.left
                continue
            node = stack.pop()
            if not (k := k-1): break
            node = node.right
        return node.val 


    """231. Power of Two (Easy)
	Given an integer, write a function to determine if it is a power of two.

	Example 1:
	Input: 1
	Output: true 
	Explanation: 20 = 1

	Example 2:
	Input: 16
	Output: true
	Explanation: 24 = 16

	Example 3:
	Input: 218
	Output: false"""

    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and n & (n-1) == 0


    """233. Number of Digit One (Hard)
	Given an integer n, count the total number of digit 1 appearing in all non-
	negative integers less than or equal to n.

	Example:
	Input: 13
	Output: 6 

	Explanation: Digit 1 occurred in the following numbers: 1, 10, 11, 12, 13."""

    def countDigitOne(self, n: int) -> int:
        if n < 0: return 0 #edge case 
        
        ans = digit = tail = 0
        magn = 1 #magnitude 
        while n: 
            tail = digit * magn//10 + tail #move digit to tail 
            n, digit = divmod(n, 10) #seprate digit from head 
            
            ans += n * magn
            if digit > 1: ans += magn
            elif digit == 1: ans += tail + 1 #tail + 1 considering 000...
                
            magn *= 10
        return ans 


    """234. Palindrome Linked List (Easy)
	Given a singly linked list, determine if it is a palindrome.

	Example 1:
	Input: 1->2
	Output: false

	Example 2:
	Input: 1->2->2->1
	Output: true

	Follow up: Could you do it in O(n) time and O(1) space?"""

    def isPalindrome(self, head: ListNode) -> bool:
        fast = slow = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next 
            
        prev = None
        while slow: slow.next, slow, prev = prev, slow.next, slow
        
        while prev and head.val == prev.val: 
            head = head.next
            prev = prev.next 
        
        return not prev 


    """235. Lowest Common Ancestor of a Binary Search Tree (Easy)
	Given a binary search tree (BST), find the lowest common ancestor (LCA) of 
	two given nodes in the BST. According to the definition of LCA on 
	Wikipedia: "The lowest common ancestor is defined between two nodes p and q 
	as the lowest node in T that has both p and q as descendants (where we 
	allow a node to be a descendant of itself)."

	Given binary search tree:  root = [6,2,8,0,4,7,9,null,null,3,5]

	Example 1:
	Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
	Output: 6
	Explanation: The LCA of nodes 2 and 8 is 6.

	Example 2:
	Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
	Output: 2
	Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a 
	descendant of itself according to the LCA definition.

	Constraints:
	All of the nodes' values will be unique.
	p and q are different and both values will exist in the BST."""

    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if p.val > q.val: p, q = q, p #p always smaller
        node = root
        while node: 
            if q.val < node.val: node = node.left
            elif node.val < p.val: node = node.right 
            else: return node


    """236. Lowest Common Ancestor of a Binary Tree (Medium)
	Given a binary tree, find the lowest common ancestor (LCA) of two given 
	nodes in the tree. According to the definition of LCA on Wikipedia: “The 
	lowest common ancestor is defined between two nodes p and q as the lowest 
	node in T that has both p and q as descendants (where we allow a node to be 
	a descendant of itself).” Given the following binary tree:  

	root = [3,5,1,6,2,0,8,null,null,7,4]

	Example 1:
	Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
	Output: 3
	Explanation: The LCA of nodes 5 and 1 is 3.

	Example 2:
	Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
	Output: 5
	Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a 
	             descendant of itself according to the LCA definition.

	Note:
	All of the nodes' values will be unique.
	p and q are different and both values will exist in the binary tree."""

    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        
        def fn(node): 
            """Return LCA of p and q in the tree rooted at node."""
            if not node or node in (p, q): return node
            left, right = fn(node.left), fn(node.right)
            return node if left and right else left or right
        
        return fn(root)


    """237. Delete Node in a Linked List (Easy)
	Write a function to delete a node (except the tail) in a singly linked 
	list, given only access to that node. Given linked list -- 
	head = [4,5,1,9], which looks like following:

    4 -> 5 -> 1 -> 9

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

	Note:
	* The linked list will have at least two elements.
	* All of the nodes' values will be unique.
	* The given node will not be the tail and it will always be a valid node of
	  the linked list.
	* Do not return anything from your function."""

    def deleteNode(self, node):
        node.val = node.next.val 
        node.next = node.next.next 


    """238. Product of Array Except Self (Medium)
	Given an array nums of n integers where n > 1,  return an array output 
	such that output[i] is equal to the product of all the elements of nums 
	except nums[i].

	Example:
	Input:  [1,2,3,4]
	Output: [24,12,8,6]

	Constraint: 
	It's guaranteed that the product of the elements of any prefix or suffix of 
	the array (including the whole array) fits in a 32 bit integer.

	Note: Please solve it without division and in O(n).

	Follow up:
	Could you solve it with constant space complexity? (The output array does 
	not count as extra space for the purpose of space complexity analysis.)"""

    def productExceptSelf(self, nums: List[int]) -> List[int]:
        ans = [1] * len(nums)
        prefix = suffix = 1
        for i in range(len(nums)):
            ans[i] *= prefix 
            prefix *= nums[i]
            ans[~i] *= suffix 
            suffix *= nums[~i]
        return ans 


    """239. Sliding Window Maximum (Hard)
	Given an array nums, there is a sliding window of size k which is moving 
	from the very left of the array to the very right. You can only see the k 
	numbers in the window. Each time the sliding window moves right by one 
	position. Return the max sliding window.

	Follow up: Could you solve it in linear time?

	Example:
	Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
	Output: [3,3,5,5,6,7] 
	Explanation: 

	Window position                Max
	---------------               -----
	[1  3  -1] -3  5  3  6  7       3
	 1 [3  -1  -3] 5  3  6  7       3
	 1  3 [-1  -3  5] 3  6  7       5
	 1  3  -1 [-3  5  3] 6  7       5
	 1  3  -1  -3 [5  3  6] 7       6
	 1  3  -1  -3  5 [3  6  7]      7

	Constraints:
	* 1 <= nums.length <= 10^5
	* -10^4 <= nums[i] <= 10^4
	* 1 <= k <= nums.length"""

    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        ans = []
        queue = deque() #decreasing queue 
        for i, x in enumerate(nums): 
            while queue and queue[-1][1] <= x: queue.pop() #remove redundant 
            queue.append((i, x))
            if queue and queue[0][0] <= i-k: queue.popleft() #remove expired 
            if i+1 >= k: ans.append(queue[0][1])
        return ans 


    """240. Search a 2D Matrix II (Medium)
	Write an efficient algorithm that searches for a value in an m x n matrix. 
	This matrix has the following properties:
	* Integers in each row are sorted in ascending from left to right.
	* Integers in each column are sorted in ascending from top to bottom.

	Example:
	Consider the following matrix:

	[
	  [1,   4,  7, 11, 15],
	  [2,   5,  8, 12, 19],
	  [3,   6,  9, 16, 22],
	  [10, 13, 14, 17, 24],
	  [18, 21, 23, 26, 30]
	]
	Given target = 5, return true. Given target = 20, return false."""

    def searchMatrix(self, matrix, target):
        if not matrix: return False #edge caes 
        
        m, n = len(matrix), len(matrix[0])
        i, j = 0, n-1
        while i < m and 0 <= j: 
            if matrix[i][j] == target: return True 
            elif matrix[i][j] < target: i += 1
            else: j -= 1
        return False 


    """241. Different Ways to Add Parentheses (Medium)
	Given a string of numbers and operators, return all possible results from 
	computing all the different possible ways to group numbers and operators. 
	The valid operators are +, - and *.

	Example 1:
	Input: "2-1-1"
	Output: [0, 2]
	Explanation: 
	((2-1)-1) = 0 
	(2-(1-1)) = 2

	Example 2:
	Input: "2*3-4*5"
	Output: [-34, -14, -10, -10, 10]
	Explanation: 
	(2*(3-(4*5))) = -34 
	((2*3)-(4*5)) = -14 
	((2*(3-4))*5) = -10 
	(2*((3-4)*5)) = -10 
	(((2*3)-4)*5) = 10"""

    def diffWaysToCompute(self, input: str) -> List[int]:
        #pre-processing to tokenize input 
        tokens = re.split(r'(\D)', input)
        mp = {"+": add, "-": sub, "*": mul}
        for i, token in enumerate(tokens):
            if token.isdigit(): tokens[i] = int(token)
            else: tokens[i] = mp[token]
        
        def fn(lo, hi): 
            """Return possible outcomes of tokens[lo:hi]"""
            if lo+1 == hi: return [tokens[lo]]
            ans = []
            for mid in range(lo+1, hi, 2): 
                ans.extend(tokens[mid](x, y) for x in fn(lo, mid) for y in fn(mid+1, hi))
            return ans
        
        return fn(0, len(tokens))



    """242. Valid Anagram (Easy)
	Given two strings s and t , write a function to determine if t is an 
	anagram of s.

	Example 1:
	Input: s = "anagram", t = "nagaram"
	Output: true

	Example 2:
	Input: s = "rat", t = "car"
	Output: false

	Note: You may assume the string contains only lowercase alphabets.

	Follow up: What if the inputs contain unicode characters? How would you 
	           adapt your solution to such case?"""
    
    def isAnagram(self, s: str, t: str) -> bool:
        freq = [0]*26
        for c in s: freq[ord(c)-97] += 1
        for c in t: freq[ord(c)-97] -= 1
        return all(v == 0 for v in freq)


    """257. Binary Tree Paths (Easy)
	Given a binary tree, return all root-to-leaf paths.

	Note: A leaf is a node with no children.

	Example:
	Input:

	   1
	 /   \
	2     3
	 \
	  5
	Output: ["1->2->5", "1->3"]

	Explanation: All root-to-leaf paths are: 1->2->5, 1->3"""

    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        
        def fn(node):
            """Populate ans with a stack via backtracking."""
            if not node: return #null node
            stack.append(node.val)
            if node.left is node.right: ans.append("->".join(map(str, stack))) #leaf node
            fn(node.left) or fn(node.right)
            stack.pop()
            
        ans, stack = [], []
        fn(root)
        return ans 


    """258. Add Digits (Easy)
	Given a non-negative integer num, repeatedly add all its digits until the 
	result has only one digit.

	Example:
	Input: 38
	Output: 2 
	Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
	             Since 2 has only one digit, return it.

	Follow up: Could you do it without any loop/recursion in O(1) runtime?"""

    def addDigits(self, num: int) -> int:
        return num and 1 + (num - 1) % 9


    """260. Single Number III (Medium)
	Given an array of numbers nums, in which exactly two elements appear only 
	once and all the other elements appear exactly twice. Find the two elements 
	that appear only once.

	Example:
	Input:  [1,2,1,3,2,5]
	Output: [3,5]

	Note:
	The order of the result is not important. So in the above example, [5, 3] 
	is also correct. Your algorithm should run in linear runtime complexity. 
	Could you implement it using only constant space complexity?"""

    def singleNumber(self, nums: List[int]) -> List[int]:
        diff = reduce(xor, nums)
        diff &= -diff 
        ans = [0]*2
        for x in nums:
            ans[bool(diff & x)] ^= x
        return ans 



    """263. Ugly Number (Easy)
	Write a program to check whether a given number is an ugly number. Ugly 
	numbers are positive numbers whose prime factors only include 2, 3, 5.

	Example 1:
	Input: 6
	Output: true
	Explanation: 6 = 2 × 3

	Example 2:
	Input: 8
	Output: true
	Explanation: 8 = 2 × 2 × 2

	Example 3:
	Input: 14
	Output: false 
	Explanation: 14 is not ugly since it includes another prime factor 7.

	Note:
	* 1 is typically treated as an ugly number.
	* Input is within the 32-bit signed integer range: [−231,  231 − 1]."""

    def isUgly(self, num: int) -> bool:
        if num <= 0: return False #edge case 
        
        for f in 2, 3, 5: 
            while num % f == 0: 
                num //= f
        return num == 1


    """264. Ugly Number II (Medium)
	Write a program to find the n-th ugly number. Ugly numbers are positive 
	numbers whose prime factors only include 2, 3, 5. 

	Example:
	Input: n = 10
	Output: 12
	Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 
	             10 ugly numbers.

	Note:  
	* 1 is typically treated as an ugly number.
	* n does not exceed 1690."""

    def nthUglyNumber(self, n: int) -> int:
        ans = [1]*n
        p2 = p3 = p5 = 0
        for i in range(1, n): 
            ans[i] = min(2*ans[p2], 3*ans[p3], 5*ans[p5])
            if 2*ans[p2] == ans[i]: p2 += 1
            if 3*ans[p3] == ans[i]: p3 += 1
            if 5*ans[p5] == ans[i]: p5 += 1
        return ans[-1]


    """268. Missing Number (Easy)
	Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, 
	find the one that is missing from the array.

	Example 1:
	Input: [3,0,1]
	Output: 2

	Example 2:
	Input: [9,6,4,2,3,5,7,0,1]
	Output: 8

	Note: Your algorithm should run in linear runtime complexity. Could you 
	implement it using only constant extra space complexity?"""

    def missingNumber(self, nums: List[int]) -> int:
        return reduce(xor, (i^x for i, x in enumerate(nums, 1)))


"""146. LRU Cache (Medium)
Design and implement a data structure for Least Recently Used (LRU) cache. It 
should support the following operations: get and put. 
get(key)        - Get the value (will always be positive) of the key if the key 
                  exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. 

When the cache reached its capacity, it should invalidate the least recently 
used item before inserting a new item. The cache is initialized with a positive 
capacity.

Follow up: Could you do both operations in O(1) time complexity?

Example:
LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4"""

class ListNode:
    def __init__(self, key=0, val=0, prev=None, next=None):
        self.key = key
        self.val = val
        self.prev = prev
        self.next = next
        

class LRUCache:

    def __init__(self, capacity: int):
        """Initialize hash table & dll"""
        self.cpty = capacity
        self.htab = dict() #hash table 
        self.head = ListNode() #doubly linked list
        self.tail = ListNode()
        self.head.next = self.tail
        self.tail.prev = self.head 
        
    def _del(self, key: int) -> int: 
        """Delete given key from hash table & dll"""
        node = self.htab.pop(key)
        node.prev.next = node.next
        node.next.prev = node.prev
        return node.val

    def _ins(self, key: int, value: int) -> None: 
        """Insert at tail"""
        node = ListNode(key, value, self.tail.prev, self.tail)
        self.tail.prev.next = self.tail.prev = node
        self.htab[key] = node
        
    def get(self, key: int) -> int:
        if key not in self.htab: return -1
        value = self._del(key)
        self._ins(key, value)
        return value

    def put(self, key: int, value: int) -> None:
        if key in self.htab: self._del(key)
        self._ins(key, value)
        if len(self.htab) > self.cpty: 
            self._del(self.head.next.key)


"""155. Min Stack (Easy)
Design a stack that supports push, pop, top, and retrieving the minimum element 
in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
 
Example 1:
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

Constraints:
Methods pop, top and getMin operations will always be called on non-empty stacks."""

class MinStack:

    def __init__(self):
        self.min   = []  #min-stack for minimum so far
        self.stack = []  #regular stack for values 
        
    def push(self, x: int) -> None:
        if self.min: 
            self.min.append(min(x, self.min[-1]))
        else: 
            self.min.append(x)
        self.stack.append(x)
        
    def pop(self) -> None:
        self.min.pop()
        self.stack.pop()
            
    def top(self) -> int:
        return self.stack[-1]
        
    def getMin(self) -> int:
        return self.min[-1]


"""173. Binary Search Tree Iterator (Medium)
Implement an iterator over a binary search tree (BST). Your iterator will be 
initialized with the root node of a BST. Calling next() will return the next 
smallest number in the BST.

Example:

BSTIterator iterator = new BSTIterator(root);
iterator.next();    // return 3
iterator.next();    // return 7
iterator.hasNext(); // return true
iterator.next();    // return 9
iterator.hasNext(); // return true
iterator.next();    // return 15
iterator.hasNext(); // return true
iterator.next();    // return 20
iterator.hasNext(); // return false
 
Note:
next() and hasNext() should run in average O(1) time and uses O(h) memory, 
where h is the height of the tree. You may assume that next() call will always 
be valid, that is, there will be at least a next smallest number in the BST 
when next() is called."""

class BSTIterator:

    def __init__(self, root: TreeNode):
        self.stack = []
        self._sink(root)
    
    def _sink(self, node: TreeNode) -> None:
        """Sink along the tree and collect nodes to stack"""
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        """
        @return the next smallest number
        """
        node = self.stack.pop()
        ans = node.val 
        self._sink(node.right)
        return ans 

    def hasNext(self) -> bool:
        """
        @return whether we have a next smallest number
        """
        return self.stack


"""208. Implement Trie (Prefix Tree) (Medium)
Implement a trie with insert, search, and startsWith methods.

Example:
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true

Note:
You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings."""

class TrieNode:
    """Node on trie"""
    def __init__(self):
        self.data = [None]*26 #lowercase letter only
        self.word = False     #true if a word terminates here 
        

class Trie:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        node = self.root
        for i in (ord(x) - 97 for x in word): 
            if not node.data[i]: node.data[i] = TrieNode()
            node = node.data[i]
        node.word = True
        
    def _traverse(self, word): 
        """traverse the trie to find word"""
        node = self.root
        for i in (ord(x)-97 for x in word):
            if not node.data[i]: return None
            node = node.data[i]
        return node
        
    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        node = self._traverse(word)
        return node.word if node else False 
        
    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        return self._traverse(prefix)


"""211. Add and Search Word - Data structure design (Medium)
Design a data structure that supports the following two operations:
void addWord(word)
bool search(word)

search(word) can search a literal word or a regular expression string 
containing only letters a-z or .. A . means it can represent any one letter.

Example:
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true

Note: You may assume that all words are consist of lowercase letters a-z."""

class WordDictionary:

    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for letter in word:
            node = node.setdefault(letter, {})
        node["#"] = True #sentinel 

    def search(self, word: str) -> bool:
        
        def fn(node, i): 
            """Return True if word[i:] is found at trie rooted at n"""
            if not node: return False 
            if i == len(word): return node.get("#", False)
            if word[i] == ".": 
                return any(fn(node[k], i+1) for k in node if k != "#")
            else: 
                return fn(node.get(word[i]), i+1)
        
        return fn(self.root, 0)


"""225. Implement Stack using Queues (Easy)
Implement the following operations of a stack using queues.

push(x) -- Push element x onto stack.
pop()   -- Removes the element on top of the stack.
top()   -- Get the top element.
empty() -- Return whether the stack is empty.

Example:
MyStack stack = new MyStack();

stack.push(1);
stack.push(2);  
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false

Notes:
You must use only standard operations of a queue -- which means only push to 
back, peek/pop from front, size, and is empty operations are valid. Depending 
on your language, queue may not be supported natively. You may simulate a queue 
by using a list or deque (double-ended queue), as long as you use only standard 
operations of a queue. You may assume that all operations are valid (for 
example, no pop or top operations will be called on an empty stack)."""

class MyStack:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.queue = deque()

    def push(self, x: int) -> None:
        """
        Push element x onto stack.
        """
        self.queue.append(x)
        for _ in range(len(self.queue)-1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        """
        Removes the element on top of the stack and returns that element.
        """
        return self.queue.popleft()

    def top(self) -> int:
        """
        Get the top element.
        """
        return self.queue[0] 

    def empty(self) -> bool:
        """
        Returns whether the stack is empty.
        """
        return not self.queue 


"""232. Implement Queue using Stacks (Easy)
Implement the following operations of a queue using stacks.
push(x) -- Push element x to the back of queue.
pop()   -- Removes the element from in front of queue.
peek()  -- Get the front element.
empty() -- Return whether the queue is empty.

Example:
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);  
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false

Notes:
You must use only standard operations of a stack -- which means only push to 
top, peek/pop from top, size, and is empty operations are valid. Depending on 
your language, stack may not be supported natively. You may simulate a stack by 
using a list or deque (double-ended queue), as long as you use only standard 
operations of a stack. You may assume that all operations are valid (for 
example, no pop or peek operations will be called on an empty queue)."""

class MyQueue:

    def __init__(self):
        self.in_ = [] #in stack 
        self.out = [] #out stack

    def push(self, x: int) -> None:
        self.in_.append(x)
        
    def _move(self) -> None: 
        if not self.out:
            while self.in_: self.out.append(self.in_.pop())

    def pop(self) -> int:
        self._move()
        return self.out.pop()

    def peek(self) -> int:
        self._move()
        return self.out[-1]

    def empty(self) -> bool:
        return not self.in_ and not self.out