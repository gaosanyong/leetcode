/*1. Two Sum (Easy)
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
* Only one valid answer exists.*/

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, x := range nums {
        j, found := seen[target-x]
        if found {
            return []int{j, i}
        }
        seen[x] = i
    }
    return []int{}
}


/*9. Palindrome Number (Easy)
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

Follow up: Could you solve it without converting the integer to a string?*/

func isPalindrome(x int) bool {
    r := 0
    for xx := x; xx > 0; xx /= 10 {
        r = 10*r + xx % 10
    }
    return x == r
}


/*13. Roman to Integer (Easy)
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
* It is guaranteed that s is a valid roman numeral in the range [1, 3999].*/

func romanToInt(s string) int {
    symbol := map[rune]int {
        'I' : 1,
        'V' : 5,
        'X' : 10,
        'L' : 50,
        'C' : 100,
        'D' : 500,
        'M' : 1000,
    }
    ans := 0
    for i, ch := range s {
        if i+1 < len(s) && symbol[ch] < symbol[rune(s[i+1])] {
            ans -= symbol[ch]
        } else {
            ans += symbol[ch]
        }
    }
    return ans
}


/*14. Longest Common Prefix (Easy)
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
* strs[i] consists of only lowercase English letters if it is non-empty.*/

func longestCommonPrefix(strs []string) string {
    for j, _ := range strs[0] {
        for i := 1; i < len(strs); i++ {
            if j == len(strs[i]) || strs[0][j] != strs[i][j] {
                return strs[0][:j]
            }
        }
    }
    return strs[0]
}


/*20. Valid Parentheses (Easy)
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

Constraints:
* 1 <= s.length <= 10^4
* s consists of parentheses only '()[]{}'.*/

func isValid(s string) bool {
    pair := map[rune]rune {
        ')' : '(',
        ']' : '[',
        '}' : '{',
    }
    stack := []rune{}
    for _, ch := range s {
        if strings.ContainsRune("([{", ch) {
            stack = append(stack, ch)
        } else {
            sz := len(stack)
            if sz == 0 || stack[sz-1] != pair[ch] {
                return false
            }
            stack = stack[:sz-1]
        }
    }
    return len(stack) == 0
}


/*21. Merge Two Sorted Lists (Easy)
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
* Both list1 and list2 are sorted in non-decreasing order.*/

func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    for node := dummy; list1 != nil || list2 != nil; node = node.Next {
        if list1 == nil || list2 != nil && list1.Val >= list2.Val {
            node.Next = list2
            list2 = list2.Next
        } else {
            node.Next = list1
            list1 = list1.Next
        }
    }
    return dummy.Next
}


/*26. Remove Duplicates from Sorted Array (Easy)
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
* nums is sorted in non-decreasing order.*/

func removeDuplicates(nums []int) int {
    k := 0
    for i, x := range nums {
        if i == 0 || nums[i-1] < x {
            nums[k] = x
            k++
        }
    }
    return k
}


/*27. Remove Element (Easy)
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
* 0 <= val <= 100*/

func removeElement(nums []int, val int) int {
    k := 0
    for _, x := range nums {
        if x != val {
            nums[k] = x
            k++
        }
    }
    return k
}


/*28. Find the Index of the First Occurrence in a String (Easy)
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
* haystack and needle consist of only lowercase English characters.*/

func strStr(haystack string, needle string) int {
    return strings.Index(haystack, needle)
}


/*35. Search Insert Position (Easy)
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
* -10^4 <= target <= 10^4*/

func searchInsert(nums []int, target int) int {
    k, _ := slices.BinarySearch(nums, target)
    return k
}


/*58. Length of Last Word (Easy)
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
* There will be at least one word in s.*/

func lengthOfLastWord(s string) int {
    words := strings.Fields(s)
    return len(words[len(words)-1])
}


/*66. Plus One (Easy)
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
* digits does not contain any leading 0's.*/

func plusOne(digits []int) []int {
    carry := 1
    for i := len(digits)-1; i >= 0 && carry == 1; i-- {
        carry += digits[i]
        digits[i] = carry % 10
        carry /= 10
    }
    if (carry == 1) {
        digits = append([]int{1}, digits...)
    }
    return digits
}


/*70. Climbing Stairs (Easy)
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

Constraints: 1 <= n <= 45*/

func climbStairs(n int) int {
    f0, f1 := 0, 1
    for ; n > 0; n-- {
        f0, f1 = f1, f0+f1
    }
    return f1
}


/*83. Remove Duplicates from Sorted List (Easy)
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
* The list is guaranteed to be sorted in ascending order.*/

func deleteDuplicates(head *ListNode) *ListNode {
    node := head
    for node != nil && node.Next != nil {
        if node.Val == node.Next.Val {
            node.Next = node.Next.Next
        } else {
            node = node.Next
        }
    }
    return head
}


/*88. Merge Sorted Array (Easy)
You are given two integer arrays nums1 and nums2, sorted in non-decreasing
order, and two integers m and n, representing the number of elements in nums1
and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-
decreasing order. The final sorted array should not be returned by the function,
but instead be stored inside the array nums1. To accommodate this, nums1 has a
length of m + n, where the first m elements denote the elements that should be
merged, and the last n elements are set to 0 and should be ignored. nums2 has a
length of n.

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

Follow up: Can you come up with an algorithm that runs in O(m + n) time?*/

func merge(nums1 []int, m int, nums2 []int, n int)  {
    for i, j := m-1, n-1; j >= 0; {
        if i >= 0 && nums1[i] > nums2[j] {
            nums1[i+j+1] = nums1[i]
            i--
        } else {
            nums1[i+j+1] = nums2[j]
            j--
        }
    }
}


/*94. Binary Tree Inorder Traversal (Easy)
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

Follow up: Recursive solution is trivial, could you do it iteratively?*/

func inorderTraversal(root *TreeNode) []int {
    ans := []int{}
    stack := []*TreeNode{}
    node := root
    for node != nil || len(stack) > 0 {
        if node != nil {
            stack = append(stack, node)
            node = node.Left
        } else {
            sz := len(stack)
            node = stack[sz-1]
            stack = stack[:sz-1]
            ans = append(ans, node.Val)
            node = node.Right
        }
    }
    return ans
}


/*100. Same Tree (Easy)
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
* -10^4 <= Node.val <= 10^4*/

func isSameTree(p *TreeNode, q *TreeNode) bool {
    if p == nil && q == nil {
        return true
    } else if (p == nil || q == nil) {
        return false
    } else {
        return p.Val == q.Val && isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
    }
}


/*101. Symmetric Tree (Easy)
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

Follow up: Could you solve it both recursively and iteratively?*/

func isSymmetric(root *TreeNode) bool {
    var check func(left, right *TreeNode) bool

    check = func(left, right *TreeNode) bool {
        if left == nil || right == nil {
            return left == right
        } else {
            return left.Val == right.Val && check(left.Left, right.Right) && check(left.Right, right.Left)
        }
    }

    return check(root.Left, root.Right)
}


/*104. Maximum Depth of Binary Tree (Easy)
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
* -100 <= Node.val <= 100*/

func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return 1 + max(maxDepth(root.Left), maxDepth(root.Right))
}


/*108. Convert Sorted Array to Binary Search Tree (Easy)
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
* nums is sorted in a strictly increasing order.*/

func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }
    mid := len(nums)/2
    return &TreeNode{nums[mid], sortedArrayToBST(nums[:mid]), sortedArrayToBST(nums[mid+1:])}
}


/*110. Balanced Binary Tree (Easy)
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
* -10^4 <= Node.val <= 10^4*/

func isBalanced(root *TreeNode) bool {
    var calc func(node *TreeNode) int

    calc = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        left := calc(node.Left)
        right := calc(node.Right)
        if left == -1 || right == -1 || math.Abs(float64(left-right)) > 1 {
            return -1
        }
        return 1 + max(left, right)
    }

    return calc(root) != -1
}


/*111. Minimum Depth of Binary Tree (Easy)
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
* -1000 <= Node.val <= 1000*/

func minDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    left, right := minDepth(root.Left), minDepth(root.Right)
    if left == 0 || right == 0 {
        return 1 + left + right
    } else {
        return 1 + min(left, right)
    }
}


/*112. Path Sum (Easy)
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
* -1000 <= targetSum <= 1000*/

func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil {
        return false
    }
    if root.Left == nil && root.Right == nil {
        return targetSum == root.Val
    }
    return hasPathSum(root.Left, targetSum-root.Val) || hasPathSum(root.Right, targetSum-root.Val)
}


/*118. Pascal's Triangle (Easy)
Given an integer numRows, return the first numRows of Pascal's triangle. In
Pascal's triangle, each number is the sum of the two numbers directly above it
as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]

Constraints: 1 <= numRows <= 30*/

func generate(numRows int) [][]int {
    ans := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        ans[i] = make([]int, i+1)
        ans[i][0] = 1
        ans[i][i] = 1
        for j := 1; j < i; j++ {
            ans[i][j] = ans[i-1][j-1] + ans[i-1][j]
        }
    }
    return ans
}


/*119. Pascal's Triangle II (Easy)
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

Follow up: Could you optimize your algorithm to use only O(rowIndex) extra space?*/

func getRow(rowIndex int) []int {
    ans := make([]int, rowIndex+1)
    ans[0] = 1
    for i := 1; i <= rowIndex; i++ {
        ans[i] = ans[i-1] * (rowIndex-i+1) / i
    }
    return ans
}


/*121. Best Time to Buy and Sell Stock (Easy)
You are given an array prices where prices[i] is the price of a given stock on
the ith day. You want to maximize your profit by choosing a single day to buy
one stock and choosing a different day in the future to sell that stock. Return
the maximum profit you can achieve from this transaction. If you cannot achieve
any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6),
             profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is
             not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
* 1 <= prices.length <= 10^5
* 0 <= prices[i] <= 10^4*/

func maxProfit(prices []int) int {
    ans := 0
    val := 0
    for i := 1; i < len(prices); i++ {
        val = max(0, val + prices[i] - prices[i-1])
        ans = max(ans, val)
    }
    return ans
}


/*125. Valid Palindrome (Easy)
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
* 1 <= s.length <= 2 * 10^5
* s consists only of printable ASCII characters.*/

func isPalindrome(s string) bool {
    s = strings.Map(func(ch rune) rune {
        if unicode.IsLetter(ch) || unicode.IsNumber(ch) {
            return unicode.ToLower(ch)
        }
        return -1
    }, s)
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        if (s[i] != s[j]) {
            return false
        }
    }
    return true
}


/*136. Single Number (Easy)
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
* -3 * 10^4 <= nums[i] <= 3 * 10^4
* Each element in the array appears twice except for one element which appears
  only once.*/

func singleNumber(nums []int) int {
    ans := 0
    for _, x := range nums {
        ans ^= x
    }
    return ans
}


/*141. Linked List Cycle (Easy)
Given head, the head of a linked list, determine if the linked list has a cycle
in it. There is a cycle in a linked list if there is some node in the list that
can be reached again by continuously following the next pointer. Internally, pos
is used to denote the index of the node that tail's next pointer is connected
to. Note that pos is not passed as a parameter. Return true if there is a cycle
in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the
             1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
* The number of the nodes in the list is in the range [0, 10^4].
* -10^5 <= Node.val <= 10^5
* pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?*/

func hasCycle(head *ListNode) bool {
    fast := head
    slow := head
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
        if fast == slow {
            return true
        }
    }
    return false
}


/*144. Binary Tree Preorder Traversal (Easy)
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

Follow up: Recursive solution is trivial, could you do it iteratively?*/

func preorderTraversal(root *TreeNode) []int {
    ans := []int{}
    if root != nil {
        stack := []*TreeNode{root}
        for len(stack) > 0 {
            sz := len(stack)
            node := stack[sz-1]
            stack = stack[:sz-1]
            ans = append(ans, node.Val)
            if node.Right != nil { stack = append(stack, node.Right) }
            if node.Left != nil {stack = append(stack, node.Left) }
        }
    }
    return ans
}


/*145. Binary Tree Postorder Traversal (Easy)
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

Follow up: Recursive solution is trivial, could you do it iteratively?*/

func postorderTraversal(root *TreeNode) []int {
    ans := []int{}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node != nil {
            dfs(node.Left)
            dfs(node.Right)
            ans = append(ans, node.Val)
        }
    }

    dfs(root)
    return ans
}


/*160. Intersection of Two Linked Lists (Easy)
Given the heads of two singly linked-lists headA and headB, return the node at
which the two lists intersect. If the two linked lists have no intersection at
all, return null. For example, the following two linked lists begin to intersect
at node c1:
The test cases are generated such that there are no cycles anywhere in the
entire linked structure. Note that the linked lists must retain their original
structure after the function returns.

Custom Judge:
The inputs to the judge are given as follows (your program is not given these
inputs):
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
             must be 0, while skipA and skipB can be arbitrary values.
             Explanation: The two lists do not intersect, so return null.

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
           O(1) memory?*/

func getIntersectionNode(headA, headB *ListNode) *ListNode {
    nodeA, nodeB := headA, headB
    for nodeA != nodeB {
        if nodeA == nil {
            nodeA = headB
        } else {
            nodeA = nodeA.Next
        }
        if nodeB == nil {
            nodeB = headA
        } else {
            nodeB = nodeB.Next
        }
    }
    return nodeA
}


/*168. Excel Sheet Column Title (Easy)
Given an integer columnNumber, return its corresponding column title as it
appears in an Excel sheet. For example:
    A -> 1
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

Constraints: 1 <= columnNumber <= 2^31 - 1*/

func convertToTitle(columnNumber int) string {
    ans := []byte{}
    for columnNumber > 0 {
        columnNumber--
        ans = append(ans, byte(columnNumber%26 + 'A'))
        columnNumber /= 26
    }
    for i, j := 0, len(ans)-1; i < j; i, j = i+1, j-1 {
        ans[i], ans[j] = ans[j], ans[i]
    }
    return string(ans)
}
