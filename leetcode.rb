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


=begin
70. Climbing Stairs (Easy)
You are climbing a staircase. It takes n steps to reach the top. Each time you
can either climb 1 or 2 steps. In how many distinct ways can you climb to the
top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
             1. 1 step + 1 step
             2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
             1. 1 step + 1 step + 1 step
             2. 1 step + 2 steps
             3. 2 steps + 1 step

Constraints: 1 <= n <= 45
=end

def climb_stairs(n)
    f0 = f1 = 1
    (1..n-1).each do
        f0, f1 = f1, f0+f1
    end
    return f1
end


=begin
83. Remove Duplicates from Sorted List (Easy)
Given the head of a sorted linked list, delete all duplicates such that each
element appears only once. Return the linked list sorted as well.

Example 1:
Input: head = [1,1,2]
Output: [1,2]

Example 2:
Input: head = [1,1,2,3,3]
Output: [1,2,3]

Constraints:
* The number of nodes in the list is in the range [0, 300].
* -100 <= Node.val <= 100
* The list is guaranteed to be sorted in ascending order.
=end

def delete_duplicates(head)
    node = head
    while node && node.next
        if node.val == node.next.val
            node.next = node.next.next
        else
            node = node.next
        end
    end
    return head
end


=begin
88. Merge Sorted Array (Easy)
You are given two integer arrays nums1 and nums2, sorted in non-decreasing
order, and two integers m and n, representing the number of elements in nums1
and nums2 respectively. Merge nums1 and nums2 into a single array sorted in
non-decreasing order. The final sorted array should not be returned by the
function, but instead be stored inside the array nums1. To accommodate this,
nums1 has a length of m + n, where the first m elements denote the elements that
should be merged, and the last n elements are set to 0 and should be ignored.
nums2 has a length of n.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of
             the merge is [1,2,2,3,5,6] with the underlined elements coming from
             nums1.

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and []. The result of the merge
             is [1].

Example 3:
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1]. The result of the merge
             is [1]. Note that because m = 0, there are no elements in nums1.
             The 0 is only there to ensure the merge result can fit in nums1.

Constraints:
* nums1.length == m + n
* nums2.length == n
* 0 <= m, n <= 200
* 1 <= m + n <= 200
* -10^9 <= nums1[i], nums2[j] <= 10^9

Follow up: Can you come up with an algorithm that runs in O(m + n) time?
=end

def merge(nums1, m, nums2, n)
    while n > 0
        if m == 0 || m > 0 && nums1[m-1] < nums2[n-1]
            nums1[m+n-1] = nums2[n-1]
            n -= 1
        else
            nums1[m+n-1] = nums1[m-1]
            m -= 1
        end
    end
end


=begin
94. Binary Tree Inorder Traversal (Easy)
Given the root of a binary tree, return the inorder traversal of its nodes'
values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]
Explanation:

Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,2,6,5,7,1,3,9,8]
Explanation:

Example 3:
Input: root = []
Output: []

Example 4:
Input: root = [1]
Output: [1]

Constraints:
* The number of nodes in the tree is in the range [0, 100].
* -100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?
=end

def inorder_traversal(root)
    ans = []
    node = root
    stack = []
    while node || stack.any?
        if node
            stack.push(node)
            node = node.left
        else
            node = stack.pop
            ans.push(node.val)
            node = node.right
        end
    end
    return ans
end


=begin
100. Same Tree (Easy)
Given the roots of two binary trees p and q, write a function to check if they
are the same or not. Two binary trees are considered the same if they are
structurally identical, and the nodes have the same value.

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
* -10^4 <= Node.val <= 10^4
=end

def is_same_tree(p, q)
    return true if p.nil? && q.nil?
    return p&.val == q&.val && is_same_tree(p.left, q.left) && is_same_tree(p.right, q.right) # safe navigation operator
end


=begin
101. Symmetric Tree (Easy)
Given the root of a binary tree, check whether it is a mirror of itself (i.e.,
symmetric around its center).

Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false

Constraints:
* The number of nodes in the tree is in the range [1, 1000].
* -100 <= Node.val <= 100

Follow up: Could you solve it both recursively and iteratively?
=end

def is_symmetric(root)
    check = lambda do |left, right|
        return true if left.nil? && right.nil?
        return left&.val == right&.val && check.call(left.left, right.right) && check.call(left.right, right.left)
    end
    return check.call(root, root)
end


=begin
104. Maximum Depth of Binary Tree (Easy)
Given the root of a binary tree, return its maximum depth. A binary tree's
maximum depth is the number of nodes along the longest path from the root node
down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

Constraints:
* The number of nodes in the tree is in the range [0, 10^4].
* -100 <= Node.val <= 100
=end

def max_depth(root)
    return 0 if root.nil?
    return 1 + [max_depth(root.left), max_depth(root.right)].max
end


=begin
108. Convert Sorted Array to Binary Search Tree (Easy)
Given an integer array nums where the elements are sorted in ascending order,
convert it to a height-balanced binary search tree.

Example 1:
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:

Example 2:
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

Constraints:
* 1 <= nums.length <= 10^4
* -10^4 <= nums[i] <= 10^4
* nums is sorted in a strictly increasing order.
=end

def sorted_array_to_bst(nums)
    check = lambda do |lo, hi|
        return nil if lo == hi
        mid = lo+hi >> 1
        return TreeNode.new(nums[mid], check.call(lo, mid), check.call(mid+1, hi))
    end

    return check.call(0, nums.size)
end


=begin
110. Balanced Binary Tree (Easy)
Given a binary tree, determine if it is height-balanced.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

Constraints:
* The number of nodes in the tree is in the range [0, 5000].
* -10^4 <= Node.val <= 10^4
=end

def is_balanced(root)
    check = lambda do |node|
        return 0 if node.nil?
        lh = check.call(node.left)
        rh = check.call(node.right)
        return lh == -1 || rh == -1 || (lh-rh).abs > 1 ? -1 : 1 + [lh, rh].max
    end
    return check.call(root) >= 0
end


=begin
111. Minimum Depth of Binary Tree (Easy)
Given a binary tree, find its minimum depth. The minimum depth is the number of
nodes along the shortest path from the root node down to the nearest leaf node.
Note: A leaf is a node with no children.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 2

Example 2:
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5

Constraints:
* The number of nodes in the tree is in the range [0, 10^5].
* -1000 <= Node.val <= 1000
=end

def min_depth(root)
    return 0 if root.nil?
    queue = [[root, 1]]
    while queue.any?
        node, v = queue.shift
        return v if node.left.nil? && node.right.nil?
        queue.push([node.left, v+1]) if node.left
        queue.push([node.right, v+1]) if node.right
    end
end


=begin
112. Path Sum (Easy)
Given the root of a binary tree and an integer targetSum, return true if the
tree has a root-to-leaf path such that adding up all the values along the path
equals targetSum. A leaf is a node with no children.

Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.

Example 2:
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
             (1 --> 2): The sum is 3.
             (1 --> 3): The sum is 4.
             There is no root-to-leaf path with sum = 5.

Example 3:
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.

Constraints:
* The number of nodes in the tree is in the range [0, 5000].
* -1000 <= Node.val <= 1000
* -1000 <= targetSum <= 1000
=end

def has_path_sum(root, target_sum)
    if root
        stack = [[root, 0]]
        while stack.any?
            node, v = stack.pop
            v += node.val
            return true if node.left.nil? && node.right.nil? && v == target_sum
            stack.append([node.left, v]) if node.left
            stack.append([node.right, v]) if node.right
        end
    end
    return false
end


=begin
118. Pascal's Triangle (Easy)
Given an integer numRows, return the first numRows of Pascal's triangle. In
Pascal's triangle, each number is the sum of the two numbers directly above it
as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]

Constraints: 1 <= numRows <= 30
=end

def generate(num_rows)
    ans = [[1]]
    (2..num_rows).each do |i|
        row = Array.new(i, 1)
        (1..i-2).each do |j|
            row[j] = ans[-1][j-1] + ans[-1][j]
        end
        ans.push(row)
    end
    return ans
end


=begin
119. Pascal's Triangle II (Easy)
Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's
triangle. In Pascal's triangle, each number is the sum of the two numbers
directly above it as shown:

Example 1:
Input: rowIndex = 3
Output: [1,3,3,1]

Example 2:
Input: rowIndex = 0
Output: [1]

Example 3:
Input: rowIndex = 1
Output: [1,1]

Constraints: 0 <= rowIndex <= 33

Follow up: Could you optimize your algorithm to use only O(rowIndex) extra space?
=end

def get_row(row_index)
    ans = Array.new(row_index+1, 1)
    (1..row_index-1).each do |j|
        ans[j] = ans[j-1]*(row_index-j+1)/j
    end
    return ans
end


=begin
121. Best Time to Buy and Sell Stock (Easy)
You are given an array prices where prices[i] is the price of a given stock on
the ith day. You want to maximize your profit by choosing a single day to buy
one stock and choosing a different day in the future to sell that stock. Return
the maximum profit you can achieve from this transaction. If you cannot achieve
any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit =
             6-1 = 5. Note that buying on day 2 and selling on day 1 is not
             allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
* 1 <= prices.length <= 10^5
* 0 <= prices[i] <= 10^4
=end

def max_profit(prices)
    ans = 0
    pref = Float::INFINITY
    prices.each do |x|
        ans = [ans, x - pref].max
        pref = [pref, x].min
    end
    return ans
end

=begin
125. Valid Palindrome (Easy)
A phrase is a palindrome if, after converting all uppercase letters into 
lowercase letters and removing all non-alphanumeric characters, it reads the 
same forward and backward. Alphanumeric characters include letters and numbers.
Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
             Since an empty string reads the same forward and backward, it is a 
             palindrome.

Constraints:
* 1 <= s.length <= 2 * 105
* s consists only of printable ASCII characters.
=end

def is_palindrome(s)
    s = s.downcase.delete("^a-z0-9")
    return s == s.reverse
end


=begin
136. Single Number (Easy)
Given a non-empty array of integers nums, every element appears twice except for 
one. Find that single one. You must implement a solution with a linear runtime 
complexity and use only constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

Constraints:
* 1 <= nums.length <= 3 * 10^4
* -3 * 104 <= nums[i] <= 3 * 10^4
* Each element in the array appears twice except for one element which appears 
  only once.
=end

def single_number(nums)
    return nums.reduce(0) {|s, x| s ^ x}
end


=begin
141. Linked List Cycle (Easy)
Given head, the head of a linked list, determine if the linked list has a cycle 
in it. There is a cycle in a linked list if there is some node in the list that 
can be reached again by continuously following the next pointer. Internally, pos 
is used to denote the index of the node that tail's next pointer is connected to. 
Note that pos is not passed as a parameter. Return true if there is a cycle in 
the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 
             1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 
             0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
* The number of the nodes in the list is in the range [0, 10^4].
* -10^5 <= Node.val <= 10^5
* pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?
=end

def hasCycle(head)
    fast = slow = head 
    while fast && fast.next 
        fast = fast.next.next
        slow = slow.next
        return true if fast == slow 
    end 
    return false 
end
