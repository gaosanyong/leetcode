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
