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


/*169. Majority Element (Easy)
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

Follow-up: Could you solve the problem in linear time and in O(1) space?*/

func majorityElement(nums []int) int {
    cand := 0
    vote := 0
    for _, x := range nums {
        if vote == 0 || cand == x{
            vote++
            cand = x
        } else {
            vote--
        }
    }
    return cand
}


/*171. Excel Sheet Column Number (Easy)
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
* columnTitle is in the range ["A", "FXSHRXW"].*/

func titleToNumber(columnTitle string) int {
    ans := 0
    for _, ch := range columnTitle {
        ans = 26*ans + int(ch-'A') + 1
    }
    return ans
}


/*190. Reverse Bits (Easy)
Reverse bits of a given 32 bits unsigned integer.

Note:
* Note that in some languages, such as Java, there is no unsigned integer type.
  In this case, both input and output will be given as a signed integer type.
  They should not affect your implementation, as the integer's internal binary
  representation is the same, whether it is signed or unsigned.
* In Java, the compiler represents the signed integers using 2's complement
  notation. Therefore, in Example 2 above, the input represents the signed
  integer -3 and the output represents the signed integer -1073741825.

Example 1:
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents
             the unsigned integer 43261596, so return 964176192 which its binary
             representation is 00111001011110000010100101000000.
Example 2:
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents
             the unsigned integer 4294967293, so return 3221225471 which its
             binary representation is 10111111111111111111111111111111.

Constraints: The input must be a binary string of length 32

Follow up: If this function is called many times, how would you optimize it?*/

func reverseBits(num uint32) uint32 {
    var ans uint32
    for i := 0; i < 32; i++ {
        ans = ans<<1 + num & 1
        num >>= 1
    }
    return ans
}


/*191. Number of 1 Bits (Easy)
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

Follow up: If this function is called many times, how would you optimize it?*/

func hammingWeight(n int) int {
    return bits.OnesCount(uint(n))
}


/*202. Happy Number (Easy)
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

Constraints: 1 <= n <= 2^31 - 1*/

func isHappy(n int) bool {
    calc := func(n int) int {
        ans := 0
        for ; n > 0; n /= 10 {
            ans += (n % 10) * (n % 10)
        }
        return ans
    }
    for f, s := n, n; f != 1 && calc(f) != 1; {
        f = calc(calc(f))
        s = calc(s)
        if f == s {
            return false
        }
    }
    return true
}


/*203. Remove Linked List Elements (Easy)
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
* 0 <= val <= 50*/

func removeElements(head *ListNode, val int) *ListNode {
    dummy := &ListNode{0, head}
    for node := dummy; node.Next != nil;  {
        if node.Next.Val == val {
            node.Next = node.Next.Next
        } else {
            node = node.Next
        }
    }
    return dummy.Next
}


/*205. Isomorphic Strings (Easy)
Given two strings s and t, determine if they are isomorphic. Two strings s and t
are isomorphic if the characters in s can be replaced to get t. All occurrences
of a character must be replaced with another character while preserving the
order of characters. No two characters may map to the same character, but a
character may map to itself.

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
* 1 <= s.length <= 5 * 10^4
* t.length == s.length
* s and t consist of any valid ascii character.*/

func isIsomorphic(s string, t string) bool {
    si := map[byte]int{}
    ti := map[byte]int{}
    for i := range s {
        if si[s[i]] != ti[t[i]] {
            return false
        }
        si[s[i]] = i+1
        ti[t[i]] = i+1
    }
    return true
}


/*206. Reverse Linked List (Easy)
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
           Could you implement both?*/

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for curr := head; curr != nil; {
        next := curr.Next
        curr.Next = prev
        prev, curr = curr, next
    }
    return prev
}


/*217. Contains Duplicate (Easy)
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
* -10^9 <= nums[i] <= 10^9*/

func containsDuplicate(nums []int) bool {
    seen := map[int]struct{}{}
    for _, x := range nums {
        if _, ok := seen[x]; ok {
            return true
        }
        seen[x] = struct{}{}
    }
    return false
}


/*219. Contains Duplicate II (Easy)
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
* 0 <= k <= 10^5*/

func containsNearbyDuplicate(nums []int, k int) bool {
    seen := map[int]int{}
    for i, x := range nums {
        if j, ok := seen[x]; ok && i-j <= k {
            return true
        }
        seen[x] = i
    }
    return false
}


/*222. Count Complete Tree Nodes (Easy)
Given the root of a complete binary tree, return the number of the nodes in the
tree. According to Wikipedia, every level, except possibly the last, is
completely filled in a complete binary tree, and all nodes in the last level are
as far left as possible. It can have between 1 and 2h nodes inclusive at the
last level h. Design an algorithm that runs in less than O(n) time complexity.

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
* The tree is guaranteed to be complete.*/

func countNodes(root *TreeNode) int {
    ht := func(node *TreeNode) int {
        ans := 0
        for ; node != nil; node = node.Left {
            ans++
        }
        return ans
    }

    var fn func(node *TreeNode) int
    fn = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        h := ht(node.Left)
        if h == ht(node.Right) {
            return 1<<h + fn(node.Right)
        } else {
            return 1<<(h-1) + fn(node.Left)
        }
    }

    return fn(root)
}


/*225. Implement Stack using Queues (Easy)
Implement a last-in-first-out (LIFO) stack using only two queues. The
implemented stack should support all the functions of a normal stack (push, top,
pop, and empty). Implement the MyStack class:
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
Input: ["MyStack", "push", "push", "top", "pop", "empty"]
       [[], [1], [2], [], [], []]
Output: [null, null, null, 2, 2, false]
Explanation: MyStack myStack = new MyStack();
             myStack.push(1);
             myStack.push(2);
             myStack.top(); // return 2
             myStack.pop(); // return 2
             myStack.empty(); // return False

Constraints:
* 1 <= x <= 9
* At most 100 calls will be made to push, pop, top, and empty.
* All the calls to pop and top are valid.

Follow-up: Can you implement the stack using only one queue?*/

type MyStack struct {
    queue []int
}


func Constructor() MyStack {
    return MyStack{
        queue : []int{},
    }
}


func (this *MyStack) Push(x int)  {
    this.queue = append([]int{x}, this.queue...)
}


func (this *MyStack) Pop() int {
    ans := this.queue[0]
    this.queue = this.queue[1:]
    return ans
}


func (this *MyStack) Top() int {
    return this.queue[0]
}


func (this *MyStack) Empty() bool {
    return len(this.queue) == 0
}


/*226. Invert Binary Tree (Easy)
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
* -100 <= Node.val <= 100*/

func invertTree(root *TreeNode) *TreeNode {
    if root != nil {
        root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
    }
    return root
}


/*228. Summary Ranges (Easy)
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
* nums is sorted in ascending order.*/

func summaryRanges(nums []int) []string {
    ans := []string{}
    lo := 0
    for i, x := range nums {
        if i == 0 || nums[i-1]+1 < x {
            lo = x
        }
        if i+1 == len(nums) || x+1 < nums[i+1] {
            if lo == x {
                ans = append(ans, strconv.Itoa(lo))
            } else {
                ans = append(ans, fmt.Sprintf("%d->%d", lo, x))
            }
        }
    }
    return ans
}


/*231. Power of Two (Easy)
Given an integer n, return true if it is a power of two. Otherwise, return
false. An integer n is a power of two, if there exists an integer x such that
n == 2^x.

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

Follow up: Could you solve it without loops/recursion?*/

func isPowerOfTwo(n int) bool {
    return n > 0 && n&(n-1) == 0
}


/*232. Implement Queue using Stacks (Easy)
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
           longer.*/

type MyQueue struct {
    sin []int
    sout []int
}


func Constructor() MyQueue {
    return MyQueue{
        sin: []int{},
        sout: []int{},
    }
}


func (this *MyQueue) Push(x int) {
    this.sin = append(this.sin, x)
}


func (this *MyQueue) Move() {
    for sz := len(this.sin); sz > 0; sz-- {
        this.sout = append(this.sout, this.sin[sz-1])
        this.sin = this.sin[:sz-1]
    }
}

func (this *MyQueue) Pop() int {
    if len(this.sout) == 0 {
        this.Move()
    }
    sz := len(this.sout)
    elem := this.sout[sz-1]
    this.sout = this.sout[:sz-1]
    return elem
}


func (this *MyQueue) Peek() int {
    if len(this.sout) == 0 {
        this.Move()
    }
    sz := len(this.sout)
    return this.sout[sz-1]
}


func (this *MyQueue) Empty() bool {
    return len(this.sin) == 0 && len(this.sout) == 0
}


/*234. Palindrome Linked List (Easy)
Given the head of a singly linked list, return true if it is a palindrome or
false otherwise.

Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Constraints:
* The number of nodes in the list is in the range [1, 10^5].
* 0 <= Node.val <= 9

Follow up: Could you do it in O(n) time and O(1) space?*/

func isPalindrome(head *ListNode) bool {
    fast := head
    slow := head
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    var prev *ListNode = nil
    for slow != nil {
        prev, slow.Next, slow = slow, prev, slow.Next
    }
    for head != nil && prev != nil {
        if head.Val != prev.Val {
            return false
        }
        head = head.Next
        prev = prev.Next
    }
    return true
}


/*242. Valid Anagram (Easy)
Given two strings s and t, return true if t is an anagram of s, and false
otherwise.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
* 1 <= s.length, t.length <= 5 * 10^4
* s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt
           your solution to such a case?*/

func isAnagram(s string, t string) bool {
    freq := map[rune]int{}
    for _, ch := range s {
        freq[ch]++
    }
    for _, ch := range t {
        freq[ch]--
    }
    for _, v := range freq {
        if v != 0 {
            return false
        }
    }
    return true
}


/*257. Binary Tree Paths (Easy)
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
* -100 <= Node.val <= 100*/

func binaryTreePaths(root *TreeNode) []string {
    ans := []string{}
    vals := []int{}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        vals = append(vals, node.Val)
        if node.Left == nil && node.Right == nil {
            elem := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(vals)), "->"), "[]")
            ans = append(ans, elem)
        } else {
            if node.Left != nil {
                dfs(node.Left)
            }
            if node.Right != nil {
                dfs(node.Right)
            }
        }
        vals = vals[:len(vals)-1]
    }

    dfs(root)
    return ans
}


/*258. Add Digits (Easy)
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

Follow up: Could you do it without any loop/recursion in O(1) runtime?*/

func addDigits(num int) int {
    return (num-1) % 9 + 1
}


/*263. Ugly Number (Easy)
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

Constraints: -2^31 <= n <= 2^31 - 1*/

func isUgly(n int) bool {
    if n <= 0 {
        return false
    }
    for _, p := range []int{2, 3, 5} {
        for n % p == 0 {
            n /= p
        }
    }
    return n == 1
}


/*268. Missing Number (Easy)
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

Follow up: Could you implement a solution using only O(1) extra space complexity
           and O(n) runtime complexity?*/

func missingNumber(nums []int) int {
    m := 0
    for i, x := range nums {
        m ^= x
        m ^= i+1
    }
    return m
}


/*278. First Bad Version (Easy)
You are a product manager and currently leading a team to develop a new product.
Unfortunately, the latest version of your product fails the quality check. Since
each version is developed based on the previous version, all the versions after
a bad version are also bad. Suppose you have n versions [1, 2, ..., n] and you
want to find out the first bad one, which causes all the following ones to be
bad. You are given an API bool isBadVersion(version) which returns whether
version is bad. Implement a function to find the first bad version. You should
minimize the number of calls to the API.

Example 1:
Input: n = 5, bad = 4
Output: 4
Explanation: - call isBadVersion(3) -> false
             - call isBadVersion(5) -> true
             - call isBadVersion(4) -> true
             Then 4 is the first bad version.

Example 2:
Input: n = 1, bad = 1
Output: 1

Constraints: 1 <= bad <= n <= 2^31 - 1*/

func firstBadVersion(n int) int {
    lo, hi := 1, n
    for lo < hi {
        mid := (lo + hi)/2
        if isBadVersion(mid) {
            hi = mid
        } else {
            lo = mid+1
        }
    }
    return lo
}


/*283. Move Zeroes (Easy)
Given an integer array nums, move all 0's to the end of it while maintaining the
relative order of the non-zero elements. Note that you must do this in-place
without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
* 1 <= nums.length <= 10^4
* -2^31 <= nums[i] <= 2^31 - 1

Follow up: Could you minimize the total number of operations done?*/

func moveZeroes(nums []int)  {
    k := 0
    for i, x := range nums {
        if x != 0 {
            nums[k], nums[i] = nums[i], nums[k]
            k++
        }
    }
}


/*290. Word Pattern (Easy)
Given a pattern and a string s, find if s follows the same pattern. Here follow
means a full match, such that there is a bijection between a letter in pattern
and a non-empty word in s. Specifically:
* Each letter in pattern maps to exactly one unique word in s.
* Each unique word in s maps to exactly one letter in pattern.
* No two letters map to the same word, and no two words map to the same letter.

Example 1:
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Explanation: The bijection can be established as:
             - 'a' maps to "dog".
             - 'b' maps to "cat".

Example 2:
Input: pattern = "abba", s = "dog cat cat fish"
Output: false

Example 3:
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false

Constraints:
* 1 <= pattern.length <= 300
* pattern contains only lower-case English letters.
* 1 <= s.length <= 3000
* s contains only lowercase English letters and spaces ' '.
* s does not contain any leading or trailing spaces.
* All the words in s are separated by a single space.*/

func wordPattern(pattern string, s string) bool {
    words := strings.Split(s, " ")
    if len(pattern) != len(words) {
        return false
    }
    pi := map[rune]int{}
    wi := map[string]int{}
    for i, ch := range pattern {
        if pi[ch] != wi[words[i]] {
            return false
        }
        pi[ch] = i+1
        wi[words[i]] = i+1
    }
    return true
}


/*292. Nim Game (Easy)
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
             2. You remove 2 stones. Your friend removes 2 stones, including the
                last stone. Your friend wins.
             3. You remove 3 stones. Your friend removes the last stone. Your
                friend wins.
             In all outcomes, your friend wins.

Example 2:
Input: n = 1
Output: true

Example 3:
Input: n = 2
Output: true

Constraints: 1 <= n <= 2^31 - 1*/

func canWinNim(n int) bool {
    return n % 4 != 0
}


/*303. Range Sum Query - Immutable (Easy)
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
Explanation: - NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
             - numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
             - numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
             - numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1)
               = -3

Constraints:
* 1 <= nums.length <= 10^4
* -10^5 <= nums[i] <= 10^5
* 0 <= left <= right < nums.length
* At most 10^4 calls will be made to sumRange.*/

type NumArray struct {
    prefix []int
}


func Constructor(nums []int) NumArray {
    n := len(nums)
    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + nums[i]
    }
    return NumArray{
        prefix : prefix,
    }
}


func (this *NumArray) SumRange(left int, right int) int {
    return this.prefix[right+1] - this.prefix[left]
}


/*326. Power of Three (Easy)
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

Follow up: Could you solve it without loops/recursion?*/

func isPowerOfThree(n int) bool {
    return n > 0 && 1162261467 % n == 0
}


/*338. Counting Bits (Easy)
Given an integer n, return an array ans of length n + 1 such that for each i
(0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

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
  __builtin_popcount in C++)?*/

func countBits(n int) []int {
    ans := make([]int, n+1)
    for x := 0; x <= n; x++ {
        ans[x] = ans[x >> 1] + x&1
    }
    return ans
}


/*342. Power of Four (Easy)
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

Follow up: Could you solve it without loops/recursion?*/

func isPowerOfFour(n int) bool {
    return n > 0 && n&(n-1) == 0 && (n-1) % 3 == 0
}


/*344. Reverse String (Easy)
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
* s[i] is a printable ascii character.*/

func reverseString(s []byte)  {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}


/*345. Reverse Vowels of a String (Easy)
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
* s consist of printable ASCII characters.*/

func reverseVowels(s string) string {
    runes := []rune(s)
    vowel := "aeiouAEIOU"
    for i, j := 0, len(runes)-1; i < j; {
        if !strings.ContainsRune(vowel, runes[i]) {
            i++
        } else if !strings.ContainsRune(vowel, runes[j]) {
            j--
        } else {
            runes[i], runes[j] = runes[j], runes[i]
            i++
            j--
        }
    }
    return string(runes)
}


/*349. Intersection of Two Arrays (Easy)
Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must be unique and you may return the result in any
order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.

Constraints:
* 1 <= nums1.length, nums2.length <= 1000
* 0 <= nums1[i], nums2[i] <= 1000*/

func intersection(nums1 []int, nums2 []int) []int {
    seen := map[int]bool{}
    for _, x := range nums1 {
        seen[x] = true
    }
    ans := []int{}
    for _, x := range nums2 {
        if seen[x] {
            ans = append(ans, x)
            seen[x] = false
        }
    }
    return ans
}


/*350. Intersection of Two Arrays II (Easy)
Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must appear as many times as it shows in both arrays
and you may return the result in any order.

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
  that you cannot load all elements into the memory at once?*/

func intersect(nums1 []int, nums2 []int) []int {
    freq := map[int]int{}
    for _, x := range nums1 {
        freq[x]++
    }
    ans := []int{}
    for _, x := range nums2 {
        if freq[x] > 0 {
            ans = append(ans, x)
            freq[x]--
        }
    }
    return ans
}


/*367. Valid Perfect Square (Easy)
Given a positive integer num, return true if num is a perfect square or false
otherwise. A perfect square is an integer that is the square of an integer. In
other words, it is the product of some integer with itself. You must not use any
built-in library function, such as sqrt.

Example 1:
Input: num = 16
Output: true
Explanation: We return true because 4 * 4 = 16 and 4 is an integer.

Example 2:
Input: num = 14
Output: false
Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an
             integer.

Constraints: 1 <= num <= 2^31 - 1*/

func isPerfectSquare(num int) bool {
    x := max(1, num-1)
    for x > num/x {
        x = (x + num/x)/2
    }
    return x * x == num
}


/*374. Guess Number Higher or Lower (Easy)
We are playing the Guess Game. The game is as follows: I pick a number from 1 to
n. You have to guess which number I picked. Every time you guess wrong, I will
tell you whether the number I picked is higher or lower than your guess. You
call a pre-defined API int guess(int num), which returns three possible results:
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
* 1 <= pick <= n*/

func guessNumber(n int) int {
    lo, hi := 1, n
    for lo <= hi {
        mid := (lo+hi) / 2
        switch guess(mid) {
        case -1: hi = mid-1
        case 1: lo = mid+1
        default: return mid
        }
    }
    return lo
}


/*383. Ransom Note (Easy)
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
* ransomNote and magazine consist of lowercase English letters.*/

func canConstruct(ransomNote string, magazine string) bool {
    freq := make([]int, 26)
    for _, ch := range magazine {
        freq[ch - 'a']++
    }
    for _, ch := range ransomNote {
        freq[ch - 'a']--
        if freq[ch - 'a'] < 0 {
            return false
        }
    }
    return true
}


/*387. First Unique Character in a String (Easy)
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
* s consists of only lowercase English letters.*/

func firstUniqChar(s string) int {
    freq := make([]int, 26)
    for _, ch := range s {
        freq[ch - 'a']++
    }
    for i, ch := range s {
        if freq[ch - 'a'] == 1 {
            return i
        }
    }
    return -1
}


/*389. Find the Difference (Easy)
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
* s and t consist of lowercase English letters.*/

func findTheDifference(s string, t string) byte {
    ans := byte(0)
    for _, ch := range s {
        ans -= byte(ch)
    }
    for _, ch := range t {
        ans += byte(ch)
    }
    return ans
}


/*392. Is Subsequence (Easy)
Given two strings s and t, return true if s is a subsequence of t, or false
otherwise. A subsequence of a string is a new string that is formed from the
original string by deleting some (can be none) of the characters without
disturbing the relative positions of the remaining characters. (i.e., "ace" is a
subsequence of "abcde" while "aec" is not).

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
           subsequence. In this scenario, how would you change your code?*/

func isSubsequence(s string, t string) bool {
    i := 0
    for j := 0; i < len(s) && j < len(t); j++ {
        if s[i] == t[j] {
            i++
        }
    }
    return i == len(s)
}


/*401. Binary Watch (Easy)
A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs
on the bottom to represent the minutes (0-59). Each LED represents a zero or
one, with the least significant bit on the right.
* For example, the below binary watch reads "4:51".
Given an integer turnedOn which represents the number of LEDs that are currently
on (ignoring the PM), return all possible times the watch could represent. You
may return the answer in any order. The hour must not contain a leading zero.
* For example, "01:00" is not valid. It should be "1:00".
The minute must consist of two digits and may contain a leading zero.
* For example, "10:2" is not valid. It should be "10:02".
Example 1:
Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]

Example 2:
Input: turnedOn = 9
Output: []

Constraints: 0 <= turnedOn <= 10*/

func readBinaryWatch(turnedOn int) []string {
    ans := []string{}
    for h := 0; h < 12; h++ {
        hc := bits.OnesCount(uint(h))
        for m := 0; m < 60; m++ {
            mc := bits.OnesCount(uint(m))
            if hc + mc == turnedOn {
                ans = append(ans, fmt.Sprintf("%d:%02d", h, m))
            }
        }
    }
    return ans
}


/*404. Sum of Left Leaves (Easy)
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
* -1000 <= Node.val <= 1000*/

func sumOfLeftLeaves(root *TreeNode) int {
    var dfs func(node *TreeNode, left bool) int
    dfs = func(node *TreeNode, left bool) int {
        if left && node.Left == nil && node.Right == nil {
            return node.Val
        }
        ans := 0
        if node.Left != nil {
            ans += dfs(node.Left, true)
        }
        if node.Right != nil {
            ans += dfs(node.Right, false)
        }
        return ans
    }

    return dfs(root, false)
}


/*405. Convert a Number to Hexadecimal (Easy)
Given a 32-bit integer num, return a string representing its hexadecimal
representation. For negative integers, two’s complement method is used. All the
letters in the answer string should be lowercase characters, and there should
not be any leading zeros in the answer except for the zero itself. Note: You are
not allowed to use any built-in library method to directly solve this problem.

Example 1:
Input: num = 26
Output: "1a"

Example 2:
Input: num = -1
Output: "ffffffff"

Constraints: -2^31 <= num <= 2^31 - 1*/

func toHex(num int) string {
    if num == 0 {
        return "0"
    }
    if num < 0 {
        num += 0xffffffff + 1
    }
    ans := []byte{}
    digits := "0123456789abcdef"
    for ; num > 0; num /= 16 {
        ans = append(ans, digits[num%16])
    }
    slices.Reverse(ans)
    return string(ans)
}


/*409. Longest Palindrome (Easy)
Given a string s which consists of lowercase or uppercase letters, return the
length of the longest palindrome that can be built with those letters. Letters
are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length
             is 7.

Example 2:
Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.

Constraints:
* 1 <= s.length <= 2000
* s consists of lowercase and/or uppercase English letters only.*/

func longestPalindrome(s string) int {
    freq := map[rune]int{}
    for _, ch := range s {
        freq[ch]++
    }
    ans := 0
    for _, x := range freq {
        ans += x/2*2
        if ans & 1 == 0 && x & 1 == 1 {
            ans++
        }
    }
    return ans
}


/*412. Fizz Buzz (Easy)
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

Constraints: 1 <= n <= 10^4*/

func fizzBuzz(n int) []string {
    ans := []string{}
    for x := 1; x <= n; x++ {
        var elem string
        // naked switch
        switch {
        case x % 3 == 0 && x % 5 == 0:
            elem = "FizzBuzz"
        case x % 3 == 0:
            elem = "Fizz"
        case x % 5 == 0:
            elem = "Buzz"
        default:
            elem = strconv.Itoa(x)
        }
        ans = append(ans, elem)
    }
    return ans
}


/*415. Add Strings (Easy)
Given two non-negative integers, num1 and num2 represented as string, return the
sum of num1 and num2 as a string. You must solve the problem without using any
built-in library for handling large integers (such as BigInteger). You must also
not convert the inputs to integers directly.

Example 1:
Input: num1 = "11", num2 = "123"
Output: "134"

Example 2:
Input: num1 = "456", num2 = "77"
Output: "533"

Example 3:
Input: num1 = "0", num2 = "0"
Output: "0"

Constraints:
* 1 <= num1.length, num2.length <= 10^4
* num1 and num2 consist of only digits.
* num1 and num2 don't have any leading zeros except for the zero itself.*/

func addStrings(num1 string, num2 string) string {
    n1, n2 := len(num1), len(num2)
    ans := []byte{}
    carry := 0
    for i := 0; i < n1 || i < n2 || carry > 0; i++ {
        if i < n1 {
            carry += int(num1[n1-i-1] - '0')
        }
        if i < n2 {
            carry += int(num2[n2-i-1] - '0')
        }
        ans = append(ans, byte(carry%10 + '0'))
        carry /= 10
    }
    slices.Reverse(ans)
    return string(ans)
}


/*434. Number of Segments in a String (Easy)
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
* The only space character in s is ' '.*/

func countSegments(s string) int {
    return len(strings.Fields(s))
}


/*3492. Maximum Containers on a Ship (Easy)
You are given a positive integer n representing an n x n cargo deck on a
ship. Each cell on the deck can hold one container with a weight of exactly
w. However, the total weight of all containers, if loaded onto the deck,
must not exceed the ship's maximum weight capacity, maxWeight. Return the
maximum number of containers that can be loaded onto the ship.

Example 1:
Input: n = 2, w = 3, maxWeight = 15
Output: 4
Explanation: The deck has 4 cells, and each container weighs 3. The total
             weight of loading all containers is 12, which does not exceed
             maxWeight.

Example 2:
Input: n = 3, w = 5, maxWeight = 20
Output: 4
Explanation: The deck has 9 cells, and each container weighs 5. The maximum
             number of containers that can be loaded without exceeding
             maxWeight is 4.

Constraints:
* 1 <= n <= 1000
* 1 <= w <= 1000
* 1 <= maxWeight <= 10^9*/

func maxContainers(n int, w int, maxWeight int) int {
    return min(n*n, maxWeight/w)
}


/*3493. Properties Graph (Medium)
You are given a 2D integer array properties having dimensions n x m and an
integer k. Define a function intersect(a, b) that returns the number of
distinct integers common to both arrays a and b. Construct an undirected
graph where each index i corresponds to properties[i]. There is an edge
between node i and node j if and only if
intersect(properties[i], properties[j]) >= k, where i and j are in the range
[0, n - 1] and i != j. Return the number of connected components in the
resulting graph.

Example 1:
Input: properties = [[1,2],[1,1],[3,4],[4,5],[5,6],[7,7]], k = 1
Output: 3
Explanation: The graph formed has 3 connected components:

Example 2:
Input: properties = [[1,2,3],[2,3,4],[4,3,5]], k = 2
Output: 1
Explanation: The graph formed has 1 connected component:

Example 3:
Input: properties = [[1,1],[1,1]], k = 2
Output: 2
Explanation: intersect(properties[0], properties[1]) = 1, which is less than
             k. This means there is no edge between properties[0] and
             properties[1] in the graph.

Constraints:
* 1 <= n == properties.length <= 100
* 1 <= m == properties[i].length <= 100
* 1 <= properties[i][j] <= 100
* 1 <= k <= m*/

func numberOfComponents(properties [][]int, k int) int {
    n := len(properties)
    ps := []map[int]struct{}{}
    for _, p := range properties {
        elem := map[int]struct{}{}
        for _, x := range p {
            elem[x] = struct{}{}
        }
        ps = append(ps, elem)
    }
    parent := make([]int, n)
    for i := 0; i < n; i++ {
        parent[i] = i
    }

    var find func(p int) int
    find = func(p int) int {
        if (p != parent[p]) {
            parent[p] = find(parent[p])
        }
        return parent[p]
    }

    for i := 0; i < n; i++ {
        for j := i+1; j < n; j++ {
            cnt := 0
            for x, _ := range ps[i] {
                if _, ok := ps[j][x]; ok {
                    cnt++
                }
            }
            if cnt >= k {
                parent[find(i)] = find(j)
            }
        }
    }
    freq := map[int]int{}
    for _, x := range parent {
        freq[find(x)]++
    }
    return len(freq)
}


/*3494. Find the Minimum Amount of Time to Brew Potions (Medium)
You are given two integer arrays, skill and mana, of length n and m,
respectively. In a laboratory, n wizards must brew m potions in order. Each
potion has a mana capacity mana[j] and must pass through all the wizards
sequentially to be brewed properly. The time taken by the ith wizard on the
jth potion is timeij = skill[i] * mana[j]. Since the brewing process is
delicate, a potion must be passed to the next wizard immediately after the
current wizard completes their work. This means the timing must be
synchronized so that each wizard begins working on a potion exactly when it
arrives. Return the minimum amount of time required for the potions to be
brewed properly.

Example 1:
Input: skill = [1,5,2,4], mana = [5,1,4,2]
Output: 110
Explanation: Potion Number  Start time  Wizard 0 done by  Wizard 1 done by  Wizard 2 done by  Wizard 3 done by
             0              0           5                 30                40                60
             1              52          53                58                60                64
             2              54          58                78                86                102
             3              86          88                98                102               110
             As an example for why wizard 0 cannot start working on the 1st
             potion before time t = 52, consider the case where the wizards
             started preparing the 1st potion at time t = 50. At time
             t = 58, wizard 2 is done with the 1st potion, but wizard 3 will
             still be working on the 0th potion till time t = 60.

Example 2:
Input: skill = [1,1,1], mana = [1,1,1]
Output: 5
Explanation: - Preparation of the 0th potion begins at time t = 0, and is
               completed by time t = 3.
             - Preparation of the 1st potion begins at time t = 1, and is
               completed by time t = 4.
             - Preparation of the 2nd potion begins at time t = 2, and is
               completed by time t = 5.

Example 3:
Input: skill = [1,2,3,4], mana = [1,2]
Output: 21

Constraints:
* n == skill.length
* m == mana.length
* 1 <= n, m <= 5000
* 1 <= mana[i], skill[i] <= 5000*/

func minTime(skill []int, mana []int) int64 {
    n, m := len(skill), len(mana)
    dp := make([]int64, n)
    for j := 0; j < m; j++ {
        for i := 0; i < n; i++ {
            if (i > 0) {
                dp[i] = max(dp[i-1], dp[i])
            }
            dp[i] += int64(skill[i] * mana[j])
        }
        for i := n-1; i > 0; i-- {
            dp[i-1] = dp[i] - int64(skill[i] * mana[j])
        }
    }
    return dp[n-1]
}


/*3495. Minimum Operations to Make Array Elements Zero (Hard)
You are given a 2D array queries, where queries[i] is of the form [l, r].
Each queries[i] defines an array of integers nums consisting of elements
ranging from l to r, both inclusive. In one operation, you can:
* Select two integers a and b from the array.
* Replace them with floor(a / 4) and floor(b / 4).
Your task is to determine the minimum number of operations required to
reduce all elements of the array to zero for each query. Return the sum of
the results for all queries.

Example 1:
Input: queries = [[1,2],[2,4]]
Output: 3
Explanation: For queries[0]:
             - The initial array is nums = [1, 2].
             - In the first operation, select nums[0] and nums[1]. The array
               becomes [0, 0].
             - The minimum number of operations required is 1.
             For queries[1]:
             - The initial array is nums = [2, 3, 4].
             - In the first operation, select nums[0] and nums[2]. The array
               becomes [0, 3, 1].
             - In the second operation, select nums[1] and nums[2]. The
               array becomes [0, 0, 0].
             - The minimum number of operations required is 2.
             The output is 1 + 2 = 3.

Example 2:
Input: queries = [[2,6]]
Output: 4
Explanation: For queries[0]:
             - The initial array is nums = [2, 3, 4, 5, 6].
             - In the first operation, select nums[0] and nums[3]. The array
               becomes [0, 3, 4, 1, 6].
             - In the second operation, select nums[2] and nums[4]. The
               array becomes [0, 3, 1, 1, 1].
             - In the third operation, select nums[1] and nums[2]. The array
               becomes [0, 0, 0, 1, 1].
             - In the fourth operation, select nums[3] and nums[4]. The
               array becomes [0, 0, 0, 0, 0].
             - The minimum number of operations required is 4.
             The output is 4.

Constraints:
* 1 <= queries.length <= 10^5
* queries[i].length == 2
* queries[i] == [l, r]
* 1 <= l < r <= 10^9*/

func minOperations(queries [][]int) int64 {
    ans := int64(0)
    for _, q := range queries {
        l, r := q[0], q[1]
        ops := 0
        for p, step := 1, 1; p <= 15; p++ {
            lo := max(step, l)
            hi := min(4*step, r+1)
            if (lo < hi) {
                ops += p * (hi-lo)
            }
            step *= 4
        }
        ans += int64((ops+1)/2)
    }
    return ans
}
