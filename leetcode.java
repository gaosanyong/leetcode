import java.math.BigInteger; 
import java.util.HashMap;

class Solution {

    /*1. Two Sum (Easy)
    Given an array of integers nums and an integer target, return indices of 
    the two numbers such that they add up to target. You may assume that each 
    input would have exactly one solution, and you may not use the same element 
    twice. You can return the answer in any order.

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
               complexity?*/

    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>(); 
        for (int i = 0; i < nums.length; ++i) {
            int diff = target - nums[i]; 
            if (seen.containsKey(diff)) return new int[]{seen.get(diff), i}; 
            seen.put(nums[i], i); 
        }
        return null; 
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
    Explanation: From left to right, it reads -121. From right to left, it 
                 becomes 121-. Therefore it is not a palindrome.

    Example 3:
    Input: x = 10
    Output: false
    Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

    Constraints: -2^31 <= x <= 2^31 - 1

    Follow up: Could you solve it without converting the integer to a string?*/

    public boolean isPalindrome(int x) {
        if (x % 10 == 0 && x != 0 || x < 0) return false; 
        int rev = 0; 
        for (; x > rev; x /= 10) 
            rev = 10*rev + x%10; 
        return x == rev || x == rev/10; 
    }


    /*13. Roman to Integer (Easy)
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
    For example, 2 is written as II in Roman numeral, just two ones added 
    together. 12 is written as XII, which is simply X + II. The number 27 is 
    written as XXVII, which is XX + V + II. Roman numerals are usually written 
    largest to smallest from left to right. However, the numeral for four is 
    not IIII. Instead, the number four is written as IV. Because the one is 
    before the five we subtract it making four. The same principle applies to 
    the number nine, which is written as IX. There are six instances where 
    subtraction is used:
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

    public int romanToInt(String s) {
        HashMap<Character, Integer> mp = new HashMap<>() {{
            put('I', 1); 
            put('V', 5); 
            put('X', 10); 
            put('L', 50); 
            put('C', 100); 
            put('D', 500); 
            put('M', 1000); 
        }}; 
        int ans = 0; 
        for (int i = 0; i < s.length(); ++i) {
            if (i+1 < s.length() && mp.get(s.charAt(i)) < mp.get(s.charAt(i+1))) ans -= mp.get(s.charAt(i)); 
            else ans += mp.get(s.charAt(i)); 
        }
        return ans; 
    }


    /*14. Longest Common Prefix (Easy)
    Write a function to find the longest common prefix string amongst an array 
    of strings. If there is no common prefix, return an empty string "".

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
    * strs[i] consists of only lowercase English letters.*/

    public String longestCommonPrefix(String[] strs) {
        String lo = Collections.min(Arrays.asList(strs)), hi = Collections.max(Arrays.asList(strs)); 
        int i = 0; 
        for (; i < lo.length() && i < hi.length() && lo.charAt(i) == hi.charAt(i); ++i); 
        return lo.substring(0, i); 
    }


    /*20. Valid Parentheses (Easy)
    Given a string s containing just the characters '(', ')', '{', '}', '[' and 
    ']', determine if the input string is valid. An input string is valid if:
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

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of parentheses only '()[]{}'.*/

    public boolean isValid(String s) {
        Stack<Character> stk = new Stack<>(); 
        for (char ch : s.toCharArray()) {
            if (ch == '(') stk.push(')'); 
            else if (ch == '[') stk.push(']'); 
            else if (ch == '{') stk.push('}'); 
            else if (stk.empty() || stk.pop() != ch) return false; 
        }
        return stk.empty(); 
    }


    /*21. Merge Two Sorted Lists (Easy)
    You are given the heads of two sorted linked lists list1 and list2. Merge 
    the two lists in a one sorted list. The list should be made by splicing 
    together the nodes of the first two lists. Return the head of the merged 
    linked list.

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

    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(), node = dummy; 
        while (list1 != null && list2 != null) 
            if (list1.val < list2.val) {
                node = node.next = list1; 
                list1 = list1.next; 
            } else {
                node = node.next = list2; 
                list2 = list2.next; 
            }
        if (list1 != null) node.next = list1; 
        if (list2 != null) node.next = list2; 
        return dummy.next; 
    }


    /*26. Remove Duplicates from Sorted Array (Easy)
    Given an integer array nums sorted in non-decreasing order, remove the 
    duplicates in-place such that each unique element appears only once. The 
    relative order of the elements should be kept the same. Since it is 
    impossible to change the length of the array in some languages, you must 
    instead have the result be placed in the first part of the array nums. More 
    formally, if there are k elements after removing the duplicates, then the 
    first k elements of nums should hold the final result. It does not matter 
    what you leave beyond the first k elements. Return k after placing the 
    final result in the first k slots of nums. Do not allocate extra space for 
    another array. You must do this by modifying the input array in-place with 
    O(1) extra memory.

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
    Explanation: Your function should return k = 2, with the first two elements 
                 of nums being 1 and 2 respectively. It does not matter what 
                 you leave beyond the returned k (hence they are underscores).
    
    Example 2:
    Input: nums = [0,0,1,1,1,2,2,3,3,4]
    Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
    Explanation: Your function should return k = 5, with the first five 
                 elements of nums being 0, 1, 2, 3, and 4 respectively. It does 
                 not matter what you leave beyond the returned k (hence they 
                 are underscores).

    Constraints:
    * 1 <= nums.length <= 3 * 10^4
    * -100 <= nums[i] <= 100
    * nums is sorted in non-decreasing order.*/

    public int removeDuplicates(int[] nums) {
        int k = 0; 
        for (int x : nums) 
            if (k == 0 || nums[k-1] < x) nums[k++] = x; 
        return k; 
    }


    /*27. Remove Element (Easy)
    Given an integer array nums and an integer val, remove all occurrences of 
    val in nums in-place. The relative order of the elements may be changed.
    Since it is impossible to change the length of the array in some languages, 
    you must instead have the result be placed in the first part of the array 
    nums. More formally, if there are k elements after removing the duplicates, 
    then the first k elements of nums should hold the final result. It does 
    not matter what you leave beyond the first k elements. Return k after 
    placing the final result in the first k slots of nums. Do not allocate 
    extra space for another array. You must do this by modifying the input 
    array in-place with O(1) extra memory.

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
    Explanation: Your function should return k = 2, with the first two elements 
                 of nums being 2. It does not matter what you leave beyond the 
                 returned k (hence they are underscores).
    
    Example 2:
    Input: nums = [0,1,2,2,3,0,4,2], val = 2
    Output: 5, nums = [0,1,4,0,3,_,_,_]
    Explanation: Your function should return k = 5, with the first five 
                 elements of nums containing 0, 0, 1, 3, and 4. Note that the 
                 five elements can be returned in any order. It does not matter 
                 what you leave beyond the returned k (hence they are 
                 underscores).

    Constraints:
    * 0 <= nums.length <= 100
    * 0 <= nums[i] <= 50
    * 0 <= val <= 100*/

    public int removeElement(int[] nums, int val) {
        int k = 0; 
        for (int x : nums) 
            if (x != val) nums[k++] = x; 
        return k; 
    }


    /*35. Search Insert Position (Easy)
    Given a sorted array of distinct integers and a target value, return the 
    index if the target is found. If not, return the index where it would be if 
    it were inserted in order. You must write an algorithm with O(log n) 
    runtime complexity.

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

    public int searchInsert(int[] nums, int target) {
        int k = Arrays.binarySearch(nums, target); 
        return k >= 0 ? k : -k-1; 
    }
    

    /*55. Jump Game (Medium)
    You are given an integer array nums. You are initially positioned at the 
    array's first index, and each element in the array represents your maximum 
    jump length at that position. Return true if you can reach the last index, 
    or false otherwise.

    Example 1:
    Input: nums = [2,3,1,1,4]
    Output: true
    Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

    Example 2:
    Input: nums = [3,2,1,0,4]
    Output: false
    Explanation: You will always arrive at index 3 no matter what. Its maximum 
                 jump length is 0, which makes it impossible to reach the last 
                 index.

    Constraints:
    * 1 <= nums.length <= 10^4
    * 0 <= nums[i] <= 10^5*/

    public boolean canJump(int[] nums) {
        for (int i = 0, ii = 0; i < nums.length; ++i) {
            if (ii < i) return false; 
            ii = Math.max(ii, i+nums[i]); 
        }
        return true; 
    }


    /*58. Length of Last Word (Easy)
    Given a string s consisting of words and spaces, return the length of the 
    last word in the string. A word is a maximal substring consisting of non-
    space characters only.

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

    public int lengthOfLastWord(String s) {
        String[] words = s.split(" "); 
        return words[words.length-1].length(); 
    }


    /*66. Plus One (Easy)
    You are given a large integer represented as an integer array digits, where 
    each digits[i] is the ith digit of the integer. The digits are ordered from 
    most significant to least significant in left-to-right order. The large 
    integer does not contain any leading 0's. Increment the large integer by 
    one and return the resulting array of digits.

    Example 1:
    Input: digits = [1,2,3]
    Output: [1,2,4]
    Explanation: The array represents the integer 123. Incrementing by one 
                 gives 123 + 1 = 124. Thus, the result should be [1,2,4].
    
    Example 2:
    Input: digits = [4,3,2,1]
    Output: [4,3,2,2]
    Explanation: The array represents the integer 4321. Incrementing by one 
                 gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2].
    
    Example 3:
    Input: digits = [9]
    Output: [1,0]
    Explanation: The array represents the integer 9. Incrementing by one gives 
                 9 + 1 = 10. Thus, the result should be [1,0].

    Constraints:
    * 1 <= digits.length <= 100
    * 0 <= digits[i] <= 9
    * digits does not contain any leading 0's.*/

    public int[] plusOne(int[] digits) {
        int carry = 1; 
        for (int i = digits.length-1; i >= 0; --i, carry /= 10) {
            carry += digits[i]; 
            digits[i] = carry % 10; 
        }
        if (carry == 0) return digits; 
        int[] ans = new int[digits.length+1]; 
        ans[0] = 1; 
        return ans; 
    }


    /*67. Add Binary (Easy)
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
    * Each string does not contain leading zeros except for the zero itself.*/

    public String addBinary(String a, String b) {
        StringBuilder ans = new StringBuilder(); 
        for (int i = a.length()-1, j = b.length()-1, carry = 0; 0 <= i || 0 <= j || carry > 0; carry /= 2) {
            if (0 <= i) carry += a.charAt(i--) - '0'; 
            if (0 <= j) carry += b.charAt(j--) - '0'; 
            ans.append(carry % 2);
        }
        return ans.reverse().toString(); 
    }


    /*69. Sqrt(x) (Easy)
    Given a non-negative integer x, return the square root of x rounded down to 
    the nearest integer. The returned integer should be non-negative as well.
    You must not use any built-in exponent function or operator. For example, 
    do not use pow(x, 0.5) in c++ or x ** 0.5 in python.

    Example 1:
    Input: x = 4
    Output: 2
    Explanation: The square root of 4 is 2, so we return 2.

    Example 2:
    Input: x = 8
    Output: 2
    Explanation: The square root of 8 is 2.82842..., and since we round it down 
                 to the nearest integer, 2 is returned.

    Constraints: 0 <= x <= 2^31 - 1*/

    public int mySqrt(int x) {
        long ans = x; 
        while (ans * ans > x) 
            ans = (ans + x/ans)/2; 
        return (int) ans;
    }


    /*70. Climbing Stairs (Easy)
    You are climbing a staircase. It takes n steps to reach the top. Each time 
    you can either climb 1 or 2 steps. In how many distinct ways can you climb 
    to the top?

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

    public int climbStairs(int n) {
        int f0 = 1, f1 = 1; 
        for (int i = 1; i <= n-1; ++i) {
            int ff = f0; 
            f0 = f1; 
            f1 = ff + f1; 
        }
        return f1; 
    }


    /*83. Remove Duplicates from Sorted List (Easy)
    Given the head of a sorted linked list, delete all duplicates such that 
    each element appears only once. Return the linked list sorted as well.

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

    public ListNode deleteDuplicates(ListNode head) {
        ListNode node = head; 
        while (node != null)
            if (node.next != null && node.val == node.next.val) node.next = node.next.next; 
            else node = node.next; 
        return head; 
    }


    /*88. Merge Sorted Array (Easy)
    You are given two integer arrays nums1 and nums2, sorted in non-decreasing 
    order, and two integers m and n, representing the number of elements in 
    nums1 and nums2 respectively. Merge nums1 and nums2 into a single array 
    sorted in non-decreasing order. The final sorted array should not be 
    returned by the function, but instead be stored inside the array nums1. To 
    accommodate this, nums1 has a length of m + n, where the first m elements 
    denote the elements that should be merged, and the last n elements are set 
    to 0 and should be ignored. nums2 has a length of n.

    Example 1:
    Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
    Output: [1,2,2,3,5,6]
    Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result 
                 of the merge is [1,2,2,3,5,6] with the underlined elements 
                 coming from nums1.
    
    Example 2:
    Input: nums1 = [1], m = 1, nums2 = [], n = 0
    Output: [1]
    Explanation: The arrays we are merging are [1] and []. The result of the 
                 merge is [1].
    
    Example 3:
    Input: nums1 = [0], m = 0, nums2 = [1], n = 1
    Output: [1]
    Explanation: The arrays we are merging are [] and [1]. The result of the 
                 merge is [1]. Note that because m = 0, there are no elements 
                 in nums1. The 0 is only there to ensure the merge result can 
                 fit in nums1.

    Constraints:
    * nums1.length == m + n
    * nums2.length == n
    * 0 <= m, n <= 200
    * 1 <= m + n <= 200
    * -10^9 <= nums1[i], nums2[j] <= 10^9

    Follow up: Can you come up with an algorithm that runs in O(m + n) time?*/

    public void merge(int[] nums1, int m, int[] nums2, int n) {
        while (n > 0) 
            if (m > 0 && nums1[m-1] >= nums2[n-1]) nums1[m+n-1] = nums1[--m]; 
            else nums1[m+n-1] = nums2[--n]; 
    }


    /*94. Binary Tree Inorder Traversal (Easy)
    Given the root of a binary tree, return the inorder traversal of its nodes' 
    values.

    Example 1:
    Input: root = [1,null,2,3]
    Output: [1,3,2]

    Example 2:
    Input: root = []
    Output: []

    Example 3:
    Input: root = [1]
    Output: [1]

    Constraints:
    * The number of nodes in the tree is in the range [0, 100].
    * -100 <= Node.val <= 100

    Follow up: Recursive solution is trivial, could you do it iteratively?*/

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList(); 
        TreeNode node = root; 
        Stack<TreeNode> stack = new Stack(); 
        while (node != null || !stack.isEmpty()) 
            if (node != null) {
                stack.push(node); 
                node = node.left; 
            } else {
                node = stack.pop();
                ans.add(node.val); 
                node = node.right; 
            }
        return ans; 
    }


    /*100. Same Tree (Easy)
    Given the roots of two binary trees p and q, write a function to check if 
    they are the same or not. Two binary trees are considered the same if they 
    are structurally identical, and the nodes have the same value.

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

    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true; 
        if (p == null || q == null) return false; 
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right); 
    }


    /*101. Symmetric Tree (Easy)
    Given the root of a binary tree, check whether it is a mirror of itself 
    (i.e., symmetric around its center).

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

    public boolean isSymmetric(TreeNode root) {
        Stack<Pair<TreeNode, TreeNode>> stk = new Stack(); 
        stk.push(new Pair(root, root)); 
        while (!stk.isEmpty()) {
            var elem = stk.pop(); 
            TreeNode left = elem.getKey(), right = elem.getValue(); 
            if (right == null || left.val != right.val) return false; 
            if (left.left != null) stk.push(new Pair(left.left, right.right)); 
            if (left.right != null) stk.push(new Pair(left.right, right.left)); 
        }
        return true; 
    }


    /*104. Maximum Depth of Binary Tree (Easy)
    Given the root of a binary tree, return its maximum depth. A binary tree's 
    maximum depth is the number of nodes along the longest path from the root 
    node down to the farthest leaf node.

    Example 1:
        3
       / \
      9  20
        /  \
       15   7
    Input: root = [3,9,20,null,null,15,7]
    Output: 3

    Example 2:
    Input: root = [1,null,2]
    Output: 2

    Constraints:
    * The number of nodes in the tree is in the range [0, 10^4].
    * -100 <= Node.val <= 100*/

    public int maxDepth(TreeNode root) {
        if (root == null) return 0; 
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)); 
    }



    /*108. Convert Sorted Array to Binary Search Tree (Easy)
    Given an integer array nums where the elements are sorted in ascending 
    order, convert it to a height-balanced binary search tree.

    Example 1:
    Input: nums = [-10,-3,0,5,9]
           0
          / \
        -3   9
        /   /
      -10  5
    Output: [0,-3,9,-10,null,5]
           0
          / \
        -10  5
          \   \
          -3   9
    Explanation: [0,-10,5,null,-3,null,9] is also accepted:

    Example 2:
    Input: nums = [1,3]
    Output: [3,1]
           3  1
          /    \
         1      3
    Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

    Constraints:
    * 1 <= nums.length <= 10^4
    * -10^4 <= nums[i] <= 10^4
    * nums is sorted in a strictly increasing order.*/

    public TreeNode sortedArrayToBST(int[] nums) {
        TreeNode root = null; 
        Stack<Object[]> stk = new Stack(); 
        stk.push(new Object[]{null, 0, nums.length, false}); 
        while (!stk.isEmpty()) {
            var elem = stk.pop(); 
            TreeNode node = (TreeNode) elem[0]; 
            int lo = (int) elem[1], hi = (int) elem[2]; 
            boolean tf = (boolean) elem[3]; 
            if (lo < hi) {
                int mid = lo + (hi - lo)/2; 
                if (root == null) node = root = new TreeNode(nums[mid]); 
                else if (tf) node = node.right = new TreeNode(nums[mid]); 
                else node = node.left = new TreeNode(nums[mid]); 
                stk.push(new Object[]{node, lo, mid, false}); 
                stk.push(new Object[]{node, mid+1, hi, true}); 
            }
        }
        return root; 
    }


    /*110. Balanced Binary Tree (Easy)
    Given a binary tree, determine if it is height-balanced.

    Example 1:
    Input: root = [3,9,20,null,null,15,7] 
        3
       / \
      9  20
        /  \
       15   7
    Output: true

    Example 2:
    Input: root = [1,2,2,3,3,null,null,4,4]
           1
          / \
         2   2
        / \ 
       3   3
      / \
     4   4
    Output: false

    Example 3:
    Input: root = []
    Output: true

    Constraints:
    * The number of nodes in the tree is in the range [0, 5000].
    * -10^4 <= Node.val <= 10^4*/

    public boolean isBalanced(TreeNode root) {
        Map<TreeNode, Pair<Boolean, Integer>> mp = new HashMap(); mp.put(null, new Pair(true, 0)); 
        TreeNode node = root, prev = null; 
        Stack<TreeNode> stk = new Stack(); 
        while (node != null || !stk.isEmpty()) {
            if (node != null) {
                stk.push(node); 
                node = node.left; 
            } else {
                node = stk.peek(); 
                if (node.right != null && node.right != prev) node = node.right; 
                else {
                    boolean b0 = mp.get(node.left).getKey(), b1 = mp.get(node.right).getKey(); 
                    int d0 = mp.get(node.left).getValue(), d1 = mp.get(node.right).getValue(); 
                    boolean b = b0 && b1 && Math.abs(d0-d1) <= 1; 
                    int d = 1 + Math.max(d0, d1); 
                    mp.put(node, new Pair(b, d)); 
                    stk.pop(); 
                    prev = node; 
                    node = null; 
                }
            }
        }
        return mp.get(root).getKey(); 
    }


    /*111. Minimum Depth of Binary Tree (Easy)
    Given a binary tree, find its minimum depth. The minimum depth is the 
    number of nodes along the shortest path from the root node down to the 
    nearest leaf node. Note: A leaf is a node with no children.

    Example 1:
    Input: root = [3,9,20,null,null,15,7]
    Output: 2

    Example 2:
    Input: root = [2,null,3,null,4,null,5,null,6]
    Output: 5

    Constraints:
    * The number of nodes in the tree is in the range [0, 10^5].
    * -1000 <= Node.val <= 1000*/

    public int minDepth(TreeNode root) {
        if (root == null) return 0; 
        int left = minDepth(root.left), right = minDepth(root.right); 
        return left > 0 && right > 0 ? 1 + Math.min(left, right) : 1 + Math.max(left, right); 
    }


    /*144. Binary Tree Preorder Traversal (Easy)
    Given the root of a binary tree, return the preorder traversal of its nodes' 
    values.

    Example 1:
    Input: root = [1,null,2,3]
    Output: [1,2,3]

    Example 2:
    Input: root = []
    Output: []

    Example 3:
    Input: root = [1]
    Output: [1]

    Constraints:
    * The number of nodes in the tree is in the range [0, 100].
    * -100 <= Node.val <= 100

    Follow up: Recursive solution is trivial, could you do it iteratively?*/

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList(); 
        Stack<TreeNode> stk = new Stack(); stk.push(root); 
        while (!stk.isEmpty()) {
            var node = stk.pop(); 
            if (node != null) {
                ans.add(node.val); 
                if (node.right != null) stk.push(node.right); 
                if (node.left != null) stk.push(node.left); 
            }
        }
        return ans;
    }


    /*149. Max Points on a Line (Hard)
    Given an array of points where points[i] = [xi, yi] represents a point on 
    the X-Y plane, return the maximum number of points that lie on the same 
    straight line.

    Example 1:
    Input: points = [[1,1],[2,2],[3,3]]
    Output: 3

    Example 2:
    Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
    Output: 4

    Constraints:
    * 1 <= points.length <= 300
    * points[i].length == 2
    * -10^4 <= xi, yi <= 10^4
    * All the points are unique.*/

    public int maxPoints(int[][] points) {
        int ans = 1; 
        for (int i = 0, n = points.length; i < n; ++i) {
            int x = points[i][0], y = points[i][1]; 
            Map<Pair<Integer, Integer>, Integer> freq = new HashMap(); 
            for (int ii = i+1; ii < n; ++ii) {
                int dx = points[i][0] - points[ii][0], dy = points[i][1] - points[ii][1], g = dx; 
                for(int gg = dy; gg != 0; ) {
                    int tmp = g; g = gg; gg = tmp % gg; 
                }
                dx /= g; 
                dy /= g; 
                if (dx == 0) dy = Math.abs(dy); 
                var p = new Pair(dx, dy); 
                freq.merge(p, 1, Integer::sum); 
                ans = Math.max(ans, freq.get(p) + 1); 
            }
        }
        return ans; 
    }


    /*160. Intersection of Two Linked Lists (Easy)
    Given the heads of two singly linked-lists headA and headB, return the node 
    at which the two lists intersect. If the two linked lists have no 
    intersection at all, return null. For example, the following two linked 
    lists begin to intersect at node c1:

         a1 - a2 
                \
                 c1 - c2 - c3
                /
    b1 - b2 - b3

    The test cases are generated such that there are no cycles anywhere in the 
    entire linked structure. Note that the linked lists must retain their 
    original structure after the function returns.

    Custom Judge:
    The inputs to the judge are given as follows (your program is not given 
    these inputs):
    * intersectVal - The value of the node where the intersection occurs. This 
      is 0 if there is no intersected node.
    * listA - The first linked list.
    * listB - The second linked list.
    * skipA - The number of nodes to skip ahead in listA (starting from the 
      head) to get to the intersected node.
    * skipB - The number of nodes to skip ahead in listB (starting from the 
      head) to get to the intersected node.
    The judge will then create the linked structure based on these inputs and 
    pass the two heads, headA and headB to your program. If you correctly 
    return the intersected node, then your solution will be accepted.

    Example 1:
    Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
    Output: Intersected at '8'
    Explanation: The intersected node's value is 8 (note that this must not be 
                 0 if the two lists intersect). From the head of A, it reads as 
                 [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. 
                 There are 2 nodes before the intersected node in A; There are 
                 3 nodes before the intersected node in B.
                 - Note that the intersected node's value is not 1 because the 
                   nodes with value 1 in A and B (2nd node in A and 3rd node in 
                   B) are different node references. In other words, they point 
                   to two different locations in memory, while the nodes with 
                   value 8 in A and B (3rd node in A and 4th node in B) point 
                   to the same location in memory.
    
    Example 2:
    Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
    Output: Intersected at '2'
    Explanation: The intersected node's value is 2 (note that this must not be 
                 0 if the two lists intersect). From the head of A, it reads as 
                 [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There 
                 are 3 nodes before the intersected node in A; There are 1 node 
                 before the intersected node in B.
    
    Example 3:
    Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
    Output: No intersection
    Explanation: From the head of A, it reads as [2,6,4]. From the head of B, 
                 it reads as [1,5]. Since the two lists do not intersect, 
                 intersectVal must be 0, while skipA and skipB can be arbitrary 
                 values. Explanation: The two lists do not intersect, so return 
                 null.

    Constraints:
    * The number of nodes of listA is in the m.
    * The number of nodes of listB is in the n.
    * 1 <= m, n <= 3 * 10^4
    * 1 <= Node.val <= 10^5
    * 0 <= skipA < m
    * 0 <= skipB < n
    * intersectVal is 0 if listA and listB do not intersect.
    * intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.
     
    Follow up: Could you write a solution that runs in O(m + n) time and use 
               only O(1) memory?*/

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode nodeA = headA, nodeB = headB; 
        while (nodeA != nodeB) {
            nodeA = nodeA == null ? headB : nodeA.next; 
            nodeB = nodeB == null ? headA : nodeB.next; 
        }
        return nodeA; 
    }


    /*163. Missing Ranges (Easy)
    You are given an inclusive range [lower, upper] and a sorted unique integer 
    array nums, where all elements are in the inclusive range. A number x is 
    considered missing if x is in the range [lower, upper] and x is not in nums.
    Return the smallest sorted list of ranges that cover every missing number 
    exactly. That is, no element of nums is in any of the ranges, and each 
    missing number is in one of the ranges. Each range [a,b] in the list should 
    be output as:
    * "a->b" if a != b
    * "a" if a == b

    Example 1:
    Input: nums = [0,1,3,50,75], lower = 0, upper = 99
    Output: ["2","4->49","51->74","76->99"]
    Explanation: The ranges are: [2,2] --> "2"
                                 [4,49] --> "4->49"
                                 [51,74] --> "51->74"
                                 [76,99] --> "76->99"
    
    Example 2:
    Input: nums = [-1], lower = -1, upper = -1
    Output: []
    Explanation: There are no missing ranges since there are no missing numbers.

    Constraints:
    * -10^9 <= lower <= upper <= 10^9
    * 0 <= nums.length <= 100
    * lower <= nums[i] <= upper
    * All the values of nums are unique.*/

    public List<String> findMissingRanges(int[] nums, int lower, int upper) {
        List<String> ans = new ArrayList(); 
        int prev = lower; 
        for (var x : nums) {
            if (prev < x) ans.add(prev == x-1 ? String.valueOf(prev) : String.format("%d->%d", prev, x-1)); 
            prev = x+1; 
        }
        if (prev <= upper) ans.add(prev == upper ? String.valueOf(upper) : String.format("%d->%d", prev, upper)); 
        return ans; 
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

    public String convertToTitle(int columnNumber) {
        StringBuilder ans = new StringBuilder(); 
        for (; columnNumber > 0; columnNumber /= 26) {
            int x = --columnNumber % 26; 
            ans.append((char) (x+'A')); 
        }
        ans.reverse(); 
        return ans.toString(); 
    }


    /*169. Majority Element (Easy)
    Given an array nums of size n, return the majority element. The majority 
    element is the element that appears more than ⌊n / 2⌋ times. You may assume 
    that the majority element always exists in the array.

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

    public int majorityElement(int[] nums) {
        /*Boyer-Moore majority vote algo*/
        int ans = 0, vote = 0; 
        for (var x : nums) {
            if (vote == 0) ans = x; 
            if (x == ans) ++vote; 
            else --vote; 
        }
        return ans; 
    }


    /*171. Excel Sheet Column Number (Easy)
    Given a string columnTitle that represents the column title as appears in 
    an Excel sheet, return its corresponding column number. For example: 
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

    public int titleToNumber(String columnTitle) {
        int ans = 0; 
        for (var ch : columnTitle.toCharArray()) 
            ans = 26*ans + (ch - 'A' + 1); 
        return ans; 
    }


    /*190. Reverse Bits (Easy)
    Reverse bits of a given 32 bits unsigned integer.
    Note:
    * Note that in some languages, such as Java, there is no unsigned integer 
      type. In this case, both input and output will be given as a signed 
      integer type. They should not affect your implementation, as the integer's 
      internal binary representation is the same, whether it is signed or 
      unsigned.
    * In Java, the compiler represents the signed integers using 2's complement 
      notation. Therefore, in Example 2 above, the input represents the signed 
      integer -3 and the output represents the signed integer -1073741825.

    Example 1:
    Input: n = 00000010100101000001111010011100
    Output:    964176192 (00111001011110000010100101000000)
    Explanation: The input binary string 00000010100101000001111010011100 
                 represents the unsigned integer 43261596, so return 964176192 
                 which its binary representation is 
                 00111001011110000010100101000000.
    
    Example 2:
    Input: n = 11111111111111111111111111111101
    Output:   3221225471 (10111111111111111111111111111111)
    Explanation: The input binary string 11111111111111111111111111111101 
                 represents the unsigned integer 4294967293, so return 
                 3221225471 which its binary representation is 
                 10111111111111111111111111111111.

    Constraints: The input must be a binary string of length 32

    Follow up: If this function is called many times, how would you optimize 
               it?*/

    public int reverseBits(int n) {
        int ans = 0; 
        for (int i = 0; i < 32; ++i, n >>= 1) 
            ans = (ans<<1) + (n & 1); 
        return ans; 
    }


    /*191. Number of 1 Bits (Easy)
    Write a function that takes an unsigned integer and returns the number of 
    '1' bits it has (also known as the Hamming weight).

    Note:
    * Note that in some languages, such as Java, there is no unsigned integer 
      type. In this case, the input will be given as a signed integer type. It 
      should not affect your implementation, as the integer's internal binary 
      representation is the same, whether it is signed or unsigned.
    * In Java, the compiler represents the signed integers using 2's complement 
      notation. Therefore, in Example 3, the input represents the signed 
      integer. -3.

    Example 1:
    Input: n = 00000000000000000000000000001011
    Output: 3
    Explanation: The input binary string 00000000000000000000000000001011 has a 
                 total of three '1' bits.

    Example 2:
    Input: n = 00000000000000000000000010000000
    Output: 1
    Explanation: The input binary string 00000000000000000000000010000000 has a 
                 total of one '1' bit.
    
    Example 3:
    Input: n = 11111111111111111111111111111101
    Output: 31
    Explanation: The input binary string 11111111111111111111111111111101 has a 
                 total of thirty one '1' bits.

    Constraints: The input must be a binary string of length 32.

    Follow up: If this function is called many times, how would you optimize it?*/

    public int hammingWeight(int n) {
        /* Brian Kernighan’s Algo */
        int ans = 0; 
        for (; n != 0; ++ans, n &= n-1); 
        return ans; 
    }


    /*305. Number of Islands II (Hard)
    You are given an empty 2D binary grid grid of size m x n. The grid 
    represents a map where 0's represent water and 1's represent land. 
    Initially, all the cells of grid are water cells (i.e., all the cells are 
    0's). We may perform an add land operation which turns the water at 
    position into a land. You are given an array positions where 
    positions[i] = [ri, ci] is the position (ri, ci) at which we should operate 
    the ith operation. Return an array of integers answer where answer[i] is 
    the number of islands after turning the cell (ri, ci) into a land. An 
    island is surrounded by water and is formed by connecting adjacent lands 
    horizontally or vertically. You may assume all four edges of the grid are 
    all surrounded by water.

    Example 1:
    Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
    Output: [1,1,2,3]
    Explanation: Initially, the 2d grid is filled with water.
                 - Operation #1: addLand(0, 0) turns the water at grid[0][0] 
                                 into a land. We have 1 island.
                 - Operation #2: addLand(0, 1) turns the water at grid[0][1] 
                                 into a land. We still have 1 island.
                 - Operation #3: addLand(1, 2) turns the water at grid[1][2] 
                                 into a land. We have 2 islands.
                 - Operation #4: addLand(2, 1) turns the water at grid[2][1] 
                                 into a land. We have 3 islands.
    
    Example 2:
    Input: m = 1, n = 1, positions = [[0,0]]
    Output: [1]

    Constraints:
    * 1 <= m, n, positions.length <= 10^4
    * 1 <= m * n <= 10^4
    * positions[i].length == 2
    * 0 <= ri < m
    * 0 <= ci < n

    Follow up: Could you solve it in time complexity O(k log(mn)), where 
               k == positions.length?*/

    private static int find(int p, int[] parent) {
        if (p != parent[p]) 
            parent[p] = find(parent[p], parent); 
        return parent[p]; 
    }
    
    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        int[] parent = new int[m*n]; 
        for (int i = 0; i < m*n; ++i) parent[i] = i; 
        List<Integer> ans = new ArrayList(); 
        boolean[][] seen = new boolean[m][n]; 
        int prefix = 0; 
        int[] dir = new int[]{-1, 0, 1, 0, -1}; 
        for (var position : positions) {
            int i = position[0], j = position[1]; 
            if (!seen[i][j]) {
                ++prefix; 
                seen[i][j] = true; 
                for (int k = 0; k < 4; ++k) {
                    int ii = i + dir[k], jj = j + dir[k+1]; 
                    if (0 <= ii && ii < m && 0 <= jj && jj < n && seen[ii][jj]) {
                        int p = find(i*n + j, parent), pp = find(ii*n + jj, parent); 
                        if (p != pp) {
                            --prefix; 
                            parent[p] = pp; 
                        }
                    }
                }
            }
            ans.add(prefix); 
        }
        return ans; 
    }


    /*358. Rearrange String k Distance Apart (Hard)
    Given a string s and an integer k, rearrange s such that the same 
    characters are at least distance k from each other. If it is not possible 
    to rearrange the string, return an empty string "".

    Example 1:
    Input: s = "aabbcc", k = 3
    Output: "abcabc"
    Explanation: The same letters are at least a distance of 3 from each other.

    Example 2:
    Input: s = "aaabc", k = 3
    Output: ""
    Explanation: It is not possible to rearrange the string.

    Example 3:
    Input: s = "aaadbbcc", k = 2
    Output: "abacabcd"
    Explanation: The same letters are at least a distance of 2 from each other.

    Constraints:
    * 1 <= s.length <= 3 * 10^5
    * s consists of only lowercase English letters.
    * 0 <= k <= s.length*/

    public String rearrangeString(String s, int k) {
        StringBuilder ans = new StringBuilder(); 
        int[] freq = new int[26], prev = new int[26]; 
        for (var ch : s.toCharArray()) ++freq[ch - 'a']; 
        Arrays.fill(prev, -k); 
        for (int i = 0; i < s.length(); ++i) {
            int m = -1; 
            for (int c = 0; c < 26; ++c) 
                if (freq[c] > 0 && (m == -1 || freq[c] > freq[m]) && i - prev[c] >= k) m = c; 
            if (m == -1) return ""; 
            ans.append((char)('a' + m)); 
            --freq[m]; 
            prev[m] = i; 
        }
        return ans.toString(); 
    }


    /*452. Minimum Number of Arrows to Burst Balloons (Medium)
    There are some spherical balloons taped onto a flat wall that represents 
    the XY-plane. The balloons are represented as a 2D integer array points 
    where points[i] = [xstart, xend] denotes a balloon whose horizontal 
    diameter stretches between xstart and xend. You do not know the exact 
    y-coordinates of the balloons. Arrows can be shot up directly vertically 
    (in the positive y-direction) from different points along the x-axis. A 
    balloon with xstart and xend is burst by an arrow shot at x if 
    xstart <= x <= xend. There is no limit to the number of arrows that can be 
    shot. A shot arrow keeps traveling up infinitely, bursting any balloons in 
    its path. Given the array points, return the minimum number of arrows that 
    must be shot to burst all balloons.

    Example 1:
    Input: points = [[10,16],[2,8],[1,6],[7,12]]
    Output: 2
    Explanation: The balloons can be burst by 2 arrows:
                 - Shoot an arrow at x = 6, bursting the balloons [2,8] and 
                   [1,6].
                 - Shoot an arrow at x = 11, bursting the balloons [10,16] and 
                   [7,12].
    
    Example 2:
    Input: points = [[1,2],[3,4],[5,6],[7,8]]
    Output: 4
    Explanation: One arrow needs to be shot for each balloon for a total of 4 
                 arrows.
    
    Example 3:
    Input: points = [[1,2],[2,3],[3,4],[4,5]]
    Output: 2
    Explanation: The balloons can be burst by 2 arrows:
                 - Shoot an arrow at x = 2, bursting the balloons [1,2] and 
                   [2,3].
                 - Shoot an arrow at x = 4, bursting the balloons [3,4] and 
                   [4,5].

    Constraints:
    * 1 <= points.length <= 10^5
    * points[i].length == 2
    * -231 <= xstart < xend <= 2^31 - 1*/

    public int findMinArrowShots(int[][] points) {
        int ans = 0; 
        long prev = Long.MIN_VALUE; 
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1])); 
        for (var p : points) 
            if (prev < p[0]) {
                ++ans; 
                prev = p[1]; 
            }
        return ans; 
    }


    /*548. Split Array with Equal Sum (Hard)
    Given an integer array nums of length n, return true if there is a triplet 
    (i, j, k) which satisfies the following conditions:
    * 0 < i, i + 1 < j, j + 1 < k < n - 1
    * The sum of subarrays (0, i - 1), (i + 1, j - 1), (j + 1, k - 1) and 
      (k + 1, n - 1) is equal.
    A subarray (l, r) represents a slice of the original array starting from 
    the element indexed l to the element indexed r.

    Example 1:
    Input: nums = [1,2,1,2,1,2,1]
    Output: true
    Explanation: i = 1, j = 3, k = 5. 
                 sum(0, i - 1) = sum(0, 0) = 1
                 sum(i + 1, j - 1) = sum(2, 2) = 1
                 sum(j + 1, k - 1) = sum(4, 4) = 1
                 sum(k + 1, n - 1) = sum(6, 6) = 1
    
    Example 2:
    Input: nums = [1,2,1,2,1,2,1,2]
    Output: false

    Constraints:
    * n == nums.length
    * 1 <= n <= 2000
    * -10^6 <= nums[i] <= 10^6*/

    public boolean splitArray(int[] nums) {
        int n = nums.length; 
        int[] prefix = new int[n+1]; 
        for (int i = 0; i < n; ++i) prefix[i+1] = prefix[i] + nums[i]; 
        for (int j = 0; j < n; ++j) {
            Set<Integer> seen = new HashSet(); 
            for (int i = 1; i+1 < j; ++i) 
                if (prefix[i] == prefix[j] - prefix[i+1]) seen.add(prefix[i]); 
            for (int k = j+2; k+1 < n; ++k) 
                if (prefix[k] - prefix[j+1] == prefix[n] - prefix[k+1] && seen.contains(prefix[k] - prefix[j+1])) return true; 
        }
        return false; 
    }


    /*567. Permutation in String (Medium)
    Given two strings s1 and s2, return true if s2 contains a permutation of s1, 
    or false otherwise. In other words, return true if one of s1's permutations 
    is the substring of s2.

    Example 1:
    Input: s1 = "ab", s2 = "eidbaooo"
    Output: true
    Explanation: s2 contains one permutation of s1 ("ba").

    Example 2:
    Input: s1 = "ab", s2 = "eidboaoo"
    Output: false

    Constraints:
    * 1 <= s1.length, s2.length <= 10^4
    * s1 and s2 consist of lowercase English letters.*/

    public boolean checkInclusion(String s1, String s2) {
        int[] freq = new int[26]; 
        for (var ch : s1.toCharArray()) ++freq[ch - 'a']; 
        int bal = 0; 
        for (int i = 0; i < 26; ++i) 
            if (freq[i] > 0) ++bal; 
        for (int i = 0, n = s1.length(); i < s2.length(); ++i) {
            if (freq[s2.charAt(i)-'a'] == 0) ++bal; 
            if (--freq[s2.charAt(i)-'a'] == 0) --bal; 
            if (i >= n) {
                if (freq[s2.charAt(i-n)-'a'] == 0) ++bal; 
                if (++freq[s2.charAt(i-n)-'a'] == 0) --bal; 
            }
            if (bal == 0) return true; 
        }
        return false; 
    }


    /*590. N-ary Tree Postorder Traversal (Easy)
    Given the root of an n-ary tree, return the postorder traversal of its 
    nodes' values. Nary-Tree input serialization is represented in their level 
    order traversal. Each group of children is separated by the null value (See 
    examples)

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
     
    Follow up: Recursive solution is trivial, could you do it iteratively?*/

    public List<Integer> postorder(Node root) {
        List<Integer> ans = new ArrayList(); 
        if (root != null) {
            Stack<Node> stk = new Stack(); stk.push(root); 
            Node prev = null; 
            while (!stk.isEmpty()) {
                var node = stk.peek(); 
                if (!node.children.isEmpty() && prev != node.children.get(node.children.size()-1))
                    for (int i = node.children.size()-1; i >= 0; --i) 
                        stk.push(node.children.get(i)); 
                else {
                    ans.add(node.val); 
                    stk.pop(); 
                    prev = node; 
                }
            }
        }
        return ans; 
    }


    /*616. Add Bold Tag in String (Medium)
    You are given a string s and an array of strings words. You should add a 
    closed pair of bold tag <b> and </b> to wrap the substrings in s that exist 
    in words.
    * If two such substrings overlap, you should wrap them together with only 
      one pair of closed bold-tag.
    * If two substrings wrapped by bold tags are consecutive, you should 
      combine them.
    Return s after adding the bold tags.

    Example 1:
    Input: s = "abcxyz123", words = ["abc","123"]
    Output: "<b>abc</b>xyz<b>123</b>"
    Explanation: The two strings of words are substrings of s as following: 
                 "abcxyz123". We add <b> before each substring and </b> after 
                 each substring.
    
    Example 2:
    Input: s = "aaabbb", words = ["aa","b"]
    Output: "<b>aaabbb</b>"
    Explanation: "aa" appears as a substring two times: "aaabbb" and "aaabbb".
                 "b" appears as a substring three times: "aaabbb", "aaabbb", 
                 and "aaabbb". We add <b> before each substring and </b> after 
                 each substring: "<b>a<b>a</b>a</b><b>b</b><b>b</b><b>b</b>".
                 Since the first two <b>'s overlap, we merge them: 
                 "<b>aaa</b><b>b</b><b>b</b><b>b</b>". Since now the four <b>'s 
                 are consecuutive, we merge them: "<b>aaabbb</b>".

    Constraints:
    * 1 <= s.length <= 1000
    * 0 <= words.length <= 100
    * 1 <= words[i].length <= 1000
    * s and words[i] consist of English letters and digits.
    * All the values of words are unique.

    Note: This question is the same as 758: 
          https://leetcode.com/problems/bold-words-in-string/*/

    public String addBoldTag(String s, String[] words) {
        int[] line = new int[s.length()+1]; 
        for (String word : words) {
            for (int k = -1; true; ) {
                k = s.indexOf(word, ++k); 
                if (k == -1) break; 
                ++line[k]; 
                --line[k+word.length()]; 
            }
        }
        StringBuilder ans = new StringBuilder(); 
        for (int i = 0, prefix = 0; i < s.length(); ++i) {
            if (prefix == 0 && prefix+line[i] > 0) ans.append("<b>"); 
            ans.append(s.charAt(i)); 
            prefix += line[i]; 
            if (prefix > 0 && prefix+line[i+1] == 0) ans.append("</b>"); 
        }
        return ans.toString(); 
    }


    /*727. Minimum Window Subsequence (Hard)
    Given strings s1 and s2, return the minimum contiguous substring part of s1, 
    so that s2 is a subsequence of the part. If there is no such window in s1 
    that covers all characters in s2, return the empty string "". If there are 
    multiple such minimum-length windows, return the one with the left-most 
    starting index.

    Example 1:
    Input: s1 = "abcdebdde", s2 = "bde"
    Output: "bcde"
    Explanation: "bcde" is the answer because it occurs before "bdde" which has 
                 the same length. "deb" is not a smaller window because the 
                 elements of s2 in the window must occur in order.
    
    Example 2:
    Input: s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl", s2 = "u"
    Output: ""

    Constraints:
    * 1 <= s1.length <= 2 * 10^4
    * 1 <= s2.length <= 100
    * s1 and s2 consist of lowercase English letters.*/

    public String minWindow(String s1, String s2) {
        int m = s1.length(), n = s2.length(); 
        int[][] dp = new int[m][n]; 
        for (int i = 0; i < m; ++i) Arrays.fill(dp[i], -1); 
        if (s1.charAt(0) == s2.charAt(0)) dp[0][0] = 0; 
        for (int i = 1; i < m; ++i) 
            for (int j = 0; j < n; ++j)
                if (s1.charAt(i) == s2.charAt(j))
                    if (j > 0) dp[i][j] = dp[i-1][j-1]; 
                    else dp[i][j] = i; 
                else dp[i][j] = dp[i-1][j]; 
        String ans = ""; 
        for (int i = 0; i < m; ++i) {
            int k = dp[i][n-1]; 
            if (k != -1 && (ans.equals("") || i-k+1 < ans.length())) ans = s1.substring(k, i+1); 
        }
        return ans; 
    }


    /*734. Sentence Similarity (Easy)
    We can represent a sentence as an array of words, for example, the sentence 
    "I am happy with leetcode" can be represented as 
    arr = ["I","am",happy","with","leetcode"]. Given two sentences sentence1 
    and sentence2 each represented as a string array and given an array of 
    string pairs similarPairs where similarPairs[i] = [xi, yi] indicates that 
    the two words xi and yi are similar. Return true if sentence1 and sentence2 
    are similar, or false if they are not similar. Two sentences are similar if:
    * They have the same length (i.e., the same number of words)
    * sentence1[i] and sentence2[i] are similar.
    Notice that a word is always similar to itself, also notice that the 
    similarity relation is not transitive. For example, if the words a and b 
    are similar, and the words b and c are similar, a and c are not necessarily 
    similar.

    Example 1:
    Input: sentence1 = ["great","acting","skills"], 
           sentence2 = ["fine","drama","talent"], 
           similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
    Output: true
    Explanation: The two sentences have the same length and each word i of 
                 sentence1 is also similar to the corresponding word in 
                 sentence2.
    
    Example 2:
    Input: sentence1 = ["great"], sentence2 = ["great"], similarPairs = []
    Output: true
    Explanation: A word is similar to itself.

    Example 3:
    Input: sentence1 = ["great"], 
           sentence2 = ["doubleplus","good"], 
           similarPairs = [["great","doubleplus"]]
    Output: false
    Explanation: As they don't have the same length, we return false.

    Constraints:
    * 1 <= sentence1.length, sentence2.length <= 1000
    * 1 <= sentence1[i].length, sentence2[i].length <= 20
    * sentence1[i] and sentence2[i] consist of English letters.
    * 0 <= similarPairs.length <= 1000
    * similarPairs[i].length == 2
    * 1 <= xi.length, yi.length <= 20
    * xi and yi consist of lower-case and upper-case English letters.
    * All the pairs (xi, yi) are distinct.*/

    public boolean areSentencesSimilar(String[] sentence1, String[] sentence2, List<List<String>> similarPairs) {
        if (sentence1.length != sentence2.length) return false; 
        Map<String, Set<String>> mp = new HashMap(); 
        for (var p : similarPairs) {
            mp.putIfAbsent(p.get(0), new HashSet()); 
            mp.putIfAbsent(p.get(1), new HashSet()); 
            mp.get(p.get(0)).add(p.get(1)); 
            mp.get(p.get(1)).add(p.get(0)); 
        }
        for (int i = 0; i < sentence1.length; ++i) 
            if (!sentence1[i].equals(sentence2[i]) && (!mp.containsKey(sentence1[i]) || !mp.get(sentence1[i]).contains(sentence2[i]))) return false; 
        return true; 
    }


    /*751. IP to CIDR (Medium)
    An IP address is a formatted 32-bit unsigned integer where each group of 8 
    bits is printed as a decimal number and the dot character '.' splits the 
    groups. For example, the binary number 00001111 10001000 11111111 01101011 
    (spaces added for clarity) formatted as an IP address would be 
    "15.136.255.107". A CIDR block is a format used to denote a specific set of 
    IP addresses. It is a string consisting of a base IP address, followed by a 
    slash, followed by a prefix length k. The addresses it covers are all the 
    IPs whose first k bits are the same as the base IP address. For example, 
    "123.45.67.89/20" is a CIDR block with a prefix length of 20. Any IP 
    address whose binary representation matches 
    01111011 00101101 0100xxxx xxxxxxxx, where x can be either 0 or 1, is in 
    the set covered by the CIDR block. You are given a start IP address ip and 
    the number of IP addresses we need to cover n. Your goal is to use as few 
    CIDR blocks as possible to cover all the IP addresses in the inclusive 
    range [ip, ip + n - 1] exactly. No other IP addresses outside of the range 
    should be covered. Return the shortest list of CIDR blocks that covers the 
    range of IP addresses. If there are multiple answers, return any of them.

    Example 1:
    Input: ip = "255.0.0.7", n = 10
    Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
    Explanation: The IP addresses that need to be covered are:
                 - 255.0.0.7  -> 11111111 00000000 00000000 00000111
                 - 255.0.0.8  -> 11111111 00000000 00000000 00001000
                 - 255.0.0.9  -> 11111111 00000000 00000000 00001001
                 - 255.0.0.10 -> 11111111 00000000 00000000 00001010
                 - 255.0.0.11 -> 11111111 00000000 00000000 00001011
                 - 255.0.0.12 -> 11111111 00000000 00000000 00001100
                 - 255.0.0.13 -> 11111111 00000000 00000000 00001101
                 - 255.0.0.14 -> 11111111 00000000 00000000 00001110
                 - 255.0.0.15 -> 11111111 00000000 00000000 00001111
                 - 255.0.0.16 -> 11111111 00000000 00000000 00010000
                 The CIDR block "255.0.0.7/32" covers the first address. The 
                 CIDR block "255.0.0.8/29" covers the middle 8 addresses 
                 (binary format of 11111111 00000000 00000000 00001xxx). The 
                 CIDR block "255.0.0.16/32" covers the last address. Note that 
                 while the CIDR block "255.0.0.0/28" does cover all the 
                 addresses, it also includes addresses outside of the range, so 
                 we cannot use it.
    
    Example 2:
    Input: ip = "117.145.102.62", n = 8
    Output: ["117.145.102.62/31","117.145.102.64/30","117.145.102.68/31"]

    Constraints:
    * 7 <= ip.length <= 15
    * ip is a valid IPv4 on the form "a.b.c.d" where a, b, c, and d are 
      integers in the range [0, 255].
    * 1 <= n <= 1000
    * Every implied address ip + x (for x < n) will be a valid IPv4 address.*/

    public List<String> ipToCIDR(String ip, int n) {
        int val = 0; 
        for (var x : ip.split("\\.")) 
            val = (val << 8) | Integer.valueOf(x); 
        List<String> ans = new ArrayList(); 
        for (int i = 0; n > 0; n -= 1<<i, val += 1<<i) {
            for (i = 0; i < 32 && (val & 1<<i) == 0 && (1<<i+1) <= n; ++i); 
            StringBuilder elem = new StringBuilder(); 
            for (int k = 24; k >= 0; k -= 8) {
                elem.append(Integer.toString(val >> k & 0xFF)); 
                if (k > 0) elem.append("."); 
            }
            ans.add(elem + "/" + Integer.toString(32-i)); 
        }
        return ans; 
    }


    /*758. Bold Words in String (Medium)
    Given an array of keywords words and a string s, make all appearances of 
    all keywords words[i] in s bold. Any letters between <b> and </b> tags 
    become bold. Return s after adding the bold tags. The returned string 
    should use the least number of tags possible, and the tags should form a 
    valid combination.

    Example 1:
    Input: words = ["ab","bc"], s = "aabcd"
    Output: "a<b>abc</b>d"
    Explanation: Note that returning "a<b>a<b>b</b>c</b>d" would use more tags, 
                 so it is incorrect.
    
    Example 2:
    Input: words = ["ab","cb"], s = "aabcd"
    Output: "a<b>ab</b>cd"

    Constraints:
    * 1 <= s.length <= 500
    * 0 <= words.length <= 50
    * 1 <= words[i].length <= 10
    * s and words[i] consist of lowercase English letters.

    Note: This question is the same as 616: 
          https://leetcode.com/problems/add-bold-tag-in-string/*/

    public String boldWords(String[] words, String s) {
        int[] line = new int[s.length()+1]; 
        for (String word : words) {
            for (int k = -1; true; ) {
                k = s.indexOf(word, ++k); 
                if (k == -1) break; 
                ++line[k]; 
                --line[k+word.length()]; 
            }
        }
        StringBuilder ans = new StringBuilder(); 
        for (int i = 0, prefix = 0; i < s.length(); ++i) {
            if (prefix == 0 && prefix+line[i] > 0) ans.append("<b>"); 
            ans.append(s.charAt(i)); 
            prefix += line[i]; 
            if (prefix > 0 && prefix+line[i+1] == 0) ans.append("</b>"); 
        }
        return ans.toString(); 
    }


    /*759. Employee Free Time (Hard)
    We are given a list schedule of employees, which represents the working 
    time for each employee. Each employee has a list of non-overlapping 
    Intervals, and these intervals are in sorted order. Return the list of 
    finite intervals representing common, positive-length free time for all 
    employees, also in sorted order. (Even though we are representing Intervals 
    in the form [x, y], the objects inside are Intervals, not lists or arrays. 
    For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and 
    schedule[0][0][0] is not defined).  Also, we wouldn't include intervals 
    like [5, 5] in our answer, as they have zero length.

    Example 1:
    Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
    Output: [[3,4]]
    Explanation: There are a total of three employees, and all common free time 
                 intervals would be [-inf, 1], [3, 4], [10, inf]. We discard 
                 any intervals that contain inf as they aren't finite.
    
    Example 2:
    Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
    Output: [[5,6],[7,9]]

    Constraints:
    * 1 <= schedule.length , schedule[i].length <= 50
    * 0 <= schedule[i].start < schedule[i].end <= 10^8*/

    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<int[]> line = new ArrayList(); 
        for (var elem : schedule) 
            for (var x : elem) {
                line.add(new int[] {x.start, 1}); 
                line.add(new int[] {x.end, -1}); 
            }
        Collections.sort(line, (a, b) -> (a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]))); 
        List<Interval> ans = new ArrayList(); 
        int prev = Integer.MIN_VALUE, prefix = 0; 
        for (int i = 0; i < line.size(); ) {
            int k = line.get(i)[0]; 
            if (prefix == 0 && prev > Integer.MIN_VALUE) ans.add(new Interval(prev, k)); 
            for (int ii = i; i < line.size() && line.get(ii)[0] == line.get(i)[0]; ++i) 
                prefix += line.get(i)[1]; 
            if (prefix == 0) prev = k; 
        }
        return ans; 
    }


    /*774. Minimize Max Distance to Gas Station (Hard)
    You are given an integer array stations that represents the positions of 
    the gas stations on the x-axis. You are also given an integer k. You should 
    add k new gas stations. You can add the stations anywhere on the x-axis, 
    and not necessarily on an integer position. Let penalty() be the maximum 
    distance between adjacent gas stations after adding the k new stations. 
    Return the smallest possible value of penalty(). Answers within 10^-6 of 
    the actual answer will be accepted.

    Example 1:
    Input: stations = [1,2,3,4,5,6,7,8,9,10], k = 9
    Output: 0.50000

    Example 2:
    Input: stations = [23,24,36,39,46,56,57,65,84,98], k = 1
    Output: 14.00000

    Constraints:
    * 10 <= stations.length <= 2000
    * 0 <= stations[i] <= 10^8
    * stations is sorted in a strictly increasing order.
    * 1 <= k <= 10^6*/

    public double minmaxGasDist(int[] stations, int k) {
        int n = stations.length; 
        double lo = 0, hi = stations[n-1] - stations[0]; 
        while (lo + 1e-6 < hi) {
            double mid = (lo + hi)/2; 
            int kk = 0; 
            for (int i = 0; i < n-1; ++i)
                kk += (int) (stations[i+1]-stations[i])/mid; 
            if (kk <= k) hi = mid; 
            else lo = mid; 
        }
        return lo; 
    }


    /*787. Cheapest Flights Within K Stops (Medium)
    There are n cities connected by some number of flights. You are given an 
    array flights where flights[i] = [fromi, toi, pricei] indicates that there 
    is a flight from city fromi to city toi with cost pricei. You are also 
    given three integers src, dst, and k, return the cheapest price from src to 
    dst with at most k stops. If there is no such route, return -1.

    Example 1:
    Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
    Output: 700
    Explanation: The graph is shown above. The optimal path with at most 1 stop 
                 from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
                 Note that the path through cities [0,1,2,3] is cheaper but is 
                 invalid because it uses 2 stops.
    
    Example 2:
    Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
    Output: 200
    Explanation: The graph is shown above. The optimal path with at most 1 stop 
                 from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
    
    Example 3:
    Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
    Output: 500
    Explanation: The graph is shown above. The optimal path with no stops from 
                 city 0 to 2 is marked in red and has cost 500.

    Constraints:
    * 1 <= n <= 100
    * 0 <= flights.length <= (n * (n - 1) / 2)
    * flights[i].length == 3
    * 0 <= fromi, toi < n
    * fromi != toi
    * 1 <= pricei <= 10^4
    * There will not be any multiple flights between two cities.
    * 0 <= src, dst, k < n
    * src != dst*/

    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<int[]>[] graph = new ArrayList[n]; 
        for (int i = 0; i < n; ++i) graph[i] = new ArrayList(); 
        for (var f : flights) 
            graph[f[0]].add(new int[] {f[1], f[2]});
        Queue<int[]> pq = new PriorityQueue<>((a, b)->Integer.compare(a[0], b[0])); 
        pq.add(new int[] {0, src, 0}); 
        int[][] dist = new int[n][2]; 
        for (int i = 0; i < n; ++i) 
            if (i != src) dist[i][0] = dist[i][1] = Integer.MAX_VALUE; 
        while (!pq.isEmpty()) {
            var elem = pq.poll(); 
            int p = elem[0], u = elem[1], x = elem[2]; 
            if (u == dst) return p; 
            if (x <= k) 
                for (var v : graph[u]) 
                    if (p+v[1] < dist[v[0]][0] || x+1 < dist[v[0]][1]) {
                        pq.add(new int[] {p+v[1], v[0], x+1}); 
                        if (p+v[1] < dist[v[0]][0] || p+v[1] == dist[v[0]][0] && x+1 < dist[v[0]][1]) {
                            dist[v[0]][0] = p+v[1]; 
                            dist[v[0]][1] = x+1; 
                        }
                    }
        }
        return -1; 
    }


    /*909. Snakes and Ladders (Medium)
    You are given an n x n integer matrix board where the cells are labeled 
    from 1 to n2 in a Boustrophedon style starting from the bottom left of the 
    board (i.e. board[n - 1][0]) and alternating direction each row. You start 
    on square 1 of the board. In each move, starting from square curr, do the 
    following:
    * Choose a destination square next with a label in the range 
      [curr + 1, min(curr + 6, n2)].
      + This choice simulates the result of a standard 6-sided die roll: i.e., 
        there are always at most 6 destinations, regardless of the size of the 
        board.
    * If next has a snake or ladder, you must move to the destination of that 
      snake or ladder. Otherwise, you move to next.
    * The game ends when you reach the square n2.
    A board square on row r and column c has a snake or ladder if 
    board[r][c] != -1. The destination of that snake or ladder is board[r][c]. 
    Squares 1 and n2 do not have a snake or ladder. Note that you only take a 
    snake or ladder at most once per move. If the destination to a snake or 
    ladder is the start of another snake or ladder, you do not follow the 
    subsequent snake or ladder.
    * For example, suppose the board is [[-1,4],[-1,3]], and on the first move, 
      your destination square is 2. You follow the ladder to square 3, but do 
      not follow the subsequent ladder to 4.
    Return the least number of moves required to reach the square n2. If it is 
    not possible to reach the square, return -1.

    Example 1:
    Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
    Output: 4
    Explanation: In the beginning, you start at square 1 (at row 5, column 0).
                 You decide to move to square 2 and must take the ladder to 
                 square 15. You then decide to move to square 17 and must take 
                 the snake to square 13. You then decide to move to square 14 
                 and must take the ladder to square 35. You then decide to move 
                 to square 36, ending the game. This is the lowest possible 
                 number of moves to reach the last square, so return 4.
    
    Example 2:
    Input: board = [[-1,-1],[-1,3]]
    Output: 1

    Constraints:
    * n == board.length == board[i].length
    * 2 <= n <= 20
    * grid[i][j] is either -1 or in the range [1, n^2].
    * The squares labeled 1 and n2 do not have any ladders or snakes.*/

    public int snakesAndLadders(int[][] board) {
        int n = board.length, ans = 0; 
        Queue<Integer> q = new LinkedList(); 
        q.add(1); 
        boolean[] seen = new boolean[n*n]; 
        seen[0] = true; 
        while (!q.isEmpty()) {
            for (int sz = q.size(); sz > 0; --sz) {
                int x = q.poll(); 
                if (x == n*n) return ans; 
                for (int xx = x+1; xx <= x+6 && xx <= n*n; ++xx) {
                    int i = (xx-1)/n, j = (xx-1)%n, jj = i%2 == 1 ? n-1-j : j, val = xx; 
                    if (board[n-1-i][jj] != -1) val = board[n-1-i][jj]; 
                    if (!seen[val-1]) {
                        q.add(val); 
                        seen[val-1] = true; 
                    }
                }
            }
            ++ans; 
        }
        return -1; 
    }


    /*918. Maximum Sum Circular Subarray (Medium)
    Given a circular integer array nums of length n, return the maximum 
    possible sum of a non-empty subarray of nums. A circular array means the 
    end of the array connects to the beginning of the array. Formally, the 
    next element of nums[i] is nums[(i + 1) % n] and the previous element of 
    nums[i] is nums[(i - 1 + n) % n]. A subarray may only include each element 
    of the fixed buffer nums at most once. Formally, for a subarray nums[i], 
    nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with 
    k1 % n == k2 % n.

    Example 1:
    Input: nums = [1,-2,3,-2]
    Output: 3
    Explanation: Subarray [3] has maximum sum 3.

    Example 2:
    Input: nums = [5,-3,5]
    Output: 10
    Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

    Example 3:
    Input: nums = [-3,-2,-3]
    Output: -2
    Explanation: Subarray [-2] has maximum sum -2.

    Constraints:
    * n == nums.length
    * 1 <= n <= 3 * 10^4
    * -3 * 10^4 <= nums[i] <= 3 * 10^4*/

    public int maxSubarraySumCircular(int[] nums) {
        int large = 0, small = 0, total = 0, most = Integer.MIN_VALUE, least = Integer.MIN_VALUE; 
        for (var x : nums) {
            total += x; 
            large = Math.max(0, large) + x; 
            most  = Math.max(most, large); 
            small = Math.max(0, small - x); 
            least = Math.max(least, small); 
        }
        return most >= 0 ? Math.max(most, total + least) : most; 
    }


    /*926. Flip String to Monotone Increasing (Medium)
    A binary string is monotone increasing if it consists of some number of 0's 
    (possibly none), followed by some number of 1's (also possibly none). You 
    are given a binary string s. You can flip s[i] changing it from 0 to 1 or 
    from 1 to 0. Return the minimum number of flips to make s monotone 
    increasing.

    Example 1:
    Input: s = "00110"
    Output: 1
    Explanation: We flip the last digit to get 00111.

    Example 2:
    Input: s = "010110"
    Output: 2
    Explanation: We flip to get 011111, or alternatively 000111.

    Example 3:
    Input: s = "00011000"
    Output: 2
    Explanation: We flip to get 00000000.

    Constraints:
    * 1 <= s.length <= 10^5
    * s[i] is either '0' or '1'.*/

    public int minFlipsMonoIncr(String s) {
        int ones = 0, flip = 0; 
        for (var ch : s.toCharArray()) {
            if (ch == '1') ++ones; 
            else flip = Math.min(ones, flip+1); 
        }
        return flip; 
    }


    /*953. Verifying an Alien Dictionary (Easy)
    In an alien language, surprisingly, they also use English lowercase letters, 
    but possibly in a different order. The order of the alphabet is some 
    permutation of lowercase letters. Given a sequence of words written in the 
    alien language, and the order of the alphabet, return true if and only if 
    the given words are sorted lexicographically in this alien language.

    Example 1:
    Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
    Output: true
    Explanation: As 'h' comes before 'l' in this language, then the sequence is 
                 sorted.

    Example 2:
    Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
    Output: false
    Explanation: As 'd' comes after 'l' in this language, then 
                 words[0] > words[1], hence the sequence is unsorted.
    
    Example 3:
    Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
    Output: false
    Explanation: The first three characters "app" match, and the second string 
                 is shorter (in size.) According to lexicographical rules 
                 "apple" > "app", because 'l' > '∅', where '∅' is defined as 
                 the blank character which is less than any other character 
                 (More info).

    Constraints:
    * 1 <= words.length <= 100
    * 1 <= words[i].length <= 20
    * order.length == 26
    * All characters in words[i] and order are English lowercase letters.*/

    public boolean isAlienSorted(String[] words, String order) {
        int[] mp = new int[26]; 
        for (int i = 0; i < 26; ++i) 
            mp[order.charAt(i)-'a'] = i; 
        String prev = "\n"; 
        for (var word : words) {
            StringBuilder sb = new StringBuilder(); 
            for (var ch : word.toCharArray()) 
                sb.append((char) (mp[ch-'a'] + 'a')); 
            if (prev.compareTo(sb.toString()) > 0) return false; 
            prev = sb.toString(); 
        }
        return true; 
    }


    /*974. Subarray Sums Divisible by K (Medium)
    Given an integer array nums and an integer k, return the number of non-
    empty subarrays that have a sum divisible by k. A subarray is a contiguous 
    part of an array.

    Example 1:
    Input: nums = [4,5,0,-2,-3,1], k = 5
    Output: 7
    Explanation: There are 7 subarrays with a sum divisible by k = 5:
                 [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], 
                 [0, -2, -3], [-2, -3]
    
    Example 2:
    Input: nums = [5], k = 9
    Output: 0

    Constraints:
    * 1 <= nums.length <= 3 * 10^4
    * -10^4 <= nums[i] <= 10^4
    * 2 <= k <= 10^4*/

    public int subarraysDivByK(int[] nums, int k) {
        int ans = 0, prefix = 0; 
        Map<Integer, Integer> freq = new HashMap(); 
        freq.put(0, 1); 
        for (var x : nums) {
            prefix = (prefix + x%k + k) % k; 
            ans += freq.getOrDefault(prefix, 0); 
            freq.merge(prefix, 1, Integer::sum); 
        }
        return ans; 
    }


    /*997. Find the Town Judge (Easy)
    In a town, there are n people labeled from 1 to n. There is a rumor that 
    one of these people is secretly the town judge. If the town judge exists, 
    then:
    * The town judge trusts nobody.
    * Everybody (except for the town judge) trusts the town judge.
    * There is exactly one person that satisfies properties 1 and 2.
    You are given an array trust where trust[i] = [ai, bi] representing that 
    the person labeled ai trusts the person labeled bi. Return the label of the 
    town judge if the town judge exists and can be identified, or return -1 
    otherwise.

    Example 1:
    Input: n = 2, trust = [[1,2]]
    Output: 2

    Example 2:
    Input: n = 3, trust = [[1,3],[2,3]]
    Output: 3

    Example 3:
    Input: n = 3, trust = [[1,3],[2,3],[3,1]]
    Output: -1

    Constraints:
    * 1 <= n <= 1000
    * 0 <= trust.length <= 10^4
    * trust[i].length == 2
    * All the pairs of trust are unique.
    * ai != bi
    * 1 <= ai, bi <= n*/

    public int findJudge(int n, int[][] trust) {
        int[] degree = new int[n]; 
        for (var t : trust) {
            degree[t[0]-1] -= 1; 
            degree[t[1]-1] += 1; 
        }
        for (int i = 0; i < n; ++i)
            if (degree[i] == n-1) return i+1; 
        return -1; 
    }


    /*1063. Number of Valid Subarrays (Hard)
    Given an integer array nums, return the number of non-empty subarrays with 
    the leftmost element of the subarray not larger than other elements in the 
    subarray. A subarray is a contiguous part of an array.

    Example 1:
    Input: nums = [1,4,2,5,3]
    Output: 11
    Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],
                 [1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].
    
    Example 2:
    Input: nums = [3,2,1]
    Output: 3
    Explanation: The 3 valid subarrays are: [3],[2],[1].

    Example 3:
    Input: nums = [2,2,2]
    Output: 6
    Explanation: There are 6 valid subarrays: [2],[2],[2],[2,2],[2,2],[2,2,2].

    Constraints:
    * 1 <= nums.length <= 5 * 10^4
    * 0 <= nums[i] <= 10^5*/

    public int validSubarrays(int[] nums) {
        int ans = 0; 
        Stack<Integer> stk = new Stack(); 
        for (var x : nums) {
            while (!stk.isEmpty() && stk.peek() > x) stk.pop(); 
            stk.push(x); 
            ans += stk.size(); 
        }
        return ans; 
    }


    /*1071. Greatest Common Divisor of Strings (Easy)
    For two strings s and t, we say "t divides s" if and only if s = t + ... + t 
    (i.e., t is concatenated with itself one or more times). Given two strings 
    str1 and str2, return the largest string x such that x divides both str1 
    and str2.

    Example 1:
    Input: str1 = "ABCABC", str2 = "ABC"
    Output: "ABC"

    Example 2:
    Input: str1 = "ABABAB", str2 = "ABAB"
    Output: "AB"

    Example 3:
    Input: str1 = "LEET", str2 = "CODE"
    Output: ""

    Constraints:
    * 1 <= str1.length, str2.length <= 1000
    * str1 and str2 consist of English uppercase letters.*/

    public String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) return ""; 
        int g = BigInteger.valueOf(str1.length()).gcd(BigInteger.valueOf(str2.length())).intValue();
        return str1.substring(0, g); 
    }


    /*1121. Divide Array Into Increasing Sequences (Hard)
    Given an integer array nums sorted in non-decreasing order and an integer k, 
    return true if this array can be divided into one or more disjoint 
    increasing subsequences of length at least k, or false otherwise.

    Example 1:
    Input: nums = [1,2,2,3,3,4,4], k = 3
    Output: true
    Explanation: The array can be divided into two subsequences [1,2,3,4] and 
                 [2,3,4] with lengths at least 3 each.
    
    Example 2:
    Input: nums = [5,6,6,7,8], k = 3
    Output: false
    Explanation: There is no way to divide the array using the conditions 
                 required.

    Constraints:
    * 1 <= k <= nums.length <= 10^5
    * 1 <= nums[i] <= 10^5
    * nums is sorted in non-decreasing order.*/

    public boolean canDivideIntoSubsequences(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap(); 
        int m = 0; 
        for (var x : nums) {
            freq.merge(x, 1, Integer::sum); 
            m = Math.max(m, freq.get(x)); 
        }
        return m * k <= nums.length; 
    }


    /*1137. N-th Tribonacci Number (Easy)
    The Tribonacci sequence Tn is defined as follows: 
    T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
    Given n, return the value of Tn.

    Example 1:
    Input: n = 4
    Output: 4
    Explanation: T_3 = 0 + 1 + 1 = 2
                 T_4 = 1 + 1 + 2 = 4
    
    Example 2:
    Input: n = 25
    Output: 1389537

    Constraints:
    * 0 <= n <= 37
    * The answer is guaranteed to fit within a 32-bit integer, ie. 
      answer <= 2^31 - 1.*/

    public int tribonacci(int n) {
        int[] dp = new int[] {0, 1, 1}; 
        for (int i = 0; i < n; ++i) 
            dp[i%3] = dp[0] + dp[1] + dp[2]; 
        return dp[n%3]; 
    }


    /*1183. Maximum Number of Ones (Hard)
    Consider a matrix M with dimensions width * height, such that every cell 
    has value 0 or 1, and any square sub-matrix of M of size 
    sideLength * sideLength has at most maxOnes ones. Return the maximum 
    possible number of ones that the matrix M can have.

    Example 1:
    Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
    Output: 4
    Explanation: In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.
                 The best solution that has 4 ones is:
                 [1,0,1]
                 [0,0,0]
                 [1,0,1]
    
    Example 2:
    Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
    Output: 6
    Explanation: [1,0,1]
                 [1,0,1]
                 [1,0,1]

    Constraints:
    * 1 <= width, height <= 100
    * 1 <= sideLength <= width, height
    * 0 <= maxOnes <= sideLength * sideLength*/

    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        if (width < height) { int temp = width; width = height; height = temp; }
        int nw = width/sideLength, rw = width%sideLength, nh = height/sideLength, rh = height%sideLength; 
        int ans = nw * nh * maxOnes + (nw + nh + 1) * Math.min(maxOnes, rw * rh); 
        maxOnes -= rw * rh; 
        if (maxOnes > 0) {
            ans += nw * Math.min(maxOnes, (sideLength - rw) * rh); 
            maxOnes -= (sideLength - rw) * rh; 
            if (maxOnes > 0) ans += nh * Math.min(maxOnes, rw * (sideLength - rh)); 
        }
        return ans; 
    }


    /*1231. Divide Chocolate (Hard)
    You have one chocolate bar that consists of some chunks. Each chunk has its 
    own sweetness given by the array sweetness. You want to share the chocolate 
    with your k friends so you start cutting the chocolate bar into k + 1 
    pieces using k cuts, each piece consists of some consecutive chunks. Being 
    generous, you will eat the piece with the minimum total sweetness and give 
    the other pieces to your friends. Find the maximum total sweetness of the 
    piece you can get by cutting the chocolate bar optimally.

    Example 1:
    Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5
    Output: 6
    Explanation: You can divide the chocolate to [1,2,3], [4,5], [6], [7], [8], [9]

    Example 2:
    Input: sweetness = [5,6,7,8,9,1,2,3,4], k = 8
    Output: 1
    Explanation: There is only one way to cut the bar into 9 pieces.

    Example 3:
    Input: sweetness = [1,2,2,1,2,2,1,2,2], k = 2
    Output: 5
    Explanation: You can divide the chocolate to [1,2,2], [1,2,2], [1,2,2]

    Constraints:
    * 0 <= k < sweetness.length <= 10^4
    * 1 <= sweetness[i] <= 10^5*/

    public int maximizeSweetness(int[] sweetness, int k) {
        int lo = 0, hi = 1_000_000_000;
        while (lo < hi) {
            int mid = lo + (hi-lo+1)/2, cnt = 0, prefix = 0; 
            for (var x : sweetness) {
                prefix += x; 
                if (prefix >= mid) {
                    ++cnt; 
                    prefix = 0; 
                }
            }
            if (cnt < k+1) hi = mid-1; 
            else lo = mid; 
        }
        return lo; 
    }


    /*1274. Number of Ships in a Rectangle (Hard)
    (This problem is an interactive problem.) Each ship is located at an 
    integer point on the sea represented by a cartesian plane, and each integer 
    point may contain at most 1 ship. You have a function 
    Sea.hasShips(topRight, bottomLeft) which takes two points as arguments and 
    returns true If there is at least one ship in the rectangle represented by 
    the two points, including on the boundary. Given two points: the top right 
    and bottom left corners of a rectangle, return the number of ships present 
    in that rectangle. It is guaranteed that there are at most 10 ships in that 
    rectangle. Submissions making more than 400 calls to hasShips will be 
    judged Wrong Answer. Also, any solutions that attempt to circumvent the 
    judge will result in disqualification.

    Example :
    Input: ships = [[1,1],[2,2],[3,3],[5,5]], topRight = [4,4], bottomLeft = [0,0]
    Output: 3
    Explanation: From [0,0] to [4,4] we can count 3 ships within the range.
    
    Example 2:
    Input: ans = [[1,1],[2,2],[3,3]], topRight = [1000,1000], bottomLeft = [0,0]
    Output: 3

    Constraints:
    * On the input ships is only given to initialize the map internally. You 
      must solve this problem "blindfolded". In other words, you must find the 
      answer using the given hasShips API, without knowing the ships position.
    * 0 <= bottomLeft[0] <= topRight[0] <= 1000
    * 0 <= bottomLeft[1] <= topRight[1] <= 1000
    * topRight != bottomLeft*/

    public int countShips(Sea sea, int[] topRight, int[] bottomLeft) {
        if (!sea.hasShips(topRight, bottomLeft)) return 0;
        int x0 = bottomLeft[0], y0 = bottomLeft[1], x1 = topRight[0], y1 = topRight[1]; 
        if (x0 == x1 && y0 == y1) return 1;
        if (x0 < x1) {
            int mid = (x0 + x1)/2; 
            return countShips(sea, topRight, new int[]{mid+1, y0}) + countShips(sea, new int[]{mid, y1}, bottomLeft); 
        }
        int mid = (y0 + y1)/2; 
        return countShips(sea, topRight, new int[]{x0, mid+1}) + countShips(sea, new int[]{x1, mid}, bottomLeft);
    }


    /*1443. Minimum Time to Collect All Apples in a Tree (Medium)
    Given an undirected tree consisting of n vertices numbered from 0 to n-1, 
    which has some apples in their vertices. You spend 1 second to walk over 
    one edge of the tree. Return the minimum time in seconds you have to spend 
    to collect all apples in the tree, starting at vertex 0 and coming back to 
    this vertex. The edges of the undirected tree are given in the array edges, 
    where edges[i] = [ai, bi] means that exists an edge connecting the vertices 
    ai and bi. Additionally, there is a boolean array hasApple, where 
    hasApple[i] = true means that vertex i has an apple; otherwise, it does not 
    have any apple.

    Example 1:
    Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], 
           hasApple = [false,false,true,false,true,true,false]
    Output: 8 
    Explanation: The figure above represents the given tree where red vertices 
                 have an apple. One optimal path to collect all apples is shown 
                 by the green arrows.  
    
    Example 2:
    Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], 
           hasApple = [false,false,true,false,false,true,false]
    Output: 6
    Explanation: The figure above represents the given tree where red vertices 
                 have an apple. One optimal path to collect all apples is shown 
                 by the green arrows.  
    
    Example 3:
    Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], 
           hasApple = [false,false,false,false,false,false,false]
    Output: 0

    Constraints:
    * 1 <= n <= 10^5
    * edges.length == n - 1
    * edges[i].length == 2
    * 0 <= ai < bi <= n - 1
    * fromi < toi
    * hasApple.length == n*/

    public int minTime(int n, int[][] edges, List<Boolean> hasApple) {
        List<Integer>[] tree = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) tree[u] = new ArrayList(); 
        for (var e : edges) {
            tree[e[0]].add(e[1]); 
            tree[e[1]].add(e[0]); 
        }
        int[] ans = new int[n]; 
        boolean[] seen = new boolean[n]; 
        Stack<Pair<Integer, Integer>> stk = new Stack(); stk.push(new Pair(0, -1)); 
        while (!stk.isEmpty()) {
            var elem = stk.peek(); 
            int u = elem.getKey(), p = elem.getValue(); 
            if (seen[u]) {
                for (var v : tree[u]) 
                    if (v != p) ans[u] += ans[v]; 
                if (u > 0 && (ans[u] > 0 || hasApple.get(u))) ++ans[u]; 
                stk.pop(); 
            } else {
                for (var v : tree[u]) 
                    if (v != p) stk.push(new Pair(v, u)); 
                seen[u] = true; 
            }
        }
        return ans[0]*2; 
    }


    /*1519. Number of Nodes in the Sub-Tree With the Same Label (Medium)
    You are given a tree (i.e. a connected, undirected graph that has no cycles) 
    consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges. The 
    root of the tree is the node 0, and each node of the tree has a label which 
    is a lower-case character given in the string labels (i.e. The node with 
    the number i has the label labels[i]). The edges array is given on the form 
    edges[i] = [ai, bi], which means there is an edge between nodes ai and bi 
    in the tree. Return an array of size n where ans[i] is the number of nodes 
    in the subtree of the ith node which have the same label as node i. A 
    subtree of a tree T is the tree consisting of a node in T and all of its 
    descendant nodes.

    Example 1:
    Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"
    Output: [2,1,1,1,1,1,1]
    Explanation: Node 0 has label 'a' and its sub-tree has node 2 with label 
                 'a' as well, thus the answer is 2. Notice that any node is 
                 part of its sub-tree. Node 1 has a label 'b'. The sub-tree of 
                 node 1 contains nodes 1,4 and 5, as nodes 4 and 5 have 
                 different labels than node 1, the answer is just 1 (the node 
                 itself).
    
    Example 2:
    Input: n = 4, edges = [[0,1],[1,2],[0,3]], labels = "bbbb"
    Output: [4,2,1,1]
    Explanation: The sub-tree of node 2 contains only node 2, so the answer is 
                 1. The sub-tree of node 3 contains only node 3, so the answer 
                 is 1. The sub-tree of node 1 contains nodes 1 and 2, both have 
                 label 'b', thus the answer is 2. The sub-tree of node 0 
                 contains nodes 0, 1, 2 and 3, all with label 'b', thus the 
                 answer is 4.
    
    Example 3:
    Input: n = 5, edges = [[0,1],[0,2],[1,3],[0,4]], labels = "aabab"
    Output: [3,2,1,1,1]

    Constraints:
    * 1 <= n <= 10^5
    * edges.length == n - 1
    * edges[i].length == 2
    * 0 <= ai, bi < n
    * ai != bi
    * labels.length == n
    * labels is consisting of only of lowercase English letters.*/

    public int[] countSubTrees(int n, int[][] edges, String labels) {
        List<Integer>[] tree = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) tree[u] = new ArrayList(); 
        for (var e : edges) {
            tree[e[0]].add(e[1]); 
            tree[e[1]].add(e[0]); 
        }
        int[] ans = new int[n]; 
        boolean[] seen = new boolean[n]; 
        int[][] freq = new int[n][26]; 
        Stack<Pair<Integer, Integer>> stk = new Stack(); 
        stk.push(new Pair(0, -1)); 
        while (!stk.isEmpty()) {
            var elem = stk.peek(); 
            int u = elem.getKey(), p = elem.getValue(); 
            if (seen[u]) {
                ++freq[u][labels.charAt(u) - 'a']; 
                for (var v : tree[u]) 
                    if (v != p) 
                        for (int i = 0; i < 26; ++i)
                            freq[u][i] += freq[v][i]; 
                ans[u] = freq[u][labels.charAt(u) - 'a']; 
                stk.pop(); 
            } else {
                for (var v : tree[u])
                    if (v != p) stk.push(new Pair(v, u)); 
                seen[u] = true; 
            }
        }
        return ans; 
    }


    /*1714. Sum Of Special Evenly-Spaced Elements In Array (Hard)
    You are given a 0-indexed integer array nums consisting of n non-negative 
    integers. You are also given an array queries, where queries[i] = [xi, yi]. 
    The answer to the ith query is the sum of all nums[j] where xi <= j < n 
    and (j - xi) is divisible by yi. Return an array answer where 
    answer.length == queries.length and answer[i] is the answer to the ith 
    query modulo 10^9 + 7.

    Example 1:
    Input: nums = [0,1,2,3,4,5,6,7], queries = [[0,3],[5,1],[4,2]]
    Output: [9,18,10]
    Explanation: The answers of the queries are as follows:
                 1) The j indices that satisfy this query are 0, 3, and 6. 
                    nums[0] + nums[3] + nums[6] = 9
                 2) The j indices that satisfy this query are 5, 6, and 7. 
                    nums[5] + nums[6] + nums[7] = 18
                 3) The j indices that satisfy this query are 4 and 6. 
                    nums[4] + nums[6] = 10
    
    Example 2:
    Input: nums = [100,200,101,201,102,202,103,203], queries = [[0,7]]
    Output: [303]

    Constraints:
    * n == nums.length
    * 1 <= n <= 5 * 10^4
    * 0 <= nums[i] <= 10^9
    * 1 <= queries.length <= 1.5 * 10^5
    * 0 <= xi < n
    * 1 <= yi <= 5 * 10^4*/

    public int[] solve(int[] nums, int[][] queries) {
        final int mod = 1_000_000_007; 
        int n = nums.length, r = (int) Math.sqrt(n); 
        long[][] dp = new long[n][r]; 
        for (int i = n-1; i >= 0; --i) 
            for (int j = 0; j < r; ++j) {
                dp[i][j] = nums[i]; 
                if (i+j < n) dp[i][j] = (dp[i][j] + dp[i+j][j]) % mod; 
            }
        int[] ans = new int[queries.length]; 
        for (int i = 0; i < queries.length; ++i) {
            int x = queries[i][0], y = queries[i][1]; 
            if (y < r) ans[i] = (int) dp[x][y]; 
            else {
                long val = 0; 
                for (int j = x; j < n; j += y) val = (val + nums[j]) % mod; 
                ans[i] = (int) val; 
            }
        }
        return ans; 
    }


    /*1962. Remove Stones to Minimize the Total (Medium)
    You are given a 0-indexed integer array piles, where piles[i] represents 
    the number of stones in the ith pile, and an integer k. You should apply 
    the following operation exactly k times:
    * Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
    Notice that you can apply the operation on the same pile more than once.
    Return the minimum possible total number of stones remaining after applying 
    the k operations. floor(x) is the greatest integer that is smaller than or 
    equal to x (i.e., rounds x down).

    Example 1:
    Input: piles = [5,4,9], k = 2
    Output: 12
    Explanation: Steps of a possible scenario are:
                 - Apply the operation on pile 2. The resulting piles are 
                   [5,4,5].
                 - Apply the operation on pile 0. The resulting piles are 
                   [3,4,5].
                 The total number of stones in [3,4,5] is 12.
    
    Example 2:
    Input: piles = [4,3,6,7], k = 3
    Output: 12
    Explanation: Steps of a possible scenario are:
                 - Apply the operation on pile 2. The resulting piles are 
                   [4,3,3,7].
                 - Apply the operation on pile 3. The resulting piles are 
                   [4,3,3,4].
                 - Apply the operation on pile 0. The resulting piles are 
                   [2,3,3,4].
                 The total number of stones in [2,3,3,4] is 12.

    Constraints:
    * 1 <= piles.length <= 10^5
    * 1 <= piles[i] <= 10^4
    * 1 <= k <= 10^5*/

    public int minStoneSum(int[] piles, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue(Collections.reverseOrder()); 
        for (var x : piles) pq.add(x); 
        while (k-- > 0) {
            var x = pq.poll(); 
            x -= x/2; 
            pq.add(x); 
        }
        int ans = 0; 
        while (!pq.isEmpty()) ans += pq.poll(); 
        return ans; 
    }


    /*2046. Sort Linked List Already Sorted Using Absolute Values (Medium)
    Given the head of a singly linked list that is sorted in non-decreasing 
    order using the absolute values of its nodes, return the list sorted in 
    non-decreasing order using the actual values of its nodes.

    Example 1:
    Input: head = [0,2,-5,5,10,-10]
    Output: [-10,-5,0,2,5,10]
    Explanation: The list sorted in non-descending order using the absolute 
                 values of the nodes is [0,2,-5,5,10,-10]. The list sorted in 
                 non-descending order using the actual values is 
                 [-10,-5,0,2,5,10].
    
    Example 2:
    Input: head = [0,1,2]
    Output: [0,1,2]
    Explanation: The linked list is already sorted in non-decreasing order.
    
    Example 3:
    Input: head = [1]
    Output: [1]
    Explanation: The linked list is already sorted in non-decreasing order.

    Constraints:
    * The number of nodes in the list is the range [1, 10^5].
    * -5000 <= Node.val <= 5000
    * head is sorted in non-decreasing order using the absolute value of its 
      nodes.

    Follow up: Can you think of a solution with O(n) time complexity?*/

    public ListNode sortLinkedList(ListNode head) {
        ListNode prev = head, node = head.next; 
        while (node != null) 
            if (node.val < 0) {
                prev.next = node.next; 
                node.next = head; 
                head = node; 
                node = prev.next; 
            } else {
                prev = node; 
                node = node.next; 
            }
        return head; 
    }


    /*2052. Minimum Cost to Separate Sentence Into Rows (Medium)
    You are given a string sentence containing words separated by spaces, and 
    an integer k. Your task is to separate sentence into rows where the number 
    of characters in each row is at most k. You may assume that sentence does 
    not begin or end with a space, and the words in sentence are separated by a 
    single space. You can split sentence into rows by inserting line breaks 
    between words in sentence. A word cannot be split between two rows. Each 
    word must be used exactly once, and the word order cannot be rearranged. 
    Adjacent words in a row should be separated by a single space, and rows 
    should not begin or end with spaces. The cost of a row with length n is 
    (k - n)2, and the total cost is the sum of the costs for all rows except 
    the last one.
    * For example if sentence = "i love leetcode" and k = 12:
      + Separating sentence into "i", "love", and "leetcode" has a cost of 
        (12 - 1)2 + (12 - 4)2 = 185.
      + Separating sentence into "i love", and "leetcode" has a cost of 
        (12 - 6)2 = 36.
      + Separating sentence into "i", and "love leetcode" is not possible 
        because the length of "love leetcode" is greater than k.
    Return the minimum possible total cost of separating sentence into rows.

    Example 1:
    Input: sentence = "i love leetcode", k = 12
    Output: 36
    Explanation: Separating sentence into "i", "love", and "leetcode" has a 
                 cost of (12 - 1)^2 + (12 - 4)^2 = 185. Separating sentence 
                 into "i love", and "leetcode" has a cost of (12 - 6)^2 = 36. 
                 Separating sentence into "i", "love leetcode" is not possible 
                 because "love leetcode" has length 13. 36 is the minimum 
                 possible total cost so return it.
    
    Example 2:
    Input: sentence = "apples and bananas taste great", k = 7
    Output: 21
    Explanation: Separating sentence into "apples", "and", "bananas", "taste", 
                 and "great" has a cost of 
                 (7 - 6)^2 + (7 - 3)^2 + (7 - 7)^2 + (7 - 5)^2 = 21. 21 is the 
                 minimum possible total cost so return it.
    
    Example 3:
    Input: sentence = "a", k = 5
    Output: 0
    Explanation: The cost of the last row is not included in the total cost, 
                 and since there is only one row, return 0.

    Constraints:
    * 1 <= sentence.length <= 5000
    * 1 <= k <= 5000
    * The length of each word in sentence is at most k.
    * sentence consists of only lowercase English letters and spaces.
    * sentence does not begin or end with a space.
    * Words in sentence are separated by a single space.*/

    public int minimumCost(String sentence, int k) {
        if (sentence.length() <= k) return 0; 
        String[] words = sentence.split(" ");
        int n = words.length; 
        int[] dp = new int[n]; 
        Arrays.fill(dp, Integer.MAX_VALUE); 
        dp[n-1] = 0; 
        for (int i = n-2; i >= 0; --i) {
            int prefix = -1; 
            for (int j = i; j < n; ++j) {
                prefix += 1 + words[j].length(); 
                if (prefix <= k) dp[i] = j == n-1 ? 0 : Math.min(dp[i], (prefix-k)*(prefix-k) + dp[j+1]); 
                else break; 
            }
        }
        return dp[0]; 
    }


    /*2061. Number of Spaces Cleaning Robot Cleaned (Medium)
    A room is represented by a 0-indexed 2D binary matrix room where a 0 
    represents an empty space and a 1 represents a space with an object. The 
    top left corner of the room will be empty in all test cases. A cleaning 
    robot starts at the top left corner of the room and is facing right. The 
    robot will continue heading straight until it reaches the edge of the room 
    or it hits an object, after which it will turn 90 degrees clockwise and 
    repeat this process. The starting space and all spaces that the robot 
    visits are cleaned by it. Return the number of clean spaces in the room if 
    the robot runs indefinetely.

    Example 1:
    Input: room = [[0,0,0],[1,1,0],[0,0,0]]
    Output: 7
    Explanation: The robot cleans the spaces at (0, 0), (0, 1), and (0, 2). The 
                 robot is at the edge of the room, so it turns 90 degrees 
                 clockwise and now faces down. The robot cleans the spaces at 
                 (1, 2), and (2, 2). The robot is at the edge of the room, so 
                 it turns 90 degrees clockwise and now faces left. The robot 
                 cleans the spaces at (2, 1), and (2, 0). The robot has cleaned 
                 all 7 empty spaces, so return 7.
    
    Example 2:
    Input: room = [[0,1,0],[1,0,0],[0,0,0]]
    Output: 1
    Explanation: The robot cleans the space at (0, 0). The robot hits an object, 
                 so it turns 90 degrees clockwise and now faces down. The robot 
                 hits an object, so it turns 90 degrees clockwise and now faces 
                 left. The robot is at the edge of the room, so it turns 90 
                 degrees clockwise and now faces up. The robot is at the edge 
                 of the room, so it turns 90 degrees clockwise and now faces 
                 right. The robot is back at its starting position. The robot 
                 has cleaned 1 space, so return 1.

    Constraints:
    * m == room.length
    * n == room[r].length
    * 1 <= m, n <= 300
    * room[r][c] is either 0 or 1.
    * room[0][0] == 0*/

    public int numberOfCleanRooms(int[][] room) {
        int m = room.length, n = room[0].length, ans = 0; 
        int[] dir = new int[]{0, 1, 0, -1, 0}; 
        int[][] seen = new int[m][n]; 
        for (int i = 0, j = 0, k = 0; (seen[i][j] & 1<<k) == 0; ) {
            if (room[i][j] == 0) {
                ++ans; 
                room[i][j] = -1; 
            }
            seen[i][j] |= 1<<k; 
            int ii = i + dir[k], jj = j + dir[k+1]; 
            if (0 <= ii && ii < m && 0 <= jj && jj < n && room[ii][jj] != 1) { i = ii; j = jj; }
            else k = (k+1) % 4; 
        }
        return ans; 
    }


    /*2067. Number of Equal Count Substrings (Medium)
    You are given a 0-indexed string s consisting of only lowercase English 
    letters, and an integer count. A substring of s is said to be an equal 
    count substring if, for each unique letter in the substring, it appears 
    exactly count times in the substring. Return the number of equal count 
    substrings in s. A substring is a contiguous non-empty sequence of 
    characters within a string.

    Example 1:
    Input: s = "aaabcbbcc", count = 3
    Output: 3
    Explanation: The substring that starts at index 0 and ends at index 2 is 
                 "aaa". The letter 'a' in the substring ap`pears exactly 3 
                 times. The substring that starts at index 3 and ends at index 
                 8 is "bcbbcc". The letters 'b' and 'c' in the substring appear 
                 exactly 3 times. The substring that starts at index 0 and ends 
                 at index 8 is "aaabcbbcc". The letters 'a', 'b', and 'c' in 
                 the substring appear exactly 3 times.
    
    Example 2:
    Input: s = "abcd", count = 2
    Output: 0
    Explanation: The number of times each letter appears in s is less than 
                 count. Therefore, no substrings in s are equal count 
                 substrings, so return 0.
    
    Example 3:
    Input: s = "a", count = 5
    Output: 0
    Explanation: The number of times each letter appears in s is less than 
                 count. Therefore, no substrings in s are equal count 
                 substrings, so return 0

    Constraints:
    * 1 <= s.length <= 3 * 10^4
    * 1 <= count <= 3 * 10^4
    * s consists only of lowercase English letters.*/

    public int equalCountSubstrings(String s, int count) {
        int ans = 0; 
        for (int k = 1; k <= 26; ++k) {
            int[] freq = new int[26]; 
            int uniq = 0; 
            for (int i = 0; i < s.length(); ++i) {
                if(++freq[s.charAt(i)-'a'] == count) ++uniq; 
                if (i >= k*count && freq[s.charAt(i-k*count)-'a']-- == count) --uniq; 
                if (uniq == k) ++ans; 
            }
        }
        return ans; 
    }


    /*2077. Paths in Maze That Lead to Same Room (Medium)
    A maze consists of n rooms numbered from 1 to n, and some rooms are 
    connected by corridors. You are given a 2D integer array corridors where 
    corridors[i] = [room1i, room2i] indicates that there is a corridor 
    connecting room1i and room2i, allowing a person in the maze to go from 
    room1i to room2i and vice versa. The designer of the maze wants to know 
    how confusing the maze is. The confusion score of the maze is the number 
    of different cycles of length 3.
    * For example, 1 → 2 → 3 → 1 is a cycle of length 3, but 1 → 2 → 3 → 4 and 
      1 → 2 → 3 → 2 → 1 are not.
    Two cycles are considered to be different if one or more of the rooms 
    visited in the first cycle is not in the second cycle. Return the confusion 
    score of the maze.

    Example 1:
    Input: n = 5, corridors = [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]]
    Output: 2
    Explanation: One cycle of length 3 is 4 → 1 → 3 → 4, denoted in red. Note 
                 that this is the same cycle as 3 → 4 → 1 → 3 or 1 → 3 → 4 → 1 
                 because the rooms are the same. Another cycle of length 3 is 
                 1 → 2 → 4 → 1, denoted in blue. Thus, there are two different 
                 cycles of length 3.
    
    Example 2:
    Input: n = 4, corridors = [[1,2],[3,4]]
    Output: 0
    Explanation: There are no cycles of length 3.

    Constraints:
    * 2 <= n <= 1000
    * 1 <= corridors.length <= 5 * 10^4
    * corridors[i].length == 2
    * 1 <= room1i, room2i <= n
    * room1i != room2i
    * There are no duplicate corridors.*/

    public int numberOfPaths(int n, int[][] corridors) {
        HashSet<Integer>[] graph = new HashSet[n]; 
        for (int i = 0; i < n; ++i) graph[i] = new HashSet(); 
        for (int[] c : corridors) {
            graph[c[0]-1].add(c[1]-1); 
            graph[c[1]-1].add(c[0]-1); 
        }
        int ans = 0; 
        for (int[] c : corridors) 
            for (int u : graph[c[0]-1]) 
                if (graph[c[1]-1].contains(u)) ++ans; 
        return ans/3; 
    }


    /*2083. Substrings That Begin and End With the Same Letter (Medium)
    You are given a 0-indexed string s consisting of only lowercase English 
    letters. Return the number of substrings in s that begin and end with the 
    same character. A substring is a contiguous non-empty sequence of 
    characters within a string.

    Example 1:
    Input: s = "abcba"
    Output: 7
    Explanation: The substrings of length 1 that start and end with the same 
                 letter are: "a", "b", "c", "b", and "a". The substring of 
                 length 3 that starts and ends with the same letter is: "bcb".
                 The substring of length 5 that starts and ends with the same 
                 letter is: "abcba".
    
    Example 2:
    Input: s = "abacad"
    Output: 9
    Explanation: The substrings of length 1 that start and end with the same 
                 letter are: "a", "b", "a", "c", "a", and "d". The substrings 
                 of length 3 that start and end with the same letter are: "aba" 
                 and "aca". The substring of length 5 that starts and ends with 
                 the same letter is: "abaca".
    
    Example 3:
    Input: s = "a"
    Output: 1
    Explanation: The substring of length 1 that starts and ends with the same 
                 letter is: "a".

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists only of lowercase English letters.*/

    public long numberOfSubstrings(String s) {
        long ans = 0; 
        int[] freq = new int[26]; 
        for (char ch : s.toCharArray()) 
            ans += ++freq[ch - 'a']; 
        return ans; 
    }


    /*2098. Subsequence of Size K With the Largest Even Sum (Medium)
    You are given an integer array nums and an integer k. Find the largest even 
    sum of any subsequence of nums that has a length of k. Return this sum, or 
    -1 if such a sum does not exist. A subsequence is an array that can be 
    derived from another array by deleting some or no elements without changing 
    the order of the remaining elements.

    Example 1:
    Input: nums = [4,1,5,3,1], k = 3
    Output: 12
    Explanation: The subsequence with the largest possible even sum is [4,5,3]. 
                 It has a sum of 4 + 5 + 3 = 12.
    
    Example 2:
    Input: nums = [4,6,2], k = 3
    Output: 12
    Explanation: The subsequence with the largest possible even sum is [4,6,2]. 
                 It has a sum of 4 + 6 + 2 = 12.
    
    Example 3:
    Input: nums = [1,3,5], k = 1
    Output: -1
    Explanation: No subsequence of nums with length 1 has an even sum.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 0 <= nums[i] <= 10^5
    * 1 <= k <= nums.length*/

    public long largestEvenSum(int[] nums, int k) {
        long ans = -1, prefix = 0; 
        int[] least = new int[]{Integer.MAX_VALUE, Integer.MAX_VALUE}; 
        Arrays.sort(nums); 
        for (int i = 0, n = nums.length; i < n/2; ++i) { 
            nums[i] ^= nums[n-1-i]; 
            nums[n-1-i] ^= nums[i]; 
            nums[i] ^= nums[n-1-i]; 
        }
        for (int i = 0; i < nums.length; ++i) 
            if (i < k) {
                prefix += nums[i]; 
                least[nums[i]&1] = Math.min(least[nums[i]&1], nums[i]); 
                if (i == k-1 && (prefix&1) == 0) return prefix; 
            } else ans = Math.max(ans, prefix - least[1-(nums[i]&1)] + nums[i]); 
        return ans; 
    }


    /*2107. Number of Unique Flavors After Sharing K Candies (Medium)
    You are given a 0-indexed integer array candies, where candies[i] 
    represents the flavor of the ith candy. Your mom wants you to share these 
    candies with your little sister by giving her k consecutive candies, but 
    you want to keep as many flavors of candies as possible. Return the maximum 
    number of unique flavors of candy you can keep after sharing with your 
    sister.

    Example 1:
    Input: candies = [1,2,2,3,4,3], k = 3
    Output: 3
    Explanation: Give the candies in the range [1, 3] (inclusive) with flavors 
                 [2,2,3]. You can eat candies with flavors [1,4,3]. There are 3 
                 unique flavors, so return 3.
    
    Example 2:
    Input: candies = [2,2,2,2,3,3], k = 2
    Output: 2
    Explanation: Give the candies in the range [3, 4] (inclusive) with flavors 
                 [2,3]. You can eat candies with flavors [2,2,2,3]. There are 2 
                 unique flavors, so return 2. Note that you can also share the 
                 candies with flavors [2,2] and eat the candies with flavors 
                 [2,2,3,3].
    
    Example 3:
    Input: candies = [2,4,5], k = 0
    Output: 3
    Explanation: You do not have to give any candies. You can eat the candies 
                 with flavors [2,4,5]. There are 3 unique flavors, so return 3.

    Constraints:
    * 1 <= candies.length <= 10^5
    * 1 <= candies[i] <= 10^5
    * 0 <= k <= candies.length*/

    public int shareCandies(int[] candies, int k) {
        int ans = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (int x : candies) freq.merge(x, 1, Integer::sum); 
        for (int i = 0; i < candies.length; ++i) {
            freq.merge(candies[i], -1, Integer::sum); 
            if (freq.get(candies[i]) == 0) freq.remove(candies[i]); 
            if (i >= k) freq.merge(candies[i-k], 1, Integer::sum); 
            if (i >= k-1) ans = Math.max(ans, freq.size()); 
        }
        return ans; 
    }


    /*2113. Elements in Array After Removing and Replacing Elements (Medium)
    You are given a 0-indexed integer array nums. Initially on minute 0, the 
    array is unchanged. Every minute, the leftmost element in nums is removed 
    until no elements remain. Then, every minute, one element is appended to 
    the end of nums, in the order they were removed in, until the original 
    array is restored. This process repeats indefinitely.
    * For example, the array [0,1,2] would change as follows: [0,1,2] → [1,2] 
      → [2] → [] → [0] → [0,1] → [0,1,2] → [1,2] → [2] → [] → [0] → [0,1] 
      → [0,1,2] → ...
    You are also given a 2D integer array queries of size n where 
    queries[j] = [timej, indexj]. The answer to the jth query is:
    * nums[indexj] if indexj < nums.length at minute timej
    * -1 if indexj >= nums.length at minute timej
    Return an integer array ans of size n where ans[j] is the answer to the jth 
    query.

    Example 1:
    Input: nums = [0,1,2], queries = [[0,2],[2,0],[3,2],[5,0]]
    Output: [2,2,-1,0]
    Explanation: Minute 0: [0,1,2] - All elements are in the nums.
                 Minute 1: [1,2]   - The leftmost element, 0, is removed.
                 Minute 2: [2]     - The leftmost element, 1, is removed.
                 Minute 3: []      - The leftmost element, 2, is removed.
                 Minute 4: [0]     - 0 is added to the end of nums.
                 Minute 5: [0,1]   - 1 is added to the end of nums.
                 At minute 0, nums[2] is 2.
                 At minute 2, nums[0] is 2.
                 At minute 3, nums[2] does not exist.
                 At minute 5, nums[0] is 0.

    Example 2:
    Input: nums = [2], queries = [[0,0],[1,0],[2,0],[3,0]]
    Output: [2,-1,2,-1]
    Explanation: Minute 0: [2] - All elements are in the nums.
                 Minute 1: []  - The leftmost element, 2, is removed.
                 Minute 2: [2] - 2 is added to the end of nums.
                 Minute 3: []  - The leftmost element, 2, is removed.
                 At minute 0, nums[0] is 2.
                 At minute 1, nums[0] does not exist.
                 At minute 2, nums[0] is 2.
                 At minute 3, nums[0] does not exist.

    Constraints:
    * 1 <= nums.length <= 100
    * 0 <= nums[i] <= 100
    * n == queries.length
    * 1 <= n <= 10^5
    * queries[j].length == 2
    * 0 <= timej <= 10^5
    * 0 <= indexj < nums.length*/

    public int[] elementInNums(int[] nums, int[][] queries) {
        int[] ans = new int[queries.length]; 
        for (int i = 0; i < queries.length; ++i) {
            int t = queries[i][0], k = queries[i][1]; 
            t %= 2*nums.length; 
            if (t < nums.length-k) ans[i] = nums[k+t]; 
            else if (t <= nums.length+k) ans[i] = -1; 
            else ans[i] = nums[k]; 
        }
        return ans; 
    }


    /*2143. Choose Numbers From Two Arrays in Range (Hard)
    You are given two 0-indexed integer arrays nums1 and nums2 of length n. A 
    range [l, r] (inclusive) where 0 <= l <= r < n is balanced if:
    * For every i in the range [l, r], you pick either nums1[i] or nums2[i].
    * The sum of the numbers you pick from nums1 equals to the sum of the 
      numbers you pick from nums2 (the sum is considered to be 0 if you pick no 
      numbers from an array).
    Two balanced ranges from [l1, r1] and [l2, r2] are considered to be 
    different if at least one of the following is true:
    * l1 != l2
    * r1 != r2
    * nums1[i] is picked in the first range, and nums2[i] is picked in the 
      second range or vice versa for at least one i.
    Return the number of different ranges that are balanced. Since the answer 
    may be very large, return it modulo 10^9 + 7.

    Example 1:
    Input: nums1 = [1,2,5], nums2 = [2,6,3]
    Output: 3
    Explanation: The balanced ranges are:
                 - [0, 1] where we choose nums2[0], and nums1[1].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 2 = 2.
                 - [0, 2] where we choose nums1[0], nums2[1], and nums1[2].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 1 + 5 = 6.
                 - [0, 2] where we choose nums1[0], nums1[1], and nums2[2].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 1 + 2 = 3.
                 Note that the second and third balanced ranges are different.
                 In the second balanced range, we choose nums2[1] and in the 
                 third balanced range, we choose nums1[1].
    
    Example 2:
    Input: nums1 = [0,1], nums2 = [1,0]
    Output: 4
    Explanation: The balanced ranges are:
                 - [0, 0] where we choose nums1[0].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 0 = 0.
                 - [1, 1] where we choose nums2[1].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 0 = 0.
                 - [0, 1] where we choose nums1[0] and nums2[1].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 0 = 0.
                 - [0, 1] where we choose nums2[0] and nums1[1].
                   The sum of the numbers chosen from nums1 equals the sum of 
                   the numbers chosen from nums2: 1 = 1.

    Constraints:
    * n == nums1.length == nums2.length
    * 1 <= n <= 100
    * 0 <= nums1[i], nums2[i] <= 100*/

    public int countSubranges(int[] nums1, int[] nums2) {
        final int mod = 1_000_000_007; 
        long ans = 0; 
        Map<Integer, Long> freq = new HashMap(); 
        for (int i = 0; i < nums1.length; ++i) {
            Map<Integer, Long> ff = new HashMap(); 
            ff.merge(nums1[i], 1l, Long::sum); 
            ff.merge(-nums2[i], 1l, Long::sum); 
            for (var elem : freq.entrySet()) {
                int k = elem.getKey(); 
                long v = elem.getValue(); 
                ff.put(k+nums1[i], (ff.getOrDefault(k+nums1[i], 0l) + v) % mod);
                ff.put(k-nums2[i], (ff.getOrDefault(k-nums2[i], 0l) + v) % mod); 
            }
            freq = ff; 
            ans = (ans + freq.getOrDefault(0, 0l)) % mod; 
        }
        return (int) ans; 
    }


    /*2152. Minimum Number of Lines to Cover Points (Medium)
    You are given an array points where points[i] = [xi, yi] represents a point 
    on an X-Y plane. Straight lines are going to be added to the X-Y plane, 
    such that every point is covered by at least one line. Return the minimum 
    number of straight lines needed to cover all the points.

    Example 1:
    Input: points = [[0,1],[2,3],[4,5],[4,3]]
    Output: 2
    Explanation: The minimum number of straight lines needed is two. One 
                 possible solution is to add:
                 - One line connecting the point at (0, 1) to the point at 
                   (4, 5).
                 - Another line connecting the point at (2, 3) to the point at 
                   (4, 3).
    
    Example 2:
    Input: points = [[0,2],[-2,-2],[1,4]]
    Output: 1
    Explanation: The minimum number of straight lines needed is one. The only 
                 solution is to add:
                 - One line connecting the point at (-2, -2) to the point at 
                   (1, 4).

    Constraints:
    * 1 <= points.length <= 10
    * points[i].length == 2
    * -100 <= xi, yi <= 100
    * All the points are unique.*/

    public int minimumLines(int[][] points) {
        int n = points.length; 
        int[][] mask = new int[n][n]; 
        for (int i = 0; i < n; ++i) 
            for (int j = i+1; j < n; ++j) {
                mask[i][j] ^= (1<<i) ^ (1<<j); 
                for (int k = j+1; k < n; ++k) 
                    if ((points[i][0]-points[j][0])*(points[i][1]-points[k][1]) == (points[i][1]-points[j][1])*(points[i][0]-points[k][0])) mask[i][j] ^= 1<<k; 
            }
        int[] dp = new int[1<<n]; 
        Arrays.fill(dp, n/2+1); 
        dp[0] = 0; 
        for (int m = 1; m < (1<<n); ++m) {
            int bits = 0; 
            for (int mm = m; mm > 0; ++bits, mm &= mm-1); 
            if (bits <= 2) dp[m] = 1; 
            else {
                int i = 0; 
                for (; i < n; ++i) 
                    if ((m & (1<<i)) > 0) break; 
                for (int j = i+1; j < n; ++j) 
                    if ((m & (1<<j)) > 0) dp[m] = Math.min(dp[m], 1+dp[m^mask[i][j]]); 
            }
        }
        return dp[(1<<n)-1]; 
    }


    /*2158. Amount of New Area Painted Each Day (Hard)
    There is a long and thin painting that can be represented by a number line. 
    You are given a 0-indexed 2D integer array paint of length n, where 
    paint[i] = [starti, endi]. This means that on the ith day you need to paint 
    the area between starti and endi. Painting the same area multiple times 
    will create an uneven painting so you only want to paint each area of the 
    painting at most once. Return an integer array worklog of length n, where 
    worklog[i] is the amount of new area that you painted on the ith day.

    Example 1:
    Input: paint = [[1,4],[4,7],[5,8]]
    Output: [3,3,1]
    Explanation: On day 0, paint everything between 1 and 4. The amount of new 
                 area painted on day 0 is 4 - 1 = 3. On day 1, paint everything 
                 between 4 and 7. The amount of new area painted on day 1 is 
                 7 - 4 = 3. On day 2, paint everything between 7 and 8. 
                 Everything between 5 and 7 was already painted on day 1. The 
                 amount of new area painted on day 2 is 8 - 7 = 1. 
    
    Example 2:
    Input: paint = [[1,4],[5,8],[4,7]]
    Output: [3,3,1]
    Explanation: On day 0, paint everything between 1 and 4. The amount of new 
                 area painted on day 0 is 4 - 1 = 3. On day 1, paint everything 
                 between 5 and 8. The amount of new area painted on day 1 is 
                 8 - 5 = 3. On day 2, paint everything between 4 and 5. 
                 Everything between 5 and 7 was already painted on day 1. The 
                 amount of new area painted on day 2 is 5 - 4 = 1. 
    
    Example 3:
    Input: paint = [[1,5],[2,4]]
    Output: [4,0]
    Explanation: On day 0, paint everything between 1 and 5. The amount of new 
                 area painted on day 0 is 5 - 1 = 4. On day 1, paint nothing 
                 because everything between 2 and 4 was already painted on day 
                 0. The amount of new area painted on day 1 is 0.

    Constraints:
    * 1 <= paint.length <= 10^5
    * paint[i].length == 2
    * 0 <= starti < endi <= 5 * 10^4*/

    public int[] amountPainted(int[][] paint) {
        int n = paint.length; 
        int[] ans = new int[n]; 
        TreeMap<Integer, Integer> tree = new TreeMap(); 
        for (int i = 0; i < n; ++i) {
            int x = paint[i][0], y = paint[i][1], diff = 0; 
            var p = tree.floorEntry(x); 
            if (p != null && x < p.getValue()) {
                int xx = p.getKey(), yy = p.getValue(); 
                x = Math.min(x, xx); 
                y = Math.max(y, yy); 
                diff -= yy - xx; 
                tree.remove(p.getKey()); 
            }
            p = tree.ceilingEntry(x); 
            while (p != null && p.getKey() < y) {
                int xx = p.getKey(), yy = p.getValue(); 
                y = Math.max(y, yy); 
                diff -= yy - xx; 
                tree.remove(p.getKey()); 
                p = tree.ceilingEntry(x); 
            }
            ans[i] = y - x + diff; 
            tree.put(x, y); 
        }
        return ans; 
    }


    /*2189. Number of Ways to Build House of Cards (Medium)
    You are given an integer n representing the number of playing cards you 
    have. A house of cards meets the following conditions:
    * A house of cards consists of one or more rows of triangles and horizontal 
      cards.
    * Triangles are created by leaning two cards against each other.
    * One card must be placed horizontally between all adjacent triangles in a 
      row.
    * Any triangle on a row higher than the first must be placed on a 
      horizontal card from the previous row.
    * Each triangle is placed in the leftmost available spot in the row.
    Return the number of distinct house of cards you can build using all n 
    cards. Two houses of cards are considered distinct if there exists a row 
    where the two houses contain a different number of cards.

    Example 1:
    Input: n = 16
    Output: 2
    Explanation: The two valid houses of cards are shown. The third house of 
                 cards in the diagram is not valid because the rightmost 
                 triangle on the top row is not placed on top of a horizontal 
                 card.
    
    Example 2:
    Input: n = 2
    Output: 1
    Explanation: The one valid house of cards is shown.

    Example 3:
    Input: n = 4
    Output: 0
    Explanation: The three houses of cards in the diagram are not valid. The 
                 first house of cards needs a horizontal card placed between 
                 the two triangles. The second house of cards uses 5 cards. The 
                 third house of cards uses 2 cards.

    Constraints: 1 <= n <= 500*/

    public int houseOfCards(int n) {
        int[] dp = new int[n+1]; 
        dp[0] = 1; 
        for (int x = 2; x <= n; x += 3) 
            for (int i = n; i >= x; --i)
                dp[i] += dp[i-x]; 
        return dp[n]; 
    }


    /*2198. Number of Single Divisor Triplets (Medium)
    You are given a 0-indexed array of positive integers nums. A triplet of 
    three distinct indices (i, j, k) is called a single divisor triplet of nums 
    if nums[i] + nums[j] + nums[k] is divisible by exactly one of nums[i], 
    nums[j], or nums[k]. Return the number of single divisor triplets of nums.

    Example 1:
    Input: nums = [4,6,7,3,2]
    Output: 12
    Explanation: The triplets (0, 3, 4), (0, 4, 3), (3, 0, 4), (3, 4, 0), 
                 (4, 0, 3), and (4, 3, 0) have the values of [4, 3, 2] (or a 
                 permutation of [4, 3, 2]). 4 + 3 + 2 = 9 which is only 
                 divisible by 3, so all such triplets are single divisor 
                 triplets. The triplets (0, 2, 3), (0, 3, 2), (2, 0, 3), 
                 (2, 3, 0), (3, 0, 2), and (3, 2, 0) have the values of 
                 [4, 7, 3] (or a permutation of [4, 7, 3]). 4 + 7 + 3 = 14 
                 which is only divisible by 7, so all such triplets are single 
                 divisor triplets. There are 12 single divisor triplets in 
                 total.
    
    Example 2:
    Input: nums = [1,2,2]
    Output: 6
    Explanation: The triplets (0, 1, 2), (0, 2, 1), (1, 0, 2), (1, 2, 0), 
                 (2, 0, 1), and (2, 1, 0) have the values of [1, 2, 2] (or a 
                 permutation of [1, 2, 2]). 1 + 2 + 2 = 5 which is only 
                 divisible by 1, so all such triplets are single divisor 
                 triplets. There are 6 single divisor triplets in total.
    
    Example 3:
    Input: nums = [1,1,1]
    Output: 0
    Explanation: There are no single divisor triplets. Note that (0, 1, 2) is 
                 not a single divisor triplet because 
                 nums[0] + nums[1] + nums[2] = 3 and 3 is divisible by nums[0], 
                 nums[1], and nums[2].

    Constraints:
    * 3 <= nums.length <= 10^5
    * 1 <= nums[i] <= 100*/

    public long singleDivisorTriplet(int[] nums) {
        int[] freq = new int[101]; 
        for (int x : nums) ++freq[x]; 
        long ans = 0; 
        for (int i = 1; i <= 100; ++i) 
            for (int j = i; freq[i] > 0 && j <= 100; ++j) 
                for (int k = j; freq[j] > 0 && k <= 100; ++k) 
                    if (freq[k] > 0) {
                        int total = i + j + k; 
                        if ((total%i > 0 ? 1 : 0) + (total%j > 0 ? 1 : 0) + (total%k > 0 ? 1 : 0) == 2) 
                            if (i == j) ans += (long) freq[i]*(freq[j]-1)/2*freq[k]; 
                            else if (j == k) ans += (long) freq[i]*freq[j]*(freq[k]-1)/2; 
                            else ans += (long) freq[i]*freq[j]*freq[k]; 
                    }
        return ans*6; 
    }


    /*2204. Distance to a Cycle in Undirected Graph (Hard)
    You are given a positive integer n representing the number of nodes in a 
    connected undirected graph containing exactly one cycle. The nodes are 
    numbered from 0 to n - 1 (inclusive). You are also given a 2D integer array 
    edges, where edges[i] = [node1i, node2i] denotes that there is a 
    bidirectional edge connecting node1i and node2i in the graph. The distance 
    between two nodes a and b is defined to be the minimum number of edges that 
    are needed to go from a to b. Return an integer array answer of size n, 
    where answer[i] is the minimum distance between the ith node and any node 
    in the cycle.

    Example 1:
    Input: n = 7, edges = [[1,2],[2,4],[4,3],[3,1],[0,1],[5,2],[6,5]]
    Output: [1,0,0,0,0,1,2]
    Explanation: The nodes 1, 2, 3, and 4 form the cycle.
                 The distance from 0 to 1 is 1.
                 The distance from 1 to 1 is 0.
                 The distance from 2 to 2 is 0.
                 The distance from 3 to 3 is 0.
                 The distance from 4 to 4 is 0.
                 The distance from 5 to 2 is 1.
                 The distance from 6 to 2 is 2.
    
    Example 2:
    Input: n = 9, edges = [[0,1],[1,2],[0,2],[2,6],[6,7],[6,8],[0,3],[3,4],[3,5]]
    Output: [0,0,0,1,2,2,1,2,2]
    Explanation: The nodes 0, 1, and 2 form the cycle.
                 The distance from 0 to 0 is 0.
                 The distance from 1 to 1 is 0.
                 The distance from 2 to 2 is 0.
                 The distance from 3 to 1 is 1.
                 The distance from 4 to 1 is 2.
                 The distance from 5 to 1 is 2.
                 The distance from 6 to 2 is 1.
                 The distance from 7 to 2 is 2.
                 The distance from 8 to 2 is 2.

    Constraints:
    * 3 <= n <= 10^5
    * edges.length == n
    * edges[i].length == 2
    * 0 <= node1i, node2i <= n - 1
    * node1i != node2i
    * The graph is connected.
    * The graph has exactly one cycle.
    * There is at most one edge between any pair of vertices.*/

    public int[] distanceToCycle(int n, int[][] edges) {
        List<Integer>[] graph = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) 
            graph[u] = new ArrayList(); 
        for (var e : edges) {
            graph[e[0]].add(e[1]); 
            graph[e[1]].add(e[0]); 
        }
        Stack<Integer> stk = new Stack(); 
        int[] degree = new int[n]; 
        for (int u = 0; u < n; ++u) {
            degree[u] = graph[u].size(); 
            if (degree[u] == 1) stk.push(u); 
        }
        while (!stk.isEmpty()) {
            var u = stk.pop(); 
            for (var v : graph[u]) 
                if (degree[v] > 1 && --degree[v] == 1) stk.push(v); 
        }
        int[] ans = new int[n]; 
        Arrays.fill(ans, -1); 
        Queue<Integer> q = new LinkedList(); 
        for (int u = 0; u < n; ++u) 
            if (degree[u] > 1) {
                q.add(u); 
                ans[u] = 0; 
            }
        for (int val = 1; !q.isEmpty(); ++val) 
            for (int sz = q.size(); sz > 0; --sz) {
                var u = q.poll(); 
                for (var v : graph[u]) 
                    if (ans[v] == -1) {
                        q.add(v); 
                        ans[v] = val; 
                    }
            }
        return ans; 
    }


    /*2247. Maximum Cost of Trip With K Highways (Hard)
    A series of highways connect n cities numbered from 0 to n - 1. You are 
    given a 2D integer array highways where highways[i] = [city1i, city2i, tolli] 
    indicates that there is a highway that connects city1i and city2i, allowing 
    a car to go from city1i to city2i and vice versa for a cost of tolli. You 
    are also given an integer k. You are going on a trip that crosses exactly k 
    highways. You may start at any city, but you may only visit each city at 
    most once during your trip. Return the maximum cost of your trip. If there 
    is no trip that meets the requirements, return -1.

    Example 1:
    Input: n = 5, highways = [[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]], k = 3
    Output: 17
    Explanation: One possible trip is to go from 0 -> 1 -> 4 -> 3. The cost of 
                 this trip is 4 + 11 + 2 = 17. Another possible trip is to go 
                 from 4 -> 1 -> 2 -> 3. The cost of this trip is 
                 11 + 3 + 3 = 17. It can be proven that 17 is the maximum 
                 possible cost of any valid trip. Note that the trip 
                 4 -> 1 -> 0 -> 1 is not allowed because you visit the city 1 
                 twice.
    
    Example 2:
    Input: n = 4, highways = [[0,1,3],[2,3,2]], k = 2
    Output: -1
    Explanation: There are no valid trips of length 2, so return -1.

    Constraints:
    * 2 <= n <= 15
    * 1 <= highways.length <= 50
    * highways[i].length == 3
    * 0 <= city1i, city2i <= n - 1
    * city1i != city2i
    * 0 <= tolli <= 100
    * 1 <= k <= 50
    * There are no duplicate highways.*/

    public int maximumCost(int n, int[][] highways, int k) {
        List<Pair<Integer, Integer>>[] graph = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) graph[u] = new ArrayList(); 
        for (var h : highways) {
            graph[h[0]].add(new Pair(h[1], h[2])); 
            graph[h[1]].add(new Pair(h[0], h[2])); 
        }
        int[][] dp = new int[n][1<<n]; 
        for (var row : dp) Arrays.fill(row, Integer.MIN_VALUE); 
        for (int m = (1<<n)-1; m >= 0; --m) 
            for (int u = 0; u < n; ++u)
                if ((m & 1<<u) > 0) {
                    int cnt = Integer.bitCount(m); 
                    if (cnt == k+1) dp[u][m] = 0; 
                    else if (cnt < k+1) 
                        for (var elem : graph[u]) {
                            int v = elem.getKey(), w = elem.getValue(); 
                            if ((m & 1<<v) == 0) dp[u][m] = Math.max(dp[u][m], w + dp[v][m ^ 1<<v]); 
                        }
                }
        int ans = -1; 
        for (int u = 0; u < n; ++u) ans = Math.max(ans, dp[u][1<<u]); 
        return ans; 
    }


    /*2279. Maximum Bags With Full Capacity of Rocks (Medium)
    You have n bags numbered from 0 to n - 1. You are given two 0-indexed 
    integer arrays capacity and rocks. The ith bag can hold a maximum of 
    capacity[i] rocks and currently contains rocks[i] rocks. You are also given 
    an integer additionalRocks, the number of additional rocks you can place in 
    any of the bags. Return the maximum number of bags that could have full 
    capacity after placing the additional rocks in some bags.

    Example 1:
    Input: capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2
    Output: 3
    Explanation: Place 1 rock in bag 0 and 1 rock in bag 1. The number of rocks 
                 in each bag are now [2,3,4,4]. Bags 0, 1, and 2 have full 
                 capacity. There are 3 bags at full capacity, so we return 3. 
                 It can be shown that it is not possible to have more than 3 
                 bags at full capacity. Note that there may be other ways of 
                 placing the rocks that result in an answer of 3.
    
    Example 2:
    Input: capacity = [10,2,2], rocks = [2,2,0], additionalRocks = 100
    Output: 3
    Explanation: Place 8 rocks in bag 0 and 2 rocks in bag 2. The number of 
                 rocks in each bag are now [10,2,2]. Bags 0, 1, and 2 have full 
                 capacity. There are 3 bags at full capacity, so we return 3. 
                 It can be shown that it is not possible to have more than 3 
                 bags at full capacity. Note that we did not use all of the 
                 additional rocks.

    Constraints:
    * n == capacity.length == rocks.length
    * 1 <= n <= 5 * 10^4
    * 1 <= capacity[i] <= 10^9
    * 0 <= rocks[i] <= capacity[i]
    * 1 <= additionalRocks <= 10^9*/

    public int maximumBags(int[] capacity, int[] rocks, int additionalRocks) {
        int[] diff = new int[capacity.length]; 
        for (int i = 0; i < capacity.length; ++i) diff[i] = capacity[i] - rocks[i]; 
        Arrays.sort(diff);
        int ans = 0; 
        for (var x : diff) 
            if (x <= additionalRocks) {
                ++ans; 
                additionalRocks -= x; 
            }
        return ans; 
    }


    /*2307. Check for Contradictions in Equations (Hard)
    You are given a 2D array of strings equations and an array of real numbers 
    values, where equations[i] = [Ai, Bi] and values[i] means that 
    Ai / Bi = values[i]. Determine if there exists a contradiction in the 
    equations. Return true if there is a contradiction, or false otherwise.

    Note:
    * When checking if two numbers are equal, check that their absolute 
      difference is less than 10-5.
    * The testcases are generated such that there are no cases targeting 
      precision, i.e. using double is enough to solve the problem.

    Example 1:
    Input: equations = [["a","b"],["b","c"],["a","c"]], values = [3,0.5,1.5]
    Output: false
    Explanation: The given equations are: a / b = 3, b / c = 0.5, a / c = 1.5 
                 There are no contradictions in the equations. One possible 
                 assignment to satisfy all equations is: a = 3, b = 1 and c = 2.
    
    Example 2:
    Input: equations = [["le","et"],["le","code"],["code","et"]], values = [2,5,0.5]
    Output: true
    Explanation: The given equations are: le / et = 2, le / code = 5, 
                 code / et = 0.5 Based on the first two equations, we get 
                 code / et = 0.4. Since the third equation is 
                 code / et = 0.5, we get a contradiction.

    Constraints:
    * 1 <= equations.length <= 100
    * equations[i].length == 2
    * 1 <= Ai.length, Bi.length <= 5
    * Ai, Bi consist of lowercase English letters.
    * equations.length == values.length
    * 0.0 < values[i] <= 10.0
    * values[i] has a maximum of 2 decimal places.*/

    public boolean checkContradictions(List<List<String>> equations, double[] values) {
        Set<String> node = new HashSet(); 
        Map<String, List<Pair<String, Double>>> graph = new HashMap(); 
        for (int i = 0; i < equations.size(); ++i) {
            String u = equations.get(i).get(0), v = equations.get(i).get(1); 
            node.add(u); 
            node.add(v); 
            if (!graph.containsKey(u)) graph.put(u, new ArrayList()); 
            if (!graph.containsKey(v)) graph.put(v, new ArrayList()); 
            graph.get(u).add(new Pair(v, values[i])); 
            graph.get(v).add(new Pair(u, 1/values[i])); 
        }
        Map<String, Double> vals = new HashMap(); 
        for (var u : node) 
            if (!vals.containsKey(u)) {
                Stack<String> stk = new Stack(); stk.push(u); 
                vals.put(u, 1.); 
                while (!stk.isEmpty()) {
                    var x = stk.pop(); 
                    for (var elem : graph.get(x)) {
                        String v = elem.getKey(); 
                        Double w = elem.getValue(); 
                        if (vals.containsKey(v)) {
                            if (Math.abs(vals.get(v) - vals.get(x)/w) > 1e-5*vals.get(v)) return true; 
                        } else {
                            stk.push(v); 
                            vals.put(v, vals.get(x)/w); 
                        }
                    }
                }
            }
        return false; 
    }


    /*2359. Find Closest Node to Given Two Nodes (Medium)
    You are given a directed graph of n nodes numbered from 0 to n - 1, where 
    each node has at most one outgoing edge. The graph is represented with a 
    given 0-indexed array edges of size n, indicating that there is a directed 
    edge from node i to node edges[i]. If there is no outgoing edge from i, 
    then edges[i] == -1. You are also given two integers node1 and node2. 
    Return the index of the node that can be reached from both node1 and node2, 
    such that the maximum between the distance from node1 to that node, and 
    from node2 to that node is minimized. If there are multiple answers, return 
    the node with the smallest index, and if no possible answer exists, return 
    -1. Note that edges may contain cycles.

    Example 1:
    Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
    Output: 2
    Explanation: The distance from node 0 to node 2 is 1, and the distance from 
                 node 1 to node 2 is 1. The maximum of those two distances is 1. 
                 It can be proven that we cannot get a node with a smaller 
                 maximum distance than 1, so we return node 2.
    
    Example 2:
    Input: edges = [1,2,-1], node1 = 0, node2 = 2
    Output: 2
    Explanation: The distance from node 0 to node 2 is 2, and the distance from 
                 node 2 to itself is 0. The maximum of those two distances is 2. 
                 It can be proven that we cannot get a node with a smaller 
                 maximum distance than 2, so we return node 2.

    Constraints:
    * n == edges.length
    * 2 <= n <= 10^5
    * -1 <= edges[i] < n
    * edges[i] != i
    * 0 <= node1, node2 < n*/

    private static int[] bfs(int u, int[] edges) {
        int[] dist = new int[edges.length]; 
        Arrays.fill(dist, Integer.MAX_VALUE); 
        for (int k = 0; u != -1 && dist[u] == Integer.MAX_VALUE; ++k, u = edges[u]) 
            dist[u] = k; 
        return dist; 
    }
    
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int ans = -1, small = Integer.MAX_VALUE; 
        int[] dist1 = bfs(node1, edges), dist2 = bfs(node2, edges); 
        for (int i = 0, n = edges.length; i < n; ++i) {
            int cand = Math.max(dist1[i], dist2[i]); 
            if (cand < small) {
                ans = i; 
                small = cand; 
            }
        }
        return ans; 
    }


    /*2479. Maximum XOR of Two Non-Overlapping Subtrees (Hard)
    There is an undirected tree with n nodes labeled from 0 to n - 1. You are 
    given the integer n and a 2D integer array edges of length n - 1, where 
    edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi 
    in the tree. The root of the tree is the node labeled 0. Each node has an 
    associated value. You are given an array values of length n, where values[i] 
    is the value of the ith node. Select any two non-overlapping subtrees. Your 
    score is the bitwise XOR of the sum of the values within those subtrees.
    Return the maximum possible score you can achieve. If it is impossible to 
    find two nonoverlapping subtrees, return 0.

    Note that:
    * The subtree of a node is the tree consisting of that node and all of its 
      descendants.
    * Two subtrees are non-overlapping if they do not share any common node.

    Example 1:
    Input: n = 6, edges = [[0,1],[0,2],[1,3],[1,4],[2,5]], values = [2,8,3,6,2,5]
    Output: 24
    Explanation: Node 1's subtree has sum of values 16, while node 2's subtree 
                 has sum of values 8, so choosing these nodes will yield a 
                 score of 16 XOR 8 = 24. It can be proved that is the maximum 
                 possible score we can obtain.
    
    Example 2:
    Input: n = 3, edges = [[0,1],[1,2]], values = [4,6,1]
    Output: 0
    Explanation: There is no possible way to select two non-overlapping 
                 subtrees, so we just return 0.

    Constraints:
    * 2 <= n <= 5 * 10^4
    * edges.length == n - 1
    * 0 <= ai, bi < n
    * values.length == n
    * 1 <= values[i] <= 10^9
    * It is guaranteed that edges represents a valid tree.*/

    class TrieNode {
        public TrieNode[] child = new TrieNode[] {null, null}; 
        public long val = 0; 
    }
    
    private long dfs(int u, int p, int[] values, long[] sum, List<Integer>[] tree) {
        sum[u] = values[u];
        for (var v : tree[u]) 
            if (v != p) sum[u] += dfs(v, u, values, sum, tree); 
        return sum[u]; 
    }
    
    private long calc(int u, int p, TrieNode trie, long[] sum, List<Integer>[] tree) {
        long ans = 0; 
        if (trie.child[0] != null || trie.child[1] != null) {
            TrieNode node = trie; 
            for (int i = 45; i >= 0; --i) {
                int b = (int) (sum[u] >> i) & 1; 
                if (node.child[1-b] != null) node = node.child[1-b]; 
                else node = node.child[b]; 
            }
            ans = node.val ^ sum[u]; 
        }
        for (var v : tree[u]) 
            if (v != p) ans = Math.max(ans, calc(v, u, trie, sum, tree)); 
        TrieNode node = trie; 
        for (int i = 45; i >= 0; --i) {
            int b = (int) (sum[u] >> i) & 1; 
            if (node.child[b] == null) node.child[b] = new TrieNode(); 
            node = node.child[b]; 
        }
        node.val = sum[u]; 
        return ans; 
    }
    
    public long maxXor(int n, int[][] edges, int[] values) {
        List<Integer>[] tree = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) tree[u] = new ArrayList(); 
        for (var e : edges) {
            tree[e[0]].add(e[1]); 
            tree[e[1]].add(e[0]); 
        }
        
        long[] sum = new long[n]; 
        dfs(0, -1, values, sum, tree); 
        
        TrieNode trie = new TrieNode(); 
        return calc(0, -1, trie, sum, tree); 
    }


    /*2481. Minimum Cuts to Divide a Circle (Easy)
    A valid cut in a circle can be:
    * A cut that is represented by a straight line that touches two points on 
      the edge of the circle and passes through its center, or
    * A cut that is represented by a straight line that touches one point on 
      the edge of the circle and its center.
    Some valid and invalid cuts are shown in the figures below. Given the 
    integer n, return the minimum number of cuts needed to divide a circle into 
    n equal slices.

    Example 1:
    Input: n = 4
    Output: 2
    Explanation: The above figure shows how cutting the circle twice through 
                 the middle divides it into 4 equal slices.
    
    Example 2:
    Input: n = 3
    Output: 3
    Explanation: At least 3 cuts are needed to divide the circle into 3 equal 
                 slices. It can be shown that less than 3 cuts cannot result in 
                 3 slices of equal size and shape. Also note that the first cut 
                 will not divide the circle into distinct parts.

    Constraints: 1 <= n <= 100*/

    public int numberOfCuts(int n) {
        if (n == 1) return 0; 
        return n%2 == 1 ? n : n/2; 
    }


    /*2482. Difference Between Ones and Zeros in Row and Column (Medium)
    You are given a 0-indexed m x n binary matrix grid. A 0-indexed m x n 
    difference matrix diff is created with the following procedure:
    * Let the number of ones in the ith row be onesRowi.
    * Let the number of ones in the jth column be onesColj.
    * Let the number of zeros in the ith row be zerosRowi.
    * Let the number of zeros in the jth column be zerosColj.
    * diff[i][j] = onesRowi + onesColj - zerosRowi - zerosColj
    Return the difference matrix diff.

    Example 1:
    Input: grid = [[0,1,1],[1,0,1],[0,0,1]]
    Output: [[0,0,4],[0,0,4],[-2,-2,2]]
    Explanation: - diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 
                   = 2 + 3 - 1 - 0 = 4 
                 - diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 
                   = 2 + 1 - 1 - 2 = 0 
                 - diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 
                   = 2 + 3 - 1 - 0 = 4 
                 - diff[2][0] = onesRow2 + onesCol0 - zerosRow2 - zerosCol0 
                   = 1 + 1 - 2 - 2 = -2
                 - diff[2][1] = onesRow2 + onesCol1 - zerosRow2 - zerosCol1 
                   = 1 + 1 - 2 - 2 = -2
                 - diff[2][2] = onesRow2 + onesCol2 - zerosRow2 - zerosCol2 
                   = 1 + 3 - 2 - 0 = 2
    
    Example 2:
    Input: grid = [[1,1,1],[1,1,1]]
    Output: [[5,5,5],[5,5,5]]
    Explanation: - diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 
                   = 3 + 2 - 0 - 0 = 5
                 - diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 
                   = 3 + 2 - 0 - 0 = 5

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 1 <= m, n <= 10^5
    * 1 <= m * n <= 10^5
    * grid[i][j] is either 0 or 1.*/

    public int[][] onesMinusZeros(int[][] grid) {
        int m = grid.length, n = grid[0].length; 
        int[] row = new int[m], col = new int[n]; 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j) {
                row[i] += grid[i][j]; 
                col[j] += grid[i][j]; 
            }
        int[][] ans = new int[m][n]; 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j) 
                ans[i][j] = 2*row[i] + 2*col[j] - m - n; 
        return ans; 
    }


    /*2483. Minimum Penalty for a Shop (Medium)
    You are given the customer visit log of a shop represented by a 0-indexed 
    string customers consisting only of characters 'N' and 'Y':
    * if the ith character is 'Y', it means that customers come at the ith hour
    * whereas 'N' indicates that no customers come at the ith hour.
    If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated 
    as follows:
    * For every hour when the shop is open and no customers come, the penalty 
      increases by 1.
    * For every hour when the shop is closed and customers come, the penalty 
      increases by 1.
    Return the earliest hour at which the shop must be closed to incur a 
    minimum penalty. Note that if a shop closes at the jth hour, it means the 
    shop is closed at the hour j.

    Example 1:
    Input: customers = "YYNY"
    Output: 2
    Explanation: - Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 
                   penalty.
                 - Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 
                   penalty.
                 - Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 
                   penalty.
                 - Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 
                   penalty.
                 - Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 
                   penalty.
                 Closing the shop at 2nd or 4th hour gives a minimum penalty. 
                 Since 2 is earlier, the optimal closing time is 2.
    
    Example 2:
    Input: customers = "NNNNN"
    Output: 0
    Explanation: It is best to close the shop at the 0th hour as no customers 
                 arrive.
    
    Example 3:
    Input: customers = "YYYY"
    Output: 4
    Explanation: It is best to close the shop at the 4th hour as customers 
                 arrive at each hour.

    Constraints:
    * 1 <= customers.length <= 10^5
    * customers consists only of characters 'Y' and 'N'.*/

    public int bestClosingTime(String customers) {
        int ans = 0, prefix = (int) customers.chars().filter(ch -> ch =='Y').count(), least = prefix; 
        for (int i = 0; i < customers.length(); ++i) {
            if (customers.charAt(i) == 'N') ++prefix; 
            else --prefix; 
            if (prefix < least) {
                ans = i+1; 
                least = prefix; 
            }
        }
        return ans; 
    }


    /*2484. Count Palindromic Subsequences (Hard)
    Given a string of digits s, return the number of palindromic subsequences 
    of s having length 5. Since the answer may be very large, return it modulo 
    10^9 + 7.

    Note:
    * A string is palindromic if it reads the same forward and backward.
    * A subsequence is a string that can be derived from another string by 
      deleting some or no characters without changing the order of the 
      remaining characters.

    Example 1:
    Input: s = "103301"
    Output: 2
    Explanation: There are 6 possible subsequences of length 5: "10330","10331",
                 "10301","10301","13301","03301". Two of them (both equal to 
                 "10301") are palindromic.
    
    Example 2:
    Input: s = "0000000"
    Output: 21
    Explanation: All 21 subsequences are "00000", which is palindromic.

    Example 3:
    Input: s = "9999900000"
    Output: 2
    Explanation: The only two palindromic subsequences are "99999" and "00000".

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of digits.*/

    public int countPalindromes(String s) {
        final int mod = 1_000_000_007; 
        long ans = 0; 
        for (int x = 0; x <= 9; ++x) 
            for (int y = 0; y <= 9; ++y) {
                int[] pattern = new int[] {x, y, 0, y, x};
                long[] dp = new long[6]; 
                dp[5] = 1; 
                for (int i = 0; i < s.length(); ++i) 
                    for (int j = 0; j < 5; ++j) 
                        if (s.charAt(i) == pattern[j] + '0' || j == 2) dp[j] = (dp[j] + dp[j+1]) % mod; 
                ans = (ans + dp[0]) % mod; 
            }
        return (int) ans; 
    }


    /*2485. Find the Pivot Integer (Easy)
    Given a positive integer n, find the pivot integer x such that:
    * The sum of all elements between 1 and x inclusively equals the sum of all 
      elements between x and n inclusively.
    Return the pivot integer x. If no such integer exists, return -1. It is 
    guaranteed that there will be at most one pivot index for the given input.

    Example 1:
    Input: n = 8
    Output: 6
    Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

    Example 2:
    Input: n = 1
    Output: 1
    Explanation: 1 is the pivot integer since: 1 = 1.

    Example 3:
    Input: n = 4
    Output: -1
    Explanation: It can be proved that no such integer exist.

    Constraints: 1 <= n <= 1000*/

    public int pivotInteger(int n) {
        int sm = n*(n+1)/2, val = (int) Math.sqrt(sm); 
        return val*val == sm ? val : -1; 
    }


    /*2486. Append Characters to String to Make Subsequence (Medium)
    You are given two strings s and t consisting of only lowercase English 
    letters. Return the minimum number of characters that need to be appended 
    to the end of s so that t becomes a subsequence of s. A subsequence is a 
    string that can be derived from another string by deleting some or no 
    characters without changing the order of the remaining characters.

    Example 1:
    Input: s = "coaching", t = "coding"
    Output: 4
    Explanation: Append the characters "ding" to the end of s so that 
                 s = "coachingding". Now, t is a subsequence of s 
                 ("coachingding"). It can be shown that appending any 3 
                 characters to the end of s will never make t a subsequence.
    
    Example 2:
    Input: s = "abcde", t = "a"
    Output: 0
    Explanation: t is already a subsequence of s ("abcde").

    Example 3:
    Input: s = "z", t = "abcde"
    Output: 5
    Explanation: Append the characters "abcde" to the end of s so that 
                 s = "zabcde". Now, t is a subsequence of s ("zabcde"). It can 
                 be shown that appending any 4 characters to the end of s will 
                 never make t a subsequence.

    Constraints:
    * 1 <= s.length, t.length <= 10^5
    * s and t consist only of lowercase English letters.*/

    public int appendCharacters(String s, String t) {
        int i = 0; 
        for (char ch : s.toCharArray()) 
            if (i < t.length() && ch == t.charAt(i)) ++i; 
        return t.length()-i; 
    }


    /*2487. Remove Nodes From Linked List (Medium)
    You are given the head of a linked list. Remove every node which has a node 
    with a strictly greater value anywhere to the right side of it. Return the 
    head of the modified linked list.

    Example 1:
    Input: head = [5,2,13,3,8]
    Output: [13,8]
    Explanation: The nodes that should be removed are 5, 2 and 3.
                 - Node 13 is to the right of node 5.
                 - Node 13 is to the right of node 2.
                 - Node 8 is to the right of node 3.
    
    Example 2:
    Input: head = [1,1,1,1]
    Output: [1,1,1,1]
    Explanation: Every node has value 1, so no nodes are removed.

    Constraints:
    * The number of the nodes in the given list is in the range [1, 10^5].
    * 1 <= Node.val <= 10^5*/

    public ListNode removeNodes(ListNode head) {
        ListNode dummy = new ListNode(Integer.MAX_VALUE); 
        Stack<ListNode> stk = new Stack<ListNode>(); stk.push(dummy); 
        for (ListNode node = head; node != null; node = node.next) {
            while (stk.peek().val < node.val) stk.pop(); 
            stk.peek().next = node; 
            stk.push(node); 
        }
        return dummy.next; 
    }


    /*2488. Count Subarrays With Median K (Hard)
    You are given an array nums of size n consisting of distinct integers from 
    1 to n and a positive integer k. Return the number of non-empty subarrays 
    in nums that have a median equal to k.

    Note:
    * The median of an array is the middle element after sorting the array in 
      ascending order. If the array is of even length, the median is the left 
      middle element.
      + For example, the median of [2,3,1,4] is 2, and the median of [8,4,3,5,1] 
        is 4.
    * A subarray is a contiguous part of an array.

    Example 1:
    Input: nums = [3,2,1,4,5], k = 4
    Output: 3
    Explanation: The subarrays that have a median equal to 4 are: [4], [4,5] 
                 and [1,4,5].
    
    Example 2:
    Input: nums = [2,3,1], k = 3
    Output: 1
    Explanation: [3] is the only subarray that has a median equal to 3.

    Constraints:
    * n == nums.length
    * 1 <= n <= 10^5
    * 1 <= nums[i], k <= n
    * The integers in nums are distinct.*/

    public int countSubarrays(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>(); 
        freq.put(0, 1); 
        int ans = 0, diff = 0; 
        boolean found = false; 
        for (int x : nums) {
            if (x < k) --diff; 
            else if (x > k) ++diff; 
            else found = true; 
            if (found) ans += freq.getOrDefault(diff, 0) + freq.getOrDefault(diff-1, 0); 
            else freq.merge(diff, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2489. Number of Substrings With Fixed Ratio (Medium)
    You are given a binary string s, and two integers num1 and num2. num1 and 
    num2 are coprime numbers. A ratio substring is a substring of s where the 
    ratio between the number of 0's and the number of 1's in the substring is 
    exactly num1 : num2.
    * For example, if num1 = 2 and num2 = 3, then "01011" and "1110000111" are 
      ratio substrings, while "11000" is not.
    Return the number of non-empty ratio substrings of s.

    Note that:
    * A substring is a contiguous sequence of characters within a string.
    * Two values x and y are coprime if gcd(x, y) == 1 where gcd(x, y) is the 
      greatest common divisor of x and y.

    Example 1:
    Input: s = "0110011", num1 = 1, num2 = 2
    Output: 4
    Explanation: There exist 4 non-empty ratio substrings.
                 - The substring s[0..2]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[1..4]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[4..6]: "0110011". It contains one 0 and two 
                   1's. The ratio is 1 : 2.
                 - The substring s[1..6]: "0110011". It contains two 0's and 
                   four 1's. The ratio is 2 : 4 == 1 : 2.
                 It can be shown that there are no more ratio substrings.
    
    Example 2:
    Input: s = "10101", num1 = 3, num2 = 1
    Output: 0
    Explanation: There is no ratio substrings of s. We return 0.

    Constraints:
    * 1 <= s.length <= 10^5
    * 1 <= num1, num2 <= s.length
    * num1 and num2 are coprime integers.*/

    public long fixedRatio(String s, int num1, int num2) {
        HashMap<Long, Integer> freq = new HashMap<>(); freq.put(0l, 1); 
        long ans = 0, prefix = 0; 
        for (char ch : s.toCharArray()) {
            if (ch == '0') prefix += num2; 
            else prefix -= num1; 
            ans += freq.getOrDefault(prefix, 0); 
            freq.merge(prefix, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2495. Number of Subarrays Having Even Product (Medium)
    Given a 0-indexed integer array nums, return the number of subarrays of 
    nums having an even product.

    Example 1:
    Input: nums = [9,6,7,13]
    Output: 6
    Explanation: There are 6 subarrays with an even product:
                 - nums[0..1] = 9 * 6 = 54.
                 - nums[0..2] = 9 * 6 * 7 = 378.
                 - nums[0..3] = 9 * 6 * 7 * 13 = 4914.
                 - nums[1..1] = 6.
                 - nums[1..2] = 6 * 7 = 42.
                 - nums[1..3] = 6 * 7 * 13 = 546.
    
    Example 2:
    Input: nums = [7,3,5]
    Output: 0
    Explanation: There are no subarrays with an even product.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 1 <= nums[i] <= 10^5*/

    public long evenProduct(int[] nums) {
        long ans = 0; 
        for (int i = 0, val = 0; i < nums.length; ++i) {
            if (nums[i] % 2 == 0) val = i+1; 
            ans += val; 
        }
        return ans; 
    }


    /*2496. Maximum Value of a String in an Array (Easy)
    The value of an alphanumeric string can be defined as:
    * The numeric representation of the string in base 10, if it comprises of 
      digits only.
    * The length of the string, otherwise.
    Given an array strs of alphanumeric strings, return the maximum value of 
    any string in strs.

    Example 1:
    Input: strs = ["alic3","bob","3","4","00000"]
    Output: 5
    Explanation: - "alic3" consists of both letters and digits, so its value is 
                   its length, i.e. 5.
                 - "bob" consists only of letters, so its value is also its 
                   length, i.e. 3.
                 - "3" consists only of digits, so its value is its numeric 
                   equivalent, i.e. 3.
                 - "4" also consists only of digits, so its value is 4.
                 - "00000" consists only of digits, so its value is 0.
                 Hence, the maximum value is 5, of "alic3".
    
    Example 2:
    Input: strs = ["1","01","001","0001"]
    Output: 1
    Explanation: Each string in the array has value 1. Hence, we return 1.

    Constraints:
    * 1 <= strs.length <= 100
    * 1 <= strs[i].length <= 9
    * strs[i] consists of only lowercase English letters and digits.*/

    public int maximumValue(String[] strs) {
        int ans = 0; 
        for (String s : strs) 
            if (s.matches("[0-9]+")) ans = Math.max(ans, Integer.valueOf(s)); 
            else ans = Math.max(ans, s.length()); 
        return ans; 
    }


    /*2497. Maximum Star Sum of a Graph (Medium)
    There is an undirected graph consisting of n nodes numbered from 0 to n - 1. 
    You are given a 0-indexed integer array vals of length n where vals[i] 
    denotes the value of the ith node. You are also given a 2D integer array 
    edges where edges[i] = [ai, bi] denotes that there exists an undirected 
    edge connecting nodes ai and bi. A star graph is a subgraph of the given 
    graph having a center node containing 0 or more neighbors. In other words, 
    it is a subset of edges of the given graph such that there exists a common 
    node for all edges. The image below shows star graphs with 3 and 4 
    neighbors respectively, centered at the blue node. The star sum is the sum 
    of the values of all the nodes present in the star graph. Given an integer 
    k, return the maximum star sum of a star graph containing at most k edges.

    Example 1:
    Input: vals = [1,2,3,4,10,-10,-20], edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], k = 2
    Output: 16
    Explanation: The above diagram represents the input graph. The star graph 
                 with the maximum star sum is denoted by blue. It is centered 
                 at 3 and includes its neighbors 1 and 4. It can be shown it is 
                 not possible to get a star graph with a sum greater than 16.
    
    Example 2:
    Input: vals = [-5], edges = [], k = 0
    Output: -5
    Explanation: There is only one possible star graph, which is node 0 itself. 
                 Hence, we return -5.

    Constraints:
    * n == vals.length
    * 1 <= n <= 10^5
    * -104 <= vals[i] <= 10^4
    * 0 <= edges.length <= min(n * (n - 1) / 2, 10^5)
    * edges[i].length == 2
    * 0 <= ai, bi <= n - 1
    * ai != bi
    * 0 <= k <= n - 1*/

    public int maxStarSum(int[] vals, int[][] edges, int k) {
        int n = vals.length; 
        List<Integer>[] graph = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) graph[u] = new ArrayList(); 
        for (int[] e : edges) {
            graph[e[0]].add(e[1]); 
            graph[e[1]].add(e[0]); 
        }
        int ans = Integer.MIN_VALUE; 
        for (int u = 0; u < n; ++u) {
            int cand = vals[u]; 
            if (graph[u].size() > k) Collections.sort(graph[u], (a, b) -> vals[b] - vals[a]);
            for (int v = 0; v < k && v < graph[u].size(); ++v)
                cand += Math.max(0, vals[graph[u].get(v)]); 
            ans = Math.max(ans, cand); 
        }
        return ans; 
    }


    /*2498. Frog Jump II (Medium)
    You are given a 0-indexed integer array stones sorted in strictly 
    increasing order representing the positions of stones in a river. A frog, 
    initially on the first stone, wants to travel to the last stone and then 
    return to the first stone. However, it can jump to any stone at most once.
    The length of a jump is the absolute difference between the position of the 
    stone the frog is currently on and the position of the stone to which the 
    frog jumps. More formally, if the frog is at stones[i] and is jumping to 
    stones[j], the length of the jump is |stones[i] - stones[j]|. The cost of a 
    path is the maximum length of a jump among all jumps in the path. Return 
    the minimum cost of a path for the frog.

    Example 1:
    Input: stones = [0,2,5,6,7]
    Output: 5
    Explanation: The above figure represents one of the optimal paths the frog 
                 can take. The cost of this path is 5, which is the maximum 
                 length of a jump. Since it is not possible to achieve a cost 
                 of less than 5, we return it.
    
    Example 2:
    Input: stones = [0,3,9]
    Output: 9
    Explanation: The frog can jump directly to the last stone and come back to 
                 the first stone. In this case, the length of each jump will be 
                 9. The cost for the path will be max(9, 9) = 9. It can be 
                 shown that this is the minimum achievable cost.

    Constraints:
    * 2 <= stones.length <= 10^5
    * 0 <= stones[i] <= 10^9
    * stones[0] == 0
    * stones is sorted in a strictly increasing order.*/

    public int maxJump(int[] stones) {
        int ans = stones[1]; 
        for (int i = 2; i < stones.length; ++i) 
            ans = Math.max(ans, stones[i] - stones[i-2]); 
        return ans; 
    }


    /*2499. Minimum Total Cost to Make Arrays Unequal (Hard)
    You are given two 0-indexed integer arrays nums1 and nums2, of equal length 
    n. In one operation, you can swap the values of any two indices of nums1. 
    The cost of this operation is the sum of the indices. Find the minimum 
    total cost of performing the given operation any number of times such that 
    nums1[i] != nums2[i] for all 0 <= i <= n - 1 after performing all the 
    operations. Return the minimum total cost such that nums1 and nums2 satisfy 
    the above condition. In case it is not possible, return -1.

    Example 1:
    Input: nums1 = [1,2,3,4,5], nums2 = [1,2,3,4,5]
    Output: 10
    Explanation: One of the ways we can perform the operations is:
                 - Swap values at indices 0 and 3, incurring cost = 0 + 3 = 3. 
                   Now, nums1 = [4,2,3,1,5]
                 - Swap values at indices 1 and 2, incurring cost = 1 + 2 = 3. 
                   Now, nums1 = [4,3,2,1,5].
                 - Swap values at indices 0 and 4, incurring cost = 0 + 4 = 4. 
                   Now, nums1 =[5,3,2,1,4].
                 We can see that for each index i, nums1[i] != nums2[i]. The 
                 cost required here is 10. Note that there are other ways to 
                 swap values, but it can be proven that it is not possible to 
                 obtain a cost less than 10.
    
    Example 2:
    Input: nums1 = [2,2,2,1,3], nums2 = [1,2,2,3,3]
    Output: 10
    Explanation: One of the ways we can perform the operations is:
                 - Swap values at indices 2 and 3, incurring cost = 2 + 3 = 5. 
                   Now, nums1 = [2,2,1,2,3].
                 - Swap values at indices 1 and 4, incurring cost = 1 + 4 = 5. 
                   Now, nums1 = [2,3,1,2,2].
                 The total cost needed here is 10, which is the minimum 
                 possible.
    
    Example 3:
    Input: nums1 = [1,2,2], nums2 = [1,2,2]
    Output: -1
    Explanation: It can be shown that it is not possible to satisfy the given 
                 conditions irrespective of the number of operations we 
                 perform. Hence, we return -1.

    Constraints:
    * n == nums1.length == nums2.length
    * 1 <= n <= 10^5
    * 1 <= nums1[i], nums2[i] <= n*/

    public long minimumTotalCost(int[] nums1, int[] nums2) {
        int n = nums1.length, total = 0; 
        int[] freq = new int[n+1]; 
        long ans = 0; 
        for (int i = 0; i < n; ++i) 
            if (nums1[i] == nums2[i]) {
                ++freq[nums1[i]]; 
                ++total; 
                ans += i; 
            }
        int most = 0, key = 0; 
        for (int i = 0; i <= n; ++i) 
            if (freq[i] > most) {
                key = i; 
                most = freq[i]; 
            }
        for (int i = 0; i < n && 2*most > total; ++i) 
            if (nums1[i] != nums2[i] && key != nums1[i] && key != nums2[i]) {
                ++total; 
                ans += i; 
            }
        return 2*most <= total ? ans : -1; 
    }


    /*2500. Delete Greatest Value in Each Row (Easy)
    You are given an m x n matrix grid consisting of positive integers. Perform 
    the following operation until grid becomes empty:
    * Delete the element with the greatest value from each row. If multiple 
      such elements exist, delete any of them.
    * Add the maximum of deleted elements to the answer.
    Note that the number of columns decreases by one after each operation. 
    Return the answer after performing the operations described above.

    Example 1:
    Input: grid = [[1,2,4],[3,3,1]]
    Output: 8
    Explanation: The diagram above shows the removed values in each step.
                 - In the first operation, we remove 4 from the first row and 3 
                   from the second row (notice that, there are two cells with 
                   value 3 and we can remove any of them). We add 4 to the 
                   answer.
                 - In the second operation, we remove 2 from the first row and 
                   3 from the second row. We add 3 to the answer.
                 - In the third operation, we remove 1 from the first row and 1 
                   from the second row. We add 1 to the answer.
                 The final answer = 4 + 3 + 1 = 8.
    
    Example 2:
    Input: grid = [[10]]
    Output: 10
    Explanation: The diagram above shows the removed values in each step.
                 - In the first operation, we remove 10 from the first row. We 
                   add 10 to the answer.
                 The final answer = 10.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 1 <= m, n <= 50
    * 1 <= grid[i][j] <= 100*/

    public int deleteGreatestValue(int[][] grid) {
        for (int[] row : grid) Arrays.sort(row); 
        int ans = 0; 
        for (int j = 0; j < grid[0].length; ++j) {
            int cand = 0; 
            for (int i = 0; i < grid.length; ++i) 
                cand = Math.max(cand, grid[i][j]); 
            ans += cand; 
        }
        return ans; 
    }


    /*2501. Longest Square Streak in an Array (Medium)
    You are given an integer array nums. A subsequence of nums is called a 
    square streak if:
    * The length of the subsequence is at least 2, and
    * after sorting the subsequence, each element (except the first element) is 
      the square of the previous number.
    Return the length of the longest square streak in nums, or return -1 if 
    there is no square streak. A subsequence is an array that can be derived 
    from another array by deleting some or no elements without changing the 
    order of the remaining elements.

    Example 1:
    Input: nums = [4,3,6,16,8,2]
    Output: 3
    Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes 
                 [2,4,16].
                 - 4 = 2 * 2.
                 - 16 = 4 * 4.
                 Therefore, [4,16,2] is a square streak. It can be shown that 
                 every subsequence of length 4 is not a square streak.
    
    Example 2:
    Input: nums = [2,3,5,6,7]
    Output: -1
    Explanation: There is no square streak in nums so return -1.

    Constraints:
    * 2 <= nums.length <= 10^5
    * 2 <= nums[i] <= 10^5*/

    public int longestSquareStreak(int[] nums) {
        int[] dp = new int[100_001]; 
        Arrays.sort(nums); 
        int ans = 0; 
        for (int x : nums) {
            dp[x] = Math.max(1, dp[x]); 
            int v = (int) Math.sqrt(x); 
            if (v*v == x) dp[x] = 1 + dp[v]; 
            ans = Math.max(ans, dp[x]); 
        }
        return ans > 1 ? ans : -1; 
    }


    /*2503. Maximum Number of Points From Grid Queries (Hard)
    You are given an m x n integer matrix grid and an array queries of size k.
    Find an array answer of size k such that for each integer queres[i] you 
    start in the top left cell of the matrix and repeat the following process:
    * If queries[i] is strictly greater than the value of the current cell that 
      you are in, then you get one point if it is your first time visiting this 
      cell, and you can move to any adjacent cell in all 4 directions: up, down, 
      left, and right.
    * Otherwise, you do not get any points, and you end this process.
    After the process, answer[i] is the maximum number of points you can get. 
    Note that for each query you are allowed to visit the same cell multiple 
    times. Return the resulting array answer.

    Example 1:
    Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
    Output: [5,8,1]
    Explanation: The diagrams above show which cells we visit to get points for 
                 each query.

    Example 2:
    Input: grid = [[5,2,1],[1,1,2]], queries = [3]
    Output: [0]
    Explanation: We can not get any points because the value of the top left 
                 cell is already greater than or equal to 3.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 2 <= m, n <= 1000
    * 4 <= m * n <= 10^5
    * k == queries.length
    * 1 <= k <= 10^4
    * 1 <= grid[i][j], queries[i] <= 10^6*/

    public int[] maxPoints(int[][] grid, int[] queries) {
        int m = grid.length, n = grid[0].length, prev = Integer.MIN_VALUE, prefix = 0; 
        int[][] dir = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}}; 
        Queue<int[]> pq = new PriorityQueue<>((a, b)->(a[0]-b[0])); 
        pq.add(new int[]{grid[0][0], 0, 0}); 
        grid[0][0] = 0; 
        List<Integer> keys = new ArrayList(); 
        List<Integer> vals = new ArrayList(); 
        while (pq.size() > 0) {
            int[] elem = pq.remove(); 
            int v = elem[0], i = elem[1], j = elem[2]; 
            if (prev != v) {
                keys.add(prev); 
                vals.add(prefix); 
            }
            ++prefix; 
            prev = v; 
            for (var d : dir) {
                int ii = i + d[0], jj = j + d[1]; 
                if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj] > 0) {
                    int vv = Math.max(v, grid[ii][jj]); 
                    pq.add(new int[]{vv, ii, jj}); 
                    grid[ii][jj] = 0; 
                }
            }
        } 
        keys.add(prev); 
        vals.add(prefix); 
        int sz = queries.length; 
        int[] ans = new int[sz]; 
        for (int i = 0; i < sz; ++i) {
            int k = Collections.binarySearch(keys, queries[i]);
            if (k < 0) k = -k-1; 
            ans[i] = vals.get(k-1); 
        }
        return ans; 
    }


    /*2505. Bitwise OR of All Subsequence Sums (Medium)
    Given an integer array nums, return the value of the bitwise OR of the sum 
    of all possible subsequences in the array. A subsequence is a sequence that 
    can be derived from another sequence by removing zero or more elements 
    without changing the order of the remaining elements.

    Example 1:
    Input: nums = [2,1,0,3]
    Output: 7
    Explanation: All possible subsequence sums that we can have are: 
                 0, 1, 2, 3, 4, 5, 6. And we have 
                 0 OR 1 OR 2 OR 3 OR 4 OR 5 OR 6 = 7, so we return 7.
    
    Example 2:
    Input: nums = [0,0,0]
    Output: 0
    Explanation: 0 is the only possible subsequence sum we can have, so we 
                 return 0.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 0 <= nums[i] <= 10^9*/

    public long subsequenceSumOr(int[] nums) {
        long ans = 0, prefix = 0; 
        for (var x : nums) {
            prefix += x; 
            ans |= x | prefix; 
        }
        return ans; 
    }


    /*2506. Count Pairs Of Similar Strings (Easy)
    You are given a 0-indexed string array words. Two strings are similar if 
    they consist of the same characters.
    * For example, "abca" and "cba" are similar since both consist of 
      characters 'a', 'b', and 'c'.
    * However, "abacba" and "bcfd" are not similar since they do not consist of 
      the same characters.
    Return the number of pairs (i, j) such that 0 <= i < j <= word.length - 1 
    and the two strings words[i] and words[j] are similar.

    Example 1:
    Input: words = ["aba","aabb","abcd","bac","aabc"]
    Output: 2
    Explanation: There are 2 pairs that satisfy the conditions:
                 - i = 0 and j = 1 : both words[0] and words[1] only consist of 
                   characters 'a' and 'b'. 
                 - i = 3 and j = 4 : both words[3] and words[4] only consist of 
                   characters 'a', 'b', and 'c'. 
    
    Example 2:
    Input: words = ["aabb","ab","ba"]
    Output: 3
    Explanation: There are 3 pairs that satisfy the conditions:
                 - i = 0 and j = 1 : both words[0] and words[1] only consist of 
                   characters 'a' and 'b'. 
                 - i = 0 and j = 2 : both words[0] and words[2] only consist of 
                   characters 'a' and 'b'.
                 - i = 1 and j = 2 : both words[1] and words[2] only consist of 
                   characters 'a' and 'b'.
    
    Example 3:
    Input: words = ["nba","cba","dba"]
    Output: 0
    Explanation: Since there does not exist any pair that satisfies the 
                 conditions, we return 0.

    Constraints:
    * 1 <= words.length <= 100
    * 1 <= words[i].length <= 100
    * words[i] consist of only lowercase English letters.*/

    public int similarPairs(String[] words) {
        int ans = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (var word : words) {
            int mask = 0; 
            for (var ch : word.toCharArray()) 
                mask |= 1<<ch-'a'; 
            ans += freq.getOrDefault(mask, 0); 
            freq.merge(mask, 1, Integer::sum); 
        }
        return ans; 
    }


    /*2507. Smallest Value After Replacing With Sum of Prime Factors (Medium)
    You are given a positive integer n. Continuously replace n with the sum of 
    its prime factors. 
    * Note that if a prime factor divides n multiple times, it should be 
      included in the sum as many times as it divides n.
    Return the smallest value n will take on.

    Example 1:
    Input: n = 15
    Output: 5
    Explanation: Initially, n = 15.
                 15 = 3 * 5, so replace n with 3 + 5 = 8.
                 8 = 2 * 2 * 2, so replace n with 2 + 2 + 2 = 6.
                 6 = 2 * 3, so replace n with 2 + 3 = 5.
                 5 is the smallest value n will take on.
    
    Example 2:
    Input: n = 3
    Output: 3
    Explanation: Initially, n = 3. 3 is the smallest value n will take on.

    Constraints: 2 <= n <= 10^5*/

    public int smallestValue(int n) {
        while (true) {
            int sm = 0; 
            for (int f = 2, nn = n; f <= nn; ++f)
                for (; nn % f == 0; nn /= f, sm += f); 
            if (sm == n) break; 
            n = sm; 
        }
        return n; 
    }


    /*2508. Add Edges to Make Degrees of All Nodes Even (Hard)
    There is an undirected graph consisting of n nodes numbered from 1 to n. 
    You are given the integer n and a 2D array edges where edges[i] = [ai, bi] 
    indicates that there is an edge between nodes ai and bi. The graph can be 
    disconnected. You can add at most two additional edges (possibly none) to 
    this graph so that there are no repeated edges and no self-loops. Return 
    true if it is possible to make the degree of each node in the graph even, 
    otherwise return false. The degree of a node is the number of edges 
    connected to it.

    Example 1:
    Input: n = 5, edges = [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]
    Output: true
    Explanation: The above diagram shows a valid way of adding an edge. Every 
                 node in the resulting graph is connected to an even number of 
                 edges.
    
    Example 2:
    Input: n = 4, edges = [[1,2],[3,4]]
    Output: true
    Explanation: The above diagram shows a valid way of adding two edges.

    Example 3:
    Input: n = 4, edges = [[1,2],[1,3],[1,4]]
    Output: false
    Explanation: It is not possible to obtain a valid graph with adding at most 
                 2 edges.

    Constraints:
    * 3 <= n <= 10^5
    * 2 <= edges.length <= 10^5
    * edges[i].length == 2
    * 1 <= ai, bi <= n
    * ai != bi
    * There are no repeated edges.*/

    public boolean isPossible(int n, List<List<Integer>> edges) {
        HashSet<Integer>[] graph = new HashSet[n]; 
        for (int i = 0; i < n; ++i) graph[i] = new HashSet(); 
        for (var e : edges) {
            graph[e.get(0)-1].add(e.get(1)-1); 
            graph[e.get(1)-1].add(e.get(0)-1); 
        }
        List<Integer> odd = new ArrayList(); 
        for (int i = 0; i < n; ++i) 
            if (graph[i].size() % 2 == 1) odd.add(i); 
        if (odd.size() == 2) {
            for (int i = 0; i < n; ++i) 
                if (!graph[i].contains(odd.get(0)) && !graph[i].contains(odd.get(1))) return true; 
            return false; 
        }
        if (odd.size() == 4) 
            return !graph[odd.get(0)].contains(odd.get(1)) && !graph[odd.get(2)].contains(odd.get(3)) 
                || !graph[odd.get(0)].contains(odd.get(2)) && !graph[odd.get(1)].contains(odd.get(3)) 
                || !graph[odd.get(0)].contains(odd.get(3)) && !graph[odd.get(1)].contains(odd.get(2)); 
        return odd.size() == 0; 
    }


    /*2509. Cycle Length Queries in a Tree (Hard)
    You are given an integer n. There is a complete binary tree with 2n - 1 
    nodes. The root of that tree is the node with the value 1, and every node 
    with a value val in the range [1, 2n - 1 - 1] has two children where:
    * The left node has the value 2 * val, and
    * The right node has the value 2 * val + 1.
    You are also given a 2D integer array queries of length m, where 
    queries[i] = [ai, bi]. For each query, solve the following problem:
    * Add an edge between the nodes with values ai and bi.
    * Find the length of the cycle in the graph.
    * Remove the added edge between nodes with values ai and bi.
    Note that:
    * A cycle is a path that starts and ends at the same node, and each edge in 
      the path is visited only once.
    * The length of a cycle is the number of edges visited in the cycle.
    * There could be multiple edges between two nodes in the tree after adding 
      the edge of the query.
    Return an array answer of length m where answer[i] is the answer to the ith 
    query.

    Example 1:
    Input: n = 3, queries = [[5,3],[4,7],[2,3]]
    Output: [4,5,3]
    Explanation: The diagrams above show the tree of 23 - 1 nodes. Nodes 
                 colored in red describe the nodes in the cycle after adding 
                 the edge.
                 - After adding the edge between nodes 3 and 5, the graph 
                   contains a cycle of nodes [5,2,1,3]. Thus answer to the 
                   first query is 4. We delete the added edge and process the 
                   next query.
                 - After adding the edge between nodes 4 and 7, the graph 
                   contains a cycle of nodes [4,2,1,3,7]. Thus answer to the 
                   second query is 5. We delete the added edge and process the 
                   next query.
                 - After adding the edge between nodes 2 and 3, the graph 
                   contains a cycle of nodes [2,1,3]. Thus answer to the third 
                   query is 3. We delete the added edge.
    
    Example 2:
    Input: n = 2, queries = [[1,2]]
    Output: [2]
    Explanation: The diagram above shows the tree of 22 - 1 nodes. Nodes 
                 colored in red describe the nodes in the cycle after adding 
                 the edge.
                 - After adding the edge between nodes 1 and 2, the graph 
                   contains a cycle of nodes [2,1]. Thus answer for the first 
                   query is 2. We delete the added edge.

    Constraints:
    * 2 <= n <= 30
    * m == queries.length
    * 1 <= m <= 10^5
    * queries[i].length == 2
    * 1 <= ai, bi <= 2n - 1
    * ai != bi*/

    public int[] cycleLengthQueries(int n, int[][] queries) {
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int dist = 1; 
            for (int u = queries[i][0], v = queries[i][1]; u != v; u /= 2, ++dist) 
                if (u < v) { int tmp = v; v = u; u = tmp; }
            ans[i] = dist; 
        }
        return ans;  
    }


    /*2510. Check if There is a Path With Equal Number of 0's And 1's (Medium)
    You are given a 0-indexed m x n binary matrix grid. You can move from a 
    cell (row, col) to any of the cells (row + 1, col) or (row, col + 1). 
    Return true if there is a path from (0, 0) to (m - 1, n - 1) that visits an 
    equal number of 0's and 1's. Otherwise return false.

    Example 1:
    Input: grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
    Output: true
    Explanation: The path colored in blue in the above diagram is a valid path 
                 because we have 3 cells with a value of 1 and 3 with a value 
                 of 0. Since there is a valid path, we return true.
    
    Example 2:
    Input: grid = [[1,1,0],[0,0,1],[1,0,0]]
    Output: false
    Explanation: There is no path in this grid with an equal number of 0's and 
                 1's.

    Constraints:
    * m == grid.length
    * n == grid[i].length
    * 2 <= m, n <= 100
    * grid[i][j] is either 0 or 1.*/

    public boolean isThereAPath(int[][] grid) {
        int m = grid.length, n = grid[0].length; 
        if ((m+n) % 2 == 1) {
            int[][] lo = new int[m][n], hi = new int[m][n]; 
            Arrays.stream(lo).forEach(a -> Arrays.fill(a, Integer.MAX_VALUE));
            Arrays.stream(hi).forEach(a -> Arrays.fill(a, Integer.MIN_VALUE));
            lo[0][0] = hi[0][0] = 2*grid[0][0]-1; 
            for (int i = 0; i < m; ++i) 
                for (int j = 0; j < n; ++j) {
                    if (i > 0) {
                        lo[i][j] = Math.min(lo[i][j], lo[i-1][j] + 2*grid[i][j]-1); 
                        hi[i][j] = Math.max(hi[i][j], hi[i-1][j] + 2*grid[i][j]-1); 
                    }
                    if (j > 0) {
                        lo[i][j] = Math.min(lo[i][j], lo[i][j-1] + 2*grid[i][j]-1); 
                        hi[i][j] = Math.max(hi[i][j], hi[i][j-1] + 2*grid[i][j]-1); 
                    }
                }
            return lo[m-1][n-1] <= 0 && 0 <= hi[m-1][n-1]; 
        }
        return false; 
    }


    /*2511. Maximum Enemy Forts That Can Be Captured (Easy)
    You are given a 0-indexed integer array forts of length n representing the 
    positions of several forts. forts[i] can be -1, 0, or 1 where:
    * -1 represents there is no fort at the ith position.
    * 0 indicates there is an enemy fort at the ith position.
    * 1 indicates the fort at the ith the position is under your command.
    Now you have decided to move your army from one of your forts at position i 
    to an empty position j such that:
    * 0 <= i, j <= n - 1
    * The army travels over enemy forts only. Formally, for all k where 
      min(i,j) < k < max(i,j), forts[k] == 0.
    While moving the army, all the enemy forts that come in the way are 
    captured. Return the maximum number of enemy forts that can be captured. In 
    case it is impossible to move your army, or you do not have any fort under 
    your command, return 0.

    Example 1:
    Input: forts = [1,0,0,-1,0,0,0,0,1]
    Output: 4
    Explanation: - Moving the army from position 0 to position 3 captures 2 
                   enemy forts, at 1 and 2.
                 - Moving the army from position 8 to position 3 captures 4 
                   enemy forts.
                 Since 4 is the maximum number of enemy forts that can be 
                 captured, we return 4.
    
    Example 2:
    Input: forts = [0,0,1,-1]
    Output: 0
    Explanation: Since no enemy fort can be captured, 0 is returned.

    Constraints:
    * 1 <= forts.length <= 1000
    * -1 <= forts[i] <= 1*/

    public int captureForts(int[] forts) {
        int ans = 0; 
        for (int i = 0, ii = 0; i < forts.length; ++i) 
            if (forts[i] != 0) {
                if (forts[ii] == -forts[i]) ans = Math.max(ans, i-ii-1); 
                ii = i; 
            }
        return ans; 
    }


    /*2512. Reward Top K Students (Medium)
    You are given two string arrays positive_feedback and negative_feedback, 
    containing the words denoting positive and negative feedback, respectively. 
    Note that no word is both positive and negative. Initially every student 
    has 0 points. Each positive word in a feedback report increases the points 
    of a student by 3, whereas each negative word decreases the points by 1. 
    You are given n feedback reports, represented by a 0-indexed string array 
    report and a 0-indexed integer array student_id, where student_id[i] 
    represents the ID of the student who has received the feedback report 
    report[i]. The ID of each student is unique. Given an integer k, return 
    the top k students after ranking them in non-increasing order by their 
    points. In case more than one student has the same points, the one with the 
    lower ID ranks higher.

    Example 1:
    Input: positive_feedback = ["smart","brilliant","studious"], 
           negative_feedback = ["not"], 
           report = ["this student is studious","the student is smart"], 
           student_id = [1,2], k = 2
    Output: [1,2]
    Explanation: Both the students have 1 positive feedback and 3 points but 
                 since student 1 has a lower ID he ranks higher.
    
    Example 2:
    Input: positive_feedback = ["smart","brilliant","studious"], 
           negative_feedback = ["not"], 
           report = ["this student is not studious","the student is smart"], 
           student_id = [1,2], k = 2
    Output: [2,1]
    Explanation: - The student with ID 1 has 1 positive feedback and 1 negative 
                   feedback, so he has 3-1=2 points. 
                 - The student with ID 2 has 1 positive feedback, so he has 3 
                   points. 
                 Since student 2 has more points, [2,1] is returned.

    Constraints:
    * 1 <= positive_feedback.length, negative_feedback.length <= 10^4
    * 1 <= positive_feedback[i].length, negative_feedback[j].length <= 100
    * Both positive_feedback[i] and negative_feedback[j] consists of lowercase 
      English letters.
    * No word is present in both positive_feedback and negative_feedback.
    * n == report.length == student_id.length
    * 1 <= n <= 10^4
    * report[i] consists of lowercase English letters and spaces ' '.
    * There is a single space between consecutive words of report[i].
    * 1 <= report[i].length <= 100
    * 1 <= student_id[i] <= 10^9
    * All the values of student_id[i] are unique.
    * 1 <= k <= n*/

    public List<Integer> topStudents(String[] positive_feedback, String[] negative_feedback, String[] report, int[] student_id, int k) {
        Set<String> positive = new HashSet(Arrays.asList(positive_feedback)), negative = new HashSet(Arrays.asList(negative_feedback)); 
        Map<Integer, Integer> mp = new HashMap(); 
        for (int i = 0; i < report.length; ++i) {
            int point = 0; 
            for (var word : report[i].split(" ")) {
                if (positive.contains(word)) point += 3; 
                else if (negative.contains(word)) --point; 
            }
            mp.put(student_id[i], point); 
        }
        List<Integer> vals = new ArrayList(); 
        for (var elem : mp.entrySet()) vals.add(elem.getKey()); 
        Collections.sort(vals, (a, b)->(mp.get(a) != mp.get(b) ? Integer.compare(mp.get(b), mp.get(a)) : Integer.compare(a, b))); 
        List<Integer> ans = new ArrayList(); 
        for (int i = 0; i < k; ++i) ans.add(vals.get(i)); 
        return ans; 
    }


    /*2513. Minimize the Maximum of Two Arrays (Medium)
    We have two arrays arr1 and arr2 which are initially empty. You need to add 
    positive integers to them such that they satisfy all the following 
    conditions:
    * arr1 contains uniqueCnt1 distinct positive integers, each of which is not 
      divisible by divisor1.
    * arr2 contains uniqueCnt2 distinct positive integers, each of which is not 
      divisible by divisor2.
    * No integer is present in both arr1 and arr2.
    Given divisor1, divisor2, uniqueCnt1, and uniqueCnt2, return the minimum 
    possible maximum integer that can be present in either array.

    Example 1:
    Input: divisor1 = 2, divisor2 = 7, uniqueCnt1 = 1, uniqueCnt2 = 3
    Output: 4
    Explanation: We can distribute the first 4 natural numbers into arr1 and 
                 arr2. arr1 = [1] and arr2 = [2,3,4]. We can see that both 
                 arrays satisfy all the conditions. Since the maximum value is 
                 4, we return it.
    
    Example 2:
    Input: divisor1 = 3, divisor2 = 5, uniqueCnt1 = 2, uniqueCnt2 = 1
    Output: 3
    Explanation: Here arr1 = [1,2], and arr2 = [3] satisfy all conditions. 
                 Since the maximum value is 3, we return it.
    
    Example 3:
    Input: divisor1 = 2, divisor2 = 4, uniqueCnt1 = 8, uniqueCnt2 = 2
    Output: 15
    Explanation: Here, the final possible arrays can be 
                 arr1 = [1,3,5,7,9,11,13,15], and arr2 = [2,6]. It can be shown 
                 that it is not possible to obtain a lower maximum satisfying 
                 all conditions. 

    Constraints:
    * 2 <= divisor1, divisor2 <= 10^5
    * 1 <= uniqueCnt1, uniqueCnt2 < 10^9
    * 2 <= uniqueCnt1 + uniqueCnt2 <= 10^9*/

    public int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) {
        int g = divisor1; 
        for (int x = divisor2; x > 0; ) {int tmp = g; g = x; x = tmp % x; }
        long lo = 0, hi = Integer.MAX_VALUE, mult = ((long) divisor1*divisor2/g); 
        while (lo < hi) {
            long mid = lo + (hi-lo)/2;
            if (uniqueCnt1 <= mid-mid/divisor1 && uniqueCnt2 <= mid-mid/divisor2 && uniqueCnt1+uniqueCnt2 <= mid-mid/mult) hi = mid; 
            else lo = mid+1; 
        }
        return (int) lo; 
    }


    /*2514. Count Anagrams (Hard)
    You are given a string s containing one or more words. Every consecutive 
    pair of words is separated by a single space ' '. A string t is an anagram 
    of string s if the ith word of t is a permutation of the ith word of s.
    * For example, "acb dfe" is an anagram of "abc def", but "def cab" and 
      "adc bef" are not.
    Return the number of distinct anagrams of s. Since the answer may be very 
    large, return it modulo 10^9 + 7.

    Example 1:
    Input: s = "too hot"
    Output: 18
    Explanation: Some of the anagrams of the given string are "too hot", 
                 "oot hot", "oto toh", "too toh", and "too oht".
    
    Example 2:
    Input: s = "aa"
    Output: 1
    Explanation: There is only one anagram possible for the given string.

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists of lowercase English letters and spaces ' '.
    * There is single space between consecutive words.*/

    public int countAnagrams(String s) {
        final int mod = 1_000_000_007; 
        int n = s.length(); 
        long[] fact = new long[n+1], ifact = new long[n+1], inv = new long[n+1]; 
        fact[0] = ifact[0] = inv[0] = inv[1] = 1; 
        for (int x = 1; x <= n; ++x) {
            if (x >= 2) inv[x] = mod - mod/x * inv[mod%x] % mod; 
            fact[x] = fact[x-1] * x % mod; 
            ifact[x] = ifact[x-1] * inv[x] % mod; 
        }
        long ans = 1; 
        for (var word : s.split(" ")) {
            ans = ans * fact[word.length()] % mod; 
            int[] freq = new int[26]; 
            for (var ch : word.toCharArray())  ++freq[ch-'a']; 
            for (var x : freq) ans = ans * ifact[x] % mod; 
        }
        return (int) ans; 
    }


    /*2515. Shortest Distance to Target String in a Circular Array (Easy)
    You are given a 0-indexed circular string array words and a string target. 
    A circular array means that the array's end connects to the array's 
    beginning.
    * Formally, the next element of words[i] is words[(i + 1) % n] and the 
      previous element of words[i] is words[(i - 1 + n) % n], where n is the 
      length of words.
    Starting from startIndex, you can move to either the next word or the 
    previous word with 1 step at a time. Return the shortest distance needed to 
    reach the string target. If the string target does not exist in words, 
    return -1.

    Example 1:
    Input: words = ["hello","i","am","leetcode","hello"], target = "hello", startIndex = 1
    Output: 1
    Explanation: We start from index 1 and can reach "hello" by
                 - moving 3 units to the right to reach index 4.
                 - moving 2 units to the left to reach index 4.
                 - moving 4 units to the right to reach index 0.
                 - moving 1 unit to the left to reach index 0.
                 The shortest distance to reach "hello" is 1.
    
    Example 2:
    Input: words = ["a","b","leetcode"], target = "leetcode", startIndex = 0
    Output: 1
    Explanation: We start from index 0 and can reach "leetcode" by
                 - moving 2 units to the right to reach index 3.
                 - moving 1 unit to the left to reach index 3.
                 The shortest distance to reach "leetcode" is 1.
    
    Example 3:
    Input: words = ["i","eat","leetcode"], target = "ate", startIndex = 0
    Output: -1
    Explanation: Since "ate" does not exist in words, we return -1.

    Constraints:
    * 1 <= words.length <= 100
    * 1 <= words[i].length <= 100
    * words[i] and target consist of only lowercase English letters.
    * 0 <= startIndex < words.length*/

    public int closetTarget(String[] words, String target, int startIndex) {
        int ans = Integer.MAX_VALUE; 
        for (int i = 0, n = words.length; i < n; ++i) 
            if (words[i].equals(target)) {
                int cand = Math.abs(i - startIndex); 
                ans = Math.min(ans, Math.min(cand, n - cand)); 
            }
        return ans < Integer.MAX_VALUE ? ans : -1; 
    }


    /*2516. Take K of Each Character From Left and Right (Medium)
    You are given a string s consisting of the characters 'a', 'b', and 'c' and 
    a non-negative integer k. Each minute, you may take either the leftmost 
    character of s, or the rightmost character of s. Return the minimum number 
    of minutes needed for you to take at least k of each character, or return 
    -1 if it is not possible to take k of each character.

    Example 1:
    Input: s = "aabaaaacaabc", k = 2
    Output: 8
    Explanation: Take three characters from the left of s. You now have two 'a' 
                 characters, and one 'b' character. Take five characters from 
                 the right of s. You now have four 'a' characters, two 'b' 
                 characters, and two 'c' characters. A total of 3 + 5 = 8 
                 minutes is needed. It can be proven that 8 is the minimum 
                 number of minutes needed.
    
    Example 2:
    Input: s = "a", k = 1
    Output: -1
    Explanation: It is not possible to take one 'b' or 'c' so return -1.

    Constraints:
    * 1 <= s.length <= 10^5
    * s consists of only the letters 'a', 'b', and 'c'.
    * 0 <= k <= s.length*/

    public int takeCharacters(String s, int k) {
        int ans = Integer.MAX_VALUE; 
        int[] freq= new int[3]; 
        for (int i = 0, ii = 0, n = s.length(); i < 2*n; ++i) {
            ++freq[s.charAt(i % n) - 'a']; 
            while (ii < n && i >= n-1 && freq[s.charAt(ii)-'a'] > k && freq[0] >= k && freq[1] >= k && freq[2] >= k) {
                ans = Math.min(ans, i-ii); 
                --freq[s.charAt(ii++) - 'a']; 
            }
        }
        return ans <= s.length() ? ans : -1; 
    }


    /*2517. Maximum Tastiness of Candy Basket (Medium)
    You are given an array of positive integers price where price[i] denotes 
    the price of the ith candy and a positive integer k. The store sells 
    baskets of k distinct candies. The tastiness of a candy basket is the 
    smallest absolute difference of the prices of any two candies in the basket.
    Return the maximum tastiness of a candy basket.

    Example 1:
    Input: price = [13,5,1,8,21,2], k = 3
    Output: 8
    Explanation: Choose the candies with the prices [13,5,21]. The tastiness of 
                 the candy basket is: 
                 min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8. It can 
                 be proven that 8 is the maximum tastiness that can be achieved.
    
    Example 2:
    Input: price = [1,3,1], k = 2
    Output: 2
    Explanation: Choose the candies with the prices [1,3]. The tastiness of the 
                 candy basket is: min(|1 - 3|) = min(2) = 2. It can be proven 
                 that 2 is the maximum tastiness that can be achieved.
    
    Example 3:
    Input: price = [7,7,7,7], k = 2
    Output: 0
    Explanation: Choosing any two distinct candies from the candies we have 
                 will result in a tastiness of 0.

    Constraints:
    * 1 <= price.length <= 10^5
    * 1 <= price[i] <= 10^9
    * 2 <= k <= price.length*/

    public int maximumTastiness(int[] price, int k) {
        Arrays.sort(price); 
        int n = price.length; 
        int lo = 0, hi = price[n-1] - price[0]; 
        while (lo < hi) {
            int mid = lo + (hi-lo+1)/2, val = price[0], cnt = 0; 
            for (var x : price) 
                if (x >= val + mid) { ++cnt; val = x; }
            if (cnt >= k-1) lo = mid; 
            else hi = mid-1; 
        }
        return lo; 
    }


    /*2518. Number of Great Partitions (Hard)
    You are given an array nums consisting of positive integers and an integer 
    k. Partition the array into two ordered groups such that each element is in 
    exactly one group. A partition is called great if the sum of elements of 
    each group is greater than or equal to k. Return the number of distinct 
    great partitions. Since the answer may be too large, return it modulo 
    10^9 + 7. Two partitions are considered distinct if some element nums[i] is 
    in different groups in the two partitions.

    Example 1:
    Input: nums = [1,2,3,4], k = 4
    Output: 6
    Explanation: The great partitions are: ([1,2,3], [4]), ([1,3], [2,4]), 
                 ([1,4], [2,3]), ([2,3], [1,4]), ([2,4], [1,3]) and 
                 ([4], [1,2,3]).
    
    Example 2:
    Input: nums = [3,3,3], k = 4
    Output: 0
    Explanation: There are no great partitions for this array.

    Example 3:
    Input: nums = [6,6], k = 2
    Output: 2
    Explanation: We can either put nums[0] in the first partition or in the 
                 second partition. The great partitions will be ([6], [6]) and 
                 ([6], [6]).

    Constraints:
    * 1 <= nums.length, k <= 1000
    * 1 <= nums[i] <= 10^9*/

    public int countPartitions(int[] nums, int k) {
        final int mod = 1_000_000_007; 
        long ans = 1, total = 0; 
        long[] dp = new long[k]; 
        dp[0] = 1; 
        for (var x : nums) {
            ans = 2*ans % mod; 
            total += x; 
            for (int i = k-1-x; i >= 0; --i) 
                dp[i+x] = (dp[i] + dp[i+x]) % mod; 
        }
        ans -= 2*LongStream.of(dp).sum(); 
        return total >= 2*k ? (int) (ans % mod + mod) % mod : 0; 
    }


    /*2519. Count the Number of K-Big Indices (Hard)
    You are given a 0-indexed integer array nums and a positive integer k. We 
    call an index i k-big if the following conditions are satisfied:
    * There exist at least k different indices idx1 such that idx1 < i and 
      nums[idx1] < nums[i].
    * There exist at least k different indices idx2 such that idx2 > i and 
      nums[idx2] < nums[i].
    Return the number of k-big indices.

    Example 1:
    Input: nums = [2,3,6,5,2,3], k = 2
    Output: 2
    Explanation: There are only two 2-big indices in nums:
                 - i = 2 --> There are two valid idx1: 0 and 1. There are three 
                             valid idx2: 2, 3, and 4.
                 - i = 3 --> There are two valid idx1: 0 and 1. There are two 
                             valid idx2: 3 and 4.
    
    Example 2:
    Input: nums = [1,1,1], k = 3
    Output: 0
    Explanation: There are no 3-big indices in nums.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 1 <= nums[i], k <= nums.length*/

    public int kBigIndices(int[] nums, int k) {
        int n = nums.length; 
        boolean[] prefix = new boolean[n]; 
        Queue<Integer> pq = new PriorityQueue(Collections.reverseOrder()); 
        for (int i = 0; i < n; ++i) {
            if (pq.size() == k && pq.peek() < nums[i]) prefix[i] = true; 
            pq.add(nums[i]); 
            if (pq.size() > k) pq.poll(); 
        }
        int ans = 0; 
        pq.clear(); 
        for (int i = n-1; i >= 0; --i) {
            if (pq.size() == k && pq.peek() < nums[i] && prefix[i]) ++ans; 
            pq.add(nums[i]); 
            if (pq.size() > k) pq.poll(); 
        }
        return ans; 
    }


    /*2520. Count the Digits That Divide a Number (Easy)
    Given an integer num, return the number of digits in num that divide num. 
    An integer val divides nums if nums % val == 0.

    Example 1:
    Input: num = 7
    Output: 1
    Explanation: 7 divides itself, hence the answer is 1.

    Example 2:
    Input: num = 121
    Output: 2
    Explanation: 121 is divisible by 1, but not 2. Since 1 occurs twice as a 
                 digit, we return 2.
    
    Example 3:
    Input: num = 1248
    Output: 4
    Explanation: 1248 is divisible by all of its digits, hence the answer is 4.

    Constraints:
    * 1 <= num <= 10^9
    * num does not contain 0 as one of its digits.*/

    public int countDigits(int num) {
        int ans = 0; 
        for (int n = num; n > 0; n /= 10) 
            if (num % (n % 10) == 0) ++ans; 
        return ans; 
    }


    /*2521. Distinct Prime Factors of Product of Array (Medium)
    Given an array of positive integers nums, return the number of distinct 
    prime factors in the product of the elements of nums. Note that:
    * A number greater than 1 is called prime if it is divisible by only 1 and 
      itself.
    * An integer val1 is a factor of another integer val2 if val2 / val1 is an 
      integer.

    Example 1:
    Input: nums = [2,4,3,7,10,6]
    Output: 4
    Explanation: The product of all the elements in nums is: 
                 2 * 4 * 3 * 7 * 10 * 6 = 10080 = 2^5 * 3^2 * 5 * 7.
                 There are 4 distinct prime factors so we return 4.
    
    Example 2:
    Input: nums = [2,4,8,16]
    Output: 1
    Explanation: The product of all the elements in nums is: 
                 2 * 4 * 8 * 16 = 1024 = 2^10.
                 There is 1 distinct prime factor so we return 1.

    Constraints:
    * 1 <= nums.length <= 10^4
    * 2 <= nums[i] <= 1000*/

    public int distinctPrimeFactors(int[] nums) {
        HashSet<Integer> seen = new HashSet(); 
        for (var x : nums) {
            for (int f = 2; f <= Math.sqrt(x); ++f) 
                for (; x % f == 0; x /= f) 
                    seen.add(f); 
            if (1 < x) seen.add(x);
        }
        return seen.size(); 
    }


    /*2522. Partition String Into Substrings With Values at Most K (Medium)
    You are given a string s consisting of digits from 1 to 9 and an integer k.
    A partition of a string s is called good if:
    * Each digit of s is part of exactly one substring.
    * The value of each substring is less than or equal to k.
    Return the minimum number of substrings in a good partition of s. If no 
    good partition of s exists, return -1. Note that:
    * The value of a string is its result when interpreted as an integer. For 
      example, the value of "123" is 123 and the value of "1" is 1.
    * A substring is a contiguous sequence of characters within a string.

    Example 1:
    Input: s = "165462", k = 60
    Output: 4
    Explanation: We can partition the string into substrings "16", "54", "6", 
                 and "2". Each substring has a value less than or equal to 
                 k = 60. It can be shown that we cannot partition the string 
                 into less than 4 substrings.
    
    Example 2:
    Input: s = "238182", k = 5
    Output: -1
    Explanation: There is no good partition for this string.

    Constraints:
    * 1 <= s.length <= 10^5
    * s[i] is a digit from '1' to '9'.
    * 1 <= k <= 10^9*/

    public int minimumPartition(String s, int k) {
        int ans = 1; 
        long val = 0; 
        for (var ch : s.toCharArray()) {
            if (10*val + (ch - '0') > k) {
                ++ans; 
                val = 0; 
            }
            val = 10*val + (ch - '0'); 
            if (val > k) return -1; 
        }
        return ans; 
    }


    /*2523. Closest Prime Numbers in Range (Medium)
    Given two positive integers left and right, find the two integers num1 and 
    num2 such that:
    * left <= nums1 < nums2 <= right .
    * nums1 and nums2 are both prime numbers.
    * nums2 - nums1 is the minimum amongst all other pairs satisfying the above 
      conditions.
    Return the positive integer array ans = [nums1, nums2]. If there are 
    multiple pairs satisfying these conditions, return the one with the minimum 
    nums1 value or [-1, -1] if such numbers do not exist. A number greater than 
    1 is called prime if it is only divisible by 1 and itself.

    Example 1:
    Input: left = 10, right = 19
    Output: [11,13]
    Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19. 
                 The closest gap between any pair is 2, which can be achieved 
                 by [11,13] or [17,19]. Since 11 is smaller than 17, we return 
                 the first pair.
    
    Example 2:
    Input: left = 4, right = 6
    Output: [-1,-1]
    Explanation: There exists only one prime number in the given range, so the 
                 conditions cannot be satisfied.

    Constraints: 1 <= left <= right <= 10^6*/

    public int[] closestPrimes(int left, int right) {
        boolean[] sieve = new boolean[right+1]; 
        Arrays.fill(sieve, true); 
        sieve[0] = sieve[1] = false; 
        for (int x = 2; x <= Math.sqrt(right); ++x) 
            if (sieve[x]) 
                for (int xx = x*x; xx <= right; xx +=x) 
                    sieve[xx] = false; 
        int[] ans = {-1, -1}; 
        int prev = 0, least = Integer.MAX_VALUE; 
        for (int x = left; x <= right; ++x) 
            if (sieve[x]) {
                if (prev > 0 && x - prev < least) {
                    ans = new int[]{prev, x}; 
                    least = x - prev; 
                }
                prev = x; 
            }
        return ans; 
    }


    /*2524. Maximum Frequency Score of a Subarray (Hard)
    You are given an integer array nums and a positive integer k. The frequency 
    score of an array is the sum of the distinct values in the array raised to 
    the power of their frequencies, taking the sum modulo 10^9 + 7. For example, 
    the frequency score of the array [5,4,5,7,4,4] is 
    (4^3 + 5^2 + 7^1) modulo (10^9 + 7) = 96. Return the maximum frequency 
    score of a subarray of size k in nums. You should maximize the value under 
    the modulo and not the actual value. A subarray is a contiguous part of an 
    array.

    Example 1:
    Input: nums = [1,1,1,2,1,2], k = 3
    Output: 5
    Explanation: The subarray [2,1,2] has a frequency score equal to 5. It can 
                 be shown that it is the maximum frequency score we can have.
    
    Example 2:
    Input: nums = [1,1,1,1,1,1], k = 4
    Output: 1
    Explanation: All the subarrays of length 4 have a frequency score equal to 
                 1.

    Constraints:
    * 1 <= k <= nums.length <= 10^5
    * 1 <= nums[i] <= 10^6*/

    // private long pow(long x, int p, int m) {
    //     long ans = 1; 
    //     for (; p > 0; p >>= 1) {
    //         if (p % 2 == 1) ans = ans * x % m; 
    //         x = x * x % m; 
    //     }
    //     return ans; 
    // }
    
    public int maxFrequencyScore(int[] nums, int k) {
        final int mod = 1_000_000_007; 
        long ans = 0, val = 0; 
        HashMap<Integer, Integer> freq = new HashMap(); 
        for (int i = 0; i < nums.length; ++i) {
            if (freq.getOrDefault(nums[i], 0) > 0) val = (val - pow(nums[i], freq.get(nums[i]), mod)) % mod; 
            freq.merge(nums[i], 1, Integer::sum); 
            val = (val + pow(nums[i], freq.get(nums[i]), mod)) % mod; 
            if (i >= k) {
                val = (val - pow(nums[i-k], freq.get(nums[i-k]), mod)) % mod; 
                freq.merge(nums[i-k], -1, Integer::sum); 
                if (freq.getOrDefault(nums[i-k], 0) > 0) val = (val + pow(nums[i-k], freq.get(nums[i-k]), mod)) % mod; 
            }
            val = (val + mod) % mod; 
            if (i >= k-1) ans = Math.max(ans, val); 
        }
        return (int) ans; 
    }


    /*2525. Categorize Box According to Criteria (Easy)
    Given four integers length, width, height, and mass, representing the 
    dimensions and mass of a box, respectively, return a string representing 
    the category of the box. 
    * The box is "Bulky" if:
      + Any of the dimensions of the box is greater or equal to 104.
      + Or, the volume of the box is greater or equal to 109.
    * If the mass of the box is greater or equal to 100, it is "Heavy".
    * If the box is both "Bulky" and "Heavy", then its category is "Both".
    * If the box is neither "Bulky" nor "Heavy", then its category is "Neither".
    * If the box is "Bulky" but not "Heavy", then its category is "Bulky".
    * If the box is "Heavy" but not "Bulky", then its category is "Heavy".
    Note that the volume of the box is the product of its length, width and 
    height.

    Example 1:
    Input: length = 1000, width = 35, height = 700, mass = 300
    Output: "Heavy"
    Explanation: None of the dimensions of the box is greater or equal to 10^4. 
                 Its volume = 24500000 <= 109. So it cannot be categorized as 
                 "Bulky". However mass >= 100, so the box is "Heavy". Since the 
                 box is not "Bulky" but "Heavy", we return "Heavy". 
    
    Example 2:
    Input: length = 200, width = 50, height = 800, mass = 50
    Output: "Neither"
    Explanation: None of the dimensions of the box is greater or equal to 10^4.
                 Its volume = 8 * 106 <= 109. So it cannot be categorized as 
                 "Bulky". Its mass is also less than 100, so it cannot be 
                 categorized as "Heavy" either.  Since its neither of the two 
                 above categories, we return "Neither".

    Constraints:
    * 1 <= length, width, height <= 10^5
    * 1 <= mass <= 10^3*/

    public String categorizeBox(int length, int width, int height, int mass) {
        boolean bulky = Math.max(length, Math.max(width, height)) >= 1e4 || (long) length*width*height >= 1e9, heavy = mass >= 100; 
        if (bulky && heavy) return "Both"; 
        if (bulky) return "Bulky"; 
        if (heavy) return "Heavy"; 
        return "Neither"; 
    }


    /*2527. Find Xor-Beauty of Array (Medium)
    You are given a 0-indexed integer array nums. The effective value of three 
    indices i, j, and k is defined as ((nums[i] | nums[j]) & nums[k]). The xor-
    beauty of the array is the XORing of the effective values of all the 
    possible triplets of indices (i, j, k) where 0 <= i, j, k < n. Return the 
    xor-beauty of nums. Note that:
    * val1 | val2 is bitwise OR of val1 and val2.
    * val1 & val2 is bitwise AND of val1 and val2.

    Example 1:
    Input: nums = [1,4]
    Output: 5
    Explanation: The triplets and their corresponding effective values are 
                 listed below:
                 - (0,0,0) with effective value ((1 | 1) & 1) = 1
                 - (0,0,1) with effective value ((1 | 1) & 4) = 0
                 - (0,1,0) with effective value ((1 | 4) & 1) = 1
                 - (0,1,1) with effective value ((1 | 4) & 4) = 4
                 - (1,0,0) with effective value ((4 | 1) & 1) = 1
                 - (1,0,1) with effective value ((4 | 1) & 4) = 4
                 - (1,1,0) with effective value ((4 | 4) & 1) = 0
                 - (1,1,1) with effective value ((4 | 4) & 4) = 4 
                 Xor-beauty of array will be bitwise XOR of all beauties = 
                 1 ^ 0 ^ 1 ^ 4 ^ 1 ^ 4 ^ 0 ^ 4 = 5.
    
    Example 2:
    Input: nums = [15,45,20,2,34,35,5,44,32,30]
    Output: 34
    Explanation: The xor-beauty of the given array is 34.

    Constraints:
    1 <= nums.length <= 10^5
    1 <= nums[i] <= 10^9*/

    public int xorBeauty(int[] nums) {
        int val = 0; 
        for (int x : nums) val ^= x; 
        return (val | val) & val; 
    }


    /*2528. Maximize the Minimum Powered City (Hard)
    You are given a 0-indexed integer array stations of length n, where 
    stations[i] represents the number of power stations in the ith city. Each 
    power station can provide power to every city in a fixed range. In other 
    words, if the range is denoted by r, then a power station at city i can 
    provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
    * Note that |x| denotes absolute value. For example, |7 - 5| = 2 and 
      |3 - 10| = 7.
    The power of a city is the total number of power stations it is being 
    provided power from. The government has sanctioned building k more power 
    stations, each of which can be built in any city, and have the same range 
    as the pre-existing ones. Given the two integers r and k, return the 
    maximum possible minimum power of a city, if the additional power stations 
    are built optimally. Note that you can build the k power stations in 
    multiple cities.

    Example 1:
    Input: stations = [1,2,4,5,0], r = 1, k = 2
    Output: 5
    Explanation: One of the optimal ways is to install both the power stations 
                 at city 1. So stations will become [1,4,4,5,0].
                 - City 0 is provided by 1 + 4 = 5 power stations.
                 - City 1 is provided by 1 + 4 + 4 = 9 power stations.
                 - City 2 is provided by 4 + 4 + 5 = 13 power stations.
                 - City 3 is provided by 5 + 4 = 9 power stations.
                 - City 4 is provided by 5 + 0 = 5 power stations.
                 So the minimum power of a city is 5. Since it is not possible 
                 to obtain a larger power, we return 5.
    
    Example 2:
    Input: stations = [4,4,4,4], r = 0, k = 3
    Output: 4
    Explanation: It can be proved that we cannot make the minimum power of a 
                 city greater than 4.

    Constraints:
    * n == stations.length
    * 1 <= n <= 10^5
    * 0 <= stations[i] <= 10^5
    * 0 <= r <= n - 1
    * 0 <= k <= 10^9*/

    public long maxPower(int[] stations, int r, int k) {
        int n = stations.length; 
        long lo = 0, hi = k + Arrays.stream(stations).asLongStream().sum();
        while (lo < hi) {
            long mid = lo + (hi-lo+1)/2, prefix = 0; 
            int kk = k; 
            int[] ss = stations.clone(); 
            boolean ok = true; 
            for (int i = 0; i < n+r; ++i) {
                if (i < n) prefix += ss[i]; 
                if (i >= 2*r+1) prefix -= ss[i-2*r-1]; 
                if (i >= r && prefix < mid) {
                    if (kk < mid - prefix) {
                        ok = false; 
                        break; 
                    }
                    kk -= mid - prefix; 
                    if (i < n) ss[i] += mid - prefix; 
                    prefix = mid; 
                }
            }
            if (ok) lo = mid; 
            else hi = mid - 1; 
        }
        return lo; 
    }


    /*2529. Maximum Count of Positive Integer and Negative Integer (Easy)
    Given an array nums sorted in non-decreasing order, return the maximum 
    between the number of positive integers and the number of negative integers.
    In other words, if the number of positive integers in nums is pos and the 
    number of negative integers is neg, then return the maximum of pos and neg.
    Note that 0 is neither positive nor negative.

    Example 1:
    Input: nums = [-2,-1,-1,1,2,3]
    Output: 3
    Explanation: There are 3 positive integers and 3 negative integers. The 
                 maximum count among them is 3.
    
    Example 2:
    Input: nums = [-3,-2,-1,0,0,1,2]
    Output: 3
    Explanation: There are 2 positive integers and 3 negative integers. The 
                 maximum count among them is 3.
    
    Example 3:
    Input: nums = [5,20,66,1314]
    Output: 4
    Explanation: There are 4 positive integers and 0 negative integers. The 
                 maximum count among them is 4.

    Constraints:
    * 1 <= nums.length <= 2000
    * -2000 <= nums[i] <= 2000
    * nums is sorted in a non-decreasing order.

    private static int bisect_left(int[] nums, int target) {
        int lo = 0, hi = nums.length; 
        while (lo < hi) {
            int mid = lo + (hi - lo)/2; 
            if (nums[mid] < target) lo = mid+1; 
            else hi = mid; 
        }
        return lo; 
    }*/
    
    public int maximumCount(int[] nums) {
        int neg = bisect_left(nums, 0), pos = nums.length - bisect_left(nums, 1); 
        return Math.max(neg, pos); 
    }


    /*2530. Maximal Score After Applying K Operations (Medium)
    You are given a 0-indexed integer array nums and an integer k. You have a 
    starting score of 0. In one operation:
    * choose an index i such that 0 <= i < nums.length,
    * increase your score by nums[i], and
    * replace nums[i] with ceil(nums[i] / 3).
    Return the maximum possible score you can attain after applying exactly k 
    operations. The ceiling function ceil(val) is the least integer greater 
    than or equal to val.

    Example 1:
    Input: nums = [10,10,10,10,10], k = 5
    Output: 50
    Explanation: Apply the operation to each array element exactly once. The 
                 final score is 10 + 10 + 10 + 10 + 10 = 50.
    
    Example 2:
    Input: nums = [1,10,3,3,3], k = 3
    Output: 17
    Explanation: You can do the following operations:
                 Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your 
                              score increases by 10.
                 Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your 
                              score increases by 4.
                 Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your 
                              score increases by 3.
                 The final score is 10 + 4 + 3 = 17.

    Constraints:
    * 1 <= nums.length, k <= 10^5
    * 1 <= nums[i] <= 10^9*/

    public long maxKelements(int[] nums, int k) {
        long ans = 0; 
        PriorityQueue<Integer> pq = new PriorityQueue(Collections.reverseOrder()); 
        for (int x : nums) pq.add(x); 
        while (k-- > 0) {
            int val = pq.poll(); 
            ans += val; 
            pq.add((val+2)/3); 
        }
        return ans; 
    }


    /*2531. Make Number of Distinct Characters Equal (Medium)
    You are given two 0-indexed strings word1 and word2. A move consists of 
    choosing two indices i and j such that 0 <= i < word1.length and 
    0 <= j < word2.length and swapping word1[i] with word2[j]. Return true if 
    it is possible to get the number of distinct characters in word1 and word2 
    to be equal with exactly one move. Return false otherwise.

    Example 1:
    Input: word1 = "ac", word2 = "b"
    Output: false
    Explanation: Any pair of swaps would yield two distinct characters in the 
                 first string, and one in the second string.
    
    Example 2:
    Input: word1 = "abcc", word2 = "aab"
    Output: true
    Explanation: We swap index 2 of the first string with index 0 of the second 
                 string. The resulting strings are word1 = "abac" and 
                 word2 = "cab", which both have 3 distinct characters.
    
    Example 3:
    Input: word1 = "abcde", word2 = "fghij"
    Output: true
    Explanation: Both resulting strings will have 5 distinct characters, 
                 regardless of which indices we swap.

    Constraints:
    * 1 <= word1.length, word2.length <= 10^5
    * word1 and word2 consist of only lowercase English letters.*/

    public boolean isItPossible(String word1, String word2) {
        HashMap<Character, Integer> freq1 = new HashMap(), freq2 = new HashMap(); 
        for (var ch : word1.toCharArray()) freq1.merge(ch, 1, Integer::sum); 
        for (var ch : word2.toCharArray()) freq2.merge(ch, 1, Integer::sum); 
        int sz1 = freq1.size(), sz2 = freq2.size(); 
        for (char c1 = 'a'; c1 <= 'z'; ++c1) 
            for (char c2 = 'a'; c2 <= 'z'; ++c2) 
                if (freq1.getOrDefault(c1, 0) > 0 && freq2.getOrDefault(c2, 0) > 0) 
                    if (c1 == c2) {
                        if (sz1 == sz2) return true; 
                    } else {
                        int cnt1 = sz1, cnt2 = sz2; 
                        if (freq1.getOrDefault(c1, 0) == 1) --cnt1; 
                        if (freq1.getOrDefault(c2, 0) == 0) ++cnt1; 
                        if (freq2.getOrDefault(c1, 0) == 0) ++cnt2; 
                        if (freq2.getOrDefault(c2, 0) == 1) --cnt2; 
                        if (cnt1 == cnt2) return true; 
                    }
        return false; 
    }


    /*2532. Time to Cross a Bridge (Hard)
    There are k workers who want to move n boxes from an old warehouse to a new 
    one. You are given the two integers n and k, and a 2D integer array time of 
    size k x 4 where time[i] = [leftToRighti, pickOldi, rightToLefti, putNewi].
    The warehouses are separated by a river and connected by a bridge. The old 
    warehouse is on the right bank of the river, and the new warehouse is on 
    the left bank of the river. Initially, all k workers are waiting on the 
    left side of the bridge. To move the boxes, the ith worker (0-indexed) can :
    * Cross the bridge from the left bank (new warehouse) to the right bank 
      (old warehouse) in leftToRighti minutes.
    * Pick a box from the old warehouse and return to the bridge in pickOldi 
      minutes. Different workers can pick up their boxes simultaneously.
    * Cross the bridge from the right bank (old warehouse) to the left bank 
      (new warehouse) in rightToLefti minutes.
    * Put the box in the new warehouse and return to the bridge in putNewi 
      minutes. Different workers can put their boxes simultaneously.
    A worker i is less efficient than a worker j if either condition is met:
    * leftToRighti + rightToLefti > leftToRightj + rightToLeftj
    * leftToRighti + rightToLefti == leftToRightj + rightToLeftj and i > j
    The following rules regulate the movement of the workers through the bridge :
    * If a worker x reaches the bridge while another worker y is crossing the 
      bridge, x waits at their side of the bridge.
    * If the bridge is free, the worker waiting on the right side of the bridge 
      gets to cross the bridge. If more than one worker is waiting on the right 
      side, the one with the lowest efficiency crosses first.
    * If the bridge is free and no worker is waiting on the right side, and at 
      least one box remains at the old warehouse, the worker on the left side 
      of the river gets to cross the bridge. If more than one worker is waiting 
      on the left side, the one with the lowest efficiency crosses first.
    Return the instance of time at which the last worker reaches the left bank 
    of the river after all n boxes have been put in the new warehouse.

    Example 1:
    Input: n = 1, k = 3, time = [[1,1,2,1],[1,1,3,1],[1,1,4,1]]
    Output: 6
    Explanation: From 0 to 1: worker 2 crosses the bridge from the left bank to 
                              the right bank.
                 From 1 to 2: worker 2 picks up a box from the old warehouse.
                 From 2 to 6: worker 2 crosses the bridge from the right bank 
                              to the left bank.
                 From 6 to 7: worker 2 puts a box at the new warehouse.
                 The whole process ends after 7 minutes. We return 6 because 
                 the problem asks for the instance of time at which the last 
                 worker reaches the left bank.
    
    Example 2:
    Input: n = 3, k = 2, time = [[1,9,1,8],[10,10,10,10]]
    Output: 50
    Explanation: From 0  to 10: worker 1 crosses the bridge from the left bank 
                                to the right bank.
                 From 10 to 20: worker 1 picks up a box from the old warehouse.
                 From 10 to 11: worker 0 crosses the bridge from the left bank 
                                to the right bank.
                 From 11 to 20: worker 0 picks up a box from the old warehouse.
                 From 20 to 30: worker 1 crosses the bridge from the right bank 
                                to the left bank.
                 From 30 to 40: worker 1 puts a box at the new warehouse.
                 From 30 to 31: worker 0 crosses the bridge from the right bank 
                                to the left bank.
                 From 31 to 39: worker 0 puts a box at the new warehouse.
                 From 39 to 40: worker 0 crosses the bridge from the left bank 
                                to the right bank.
                 From 40 to 49: worker 0 picks up a box from the old warehouse.
                 From 49 to 50: worker 0 crosses the bridge from the right bank 
                                to the left bank.
                 From 50 to 58: worker 0 puts a box at the new warehouse.
                 The whole process ends after 58 minutes. We return 50 because 
                 the problem asks for the instance of time at which the last 
                 worker reaches the left bank.

    Constraints:
    * 1 <= n, k <= 10^4
    * time.length == k
    * time[i].length == 4
    * 1 <= leftToRighti, pickOldi, rightToLefti, putNewi <= 1000*/

    public int findCrossingTime(int n, int k, int[][] time) {
        int ans = 0, free = 0; 
        PriorityQueue<int[]> l = new PriorityQueue<>((a, b)->(a[0]-b[0])); 
        PriorityQueue<int[]> r = new PriorityQueue<>((a, b)->(a[0]-b[0])); 
        PriorityQueue<int[]> ll = new PriorityQueue<>((a, b)->(a[0] != b[0] ? b[0]-a[0] : b[1]-a[1]));
        PriorityQueue<int[]> rr = new PriorityQueue<>((a, b)->(a[0] != b[0] ? b[0]-a[0] : b[1]-a[1])); 
        for (int i = 0; i < time.length; ++i) 
            ll.add(new int[]{time[i][0]+time[i][2], i}); 
        while (n > 0 || r.size() > 0 || rr.size() > 0) {
            if (rr.isEmpty() && (r.isEmpty() || r.peek()[0] > free) && (n == 0 || ll.isEmpty() && (l.isEmpty() || l.peek()[0] > free))) {
                int cand = Integer.MAX_VALUE; 
                if (n > 0 && l.size() > 0) cand = Math.min(cand, l.peek()[0]); 
                if (r.size() > 0) cand = Math.min(cand, r.peek()[0]); 
                free = cand; 
            }
            while (l.size() > 0 && l.peek()[0] <= free) {
                int i = l.poll()[1]; 
                ll.add(new int[] {time[i][0] + time[i][2], i}); 
            }
            while (r.size() > 0 && r.peek()[0] <= free) {
                int i = r.poll()[1]; 
                rr.add(new int[] {time[i][0] + time[i][2], i}); 
            }
            if (rr.size() > 0) {
                int i = rr.poll()[1]; 
                free += time[i][2]; 
                if (n > 0) l.add(new int[] {free+time[i][3], i}); 
                else ans = Math.max(ans, free); 
            } else {
                int i = ll.poll()[1]; 
                free += time[i][0]; 
                r.add(new int[] {free+time[i][1], i}); 
                --n; 
            }
        }
        return ans; 
    }


    /*2533. Number of Good Binary Strings (Medium)
    You are given four integers minLenght, maxLength, oneGroup and zeroGroup. A 
    binary string is good if it satisfies the following conditions:
    * The length of the string is in the range [minLength, maxLength].
    * The size of each block of consecutive 1's is a multiple of oneGroup.
      + For example in a binary string 00110111100 sizes of each block of 
        consecutive ones are [2,4].
    * The size of each block of consecutive 0's is a multiple of zeroGroup.
      + For example, in a binary string 00110111100 sizes of each block of 
        consecutive ones are [2,1,2].
    Return the number of good binary strings. Since the answer may be too large, 
    return it modulo 10^9 + 7. Note that 0 is considered a multiple of all the 
    numbers.

    Example 1:
    Input: minLength = 2, maxLength = 3, oneGroup = 1, zeroGroup = 2
    Output: 5
    Explanation: There are 5 good binary strings in this example: "00", "11", 
                 "001", "100", and "111". It can be proven that there are only 
                 5 good strings satisfying all conditions.
    
    Example 2:
    Input: minLength = 4, maxLength = 4, oneGroup = 4, zeroGroup = 3
    Output: 1
    Explanation: There is only 1 good binary string in this example: "1111". It 
                 can be proven that there is only 1 good string satisfying all 
                 conditions.

    Constraints:
    * 1 <= minLength <= maxLength <= 10^5
    * 1 <= oneGroup, zeroGroup <= maxLength*/

    public int goodBinaryStrings(int minLength, int maxLength, int oneGroup, int zeroGroup) {
        long[] dp = new long[maxLength+1]; 
        for (int i = maxLength; i >= 0; --i) {
            if (minLength <= i) ++dp[i]; 
            if (i + oneGroup <= maxLength) dp[i] = (dp[i] + dp[i+oneGroup]) % 1_000_000_007; 
            if (i + zeroGroup <= maxLength) dp[i] = (dp[i] + dp[i+zeroGroup]) % 1_000_000_007; 
        }
        return (int) dp[0]; 
    }


    /*2534. Time Taken to Cross the Door (Hard)
    There are n persons numbered from 0 to n - 1 and a door. Each person can 
    enter or exit through the door once, taking one second. You are given a 
    non-decreasing integer array arrival of size n, where arrival[i] is the 
    arrival time of the ith person at the door. You are also given an array 
    state of size n, where state[i] is 0 if person i wants to enter through the 
    door or 1 if they want to exit through the door. If two or more persons 
    want to use the door at the same time, they follow the following rules:
    * If the door was not used in the previous second, then the person who 
      wants to exit goes first.
    * If the door was used in the previous second for entering, the person who 
      wants to enter goes first.
    * If the door was used in the previous second for exiting, the person who 
      wants to exit goes first.
    * If multiple persons want to go in the same direction, the person with the 
      smallest index goes first.
    Return an array answer of size n where answer[i] is the second at which the 
    ith person crosses the door.

    Note that:
    * Only one person can cross the door at each second.
    * A person may arrive at the door and wait without entering or exiting to 
      follow the mentioned rules.

    Example 1:
    Input: arrival = [0,1,1,2,4], state = [0,1,0,0,1]
    Output: [0,3,1,2,4]
    Explanation: At each second we have the following:
                 - At t = 0: Person 0 is the only one who wants to enter, so 
                             they just enter through the door.
                 - At t = 1: Person 1 wants to exit, and person 2 wants to 
                             enter. Since the door was used the previous second 
                             for entering, person 2 enters.
                 - At t = 2: Person 1 still wants to exit, and person 3 wants 
                             to enter. Since the door was used the previous 
                             second for entering, person 3 enters.
                 - At t = 3: Person 1 is the only one who wants to exit, so 
                             they just exit through the door.
                 - At t = 4: Person 4 is the only one who wants to exit, so 
                             they just exit through the door.
    
    Example 2:
    Input: arrival = [0,0,0], state = [1,0,1]
    Output: [0,2,1]
    Explanation: At each second we have the following:
                 - At t = 0: Person 1 wants to enter while persons 0 and 2 want 
                             to exit. Since the door was not used in the 
                             previous second, the persons who want to exit get 
                             to go first. Since person 0 has a smaller index, 
                             they exit first.
                 - At t = 1: Person 1 wants to enter, and person 2 wants to 
                             exit. Since the door was used in the previous 
                             second for exiting, person 2 exits.
                 - At t = 2: Person 1 is the only one who wants to enter, so 
                             they just enter through the door.

    Constraints:
    * n == arrival.length == state.length
    * 1 <= n <= 10^5
    * 0 <= arrival[i] <= n
    * arrival is sorted in non-decreasing order.
    * state[i] is either 0 or 1.*/

    public int[] timeTaken(int[] arrival, int[] state) {
        int n = arrival.length; 
        int[] ans = new int[n]; 
        Deque<Integer> qin = new ArrayDeque<>(), qout = new ArrayDeque<>(); 
        boolean enter = false; 
        for (int i = 0, time = 0; i < n || !qin.isEmpty() || !qout.isEmpty(); ) {
            if (i == n || time < arrival[i]) {
                if (!qin.isEmpty() || !qout.isEmpty()) {
                    if (!qin.isEmpty() && (qout.isEmpty() || enter)) {
                        ans[qin.pollFirst()] = time++; 
                        enter = true; 
                    } else {
                        ans[qout.pollFirst()] = time++; 
                        enter = false; 
                    }
                } else {
                    if (time+1 <= arrival[i]) enter = false; 
                    time = arrival[i]; 
                }
            }
            for (; i < n && time == arrival[i]; ++i) {
                if (state[i] == 0) qin.addLast(i); 
                else qout.addLast(i); 
            }
        }
        return ans; 
    }


    /*2535. Difference Between Element Sum and Digit Sum of an Array (Easy)
    You are given a positive integer array nums. 
    * The element sum is the sum of all the elements in nums.
    * The digit sum is the sum of all the digits (not necessarily distinct) 
      that appear in nums.
    Return the absolute difference between the element sum and digit sum of 
    nums. Note that the absolute difference between two integers x and y is 
    defined as |x - y|.

    Example 1:
    Input: nums = [1,15,6,3]
    Output: 9
    Explanation: The element sum of nums is 1 + 15 + 6 + 3 = 25. The digit sum 
                 of nums is 1 + 1 + 5 + 6 + 3 = 16. The absolute difference 
                 between the element sum and digit sum is |25 - 16| = 9.
    
    Example 2:
    Input: nums = [1,2,3,4]
    Output: 0
    Explanation: The element sum of nums is 1 + 2 + 3 + 4 = 10. The digit sum 
                 of nums is 1 + 2 + 3 + 4 = 10. The absolute difference between 
                 the element sum and digit sum is |10 - 10| = 0.

    Constraints:
    * 1 <= nums.length <= 2000
    * 1 <= nums[i] <= 2000*/

    public int differenceOfSum(int[] nums) {
        int ans = 0; 
        for (int x : nums) {
            ans += x; 
            for (; x > 0; x /= 10) 
                ans -= x % 10; 
        }
        return ans; 
    }


    /*2536. Increment Submatrices by One (Medium)
    You are given a positive integer n, indicating that we initially have an 
    n x n 0-indexed integer matrix mat filled with zeroes. You are also given a 
    2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], 
    you should do the following operation:
    * Add 1 to every element in the submatrix with the top left corner 
      (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 
      to mat[x][y] for for all row1i <= x <= row2i and col1i <= y <= col2i.
    Return the matrix mat after performing every query.

    Example 1:
    Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
    Output: [[1,1,0],[1,2,1],[0,1,1]]
    Explanation: The diagram above shows the initial matrix, the matrix after 
                 the first query, and the matrix after the second query.
                 - In the first query, we add 1 to every element in the 
                   submatrix with the top left corner (1, 1) and bottom right 
                   corner (2, 2).
                 - In the second query, we add 1 to every element in the 
                   submatrix with the top left corner (0, 0) and bottom right 
                   corner (1, 1).
    
    Example 2:
    Input: n = 2, queries = [[0,0,1,1]]
    Output: [[1,1],[1,1]]
    Explanation: The diagram above shows the initial matrix and the matrix 
                 after the first query.
                 - In the first query we add 1 to every element in the matrix.

    Constraints:
    * 1 <= n <= 500
    * 1 <= queries.length <= 10^4
    * 0 <= row1i <= row2i < n
    * 0 <= col1i <= col2i < n*/

    public int[][] rangeAddQueries(int n, int[][] queries) {
        int[][] ans = new int[n][n]; 
        for (int[] q : queries) {
            int i = q[0], j = q[1], ii = q[2], jj = q[3]; 
            ++ans[i][j]; 
            if (ii+1 < n) --ans[ii+1][j]; 
            if (jj+1 < n) --ans[i][jj+1]; 
            if (ii+1 < n && jj+1 < n) ++ans[ii+1][jj+1]; 
        }
        for (int i = 0; i < n; ++i) {
            int prefix = 0; 
            for (int j = 0; j < n; ++j) {
                prefix += ans[i][j]; 
                ans[i][j] = prefix; 
                if (i > 0) ans[i][j] += ans[i-1][j]; 
            }
        }
        return ans; 
    }


    /*2537. Count the Number of Good Subarrays (Medium)
    Given an integer array nums and an integer k, return the number of good 
    subarrays of nums. A subarray arr is good if it there are at least k pairs 
    of indices (i, j) such that i < j and arr[i] == arr[j]. A subarray is a 
    contiguous non-empty sequence of elements within an array.

    Example 1:
    Input: nums = [1,1,1,1,1], k = 10
    Output: 1
    Explanation: The only good subarray is the array nums itself.

    Example 2:
    Input: nums = [3,1,4,3,2,2,4], k = 2
    Output: 4
    Explanation: There are 4 different good subarrays:
                 - [3,1,4,3,2,2] that has 2 pairs.
                 - [3,1,4,3,2,2,4] that has 3 pairs.
                 - [1,4,3,2,2,4] that has 2 pairs.
                 - [4,3,2,2,4] that has 2 pairs.

    Constraints:
    * 1 <= nums.length <= 10^5
    * 1 <= nums[i], k <= 10^9*/

    public long countGood(int[] nums, int k) {
        HashMap<Integer, Integer> freq = new HashMap<>(); 
        long ans = 0; 
        for (int i = 0, ii = 0; i < nums.length; ++i) {
            k -= freq.getOrDefault(nums[i], 0); 
            freq.put(nums[i], freq.getOrDefault(nums[i], 0)+1); 
            for (; k <= 0; ++ii) {
                freq.put(nums[ii], freq.get(nums[ii])-1); 
                k += freq.get(nums[ii]); 
            }
            ans += ii; 
        }
        return ans; 
    }


    /*2538. Difference Between Maximum and Minimum Price Sum (Hard)
    There exists an undirected and initially unrooted tree with n nodes indexed 
    from 0 to n - 1. You are given the integer n and a 2D integer array edges 
    of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge 
    between nodes ai and bi in the tree. Each node has an associated price. You 
    are given an integer array price, where price[i] is the price of the ith 
    node. The price sum of a given path is the sum of the prices of all nodes 
    lying on that path. The tree can be rooted at any node root of your choice. 
    The incurred cost after choosing root is the difference between the maximum 
    and minimum price sum amongst all paths starting at root. Return the 
    maximum possible cost amongst all possible root choices.

    Example 1:
    Input: n = 6, edges = [[0,1],[1,2],[1,3],[3,4],[3,5]], price = [9,8,7,6,10,5]
    Output: 24
    Explanation: The diagram above denotes the tree after rooting it at node 2. 
                 The first part (colored in red) shows the path with the 
                 maximum price sum. The second part (colored in blue) shows the 
                 path with the minimum price sum.
                 - The first path contains nodes [2,1,3,4]: the prices are 
                   [7,8,6,10], and the sum of the prices is 31.
                 - The second path contains the node [2] with the price [7].
                 The difference between the maximum and minimum price sum is 24. 
                 It can be proved that 24 is the maximum cost.
    
    Example 2:
    Input: n = 3, edges = [[0,1],[1,2]], price = [1,1,1]
    Output: 2
    Explanation: The diagram above denotes the tree after rooting it at node 0. 
                 The first part (colored in red) shows the path with the 
                 maximum price sum. The second part (colored in blue) shows the 
                 path with the minimum price sum.
                 - The first path contains nodes [0,1,2]: the prices are 
                   [1,1,1], and the sum of the prices is 3.
                 - The second path contains node [0] with a price [1].
                 The difference between the maximum and minimum price sum is 2. 
                 It can be proved that 2 is the maximum cost.

    Constraints:
    * 1 <= n <= 10^5
    * edges.length == n - 1
    * 0 <= ai, bi <= n - 1
    * edges represents a valid tree.
    * price.length == n
    * 1 <= price[i] <= 10^5*/

    long ans = 0; 
    
    private long[] dfs(int u, int p, List<Integer>[] tree, int[] price) {
        long x = price[u], y = 0; 
        for (var v : tree[u]) {
            if (v != p) {
                var elem = dfs(v, u, tree, price); 
                long xx = elem[0], yy = elem[1]; 
                ans = Math.max(ans, x + yy); 
                ans = Math.max(ans, xx + y); 
                x = Math.max(x, xx + price[u]); 
                y = Math.max(y, yy + price[u]); 
            }
        }
        return new long[]{x, y}; 
    }
    
    public long maxOutput(int n, int[][] edges, int[] price) {
        List<Integer>[] tree = new ArrayList[n]; 
        for (int u = 0; u < n; ++u) tree[u] = new ArrayList(); 
        for (var e : edges) {
            tree[e[0]].add(e[1]); 
            tree[e[1]].add(e[0]); 
        }
        dfs(0, -1, tree, price); 
        return ans; 
    }


    /*2539. Count the Number of Good Subsequences (Medium)
    A subsequence of a string is good if it is not empty and the frequency of 
    each one of its characters is the same. Given a string s, return the number 
    of good subsequences of s. Since the answer may be too large, return it 
    modulo 10^9 + 7. A subsequence is a string that can be derived from another 
    string by deleting some or no characters without changing the order of the 
    remaining characters.

    Example 1:
    Input: s = "aabb"
    Output: 11
    Explanation: The total number of subsequences is 24. There are five 
                 subsequences which are not good: "aabb", "aabb", "aabb", 
                 "aabb", and the empty subsequence. Hence, the number of good 
                 subsequences is 24-5 = 11.
    
    Example 2:
    Input: s = "leet"
    Output: 12
    Explanation: There are four subsequences which are not good: "leet", "leet", 
                 "leet", and the empty subsequence. Hence, the number of good 
                 subsequences is 24-4 = 12.
    
    Example 3:
    Input: s = "abcd"
    Output: 15
    Explanation: All of the non-empty subsequences are good subsequences. 
                 Hence, the number of good subsequences is 24-1 = 15.

    Constraints:
    * 1 <= s.length <= 10^4
    * s consists of only lowercase English letters.*/

    public int countGoodSubsequences(String s) {
        final int mod = 1_000_000_007; 
        int[] freq = new int[26]; 
        for (var ch : s.toCharArray()) ++freq[ch-'a']; 
        long[] coef = new long[26], inv = new long[s.length()+1]; 
        Arrays.fill(coef, 1); 
        inv[0] = inv[1] = 1; 
        long ans = 0; 
        for (int x = 1; x <= s.length(); ++x) {
            long val = 1; 
            if (x >= 2) inv[x] = mod - mod/x * inv[mod%x] % mod; 
            for (int i = 0; i < 26; ++i) {
                coef[i] = coef[i] * (freq[i]-x+1) % mod; 
                coef[i] = coef[i] * inv[x] % mod; 
                val = val * (1+coef[i]) % mod; 
            }
            ans = (ans + val - 1) % mod; 
        }
        return (int) ans; 
    }


    /*2540. Minimum Common Value (Easy)
    Given two integer arrays nums1 and nums2, sorted in non-decreasing order, 
    return the minimum integer common to both arrays. If there is no common 
    integer amongst nums1 and nums2, return -1. Note that an integer is said 
    to be common to nums1 and nums2 if both arrays have at least one 
    occurrence of that integer.

    Example 1:
    Input: nums1 = [1,2,3], nums2 = [2,4]
    Output: 2
    Explanation: The smallest element common to both arrays is 2, so we return 
                 2.

    Example 2:
    Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
    Output: 2
    Explanation: There are two common elements in the array 2 and 3 out of 
                 which 2 is the smallest, so 2 is returned.

    Constraints:
    * 1 <= nums1.length, nums2.length <= 10^5
    * 1 <= nums1[i], nums2[j] <= 10^9
    * Both nums1 and nums2 are sorted in non-decreasing order.*/

    public int getCommon(int[] nums1, int[] nums2) {
        for (int i = 0, ii = 0; i < nums1.length && ii < nums2.length; ) {
            if (nums1[i] < nums2[ii]) ++i;
            else if (nums1[i] == nums2[ii]) return nums1[i]; 
            else ++ii; 
        }
        return -1; 
    }


    /*2541. Minimum Operations to Make Array Equal II (Medium)
    You are given two integer arrays nums1 and nums2 of equal length n and an 
    integer k. You can perform the following operation on nums1:
    * Choose two indexes i and j and increment nums1[i] by k and decrement 
      nums1[j] by k. In other words, nums1[i] = nums1[i] + k and 
      nums1[j] = nums1[j] - k.
    nums1 is said to be equal to nums2 if for all indices i such that 
    0 <= i < n, nums1[i] == nums2[i]. Return the minimum number of operations 
    required to make nums1 equal to nums2. If it is impossible to make them 
    equal, return -1.

    Example 1:
    Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
    Output: 2
    Explanation: In 2 operations, we can transform nums1 to nums2. 1st 
                 operation: i = 2, j = 0. After applying the operation, 
                 nums1 = [1,3,4,4]. 2nd operation: i = 2, j = 3. After applying 
                 the operation, nums1 = [1,3,7,1]. One can prove that it is 
                 impossible to make arrays equal in fewer operations.
    
    Example 2:
    Input: nums1 = [3,8,5,2], nums2 = [2,4,1,6], k = 1
    Output: -1
    Explanation: It can be proved that it is impossible to make the two arrays 
                 equal.

    Constraints:
    * n == nums1.length == nums2.length
    * 2 <= n <= 10^5
    * 0 <= nums1[i], nums2[j] <= 10^9
    * 0 <= k <= 10^5*/

    public long minOperations(int[] nums1, int[] nums2, int k) {
        long ans = 0, total = 0; 
        for (int i = 0; i < nums1.length; ++i) {
            int diff = nums1[i] - nums2[i]; 
            if (k == 0 && diff > 0 || k > 0 && diff % k != 0) return -1; 
            if (k > 0) ans += Math.abs(diff) / k; 
            total += diff; 
        }
        return total == 0 ? ans/2 : -1; 
    }


    /*2542. Maximum Subsequence Score (Medium)
    You are given two 0-indexed integer arrays nums1 and nums2 of equal length 
    n and a positive integer k. You must choose a subsequence of indices from 
    nums1 of length k. For chosen indices i0, i1, ..., ik - 1, your score is 
    defined as:
    * The sum of the selected elements from nums1 multiplied with the minimum 
      of the selected elements from nums2.
    * It can defined simply as: 
      (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
    Return the maximum possible score. A subsequence of indices of an array is 
    a set that can be derived from the set {0, 1, ..., n-1} by deleting some or 
    no elements.

    Example 1:
    Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
    Output: 12
    Explanation: The four possible subsequence scores are:
                 - We choose the indices 0, 1, and 2 with 
                   score = (1+3+3) * min(2,1,3) = 7.
                 - We choose the indices 0, 1, and 3 with 
                   score = (1+3+2) * min(2,1,4) = 6. 
                 - We choose the indices 0, 2, and 3 with 
                   score = (1+3+2) * min(2,3,4) = 12. 
                 - We choose the indices 1, 2, and 3 with 
                   score = (3+3+2) * min(1,3,4) = 8.
                 Therefore, we return the max score, which is 12.
    
    Example 2:
    Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
    Output: 30
    Explanation: Choosing index 2 is optimal: 
                 nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible 
                 score.

    Constraints:
    * n == nums1.length == nums2.length
    * 1 <= n <= 10^5
    * 0 <= nums1[i], nums2[j] <= 10^5
    * 1 <= k <= n*/

    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length; 
        int[][] aug = new int[n][2]; 
        for (int i = 0; i < n; ++i) {
            aug[i][0] = nums1[i]; 
            aug[i][1] = nums2[i]; 
        }
        Arrays.sort(aug, new Comparator<int[]>(){
            public int compare(int[] lhs, int[] rhs) {
                return -Integer.compare(lhs[1], rhs[1]); 
            }
        }); 
        PriorityQueue<Integer> pq = new PriorityQueue(); 
        long ans = 0, total = 0; 
        for (int i = 0; i < aug.length; ++i) {
            total += aug[i][0]; 
            pq.add(aug[i][0]); 
            if (i >= k) total -= pq.poll(); 
            if (i >= k-1) ans = Math.max(ans, total * aug[i][1]); 
        }
        return ans; 
    }


    /*2543. Check if Point Is Reachable (Hard)
    There exists an infinitely large grid. You are currently at point (1, 1), 
    and you need to reach the point (targetX, targetY) using a finite number of 
    steps. In one step, you can move from point (x, y) to any one of the 
    following points: (x, y - x)
                      (x - y, y)
                      (2 * x, y)
                      (x, 2 * y)
    Given two integers targetX and targetY representing the X-coordinate and Y-
    coordinate of your final position, return true if you can reach the point 
    from (1, 1) using some number of steps, and false otherwise.

    Example 1:
    Input: targetX = 6, targetY = 9
    Output: false
    Explanation: It is impossible to reach (6,9) from (1,1) using any sequence 
                 of moves, so false is returned.
    
    Example 2:
    Input: targetX = 4, targetY = 7
    Output: true
    Explanation: You can follow the path (1,1) -> (1,2) -> (1,4) -> (1,8) -> 
                 (1,7) -> (2,7) -> (4,7).

    Constraints: 1 <= targetX, targetY <= 10^9*/

    public boolean isReachable(int targetX, int targetY) {
        int g = BigInteger.valueOf(targetX).gcd(BigInteger.valueOf(targetY)).intValue();
        return (g & (g-1)) == 0; 
    }


    /*2544. Alternating Digit Sum (Easy)
    You are given a positive integer n. Each digit of n has a sign according to 
    the following rules:
    * The most significant digit is assigned a positive sign.
    * Each other digit has an opposite sign to its adjacent digits.
    Return the sum of all digits with their corresponding sign.

    Example 1:
    Input: n = 521
    Output: 4
    Explanation: (+5) + (-2) + (+1) = 4.

    Example 2:
    Input: n = 111
    Output: 1
    Explanation: (+1) + (-1) + (+1) = 1.

    Example 3:
    Input: n = 886996
    Output: 0
    Explanation: (+8) + (-8) + (+6) + (-9) + (+9) + (-6) = 0.

    Constraints: 1 <= n <= 10^9*/

    public int alternateDigitSum(int n) {
        int ans = 0, sign = 1; 
        for (; n > 0; n /= 10) {
            sign *= -1; 
            ans += (n % 10) * sign; 
        }
        return ans * sign; 
    }


    /*2545. Sort the Students by Their Kth Score (Medium)
    There is a class with m students and n exams. You are given a 0-indexed 
    m x n integer matrix score, where each row represents one student and 
    score[i][j] denotes the score the ith student got in the jth exam. The 
    matrix score contains distinct integers only. You are also given an integer 
    k. Sort the students (i.e., the rows of the matrix) by their scores in the 
    kth (0-indexed) exam from the highest to the lowest. Return the matrix 
    after sorting it.

    Example 1:
    Input: score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
    Output: [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
    Explanation: In the above diagram, S denotes the student, while E denotes 
                 the exam.
                 - The student with index 1 scored 11 in exam 2, which is the 
                   highest score, so they got first place.
                 - The student with index 0 scored 9 in exam 2, which is the 
                   second highest score, so they got second place.
                 - The student with index 2 scored 3 in exam 2, which is the 
                   lowest score, so they got third place.
    
    Example 2:
    Input: score = [[3,4],[5,6]], k = 0
    Output: [[5,6],[3,4]]
    Explanation: In the above diagram, S denotes the student, while E denotes 
                 the exam.
                 - The student with index 1 scored 5 in exam 0, which is the 
                   highest score, so they got first place.
                 - The student with index 0 scored 3 in exam 0, which is the 
                   lowest score, so they got second place.

    Constraints:
    * m == score.length
    * n == score[i].length
    * 1 <= m, n <= 250
    * 1 <= score[i][j] <= 10^5
    * score consists of distinct integers.
    * 0 <= k < n*/

    public int[][] sortTheStudents(int[][] score, int k) {
        Arrays.sort(score, (a, b) -> (b[k] - a[k])); 
        return score; 
    }


    /*2546. Apply Bitwise Operations to Make Strings Equal (Medium)
    You are given two 0-indexed binary strings s and target of the same length 
    n. You can do the following operation on s any number of times:
    * Choose two different indices i and j where 0 <= i, j < n.
    * Simultaneously, replace s[i] with (s[i] OR s[j]) and s[j] with (s[i] XOR 
      s[j]).
    For example, if s = "0110", you can choose i = 0 and j = 2, then 
    simultaneously replace s[0] with (s[0] OR s[2] = 0 OR 1 = 1), and s[2] with 
    (s[0] XOR s[2] = 0 XOR 1 = 1), so we will have s = "1110". Return true if 
    you can make the string s equal to target, or false otherwise.

    Example 1:
    Input: s = "1010", target = "0110"
    Output: true
    Explanation: We can do the following operations:
                 - Choose i = 2 and j = 0. We have now s = "0010".
                 - Choose i = 2 and j = 1. We have now s = "0110".
                 Since we can make s equal to target, we return true.
    
    Example 2:
    Input: s = "11", target = "00"
    Output: false
    Explanation: It is not possible to make s equal to target with any number 
                 of operations.

    Constraints:
    * n == s.length == target.length
    * 2 <= n <= 10^5
    * s and target consist of only the digits 0 and 1.*/

    public boolean makeStringsEqual(String s, String target) {
        return s.contains("1") == target.contains("1"); 
    }


    /*2547. Minimum Cost to Split an Array (Hard)
    You are given an integer array nums and an integer k. Split the array into 
    some number of non-empty subarrays. The cost of a split is the sum of the 
    importance value of each subarray in the split. Let trimmed(subarray) be 
    the version of the subarray where all numbers which appear only once are 
    removed.
    * For example, trimmed([3,1,2,4,3,4]) = [3,4,3,4].
    The importance value of a subarray is k + trimmed(subarray).length.
    * For example, if a subarray is [1,2,3,3,3,4,4], then 
      trimmed([1,2,3,3,3,4,4]) = [3,3,3,4,4].The importance value of this 
      subarray will be k + 5.
    Return the minimum possible cost of a split of nums. A subarray is a 
    contiguous non-empty sequence of elements within an array.

    Example 1:
    Input: nums = [1,2,1,2,1,3,3], k = 2
    Output: 8
    Explanation: We split nums to have two subarrays: [1,2], [1,2,1,3,3].
                 The importance value of [1,2] is 2 + (0) = 2.
                 The importance value of [1,2,1,3,3] is 2 + (2 + 2) = 6.
                 The cost of the split is 2 + 6 = 8. It can be shown that this 
                 is the minimum possible cost among all the possible splits.
    
    Example 2:
    Input: nums = [1,2,1,2,1], k = 2
    Output: 6
    Explanation: We split nums to have two subarrays: [1,2], [1,2,1].
                 The importance value of [1,2] is 2 + (0) = 2.
                 The importance value of [1,2,1] is 2 + (2) = 4.
                 The cost of the split is 2 + 4 = 6. It can be shown that this 
                 is the minimum possible cost among all the possible splits.
    
    Example 3:
    Input: nums = [1,2,1,2,1], k = 5
    Output: 10
    Explanation: We split nums to have one subarray: [1,2,1,2,1].
                 The importance value of [1,2,1,2,1] is 5 + (3 + 2) = 10.
                 The cost of the split is 10. It can be shown that this is the 
                 minimum possible cost among all the possible splits.

    Constraints:
    * 1 <= nums.length <= 1000
    * 0 <= nums[i] < nums.length
    * 1 <= k <= 10^9*/

    public int minCost(int[] nums, int k) {
        int n = nums.length; 
        int[] dp = new int[n+1]; 
        Arrays.fill(dp, Integer.MAX_VALUE); 
        dp[n] = 0; 
        for (int i = n-1; i >= 0; --i) {
            int val = 0; 
            int[] freq = new int[n]; 
            for (int ii = i; ii < n; ++ii) {
                ++freq[nums[ii]]; 
                if (freq[nums[ii]] == 2) val += 2; 
                else if (freq[nums[ii]] > 2) ++val; 
                dp[i] = Math.min(dp[i], k + val + dp[ii+1]); 
            }
        }
        return dp[0]; 
    }


    /*2548. Maximum Price to Fill a Bag (Medium)
    You are given a 2D integer array items where items[i] = [pricei, weighti] 
    denotes the price and weight of the ith item, respectively. You are also 
    given a positive integer capacity. Each item can be divided into two items 
    with ratios part1 and part2, where part1 + part2 == 1.
    * The weight of the first item is weighti * part1 and the price of the 
      first item is pricei * part1.
    * Similarly, the weight of the second item is weighti * part2 and the price 
      of the second item is pricei * part2.
    Return the maximum total price to fill a bag of capacity capacity with 
    given items. If it is impossible to fill a bag return -1. Answers within 
    10^-5 of the actual answer will be considered accepted.

    Example 1:
    Input: items = [[50,1],[10,8]], capacity = 5
    Output: 55.00000
    Explanation: We divide the 2nd item into two parts with part1 = 0.5 and 
                 part2 = 0.5. The price and weight of the 1st item are 5, 4. 
                 And similarly, the price and the weight of the 2nd item are 
                 5, 4. The array items after operation becomes 
                 [[50,1],[5,4],[5,4]]. To fill a bag with capacity 5 we take 
                 the 1st element with a price of 50 and the 2nd element with a 
                 price of 5. It can be proved that 55.0 is the maximum total 
                 price that we can achieve.
    
    Example 2:
    Input: items = [[100,30]], capacity = 50
    Output: -1.00000
    Explanation: It is impossible to fill a bag with the given item.

    Constraints:
    * 1 <= items.length <= 10^5
    * items[i].length == 2
    * 1 <= pricei, weighti <= 10^4
    * 1 <= capacity <= 10^9*/

    public double maxPrice(int[][] items, int capacity) {
        double ans = 0; 
        Arrays.sort(items, (a, b) -> Double.compare((double) b[0]/b[1], (double) a[0]/a[1])); 
        for (var item : items) {
            double p = item[0]; 
            if (item[1] > capacity) p *= (double) capacity/item[1]; 
            ans += p; 
            capacity -= Math.min(item[1], capacity); 
            if (capacity == 0) break; 
        }
        return capacity == 0 ? ans : -1; 
    }


    /*2549. Count Distinct Numbers on Board (Easy)
    You are given a positive integer n, that is initially placed on a board. 
    Every day, for 109 days, you perform the following procedure:
    * For each number x present on the board, find all numbers 1 <= i <= n such 
      that x % i == 1.
    * Then, place those numbers on the board.
    Return the number of distinct integers present on the board after 10^9 days 
    have elapsed.

    Note:
    * Once a number is placed on the board, it will remain on it until the end.
    * % stands for the modulo operation. For example, 14 % 3 is 2.

    Example 1:
    Input: n = 5
    Output: 4
    Explanation: Initially, 5 is present on the board. The next day, 2 and 4 
                 will be added since 5 % 2 == 1 and 5 % 4 == 1. After that day, 
                 3 will be added to the board because 4 % 3 == 1. At the end of 
                 a billion days, the distinct numbers on the board will be 2, 3, 
                 4, and 5. 
    
    Example 2:
    Input: n = 3
    Output: 2
    Explanation: Since 3 % 2 == 1, 2 will be added to the board. After a 
                 billion days, the only two distinct numbers on the board are 2 
                 and 3. 

    Constraints: 1 <= n <= 100*/

    public int distinctIntegers(int n) {
        return n > 1 ? n-1 : 1; 
    }


    /*2550. Count Collisions of Monkeys on a Polygon (Medium)
    There is a regular convex polygon with n vertices. The vertices are labeled 
    from 0 to n - 1 in a clockwise direction, and each vertex has exactly one 
    monkey. The following figure shows a convex polygon of 6 vertices. Each 
    monkey moves simultaneously to a neighboring vertex. A neighboring vertex 
    for a vertex i can be:
    * the vertex (i + 1) % n in the clockwise direction, or
    * the vertex (i - 1 + n) % n in the counter-clockwise direction.
    A collision happens if at least two monkeys reside on the same vertex after 
    the movement. Return the number of ways the monkeys can move so that at 
    least one collision happens. Since the answer may be very large, return it 
    modulo 10^9 + 7. Note that each monkey can only move once.

    Example 1:
    Input: n = 3
    Output: 6
    Explanation: There are 8 total possible movements. Two ways such that they 
                 collide at some point are:
                 - Monkey 1 moves in a clockwise direction; monkey 2 moves in 
                   an anticlockwise direction; monkey 3 moves in a clockwise 
                   direction. Monkeys 1 and 2 collide.
                 - Monkey 1 moves in an anticlockwise direction; monkey 2 moves 
                   in an anticlockwise direction; monkey 3 moves in a clockwise 
                   direction. Monkeys 1 and 3 collide.
                 It can be shown 6 total movements result in a collision.
    
    Example 2:
    Input: n = 4
    Output: 14
    Explanation: It can be shown that there are 14 ways for the monkeys to 
                 collide.

    Constraints: 3 <= n <= 10^9*/

    private static long pow(long x, int p, int mod) {
        long ans = 1; 
        for (; p > 0; p >>= 1) {
            if (p % 2 == 1) ans = ans * x % mod; 
            x = x * x % mod; 
        }
        return ans;
    }
    
    public int monkeyMove(int n) {
        final int mod = 1_000_000_007; 
        return (int) (pow(2, n, mod) - 2 + mod) % mod; 
    }


    /*2551. Put Marbles in Bags (Hard)
    You have k bags. You are given a 0-indexed integer array weights where 
    weights[i] is the weight of the ith marble. You are also given the integer 
    k. Divide the marbles into the k bags according to the following rules:
    * No bag is empty.
    * If the ith marble and jth marble are in a bag, then all marbles with an 
      index between the ith and jth indices should also be in that same bag.
    * If a bag consists of all the marbles with an index from i to j 
      inclusively, then the cost of the bag is weights[i] + weights[j].
    The score after distributing the marbles is the sum of the costs of all the 
    k bags. Return the difference between the maximum and minimum scores among 
    marble distributions.

    Example 1:
    Input: weights = [1,3,5,1], k = 2
    Output: 4
    Explanation: The distribution [1],[3,5,1] results in the minimal score of 
                 (1+1) + (3+1) = 6. The distribution [1,3],[5,1], results in 
                 the maximal score of (1+3) + (5+1) = 10. Thus, we return their 
                 difference 10 - 6 = 4.
    
    Example 2:
    Input: weights = [1, 3], k = 2
    Output: 0
    Explanation: The only distribution possible is [1],[3]. Since both the 
                 maximal and minimal score are the same, we return 0.

    Constraints:
    * 1 <= k <= weights.length <= 10^5
    * 1 <= weights[i] <= 10^9*/

    public long putMarbles(int[] weight, int k) {
        if (k == 1) return 0;
        int n = weight.length; 
        int[] vals = new int[n-1]; 
        for (int i = 0; i < n-1; ++i) 
            vals[i] = weight[i] + weight[i+1]; 
        Arrays.sort(vals); 
        long diff = 0; 
        for (int i = 0; i < k-1; ++i) 
            diff += vals[n-2-i] - vals[i]; 
        return diff; 
    }


    /*2552. Count Increasing Quadruplets (Hard)
    Given a 0-indexed integer array nums of size n containing all numbers from 
    1 to n, return the number of increasing quadruplets. A quadruplet 
    (i, j, k, l) is increasing if:
    * 0 <= i < j < k < l < n, and
    * nums[i] < nums[k] < nums[j] < nums[l].

    Example 1:
    Input: nums = [1,3,2,4,5]
    Output: 2
    Explanation: - When i = 0, j = 1, k = 2, and l = 3, 
                   nums[i] < nums[k] < nums[j] < nums[l].
                 - When i = 0, j = 1, k = 2, and l = 4, 
                   nums[i] < nums[k] < nums[j] < nums[l]. 
                 There are no other quadruplets, so we return 2.
    
    Example 2:
    Input: nums = [1,2,3,4]
    Output: 0
    Explanation: There exists only one quadruplet with i = 0, j = 1, k = 2, 
                 l = 3, but since nums[j] < nums[k], we return 0.

    Constraints:
    * 4 <= nums.length <= 4000
    * 1 <= nums[i] <= nums.length
    * All the integers of nums are unique. nums is a permutation.*/

    public long countQuadruplets(int[] nums) {
        long ans = 0; 
        long[] dp = new long[nums.length]; 
        for (int j = 0; j < nums.length; ++j) {
            int prev = 0; 
            for (int i = 0; i < j; ++i) 
                if (nums[i] < nums[j]) {
                    ++prev; 
                    ans += dp[i]; 
                } else if (nums[i] > nums[j]) dp[i] += prev; 
        }
        return ans; 
    }
}


/*170. Two Sum III - Data structure design (Easy)
Design a data structure that accepts a stream of integers and checks if it has 
a pair of integers that sum up to a particular value. Implement the TwoSum 
class:
* TwoSum() Initializes the TwoSum object, with an empty array initially.
* void add(int number) Adds number to the data structure.
* boolean find(int value) Returns true if there exists any pair of numbers 
  whose sum is equal to value, otherwise, it returns false.

Example 1:
Input: ["TwoSum", "add", "add", "add", "find", "find"]
       [[], [1], [3], [5], [4], [7]]
Output: [null, null, null, null, true, false]
Explanation
TwoSum twoSum = new TwoSum();
twoSum.add(1);   // [] --> [1]
twoSum.add(3);   // [1] --> [1,3]
twoSum.add(5);   // [1,3] --> [1,3,5]
twoSum.find(4);  // 1 + 3 = 4, return true
twoSum.find(7);  // No two integers sum up to 7, return false

Constraints:
* -10^5 <= number <= 10^5
* -2^31 <= value <= 2^31 - 1
* At most 104 calls will be made to add and find.*/

class TwoSum {
    private HashMap<Integer, Integer> freq; 
    
    public TwoSum() {
        freq = new HashMap(); 
    }
    
    public void add(int number) {
        freq.merge(number, 1, Integer::sum); 
    }
    
    public boolean find(int value) {
        for (var k : freq.keySet()) 
            if (freq.containsKey(value - k) && (k != value - k || freq.get(k) > 1)) return true; 
        return false; 
    }
}


/*308. Range Sum Query 2D - Mutable (Hard)
Given a 2D matrix matrix, handle multiple queries of the following types:
* Update the value of a cell in matrix.
* Calculate the sum of the elements of matrix inside the rectangle defined by 
  its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:
* NumMatrix(int[][] matrix) Initializes the object with the integer matrix 
  matrix.
* void update(int row, int col, int val) Updates the value of matrix[row][col] 
  to be val.
* int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the 
  elements of matrix inside the rectangle defined by its upper left corner 
  (row1, col1) and lower right corner (row2, col2).

Example 1:
Input: ["NumMatrix", "sumRegion", "update", "sumRegion"]
       [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
Output: [null, 8, null, 10]
Explanation: 
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e. sum of the left red rectangle)
numMatrix.update(3, 2, 2);       // matrix changes from left image to right image
numMatrix.sumRegion(2, 1, 4, 3); // return 10 (i.e. sum of the right red rectangle)

Constraints:
* m == matrix.length
* n == matrix[i].length
* 1 <= m, n <= 200
* -1000 <= matrix[i][j] <= 1000
* 0 <= row < m
* 0 <= col < n
* -1000 <= val <= 1000
* 0 <= row1 <= row2 < m
* 0 <= col1 <= col2 < n
* At most 5000 calls will be made to sumRegion and update.*/

class Fenwick2D {
    private int m, n; 
    private int[][] nums; 
    
    public Fenwick2D(int m, int n) {
        this.m = m; 
        this.n = n; 
        nums = new int[m+1][n+1]; 
    }
    
    public int query(int i, int j) {
        int ans = 0; 
        for (++i, ++j; i > 0; i -= i & -i) 
            for (int jj = j; jj > 0; jj -= jj & -jj) 
                ans += nums[i][jj]; 
        return ans; 
    }
    
    public void add(int i, int j, int delta) {
        for (++i, ++j; i <= m; i += i & -i) 
            for (int jj = j; jj <= n; jj += jj & -jj) 
                nums[i][jj] += delta; 
    }
}


class NumMatrix {
    private int m, n; 
    private int[][] vals; 
    private Fenwick2D tree; 
    
    public NumMatrix(int[][] matrix) {
        m = matrix.length; 
        n = matrix[0].length; 
        vals = new int[m][n]; 
        tree = new Fenwick2D(m, n); 
        for (int i = 0; i < m; ++i) 
            for (int j = 0; j < n; ++j)
                update(i, j, matrix[i][j]); 
    }
    
    public void update(int row, int col, int val) {
        int delta = val - vals[row][col]; 
        vals[row][col] = val; 
        tree.add(row, col, delta); 
    }
    
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return tree.query(row2, col2) - tree.query(row2, col1-1) - tree.query(row1-1, col2) + tree.query(row1-1, col1-1); 
    }
}


/*2502. Design Memory Allocator (Medium)
You are given an integer n representing the size of a 0-indexed memory array. 
All memory units are initially free. You have a memory allocator with the 
following functionalities:
* Allocate a block of size consecutive free memory units and assign it the id 
  mID.
* Free all memory units with the given id mID.
Note that:
* Multiple blocks can be allocated to the same mID.
* You should free all the memory units with mID, even if they were allocated in 
  different blocks.
Implement the Allocator class:
* Allocator(int n) Initializes an Allocator object with a memory array of size 
  n.
* int allocate(int size, int mID) Find the leftmost block of size consecutive 
  free memory units and allocate it with the id mID. Return the block's first 
  index. If such a block does not exist, return -1.
* int free(int mID) Free all memory units with the id mID. Return the number of 
  memory units you have freed.

Example 1:
Input: ["Allocator", "allocate", "allocate", "allocate", "free", "allocate", "allocate", "allocate", "free", "allocate", "free"]
       [[10], [1, 1], [1, 2], [1, 3], [2], [3, 4], [1, 1], [1, 1], [1], [10, 2], [7]]
Output: [null, 0, 1, 2, 1, 3, 1, 6, 3, -1, 0]
Explanation: 
Allocator loc = new Allocator(10); // Initialize a memory array of size 10. All memory units are initially free.
loc.allocate(1, 1); // The leftmost block's first index is 0. The memory array becomes [1,_,_,_,_,_,_,_,_,_]. We return 0.
loc.allocate(1, 2); // The leftmost block's first index is 1. The memory array becomes [1,2,_,_,_,_,_,_,_,_]. We return 1.
loc.allocate(1, 3); // The leftmost block's first index is 2. The memory array becomes [1,2,3,_,_,_,_,_,_,_]. We return 2.
loc.free(2); // Free all memory units with mID 2. The memory array becomes [1,_, 3,_,_,_,_,_,_,_]. We return 1 since there is only 1 unit with mID 2.
loc.allocate(3, 4); // The leftmost block's first index is 3. The memory array becomes [1,_,3,4,4,4,_,_,_,_]. We return 3.
loc.allocate(1, 1); // The leftmost block's first index is 1. The memory array becomes [1,1,3,4,4,4,_,_,_,_]. We return 1.
loc.allocate(1, 1); // The leftmost block's first index is 6. The memory array becomes [1,1,3,4,4,4,1,_,_,_]. We return 6.
loc.free(1); // Free all memory units with mID 1. The memory array becomes [_,_,3,4,4,4,_,_,_,_]. We return 3 since there are 3 units with mID 1.
loc.allocate(10, 2); // We can not find any free block with 10 consecutive free memory units, so we return -1.
loc.free(7); // Free all memory units with mID 7. The memory array remains the same since there is no memory unit with mID 7. We return 0.

Constraints:
* 1 <= n, size, mID <= 1000
* At most 1000 calls will be made to allocate and free.*/

class Allocator {
    private int[] memory; 
    
    public Allocator(int n) {
        memory = new int[n]; 
    }
    
    public int allocate(int size, int mID) {
        int cnt = 0; 
        for (int i = 0; i < memory.length; ++i) {
            if (memory[i] == 0) {
                if (++cnt == size) {
                    for (int ii = i; ii >= i-size+1; --ii) 
                        memory[ii] = mID; 
                    return i-size+1; 
                }
            } else cnt = 0; 
        }
        return -1; 
    }
    
    public int free(int mID) {
        int ans = 0; 
        for (int i = 0; i < memory.length; ++i) 
            if (memory[i] == mID) {
                ++ans; 
                memory[i] = 0; 
            }
        return ans; 
    }
}


/*2526. Find Consecutive Integers from a Data Stream (Medium)
For a stream of integers, implement a data structure that checks if the last k 
integers parsed in the stream are equal to value. Implement the DataStream 
class:
* DataStream(int value, int k) Initializes the object with an empty integer 
  stream and the two integers value and k.
* boolean consec(int num) Adds num to the stream of integers. Returns true if 
  the last k integers are equal to value, and false otherwise. If there are 
  less than k integers, the condition does not hold true, so returns false.

Example 1:
Input: ["DataStream", "consec", "consec", "consec", "consec"]
       [[4, 3], [4], [4], [4], [3]]
Output: [null, false, false, true, false]
Explanation: 
DataStream dataStream = new DataStream(4, 3); //value = 4, k = 3 
dataStream.consec(4); // Only 1 integer is parsed, so returns False. 
dataStream.consec(4); // Only 2 integers are parsed.
                      // Since 2 is less than k, returns False. 
dataStream.consec(4); // The 3 integers parsed are all equal to value, so returns True. 
dataStream.consec(3); // The last k integers parsed in the stream are [4,4,3].
                      // Since 3 is not equal to value, it returns False.
 
Constraints:
* 1 <= value, num <= 10^9
* 1 <= k <= 10^5
* At most 10^5 calls will be made to consec.*/

class DataStream {
    private int value = 0, k = 0, cnt = 0; 

    public DataStream(int value, int k) {
        this.value = value; 
        this.k = k; 
    }
    
    public boolean consec(int num) {
        if (value == num) ++cnt; 
        else cnt = 0; 
        return cnt >= k; 
    }
}