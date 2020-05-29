"""This file is a minimal colleciton of solutions to leetcode problems in 
Python3. No algorithm or reasoning is provided for the sake of saving spaces. 
For more details, the readers are suggested to explore on their own effort.
"""

from functools import lru_cache, reduce
from heapq import heappush, heappop

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
        k = 0
        for i in range(len(nums)):
            if i == 0 or nums[i-1] != nums[i]: 
                nums[k] = nums[i]
                k += 1
        return k 


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