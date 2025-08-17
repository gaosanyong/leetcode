=begin
1. Two Sum (Easy)
Given an array of integers nums and an integer target, return indices of the two
numbers such that they add up to target. You may assume that each input would
have exactly one solution, and you may not use the same element twice. You can
return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
* 2 <= nums.length <= 10^4
* -10^9 <= nums[i] <= 10^9
* -10^9 <= target <= 10^9
* Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n2) time
           complexity?
=end

def two_sum(nums, target)
    loc = {}
    nums.each_with_index do |x, i|
        if loc.key?(target-x)
            return [loc[target-x], i]
        end
        loc[x] = i
    end
end


=begin
9. Palindrome Number (Easy)
Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes
             121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Constraints: -2^31 <= x <= 2^31 - 1

Follow up: Could you solve it without converting the integer to a string?
=end

def is_palindrome(x)
    return false if x < 0 || x % 10 == 0 && x != 0
    y = 0
    while x > y
        y = 10*y + x % 10
        x /= 10
    end
    return [y, y / 10].include?(x)
end


=begin
13. Roman to Integer (Easy)
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and
M.
    Symbol       Value
    I             1
    V             5
    X             10
    L             50
    C             100
    D             500
    M             1000
For example, 2 is written as II in Roman numeral, just two ones added together.
12 is written as XII, which is simply X + II. The number 27 is written as XXVII,
which is XX + V + II. Roman numerals are usually written largest to smallest
from left to right. However, the numeral for four is not IIII. Instead, the
number four is written as IV. Because the one is before the five we subtract it
making four. The same principle applies to the number nine, which is written as
IX. There are six instances where subtraction is used:
* I can be placed before V (5) and X (10) to make 4 and 9.
* X can be placed before L (50) and C (100) to make 40 and 90.
* C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

Example 1:
Input: s = "III"
Output: 3
Explanation: III = 3.

Example 2:
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

Example 3:
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

Constraints:
* 1 <= s.length <= 15
* s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
* It is guaranteed that s is a valid roman numeral in the range [1, 3999].
=end

def roman_to_int(s)
    symbol = {'I' => 1, 'V' => 5, 'X' => 10, 'L' => 50, 'C' => 100, 'D' => 500, 'M' => 1000}
    ans = 0
    s.each_char.with_index do |ch, i|
        if i+1 < s.size && symbol[ch] < symbol[s[i+1]]
            ans -= symbol[ch]
        else
            ans += symbol[ch]
        end
    end
    return ans
end


=begin
14. Longest Common Prefix (Easy)
Write a function to find the longest common prefix string amongst an array of
strings. If there is no common prefix, return an empty string "".

Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Constraints:
* 1 <= strs.length <= 200
* 0 <= strs[i].length <= 200
* strs[i] consists of only lowercase English letters if it is non-empty.
=end

def longest_common_prefix(strs)
    ans = []
    strs[0].each_char.with_index do |ch, j|
        break unless (1..strs.size-1).each do |i|
            break if j == strs[i].size || ch != strs[i][j]
        end
        ans.push(ch)
    end
    return ans.join
end


=begin
20. Valid Parentheses (Easy)
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid. An input string is valid if:
* Open brackets must be closed by the same type of brackets.
* Open brackets must be closed in the correct order.
* Every close bracket has a corresponding open bracket of the same type.

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
Input: s = "([])"
Output: true

Example 5:
Input: s = "([)]"
Output: false

Constraints:
* 1 <= s.length <= 10^4
* s consists of parentheses only '()[]{}'.
=end

def is_valid(s)
    pair = {'(' => ')', '[' => ']', '{' => '}'}
    stack = []
    s.each_char do |ch|
        if pair.key?(ch)
            stack.push(pair[ch])
        elsif stack.empty? || ch != stack[-1]
            return false
        else
            stack.pop()
        end
    end
    return stack.empty?
end


=begin
21. Merge Two Sorted Lists (Easy)
You are given the heads of two sorted linked lists list1 and list2. Merge the
two lists into one sorted list. The list should be made by splicing together the
nodes of the first two lists. Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]

Constraints:
* The number of nodes in both lists is in the range [0, 50].
* -100 <= Node.val <= 100
* Both list1 and list2 are sorted in non-decreasing order.
=end

def merge_two_lists(list1, list2)
    dummy = node = ListNode.new
    while list1 && list2
        if list1.val < list2.val
            node.next = list1
            list1 = list1.next
        else
            node.next = list2
            list2 = list2.next
        end
        node = node.next
    end
    node.next = list1 || list2
    return dummy.next
end


=begin
26. Remove Duplicates from Sorted Array (Easy)
Given an integer array nums sorted in non-decreasing order, remove the
duplicates in-place such that each unique element appears only once. The
relative order of the elements should be kept the same. Then return the number
of unique elements in nums. Consider the number of unique elements of nums to be
k, to get accepted, you need to do the following things:
* Change the array nums such that the first k elements of nums contain the
  unique elements in the order they were present in nums initially. The
  remaining elements of nums are not important as well as the size of nums.
* Return k.
Custom Judge:
The judge will test your solution with the following code:
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length
int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

Example 1:
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of
             nums being 1 and 2 respectively. It does not matter what you leave
             beyond the returned k (hence they are underscores).

Example 2:
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of
             nums being 0, 1, 2, 3, and 4 respectively. It does not matter what
             you leave beyond the returned k (hence they are underscores).

Constraints:
* 1 <= nums.length <= 3 * 10^4
* -100 <= nums[i] <= 100
* nums is sorted in non-decreasing order.
=end

def remove_duplicates(nums)
    k = 0
    nums.each_with_index do |x, i|
        if i == 0 || nums[i-1] != x
            nums[k] = x
            k += 1
        end
    end
    return k
end


=begin
27. Remove Element (Easy)
Given an integer array nums and an integer val, remove all occurrences of val in
nums in-place. The order of the elements may be changed. Then return the number
of elements in nums which are not equal to val. Consider the number of elements
in nums which are not equal to val be k, to get accepted, you need to do the
following things:
* Change the array nums such that the first k elements of nums contain the
  elements which are not equal to val. The remaining elements of nums are not
  important as well as the size of nums.
* Return k.
Custom Judge:
The judge will test your solution with the following code:
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of
             nums being 2. It does not matter what you leave beyond the returned
             k (hence they are underscores).

Example 2:
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of
             nums containing 0, 0, 1, 3, and 4. Note that the five elements can
             be returned in any order. It does not matter what you leave beyond
             the returned k (hence they are underscores).

Constraints:
* 0 <= nums.length <= 100
* 0 <= nums[i] <= 50
* 0 <= val <= 100
=end

def remove_element(nums, val)
    k = 0
    nums.each_with_index do |x, i|
        if x != val
            nums[k] = x
            k += 1
        end
    end
    return k
end


=begin
28. Find the Index of the First Occurrence in a String (Easy)
Given two strings needle and haystack, return the index of the first occurrence
of needle in haystack, or -1 if needle is not part of haystack.

Example 1:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6. The first occurrence is at index 0,
             so we return 0.

Example 2:
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.

Constraints:
* 1 <= haystack.length, needle.length <= 10^4
* haystack and needle consist of only lowercase English characters.
=end

def str_str(haystack, needle)
    return haystack.index(needle) || -1
end


=begin
35. Search Insert Position (Easy)
Given a sorted array of distinct integers and a target value, return the index
if the target is found. If not, return the index where it would be if it were
inserted in order. You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Constraints:
* 1 <= nums.length <= 10^4
* -10^4 <= nums[i] <= 10^4
* nums contains distinct values sorted in ascending order.
* -10^4 <= target <= 10^4
=end

def search_insert(nums, target)
    return nums.bsearch_index{|x| target <= x} || nums.size
end


=begin
58. Length of Last Word (Easy)
Given a string s consisting of words and spaces, return the length of the last
word in the string. A word is a maximal substring consisting of non-space
characters only.

Example 1:
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.

Example 2:
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

Example 3:
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.

Constraints:
* 1 <= s.length <= 10^4
* s consists of only English letters and spaces ' '.
* There will be at least one word in s.
=end

def length_of_last_word(s)
    return s.split.last.size
end


=begin
66. Plus One (Easy)
You are given a large integer represented as an integer array digits, where each
digits[i] is the ith digit of the integer. The digits are ordered from most
significant to least significant in left-to-right order. The large integer does
not contain any leading 0's. Increment the large integer by one and return the
resulting array of digits.

Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123. Incrementing by one gives
             123 + 1 = 124. Thus, the result should be [1,2,4].

Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321. Incrementing by one gives
             4321 + 1 = 4322. Thus, the result should be [4,3,2,2].

Example 3:
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9. Incrementing by one gives
             9 + 1 = 10. Thus, the result should be [1,0].

Constraints:
* 1 <= digits.length <= 100
* 0 <= digits[i] <= 9
* digits does not contain any leading 0's.
=end

def plus_one(digits)
    carry = 1
    (digits.size-1).downto(0) do |i|
        carry += digits[i]
        digits[i] = carry % 10
        carry /= 10
        break if carry == 0
    end
    digits.unshift(carry) if carry == 1
    return digits
end


=begin
67. Add Binary (Easy)
Given two binary strings a and b, return their sum as a binary string.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
* 1 <= a.length, b.length <= 10^4
* a and b consist only of '0' or '1' characters.
* Each string does not contain leading zeros except for the zero itself.
=end

def add_binary(a, b)
    ans = []
    carry, i, j = 0, a.size-1, b.size-1
    while i >= 0 || j >= 0 || carry == 1 do
        carry += 1 if i >= 0 && a[i] == '1'
        carry += 1 if j >= 0 && b[j] == '1'
        ans.push(carry % 2)
        carry /= 2
        i -= 1
        j -= 1
    end
    return ans.reverse.map(&:to_s).join
end


=begin
69. Sqrt(x) (Easy)
Given a non-negative integer x, return the square root of x rounded down to the
nearest integer. The returned integer should be non-negative as well. You must
not use any built-in exponent function or operator. For example, do not use
pow(x, 0.5) in c++ or x ** 0.5 in python.

Example 1:
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.

Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to
             the nearest integer, 2 is returned.

Constraints: 0 <= x <= 2^31 - 1
=end

def my_sqrt(x)
    ans = x
    while ans * ans > x
        ans = (ans + x / ans)/2
    end
    return ans
end
