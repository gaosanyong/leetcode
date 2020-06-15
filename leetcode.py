"""This file is a minimal colleciton of solutions to leetcode problems in 
Python3. No algorithm or reasoning is provided for the sake of saving spaces. 
For more details, the readers are suggested to explore on their own effort.
"""

from functools import lru_cache, reduce
from heapq import heappush, heappop
from itertools import groupby, zip_longest
from operator import gt, lt

class Solution:

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