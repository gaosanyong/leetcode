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
    while node&.next
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


=begin
144. Binary Tree Preorder Traversal (Easy)
Given the root of a binary tree, return the preorder traversal of its nodes'
values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]
Explanation:

Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [1,2,4,5,6,7,3,8,9]
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

def preorder_traversal(root)
    ans = []
    if root
        stack = [root]
        while stack.any?
            node = stack.pop
            ans.push(node.val)
            stack.push(node.right) if node.right
            stack.push(node.left) if node.left
        end
    end
    return ans
end


=begin
145. Binary Tree Postorder Traversal (Easy)
Given the root of a binary tree, return the postorder traversal of its nodes'
values.

Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]
Explanation:

Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,6,7,5,2,9,8,3,1]
Explanation:

Example 3:
Input: root = []
Output: []

Example 4:
Input: root = [1]
Output: [1]

Constraints:
* The number of the nodes in the tree is in the range [0, 100].
* -100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?
=end

def postorder_traversal(root)
    ans = []
    node,stack = root, []
    while node || stack.any?
        if node
            stack.append(node.right) if node.right
            stack.push(node)
            node = node.left
        else
            node = stack.pop
            if stack.any? && stack[-1] == node.right
                stack.pop
                stack.push(node)
                node = node.right
            else
                ans.push(node.val)
                node = nil
            end
        end
    end
    return ans
end


=begin
160. Intersection of Two Linked Lists (Easy)
Given the heads of two singly linked-lists headA and headB, return the node at
which the two lists intersect. If the two linked lists have no intersection at
all, return null. For example, the following two linked lists begin to intersect
at node c1. The test cases are generated such that there are no cycles anywhere
in the entire linked structure. Note that the linked lists must retain their
original structure after the function returns.

Custom Judge:
The inputs to the judge are given as follows (your program is not given these inputs):
* intersectVal - The value of the node where the intersection occurs. This is 0
  if there is no intersected node.
* listA - The first linked list.
* listB - The second linked list.
* skipA - The number of nodes to skip ahead in listA (starting from the head) to
  get to the intersected node.
* skipB - The number of nodes to skip ahead in listB (starting from the head) to
  get to the intersected node.
The judge will then create the linked structure based on these inputs and pass
the two heads, headA and headB to your program. If you correctly return the
intersected node, then your solution will be accepted.

Example 1:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if
             the two lists intersect). From the head of A, it reads as
             [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There
             are 2 nodes before the intersected node in A; There are 3 nodes
             before the intersected node in B.
             - Note that the intersected node's value is not 1 because the nodes
               with value 1 in A and B (2nd node in A and 3rd node in B) are
               different node references. In other words, they point to two
               different locations in memory, while the nodes with value 8 in A
               and B (3rd node in A and 4th node in B) point to the same
               location in memory.

Example 2:
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2 (note that this must not be 0 if
             the two lists intersect). From the head of A, it reads as
             [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3
             nodes before the intersected node in A; There are 1 node before the
             intersected node in B.

Example 3:
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it
             reads as [1,5]. Since the two lists do not intersect, intersectVal
             must be 0, while skipA and skipB can be arbitrary values. The two
             lists do not intersect, so return null.

Constraints:
* The number of nodes of listA is in the m.
* The number of nodes of listB is in the n.
* 1 <= m, n <= 3 * 104
* 1 <= Node.val <= 105
* 0 <= skipA <= m
* 0 <= skipB <= n
* intersectVal is 0 if listA and listB do not intersect.
* intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.

Follow up: Could you write a solution that runs in O(m + n) time and use only
           O(1) memory?
=end

def getIntersectionNode(headA, headB)
    nodeA, nodeB = headA, headB
    while nodeA != nodeB
        nodeA = nodeA ? nodeA.next : headB
        nodeB = nodeB ? nodeB.next : headA
    end
    return nodeA
end


=begin
168. Excel Sheet Column Title (Easy)
Given an integer columnNumber, return its corresponding column title as it
appears in an Excel sheet.

For example: A -> 1
             B -> 2
             C -> 3
             ...
             Z -> 26
             AA -> 27
             AB -> 28
             ...

Example 1:
Input: columnNumber = 1
Output: "A"

Example 2:
Input: columnNumber = 28
Output: "AB"

Example 3:
Input: columnNumber = 701
Output: "ZY"

Constraints: 1 <= columnNumber <= 2^31 - 1
=end

def convert_to_title(column_number)
	ans = []
    letters = ('A'..'Z').to_a
    while column_number > 0 do
    	column_number, i = (column_number-1).divmod(26)
    	ans.push(letters[i])
    end
    return ans.join.reverse
end


=begin
169. Majority Element (Easy)
Given an array nums of size n, return the majority element. The majority element
is the element that appears more than ⌊n / 2⌋ times. You may assume that the
majority element always exists in the array.

Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:
* n == nums.length
* 1 <= n <= 5 * 10^4
* -10^9 <= nums[i] <= 10^9

Follow-up: Could you solve the problem in linear time and in O(1) space?
=end

def majority_element(nums)
    ans = cnt = 0
    nums.each do |x|
        if ans == x || cnt == 0
            ans = x
            cnt += 1
        else
            cnt -= 1
        end
    end
    return ans
end


=begin
171. Excel Sheet Column Number (Easy)
Given a string columnTitle that represents the column title as appears in an
Excel sheet, return its corresponding column number. For example:
    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28
    ...

Example 1:
Input: columnTitle = "A"
Output: 1

Example 2:
Input: columnTitle = "AB"
Output: 28

Example 3:
Input: columnTitle = "ZY"
Output: 701

Constraints:
* 1 <= columnTitle.length <= 7
* columnTitle consists only of uppercase English letters.
* columnTitle is in the range ["A", "FXSHRXW"].
=end

def title_to_number(column_title)
    ans = 0
    column_title.each_char do |ch|
        ans = 26*ans + ch.ord - 64
    end
    return ans
end


=begin
190. Reverse Bits (Easy)
Reverse bits of a given 32 bits unsigned integer.

Note:
* Note that in some languages, such as Java, there is no unsigned integer type.
  In this case, both input and output will be given as a signed integer type.
  They should not affect your implementation, as the integer's internal binary
  representation is the same, whether it is signed or unsigned.
* In Java, the compiler represents the signed integers using 2's complement
  notation.

Example 1:
Input: n = 43261596
Output: 964176192
Explanation: Integer	Binary
             43261596	00000010100101000001111010011100
             964176192	00111001011110000010100101000000

Example 2:
Input: n = 2147483644
Output: 1073741822
Explanation: Integer	Binary
             2147483644	01111111111111111111111111111100
             1073741822	00111111111111111111111111111110

Constraints:
* 0 <= n <= 231 - 2
* n is even.

Follow up: If this function is called many times, how would you optimize it?
=end

def reverse_bits(n)
    32.times.reduce(0) { (_1 << 1) | (n & 1).tap { n >>= 1 } }
end


=begin
191. Number of 1 Bits (Easy)
Given a positive integer n, write a function that returns the number of set bits
in its binary representation (also known as the Hamming weight).

Example 1:
Input: n = 11
Output: 3
Explanation: The input binary string 1011 has a total of three set bits.

Example 2:
Input: n = 128
Output: 1
Explanation: The input binary string 10000000 has a total of one set bit.

Example 3:
Input: n = 2147483645
Output: 30
Explanation: The input binary string 1111111111111111111111111111101 has a total
             of thirty set bits.

Constraints: 1 <= n <= 2^31 - 1

Follow up: If this function is called many times, how would you optimize it?
=end

def hamming_weight(n)
    ans = 0
    while n > 0
        ans += 1
        n &= n-1
    end
    return ans
end


=begin
202. Happy Number (Easy)
Write an algorithm to determine if a number n is happy. A happy number is a
number defined by the following process:
* Starting with any positive integer, replace the number by the sum of the
  squares of its digits.
* Repeat the process until the number equals 1 (where it will stay), or it loops
  endlessly in a cycle which does not include 1.
* Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Example 1:
Input: n = 19
Output: true
Explanation: 12 + 92 = 82
             82 + 22 = 68
             62 + 82 = 100
             12 + 02 + 02 = 1

Example 2:
Input: n = 2
Output: false

Constraints: 1 <= n <= 2^31 - 1
=end

def is_happy(n)
    calc = lambda do |n|
        return n.digits.sum {|d| d*d}
    end
    fast = slow = n
    while true
        fast = calc.call(calc.call(fast))
        slow = calc.call(slow)
        return fast == 1 if fast == slow
    end
end


=begin
203. Remove Linked List Elements (Easy)
Given the head of a linked list and an integer val, remove all the nodes of the
linked list that has Node.val == val, and return the new head.

Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Example 3:
Input: head = [7,7,7,7], val = 7
Output: []

Constraints:
* The number of nodes in the list is in the range [0, 10^4].
* 1 <= Node.val <= 50
* 0 <= val <= 50
=end

def remove_elements(head, val)
    dummy = node = ListNode.new(0, head)
    while node.next
        if node.next.val == val
            node.next = node.next.next
        else
            node = node.next
        end
    end
    return dummy.next
end


=begin
205. Isomorphic Strings (Easy)
Given two strings s and t, determine if they are isomorphic. Two strings s and
t are isomorphic if the characters in s can be replaced to get t. All
occurrences of a character must be replaced with another character while
preserving the order of characters. No two characters may map to the same
character, but a character may map to itself.

Example 1:
Input: s = "egg", t = "add"
Output: true
Explanation: The strings s and t can be made identical by:
             Mapping 'e' to 'a'.
             Mapping 'g' to 'd'.

Example 2:
Input: s = "foo", t = "bar"
Output: false
Explanation: The strings s and t can not be made identical as 'o' needs to be
             mapped to both 'a' and 'r'.

Example 3:
Input: s = "paper", t = "title"
Output: true

Constraints:
* 1 <= s.length <= 5 * 104
* t.length == s.length
* s and t consist of any valid ascii character.
=end

def is_isomorphic(s, t)
    ss, tt = {}, {}
    s.chars.zip(t.chars).each_with_index do |(x, y), i|
        return false if ss[x] != tt[y]
        ss[x] = tt[y] = i
    end
    return true
end


=begin
206. Reverse Linked List (Easy)
Given the head of a singly linked list, reverse the list, and return the
reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
* The number of nodes in the list is the range [0, 5000].
* -5000 <= Node.val <= 5000

Follow up: A linked list can be reversed either iteratively or recursively.
           Could you implement both?
=end

def reverse_list(head)
    prev, curr = nil, head
    while curr
        curr.next, curr, prev = prev, curr.next, curr
    end
    return prev
end


=begin
217. Contains Duplicate (Easy)
Given an integer array nums, return true if any value appears at least twice in
the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.

Example 2:
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
* 1 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9
=end

def contains_duplicate(nums)
    return !!nums.uniq!
end


=begin
219. Contains Duplicate II (Easy)
Given an integer array nums and an integer k, return true if there are two
distinct indices i and j in the array such that nums[i] == nums[j] and
abs(i - j) <= k.

Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

Constraints:
* 1 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9
* 0 <= k <= 10^5
=end

def contains_nearby_duplicate(nums, k)
    loc = {}
    nums.each_with_index do |x, i|
        return true if loc.key?(x) && i-loc[x] <= k
        loc[x] = i
    end
    return false
end


=begin
222. Count Complete Tree Nodes (Easy)
Given the root of a complete binary tree, return the number of the nodes in the
tree. According to Wikipedia, every level, except possibly the last, is
completely filled in a complete binary tree, and all nodes in the last level
are as far left as possible. It can have between 1 and 2h nodes inclusive at
the last level h. Design an algorithm that runs in less than O(n) time
complexity.

Example 1:
Input: root = [1,2,3,4,5,6]
Output: 6

Example 2:
Input: root = []
Output: 0

Example 3:
Input: root = [1]
Output: 1

Constraints:
* The number of nodes in the tree is in the range [0, 5 * 10^4].
* 0 <= Node.val <= 5 * 10^4
* The tree is guaranteed to be complete.
=end

def height(node)
    ans = 0
    while node
        node = node.left
        ans += 1
    end
    return ans
end

def count_nodes(root)
    ans = 0
    if root
        hl, hr = height(root.left), height(root.right)
        if hl == hr
            ans += 2**hl + count_nodes(root.right)
        else
            ans += count_nodes(root.left) + 2**hr
        end
    end
    return ans
end


=begin
225. Implement Stack using Queues (Easy)
Implement a last-in-first-out (LIFO) stack using only two queues. The
implemented stack should support all the functions of a normal stack (push,
top, pop, and empty). Implement the MyStack class:
* void push(int x) Pushes element x to the top of the stack.
* int pop() Removes the element on the top of the stack and returns it.
* int top() Returns the element on the top of the stack.
* boolean empty() Returns true if the stack is empty, false otherwise.
Notes:
* You must use only standard operations of a queue, which means that only push
  to back, peek/pop from front, size and is empty operations are valid.
* Depending on your language, the queue may not be supported natively. You may
  simulate a queue using a list or deque (double-ended queue) as long as you use
  only a queue's standard operations.

Example 1:
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False

Constraints:
* 1 <= x <= 9
* At most 100 calls will be made to push, pop, top, and empty.
* All the calls to pop and top are valid.

Follow-up: Can you implement the stack using only one queue?
=end

class MyStack
    def initialize()
        @queue = []
    end

    def push(x)
        @queue.push(x)
        (@queue.size-1).times do |x|
            @queue.push(@queue.shift)
        end
    end

    def pop()
        @queue.shift
    end

    def top()
        return @queue.first
    end

    def empty()
        return @queue.empty?
    end
end


=begin
226. Invert Binary Tree (Easy)
Given the root of a binary tree, invert the tree, and return its root.

Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2:
Input: root = [2,1,3]
Output: [2,3,1]

Example 3:
Input: root = []
Output: []

Constraints:
* The number of nodes in the tree is in the range [0, 100].
* -100 <= Node.val <= 100
=end


def invert_tree(root)
    if root
        root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    end
    return root
end


=begin
228. Summary Ranges (Easy)
You are given a sorted unique integer array nums. A range [a,b] is the set of
all integers from a to b (inclusive). Return the smallest sorted list of ranges
that cover all the numbers in the array exactly. That is, each element of nums
is covered by exactly one of the ranges, and there is no integer x such that x
is in one of the ranges but not in nums. Each range [a,b] in the list should be
output as:
* "a->b" if a != b
* "a" if a == b

Example 1:
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
             [0,2] --> "0->2"
             [4,5] --> "4->5"
             [7,7] --> "7"

Example 2:
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
             [0,0] --> "0"
             [2,4] --> "2->4"
             [6,6] --> "6"
             [8,9] --> "8->9"

Constraints:
* 0 <= nums.length <= 20
* -2^31 <= nums[i] <= 2^31 - 1
* All the values of nums are unique.
* nums is sorted in ascending order.
=end

def summary_ranges(nums)
    ans = []
    lo = nil
    nums.each_with_index do |x, i|
        lo = x if i == 0 || nums[i-1]+1 < x
        if i+1 == nums.size || x+1 < nums[i+1]
            if lo < x
                ans.push("#{lo}->#{x}")
            else
                ans.push("#{x}")
            end
        end
    end
    return ans
end


=begin
231. Power of Two (Easy)
Given an integer n, return true if it is a power of two. Otherwise, return
false. An integer n is a power of two, if there exists an integer x such that
n == 2x.

Example 1:
Input: n = 1
Output: true
Explanation: 20 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 24 = 16

Example 3:
Input: n = 3
Output: false

Constraints: -2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?
=end

def is_power_of_two(n)
    return n > 0 && n&(n-1) == 0
end


=begin
232. Implement Queue using Stacks (Easy)
Implement a first in first out (FIFO) queue using only two stacks. The
implemented queue should support all the functions of a normal queue (push,
peek, pop, and empty). Implement the MyQueue class:
* void push(int x) Pushes element x to the back of the queue.
* int pop() Removes the element from the front of the queue and returns it.
* int peek() Returns the element at the front of the queue.
* boolean empty() Returns true if the queue is empty, false otherwise.
Notes:
* You must use only standard operations of a stack, which means only push to
  top, peek/pop from top, size, and is empty operations are valid.
* Depending on your language, the stack may not be supported natively. You may
  simulate a stack using a list or deque (double-ended queue) as long as you use
  only a stack's standard operations.

Example 1:
Input: ["MyQueue", "push", "push", "peek", "pop", "empty"]
       [[], [1], [2], [], [], []]
Output: [null, null, null, 1, 1, false]
Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

Constraints:
* 1 <= x <= 9
* At most 100 calls will be made to push, pop, peek, and empty.
* All the calls to pop and peek are valid.

Follow-up: Can you implement the queue such that each operation is amortized
           O(1) time complexity? In other words, performing n operations will
           take overall O(n) time even if one of those operations may take
           longer.
=end

class MyQueue
    def initialize()
        @in_ = []
        @out = []
    end

    def push(x)
        @in_ << x
    end

    def pop()
        peek
        return @out.pop
    end

    def peek()
        @out << @in_.pop until @in_.empty? if @out.empty?
        return @out.last
    end

    def empty()
        return @in_.empty? && @out.empty?
    end

end


=begin
234. Palindrome Linked List (Easy)
Given the head of a singly linked list, return true if it is a palindrome or
false otherwise.

Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Constraints:
* The number of nodes in the list is in the range [1, 105].
* 0 <= Node.val <= 9

Follow up: Could you do it in O(n) time and O(1) space?
=end

def is_palindrome(head)
    fast = slow = head
    while fast && fast.next
        fast = fast.next.next
        slow = slow.next
    end
    prev = nil
    while slow
        slow.next, slow, prev = prev, slow.next, slow
    end
    while prev && head.val == prev.val
        head = head.next
        prev = prev.next
    end
    return !prev
end


=begin
242. Valid Anagram (Easy)
Given two strings s and t, return true if t is an anagram of s, and false
otherwise.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
* 1 <= s.length, t.length <= 5 * 104
* s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt
           your solution to such a case?
=end

def is_anagram(s, t)
    freq = s.chars.inject(Hash.new(0)) { |f, ch| f[ch] += 1; f }
    freq = t.chars.inject(freq) { |f, ch| f[ch] -= 1; f }
    freq.values.all?(&:zero?)
end


=begin
257. Binary Tree Paths (Easy)
Given the root of a binary tree, return all root-to-leaf paths in any order. A
leaf is a node with no children.

Example 1:
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]

Example 2:
Input: root = [1]
Output: ["1"]

Constraints:
* The number of nodes in the tree is in the range [1, 100].
* -100 <= Node.val <= 100
=end

def binary_tree_paths(root)
    ans, path = [], []
    fn = lambda do |node|
        path << node.val
        ans.push << path.map(&:to_s).join("->") if !node.left && !node.right
        fn.call(node.left) if node.left
        fn.call(node.right) if node.right
        path.pop
    end
    fn.call(root)
    return ans
end


=begin
258. Add Digits (Easy)
Given an integer num, repeatedly add all its digits until the result has only
one digit, and return it.

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

Follow up: Could you do it without any loop/recursion in O(1) runtime?
=end

def add_digits(num)
    return num == 0 ? 0 : (num-1)%9 + 1
end


=begin
263. Ugly Number (Easy)
An ugly number is a positive integer which does not have a prime factor other
than 2, 3, and 5. Given an integer n, return true if n is an ugly number.

Example 1:
Input: n = 6
Output: true
Explanation: 6 = 2 × 3

Example 2:
Input: n = 1
Output: true
Explanation: 1 has no prime factors.

Example 3:
Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.

Constraints: -2^31 <= n <= 2^31 - 1
=end

def is_ugly(n)
    return false if n <= 0
    [2,3,5].each do |p|
        n /= p while n % p == 0
    end
    return n == 1
end


=begin
268. Missing Number (Easy)
Given an array nums containing n distinct numbers in the range [0, n], return
the only number in the range that is missing from the array.

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range
             [0,3]. 2 is the missing number in the range since it does not
             appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range
             [0,2]. 2 is the missing number in the range since it does not
             appear in nums.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range
             [0,9]. 8 is the missing number in the range since it does not
             appear in nums.

Constraints:
* n == nums.length
* 1 <= n <= 10^4
* 0 <= nums[i] <= n
* All the numbers of nums are unique.

Follow up: Could you implement a solution using only O(1) extra space
           complexity and O(n) runtime complexity?
=end

def missing_number(nums)
    return (0..nums.size).inject(&:^) ^ nums.inject(&:^)
end


=begin
278. First Bad Version (Easy)
You are a product manager and currently leading a team to develop a new
product. Unfortunately, the latest version of your product fails the quality
check. Since each version is developed based on the previous version, all the
versions after a bad version are also bad. Suppose you have n versions [1, 2,
..., n] and you want to find out the first bad one, which causes all the
following ones to be bad. You are given an API bool isBadVersion(version) which
returns whether version is bad. Implement a function to find the first bad
version. You should minimize the number of calls to the API.

Example 1:
Input: n = 5, bad = 4
Output: 4
Explanation: call isBadVersion(3) -> false
             call isBadVersion(5) -> true
             call isBadVersion(4) -> true
             Then 4 is the first bad version.

Example 2:
Input: n = 1, bad = 1
Output: 1

Constraints: 1 <= bad <= n <= 2^31 - 1
=end

def first_bad_version(n)
    (1..n).bsearch {is_bad_version _1}
end


=begin
283. Move Zeroes (Easy)
Given an integer array nums, move all 0's to the end of it while maintaining
the relative order of the non-zero elements. Note that you must do this
in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
* 1 <= nums.length <= 10^4
* -2^31 <= nums[i] <= 2^31 - 1

Follow up: Could you minimize the total number of operations done?
=end

def move_zeroes(nums)
    k = 0
    nums.each_with_index do |x, i|
        if x != 0
            nums[k], nums[i] = nums[i], nums[k]
            k += 1
        end
    end
end


=begin
292. Nim Game (Easy)
You are playing the following Nim Game with your friend:
* Initially, there is a heap of stones on the table.
* You and your friend will alternate taking turns, and you go first.
* On each turn, the person whose turn it is will remove 1 to 3 stones from the
  heap.
* The one who removes the last stone is the winner.
Given n, the number of stones in the heap, return true if you can win the game
assuming both you and your friend play optimally, otherwise return false.

Example 1:
Input: n = 4
Output: false
Explanation: These are the possible outcomes:
             1. You remove 1 stone. Your friend removes 3 stones, including the
                last stone. Your friend wins.
             2. You remove 2 stones. Your friend removes 2 stones, including
                the last stone. Your friend wins.
             3. You remove 3 stones. Your friend removes the last stone. Your
                friend wins.
             In all outcomes, your friend wins.

Example 2:
Input: n = 1
Output: true

Example 3:
Input: n = 2
Output: true

Constraints: 1 <= n <= 2^31 - 1
=end

def can_win_nim(n)
    return n % 4 != 0
end


=begin
303. Range Sum Query - Immutable (Easy)
Given an integer array nums, handle multiple queries of the following type:
* Calculate the sum of the elements of nums between indices left and right
  inclusive where left <= right.
Implement the NumArray class:
* NumArray(int[] nums) Initializes the object with the integer array nums.
* int sumRange(int left, int right) Returns the sum of the elements of nums
  between indices left and right inclusive (i.e. nums[left] + nums[left + 1] +
  ... + nums[right]).

Example 1:
Input: ["NumArray", "sumRange", "sumRange", "sumRange"]
       [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output: [null, 1, -1, -3]
Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

Constraints:
* 1 <= nums.length <= 10^4
* -10^5 <= nums[i] <= 10^5
* 0 <= left <= right < nums.length
* At most 10^4 calls will be made to sumRange.
=end

class NumArray
    def initialize(nums)
        @prefix = [s=0] + nums.map{|x| s += x}
    end

    def sum_range(left, right)
        return @prefix[right+1] - @prefix[left]
    end
end


=begin
326. Power of Three (Easy)
Given an integer n, return true if it is a power of three. Otherwise, return
false. An integer n is a power of three, if there exists an integer x such that
n == 3x.

Example 1:
Input: n = 27
Output: true
Explanation: 27 = 33

Example 2:
Input: n = 0
Output: false
Explanation: There is no x where 3x = 0.

Example 3:
Input: n = -1
Output: false
Explanation: There is no x where 3x = (-1).

Constraints: -2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?
=end

def is_power_of_three(n)
    return false if n <= 0
    p = (Math.log(n)/Math.log(3)).round
    return 3**p == n
end


=begin
338. Counting Bits (Easy)
Given an integer n, return an array ans of length n + 1 such that for each i (0
<= i <= n), ans[i] is the number of 1's in the binary representation of i.

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

Follow up:
* It is very easy to come up with a solution with a runtime of O(n log n). Can
  you do it in linear time O(n) and possibly in a single pass?
* Can you do it without using any built-in function (i.e., like
  __builtin_popcount in C++)?
=end

def count_bits(n)
    ans = (0..n).to_a
    return ans.map! {|x| x%2 + ans[x>>1]}
end


=begin
342. Power of Four (Easy)
Given an integer n, return true if it is a power of four. Otherwise, return
false. An integer n is a power of four, if there exists an integer x such that
n == 4x.

Example 1:
Input: n = 16
Output: true

Example 2:
Input: n = 5
Output: false

Example 3:
Input: n = 1
Output: true

Constraints: -2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?
=end

def is_power_of_four(n)
    return n > 0 && n&(n-1) == 0 && n.bit_length%2 == 1
end


=begin
344. Reverse String (Easy)
Write a function that reverses a string. The input string is given as an array
of characters s. You must do this by modifying the input array in-place with
O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:
* 1 <= s.length <= 10^5
* s[i] is a printable ascii character.
=end

def reverse_string(s)
    s.reverse!
end


=begin
345. Reverse Vowels of a String (Easy)
Given a string s, reverse only all the vowels in the string and return it. The
vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and
upper cases, more than once.

Example 1:
Input: s = "IceCreAm"
Output: "AceCreIm"
Explanation: The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels,
             s becomes "AceCreIm".

Example 2:
Input: s = "leetcode"
Output: "leotcede"

Constraints:
* 1 <= s.length <= 3 * 10^5
* s consist of printable ASCII characters.
=end

def reverse_vowels(s)
    vowels = s.scan(/[aeiou]/i)
    s.gsub(/[aeiou]/i) { vowels.pop }
end


=begin
349. Intersection of Two Arrays (Easy)
Given two integer arrays nums1 and nums2, return an array of their
intersection. Each element in the result must be unique and you may return the
result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.

Constraints:
* 1 <= nums1.length, nums2.length <= 1000
* 0 <= nums1[i], nums2[i] <= 1000
=end

def intersection(nums1, nums2)
    return nums1 & nums2
end


=begin
350. Intersection of Two Arrays II (Easy)
Given two integer arrays nums1 and nums2, return an array of their
intersection. Each element in the result must appear as many times as it shows
in both arrays and you may return the result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.

Constraints:
* 1 <= nums1.length, nums2.length <= 1000
* 0 <= nums1[i], nums2[i] <= 1000

Follow up:
* What if the given array is already sorted? How would you optimize your
  algorithm?
* What if nums1's size is small compared to nums2's size? Which algorithm is
  better?
* What if elements of nums2 are stored on disk, and the memory is limited such
  that you cannot load all elements into the memory at once?
=end

def intersect(nums1, nums2)
    freq = nums1.tally
    ans = []
    nums2.each do |x|
        if freq.fetch(x, 0) > 0
            ans << x
            freq[x] -= 1
        end
    end
    return ans
end


=begin
367. Valid Perfect Square (Easy)
Given a positive integer num, return true if num is a perfect square or false
otherwise. A perfect square is an integer that is the square of an integer. In
other words, it is the product of some integer with itself. You must not use
any built-in library function, such as sqrt.

Example 1:
Input: num = 16
Output: true
Explanation: We return true because 4 * 4 = 16 and 4 is an integer.

Example 2:
Input: num = 14
Output: false
Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an
             integer.

Constraints: 1 <= num <= 2^31 - 1
=end

def is_perfect_square(num)
    x = Math.sqrt(num).to_i
    return x*x == num
end


=begin
374. Guess Number Higher or Lower (Easy)
We are playing the Guess Game. The game is as follows: I pick a number from 1
to n. You have to guess which number I picked. Every time you guess wrong, I
will tell you whether the number I picked is higher or lower than your guess.
You call a pre-defined API int guess(int num), which returns three possible
results:
* -1: Your guess is higher than the number I picked (i.e. num > pick).
* 1: Your guess is lower than the number I picked (i.e. num < pick).
* 0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.

Example 1:
Input: n = 10, pick = 6
Output: 6

Example 2:
Input: n = 1, pick = 1
Output: 1

Example 3:
Input: n = 2, pick = 1
Output: 1

Constraints:
* 1 <= n <= 2^31 - 1
* 1 <= pick <= n
=end

def guessNumber(n)
    (1..n).bsearch {guess _1}
end


=begin
383. Ransom Note (Easy)
Given two strings ransomNote and magazine, return true if ransomNote can be
constructed by using the letters from magazine and false otherwise. Each letter
in magazine can only be used once in ransomNote.

Example 1:
Input: ransomNote = "a", magazine = "b"
Output: false

Example 2:
Input: ransomNote = "aa", magazine = "ab"
Output: false

Example 3:
Input: ransomNote = "aa", magazine = "aab"
Output: true

Constraints:
* 1 <= ransomNote.length, magazine.length <= 10^5
* ransomNote and magazine consist of lowercase English letters.
=end

def can_construct(ransom_note, magazine)
    freq = magazine.chars.tally
    ransom_note.chars.each do |ch|
        return false if freq.fetch(ch, 0) == 0
        freq[ch] -= 1
    end
    return true
end


=begin
387. First Unique Character in a String (Easy)
Given a string s, find the first non-repeating character in it and return its
index. If it does not exist, return -1.

Example 1:
Input: s = "leetcode"
Output: 0
Explanation: The character 'l' at index 0 is the first character that does not
             occur at any other index.

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

Constraints:
* 1 <= s.length <= 10^5
* s consists of only lowercase English letters.
=end

def first_uniq_char(s)
    freq = s.chars.tally
    s.chars.each_with_index do |ch, i|
        return i if freq[ch] == 1
    end
    return -1
end


=begin
389. Find the Difference (Easy)
You are given two strings s and t. String t is generated by random shuffling
string s and then add one more letter at a random position. Return the letter
that was added to t.

Example 1:
Input: s = "abcd", t = "abcde"
Output: "e"
Explanation: 'e' is the letter that was added.

Example 2:
Input: s = "", t = "y"
Output: "y"

Constraints:
* 0 <= s.length <= 1000
* t.length == s.length + 1
* s and t consist of lowercase English letters.
=end

def find_the_difference(s, t)
    freq = s.chars.tally
    t.each_char do |ch|
        return ch if freq.fetch(ch, 0) == 0
        freq[ch] -= 1
    end
end


=begin
392. Is Subsequence (Easy)
Given two strings s and t, return true if s is a subsequence of t, or false
otherwise. A subsequence of a string is a new string that is formed from the
original string by deleting some (can be none) of the characters without
disturbing the relative positions of the remaining characters. (i.e., "ace" is
a subsequence of "abcde" while "aec" is not).

Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false

Constraints:
* 0 <= s.length <= 100
* 0 <= t.length <= 10^4
* s and t consist only of lowercase English letters.

Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where
           k >= 10^9, and you want to check one by one to see if t has its
           subsequence. In this scenario, how would you change your code?
=end

def is_subsequence(s, t)
    i = 0
    t.each_char do |ch|
        i += 1 if s[i] == ch
    end
    return i == s.size
end


=begin
404. Sum of Left Leaves (Easy)
Given the root of a binary tree, return the sum of all left leaves. A leaf is a
node with no children. A left leaf is a leaf that is the left child of another
node.

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15
             respectively.

Example 2:
Input: root = [1]
Output: 0

Constraints:
* The number of nodes in the tree is in the range [1, 1000].
* -1000 <= Node.val <= 1000
=end

def sum_of_left_leaves(root)
    ans = 0
    stack = [[root, 0]]
    while stack.any?
        node, d = stack.pop
        ans += node.val if !node.left && !node.right && d == -1
        stack.append([node.left, -1]) if node.left
        stack.append([node.right, 1]) if node.right
    end
    return ans
end


=begin
409. Longest Palindrome (Easy)
Given a string s which consists of lowercase or uppercase letters, return the
length of the longest palindrome that can be built with those letters. Letters
are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose
             length is 7.

Example 2:
Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is
             1.

Constraints:
* 1 <= s.length <= 2000
* s consists of lowercase and/or uppercase English letters only.
=end

def longest_palindrome(s)
    s.chars.tally.reduce(0) do |memo, (_, v)|
        memo + (v & ~1) | v & 1
    end
end


=begin
412. Fizz Buzz (Easy)
Given an integer n, return a string array answer (1-indexed) where:
* answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
* answer[i] == "Fizz" if i is divisible by 3.
* answer[i] == "Buzz" if i is divisible by 5.
* answer[i] == i (as a string) if none of the above conditions are true.

Example 1:
Input: n = 3
Output: ["1","2","Fizz"]

Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

Constraints: 1 <= n <= 10^4
=end

def fizz_buzz(n)
    return (1..n).map do |x|
        next "FizzBuzz" if (x % 15).zero?
        next "Fizz" if (x % 3).zero?
        next "Buzz" if (x % 5).zero?
        x.to_s
    end
end


=begin
414. Third Maximum Number (Easy)
Given an integer array nums, return the third distinct maximum number in this
array. If the third maximum does not exist, return the maximum number.

Example 1:
Input: nums = [3,2,1]
Output: 1
Explanation: The first distinct maximum is 3.
             The second distinct maximum is 2.
             The third distinct maximum is 1.

Example 2:
Input: nums = [1,2]
Output: 2
Explanation: The first distinct maximum is 2.
             The second distinct maximum is 1.
             The third distinct maximum does not exist, so the maximum (2) is
             returned instead.

Example 3:
Input: nums = [2,2,3,1]
Output: 1
Explanation: The first distinct maximum is 3.
             The second distinct maximum is 2 (both 2's are counted together since they have the same value).
             The third distinct maximum is 1.

Constraints:
* 1 <= nums.length <= 10^4
* -2^31 <= nums[i] <= 2^31 - 1

Follow up: Can you find an O(n) solution?
=end

def third_max(nums)
    nums.uniq.sort[-3] || nums.max
end


=begin
434. Number of Segments in a String (Easy)
Given a string s, return the number of segments in the string. A segment is
defined to be a contiguous sequence of non-space characters.

Example 1:
Input: s = "Hello, my name is John"
Output: 5
Explanation: The five segments are ["Hello,", "my", "name", "is", "John"]

Example 2:
Input: s = "Hello"
Output: 1

Constraints:
* 0 <= s.length <= 300
* s consists of lowercase and uppercase English letters, digits, or one of the
  following characters "!@#$%^&*()_+-=',.:".
* The only space character in s is ' '.
=end

def count_segments(s)
    s.split.size
end


=begin
441. Arranging Coins (Easy)
You have n coins and you want to build a staircase with these coins. The
staircase consists of k rows where the ith row has exactly i coins. The last
row of the staircase may be incomplete. Given the integer n, return the number
of complete rows of the staircase you will build.

Example 1:
Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.

Example 2:
Input: n = 8
Output: 3
Explanation: Because the 4th row is incomplete, we return 3.

Constraints: 1 <= n <= 2^31 - 1
=end

def arrange_coins(n)
    (Math.sqrt(8*n+1).to_i-1)/2
end


=begin
448. Find All Numbers Disappeared in an Array (Easy)
Given an array nums of n integers where nums[i] is in the range [1, n], return
an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
* n == nums.length
* 1 <= n <= 10^5
* 1 <= nums[i] <= n

Follow up: Could you do it without extra space and in O(n) runtime? You may
           assume the returned list does not count as extra space.
=end

def find_disappeared_numbers(nums)
    (1..nums.size).to_a - nums
end


=begin
455. Assign Cookies (Easy)
Assume you are an awesome parent and want to give your children some cookies.
But, you should give each child at most one cookie. Each child i has a greed
factor g[i], which is the minimum size of a cookie that the child will be
content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign
the cookie j to the child i, and the child i will be content. Your goal is to
maximize the number of your content children and output the maximum number.

Example 1:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children
             are 1, 2, 3. And even though you have 2 cookies, since their size
             is both 1, you could only make the child whose greed factor is 1
             content. You need to output 1.

Example 2:
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children
             are 1, 2. You have 3 cookies and their sizes are big enough to
             gratify all of the children, You need to output 2.

Constraints:
* 1 <= g.length <= 3 * 10^4
* 0 <= s.length <= 3 * 10^4
* 1 <= g[i], s[j] <= 2^31 - 1

Note: This question is the same as 2410: Maximum Matching of Players With
      Trainers.
=end

def find_content_children(g, s)
    g.sort!
    k = 0
    s.sort.each do |x|
        k += 1 if k < g.size && g[k] <= x
    end
    k
end


=begin
461. Hamming Distance (Easy)
The Hamming distance between two integers is the number of positions at which
the corresponding bits are different. Given two integers x and y, return the
Hamming distance between them.

Example 1:
Input: x = 1, y = 4
Output: 2
Explanation: 1   (0 0 0 1)
             4   (0 1 0 0)
                    ↑   ↑
             The above arrows point to positions where the corresponding bits
             are different.

Example 2:
Input: x = 3, y = 1
Output: 1

Constraints: 0 <= x, y <= 2^31 - 1

Note: This question is the same as 2220: Minimum Bit Flips to Convert Number.
=end

def hamming_distance(x, y)
    (x ^ y).to_s(2).count('1')
end


=begin
463. Island Perimeter (Easy)
You are given row x col grid representing a map where grid[i][j] = 1 represents
land and grid[i][j] = 0 represents water. Grid cells are connected
horizontally/vertically (not diagonally). The grid is completely surrounded by
water, and there is exactly one island (i.e., one or more connected land
cells). The island doesn't have "lakes", meaning the water inside isn't
connected to the water around the island. One cell is a square with side length
1. The grid is rectangular, width and height don't exceed 100. Determine the
perimeter of the island.

Example 1:
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.

Example 2:
Input: grid = [[1]]
Output: 4

Example 3:
Input: grid = [[1,0]]
Output: 4

Constraints:
* row == grid.length
* col == grid[i].length
* 1 <= row, col <= 100
* grid[i][j] is 0 or 1.
* There is exactly one island in grid.
=end

def island_perimeter(grid)
    m, n = grid.size, grid[0].size
    ans = 0
    (0..m-1).each do |i|
        (0..n-1).each do |j|
            if grid[i][j] == 1
                ans += 4
                ans -= 2 if i > 0 && grid[i-1][j] == 1
                ans -= 2 if j > 0 && grid[i][j-1] == 1
            end
        end
    end
    return ans
end


=begin
476. Number Complement (Easy)
The complement of an integer is the integer you get when you flip all the 0's
to 1's and all the 1's to 0's in its binary representation.
* For example, The integer 5 is "101" in binary and its complement is "010"
  which is the integer 2.
Given an integer num, return its complement.

Example 1:
Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and
             its complement is 010. So you need to output 2.

Example 2:
Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and
             its complement is 0. So you need to output 0.

Constraints: 1 <= num < 2^31

Note: This question is the same as 1009:
      https://leetcode.com/problems/complement-of-base-10-integer/
=end

def find_complement(num)
    (1<<num.bit_length)-1 ^ num
end


=begin
482. License Key Formatting (Easy)
You are given a license key represented as a string s that consists of only
alphanumeric characters and dashes. The string is separated into n + 1 groups
by n dashes. You are also given an integer k. We want to reformat the string s
such that each group contains exactly k characters, except for the first group,
which could be shorter than k but still must contain at least one character.
Furthermore, there must be a dash inserted between two groups, and you should
convert all lowercase letters to uppercase. Return the reformatted license key.

Example 1:
Input: s = "5F3Z-2e-9-w", k = 4
Output: "5F3Z-2E9W"
Explanation: The string s has been split into two parts, each part has 4
             characters. Note that the two extra dashes are not needed and can
             be removed.

Example 2:
Input: s = "2-5g-3-J", k = 2
Output: "2-5G-3J"
Explanation: The string s has been split into three parts, each part has 2
             characters except the first part as it could be shorter as
             mentioned above.

Constraints:
* 1 <= s.length <= 10^5
* s consists of English letters, digits, and dashes '-'.
* 1 <= k <= 10^4
=end

def license_key_formatting(s, k)
    ans = []
    cnt = 0
    s.reverse.upcase.each_char do |ch|
        next if ch == '-'
        ans << '-' and cnt = 0 if cnt == k
        ans << ch
        cnt += 1
    end
    ans.join.reverse
end


=begin
485. Max Consecutive Ones (Easy)
Given a binary array nums, return the maximum number of consecutive 1's in the
array.

Example 1:
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
             The maximum number of consecutive 1s is 3.

Example 2:
Input: nums = [1,0,1,1,0,1]
Output: 2

Constraints:
* 1 <= nums.length <= 10^5
* nums[i] is either 0 or 1.
=end

def find_max_consecutive_ones(nums)
    ans = cnt = 0
    nums.each do |x|
        cnt = x == 0 ? 0 : cnt + 1
        ans = cnt if cnt > ans
    end
    return ans
end


=begin
492. Construct the Rectangle (Easy)
A web developer needs to know how to design a web page's size. So, given a
specific rectangular web page’s area, your job by now is to design a
rectangular web page, whose length L and width W satisfy the following
requirements:
* The area of the rectangular web page you designed must equal to the given
  target area.
* The width W should not be larger than the length L, which means L >= W.
* The difference between length L and width W should be as small as possible.
* Return an array [L, W] where L and W are the length and width of the web page
  you designed in sequence.

Example 1:
Input: area = 4
Output: [2,2]
Explanation: The target area is 4, and all the possible ways to construct it
             are [1,4], [2,2], [4,1]. But according to requirement 2, [1,4] is
             illegal; according to requirement 3,  [4,1] is not optimal
             compared to [2,2]. So the length L is 2, and the width W is 2.

Example 2:
Input: area = 37
Output: [37,1]

Example 3:
Input: area = 122122
Output: [427,286]

Constraints: 1 <= area <= 10^7
=end

def construct_rectangle(area)
    Math.sqrt(area).to_i.downto(1) do |w|
        return [area/w, w] if area % w == 0
    end
end


=begin
495. Teemo Attacking (Easy)
Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo
attacks Ashe, Ashe gets poisoned for a exactly duration seconds. More formally,
an attack at second t will mean Ashe is poisoned during the inclusive time
interval [t, t + duration - 1]. If Teemo attacks again before the poison effect
ends, the timer for it is reset, and the poison effect will end duration
seconds after the new attack. You are given a non-decreasing integer array
timeSeries, where timeSeries[i] denotes that Teemo attacks Ashe at second
timeSeries[i], and an integer duration. Return the total number of seconds that
Ashe is poisoned.

Example 1:
Input: timeSeries = [1,4], duration = 2
Output: 4
Explanation: Teemo's attacks on Ashe go as follows:
             - At second 1, Teemo attacks, and Ashe is poisoned for seconds 1
               and 2.
             - At second 4, Teemo attacks, and Ashe is poisoned for seconds 4
               and 5.
             Ashe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in
             total.

Example 2:
Input: timeSeries = [1,2], duration = 2
Output: 3
Explanation: Teemo's attacks on Ashe go as follows:
             - At second 1, Teemo attacks, and Ashe is poisoned for seconds 1
               and 2.
             - At second 2 however, Teemo attacks again and resets the poison
               timer. Ashe is poisoned for seconds 2 and 3.
             Ashe is poisoned for seconds 1, 2, and 3, which is 3 seconds in
             total.

Constraints:
* 1 <= timeSeries.length <= 10^4
* 0 <= timeSeries[i], duration <= 10^7
* timeSeries is sorted in non-decreasing order.
=end

def find_poisoned_duration(time_series, duration)
    ans = duration
    time_series.each_cons(2) do |x, y|
        ans += [duration, y-x].min
    end
    ans
end


=begin
496. Next Greater Element I (Easy)
The next greater element of some element x in an array is the first greater
element that is to the right of x in the same array. You are given two distinct
0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For
each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and
determine the next greater element of nums2[j] in nums2. If there is no next
greater element, then the answer for this query is -1. Return an array ans of
length nums1.length such that ans[i] is the next greater element as described
above.

Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
             - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater
               element, so the answer is -1.
             - 1 is underlined in nums2 = [1,3,4,2]. The next greater element
               is 3.
             - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater
               element, so the answer is -1.

Example 2:
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
             - 2 is underlined in nums2 = [1,2,3,4]. The next greater element
               is 3.
             - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater
               element, so the answer is -1.

Constraints:
* 1 <= nums1.length <= nums2.length <= 1000
* 0 <= nums1[i], nums2[i] <= 10^4
* All integers in nums1 and nums2 are unique.
* All the integers of nums1 also appear in nums2.

Follow up: Could you find an O(nums1.length + nums2.length) solution?
=end

def next_greater_element(nums1, nums2)
    hs = Hash.new(-1)
    stack = []
    nums2.each do |x|
        hs[stack.pop] = x while stack.any? && stack[-1] < x
        stack << x
    end
    nums1.map {|x| hs[x]}
end


=begin
500. Keyboard Row (Easy)
Given an array of strings words, return the words that can be typed using
letters of the alphabet on only one row of American keyboard like the image
below. Note that the strings are case-insensitive, both lowercased and
uppercased of the same letter are treated as if they are at the same row. In
the American keyboard:
* the first row consists of the characters "qwertyuiop",
* the second row consists of the characters "asdfghjkl", and
* the third row consists of the characters "zxcvbnm".

Example 1:
Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]
Explanation: Both "a" and "A" are in the 2nd row of the American keyboard due
             to case insensitivity.

Example 2:
Input: words = ["omk"]
Output: []

Example 3:
Input: words = ["adsdf","sfd"]
Output: ["adsdf","sfd"]

Constraints:
* 1 <= words.length <= 20
* 1 <= words[i].length <= 100
* words[i] consists of English letters (both lowercase and uppercase).
=end

def find_words(words)
    words.grep(/^([qwertyuiop]*|[asdfghjkl]*|[zxcvbnm]*)$/i)
end


=begin
501. Find Mode in Binary Search Tree (Easy)
Given the root of a binary search tree (BST) with duplicates, return all the
mode(s) (i.e., the most frequently occurred element) in it. If the tree has
more than one mode, return them in any order. Assume a BST is defined as
follows:
* The left subtree of a node contains only nodes with keys less than or equal
  to the node's key.
* The right subtree of a node contains only nodes with keys greater than or
  equal to the node's key.
* Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [1,null,2,2]
Output: [2]

Example 2:
Input: root = [0]
Output: [0]

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* -10^5 <= Node.val <= 10^5

Follow up: Could you do that without using any extra space? (Assume that the
           implicit stack space incurred due to recursion does not count).
=end

def find_mode(root)
    ans = []
    cnt = most = 0
    val = nil
    node, stack = root, []
    while node || stack.any?
        if node
            stack << node
            node = node.left
        else
            node = stack.pop
            cnt, val = 0, node.val if val != node.val
            cnt += 1
            if cnt >= most
                ans = [] if cnt > most
                ans << val
                most = cnt
            end
            node = node.right
        end
    end
    ans
end


=begin
504. Base 7 (Easy)
Given an integer num, return a string of its base 7 representation.

Example 1:
Input: num = 100
Output: "202"

Example 2:
Input: num = -7
Output: "-10"

Constraints: -10^7 <= num <= 10^7
=end

def convert_to_base7(num)
    num.to_s(7)
end


=begin
506. Relative Ranks (Easy)
You are given an integer array score of size n, where score[i] is the score of
the ith athlete in a competition. All the scores are guaranteed to be unique.
The athletes are placed based on their scores, where the 1st place athlete has
the highest score, the 2nd place athlete has the 2nd highest score, and so on.
The placement of each athlete determines their rank:
* The 1st place athlete's rank is "Gold Medal".
* The 2nd place athlete's rank is "Silver Medal".
* The 3rd place athlete's rank is "Bronze Medal".
* For the 4th place to the nth place athlete, their rank is their placement
  number (i.e., the xth place athlete's rank is "x").
Return an array answer of size n where answer[i] is the rank of the ith
athlete.

Example 1:
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].

Example 2:
Input: score = [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
Explanation: The placements are [1st, 5th, 3rd, 2nd, 4th].

Constraints:
* n == score.length
* 1 <= n <= 10^4
* 0 <= score[i] <= 10^6
* All the values in score are unique.
=end

def find_relative_ranks(score)
    hs = Hash[score.sort.reverse.zip(0...score.size)]
    medal = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    score.map{|x| (v = hs[x]) < 3 ? medal[v] : (v+1).to_s}
end


=begin
507. Perfect Number (Easy)
A perfect number is a positive integer that is equal to the sum of its positive
divisors, excluding the number itself. A divisor of an integer x is an integer
that can divide x evenly. Given an integer n, return true if n is a perfect
number, otherwise return false.

Example 1:
Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
             1, 2, 4, 7, and 14 are all divisors of 28.

Example 2:
Input: num = 7
Output: false

Constraints: 1 <= num <= 10^8
=end

def check_perfect_number(num)
    total = num > 1 ? 1 : 0
    (2..Math.sqrt(num)).each do |x|
        if num % x == 0
            total += x
            total += num/x if x != num/x
        end
    end
    total == num
end


=begin
509. Fibonacci Number (Easy)
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the
Fibonacci sequence, such that each number is the sum of the two preceding ones,
starting from 0 and 1. That is,
    F(0) = 0, F(1) = 1
    F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).

Example 1:
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2:
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

Constraints: 0 <= n <= 30
=end

def fib(n)
    phi = (1 + Math.sqrt(5))/2
    (phi**n/Math.sqrt(5)).round
end


=begin
520. Detect Capital (Easy)
We define the usage of capitals in a word to be right when one of the following
cases holds:
* All letters in this word are capitals, like "USA".
* All letters in this word are not capitals, like "leetcode".
* Only the first letter in this word is capital, like "Google".
Given a string word, return true if the usage of capitals in it is right.

Example 1:
Input: word = "USA"
Output: true

Example 2:
Input: word = "FlaG"
Output: false

Constraints:
* 1 <= word.length <= 100
* word consists of lowercase and uppercase English letters.
=end

def detect_capital_use(word)
    /^([A-Z]+|[A-Z]{0,1}[a-z]*)$/ === word
end


=begin
521. Longest Uncommon Subsequence I (Easy)
Given two strings a and b, return the length of the longest uncommon
subsequence between a and b. If no such uncommon subsequence exists, return -1.
An uncommon subsequence between two strings is a string that is a subsequence
of exactly one of them.

Example 1:
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a
             subsequence of "aba" but not "cdc". Note that "cdc" is also a
             longest uncommon subsequence.

Example 2:
Input: a = "aaa", b = "bbb"
Output: 3
Explanation: The longest uncommon subsequences are "aaa" and "bbb".

Example 3:
Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Every subsequence of string a is also a subsequence of string b.
             Similarly, every subsequence of string b is also a subsequence of
             string a. So the answer would be -1.

Constraints:
* 1 <= a.length, b.length <= 100
* a and b consist of lower-case English letters.
=end

def find_lu_slength(a, b)
    return [a.size, b.size].max if a.size != b.size
    return a == b ? -1 : a.size
end


=begin
530. Minimum Absolute Difference in BST (Easy)
Given the root of a Binary Search Tree (BST), return the minimum absolute
difference between the values of any two different nodes in the tree.

Example 1:
Input: root = [4,2,6,1,3]
Output: 1

Example 2:
Input: root = [1,0,48,null,null,12,49]
Output: 1

Constraints:
* The number of nodes in the tree is in the range [2, 10^4].
* 0 <= Node.val <= 10^5

Note: This question is the same as 783:
      https://leetcode.com/problems/minimum-distance-between-bst-nodes/
=end

def get_minimum_difference(root)
    ans = Float::INFINITY
    prev = nil
    node, stack = root, []
    while node || stack.any?
        if node
            stack << node
            node = node.left
        else
            node = stack.pop
            ans = [ans, node.val - prev].min if prev
            prev = node.val
            node = node.right
        end
    end
    ans
end


=begin
541. Reverse String II (Easy)
Given a string s and an integer k, reverse the first k characters for every 2k
characters counting from the start of the string. If there are fewer than k
characters left, reverse all of them. If there are less than 2k but greater
than or equal to k characters, then reverse the first k characters and leave
the other as original.

Example 1:
Input: s = "abcdefg", k = 2
Output: "bacdfeg"

Example 2:
Input: s = "abcd", k = 2
Output: "bacd"

Constraints:
* 1 <= s.length <= 10^4
* s consists of only lowercase English letters.
* 1 <= k <= 10^4
=end

def reverse_str(s, k)
    s.chars.each_slice(k).map.with_index { |x, i|
        i % 2 == 0 ? x.reverse : x
    }.join
end


=begin
543. Diameter of Binary Tree (Easy)
Given the root of a binary tree, return the length of the diameter of the tree.
The diameter of a binary tree is the length of the longest path between any two
nodes in a tree. This path may or may not pass through the root. The length of
a path between two nodes is represented by the number of edges between them.

Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:
Input: root = [1,2]
Output: 1

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* -100 <= Node.val <= 100
=end

def diameter_of_binary_tree(root)
    ans = 0
    fn = lambda do |node|
        return 0 if !node
        left, right = fn.call(node.left), fn.call(node.right)
        ans = [ans, left + right].max
        return 1 + [left, right].max
    end
    fn.call(root)
    ans
end


=begin
551. Student Attendance Record I (Easy)
You are given a string s representing an attendance record for a student where
each character signifies whether the student was absent, late, or present on
that day. The record only contains the following three characters:
* 'A': Absent.
* 'L': Late.
* 'P': Present.
The student is eligible for an attendance award if they meet both of the
following criteria:
* The student was absent ('A') for strictly fewer than 2 days total.
* The student was never late ('L') for 3 or more consecutive days.
Return true if the student is eligible for an attendance award, or false
otherwise.

Example 1:
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more
             consecutive days.

Example 2:
Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is
             not eligible for the award.

Constraints:
* 1 <= s.length <= 1000
* s[i] is either 'A', 'L', or 'P'.
=end

def check_record(s)
    s.count('A') < 2 && !s.include?('LLL')
end


=begin
557. Reverse Words in a String III (Easy)
Given a string s, reverse the order of characters in each word within a
sentence while still preserving whitespace and initial word order.

Example 1:
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"

Example 2:
Input: s = "Mr Ding"
Output: "rM gniD"

Constraints:
* 1 <= s.length <= 5 * 10^4
* s contains printable ASCII characters.
* s does not contain any leading or trailing spaces.
* There is at least one word in s.
* All the words in s are separated by a single space.
=end

def reverse_words(s)
    s.split.map(&:reverse).join(' ')
end


=begin
559. Maximum Depth of N-ary Tree (Easy)
Given a n-ary tree, find its maximum depth. The maximum depth is the number of
nodes along the longest path from the root node down to the farthest leaf node.
Nary-Tree input serialization is represented in their level order traversal,
each group of children is separated by the null value (See examples).

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: 3

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: 5

Constraints:
* The total number of nodes is in the range [0, 10^4].
* The depth of the n-ary tree is less than or equal to 1000.
=end

def maxDepth(root)
    ans = 0
    queue = Queue.new
    queue << root if root
    while !queue.empty?
        ans += 1
        (1..queue.size).each do
            node = queue.pop
            node.children.each do |child|
                queue << child
            end
        end
    end
    ans
end


=begin
561. Array Partition (Easy)
Given an integer array nums of 2n integers, group these integers into n pairs
(a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) for all i is
maximized. Return the maximized sum.

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
Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2,
5) + min(6, 6) = 1 + 2 + 6 = 9.

Constraints:
* 1 <= n <= 10^4
* nums.length == 2 * n
* -10^4 <= nums[i] <= 10^4
=end

def array_pair_sum(nums)
    nums.sort.each_slice(2).sum(&:first)
end


=begin
563. Binary Tree Tilt (Easy)
Given the root of a binary tree, return the sum of every tree node's tilt. The
tilt of a tree node is the absolute difference between the sum of all left
subtree node values and all right subtree node values. If a node does not have
a left child, then the sum of the left subtree node values is treated as 0. The
rule is similar if the node does not have a right child.

Example 1:
Input: root = [1,2,3]
Output: 1
Explanation: Tilt of node 2 : |0-0| = 0 (no children)
             Tilt of node 3 : |0-0| = 0 (no children)
             Tilt of node 1 : |2-3| = 1 (left subtree is just left child, so
             sum is 2; right subtree is just right child, so sum is 3)
             Sum of every tilt : 0 + 0 + 1 = 1

Example 2:
Input: root = [4,2,9,3,5,null,7]
Output: 15
Explanation: Tilt of node 3 : |0-0| = 0 (no children)
             Tilt of node 5 : |0-0| = 0 (no children)
             Tilt of node 7 : |0-0| = 0 (no children)
             Tilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)
             Tilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)
             Tilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)
             Sum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15

Example 3:
Input: root = [21,7,14,1,1,2,2,3,3]
Output: 9

Constraints:
* The number of nodes in the tree is in the range [0, 10^4].
* -1000 <= Node.val <= 1000
=end

def find_tilt(root)
    ans = 0
    fn = lambda do |node|
        return 0 if !node
        left, right = fn.call(node.left), fn.call(node.right)
        ans += (left - right).abs
        left + right + node.val
    end
    fn.call(root)
    ans
end


=begin
566. Reshape the Matrix (Easy)
In MATLAB, there is a handy function called reshape which can reshape an m x n
matrix into a new one with a different size r x c keeping its original data.
You are given an m x n matrix mat and two integers r and c representing the
number of rows and the number of columns of the wanted reshaped matrix. The
reshaped matrix should be filled with all the elements of the original matrix
in the same row-traversing order as they were. If the reshape operation with
given parameters is possible and legal, output the new reshaped matrix;
Otherwise, output the original matrix.

Example 1:
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]

Example 2:
Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]

Constraints:
* m == mat.length
* n == mat[i].length
* 1 <= m, n <= 100
* -1000 <= mat[i][j] <= 1000
* 1 <= r, c <= 300
=end

def matrix_reshape(mat, r, c)
    m, n = mat.size, mat[0].size
    return mat if m * n != r * c
    ans = Array.new(r) {Array.new(c)}
    (0...m).each do |i|
        (0...n).each do |j|
            x, y = (i*n + j).divmod(c)
            ans[x][y] = mat[i][j]
        end
    end
    ans
end


=begin
572. Subtree of Another Tree (Easy)
Given the roots of two binary trees root and subRoot, return true if there is a
subtree of root with the same structure and node values of subRoot and false
otherwise. A subtree of a binary tree tree is a tree that consists of a node in
tree and all of this node's descendants. The tree tree could also be considered
as a subtree of itself.

Example 1:
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

Example 2:
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false

Constraints:
* The number of nodes in the root tree is in the range [1, 2000].
* The number of nodes in the subRoot tree is in the range [1, 1000].
* -10^4 <= root.val <= 10^4
* -10^4 <= subRoot.val <= 10^4
=end

require 'digest'

def is_subtree(root, sub_root)
    dfs = lambda do |node|
        return "" if !node
        left, right = dfs.call(node.left), dfs.call(node.right)
        Digest::SHA2.hexdigest(left + node.val.to_s + right)
    end
    target = dfs.call(sub_root)
    found = false

    dfs = lambda do |node|
        return "" if !node
        left, right = dfs.call(node.left), dfs.call(node.right)
        cand = Digest::SHA2.hexdigest(left + node.val.to_s + right)
        found = true if cand == target
        cand
    end

    dfs.call(root)
    return found
end


=begin
575. Distribute Candies (Easy)
Alice has n candies, where the ith candy is of type candyType[i]. Alice noticed
that she started to gain weight, so she visited a doctor. The doctor advised
Alice to only eat n / 2 of the candies she has (n is always even). Alice likes
her candies very much, and she wants to eat the maximum number of different
types of candies while still following the doctor's advice. Given the integer
array candyType of length n, return the maximum number of different types of
candies she can eat if she only eats n / 2 of them.

Example 1:
Input: candyType = [1,1,2,2,3,3]
Output: 3
Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3
             types, she can eat one of each type.

Example 2:
Input: candyType = [1,1,2,3]
Output: 2
Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types
             [1,2], [1,3], or [2,3], she still can only eat 2 different types.

Example 3:
Input: candyType = [6,6,6,6]
Output: 1
Explanation: Alice can only eat 4 / 2 = 2 candies. Even though she can eat 2
             candies, she only has 1 type.

Constraints:
* n == candyType.length
* 2 <= n <= 10^4
* n is even.
* -10^5 <= candyType[i] <= 10^5
=end

def distribute_candies(candy_type)
    [candy_type.size/2, candy_type.uniq.size].min
end


=begin
589. N-ary Tree Preorder Traversal (Easy)
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
* The number of nodes in the tree is in the range [0, 10^4].
* 0 <= Node.val <= 10^4
* The height of the n-ary tree is less than or equal to 1000.

Follow up: Recursive solution is trivial, could you do it iteratively?
=end

def preorder(root)
    ans = []
    stack = []
    stack << root if root
    while stack.any?
        node = stack.pop
        ans << node.val
        stack += node.children.reverse
    end
    ans
end


=begin
590. N-ary Tree Postorder Traversal (Easy)
Given the root of an n-ary tree, return the postorder traversal of its nodes'
values. Nary-Tree input serialization is represented in their level order
traversal. Each group of children is separated by the null value (See examples)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]

Constraints:
* The number of nodes in the tree is in the range [0, 10^4].
* 0 <= Node.val <= 10^4
* The height of the n-ary tree is less than or equal to 1000.

Follow up: Recursive solution is trivial, could you do it iteratively?
=end

def postorder(root)
    ans = []

    dfs = lambda do |node|
        return if !node
        node.children.each do |child|
            dfs.call(child)
        end
        ans << node.val
    end

    dfs.call(root)
    ans
end


=begin
594. Longest Harmonious Subsequence (Easy)
We define a harmonious array as an array where the difference between its
maximum value and its minimum value is exactly 1. Given an integer array nums,
return the length of its longest harmonious subsequence among all its possible
subsequences.

Example 1:
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].

Example 2:
Input: nums = [1,2,3,4]
Output: 2
Explanation: The longest harmonious subsequences are [1,2], [2,3], and [3,4],
             all of which have a length of 2.

Example 3:
Input: nums = [1,1,1,1]
Output: 0
Explanation: No harmonic subsequence exists.

Constraints:
* 1 <= nums.length <= 2 * 10^4
* -10^9 <= nums[i] <= 10^9
=end

def find_lhs(nums)
    freq = nums.tally
    freq.keys.map {|k| freq[k] + (freq[k+1] || 0)}.max
end


=begin
598. Range Addition II (Easy)
You are given an m x n matrix M initialized with all 0's and an array of
operations ops, where ops[i] = [ai, bi] means M[x][y] should be incremented by
one for all 0 <= x < ai and 0 <= y < bi. Count and return the number of maximum
integers in the matrix after performing all the operations.

Example 1:
Input: m = 3, n = 3, ops = [[2,2],[3,3]]
Output: 4
Explanation: The maximum integer in M is 2, and there are four of it in M. So return 4.

Example 2:
Input: m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]
Output: 4

Example 3:
Input: m = 3, n = 3, ops = []
Output: 9

Constraints:
* 1 <= m, n <= 4 * 10^4
* 0 <= ops.length <= 10^4
* ops[i].length == 2
* 1 <= ai <= m
* 1 <= bi <= n
=end

def max_count(m, n, ops)
    ops.inject([m, n]) {|(m, n), (x, y)| [[m, x].min, [n, y].min]}.inject(:*)
end


=begin
599. Minimum Index Sum of Two Lists (Easy)
Given two arrays of strings list1 and list2, find the common strings with the
least index sum. A common string is a string that appeared in both list1 and
list2. A common string with the least index sum is a common string such that if
it appeared at list1[i] and list2[j] then i + j should be the minimum value
among all the other common strings. Return all the common strings with the
least index sum. Return the answer in any order.

Example 1:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: The only common string is "Shogun".

Example 2:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun"]
Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.

Example 3:
Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
Output: ["sad","happy"]
Explanation: There are three common strings:
             "happy" with index sum = (0 + 1) = 1.
             "sad" with index sum = (1 + 0) = 1.
             "good" with index sum = (2 + 2) = 4.
             The strings with the least index sum are "sad" and "happy".

Constraints:
* 1 <= list1.length, list2.length <= 1000
* 1 <= list1[i].length, list2[i].length <= 30
* list1[i] and list2[i] consist of spaces ' ' and English letters.
* All the strings of list1 are unique.
* All the strings of list2 are unique.
* There is at least a common string between list1 and list2.
=end

def find_restaurant(list1, list2)
    loc = {}
    list1.each_with_index {|x, i| loc[x] = i}
    val = Float::INFINITY
    ans = []
    list2.each_with_index do |x, i|
        if loc[x]
            cand = loc[x] + i
            ans = [] if cand < val
            if cand <= val
                ans << x
                val = cand
            end
        end
    end
    ans
end


=begin
605. Can Place Flowers (Easy)
You have a long flowerbed in which some of the plots are planted, and some are
not. However, flowers cannot be planted in adjacent plots. Given an integer
array flowerbed containing 0's and 1's, where 0 means empty and 1 means not
empty, and an integer n, return true if n new flowers can be planted in the
flowerbed without violating the no-adjacent-flowers rule and false otherwise.

Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

Constraints:
* 1 <= flowerbed.length <= 2 * 10^4
* flowerbed[i] is 0 or 1.
* There are no two adjacent flowers in flowerbed.
* 0 <= n <= flowerbed.length
=end

def can_place_flowers(flowerbed, n)
    flowerbed.each_with_index do |x, i|
        if x == 0 && (i == 0 || flowerbed[i-1] == 0) && (i+1 == flowerbed.size || flowerbed[i+1] == 0)
            n -= 1
            flowerbed[i] = 1
        end
    end
    n <= 0
end


=begin
617. Merge Two Binary Trees (Easy)
You are given two binary trees root1 and root2. Imagine that when you put one
of them to cover the other, some nodes of the two trees are overlapped while
the others are not. You need to merge the two trees into a new binary tree. The
merge rule is that if two nodes overlap, then sum node values up as the new
value of the merged node. Otherwise, the NOT null node will be used as the node
of the new tree. Return the merged tree. Note: The merging process must start
from the root nodes of both trees.

Example 1:
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]

Example 2:
Input: root1 = [1], root2 = [1,2]
Output: [2,2]

Constraints:
 * The number of nodes in both trees is in the range [0, 2000].
 * -10^4 <= Node.val <= 10^4
=end

def merge_trees(root1, root2)

    fn = lambda do |node1, node2|
        return node1 || node2 if !node1 || !node2
        node = TreeNode.new(node1.val + node2.val)
        node.left = fn.call(node1.left, node2.left)
        node.right = fn.call(node1.right, node2.right)
        node
    end

    fn.call(root1, root2)
end


=begin
628. Maximum Product of Three Numbers (Easy)
Given an integer array nums, find three numbers whose product is maximum and
return the maximum product.

Example 1:
Input: nums = [1,2,3]
Output: 6

Example 2:
Input: nums = [1,2,3,4]
Output: 24

Example 3:
Input: nums = [-1,-2,-3]
Output: -6

Constraints:
* 3 <= nums.length <= 10^4
* -1000 <= nums[i] <= 1000
=end

def maximum_product(nums)
    nums.sort!
    [nums.last(3).reduce(:*), nums[0]*nums[1]*nums[-1]].max
end


=begin
637. Average of Levels in Binary Tree (Easy)
Given the root of a binary tree, return the average value of the nodes on each
level in the form of an array. Answers within 10-5 of the actual answer will be
accepted.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5,
             and on level 2 is 11. Hence return [3, 14.5, 11].

Example 2:
Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* -2^31 <= Node.val <= 2^31 - 1
=end

def average_of_levels(root)
    ans = []
    q = Queue.new([root])
    while !q.empty?
        total = 0
        n = q.size
        (1..n).each do
            node = q.deq
            total += node.val
            q << node.left if node.left
            q << node.right if node.right
        end
        ans << total.to_f/n
    end
    ans
end


=begin
643. Maximum Average Subarray I (Easy)
You are given an integer array nums consisting of n elements, and an integer k.
Find a contiguous subarray whose length is equal to k that has the maximum
average value and return this value. Any answer with a calculation error less
than 10-5 will be accepted.

Example 1:
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

Example 2:
Input: nums = [5], k = 1
Output: 5.00000

Constraints:
* n == nums.length
* 1 <= k <= n <= 10^5
* -10^4 <= nums[i] <= 10^4
=end

def find_max_average(nums, k)
    total = 0
    most = -Float::INFINITY
    nums.each_with_index do |x, i|
        total += x
        if i >= k-1
            most = [most, total].max
            total -= nums[i-k+1]
        end
    end
    most.to_f/k
end


=begin
645. Set Mismatch (Easy)
You have a set of integers s, which originally contains all the numbers from 1
to n. Unfortunately, due to some error, one of the numbers in s got duplicated
to another number in the set, which results in repetition of one number and
loss of another number. You are given an integer array nums representing the
data status of this set after the error. Find the number that occurs twice and
the number that is missing and return them in the form of an array.

Example 1:
Input: nums = [1,2,2,4]
Output: [2,3]

Example 2:
Input: nums = [1,1]
Output: [1,2]

Constraints:
* 2 <= nums.length <= 10^4
* 1 <= nums[i] <= 10^4
=end

def find_error_nums(nums)
    seen = Array.new(nums.size, -1)
    nums.each do |x|
        seen[x-1] *= -1
    end
    ans = []
    seen.each_with_index do |x, i|
        ans << i+1 if x < 0
    end
    ans
end


=begin
653. Two Sum IV - Input is a BST (Easy)
Given the root of a binary search tree and an integer k, return true if there
exist two elements in the BST such that their sum is equal to k, or false
otherwise.

Example 1:
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true

Example 2:
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* -10^4 <= Node.val <= 10^4
* root is guaranteed to be a valid binary search tree.
* -10^5 <= k <= 10^5
=end

def find_target(root, k)
    seen = Set.new
    stack = [root]
    while stack.any?
        node = stack.pop
        return true if seen.include?(k - node.val)
        seen << node.val
        stack << node.left if node.left
        stack << node.right if node.right
    end
    false
end


=begin
657. Robot Return to Origin (Easy)
There is a robot starting at the position (0, 0), the origin, on a 2D plane.
Given a sequence of its moves, judge if this robot ends up at (0, 0) after it
completes its moves. You are given a string moves that represents the move
sequence of the robot where moves[i] represents its ith move. Valid moves are
'R' (right), 'L' (left), 'U' (up), and 'D' (down). Return true if the robot
returns to the origin after it finishes all of its moves, or false otherwise.
Note: The way that the robot is "facing" is irrelevant. 'R' will always make
the robot move to the right once, 'L' will always make it move left, etc. Also,
assume that the magnitude of the robot's movement is the same for each move.

Example 1:
Input: moves = "UD"
Output: true
Explanation: The robot moves up once, and then down once. All moves have the
             same magnitude, so it ended up at the origin where it started.
             Therefore, we return true.

Example 2:
Input: moves = "LL"
Output: false
Explanation: The robot moves left twice. It ends up two "moves" to the left of
             the origin. We return false because it is not at the origin at the
             end of its moves.

Constraints:
* 1 <= moves.length <= 2 * 10^4
* moves only contains the characters 'U', 'D', 'L' and 'R'.
=end

def judge_circle(moves)
    moves.count('L') == moves.count('R') && moves.count('U') == moves.count('D')
end


=begin
661. Image Smoother (Easy)
An image smoother is a filter of the size 3 x 3 that can be applied to each
cell of an image by rounding down the average of the cell and the eight
surrounding cells (i.e., the average of the nine cells in the blue smoother).
If one or more of the surrounding cells of a cell is not present, we do not
consider it in the average (i.e., the average of the four cells in the red
smoother). Given an m x n integer matrix img representing the grayscale of an
image, return the image after applying the smoother on each cell of it.

Example 1:
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation: For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
             For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
             For the point (1,1): floor(8/9) = floor(0.88888889) = 0

Example 2:
Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation: For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
             For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
             For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138

Constraints:
* m == img.length
* n == img[i].length
* 1 <= m, n <= 200
* 0 <= img[i][j] <= 255
=end

def image_smoother(img)
    m, n = img.size, img[0].size
    ans = Array.new(m) {Array.new(n)}
    (0...m).each do |i|
        (0...n).each do |j|
        ilo, ihi = [0, i-1].max, [m-1, i+1].min
        jlo, jhi = [0, j-1].max, [n-1, j+1].min
            total = 0
            (ilo..ihi).each do |ii|
                (jlo..jhi).each do |jj|
                    total += img[ii][jj]
                end
            end
            ans[i][j] = total/((ihi-ilo+1)*(jhi-jlo+1))
        end
    end
    ans
end


=begin
671. Second Minimum Node In a Binary Tree (Easy)
Given a non-empty special binary tree consisting of nodes with the non-negative
value, where each node in this tree has exactly two or zero sub-node. If the
node has two sub-nodes, then this node's value is the smaller value among its
two sub-nodes. More formally, the property root.val = min(root.left.val,
root.right.val) always holds. Given such a binary tree, you need to output the
second minimum value in the set made of all the nodes' value in the whole tree.
If no such second minimum value exists, output -1 instead.

Example 1:
Input: root = [2,2,5,null,null,5,7]
Output: 5
Explanation: The smallest value is 2, the second smallest value is 5.

Example 2:
Input: root = [2,2,2]
Output: -1
Explanation: The smallest value is 2, but there isn't any second smallest
             value.

Constraints:
* The number of nodes in the tree is in the range [1, 25].
* 1 <= Node.val <= 2^31 - 1
* root.val == min(root.left.val, root.right.val) for each internal node of the
  tree.
=end

def find_second_minimum_value(root)
    return -1 if !root.left
    left = root.val != root.left.val ? root.left.val : find_second_minimum_value(root.left)
    right = root.val != root.right.val ? root.right.val : find_second_minimum_value(root.right)
    return left if right == -1
    return right if left == -1
    [left, right].min
end


=begin
674. Longest Continuous Increasing Subsequence (Easy)
Given an unsorted array of integers nums, return the length of the longest
continuous increasing subsequence (i.e. subarray). The subsequence must be
strictly increasing. A continuous increasing subsequence is defined by two
indices l and r (l < r) such that it is [nums[l], nums[l + 1], ..., nums[r -
1], nums[r]] and for each l <= i < r, nums[i] < nums[i + 1].

Example 1:
Input: nums = [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5] with
             length 3. Even though [1,3,5,7] is an increasing subsequence, it
             is not continuous as elements 5 and 7 are separated by element 4.

Example 2:
Input: nums = [2,2,2,2,2]
Output: 1
Explanation: The longest continuous increasing subsequence is [2] with length
             1. Note that it must be strictly increasing.

Constraints:
* 1 <= nums.length <= 10^4
* -10^9 <= nums[i] <= 10^9
=end

def find_length_of_lcis(nums)
    nums.chunk_while(&:<).map(&:size).max
end


=begin
680. Valid Palindrome II (Easy)
Given a string s, return true if the s can be palindrome after deleting at most
one character from it.

Example 1:
Input: s = "aba"
Output: true

Example 2:
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.

Example 3:
Input: s = "abc"
Output: false

Constraints:
* 1 <= s.length <= 10^5
* s consists of lowercase English letters.
=end

def valid_palindrome(s)
    s.each_char.tally.values.count {|x| x.odd?} <= 2
end


=begin
693. Binary Number with Alternating Bits (Easy)
Given a positive integer, check whether it has alternating bits: namely, if two
adjacent bits will always have different values.

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

Constraints: 1 <= n <= 2^31 - 1
=end

def has_alternating_bits(n)
    (n ^= n>>1) & n+1 == 0
end


=begin
696. Count Binary Substrings (Easy)
Given a binary string s, return the number of non-empty substrings that have
the same number of 0's and 1's, and all the 0's and all the 1's in these
substrings are grouped consecutively. Substrings that occur multiple times are
counted the number of times they occur.

Example 1:
Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's
             and 0's: "0011", "01", "1100", "10", "0011", and "01". Notice that
             some of these substrings repeat and are counted the number of
             times they occur. Also, "00110011" is not a valid substring
             because all the 0's (and 1's) are not grouped together.

Example 2:
Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal
             number of consecutive 1's and 0's.

Constraints:
* 1 <= s.length <= 10^5
* s[i] is either '0' or '1'.
=end

def count_binary_substrings(s)
    s.scan(/0+|1+/).map(&:size).each_cons(2).map(&:min).sum
end


=begin
697. Degree of an Array (Easy)
Given a non-empty array of non-negative integers nums, the degree of this array
is defined as the maximum frequency of any one of its elements. Your task is to
find the smallest possible length of a (contiguous) subarray of nums, that has
the same degree as nums.

Example 1:
Input: nums = [1,2,2,3,1]
Output: 2
Explanation: The input array has a degree of 2 because both elements 1 and 2
             appear twice. Of the subarrays that have the same degree: [1, 2,
             2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
             The shortest length is 2. So return 2.

Example 2:
Input: nums = [1,2,2,3,1,4,2]
Output: 6
Explanation: The degree is 3 because the element 2 is repeated 3 times. So
             [2,2,3,1,4,2] is the shortest subarray, therefore returning 6.

Constraints:
* nums.length will be between 1 and 50,000.
* nums[i] will be an integer between 0 and 49,999.
=end

def find_shortest_sub_array(nums)
    left, freq = {}, Hash.new(0)
    ans = most = 0
    nums.each_with_index do |x, i|
        left[x] ||= i
        if (freq[x] += 1) > most || freq[x] == most && i-left[x]+1 < ans
            most = freq[x]
            ans = i-left[x]+1
        end
    end
    ans
end


=begin
700. Search in a Binary Search Tree (Easy)
You are given the root of a binary search tree (BST) and an integer val. Find
the node in the BST that the node's value equals val and return the subtree
rooted with that node. If such a node does not exist, return null.

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
* 1 <= val <= 10^7
=end

def search_bst(root, val)
    return root if !root || root.val == val
    return search_bst(root.right, val) if root.val < val
    search_bst(root.left, val)
end


=begin
704. Binary Search (Easy)
Given an array of integers nums which is sorted in ascending order, and an
integer target, write a function to search target in nums. If target exists,
then return its index. Otherwise, return -1. You must write an algorithm with
O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
* 1 <= nums.length <= 10^4
* -10^4 < nums[i], target < 10^4
* All the integers in nums are unique.
* nums is sorted in ascending order.
=end

def search(nums, target)
    k = nums.bsearch_index {|x| target <=> x}
    k || -1
end


=begin
705. Design HashSet (Easy)
Design a HashSet without using any built-in hash table libraries. Implement
MyHashSet class:
* void add(key) Inserts the value key into the HashSet.
* bool contains(key) Returns whether the value key exists in the HashSet or
  not.
* void remove(key) Removes the value key in the HashSet. If key does not exist
  in the HashSet, do nothing.

Example 1:
Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation: MyHashSet myHashSet = new MyHashSet();
             myHashSet.add(1);      // set = [1]
             myHashSet.add(2);      // set = [1, 2]
             myHashSet.contains(1); // return True
             myHashSet.contains(3); // return False, (not found)
             myHashSet.add(2);      // set = [1, 2]
             myHashSet.contains(2); // return True
             myHashSet.remove(2);   // set = [1]
             myHashSet.contains(2); // return False, (already removed)

Constraints:
* 0 <= key <= 10^6
* At most 10^4 calls will be made to add, remove, and contains.
=end

class MyHashSet
    def initialize()
        @data = Array.new(1_000_001)
    end

    def add(key)
        @data[key] = 1
    end

    def remove(key)
        @data[key] = nil
    end

    def contains(key)
        !!@data[key]
    end
end


=begin
706. Design HashMap (Easy)
Design a HashMap without using any built-in hash table libraries. Implement the
MyHashMap class:
* MyHashMap() initializes the object with an empty map.
* void put(int key, int value) inserts a (key, value) pair into the HashMap. If
  the key already exists in the map, update the corresponding value.
* int get(int key) returns the value to which the specified key is mapped, or
  -1 if this map contains no mapping for the key.
* void remove(key) removes the key and its corresponding value if the map
  contains the mapping for the key.

Example 1:
Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]
Explanation: MyHashMap myHashMap = new MyHashMap();
             myHashMap.put(1, 1); // The map is now [[1,1]]
             myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
             myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
             myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
             myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
             myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
             myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
             myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]

Constraints:
* 0 <= key, value <= 10^6
* At most 10^4 calls will be made to put, get, and remove.
=end

class MyHashMap
    def initialize()
        @data = Array.new(1_000_001)
    end

    def put(key, value)
        @data[key] = value
    end

    def get(key)
        @data[key] || -1
    end

    def remove(key)
        @data[key] = nil
    end
end


=begin
709. To Lower Case (Easy)
Given a string s, return the string after replacing every uppercase letter with
the same lowercase letter.

Example 1:
Input: s = "Hello"
Output: "hello"

Example 2:
Input: s = "here"
Output: "here"

Example 3:
Input: s = "LOVELY"
Output: "lovely"

Constraints:
* 1 <= s.length <= 100
* s consists of printable ASCII characters.
=end

def to_lower_case(s)
    s.downcase
en


=begin
717. 1-bit and 2-bit Characters (Easy)
We have two special characters:
* The first character can be represented by one bit 0.
* The second character can be represented by two bits (10 or 11).
Given a binary array bits that ends with 0, return true if the last character
must be a one-bit character.

Example 1:
Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is two-bit character and one-bit
character. So the last character is one-bit character.

Example 2:
Input: bits = [1,1,1,0]
Output: false
Explanation: The only way to decode it is two-bit character and two-bit
character. So the last character is not one-bit character.

Constraints:
* 1 <= bits.length <= 1000
* bits[i] is either 0 or 1.
=end

def is_one_bit_character(bits)
    k = bits.map(&:to_s).join =~ /1+0$/
    !k || ((bits.size-k) & 1) == 1
end


=begin
724. Find Pivot Index (Easy)
Given an array of integers nums, calculate the pivot index of this array. The
pivot index is the index where the sum of all the numbers strictly to the left
of the index is equal to the sum of all the numbers strictly to the index's
right. If the index is on the left edge of the array, then the left sum is 0
because there are no elements to the left. This also applies to the right edge
of the array. Return the leftmost pivot index. If no such index exists, return
-1.

Example 1:
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: The pivot index is 3.
             Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
             Right sum = nums[4] + nums[5] = 5 + 6 = 11

Example 2:
Input: nums = [1,2,3]
Output: -1
Explanation: There is no index that satisfies the conditions in the problem
             statement.

Example 3:
Input: nums = [2,1,-1]
Output: 0
Explanation: The pivot index is 0.
             Left sum = 0 (no elements to the left of index 0)
             Right sum = nums[1] + nums[2] = 1 + -1 = 0

Constraints:
* 1 <= nums.length <= 10^4
* -1000 <= nums[i] <= 1000

Note: This question is the same as 1991:
      https://leetcode.com/problems/find-the-middle-index-in-array/
=end

def pivot_index(nums)
    total = nums.sum
    prefix = 0
    nums.each_with_index do |x, i|
        return i if 2*prefix + x == total
        prefix += x
    end
    -1
end


=begin
733. Flood Fill (Easy)
You are given an image represented by an m x n grid of integers image, where
image[i][j] represents the pixel value of the image. You are also given three
integers sr, sc, and color. Your task is to perform a flood fill on the image
starting from the pixel image[sr][sc]. To perform a flood fill:
* Begin with the starting pixel and change its color to color.
* Perform the same process for each pixel that is directly adjacent (pixels
  that share a side with the original pixel, either horizontally or vertically)
  and shares the same color as the starting pixel.
* Keep repeating this process by checking neighboring pixels of the updated
  pixels and modifying their color if it matches the original color of the
  starting pixel.
* The process stops when there are no more adjacent pixels of the original
  color to update.
Return the modified image after performing the flood fill.

Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1)
             (i.e., the red pixel), all pixels connected by a path of the same
             color as the starting pixel (i.e., the blue pixels) are colored
             with the new color. Note the bottom corner is not colored 2,
             because it is not horizontally or vertically connected to the
             starting pixel.

Example 2:
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored with 0, which is the same as
             the target color. Therefore, no changes are made to the image.

Constraints:
* m == image.length
* n == image[i].length
* 1 <= m, n <= 50
* 0 <= image[i][j], color < 2^16
* 0 <= sr < m
* 0 <= sc < n
=end

def flood_fill(image, sr, sc, color)
    m, n = image.size, image[0].size
    pixel = image[sr][sc]
    if pixel != color
        image[sr][sc] = color
        stack = [[sr, sc]]
        while stack.any?
            i, j = stack.pop
            [[i-1, j], [i, j-1], [i, j+1], [i+1, j]].each do |ii, jj|
                if 0 <= ii && ii < m && 0 <= jj && jj < n && image[ii][jj] == pixel
                    stack << [ii, jj]
                    image[ii][jj] = color
                end
            end
        end
    end
    image
end
