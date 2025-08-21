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
    freq = nums1.inject(Hash.new(0)) { |f, x| f[x] += 1; f }
    ans = []
    nums2.each do |x|
        if freq[x] > 0
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
