"""This file is a minimal colleciton of solutions to leetcode problems in 
Python3. No algorithm or reasoning is provided for the sake of saving spaces. 
For more details, the readers are suggested to explore on their own effort.
"""

from functools import lru_cache

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
