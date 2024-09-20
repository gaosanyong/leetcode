/*40. Combination Sum II (Medium)
Given a collection of candidate numbers (candidates) and a target number
(target), find all unique combinations in candidates where the candidate
numbers sum to target. Each number in candidates may only be used once in
the combination. Note: The solution set must not contain duplicate
combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],
         [1,2,5],
         [1,7],
         [2,6]]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],
         [5]]

Constraints:
* 1 <= candidates.length <= 100
* 1 <= candidates[i] <= 50
* 1 <= target <= 30*/

function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((x, y) => x-y);
    const ans = [], stack = [];

    function fn(i, x, prev) {
        if (x == 0) ans.push(stack.slice());
        else if (i < candidates.length) {
            if (candidates[i] > x) return;
            fn(i+1, x, false);
            if (i == 0 || candidates[i-1] != candidates[i] || prev) {
                stack.push(candidates[i]);
                fn(i+1, x-candidates[i], true);
                stack.pop();
            }
        }
    }

    fn(0, target, false);
    return ans;
};


/*41. First Missing Positive (Hard)
Given an unsorted integer array nums. Return the smallest positive integer
that is not present in nums. You must implement an algorithm that runs in
O(n) time and uses O(1) auxiliary space.

Example 1:
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.

Example 2:
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.

Example 3:
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

Constraints:
* 1 <= nums.length <= 10^5
* -2^31 <= nums[i] <= 2^31 - 1*/

function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    for (let x of nums)
        while (0 < x && x <= n && nums[x-1] != x)
            [nums[x-1], x] = [x, nums[x-1]];
    return (1 + nums.findIndex((x, i) => x != i+1)) || n+1;
};


/*42. Trapping Rain Water (Hard)
Given n non-negative integers representing an elevation map where the width
of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array
             [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water
             (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:
* n == height.length
* 1 <= n <= 2 * 10^4
* 0 <= height[i] <= 10^5*/

function trap(height: number[]): number {
    let ans = 0;
    for (let lo = 0, hi = height.length-1, val = 0; lo < hi; )
        if (height[lo] <= height[hi]) {
            val = Math.max(val, height[lo]);
            ans += val - height[lo++];
        } else {
            val = Math.max(val, height[hi]);
            ans += val - height[hi--];
        }
    return ans;
};


/*48. Rotate Image (Medium)
You are given an n x n 2D matrix representing an image, rotate the image by
90 degrees (clockwise). You have to rotate the image in-place, which means
you have to modify the input 2D matrix directly. DO NOT allocate another 2D
matrix and do the rotation.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Constraints:
* n == matrix.length == matrix[i].length
* 1 <= n <= 20
* -1000 <= matrix[i][j] <= 1000*/

function rotate(matrix: number[][]): void {
    const m = matrix.length;
    matrix.reverse();
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < i; ++j)
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
};


/*49. Group Anagrams (Medium)
Given an array of strings strs, group the anagrams together. You can return
the answer in any order. An Anagram is a word or phrase formed by
rearranging the letters of a different word or phrase, typically using all
the original letters exactly once.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
* 1 <= strs.length <= 10^4
* 0 <= strs[i].length <= 100
* strs[i] consists of lowercase English letters.*/

function groupAnagrams(strs: string[]): string[][] {
    const mp = new Map();
    for (const s of strs) {
        const k = s.split("").sort().join("");
        if (!mp.has(k)) mp.set(k, []);
        mp.get(k).push(s);
    }
    return Array.from(mp.values());
};


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

function lengthOfLastWord(s: string): number {
    return s.trim().split(' ').pop().length;
};


/*75. Sort Colors (Medium)
Given an array nums with n objects colored red, white, or blue, sort them
in-place so that objects of the same color are adjacent, with the colors in
the order red, white, and blue. We will use the integers 0, 1, and 2 to
represent the color red, white, and blue, respectively. You must solve this
problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:
* n == nums.length
* 1 <= n <= 300
* nums[i] is either 0, 1, or 2.

Follow up: Could you come up with a one-pass algorithm using only constant
           extra space?*/

function sortColors(nums: number[]): void {
    let lo = 0, mid = 0, hi = nums.length-1;
    while (mid <= hi)
        if (nums[mid] == 0)
            [nums[lo++], nums[mid++]] = [nums[mid], nums[lo]];
        else if (nums[mid] == 1) ++mid;
        else [nums[mid], nums[hi--]] = [nums[hi], nums[mid]];
};


/*78. Subsets (Medium)
Given an integer array nums of unique elements, return all possible subsets
(the power set). The solution set must not contain duplicate subsets. Return
the solution in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
* 1 <= nums.length <= 10
* -10 <= nums[i] <= 10
* All the numbers of nums are unique.*/

function subsets(nums: number[]): number[][] {
    const ans = [];
    for (let m = 0, n = nums.length; m < 1<<n; ++m) {
        const seq = [];
        for (let i = 0; i < n; ++i)
            if (m & 1<<i) seq.push(nums[i]);
        ans.push(seq);
    }
    return ans;
};


/*79. Word Search (Medium)
Given an m x n grid of characters board and a string word, return true if
word exists in the grid. The word can be constructed from letters of
sequentially adjacent cells, where adjacent cells are horizontally or
vertically neighboring. The same letter cell may not be used more than once.

Example 1:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
       word = "ABCCED"
Output: true

Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
       word = "SEE"
Output: true

Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
       word = "ABCB"
Output: false

Constraints:
* m == board.length
* n = board[i].length
* 1 <= m, n <= 6
* 1 <= word.length <= 15
* board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a
           larger board?*/

function exist(board: string[][], word: string): boolean {
    const m = board.length, n = board[0].length;

    function fn(i, j, k) {
        if (k+1 == word.length) return true;
        const ch = board[i][j];
        board[i][j] = '#';
        for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
            if (0 <= ii && ii < m && 0 <= jj && jj < n && board[ii][jj] == word[k+1] && fn(ii, jj, k+1))
                return true;
        board[i][j] = ch;
        return false;
    }

    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (board[i][j] == word[0] && fn(i, j, 0))
                return true;
    return false;
};


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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null || q === null) return p == q;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};


/*129. Sum Root to Leaf Numbers (Medium)
You are given the root of a binary tree containing digits from 0 to 9 only.
Each root-to-leaf path in the tree represents a number. For example, the
root-to-leaf path 1 -> 2 -> 3 represents the number 123. Return the total
sum of all root-to-leaf numbers. Test cases are generated so that the answer
will fit in a 32-bit integer. A leaf node is a node with no children.

Example 1:
Input: root = [1,2,3]
Output: 25
Explanation: The root-to-leaf path 1->2 represents the number 12.
             The root-to-leaf path 1->3 represents the number 13.
             Therefore, sum = 12 + 13 = 25.

Example 2:
Input: root = [4,9,0,5,1]
Output: 1026
Explanation: The root-to-leaf path 4->9->5 represents the number 495.
             The root-to-leaf path 4->9->1 represents the number 491.
             The root-to-leaf path 4->0 represents the number 40.
             Therefore, sum = 495 + 491 + 40 = 1026.

Constraints:
* The number of nodes in the tree is in the range [1, 1000].
* 0 <= Node.val <= 9
* The depth of the tree will not exceed 10.*/

function sumNumbers(root: TreeNode | null): number {
    const stack: [[TreeNode, number]] = [[root, 0]];
    let ans = 0;
    while (stack.length) {
        let [node, val] = stack.pop();
        val = 10*val + node.val;
        if (node.left == null && node.right == null) ans += val;
        if (node.left) stack.push([node.left, val]);
        if (node.right) stack.push([node.right, val]);
    }
    return ans;
};


/*131. Palindrome Partitioning (Medium)
Given a string s, partition s such that every substring of the partition is
a palindrome. Return all possible palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]

Constraints:
* 1 <= s.length <= 16
* s contains only lowercase English letters.*/

function partition(s: string): string[][] {
    const n = s.length;
    const part = Array(n).fill(null).map(() => []);
    for (let i = 0; i < 2*n-1; ++i)
        for (let lo = Math.floor(i/2), hi = Math.ceil(i/2); 0 <= lo && hi < n && s[lo] == s[hi]; --lo, ++hi)
            part[lo].push(hi+1);
    const ans = [];

    function fn(i, seq) {
        if (i == n) ans.push([...seq]);
        else
            for (const j of part[i]) {
                seq.push(s.substring(i, j));
                fn(j, seq);
                seq.pop();
            }
    }

    fn(0, []);
    return ans;

};


/*141. Linked List Cycle (Easy)
Given head, the head of a linked list, determine if the linked list has a
cycle in it. There is a cycle in a linked list if there is some node in the
list that can be reached again by continuously following the next pointer.
Internally, pos is used to denote the index of the node that tail's next
pointer is connected to. Note that pos is not passed as a parameter. Return
true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to
             the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to
             the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
* The number of the nodes in the list is in the range [0, 10^4].
* -10^5 <= Node.val <= 10^5
* pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?*/

function hasCycle(head: ListNode | null): boolean {
    let fast = head, slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) return true;
    }
    return false;
};


/*145. Binary Tree Postorder Traversal (Easy)
Given the root of a binary tree, return the postorder traversal of its
nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Constraints:
* The number of the nodes in the tree is in the range [0, 100].
* -100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?*/

function postorderTraversal(root: TreeNode | null): number[] {
    const ans = [], stack = [];
    let prev = null, node = root;
    while (node || stack.length)
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack[stack.length-1];
            if (node.right && prev != node.right) node = node.right;
            else {
                ans.push(node.val);
                stack.pop();
                prev = node;
                node = null;
            }
        }
    return ans;
};


/*165. Compare Version Numbers (Medium)
Given two version numbers, version1 and version2, compare them. Version
numbers consist of one or more revisions joined by a dot '.'. Each revision
consists of digits and may contain leading zeros. Every revision contains at
least one character. Revisions are 0-indexed from left to right, with the
leftmost revision being revision 0, the next revision being revision 1, and
so on. For example 2.5.33 and 0.1 are valid version numbers. To compare
version numbers, compare their revisions in left-to-right order. Revisions
are compared using their integer value ignoring any leading zeros. This
means that revisions 1 and 001 are considered equal. If a version number
does not specify a revision at an index, then treat the revision as 0. For
example, version 1.0 is less than version 1.1 because their revision 0s are
the same, but their revision 1s are 0 and 1 respectively, and 0 < 1. Return
the following:
* If version1 < version2, return -1.
* If version1 > version2, return 1.
* Otherwise, return 0.

Example 1:
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same
             integer "1".

Example 2:
Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated
             as "0".

Example 3:
Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1's revision 0 is "0", while version2's revision 0 is
             "1". 0 < 1, so version1 < version2.

Constraints:
* 1 <= version1.length, version2.length <= 500
* version1 and version2 only contain digits and '.'.
* version1 and version2 are valid version numbers.
* All the given revisions in version1 and version2 can be stored in a 32-bit
  integer.*/

function compareVersion(version1: string, version2: string): number {
    const vals1 = version1.split('.'), vals2 = version2.split('.');
    for (let i = 0, n1 = vals1.length, n2 = vals2.length; i < n1 || i < n2; ++i) {
        const v1 = i < n1 ? Number(vals1[i]) : 0;
        const v2 = i < n2 ? Number(vals2[i]) : 0;
        if (v1 < v2) return -1;
        else if (v1 > v2) return 1;
    }
    return 0;
};


/*169. Majority Element (Easy)
Given an array nums of size n, return the majority element. The majority
element is the element that appears more than ⌊n / 2⌋ times. You may assume
that the majority element always exists in the array.

Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
kOutput: 2

Constraints:
* n == nums.length
* 1 <= n <= 5 * 10^4
* -2^31 <= nums[i] <= 2^31 - 1

Follow-up: Could you solve the problem in linear time and in O(1) space?*/

function majorityElement(nums: number[]): number {
    let ans = 0, cnt = 0;
    for (const x of nums)
        if (cnt && ans != x) --cnt;
        else {
            if (cnt == 0) ans = x;
            ++cnt;
        }
    return ans;
};


/*179. Largest Number (Medium)
Given a list of non-negative integers nums, arrange them such that they form
the largest number and return it. Since the result may be very large, so you
need to return a string instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"

Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Constraints:
* 1 <= nums.length <= 100
* 0 <= nums[i] <= 10^9*/

function largestNumber(nums: number[]): string {
    const vals = nums.map(x => String(x));
    vals.sort((x, y) => (y+x).localeCompare(x+y));
    const ans = vals.join("").replace(/^0+/, '');
    return ans === "" ? "0" : ans;
};


/*200. Number of Islands (Medium)
Given an m x n 2D binary grid grid which represents a map of '1's (land) and
'0's (water), return the number of islands. An island is surrounded by water
and is formed by connecting adjacent lands horizontally or vertically. You
may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m, n <= 300
* grid[i][j] is '0' or '1'.*/

function numIslands(grid: string[][]): number {
    let ans = 0;
    const m = grid.length, n = grid[0].length, stack = [];
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j] == '1') {
                ++ans;
                grid[i][j] = '0';
                stack.push([i, j]);
                while (stack.length) {
                    const [i, j] = stack.pop();
                    for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
                        if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj] == '1') {
                            grid[ii][jj] = '0';
                            stack.push([ii, jj]);
                        }
                }
            }
    return ans;
};


/*214. Shortest Palindrome (Hard)
You are given a string s. You can convert s to a palindrome by adding
characters in front of it. Return the shortest palindrome you can find by
performing this transformation.

Example 1:
Input: s = "aacecaaa"
Output: "aaacecaaa"

Example 2:
Input: s = "abcd"
Output: "dcbabcd"

Constraints:
* 0 <= s.length <= 5 * 10^4
* s consists of lowercase English letters only.*/

function shortestPalindrome(s: string): string {
    const ss = s + "#" + s.split("").reverse().join("");
    const n = ss.length;
    const lps = Array(n).fill(0);
    let k = 0;
    for (let i = 1; i < n; ++i) {
        while (k && ss[k] != ss[i]) k = lps[k-1];
        if (ss[k] == ss[i]) ++k;
        lps[i] = k;
    }
    return s.substring(k).split("").reverse().join("") + s;
};


/*231. Power of Two (Easy)
Given an integer n, return true if it is a power of two. Otherwise, return
false. An integer n is a power of two, if there exists an integer x such
that n == 2^x.

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

function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n&(n-1)) == 0;
};


/*237. Delete Node in a Linked List (Medium)
There is a singly-linked list head and we want to delete a node node in it.
You are given the node to be deleted node. You will not be given access to
the first node of head. All the values of the linked list are unique, and it
is guaranteed that the given node node is not the last node in the linked
list. Delete the given node. Note that by deleting the node, we do not mean
removing it from memory. We mean:
* The value of the given node should not exist in the linked list.
* The number of nodes in the linked list should decrease by one.
* All the values before node should be in the same order.
* All the values after node should be in the same order.
Custom testing:
* For the input, you should provide the entire linked list head and the node
  to be given node. node should not be the last node of the list and should
  be an actual node in the list.
* We will build the linked list and pass the node to your function.
* The output will be the entire list after calling your function.

Example 1:
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list
             should become 4 -> 1 -> 9 after calling your function.

Example 2:
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list
             should become 4 -> 5 -> 9 after calling your function.

Constraints:
* The number of the nodes in the given list is in the range [2, 1000].
* -1000 <= Node.val <= 1000
* The value of each node in the list is unique.
* The node to be deleted is in the list and is not a tail node.*/

function deleteNode(node: ListNode | null): void {
    node.val = node.next.val;
    node.next = node.next.next;
};


/*238. Product of Array Except Self (Medium)
Given an integer array nums, return an array answer such that answer[i] is
equal to the product of all the elements of nums except nums[i]. The product
of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the
division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:
* 2 <= nums.length <= 10^5
* -30 <= nums[i] <= 30
* The product of any prefix or suffix of nums is guaranteed to fit in a 32-
  bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity? (The
           output array does not count as extra space for space complexity
           analysis.)*/

function productExceptSelf(nums: number[]): number[] {
    const n = nums.length, ans = Array(n).fill(1)
    let prefix = 1, suffix = 1;
    for (const [i, x] of nums.entries()) {
        ans[i] *= prefix;
        ans[n-1-i] *= suffix;
        prefix *= nums[i];
        suffix *= nums[n-1-i];
    }
    return ans;
};


/*260. Single Number III (Medium)
Given an integer array nums, in which exactly two elements appear only once
and all the other elements appear exactly twice. Find the two elements that
appear only once. You can return the answer in any order. You must write an
algorithm that runs in linear runtime complexity and uses only constant
extra space.

Example 1:
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.

Example 2:
Input: nums = [-1,0]
Output: [-1,0]

Example 3:
Input: nums = [0,1]
Output: [1,0]

Constraints:
* 2 <= nums.length <= 3 * 10^4
* -2^31 <= nums[i] <= 2^31 - 1
* Each integer in nums will appear twice, only two integers will appear once.*/

function singleNumber(nums: number[]): number[] {
    let val = nums.reduce((x, y) => x^y, 0);
    val &= -val;
    const ans = [0, 0];
    for (const x of nums)
        if (x & val) ans[0] ^= x;
        else ans[1] ^= x;
    return ans;
};


/*264. Ugly Number II (Medium)
An ugly number is a positive integer whose prime factors are limited to 2,
3, and 5. Given an integer n, return the nth ugly number.

Example 1:
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first
             10 ugly numbers.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are
             limited to 2, 3, and 5.

Constraints: 1 <= n <= 1690*/

function nthUglyNumber(n: number): number {
    const ans = [1];
    for (let i = 0, p2 = 0, p3 = 0, p5 = 0; i < n-1; ++i) {
        const cand = Math.min(2*ans[p2], 3*ans[p3], 5*ans[p5]);
        ans.push(cand);
        if (2*ans[p2] == cand) ++p2;
        if (3*ans[p3] == cand) ++p3;
        if (5*ans[p5] == cand) ++p5;
    }
    return ans[ans.length-1];
};


/*279. Perfect Squares (Medium)
Given an integer n, return the least number of perfect square numbers that
sum to n. A perfect square is an integer that is the square of an integer;
in other words, it is the product of some integer with itself. For example,
1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.

Example 2:
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

Constraints: 1 <= n <= 10^4*/

function numSquares(n: number): number {
    if (Math.floor(Math.sqrt(n))**2 == n) return 1;
    for (let i = 1; i <= Math.sqrt(n); ++i)
        if (Math.floor(Math.sqrt(n-i*i))**2 == n-i*i) return 2;
    for (; n % 4 == 0; n /= 4);
    return n % 8 != 7 ? 3 : 4;
};


/*310. Minimum Height Trees (Medium)
A tree is an undirected graph in which any two vertices are connected by
exactly one path. In other words, any connected graph without simple cycles
is a tree. Given a tree of n nodes labelled from 0 to n - 1, and an array of
n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected
edge between the two nodes ai and bi in the tree, you can choose any node of
the tree as the root. When you select a node x as the root, the result tree
has height h. Among all possible rooted trees, those with minimum height
(i.e. min(h))  are called minimum height trees (MHTs). Return a list of all
MHTs' root labels. You can return the answer in any order. The height of a
rooted tree is the number of edges on the longest downward path between the
root and a leaf.

Example 1:
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node
             with label 1 which is the only MHT.

Example 2:
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]

Constraints:
* 1 <= n <= 2 * 10^4
* edges.length == n - 1
* 0 <= ai, bi < n
* ai != bi
* All the pairs (ai, bi) are distinct.
* The given input is guaranteed to be a tree and there will be no repeated edges.*/

function findMinHeightTrees(n: number, edges: number[][]): number[] {
    const graph = Array(n).fill(null).map(() => new Set());
    for (const [u, v] of edges) {
        graph[u].add(v);
        graph[v].add(u);
    }
    const q = [];
    for (let u = 0; u < n; ++u)
        if (graph[u].size <= 1) q.push(u);
    while (n > 2) {
        n -= q.length;
        for (let sz = q.length; sz; --sz) {
            const u = q.shift(), v = graph[u].values().next().value;
            graph[v].delete(u);
            if (graph[v].size == 1) q.push(v);
        }
    }
    return q;
};


/*330. Patching Array (Hard)
Given a sorted integer array nums and an integer n, add/patch elements to
the array such that any number in the range [1, n] inclusive can be formed
by the sum of some elements in the array. Return the minimum number of
patches required.

Example 1:
Input: nums = [1,3], n = 6
Output: 1
Explanation: Combinations of nums are [1], [3], [1,3], which form possible
             sums of: 1, 3, 4. Now if we add/patch 2 to nums, the
             combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].
             Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range
             [1, 6]. So we only need 1 patch.

Example 2:
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].

Example 3:
Input: nums = [1,2,2], n = 5
Output: 0

Constraints:
* 1 <= nums.length <= 1000
* 1 <= nums[i] <= 10^4
* nums is sorted in ascending order.
* 1 <= n <= 2^31 - 1*/

function minPatches(nums: number[], n: number): number {
    let ans = 0;
    for (let prefix = 0, k = 0; prefix < n; )
        if (k < nums.length && nums[k] <= prefix+1)
            prefix += nums[k++];
        else {
            ++ans;
            prefix += ++prefix;
        }
    return ans;
};


/*341. Flatten Nested List Iterator (Medium)
You are given a nested list of integers nestedList. Each element is either an
integer or a list whose elements may also be integers or other lists. Implement
an iterator to flatten it. Implement the NestedIterator class:
* NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with
  the nested list nestedList.
* int next() Returns the next integer in the nested list.
* boolean hasNext() Returns true if there are still some integers in the nested
  list and false otherwise.
Your code will be tested with the following pseudocode:
    initialize iterator with nestedList
    res = []
    while iterator.hasNext()
        append iterator.next() to the end of res
    return res
If res matches the expected flattened list, then your code will be judged as
correct.

Example 1:
Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, the order
             of elements returned by next should be: [1,1,2,1,1].

Example 2:
Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until hasNext returns false, the order
             of elements returned by next should be: [1,4,6].

Constraints:
* 1 <= nestedList.length <= 500
* The values of the integers in the nested list is in the range [-10^6, 10^6].*/

class NestedIterator {
    public stack;
    public val;

    constructor(nestedList: NestedInteger[]) {
        this.stack = [[nestedList, 0]];
        this.val = this.read();
    }

    hasNext(): boolean {
        return this.val !== null;
    }

    next(): number {
        const ans = this.val;
        this.val = this.read();
        return ans;
    }

    read(): number {
        while (this.stack.length) {
            const [data, i] = this.stack.pop();
            if (i+1 < data.length) this.stack.push([data, i+1]);
            if (data[i].isInteger()) return data[i].getInteger();
            if (data[i].getList().length)
                this.stack.push([data[i].getList(), 0]);
        }
        return null;
    }
}


/*350. Intersection of Two Arrays II (Easy)
Given two integer arrays nums1 and nums2, return an array of their
intersection. Each element in the result must appear as many times as it
shows in both arrays and you may return the result in any order.

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
* What if elements of nums2 are stored on disk, and the memory is limited
  such that you cannot load all elements into the memory at once?*/

function intersect(nums1: number[], nums2: number[]): number[] {
    const freq = new Map();
    for (const x of nums1)
        freq.set(x, (freq.get(x)??0) + 1);
    const ans = [];
    for (const x of nums2)
        if (freq.get(x)??0 > 0) {
            ans.push(x);
            freq.set(x, freq.get(x)-1);
        }
    return ans;
};


/*387. First Unique Character in a String (Easy)
Given a string s, find the first non-repeating character in it and return
its index. If it does not exist, return -1.

Example 1:
Input: s = "leetcode"
Output: 0

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

Constraints:
* 1 <= s.length <= 10^5
* s consists of only lowercase English letters.*/

function firstUniqChar(s: string): number {
    const freq = Array(26).fill(0);
    for (const ch of s) ++freq[ch.charCodeAt(0)-97];
    for (let i = 0; i < s.length; ++i)
        if (freq[s.charAt(i).charCodeAt(0)-97] == 1) return i;
    return -1;
};


/*402. Remove K Digits (Medium)
Given string num representing a non-negative integer num, and an integer k,
return the smallest possible integer after removing k digits from num.

Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219
             which is the smallest.

Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the
             output must not contain leading zeroes.

Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with
             nothing which is 0.

Constraints:
* 1 <= k <= num.length <= 10^5
* num consists of only digits.
* num does not have any leading zeros except for the zero itself.*/

function removeKdigits(num: string, k: number): string {
    const ans = [];
    for (const ch of num) {
        while (k && ans.length && ans[ans.length-1] > ch) {
            --k;
            ans.pop();
        }
        if (ans.length || ch != '0') ans.push(ch);
    }
    while (k-- && ans.length)
        ans.pop();
    return ans.join('') || "0";
};


/*409. Longest Palindrome (Easy)
Given a string s which consists of lowercase or uppercase letters, return
the length of the longest palindrome that can be built with those letters.
Letters are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose
             length is 7.

Example 2:
Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length
             is 1.

Constraints:
* 1 <= s.length <= 2000
* s consists of lowercase and/or uppercase English letters only.*/

function longestPalindrome(s: string): number {
    const freq = new Map();
    for (const ch of s) freq.set(ch, 1+(freq.get(ch) ?? 0));
    let ans = 0, odd = 0;
    for (const v of freq.values()) {
        ans += Math.floor(v/2)*2;
        if (v % 2) odd = 1;
    }
    return ans + odd;
};


/*442. Find All Duplicates in an Array (Medium)
Given an integer array nums of length n where all the integers of nums are
in the range [1, n] and each integer appears once or twice, return an array
of all the integers that appears twice. You must write an algorithm that
runs in O(n) time and uses only constant extra space.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Example 2:
Input: nums = [1,1,2]
Output: [1]

Example 3:
Input: nums = [1]
Output: []

Constraints:
* n == nums.length
* 1 <= n <= 10^5
* 1 <= nums[i] <= n
* Each element in nums appears once or twice.*/

function findDuplicates(nums: number[]): number[] {
    const ans = [];
    for (let x of nums) {
        x = Math.abs(x);
        if (nums[x-1] < 0) ans.push(x);
        nums[x-1] *= -1;
    }
    return ans;
};


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
* -2^31 <= xstart < xend <= 2^31 - 1*/

function findMinArrowShots(points: number[][]): number {
    let ans = 0, prev = -Infinity;
    points.sort((x, y) => x[1] - y[1]);
    for (const [x, y] of points)
        if (prev < x) {
            ++ans;
            prev = y;
        }
    return ans;
};


/*463. Island Perimeter (Easy)
You are given row x col grid representing a map where grid[i][j] = 1
represents land and grid[i][j] = 0 represents water. Grid cells are
connected horizontally/vertically (not diagonally). The grid is completely
surrounded by water, and there is exactly one island (i.e., one or more
connected land cells). The island doesn't have "lakes", meaning the water
inside isn't connected to the water around the island. One cell is a square
with side length 1. The grid is rectangular, width and height don't exceed
100. Determine the perimeter of the island.

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
* There is exactly one island in grid.*/

function islandPerimeter(grid: number[][]): number {
    let ans = 0;
    for (let i = 0; i < grid.length; ++i)
        for (let j = 0; j < grid[i].length; ++j)
            if (grid[i][j]) {
                ans += 4;
                if (i && grid[i-1][j]) ans -= 2;
                if (j && grid[i][j-1]) ans -= 2;
            }
    return ans;
};


/*476. Number Complement (Easy)
The complement of an integer is the integer you get when you flip all the
0's to 1's and all the 1's to 0's in its binary representation. For example,
The integer 5 is "101" in binary and its complement is "010" which is the
integer 2. Given an integer num, return its complement.

Example 1:
Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits),
             and its complement is 010. So you need to output 2.

Example 2:
Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and
             its complement is 0. So you need to output 0.

Constraints: 1 <= num < 2^31

Note: This question is the same as 1009:
      https://leetcode.com/problems/complement-of-base-10-integer/*/

function findComplement(num: number): number {
    let mask = 1;
    while (mask < num) mask = mask << 1 | 1;
    return mask ^ num;
};


/*506. Relative Ranks (Easy)
You are given an integer array score of size n, where score[i] is the score
of the ith athlete in a competition. All the scores are guaranteed to be
unique. The athletes are placed based on their scores, where the 1st place
athlete has the highest score, the 2nd place athlete has the 2nd highest
score, and so on. The placement of each athlete determines their rank:
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
* All the values in score are unique.*/

function findRelativeRanks(score: number[]): string[] {
    const n = score.length, vals = Array(n).fill(0).map((x, i) => i);
    vals.sort((x, y) => score[y] - score[x]);
    const ans = Array(n).fill(0);
    for (const [i, x] of vals.entries())
        if (i <= 2) ans[x] = ["Gold Medal", "Silver Medal", "Bronze Medal"][i];
        else ans[x] = String(i+1);
    return ans;
};


/*513. Find Bottom Left Tree Value (Medium)
Given the root of a binary tree, return the leftmost value in the last row
of the tree.

Example 1:
Input: root = [2,1,3]

      2
     / \
    1   3

Output: 1

Example 2:
Input: root = [1,2,3,4,null,5,6,null,null,7]

        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7

Output: 7

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* -2^31 <= Node.val <= 2^31 - 1*/

function findBottomLeftValue(root: TreeNode | null): number {
    const queue = [root];
    while (queue.length)
        for (let sz = queue.length; sz; --sz) {
            var node = queue.shift();
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }
    return node.val;
};


/*523. Continuous Subarray Sum (Medium)
Given an integer array nums and an integer k, return true if nums has a good
subarray or false otherwise. A good subarray is a subarray where:
* its length is at least two, and
* the sum of the elements of the subarray is a multiple of k.
Note that:
* A subarray is a contiguous part of the array.
* An integer x is a multiple of k if there exists an integer n such that
  x = n * k. 0 is always a multiple of k.

Example 1:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up
             to 6.

Example 2:
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose
             elements sum up to 42. 42 is a multiple of 6 because 42 = 7 * 6
             and 7 is an integer.

Example 3:
Input: nums = [23,2,6,4,7], k = 13
Output: false

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] <= 10^9
* 0 <= sum(nums[i]) <= 2^31 - 1
* 1 <= k <= 2^31 - 1*/

function checkSubarraySum(nums: number[], k: number): boolean {
    const seen = new Set();
    let prefix = 0, prev = 0;
    for (const x of nums) {
        prefix = (prefix+x) % k;
        if (seen.has(prefix)) return true;
        seen.add(prev);
        prev = prefix;
    }
    return false;
};


/*539. Minimum Time Difference (Medium)
Given a list of 24-hour clock time points in "HH:MM" format, return the
minimum minutes difference between any two time-points in the list.

Example 1:
Input: timePoints = ["23:59","00:00"]
Output: 1

Example 2:
Input: timePoints = ["00:00","23:59","00:00"]
Output: 0

Constraints:
* 2 <= timePoints.length <= 2 * 10^4
* timePoints[i] is in the format "HH:MM".*/

function findMinDifference(timePoints: string[]): number {
    const vals = [];
    for (const t of timePoints) {
        const h = Number(t.substring(0, 2)), m = Number(t.substring(3));
        vals.push(60*h + m);
    }
    vals.sort((x, y) => x-y);
    vals.push(vals[0] + 1440);
    let ans = Infinity;
    for (let i = 1; i < vals.length; ++i)
        ans = Math.min(ans, vals[i] - vals[i-1]);
    return ans;
};


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

function postorder(root: _Node | null): number[] {
    const ans = [];
    if (root) {
        const stack = [root];
        let prev = null;
        while (stack.length) {
            const node = stack[stack.length-1];
            if (node.children.length && prev !== node.children[node.children.length-1])
                for (const child of node.children.slice().reverse())
                    stack.push(child);
            else {
                ans.push(node.val);
                stack.pop();
                prev = node;
            }
        }
    }
    return ans;
};


/*623. Add One Row to Tree (Medium)
Given the root of a binary tree and two integers val and depth, add a row of
nodes with value val at the given depth depth. Note that the root node is at
depth 1. The adding rule is:
* Given the integer depth, for each not null tree node cur at the depth
  depth - 1, create two tree nodes with value val as cur's left subtree root
  and right subtree root.
* cur's original left subtree should be the left subtree of the new left
  subtree root.
* cur's original right subtree should be the right subtree of the new right
  subtree root.
* If depth == 1 that means there is no depth depth - 1 at all, then create a
  tree node with value val as the new root of the whole original tree, and
  the original tree is the new root's left subtree.

Example 1:
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]

Example 2:
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]

Constraints:
* The number of nodes in the tree is in the range [1, 10^4].
* The depth of the tree is in the range [1, 10^4].
* -100 <= Node.val <= 100
* -10^5 <= val <= 10^5
* 1 <= depth <= the depth of tree + 1*/

function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
    if (depth == 1) return new TreeNode(val, root);
    const queue = [root];
    for (; queue.length && depth-1 > 1; --depth) {
        for (let sz = queue.length; sz; --sz) {
            var node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    for (const node of queue) {
        node.left = new TreeNode(val, node.left, null);
        node.right = new TreeNode(val, null, node.right);
    }
    return root;
};


/*624. Maximum Distance in Arrays (Medium)
You are given m arrays, where each array is sorted in ascending order. You
can pick up two integers from two different arrays (each array picks one)
and calculate the distance. We define the distance between two integers a
and b to be their absolute difference |a - b|. Return the maximum distance.

Example 1:
Input: arrays = [[1,2,3],[4,5],[1,2,3]]
Output: 4
Explanation: One way to reach the maximum distance 4 is to pick 1 in the
             first or third array and pick 5 in the second array.

Example 2:
Input: arrays = [[1],[1]]
Output: 0

Constraints:
* m == arrays.length
* 2 <= m <= 10^5
* 1 <= arrays[i].length <= 500
* -10^4 <= arrays[i][j] <= 10^4
* arrays[i] is sorted in ascending order.
* There will be at most 10^5 integers in all the arrays.*/

function maxDistance(arrays: number[][]): number {
    let ans = 0, small = Infinity, large = -Infinity;
    for (const array of arrays) {
        const n = array.length;
        ans = Math.max(ans, large - array[0], array[n-1] - small);
        small = Math.min(small, array[0]);
        large = Math.max(large, array[n-1]);
    }
    return ans;
};


/*633. Sum of Square Numbers (Medium)
Given a non-negative integer c, decide whether there're two integers a and b
such that a2 + b2 = c.

Example 1:
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5

Example 2:
Input: c = 3
Output: false

Constraints: 0 <= c <= 2^31 - 1*/

function judgeSquareSum(c: number): boolean {
    /*Fermat theorem on sum of two squares*/
    for (let x = 2; x*x <= c; ++x)
        if (c % x == 0) {
            let mult = 0;
            for (; c % x == 0; ++mult, c /= x);
            if (x % 4 == 3 && mult & 1) return false;
        }
    return c % 4 != 3;
};


/*648. Replace Words (Medium)
In English, we have a concept called root, which can be followed by some
other word to form another longer word - let's call this word derivative.
For example, when the root "help" is followed by the word "ful", we can form
a derivative "helpful". Given a dictionary consisting of many roots and a
sentence consisting of words separated by spaces, replace all the
derivatives in the sentence with the root forming it. If a derivative can be
replaced by more than one root, replace it with the root that has the
shortest length. Return the sentence after the replacement.

Example 1:
Input: dictionary = ["cat","bat","rat"],
       sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Example 2:
Input: dictionary = ["a","b","c"],
       sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"

Constraints:
* 1 <= dictionary.length <= 1000
* 1 <= dictionary[i].length <= 100
* dictionary[i] consists of only lower-case letters.
* 1 <= sentence.length <= 106
* sentence consists of only lower-case letters and spaces.
* The number of words in sentence is in the range [1, 1000]
* The length of each word in sentence is in the range [1, 1000]
* Every two consecutive words in sentence will be separated by exactly one
  space.
* sentence does not have leading or trailing spaces.*/

function replaceWords(dictionary: string[], sentence: string): string {
    const trie = new Map();
    for (const word of dictionary) {
        let node = trie;
        for (const ch of word) {
            if (node.get(ch) == null)
                node.set(ch, new Map());
            node = node.get(ch);
        }
        node.set("$", word);
    }
    const ans = [];
    for (let word of sentence.split(" ")) {
        let node = trie;
        for (const ch of word) {
            node = node.get(ch);
            if (!node || node.has("$")) {
                if (node) word = node.get("$");
                break;
            }
        }
        ans.push(word);
    }
    return ans.join(" ");
};


/*650. 2 Keys Keyboard (Medium)
There is only one character 'A' on the screen of a notepad. You can perform
one of two operations on this notepad for each step:
* Copy All: You can copy all the characters present on the screen (a partial
  copy is not allowed).
* Paste: You can paste the characters which are copied last time.
Given an integer n, return the minimum number of operations to get the
character 'A' exactly n times on the screen.

Example 1:
Input: n = 3
Output: 3
Explanation: Initially, we have one character 'A'.
             - In step 1, we use Copy All operation.
             - In step 2, we use Paste operation to get 'AA'.
             - In step 3, we use Paste operation to get 'AAA'.

Example 2:
Input: n = 1
Output: 0

Constraints: 1 <= n <= 1000*/

function minSteps(n: number): number {
    const dp = Array(n+1).fill(0).map((x, i) => i);
    dp[1] = 0;
    for (let x = 2; x <= n; ++x)
        for (let p = 2; p <= Math.sqrt(x); ++p)
            if (x % p == 0)
                dp[x] = Math.min(dp[x], dp[x/p] + p);
    return dp[n];
};


/*664. Strange Printer (Hard)
There is a strange printer with the following two special properties:
* The printer can only print a sequence of the same character each time.
* At each turn, the printer can print new characters starting from and
  ending at any place and will cover the original existing characters.
Given a string s, return the minimum number of turns the printer needed to
print it.

Example 1:
Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".

Example 2:
Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of
             the string, which will cover the existing character 'a'.

Constraints:
* 1 <= s.length <= 100
* s consists of lowercase English letters.*/

function strangePrinter(s: string): number {
    const n = s.length;
    const dp = Array(n+1).fill(0).map(() => Array(n+1).fill(Infinity));
    dp[n] = Array(n+1).fill(0);
    for (let i = n-1; i >= 0; --i) {
        dp[i][i] = 0;
        for (let j = i+1; j <= n; ++j) {
            dp[i][j] = 1 + dp[i+1][j];
            for (let k = i+1; k < j; ++k)
                if (s[i] == s[k])
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j]);
        }
    }
    return dp[0][n];
};


/*678. Valid Parenthesis String (Medium)
Given a string s containing only three types of characters: '(', ')' and
'*', return true if s is valid. The following rules define a valid string:
* Any left parenthesis '(' must have a corresponding right parenthesis ')'.
* Any right parenthesis ')' must have a corresponding left parenthesis '('.
* Left parenthesis '(' must go before the corresponding right parenthesis
  ')'.
* '*' could be treated as a single right parenthesis ')' or a single left
  parenthesis '(' or an empty string "".

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true

Constraints:
* 1 <= s.length <= 100
* s[i] is '(', ')' or '*'.*/

function checkValidString(s: string): boolean {
    let lower = 0, upper = 0;
    for (const ch of s) {
        if (ch == '(') ++lower;
        else if (lower) --lower;
        if (ch == '(' || ch == '*') ++upper;
        else --upper;
        if (upper < 0) return false;
    }
    return lower == 0;
};


/*703. Kth Largest Element in a Stream (Easy)
Design a class to find the kth largest element in a stream. Note that it is the
kth largest element in the sorted order, not the kth distinct element. Implement
KthLargest class:
* KthLargest(int k, int[] nums) Initializes the object with the integer k and
  the stream of integers nums.
* int add(int val) Appends the integer val to the stream and returns the element
  representing the kth largest element in the stream.

Example 1:
Input ["KthLargest", "add", "add", "add", "add", "add"]
      [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output [null, 4, 5, 5, 8, 8]
Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

Constraints:
* 1 <= k <= 10^4
* 0 <= nums.length <= 10^4
* -10^4 <= nums[i] <= 10^4
* -10^4 <= val <= 10^4
* At most 10^4 calls will be made to add.
* It is guaranteed that there will be at least k elements in the array when you
search for the kth element.*/

class KthLargest {
    private k;
    private pq;

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.pq = new PriorityQueue({ compare : (x, y) => x-y });
        for (const x of nums) {
            this.pq.enqueue(x);
            if (this.pq.size() > k) this.pq.dequeue();
        }
    }

    add(val: number): number {
        this.pq.enqueue(val);
        if (this.pq.size() > this.k) this.pq.dequeue();
        return this.pq.front();
    }
}


/*713. Subarray Product Less Than K (Medium)
Given an array of integers nums and an integer k, return the number of
contiguous subarrays where the product of all the elements in the subarray
is strictly less than k.

Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
             [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
             Note that [10, 5, 2] is not included as the product of 100 is
             not strictly less than k.

Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

Constraints:
* 1 <= nums.length <= 3 * 10^4
* 1 <= nums[i] <= 1000
* 0 <= k <= 10^6*/

function numSubarrayProductLessThanK(nums: number[], k: number): number {
    let ans = 0, prod = 1;
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        prod *= nums[i];
        while (ii <= i && prod >= k)
            prod /= nums[ii++];
        ans += i-ii+1;
    }
    return ans;
};


/*725. Split Linked List in Parts (Medium)
Given the head of a singly linked list and an integer k, split the linked
list into k consecutive linked list parts. The length of each part should be
as equal as possible: no two parts should have a size differing by more than
one. This may lead to some parts being null. The parts should be in the
order of occurrence in the input list, and parts occurring earlier should
always have a size greater than or equal to parts occurring later. Return an
array of the k parts.

Example 1:
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation: The first element output[0] has output[0].val = 1,
             output[0].next = null. The last element output[4] is null, but
             its string representation as a ListNode is [].

Example 2:
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation: The input has been split into consecutive parts with size
             difference at most 1, and earlier parts are a larger size than
             the later parts.

Constraints:
* The number of nodes in the list is in the range [0, 1000].
* 0 <= Node.val <= 1000
* 1 <= k <= 50*/

function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
    let sz = 0;
    for (let node = head; node; node = node.next, ++sz);
    const q = Math.floor(sz/k), r = sz%k;
    const ans = [];
    let node = head;
    for (let i = 0; i < k; ++i) {
        ans.push(node);
        for (let v = i < r ? q : q-1; v > 0; --v) node = node.next;
        if (node) [node.next, node] = [null, node.next];
    }
    return ans;
};


/*786. K-th Smallest Prime Fraction (Medium)
You are given a sorted integer array arr containing 1 and prime numbers,
where all the integers of arr are unique. You are also given an integer k.
For every i and j where 0 <= i < j < arr.length, we consider the fraction
arr[i] / arr[j]. Return the kth smallest fraction considered. Return your
answer as an array of integers of size 2, where answer[0] == arr[i] and
answer[1] == arr[j].

Example 1:
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
             1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
             The third fraction is 2/5.

Example 2:
Input: arr = [1,7], k = 1
Output: [1,7]

Constraints:
* 2 <= arr.length <= 1000
* 1 <= arr[i] <= 3 * 104
* arr[0] == 1
* arr[i] is a prime number for i > 0.
* All the numbers of arr are unique and sorted in strictly increasing order.
* 1 <= k <= arr.length * (arr.length - 1) / 2

Follow up: Can you solve the problem with better than O(n2) complexity?*/

function kthSmallestPrimeFraction(arr: number[], k: number): number[] {
    const n = arr.length, pq = new PriorityQueue({compare : (x, y) => x[0] - y[0]});
    for (let i = 0; i < n-1; ++i)
        pq.enqueue([arr[i]/arr[n-1], i, n-1]);
    while (k--) {
        var [_, i, j] = pq.dequeue();
        if (i < j-1) pq.enqueue([arr[i]/arr[j-1], i, j-1]);
    }
    return [arr[i], arr[j]];
};


/*787. Cheapest Flights Within K Stops (Medium)
There are n cities connected by some number of flights. You are given an
array flights where flights[i] = [fromi, toi, pricei] indicates that there
is a flight from city fromi to city toi with cost pricei. You are also
given three integers src, dst, and k, return the cheapest price from src to
dst with at most k stops. If there is no such route, return -1.

Example 1:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation: The graph is shown. The cheapest price from city 0 to city 2
             with at most 1 stop costs 200, as marked red in the picture.

Example 2:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation: The graph is shown. The cheapest price from city 0 to city 2
             with at most 0 stop costs 500, as marked blue in the picture.

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

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v, w] of flights)
        graph[u].push([v, w]);
    const pq = new PriorityQueue({compare : (x, y) => x[0] - y[0]});
    pq.enqueue([0, 0, src]);
    const dist = Array(n).fill(null).map(() => Array(2).fill(1e7));
    dist[src] = [0, 0];
    while (pq.size()) {
        const [p, s, u] = pq.dequeue();
        if (u == dst) return p;
        if (s <= k) {
            for (const [v, w] of graph[u]) {
                const pp = p + w;
                if (pp < dist[v][0] || s < dist[v][1]) {
                    pq.enqueue([pp, s+1, v]);
                    if (pp < dist[v][0]) dist[v] = [pp, s+1];
                    else if (pp == dist[v][0]) dist[v][1] = Math.min(dist[v][1], s+1);
                }
            }
        }
    }
    return -1;
};


/*826. Most Profit Assigning Work (Medium)
You have n jobs and m workers. You are given three arrays: difficulty,
profit, and worker where:
* difficulty[i] and profit[i] are the difficulty and the profit of the ith
  job, and
* worker[j] is the ability of jth worker (i.e., the jth worker can only
  complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed
multiple times.
* For example, if three workers attempt the same job that pays $1, then the
  total profit will be $3. If a worker cannot complete any job, their profit
  is $0.
Return the maximum profit we can achieve after assigning the workers to the
jobs.

Example 1:
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get
             a profit of [20,20,30,30] separately.

Example 2:
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0

Constraints:
* n == difficulty.length
* n == profit.length
* m == worker.length
* 1 <= n, m <= 10^4
* 1 <= difficulty[i], profit[i], worker[i] <= 10^5*/

function maxProfitAssignment(difficulty: number[], profit: number[], worker: number[]): number {
    const job = difficulty.map((x, i) => [x, profit[i]]).sort((x, y) => x[0]-y[0]);
    worker.sort((x, y) => x-y);
    let ans = 0, k = 0, prefix = 0;
    for (const w of worker) {
        for (; k < job.length && job[k][0] <= w; ++k)
            prefix = Math.max(prefix, job[k][1]);
        ans += prefix;
    }
    return ans;
};


/*834. Sum of Distances in Tree (Hard)
There is an undirected connected tree with n nodes labeled from 0 to n - 1
and n - 1 edges. You are given the integer n and the array edges where
edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi
in the tree. Return an array answer of length n where answer[i] is the sum
of the distances between the ith node in the tree and all other nodes.

Example 1:
Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above. We can see that dist(0,1) + dist(0,2)
             + dist(0,3) + dist(0,4) + dist(0,5) equals 1 + 1 + 2 + 2 + 2 =
             8. Hence, answer[0] = 8, and so on.

Example 2:
Input: n = 1, edges = []
Output: [0]

Example 3:
Input: n = 2, edges = [[1,0]]
Output: [1,1]

Constraints:
* 1 <= n <= 3 * 10^4
* edges.length == n - 1
* edges[i].length == 2
* 0 <= ai, bi < n
* ai != bi
* The given input represents a valid tree.*/

function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    function fn(u, p) {
        let cnt = 0, val = 0;
        for (const v of graph[u])
            if (v != p) {
                const [cc, vv] = fn(v, u);
                cnt += cc;
                val += cc + vv;
            }
        size[u] = ++cnt;
        return [cnt, val];
    };

    const ans = Array(n).fill(0), size = Array(n).fill(0);
    ans[0] = fn(0, -1)[1];
    const stack = [0];
    while (stack.length) {
        const u = stack.pop();
        for (const v of graph[u])
            if (!ans[v]) {
                ans[v] = ans[u] + n - 2*size[v];
                stack.push(v);
            }
    }
    return ans;
};


/*846. Hand of Straights (Medium)
Alice has some number of cards and she wants to rearrange the cards into
groups so that each group is of size groupSize, and consists of groupSize
consecutive cards. Given an integer array hand where hand[i] is the value
written on the ith card and an integer groupSize, return true if she can
rearrange the cards, or false otherwise.

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

Example 2:
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

Constraints:
* 1 <= hand.length <= 10^4
* 0 <= hand[i] <= 10^9
* 1 <= groupSize <= hand.length

Note: This question is the same as 1296:
      https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/*/

function isNStraightHand(hand: number[], groupSize: number): boolean {
    const freq = new Map();
    for (const x of hand)
        freq.set(x, 1 + (freq.get(x) ?? 0));
    const queue = [];
    let prev = -1, need = 0;
    for (const [x, v] of new Map([...freq].sort((x, y) => x[0]-y[0]))) {
        if (need && x > prev+1 || need > v) return false;
        if (v > need) queue.push([x, v-need]);
        prev = x;
        need = v;
        if (queue && x-queue[0][0] == groupSize-1) need -= queue.shift()[1];
    }
    return need == 0;
};


/*857. Minimum Cost to Hire K Workers (Hard)
There are n workers. You are given two integer arrays quality and wage where
quality[i] is the quality of the ith worker and wage[i] is the minimum wage
expectation for the ith worker. We want to hire exactly k workers to form a
paid group. To hire a group of k workers, we must pay them according to the
following rules:
* Every worker in the paid group must be paid at least their minimum wage
  expectation.
* In the group, each worker's pay must be directly proportional to their
  quality. This means if a worker’s quality is double that of another worker
  in the group, then they must be paid twice as much as the other worker.
Given the integer k, return the least amount of money needed to form a paid
group satisfying the above conditions. Answers within 10-5 of the actual
answer will be accepted.

Example 1:
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to 0th worker and 35 to 2nd worker.

Example 2:
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
Explanation: We pay 4 to 0th worker, 13.33333 to 2nd and 3rd workers
             separately.

Constraints:
* n == quality.length == wage.length
* 1 <= k <= n <= 10^4
* 1 <= quality[i], wage[i] <= 10^4*/

function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
    let ans = Infinity, prefix = 0;
    const pq = new PriorityQueue({compare : (x, y) => y - x});
    const vals = quality.map((x, i) => [x, wage[i]]);
    vals.sort((x, y) => x[1]*y[0] - y[1]*x[0]);
    for (const [q, w] of vals) {
        prefix += q;
        pq.enqueue(q);
        if (pq.size() > k) prefix -= pq.dequeue();
        if (pq.size() == k) ans = Math.min(ans, prefix*w/q);
    }
    return ans;
};


/*860. Lemonade Change (Easy)
At a lemonade stand, each lemonade costs $5. Customers are standing in a
queue to buy from you and order one at a time (in the order specified by
bills). Each customer will only buy one lemonade and pay with either a $5,
$10, or $20 bill. You must provide the correct change to each customer so
that the net transaction is that the customer pays $5. Note that you do not
have any change in hand at first. Given an integer array bills where
bills[i] is the bill the ith customer pays, return true if you can provide
every customer with the correct change, or false otherwise.

Example 1:
Input: bills = [5,5,5,10,20]
Output: true
Explanation: - From the first 3 customers, we collect three $5 bills in
               order.
             - From the fourth customer, we collect a $10 bill and give back
               a $5.
             - From the fifth customer, we give a $10 bill and a $5 bill.
             Since all customers got correct change, we output true.

Example 2:
Input: bills = [5,5,10,10,20]
Output: false
Explanation: - From the first two customers in order, we collect two $5
               bills.
             - For the next two customers in order, we collect a $10 bill
               and give back a $5 bill.
             - For the last customer, we can not give the change of $15 back
               because we only have two $10 bills.
             Since not every customer received the correct change, the
             answer is false.

Constraints:
* 1 <= bills.length <= 10^5
* bills[i] is either 5, 10, or 20.*/

function lemonadeChange(bills: number[]): boolean {
    let five = 0, ten = 0;
    for (const bill of bills) {
        if (bill == 5) ++five;
        else if (bill == 10) ++ten, --five;
        else if (ten) --five, --ten;
        else five -= 3;
        if (five < 0) return false;
    }
    return true;
};


/*861. Score After Flipping Matrix (Medium)
You are given an m x n binary matrix grid. A move consists of choosing any
row or column and toggling each value in that row or column (i.e., changing
all 0's to 1's, and all 1's to 0's). Every row of the matrix is interpreted
as a binary number, and the score of the matrix is the sum of these numbers.
Return the highest possible score after making any number of moves
(including zero moves).

Example 1:
Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
Explanation: 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39

Example 2:
Input: grid = [[0]]
Output: 1

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m, n <= 20
* grid[i][j] is either 0 or 1.*/

function matrixScore(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    let ans = 0;
    for (let j = 0; j < n; ++j) {
        let val = 0;
        for (let i = 0; i < m; ++i)
            if (grid[i][0] == grid[i][j]) ++val;
        val = Math.max(val, m-val);
        ans += val * (1<<n-1-j);
    }
    return ans;
};


/*874. Walking Robot Simulation (Medium)
A robot on an infinite XY-plane starts at point (0, 0) facing north. The
robot can receive a sequence of these three possible types of commands:
* -2: Turn left 90 degrees.
* -1: Turn right 90 degrees.
* 1 <= k <= 9: Move forward k units, one unit at a time.
Some of the grid squares are obstacles. The ith obstacle is at grid point
obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will
instead stay in its current location and move on to the next command. Return
the maximum Euclidean distance that the robot ever gets from the origin
squared (i.e. if the distance is 5, return 25).

Note:
* North means +Y direction.
* East means +X direction.
* South means -Y direction.
* West means -X direction.
* There can be obstacle in [0,0].

Example 1:
Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot starts at (0, 0):
             1. Move north 4 units to (0, 4).
             2. Turn right.
             3. Move east 3 units to (3, 4).
             The furthest point the robot ever gets from the origin is
             (3, 4), which squared is 32 + 42 = 25 units away.

Example 2:
Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot starts at (0, 0):
             1. Move north 4 units to (0, 4).
             2. Turn right.
             3. Move east 1 unit and get blocked by the obstacle at (2, 4),
                robot is at (1, 4).
             4. Turn left.
             5. Move north 4 units to (1, 8).
             The furthest point the robot ever gets from the origin is
             (1, 8), which squared is 12 + 82 = 65 units away.

Example 3:
Input: commands = [6,-1,-1,6], obstacles = []
Output: 36
Explanation: The robot starts at (0, 0):
             1. Move north 6 units to (0, 6).
             2. Turn right.
             3. Turn right.
             4. Move south 6 units to (0, 0).
             The furthest point the robot ever gets from the origin is
             (0, 6), which squared is 62 = 36 units away.

Constraints:
* 1 <= commands.length <= 10^4
* commands[i] is either -2, -1, or an integer in the range [1, 9].
* 0 <= obstacles.length <= 10^4
* -3 * 10^4 <= xi, yi <= 3 * 10^4
* The answer is guaranteed to be less than 2^31.*/

function robotSim(commands: number[], obstacles: number[][]): number {
    let ans = 0, x = 0, y = 0, dx = 0, dy = 1;
    const tabu = new Set();
    for (const obstacle of obstacles)
        tabu.add(JSON.stringify(obstacle));
    for (let command of commands) {
        if (command == -2) [dx, dy] = [-dy, dx];
        else if (command == -1) [dx, dy] = [dy, -dx];
        else
            while (command--) {
                if (tabu.has(JSON.stringify([x+dx, y+dy]))) break;
                x += dx;
                y += dy;
            }
        ans = Math.max(ans, x*x + y*y);
    }
    return ans;
};


/*884. Uncommon Words from Two Sentences (Easy)
A sentence is a string of single-space separated words where each word
consists only of lowercase letters. A word is uncommon if it appears exactly
once in one of the sentences, and does not appear in the other sentence.
Given two sentences s1 and s2, return a list of all the uncommon words. You
may return the answer in any order.

Example 1:
Input: s1 = "this apple is sweet", s2 = "this apple is sour"
Output: ["sweet","sour"]
Explanation: The word "sweet" appears only in s1, while the word "sour"
             appears only in s2.

Example 2:
Input: s1 = "apple apple", s2 = "banana"
Output: ["banana"]

Constraints:
* 1 <= s1.length, s2.length <= 200
* s1 and s2 consist of lowercase English letters and spaces.
* s1 and s2 do not have leading or trailing spaces.
* All the words in s1 and s2 are separated by a single space.*/

function uncommonFromSentences(s1: string, s2: string): string[] {
    const freq = {};
    (s1 + " " + s2).split(" ").forEach(w => freq[w] = ++freq[w] || 1);
    return Object.entries(freq).filter(x => x[1] == 1).map(x => x[0]);
};


/*912. Sort an Array (Medium)
Given an array of integers nums, sort the array in ascending order and
return it. You must solve the problem without using any built-in functions
in O(nlog(n)) time complexity and with the smallest space complexity
possible.

Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not
             changed (for example, 2 and 3), while the positions of other
             numbers are changed (for example, 1 and 5).

Example 2:
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.

Constraints:
* 1 <= nums.length <= 5 * 10^4
* -5 * 10^4 <= nums[i] <= 5 * 10^4*/

function sortArray(nums: number[]): number[] {
    const n = nums.length;
    for (let i = 1; i < n; ++i) {
        const ii = Math.floor(Math.random()*(i+1));
        [nums[i], nums[ii]] = [nums[ii], nums[i]];
    }

    function sort(lo, hi) {
        if (lo+1 >= hi) return;
        let i = lo+1, j = hi-1;
        while (i <= j) {
            if (nums[i] < nums[lo]) ++i;
            else if (nums[j] > nums[lo]) --j;
            else [nums[i++], nums[j--]] = [nums[j], nums[i]];
        }
        [nums[lo], nums[j]] = [nums[j], nums[lo]];
        sort(lo, j);
        sort(j+1, hi);
    }

    sort(0, n);
    return nums;
};


/*947. Most Stones Removed with Same Row or Column (Medium)
On a 2D plane, we place n stones at some integer coordinate points. Each
coordinate point may have at most one stone. A stone can be removed if it
shares either the same row or the same column as another stone that has not
been removed. Given an array stones of length n where stones[i] = [xi, yi]
represents the location of the ith stone, return the largest possible number
of stones that can be removed.

Example 1:
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: One way to remove 5 stones is as follows:
             1. Remove stone [2,2] because it shares the same row as [2,1].
             2. Remove stone [2,1] because it shares the same column as
                [0,1].
             3. Remove stone [1,2] because it shares the same row as [1,0].
             4. Remove stone [1,0] because it shares the same column as
                [0,0].
             5. Remove stone [0,1] because it shares the same row as [0,0].
             Stone [0,0] cannot be removed since it does not share a
             row/column with another stone still on the plane.

Example 2:
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
             1. Remove stone [2,2] because it shares the same row as [2,0].
             2. Remove stone [2,0] because it shares the same column as
                [0,0].
             3. Remove stone [0,2] because it shares the same row as [0,0].
             Stones [0,0] and [1,1] cannot be removed since they do not
             share a row/column with another stone still on the plane.

Example 3:
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

Constraints:
* 1 <= stones.length <= 1000
* 0 <= xi, yi <= 10^4
* No two stones are at the same coordinate point.*/

function removeStones(stones: number[][]): number {
    const parent = new Map();

    function find(p) {
        if (!parent.has(p)) parent.set(p, p);
        if (p != parent.get(p))
            parent.set(p, find(parent.get(p)));
        return parent.get(p);
    };

    for (const [x, y] of stones)
        parent.set(find(x), find(-y-1));
    const group = new Set();
    for (const [x, _] of stones)
        group.add(find(x));
    return stones.length - group.size;
};


/*948. Bag of Tokens (Medium)
You start with an initial power of power, an initial score of 0, and a bag
of tokens given as an integer array tokens, where each tokens[i] donates the
value of tokeni. Your goal is to maximize the total score by strategically
playing these tokens. In one move, you can play an unplayed token in one of
the two ways (but not both for the same token):
* Face-up: If your current power is at least tokens[i], you may play tokeni,
  losing tokens[i] power and gaining 1 score.
* Face-down: If your current score is at least 1, you may play tokeni,
  gaining tokens[i] power and losing 1 score.
Return the maximum possible score you can achieve after playing any number
of tokens.

Example 1:
Input: tokens = [100], power = 50
Output: 0
Explanation: Since your score is 0 initially, you cannot play the token
             face-down. You also cannot play it face-up since your power
             (50) is less than tokens[0] (100).

Example 2:
Input: tokens = [200,100], power = 150
Output: 1
Explanation: Play token1 (100) face-up, reducing your power to 50 and
             increasing your score to 1. There is no need to play token0,
             since you cannot play it face-up to add to your score. The
             maximum score achievable is 1.

Example 3:
Input: tokens = [100,200,300,400], power = 200
Output: 2
Explanation: Play the tokens in this order to get a score of 2:
             - Play token0 (100) face-up, reducing power to 100 and
               increasing score to 1.
             - Play token3 (400) face-down, increasing power to 500 and
               reducing score to 0.
             - Play token1 (200) face-up, reducing power to 300 and
               increasing score to 1.
             - Play token2 (300) face-up, reducing power to 0 and increasing
               score to 2.
             - The maximum score achievable is 2.

Constraints:
* 0 <= tokens.length <= 1000
* 0 <= tokens[i], power < 10^4*/

function bagOfTokensScore(tokens: number[], power: number): number {
    tokens.sort((a, b) => a-b);
    let ans = 0;
    for (let lo = 0, hi = tokens.length-1; lo <= hi; ) {
        if (tokens[lo] <= power) {
            ++ans;
            power -= tokens[lo++];
        } else if (ans && lo < hi) {
            --ans;
            power += tokens[hi--];
        } else break;
    }
    return ans;
};


/*950. Reveal Cards In Increasing Order (Medium)
You are given an integer array deck. There is a deck of cards where every
card has a unique integer. The integer on the ith card is deck[i]. You can
order the deck in any order you want. Initially, all the cards start face
down (unrevealed) in one deck. You will do the following steps repeatedly
until all cards are revealed:
* Take the top card of the deck, reveal it, and take it out of the deck.
* If there are still cards in the deck then put the next top card of the
  deck at the bottom of the deck.
* If there are still unrevealed cards, go back to step 1. Otherwise, stop.
Return an ordering of the deck that would reveal the cards in increasing
order. Note that the first entry in the answer is considered to be the top
of the deck.

Example 1:
Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: We get the deck in the order [17,13,11,2,3,5,7] (this order
             does not matter), and reorder it.
             After reordering, the deck starts as [2,13,3,11,5,17,7], where
             2 is the top of the deck.
             - We reveal 2, and move 13 to the bottom.  The deck is now
               [3,11,5,17,7,13].
             - We reveal 3, and move 11 to the bottom.  The deck is now
               [5,17,7,13,11].
             - We reveal 5, and move 17 to the bottom.  The deck is now
               [7,13,11,17].
             - We reveal 7, and move 13 to the bottom.  The deck is now
               [11,17,13].
             - We reveal 11, and move 17 to the bottom.  The deck is now
               [13,17].
             - We reveal 13, and move 17 to the bottom.  The deck is now
               [17].
             - We reveal 17.
             Since all the cards revealed are in increasing order, the
             answer is correct.

Example 2:
Input: deck = [1,1000]
Output: [1,1000]

Constraints:
* 1 <= deck.length <= 1000
* 1 <= deck[i] <= 10^6
* All the values of deck are unique.*/

function deckRevealedIncreasing(deck: number[]): number[] {
    const ans = [];
    deck.sort((x, y) => y-x);
    for (const x of deck) {
        if (ans.length) ans.unshift(ans.pop());
        ans.unshift(x);
    }
    return ans;
};


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

function subarraysDivByK(nums: number[], k: number): number {
    let ans = 0, prefix = 0;
    const freq = Array(k).fill(0);
    freq[0] = 1;
    for (const x of nums) {
        prefix = (prefix + x%k +k) % k;
        ans += freq[prefix]++;
    }
    return ans;
};


/*979. Distribute Coins in Binary Tree (Medium)
You are given the root of a binary tree with n nodes where each node in the
tree has node.val coins. There are n coins in total throughout the whole
tree. In one move, we may choose two adjacent nodes and move one coin from
one node to another. A move may be from parent to child, or from child to
parent. Return the minimum number of moves required to make every node have
exactly one coin.

Example 1:
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child,
             and one coin to its right child.

Example 2:
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root
             [taking two moves]. Then, we move one coin from the root of the
             tree to the right child.

Constraints:
* The number of nodes in the tree is n.
* 1 <= n <= 100
* 0 <= Node.val <= n
* The sum of all Node.val is n.*/

function distributeCoins(root: TreeNode | null): number {

    function fn(node) {
        if (!node) return [0, 0];
        const [v0, m0] = fn(node.left);
        const [v1, m1] = fn(node.right);
        return [node.val+v0+v1-1, m0+m1+Math.abs(v0)+Math.abs(v1)];
    }

    return fn(root)[1];
};


/*988. Smallest String Starting From Leaf (Medium)
You are given the root of a binary tree where each node has a value in the
range [0, 25] representing the letters 'a' to 'z'. Return the
lexicographically smallest string that starts at a leaf of this tree and
ends at the root. As a reminder, any shorter prefix of a string is
lexicographically smaller. For example, "ab" is lexicographically smaller
than "aba". A leaf of a node is a node that has no children.

Example 1:
Input: root = [0,1,2,3,4,3,4]
Output: "dba"

Example 2:
Input: root = [25,1,3,1,3,0,2]
Output: "adz"

Example 3:
Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"

Constraints:
* The number of nodes in the tree is in the range [1, 8500].
* 0 <= Node.val <= 25*/

function smallestFromLeaf(root: TreeNode | null): string {
    const stack: [[TreeNode, string]] = [[root, ""]];
    let ans = "~";
    while (stack.length) {
        let [node, val] = stack.pop();
        val = String.fromCharCode(node.val + 'a'.charCodeAt(0)) + val;
        if (node.left == node.right) {
            if (ans > val) ans = val;
        } else {
            if (node.left) stack.push([node.left, val]);
            if (node.right) stack.push([node.right, val]);
        }
    }
    return ans;
};


/*995. Minimum Number of K Consecutive Bit Flips (Hard)
You are given a binary array nums and an integer k. A k-bit flip is choosing
a subarray of length k from nums and simultaneously changing every 0 in the
subarray to 1, and every 1 in the subarray to 0. Return the minimum number
of k-bit flips required so that there is no 0 in the array. If it is not
possible, return -1. A subarray is a contiguous part of an array.

Example 1:
Input: nums = [0,1,0], k = 1
Output: 2
Explanation: Flip nums[0], then flip nums[2].

Example 2:
Input: nums = [1,1,0], k = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we cannot make the
             array become [1,1,1].

Example 3:
Input: nums = [0,0,0,1,0,1,1,0], k = 3
Output: 3
Explanation: Flip nums[0],nums[1],nums[2]: nums becomes [1,1,1,1,0,1,1,0]
             Flip nums[4],nums[5],nums[6]: nums becomes [1,1,1,1,1,0,0,0]
             Flip nums[5],nums[6],nums[7]: nums becomes [1,1,1,1,1,1,1,1]

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= k <= nums.length*/

function minKBitFlips(nums: number[], k: number): number {
    let ans = 0, flip = 0, n = nums.length;
    const line = Array(n).fill(0);
    for (const [i, x] of nums.entries()) {
        if (x == flip) {
            if (n <= i+k-1) return -1;
            ++ans;
            flip ^= 1;
            line[i+k-1] = 1;
        }
        if (line[i]) flip ^= 1;
    }
    return ans;
};


/*1002. Find Common Characters (Easy)
Given a string array words, return an array of all characters that show up
in all strings within the words (including duplicates). You may return the
answer in any order.

Example 1:
Input: words = ["bella","label","roller"]
Output: ["e","l","l"]

Example 2:
Input: words = ["cool","lock","cook"]
Output: ["c","o"]

Constraints:
* 1 <= words.length <= 100
* 1 <= words[i].length <= 100
* words[i] consists of lowercase English letters.*/

function commonChars(words: string[]): string[] {
    const freq = Array(26).fill(Infinity);
    for (const word of words) {
        const temp = Array(26).fill(0);
        for (const ch of word)
            ++temp[ch.charCodeAt(0)-97];
        for (let i = 0; i < 26; ++i)
            freq[i] = Math.min(freq[i], temp[i]);
    }
    const ans = [];
    for (let [i, x] of freq.entries())
        while (x--)
            ans.push(String.fromCharCode(97 + i));
    return ans;
};


/*1038. Binary Search Tree to Greater Sum Tree (Medium)
Given the root of a Binary Search Tree (BST), convert it to a Greater Tree
such that every key of the original BST is changed to the original key plus
the sum of all keys greater than the original key in BST. As a reminder, a
binary search tree is a tree that satisfies these constraints:
* The left subtree of a node contains only nodes with keys less than the
  node's key.
* The right subtree of a node contains only nodes with keys greater than the
  node's key.
* Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

Example 2:
Input: root = [0,null,1]
Output: [1,null,1]

Constraints:
* The number of nodes in the tree is in the range [1, 100].
* 0 <= Node.val <= 100
* All the values in the tree are unique.

Note: This question is the same as 538:
      https://leetcode.com/problems/convert-bst-to-greater-tree/*/

function bstToGst(root: TreeNode | null): TreeNode | null {
    const stack = [];
    let prefix = 0, node = root;
    while (node || stack.length)
        if (node) {
            stack.push(node);
            node = node.right;
        } else {
            node = stack.pop();
            node.val = prefix = node.val + prefix;
            node = node.left;
        }
    return root;
};


/*1051. Height Checker (Easy)
A school is trying to take an annual photo of all the students. The students
are asked to stand in a single file line in non-decreasing order by height.
Let this ordering be represented by the integer array expected where
expected[i] is the expected height of the ith student in line. You are given
an integer array heights representing the current order that the students
are standing in. Each heights[i] is the height of the ith student in line
(0-indexed). Return the number of indices where heights[i] != expected[i].

Example 1:
Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation: heights:  [1,1,4,2,1,3]
             expected: [1,1,1,2,3,4]
             Indices 2, 4, and 5 do not match.

Example 2:
Input: heights = [5,1,2,3,4]
Output: 5
Explanation: heights:  [5,1,2,3,4]
             expected: [1,2,3,4,5]
             All indices do not match.

Example 3:
Input: heights = [1,2,3,4,5]
Output: 0
Explanation: heights:  [1,2,3,4,5]
             expected: [1,2,3,4,5]
             All indices match.

Constraints:
* 1 <= heights.length <= 100
* 1 <= heights[i] <= 100*/

function heightChecker(heights: number[]): number {
    const freq = Array(101).fill(0);
    for (const x of heights) ++freq[x];
    let ans = 0, v = 0;
    for (const x of heights) {
        while (freq[v] == 0) ++v;
        if (x != v) ++ans;
        --freq[v];
    }
    return ans;
};


/*1052. Grumpy Bookstore Owner (Medium)
There is a bookstore owner that has a store open for n minutes. Every
minute, some number of customers enter the store. You are given an integer
array customers of length n where customers[i] is the number of the customer
that enters the store at the start of the ith minute and all those customers
leave after the end of that minute. On some minutes, the bookstore owner is
grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the
bookstore owner is grumpy during the ith minute, and is 0 otherwise. When
the bookstore owner is grumpy, the customers of that minute are not
satisfied, otherwise, they are satisfied. The bookstore owner knows a secret
technique to keep themselves not grumpy for minutes consecutive minutes, but
can only use it once. Return the maximum number of customers that can be
satisfied throughout the day.

Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3
             minutes. The maximum number of customers that can be
             satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Example 2:
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1

Constraints:
* n == customers.length == grumpy.length
* 1 <= minutes <= n <= 2 * 10^4
* 0 <= customers[i] <= 1000
* grumpy[i] is either 0 or 1.*/

function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
    let ans = 0, most = 0;
    for (let i = 0, ii = 0, val = 0; i < customers.length; ++i) {
        if (grumpy[i]) val += customers[i];
        else ans += customers[i];
        if (ii == i-minutes) {
            if (grumpy[ii]) val -= customers[ii];
            ++ii;
        }
        most = Math.max(most, val);
    }
    return ans + most;
};


/*1105. Filling Bookcase Shelves (Medium)
You are given an array books where books[i] = [thicknessi, heighti]
indicates the thickness and height of the ith book. You are also given an
integer shelfWidth. We want to place these books in order onto bookcase
shelves that have a total width shelfWidth. We choose some of the books to
place on this shelf such that the sum of their thickness is less than or
equal to shelfWidth, then build another level of the shelf of the bookcase
so that the total height of the bookcase has increased by the maximum height
of the books we just put down. We repeat this process until there are no
more books to place. Note that at each step of the above process, the order
of the books we place is the same order as the given sequence of books. For
example, if we have an ordered list of 5 books, we might place the first and
second book onto the first shelf, the third book on the second shelf, and
the fourth and fifth book on the last shelf. Return the minimum possible
height that the total bookshelf can be after placing shelves in this manner.

Example 1:
Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
Output: 6
Explanation: The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
             Notice that book number 2 does not have to be on the first
             shelf.

Example 2:
Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
Output: 4

Constraints:
* 1 <= books.length <= 1000
* 1 <= thicknessi <= shelfWidth <= 1000
* 1 <= heighti <= 1000*/

function minHeightShelves(books: number[][], shelfWidth: number): number {
    const n = books.length;
    const dp = Array(n+1).fill(Infinity);
    dp[n] = 0;
    for (let i = n-1; i >= 0; --i)
        for (let j = i, h = 0, w = 0; j < n; ++j) {
            w += books[j][0];
            if (w <= shelfWidth) {
                h = Math.max(h, books[j][1]);
                dp[i] = Math.min(dp[i], h + dp[j+1]);
            }
        }
    return dp[0];
};


/*1110. Delete Nodes And Return Forest (Medium)
Given the root of a binary tree, each node in the tree has a distinct value.
After deleting all nodes with a value in to_delete, we are left with a
forest (a disjoint union of trees). Return the roots of the trees in the
remaining forest. You may return the result in any order.

Example 1:
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]

Example 2:
Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]

Constraints:
* The number of nodes in the given tree is at most 1000.
* Each node has a distinct value between 1 and 1000.
* to_delete.length <= 1000
* to_delete contains distinct values between 1 and 1000.*/

function delNodes(root: TreeNode | null, to_delete: number[]): Array<TreeNode | null> {
    const tabu = new Set(to_delete);
    const ans = [];
    const stack: [[TreeNode, number]] = [[root, -1]];
    while (stack.length) {
        const [node, p] = stack.pop();
        if (node.left != null) {
            stack.push([node.left, node.val]);
            if (tabu.has(node.left.val)) node.left = null;
        }
        if (node.right != null) {
            stack.push([node.right, node.val]);
            if (tabu.has(node.right.val)) node.right = null;
        }
        if ((p == -1 || tabu.has(p)) && !tabu.has(node.val))
            ans.push(node);
    }
    return ans;
};


/*1122. Relative Sort Array (Easy)
Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all
elements in arr2 are also in arr1. Sort the elements of arr1 such that the
relative ordering of items in arr1 are the same as in arr2. Elements that do
not appear in arr2 should be placed at the end of arr1 in ascending order.

Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

Example 2:
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]

Constraints:
* 1 <= arr1.length, arr2.length <= 1000
* 0 <= arr1[i], arr2[i] <= 1000
* All the elements of arr2 are distinct.
* Each arr2[i] is in arr1.*/

function relativeSortArray(arr1: number[], arr2: number[]): number[] {
    const mp = new Map(), n = arr2.length;
    for (const [i, x] of arr2.entries())
        mp.set(x, i);
    return arr1.sort((x, y) => {
        const ix = mp.get(x) ?? n, iy = mp.get(y) ?? n;
        return ix !== iy ? ix - iy : x - y;
    });
};


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

function tribonacci(n: number): number {
    const dp = [0, 1, 1];
    for (let i = 3; i <= n; ++i)
        dp[i%3] = dp.reduce((x, y) => x+y, 0);
    return dp[n%3];
};


/*1140. Stone Game II (Medium)
Alice and Bob continue their games with piles of stones.  There are a number
of piles arranged in a row, and each pile has a positive integer number of
stones piles[i].  The objective of the game is to end with the most stones.
Alice and Bob take turns, with Alice starting first.  Initially, M = 1. On
each player's turn, that player can take all the stones in the first X
remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X). The game
continues until all the stones have been taken. Assuming Alice and Bob play
optimally, return the maximum number of stones Alice can get.

Example 1:
Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alice takes one pile at the beginning, Bob takes two piles,
              then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10
              piles in total. If Alice takes two piles at the beginning,
              then Bob can take all three piles left. In this case, Alice
              get 2 + 7 = 9 piles in total. So we return 10 since it's
              larger.

Example 2:
Input: piles = [1,2,3,4,5,100]
Output: 104

Constraints:
* 1 <= piles.length <= 100
* 1 <= piles[i] <= 10^4*/

function stoneGameII(piles: number[]): number {
    const n = piles.length;
    const prefix = Array(n+1).fill(0);
    for (const [i, x] of piles.entries())
        prefix[i+1] = prefix[i] + x;
    const dp = Array(n+1).fill(0).map(() => Array(n+1).fill(0));
    for (let i = n-1; i >= 0; --i)
        for (let j = 1; j <= n; ++j)
            for (let ii = i; ii < n && ii < i+2*j; ++ii) {
                const jj = Math.max(j, ii-i+1);
                const cand = prefix[n] - prefix[i] - dp[ii+1][jj];
                dp[i][j] = Math.max(dp[i][j], cand);
            }
    return dp[0][1];
};


/*1208. Get Equal Substrings Within Budget (Medium)
You are given two strings s and t of the same length and an integer maxCost.
You want to change s to t. Changing the ith character of s to ith character
of t costs |s[i] - t[i]| (i.e., the absolute difference between the ASCII
values of the characters). Return the maximum length of a substring of s
that can be changed to be the same as the corresponding substring of t with
a cost less than or equal to maxCost. If there is no substring from s that
can be changed to its corresponding substring from t, return 0.

Example 1:
Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
Explanation: "abc" of s can change to "bcd".
That costs 3, so the maximum length is 3.

Example 2:
Input: s = "abcd", t = "cdef", maxCost = 3
Output: 1
Explanation: Each character in s costs 2 to change to character in t,  so
             the maximum length is 1.

Example 3:
Input: s = "abcd", t = "acde", maxCost = 0
Output: 1
Explanation: You cannot make any change, so the maximum length is 1.

Constraints:
* 1 <= s.length <= 10^5
* t.length == s.length
* 0 <= maxCost <= 10^6
* s and t consist of only lowercase English letters.*/

function equalSubstring(s: string, t: string, maxCost: number): number {
    let ans = 0;
    for (let i = 0, ii = 0, val = 0; i < s.length; ++i) {
        val += Math.abs(s[i].charCodeAt(0) - t[i].charCodeAt(0));
        for (; val > maxCost; ++ii)
            val -= Math.abs(s[ii].charCodeAt(0) - t[ii].charCodeAt(0));
        ans = Math.max(ans, i-ii+1);
    }
    return ans;
};x


/*1219. Path with Maximum Gold (Medium)
In a gold mine grid of size m x n, each cell in this mine has an integer
representing the amount of gold in that cell, 0 if it is empty. Return the
maximum amount of gold you can collect under the conditions:
* Every time you are located in a cell you will collect all the gold in that
  cell.
* From your position, you can walk one step to the left, right, up, or down.
* You can't visit the same cell more than once.
* Never visit a cell with 0 gold.
* You can start and stop collecting gold from any position in the grid that
  has some gold.

Example 1:
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation: [[0,6,0],
              [5,8,7],
              [0,9,0]]
             Path to get the maximum gold, 9 -> 8 -> 7.

Example 2:
Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation: [[1,0,7],
              [2,0,6],
              [3,4,5],
              [0,3,0],
              [9,0,20]]
             Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m, n <= 15
* 0 <= grid[i][j] <= 100
* There are at most 25 cells containing gold.*/

function getMaximumGold(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;

    function fn(i, j) {
        let ans = 0,  v = grid[i][j];
        grid[i][j] = 0;
        for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]]) {
            if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj])
                ans = Math.max(ans, fn(ii, jj));
        }
        grid[i][j] = v;
        return grid[i][j] + ans;
    }

    let ans = 0;
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j])
                ans = Math.max(ans, fn(i, j));
    return ans;
};


/*1249. Minimum Remove to Make Valid Parentheses (Medium)
Given a string s of '(' , ')' and lowercase English characters. Your task is
to remove the minimum number of parentheses ( '(' or ')', in any positions )
so that the resulting parentheses string is valid and return any valid
string. Formally, a parentheses string is valid if and only if:
* It is the empty string, contains only lowercase characters, or
* It can be written as AB (A concatenated with B), where A and B are valid
  strings, or
* It can be written as (A), where A is a valid string.

Example 1:
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

Example 2:
Input: s = "a)b(c)d"
Output: "ab(c)d"

Example 3:
Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.

Constraints:
* 1 <= s.length <= 10^5
* s[i] is either'(' , ')', or lowercase English letter.*/

function minRemoveToMakeValid(s: string): string {
    const stack = [], vals = s.split('');
    for (const [i, ch] of vals.entries())
        if (ch == '(') stack.push(i);
        else if (ch == ')') {
            if (stack.length) stack.pop();
            else vals[i] = '';
        }
    while (stack.length)
        vals[stack.pop()] = '';
    return vals.join('');
};


/*1255. Maximum Score Words Formed by Letters (Hard)
Given a list of words, list of  single letters (might be repeating) and
score of every character. Return the maximum score of any valid set of words
formed by using the given letters (words[i] cannot be used two or more
times). It is not necessary to use all characters in letters and each letter
can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by
score[0], score[1], ... , score[25] respectively.

Example 1:
Input: words = ["dog","cat","dad","good"],
       letters = ["a","a","c","d","d","d","g","o","o"],
       score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation: Score  a=1, c=9, d=5, g=3, o=2
             Given letters, we can form the words "dad" (5+1+5) and "good"
             (3+2+2+5) with a score of 23. Words "dad" and "dog" only get a
             score of 21.

Example 2:
Input: words = ["xxxz","ax","bx","cx"],
       letters = ["z","a","b","c","x","x","x"],
       score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation: Score  a=4, b=4, c=4, x=5, z=10
             Given letters, we can form the words "ax" (4+5), "bx" (4+5) and
             "cx" (4+5) with a score of 27. Word "xxxz" only get a score of
             25.

Example 3:
Input: words = ["leetcode"],
       letters = ["l","e","t","c","o","d"],
       score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation: Letter "e" can only be used once.

Constraints:
* 1 <= words.length <= 14
* 1 <= words[i].length <= 15
* 1 <= letters.length <= 100
* letters[i].length == 1
* score.length == 26
* 0 <= score[i] <= 10
* words[i], letters[i] contains only lower case English letters.*/

function maxScoreWords(words: string[], letters: string[], score: number[]): number {
    const n = words.length;
    const freq = Array(26).fill(0);
    for (const ch of letters) ++freq[ch.charCodeAt(0)-97];

    function fn(i, v) {
        if (i == n) return v;
        let ans = fn(i+1, v), valid = true, val = 0;
        for (const ch of words[i]) {
            if (--freq[ch.charCodeAt(0)-97] < 0) valid = false;
            val += score[ch.charCodeAt(0)-97];
        }
        if (valid)
            ans = Math.max(ans, fn(i+1, v+val));
        for (const ch of words[i])
            ++freq[ch.charCodeAt(0)-97];
        return ans;
    }

    return fn(0, 0);
};


/*1289. Minimum Falling Path Sum II (Hard)
Given an n x n integer matrix grid, return the minimum sum of a falling path
with non-zero shifts. A falling path with non-zero shifts is a choice of
exactly one element from each row of grid such that no two elements chosen
in adjacent rows are in the same column.

Example 1:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: The possible falling paths are:
             [1,5,9], [1,5,7], [1,6,7], [1,6,8],
             [2,4,8], [2,4,9], [2,6,7], [2,6,8],
             [3,4,8], [3,4,9], [3,5,7], [3,5,9]
             The falling path with the smallest sum is [1,5,7], so the
             answer is 13.

Example 2:
Input: grid = [[7]]
Output: 7

Constraints:
* n == grid.length == grid[i].length
* 1 <= n <= 200
* -99 <= grid[i][j] <= 99*/

function minFallingPathSum(grid: number[][]): number {
    const n = grid.length;
    for (let i = 1; i < n; ++i) {
        const [m0, m1] = grid[i-1].slice().sort((x, y) => x-y).slice(0, 2);
        for (let j = 0; j < n; ++j)
            if (grid[i-1][j] != m0) grid[i][j] += m0;
            else grid[i][j] += m1;
    }
    return Math.min(...grid[n-1]);
};


/*1310. XOR Queries of a Subarray (Medium)
You are given an array arr of positive integers. You are also given the
array queries where queries[i] = [lefti, righti]. For each query i compute
the XOR of elements from lefti to righti (that is, arr[lefti] XOR
arr[lefti + 1] XOR ... XOR arr[righti] ). Return an array answer where
answer[i] is the answer to the ith query.

Example 1:
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8]
Explanation: The binary representation of the elements in the array are:
             1 = 0001
             3 = 0011
             4 = 0100
             8 = 1000
             The XOR values for queries are:
             [0,1] = 1 xor 3 = 2
             [1,2] = 3 xor 4 = 7
             [0,3] = 1 xor 3 xor 4 xor 8 = 14
             [3,3] = 8

Example 2:
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]

Constraints:
* 1 <= arr.length, queries.length <= 3 * 10^4
* 1 <= arr[i] <= 10^9
* queries[i].length == 2
* 0 <= lefti <= righti < arr.length*/

function xorQueries(arr: number[], queries: number[][]): number[] {
    const prefix = [0];
    for (const [i, x] of arr.entries())
        prefix.push(prefix[i] ^ x);
    const ans = [];
    for (const [lo, hi] of queries)
        ans.push(prefix[lo] ^ prefix[hi+1]);
    return ans;
};


/*1325. Delete Leaves With a Given Value (Medium)
Given a binary tree root and an integer target, delete all the leaf nodes
with value target. Note that once you delete a leaf node with value target,
if its parent node becomes a leaf node and has the value target, it should
also be deleted (you need to continue doing that until you cannot).

Example 1:
Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
Explanation: Leaf nodes in green with value (target = 2) are removed
             (Picture in left). After removing, new nodes become leaf nodes
             with value (target = 2) (Picture in center).

Example 2:
Input: root = [1,3,3,3,2], target = 3
Output: [1,3,null,null,2]

Example 3:
Input: root = [1,2,null,2,null,2], target = 2
Output: [1]
Explanation: Leaf nodes in green with value (target = 2) are removed at each
             step.

Constraints:
* The number of nodes in the tree is in the range [1, 3000].
* 1 <= Node.val, target <= 1000*/

function removeLeafNodes(root: TreeNode | null, target: number): TreeNode | null {
    if (root) {
        root.left = removeLeafNodes(root.left, target);
        root.right = removeLeafNodes(root.right, target);
        if (root.left || root.right || root.val != target) return root;
    }
    return null;
};


/*1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance (Medium)
There are n cities numbered from 0 to n-1. Given the array edges where
edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted
edge between cities fromi and toi, and given the integer distanceThreshold.
Return the city with the smallest number of cities that are reachable
through some path and whose distance is at most distanceThreshold, If there
are multiple such cities, return the city with the greatest number. Notice
that the distance of a path connecting cities i and j is equal to the sum of
the edges' weights along that path.

Example 1:
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. The neighboring cities at
             a distanceThreshold = 4 for each city are:
             City 0 -> [City 1, City 2]
             City 1 -> [City 0, City 2, City 3]
             City 2 -> [City 0, City 1, City 3]
             City 3 -> [City 1, City 2]
             Cities 0 and 3 have 2 neighboring cities at a
             distanceThreshold = 4, but we have to return city 3 since it
             has the greatest number.

Example 2:
Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The figure above describes the graph. The neighboring cities at
             a distanceThreshold = 2 for each city are:
             City 0 -> [City 1]
             City 1 -> [City 0, City 4]
             City 2 -> [City 3, City 4]
             City 3 -> [City 2, City 4]
             City 4 -> [City 1, City 2, City 3]
             The city 0 has 1 neighboring city at a distanceThreshold = 2.

Constraints:
* 2 <= n <= 100
* 1 <= edges.length <= n * (n - 1) / 2
* edges[i].length == 3
* 0 <= fromi < toi < n
* 1 <= weighti, distanceThreshold <= 10^4
* All pairs (fromi, toi) are distinct.*/

function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
    const dist = Array(n).fill(0).map(() => Array(n).fill(Infinity));
    for (let i = 0; i < n; ++i) dist[i][i] = 0;
    for (const [i, j, w] of edges) dist[i][j] = dist[j][i] = w;
    for (let k = 0; k < n; ++k)
        for (let i = 0; i < n; ++i)
            for (let j = 0; j < n; ++j)
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    let ans = 0, ref = Infinity;
    for (const [i, row] of dist.entries()) {
        const cnt = row.reduce((s, d) => s + (d <= distanceThreshold), 0);
        if (cnt <= ref) [ans, ref] = [i, cnt];
    }
    return ans;
};


/*1367. Linked List in Binary Tree (Medium)
Given a binary tree root and a linked list with head as the first node.
Return True if all the elements in the linked list starting from the head
correspond to some downward path connected in the binary tree otherwise
return False. In this context downward path means a path that starts at some
node and goes downwards.

Example 1:
Input: head = [4,2,8],
       root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.

Example 2:
Input: head = [1,4,2,6],
       root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true

Example 3:
Input: head = [1,4,2,6,8],
       root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the
             elements of the linked list from head.

Constraints:
* The number of nodes in the tree will be in the range [1, 2500].
* The number of nodes in the list will be in the range [1, 100].
* 1 <= Node.val <= 100 for each node in the linked list and binary tree.*/

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    const pattern = [];
    for (let node = head; node; node = node.next)
        pattern.push(node.val);
    const lps = [0];
    let k = 0;
    for (let i = 1, k = 0; i < pattern.length; ++i) {
        while (k && pattern[k] != pattern[i]) k = lps[k-1];
        if (pattern[k] == pattern[i]) ++k;
        lps.push(k);
    }

    function dfs(node, k) {
        if (k == pattern.length) return true;
        if (!node) return false;
        while (k && pattern[k] != node.val) k = lps[k-1];
        if (pattern[k] == node.val) ++k;
        return dfs(node.left, k) || dfs(node.right, k);
    };

    return dfs(root, 0);
};


/*1371. Find the Longest Substring Containing Vowels in Even Counts (Medium)
Given the string s, return the size of the longest substring containing each
vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must
appear an even number of times.

Example 1:
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two
             each of the vowels: e, i and o and zero of the vowels: a and u.

Example 2:
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.

Example 3:
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because
             all vowels: a, e, i, o and u appear zero times.

Constraints:
* 1 <= s.length <= 5 x 10^5
* s contains only lowercase English letters.*/

function findTheLongestSubstring(s: string): number {
    let ans = 0, mask = 0;
    const pos = Array(1<<5).fill(-2); pos[0] = -1;
    Array.from(s).forEach((ch, i) => {
        const k = "aeiou".indexOf(ch);
        if (k >= 0) mask ^= 1<<k;
        if (pos[mask] >= -1) ans = Math.max(ans, i-pos[mask]);
        else pos[mask] = i;
    });
    return ans;
};


/*1395. Count Number of Teams (Medium)
There are n soldiers standing in a line. Each soldier is assigned a unique
rating value. You have to form a team of 3 soldiers amongst them under the
following rules:
* Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j],
  rating[k]).
* A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] >
  rating[j] > rating[k]) where (0 <= i < j < k < n).
Return the number of teams you can form given the conditions. (soldiers can
be part of multiple teams).

Example 1:
Input: rating = [2,5,3,4,1]
Output: 3
Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1),
             (5,3,1).

Example 2:
Input: rating = [2,1,3]
Output: 0
Explanation: We can't form any team given the conditions.

Example 3:
Input: rating = [1,2,3,4]
Output: 4

Constraints:
* n == rating.length
* 3 <= n <= 1000
* 1 <= rating[i] <= 10^5
* All the integers in rating are unique.*/

function numTeams(rating: number[]): number {
    const n = rating.length;
    const mp = new Map();
    for (const [i, x] of rating.slice().sort((x, y) => x-y).entries())
        mp.set(x, i);
    const vals = rating.map(x => mp.get(x));

    function fn(vals) {
        let ans = 0;
        const mark = new Fenwick(n), pair = new Fenwick(n);
        for (const x of vals) {
            ans += pair.query(x-1);
            mark.add(x, 1);
            pair.add(x, mark.query(x-1));
        }
        return ans;
    };

    return fn(vals) + fn(vals.reverse());
};


/*1404. Number of Steps to Reduce a Number in Binary Representation to One (Medium)
Given the binary representation of an integer as a string s, return the
number of steps to reduce it to 1 under the following rules:
* If the current number is even, you have to divide it by 2.
* If the current number is odd, you have to add 1 to it.
It is guaranteed that you can always reach one for all test cases.

Example 1:
Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
             Step 1) 13 is odd, add 1 and obtain 14.
             Step 2) 14 is even, divide by 2 and obtain 7.
             Step 3) 7 is odd, add 1 and obtain 8.
             Step 4) 8 is even, divide by 2 and obtain 4.
             Step 5) 4 is even, divide by 2 and obtain 2.
             Step 6) 2 is even, divide by 2 and obtain 1.

Example 2:
Input: s = "10"
Output: 1
Explanation: "10" corressponds to number 2 in their decimal representation.
             Step 1) 2 is even, divide by 2 and obtain 1.

Example 3:
Input: s = "1"
Output: 0

Constraints:
* 1 <= s.length <= 500
* s consists of characters '0' or '1'
* s[0] == '1'*/

function numSteps(s: string): number {
    let ans = 0, one = 0;
    for (let i = s.length-1; i > 0; --i)
        if (s[i] == '1') {
            ans += 2-one;
            one = 1;
        } else ans += 1+one;
    return ans + one;
};


/*1442. Count Triplets That Can Form Two Arrays of Equal XOR (Medium)
Given an array of integers arr. We want to select three indices i, j and k
where (0 <= i < j <= k < arr.length). Let's define a and b as follows:
* a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
* b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
Note that ^ denotes the bitwise-xor operation. Return the number of triplets
(i, j and k) Where a == b.

Example 1:
Input: arr = [2,3,1,6,7]
Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)

Example 2:
Input: arr = [1,1,1,1,1]
Output: 10

Constraints:
* 1 <= arr.length <= 300
* 1 <= arr[i] <= 10^8*/

function countTriplets(arr: number[]): number {
    let ans = 0, prefix = 0, s = 0, c = 0;
    const mp = new Map();
    mp.set(0, [0, 1]);
    for (const [i, x] of arr.entries()) {
        prefix ^= x;
        [s, c] = mp.get(prefix) ?? [0, 0];
        ans += c*i - s;
        mp.set(prefix, [s+i+1, c+1]);
    }
    return ans;
};


/*1460. Make Two Arrays Equal by Reversing Subarrays (Easy)
You are given two integer arrays of equal length target and arr. In one
step, you can select any non-empty subarray of arr and reverse it. You are
allowed to make any number of steps. Return true if you can make arr equal
to target or false otherwise.

Example 1:
Input: target = [1,2,3,4], arr = [2,4,1,3]
Output: true
Explanation: You can follow the next steps to convert arr to target:
             1- Reverse subarray [2,4,1], arr becomes [1,4,2,3]
             2- Reverse subarray [4,2], arr becomes [1,2,4,3]
             3- Reverse subarray [4,3], arr becomes [1,2,3,4]
             There are multiple ways to convert arr to target, this is not
             the only way to do so.

Example 2:
Input: target = [7], arr = [7]
Output: true
Explanation: arr is equal to target without any reverses.

Example 3:
Input: target = [3,7,9], arr = [3,7,11]
Output: false
Explanation: arr does not have value 9 and it can never be converted to
             target.

Constraints:
* target.length == arr.length
* 1 <= target.length <= 1000
* 1 <= target[i] <= 1000
* 1 <= arr[i] <= 1000*/

function canBeEqual(target: number[], arr: number[]): boolean {
    const freq = new Map();
    for (const x of target) freq.set(x, (freq.get(x) ?? 0) + 1);
    for (const x of arr) freq.set(x, (freq.get(x) ?? 0) - 1);
    return [...freq.values()].every(x => x == 0);
};


/*1482. Minimum Number of Days to Make m Bouquets (Medium)
You are given an integer array bloomDay, an integer m and an integer k. You
want to make m bouquets. To make a bouquet, you need to use k adjacent
flowers from the garden. The garden consists of n flowers, the ith flower
will bloom in the bloomDay[i] and then can be used in exactly one bouquet.
Return the minimum number of days you need to wait to be able to make m
bouquets from the garden. If it is impossible to make m bouquets return -1.

Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means
             flower bloomed and _ means flower did not bloom in the garden.
             We need 3 bouquets each should contain 1 flower.
             After day 1: [x, _, _, _, _]   // we can only make one bouquet.
             After day 2: [x, _, _, _, x]   // we can only make two bouquets.
             After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The
                                            // answer is 3.

Example 2:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6
             flowers. We only have 5 flowers so it is impossible to get the
             needed bouquets and we return -1.

Example 3:
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers. Here is the
             garden after the 7 and 12 days:
             After day 7: [x, x, x, x, _, x, x]
             We can make one bouquet of the first three flowers that
             bloomed. We cannot make another bouquet from the last three
             flowers that bloomed because they are not adjacent.
             After day 12: [x, x, x, x, x, x, x]
             It is obvious that we can make two bouquets in different ways.

Constraints:
* bloomDay.length == n
* 1 <= n <= 10^5
* 1 <= bloomDay[i] <= 10^9
* 1 <= m <= 10^6
* 1 <= k <= n*/

function minDays(bloomDay: number[], m: number, k: number): number {
    if (bloomDay.length < m*k) return -1;
    let lo = 0, hi = Math.max(...bloomDay);
    while (lo < hi) {
        const mid = lo + Math.floor((hi-lo)/2);
        let bouquet = 0, flower = 0;
        for (const x of bloomDay) {
            if (x <= mid) ++flower;
            else flower = 0;
            if (flower == k) {
                flower = 0;
                ++bouquet;
            }
        }
        if (bouquet >= m) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};


/*1508. Range Sum of Sorted Subarray Sums (Medium)
You are given the array nums consisting of n positive integers. You computed
the sum of all non-empty continuous subarrays from the array and then sorted
them in non-decreasing order, creating a new array of n * (n + 1) / 2
numbers. Return the sum of the numbers from index left to index right
(indexed from 1), inclusive, in the new array. Since the answer can be a
huge number return it modulo 10^9 + 7.

Example 1:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After
             sorting them in non-decreasing order we have the new array
             [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from
             index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.

Example 2:
Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array
             [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from
             index le = 3 to ri = 4 is 3 + 3 = 6.

Example 3:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50

Constraints:
* n == nums.length
* 1 <= nums.length <= 1000
* 1 <= nums[i] <= 100
* 1 <= left <= right <= n * (n + 1) / 2*/

function rangeSum(nums: number[], n: number, left: number, right: number): number {
    const pq = new PriorityQueue({compare : (x, y) => x[0] - y[0]});
    for (const [i, x] of nums.entries())
        pq.enqueue([x, i]);
    let ans = 0;
    for (let k = 1; k <= right; ++k) {
        const [x, i] = pq.dequeue();
        if (k >= left) ans = (ans + x) % 1_000_000_007;
        if (i+1 < n)
            pq.enqueue([x + nums[i+1], i+1]);
    }
    return ans;
};


/*1509. Minimum Difference Between Largest and Smallest Value in Three Moves (Medium)
You are given an integer array nums. In one move, you can choose one element
of nums and change it to any value. Return the minimum difference between
the largest and smallest value of nums after performing at most three moves.

Example 1:
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
             In the first move, change 2 to 3. nums becomes [5,3,3,4].
             In the second move, change 4 to 3. nums becomes [5,3,3,3].
             In the third move, change 5 to 3. nums becomes [3,3,3,3].
             After performing 3 moves, the difference between the minimum
             and maximum is 3 - 3 = 0.

Example 2:
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: We can make at most 3 moves.
             In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
             In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
             In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
             After performing 3 moves, the difference between the minimum
             and maximum is 1 - 0 = 1. It can be shown that there is no way
             to make the difference 0 in 3 moves.

Example 3:
Input: nums = [3,100,20]
Output: 0
Explanation: We can make at most 3 moves.
             In the first move, change 100 to 7. nums becomes [3,7,20].
             In the second move, change 20 to 7. nums becomes [3,7,7].
             In the third move, change 3 to 7. nums becomes [7,7,7].
             After performing 3 moves, the difference between the minimum
             and maximum is 7 - 7 = 0.

Constraints:
* 1 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9*/

function minDifference(nums: number[]): number {
    nums.sort((x, y) => x-y);
    let ans = Infinity;
    for (let i = 0, n = nums.length; i < 4 && i < n; ++i) {
        const j = Math.max(i, n-4+i);
        ans = Math.min(ans, nums[j]-nums[i]);
    }
    return ans;
};


/*1514. Path with Maximum Probability (Medium)
You are given an undirected weighted graph of n nodes (0-indexed),
represented by an edge list where edges[i] = [a, b] is an undirected edge
connecting the nodes a and b with a probability of success of traversing
that edge succProb[i]. Given two nodes start and end, find the path with the
maximum probability of success to go from start to end and return its
success probability. If there is no path from start to end, return 0. Your
answer will be accepted if it differs from the correct answer by at most
1e-5.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability
             of success = 0.2 and the other has 0.5 * 0.5 = 0.25.

Example 2:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000

Example 3:
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.

Constraints:
* 2 <= n <= 10^4
* 0 <= start, end < n
* start != end
* 0 <= a, b < n
* a != b
* 0 <= succProb.length == edges.length <= 2*10^4
* 0 <= succProb[i] <= 1
* There is at most one edge between every two nodes.*/

function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {
    const graph = Array(n).fill(0).map(() => []);
    for (const [i, [u, v]] of edges.entries()) {
        graph[u].push([v, succProb[i]]);
        graph[v].push([u, succProb[i]]);
    }
    const pq = new PriorityQueue({ compare : (x, y) => y[0] - x[0] }); pq.enqueue([1, start_node]);
    const dist = Array(n).fill(0); dist[start_node] = 1;
    while (pq.size()) {
        const [p, u] = pq.dequeue();
        if (u === end_node) return p;
        for (const [v, x] of graph[u]) {
            if (dist[v] < p*x) {
                dist[v] = p*x;
                pq.enqueue([p*x, v]);
            }
        }
    }
    return 0;
};


/*1518. Water Bottles (Easy)
There are numBottles water bottles that are initially full of water. You can
exchange numExchange empty water bottles from the market with one full water
bottle. The operation of drinking a full water bottle turns it into an empty
bottle. Given the two integers numBottles and numExchange, return the
maximum number of water bottles you can drink.

Example 1:
Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
             Number of water bottles you can drink: 9 + 3 + 1 = 13.

Example 2:
Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle.
             Number of water bottles you can drink: 15 + 3 + 1 = 19.

Constraints:
* 1 <= numBottles <= 100
* 2 <= numExchange <= 100*/

function numWaterBottles(numBottles: number, numExchange: number): number {
    let ans = 0, empty = 0;
    while (numBottles) {
        ans += numBottles;
        const total = numBottles + empty;
        numBottles = Math.floor(total / numExchange);
        empty = total % numExchange;
    }
    return ans;
};


/*1530. Number of Good Leaf Nodes Pairs (Medium)
You are given the root of a binary tree and an integer distance. A pair of
two different leaf nodes of a binary tree is said to be good if the length
of the shortest path between them is less than or equal to distance. Return
the number of good leaf node pairs in the tree.

Example 1:
Input: root = [1,2,3,null,4], distance = 3
Output: 1
Explanation: The leaf nodes of the tree are 3 and 4 and the length of the
             shortest path between them is 3. This is the only good pair.

Example 2:
Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The
             pair [4,6] is not good because the length of ther shortest path
             between them is 4.

Example 3:
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
Explanation: The only good pair is [2,5].

Constraints:
* The number of nodes in the tree is in the range [1, 2^10].
* 1 <= Node.val <= 100
* 1 <= distance <= 10*/

function countPairs(root: TreeNode | null, distance: number): number {
    let ans = 0;

    function fn(node) {
        if (!node) return [];
        if (!node.left && !node.right) return [0];
        const left = fn(node.left), right = fn(node.right);
        for (let i = 0, j = right.length-1; i < left.length; ++i) {
            for (; 0 <= j && left[i] + right[j] + 2 > distance; --j);
            ans += j+1;
        }
        const out = [];
        for (let i = 0, j = 0, m = left.length, n = right.length; i < m || j < n; )
            if (j == n || i < m && left[i] < right[j])
                out.push(left[i++]+1);
            else
                out.push(right[j++]+1);
        return out;
    }

    fn(root);
    return ans;
};


/*1544. Make The String Great (Easy)
Given a string s of lower and upper case English letters. A good string is a
string which doesn't have two adjacent characters s[i] and s[i + 1] where:
* 0 <= i <= s.length - 2
* s[i] is a lower-case letter and s[i + 1] is the same letter but in
  upper-case or vice-versa.
To make the string good, you can choose two adjacent characters that make
the string bad and remove them. You can keep doing this until the string
becomes good. Return the string after making it good. The answer is
guaranteed to be unique under the given constraints. Notice that an empty
string is also good.

Example 1:
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will
             result "leEeetcode" to be reduced to "leetcode".

Example 2:
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same
             answer. For example:
             "abBAcC" --> "aAcC" --> "cC" --> ""
             "abBAcC" --> "abBA" --> "aA" --> ""

Example 3:
Input: s = "s"
Output: "s"

Constraints:
* 1 <= s.length <= 100
* s contains only lower and upper case English letters.*/

function makeGood(s: string): string {
    const ans = [];
    for (const ch of s)
        if (ans.length && (ans[ans.length-1].charCodeAt(0) ^ 32) == ch.charCodeAt(0)) ans.pop();
        else ans.push(ch);
    return ans.join('');
};


/*1550. Three Consecutive Odds (Easy)
Given an integer array arr, return true if there are three consecutive odd
numbers in the array. Otherwise, return false.

Example 1:
Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.

Example 2:
Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.

Constraints:
* 1 <= arr.length <= 1000
* 1 <= arr[i] <= 1000*/

function threeConsecutiveOdds(arr: number[]): boolean {
    let cnt = 0;
    for (const x of arr) {
        if (x & 1) ++cnt;
        else cnt = 0;
        if (cnt == 3) return true;
    }
    return false;
};


/*1552. Magnetic Force Between Two Balls (Medium)
In the universe Earth C-137, Rick discovered a special form of magnetic
force between two balls if they are put in his new invented basket. Rick has
n empty baskets, the ith basket is at position[i], Morty has m balls and
needs to distribute the balls into the baskets such that the minimum
magnetic force between any two balls is maximum. Rick stated that magnetic
force between two different balls at positions x and y is |x - y|. Given the
integer array position and the integer m. Return the required force.

Example 1:
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the
             magnetic force between ball pairs [3, 3, 6]. The minimum
             magnetic force is 3. We cannot achieve a larger minimum
             magnetic force than 3.

Example 2:
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: We can use baskets 1 and 1000000000.

Constraints:
* n == position.length
* 2 <= n <= 10^5
* 1 <= position[i] <= 10^9
* All integers in position are distinct.
* 2 <= m <= position.length*/

function maxDistance(position: number[], m: number): number {
    position.sort((x, y) => x-y);
    let lo = 1, hi = position[position.length-1] - position[0];
    while (lo < hi) {
        const mid = lo + hi + 1 >> 1;
        let cnt = 0, prev = -Infinity;
        for (const x of position)
            if (x - prev >= mid) {
                ++cnt;
                prev = x;
            }
        if (cnt >= m) lo = mid;
        else hi = mid-1;
    }
    return lo;
};


/*1568. Minimum Number of Days to Disconnect Island (Hard)
You are given an m x n binary grid grid where 1 represents land and 0
represents water. An island is a maximal 4-directionally (horizontal or
vertical) connected group of 1's. The grid is said to be connected if we
have exactly one island, otherwise is said disconnected. In one day, we are
allowed to change any single land cell (1) into a water cell (0). Return the
minimum number of days to disconnect the grid.

Example 1:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
Explanation: We need at least 2 days to get a disconnected grid. Change land
             grid[1][1] and grid[0][2] to water and get 2 disconnected
             island.

Example 2:
Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0
             islands.

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m, n <= 30
* grid[i][j] is either 0 or 1.*/

function minDays(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;

    function dfs(grid) {
        let ans = 0;
        const seen = Array(m).fill(0).map(() => Array(n).fill(false));
        for (let x = 0; x < m; ++x)
            for (let y = 0; y < n; ++y)
                if (grid[x][y] && !seen[x][y]) {
                    ++ans;
                    seen[x][y] = true;
                    const stack = [[x, y]];
                    while (stack.length) {
                        const [i, j] = stack.pop();
                        for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
                            if (0 <= ii && ii < m && 0 <= jj && jj < n && grid[ii][jj] && !seen[ii][jj]) {
                                seen[ii][jj] = true;
                                stack.push([ii, jj]);
                            }
                    }
                }
        return ans;
    }

    if (dfs(grid) != 1) return 0;
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j]) {
                grid[i][j] = 0;
                if (dfs(grid) != 1) return 1;
                grid[i][j] = 1;
            }
    return 2;
};


/*1598. Crawler Log Folder (Easy)
The Leetcode file system keeps a log each time some user performs a change
folder operation. The operations are described below:
* "../" : Move to the parent folder of the current folder. (If you are
  already in the main folder, remain in the same folder).
* "./" : Remain in the same folder.
* "x/" : Move to the child folder named x (This folder is guaranteed to
  always exist).
You are given a list of strings logs where logs[i] is the operation
performed by the user at the ith step. The file system starts in the main
folder, then the operations in logs are performed. Return the minimum number
of operations needed to go back to the main folder after the change folder
operations.

Example 1:
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: Use this change folder operation "../" 2 times and go back to
             the main folder.

Example 2:
Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3

Example 3:
Input: logs = ["d1/","../","../","../"]
Output: 0

Constraints:
* 1 <= logs.length <= 10^3
* 2 <= logs[i].length <= 10
* logs[i] contains lowercase English letters, digits, '.', and '/'.
* logs[i] follows the format described in the statement.
* Folder names consist of lowercase English letters and digits.*/

function minOperations(logs: string[]): number {
    let ans = 0;
    for (const log of logs)
        if (log === "./") continue;
        else if (log === "../") ans = Math.max(0, --ans);
        else ++ans;
    return ans;
};


/*1609. Even Odd Tree (Medium)
A binary tree is named Even-Odd if it meets the following conditions:
* The root of the binary tree is at level index 0, its children are at level
  index 1, their children are at level index 2, etc.
* For every even-indexed level, all nodes at the level have odd integer
  values in strictly increasing order (from left to right).
* For every odd-indexed level, all nodes at the level have even integer
  values in strictly decreasing order (from left to right).
Given the root of a binary tree, return true if the binary tree is Even-Odd,
otherwise return false.

Example 1:
Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
             Level 0: [1]
             Level 1: [10,4]
             Level 2: [3,7,9]
             Level 3: [12,8,6,2]
             Since levels 0 and 2 are all odd and increasing and levels 1
             and 3 are all even and decreasing, the tree is Even-Odd.

Example 2:
Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
             Level 0: [5]
             Level 1: [4,2]
             Level 2: [3,3,7]
             Node values in level 2 must be in strictly increasing order, so
             the tree is not Even-Odd.

Example 3:
Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values in the level 1 should be even integers.

Constraints:
* The number of nodes in the tree is in the range [1, 10^5].
* 1 <= Node.val <= 10^6*/

function isEvenOddTree(root: TreeNode | null): boolean {
    const q = [root];
    for (let level = 0; q.length; level ^= 1) {
        let prev = [-Infinity, Infinity][level];
        for (let sz = q.length; sz; --sz) {
            const node = q.shift();
            if ((node.val & 1) == level || !level && prev >= node.val || level && prev <= node.val) return false;
            prev = node.val;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return true;
};


/*1614. Maximum Nesting Depth of the Parentheses (Easy)
A string is a valid parentheses string (denoted VPS) if it meets one of the
following:
* It is an empty string "", or a single character not equal to "(" or ")",
* It can be written as AB (A concatenated with B), where A and B are VPS's,
  or
* It can be written as (A), where A is a VPS.
We can similarly define the nesting depth depth(S) of any VPS S as follows:
* depth("") = 0
* depth(C) = 0, where C is a string with a single character not equal to "("
  or ")".
* depth(A + B) = max(depth(A), depth(B)), where A and B are VPS's.
* depth("(" + A + ")") = 1 + depth(A), where A is a VPS.
For example, "", "()()", and "()(()())" are VPS's (with nesting depths 0, 1,
and 2), and ")(" and "(()" are not VPS's. Given a VPS represented as string
s, return the nesting depth of s.

Example 1:
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Digit 8 is inside of 3 nested parentheses in the string.

Example 2:
Input: s = "(1)+((2))+(((3)))"
Output: 3

Constraints:
* 1 <= s.length <= 100
* s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'.
* It is guaranteed that parentheses expression s is a VPS.*/

function maxDepth(s: string): number {
    let ans = 0, val = 0;
    for (const ch of s)
        if (ch == '(') ans = Math.max(ans, ++val);
        else if (ch == ')') --val;
    return ans;
};


/*1636. Sort Array by Increasing Frequency (Easy)
Given an array of integers nums, sort the array in increasing order based on
the frequency of the values. If multiple values have the same frequency,
sort them in decreasing order. Return the sorted array.

Example 1:
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has
             a frequency of 3.

Example 2:
Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: '2' and '3' both have a frequency of 2, so they are sorted in
             decreasing order.

Example 3:
Input: nums = [-1,1,-6,4,5,-6,1,4,1]
Output: [5,-1,4,4,-6,-6,1,1,1]

Constraints:
* 1 <= nums.length <= 100
* -100 <= nums[i] <= 100*/

function frequencySort(nums: number[]): number[] {
    const freq = new Map();
    for (const x of nums)
        freq.set(x, 1 + (freq.get(x) ?? 0));
    nums.sort((x, y) => freq.get(x) != freq.get(y) ? freq.get(x) - freq.get(y) : y - x);
    return nums;
};


/*1653. Minimum Deletions to Make String Balanced (Medium)
You are given a string s consisting only of characters 'a' and 'b'. You can
delete any number of characters in s to make s balanced. s is balanced if
there is no pair of indices (i,j) such that i < j and s[i] = 'b' and
s[j]= 'a'. Return the minimum number of deletions needed to make s balanced.

Example 1:
Input: s = "aababbab"
Output: 2
Explanation: You can either:
             - Delete the characters at 0-indexed positions 2 and 6
               ("aababbab" -> "aaabbb"), or
             - Delete the characters at 0-indexed positions 3 and 6
               ("aababbab" -> "aabbbb").

Example 2:
Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.

Constraints:
* 1 <= s.length <= 10^5
* s[i] is 'a' or 'b'.*/

function minimumDeletions(s: string): number {
    let ans = 0, prefix = 0;
    for (const ch of s)
        if (ch == 'b') ++prefix;
        else ans = Math.min(ans+1, prefix);
    return ans;
};


/*1684. Count the Number of Consistent Strings (Easy)
You are given a string allowed consisting of distinct characters and an
array of strings words. A string is consistent if all characters in the
string appear in the string allowed. Return the number of consistent strings
in the array words.

Example 1:
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain
             characters 'a' and 'b'.

Example 2:
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.

Example 3:
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.

Constraints:
* 1 <= words.length <= 10^4
* 1 <= allowed.length <= 26
* 1 <= words[i].length <= 10
* The characters in allowed are distinct.
* words[i] and allowed contain only lowercase English letters.*/

function countConsistentStrings(allowed: string, words: string[]): number {
    let ans = 0;
    for (const word of words)
        if (word.split('').every(ch => allowed.indexOf(ch) >= 0)) ++ans;
    return ans
};


/*1700. Number of Students Unable to Eat Lunch (Easy)
The school cafeteria offers circular and square sandwiches at lunch break,
referred to by numbers 0 and 1 respectively. All students stand in a queue.
Each student either prefers square or circular sandwiches. The number of
sandwiches in the cafeteria is equal to the number of students. The
sandwiches are placed in a stack. At each step:
* If the student at the front of the queue prefers the sandwich on the top
  of the stack, they will take it and leave the queue.
* Otherwise, they will leave it and go to the queue's end.
This continues until none of the queue students want to take the top
sandwich and are thus unable to eat. You are given two integer arrays
students and sandwiches where sandwiches[i] is the type of the ith sandwich
in the stack (i = 0 is the top of the stack) and students[j] is the
preference of the jth student in the initial queue (j = 0 is the front of
the queue). Return the number of students that are unable to eat.

Example 1:
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0
Explanation: - Front student leaves the top sandwich and returns to the end
               of the line making students = [1,0,0,1].
             - Front student leaves the top sandwich and returns to the end
               of the line making students = [0,0,1,1].
             - Front student takes the top sandwich and leaves the line
               making students = [0,1,1] and sandwiches = [1,0,1].
             - Front student leaves the top sandwich and returns to the end
               of the line making students = [1,1,0].
             - Front student takes the top sandwich and leaves the line
               making students = [1,0] and sandwiches = [0,1].
             - Front student leaves the top sandwich and returns to the end
               of the line making students = [0,1].
             - Front student takes the top sandwich and leaves the line
               making students = [1] and sandwiches = [1].
             - Front student takes the top sandwich and leaves the line
               making students = [] and sandwiches = [].
             Hence all students are able to eat.

Example 2:
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3

Constraints:
* 1 <= students.length, sandwiches.length <= 100
* students.length == sandwiches.length
* sandwiches[i] is 0 or 1.
* students[i] is 0 or 1.*/

function countStudents(students: number[], sandwiches: number[]): number {
    const n = sandwiches.length;
    let prefix = students.reduce((x, y) => (x+y));
    for (const [i, x] of sandwiches.entries()) {
        if (x && prefix == 0 || x == 0 && prefix == n-i) return n-i;
        prefix -= x;
    }
    return 0;
};


/*1701. Average Waiting Time (Medium)
There is a restaurant with a single chef. You are given an array customers,
where customers[i] = [arrivali, timei]:
* arrivali is the arrival time of the ith customer. The arrival times are
  sorted in non-decreasing order.
* timei is the time needed to prepare the order of the ith customer.
When a customer arrives, he gives the chef his order, and the chef starts
preparing it once he is idle. The customer waits till the chef finishes
preparing his order. The chef does not prepare food for more than one
customer at a time. The chef prepares food for customers in the order they
were given in the input. Return the average waiting time of all customers.
Solutions within 10-5 from the actual answer are considered accepted.

Example 1:
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation: 1) The first customer arrives at time 1, the chef takes his
                order and starts preparing it immediately at time 1, and
                finishes at time 3, so the waiting time of the first
                customer is 3 - 1 = 2.
             2) The second customer arrives at time 2, the chef takes his
                order and starts preparing it at time 3, and finishes at
                time 8, so the waiting time of the second customer is
                8 - 2 = 6.
             3) The third customer arrives at time 4, the chef takes his
                order and starts preparing it at time 8, and finishes at
                time 11, so the waiting time of the third customer is
                11 - 4 = 7.
             So the average waiting time = (2 + 6 + 7) / 3 = 5.

Example 2:
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation: 1) The first customer arrives at time 5, the chef takes his
                order and starts preparing it immediately at time 5, and
                finishes at time 7, so the waiting time of the first
                customer is 7 - 5 = 2.
             2) The second customer arrives at time 5, the chef takes his
                order and starts preparing it at time 7, and finishes at
                time 11, so the waiting time of the second customer is
                11 - 5 = 6.
             3) The third customer arrives at time 10, the chef takes his
                order and starts preparing it at time 11, and finishes at
                time 14, so the waiting time of the third customer is
                14 - 10 = 4.
             4) The fourth customer arrives at time 20, the chef takes his
                order and starts preparing it immediately at time 20, and
                finishes at time 21, so the waiting time of the fourth
                customer is 21 - 20 = 1.
             So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.

Constraints:
* 1 <= customers.length <= 10^5
* 1 <= arrivali, timei <= 10^4
* arrivali <= arrivali+1*/

function averageWaitingTime(customers: number[][]): number {
    let ans = 0, t = 0;
    for (const [arrival, time] of customers) {
        t = Math.max(t, arrival) + time;
        ans += t - arrival;
    }
    return ans/customers.length;
};


/*1717. Maximum Score From Removing Substrings (Medium）
You are given a string s and two integers x and y. You can perform two types
of operations any number of times.
* Remove substring "ab" and gain x points.
  + For example, when removing "ab" from "cabxbae" it becomes "cxbae".
* Remove substring "ba" and gain y points.
  + For example, when removing "ba" from "cabxbae" it becomes "cabxe".
Return the maximum points you can gain after applying the above operations
on s.

Example 1:
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation: - Remove the "ba" underlined in "cdbcbbaaabab". Now, s =
               "cdbcbbaaab" and 5 points are added to the score.
             - Remove the "ab" underlined in "cdbcbbaaab". Now, s =
               "cdbcbbaa" and 4 points are added to the score.
             - Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba"
               and 5 points are added to the score.
             - Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5
               points are added to the score.
             Total score = 5 + 4 + 5 + 5 = 19.

Example 2:
Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20

Constraints:
* 1 <= s.length <= 10^5
* 1 <= x, y <= 10^4
* s consists of lowercase English letters.*/

function maximumGain(s: string, x: number, y: number): number {
    let a = 'a', b = 'b';
    if (x < y) [a, b, x, y] = [b, a, y, x];
    let ans = 0, ca = 0, cb = 0;
    for (const ch of s) {
        if (ch !== 'a' && ch !== 'b') {
            ans += Math.min(ca, cb) * y;
            ca = cb = 0;
        } else if (ch == b) {
            if (ca) {
                --ca;
                ans += x;
            } else ++cb;
        } else ++ca;
    }
    return ans + Math.min(ca, cb) * y;
};


/*1750. Minimum Length of String After Deleting Similar Ends (Medium)
Given a string s consisting only of characters 'a', 'b', and 'c'. You are
asked to apply the following algorithm on the string any number of times:
* Pick a non-empty prefix from the string s where all the characters in the
  prefix are equal.
* Pick a non-empty suffix from the string s where all the characters in this
  suffix are equal.
* The prefix and the suffix should not intersect at any index.
* The characters from the prefix and suffix must be the same.
Delete both the prefix and the suffix. Return the minimum length of s after
performing the above operation any number of times (possibly zero times).

Example 1:
Input: s = "ca"
Output: 2
Explanation: You can't remove any characters, so the string stays as is.

Example 2:
Input: s = "cabaabac"
Output: 0
Explanation: An optimal sequence of operations is:
             - Take prefix = "c" and suffix = "c" and remove them,
               s = "abaaba".
             - Take prefix = "a" and suffix = "a" and remove them,
               s = "baab".
             - Take prefix = "b" and suffix = "b" and remove them, s = "aa".
             - Take prefix = "a" and suffix = "a" and remove them, s = "".

Example 3:
Input: s = "aabccabba"
Output: 3
Explanation: An optimal sequence of operations is:
             - Take prefix = "aa" and suffix = "a" and remove them,
               s = "bccabb".
             - Take prefix = "b" and suffix = "bb" and remove them,
               s = "cca".

Constraints:
* 1 <= s.length <= 10^5
* s only consists of characters 'a', 'b', and 'c'.*/

function minimumLength(s: string): number {
    let lo = 0, hi = s.length-1;
    while (lo < hi && s[lo] == s[hi]) {
        const ch = s[lo];
        for (; lo <= hi && s[lo] == ch; ++lo);
        for (; lo <= hi && s[hi] == ch; --hi);
    }
    return hi - lo + 1;
};


/*1823. Find the Winner of the Circular Game (Medium)
There are n friends that are playing a game. The friends are sitting in a
circle and are numbered from 1 to n in clockwise order. More formally,
moving clockwise from the ith friend brings you to the (i+1)th friend for
1 <= i < n, and moving clockwise from the nth friend brings you to the 1st
friend. The rules of the game are as follows:
* Start at the 1st friend.
* Count the next k friends in the clockwise direction including the friend
  you started at. The counting wraps around the circle and may count some
  friends more than once.
* The last friend you counted leaves the circle and loses the game.
* If there is still more than one friend in the circle, go back to step 2
  starting from the friend immediately clockwise of the friend who just lost
  and repeat.
* Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the
game.

Example 1:
Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
             1) Start at friend 1.
             2) Count 2 friends clockwise, which are friends 1 and 2.
             3) Friend 2 leaves the circle. Next start is friend 3.
             4) Count 2 friends clockwise, which are friends 3 and 4.
             5) Friend 4 leaves the circle. Next start is friend 5.
             6) Count 2 friends clockwise, which are friends 5 and 1.
             7) Friend 1 leaves the circle. Next start is friend 3.
             8) Count 2 friends clockwise, which are friends 3 and 5.
             9) Friend 5 leaves the circle. Only friend 3 is left, so they
                are the winner.

Example 2:
Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is
             friend 1.

Constraints: 1 <= k <= n <= 500

Follow up: Could you solve this problem in linear time with constant space?*/

function findTheWinner(n: number, k: number): number {
    /*Josephus Problem*/
    let ans = 0;
    for (let x = 2; x <= n; ++x)
        ans = (ans + k) % x;
    return ++ans;
};


/*1863. Sum of All Subset XOR Totals (Easy)
The XOR total of an array is defined as the bitwise XOR of all its elements,
or 0 if the array is empty.
* For example, the XOR total of the array [2,5,6] is 2 XOR 5 XOR 6 = 1.
Given an array nums, return the sum of all XOR totals for every subset of
nums. Note: Subsets with the same elements should be counted multiple times.
An array a is a subset of an array b if a can be obtained from b by deleting
some (possibly zero) elements of b.

Example 1:
Input: nums = [1,3]
Output: 6
Explanation: The 4 subsets of [1,3] are:
             - The empty subset has an XOR total of 0.
             - [1] has an XOR total of 1.
             - [3] has an XOR total of 3.
             - [1,3] has an XOR total of 1 XOR 3 = 2.
             0 + 1 + 3 + 2 = 6

Example 2:
Input: nums = [5,1,6]
Output: 28
Explanation: The 8 subsets of [5,1,6] are:
             - The empty subset has an XOR total of 0.
             - [5] has an XOR total of 5.
             - [1] has an XOR total of 1.
             - [6] has an XOR total of 6.
             - [5,1] has an XOR total of 5 XOR 1 = 4.
             - [5,6] has an XOR total of 5 XOR 6 = 3.
             - [1,6] has an XOR total of 1 XOR 6 = 7.
             - [5,1,6] has an XOR total of 5 XOR 1 XOR 6 = 2.
             0 + 5 + 1 + 6 + 4 + 3 + 7 + 2 = 28

Example 3:
Input: nums = [3,4,5,6,7,8]
Output: 480
Explanation: The sum of all XOR totals for every subset is 480.

Constraints:
* 1 <= nums.length <= 12
* 1 <= nums[i] <= 20*/

function subsetXORSum(nums: number[]): number {
    return nums.reduce((x, y) => x|y) << nums.length-1;
};


/*1894. Find the Student that Will Replace the Chalk (Medium)
There are n students in a class numbered from 0 to n - 1. The teacher will
give each student a problem starting with the student number 0, then the
student number 1, and so on until the teacher reaches the student number
n - 1. After that, the teacher will restart the process, starting with the
student number 0 again. You are given a 0-indexed integer array chalk and an
integer k. There are initially k pieces of chalk. When the student number i
is given a problem to solve, they will use chalk[i] pieces of chalk to solve
that problem. However, if the current number of chalk pieces is strictly
less than chalk[i], then the student number i will be asked to replace the
chalk. Return the index of the student that will replace the chalk pieces.

Example 1:
Input: chalk = [5,1,5], k = 22
Output: 0
Explanation: The students go in turns as follows:
             - Student number 0 uses 5 chalk, so k = 17.
             - Student number 1 uses 1 chalk, so k = 16.
             - Student number 2 uses 5 chalk, so k = 11.
             - Student number 0 uses 5 chalk, so k = 6.
             - Student number 1 uses 1 chalk, so k = 5.
             - Student number 2 uses 5 chalk, so k = 0.
             Student number 0 does not have enough chalk, so they will have
             to replace it.

Example 2:
Input: chalk = [3,4,1,2], k = 25
Output: 1
Explanation: The students go in turns as follows:
             - Student number 0 uses 3 chalk so k = 22.
             - Student number 1 uses 4 chalk so k = 18.
             - Student number 2 uses 1 chalk so k = 17.
             - Student number 3 uses 2 chalk so k = 15.
             - Student number 0 uses 3 chalk so k = 12.
             - Student number 1 uses 4 chalk so k = 8.
             - Student number 2 uses 1 chalk so k = 7.
             - Student number 3 uses 2 chalk so k = 5.
             - Student number 0 uses 3 chalk so k = 2.
             Student number 1 does not have enough chalk, so they will have
             to replace it.

Constraints:
* chalk.length == n
* 1 <= n <= 10^5
* 1 <= chalk[i] <= 10^5
* 1 <= k <= 10^9*/

function chalkReplacer(chalk: number[], k: number): number {
    const total = chalk.reduce((x, y) => x+y, 0);
    k %= total;
    for (const [i, x] of chalk.entries()) {
        k -= x;
        if (k < 0) return i;
    }
};


/*1905. Count Sub Islands (Medium)
You are given two m x n binary matrices grid1 and grid2 containing only 0's
(representing water) and 1's (representing land). An island is a group of
1's connected 4-directionally (horizontal or vertical). Any cells outside of
the grid are considered water cells. An island in grid2 is considered a sub-
island if there is an island in grid1 that contains all the cells that make
up this island in grid2. Return the number of islands in grid2 that are
considered sub-islands.

Example 1:
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],
       grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the
             grid on the right is grid2. The 1s colored red in grid2 are
             those considered to be part of a sub-island. There are three
             sub-islands.

Example 2:
Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]],
       grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
Output: 2
Explanation: In the picture above, the grid on the left is grid1 and the
             grid on the right is grid2. The 1s colored red in grid2 are
             those considered to be part of a sub-island. There are two sub-
             islands.

Constraints:
* m == grid1.length == grid2.length
* n == grid1[i].length == grid2[i].length
* 1 <= m, n <= 500
* grid1[i][j] and grid2[i][j] are either 0 or 1.*/

function countSubIslands(grid1: number[][], grid2: number[][]): number {
    const m = grid1.length, n = grid1[0].length;
    let ans = 0;
    for (let x = 0; x < m; ++x)
        for (let y = 0; y < n; ++y)
            if (grid2[x][y]) {
                let val = 1;
                grid2[x][y] = 0;
                const stack = [[x, y]];
                while (stack.length) {
                    const [i, j] = stack.pop();
                    val &= grid1[i][j];
                    for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
                        if (0 <= ii && ii < m && 0 <= jj && jj < n && grid2[ii][jj]) {
                            grid2[ii][jj] = 0;
                            stack.push([ii, jj]);
                        }
                }
                ans += val;
            }
    return ans;
};


/*1915. Number of Wonderful Substrings (Medium)
A wonderful string is a string where at most one letter appears an odd
number of times. For example, "ccjjc" and "abab" are wonderful, but "ab" is
not. Given a string word that consists of the first ten lowercase English
letters ('a' through 'j'), return the number of wonderful non-empty
substrings in word. If the same substring appears multiple times in word,
then count each occurrence separately. A substring is a contiguous sequence
of characters in a string.

Example 1:
Input: word = "aba"
Output: 4
Explanation: The four wonderful substrings are underlined below:
             - "aba" -> "a"
             - "aba" -> "b"
             - "aba" -> "a"
             - "aba" -> "aba"

Example 2:
Input: word = "aabb"
Output: 9
Explanation: The nine wonderful substrings are underlined below:
             - "aabb" -> "a"
             - "aabb" -> "aa"
             - "aabb" -> "aab"
             - "aabb" -> "aabb"
             - "aabb" -> "a"
             - "aabb" -> "abb"
             - "aabb" -> "b"
             - "aabb" -> "bb"
             - "aabb" -> "b"

Example 3:
Input: word = "he"
Output: 2
Explanation: The two wonderful substrings are underlined below:
             - "he" -> "h"
             - "he" -> "e"

Constraints:
* 1 <= word.length <= 10^5
* word consists of lowercase English letters from 'a' to 'j'.*/

function wonderfulSubstrings(word: string): number {
    let ans = 0, mask = 0;
    const freq = new Map();
    freq.set(0, 1);
    for (const ch of word) {
        mask ^= 1 << ch.charCodeAt(0)-97;
        ans += freq.get(mask) ?? 0;
        for (let i = 0; i < 10; ++i)
            ans += freq.get(mask^1<<i) ?? 0;
        freq.set(mask, 1 + (freq.get(mask) ?? 0));
    }
    return ans;
};


/*1937. Maximum Number of Points with Cost (Medium)
You are given an m x n integer matrix points (0-indexed). Starting with 0
points, you want to maximize the number of points you can get from the
matrix. To gain points, you must pick one cell in each row. Picking the cell
at coordinates (r, c) will add points[r][c] to your score. However, you will
lose points if you pick a cell too far from the cell that you picked in the
previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1),
picking cells at coordinates (r, c1) and (r + 1, c2) will subtract
abs(c1 - c2) from your score. Return the maximum number of points you can
achieve.

abs(x) is defined as:
* x for x >= 0.
* -x for x < 0.

Example 1:
Input: points = [[1,2,3],[1,5,1],[3,1,1]]
Output: 9
Explanation: The blue cells denote the optimal cells to pick, which have
             coordinates (0, 2), (1, 1), and (2, 0). You add 3 + 5 + 3 = 11
             to your score. However, you must subtract abs(2 - 1) +
             abs(1 - 0) = 2 from your score. Your final score is 11 - 2 = 9.

Example 2:
Input: points = [[1,5],[2,3],[4,2]]
Output: 11
Explanation: The blue cells denote the optimal cells to pick, which have
             coordinates (0, 1), (1, 1), and (2, 0). You add 5 + 3 + 4 = 12
             to your score. However, you must subtract abs(1 - 1) +
             abs(1 - 0) = 1 from your score. Your final score is 12 - 1 = 11.

Constraints:
* m == points.length
* n == points[r].length
* 1 <= m, n <= 10^5
* 1 <= m * n <= 10^5
* 0 <= points[r][c] <= 10^5*/

function maxPoints(points: number[][]): number {
    const m = points.length, n = points[0].length;
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));
    dp[0] = points[0];
    for (let i = 1; i < m; ++i) {
        for (let j = n-2; j >= 0; --j)
            dp[i-1][j] = Math.max(dp[i-1][j], dp[i-1][j+1]-1);
        let prefix = 0;
        for (let j = 0; j < n; ++j) {
            dp[i][j] = points[i][j] + Math.max(prefix, dp[i-1][j]);
            prefix = Math.max(prefix, dp[i-1][j])-1;
        }
    }
    return Math.max(...dp[m-1]);
};


/*1945. Sum of Digits of String After Convert (Easy)
You are given a string s consisting of lowercase English letters, and an
integer k. First, convert s into an integer by replacing each letter with
its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z'
with 26). Then, transform the integer by replacing it with the sum of its
digits. Repeat the transform operation k times in total. For example, if
s = "zbax" and k = 2, then the resulting integer would be 8 by the following
operations:
* Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
* Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
* Transform #2: 17 ➝ 1 + 7 ➝ 8
Return the resulting integer after performing the operations described
above.

Example 1:
Input: s = "iiii", k = 1
Output: 36
Explanation: The operations are as follows:
             - Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
             - Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
             Thus the resulting integer is 36.

Example 2:
Input: s = "leetcode", k = 2
Output: 6
Explanation: The operations are as follows:
             - Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝
               "12552031545" ➝ 12552031545
             - Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 +
               5 + 4 + 5 ➝ 33
             - Transform #2: 33 ➝ 3 + 3 ➝ 6
             Thus the resulting integer is 6.

Example 3:
Input: s = "zbax", k = 2
Output: 8

Constraints:
* 1 <= s.length <= 100
* 1 <= k <= 10
* s consists of lowercase English letters.*/

function getLucky(s: string, k: number): number {
    let ans = 0;
    for (const ch of s) {
        const x = ch.charCodeAt(0) - 96;
        ans += Math.floor(x/10) + x%10;
    }
    while (--k) {
        let sm = 0;
        for (; ans; ans = Math.floor(ans/10)) sm += ans % 10;
        ans = sm;
    }
    return ans;
};


/*1971. Find if Path Exists in Graph (Easy)
There is a bi-directional graph with n vertices, where each vertex is
labeled from 0 to n - 1 (inclusive). The edges in the graph are represented
as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-
directional edge between vertex ui and vertex vi. Every vertex pair is
connected by at most one edge, and no vertex has an edge to itself. You want
to determine if there is a valid path that exists from vertex source to
vertex destination. Given edges and the integers n, source, and destination,
return true if there is a valid path from source to destination, or false
otherwise.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
             - 0 → 1 → 2
             - 0 → 2

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.

Constraints:
* 1 <= n <= 2 * 10^5
* 0 <= edges.length <= 2 * 10^5
* edges[i].length == 2
* 0 <= ui, vi <= n - 1
* ui != vi
* 0 <= source, destination <= n - 1
* There are no duplicate edges.
* There are no self edges.*/

function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    const seen = Array(n).fill(false);
    seen[source] = true;
    const stack = [source];
    while (stack.length) {
        const u = stack.pop();
        if (u == destination) return true;
        for (const v of graph[u])
            if (!seen[v]) {
                seen[v] = true;
                stack.push(v);
            }
    }
    return false;
};


/*1992. Find All Groups of Farmland (Medium)
You are given a 0-indexed m x n binary matrix land where a 0 represents a
hectare of forested land and a 1 represents a hectare of farmland. To keep
the land organized, there are designated rectangular areas of hectares that
consist entirely of farmland. These rectangular areas are called groups. No
two groups are adjacent, meaning farmland in one group is not four-
directionally adjacent to another farmland in a different group. land can be
represented by a coordinate system where the top left corner of land is
(0, 0) and the bottom right corner of land is (m-1, n-1). Find the
coordinates of the top left and bottom right corner of each group of
farmland. A group of farmland with a top left corner at (r1, c1) and a
bottom right corner at (r2, c2) is represented by the 4-length array
[r1, c1, r2, c2]. Return a 2D array containing the 4-length arrays described
above for each group of farmland in land. If there are no groups of
farmland, return an empty array. You may return the answer in any order.

Example 1:
Input: land = [[1,0,0],[0,1,1],[0,1,1]]
Output: [[0,0,0,0],[1,1,2,2]]
Explanation: The first group has a top left corner at land[0][0] and a
             bottom right corner at land[0][0]. The second group has a top
             left corner at land[1][1] and a bottom right corner at
             land[2][2].

Example 2:
Input: land = [[1,1],[1,1]]
Output: [[0,0,1,1]]
Explanation: The first group has a top left corner at land[0][0] and a
             bottom right corner at land[1][1].

Example 3:
Input: land = [[0]]
Output: []
Explanation: There are no groups of farmland.

Constraints:
* m == land.length
* n == land[i].length
* 1 <= m, n <= 300
* land consists of only 0's and 1's.
* Groups of farmland are rectangular in shape.*/

function findFarmland(land: number[][]): number[][] {
    const m = land.length, n = land[0].length;
    let ans = [];
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j) {
            if (land[i][j] == 1) {
                let ii = i, jj = j;
                for (; jj < n && land[i][jj]; ++jj);
                for (; ii < m && land[ii][j]; ++ii)
                    land[ii][j] = -jj;
                ans.push([i, j, ii-1, jj-1]);
            }
            if (land[i][j] < 0) j = -land[i][j];
        }
    return ans;
};


/*2000. Reverse Prefix of Word (Easy)
Given a 0-indexed string word and a character ch, reverse the segment of
word that starts at index 0 and ends at the index of the first occurrence of
ch (inclusive). If the character ch does not exist in word, do nothing. For
example, if word = "abcdefd" and ch = "d", then you should reverse the
segment that starts at 0 and ends at 3 (inclusive). The resulting string
will be "dcbaefd". Return the resulting string.

Example 1:
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first occurrence of "d" is at index 3. Reverse the part of
             word from 0 to 3 (inclusive), the resulting string is "dcbaefd".

Example 2:
Input: word = "xyxzxe", ch = "z"
Output: "zxyxxe"
Explanation: The first and only occurrence of "z" is at index 3. Reverse the
             part of word from 0 to 3 (inclusive), the resulting string is
             "zxyxxe".

Example 3:
Input: word = "abcd", ch = "z"
Output: "abcd"
Explanation: "z" does not exist in word. You should not do any reverse
             operation, the resulting string is "abcd".

Constraints:
* 1 <= word.length <= 250
* word consists of lowercase English letters.
* ch is a lowercase English letter.*/

function reversePrefix(word: string, ch: string): string {
    const k = word.indexOf(ch);
    return word.split('').slice(0, k+1).reverse().join('') + word.substring(k+1);
};


/*2028. Find Missing Observations (Medium)
You have observations of n + m 6-sided dice rolls with each face numbered
from 1 to 6. n of the observations went missing, and you only have the
observations of m rolls. Fortunately, you have also calculated the average
value of the n + m rolls. You are given an integer array rolls of length m
where rolls[i] is the value of the ith observation. You are also given the
two integers mean and n. Return an array of length n containing the missing
observations such that the average value of the n + m rolls is exactly mean.
If there are multiple valid answers, return any of them. If no such array
exists, return an empty array. The average value of a set of k numbers is
the sum of the numbers divided by k. Note that mean is an integer, so the
sum of the n + m rolls should be divisible by n + m.

Example 1:
Input: rolls = [3,2,4,3], mean = 4, n = 2
Output: [6,6]
Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.

Example 2:
Input: rolls = [1,5,6], mean = 3, n = 4
Output: [2,3,2,2]
Explanation: The mean of all n + m rolls is
             (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.

Example 3:
Input: rolls = [1,2,3,4], mean = 6, n = 4
Output: []
Explanation: It is impossible for the mean to be 6 no matter what the 4
             missing rolls are.

Constraints:
* m == rolls.length
* 1 <= n, m <= 10^5
* 1 <= rolls[i], mean <= 6*/

function missingRolls(rolls: number[], mean: number, n: number): number[] {
    const m = rolls.length;
    const total = mean*(m+n) - rolls.reduce((s, x) => s+x, 0);
    if (n <= total && total <= 6*n) {
        const q = Math.floor(total/n), r = total%n;
        return Array(n).fill(0).map((_, i) => i < r ? q+1 : q);
    }
    return [];
};


/*2037. Minimum Number of Moves to Seat Everyone (Easy)
There are n seats and n students in a room. You are given an array seats of
length n, where seats[i] is the position of the ith seat. You are also given
the array students of length n, where students[j] is the position of the jth
student. You may perform the following move any number of times:
* Increase or decrease the position of the ith student by 1 (i.e., moving
  the ith student from position x to x + 1 or x - 1)
Return the minimum number of moves required to move each student to a seat
such that no two students are in the same seat. Note that there may be
multiple seats or students in the same position at the beginning.

Example 1:
Input: seats = [3,1,5], students = [2,7,4]
Output: 4
Explanation: The students are moved as follows:
             - The first student is moved from from position 2 to position 1
               using 1 move.
             - The second student is moved from from position 7 to position
               5 using 2 moves.
             - The third student is moved from from position 4 to position 3
               using 1 move.
             In total, 1 + 2 + 1 = 4 moves were used.

Example 2:
Input: seats = [4,1,5,9], students = [1,3,2,6]
Output: 7
Explanation: The students are moved as follows:
             - The first student is not moved.
             - The second student is moved from from position 3 to position
               4 using 1 move.
             - The third student is moved from from position 2 to position 5
               using 3 moves.
             - The fourth student is moved from from position 6 to position
               9 using 3 moves.
             In total, 0 + 1 + 3 + 3 = 7 moves were used.

Example 3:
Input: seats = [2,2,6,6], students = [1,3,2,6]
Output: 4
Explanation: Note that there are two seats at position 2 and two seats at
             position 6. The students are moved as follows:
             - The first student is moved from from position 1 to position 2
               using 1 move.
             - The second student is moved from from position 3 to position
               6 using 3 moves.
             - The third student is not moved.
             - The fourth student is not moved.
             In total, 1 + 3 + 0 + 0 = 4 moves were used.

Constraints:
* n == seats.length == students.length
* 1 <= n <= 100
* 1 <= seats[i], students[j] <= 100*/

function minMovesToSeat(seats: number[], students: number[]): number {
    seats.sort((x, y) => x-y);
    students.sort((x, y) => x-y);
    let ans = 0;
    for (let i = 0; i < seats.length; ++i)
        ans += Math.abs(seats[i] - students[i]);
    return ans;
};


/*2053. Kth Distinct String in an Array (Easy)
A distinct string is a string that is present only once in an array. Given
an array of strings arr, and an integer k, return the kth distinct string
present in arr. If there are fewer than k distinct strings, return an empty
string "". Note that the strings are considered in the order in which they
appear in the array.

Example 1:
Input: arr = ["d","b","c","b","c","a"], k = 2
Output: "a"
Explanation: The only distinct strings in arr are "d" and "a".
             "d" appears 1st, so it is the 1st distinct string.
             "a" appears 2nd, so it is the 2nd distinct string.
             Since k == 2, "a" is returned.

Example 2:
Input: arr = ["aaa","aa","a"], k = 1
Output: "aaa"
Explanation: All strings in arr are distinct, so the 1st string "aaa" is
             returned.

Example 3:
Input: arr = ["a","b","a"], k = 3
Output: ""
Explanation: The only distinct string is "b". Since there are fewer than 3
             distinct strings, we return an empty string "".

Constraints:
* 1 <= k <= arr.length <= 1000
* 1 <= arr[i].length <= 5
* arr[i] consists of lowercase English letters.*/

function kthDistinct(arr: string[], k: number): string {
    const freq = new Map();
    for (const s of arr)
        freq.set(s, 1 + (freq.get(s) ?? 0));
    for (const s of arr)
        if (freq.get(s) == 1 && --k == 0)
            return s;
    return "";
};


/*2108. Find First Palindromic String in the Array (Easy)
Given an array of strings words, return the first palindromic string in the
array. If there is no such string, return an empty string "". A string is
palindromic if it reads the same forward and backward.

Example 1:
Input: words = ["abc","car","ada","racecar","cool"]
Output: "ada"
Explanation: The first string that is palindromic is "ada". Note that
             "racecar" is also palindromic, but it is not the first.

Example 2:
Input: words = ["notapalindrome","racecar"]
Output: "racecar"
Explanation: The first and only string that is palindromic is "racecar".

Example 3:
Input: words = ["def","ghi"]
Output: ""
Explanation: There are no palindromic strings, so the empty string is
             returned.

Constraints:
* 1 <= words.length <= 100
* 1 <= words[i].length <= 100
* words[i] consists only of lowercase English letters.*/

function firstPalindrome(words: string[]): string {
    for (const w of words) {
        const ww = w.split("").reverse().join("");
        if (w === ww) return w;
    }
    return "";
};


/*2134. Minimum Swaps to Group All 1's Together II (Medium)
A swap is defined as taking two distinct positions in an array and swapping
the values in them. A circular array is defined as an array where we
consider the first element and the last element to be adjacent. Given a
binary circular array nums, return the minimum number of swaps required to
group all 1's present in the array together at any location.

Example 1:
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: Here are a few of the ways to group all the 1's together:
             [0,0,1,1,1,0,0] using 1 swap.
             [0,1,1,1,0,0,0] using 1 swap.
             [1,1,0,0,0,0,1] using 2 swaps (using the circular property of
             the array).
             There is no way to group all 1's together with 0 swaps. Thus,
             the minimum number of swaps required is 1.

Example 2:
Input: nums = [0,1,1,1,0,0,1,1,0]
Output: 2
Explanation: Here are a few of the ways to group all the 1's together:
             - [1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular
               property of the array).
             - [1,1,1,1,1,0,0,0,0] using 2 swaps.
             There is no way to group all 1's together with 0 or 1 swaps.
             Thus, the minimum number of swaps required is 2.

Example 3:
Input: nums = [1,1,0,0,1]
Output: 0
Explanation: All the 1's are already grouped together due to the circular
             property of the array. Thus, the minimum number of swaps
             required is 0.

Constraints:
* 1 <= nums.length <= 10^5
* nums[i] is either 0 or 1.*/

function minSwaps(nums: number[]): number {
    let ans = Infinity, ones = nums.reduce((s, x) => s+x, 0);
    for (let i = 0, n = nums.length, prefix = 0; i < n+ones; ++i) {
        prefix += nums[i % n];
        if (i >= ones) prefix -= nums[(i-ones) % n];
        ans = Math.min(ans, ones - prefix);
    }
    return ans;
};


/*2149. Rearrange Array Elements by Sign (Medium)
You are given a 0-indexed integer array nums of even length consisting of an
equal number of positive and negative integers. You should rearrange the
elements of nums such that the modified array follows the given conditions:
* Every consecutive pair of integers have opposite signs.
* For all integers with the same sign, the order in which they were present
  in nums is preserved.
* The rearranged array begins with a positive integer.
Return the modified array after rearranging the elements to satisfy the
aforementioned conditions.

Example 1:
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation: The positive integers in nums are [3,1,2]. The negative
             integers are [-2,-5,-4]. The only possible way to rearrange
             them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
             Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4],
             [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one
             or more conditions.

Example 2:
Input: nums = [-1,1]
Output: [1,-1]
Explanation: 1 is the only positive integer and -1 the only negative integer
             in nums. So nums is rearranged to [1,-1].

Constraints:
* 2 <= nums.length <= 2 * 10^5
* nums.length is even
* 1 <= |nums[i]| <= 10^5
* nums consists of equal number of positive and negative integers.*/

function rearrangeArray(nums: number[]): number[] {
    const ans = Array(nums.length);
    let p = 0, n = 1;
    for (const x of nums)
        if (x > 0) {
            ans[p] = x;
            p +=2;
        } else {
            ans[n] = x;
            n += 2;
        }
    return ans;
};


/*2196. Create Binary Tree From Descriptions (Medium)
You are given a 2D integer array descriptions where descriptions[i] =
[parenti, childi, isLefti] indicates that parenti is the parent of childi in
a binary tree of unique values. Furthermore,
* If isLefti == 1, then childi is the left child of parenti.
* If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root. The
test cases will be generated such that the binary tree is valid.

Example 1:
Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
             The resulting binary tree is shown in the diagram.

Example 2:
Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
             The resulting binary tree is shown in the diagram.

Constraints:
* 1 <= descriptions.length <= 10^4
* descriptions[i].length == 3
* 1 <= parenti, childi <= 10^5
* 0 <= isLefti <= 1
* The binary tree described by descriptions is valid.*/

function createBinaryTree(descriptions: number[][]): TreeNode | null {
    const mp = new Map(), child = new Set();
    for (const [p, c, left] of descriptions) {
        if (!mp.has(p)) mp.set(p, new TreeNode(p));
        if (!mp.has(c)) mp.set(c, new TreeNode(c));
        if (left) mp.get(p).left = mp.get(c);
        else mp.get(p).right = mp.get(c);
        child.add(c);
    }
    for (const [p, c, left] of descriptions)
        if (!child.has(p))
            return mp.get(p);
};


/*2220. Minimum Bit Flips to Convert Number (Easy)
A bit flip of a number x is choosing a bit in the binary representation of x
and flipping it from either 0 to 1 or 1 to 0.
* For example, for x = 7, the binary representation is 111 and we may choose
  any bit (including any leading zeros not shown) and flip it. We can flip
  the first bit from the right to get 110, flip the second bit from the
  right to get 101, flip the fifth bit from the right (a leading zero) to
  get 10111, etc.
Given two integers start and goal, return the minimum number of bit flips to
convert start to goal.

Example 1:
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111
             respectively. We can convert 10 to 7 in 3 steps:
             - Flip the first bit from the right: 1010 -> 1011.
             - Flip the third bit from the right: 1011 -> 1111.
             - Flip the fourth bit from the right: 1111 -> 0111.
             It can be shown we cannot convert 10 to 7 in less than 3 steps.
             Hence, we return 3.

Example 2:
Input: start = 3, goal = 4
Output: 3
Explanation: The binary representation of 3 and 4 are 011 and 100
             respectively. We can convert 3 to 4 in 3 steps:
             - Flip the first bit from the right: 011 -> 010.
             - Flip the second bit from the right: 010 -> 000.
             - Flip the third bit from the right: 000 -> 100.
             It can be shown we cannot convert 3 to 4 in less than 3 steps.
             Hence, we return 3.

Constraints: 0 <= start, goal <= 10^9*/

function minBitFlips(start: number, goal: number): number {
    return (start ^ goal).toString(2).split('1').length-1;
};


/*2326. Spiral Matrix IV (Medium)
You are given two integers m and n, which represent the dimensions of a
matrix. You are also given the head of a linked list of integers. Generate
an m x n matrix that contains the integers in the linked list presented in
spiral order (clockwise), starting from the top-left of the matrix. If there
are remaining empty spaces, fill them with -1. Return the generated matrix.

Example 1:
Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the
             matrix. Note that the remaining spaces in the matrix are filled
             with -1.

Example 2:
Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to
             right in the matrix. The last space in the matrix is set to -1.

Constraints:
* 1 <= m, n <= 10^5
* 1 <= m * n <= 10^5
* The number of nodes in the list is in the range [1, m * n].
* 0 <= Node.val <= 1000*/

function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
    const ans = Array(m).fill(0).map(() => Array(n).fill(-1));
    for (let i = 0, j = 0, di = 0, dj = 1; head; i += di, j += dj, head = head.next) {
        ans[i][j] = head.val;
        if (!(0 <= i+di && i+di < m && 0 <= j+dj && j+dj < n && ans[i+di][j+dj] == -1))
            [di, dj] = [dj, -di];
    }
    return ans;
};


/*2331. Evaluate Boolean Binary Tree (Easy)
You are given the root of a full binary tree with the following properties:
* Leaf nodes have either the value 0 or 1, where 0 represents False and 1
  represents True.
* Non-leaf nodes have either the value 2 or 3, where 2 represents the
  boolean OR and 3 represents the boolean AND.
The evaluation of a node is as follows:
* If the node is a leaf node, the evaluation is the value of the node, i.e.
  True or False.
* Otherwise, evaluate the node's two children and apply the boolean
  operation of its value with the children's evaluations.
Return the boolean result of evaluating the root node. A full binary tree is
a binary tree where each node has either 0 or 2 children. A leaf node is a
node that has zero children.

Example 1:
Input: root = [2,1,3,null,null,0,1]
Output: true
Explanation: The above diagram illustrates the evaluation process.
             The AND node evaluates to False AND True = False.
             The OR node evaluates to True OR False = True.
             The root node evaluates to True, so we return true.

Example 2:
Input: root = [0]
Output: false
Explanation: The root node is a leaf node and it evaluates to false, so we
             return false.

Constraints:
* The number of nodes in the tree is in the range [1, 1000].
* 0 <= Node.val <= 3
* Every node has either 0 or 2 children.
* Leaf nodes have a value of 0 or 1.
* Non-leaf nodes have a value of 2 or 3.*/

function evaluateTree(root: TreeNode | null): boolean {
    const mp = new Map(), stack = [];
    let prev = null, node = root;
    while (node || stack.length)
        if (node) {
            stack.push(node);
            node = node.left
        } else {
            node = stack[stack.length-1];
            if (node.right && node.right != prev) node = node.right;
            else {
                if (!node.left && !node.right) mp.set(node, node.val != 0);
                else if (node.val == 2) mp.set(node, mp.get(node.left) || mp.get(node.right));
                else mp.set(node, mp.get(node.left) && mp.get(node.right));
                stack.pop();
                prev = node;
                node = null;
            }
        }
    return mp.get(root);
};


/*2370. Longest Ideal Subsequence (Medium)
You are given a string s consisting of lowercase letters and an integer k.
We call a string t ideal if the following conditions are satisfied:
* t is a subsequence of the string s.
* The absolute difference in the alphabet order of every two adjacent
  letters in t is less than or equal to k.
Return the length of the longest ideal string. A subsequence is a string
that can be derived from another string by deleting some or no characters
without changing the order of the remaining characters. Note that the
alphabet order is not cyclic. For example, the absolute difference in the
alphabet order of 'a' and 'z' is 25, not 1.

Example 1:
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string
             is 4, so 4 is returned. Note that "acfgbd" is not ideal because
             'c' and 'f' have a difference of 3 in alphabet order.

Example 2:
Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string
             is 4, so 4 is returned.

Constraints:
* 1 <= s.length <= 10^5
* 0 <= k <= 25
* s consists of lowercase English letters.*/

function longestIdealString(s: string, k: number): number {
    const dp = Array(26).fill(0);
    for (const ch of s) {
        let most = 0, x = ch.charCodeAt(0) - 97;
        for (let i = Math.max(0, x-k); i < 26 && i <= x+k; ++i)
            most = Math.max(most, dp[i]);
        dp[x] = 1 + most;
    }
    return Math.max(...dp);
};


/*2392. Build a Matrix With Conditions (Hard)
You are given a positive integer k. You are also given:
* a 2D integer array rowConditions of size n where
  rowConditions[i] = [abovei, belowi], and
* a 2D integer array colConditions of size m where
  colConditions[i] = [lefti, righti].
The two arrays contain integers from 1 to k. You have to build a k x k
matrix that contains each of the numbers from 1 to k exactly once. The
remaining cells should have the value 0. The matrix should also satisfy the
following conditions:
* The number abovei should appear in a row that is strictly above the row at
  which the number belowi appears for all i from 0 to n - 1.
* The number lefti should appear in a column that is strictly left of the
  column at which the number righti appears for all i from 0 to m - 1.
Return any matrix that satisfies the conditions. If no answer exists, return
an empty matrix.

Example 1:
Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
Output: [[3,0,0],[0,0,1],[0,2,0]]
Explanation: The diagram above shows a valid example of a matrix that
             satisfies all the conditions.
             The row conditions are the following:
             - Number 1 is in row 1, and number 2 is in row 2, so 1 is above
               2 in the matrix.
             - Number 3 is in row 0, and number 2 is in row 2, so 3 is above
               2 in the matrix.
             The column conditions are the following:
             - Number 2 is in column 1, and number 1 is in column 2, so 2 is
               left of 1 in the matrix.
             - Number 3 is in column 0, and number 2 is in column 1, so 3 is
               left of 2 in the matrix.
             Note that there may be multiple correct answers.

Example 2:
Input: k = 3, rowConditions = [[1,2],[2,3],[3,1],[2,3]], colConditions = [[2,1]]
Output: []
Explanation: From the first two conditions, 3 has to be below 1 but the
             third conditions needs 3 to be above 1 to be satisfied. No
             matrix can satisfy all the conditions, so we return the empty
             matrix.

Constraints:
* 2 <= k <= 400
* 1 <= rowConditions.length, colConditions.length <= 10^4
* rowConditions[i].length == colConditions[i].length == 2
* 1 <= abovei, belowi, lefti, righti <= k
* abovei != belowi
* lefti != righti*/

function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {

    function fn(edges) {
        const graph = Array(k).fill(0).map(() => []);
        const degree = Array(k).fill(0);
        for (const [u, v] of edges) {
            graph[u-1].push(v-1);
            ++degree[v-1];
        }
        const q = [], ans = [];
        for (let u = 0; u < k; ++u)
            if (degree[u] == 0) q.push(u);
        while (q.length) {
            const u = q.shift();
            ans.push(u);
            for (const v of graph[u])
                if (--degree[v] == 0) q.push(v);
        }
        return ans;
    }

    const row = fn(rowConditions), col = fn(colConditions);
    if (row.length < k || col.length < k) return [];
    const rmap = Array(k), cmap = Array(k);
    for (let i = 0; i < k; ++i)
        rmap[row[i]] = cmap[col[i]] = i;
    const ans = Array(k).fill(0).map(() => Array(k).fill(0));
    for (let x = 0; x < k; )
        ans[rmap[x]][cmap[x]] = ++x;
    return ans;
};


/*2418. Sort the People (Easy)
You are given an array of strings names, and an array heights that consists
of distinct positive integers. Both arrays are of length n. For each index
i, names[i] and heights[i] denote the name and height of the ith person.
Return names sorted in descending order by the people's heights.

Example 1:
Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.

Example 2:
Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
Output: ["Bob","Alice","Bob"]
Explanation: The first Bob is the tallest, followed by Alice and the second
             Bob.

Constraints:
* n == names.length == heights.length
* 1 <= n <= 10^3
* 1 <= names[i].length <= 20
* 1 <= heights[i] <= 10^5
* names[i] consists of lower and upper case English letters.
* All the values of heights are distinct.*/

function sortPeople(names: string[], heights: number[]): string[] {
    const hn : [string, number][] = names.map((x, i) => [x, heights[i]]);
    return hn.sort((x, y) => y[1] - x[1]).map(x => x[0]);
};


/*2419. Longest Subarray With Maximum Bitwise AND (Medium)
You are given an integer array nums of size n. Consider a non-empty subarray
from nums that has the maximum possible bitwise AND. In other words, let k
be the maximum value of the bitwise AND of any subarray of nums. Then, only
subarrays with a bitwise AND equal to k should be considered. Return the
length of the longest such subarray. The bitwise AND of an array is the
bitwise AND of all the numbers in it. A subarray is a contiguous sequence of
elements within an array.

Example 1:
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation: The maximum possible bitwise AND of a subarray is 3. The
             longest subarray with that value is [3,3], so we return 2.

Example 2:
Input: nums = [1,2,3,4]
Output: 1
Explanation: The maximum possible bitwise AND of a subarray is 4. The
             longest subarray with that value is [4], so we return 1.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^6*/

function longestSubarray(nums: number[]): number {
    const most = Math.max(...nums);
    let ans = 0, cnt = 0;
    for (const x of nums)
        if (x == most) ans = Math.max(ans, ++cnt);
        else cnt = 0;
    return ans;
};


/*2441. Largest Positive Integer That Exists With Its Negative (Easy)
Given an integer array nums that does not contain any zeros, find the
largest positive integer k such that -k also exists in the array. Return the
positive integer k. If there is no such integer, return -1.

Example 1:
Input: nums = [-1,2,-3,3]
Output: 3
Explanation: 3 is the only valid k we can find in the array.

Example 2:
Input: nums = [-1,10,6,7,-7,1]
Output: 7
Explanation: Both 1 and 7 have their corresponding negative values in the
             array. 7 has a larger value.

Example 3:
Input: nums = [-10,8,6,7,-2,-3]
Output: -1
Explanation: There is no a single valid k, we return -1.

Constraints:
* 1 <= nums.length <= 1000
* -1000 <= nums[i] <= 1000
* nums[i] != 0*/

function findMaxK(nums: number[]): number {
    let ans = -1;
    const seen = new Set();
    for (const x of nums) {
        if (seen.has(-x)) ans = Math.max(ans, Math.abs(x));
        seen.add(x);
    }
    return ans;
};


/*2485. Find the Pivot Integer (Easy)
Given a positive integer n, find the pivot integer x such that:
* The sum of all elements between 1 and x inclusively equals the sum of all
  elements between x and n inclusively.
Return the pivot integer x. If no such integer exists, return -1. It is
guaranteed that there will be at most one pivot index for the given input.

Example 1:
Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since:
             1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.

Example 3:
Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.

Constraints: 1 <= n <= 1000*/

function pivotInteger(n: number): number {
    const total = n*(n+1)/2, val = Math.floor(Math.sqrt(total));
    return val*val == total ? val : -1;
};


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

function removeNodes(head: ListNode | null): ListNode | null {
    const stack = [];
    for (let node = head; node; node = node.next) {
        while (stack.length && stack[stack.length-1].val < node.val) stack.pop();
        if (stack.length) stack[stack.length-1].next = node;
        stack.push(node);
    }
    return stack[0];
};


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

function getCommon(nums1: number[], nums2: number[]): number {
    for (let i = 0, ii = 0; i < nums1.length && ii < nums2.length; ) {
        if (nums1[i] < nums2[ii]) ++i;
        else if (nums1[i] == nums2[ii]) return nums1[i];
        else ++ii;
    }
    return -1;
};


/*2597. The Number of Beautiful Subsets (Medium)
You are given an array nums of positive integers and a positive integer k.
A subset of nums is beautiful if it does not contain two integers with an
absolute difference equal to k. Return the number of non-empty beautiful
subsets of the array nums. A subset of nums is an array that can be obtained
by deleting some (possibly none) elements from nums. Two subsets are
different if and only if the chosen indices to delete are different.

Example 1:
Input: nums = [2,4,6], k = 2
Output: 4
Explanation: The beautiful subsets of the array nums are: [2], [4], [6],
             [2, 6]. It can be proved that there are only 4 beautiful
             subsets in the array [2,4,6].

Example 2:
Input: nums = [1], k = 1
Output: 1
Explanation: The beautiful subset of the array nums is [1]. It can be proved
             that there is only 1 beautiful subset in the array [1].

Constraints:
* 1 <= nums.length <= 20
* 1 <= nums[i], k <= 1000*/

function beautifulSubsets(nums: number[], k: number): number {
    const freq = new Map();
    for (const x of nums)
        freq.set(x, 1 + (freq.get(x)??0));
    const mp = new Map();
    for (const x of [...freq.keys()].sort((x, y) => x-y)) {
        const val = mp.get(x-k) ?? [];
        val.push(x);
        mp.set(x-k, val);
        mp.set(x, mp.get(x-k));
        mp.delete(x-k);
    }
    let ans = 1;
    for (const v of mp.values()) {
        let f0 = 1, f1 = 1;
        for (const x of v)
            [f0, f1] = [f1, f0*(2**freq.get(x)-1) + f1];
        ans *= f1;
    }
    return --ans;
};


/*2628. JSON Deep Equal (Medium)
Given two values o1 and o2, return a boolean value indicating whether two
values, o1 and o2, are deeply equal. For two values to be deeply equal, the
following conditions must be met:
* If both values are primitive types, they are deeply equal if they pass the
  === equality check.
* If both values are arrays, they are deeply equal if they have the same
  elements in the same order, and each element is also deeply equal according to
  these conditions.
* If both values are objects, they are deeply equal if they have the same keys,
  and the associated values for each key are also deeply equal according to
  these conditions.
You may assume both values are the output of JSON.parse. In other words, they
are valid JSON. Please solve it without using lodash's _.isEqual() function

Example 1:
Input: o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
Output: true
Explanation: The keys and values match exactly.

Example 2:
Input: o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
Output: true
Explanation: Although the keys are in a different order, they still match exactly.

Example 3:
Input: o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
Output: false
Explanation: The array of numbers is different from the array of strings.

Example 4:
Input: o1 = true, o2 = false
Output: false
Explanation: true !== false

Constraints:
* 1 <= JSON.stringify(o1).length <= 10^5
* 1 <= JSON.stringify(o2).length <= 10^5
* maxNestingDepth <= 1000*/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function areDeeplyEqual(o1: JSONValue, o2: JSONValue): boolean {
    if (o1 === o2) return true;
    if (typeof o1 != 'object' || typeof o2 != 'object') return false;
    if (o1 === null || o2 === null) return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;
    if (Object.keys(o1).length != Object.keys(o2).length) return false;
    for (const k in o1)
        if (!areDeeplyEqual(o1[k], o2[k])) return false;
    return true;
};


/*2633. Convert Object to JSON String (Medium)
Given a value, return a valid JSON string of that value. The value can be a
string, number, array, object, boolean, or null. The returned string should not
include extra spaces. The order of keys should be the same as the order returned
by Object.keys(). Please solve it without using the built-in JSON.stringify
method.

Example 1:
Input: object = {"y":1,"x":2}
Output: {"y":1,"x":2}
Explanation: Return the JSON representation. Note that the order of keys should
             be the same as the order returned by Object.keys().

Example 2:
Input: object = {"a":"str","b":-12,"c":true,"d":null}
Output: {"a":"str","b":-12,"c":true,"d":null}
Explanation: The primitives of JSON are strings, numbers, booleans, and null.

Example 3:
Input: object = {"key":{"a":1,"b":[{},null,"Hello"]}}
Output: {"key":{"a":1,"b":[{},null,"Hello"]}}
Explanation: Objects and arrays can include other objects and arrays.

Example 4:
Input: object = true
Output: true
Explanation: Primitive types are valid inputs.

Constraints:
* value is a valid JSON value
* 1 <= JSON.stringify(object).length <= 10^5
* maxNestingLevel <= 1000
* all strings contain only alphanumeric characters*/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function jsonStringify(object: JSONValue): string {
    if (object == null) return 'null';
    if (typeof object === 'string') return `"${object}"`;
    if (typeof object == 'number' || typeof object == 'boolean') return String(object);
    if (Array.isArray(object)) return `[${object.map(x => jsonStringify(x)).join(',')}]`;
    return `{${Object.entries(object).map(([k, v]) => jsonStringify(k) + ':' + jsonStringify(v)).join(',')}}`;
};


/*2674. Split a Circular Linked Listn (Medium)
Given a circular linked list list of positive integers, your task is to
split it into 2 circular linked lists so that the first one contains the
first half of the nodes in list (exactly ceil(list.length / 2) nodes) in the
same order they appeared in list, and the second one contains the rest of
the nodes in list in the same order they appeared in list. Return an array
answer of length 2 in which the first element is a circular linked list
representing the first half and the second element is a circular linked list
representing the second half. A circular linked list is a normal linked list
with the only difference being that the last node's next node, is the first
node.

Example 1:
Input: nums = [1,5,7]
Output: [[1,5],[7]]
Explanation: The initial list has 3 nodes so the first half would be the
             first 2 elements since ceil(3 / 2) = 2 and the rest which is 1
             node is in the second half.

Example 2:
Input: nums = [2,6,1,5]
Output: [[2,6],[1,5]]
Explanation: The initial list has 4 nodes so the first half would be the
             first 2 elements since ceil(4 / 2) = 2 and the rest which is 2
             nodes are in the second half.

Constraints:
* The number of nodes in list is in the range [2, 10^5]
* 0 <= Node.val <= 10^9
* LastNode.next = FirstNode where LastNode is the last node of the list and
  FirstNode is the first one*/

function splitCircularLinkedList(list: ListNode | null): Array<ListNode | null> {
    let fast = list, slow = list;
    while (fast.next != list && fast.next.next != list) {
        fast = fast.next.next;
        slow = slow.next;
    }
    if (fast.next != list) fast = fast.next;
    let head = slow.next;
    slow.next = list;
    fast.next = head;
    return [list, head];
};


/*2678. Number of Senior Citizens (Easy)
You are given a 0-indexed array of strings details. Each element of details
provides information about a given passenger compressed into a string of
length 15. The system is such that:
* The first ten characters consist of the phone number of passengers.
* The next character denotes the gender of the person.
* The following two characters are used to indicate the age of the person.
* The last two characters determine the seat allotted to that person.
Return the number of passengers who are strictly more than 60 years old.

Example 1:
Input: details = ["7868190130M7522","5303914400F9211","9273338290F4010"]
Output: 2
Explanation: The passengers at indices 0, 1, and 2 have ages 75, 92, and 40.
             Thus, there are 2 people who are over 60 years old.

Example 2:
Input: details = ["1313579440F2036","2921522980M5644"]
Output: 0
Explanation: None of the passengers are older than 60.

Constraints:
* 1 <= details.length <= 100
* details[i].length == 15
* details[i] consists of digits from '0' to '9'.
* details[i][10] is either 'M' or 'F' or 'O'.
* The phone numbers and seat numbers of the passengers are distinct.*/

function countSeniors(details: string[]): number {
    return details.map(d => Number(d.substring(11, 13))).reduce((s, x) => s + (x > 60 ? 1 : 0), 0);
};


/*2690. Infinite Method Object (Easy)
Write a function that returns an infinite-method object. An infinite-method
object is defined as an object that allows you to call any method and it will
always return the name of the method. For example, if you execute obj.abc123(),
it will return "abc123".

Example 1:
Input: method = "abc123"
Output: "abc123"
Explanation: const obj = createInfiniteObject();
             obj['abc123'](); // "abc123"
             The returned string should always match the method name.

Example 2:
Input: method = ".-qw73n|^2It"
Output: ".-qw73n|^2It"
Explanation: The returned string should always match the method name.

Constraints: 0 <= method.length <= 1000*/

function createInfiniteObject(): Record<string, () => string> {
    return new Proxy({}, {
        get(_, prop) {
            return () => prop;
        }
    });
};


/*2699. Modify Graph Edge Weights (Hard)
You are given an undirected weighted connected graph containing n nodes
labeled from 0 to n - 1, and an integer array edges where
edges[i] = [ai, bi, wi] indicates that there is an edge between nodes ai and
bi with weight wi. Some edges have a weight of -1 (wi = -1), while others
have a positive weight (wi > 0). Your task is to modify all edges with a
weight of -1 by assigning them positive integer values in the range
[1, 2 * 10^9] so that the shortest distance between the nodes source and
destination becomes equal to an integer target. If there are multiple
modifications that make the shortest distance between source and destination
equal to target, any of them will be considered correct. Return an array
containing all edges (even unmodified ones) in any order if it is possible
to make the shortest distance from source to destination equal to target, or
an empty array if it's impossible. Note: You are not allowed to modify the
weights of edges with initial positive weights.

Example 1:
Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
Explanation: The graph above shows a possible modification to the edges,
             making the distance from 0 to 1 equal to 5.

Example 2:
Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
Output: []
Explanation: The graph above contains the initial edges. It is not possible
             to make the distance from 0 to 2 equal to 6 by modifying the
             edge with weight -1. So, an empty array is returned.

Example 3:
Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
Explanation: The graph above shows a modified graph having the shortest
             distance from 0 to 2 as 6.

Constraints:
* 1 <= n <= 100
* 1 <= edges.length <= n * (n - 1) / 2
* edges[i].length == 3
* 0 <= ai, bi < n
* wi = -1 or 1 <= wi <= 10^7
* ai != bi
* 0 <= source, destination < n
* source != destination
* 1 <= target <= 10^9
* The graph is connected, and there are no self-loops or repeated edges*/

function modifiedGraphEdges(n: number, edges: number[][], source: number, destination: number, target: number): number[][] {
    const graph = Array(n).fill(0).map(() => Array(n).fill(0));
    for (const [u, v, w] of edges)
        graph[u][v] = graph[v][u] = w;
    const orig = Array(n).fill(Infinity);
    orig[source] = 0;
    const pq = new PriorityQueue({compare : (x, y) => x[0] - y[0]});
    pq.enqueue([0, source]);
    while (pq.size()) {
        const [d, u] = pq.dequeue();
        if (d == orig[u])
            for (const [v, w] of graph[u].entries())
                if (w && w != -1 && d+w < orig[v]) {
                    orig[v] = d+w;
                    pq.enqueue([d+w, v]);
                }
    }
    if (orig[destination] < target) return [];
    if (orig[destination] == target) {
        const ans = [];
        for (let [u, v, w] of edges) {
            if (w == -1) w = 2_000_000_000;
            ans.push([u, v, w]);
        }
        return ans;
    }
    const dist = Array(n).fill(Infinity); dist[source] = 0;
    const parent = Array(n).fill(-1);
    pq.enqueue([0, source]);
    while (pq.size()) {
        const [d, u] = pq.dequeue();
        if (u == destination) {
            if (dist[destination] > target) return [];
            break;
        }
        if (d == dist[u]) {
            for (const [v, w] of graph[u].entries()) {
                if (w) {
                    const dd = w == -1 ? d+1 : d+w;
                    if (dd < dist[v]) {
                        dist[v] = dd;
                        parent[v] = u;
                        pq.enqueue([dd, v]);
                    }
                }
            }
        }
    }
    for (let u = destination; u >= 0 && parent[u] >= 0; u = parent[u]) {
        const p = parent[u];
        if (graph[p][u] == -1) {
            if (orig[p] < target) {
                graph[p][u] = graph[u][p] = target - orig[p];
                break;
            }
            graph[p][u] = graph[u][p] = 1;
        }
        target -= graph[u][p];
    }
    const ans = [];
    for (const [u, v, w] of edges) {
        if (graph[u][v] == -1) graph[u][v] = 2_000_000_000;
        ans.push([u, v, graph[u][v]]);
    }
    return ans;
};


/*2705. Compact Object (Medium)
Given an object or array obj, return a compact object. A compact object is the
same as the original object, except with keys containing falsy values removed.
This operation applies to the object and any nested objects. Arrays are
considered objects where the indices are keys. A value is considered falsy when
Boolean(value) returns false. You may assume the obj is the output of
JSON.parse. In other words, it is valid JSON.

Example 1:
Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.

Example 2:
Input: obj = {"a": null, "b": [false, 1]}
Output: {"b": [1]}
Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.

Example 3:
Input: obj = [null, 0, 5, [0], [false, 16]]
Output: [5, [], [16]]
Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.

Constraints:
* obj is a valid JSON object
* 2 <= JSON.stringify(obj).length <= 10^6*/

function compactObject(obj: Obj): Obj {
    if (obj == null) return null;
    if (Array.isArray(obj))
        return obj.filter(Boolean).map((x) => typeof x == "object" ? compactObject(x) : x);
    if (typeof obj == "object") {
        const ans = {};
        for (let [k, x] of Object.entries(obj)) {
            if (typeof x == "object") x = compactObject(x);
            if (x) ans[k] = x;
        }
        return ans;
    }
    return obj;
};


/*2722. Join Two Arrays by ID (Medium)
Given two arrays arr1 and arr2, return a new array joinedArray. All the objects
in each of the two inputs arrays will contain an id field that has an integer
value. joinedArray is an array formed by merging arr1 and arr2 based on their id
key. The length of joinedArray should be the length of unique values of id. The
returned array should be sorted in ascending order based on the id key. If a
given id exists in one array but not the other, the single object with that id
should be included in the result array without modification. If two objects
share an id, their properties should be merged into a single object:
* If a key only exists in one object, that single key-value pair should be
  included in the object.
* If a key is included in both objects, the value in the object from arr2 should
  override the value from arr1.

Example 1:
Input:
arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
],
arr2 = [
    {"id": 3, "x": 5}
]
Output:
[
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
]
Explanation: There are no duplicate ids so arr1 is simply concatenated with arr2.

Example 2:
Input:
arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
],
arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Output:
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Explanation: The two objects with id=1 and id=3 are included in the result array
             without modifiction. The two objects with id=2 are merged together.
             The keys from arr2 override the values in arr1.

Example 3:
Input:
arr1 = [
    {"id": 1, "b": {"b": 94},"v": [4, 3], "y": 48}
]
arr2 = [
    {"id": 1, "b": {"c": 84}, "v": [1, 3]}
]
Output: [
    {"id": 1, "b": {"c": 84}, "v": [1, 3], "y": 48}
]
Explanation: The two objects with id=1 are merged together. For the keys "b" and
             "v" the values from arr2 are used. Since the key "y" only exists in
             arr1, that value is taken form arr1.

Constraints:
* arr1 and arr2 are valid JSON arrays
* Each object in arr1 and arr2 has a unique integer id key
* 2 <= JSON.stringify(arr1).length <= 10^6
* 2 <= JSON.stringify(arr2).length <= 10^6*/

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
    const seen = {};
    arr1.concat(arr2).forEach((obj) => {
        if (obj["id"] in seen)
            Object.assign(seen[obj["id"]], obj);
        else
            seen[obj["id"]] = obj;
    });
    return Object.values(seen);
};


/*2728. Count Houses in a Circular Street (Easy)
You are given an object street of class Street that represents a circular
street and a positive integer k which represents a maximum bound for the
number of houses in that street (in other words, the number of houses is
less than or equal to k). Houses' doors could be open or closed initially.
Initially, you are standing in front of a door to a house on this street.
Your task is to count the number of houses in the street. The class Street
contains the following functions which may help you:
* void openDoor(): Open the door of the house you are in front of.
* void closeDoor(): Close the door of the house you are in front of.
* boolean isDoorOpen(): Returns true if the door of the current house is
  open and false otherwise.
* void moveRight(): Move to the right house.
* void moveLeft(): Move to the left house.
Return ans which represents the number of houses on this street.

Example 1:
Input: street = [0,0,0,0], k = 10
Output: 4
Explanation: There are 4 houses, and all their doors are closed. The number
             of houses is less than k, which is 10.

Example 2:
Input: street = [1,0,1,1,0], k = 5
Output: 5
Explanation: There are 5 houses, and the doors of the 1st, 3rd, and 4th
             house (moving in the right direction) are open, and the rest
             are closed. The number of houses is equal to k, which is 5.

Constraints:
* n == number of houses
* 1 <= n <= k <= 10^3*/

function houseCount(street: Street | null, k: number): number {
    for (; k; --k) {
        street.openDoor();
        street.moveRight();
    }
    let ans = 0;
    for (; street.isDoorOpen(); ++ans) {
        street.closeDoor();
        street.moveRight();
    }
    return ans;
};


/*2729. Check if The Number is Fascinating (Easy)
You are given an integer n that consists of exactly 3 digits. We call the
number n fascinating if, after the following modification, the resulting
number contains all the digits from 1 to 9 exactly once and does not contain
any 0's:
* Concatenate n with the numbers 2 * n and 3 * n.
Return true if n is fascinating, or false otherwise. Concatenating two
numbers means joining them together. For example, the concatenation of 121
and 371 is 121371.

Example 1:
Input: n = 192
Output: true
Explanation: We concatenate the numbers n = 192 and 2 * n = 384 and
             3 * n = 576. The resulting number is 192384576. This number
             contains all the digits from 1 to 9 exactly once.

Example 2:
Input: n = 100
Output: false
Explanation: We concatenate the numbers n = 100 and 2 * n = 200 and
             3 * n = 300. The resulting number is 100200300. This number
             does not satisfy any of the conditions.

Constraints: 100 <= n <= 999*/

function isFascinating(n: number): boolean {
    const seen = new Set();
    for (let x = n; x <= 3*n; x += n) {
        if (x >= 1000) return false;
        for (const ch of String(x))
            seen.add(ch);
    }
    return seen.size == 9 && !seen.has('0');
};


/*2730. Find the Longest Semi-Repetitive Substring (Medium)
You are given a digit string s that consists of digits from 0 to 9. A string
is called semi-repetitive if there is at most one adjacent pair of the same
digit. For example, "0010", "002020", "0123", "2002", and "54944" are semi-
repetitive while the following are not: "00101022" (adjacent same digit
pairs are 00 and 22), and "1101234883" (adjacent same digit pairs are 11 and
88). Return the length of the longest semi-repetitive substring of s.

Example 1:
Input: s = "52233"
Output: 4
Explanation: The longest semi-repetitive substring is "5223". Picking the
             whole string "52233" has two adjacent same digit pairs 22 and
             33, but at most one is allowed.

Example 2:
Input: s = "5494"
Output: 4
Explanation: s is a semi-repetitive string.

Example 3:
Input: s = "1111111"
Output: 2
Explanation: The longest semi-repetitive substring is "11". Picking the
             substring "111" has two adjacent same digit pairs, but at most
             one is allowed.

Constraints:
* 1 <= s.length <= 50
* '0' <= s[i] <= '9'*/

function longestSemiRepetitiveSubstring(s: string): number {
    let ans = 0, ii = 0, q = 0;
    for (const [i, ch] of s.split('').entries()) {
        if (i && s[i-1] == s[i]) {
            if (q) ii = q;
            q = i;
        }
        ans = Math.max(ans, i-ii+1);
    }
    return ans;
};


/*2731. Movement of Robots (Medium)
Some robots are standing on an infinite number line with their initial
coordinates given by a 0-indexed integer array nums and will start moving
once given the command to move. The robots will move a unit distance each
second. You are given a string s denoting the direction in which robots will
move on command. 'L' means the robot will move towards the left side or
negative side of the number line, whereas 'R' means the robot will move
towards the right side or positive side of the number line. If two robots
collide, they will start moving in opposite directions. Return the sum of
distances between all the pairs of robots d seconds after the command. Since
the sum can be very large, return it modulo 109 + 7.

Note:
* For two robots at the index i and j, pair (i,j) and pair (j,i) are
  considered the same pair.
* When robots collide, they instantly change their directions without
  wasting any time.
* Collision happens when two robots share the same place in a moment.
  - For example, if a robot is positioned in 0 going to the right and
    another is positioned in 2 going to the left, the next second they'll be
    both in 1 and they will change direction and the next second the first
    one will be in 0, heading left, and another will be in 2, heading right.
  - For example, if a robot is positioned in 0 going to the right and
    another is positioned in 1 going to the left, the next second the first
    one will be in 0, heading left, and another will be in 1, heading right.

Example 1:
Input: nums = [-2,0,2], s = "RLL", d = 3
Output: 8
Explanation: - After 1 second, the positions are [-1,-1,1]. Now, the robot
               at index 0 will move left, and the robot at index 1 will move
               right.
             - After 2 seconds, the positions are [-2,0,0]. Now, the robot
               at index 1 will move left, and the robot at index 2 will move
               right.
             - After 3 seconds, the positions are [-3,-1,1].
             - The distance between the robot at index 0 and 1 is
               abs(-3 - (-1)) = 2.
             - The distance between the robot at index 0 and 2 is
               abs(-3 - 1) = 4.
             - The distance between the robot at index 1 and 2 is
               abs(-1 - 1) = 2.
             - The sum of the pairs of all distances = 2 + 4 + 2 = 8.

Example 2:
Input: nums = [1,0], s = "RL", d = 2
Output: 5
Explanation: - After 1 second, the positions are [2,-1].
             - After 2 seconds, the positions are [3,-2].
             The distance between the two robots is abs(-2 - 3) = 5.

Constraints:
* 2 <= nums.length <= 10^5
* -2 * 10^9 <= nums[i] <= 2 * 10^9
* 0 <= d <= 10^9
* nums.length == s.length
* s consists of 'L' and 'R' only
* nums[i] will be unique.*/

function sumDistance(nums: number[], s: string, d: number): number {
    const mod = 1_000_000_007;
    for (const [i, ch] of s.split('').entries())
        if (ch == 'L') nums[i] -= d;
        else nums[i] += d;
    nums.sort((x, y) => x-y);
    let ans = 0, prefix = 0;
    for (const [i, x] of nums.entries()) {
        ans = (ans + i*x - prefix) % mod;
        prefix = (prefix + x) % mod;
    }
    return ans;
};


/*2732. Find a Good Subset of the Matrix (Hard)
You are given a 0-indexed m x n binary matrix grid. Let us call a non-empty
subset of rows good if the sum of each column of the subset is at most half
of the length of the subset. More formally, if the length of the chosen
subset of rows is k, then the sum of each column should be at most
floor(k / 2). Return an integer array that contains row indices of a good
subset sorted in ascending order. If there are multiple good subsets, you
can return any of them. If there are no good subsets, return an empty array.
A subset of rows of the matrix grid is any matrix that can be obtained by
deleting some (possibly none or all) rows from grid.

Example 1:
Input: grid = [[0,1,1,0],[0,0,0,1],[1,1,1,1]]
Output: [0,1]
Explanation: We can choose the 0th and 1st rows to create a good subset of rows.
             The length of the chosen subset is 2.
             - The sum of the 0th column is 0 + 0 = 0, which is at most half of the length of the subset.
             - The sum of the 1st column is 1 + 0 = 1, which is at most half of the length of the subset.
             - The sum of the 2nd column is 1 + 0 = 1, which is at most half of the length of the subset.
             - The sum of the 3rd column is 0 + 1 = 1, which is at most half of the length of the subset.

Example 2:
Input: grid = [[0]]
Output: [0]
Explanation: We can choose the 0th row to create a good subset of rows.
             The length of the chosen subset is 1.
             - The sum of the 0th column is 0, which is at most half of the length of the subset.

Example 3:
Input: grid = [[1,1,1],[1,1,1]]
Output: []
Explanation: It is impossible to choose any subset of rows to create a good subset.

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m <= 10^4
* 1 <= n <= 5
* grid[i][j] is either 0 or 1.*/

function goodSubsetofBinaryMatrix(grid: number[][]): number[] {
    const m = grid.length, n = grid[0].length;
    const seen = new Map();
    for (const [i, row] of grid.entries()) {
        const v = row.reduce((s, x, j) => s ^ x*(1<<j), 0);
        if (v == 0) return [i];
        for (const [vv, ii] of seen.entries())
            if ((vv & v) == 0) return [ii, i];
        seen.set(v, i);
    }
    return [];
};


/*2733. Neither Minimum nor Maximum (Easy)
Given an integer array nums containing distinct positive integers, find and
return any number from the array that is neither the minimum nor the maximum
value in the array, or -1 if there is no such number. Return the selected
integer.

Example 1:
Input: nums = [3,2,1,4]
Output: 2
Explanation: In this example, the minimum value is 1 and the maximum value
             is 4. Therefore, either 2 or 3 can be valid answers.

Example 2:
Input: nums = [1,2]
Output: -1
Explanation: Since there is no number in nums that is neither the maximum
             nor the minimum, we cannot select a number that satisfies the
             given condition. Therefore, there is no answer.

Example 3:
Input: nums = [2,1,3]
Output: 2
Explanation: Since 2 is neither the maximum nor the minimum value in nums,
             it is the only valid answer.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100
* All values in nums are distinct*/

function findNonMinOrMax(nums: number[]): number {
    if (nums.length < 3) return -1;
    return nums.slice(0, 3).sort((a, b) => (a-b))[1];
};


/*2734. Lexicographically Smallest String After Substring Operation (Medium)
Given a string s consisting of lowercase English letters. Perform the
following operation:
* Select any non-empty substring then replace every letter of the substring
  with the preceding letter of the English alphabet. For example, 'b' is
  converted to 'a', and 'a' is converted to 'z'.
Return the lexicographically smallest string after performing the operation.

Example 1:
Input: s = "cbabc"
Output: "baabc"
Explanation: Perform the operation on the substring starting at index 0, and
             ending at index 1 inclusive.

Example 2:
Input: s = "aa"
Output: "az"
Explanation: Perform the operation on the last letter.

Example 3:
Input: s = "acbbc"
Output: "abaab"
Explanation: Perform the operation on the substring starting at index 1, and
             ending at index 4 inclusive.

Example 4:
Input: s = "leetcode"
Output: "kddsbncd"
Explanation: Perform the operation on the entire string.

Constraints:
* 1 <= s.length <= 3 * 10^5
* s consists of lowercase English letters*/

function smallestString(s: string): string {
    const ch = s.split(''), n = ch.length;
    for (var i = 0; i < n && ch[i] == 'a'; ++i);
    if (i == n) ch[n-1] = 'z';
    for (; i < n && ch[i] != 'a'; ++i)
        ch[i] = String.fromCharCode(ch[i].charCodeAt(0)-1);
    return ch.join('');
};


/*2735. Collecting Chocolates (Medium)
You are given a 0-indexed integer array nums of size n representing the cost
of collecting different chocolates. The cost of collecting the chocolate at
the index i is nums[i]. Each chocolate is of a different type, and initially,
the chocolate at the index i is of ith type. In one operation, you can do
the following with an incurred cost of x:
* Simultaneously change the chocolate of ith type to ((i + 1) mod n)th type
  for all chocolates.
Return the minimum cost to collect chocolates of all types, given that you
can perform as many operations as you would like.

Example 1:
Input: nums = [20,1,15], x = 5
Output: 13
Explanation: - Initially, the chocolate types are [0,1,2]. We will buy the
               1st type of chocolate at a cost of 1.
             - Now, we will perform the operation at a cost of 5, and the
               types of chocolates will become [1,2,0]. We will buy the 2nd
               type of chocolate at a cost of 1.
             - Now, we will again perform the operation at a cost of 5, and
               the chocolate types will become [2,0,1]. We will buy the 0th
               type of chocolate at a cost of 1.
             Thus, the total cost will become (1 + 5 + 1 + 5 + 1) = 13. We
             can prove that this is optimal.

Example 2:
Input: nums = [1,2,3], x = 4
Output: 6
Explanation: We will collect all three types of chocolates at their own
             price without performing any operations. Therefore, the total
             cost is 1 + 2 + 3 = 6.

Constraints:
* 1 <= nums.length <= 1000
* 1 <= nums[i] <= 10^9
* 1 <= x <= 10^9*/

function minCost(nums: number[], x: number): number {
    const n = nums.length;
    const ans = Array(n).fill(0);
    for (let [i, prefix] of nums.entries()) {
        ans[i] += i*x;
        for (let j = 0; j < n; ++j) {
            prefix = Math.min(prefix, nums[(i-j+n)%n]);
            ans[j] += prefix;
        }
    }
    return Math.min(...ans);
};


/*2736. Maximum Sum Queries (Hard)
You are given two 0-indexed integer arrays nums1 and nums2, each of length
n, and a 1-indexed 2D array queries where queries[i] = [xi, yi]. For the ith
query, find the maximum value of nums1[j] + nums2[j] among all indices j
(0 <= j < n), where nums1[j] >= xi and nums2[j] >= yi, or -1 if there is no
j satisfying the constraints. Return an array answer where answer[i] is the
answer to the ith query.

Example 1:
Input: nums1 = [4,3,1,2], nums2 = [2,4,9,5], queries = [[4,1],[1,3],[2,5]]
Output: [6,10,7]
Explanation: - For the 1st query xi = 4 and yi = 1, we can select index
               j = 0 since nums1[j] >= 4 and nums2[j] >= 1. The sum
               nums1[j] + nums2[j] is 6, and we can show that 6 is the
               maximum we can obtain.
             - For the 2nd query xi = 1 and yi = 3, we can select index
               j = 2 since nums1[j] >= 1 and nums2[j] >= 3. The sum
               nums1[j] + nums2[j] is 10, and we can show that 10 is the
               maximum we can obtain.
             - For the 3rd query xi = 2 and yi = 5, we can select index
               j = 3 since nums1[j] >= 2 and nums2[j] >= 5. The sum
               nums1[j] + nums2[j] is 7, and we can show that 7 is the
               maximum we can obtain.
             Therefore, we return [6,10,7].

Example 2:
Input: nums1 = [3,2,5], nums2 = [2,3,4], queries = [[4,4],[3,2],[1,1]]
Output: [9,9,9]
Explanation: For this example, we can use index j = 2 for all the queries
             since it satisfies the constraints for each query.

Example 3:
Input: nums1 = [2,1], nums2 = [2,3], queries = [[3,3]]
Output: [-1]
Explanation: There is one query in this example with xi = 3 and yi = 3. For
             every index, j, either nums1[j] < xi or nums2[j] < yi. Hence,
             there is no solution.

Constraints:
* nums1.length == nums2.length
* n == nums1.length
* 1 <= n <= 10^5
* 1 <= nums1[i], nums2[i] <= 10^9
* 1 <= queries.length <= 10^5
* queries[i].length == 2
* xi == queries[i][1]
* yi == queries[i][2]
* 1 <= xi, yi <= 10^9*/

class Fenwick {
    private nums: number[];

    constructor(n) {
        this.nums = Array(n+1).fill(0);
    }

    update(k, v) {
        for (++k; k < this.nums.length; k += k & -k)
            this.nums[k] = Math.max(this.nums[k], v);
    }

    query(k) {
        let ans = 0;
        for (++k; k; k -= k & -k)
            ans = Math.max(ans, this.nums[k]);
        return ans;
    }
}

function maximumSumQueries(nums1: number[], nums2: number[], queries: number[][]): number[] {
    const n = nums1.length, q = queries.length;
    const mp = new Map();
    const uniq = new Set(nums2.concat(queries.map(x => x[1])));
    [...uniq].sort((x, y) => y-x).forEach((x, i) => mp.set(x, i));
    const both = nums1.map((x, i) => [x, nums2[i]]).sort((x, y) => y[0]-x[0]);
    const ans = Array(q).fill(0);
    const idx = Array(q).fill(0).map((x, i) => i).sort((i, j) => queries[j][0] - queries[i][0]);
    const fen = new Fenwick(mp.size);
    let j = 0;
    for (const i of idx) {
        const x = queries[i][0], y = queries[i][1];
        for (; j < both.length && both[j][0] >= x; ++j) {
            const k = mp.get(both[j][1]), v = both[j][0] + both[j][1];
            fen.update(k, v);
        }
        let cand = fen.query(mp.get(y));
        if (cand === 0) cand = -1;
        ans[i] = cand;
    }
    return ans;
};


/*2737. Find the Closest Marked Node (Medium)
You are given a positive integer n which is the number of nodes of a 0-
indexed directed weighted graph and a 0-indexed 2D array edges where
edges[i] = [ui, vi, wi] indicates that there is an edge from node ui to node
vi with weight wi. You are also given a node s and a node array marked; your
task is to find the minimum distance from s to any of the nodes in marked.
Return an integer denoting the minimum distance from s to any node in marked
or -1 if there are no paths from s to any of the marked nodes.

Example 1:
Input: n = 4, edges = [[0,1,1],[1,2,3],[2,3,2],[0,3,4]], s = 0, marked = [2,3]
Output: 4
Explanation: There is one path from node 0 (the green node) to node 2 (a red
             node), which is 0->1->2, and has a distance of 1 + 3 = 4. There
             are two paths from node 0 to node 3 (a red node), which are
             0->1->2->3 and 0->3, the first one has a distance of
             1 + 3 + 2 = 6 and the second one has a distance of 4. The
             minimum of them is 4.

Example 2:
Input: n = 5, edges = [[0,1,2],[0,2,4],[1,3,1],[2,3,3],[3,4,2]], s = 1, marked = [0,4]
Output: 3
Explanation: There are no paths from node 1 (the green node) to node 0 (a
             red node). There is one path from node 1 to node 4 (a red
             node), which is 1->3->4, and has a distance of 1 + 2 = 3. So
             the answer is 3.

Example 3:
Input: n = 4, edges = [[0,1,1],[1,2,3],[2,3,2]], s = 3, marked = [0,1]
Output: -1
Explanation: There are no paths from node 3 (the green node) to any of the
             marked nodes (the red nodes), so the answer is -1.

Constraints:
* 2 <= n <= 500
* 1 <= edges.length <= 10^4
* edges[i].length = 3
* 0 <= edges[i][0], edges[i][1] <= n - 1
* 1 <= edges[i][2] <= 10^6
* 1 <= marked.length <= n - 1
* 0 <= s, marked[i] <= n - 1
* s != marked[i]
* marked[i] != marked[j] for every i != j
* The graph might have repeated edges.
* The graph is generated such that it has no self-loops.*/

function minimumDistance(n: number, edges: number[][], s: number, marked: number[]): number {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v, w] of edges)
        graph[u].push([v, w]);
    const seen = new Set(marked);
    const pq = new PriorityQueue({ compare: (x, y) => x[0] - y[0]}); pq.enqueue([0, s]);
    const dist = Array(n).fill(1e9); dist[s] = 0;
    while (pq.size()) {
        const [x, u] = pq.dequeue();
        if (seen.has(u)) return x;
        for (const [v, w] of graph[u])
            if (x+w < dist[v]) {
                dist[v] = x+w;
                pq.enqueue([x+w, v]);
            }
    }
    return -1;
};


/*2739. Total Distance Traveled (Easy)
A truck has two fuel tanks. You are given two integers, mainTank
representing the fuel present in the main tank in liters and additionalTank
representing the fuel present in the additional tank in liters. The truck
has a mileage of 10 km per liter. Whenever 5 liters of fuel get used up in
the main tank, if the additional tank has at least 1 liters of fuel, 1
liters of fuel will be transferred from the additional tank to the main
tank. Return the maximum distance which can be traveled. Note: Injection
from the additional tank is not continuous. It happens suddenly and
immediately for every 5 liters consumed.

Example 1:
Input: mainTank = 5, additionalTank = 10
Output: 60
Explanation: - After spending 5 litre of fuel, fuel remaining is
               (5 - 5 + 1) = 1 litre and distance traveled is 50km.
             - After spending another 1 litre of fuel, no fuel gets injected
               in the main tank and the main tank becomes empty.
             Total distance traveled is 60km.

Example 2:
Input: mainTank = 1, additionalTank = 2
Output: 10
Explanation: After spending 1 litre of fuel, the main tank becomes empty.
             Total distance traveled is 10km.

Constraints: 1 <= mainTank, additionalTank <= 100*/

function distanceTraveled(mainTank: number, additionalTank: number): number {
    let ans = 0;
    while (mainTank >= 5) {
        let q = Math.floor(mainTank/5);
        mainTank %= 5;
        ans += 50*q;
        q = Math.min(q, additionalTank);
        mainTank += q;
        additionalTank -= q;
    }
    return ans + 10*mainTank;
};


/*2740. Find the Value of the Partition (Medium)
You are given a positive integer array nums. Partition nums into two arrays,
nums1 and nums2, such that:
* Each element of the array nums belongs to either the array nums1 or the
  array nums2.
* Both arrays are non-empty.
* The value of the partition is minimized.
The value of the partition is |max(nums1) - min(nums2)|. Here, max(nums1)
denotes the maximum element of the array nums1, and min(nums2) denotes the
minimum element of the array nums2. Return the integer denoting the value of
such partition.

Example 1:
Input: nums = [1,3,2,4]
Output: 1
Explanation: We can partition the array nums into nums1 = [1,2] and
             nums2 = [3,4].
             - The maximum element of the array nums1 is equal to 2.
             - The minimum element of the array nums2 is equal to 3.
             The value of the partition is |2 - 3| = 1. It can be proven
             that 1 is the minimum value out of all partitions.

Example 2:
Input: nums = [100,1,10]
Output: 9
Explanation: We can partition the array nums into nums1 = [10] and
             nums2 = [100,1].
             - The maximum element of the array nums1 is equal to 10.
             - The minimum element of the array nums2 is equal to 1.
             The value of the partition is |10 - 1| = 9. It can be proven
             that 9 is the minimum value out of all partitions.

Constraints:
* 2 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

function findValueOfPartition(nums: number[]): number {
    nums.sort((x, y) => x-y);
    let ans = Infinity;
    for (let i = 0; i < nums.length-1; ++i)
        ans = Math.min(ans, nums[i+1]-nums[i]);
    return ans;
};


/*2741. Special Permutations (Medium)
You are given a 0-indexed integer array nums containing n distinct positive
integers. A permutation of nums is called special if:
* For all indexes 0 <= i < n - 1, either nums[i] % nums[i+1] == 0 or
  nums[i+1] % nums[i] == 0.
Return the total number of special permutations. As the answer could be
large, return it modulo 10^9 + 7.

Example 1:
Input: nums = [2,3,6]
Output: 2
Explanation: [3,6,2] and [2,6,3] are the two special permutations of nums.

Example 2:
Input: nums = [1,4,3]
Output: 2
Explanation: [3,1,4] and [4,1,3] are the two special permutations of nums.

Constraints:
* 2 <= nums.length <= 14
* 1 <= nums[i] <= 10^9*/

function specialPerm(nums: number[]): number {
    const mod = 1_000_000_007, n = nums.length;
    const memo = Array(n).fill(0).map(() => Array(1<<n).fill(-1));

    function fn(i, m) {
        if (m+1 == 1<<n) return 1;
        if (memo[i][m] == -1) {
            memo[i][m] = 0;
            for (let j = 0; j < n; ++j)
                if ((m & 1<<j) == 0 && (nums[i]%nums[j] == 0 || nums[j]%nums[i] == 0))
                    memo[i][m] = (memo[i][m] + fn(j, m^1<<j)) % mod;
        }
        return memo[i][m];
    }

    let ans = 0;
    for (let i = 0; i < n; ++i)
        ans = (ans + fn(i, 1<<i)) % mod;
    return ans;
};


/*2742. Painting the Walls (Hard)
You are given two 0-indexed integer arrays, cost and time, of size n
representing the costs and the time taken to paint n different walls
respectively. There are two painters available:
* A paid painter that paints the ith wall in time[i] units of time and takes
  cost[i] units of money.
* A free painter that paints any wall in 1 unit of time at a cost of 0. But
  the free painter can only be used if the paid painter is already occupied.
Return the minimum amount of money required to paint the n walls.

Example 1:
Input: cost = [1,2,3,2], time = [1,2,3,2]
Output: 3
Explanation: The walls at index 0 and 1 will be painted by the paid painter,
             and it will take 3 units of time; meanwhile, the free painter
             will paint the walls at index 2 and 3, free of cost in 2 units
             of time. Thus, the total cost is 1 + 2 = 3.

Example 2:
Input: cost = [2,3,4,2], time = [1,1,1,1]
Output: 4
Explanation: The walls at index 0 and 3 will be painted by the paid painter,
             and it will take 2 units of time; meanwhile, the free painter
             will paint the walls at index 1 and 2, free of cost in 2 units
             of time. Thus, the total cost is 2 + 2 = 4.

Constraints:
* 1 <= cost.length <= 500
* cost.length == time.length
* 1 <= cost[i] <= 10^6
* 1 <= time[i] <= 500*/

function paintWalls(cost: number[], time: number[]): number {
    const n = cost.length;
    const dp = Array(n+1).fill(0).map(() => Array(n+1).fill(Infinity));
    for (let i = n-1; i >= 0; --i)
        for (let j = 0; j <= n; ++j) {
            dp[i][j] = dp[i+1][j];
            let cand = cost[i];
            if (j > 1+time[i]) cand += dp[i+1][j-1-time[i]];
            dp[i][j] = Math.min(dp[i][j], cand);
        }
    return dp[0][n];
};


/*2743. Count Substrings Without Repeating Character (Medium)
You are given a string s consisting only of lowercase English letters. We
call a substring special if it contains no character which has occurred at
least twice (in other words, it does not contain a repeating character).
Your task is to count the number of special substrings. For example, in the
string "pop", the substring "po" is a special substring, however, "pop" is
not special (since 'p' has occurred twice). Return the number of special
substrings. A substring is a contiguous sequence of characters within a
string. For example, "abc" is a substring of "abcd", but "acd" is not.

Example 1:
Input: s = "abcd"
Output: 10
Explanation: Since each character occurs once, every substring is a special
             substring. We have 4 substrings of length one, 3 of length two,
             2 of length three, and 1 substring of length four. So overall
             there are 4 + 3 + 2 + 1 = 10 special substrings.

Example 2:
Input: s = "ooo"
Output: 3
Explanation: Any substring with a length of at least two contains a
             repeating character. So we have to count the number of
             substrings of length one, which is 3.

Example 3:
Input: s = "abab"
Output: 7
Explanation: Special substrings are as follows (sorted by their start positions):
             Special substrings of length 1: "a", "b", "a", "b"
             Special substrings of length 2: "ab", "ba", "ab"
             And it can be shown that there are no special substrings with a
             length of at least three. So the answer would be 4 + 3 = 7.

Constraints:
* 1 <= s.length <= 10^5
* s consists of lowercase English letters*/

function numberOfSpecialSubstrings(s: string): number {
    let ans = 0;
    const prev = new Map();
    for (let i = 0, ii = -1; i < s.length; ++i) {
        if (prev.has(s[i])) ii = Math.max(ii, prev.get(s[i]));
        prev.set(s[i], i);
        ans += i-ii;
    }
    return ans;
};


/*2744. Find Maximum Number of String Pairs (Easy)
You are given a 0-indexed array words consisting of distinct strings. The
string words[i] can be paired with the string words[j] if:
* The string words[i] is equal to the reversed string of words[j].
* 0 <= i < j < words.length.
Return the maximum number of pairs that can be formed from the array words.
Note that each string can belong in at most one pair.

Example 1:
Input: words = ["cd","ac","dc","ca","zz"]
Output: 2
Explanation: In this example, we can form 2 pair of strings in the following
             way:
             - We pair the 0th string with the 2nd string, as the reversed
               string of word[0] is "dc" and is equal to words[2].
             - We pair the 1st string with the 3rd string, as the reversed
               string of word[1] is "ca" and is equal to words[3].
             It can be proven that 2 is the maximum number of pairs that can
             be formed.

Example 2:
Input: words = ["ab","ba","cc"]
Output: 1
Explanation: In this example, we can form 1 pair of strings in the following
             way:
             - We pair the 0th string with the 1st string, as the reversed
               string of words[1] is "ab" and is equal to words[0].
             It can be proven that 1 is the maximum number of pairs that can
             be formed.

Example 3:
Input: words = ["aa","ab"]
Output: 0
Explanation: In this example, we are unable to form any pair of strings.

Constraints:
* 1 <= words.length <= 50
* words[i].length == 2
* words consists of distinct strings.
* words[i] contains only lowercase English letters.*/

function maximumNumberOfStringPairs(words: string[]): number {
    let ans = 0, seen = new Set();
    for (const w of words) {
        const ww = w.split("").reverse().join("");
        if (seen.has(ww)) ++ans;
        seen.add(w);
    }
    return ans;
};


/*2745. Construct the Longest New String (Medium)
You are given three integers x, y, and z. You have x strings equal to "AA",
y strings equal to "BB", and z strings equal to "AB". You want to choose
some (possibly all or none) of these strings and concatenate them in some
order to form a new string. This new string must not contain "AAA" or "BBB"
as a substring. Return the maximum possible length of the new string. A
substring is a contiguous non-empty sequence of characters within a string.

Example 1:
Input: x = 2, y = 5, z = 1
Output: 12
Explanation: We can concactenate the strings "BB", "AA", "BB", "AA", "BB",
             and "AB" in that order. Then, our new string is "BBAABBAABBAB".
             That string has length 12, and we can show that it is
             impossible to construct a string of longer length.

Example 2:
Input: x = 3, y = 2, z = 2
Output: 14
Explanation: We can concactenate the strings "AB", "AB", "AA", "BB", "AA",
             "BB", and "AA" in that order. Then, our new string is
             "ABABAABBAABBAA". That string has length 14, and we can show
             that it is impossible to construct a string of longer length.

Constraints: 1 <= x, y, z <= 50*/

function longestString(x: number, y: number, z: number): number {
    return 2*(Math.min(x+y, 2*x+1, 2*y+1) + z);
};


/*2746. Decremental String Concatenation (Medium)
You are given a 0-indexed array words containing n strings. Let's define a
join operation join(x, y) between two strings x and y as concatenating them
into xy. However, if the last character of x is equal to the first character
of y, one of them is deleted. For example join("ab", "ba") = "aba" and
join("ab", "cde") = "abcde". You are to perform n - 1 join operations. Let
str0 = words[0]. Starting from i = 1 up to i = n - 1, for the ith operation,
you can do one of the following:
* Make stri = join(stri - 1, words[i])
* Make stri = join(words[i], stri - 1)
Your task is to minimize the length of strn - 1. Return an integer denoting
the minimum possible length of strn - 1.

Example 1:
Input: words = ["aa","ab","bc"]
Output: 4
Explanation: In this example, we can perform join operations in the
             following order to minimize the length of str2:
             - str0 = "aa"
             - str1 = join(str0, "ab") = "aab"
             - str2 = join(str1, "bc") = "aabc"
             It can be shown that the minimum possible length of str2 is 4.

Example 2:
Input: words = ["ab","b"]
Output: 2
Explanation: In this example, str0 = "ab", there are two ways to get str1:
             join(str0, "b") = "ab" or join("b", str0) = "bab".
             The first string, "ab", has the minimum length. Hence, the
             answer is 2.

Example 3:
Input: words = ["aaa","c","aba"]
Output: 6
Explanation: In this example, we can perform join operations in the
             following order to minimize the length of str2:
             - str0 = "aaa"
             - str1 = join(str0, "c") = "aaac"
             - str2 = join("aba", str1) = "abaaac"
             It can be shown that the minimum possible length of str2 is 6.

Constraints:
* 1 <= words.length <= 1000
* 1 <= words[i].length <= 50
* Each character in words[i] is an English lowercase letter*/

function minimizeConcatenatedLength(words: string[]): number {
    const n = words.length;
    const memo = Array(n).fill(0).map(() => Array(26).fill(0).map(() => Array(26).fill(-1)));

    function fn(i, s, e) {
        if (i === n) return 0;
        if (memo[i][s][e] == -1) {
            const w = words[i], sz = w.length;
            const cand1 = fn(i+1, s, w.charCodeAt(sz-1)-97) - (e == w.charCodeAt(0)-97 ? 1 : 0);
            const cand2 = fn(i+1, w.charCodeAt(0)-97, e) - (s == w.charCodeAt(sz-1)-97 ? 1 : 0);
            memo[i][s][e] = sz + Math.min(cand1, cand2);
        }
        return memo[i][s][e];
    }

    const w = words[0], sz = w.length;
    return sz + fn(1, w.charCodeAt(0)-97, w.charCodeAt(sz-1)-97);
};


/*2747. Count Zero Request Servers (Medium)
You are given an integer n denoting the total number of servers and a 2D
0-indexed integer array logs, where logs[i] = [server_id, time] denotes that
the server with id server_id received a request at time time. You are also
given an integer x and a 0-indexed integer array queries. Return a 0-indexed
integer array arr of length queries.length where arr[i] represents the
number of servers that did not receive any requests during the time interval
[queries[i] - x, queries[i]]. Note that the time intervals are inclusive.

Example 1:
Input: n = 3, logs = [[1,3],[2,6],[1,5]], x = 5, queries = [10,11]
Output: [1,2]
Explanation:  - For queries[0]: The servers with ids 1 and 2 get requests in
                the duration of [5, 10]. Hence, only server 3 gets zero
                requests.
              - For queries[1]: Only the server with id 2 gets a request in
                duration of [6,11]. Hence, the servers with ids 1 and 3 are
                the only servers that do not receive any requests during
                that time period.

Example 2:
Input: n = 3, logs = [[2,4],[2,1],[1,2],[3,1]], x = 2, queries = [3,4]
Output: [0,1]
Explanation: - For queries[0]: All servers get at least one request in the
               duration of [1, 3].
             - For queries[1]: Only server with id 3 gets no request in the
               duration [2,4].

Constraints:
* 1 <= n <= 10^5
* 1 <= logs.length <= 10^5
* 1 <= queries.length <= 10^5
* logs[i].length == 2
* 1 <= logs[i][0] <= n
* 1 <= logs[i][1] <= 10^6
* 1 <= x <= 10^5
* x < queries[i] <= 10^6*/

function countServers(n: number, logs: number[][], x: number, queries: number[]): number[] {
    logs.sort((x, y) => x[1] - y[1]);
    const sz = queries.length;
    const ans = Array(sz).fill(0), idx = Array(sz).fill(0).map((x, i) => i);
    idx.sort((i, j) => queries[i] - queries[j]);
    const freq = new Map();
    let j = 0, jj = 0;
    for (const i of idx) {
        for (; j < logs.length && logs[j][1] <= queries[i]; ++j)
            freq.set(logs[j][0], 1 + (freq.get(logs[j][0]) ?? 0));
        for (; jj < logs.length && logs[jj][1] < queries[i]-x; ++jj) {
            freq.set(logs[jj][0], freq.get(logs[jj][0]) - 1);
            if (freq.get(logs[jj][0]) == 0) freq.delete(logs[jj][0]);
        }
        ans[i] = n - freq.size;
    }
    return ans;
};


/*2748. Number of Beautiful Pairs (Easy)
You are given a 0-indexed integer array nums. A pair of indices i, j where
0 <= i < j < nums.length is called beautiful if the first digit of nums[i]
and the last digit of nums[j] are coprime. Return the total number of
beautiful pairs in nums. Two integers x and y are coprime if there is no
integer greater than 1 that divides both of them. In other words, x and y
are coprime if gcd(x, y) == 1, where gcd(x, y) is the greatest common
divisor of x and y.

Example 1:
Input: nums = [2,5,1,4]
Output: 5
Explanation: There are 5 beautiful pairs in nums:
             - When i = 0 and j = 1: the first digit of nums[0] is 2, and
               the last digit of nums[1] is 5. We can confirm that 2 and 5
               are coprime, since gcd(2,5) == 1.
             - When i = 0 and j = 2: the first digit of nums[0] is 2, and
               the last digit of nums[2] is 1. Indeed, gcd(2,1) == 1.
             - When i = 1 and j = 2: the first digit of nums[1] is 5, and
               the last digit of nums[2] is 1. Indeed, gcd(5,1) == 1.
             - When i = 1 and j = 3: the first digit of nums[1] is 5, and
               the last digit of nums[3] is 4. Indeed, gcd(5,4) == 1.
             - When i = 2 and j = 3: the first digit of nums[2] is 1, and
               the last digit of nums[3] is 4. Indeed, gcd(1,4) == 1.
             Thus, we return 5.

Example 2:
Input: nums = [11,21,12]
Output: 2
Explanation: There are 2 beautiful pairs:
             - When i = 0 and j = 1: the first digit of nums[0] is 1, and
               the last digit of nums[1] is 1. Indeed, gcd(1,1) == 1.
             - When i = 0 and j = 2: the first digit of nums[0] is 1, and
               the last digit of nums[2] is 2. Indeed, gcd(1,2) == 1.
             Thus, we return 2.

Constraints:
* 2 <= nums.length <= 100
* 1 <= nums[i] <= 9999
* nums[i] % 10 != 0*/

function countBeautifulPairs(nums: number[]): number {
    let ans = 0;
    const freq = new Map();

    function gcd(x, y) {
        while (y)
            [x, y] = [y, x%y];
        return x;
    }

    for (let x of nums) {
        for (let y = 0; y < 10; ++y)
            if (gcd(x%10, y) == 1) ans += freq.get(y) ?? 0;
        for (; x >= 10; x = Math.floor(x/10));
        freq.set(x, 1 + (freq.get(x) ?? 0));
    }
    return ans;
};


/*2749. Minimum Operations to Make the Integer Zero (Medium)
You are given two integers num1 and num2. In one operation, you can choose
integer i in the range [0, 60] and subtract 2i + num2 from num1. Return the
integer denoting the minimum number of operations needed to make num1 equal
to 0. If it is impossible to make num1 equal to 0, return -1.

Example 1:
Input: num1 = 3, num2 = -2
Output: 3
Explanation: We can make 3 equal to 0 with the following operations:
             - We choose i = 2 and substract 22 + (-2) from 3,
               3 - (4 + (-2)) = 1.
             - We choose i = 2 and substract 22 + (-2) from 1,
               1 - (4 + (-2)) = -1.
             - We choose i = 0 and substract 20 + (-2) from -1,
               (-1) - (1 + (-2)) = 0.
             It can be proven, that 3 is the minimum number of operations
             that we need to perform.

Example 2:
Input: num1 = 5, num2 = 7
Output: -1
Explanation: It can be proven, that it is impossible to make 5 equal to 0
             with the given operation.

Constraints:
* 1 <= num1 <= 10^9
* -10^9 <= num2 <= 10^9*/

function makeTheIntegerZero(num1: number, num2: number): number {
    for (let i = 1; true; ++i) {
        const diff = num1 - i*num2;
        if (diff <= 0) break;
        if (diff.toString(2).split('1').length-1 <= i && i <= diff) return i;
    }
    return -1;
};


/*2750. Ways to Split Array Into Good Subarrays (Medium)
You are given a binary array nums. A subarray of an array is good if it
contains exactly one element with the value 1. Return an integer denoting
the number of ways to split the array nums into good subarrays. As the
number may be too large, return it modulo 10^9 + 7. A subarray is a
contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [0,1,0,0,1]
Output: 3
Explanation: There are 3 ways to split nums into good subarrays:
             - [0,1] [0,0,1]
             - [0,1,0] [0,1]
             - [0,1,0,0] [1]

Example 2:
Input: nums = [0,1,0]
Output: 1
Explanation: There is 1 way to split nums into good subarrays:
             - [0,1,0]

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] <= 1*/

function numberOfGoodSubarraySplits(nums: number[]): number {
    let ans = 0, cnt = 0;
    for (const x of nums)
        if (x == 0) ++cnt;
        else {
            if (ans) ans = ans * (cnt+1) % 1_000_000_007;
            else ans = 1;
            cnt = 0;
        }
    return ans;
};


/*2751. Robot Collisions (Hard)
There are n 1-indexed robots, each having a position on a line, health, and
movement direction. You are given 0-indexed integer arrays positions,
healths, and a string directions (directions[i] is either 'L' for left or
'R' for right). All integers in positions are unique. All robots start
moving on the line simultaneously at the same speed in their given
directions. If two robots ever share the same position while moving, they
will collide. If two robots collide, the robot with lower health is removed
from the line, and the health of the other robot decreases by one. The
surviving robot continues in the same direction it was going. If both robots
have the same health, they are both removed from the line. Your task is to
determine the health of the robots that survive the collisions, in the same
order that the robots were given, i.e. final heath of robot 1 (if survived),
final health of robot 2 (if survived), and so on. If there are no survivors,
return an empty array. Return an array containing the health of the
remaining robots (in the order they were given in the input), after no
further collisions can occur. Note: The positions may be unsorted.

Example 1:
Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
Output: [2,17,9,15,10]
Explanation: No collision occurs in this example, since all robots are
             moving in the same direction. So, the health of the robots in
             order from the first robot is returned, [2, 17, 9, 15, 10].

Example 2:
Input: positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"
Output: [14]
Explanation: There are 2 collisions in this example. Firstly, robot 1 and
             robot 2 will collide, and since both have the same health, they
             will be removed from the line. Next, robot 3 and robot 4 will
             collide and since robot 4's health is smaller, it gets removed,
             and robot 3's health becomes 15 - 1 = 14. Only robot 3 remains,
             so we return [14].

Example 3:
Input: positions = [1,2,5,6], healths = [10,10,11,11], directions = "RLRL"
Output: []
Explanation: Robot 1 and robot 2 will collide and since both have the same
             health, they are both removed. Robot 3 and 4 will collide and
             since both have the same health, they are both removed. So, we
             return an empty array, [].

Constraints:
* 1 <= positions.length == healths.length == directions.length == n <= 10^5
* 1 <= positions[i], healths[i] <= 10^9
* directions[i] == 'L' or directions[i] == 'R'
* All values in positions are distinct*/

function survivedRobotsHealths(positions: number[], healths: number[], directions: string): number[] {
    const n = positions.length, ans = Array(n).fill(0), stack = [], vals = [];
    for (let i = 0; i < n; ++i)
        vals.push([positions[i], healths[i], directions[i], i]);
    vals.sort((x, y) => x[0]-y[0]);
    for (let [p, h, d, i] of vals) {
        if (d == 'R') stack.push([p, h, d, i]);
        else {
            while (stack.length && h) {
                const [pp, hh, dd, ii] = stack.pop();
                if (hh < h) --h;
                else {
                    if (hh > h) stack.push([pp, hh-1, dd, ii]);
                    h = 0;
                }
            }
            ans[i] = h;
        }
    }
    while (stack.length) {
        const [p, h, d, i] = stack.pop();
        ans[i] = h;
    }
    return ans.filter(x => x != 0);
};


/*2758. Next Day (Easy)
Write code that enhances all date objects such that you can call the
date.nextDay() method on any date object and it will return the next day in the
format YYYY-MM-DD as a string.

Example 1:
Input: date = "2014-06-20"
Output: "2014-06-21"
Explanation: const date = new Date("2014-06-20");
             date.nextDay(); // "2014-06-21"

Example 2:
Input: date = "2017-10-31"
Output: "2017-11-01"
Explanation: The day after 2017-10-31 is 2017-11-01.

Constraints: new Date(date) is a valid date object*/

Date.prototype.nextDay = function(): string {
    const date = new Date(this);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}


/*2760. Longest Even Odd Subarray With Threshold (Easy)
You are given a 0-indexed integer array nums and an integer threshold. Find
the length of the longest subarray of nums starting at index l and ending at
index r (0 <= l <= r < nums.length) that satisfies the following conditions:
* nums[l] % 2 == 0
* For all indices i in the range [l, r - 1], nums[i] % 2 != nums[i + 1] % 2
* For all indices i in the range [l, r], nums[i] <= threshold
Return an integer denoting the length of the longest such subarray. Note: A
subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [3,2,5,4], threshold = 5
Output: 3
Explanation: In this example, we can select the subarray that starts at
             l = 1 and ends at r = 3 => [2,5,4]. This subarray satisfies the
             conditions. Hence, the answer is the length of the subarray, 3.
             We can show that 3 is the maximum possible achievable length.

Example 2:
Input: nums = [1,2], threshold = 2
Output: 1
Explanation: In this example, we can select the subarray that starts at
             l = 1 and ends at r = 1 => [2]. It satisfies all the conditions
             and we can show that 1 is the maximum possible achievable
             length.

Example 3:
Input: nums = [2,3,4,5], threshold = 4
Output: 3
Explanation: In this example, we can select the subarray that starts at
             l = 0 and ends at r = 2 => [2,3,4]. It satisfies all the
             conditions. Hence, the answer is the length of the subarray, 3.
             We can show that 3 is the maximum possible achievable length.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100
* 1 <= threshold <= 100*/

function longestAlternatingSubarray(nums: number[], threshold: number): number {
    let ans = 0, cnt = 0, prev = -1;
    for (const [i, x] of nums.entries()) {
        if (x <= threshold) {
            if (prev == x % 2) cnt = 0;
            if (x % 2 == 0 || cnt) ++cnt;
        } else cnt = 0;
        ans = Math.max(ans, cnt);
        prev = x % 2;
    }
    return ans;
};


/*2761. Prime Pairs With Target Sum (Medium)
You are given an integer n. We say that two integers x and y form a prime
number pair if:
* 1 <= x <= y <= n
* x + y == n
* x and y are prime numbers
Return the 2D sorted list of prime number pairs [xi, yi]. The list should be
sorted in increasing order of xi. If there are no prime number pairs at all,
return an empty array. Note: A prime number is a natural number greater than
1 with only two factors, itself and 1.

Example 1:
Input: n = 10
Output: [[3,7],[5,5]]
Explanation: In this example, there are two prime pairs that satisfy the
             criteria. These pairs are [3,7] and [5,5], and we return them
             in the sorted order as described in the problem statement.

Example 2:
Input: n = 2
Output: []
Explanation: We can show that there is no prime number pair that gives a sum
             of 2, so we return an empty array.

Constraints: 1 <= n <= 10^6*/

function findPrimePairs(n: number): number[][] {
    const sieve = Array(n).fill(true);
    sieve[0] = sieve[1] = false;
    for (let x = 0; x*x <= n; ++x)
        if (sieve[x])
            for (let xx = x*x; xx <= n; xx += x)
                sieve[xx] = false;
    return [...Array(Math.floor(n/2)+1).keys()].filter(x => sieve[x] && sieve[n-x]).map(x => [x, n-x]);
};


/*2762. Continuous Subarrays (Medium)
You are given a 0-indexed integer array nums. A subarray of nums is called
continuous if:
* Let i, i + 1, ..., j be the indices in the subarray. Then, for each pair
  of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
Return the total number of continuous subarrays. A subarray is a contiguous
non-empty sequence of elements within an array.

Example 1:
Input: nums = [5,4,2,4]
Output: 8
Explanation: - Continuous subarray of size 1: [5], [4], [2], [4].
             - Continuous subarray of size 2: [5,4], [4,2], [2,4].
             - Continuous subarray of size 3: [4,2,4].
             - Thereare no subarrys of size 4.
             Total continuous subarrays = 4 + 3 + 1 = 8. It can be shown
             that there are no more continuous subarrays.

Example 2:
Input: nums = [1,2,3]
Output: 6
Explanation: - Continuous subarray of size 1: [1], [2], [3].
             - Continuous subarray of size 2: [1,2], [2,3].
             - Continuous subarray of size 3: [1,2,3].
             - Total continuous subarrays = 3 + 2 + 1 = 6.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

function continuousSubarrays(nums: number[]): number {
    let ans = 0, ii = 0, last = new Map();
    for (const [i, x] of nums.entries()) {
        const temp = new Map();
        for (const [k, v] of last.entries())
            if (Math.abs(x-k) > 2) ii = Math.max(ii, v+1);
            else temp.set(k, v);
        temp.set(x, i);
        last = temp;
        ans += i-ii+1;
    }
    return ans;
};


/*2763. Sum of Imbalance Numbers of All Subarrays (Hard)
The imbalance number of a 0-indexed integer array arr of length n is defined
as the number of indices in sarr = sorted(arr) such that:
* 0 <= i < n - 1, and
* sarr[i+1] - sarr[i] > 1
Here, sorted(arr) is the function that returns the sorted version of arr.
Given a 0-indexed integer array nums, return the sum of imbalance numbers of
all its subarrays. A subarray is a contiguous non-empty sequence of elements
within an array.

Example 1:
Input: nums = [2,3,1,4]
Output: 3
Explanation: There are 3 subarrays with non-zero imbalance numbers:
             - Subarray [3, 1] with an imbalance number of 1.
             - Subarray [3, 1, 4] with an imbalance number of 1.
             - Subarray [1, 4] with an imbalance number of 1.
             The imbalance number of all other subarrays is 0. Hence, the
             sum of imbalance numbers of all the subarrays of nums is 3.

Example 2:
Input: nums = [1,3,3,3,5]
Output: 8
Explanation: There are 7 subarrays with non-zero imbalance numbers:
             - Subarray [1, 3] with an imbalance number of 1.
             - Subarray [1, 3, 3] with an imbalance number of 1.
             - Subarray [1, 3, 3, 3] with an imbalance number of 1.
             - Subarray [1, 3, 3, 3, 5] with an imbalance number of 2.
             - Subarray [3, 3, 3, 5] with an imbalance number of 1.
             - Subarray [3, 3, 5] with an imbalance number of 1.
             - Subarray [3, 5] with an imbalance number of 1.
             The imbalance number of all other subarrays is 0. Hence, the
             sum of imbalance numbers of all the subarrays of nums is 8.

Constraints:
* 1 <= nums.length <= 1000
* 1 <= nums[i] <= nums.length*/

function sumImbalanceNumbers(nums: number[]): number {
    const n = nums.length;
    const left = Array(n).fill(0);
    let ans = 0, seen = Array(n+2).fill(-1);
    for (const [i, x] of nums.entries()) {
        left[i] = Math.max(seen[x+1], seen[x]);
        seen[x] = i;
    }
    seen = Array(n+2).fill(n);
    for (let i = n-1; i >= 0; --i) {
        ans += (i-left[i]) * (seen[nums[i]+1]-i);
        seen[nums[i]] = i;
    }
    return ans - n*(n+1)/2;
};


/*2764. Is Array a Preorder of Some Binary Tree (Medium）
Given a 0-indexed integer 2D array nodes, your task is to determine if the
given array represents the preorder traversal of some binary tree. For each
index i, nodes[i] = [id, parentId], where id is the id of the node at the
index i and parentId is the id of its parent in the tree (if the node has no
parent, then parentId == -1). Return true if the given array represents the
preorder traversal of some tree, and false otherwise. Note: the preorder
traversal of a tree is a recursive way to traverse a tree in which we first
visit the current node, then we do the preorder traversal for the left child,
and finally, we do it for the right child.

Example 1:
Input: nodes = [[0,-1],[1,0],[2,0],[3,2],[4,2]]
Output: true
Explanation: The given nodes make the tree in the picture below. We can show
             that this is the preorder traversal of the tree, first we visit
             node 0, then we do the preorder traversal of the right child
             which is [1], then we do the preorder traversal of the left
             child which is [2,3,4].

Example 2:
Input: nodes = [[0,-1],[1,0],[2,0],[3,1],[4,1]]
Output: false
Explanation: The given nodes make the tree in the picture below. For the
             preorder traversal, first we visit node 0, then we do the
             preorder traversal of the right child which is [1,3,4], but we
             can see that in the given order, 2 comes between 1 and 3, so,
             it's not the preorder traversal of the tree.

Constraints:
* 1 <= nodes.length <= 10^5
* nodes[i].length == 2
* 0 <= nodes[i][0] <= 10^5
* -1 <= nodes[i][1] <= 10^5
* The input is generated such that nodes make a binary tree.*/

function isPreorder(nodes: number[][]): boolean {
    const stk = [-1];
    for (const [n, p] of nodes) {
        while (stk.length && stk[stk.length-1] != p) stk.pop();
        if (stk.length == 0) return false;
        stk.push(n);
    }
    return true;
};


/*2774. Array Upper Bound (Easy)
Write code that enhances all arrays such that you can call the upperBound()
method on any array and it will return the last index of a given target number.
nums is a sorted ascending array of numbers that may contain duplicates. If the
target number is not found in the array, return -1.

Example 1:
Input: nums = [3,4,5], target = 5
Output: 2
Explanation: Last index of target value is 2

Example 2:
Input: nums = [1,4,5], target = 2
Output: -1
Explanation: Because there is no digit 2 in the array, return -1.

Example 3:
Input: nums = [3,4,6,6,6,6,7], target = 6
Output: 5
Explanation: Last index of target value is 5

Constraints:
* 1 <= nums.length <= 10^4
* -10^4 <= nums[i], target <= 10^4
* nums is sorted in ascending order.

Follow up: Can you write an algorithm with O(log n) runtime complexity?*/

Array.prototype.upperBound = function(target): number {
    let lo = 0, hi = this.length-1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1)/2);
        if (this[mid] <= target) lo = mid;
        else hi = mid-1;
    }
    return this[lo] == target ? lo : -1;
};


/*2782. Number of Unique Categories (Medium)
You are given an integer n and an object categoryHandler of class
CategoryHandler. There are n elements, numbered from 0 to n - 1. Each
element has a category, and your task is to find the number of unique
categories. The class CategoryHandler contains the following function, which
may help you:
* boolean haveSameCategory(integer a, integer b): Returns true if a and b
  are in the same category and false otherwise. Also, if either a or b is
  not a valid number (i.e. it's greater than or equal to nor less than 0),
  it returns false.
Return the number of unique categories.

Example 1:
Input: n = 6, categoryHandler = [1,1,2,2,3,3]
Output: 3
Explanation: There are 6 elements in this example. The first two elements
             belong to category 1, the second two belong to category 2, and
             the last two elements belong to category 3. So there are 3
             unique categories.

Example 2:
Input: n = 5, categoryHandler = [1,2,3,4,5]
Output: 5
Explanation: There are 5 elements in this example. Each element belongs to a
             unique category. So there are 5 unique categories.

Example 3:
Input: n = 3, categoryHandler = [1,1,1]
Output: 1
Explanation: There are 3 elements in this example. All of them belong to one
             category. So there is only 1 unique category.

Constraints: 1 <= n <= 100*/

function numberOfCategories(n: number, categoryHandler: CategoryHandler): number {
    let ans = 0;
    for (let j = 0; j < n; ++j) {
        let found = false;
        for (let i = 0; i < j; ++i)
            if (categoryHandler.haveSameCategory(i,j)) {
                found = true;
                break;
            }
        if (!found) ++ans;
    }
    return ans;
};


/*2794. Create Object from Two Arrays (Easy)
Given two arrays keysArr and valuesArr, return a new object obj. Each key-value
pair in obj should come from keysArr[i] and valuesArr[i]. If a duplicate key
exists at a previous index, that key-value should be excluded. In other words,
only the first key should be added to the object. If the key is not a string, it
should be converted into a string by calling String() on it.

Example 1:
Input: keysArr = ["a", "b", "c"], valuesArr = [1, 2, 3]
Output: {"a": 1, "b": 2, "c": 3}
Explanation: The keys "a", "b", and "c" are paired with the values 1, 2, and 3
             respectively.

Example 2:
Input: keysArr = ["1", 1, false], valuesArr = [4, 5, 6]
Output: {"1": 4, "false": 6}
Explanation: First, all the elements in keysArr are converted into strings. We
             can see there are two occurrences of "1". The value associated with
             the first occurrence of "1" is used: 4.

Example 3:
Input: keysArr = [], valuesArr = []
Output: {}
Explanation: There are no keys so an empty object is returned.

Constraints:
* keysArr and valuesArr are valid JSON arrays
* 2 <= JSON.stringify(keysArr).length, JSON.stringify(valuesArr).length <= 5 * 10^5
* keysArr.length === valuesArr.length*/

function createObject(keysArr: JSONValue[], valuesArr: JSONValue[]): Record<string, JSONValue> {
    const ans: Record<string, any> = {};
    for (let [i, k] of keysArr.entries()) {
        k = String(k);
        if (!(k in ans))
            ans[k] = valuesArr[i];
    }
    return ans;
};


/*2796. Repeat String (Easy)
Write code that enhances all strings such that you can call the
string.replicate(x) method on any string and it will return repeated string x
times. Try to implement it without using the built-in method string.repeat.

Example 1:
Input: str = "hello", times = 2
Output: "hellohello"
Explanation: "hello" is repeated 2 times

Example 2:
Input: str = "code", times = 3
Output: "codecodecode"
Explanation: "code" is repeated 3 times

Example 3:
Input: str = "js", times = 1
Output: "js"
Explanation: "js" is repeated 1 time

Constraints: 1 <= str.length, times <= 10^5*/

String.prototype.replicate = function(times): string {
    const vals = [];
    while (times--)
        vals.push(this);
    return vals.join('');
}


/*2797. Partial Function with Placeholders (Easy)
Given a function fn and an array args, return a function partialFn. Placeholders
"_" in the args should be replaced with values from restArgs starting from index
0. Any remaining values in the restArgs should be added at the end of the args.
partialFn should return a result of fn. fn should be called with the elements of
the modified args passed as separate arguments.

Example 1:
Input: fn = (...args) => args, args = [2,4,6], restArgs = [8,10]
Output: [2,4,6,8,10]
Explanation: const partialFn = partial(fn, args)
             const result = partialFn(...restArgs)
             console.log(result) // [2,4,6,8,10]
             There are no placeholders "_" in args therefore restArgs is just
             added at the end of args. Then the elements of the args are passed
             as separate arguments to fn, which returns passed arguments as an
             array.

Example 2:
Input: fn = (...args) => args, args = [1,2,"_",4,"_",6], restArgs = [3,5]
Output: [1,2,3,4,5,6]
Explanation: const partialFn = partial(fn, args)
             const result = partialFn(...restArgs)
             console.log(result) // [1,2,3,4,5,6]
             Placeholders "_" are replaced with values from the restArgs. Then
             the elements of the args are passed as separate arguments to fn,
             which returns passed arguments as an array.

Example 3:
Input: fn = (a, b, c) => b + a - c, args = ["_", 5], restArgs = [5, 20]
Output: -10
Explanation: const partialFn = partial(fn, args)
             const result = partialFn(...restArgs)
             console.log(result) // -10
             Placeholder "_" is replaced with 5 and 20 is added at the end of
             args. Then the elements of the args are passed as separate
             arguments to fn, which returns -10 (5 + 5 - 20).

Constraints:
* fn is a function
* args and restArgs are valid JSON arrays
* 1 <= args.length <= 5 * 10^4
* 1 <= restArgs.length <= 5 * 10^4
* 0 <= number of placeholders <= restArgs.length*/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => JSONValue

function partial(fn: Fn, args: JSONValue[]): Fn {

    return function(...restArgs) {
        args = args.map(x => x === '_' ? restArgs.shift() : x);
        return fn(...args.concat(restArgs));
    }
};


/*2802. Find The K-th Lucky Number (Medium）
We know that 4 and 7 are lucky digits. Also, a number is called lucky if it
contains only lucky digits. You are given an integer k, return the kth lucky
number represented as a string.

Example 1:
Input: k = 4
Output: "47"
Explanation: The first lucky number is 4, the second one is 7, the third one
             is 44 and the fourth one is 47.

Example 2:
Input: k = 10
Output: "477"
Explanation: Here are lucky numbers sorted in increasing order:
             4, 7, 44, 47, 74, 77, 444, 447, 474, 477. So the 10th lucky
             number is 477.

Example 3:
Input: k = 1000
Output: "777747447"
Explanation: It can be shown that the 1000th lucky number is 777747447.

Constraints: 1 <= k <= 10^9*/

function kthLuckyNumber(k: number): string {
    const n = Math.floor(Math.log2(k+1));
    k -= (1<<n) - 1;
    const ans = [];
    for (let i = n-1; i >= 0; --i)
        if (k & 1<<i) ans.push('7');
        else ans.push('4');
    return ans.join('');
};


/*2803. Factorial Generator (Easy）
Write a generator function that takes an integer n as an argument and returns a
generator object which yields the factorial sequence. The factorial sequence is
defined by the relation n! = n * (n-1) * (n-2) * ... * 2 * 1. The factorial of 0
is defined as 1.

Example 1:
Input: n = 5
Output: [1,2,6,24,120]
Explanation: const gen = factorial(5)
             gen.next().value // 1
             gen.next().value // 2
             gen.next().value // 6
             gen.next().value // 24
             gen.next().value // 120

Example 2:
Input: n = 2
Output: [1,2]
Explanation: const gen = factorial(2)
             gen.next().value // 1
             gen.next().value // 2

Example 3:
Input: n = 0
Output: [1]
Explanation: const gen = factorial(0)
             gen.next().value // 1

Constraints: 0 <= n <= 18*/

function* factorial(n: number): Generator<number> {
    if (n == 0) yield 1;
    let ans = 1;
    for (let x = 1; x <= n; ++x) {
        ans *= x;
        yield ans;
    }
};


/*2804. Array Prototype ForEach (Easy)
Write your version of method forEach that enhances all arrays such that you can
call the array.forEach(callback, context) method on any array and it will
execute callback on each element of the array. Method forEach should not return
anything. callback accepts the following arguments:
* currentValue - represents the current element being processed in the array. It
  is the value of the element in the current iteration.
* index - represents the index of the current element being processed in the
  array.
* array - represents the array itself, allowing access to the entire array
  within the callback function.
The context is the object that should be passed as the function context
parameter to the callback function, ensuring that the this keyword within the
callback function refers to this context object. Try to implement it without
using the built-in array methods.

Example 1:
Input: arr = [1,2,3],
       callback = (val, i, arr) => arr[i] = val * 2,
       context = {"context":true}
Output: [2,4,6]
Explanation: arr.forEach(callback, context)
             console.log(arr) // [2,4,6]
             The callback is executed on each element of the array.

Example 2:
Input: arr = [true, true, false, false],
       callback = (val, i, arr) => arr[i] = this,
       context = {"context": false}
Output: [{"context":false},{"context":false},{"context":false},{"context":false}]
Explanation: arr.forEach(callback, context)
             console.log(arr) // [{"context":false},{"context":false},{"context":false},{"context":false}]
             The callback is executed on each element of the array with the right context.

Example 3:
Input: arr = [true, true, false, false],
       callback = (val, i, arr) => arr[i] = !val,
       context = {"context": 5}
Output: [false,false,true,true]

Constraints:
* context is a valid JSON object
* fn is a function
* 0 <= arr.length <= 10^5*/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Callback = (currentValue: JSONValue, index: number, array: JSONValue[]) => any
type Context = Record<string, JSONValue>

Array.prototype.forEach = function(callback: Callback, context: Context): void {
    for (const [i, x] of this.entries()) {
        callback.call(context, x, i, this)
    }
}


/*2816. Double a Number Represented as a Linked List (Medium)
You are given the head of a non-empty linked list representing a non-negative
integer without leading zeroes. Return the head of the linked list after
doubling it.

Example 1:
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: The figure above corresponds to the given linked list which
             represents the number 189. Hence, the returned linked list
             represents the number 189 * 2 = 378.

Example 2:
Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: The figure above corresponds to the given linked list which
             represents the number 999. Hence, the returned linked list
             reprersents the number 999 * 2 = 1998.

Constraints:
* The number of nodes in the list is in the range [1, 10^4]
* 0 <= Node.val <= 9
* The input is generated such that the list represents a number that does not
have leading zeros, except the number 0 itself.*/

function doubleIt(head: ListNode | null): ListNode | null {
    if (head.val >= 5) head = new ListNode(0, head);
    for (let node = head; node; node = node.next) {
        node.val = 2*node.val % 10;
        if (node.next && node.next.val >= 5) node.val += 1;
    }
    return head;
};


/*2821. Delay the Resolution of Each Promise (Easy)
Given an array functions and a number ms, return a new array of functions.
* functions is an array of functions that return promises.
* ms represents the delay duration in milliseconds. It determines the amount of
  time to wait before resolving each promise in the new array.
Each function in the new array should return a promise that resolves after a
delay of ms milliseconds, preserving the order of the original functions array.
The delayAll function should ensure that each promise from functions is executed
with a delay, forming the new array of functions returning delayed promises.

Example 1:
Input: functions = [
          () => new Promise((resolve) => setTimeout(resolve, 30))
       ],
       ms = 50
Output: [80]
Explanation: The promise from the array would have resolved after 30 ms, but it
             was delayed by 50 ms, thus 30 ms + 50 ms = 80 ms.

Example 2:
Input: functions = [
           () => new Promise((resolve) => setTimeout(resolve, 50)),
           () => new Promise((resolve) => setTimeout(resolve, 80))
       ],
       ms = 70
Output: [120,150]
Explanation: The promises from the array would have resolved after 50 ms and 80
             ms, but they were delayed by 70 ms, thus 50 ms + 70 ms = 120 ms and
             80 ms + 70 ms = 150 ms.

Constraints:
* functions is an array of functions that return promises
* 10 <= ms <= 500
* 1 <= functions.length <= 10*/

type Fn = () => Promise<any>

function delayAll(functions: Fn[], ms: number): Fn[] {
    return functions.map(f =>
        () => new Promise(
            (resolve, reject) => setTimeout(
                () => f().then(result => resolve(result)).catch(error => reject(error)),
                ms
            )
        )
    );
};


/*2822. Inversion of Object (Easy)
Given an object or an array obj, return an inverted object or array invertedObj.
The invertedObj should have the keys of obj as values and the values of obj as
keys. The indices of array should be treated as keys. It is guaranteed that the
values in obj are only strings. The function should handle duplicates, meaning
that if there are multiple keys in obj with the same value, the invertedObj
should map the value to an array containing all corresponding keys.

Example 1:
Input: obj = {"a": "1", "b": "2", "c": "3", "d": "4"}
Output: invertedObj = {"1": "a", "2": "b", "3": "c", "4": "d"}
Explanation: The keys from obj become the values in invertedObj, and the values
             from obj become the keys in invertedObj.

Example 2:
Input: obj = {"a": "1", "b": "2", "c": "2", "d": "4"}
Output: invertedObj = {"1": "a", "2": ["b", "c"], "4": "d"}
Explanation: There are two keys in obj with the same value, the invertedObj
             mapped the value to an array containing all corresponding keys.

Example 3:
Input: obj = ["1", "2", "3", "4"]
Output: invertedObj = {"1": "0", "2": "1", "3": "2", "4": "3"}
Explanation: Arrays are also objects therefore array has changed to an object
             and the keys (indices) from obj become the values in invertedObj,
             and the values from obj become the keys in invertedObj.

Constraints:
* obj is a valid JSON object or array
* typeof obj[key] === "string"
* 2 <= JSON.stringify(obj).length <= 10^5*/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>

function invertObject(obj: Obj): Record<string, JSONValue> {
    return Object.entries(obj).reduce((acc , [k, v]) => {
        v = String(v);
        if (acc[v]) {
            if (!Array.isArray(acc[v])) acc[v] = [acc[v]];
            acc[v].push(k);
        } else acc[v] = k;
        return acc;
    }, {})
};


/*2824. Count Pairs Whose Sum is Less than Target (Easy)
Given a 0-indexed integer array nums of length n and an integer target,
return the number of pairs (i, j) where 0 <= i < j < n and
nums[i] + nums[j] < target.

Example 1:
Input: nums = [-1,1,2,3,1], target = 2
Output: 3
Explanation: There are 3 pairs of indices that satisfy the conditions in the
             statement:
             - (0, 1) since 0 < 1 and nums[0] + nums[1] = 0 < target
             - (0, 2) since 0 < 2 and nums[0] + nums[2] = 1 < target
             - (0, 4) since 0 < 4 and nums[0] + nums[4] = 0 < target
             Note that (0, 3) is not counted since nums[0] + nums[3] is not
             strictly less than the target.

Example 2:
Input: nums = [-6,2,5,-2,-7,-1,3], target = -2
Output: 10
Explanation: There are 10 pairs of indices that satisfy the conditions in
             the statement:
             - (0, 3) since 0 < 3 and nums[0] + nums[3] = -8 < target
             - (0, 1) since 0 < 1 and nums[0] + nums[1] = -4 < target
             - (0, 4) since 0 < 4 and nums[0] + nums[4] = -13 < target
             - (0, 5) since 0 < 5 and nums[0] + nums[5] = -7 < target
             - (0, 6) since 0 < 6 and nums[0] + nums[6] = -3 < target
             - (1, 4) since 1 < 4 and nums[1] + nums[4] = -5 < target
             - (3, 4) since 3 < 4 and nums[3] + nums[4] = -9 < target
             - (3, 5) since 3 < 5 and nums[3] + nums[5] = -3 < target
             - (4, 5) since 4 < 5 and nums[4] + nums[5] = -8 < target
             - (4, 6) since 4 < 6 and nums[4] + nums[6] = -4 < target

Constraints:
* 1 <= nums.length == n <= 50
* -50 <= nums[i], target <= 50*/

function countPairs(nums: number[], target: number): number {
    nums.sort((a, b) => (a-b));
    let ans = 0;
    for (let lo = 0, hi = nums.length-1; lo < hi; )
        if (nums[lo] + nums[hi] < target) {
            ans += hi - lo;
            ++lo;
        } else --hi;
    return ans;
};


/*2828. Check if a String Is an Acronym of Words (Easy)
Given an array of strings words and a string s, determine if s is an acronym
of words. The string s is considered an acronym of words if it can be formed
by concatenating the first character of each string in words in order. For
example, "ab" can be formed from ["apple", "banana"], but it can't be formed
from ["bear", "aardvark"]. Return true if s is an acronym of words, and
false otherwise.

Example 1:
Input: words = ["alice","bob","charlie"], s = "abc"
Output: true
Explanation: The first character in the words "alice", "bob", and "charlie"
             are 'a', 'b', and 'c', respectively. Hence, s = "abc" is the
             acronym.

Example 2:
Input: words = ["an","apple"], s = "a"
Output: false
Explanation: The first character in the words "an" and "apple" are 'a' and
             'a', respectively. The acronym formed by concatenating these
             characters is "aa". Hence, s = "a" is not the acronym.

Example 3:
Input: words = ["never","gonna","give","up","on","you"], s = "ngguoy"
Output: true
Explanation: By concatenating the first character of the words in the array,
             we get the string "ngguoy". Hence, s = "ngguoy" is the acronym.

Constraints:
* 1 <= words.length <= 100
* 1 <= words[i].length <= 10
* 1 <= s.length <= 100
* words[i] and s consist of lowercase English letters.*/

function isAcronym(words: string[], s: string): boolean {
    return words.length === s.length && words.every((v, i) => v[0] === s[i]);
};


/*2829. Determine the Minimum Sum of a k-avoiding Array (Medium)
You are given two integers, n and k. An array of distinct positive integers
is called a k-avoiding array if there does not exist any pair of distinct
elements that sum to k. Return the minimum possible sum of a k-avoiding
array of length n.

Example 1:
Input: n = 5, k = 4
Output: 18
Explanation: Consider the k-avoiding array [1,2,4,5,6], which has a sum of
             18. It can be proven that there is no k-avoiding array with a
             sum less than 18.

Example 2:
Input: n = 2, k = 6
Output: 3
Explanation: We can construct the array [1,2], which has a sum of 3. It can
             be proven that there is no k-avoiding array with a sum less
             than 3.

Constraints: 1 <= n, k <= 50*/

function minimumSum(n: number, k: number): number {
    const kk = Math.floor(k/2);
    if (n <= kk) return n*(n+1)/2;
    return Math.pow(kk, 2) - kk*(n+k-1) + n*(n+2*k-1)/2;
};


/*2830. Maximize the Profit as the Salesman (Medium)
You are given an integer n representing the number of houses on a number
line, numbered from 0 to n - 1. Additionally, you are given a 2D integer
array offers where offers[i] = [starti, endi, goldi], indicating that ith
buyer wants to buy all the houses from starti to endi for goldi amount of
gold. As a salesman, your goal is to maximize your earnings by strategically
selecting and selling houses to buyers. Return the maximum amount of gold
you can earn. Note that different buyers can't buy the same house, and some
houses may remain unsold.

Example 1:
Input: n = 5, offers = [[0,0,1],[0,2,2],[1,3,2]]
Output: 3
Explanation: There are 5 houses numbered from 0 to 4 and there are 3
             purchase offers. We sell houses in the range [0,0] to 1st buyer
             for 1 gold and houses in the range [1,3] to 3rd buyer for 2
             golds. It can be proven that 3 is the maximum amount of gold we
             can achieve.

Example 2:
Input: n = 5, offers = [[0,0,1],[0,2,10],[1,3,2]]
Output: 10
Explanation: There are 5 houses numbered from 0 to 4 and there are 3
             purchase offers. We sell houses in the range [0,2] to 2nd buyer
             for 10 golds. It can be proven that 10 is the maximum amount of
             gold we can achieve.

Constraints:
* 1 <= n <= 10^5
* 1 <= offers.length <= 10^5
* offers[i].length == 3
* 0 <= starti <= endi <= n - 1
* 1 <= goldi <= 10^3*/

function maximizeTheProfit(n: number, offers: number[][]): number {
    const mp = Array(n).fill(0).map(() => []);
    for (const [start, end, gold] of offers)
        mp[start].push([end, gold]);
    const dp = Array(n+1).fill(0);
    for (let i = n-1; i >= 0; --i) {
        dp[i] = dp[i+1];
        for (const [j, x] of mp[i])
            dp[i] = Math.max(dp[i], x + dp[j+1]);
    }
    return dp[0];
};


/*2831. Find the Longest Equal Subarray (Medium)
You are given a 0-indexed integer array nums and an integer k. A subarray is
called equal if all of its elements are equal. Note that the empty subarray
is an equal subarray. Return the length of the longest possible equal
subarray after deleting at most k elements from nums. A subarray is a
contiguous, possibly empty sequence of elements within an array.

Example 1:
Input: nums = [1,3,2,3,1,3], k = 3
Output: 3
Explanation: It's optimal to delete the elements at index 2 and index 4.
             After deleting them, nums becomes equal to [1, 3, 3, 3]. The
             longest equal subarray starts at i = 1 and ends at j = 3 with
             length equal to 3. It can be proven that no longer equal
             subarrays can be created.

Example 2:
Input: nums = [1,1,2,2,1,1], k = 2
Output: 4
Explanation: It's optimal to delete the elements at index 2 and index 3.
             After deleting them, nums becomes equal to [1, 1, 1, 1]. The
             array itself is an equal subarray, so the answer is 4. It can
             be proven that no longer equal subarrays can be created.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= nums.length
* 0 <= k <= nums.length*/

function longestEqualSubarray(nums: number[], k: number): number {
    let most = 0;
    const freq = new Map();
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        freq.set(nums[i], 1 + (freq.get(nums[i])??0));
        most = Math.max(most, freq.get(nums[i]));
        if (i-ii-most >= k) {
            freq.set(nums[ii], freq.get(nums[ii])-1);
            ++ii;
        }
    }
    return most;
};


/*2832. Maximal Range That Each Element Is Maximum in It (Medium)
You are given a 0-indexed array nums of distinct integers. Let us define a
0-indexed array ans of the same length as nums in the following way:
* ans[i] is the maximum length of a subarray nums[l..r], such that the
  maximum element in that subarray is equal to nums[i].
Return the array ans. Note that a subarray is a contiguous part of the
array.

Example 1:
Input: nums = [1,5,4,3,6]
Output: [1,4,2,1,5]
Explanation: - For nums[0] the longest subarray in which 1 is the maximum is
               nums[0..0] so ans[0] = 1.
             - For nums[1] the longest subarray in which 5 is the maximum is
               nums[0..3] so ans[1] = 4.
             - For nums[2] the longest subarray in which 4 is the maximum is
               nums[2..3] so ans[2] = 2.
             - For nums[3] the longest subarray in which 3 is the maximum is
               nums[3..3] so ans[3] = 1.
             - For nums[4] the longest subarray in which 6 is the maximum is
               nums[0..4] so ans[4] = 5.

Example 2:
Input: nums = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: For nums[i] the longest subarray in which it's the maximum is
             nums[0..i] so ans[i] = i + 1.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5
* All elements in nums are distinct.*/

function maximumLengthOfRanges(nums: number[]): number[] {
    const n = nums.length, ans = Array(n), stack = [-1];
    nums.push(1e6);
    for (let i = 0; i <= n; ++i) {
        while (stack.length > 1 && nums[stack[stack.length-1]] < nums[i]) {
            const ii = stack.pop();
            ans[ii] = i - stack[stack.length-1] - 1;
        }
        stack.push(i);
    }
    return ans;
};


/*2838. Maximum Coins Heroes Can Collect (Medium)
There is a battle and n heroes are trying to defeat m monsters. You are
given two 1-indexed arrays of positive integers heroes and monsters of
length n and m, respectively. heroes[i] is the power of ith hero, and
monsters[i] is the power of ith monster. The ith hero can defeat the jth
monster if monsters[j] <= heroes[i]. You are also given a 1-indexed array
coins of length m consisting of positive integers. coins[i] is the number of
coins that each hero earns after defeating the ith monster. Return an array
ans of length n where ans[i] is the maximum number of coins that the ith
hero can collect from this battle.

Notes
* The health of a hero doesn't get reduced after defeating a monster.
* Multiple heroes can defeat a monster, but each monster can be defeated by
  a given hero only once.

Example 1:
Input: heroes = [1,4,2], monsters = [1,1,5,2,3], coins = [2,3,4,5,6]
Output: [5,16,10]
Explanation: For each hero, we list the index of all the monsters he can
             defeat:
             - 1st hero: [1,2] since the power of this hero is 1 and
                         monsters[1], monsters[2] <= 1. So this hero
                         collects coins[1] + coins[2] = 5 coins.
             - 2nd hero: [1,2,4,5] since the power of this hero is 4 and
                         monsters[1], monsters[2], monsters[4], monsters[5]
                         <= 4. So this hero collects
                         coins[1] + coins[2] + coins[4] + coins[5] = 16 coins.
             - 3rd hero: [1,2,4] since the power of this hero is 2 and
                         monsters[1], monsters[2], monsters[4] <= 2. So this
                         hero collects coins[1] + coins[2] + coins[4] = 10
                         coins.
             - So the answer would be [5,16,10].

Example 2:
Input: heroes = [5], monsters = [2,3,1,2], coins = [10,6,5,2]
Output: [23]
Explanation: This hero can defeat all the monsters since monsters[i] <= 5.
             So he collects all of the coins:
             coins[1] + coins[2] + coins[3] + coins[4] = 23, and the answer
             would be [23].

Example 3:
Input: heroes = [4,4], monsters = [5,7,8], coins = [1,1,1]
Output: [0,0]
Explanation: In this example, no hero can defeat a monster. So the answer
             would be [0,0],

Constraints:
* 1 <= n == heroes.length <= 10^5
* 1 <= m == monsters.length <= 10^5
* coins.length == m
* 1 <= heroes[i], monsters[i], coins[i] <= 10^9*/

function maximumCoins(heroes: number[], monsters: number[], coins: number[]): number[] {
    const mc = [];
    for (const i in monsters)
        mc.push([monsters[i], coins[i]]);
    mc.sort((a, b) => (a[0] - b[0]));
    const hi = [];
    for (const [i, x] of heroes.entries())
        hi.push([x, i]);
    hi.sort((a, b) => (a[0] - b[0]));
    const ans = Array(heroes.length);
    let j = 0, prefix = 0;
    for (const [x, i] of hi) {
        for(; j < mc.length && mc[j][0] <= x; ++j)
            prefix += mc[j][1];
        ans[i] = prefix;
    }
    return ans;
};


/*2852. Sum of Remoteness of All Cells (Medium)
You are given a 0-indexed matrix grid of order n * n. Each cell in this
matrix has a value grid[i][j], which is either a positive integer or -1
representing a blocked cell. You can move from a non-blocked cell to any
non-blocked cell that shares an edge. For any cell (i, j), we represent its
remoteness as R[i][j] which is defined as the following:
* If the cell (i, j) is a non-blocked cell, R[i][j] is the sum of the values
  grid[x][y] such that there is no path from the non-blocked cell (x, y) to
  the cell (i, j).
* For blocked cells, R[i][j] == 0.
Return the sum of R[i][j] over all cells.

Example 1:
Input: grid = [[-1,1,-1],[5,-1,4],[-1,3,-1]]
Output: 39
Explanation: In the picture above, there are four grids. The top-left grid
             contains the initial values in the grid. Blocked cells are
             colored black, and other cells get their values as it is in the
             input. In the top-right grid, you can see the value of R[i][j]
             for all cells. So the answer would be the sum of them. That is:
             0 + 12 + 0 + 8 + 0 + 9 + 0 + 10 + 0 = 39. Let's jump on the
             bottom-left grid in the above picture and calculate R[0][1]
             (the target cell is colored green). We should sum up the value
             of cells that can't be reached by the cell (0, 1). These cells
             are colored yellow in this grid. So R[0][1] = 5 + 4 + 3 = 12.
             Now let's jump on the bottom-right grid in the above picture
             and calculate R[1][2] (the target cell is colored green). We
             should sum up the value of cells that can't be reached by the
             cell (1, 2). These cells are colored yellow in this grid. So
             R[1][2] = 1 + 5 + 3 = 9.

Example 2:
Input: grid = [[-1,3,4],[-1,-1,-1],[3,-1,-1]]
Output: 13
Explanation: In the picture above, there are four grids. The top-left grid
             contains the initial values in the grid. Blocked cells are
             colored black, and other cells get their values as it is in the
             input. In the top-right grid, you can see the value of R[i][j]
             for all cells. So the answer would be the sum of them. That is:
             3 + 3 + 0 + 0 + 0 + 0 + 7 + 0 + 0 = 13. Let's jump on the
             bottom-left grid in the above picture and calculate R[0][2]
             (the target cell is colored green). We should sum up the value
             of cells that can't be reached by the cell (0, 2). This cell is
             colored yellow in this grid. So R[0][2] = 3. Now let's jump on
             the bottom-right grid in the above picture and calculate
             R[2][0] (the target cell is colored green). We should sum up
             the value of cells that can't be reached by the cell (2, 0).
             These cells are colored yellow in this grid. So
             R[2][0] = 3 + 4 = 7.

Example 3:
Input: grid = [[1]]
Output: 0
Explanation: Since there are no other cells than (0, 0), R[0][0] is equal to
             0. So the sum of R[i][j] over all cells would be 0.

Constraints:
* 1 <= n <= 300
* 1 <= grid[i][j] <= 10^6 or grid[i][j] == -1*/

function sumRemoteness(grid: number[][]): number {
    const n = grid.length;
    let ans = 0, value = 0, count = 0;
    for (let r = 0; r < n; ++r)
        for (let c = 0; c < n; ++c)
            if (grid[r][c] != -1) {
                let val = grid[r][c], cnt = 1;
                grid[r][c] = -1;
                const stk = [[r, c]];
                while (stk.length) {
                    const [i, j] = stk.pop();
                    for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]]) {
                        if (0 <= ii && ii < n && 0 <= jj && jj < n && grid[ii][jj] != -1) {
                            val += grid[ii][jj];
                            ++cnt;
                            grid[ii][jj] = -1;
                            stk.push([ii, jj]);
                        }
                    }
                }
                ans -= val*cnt;
                value += val;
                count += cnt;
            }
    return ans + value*count;
};


/*2855. Minimum Right Shifts to Sort the Array (Easy)
You are given a 0-indexed array nums of length n containing distinct
positive integers. Return the minimum number of right shifts required to
sort nums and -1 if this is not possible. A right shift is defined as
shifting the element at index i to index (i + 1) % n, for all indices.

Example 1:
Input: nums = [3,4,5,1,2]
Output: 2
Explanation: After the first right shift, nums = [2,3,4,5,1]. After the
             second right shift, nums = [1,2,3,4,5]. Now nums is sorted;
             therefore the answer is 2.

Example 2:
Input: nums = [1,3,5]
Output: 0
Explanation: nums is already sorted therefore, the answer is 0.

Example 3:
Input: nums = [2,1,4]
Output: -1
Explanation: It's impossible to sort the array using right shifts.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100
* nums contains distinct integers.*/

function minimumRightShifts(nums: number[]): number {
    let c = 0, k = 0, n = nums.length;
    for (let i = 0; i < n; ++i)
        if (nums[i] > nums[(i+1)%n]) {
            ++c;
            k = i;
        }
    switch (c) {
        case 0: return 0;
        case 1: return n-1-k;
    }
    return -1;
};


/*2856. Minimum Array Length After Pair Removals (Medium)
Given an integer array num sorted in non-decreasing order. You can perform
the following operation any number of times:
* Choose two indices, i and j, where nums[i] < nums[j].
* Then, remove the elements at indices i and j from nums. The remaining
  elements retain their original order, and the array is re-indexed.
Return the minimum length of nums after applying the operation zero or more
times.

Example 1:
Input: nums = [1,2,3,4]
Output: 0
Explanation:

Example 2:
Input: nums = [1,1,2,2,3,3]
Output: 0
Explanation:

Example 3:
Input: nums = [1000000000,1000000000]
Output: 2
Explanation: Since both numbers are equal, they cannot be removed.

Example 4:
Input: nums = [2,3,4,4,4]
Output: 1
Explanation:

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* nums is sorted in non-decreasing order.*/

function minLengthAfterRemovals(nums: number[]): number {
    let most = 0, n = nums.length;
    const freq = new Map();
    for (const x of nums) {
        freq.set(x, 1 + (freq.get(x) ?? 0));
        most = Math.max(most, freq.get(x));
    }
    return 2*most >= n ? 2*most - n : n&1;
};


/*2857. Count Pairs of Points With Distance k (Medium)
You are given a 2D integer array coordinates and an integer k, where
coordinates[i] = [xi, yi] are the coordinates of the ith point in a 2D
plane. We define the distance between two points (x1, y1) and (x2, y2) as
(x1 XOR x2) + (y1 XOR y2) where XOR is the bitwise XOR operation. Return the
number of pairs (i, j) such that i < j and the distance between points i and
j is equal to k.

Example 1:
Input: coordinates = [[1,2],[4,2],[1,3],[5,2]], k = 5
Output: 2
Explanation: We can choose the following pairs:
             - (0,1): Because we have (1 XOR 4) + (2 XOR 2) = 5.
             - (2,3): Because we have (1 XOR 5) + (3 XOR 2) = 5.

Example 2:
Input: coordinates = [[1,3],[1,3],[1,3],[1,3],[1,3]], k = 0
Output: 10
Explanation: Any two chosen pairs will have a distance of 0. There are 10
             ways to choose two pairs.

Constraints:
* 2 <= coordinates.length <= 50000
* 0 <= xi, yi <= 10^6
* 0 <= k <= 100*/

function countPairs(coordinates: number[][], k: number): number {
    let ans = 0;
    const freq = new Map();
    for (const [x, y] of coordinates) {
        for (let v = 0; v <= k; ++v) {
            const xx = x ^ v, yy = y ^ (k-v);
            ans += freq.get(1000001*xx + yy) ?? 0;
        }
        freq.set(1000001*x+y, 1 + (freq.get(1000001*x+y) ?? 0));
    }
    return ans;
};


/*2858. Minimum Edge Reversals So Every Node Is Reachable (Hard)
There is a simple directed graph with n nodes labeled from 0 to n - 1. The
graph would form a tree if its edges were bi-directional. You are given an
integer n and a 2D integer array edges, where edges[i] = [ui, vi] represents
a directed edge going from node ui to node vi. An edge reversal changes the
direction of an edge, i.e., a directed edge going from node ui to node vi
becomes a directed edge going from node vi to node ui. For every node i in
the range [0, n - 1], your task is to independently calculate the minimum
number of edge reversals required so it is possible to reach any other node
starting from node i through a sequence of directed edges. Return an integer
array answer, where answer[i] is the minimum number of edge reversals
required so it is possible to reach any other node starting from node i
through a sequence of directed edges.

Example 1:
Input: n = 4, edges = [[2,0],[2,1],[1,3]]
Output: [1,1,0,2]
Explanation: The image above shows the graph formed by the edges.
             - For node 0: after reversing the edge [2,0], it is possible to
               reach any other node starting from node 0. So, answer[0] = 1.
             - For node 1: after reversing the edge [2,1], it is possible to
               reach any other node starting from node 1. So, answer[1] = 1.
             - For node 2: it is already possible to reach any other node
               starting from node 2. So, answer[2] = 0.
             - For node 3: after reversing the edges [1,3] and [2,1], it is
               possible to reach any other node starting from node 3. So,
               answer[3] = 2.

Example 2:
Input: n = 3, edges = [[1,2],[2,0]]
Output: [2,0,1]
Explanation: The image above shows the graph formed by the edges.
             - For node 0: after reversing the edges [2,0] and [1,2], it is
               possible to reach any other node starting from node 0. So,
               answer[0] = 2.
             - For node 1: it is already possible to reach any other node
               starting from node 1. So, answer[1] = 0.
             - For node 2: after reversing the edge [1, 2], it is possible
               to reach any other node starting from node 2. So,
               answer[2] = 1.

Constraints:
* 2 <= n <= 10^5
* edges.length == n - 1
* edges[i].length == 2
* 0 <= ui == edges[i][0] < n
* 0 <= vi == edges[i][1] < n
* ui != vi
* The input is generated such that if the edges were bi-directional, the
  graph would be a tree.*/

function minEdgeReversals(n: number, edges: number[][]): number[] {
    const tree = Array(n).fill(0).map(() => new Map());
    for (const [u, v] of edges) {
        tree[u].set(v, 1);
        tree[v].set(u, -1);
    }
    const ans = Array(n).fill(0);

    function fn(u, p) {
        for (const [v, x] of tree[u].entries())
            if (v != p) {
                ans[u] += fn(v, u);
                if (x == -1) ++ans[u];
            }
        return ans[u];
    };

    fn(0, -1);
    const stack = [[0, -1]];
    while (stack.length) {
        const [u, p] = stack.pop();
        for (const v of tree[u].keys())
            if (v != p) {
                ans[v] += ans[u] - ans[v] + tree[u].get(v);
                stack.push([v, u]);
            }
    }
    return ans;
};


/*2863. Maximum Length of Semi-Decreasing Subarrays (Medium)
You are given an integer array nums. Return the length of the longest semi-
decreasing subarray of nums, and 0 if there are no such subarrays. A
subarray is a contiguous non-empty sequence of elements within an array. A
non-empty array is semi-decreasing if its first element is strictly greater
than its last element.

Example 1:
Input: nums = [7,6,5,4,3,2,1,6,10,11]
Output: 8
Explanation: Take the subarray [7,6,5,4,3,2,1,6]. The first element is 7 and
             the last one is 6 so the condition is met. Hence, the answer
             would be the length of the subarray or 8. It can be shown that
             there aren't any subarrays with the given condition with a
             length greater than 8.

Example 2:
Input: nums = [57,55,50,60,61,58,63,59,64,60,63]
Output: 6
Explanation: Take the subarray [61,58,63,59,64,60]. The first element is 61
             and the last one is 60 so the condition is met. Hence, the
             answer would be the length of the subarray or 6. It can be
             shown that there aren't any subarrays with the given condition
             with a length greater than 6.

Example 3:
Input: nums = [1,2,3,4]
Output: 0
Explanation: Since there are no semi-decreasing subarrays in the given
             array, the answer is 0.

Constraints:
* 1 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9*/

function maxSubarrayLength(nums: number[]): number {
    const stk = [];
    for (const [i, x] of nums.entries())
        if (stk.length == 0 || stk[stk.length-1][1] < x)
            stk.push([i, x]);
    let ans = 0;
    for (let i = nums.length-1; i >= 0; --i)
        while (stk.length && stk[stk.length-1][1] > nums[i]) {
            const [ii, _] = stk.pop();
            ans = Math.max(ans, i-ii+1);
        }
    return ans;
};


/*2864. Maximum Odd Binary Number (Easy)
You are given a binary string s that contains at least one '1'. You have to
rearrange the bits in such a way that the resulting binary number is the
maximum odd binary number that can be created from this combination. Return
a string representing the maximum odd binary number that can be created
from the given combination. Note that the resulting string can have leading
zeros.

Example 1:
Input: s = "010"
Output: "001"
Explanation: Because there is just one '1', it must be in the last position.
             So the answer is "001".

Example 2:
Input: s = "0101"
Output: "1001"
Explanation: One of the '1's must be in the last position. The maximum
             number that can be made with the remaining digits is "100". So
             the answer is "1001".

Constraints:
* 1 <= s.length <= 100
* s consists only of '0' and '1'.
* s contains at least one '1'.*/

function maximumOddBinaryNumber(s: string): string {
    const ones = s.split('').filter(ch => ch == '1').length;
    return '1'.repeat(ones-1) + '0'.repeat(s.length - ones) + '1';
};


/*2892. Minimizing Array After Replacing Pairs With Their Product (Medium)
Given an integer array nums and an integer k, you can perform the following
operation on the array any number of times:
* Select two adjacent elements of the array like x and y, such that
  x * y <= k, and replace both of them with a single element with value
  x * y (e.g. in one operation the array [1, 2, 2, 3] with k = 5 can become
  [1, 4, 3] or [2, 2, 3], but can't become [1, 2, 6]).
Return the minimum possible length of nums after any number of operations.

Example 1:
Input: nums = [2,3,3,7,3,5], k = 20
Output: 3
Explanation: We perform these operations:
             1. [2,3,3,7,3,5] -> [6,3,7,3,5]
             2. [6,3,7,3,5] -> [18,7,3,5]
             3. [18,7,3,5] -> [18,7,15]
             It can be shown that 3 is the minimum length possible to
             achieve with the given operation.

Example 2:
Input: nums = [3,3,3,3], k = 6
Output: 4
Explanation: We can't perform any operations since the product of every two
             adjacent elements is greater than 6. Hence, the answer is 4.

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] <= 10^9
* 1 <= k <= 10^9*/

function minArrayLength(nums: number[], k: number): number {
    let ans = 0, prefix = 0;
    for (const x of nums)
        if (x == 0) return 1;
        else if (prefix && prefix*x <= k) prefix *= x;
        else {
            ++ans;
            prefix = x;
        }
    return ans;
};


/*2898. Maximum Linear Stock Score (Medium)
Given a 1-indexed integer array prices, where prices[i] is the price of a
particular stock on the ith day, your task is to select some of the elements
of prices such that your selection is linear. A selection indexes, where
indexes is a 1-indexed integer array of length k which is a subsequence of
the array [1, 2, ..., n], is linear if:
* For every 1 < j <= k,
  prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] - indexes[j - 1].
A subsequence is an array that can be derived from another array by deleting
some or no elements without changing the order of the remaining elements.
The score of a selection indexes, is equal to the sum of the following array:
[prices[indexes[1]], prices[indexes[2]], ..., prices[indexes[k]]. Return the
maximum score that a linear selection can have.

Example 1:
Input: prices = [1,5,3,7,8]
Output: 20
Explanation: We can select the indexes [2,4,5]. We show that our selection
             is linear:
             For j = 2, we have:
             indexes[2] - indexes[1] = 4 - 2 = 2.
             prices[4] - prices[2] = 7 - 5 = 2.
             For j = 3, we have:
             indexes[3] - indexes[2] = 5 - 4 = 1.
             prices[5] - prices[4] = 8 - 7 = 1.
             The sum of the elements is:
             prices[2] + prices[4] + prices[5] = 20.
             It can be shown that the maximum sum a linear selection can
             have is 20.

Example 2:
Input: prices = [5,6,7,8,9]
Output: 35
Explanation: We can select all of the indexes [1,2,3,4,5]. Since each
             element has a difference of exactly 1 from its previous
             element, our selection is linear. The sum of all the elements
             is 35 which is the maximum possible some out of every
             selection.

Constraints:
* 1 <= prices.length <= 10^5
* 1 <= prices[i] <= 10^9*/

function maxScore(prices: number[]): number {
    const mp = new Map();
    for (let i = 0; i < prices.length; ++i)
        mp.set(prices[i]-i, (mp.get(prices[i]-i) ?? 0) + prices[i]);
    return Math.max(...mp.values());
};


/*2899. Last Visited Integers (Easy)
Given a 0-indexed array of strings words where words[i] is either a positive
integer represented as a string or the string "prev". Start iterating from
the beginning of the array; for every "prev" string seen in words, find the
last visited integer in words which is defined as follows:
* Let k be the number of consecutive "prev" strings seen so far (containing
  the current string). Let nums be the 0-indexed array of integers seen so
  far and nums_reverse be the reverse of nums, then the integer at (k - 1)th
  index of nums_reverse will be the last visited integer for this "prev".
* If k is greater than the total visited integers, then the last visited
  integer will be -1.
Return an integer array containing the last visited integers.

Example 1:
Input: words = ["1","2","prev","prev","prev"]
Output: [2,1,-1]
Explanation: - For "prev" at index = 2, last visited integer will be 2 as
               here the number of consecutive "prev" strings is 1, and in
               the array reverse_nums, 2 will be the first element.
             - For "prev" at index = 3, last visited integer will be 1 as
               there are a total of two consecutive "prev" strings including
               this "prev" which are visited, and 1 is the second last
               visited integer.
             - For "prev" at index = 4, last visited integer will be -1 as
               there are a total of three consecutive "prev" strings
               including this "prev" which are visited, but the total number
               of integers visited is two.

Example 2:
Input: words = ["1","prev","2","prev","prev"]
Output: [1,2,1]
Explanation: - For "prev" at index = 1, last visited integer will be 1.
             - For "prev" at index = 3, last visited integer will be 2.
             - For "prev" at index = 4, last visited integer will be 1 as
               there are a total of two consecutive "prev" strings including
               this "prev" which are visited, and 1 is the second last
               visited integer.

Constraints:
* 1 <= words.length <= 100
* words[i] == "prev" or 1 <= int(words[i]) <= 100*/

function lastVisitedIntegers(words: string[]): number[] {
    const ans = [], seen = [];
    let k = 0;
    for (const w of words) {
        if (w === "prev") {
            if (k >= seen.length) ans.push(-1);
            else ans.push(seen[seen.length-1-k++]);
        } else {
            seen.push(w);
            k = 0;
        }
    }
    return ans;
};


/*2900. Longest Unequal Adjacent Groups Subsequence I (Easy)
You are given a string array words and a binary array groups both of length
n, where words[i] is associated with groups[i]. Your task is to select the
longest alternating subsequence from words. A subsequence of words is
alternating if for any two consecutive strings in the sequence, their
corresponding elements in the binary array groups differ. Essentially, you
are to choose strings such that adjacent elements have non-matching
corresponding bits in the groups array. Formally, you need to find the
longest subsequence of an array of indices [0, 1, ..., n - 1] denoted as
[i0, i1, ..., ik-1], such that groups[ij] != groups[ij+1] for each
0 <= j < k - 1 and then find the words corresponding to these indices.
Return the selected subsequence. If there are multiple answers, return any
of them. Note: The elements in words are distinct.

Example 1:
Input: words = ["e","a","b"], groups = [0,0,1]
Output: ["e","b"]
Explanation: A subsequence that can be selected is ["e","b"] because
             groups[0] != groups[2]. Another subsequence that can be
             selected is ["a","b"] because groups[1] != groups[2]. It can be
             demonstrated that the length of the longest subsequence of
             indices that satisfies the condition is 2.

Example 2:
Input: words = ["a","b","c","d"], groups = [1,0,1,1]
Output: ["a","b","c"]
Explanation: A subsequence that can be selected is ["a","b","c"] because
             groups[0] != groups[1] and groups[1] != groups[2]. Another
             subsequence that can be selected is ["a","b","d"] because
             groups[0] != groups[1] and groups[1] != groups[3]. It can be
             shown that the length of the longest subsequence of indices
             that satisfies the condition is 3.

Constraints:
* 1 <= n == words.length == groups.length <= 100
* 1 <= words[i].length <= 10
* groups[i] is either 0 or 1.
* words consists of distinct strings.
* words[i] consists of lowercase English letters.*/

function getLongestSubsequence(words: string[], groups: number[]): string[] {
    const ans = [];
    for (let i = 0; i < words.length; ++i)
        if (i == 0 || groups[i-1] != groups[i])
            ans.push(words[i]);
    return ans;
};


/*2913. Subarrays Distinct Element Sum of Squares I (Easy)
You are given a 0-indexed integer array nums. The distinct count of a
subarray of nums is defined as:
* Let nums[i..j] be a subarray of nums consisting of all the indices from i
  to j such that 0 <= i <= j < nums.length. Then the number of distinct
  values in nums[i..j] is called the distinct count of nums[i..j].
Return the sum of the squares of distinct counts of all subarrays of nums. A
subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,1]
Output: 15
Explanation: Six possible subarrays are:
             [1]: 1 distinct value
             [2]: 1 distinct value
             [1]: 1 distinct value
             [1,2]: 2 distinct values
             [2,1]: 2 distinct values
             [1,2,1]: 2 distinct values
             The sum of the squares of the distinct counts in all subarrays
             is equal to 12 + 12 + 12 + 22 + 22 + 22 = 15.

Example 2:
Input: nums = [1,1]
Output: 3
Explanation: Three possible subarrays are:
             [1]: 1 distinct value
             [1]: 1 distinct value
             [1,1]: 1 distinct value
             The sum of the squares of the distinct counts in all subarrays
             is equal to 12 + 12 + 12 = 3.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100*/

function sumCounts(nums: number[]): number {
    let ans = 0;
    for (let i = 0, n = nums.length; i < n; ++i) {
        const seen = new Set();
        for (let j = i; j < n; ++j) {
            seen.add(nums[j]);
            ans += Math.pow(seen.size, 2);
        }
    }
    return ans;
};


/*2917. Find the K-or of an Array (Easy)
You are given a 0-indexed integer array nums, and an integer k. The K-or of
nums is a non-negative integer that satisfies the following:
* The ith bit is set in the K-or if and only if there are at least k
  elements of nums in which bit i is set.
Return the K-or of nums. Note that a bit i is set in x if (2i AND x) == 2i,
where AND is the bitwise AND operator.

Example 1:
Input: nums = [7,12,9,8,9,15], k = 4
Output: 9
Explanation: Bit 0 is set at nums[0], nums[2], nums[4], and nums[5].
             Bit 1 is set at nums[0], and nums[5].
             Bit 2 is set at nums[0], nums[1], and nums[5].
             Bit 3 is set at nums[1], nums[2], nums[3], nums[4], and nums[5].
             Only bits 0 and 3 are set in at least k elements of the array,
             and bits i >= 4 are not set in any of the array's elements.
             Hence, the answer is 2^0 + 2^3 = 9.

Example 2:
Input: nums = [2,12,1,11,4,5], k = 6
Output: 0
Explanation: Since k == 6 == nums.length, the 6-or of the array is equal to
             the bitwise AND of all its elements. Hence, the answer is 2 AND
             12 AND 1 AND 11 AND 4 AND 5 = 0.

Example 3:
Input: nums = [10,8,5,9,11,6,8], k = 1
Output: 15
Explanation: Since k == 1, the 1-or of the array is equal to the bitwise OR
             of all its elements. Hence, the answer is
             10 OR 8 OR 5 OR 9 OR 11 OR 6 OR 8 = 15.

Constraints:
* 1 <= nums.length <= 50
* 0 <= nums[i] < 2^31
* 1 <= k <= nums.length*/

function findKOr(nums: number[], k: number): number {
    let ans = 0;
    for (let i = 0; i < 32; ++i) {
        let freq = 0;
        for (const x of nums)
            if (x & 1<<i && ++freq == k) {
                ans ^= 1<<i;
                break;
            }
    }
    return ans;
};


/*2918. Minimum Equal Sum of Two Arrays After Replacing Zeros (Medium)
You are given two arrays nums1 and nums2 consisting of positive integers.
You have to replace all the 0's in both arrays with strictly positive
integers such that the sum of elements of both arrays becomes equal. Return
the minimum equal sum you can obtain, or -1 if it is impossible.

Example 1:
Input: nums1 = [3,2,0,1,0], nums2 = [6,5,0]
Output: 12
Explanation: We can replace 0's in the following way:
             - Replace the two 0's in nums1 with the values 2 and 4. The
               resulting array is nums1 = [3,2,2,1,4].
             - Replace the 0 in nums2 with the value 1. The resulting array
               is nums2 = [6,5,1].
             Both arrays have an equal sum of 12. It can be shown that it is
             the minimum sum we can obtain.

Example 2:
Input: nums1 = [2,0,2,0], nums2 = [1,4]
Output: -1
Explanation: It is impossible to make the sum of both arrays equal.

Constraints:
* 1 <= nums1.length, nums2.length <= 10^5
* 0 <= nums1[i], nums2[i] <= 10^6*/

function minSum(nums1: number[], nums2: number[]): number {
    const s1 = nums1.reduce((s, x) => s + Math.max(x, 1), 0);
    const s2 = nums2.reduce((s, x) => s + Math.max(x, 1), 0);
    const n1 = nums1.filter(x => x == 0).length;
    const n2 = nums2.filter(x => x == 0).length;
    if (s1 < s2 && n1 == 0 || s2 < s1 && n2 == 0) return -1;
    return Math.max(s1, s2);
};


/*2919. Minimum Increment Operations to Make Array Beautiful (Medium)
You are given a 0-indexed integer array nums having length n, and an integer
k. You can perform the following increment operation any number of times
(including zero):
* Choose an index i in the range [0, n - 1], and increase nums[i] by 1.
An array is considered beautiful if, for any subarray with a size of 3 or
more, its maximum element is greater than or equal to k. Return an integer
denoting the minimum number of increment operations needed to make nums
beautiful. A subarray is a contiguous non-empty sequence of elements within
an array.

Example 1:
Input: nums = [2,3,0,0,2], k = 4
Output: 3
Explanation: We can perform the following increment operations to make nums
             beautiful:
             - Choose index i = 1 and increase nums[1] by 1 -> [2,4,0,0,2].
             - Choose index i = 4 and increase nums[4] by 1 -> [2,4,0,0,3].
             - Choose index i = 4 and increase nums[4] by 1 -> [2,4,0,0,4].
             The subarrays with a size of 3 or more are: [2,4,0], [4,0,0],
             [0,0,4], [2,4,0,0], [4,0,0,4], [2,4,0,0,4]. In all the
             subarrays, the maximum element is equal to k = 4, so nums is
             now beautiful. It can be shown that nums cannot be made
             beautiful with fewer than 3 increment operations. Hence, the
             answer is 3.

Example 2:
Input: nums = [0,1,3,3], k = 5
Output: 2
Explanation: We can perform the following increment operations to make nums
             beautiful:
             - Choose index i = 2 and increase nums[2] by 1 -> [0,1,4,3].
             - Choose index i = 2 and increase nums[2] by 1 -> [0,1,5,3].
             The subarrays with a size of 3 or more are: [0,1,5], [1,5,3],
             [0,1,5,3]. In all the subarrays, the maximum element is equal
             to k = 5, so nums is now beautiful. It can be shown that nums
             cannot be made beautiful with fewer than 2 increment
             operations. Hence, the answer is 2.

Example 3:
Input: nums = [1,1,2], k = 1
Output: 0
Explanation: The only subarray with a size of 3 or more in this example is
             [1,1,2]. The maximum element, 2, is already greater than k = 1,
             so we don't need any increment operation. Hence, the answer is
             0.

Constraints:
* 3 <= n == nums.length <= 10^5
* 0 <= nums[i] <= 10^9
* 0 <= k <= 10^9*/

function minIncrementOperations(nums: number[], k: number): number {
    const n = nums.length;
    const dp = Array(n+1).fill(Infinity);
    dp[n] = 0;
    for (let i = n-1; i >= 0; --i) {
        for (let j = i+1; j <= i+3 && j <= n; ++j)
            dp[i] = Math.min(dp[i], dp[j]);
        dp[i] += Math.max(0, k-nums[i]);
    }
    return Math.min(...dp.slice(0, 3));
};


/*2920. Maximum Points After Collecting Coins From All Nodes (Hard)
There exists an undirected tree rooted at node 0 with n nodes labeled from 0
to n - 1. You are given a 2D integer array edges of length n - 1, where
edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi
in the tree. You are also given a 0-indexed array coins of size n where
coins[i] indicates the number of coins in the vertex i, and an integer k.
Starting from the root, you have to collect all the coins such that the
coins at a node can only be collected if the coins of its ancestors have
been already collected. Coins at nodei can be collected in one of the
following ways:
* Collect all the coins, but you will get coins[i] - k points. If
  coins[i] - k is negative then you will lose abs(coins[i] - k) points.
* Collect all the coins, but you will get floor(coins[i] / 2) points. If
  this way is used, then for all the nodej present in the subtree of nodei,
  coins[j] will get reduced to floor(coins[j] / 2).
Return the maximum points you can get after collecting the coins from all
the tree nodes.

Example 1:
Input: edges = [[0,1],[1,2],[2,3]], coins = [10,10,3,3], k = 5
Output: 11
Explanation: - Collect all the coins from node 0 using the first way. Total
               points = 10 - 5 = 5.
             - Collect all the coins from node 1 using the first way. Total
               points = 5 + (10 - 5) = 10.
             - Collect all the coins from node 2 using the second way so
               coins left at node 3 will be floor(3 / 2) = 1. Total points
               = 10 + floor(3 / 2) = 11.
             - Collect all the coins from node 3 using the second way. Total
               points = 11 + floor(1 / 2) = 11.
             It can be shown that the maximum points we can get after
             collecting coins from all the nodes is 11.

Example 2:
Input: edges = [[0,1],[0,2]], coins = [8,4,4], k = 0
Output: 16
Explanation: Coins will be collected from all the nodes using the first way.
             Therefore, total points = (8 - 0) + (4 - 0) + (4 - 0) = 16.

Constraints:
* n == coins.length
* 2 <= n <= 10^5
* 0 <= coins[i] <= 10^4
* edges.length == n - 1
* 0 <= edges[i][0], edges[i][1] < n
* 0 <= k <= 10^4*/

function maximumPoints(edges: number[][], coins: number[], k: number): number {
    const n = 1 + edges.length;
    const tree = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }
    const memo = Array(n).fill(0);

    function dfs(u, p, d) {
        if (d >= 14 || memo[u] > d) return 0;
        ++memo[u];
        let op1 = 0, op2 = 0;
        for (const v of tree[u])
            if (v != p) {
                op1 += dfs(v, u, d);
                op2 += dfs(v, u, d+1);
            }
        return Math.max((coins[u]>>d) - k + op1, (coins[u]>>d+1) + op2);
    }

    return dfs(0, -1, 0);
};


/*2932. Maximum Strong Pair XOR I (Easy)
You are given a 0-indexed integer array nums. A pair of integers x and y is
called a strong pair if it satisfies the condition:
* |x - y| <= min(x, y)
You need to select two integers from nums such that they form a strong pair
and their bitwise XOR is the maximum among all strong pairs in the array.
Return the maximum XOR value out of all possible strong pairs in the array
nums. Note that you can pick the same integer twice to form a pair.

Example 1:
Input: nums = [1,2,3,4,5]
Output: 7
Explanation: There are 11 strong pairs in the array nums: (1, 1), (1, 2),
             (2, 2), (2, 3), (2, 4), (3, 3), (3, 4), (3, 5), (4, 4), (4, 5)
             and (5, 5). The maximum XOR possible from these pairs is
             3 XOR 4 = 7.

Example 2:
Input: nums = [10,100]
Output: 0
Explanation: There are 2 strong pairs in the array nums: (10, 10) and
             (100, 100). The maximum XOR possible from these pairs is
             10 XOR 10 = 0 since the pair (100, 100) also gives
             100 XOR 100 = 0.

Example 3:
Input: nums = [5,6,25,30]
Output: 7
Explanation: There are 6 strong pairs in the array nums: (5, 5), (5, 6),
             (6, 6), (25, 25), (25, 30) and (30, 30). The maximum XOR
             possible from these pairs is 25 XOR 30 = 7 since the only other
             non-zero XOR value is 5 XOR 6 = 3.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 100*/

function maximumStrongPairXor(nums: number[]): number {
    let ans = 0;
    for (let i = 0, n = nums.length; i < n; ++i)
        for (let j = i+1; j < n; ++j)
            if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j]))
                ans = Math.max(ans, nums[i] ^ nums[j]);
    return ans;
};


/*2933. High-Access Employees (Medium)
You are given a 2D 0-indexed array of strings, access_times, with size n.
For each i where 0 <= i <= n - 1, access_times[i][0] represents the name of
an employee, and access_times[i][1] represents the access time of that
employee. All entries in access_times are within the same day. The access
time is represented as four digits using a 24-hour time format, for example,
"0800" or "2250". An employee is said to be high-access if he has accessed
the system three or more times within a one-hour period. Times with exactly
one hour of difference are not considered part of the same one-hour period.
For example, "0815" and "0915" are not part of the same one-hour period.
Access times at the start and end of the day are not counted within the same
one-hour period. For example, "0005" and "2350" are not part of the same
one-hour period. Return a list that contains the names of high-access
employees with any order you want.

Example 1:
Input: access_times = [["a","0549"],["b","0457"],["a","0532"],["a","0621"],["b","0540"]]
Output: ["a"]
Explanation: "a" has three access times in the one-hour period of
             [05:32, 06:31] which are 05:32, 05:49, and 06:21. But "b" does
             not have more than two access times at all. So the answer is
             ["a"].

Example 2:
Input: access_times = [["d","0002"],["c","0808"],["c","0829"],["e","0215"],["d","1508"],["d","1444"],["d","1410"],["c","0809"]]
Output: ["c","d"]
Explanation: "c" has three access times in the one-hour period of
             [08:08, 09:07] which are 08:08, 08:09, and 08:29. "d" has also
             three access times in the one-hour period of [14:10, 15:09]
             which are 14:10, 14:44, and 15:08. However, "e" has just one
             access time, so it can not be in the answer and the final
             answer is ["c","d"].

Example 3:
Input: access_times = [["cd","1025"],["ab","1025"],["cd","1046"],["cd","1055"],["ab","1124"],["ab","1120"]]
Output: ["ab","cd"]
Explanation: "ab" has three access times in the one-hour period of
             [10:25, 11:24] which are 10:25, 11:20, and 11:24. "cd" has also
             three access times in the one-hour period of [10:25, 11:24]
             which are 10:25, 10:46, and 10:55. So the answer is ["ab","cd"].

Constraints:
* 1 <= access_times.length <= 100
* access_times[i].length == 2
* 1 <= access_times[i][0].length <= 10
* access_times[i][0] consists only of English small letters.
* access_times[i][1].length == 4
* access_times[i][1] is in 24-hour time format.
* access_times[i][1] consists only of '0' to '9'.*/

function findHighAccessEmployees(access_times: string[][]): string[] {
    const mp = new Map();
    for (const [name, time] of access_times) {
        const t = 60*Number(time.substring(0, 2)) + Number(time.substring(2));
        if (!mp.has(name)) mp.set(name, []);
        mp.get(name).push(t);
    }
    const ans = [];
    for (const [name, times] of mp.entries()) {
        times.sort((x, y) => x-y);
        for (let i = 2; i < times.length; ++i)
            if (times[i] - times[i-2] < 60) {
                ans.push(name);
                break;
            }
    }
    return ans;
};


/*2934. Minimum Operations to Maximize Last Elements in Arrays (Medium)
You are given two 0-indexed integer arrays, nums1 and nums2, both having
length n. You are allowed to perform a series of operations (possibly none).
In an operation, you select an index i in the range [0, n - 1] and swap the
values of nums1[i] and nums2[i]. Your task is to find the minimum number of
operations required to satisfy the following conditions:
* nums1[n - 1] is equal to the maximum value among all elements of nums1,
  i.e., nums1[n - 1] = max(nums1[0], nums1[1], ..., nums1[n - 1]).
* nums2[n - 1] is equal to the maximum value among all elements of nums2,
  i.e., nums2[n - 1] = max(nums2[0], nums2[1], ..., nums2[n - 1]).
Return an integer denoting the minimum number of operations needed to meet
both conditions, or -1 if it is impossible to satisfy both conditions.

Example 1:
Input: nums1 = [1,2,7], nums2 = [4,5,3]
Output: 1
Explanation: In this example, an operation can be performed using index
             i = 2. When nums1[2] and nums2[2] are swapped, nums1 becomes
             [1,2,3] and nums2 becomes [4,5,7]. Both conditions are now
             satisfied. It can be shown that the minimum number of
             operations needed to be performed is 1. So, the answer is 1.

Example 2:
Input: nums1 = [2,3,4,5,9], nums2 = [8,8,4,4,4]
Output: 2
Explanation: In this example, the following operations can be performed:
             - First operation using index i = 4. When nums1[4] and nums2[4]
               are swapped, nums1 becomes [2,3,4,5,4], and nums2 becomes
               [8,8,4,4,9].
             - Another operation using index i = 3. When nums1[3] and
               nums2[3] are swapped, nums1 becomes [2,3,4,4,4], and nums2
               becomes [8,8,4,5,9].
             Both conditions are now satisfied. It can be shown that the
             minimum number of operations needed to be performed is 2. So,
             the answer is 2.

Example 3:
Input: nums1 = [1,5,4], nums2 = [2,5,3]
Output: -1
Explanation: In this example, it is not possible to satisfy both conditions.
             So, the answer is -1.

Constraints:
* 1 <= n == nums1.length == nums2.length <= 1000
* 1 <= nums1[i] <= 10^9
* 1 <= nums2[i] <= 10^9*/

function minOperations(nums1: number[], nums2: number[]): number {
    let yes = 0, no = 0;
    for (let i = 0, n = nums1.length; i < n; ++i) {
        const x1 = nums1[i], x2 = nums2[i];
        if (Math.min(nums1[n-1], nums2[n-1]) < Math.min(x1, x2) || Math.max(nums1[n-1], nums2[n-1]) < Math.max(x1, x2)) return -1;
        if (nums1[n-1] < x1 || nums2[n-1] < x2) ++yes;
        if (nums1[n-1] < x2 || nums2[n-1] < x1) ++no;
    }
    return Math.min(yes, no);
};


/*2935. Maximum Strong Pair XOR II (Hard)
You are given a 0-indexed integer array nums. A pair of integers x and y is
called a strong pair if it satisfies the condition:
* |x - y| <= min(x, y)
You need to select two integers from nums such that they form a strong pair
and their bitwise XOR is the maximum among all strong pairs in the array.
Return the maximum XOR value out of all possible strong pairs in the array
nums. Note that you can pick the same integer twice to form a pair.

Example 1:
Input: nums = [1,2,3,4,5]
Output: 7
Explanation: There are 11 strong pairs in the array nums: (1, 1), (1, 2),
             (2, 2), (2, 3), (2, 4), (3, 3), (3, 4), (3, 5), (4, 4), (4, 5)
             and (5, 5). The maximum XOR possible from these pairs is
             3 XOR 4 = 7.

Example 2:
Input: nums = [10,100]
Output: 0
Explanation: There are 2 strong pairs in the array nums: (10, 10) and
             (100, 100). The maximum XOR possible from these pairs is
             10 XOR 10 = 0 since the pair (100, 100) also gives
             100 XOR 100 = 0.

Example 3:
Input: nums = [500,520,2500,3000]
Output: 1020
Explanation: There are 6 strong pairs in the array nums: (500, 500),
             (500, 520), (520, 520), (2500, 2500), (2500, 3000) and
             (3000, 3000). The maximum XOR possible from these pairs is
             500 XOR 520 = 1020 since the only other non-zero XOR value is
             2500 XOR 3000 = 636.

Constraints:
* 1 <= nums.length <= 5 * 10^4
* 1 <= nums[i] <= 2^20 - 1*/

function maximumStrongPairXor(nums: number[]): number {
    nums.sort((x, y) => x - y);
    const trie = new Map();
    let ans = 0, k = 0;
    for (const x of nums) {
        let node = trie;
        for (let i = 19; i >= 0; --i) {
            const b = x>>i & 1;
            if (!node.has(b)) node.set(b, new Map());
            node = node.get(b);
            node.set("#", 1 + (node.get("#") ?? 0));
        }
        node.set("$", x);
        for (; 2*nums[k] < x; ++k) {
            node = trie;
            for (let i = 19; i >= 0; --i) {
                const b = nums[k]>>i & 1;
                node.get(b).set("#", node.get(b).get("#")-1);
                if (node.get(b).get("#") == 0) {
                    node.delete(b);
                    break;
                }
                node = node.get(b);
            }
        }
        node = trie;
        for (let i = 19; i >= 0; --i) {
            const b = x>>i & 1;
            if (node.has(1^b)) node = node.get(1^b);
            else node = node.get(b);
        }
        ans = Math.max(ans, x ^ node.get("$"));
    }
    return ans;
};


/*2936. Number of Equal Numbers Blocks (Medium)
You are given a 0-indexed array of integers, nums. The following property
holds for nums:
* All occurrences of a value are adjacent. In other words, if there are two
  indices i < j such that nums[i] == nums[j], then for every index k that
  i < k < j, nums[k] == nums[i].
Since nums is a very large array, you are given an instance of the class
BigArray which has the following functions:
* int at(long long index): Returns the value of nums[i].
* void size(): Returns nums.length.
Let's partition the array into maximal blocks such that each block contains
equal values. Return the number of these blocks. Note that if you want to
test your solution using a custom test, behavior for tests with
nums.length > 10 is undefined.

Example 1:
Input: nums = [3,3,3,3,3]
Output: 1
Explanation: There is only one block here which is the whole array (because
             all numbers are equal) and that is: [3,3,3,3,3]. So the answer
             would be 1.

Example 2:
Input: nums = [1,1,1,3,9,9,9,2,10,10]
Output: 5
Explanation: There are 5 blocks here:
Block number 1: [1,1,1,3,9,9,9,2,10,10]
Block number 2: [1,1,1,3,9,9,9,2,10,10]
Block number 3: [1,1,1,3,9,9,9,2,10,10]
Block number 4: [1,1,1,3,9,9,9,2,10,10]
Block number 5: [1,1,1,3,9,9,9,2,10,10]
So the answer would be 5.

Example 3:
Input: nums = [1,2,3,4,5,6,7]
Output: 7
Explanation: Since all numbers are distinct, there are 7 blocks here and
             each element representing one block. So the answer would be 7.

Constraints:
* 1 <= nums.length <= 10^15
* 1 <= nums[i] <= 10^9
* The input is generated such that all equal values are adjacent.
* The sum of the elements of nums is at most 10^15.*/

function countBlocks(nums: BigArray | null): number {

    function fn(lo, hi) {
        if (lo == hi || nums.at(lo) == nums.at(hi)) return 1;
        const mid = lo + Math.floor((hi - lo)/2);
        let ans = fn(lo, mid) + fn(mid+1, hi);
        if (nums.at(mid) == nums.at(mid+1)) --ans;
        return ans;
    }

    return fn(0, nums.size()-1);
};


/*2942. Find Words Containing Character (Easy)
You are given a 0-indexed array of strings words and a character x. Return
an array of indices representing the words that contain the character x.
Note that the returned array may be in any order.

Example 1:
Input: words = ["leet","code"], x = "e"
Output: [0,1]
Explanation: "e" occurs in both words: "leet", and "code". Hence, we return
             indices 0 and 1.

Example 2:
Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
Output: [0,2]
Explanation: "a" occurs in "abc", and "aaaa". Hence, we return indices 0 and
             2.

Example 3:
Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
Output: []
Explanation: "z" does not occur in any of the words. Hence, we return an
             empty array.

Constraints:
* 1 <= words.length <= 50
* 1 <= words[i].length <= 50
* x is a lowercase English letter.
* words[i] consists only of lowercase English letters.*/

function findWordsContaining(words: string[], x: string): number[] {
    const ans = [];
    for (let i = 0; i < words.length; ++i)
        if (words[i].includes(x)) ans.push(i);
    return ans;
};


/*2950. Number of Divisible Substrings (Medium)
Each character of the English alphabet has been mapped to a digit as shown
below. A string is divisible if the sum of the mapped values of its
characters is divisible by its length. Given a string s, return the number
of divisible substrings of s. A substring is a contiguous non-empty sequence
of characters within a string.

Example 1: Substring   Mapped  Sum Length  Divisible?
           a   1   1   1   Yes
           s   7   7   1   Yes
           d   2   2   1   Yes
           f   3   3   1   Yes
           as  1, 7    8   2   Yes
           sd  7, 2    9   2   No
           df  2, 3    5   2   No
           asd 1, 7, 2 10  3   No
           sdf 7, 2, 3 12  3   Yes
           asdf    1, 7, 2, 3  13  4   No
Input: word = "asdf"
Output: 6
Explanation: The table above contains the details about every substring of
             word, and we can see that 6 of them are divisible.

Example 2:
Input: word = "bdh"
Output: 4
Explanation: The 4 divisible substrings are: "b", "d", "h", "bdh". It can be
             shown that there are no other substrings of word that are
             divisible.

Example 3:
Input: word = "abcd"
Output: 6
Explanation: The 6 divisible substrings are: "a", "b", "c", "d", "ab", "cd".
             It can be shown that there are no other substrings of word that
             are divisible.

Constraints:
* 1 <= word.length <= 2000
* word consists only of lowercase English letters.*/

function countDivisibleSubstrings(word: string): number {
    let ans = 0;
    for (let k = 1; k <= 9; ++k) {
        let prefix = 0;
        const freq = new Map();
        freq.set(0, 1);
        for (let i = 0; i < word.length; ++i) {
            prefix += 2 + Math.floor((word[i].charCodeAt(0)-99)/3.);
            ans += freq.get(prefix-k*(i+1)) ?? 0;
            freq.set(prefix-k*(i+1), 1 + (freq.get(prefix-k*(i+1)) ?? 0));
        }
    }
    return ans;
};


/*2955. Number of Same-End Substrings (Medium)
You are given a 0-indexed string s, and a 2D array of integers queries,
where queries[i] = [li, ri] indicates a substring of s starting from the
index li and ending at the index ri (both inclusive), i.e. s[li..ri]. Return
an array ans where ans[i] is the number of same-end substrings of queries[i].
A 0-indexed string t of length n is called same-end if it has the same
character at both of its ends, i.e., t[0] == t[n - 1]. A substring is a
contiguous non-empty sequence of characters within a string.

Example 1:
Input: s = "abcaab", queries = [[0,0],[1,4],[2,5],[0,5]]
Output: [1,5,5,10]
Explanation: Here is the same-end substrings of each query:
             - 1st query: s[0..0] is "a" which has 1 same-end substring: "a".
             - 2nd query: s[1..4] is "bcaa" which has 5 same-end substrings:
               "bcaa", "bcaa", "bcaa", "bcaa", "bcaa".
             - 3rd query: s[2..5] is "caab" which has 5 same-end substrings:
               "caab", "caab", "caab", "caab", "caab".
             - 4th query: s[0..5] is "abcaab" which has 10 same-end
               substrings: "abcaab", "abcaab", "abcaab", "abcaab", "abcaab",
               "abcaab", "abcaab", "abcaab", "abcaab", "abcaab".

Example 2:
Input: s = "abcd", queries = [[0,3]]
Output: [4]
Explanation: The only query is s[0..3] which is "abcd". It has 4 same-end
             substrings: "abcd", "abcd", "abcd", "abcd".

Constraints:
* 2 <= s.length <= 3 * 10^4
* s consists only of lowercase English letters.
* 1 <= queries.length <= 3 * 10^4
* queries[i] = [li, ri]
* 0 <= li <= ri < s.length*/

function sameEndSubstringCount(s: string, queries: number[][]): number[] {
    const ans = Array(queries.length).fill(0);
    for (const c of "abcdefghijklmnopqrstuvwxyz") {
        const prefix = [0];
        for (const ch of s) {
            prefix.push(prefix[prefix.length-1]);
            if (ch == c) ++prefix[prefix.length-1];
        }
        for (const [i, [l, r]] of queries.entries()) {
            const diff = prefix[r+1] - prefix[l];
            ans[i] += diff*(diff+1)/2;
        }
    }
    return ans;
};


/*2958. Length of Longest Subarray With at Most K Frequency (Medium)
You are given an integer array nums and an integer k. The frequency of an
element x is the number of times it occurs in an array. An array is called
good if the frequency of each element in this array is less than or equal to
k. Return the length of the longest good subarray of nums. A subarray is a
contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,3,1,2,3,1,2], k = 2
Output: 6
Explanation: The longest possible good subarray is [1,2,3,1,2,3] since the
             values 1, 2, and 3 occur at most twice in this subarray. Note
             that the subarrays [2,3,1,2,3,1] and [3,1,2,3,1,2] are also
             good. It can be shown that there are no good subarrays with
             length more than 6.

Example 2:
Input: nums = [1,2,1,2,1,2,1,2], k = 1
Output: 2
Explanation: The longest possible good subarray is [1,2] since the values 1
             and 2 occur at most once in this subarray. Note that the
             subarray [2,1] is also good. It can be shown that there are no
             good subarrays with length more than 2.

Example 3:
Input: nums = [5,5,5,5,5,5,5], k = 4
Output: 4
Explanation: The longest possible good subarray is [5,5,5,5] since the value
             5 occurs 4 times in this subarray. It can be shown that there
             are no good subarrays with length more than 4.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* 1 <= k <= nums.length*/

function maxSubarrayLength(nums: number[], k: number): number {
    let ans = 0, freq = new Map(), ii = 0;
    for (const [i, x] of nums.entries()) {
        freq.set(x, (freq.get(x) ?? 0) + 1);
        while (freq.get(x) > k) {
            freq.set(nums[ii], freq.get(nums[ii])-1);
            ++ii
        }
        ans = Math.max(ans, i-ii+1);
    }
    return ans;
};


/*2962. Count Subarrays Where Max Element Appears at Least K Times (Meidum)
You are given an integer array nums and a positive integer k. Return the
number of subarrays where the maximum element of nums appears at least k
times in that subarray. A subarray is a contiguous sequence of elements
within an array.

Example 1:
Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are:
             [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

Example 2:
Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^6
* 1 <= k <= 10^5*/

function countSubarrays(nums: number[], k: number): number {
    let m = Math.max(...nums);
    let ans = 0, ii = 0, freq = 0;
    for (let x of nums) {
        if (x == m) ++freq;
        while (freq == k)
            if (nums[ii++] == m) --freq;
        ans += ii;
    }
    return ans;
};


/*2964. Number of Divisible Triplet Sums (Medium)
Given a 0-indexed integer array nums and an integer d, return the number of
triplets (i, j, k) such that i < j < k and
(nums[i] + nums[j] + nums[k]) % d == 0.

Example 1:
Input: nums = [3,3,4,7,8], d = 5
Output: 3
Explanation: The triplets which are divisible by 5 are: (0, 1, 2),
             (0, 2, 4), (1, 2, 4). It can be shown that no other triplet is
             divisible by 5. Hence, the answer is 3.

Example 2:
Input: nums = [3,3,3,3], d = 3
Output: 4
Explanation: Any triplet chosen here has a sum of 9, which is divisible by
             3. Hence, the answer is the total number of triplets which is 4.

Example 3:
Input: nums = [3,3,3,3], d = 6
Output: 0
Explanation: Any triplet chosen here has a sum of 9, which is not divisible
             by 6. Hence, the answer is 0.

Constraints:
* 1 <= nums.length <= 1000
* 1 <= nums[i] <= 10^9
* 1 <= d <= 10^9*/

function divisibleTripletCount(nums: number[], d: number): number {
    let ans = 0;
    for (const [i, x] of nums.entries()) {
        const freq = new Map();
        for (let ii = i+1; ii < nums.length; ++ii) {
            ans += freq.get((d - nums[ii]%d) % d) ?? 0;
            const key = (x + nums[ii]) % d;
            freq.set(key, 1 + (freq.get(key) ?? 0));
        }
    }
    return ans;
};


/*2965. Find Missing and Repeated Values (Easy)
You are given a 0-indexed 2D integer matrix grid of size n * n with values
in the range [1, n2]. Each integer appears exactly once except a which
appears twice and b which is missing. The task is to find the repeating and
missing numbers a and b. Return a 0-indexed integer array ans of size 2
where ans[0] equals to a and ans[1] equals to b.

Example 1:
Input: grid = [[1,3],[2,2]]
Output: [2,4]
Explanation: Number 2 is repeated and number 4 is missing so the answer is
             [2,4].

Example 2:
Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
Output: [9,5]
Explanation: Number 9 is repeated and number 5 is missing so the answer is
             [9,5].

Constraints:
* 2 <= n == grid.length == grid[i].length <= 50
* 1 <= grid[i][j] <= n * n
* For all x that 1 <= x <= n * n there is exactly one x that is not equal to
  any of the grid members.
* For all x that 1 <= x <= n * n there is exactly one x that is equal to
  exactly two of the grid members.
* For all x that 1 <= x <= n * n except two of them there is exatly one pair
  of i, j that 0 <= i, j <= n - 1 and grid[i][j] == x.*/

function findMissingAndRepeatedValues(grid: number[][]): number[] {
    let s = 0, s2 = 0, n = grid.length * grid.length;
    for (const row of grid)
        for (const x of row) {
            s += x;
            s2 += x*x;
        }
    let diff = s - n*(n+1)/2, total = (s2 - n*(n+1)*(2*n+1)/6) / diff;
    return [ (total+diff)/2, (total-diff)/2 ];
};


/*2966. Divide Array Into Arrays With Max Difference (Medium)
You are given an integer array nums of size n and a positive integer k.
Divide the array into one or more arrays of size 3 satisfying the following
conditions:
* Each element of nums should be in exactly one array.
* The difference between any two elements in one array is less than or equal
  to k.
Return a 2D array containing all the arrays. If it is impossible to satisfy
the conditions, return an empty array. And if there are multiple answers,
return any of them.

Example 1:
Input: nums = [1,3,4,8,7,9,3,5,1], k = 2
Output: [[1,1,3],[3,4,5],[7,8,9]]
Explanation: We can divide the array into the following arrays: [1,1,3],
             [3,4,5] and [7,8,9]. The difference between any two elements in
             each array is less than or equal to 2. Note that the order of
             elements is not important.

Example 2:
Input: nums = [1,3,3,2,7,3], k = 3
Output: []
Explanation: It is not possible to divide the array satisfying all the
             conditions.

Constraints:
* n == nums.length
* 1 <= n <= 10^5
* n is a multiple of 3.
* 1 <= nums[i] <= 10^5
* 1 <= k <= 10^5*/

function divideArray(nums: number[], k: number): number[][] {
    nums.sort((a, b) => (a-b));
    const ans = [];
    for (let i = 2; i < nums.length; i += 3) {
        if (nums[i] - nums[i-2] > k) return [];
        ans.push([ nums[i-2], nums[i-1], nums[i] ]);
    }
    return ans;
};


/*2967. Minimum Cost to Make Array Equalindromic (Medium)
You are given a 0-indexed integer array nums having length n. You are
allowed to perform a special move any number of times (including zero) on
nums. In one special move you perform the following steps in order:
* Choose an index i in the range [0, n - 1], and a positive integer x.
* Add |nums[i] - x| to the total cost.
* Change the value of nums[i] to x.
A palindromic number is a positive integer that remains the same when its
digits are reversed. For example, 121, 2552 and 65756 are palindromic
numbers whereas 24, 46, 235 are not palindromic numbers. An array is
considered equalindromic if all the elements in the array are equal to an
integer y, where y is a palindromic number less than 10^9. Return an integer
denoting the minimum possible total cost to make nums equalindromic by
performing any number of special moves.

Example 1:
Input: nums = [1,2,3,4,5]
Output: 6
Explanation: We can make the array equalindromic by changing all elements to
             3 which is a palindromic number. The cost of changing the array
             to [3,3,3,3,3] using 4 special moves is given by
             |1 - 3| + |2 - 3| + |4 - 3| + |5 - 3| = 6. It can be shown that
             changing all elements to any palindromic number other than 3
             cannot be achieved at a lower cost.

Example 2:
Input: nums = [10,12,13,14,15]
Output: 11
Explanation: We can make the array equalindromic by changing all elements to
             11 which is a palindromic number. The cost of changing the
             array to [11,11,11,11,11] using 5 special moves is given by
             |10 - 11| + |12 - 11| + |13 - 11| + |14 - 11| + |15 - 11| = 11.
             It can be shown that changing all elements to any palindromic
             number other than 11 cannot be achieved at a lower cost.

Example 3:
Input: nums = [22,33,22,33,22]
Output: 22
Explanation: We can make the array equalindromic by changing all elements to
             22 which is a palindromic number. The cost of changing the
             array to [22,22,22,22,22] using 2 special moves is given by
             |33 - 22| + |33 - 22| = 22. It can be shown that changing all
             elements to any palindromic number other than 22 cannot be
             achieved at a lower cost.

Constraints:
* 1 <= n <= 10^5
* 1 <= nums[i] <= 10^9*/

function minimumCost(nums: number[]): number {
    const sz = nums.length;
    nums.sort((a, b) => (a-b));
    const median = nums[Math.floor(sz/2)], digits = median.toString(), n = digits.length;
    const h = digits.substring(0, (n+1)/2), hh = h.split("").reverse().join("");
    const val = parseInt(h + hh.substring(n&1), 10);
    let cand = 0;
    const vals = [val];
    if (val < median) {
        const t = (parseInt(h) + 1).toString(), tt = t.split("").reverse().join("");
        if (t.length > Math.floor((n+1)/2)) cand = val + 2;
        else cand = parseInt(t + tt.substring(n&1));
        vals.push(cand);
    } else if (val > median) {
        const t = (parseInt(h) - 1).toString(), tt = t.split("").reverse().join("");
        if (t.length < Math.floor((n+1)/2) || t === "0" && val > 10) cand = val - 2;
        else cand = parseInt(t + tt.substring(n&1));
        vals.push(cand);
    }
    let ans = BigInt(1e15);
    for (const v of vals) {
        let prefix = 0n;
        for (const x of nums)
            prefix += BigInt(Math.abs(x - v));
        if (prefix < ans) ans = prefix;
    }
    return Number(ans);
};


/*2968. Apply Operations to Maximize Frequency Score (Hard)
You are given a 0-indexed integer array nums and an integer k. You can
perform the following operation on the array at most k times:
* Choose any index i from the array and increase or decrease nums[i] by 1.
The score of the final array is the frequency of the most frequent element
in the array. Return the maximum score you can achieve. The frequency of an
element is the number of occurences of that element in the array.

Example 1:
Input: nums = [1,2,6,4], k = 3
Output: 3
Explanation: We can do the following operations on the array:
             - Choose i = 0, and increase the value of nums[0] by 1. The
               resulting array is [2,2,6,4].
             - Choose i = 3, and decrease the value of nums[3] by 1. The
               resulting array is [2,2,6,3].
             - Choose i = 3, and decrease the value of nums[3] by 1. The
               resulting array is [2,2,6,2].
             The element 2 is the most frequent in the final array so our
             score is 3. It can be shown that we cannot achieve a better
             score.

Example 2:
Input: nums = [1,4,4,2,4], k = 0
Output: 3
Explanation: We cannot apply any operations so our score will be the
             frequency of the most frequent element in the original array,
             which is 3.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* 0 <= k <= 10^14*/

function maxFrequencyScore(nums: number[], k: number): number {
    nums.sort((a, b) => (a-b));
    let ii = 0;
    for (let i = 0; i < nums.length; ++i) {
        k -= nums[i] - nums[Math.floor((ii+i)/2)];
        if (k < 0)
            k += nums[Math.floor((ii+i+1)/2)] - nums[ii++];
    }
    return nums.length - ii;
};


/*2971. Find Polygon With the Largest Perimeter (Medium)
You are given an array of positive integers nums of length n. A polygon is a
closed plane figure that has at least 3 sides. The longest side of a polygon
is smaller than the sum of its other sides. Conversely, if you have k
(k >= 3) positive real numbers a1, a2, a3, ..., ak where
a1 <= a2 <= a3 <= ... <= ak and a1 + a2 + a3 + ... + ak-1 > ak, then there
always exists a polygon with k sides whose lengths are a1, a2, a3, ..., ak.
The perimeter of a polygon is the sum of lengths of its sides. Return the
largest possible perimeter of a polygon whose sides can be formed from nums,
or -1 if it is not possible to create a polygon.

Example 1:
Input: nums = [5,5,5]
Output: 15
Explanation: The only possible polygon that can be made from nums has 3
             sides: 5, 5, and 5. The perimeter is 5 + 5 + 5 = 15.

Example 2:
Input: nums = [1,12,1,2,5,50,3]
Output: 12
Explanation: The polygon with the largest perimeter which can be made from
             nums has 5 sides: 1, 1, 2, 3, and 5. The perimeter is
             1 + 1 + 2 + 3 + 5 = 12. We cannot have a polygon with either 12
             or 50 as the longest side because it is not possible to include
             2 or more smaller sides that have a greater sum than either of
             them. It can be shown that the largest possible perimeter is 12.

Example 3:
Input: nums = [5,5,50]
Output: -1
Explanation: There is no possible way to form a polygon from nums, as a
             polygon has at least 3 sides and 50 > 5 + 5.

Constraints:
* 3 <= n <= 10^5
* 1 <= nums[i] <= 10^9*/

function largestPerimeter(nums: number[]): number {
    let ans = -1, prefix = 0;
    nums.sort((a, b) => a-b);
    for (const [i, x] of nums.entries()) {
        if (i >= 2 && prefix > x) ans = Math.max(ans, prefix + x);
        prefix += x;
    }
    return ans;
};


/*2979. Most Expensive Item That Can Not Be Bought (Medium)
You are given two distinct prime numbers primeOne and primeTwo. Alice and
Bob are visiting a market. The market has an infinite number of items, for
any positive integer x there exists an item whose price is x. Alice wants to
buy some items from the market to gift to Bob. She has an infinite number of
coins in the denomination primeOne and primeTwo. She wants to know the most
expensive item she can not buy to gift to Bob. Return the price of the most
expensive item which Alice can not gift to Bob.

Example 1:
Input: primeOne = 2, primeTwo = 5
Output: 3
Explanation: The prices of items which cannot be bought are [1,3]. It can be
             shown that all items with a price greater than 3 can be bought
             using a combination of coins of denominations 2 and 5.

Example 2:
Input: primeOne = 5, primeTwo = 7
Output: 23
Explanation: The prices of items which cannot be bought are
             [1,2,3,4,6,8,9,11,13,16,18,23]. It can be shown that all items
             with a price greater than 23 can be bought.

Constraints:
* 1 < primeOne, primeTwo < 10^4
* primeOne, primeTwo are prime numbers.
* primeOne * primeTwo < 10^5*/

function mostExpensiveItem(primeOne: number, primeTwo: number): number {
    return primeOne * primeTwo - primeOne - primeTwo;
};


/*2992. Number of Self-Divisible Permutations (Medium)
Given an integer n, return the number of permutations of the 1-indexed array
nums = [1, 2, ..., n], such that it's self-divisible. A 1-indexed array a of
length n is self-divisible if for every 1 <= i <= n, gcd(a[i], i) == 1. A
permutation of an array is a rearrangement of the elements of that array,
for example here are all of the permutations of the array [1, 2, 3]:
* [1, 2, 3]
* [1, 3, 2]
* [2, 1, 3]
* [2, 3, 1]
* [3, 1, 2]
* [3, 2, 1]

Example 1:
Input: n = 1
Output: 1
Explanation: The array [1] has only 1 permutation which is self-divisible.

Example 2:
Input: n = 2
Output: 1
Explanation: The array [1,2] has 2 permutations and only one of them is
             self-divisible:
             * nums = [1,2]: This is not self-divisible since
               gcd(nums[2], 2) != 1.
             * nums = [2,1]: This is self-divisible since
               gcd(nums[1], 1) == 1 and gcd(nums[2], 2) == 1.

Example 3:
Input: n = 3
Output: 3
Explanation: The array [1,2,3] has 3 self-divisble permutations: [1,3,2],
             [3,1,2], [2,3,1]. It can be shown that the other 3 permutations
             are not self-divisible. Hence the answer is 3.

Constraints: 1 <= n <= 12*/

function selfDivisiblePermutationCount(n: number): number {
    const memo = Array(n+1).fill(null).map(() => Array(1<<n).fill(-1));

    function gcd(x, y) {
        while (y) {
            const temp = x;
            x = y;
            y = temp % y;
        }
        return Math.abs(x);
    }

    function fn(i, m) {
        if (memo[i][m] == -1)
            if (i == n) memo[i][m] = 1;
            else {
                memo[i][m] = 0;
                for (let x = 0; x < n; ++x)
                    if ((m & 1<<x) == 0 && gcd(x+1, i+1) == 1)
                        memo[i][m] += fn(i+1, m ^ 1<<x);
            }
        return memo[i][m];
    }

    return fn(0, 0);
};


/*2996. Smallest Missing Integer Greater Than Sequential Prefix Sum (Easy)
You are given a 0-indexed array of integers nums. A prefix nums[0..i] is
sequential if, for all 1 <= j <= i, nums[j] = nums[j - 1] + 1. In
particular, the prefix consisting only of nums[0] is sequential. Return the
smallest integer x missing from nums such that x is greater than or equal to
the sum of the longest sequential prefix.

Example 1:
Input: nums = [1,2,3,2,5]
Output: 6
Explanation: The longest sequential prefix of nums is [1,2,3] with a sum of
             6. 6 is not in the array, therefore 6 is the smallest missing
             integer greater than or equal to the sum of the longest
             sequential prefix.

Example 2:
Input: nums = [3,4,5,1,12,14,13]
Output: 15
Explanation: The longest sequential prefix of nums is [3,4,5] with a sum of
             12. 12, 13, and 14 belong to the array while 15 does not.
             Therefore 15 is the smallest missing integer greater than or
             equal to the sum of the longest sequential prefix.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 50*/

function missingInteger(nums: number[]): number {
    let prefix = 0;
    for (let i = 0; i < nums.length && (i == 0 || nums[i] == 1 + nums[i-1]); prefix += nums[i++]);
    const seen = new Set(nums);
    while (seen.has(prefix)) ++prefix;
    return prefix;
};


/*2997. Minimum Number of Operations to Make Array XOR Equal to K (Medium)
You are given a 0-indexed integer array nums and a positive integer k. You
can apply the following operation on the array any number of times:
* Choose any element of the array and flip a bit in its binary
  representation. Flipping a bit means changing a 0 to 1 or vice versa.
Return the minimum number of operations required to make the bitwise XOR of
all elements of the final array equal to k. Note that you can flip leading
zero bits in the binary representation of elements. For example, for the
number (101)2 you can flip the fourth bit and obtain (1101)2.

Example 1:
Input: nums = [2,1,3,4], k = 1
Output: 2
Explanation: We can do the following operations:
             - Choose element 2 which is 3 == (011)2, we flip the first bit
               and we obtain (010)2 == 2. nums becomes [2,1,2,4].
             - Choose element 0 which is 2 == (010)2, we flip the third bit
               and we obtain (110)2 = 6. nums becomes [6,1,2,4].
             The XOR of elements of the final array is
             (6 XOR 1 XOR 2 XOR 4) == 1 == k. It can be shown that we cannot
             make the XOR equal to k in less than 2 operations.

Example 2:
Input: nums = [2,0,2,0], k = 0
Output: 0
Explanation: The XOR of elements of the array is
             (2 XOR 0 XOR 2 XOR 0) == 0 == k. So no operation is needed.

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] <= 10^6
* 0 <= k <= 10^6*/

function minOperations(nums: number[], k: number): number {
    let ans = 0;
    for (let x = nums.reduce((x, y) => x ^ y, k); x; x &= x-1) ++ans;
    return ans;
};


/*2998. Minimum Number of Operations to Make X and Y Equal (Medium)
You are given two positive integers x and y. In one operation, you can do
one of the four following operations:
* Divide x by 11 if x is a multiple of 11.
* Divide x by 5 if x is a multiple of 5.
* Decrement x by 1.
* Increment x by 1.
Return the minimum number of operations required to make x and y equal.

Example 1:
Input: x = 26, y = 1
Output: 3
Explanation: We can make 26 equal to 1 by applying the following operations:
             1. Decrement x by 1
             2. Divide x by 5
             3. Divide x by 5
             It can be shown that 3 is the minimum number of operations
             required to make 26 equal to 1.

Example 2:
Input: x = 54, y = 2
Output: 4
Explanation: We can make 54 equal to 2 by applying the following operations:
             1. Increment x by 1
             2. Divide x by 11
             3. Divide x by 5
             4. Increment x by 1
             It can be shown that 4 is the minimum number of operations
             required to make 54 equal to 2.

Example 3:
Input: x = 25, y = 30
Output: 5
Explanation: We can make 25 equal to 30 by applying the following operations:
             1. Increment x by 1
             2. Increment x by 1
             3. Increment x by 1
             4. Increment x by 1
             5. Increment x by 1
             It can be shown that 5 is the minimum number of operations
             required to make 25 equal to 30.

Constraints: 1 <= x, y <= 10^4*/

function minimumOperationsToMakeEqual(x: number, y: number): number {
    if (x <= y) return y - x;
    let ans = x - y;
    for (const v of [5, 11]) {
        ans = Math.min(ans, minimumOperationsToMakeEqual(Math.floor(x/v), y) + 1 + x % v);
        ans = Math.min(ans, minimumOperationsToMakeEqual(Math.floor(x/v)+1, y) + 1 + v - x % v);
    }
    return ans;
};


/*2999. Count the Number of Powerful Integers (Hard)
You are given three integers start, finish, and limit. You are also given a
0-indexed string s representing a positive integer. A positive integer x is
called powerful if it ends with s (in other words, s is a suffix of x) and
each digit in x is at most limit. Return the total number of powerful
integers in the range [start..finish]. A string x is a suffix of a string y
if and only if x is a substring of y that starts from some index (including
0) in y and extends to the index y.length - 1. For example, 25 is a suffix
of 5125 whereas 512 is not.

Example 1:
Input: start = 1, finish = 6000, limit = 4, s = "124"
Output: 5
Explanation: The powerful integers in the range [1..6000] are 124, 1124,
             2124, 3124, and, 4124. All these integers have each digit <= 4,
             and "124" as a suffix. Note that 5124 is not a powerful integer
             because the first digit is 5 which is greater than 4. It can be
             shown that there are only 5 powerful integers in this range.

Example 2:
Input: start = 15, finish = 215, limit = 6, s = "10"
Output: 2
Explanation: The powerful integers in the range [15..215] are 110 and 210.
             All these integers have each digit <= 6, and "10" as a suffix.
             It can be shown that there are only 2 powerful integers in this
             range.

Example 3:
Input: start = 1000, finish = 2000, limit = 4, s = "3000"
Output: 0
Explanation: All integers in the range [1000..2000] are smaller than 3000,
             hence "3000" cannot be a suffix of any integer in this range.

Constraints:
* 1 <= start <= finish <= 10^15
* 1 <= limit <= 9
* 1 <= s.length <= floor(log10(finish)) + 1
* s only consists of numeric digits which are at most limit.
* s does not have leading zeros.*/

function numberOfPowerfulInt(start: number, finish: number, limit: number, s: string): number {

    function fn(val) {
        const n = val.length - s.length;
        if (n < 0) return 0;
        const dp = Array(n+1).fill(0).map(() => Array(2).fill(0));
        dp[n][0] = 1;
        if (val.substring(n) >= s) dp[n][1] = 1;
        for (let i = n-1; i >= 0; --i) {
            dp[i][0] = (1+limit) * dp[i+1][0];
            if (Number(val.charAt(i)) <= limit) dp[i][1] = Number(val.charAt(i))*dp[i+1][0] + dp[i+1][1];
            else dp[i][1] = (1+limit) * dp[i+1][0];
            console.log(dp[i][0], dp[i][1]);
        }
        return dp[0][1];
    };

    return fn(finish.toString()) - fn((start-1).toString());
};


/*3004. Maximum Subtree of the Same Color (Medium)
You are given a 2D integer array edges representing a tree with n nodes,
numbered from 0 to n - 1, rooted at node 0, where edges[i] = [ui, vi] means
there is an edge between the nodes vi and ui. You are also given a 0-indexed
integer array colors of size n, where colors[i] is the color assigned to
node i. We want to find a node v such that every node in the subtree of v
has the same color. Return the size of such subtree with the maximum number
of nodes possible.

Example 1:
Input: edges = [[0,1],[0,2],[0,3]], colors = [1,1,2,3]
Output: 1
Explanation: Each color is represented as: 1 -> Red, 2 -> Green, 3 -> Blue.
             We can see that the subtree rooted at node 0 has children with
             different colors. Any other subtree is of the same color and
             has a size of 1. Hence, we return 1.

Example 2:
Input: edges = [[0,1],[0,2],[0,3]], colors = [1,1,1,1]
Output: 4
Explanation: The whole tree has the same color, and the subtree rooted at
             node 0 has the most number of nodes which is 4. Hence, we
             return 4.

Example 3:
Input: edges = [[0,1],[0,2],[2,3],[2,4]], colors = [1,2,3,3,3]
Output: 3
Explanation: Each color is represented as: 1 -> Red, 2 -> Green, 3 -> Blue.
             We can see that the subtree rooted at node 0 has children with
             different colors. Any other subtree is of the same color, but
             the subtree rooted at node 2 has a size of 3 which is the
             maximum. Hence, we return 3.

Constraints:
* n == edges.length + 1
* 1 <= n <= 5 * 10^4
* edges[i] == [ui, vi]
* 0 <= ui, vi < n
* colors.length == n
* 1 <= colors[i] <= 10^5
* The input is generated such that the graph represented by edges is a
  tree.*/

function maximumSubtreeSize(edges: number[][], colors: number[]): number {
    const n = colors.length;
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    function fn(u, p) {
        let most = 0, same = 1, val = 1;
        for (const v of graph[u]) {
            if (v != p) {
                const [vv, ss] = fn(v, u);
                if (ss && colors[u] == colors[v]) val += vv;
                else same = 0;
                most = Math.max(most, vv);
            }
        }
        if (same) most = val;
        return [most, same];
    }

    return fn(0, -1)[0];
};


/*3005. Count Elements With Maximum Frequency (Easy)
You are given an array nums consisting of positive integers. Return the
total frequencies of elements in nums such that those elements all have the
maximum frequency. The frequency of an element is the number of occurrences
of that element in the array.

Example 1:
Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: The elements 1 and 2 have a frequency of 2 which is the maximum
             frequency in the array. So the number of elements in the array
             with maximum frequency is 4.

Example 2:
Input: nums = [1,2,3,4,5]
Output: 5
Explanation: All elements of the array have a frequency of 1 which is the
             maximum. So the number of elements in the array with maximum
             frequency is 5.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100*/

function maxFrequencyElements(nums: number[]): number {
    const freq = new Map();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
    let ans = 0, m = Number.MIN_VALUE;
    for (const v of freq.values())
        if (v > m) ans = m = v;
        else if (v == m) ans += v;
    return ans;
};


/*3006. Find Beautiful Indices in the Given Array I (Medium)
You are given a 0-indexed string s, a string a, a string b, and an integer
k. An index i is beautiful if:
* 0 <= i <= s.length - a.length
* s[i..(i + a.length - 1)] == a
* There exists an index j such that:
  - 0 <= j <= s.length - b.length
  - s[j..(j + b.length - 1)] == b
  - |j - i| <= k
Return the array that contains beautiful indices in sorted order from
smallest to largest.

Example 1:
Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
Output: [16,33]
Explanation: There are 2 beautiful indices: [16,33].
             - The index 16 is beautiful as s[16..17] == "my" and there
               exists an index 4 with s[4..11] == "squirrel" and
               |16 - 4| <= 15.
             - The index 33 is beautiful as s[33..34] == "my" and there
               exists an index 18 with s[18..25] == "squirrel" and
               |33 - 18| <= 15.
             Thus we return [16,33] as the result.

Example 2:
Input: s = "abcd", a = "a", b = "a", k = 4
Output: [0]
Explanation: There is 1 beautiful index: [0].
             - The index 0 is beautiful as s[0..0] == "a" and there exists
               an index 0 with s[0..0] == "a" and |0 - 0| <= 4.
             Thus we return [0] as the result.

Constraints:
* 1 <= k <= s.length <= 10^5
* 1 <= a.length, b.length <= 10
* s, a, and b contain only lowercase English letters.*/

function beautifulIndices(s: string, a: string, b: string, k: number): number[] {
    const ans = [];
    for (let i = 0, j = 0, n = s.length; i < n; ++i)
        if (s.substring(i, i+a.length) === a) {
            let found = false;
            for (; j < n && j <= i+k; ++j)
                if (s.substring(j, j+b.length) == b && Math.abs(i-j) <= k) {
                    found = true;
                    break;
                }
            if (found) ans.push(i);
        }
    return ans;
};


/*3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K (Medium)
You are given an integer k and an integer x. Consider s is the 1-indexed
binary representation of an integer num. The price of a number num is the
number of i's such that i % x == 0 and s[i] is a set bit. Return the
greatest integer num such that the sum of prices of all numbers from 1 to
num is less than or equal to k.

Note:
* In the binary representation of a number set bit is a bit of value 1.
* The binary representation of a number will be indexed from right to left.
  For example, if s == 11100, s[4] == 1 and s[2] == 0.

Example 1:
Input: k = 9, x = 1
Output: 6
Explanation: The numbers 1, 2, 3, 4, 5, and 6 can be written in binary
             representation as "1", "10", "11", "100", "101", and "110"
             respectively. Since x is equal to 1, the price of each number
             is the number of its set bits. The number of set bits in these
             numbers is 9. So the sum of the prices of the first 6 numbers
             is 9. So the answer is 6.

Example 2:
Input: k = 7, x = 2
Output: 9
Explanation: Since x is equal to 2, we should just check eventh bits. The
             second bit of binary representation of numbers 2 and 3 is a set
             bit. So the sum of their prices is 2. The second bit of binary
             representation of numbers 6 and 7 is a set bit. So the sum of
             their prices is 2. The fourth bit of binary representation of
             numbers 8 and 9 is a set bit but their second bit is not. So
             the sum of their prices is 2. Numbers 1, 4, and 5 don't have
             set bits in their eventh bits in their binary representation.
             So the sum of their prices is 0. The second and the fourth bit
             of the binary representation of the number 10 are a set bit. So
             its price is 2. The sum of the prices of the first 9 numbers is
             6. Because the sum of the prices of the first 10 numbers is 8,
             the answer is 9.

Constraints:
* 1 <= k <= 10^15
* 1 <= x <= 8*/

function findMaximumNumber(k: number, x: number): number {

    function fn(mid) {
        if (mid == 0n) return 0n;
        let n = 0n;
        for (let m = mid; m >>= 1n; ++n);
        mid ^= 1n << n;
        return n/BigInt(x) * 2n**(n ? n-1n : 0n) + fn(mid) + ((n+1n) % BigInt(x) == 0n ? mid+1n : 0n);
    }

    let lo = 1n, hi = 500000000000000n;
    while (lo < hi) {
        let mid = lo + (hi - lo + 1n)/2n;
        if (fn(mid) <= k) lo = mid;
        else hi = mid-1n;
    }
    return Number(lo);
};


/*3008. Find Beautiful Indices in the Given Array II (Hard)
You are given a 0-indexed string s, a string a, a string b, and an integer
k. An index i is beautiful if:
* 0 <= i <= s.length - a.length
* s[i..(i + a.length - 1)] == a
* There exists an index j such that:
  - 0 <= j <= s.length - b.length
  - s[j..(j + b.length - 1)] == b
  - |j - i| <= k
Return the array that contains beautiful indices in sorted order from
smallest to largest.

Example 1:
Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
Output: [16,33]
Explanation: There are 2 beautiful indices: [16,33].
             - The index 16 is beautiful as s[16..17] == "my" and there
               exists an index 4 with s[4..11] == "squirrel" and
               |16 - 4| <= 15.
             - The index 33 is beautiful as s[33..34] == "my" and there
               exists an index 18 with s[18..25] == "squirrel" and
               |33 - 18| <= 15.
             Thus we return [16,33] as the result.

Example 2:
Input: s = "abcd", a = "a", b = "a", k = 4
Output: [0]
Explanation: There is 1 beautiful index: [0].
             - The index 0 is beautiful as s[0..0] == "a" and there exists
               an index 0 with s[0..0] == "a" and |0 - 0| <= 4.
             Thus we return [0] as the result.

Constraints:
* 1 <= k <= s.length <= 5 * 10^5
* 1 <= a.length, b.length <= 5 * 10^5
* s, a, and b contain only lowercase English letters.*/

function beautifulIndices(s: string, a: string, b: string, k: number): number[] {

    function kmp(pattern: string, text: string): number[] {
        const lps = [0];
        for (let i = 1, k = 0, n = pattern.length; i < n; ++i) {
            while (k && pattern[k] != pattern[i]) k = lps[k-1];
            if (pattern[k] === pattern[i]) ++k;
            lps.push(k);
        }
        const ans = [];
        for (let i = 0, k = 0, n = pattern.length; i < text.length; ++i) {
            while (k && (k == n || pattern[k] != text[i])) k = lps[k-1];
            if (pattern[k] === text[i]) ++k;
            if (k == n) ans.push(i-n+1);
        }
        return ans;
    }

    const ans = [], vals = kmp(b, s);
    let j = 0;
    for (const i of kmp(a, s)) {
        let found = false;
        for (; j < vals.length && vals[j] <= i+k; ++j)
            if (Math.abs(i-vals[j]) <= k) {
                found = true;
                break;
            }
        if (found) ans.push(i);
    }
    return ans;
};


/*3010. Divide an Array Into Subarrays With Minimum Cost I (Easy)
You are given an array of integers nums of length n. The cost of an array is
the value of its first element. For example, the cost of [1,2,3] is 1 while
the cost of [3,4,1] is 3. You need to divide nums into 3 disjoint contiguous
subarrays. Return the minimum possible sum of the cost of these subarrays.

Example 1:
Input: nums = [1,2,3,12]
Output: 6
Explanation: The best possible way to form 3 subarrays is: [1], [2], and
             [3,12] at a total cost of 1 + 2 + 3 = 6. The other possible
             ways to form 3 subarrays are:
             - [1], [2,3], and [12] at a total cost of 1 + 2 + 12 = 15.
             - [1,2], [3], and [12] at a total cost of 1 + 3 + 12 = 16.

Example 2:
Input: nums = [5,4,3]
Output: 12
Explanation: The best possible way to form 3 subarrays is: [5], [4], and [3]
             at a total cost of 5 + 4 + 3 = 12. It can be shown that 12 is
             the minimum cost achievable.

Example 3:
Input: nums = [10,3,1,1]
Output: 12
Explanation: The best possible way to form 3 subarrays is: [10,3], [1], and
             [1] at a total cost of 10 + 1 + 1 = 12. It can be shown that 12
             is the minimum cost achievable.

Constraints:
* 3 <= n <= 50
* 1 <= nums[i] <= 50*/

function minimumCost(nums: number[]): number {
    let ans = nums.shift();
    nums.sort((x, y) => x-y);
    return ans + nums[0] + nums[1];
};


/*3011. Find if Array Can Be Sorted (Medium)
You are given a 0-indexed array of positive integers nums. In one operation,
you can swap any two adjacent elements if they have the same number of set
bits. You are allowed to do this operation any number of times (including
zero). Return true if you can sort the array, else return false.

Example 1:
Input: nums = [8,4,2,30,15]
Output: true
Explanation: Let's look at the binary representation of every element. The
             numbers 2, 4, and 8 have one set bit each with binary
             representation "10", "100", and "1000" respectively. The
             numbers 15 and 30 have four set bits each with binary
             representation "1111" and "11110". We can sort the array using
             4 operations:
             - Swap nums[0] with nums[1]. This operation is valid because 8
               and 4 have one set bit each. The array becomes [4,8,2,30,15].
             - Swap nums[1] with nums[2]. This operation is valid because 8
               and 2 have one set bit each. The array becomes [4,2,8,30,15].
             - Swap nums[0] with nums[1]. This operation is valid because 4
               and 2 have one set bit each. The array becomes [2,4,8,30,15].
             - Swap nums[3] with nums[4]. This operation is valid because 30
               and 15 have four set bits each. The array becomes [2,4,8,15,30].
             The array has become sorted, hence we return true. Note that
             there may be other sequences of operations which also sort the
             array.

Example 2:
Input: nums = [1,2,3,4,5]
Output: true
Explanation: The array is already sorted, hence we return true.

Example 3:
Input: nums = [3,16,8,4,2]
Output: false
Explanation: It can be shown that it is not possible to sort the input array
             using any number of operations.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 2^8*/

function canSortArray(nums: number[]): boolean {
    let bits = 0, curr = 0, prev = 0;
    for (const x of nums) {
        let b = 0;
        for (let xx = x; xx; xx &= xx-1, ++b);
        if (bits != b) bits = b, prev = curr;
        if (prev > x) return false;
        curr = Math.max(curr, x);
    }
    return true;
};


/*3012. Minimize Length of Array Using Operations (Medium)
You are given a 0-indexed integer array nums containing positive integers.
Your task is to minimize the length of nums by performing the following
operations any number of times (including zero):
* Select two distinct indices i and j from nums, such that nums[i] > 0 and
  nums[j] > 0.
* Insert the result of nums[i] % nums[j] at the end of nums.
* Delete the elements at indices i and j from nums.
Return an integer denoting the minimum length of nums after performing the
operation any number of times.

Example 1:
Input: nums = [1,4,3,1]
Output: 1
Explanation: One way to minimize the length of the array is as follows:
             - Operation 1: Select indices 2 and 1, insert nums[2] % nums[1]
               at the end and it becomes [1,4,3,1,3], then delete elements
               at indices 2 and 1. nums becomes [1,1,3].
             - Operation 2: Select indices 1 and 2, insert nums[1] % nums[2]
               at the end and it becomes [1,1,3,1], then delete elements at
               indices 1 and 2. nums becomes [1,1].
             - Operation 3: Select indices 1 and 0, insert nums[1] % nums[0]
               at the end and it becomes [1,1,0], then delete elements at
               indices 1 and 0. nums becomes [0].
             The length of nums cannot be reduced further. Hence, the answer
             is 1. It can be shown that 1 is the minimum achievable length.

Example 2:
Input: nums = [5,5,5,10,5]
Output: 2
Explanation: One way to minimize the length of the array is as follows:
             - Operation 1: Select indices 0 and 3, insert nums[0] % nums[3]
               at the end and it becomes [5,5,5,10,5,5], then delete
               elements at indices 0 and 3. nums becomes [5,5,5,5].
             - Operation 2: Select indices 2 and 3, insert nums[2] % nums[3]
               at the end and it becomes [5,5,5,5,0], then delete elements
               at indices 2 and 3. nums becomes [5,5,0].
             - Operation 3: Select indices 0 and 1, insert nums[0] % nums[1]
               at the end and it becomes [5,5,0,0], then delete elements at
               indices 0 and 1. nums becomes [0,0].
             The length of nums cannot be reduced further. Hence, the answer
             is 2. It can be shown that 2 is the minimum achievable length.

Example 3:
Input: nums = [2,3,4]
Output: 1
Explanation: One way to minimize the length of the array is as follows:
             - Operation 1: Select indices 1 and 2, insert nums[1] % nums[2]
               at the end and it becomes [2,3,4,3], then delete elements at
               indices 1 and 2. nums becomes [2,3].
             - Operation 2: Select indices 1 and 0, insert nums[1] % nums[0]
               at the end and it becomes [2,3,1], then delete elements at
               indices 1 and 0. nums becomes [1].
             The length of nums cannot be reduced further. Hence, the answer
             is 1. It can be shown that 1 is the minimum achievable length.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

function minimumArrayLength(nums: number[]): number {
    const m = Math.min(...nums);
    let cnt = 0;
    for (const x of nums)
        if (x % m) return 1;
        else if (x == m) ++cnt;
    return Math.ceil(cnt/2);
};


/*3013. Divide an Array Into Subarrays With Minimum Cost II (Hard)
You are given a 0-indexed array of integers nums of length n, and two
positive integers k and dist. The cost of an array is the value of its first
element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is
3. You need to divide nums into k disjoint contiguous subarrays, such that
the difference between the starting index of the second subarray and the
starting index of the kth subarray should be less than or equal to dist. In
other words, if you divide nums into the subarrays nums[0..(i1 - 1)],
nums[i1..(i2 - 1)], ..., nums[ik-1..(n - 1)], then ik-1 - i1 <= dist. Return
the minimum possible sum of the cost of these subarrays.

Example 1:
Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
Output: 5
Explanation: The best possible way to divide nums into 3 subarrays is:
             [1,3], [2,6,4], and [2]. This choice is valid because ik-1 - i1
             is 5 - 2 = 3 which is equal to dist. The total cost is
             nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5. It can be
             shown that there is no possible way to divide nums into 3
             subarrays at a cost lower than 5.

Example 2:
Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
Output: 15
Explanation: The best possible way to divide nums into 4 subarrays is:
             [10], [1], [2], and [2,2,1]. This choice is valid because
             ik-1 - i1 is 3 - 1 = 2 which is less than dist. The total cost
             is nums[0] + nums[1] + nums[2] + nums[3] which is
             10 + 1 + 2 + 2 = 15. The division [10], [1], [2,2,2], and [1]
             is not valid, because the difference between ik-1 and i1 is
             5 - 1 = 4, which is greater than dist. It can be shown that
             there is no possible way to divide nums into 4 subarrays at a
             cost lower than 15.

Example 3:
Input: nums = [10,8,18,9], k = 3, dist = 1
Output: 36
Explanation: The best possible way to divide nums into 4 subarrays is:
             [10], [8], and [18,9]. This choice is valid because ik-1 - i1
             is 2 - 1 = 1 which is equal to dist.The total cost is
             nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36. The
             division [10], [8,18], and [9] is not valid, because the
             difference between ik-1 and i1 is 3 - 1 = 2, which is greater
             than dist. It can be shown that there is no possible way to
             divide nums into 3 subarrays at a cost lower than 36.

Constraints:
* 3 <= n <= 10^5
* 1 <= nums[i] <= 10^9
* 3 <= k <= n
* k - 2 <= dist <= n - 2*/



/*3016. Minimum Number of Pushes to Type Word II (Medium)
You are given a string word containing lowercase English letters. Telephone
keypads have keys mapped with distinct collections of lowercase English
letters, which can be used to form words by pushing them. For example, the
key 2 is mapped with ["a","b","c"], we need to push the key one time to type
"a", two times to type "b", and three times to type "c". It is allowed to
remap the keys numbered 2 to 9 to distinct collections of letters. The keys
can be remapped to any amount of letters, but each letter must be mapped to
exactly one key. You need to find the minimum number of times the keys will
be pushed to type the string word. Return the minimum number of pushes
needed to type word after remapping the keys. An example mapping of letters
to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do
not map to any letters.

Example 1:
Input: word = "abcde"
Output: 5
Explanation: The remapped keypad given in the image provides the minimum cost.
             "a" -> one push on key 2
             "b" -> one push on key 3
             "c" -> one push on key 4
             "d" -> one push on key 5
             "e" -> one push on key 6
             Total cost is 1 + 1 + 1 + 1 + 1 = 5. It can be shown that no
             other mapping can provide a lower cost.

Example 2:
Input: word = "xyzxyzxyzxyz"
Output: 12
Explanation: The remapped keypad given in the image provides the minimum cost.
             "x" -> one push on key 2
             "y" -> one push on key 3
             "z" -> one push on key 4
             Total cost is 1 * 4 + 1 * 4 + 1 * 4 = 12
             It can be shown that no other mapping can provide a lower cost.
             Note that the key 9 is not mapped to any letter: it is not
             necessary to map letters to every key, but to map all the letters.

Example 3:
Input: word = "aabbccddeeffgghhiiiiii"
Output: 24
Explanation: The remapped keypad given in the image provides the minimum cost.
             "a" -> one push on key 2
             "b" -> one push on key 3
             "c" -> one push on key 4
             "d" -> one push on key 5
             "e" -> one push on key 6
             "f" -> one push on key 7
             "g" -> one push on key 8
             "h" -> two pushes on key 9
             "i" -> one push on key 9
             Total cost is 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 +
             1 * 2 + 2 * 2 + 6 * 1 = 24. It can be shown that no other
             mapping can provide a lower cost.

Constraints:
* 1 <= word.length <= 10^5
* word consists of lowercase English letters.*/

function minimumPushes(word: string): number {
    const freq = Array(26).fill(0);
    for (const ch of word)
        ++freq[ch.charCodeAt(0) - 97];
    freq.sort((x, y) => y - x);
    let ans = 0, cnt = 0;
    for (const [i, x] of freq.entries()) {
        if (i % 8 == 0) ++cnt;
        ans += x * cnt;
    }
    return ans;
};


/*3019. Number of Changing Keys (Easy)
You are given a 0-indexed string s typed by a user. Changing a key is
defined as using a key different from the last used key. For example,
s = "ab" has a change of a key while s = "bBBb" does not have any. Return
the number of times the user had to change the key. Note: Modifiers like
shift or caps lock won't be counted in changing the key that is if a user
typed the letter 'a' and then the letter 'A' then it will not be considered
as a changing of key.

Example 1:
Input: s = "aAbBcC"
Output: 2
Explanation: - From s[0] = 'a' to s[1] = 'A', there is no change of key as
               caps lock or shift is not counted.
             - From s[1] = 'A' to s[2] = 'b', there is a change of key.
             - From s[2] = 'b' to s[3] = 'B', there is no change of key as
               caps lock or shift is not counted.
             - From s[3] = 'B' to s[4] = 'c', there is a change of key.
             - From s[4] = 'c' to s[5] = 'C', there is no change of key as
               caps lock or shift is not counted.

Example 2:
Input: s = "AaAaAaaA"
Output: 0
Explanation: There is no change of key since only the letters 'a' and 'A'
             are pressed which does not require change of key.

Constraints:
* 1 <= s.length <= 100
* s consists of only upper case and lower case English letters.*/

function countKeyChanges(s: string): number {
    let ans = 0;
    for (let i = 1; i < s.length; ++i)
        if (s.charAt(i-1).toLowerCase() != s.charAt(i).toLowerCase()) ++ans;
    return ans;
};


/*3020. Find the Maximum Number of Elements in Subset (Medium)
You are given an array of positive integers nums. You need to select a
subset of nums which satisfies the following condition:
* You can place the selected elements in a 0-indexed array such that it
  follows the pattern: [x, x2, x4, ..., xk/2, xk, xk/2, ..., x4, x2, x]
  (Note that k can be be any non-negative power of 2). For example,
  [2, 4, 16, 4, 2] and [3, 9, 3] follow the pattern while [2, 4, 8, 4, 2]
  does not.
Return the maximum number of elements in a subset that satisfies these
conditions.

Example 1:
Input: nums = [5,4,1,2,2]
Output: 3
Explanation: We can select the subset {4,2,2}, which can be placed in the
             array as [2,4,2] which follows the pattern and 22 == 4. Hence
             the answer is 3.

Example 2:
Input: nums = [1,3,2,4]
Output: 1
Explanation: We can select the subset {1}, which can be placed in the array
             as [1] which follows the pattern. Hence the answer is 1. Note
             that we could have also selected the subsets {2}, {4}, or {3},
             there may be multiple subsets which provide the same answer.

Constraints:
* 2 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

function maximumLength(nums: number[]): number {
    const freq = new Map();
    for (var x of nums)
        freq.set(x, (freq.get(x) ?? 0) + 1);
    let ans = 0;
    for (let [k, v] of freq) {
        if (k != 1) {
            v = 0;
            for (; freq.has(k); k *= k) {
                v += 2;
                if (freq.get(k) == 1) break;
            }
        }
        if (v % 2 == 0) --v;
        ans = Math.max(ans, v);
    }
    return ans;
};


/*3021. Alice and Bob Playing Flower Game (Medium)
Alice and Bob are playing a turn-based game on a circular field surrounded
by flowers. The circle represents the field, and there are x flowers in the
clockwise direction between Alice and Bob, and y flowers in the anti-
clockwise direction between them. The game proceeds as follows:
* Alice takes the first turn.
* In each turn, a player must choose either the clockwise or anti-clockwise
  direction and pick one flower from that side.
* At the end of the turn, if there are no flowers left at all, the current
  player captures their opponent and wins the game.
Given two integers, n and m, the task is to compute the number of possible
pairs (x, y) that satisfy the conditions:
* Alice must win the game according to the described rules.
* The number of flowers x in the clockwise direction must be in the range
  [1,n].
* The number of flowers y in the anti-clockwise direction must be in the
  range [1,m].
Return the number of possible pairs (x, y) that satisfy the conditions
mentioned in the statement.

Example 1:
Input: n = 3, m = 2
Output: 3
Explanation: The following pairs satisfy conditions described in the
             statement: (1,2), (3,2), (2,1).

Example 2:
Input: n = 1, m = 1
Output: 0
Explanation: No pairs satisfy the conditions described in the statement.

Constraints: 1 <= n, m <= 10^5*/

function flowerGame(n: number, m: number): number {
    return Math.floor(m*n/2);
};


/*3022. Minimize OR of Remaining Elements Using Operations (Hard)
You are given a 0-indexed integer array nums and an integer k. In one
operation, you can pick any index i of nums such that
0 <= i < nums.length - 1 and replace nums[i] and nums[i + 1] with a single
occurrence of nums[i] & nums[i + 1], where & represents the bitwise AND
operator. Return the minimum possible value of the bitwise OR of the
remaining elements of nums after applying at most k operations.

Example 1:
Input: nums = [3,5,3,2,7], k = 2
Output: 3
Explanation: Let's do the following operations:
             1. Replace nums[0] and nums[1] with (nums[0] & nums[1]) so that
                nums becomes equal to [1,3,2,7].
             2. Replace nums[2] and nums[3] with (nums[2] & nums[3]) so that
                nums becomes equal to [1,3,2].
             The bitwise-or of the final array is 3. It can be shown that 3
             is the minimum possible value of the bitwise OR of the
             remaining elements of nums after applying at most k operations.

Example 2:
Input: nums = [7,3,15,14,2,8], k = 4
Output: 2
Explanation: Let's do the following operations:
             1. Replace nums[0] and nums[1] with (nums[0] & nums[1]) so that
                nums becomes equal to [3,15,14,2,8].
             2. Replace nums[0] and nums[1] with (nums[0] & nums[1]) so that
                nums becomes equal to [3,14,2,8].
             3. Replace nums[0] and nums[1] with (nums[0] & nums[1]) so that
                nums becomes equal to [2,2,8].
             4. Replace nums[1] and nums[2] with (nums[1] & nums[2]) so that
                nums becomes equal to [2,0].
             The bitwise-or of the final array is 2. It can be shown that 2
             is the minimum possible value of the bitwise OR of the
             remaining elements of nums after applying at most k operations.

Example 3:
Input: nums = [10,7,10,3,9,14,9,4], k = 1
Output: 15
Explanation: Without applying any operations, the bitwise-or of nums is 15.
             It can be shown that 15 is the minimum possible value of the
             bitwise OR of the remaining elements of nums after applying at
             most k operations.

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] < 2^30
* 0 <= k < nums.length*/

function minOrAfterOperations(nums: number[], k: number): number {
    let ans = 0, n = nums.length;
    for (let bit = 30; bit >= 0; --bit) {
        let cnt = 0, mask = (1<<30)-1, target = ans | (1<<bit)-1;
        for (const x of nums) {
            mask &= x;
            if ((mask | target) > target) ++cnt;
            else mask = (1<<30)-1;
        }
        if (cnt > k) ans |= 1<<bit;
    }
    return ans;
};


/*3023. Find Pattern in Infinite Stream I (Medium)
You are given a binary array pattern and an object stream of class
InfiniteStream representing a 0-indexed infinite stream of bits. The class
InfiniteStream contains the following function:
* int next(): Reads a single bit (which is either 0 or 1) from the stream
  and returns it.
Return the first starting index where the pattern matches the bits read from
the stream. For example, if the pattern is [1, 0], the first match is the
highlighted part in the stream [0, 1, 0, 1, ...].

Example 1:
Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
Output: 3
Explanation: The first occurrence of the pattern [0,1] is highlighted in the
             stream [1,1,1,0,1,...], which starts at index 3.

Example 2:
Input: stream = [0,0,0,0,...], pattern = [0]
Output: 0
Explanation: The first occurrence of the pattern [0] is highlighted in the
             stream [0,...], which starts at index 0.

Example 3:
Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
Output: 2
Explanation: The first occurrence of the pattern [1,1,0,1] is highlighted in
             the stream [1,0,1,1,0,1,...], which starts at index 2.

Constraints:
* 1 <= pattern.length <= 100
* pattern consists only of 0 and 1.
* stream consists only of 0 and 1.
* The input is generated such that the pattern's start index exists in the
  first 10^5 bits of the stream.*/

function findPattern(stream: InfiniteStream, pattern: number[]): number {
    const lps = [0], n = pattern.length;
    for (let i = 1, k = 0; i < n; ++i) {
        while (k && pattern[k] != pattern[i]) k = lps[k-1];
        if (pattern[k] == pattern[i]) ++k;
        lps.push(k);
    }
    for (let i = 0, k = 0; true; ++i) {
        let ch = stream.next();
        while (k && pattern[k] != ch) k = lps[k-1];
        if (pattern[k] == ch) ++k;
        if (k == n) return i-n+1;
    }
};


/*3024. Type of Triangle II (Easy)
You are given a 0-indexed integer array nums of size 3 which can form the
sides of a triangle.
* A triangle is called equilateral if it has all sides of equal length.
* A triangle is called isosceles if it has exactly two sides of equal length.
* A triangle is called scalene if all its sides are of different lengths.
Return a string representing the type of triangle that can be formed or
"none" if it cannot form a triangle.

Example 1:
Input: nums = [3,3,3]
Output: "equilateral"
Explanation: Since all the sides are of equal length, therefore, it will
             form an equilateral triangle.

Example 2:
Input: nums = [3,4,5]
Output: "scalene"
Explanation: nums[0] + nums[1] = 3 + 4 = 7, which is greater than nums[2] = 5.
             nums[0] + nums[2] = 3 + 5 = 8, which is greater than nums[1] = 4.
             nums[1] + nums[2] = 4 + 5 = 9, which is greater than nums[0] = 3.
             Since the sum of the two sides is greater than the third side
             for all three cases, therefore, it can form a triangle. As all
             the sides are of different lengths, it will form a scalene
             triangle.

Constraints:
* nums.length == 3
* 1 <= nums[i] <= 100*/

function triangleType(nums: number[]): string {
    nums.sort((a, b) => a-b);
    const [x, y, z] = nums;
    if (x + y <= z) return "none";
    if (x == z) return "equilateral";
    if (x == y || y == z) return "isosceles";
    return "scalene";
};


/*3025. Find the Number of Ways to Place People I (Medium)
You are given a 2D array points of size n x 2 representing integer
coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. We
define the right direction as positive x-axis (increasing x-coordinate) and
the left direction as negative x-axis (decreasing x-coordinate). Similarly,
we define the up direction as positive y-axis (increasing y-coordinate) and
the down direction as negative y-axis (decreasing y-coordinate). You have to
place n people, including Chisato and Takina, at these points such that
there is exactly one person at every point. Chisato wants to be alone with
Takina, so Chisato will build a rectangular fence with Chisato's position as
the upper left corner and Takina's position as the lower right corner of the
fence (Note that the fence might not enclose any area, i.e. it can be a
line). If any person other than Chisato and Takina is either inside the
fence or on the fence, Chisato will be sad. Return the number of pairs of
points where you can place Chisato and Takina, such that Chisato does not
become sad on building the fence. Note that Chisato can only build a fence
with Chisato's position as the upper left corner, and Takina's position as
the lower right corner. For example, Chisato cannot build either of the
fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and
(3, 3), because:
* With Chisato at (3, 3) and Takina at (1, 1), Chisato's position is not the
  upper left corner and Takina's position is not the lower right corner of
  the fence.
* With Chisato at (1, 3) and Takina at (1, 1), Takina's position is not the
  lower right corner of the fence.

Example 1:
Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation: There is no way to place Chisato and Takina such that Chisato
             can build a fence with Chisato's position as the upper left
             corner and Takina's position as the lower right corner. Hence
             we return 0.

Example 2:
Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation: There are two ways to place Chisato and Takina such that
             Chisato will not be sad:
             - Place Chisato at (4, 4) and Takina at (6, 2).
             - Place Chisato at (2, 6) and Takina at (4, 4).
             You cannot place Chisato at (2, 6) and Takina at (6, 2) because
             the person at (4, 4) will be inside the fence.

Example 3:
Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation: There are two ways to place Chisato and Takina such that
             Chisato will not be sad:
             - Place Chisato at (1, 1) and Takina at (3, 1).
             - Place Chisato at (1, 3) and Takina at (1, 1).
             You cannot place Chisato at (1, 3) and Takina at (3, 1) because
             the person at (1, 1) will be on the fence. Note that it does
             not matter if the fence encloses any area, the first and second
             fences in the image are valid.

Constraints:
* 2 <= n <= 50
* points[i].length == 2
* 0 <= points[i][0], points[i][1] <= 50
* All points[i] are distinct.*/

function numberOfPairs(points: number[][]): number {
    let ans = 0;
    points.sort((a, b) => (a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]));
    for (const [i, [x, y]] of points.entries()) {
        let val = -2e9
        for (let ii = i+1; ii < points.length; ++ii) {
            const [xx, yy] = points[ii];
            if (y >= yy && yy > val) {
                ++ans;
                val = yy;
            }
        }
    }
    return ans;
};


/*3026. Maximum Good Subarray Sum (Medium)
You are given an array nums of length n and a positive integer k. A subarray
of nums is called good if the absolute difference between its first and last
element is exactly k, in other words, the subarray nums[i..j] is good if
|nums[i] - nums[j]| == k. Return the maximum sum of a good subarray of nums.
If there are no good subarrays, return 0.

Example 1:
Input: nums = [1,2,3,4,5,6], k = 1
Output: 11
Explanation: The absolute difference between the first and last element must
             be 1 for a good subarray. All the good subarrays are:
             [1,2], [2,3], [3,4], [4,5], and [5,6]. The maximum subarray sum
             is 11 for the subarray [5,6].

Example 2:
Input: nums = [-1,3,2,4,5], k = 3
Output: 11
Explanation: The absolute difference between the first and last element must
             be 3 for a good subarray. All the good subarrays are: [-1,3,2],
             and [2,4,5]. The maximum subarray sum is 11 for the subarray
             [2,4,5].

Example 3:
Input: nums = [-1,-2,-3,-4], k = 2
Output: -6
Explanation: The absolute difference between the first and last element must
             be 2 for a good subarray. All the good subarrays are:
             [-1,-2,-3], and [-2,-3,-4]. The maximum subarray sum is -6 for
             the subarray [-1,-2,-3].

Constraints:
* 2 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9
* 1 <= k <= 10^9*/

function maximumSubarraySum(nums: number[], k: number): number {
    let ans = -1e15, prefix = 0, seen = new Map();
    for (const x of nums) {
        prefix += x;
        if (seen.has(x-k)) ans = Math.max(ans, prefix - seen.get(x-k));
        if (seen.has(x+k)) ans = Math.max(ans, prefix - seen.get(x+k));
        if (seen.has(x)) seen.set(x, Math.min(seen.get(x), prefix-x));
        else seen.set(x, prefix-x);
    }
    return ans > -1e15 ? ans : 0;
};


/*3027. Find the Number of Ways to Place People II (Hard)
You are given a 2D array points of size n x 2 representing integer
coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. We
define the right direction as positive x-axis (increasing x-coordinate) and
the left direction as negative x-axis (decreasing x-coordinate). Similarly,
we define the up direction as positive y-axis (increasing y-coordinate) and
the down direction as negative y-axis (decreasing y-coordinate). You have to
place n people, including Chisato and Takina, at these points such that
there is exactly one person at every point. Chisato wants to be alone with
Takina, so Chisato will build a rectangular fence with Chisato's position as
the upper left corner and Takina's position as the lower right corner of the
fence (Note that the fence might not enclose any area, i.e. it can be a
line). If any person other than Chisato and Takina is either inside the
fence or on the fence, Chisato will be sad. Return the number of pairs of
points where you can place Chisato and Takina, such that Chisato does not
become sad on building the fence. Note that Chisato can only build a fence
with Chisato's position as the upper left corner, and Takina's position as
the lower right corner. For example, Chisato cannot build either of the
fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and
(3, 3), because:
* With Chisato at (3, 3) and Takina at (1, 1), Chisato's position is not the
  upper left corner and Takina's position is not the lower right corner of
  the fence.
* With Chisato at (1, 3) and Takina at (1, 1), Takina's position is not the
  lower right corner of the fence.

Example 1:
Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation: There is no way to place Chisato and Takina such that Chisato
             can build a fence with Chisato's position as the upper left
             corner and Takina's position as the lower right corner. Hence
             we return 0.

Example 2:
Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation: There are two ways to place Chisato and Takina such that
             Chisato will not be sad:
             - Place Chisato at (4, 4) and Takina at (6, 2).
             - Place Chisato at (2, 6) and Takina at (4, 4).
             You cannot place Chisato at (2, 6) and Takina at (6, 2) because
             the person at (4, 4) will be inside the fence.

Example 3:
Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation: There are two ways to place Chisato and Takina such that
             Chisato will not be sad:
             - Place Chisato at (1, 1) and Takina at (3, 1).
             - Place Chisato at (1, 3) and Takina at (1, 1).
             You cannot place Chisato at (1, 3) and Takina at (3, 1) because
             the person at (1, 1) will be on the fence. Note that it does
             not matter if the fence encloses any area, the first and second
             fences in the image are valid.

Constraints:
* 2 <= n <= 1000
* points[i].length == 2
* -10^9 <= points[i][0], points[i][1] <= 10^9
* All points[i] are distinct.*/

function numberOfPairs(points: number[][]): number {
    let ans = 0;
    points.sort((a, b) => (a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]));
    for (const [i, [x, y]] of points.entries()) {
        let val = -2e9
        for (let ii = i+1; ii < points.length; ++ii) {
            const [xx, yy] = points[ii];
            if (y >= yy && yy > val) {
                ++ans;
                val = yy;
            }
        }
    }
    return ans;
};


/*3028. Ant on the Boundary (Easy)
An ant is on a boundary. It sometimes goes left and sometimes right. You are
given an array of non-zero integers nums. The ant starts reading nums from
the first element of it to its end. At each step, it moves according to the
value of the current element:
* If nums[i] < 0, it moves left by -nums[i] units.
* If nums[i] > 0, it moves right by nums[i] units.
Return the number of times the ant returns to the boundary.

Notes:
* There is an infinite space on both sides of the boundary.
* We check whether the ant is on the boundary only after it has moved
  |nums[i]| units. In other words, if the ant crosses the boundary during
  its movement, it does not count.

Example 1:
Input: nums = [2,3,-5]
Output: 1
Explanation: - After the first step, the ant is 2 steps to the right of the
               boundary.
             - After the second step, the ant is 5 steps to the right of the
               boundary.
             - After the third step, the ant is on the boundary.
             So the answer is 1.

Example 2:
Input: nums = [3,2,-3,-4]
Output: 0
Explanation: - After the first step, the ant is 3 steps to the right of the
               boundary.
             - After the second step, the ant is 5 steps to the right of the
               boundary.
             - After the third step, the ant is 2 steps to the right of the
               boundary.
             - After the fourth step, the ant is 2 steps to the left of the
               boundary.
             The ant never returned to the boundary, so the answer is 0.

Constraints:
* 1 <= nums.length <= 100
* -10 <= nums[i] <= 10
* nums[i] != 0*/

function returnToBoundaryCount(nums: number[]): number {
    let ans = 0, prefix = 0;
    for (const x of nums) {
        prefix += x;
        if (prefix == 0) ++ans;
    }
    return ans;
};


/*3029. Minimum Time to Revert Word to Initial State I (Medium)
You are given a 0-indexed string word and an integer k. At every second, you
must perform the following operations:
* Remove the first k characters of word.
* Add any k characters to the end of word.
Note that you do not necessarily need to add the same characters that you
removed. However, you must perform both operations at every second. Return
the minimum time greater than zero required for word to revert to its
initial state.

Example 1:
Input: word = "abacaba", k = 3
Output: 2
Explanation: - At the 1st second, we remove characters "aba" from the prefix
               of word, and add characters "bac" to the end of word. Thus,
               word becomes equal to "cababac".
             - At the 2nd second, we remove characters "cab" from the prefix
               of word, and add "aba" to the end of word. Thus, word becomes
               equal to "abacaba" and reverts to its initial state.
             It can be shown that 2 seconds is the minimum time greater than
             zero required for word to revert to its initial state.

Example 2:
Input: word = "abacaba", k = 4
Output: 1
Explanation: - At the 1st second, we remove characters "abac" from the
               prefix of word, and add characters "caba" to the end of word.
               Thus, word becomes equal to "abacaba" and reverts to its
               initial state.
             It can be shown that 1 second is the minimum time greater than
             zero required for word to revert to its initial state.

Example 3:
Input: word = "abcbabcd", k = 2
Output: 4
Explanation: - At every second, we will remove the first 2 characters of
               word, and add the same characters to the end of word.
             - After 4 seconds, word becomes equal to "abcbabcd" and reverts
               to its initial state.
             It can be shown that 4 seconds is the minimum time greater than
             zero required for word to revert to its initial state.

Constraints:
* 1 <= word.length <= 50
* 1 <= k <= word.length
* word consists only of lowercase English letters.*/

function minimumTimeToInitialState(word: string, k: number): number {

    function z_algo(s) {
        const n = s.length;
        const ans = Array(n).fill(0);
        for (let i = 1, ii = 0, lo = 0, hi = 0; i < n; ++i) {
            if (i <= hi) ii = i - lo;
            if (i + ans[ii] <= hi) ans[i]= ans[ii];
            else {
                lo = i;
                hi = Math.max(hi, i);
                while (hi < n && s[hi] === s[hi-lo]) ++hi;
                ans[i] = hi - lo;
                --hi;
            }
        }
        return ans;
    };

    const z = z_algo(word);
    let i = 0;
    for (const n = word.length; i*k < n; ++i)
        if (i*k + z[i*k] == n) break;
    return i;
};


/*3030. Find the Grid of Region Average (Medium)
You are given m x n grid image which represents a grayscale image, where
image[i][j] represents a pixel with intensity in the range [0..255]. You are
also given a non-negative integer threshold. Two pixels are adjacent if they
share an edge. A region is a 3 x 3 subgrid where the absolute difference in
intensity between any two adjacent pixels is less than or equal to threshold.
All pixels in a region belong to that region, note that a pixel can belong
to multiple regions. You need to calculate a m x n grid result, where
result[i][j] is the average intensity of the regions to which image[i][j]
belongs, rounded down to the nearest integer. If image[i][j] belongs to
multiple regions, result[i][j] is the average of the rounded-down average
intensities of these regions, rounded down to the nearest integer. If
image[i][j] does not belong to any region, result[i][j] is equal to
image[i][j]. Return the grid result.

Example 1:
Input: image = [[5,6,7,10],[8,9,10,10],[11,12,13,10]], threshold = 3
Output: [[9,9,9,9],[9,9,9,9],[9,9,9,9]]
Explanation: There are two regions as illustrated above. The average
             intensity of the first region is 9, while the average intensity
             of the second region is 9.67 which is rounded down to 9. The
             average intensity of both of the regions is (9 + 9) / 2 = 9. As
             all the pixels belong to either region 1, region 2, or both of
             them, the intensity of every pixel in the result is 9. Please
             note that the rounded-down values are used when calculating the
             average of multiple regions, hence the calculation is done
             using 9 as the average intensity of region 2, not 9.67.

Example 2:
Input: image = [[10,20,30],[15,25,35],[20,30,40],[25,35,45]], threshold = 12
Output: [[25,25,25],[27,27,27],[27,27,27],[30,30,30]]
Explanation: There are two regions as illustrated above. The average
             intensity of the first region is 25, while the average
             intensity of the second region is 30. The average intensity of
             both of the regions is (25 + 30) / 2 = 27.5 which is rounded
             down to 27. All the pixels in row 0 of the image belong to
             region 1, hence all the pixels in row 0 in the result are 25.
             Similarly, all the pixels in row 3 in the result are 30. The
             pixels in rows 1 and 2 of the image belong to region 1 and
             region 2, hence their assigned value is 27 in the result.

Example 3:
Input: image = [[5,6,7],[8,9,10],[11,12,13]], threshold = 1
Output: [[5,6,7],[8,9,10],[11,12,13]]
Explanation: There is only one 3 x 3 subgrid, while it does not have the
             condition on difference of adjacent pixels, for example, the
             difference between image[0][0] and image[1][0] is
             |5 - 8| = 3 > threshold = 1. None of them belong to any valid
             regions, so the result should be the same as image.

Constraints:
* 3 <= n, m <= 500
* 0 <= image[i][j] <= 255
* 0 <= threshold <= 255*/

function resultGrid(image: number[][], threshold: number): number[][] {
    const m = image.length, n = image[0].length;
    const ans = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(2).fill(0)));
    for (let i = 0; i < m-2; ++i)
        for (let j = 0; j < n-2; ++j) {
            let diff = 0, total = 0;
            for (let ii = i; ii <= i+2; ++ii)
                for (let jj = j; jj <= j+2; ++jj) {
                    total += image[ii][jj];
                    if (ii+1 <= i+2) diff = Math.max(diff, Math.abs(image[ii][jj]-image[ii+1][jj]));
                    if (jj+1 <= j+2) diff = Math.max(diff, Math.abs(image[ii][jj]-image[ii][jj+1]));
                }
            if (diff <= threshold)
                for (let ii = i; ii <= i+2; ++ii)
                    for (let jj = j; jj <= j+2; ++jj) {
                        ans[ii][jj][0] += Math.floor(total/9);
                        ans[ii][jj][1] += 1;
                    }
        }
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (ans[i][j][1])
                image[i][j] = Math.floor(ans[i][j][0] / ans[i][j][1]);
    return image;
};


/*3031. Minimum Time to Revert Word to Initial State II (Hard)
You are given a 0-indexed string word and an integer k. At every second, you
must perform the following operations:
* Remove the first k characters of word.
* Add any k characters to the end of word.
Note that you do not necessarily need to add the same characters that you
removed. However, you must perform both operations at every second. Return
the minimum time greater than zero required for word to revert to its
initial state.

Example 1:
Input: word = "abacaba", k = 3
Output: 2
Explanation: - At the 1st second, we remove characters "aba" from the prefix
               of word, and add characters "bac" to the end of word. Thus,
               word becomes equal to "cababac".
             - At the 2nd second, we remove characters "cab" from the prefix
               of word, and add "aba" to the end of word. Thus, word becomes
               equal to "abacaba" and reverts to its initial state.
             It can be shown that 2 seconds is the minimum time greater than
             zero required for word to revert to its initial state.

Example 2:
Input: word = "abacaba", k = 4
Output: 1
Explanation: - At the 1st second, we remove characters "abac" from the
               prefix of word, and add characters "caba" to the end of word.
               Thus, word becomes equal to "abacaba" and reverts to its
               initial state.
             It can be shown that 1 second is the minimum time greater than
             zero required for word to revert to its initial state.

Example 3:
Input: word = "abcbabcd", k = 2
Output: 4
Explanation: - At every second, we will remove the first 2 characters of
               word, and add the same characters to the end of word.
             - After 4 seconds, word becomes equal to "abcbabcd" and reverts
               to its initial state.
             It can be shown that 4 seconds is the minimum time greater than
             zero required for word to revert to its initial state.

Constraints:
* 1 <= word.length <= 10^6
* 1 <= k <= word.length
* word consists only of lowercase English letters.*/

function minimumTimeToInitialState(word: string, k: number): number {

    function z_algo(s) {
        const n = s.length;
        const ans = Array(n).fill(0);
        for (let i = 1, ii = 0, lo = 0, hi = 0; i < n; ++i) {
            if (i <= hi) ii = i - lo;
            if (i + ans[ii] <= hi) ans[i]= ans[ii];
            else {
                lo = i;
                hi = Math.max(hi, i);
                while (hi < n && s[hi] === s[hi-lo]) ++hi;
                ans[i] = hi - lo;
                --hi;
            }
        }
        return ans;
    };

    const z = z_algo(word);
    let i = 0;
    for (const n = word.length; i*k < n; ++i)
        if (i*k + z[i*k] == n) break;
    return i;
};


/*3032. Count Numbers With Unique Digits II (Easy)
Given two positive integers a and b, return the count of numbers having
unique digits in the range [a, b] (inclusive).

Example 1:
Input: a = 1, b = 20
Output: 19
Explanation: All the numbers in the range [1, 20] have unique digits except
             11. Hence, the answer is 19.

Example 2:
Input: a = 9, b = 19
Output: 10
Explanation: All the numbers in the range [9, 19] have unique digits except
             11. Hence, the answer is 10.

Example 3:
Input: a = 80, b = 120
Output: 27
Explanation: There are 41 numbers in the range [80, 120], 27 of which have
             unique digits.

Constraints: 1 <= a <= b <= 1000*/

function numberCount(a: number, b: number): number {
    let ans = 0;
    for (let x = a; x <= b; ++x) {
        let found = false;
        for (let xx = x, mask = 0; xx; xx = Math.floor(xx/10)) {
            const d = xx % 10;
            if (mask & 1<<d) {
                found = true;
                break;
            }
            mask ^= 1<<d;
        }
        if (!found) ++ans;
    }
    return ans;
};


/*3033. Modify the Matrix （Easy）
Given a 0-indexed m x n integer matrix matrix, create a new 0-indexed matrix
called answer. Make answer equal to matrix, then replace each element with
the value -1 with the maximum element in its respective column. Return the
matrix answer.

Example 1:
Input: matrix = [[1,2,-1],[4,-1,6],[7,8,9]]
Output: [[1,2,9],[4,8,6],[7,8,9]]
Explanation: The diagram above shows the elements that are changed (in blue).
             - We replace the value in the cell [1][1] with the maximum
               value in the column 1, that is 8.
             - We replace the value in the cell [0][2] with the maximum
               value in the column 2, that is 9.

Example 2:
Input: matrix = [[3,-1],[5,2]]
Output: [[3,2],[5,2]]
Explanation: The diagram above shows the elements that are changed (in blue).

Constraints:
* m == matrix.length
* n == matrix[i].length
* 2 <= m, n <= 50
* -1 <= matrix[i][j] <= 100
* The input is generated such that each column contains at least one non-
  negative integer.*/

function modifiedMatrix(matrix: number[][]): number[][] {
    const m = matrix.length, n = matrix[0].length;
    for (let j = 0; j < n; ++j) {
        let mv = -1;
        for (let i = 0; i < m; ++i)
            mv = Math.max(mv, matrix[i][j]);
        for (let i = 0; i < m; ++i)
            if (matrix[i][j] === -1) matrix[i][j] = mv;
    }
    return matrix;
};


/*3034. Number of Subarrays That Match a Pattern I (Medium)
You are given a 0-indexed integer array nums of size n, and a 0-indexed
integer array pattern of size m consisting of integers -1, 0, and 1. A
subarray nums[i..j] of size m + 1 is said to match the pattern if the
following conditions hold for each element pattern[k]:
* nums[i + k + 1] > nums[i + k] if pattern[k] == 1.
* nums[i + k + 1] == nums[i + k] if pattern[k] == 0.
* nums[i + k + 1] < nums[i + k] if pattern[k] == -1.
Return the count of subarrays in nums that match the pattern.

Example 1:
Input: nums = [1,2,3,4,5,6], pattern = [1,1]
Output: 4
Explanation: The pattern [1,1] indicates that we are looking for strictly
             increasing subarrays of size 3. In the array nums, the
             subarrays [1,2,3], [2,3,4], [3,4,5], and [4,5,6] match this
             pattern. Hence, there are 4 subarrays in nums that match the
             pattern.

Example 2:
Input: nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]
Output: 2
Explanation: Here, the pattern [1,0,-1] indicates that we are looking for a
             sequence where the first number is smaller than the second, the
             second is equal to the third, and the third is greater than the
             fourth. In the array nums, the subarrays [1,4,4,1], and
             [3,5,5,3] match this pattern. Hence, there are 2 subarrays in
             nums that match the pattern.

Constraints:
* 2 <= n == nums.length <= 100
* 1 <= nums[i] <= 10^9
* 1 <= m == pattern.length < n
* -1 <= pattern[i] <= 1*/

function countMatchingSubarrays(nums: number[], pattern: number[]): number {
    const text = [];
    for (let i = 1; i < nums.length; ++i) {
        let diff = nums[i] - nums[i-1];
        if (diff) diff = Math.floor(diff / Math.abs(diff));
        text.push(diff);
    }
    const lps = [0];
    for (let i = 1, k = 0; i < pattern.length; ++i) {
        while (k && pattern[k] !== pattern[i]) k = lps[k-1];
        if (pattern[k] === pattern[i]) ++k;
        lps.push(k);
    }
    let ans = 0;
    for (let i = 0, k = 0; i < text.length; ++i) {
        while (k && (k === pattern.length || pattern[k] !== text[i])) k = lps[k-1];
        if (pattern[k] === text[i]) ++k;
        if (k === pattern.length) ++ans;
    }
    return ans;
};


/*3035. Maximum Palindromes After Operations (Medium)
You are given a 0-indexed string array words having length n and containing
0-indexed strings. You are allowed to perform the following operation any
number of times (including zero):
* Choose integers i, j, x, and y such that 0 <= i, j < n,
  0 <= x < words[i].length, 0 <= y < words[j].length, and swap the
  characters words[i][x] and words[j][y].
Return an integer denoting the maximum number of palindromes words can
contain, after performing some operations. Note: i and j may be equal during
an operation.

Example 1:
Input: words = ["abbb","ba","aa"]
Output: 3
Explanation: In this example, one way to get the maximum number of
             palindromes is:
             - Choose i = 0, j = 1, x = 0, y = 0, so we swap words[0][0] and
               words[1][0]. words becomes ["bbbb","aa","aa"].
             All strings in words are now palindromes. Hence, the maximum
             number of palindromes achievable is 3.

Example 2:
Input: words = ["abc","ab"]
Output: 2
Explanation: In this example, one way to get the maximum number of
             palindromes is:
             - Choose i = 0, j = 1, x = 1, y = 0, so we
               words[1][0]. words becomes ["aac","bb"].
             - Choose i = 0, j = 0, x = 1, y = 2, so we swap words[0][1] and
               words[0][2]. words becomes ["aca","bb"].
             Both strings are now palindromes. Hence, the maximum number of
             palindromes achievable is 2.

Example 3:
Input: words = ["cd","ef","a"]
Output: 1
Explanation: In this example, there is no need to perform any operation.
             There is one palindrome in words "a". It can be shown that it
             is not possible to get more than one palindrome after any
             number of operations. Hence, the answer is 1.

Constraints:
* 1 <= words.length <= 1000
* 1 <= words[i].length <= 100
* words[i] consists only of lowercase English letters.*/

function maxPalindromesAfterOperations(words: string[]): number {
    const freq = new Array(26).fill(0);
    for (const word of words)
        for (const ch of word)
            ++freq[ch.charCodeAt(0) - 97];
    let pairs = 0;
    for (const x of freq) pairs += Math.floor(x/2);
    words.sort((a, b) => a.length - b.length);
    for (const [i, w] of words.entries()) {
        pairs -= Math.floor(w.length/2);
        if (pairs < 0) return i;
    }
    return words.length;
};


/*3036. Number of Subarrays That Match a Pattern II (Hard)
You are given a 0-indexed integer array nums of size n, and a 0-indexed
integer array pattern of size m consisting of integers -1, 0, and 1. A
subarray nums[i..j] of size m + 1 is said to match the pattern if the
following conditions hold for each element pattern[k]:
* nums[i + k + 1] > nums[i + k] if pattern[k] == 1.
* nums[i + k + 1] == nums[i + k] if pattern[k] == 0.
* nums[i + k + 1] < nums[i + k] if pattern[k] == -1.
Return the count of subarrays in nums that match the pattern.

Example 1:
Input: nums = [1,2,3,4,5,6], pattern = [1,1]
Output: 4
Explanation: The pattern [1,1] indicates that we are looking for strictly
             increasing subarrays of size 3. In the array nums, the
             subarrays [1,2,3], [2,3,4], [3,4,5], and [4,5,6] match this
             pattern. Hence, there are 4 subarrays in nums that match the
             pattern.

Example 2:
Input: nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]
Output: 2
Explanation: Here, the pattern [1,0,-1] indicates that we are looking for a
             sequence where the first number is smaller than the second, the
             second is equal to the third, and the third is greater than the
             fourth. In the array nums, the subarrays [1,4,4,1], and
             [3,5,5,3] match this pattern. Hence, there are 2 subarrays in
             nums that match the pattern.

Constraints:
* 2 <= n == nums.length <= 10^6
* 1 <= nums[i] <= 10^9
* 1 <= m == pattern.length < n
* -1 <= pattern[i] <= 1*/

function countMatchingSubarrays(nums: number[], pattern: number[]): number {
    const text = [];
    for (let i = 1; i < nums.length; ++i) {
        let diff = nums[i] - nums[i-1];
        if (diff) diff = Math.floor(diff / Math.abs(diff));
        text.push(diff);
    }
    const lps = [0];
    for (let i = 1, k = 0; i < pattern.length; ++i) {
        while (k && pattern[k] !== pattern[i]) k = lps[k-1];
        if (pattern[k] === pattern[i]) ++k;
        lps.push(k);
    }
    let ans = 0;
    for (let i = 0, k = 0; i < text.length; ++i) {
        while (k && (k === pattern.length || pattern[k] !== text[i])) k = lps[k-1];
        if (pattern[k] === text[i]) ++k;
        if (k === pattern.length) ++ans;
    }
    return ans;
};


/*3037. Find Pattern in Infinite Stream II (Hard)
You are given a binary array pattern and an object stream of class
InfiniteStream representing a 0-indexed infinite stream of bits. The class
InfiniteStream contains the following function:
* int next(): Reads a single bit (which is either 0 or 1) from the stream
  and returns it.
Return the first starting index where the pattern matches the bits read from
the stream. For example, if the pattern is [1, 0], the first match is the
highlighted part in the stream [0, 1, 0, 1, ...].

Example 1:
Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
Output: 3
Explanation: The first occurrence of the pattern [0,1] is highlighted in the
             stream [1,1,1,0,1,...], which starts at index 3.

Example 2:
Input: stream = [0,0,0,0,...], pattern = [0]
Output: 0
Explanation: The first occurrence of the pattern [0] is highlighted in the
             stream [0,...], which starts at index 0.

Example 3:
Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
Output: 2
Explanation: The first occurrence of the pattern [1,1,0,1] is highlighted in
             the stream [1,0,1,1,0,1,...], which starts at index 2.

Constraints:
* 1 <= pattern.length <= 10^4
* pattern consists only of 0 and 1.
* stream consists only of 0 and 1.
* The input is generated such that the pattern's start index exists in the
  first 10^5 bits of the stream.*/

function findPattern(stream: InfiniteStream, pattern: number[]): number {
    const lps = [0];
    for (let i = 1, k = 0; i < pattern.length; ++i) {
        while (k && pattern[k] != pattern[i]) k = lps[k-1];
        if (pattern[k] == pattern[i]) ++k;
        lps.push(k);
    }
    for (let i = 0, k = 0; ; ++i) {
        const ch = stream.next();
        while (k && pattern[k] != ch) k = lps[k-1];
        if (pattern[k] == ch) ++k;
        if (k == pattern.length) return i-k+1;
    }
};


/*3038. Maximum Number of Operations With the Same Score I (Easy)
Given an array of integers called nums, you can perform the following
operation while nums contains at least 2 elements:
* Choose the first two elements of nums and delete them.
The score of the operation is the sum of the deleted elements. Your task is
to find the maximum number of operations that can be performed, such that
all operations have the same score. Return the maximum number of operations
possible that satisfy the condition mentioned above.

Example 1:
Input: nums = [3,2,1,4,5]
Output: 2
Explanation: We perform the following operations:
             - Delete the first two elements, with score 3 + 2 = 5,
               nums = [1,4,5].
             - Delete the first two elements, with score 1 + 4 = 5,
               nums = [5].
             We are unable to perform any more operations as nums contain
             only 1 element.

Example 2:
Input: nums = [3,2,6,1,4]
Output: 1
Explanation: We perform the following operations:
             - Delete the first two elements, with score 3 + 2 = 5,
               nums = [6,1,4].
             We are unable to perform any more operations as the score of
             the next operation isn't the same as the previous one.

Constraints:
* 2 <= nums.length <= 100
* 1 <= nums[i] <= 1000*/

function maxOperations(nums: number[]): number {
    let ans = 0, score = nums[0]+nums[1];
    for (let i = 0; i+1 < nums.length; i += 2)
        if (nums[i] + nums[i+1] == score) ++ans;
        else break;
    return ans;
};


/*3039. Apply Operations to Make String Empty (Medium)
You are given a string s. Consider performing the following operation until
s becomes empty:
* For every alphabet character from 'a' to 'z', remove the first occurrence
  of that character in s (if it exists).
For example, let initially s = "aabcbbca". We do the following operations:
* Remove the underlined characters s = "aabcbbca". The resulting string is
  s = "abbca".
* Remove the underlined characters s = "abbca". The resulting string is
  s = "ba".
* Remove the underlined characters s = "ba". The resulting string is s = "".
Return the value of the string s right before applying the last operation.
In the example above, answer is "ba".

Example 1:
Input: s = "aabcbbca"
Output: "ba"
Explanation: Explained in the statement.

Example 2:
Input: s = "abcd"
Output: "abcd"
Explanation: We do the following operation:
             - Remove the underlined characters s = "abcd". The resulting
               string is s = "".
             The string just before the last operation is "abcd".

Constraints:
* 1 <= s.length <= 5 * 10^5
* s consists only of lowercase English letters.*/

function lastNonEmptyString(s: string): string {
    let m = 0;
    const freq = new Map();
    for (const ch of s) {
        freq.set(ch, 1 + (freq.get(ch) ?? 0));
        m = Math.max(m, freq.get(ch));
    }
    let ans = [];
    for (const ch of s.split('').reverse())
        if (freq.get(ch) == m) {
            ans.push(ch);
            freq.set(ch, freq.get(ch) - 1);
        }
    return ans.reverse().join('');
};


/*3040. Maximum Number of Operations With the Same Score II (Medium)
Given an array of integers called nums, you can perform any of the following
operation while nums contains at least 2 elements:
* Choose the first two elements of nums and delete them.
* Choose the last two elements of nums and delete them.
* Choose the first and the last elements of nums and delete them.
The score of the operation is the sum of the deleted elements. Your task is
to find the maximum number of operations that can be performed, such that
all operations have the same score. Return the maximum number of operations
possible that satisfy the condition mentioned above.

Example 1:
Input: nums = [3,2,1,2,3,4]
Output: 3
Explanation: We perform the following operations:
             - Delete the first two elements, with score 3 + 2 = 5,
               nums = [1,2,3,4].
             - Delete the first and the last elements, with score 1 + 4 = 5,
               nums = [2,3].
             - Delete the first and the last elements, with score 2 + 3 = 5,
               nums = [].
             We are unable to perform any more operations as nums is empty.

Example 2:
Input: nums = [3,2,6,1,4]
Output: 2
Explanation: We perform the following operations:
             - Delete the first two elements, with score 3 + 2 = 5,
               nums = [6,1,4].
             - Delete the last two elements, with score 1 + 4 = 5,
               nums = [6].
             It can be proven that we can perform at most 2 operations.

Constraints:
* 2 <= nums.length <= 2000
* 1 <= nums[i] <= 1000*/

function maxOperations(nums: number[]): number {
    const n = nums.length;
    const memo = new Map();

    function fn(i, j, t) {
        if (i >= j) return 0;
        if (!memo.has(t))
            memo.set(t, Array(n).fill(0).map(() => Array(n).fill(0)));
        if (memo.get(t)[i][j] == 0) {
            let ans = 0;
            if (nums[i]+nums[i+1] == t) ans = Math.max(ans, 1+fn(i+2, j, t));
            if (nums[j-1]+nums[j] == t) ans = Math.max(ans, 1+fn(i, j-2, t));
            if (nums[i]+nums[j] == t) ans = Math.max(ans, 1+fn(i+1, j-1, t));
            memo.get(t)[i][j] = ans;
        }
        return memo.get(t)[i][j];
    };

    let ans = 0;
    for (const t of new Set([nums[0]+nums[1], nums[n-2]+nums[n-1], nums[0]+nums[n-1]]))
        ans = Math.max(ans, fn(0, n-1, t));
    return ans;
};


/*3041. Maximize Consecutive Elements in an Array After Modification (Hard)
You are given a 0-indexed array nums consisting of positive integers.
Initially, you can increase the value of any element in the array by at most
1. After that, you need to select one or more elements from the final array
such that those elements are consecutive when sorted in increasing order.
For example, the elements [3, 4, 5] are consecutive while [3, 4, 6] and
[1, 1, 2, 3] are not. Return the maximum number of elements that you can
select.

Example 1:
Input: nums = [2,1,5,1,1]
Output: 3
Explanation: We can increase the elements at indices 0 and 3. The resulting
             array is nums = [3,1,5,2,1]. We select the elements [3,1,5,2,1]
             and we sort them to obtain [1,2,3], which are consecutive. It
             can be shown that we cannot select more than 3 consecutive
             elements.

Example 2:
Input: nums = [1,4,7,10]
Output: 1
Explanation: The maximum consecutive elements that we can select is 1.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^6*/

function maxSelectedElements(nums: number[]): number {
    nums.sort((x, y) => x-y);
    const n = nums.length;
    let ans = 1;
    const dp = Array(n).fill(0).map(() => Array(2).fill(1));
    for (let i = 1; i < n; ++i) {
        if (nums[i-1] + 2 == nums[i]) dp[i][0] = dp[i-1][1] + 1;
        else if (nums[i-1] + 1 == nums[i]) {
            dp[i][0] = dp[i-1][0] + 1;
            dp[i][1] = dp[i-1][1] + 1;
        } else if (nums[i-1] == nums[i]) {
            dp[i][0] = dp[i-1][0];
            dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] + 1);
        }
        ans = Math.max(ans, ...dp[i]);
    }
    return ans;
};


/*3042. Count Prefix and Suffix Pairs I (Easy)
You are given a 0-indexed string array words. Let's define a boolean
function isPrefixAndSuffix that takes two strings, str1 and str2:
* isPrefixAndSuffix(str1, str2) returns true if str1 is both a prefix and a
  suffix of str2, and false otherwise.
For example, isPrefixAndSuffix("aba", "ababa") is true because "aba" is a
prefix of "ababa" and also a suffix, but isPrefixAndSuffix("abc", "abcd") is
false. Return an integer denoting the number of index pairs (i, j) such that
i < j, and isPrefixAndSuffix(words[i], words[j]) is true.

Example 1:
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: In this example, the counted index pairs are:
             - i = 0 and j = 1 because isPrefixAndSuffix("a", "aba") is true.
             - i = 0 and j = 2 because isPrefixAndSuffix("a", "ababa") is
               true.
             - i = 0 and j = 3 because isPrefixAndSuffix("a", "aa") is true.
             - i = 1 and j = 2 because isPrefixAndSuffix("aba", "ababa") is
               true.
             Therefore, the answer is 4.

Example 2:
Input: words = ["pa","papa","ma","mama"]
Output: 2
Explanation: In this example, the counted index pairs are:
             - i = 0 and j = 1 because isPrefixAndSuffix("pa", "papa") is
               true.
             - i = 2 and j = 3 because isPrefixAndSuffix("ma", "mama") is
               true.
             Therefore, the answer is 2.

Example 3:
Input: words = ["abab","ab"]
Output: 0
Explanation: In this example, the only valid index pair is i = 0 and j = 1,
             and isPrefixAndSuffix("abab", "ab") is false. Therefore, the
             answer is 0.

Constraints:
* 1 <= words.length <= 50
* 1 <= words[i].length <= 10
* words[i] consists only of lowercase English letters.*/

function countPrefixSuffixPairs(words: string[]): number {
    let ans = 0;
    for (const [i, w] of words.entries())
        for (let ii = 0; ii < i; ++ii)
            if (w.startsWith(words[ii]) && w.endsWith(words[ii])) ++ans;
    return ans;
};


/*3043. Find the Length of the Longest Common Prefix (Medium)
You are given two arrays with positive integers arr1 and arr2. A prefix of a
positive integer is an integer formed by one or more of its digits, starting
from its leftmost digit. For example, 123 is a prefix of the integer 12345,
while 234 is not. A common prefix of two integers a and b is an integer c,
such that c is a prefix of both a and b. For example, 5655359 and 56554 have
a common prefix 565 while 1223 and 43456 do not have a common prefix. You
need to find the length of the longest common prefix between all pairs of
integers (x, y) such that x belongs to arr1 and y belongs to arr2. Return
the length of the longest common prefix among all pairs. If no common prefix
exists among them, return 0.

Example 1:
Input: arr1 = [1,10,100], arr2 = [1000]
Output: 3
Explanation: There are 3 pairs (arr1[i], arr2[j]):
             - The longest common prefix of (1, 1000) is 1.
             - The longest common prefix of (10, 1000) is 10.
             - The longest common prefix of (100, 1000) is 100.
             The longest common prefix is 100 with a length of 3.

Example 2:
Input: arr1 = [1,2,3], arr2 = [4,4,4]
Output: 0
Explanation: There exists no common prefix for any pair (arr1[i], arr2[j]),
             hence we return 0. Note that common prefixes between elements
             of the same array do not count.

Constraints:
* 1 <= arr1.length, arr2.length <= 5 * 10^4
* 1 <= arr1[i], arr2[i] <= 10^8*/

function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const trie = {};
    for (const x of arr1) {
        let node = trie;
        for (const d of String(x)) {
            if (!node[d]) node[d] = {};
            node = node[d];
        }
    }
    let ans = 0;
    for (const x of arr2) {
        let node = trie, prefix = 0;
        for (const d of String(x)) {
            if (!node[d]) break;
            ++prefix;
            node = node[d];
        }
        ans = Math.max(ans, prefix);
    }
    return ans;
};


/*3044. Most Frequent Prime (Medium)
You are given a m x n 0-indexed 2D matrix mat. From every cell, you can
create numbers in the following way:
* There could be at most 8 paths from the cells namely: east, south-east,
  south, south-west, west, north-west, north, and north-east.
* Select a path from them and append digits in this path to the number being
  formed by traveling in this direction.
* Note that numbers are generated at every step, for example, if the digits
  along the path are 1, 9, 1, then there will be three numbers generated
  along the way: 1, 19, 191.
Return the most frequent prime number greater than 10 out of all the numbers
created by traversing the matrix or -1 if no such prime number exists. If
there are multiple prime numbers with the highest frequency, then return the
largest among them. Note: It is invalid to change the direction during the
move.

Example 1:
Input: mat = [[1,1],[9,9],[1,1]]
Output: 19
Explanation: From cell (0,0) there are 3 possible directions and the numbers
             greater than 10 which can be created in those directions are:
             East: [11], South-East: [19], South: [19,191].
             - Numbers greater than 10 created from the cell (0,1) in all
               possible directions are: [19,191,19,11].
             - Numbers greater than 10 created from the cell (1,0) in all
               possible directions are: [99,91,91,91,91].
             - Numbers greater than 10 created from the cell (1,1) in all
               possible directions are: [91,91,99,91,91].
             - Numbers greater than 10 created from the cell (2,0) in all
               possible directions are: [11,19,191,19].
             - Numbers greater than 10 created from the cell (2,1) in all
               possible directions are: [11,19,19,191].
             The most frequent prime number among all the created numbers is
             19.

Example 2:
Input: mat = [[7]]
Output: -1
Explanation: The only number which can be formed is 7. It is a prime number
             however it is not greater than 10, so return -1.

Example 3:
Input: mat = [[9,7,8],[4,6,5],[2,8,6]]
Output: 97
Explanation: - Numbers greater than 10 created from the cell (0,0) in all
               possible directions are: [97,978,96,966,94,942].
             - Numbers greater than 10 created from the cell (0,1) in all
               possible directions are: [78,75,76,768,74,79].
             - Numbers greater than 10 created from the cell (0,2) in all
               possible directions are: [85,856,86,862,87,879].
             - Numbers greater than 10 created from the cell (1,0) in all
               possible directions are: [46,465,48,42,49,47].
             - Numbers greater than 10 created from the cell (1,1) in all
               possible directions are: [65,66,68,62,64,69,67,68].
             - Numbers greater than 10 created from the cell (1,2) in all
               possible directions are: [56,58,56,564,57,58].
             - Numbers greater than 10 created from the cell (2,0) in all
               possible directions are: [28,286,24,249,26,268].
             - Numbers greater than 10 created from the cell (2,1) in all
               possible directions are: [86,82,84,86,867,85].
             - Numbers greater than 10 created from the cell (2,2) in all
               possible directions are: [68,682,66,669,65,658].
             The most frequent prime number among all the created numbers is
             97.

Constraints:
* m == mat.length
* n == mat[i].length
* 1 <= m, n <= 6
* 1 <= mat[i][j] <= 9*/

function mostFrequentPrime(mat: number[][]): number {
    const m = mat.length, n = mat[0].length;

    function check(x) {
        for (let p = 2; p <= Math.sqrt(x); ++p)
            if (x % p == 0) return false;
        return true;
    };

    let ans = -1; ;
    const freq = new Map();
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            for (const [di, dj] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]])
                for (let ii = i, jj = j, prefix = 0; 0 <= ii && ii < m && 0 <= jj && jj < n; ii += di, jj += dj) {
                    prefix = 10*prefix + mat[ii][jj];
                    if (prefix > 10 && check(prefix)) {
                        freq.set(prefix, 1 + (freq.get(prefix) ?? 0));
                        if (ans == -1 || freq.get(ans) < freq.get(prefix) || freq.get(ans) == freq.get(prefix) && ans < prefix)
                        ans = prefix;
                    }
                }
    return ans;
};


/*3045. Count Prefix and Suffix Pairs II (Hard)
You are given a 0-indexed string array words. Let's define a boolean
function isPrefixAndSuffix that takes two strings, str1 and str2:
* isPrefixAndSuffix(str1, str2) returns true if str1 is both a prefix and a
  suffix of str2, and false otherwise.
For example, isPrefixAndSuffix("aba", "ababa") is true because "aba" is a
prefix of "ababa" and also a suffix, but isPrefixAndSuffix("abc", "abcd") is
false. Return an integer denoting the number of index pairs (i, j) such that
i < j, and isPrefixAndSuffix(words[i], words[j]) is true.

Example 1:
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: In this example, the counted index pairs are:
             - i = 0 and j = 1 because isPrefixAndSuffix("a", "aba") is true.
             - i = 0 and j = 2 because isPrefixAndSuffix("a", "ababa") is
               true.
             - i = 0 and j = 3 because isPrefixAndSuffix("a", "aa") is true.
             - i = 1 and j = 2 because isPrefixAndSuffix("aba", "ababa") is
               true.
             Therefore, the answer is 4.

Example 2:
Input: words = ["pa","papa","ma","mama"]
Output: 2
Explanation: In this example, the counted index pairs are:
             - i = 0 and j = 1 because isPrefixAndSuffix("pa", "papa") is
               true.
             - i = 2 and j = 3 because isPrefixAndSuffix("ma", "mama") is
               true.
             Therefore, the answer is 2.

Example 3:
Input: words = ["abab","ab"]
Output: 0
Explanation: In this example, the only valid index pair is i = 0 and j = 1,
             and isPrefixAndSuffix("abab", "ab") is false. Therefore, the
             answer is 0.

Constraints:
* 1 <= words.length <= 10^5
* 1 <= words[i].length <= 10^5
* words[i] consists only of lowercase English letters.
* The sum of the lengths of all words[i] does not exceed 5 * 10^5.*/

function countPrefixSuffixPairs(words: string[]): number {
    let ans = 0;
    const trie = {};
    for (const w of words) {
        let node = trie;
        for (let i = 0, n = w.length; i < n; ++i) {
            const key = w[i] + w[n-1-i];
            if (!node[key])
                node[key] = {};
            node = node[key];
            ans += node["#"] ?? 0;
        }
        node["#"] = (node["#"] + 1) || 1 ;
    }
    return ans;
};


/*3063. Linked List Frequency (Medium)
Given the head of a linked list containing k distinct elements, return the
head to a linked list of length k containing the frequency of each distinct
element in the given linked list in any order.

Example 1:
Input: head = [1,1,1,2,2,3]
Output: [3,2,1]
Explanation: There are 3 distinct elements in the list. The frequency of 1
             is 3, the frequency of 2 is 2 and the frequency of 3 is 1.
             Hence, we return 3 -> 2 -> 1. Note that 1 -> 2 -> 3,
             1 -> 3 -> 2, 2 -> 1 -> 3, 2 -> 3 -> 1, and 3 -> 1 -> 2 are also
             valid answers.

Example 2:
Input: head = [1,1,2,2,2]
Output: [2,3]
Explanation: There are 2 distinct elements in the list. The frequency of 1
             is 2 and the frequency of 2 is 3. Hence, we return 2 -> 3.

Example 3:
Input: head = [6,5,4,3,2,1]
Output: [1,1,1,1,1,1]
Explanation: There are 6 distinct elements in the list. The frequency of
             each of them is 1. Hence, we return 1 -> 1 -> 1 -> 1 -> 1 -> 1.

Constraints:
* The number of nodes in the list is in the range [1, 10^5].
* 1 <= Node.val <= 10^5*/

function frequenciesOfElements(head: ListNode | null): ListNode | null {
    let node = new ListNode(), dummy = node;
    for (let prev = 0; head; head = head.next) {
        if (prev != head.val)
            node = node.next = new ListNode();
        ++node.val;
        prev = head.val;
    }
    return dummy.next;
};


/*3064. Guess the Number Using Bitwise Questions I (Medium)
There is a number n that you have to find. There is also a pre-defined API
int commonSetBits(int num), which returns the number of bits where both n
and num are 1 in that position of their binary representation. In other
words, it returns the number of set bits in n & num, where & is the bitwise
AND operator. Return the number n.

Example 1:
Input: n = 31
Output: 31
Explanation: It can be proven that it's possible to find 31 using the
             provided API.

Example 2:
Input: n = 33
Output: 33
Explanation: It can be proven that it's possible to find 33 using the
             provided API.

Constraints:
* 1 <= n <= 2^30 - 1
* 0 <= num <= 2^30 - 1
* If you ask for some num out of the given range, the output wouldn't be
  reliable.*/

function findNumber(): number {
    let ans = 0;
    for (let i = 0; i < 30; ++i)
        if (commonSetBits(1<<i))
            ans ^= 1<<i;
    return ans;
};


/*3065. Minimum Operations to Exceed Threshold Value I (Easy)
You are given a 0-indexed integer array nums, and an integer k. In one
operation, you can remove one occurrence of the smallest element of nums.
Return the minimum number of operations needed so that all elements of the
array are greater than or equal to k.

Example 1:
Input: nums = [2,11,10,1,3], k = 10
Output: 3
Explanation: After one operation, nums becomes equal to [2, 11, 10, 3].
             After two operations, nums becomes equal to [11, 10, 3].
             After three operations, nums becomes equal to [11, 10].
             At this stage, all the elements of nums are greater than or
             equal to 10 so we can stop. It can be shown that 3 is the
             minimum number of operations needed so that all elements of the
             array are greater than or equal to 10.

Example 2:
Input: nums = [1,1,2,4,9], k = 1
Output: 0
Explanation: All elements of the array are greater than or equal to 1 so we
             do not need to apply any operations on nums.

Example 3:
Input: nums = [1,1,2,4,9], k = 9
Output: 4
Explanation: only a single element of nums is greater than or equal to 9 so
             we need to apply the operations 4 times on nums.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 10^9
* 1 <= k <= 10^9
* The input is generated such that there is at least one index i such that
  nums[i] >= k.*/

function minOperations(nums: number[], k: number): number {
    return nums.filter(x => x < k).length;
};


/*3066. Minimum Operations to Exceed Threshold Value II (Medium)
You are given a 0-indexed integer array nums, and an integer k. In one
operation, you will:
* Take the two smallest integers x and y in nums.
* Remove x and y from nums.
* Add min(x, y) * 2 + max(x, y) anywhere in the array.
Note that you can only apply the described operation if nums contains at
least two elements. Return the minimum number of operations needed so that
all elements of the array are greater than or equal to k.

Example 1:
Input: nums = [2,11,10,1,3], k = 10
Output: 2
Explanation: In the first operation, we remove elements 1 and 2, then add
             1 * 2 + 2 to nums. nums becomes equal to [4, 11, 10, 3]. In the
             second operation, we remove elements 3 and 4, then add
             3 * 2 + 4 to nums. nums becomes equal to [10, 11, 10]. At this
             stage, all the elements of nums are greater than or equal to 10
             so we can stop. It can be shown that 2 is the minimum number of
             operations needed so that all elements of the array are greater
             than or equal to 10.

Example 2:
Input: nums = [1,1,2,4,9], k = 20
Output: 4
Explanation: After one operation, nums becomes equal to [2, 4, 9, 3].
             After two operations, nums becomes equal to [7, 4, 9].
             After three operations, nums becomes equal to [15, 9].
             After four operations, nums becomes equal to [33].
             At this stage, all the elements of nums are greater than 20 so
             we can stop. It can be shown that 4 is the minimum number of
             operations needed so that all elements of the array are greater
             than or equal to 20.

Constraints:
* 2 <= nums.length <= 2 * 10^5
* 1 <= nums[i] <= 10^9
* 1 <= k <= 10^9
* The input is generated such that an answer always exists. That is, there
  exists some sequence of operations after which all elements of the array
  are greater than or equal to k.*/

function minOperations(nums: number[], k: number): number {
    const n = nums.length, pq = new PriorityQueue({ compare : (x, y) => x-y });
    for (const x of nums)
        pq.enqueue(x);
    while (pq.front() < k)
        pq.enqueue(2*pq.dequeue() + pq.dequeue());
    return n - pq.size();
};


/*3067. Count Pairs of Connectable Servers in a Weighted Tree Network (Medium)
You are given an unrooted weighted tree with n vertices representing servers
numbered from 0 to n - 1, an array edges where edges[i] = [ai, bi, weighti]
represents a bidirectional edge between vertices ai and bi of weight
weighti. You are also given an integer signalSpeed. Two servers a and b are
connectable through a server c if:
* a < b, a != c and b != c.
* The distance from c to a is divisible by signalSpeed.
* The distance from c to b is divisible by signalSpeed.
* The path from c to b and the path from c to a do not share any edges.
Return an integer array count of length n where count[i] is the number of
server pairs that are connectable through the server i.

Example 1:
Input: edges = [[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], signalSpeed = 1
Output: [0,4,6,6,4,0]
Explanation: Since signalSpeed is 1, count[c] is equal to the number of
             pairs of paths that start at c and do not share any edges. In
             the case of the given path graph, count[c] is equal to the
             number of servers to the left of c multiplied by the servers to
             the right of c.

Example 2:
Input: edges = [[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]], signalSpeed = 3
Output: [2,0,0,0,0,0,2]
Explanation: Through server 0, there are 2 pairs of connectable servers:
             (4, 5) and (4, 6). Through server 6, there are 2 pairs of
             connectable servers: (4, 5) and (0, 5). It can be shown that no
             two servers are connectable through servers other than 0 and 6.

Constraints:
* 2 <= n <= 1000
* edges.length == n - 1
* edges[i].length == 3
* 0 <= ai, bi < n
* edges[i] = [ai, bi, weighti]
* 1 <= weighti <= 10^6
* 1 <= signalSpeed <= 106^
* The input is generated such that edges represents a valid tree.*/

function countPairsOfConnectableServers(edges: number[][], signalSpeed: number): number[] {
    const n = edges.length + 1;
    const tree = Array(n).fill(null).map(() => []);
    for (const [u, v, w] of edges) {
        tree[u].push([v, w]);
        tree[v].push([u, w]);
    }
    const ans = Array(n).fill(0);
    for (let x = 0; x < n; ++x) {
        let prefix = 0;
        for (const [v, w] of tree[x]) {
            let cnt = 0;
            const stk = [[x, v, w]];
            while (stk.length) {
                const [p, u, w] = stk.pop();
                if (w % signalSpeed == 0) ++cnt;
                for (const [v, wt] of tree[u])
                    if (v != p)
                        stk.push([u, v, w+wt]);
            }
            ans[x] += prefix * cnt;
            prefix += cnt;
        }
    }
    return ans;
};


/*3068. Find the Maximum Sum of Node Values (Hard)
There exists an undirected tree with n nodes numbered 0 to n - 1. You are
given a 0-indexed 2D integer array edges of length n - 1, where
edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi
in the tree. You are also given a positive integer k, and a 0-indexed array
of non-negative integers nums of length n, where nums[i] represents the
value of the node numbered i. Bogdan wants the sum of values of tree nodes
to be maximum, for which Bogdan can perform the following operation any
number of times (including zero) on the tree:
* Choose any edge [u, v] connecting the nodes u and v, and update their
  values as follows:
  + nums[u] = nums[u] XOR k
  + nums[v] = nums[v] XOR k
Return the maximum possible sum of the values Bogdan can achieve by
performing the operation any number of times.

Example 1:
Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
Output: 6
Explanation: Bogdan can achieve the maximum sum of 6 using a single
             operation:
             - Choose the edge [0,2]. nums[0] and nums[2] become:
               1 XOR 3 = 2, and the array nums becomes: [1,2,1] -> [2,2,2].
             The total sum of values is 2 + 2 + 2 = 6. It can be shown that
             6 is the maximum achievable sum of values.

Example 2:
Input: nums = [2,3], k = 7, edges = [[0,1]]
Output: 9
Explanation: Bogdan can achieve the maximum sum of 9 using a single
             operation:
             - Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and
               nums[1] become: 3 XOR 7 = 4, and the array nums becomes:
               [2,3] -> [5,4].
             The total sum of values is 5 + 4 = 9. It can be shown that 9 is
             the maximum achievable sum of values.

Example 3:
Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
Output: 42
Explanation: The maximum achievable sum is 42 which can be achieved by
             Bogdan performing no operations.

Constraints:
* 2 <= n == nums.length <= 2 * 10^4
* 1 <= k <= 10^9
* 0 <= nums[i] <= 10^9
* edges.length == n - 1
* edges[i].length == 2
* 0 <= edges[i][0], edges[i][1] <= n - 1
* The input is generated such that edges represent a valid tree.*/

function maximumValueSum(nums: number[], k: number, edges: number[][]): number {
    let ans = 0, cnt = 0, diff = Infinity;
    for (const x of nums) {
        const xx = x ^ k;
        if (x < xx) cnt ^= 1;
        ans += Math.max(x, xx);
        diff = Math.min(diff, Math.abs(x-xx));
    }
    return cnt ? ans - diff : ans;
};


/*3074. Apple Redistribution into Boxes (Easy)
You are given an array apple of size n and an array capacity of size m.
There are n packs where the ith pack contains apple[i] apples. There are m
boxes as well, and the ith box has a capacity of capacity[i] apples. Return
the minimum number of boxes you need to select to redistribute these n packs
of apples into boxes. Note that, apples from the same pack can be
distributed into different boxes.

Example 1:
Input: apple = [1,3,2], capacity = [4,3,1,5,2]
Output: 2
Explanation: We will use boxes with capacities 4 and 5. It is possible to
             distribute the apples as the total capacity is greater than or
             equal to the total number of apples.

Example 2:
Input: apple = [5,5,5], capacity = [2,4,2,7]
Output: 4
Explanation: We will need to use all the boxes.

Constraints:
* 1 <= n == apple.length <= 50
* 1 <= m == capacity.length <= 50
* 1 <= apple[i], capacity[i] <= 50
* The input is generated such that it's possible to redistribute packs of
  apples into boxes.*/

function minimumBoxes(apple: number[], capacity: number[]): number {
    let total = apple.reduce((x, y) => x+y);
    capacity.sort((x, y) => y-x);
    for (let i = 0; i < capacity.length; ++i) {
        total -= capacity[i];
        if (total <= 0) return i+1;
    }
};


/*3075. Maximize Happiness of Selected Children (Medium)
You are given an array happiness of length n, and a positive integer k.
There are n children standing in a queue, where the ith child has happiness
value happiness[i]. You want to select k children from these n children in k
turns. In each turn, when you select a child, the happiness value of all the
children that have not been selected till now decreases by 1. Note that the
happiness value cannot become negative and gets decremented only if it is
positive. Return the maximum sum of the happiness values of the selected
children you can achieve by selecting k children.

Example 1:
Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: We can pick 2 children in the following way:
             - Pick the child with the happiness value == 3. The happiness
               value of the remaining children becomes [0,1].
             - Pick the child with the happiness value == 1. The happiness
               value of the remaining child becomes [0]. Note that the
               happiness value cannot become less than 0.
             The sum of the happiness values of the selected children is
             3 + 1 = 4.

Example 2:
Input: happiness = [1,1,1,1], k = 2
Output: 1
Explanation: We can pick 2 children in the following way:
             - Pick any child with the happiness value == 1. The happiness
               value of the remaining children becomes [0,0,0].
             - Pick the child with the happiness value == 0. The happiness
               value of the remaining child becomes [0,0].
             The sum of the happiness values of the selected children is
             1 + 0 = 1.
Example 3:
Input: happiness = [2,3,4,5], k = 1
Output: 5
Explanation: We can pick 1 child in the following way:
             - Pick the child with the happiness value == 5. The happiness
               value of the remaining children becomes [1,2,3].
             The sum of the happiness values of the selected children is 5.

Constraints:
* 1 <= n == happiness.length <= 2 * 10^5
* 1 <= happiness[i] <= 10^8
* 1 <= k <= n*/

function maximumHappinessSum(happiness: number[], k: number): number {
    happiness.sort((x, y) => y-x);
    let ans = 0;
    for (let i = 0; i < k; ++i)
        ans += Math.max(0, happiness[i]-i);
    return ans;
};


/*3076. Shortest Uncommon Substring in an Array (Medium)
You are given an array arr of size n consisting of non-empty strings. Find a
string array answer of size n such that:
* answer[i] is the shortest substring of arr[i] that does not occur as a
  substring in any other string in arr. If multiple such substrings exist,
  answer[i] should be the lexicographically smallest. And if no such
  substring exists, answer[i] should be an empty string.
Return the array answer.

Example 1:
Input: arr = ["cab","ad","bad","c"]
Output: ["ab","","ba",""]
Explanation: We have the following:
             - For the string "cab", the shortest substring that does not
               occur in any other string is either "ca" or "ab", we choose
               the lexicographically smaller substring, which is "ab".
             - For the string "ad", there is no substring that does not
               occur in any other string.
             - For the string "bad", the shortest substring that does not
               occur in any other string is "ba".
             - For the string "c", there is no substring that does not occur
               in any other string.

Example 2:
Input: arr = ["abc","bcd","abcd"]
Output: ["","","abcd"]
Explanation: We have the following:
             - For the string "abc", there is no substring that does not
               occur in any other string.
             - For the string "bcd", there is no substring that does not
               occur in any other string.
             - For the string "abcd", the shortest substring that does not
               occur in any other string is "abcd".

Constraints:
* n == arr.length
* 2 <= n <= 100
* 1 <= arr[i].length <= 20
* arr[i] consists only of lowercase English letters.*/

function shortestSubstrings(arr: string[]): string[] {
    const seen = new Map();
    for (const [i, word] of arr.entries()) {
        for (let j = 0, n = word.length; j < n; ++j)
            for (let k = j; k < n; ++k) {
                const key = word.substring(j, k+1);
                if (!seen.has(key)) seen.set(key, []);
                if (seen.get(key).length === 0 || seen.get(key)[seen.get(key).length-1] !== i) seen.get(key).push(i);
            }
    }
    const ans = Array(arr.length).fill("");
    for (const [k, v] of seen.entries())
        if (v.length === 1) {
            const i = v.pop();
            if (ans[i] === "" || k.length < ans[i].length || k.length === ans[i].length && k < ans[i]) ans[i] = k;
        }
    return ans;
};


/*3077. Maximum Strength of K Disjoint Subarrays (Hard)
You are given a 0-indexed array of integers nums of length n, and a positive
odd integer k. The strength of x subarrays is defined as
strength = sum[1] * x - sum[2] * (x - 1) + sum[3] * (x - 2) - sum[4] * (x - 3) + ... + sum[x] * 1
where sum[i] is the sum of the elements in the ith subarray. Formally,
strength is sum of (-1)i+1 * sum[i] * (x - i + 1) over all i's such that
1 <= i <= x. You need to select k disjoint subarrays from nums, such that
their strength is maximum. Return the maximum possible strength that can be
obtained. Note that the selected subarrays don't need to cover the entire
array.

Example 1:
Input: nums = [1,2,3,-1,2], k = 3
Output: 22
Explanation: The best possible way to select 3 subarrays is: nums[0..2],
             nums[3..3], and nums[4..4]. The strength is
             (1 + 2 + 3) * 3 - (-1) * 2 + 2 * 1 = 22.

Example 2:
Input: nums = [12,-2,-2,-2,-2], k = 5
Output: 64
Explanation: The only possible way to select 5 disjoint subarrays is:
             nums[0..0], nums[1..1], nums[2..2], nums[3..3], and nums[4..4].
             The strength is
             12 * 5 - (-2) * 4 + (-2) * 3 - (-2) * 2 + (-2) * 1 = 64.

Example 3:
Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The best possible way to select 1 subarray is: nums[0..0]. The
             strength is -1.

Constraints:
* 1 <= n <= 10^4
* -10^9 <= nums[i] <= 10^9
* 1 <= k <= n
* 1 <= n * k <= 10^6
* k is odd.*/

function maximumStrength(nums: number[], k: number): number {
    const n = nums.length;
    const dp = Array(k+1).fill(0).map(() => Array(2).fill(-Infinity));
    dp[0][0] = dp[0][1] = 0;
    for (let i = n-1; i >= 0; --i)
        for (let j = k; j > 0; --j) {
            const cand = Math.pow(-1, k-j)*nums[i]*j + Math.max(dp[j][1], dp[j-1][0]);
            dp[j][0] = Math.max(cand, dp[j][0]);
            dp[j][1] = Math.max(cand, dp[j-1][0]);
        }
    return dp[k][0];
};


/*3079. Find the Sum of Encrypted Integers (Easy)
You are given an integer array nums containing positive integers. We define
a function encrypt such that encrypt(x) replaces every digit in x with the
largest digit in x. For example, encrypt(523) = 555 and encrypt(213) = 333.
Return the sum of encrypted elements.

Example 1:
Input: nums = [1,2,3]
Output: 6
Explanation: The encrypted elements are [1,2,3]. The sum of encrypted
             elements is 1 + 2 + 3 == 6.

Example 2:
Input: nums = [10,21,31]
Output: 66
Explanation: The encrypted elements are [11,22,33]. The sum of encrypted
             elements is 11 + 22 + 33 == 66.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 1000*/

function sumOfEncryptedInt(nums: number[]): number {
    let ans = 0;
    for (let x of nums) {
        let most = 0, mul = 0;
        for (; x; x = Math.floor(x/10)) {
            most = Math.max(most, x % 10);
            mul = 10*mul + 1;
        }
        ans += most * mul;
    }
    return ans;
};


/*3080. Mark Elements on Array by Performing Queries (Medium)
You are given a 0-indexed array nums of size n consisting of positive
integers. You are also given a 2D array queries of size m where
queries[i] = [indexi, ki]. Initially all elements of the array are unmarked.
You need to apply m queries on the array in order, where on the ith query
you do the following:
* Mark the element at index indexi if it is not already marked.
* Then mark ki unmarked elements in the array with the smallest values. If
  multiple such elements exist, mark the ones with the smallest indices. And
  if less than ki unmarked elements exist, then mark all of them.
Return an array answer of size m where answer[i] is the sum of unmarked
elements in the array after the ith query.

Example 1:
Input: nums = [1,2,2,1,2,3,1], queries = [[1,2],[3,3],[4,2]]
Output: [8,3,0]
Explanation: We do the following queries on the array:
             - Mark the element at index 1, and 2 of the smallest unmarked
               elements with the smallest indices if they exist, the marked
               elements now are nums = [1,2,2,1,2,3,1]. The sum of unmarked
               elements is 2 + 2 + 3 + 1 = 8.
             - Mark the element at index 3, since it is already marked we
               skip it. Then we mark 3 of the smallest unmarked elements
               with the smallest indices, the marked elements now are
               nums = [1,2,2,1,2,3,1]. The sum of unmarked elements is 3.
             - Mark the element at index 4, since it is already marked we
               skip it. Then we mark 2 of the smallest unmarked elements
               with the smallest indices if they exist, the marked elements
               now are nums = [1,2,2,1,2,3,1]. The sum of unmarked elements
               is 0.

Example 2:
Input: nums = [1,4,2,3], queries = [[0,1]]
Output: [7]
Explanation: We do one query which is mark the element at index 0 and mark
             the smallest element among unmarked elements. The marked
             elements will be nums = [1,4,2,3], and the sum of unmarked
             elements is 4 + 3 = 7.

Constraints:
* n == nums.length
* m == queries.length
* 1 <= m <= n <= 10^5
* 1 <= nums[i] <= 10^5
* queries[i].length == 2
* 0 <= indexi, ki <= n - 1*/

function unmarkedSumArray(nums: number[], queries: number[][]): number[] {
    const pq = new PriorityQueue({ compare : (x, y) => x[0] != y[0] ? x[0] - y[0] : x[1] - y[1]});
    for (const [i, x] of nums.entries())
        pq.enqueue([x, i]);
    let suffix = nums.reduce((x, y) => x + y);
    const ans = [];
    for (let [i, k] of queries) {
        if (nums[i]) {
            suffix -= nums[i];
            nums[i] = 0;
        }
        while (k && pq.size()) {
            const [_, j] = pq.dequeue();
            if (nums[j]) {
                --k;
                suffix -= nums[j];
                nums[j] = 0;
            }
        }
        ans.push(suffix);
    }
    return ans;
};


/*3081. Replace Question Marks in String to Minimize Its Value (Medium)
You are given a string s. s[i] is either a lowercase English letter or '?'.
For a string t having length m containing only lowercase English letters, we
define the function cost(i) for an index i as the number of characters equal
to t[i] that appeared before it, i.e. in the range [0, i - 1]. The value of
t is the sum of cost(i) for all indices i. For example, for the string
t = "aab":
* cost(0) = 0
* cost(1) = 1
* cost(2) = 0
* Hence, the value of "aab" is 0 + 1 + 0 = 1.
Your task is to replace all occurrences of '?' in s with any lowercase
English letter so that the value of s is minimized. Return a string denoting
the modified string with replaced occurrences of '?'. If there are multiple
strings resulting in the minimum value, return the lexicographically
smallest one.

Example 1:
Input:  s = "???"
Output:  "abc"
Explanation: In this example, we can replace the occurrences of '?' to make
             s equal to "abc". For "abc", cost(0) = 0, cost(1) = 0, and
             cost(2) = 0. The value of "abc" is 0. Some other modifications
             of s that have a value of 0 are "cba", "abz", and, "hey". Among
             all of them, we choose the lexicographically smallest.

Example 2:
Input: s = "a?a?"
Output: "abac"
Explanation: In this example, the occurrences of '?' can be replaced to make
             s equal to "abac". For "abac", cost(0) = 0, cost(1) = 0,
             cost(2) = 1, and cost(3) = 0. The value of "abac" is 1.

Constraints:
* 1 <= s.length <= 10^5
* s[i] is either a lowercase English letter or '?'.*/

function minimizeStringValue(s: string): string {
    const ans = s.split(''), loc = [], freq = Array(26).fill(0);
    for (const [i, ch] of ans.entries())
        if (ch == '?') loc.push(i);
        else ++freq[ch.charCodeAt(0) - 97];
    const pq = new PriorityQueue({ compare : (x, y) => x[0] != y[0] ? x[0] - y[0] : x[1].localeCompare(y[1]) });
    for (const [i, x] of freq.entries())
        pq.enqueue([x, String.fromCharCode(97 + i)]);
    const vals = [];
    for (const _ of loc) {
        const [x, c] = pq.dequeue();
        pq.enqueue([x+1, c]);
        vals.push(c);
    }
    vals.sort();
    for (let i = 0; i < loc.length; ++i)
        ans[loc[i]] = vals[i];
    return ans.join('');
};


/*3082. Find the Sum of the Power of All Subsequences (Hard)
You are given an integer array nums of length n and a positive integer k.
The power of an array of integers is defined as the number of subsequences
with their sum equal to k. Return the sum of power of all subsequences of
nums. Since the answer may be very large, return it modulo 10^9 + 7.

Example 1:
Input:  nums = [1,2,3], k = 3
Output:  6
Explanation: There are 5 subsequences of nums with non-zero power:
             - The subsequence [1,2,3] has 2 subsequences with sum == 3:
               [1,2,3] and [1,2,3].
             - The subsequence [1,2,3] has 1 subsequence with sum == 3:
               [1,2,3].
             - The subsequence [1,2,3] has 1 subsequence with sum == 3:
               [1,2,3].
             - The subsequence [1,2,3] has 1 subsequence with sum == 3:
               [1,2,3].
             - The subsequence [1,2,3] has 1 subsequence with sum == 3:
               [1,2,3].
             Hence the answer is 2 + 1 + 1 + 1 + 1 = 6.

Example 2:
Input:  nums = [2,3,3], k = 5
Output:  4
Explanation: There are 3 subsequences of nums with non-zero power:
             - The subsequence [2,3,3] has 2 subsequences with sum == 5:
               [2,3,3] and [2,3,3].
             - The subsequence [2,3,3] has 1 subsequence with sum == 5:
               [2,3,3].
             - The subsequence [2,3,3] has 1 subsequence with sum == 5:
               [2,3,3].
             Hence the answer is 2 + 1 + 1 = 4.

Example 3:
Input:  nums = [1,2,3], k = 7
Output:  0
Explanation: There exists no subsequence with sum 7. Hence all subsequences
             of nums have power = 0.

Constraints:
* 1 <= n <= 100
* 1 <= nums[i] <= 10^4
* 1 <= k <= 100*/

function sumOfPower(nums: number[], k: number): number {
    const n = nums.length, mod = 1_000_000_007n;
    const dp = Array(n+1).fill(0n).map(() => Array(k+1).fill(0n));
    dp[0][0] = 1n;
    const p2 = Array(n+1).fill(1n);
    for (let i = 1; i <= n; ++i)
        p2[i] = p2[i-1] * 2n % mod;
    for (const x of nums)
        for (let i = n; i > 0; --i)
            for (let j = k; j >= x; --j)
                dp[i][j] = (dp[i][j] + dp[i-1][j-x]) % mod;
    let ans = 0n;
    for (let i = 0; i <= n; ++i)
        ans = (ans + BigInt(dp[i][k] * p2[n-i])) % mod;
    return Number(ans);
};


/*3083. Existence of a Substring in a String and Its Reverse (Easy)
Given a string s, find any substring of length 2 which is also present in
the reverse of s. Return true if such a substring exists, and false
otherwise.

Example 1:
Input: s = "leetcode"
Output: true
Explanation: Substring "ee" is of length 2 which is also present in
             reverse(s) == "edocteel".

Example 2:
Input: s = "abcba"
Output: true
Explanation: All of the substrings of length 2 "ab", "bc", "cb", "ba" are
             also present in reverse(s) == "abcba".

Example 3:
Input: s = "abcd"
Output: false
Explanation: There is no substring of length 2 in s, which is also present
             in the reverse of s.

Constraints:
* 1 <= s.length <= 100
* s consists only of lowercase English letters.*/

function isSubstringPresent(s: string): boolean {
    const seen = new Set();
    for (let i = 0; i < s.length-1; ++i)
        seen.add(s.substring(i, i+2));
    s = s.split('').reverse().join('');
    for (let i = 0; i < s.length-1; ++i)
        if (seen.has(s.substring(i, i+2))) return true;
    return false;
};


/*3084. Count Substrings Starting and Ending with Given Character (Medium)
You are given a string s and a character c. Return the total number of
substrings of s that start and end with c.

Example 1:
Input: s = "abada", c = "a"
Output: 6
Explanation: Substrings starting and ending with "a" are: "abada", "abada",
             "abada", "abada", "abada", "abada".

Example 2:
Input: s = "zzz", c = "z"
Output: 6
Explanation: There are a total of 6 substrings in s and all start and end
             with "z".

Constraints:
* 1 <= s.length <= 10^5
* s and c consist only of lowercase English letters.*/

function countSubstrings(s: string, c: string): number {
    const n = s.split('').filter(ch => ch == c).length;
    return n*(n+1)/2;
};


/*3085. Minimum Deletions to Make String K-Special (Medium)
You are given a string word and an integer k. We consider word to be
k-special if |freq(word[i]) - freq(word[j])| <= k for all indices i and j in
the string. Here, freq(x) denotes the frequency of the character x in word,
and |y| denotes the absolute value of y. Return the minimum number of
characters you need to delete to make word k-special.

Example 1:
Input: word = "aabcaba", k = 0
Output: 3
Explanation: We can make word 0-special by deleting 2 occurrences of "a" and
             1 occurrence of "c". Therefore, word becomes equal to "baba"
             where freq('a') == freq('b') == 2.

Example 2:
Input: word = "dabdcbdcdcd", k = 2
Output: 2
Explanation: We can make word 2-special by deleting 1 occurrence of "a" and
             1 occurrence of "d". Therefore, word becomes equal to
             "bdcbdcdcd" where freq('b') == 2, freq('c') == 3, and
             freq('d') == 4.

Example 3:
Input: word = "aaabaaa", k = 2
Output: 1
Explanation: We can make word 2-special by deleting 1 occurrence of "b".
             Therefore, word becomes equal to "aaaaaa" where each letter's
             frequency is now uniformly 6.

Constraints:
* 1 <= word.length <= 10^5
* 0 <= k <= 10^5
* word consists only of lowercase English letters.*/

function minimumDeletions(word: string, k: number): number {
    let mp = {}
    for (const ch of word)
        mp[ch] = -~mp[ch];
    const freq: number[] = Object.values(mp);
    freq.sort((x, y) => x-y);
    const n = freq.length, prefix = Array(n+1).fill(0);
    for (let i = 0; i < n; ++i)
        prefix[i+1] = prefix[i] + freq[i];
    let ans = Infinity, j = 0;
    for (const [i, x] of freq.entries()) {
        for (; j < n && freq[j] - freq[i] <= k; ++j);
        const cand = prefix[i] + prefix[n] - prefix[j] - (n-j)*(freq[i]+k);
        ans = Math.min(ans, cand);
    }
    return ans;
};


/*3086. Minimum Moves to Pick K Ones (Hard)
You are given a binary array nums of length n, a positive integer k and a
non-negative integer maxChanges. Alice plays a game, where the goal is for
Alice to pick up k ones from nums using the minimum number of moves. When
the game starts, Alice picks up any index aliceIndex in the range [0, n - 1]
and stands there. If nums[aliceIndex] == 1 , Alice picks up the one and
nums[aliceIndex] becomes 0(this does not count as a move). After this, Alice
can make any number of moves (including zero) where in each move Alice must
perform exactly one of the following actions:
* Select any index j != aliceIndex such that nums[j] == 0 and set
  nums[j] = 1. This action can be performed at most maxChanges times.
* Select any two adjacent indices x and y (|x - y| == 1) such that
  nums[x] == 1, nums[y] == 0, then swap their values (set nums[y] = 1 and
  nums[x] = 0). If y == aliceIndex, Alice picks up the one after this move
  and nums[y] becomes 0.
Return the minimum number of moves required by Alice to pick exactly k ones.

Example 1:
Input: nums = [1,1,0,0,0,1,1,0,0,1], k = 3, maxChanges = 1
Output: 3
Explanation: Alice can pick up 3 ones in 3 moves, if Alice performs the
             following actions in each move when standing at
             aliceIndex == 1:
             * At the start of the game Alice picks up the one and nums[1]
               becomes 0. nums becomes [1,1,1,0,0,1,1,0,0,1].
             * Select j == 2 and perform an action of the first type. nums
               becomes [1,0,1,0,0,1,1,0,0,1]
             * Select x == 2 and y == 1, and perform an action of the second
               type. nums becomes [1,1,0,0,0,1,1,0,0,1]. As y == aliceIndex,
               Alice picks up the one and nums becomes [1,0,0,0,0,1,1,0,0,1].
             * Select x == 0 and y == 1, and perform an action of the second
               type. nums becomes [0,1,0,0,0,1,1,0,0,1]. As y == aliceIndex,
               Alice picks up the one and nums becomes [0,0,0,0,0,1,1,0,0,1].
             Note that it may be possible for Alice to pick up 3 ones using
             some other sequence of 3 moves.

Example 2:
Input: nums = [0,0,0,0], k = 2, maxChanges = 3
Output: 4
Explanation: Alice can pick up 2 ones in 4 moves, if Alice performs the
             following actions in each move when standing at
             aliceIndex == 0:
             * Select j == 1 and perform an action of the first type. nums
               becomes [0,1,0,0].
             * Select x == 1 and y == 0, and perform an action of the second
               type. nums becomes [1,0,0,0]. As y == aliceIndex, Alice picks
               up the one and nums becomes [0,0,0,0].
             * Select j == 1 again and perform an action of the first type.
               nums becomes [0,1,0,0].
             * Select x == 1 and y == 0 again, and perform an action of the
               second type. nums becomes [1,0,0,0]. As y == aliceIndex,
               Alice picks up the one and nums becomes [0,0,0,0].

Constraints:
* 2 <= n <= 10^5
* 0 <= nums[i] <= 1
* 1 <= k <= 10^5
* 0 <= maxChanges <= 10^5
* maxChanges + sum(nums) >= k*/

function minimumMoves(nums: number[], k: number, maxChanges: number): number {
    let cnt = 0, seq = 0;
    const ones = [];
    for (const [i, x] of nums.entries()) {
        if (x) {
            ones.push(i);
            ++cnt;
        } else cnt = 0;
        seq = Math.max(seq, cnt);
    }
    seq = Math.min(3, k, seq);
    if (seq + maxChanges >= k) return Math.max(0, seq-1) + 2*(k-seq);
    let ans = Infinity;
    const n = k - maxChanges, prefix = [0];
    for (const x of ones)
        prefix.push(prefix[prefix.length-1] + x);
    for (let i = 0; i < prefix.length-n; ++i) {
        const cand = (prefix[i+n] - prefix[i+Math.floor((n+1)/2)]) - (prefix[i+Math.floor(n/2)] - prefix[i]);
        ans = Math.min(ans, cand + 2*maxChanges);
    }
    return ans;
};


/*3090. Maximum Length Substring With Two Occurrences (Easy)
Given a string s, return the maximum length of a substring such that it
contains at most two occurrences of each character.

Example 1:
Input: s = "bcbbbcba"
Output: 4
Explanation: The following substring has a length of 4 and contains at most
             two occurrences of each character: "bcbbbcba".

Example 2:
Input: s = "aaaa"
Output: 2
Explanation: The following substring has a length of 2 and contains at most
             two occurrences of each character: "aaaa".

Constraints:
* 2 <= s.length <= 100
* s consists only of lowercase English letters.*/

function maximumLengthSubstring(s: string): number {
    let ans = 0, ii = 0;
    const freq = new Map();
    for (const [i, ch] of s.split('').entries()) {
        freq.set(ch, 1 + (freq.get(ch) ?? 0));
        while (freq.get(ch) == 3) {
            freq.set(s[ii], freq.get(s[ii])-1);
            ++ii;
        }
        ans = Math.max(ans, i-ii+1);
    }
    return ans;
};


/*3091. Apply Operations to Make Sum of Array Greater Than or Equal to k (Medium)
You are given a positive integer k. Initially, you have an array nums = [1].
You can perform any of the following operations on the array any number of
times (possibly zero):
* Choose any element in the array and increase its value by 1.
* Duplicate any element in the array and add it to the end of the array.
Return the minimum number of operations required to make the sum of elements
of the final array greater than or equal to k.

Example 1:
Input: k = 11
Output: 5
Explanation: We can do the following operations on the array nums = [1]:
             * Increase the element by 1 three times. The resulting array is
               nums = [4].
             * Duplicate the element two times. The resulting array is
               nums = [4,4,4].
             The sum of the final array is 4 + 4 + 4 = 12 which is greater
             than or equal to k = 11. The total number of operations
             performed is 3 + 2 = 5.

Example 2:
Input: k = 1
Output: 0
Explanation: The sum of the original array is already greater than or equal
             to 1, so no operations are needed.

Constraints: 1 <= k <= 10^5*/

function minOperations(k: number): number {
    const p = Math.floor(Math.sqrt(k)), q = Math.ceil(k/p);
    return p + q - 2;
};


/*3092. Most Frequent IDs (Medium)
The problem involves tracking the frequency of IDs in a collection that
changes over time. You have two integer arrays, nums and freq, of equal
length n. Each element in nums represents an ID, and the corresponding
element in freq indicates how many times that ID should be added to or
removed from the collection at each step.
* Addition of IDs: If freq[i] is positive, it means freq[i] IDs with the
  value nums[i] are added to the collection at step i.
* Removal of IDs: If freq[i] is negative, it means -freq[i] IDs with the
  value nums[i] are removed from the collection at step i.
Return an array ans of length n, where ans[i] represents the count of the
most frequent ID in the collection after the ith step. If the collection is
empty at any step, ans[i] should be 0 for that step.

Example 1:
Input: nums = [2,3,2,1], freq = [3,2,-3,1]
Output: [3,3,2,2]
Explanation: * After step 0, we have 3 IDs with the value of 2. So
               ans[0] = 3.
             * After step 1, we have 3 IDs with the value of 2 and 2 IDs
               with the value of 3. So ans[1] = 3.
             * After step 2, we have 2 IDs with the value of 3. So
               ans[2] = 2.
             * After step 3, we have 2 IDs with the value of 3 and 1 ID with
               the value of 1. So ans[3] = 2.

Example 2:
Input: nums = [5,5,3], freq = [2,-2,1]
Output: [2,0,1]
Explanation: * After step 0, we have 2 IDs with the value of 5. So
               ans[0] = 2.
             * After step 1, there are no IDs. So ans[1] = 0.
             * After step 2, we have 1 ID with the value of 3. So ans[2] = 1.

Constraints:
* 1 <= nums.length == freq.length <= 10^5
* 1 <= nums[i] <= 10^5
* -10^5 <= freq[i] <= 10^5
* freq[i] != 0
* The input is generated such that the occurrences of an ID will not be
  negative in any step.*/

function mostFrequentIDs(nums: number[], freq: number[]): number[] {
    const cnt = new Map();
    const pq = new PriorityQueue({ compare : (x, y) => y[0]-x[0] });
    const ans = [];
    for (const [i, x] of nums.entries()) {
        const f = freq[i];
        cnt.set(x, f + (cnt.get(x) ?? 0));
        while (pq.size() && cnt.get(pq.front()[1]) != pq.front()[0]) pq.dequeue();
        pq.enqueue([cnt.get(x), x]);
        ans.push(pq.front()[0]);
    }
    return ans;
};


/*3093. Longest Common Suffix Queries (Hard)
You are given two arrays of strings wordsContainer and wordsQuery. For each
wordsQuery[i], you need to find a string from wordsContainer that has the
longest common suffix with wordsQuery[i]. If there are two or more strings
in wordsContainer that share the longest common suffix, find the string that
is the smallest in length. If there are two or more such strings that have
the same smallest length, find the one that occurred earlier in
wordsContainer. Return an array of integers ans, where ans[i] is the index
of the string in wordsContainer that has the longest common suffix with
wordsQuery[i].

Example 1:
Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
Output: [1,1,1]
Explanation: Let's look at each wordsQuery[i] separately:
             - For wordsQuery[0] = "cd", strings from wordsContainer that
               share the longest common suffix "cd" are at indices 0, 1, and
               2. Among these, the answer is the string at index 1 because
               it has the shortest length of 3.
             - For wordsQuery[1] = "bcd", strings from wordsContainer that
               share the longest common suffix "bcd" are at indices 0, 1,
               and 2. Among these, the answer is the string at index 1
               because it has the shortest length of 3.
             - For wordsQuery[2] = "xyz", there is no string from
               wordsContainer that shares a common suffix. Hence the longest
               common suffix is "", that is shared with strings at index 0,
               1, and 2. Among these, the answer is the string at index 1
               because it has the shortest length of 3.

Example 2:
Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]
Output: [2,0,2]
Explanation: Let's look at each wordsQuery[i] separately:
             - For wordsQuery[0] = "gh", strings from wordsContainer that
               share the longest common suffix "gh" are at indices 0, 1, and
               2. Among these, the answer is the string at index 2 because
               it has the shortest length of 6.
             - For wordsQuery[1] = "acbfgh", only the string at index 0
               shares the longest common suffix "fgh". Hence it is the
               answer, even though the string at index 2 is shorter.
             - For wordsQuery[2] = "acbfegh", strings from wordsContainer
               that share the longest common suffix "gh" are at indices 0,
               1, and 2. Among these, the answer is the string at index 2
               because it has the shortest length of 6.

Constraints:
* 1 <= wordsContainer.length, wordsQuery.length <= 10^4
* 1 <= wordsContainer[i].length <= 5 * 10^3
* 1 <= wordsQuery[i].length <= 5 * 10^3
* wordsContainer[i] consists only of lowercase English letters.
* wordsQuery[i] consists only of lowercase English letters.
* Sum of wordsContainer[i].length is at most 5 * 10^5.
* Sum of wordsQuery[i].length is at most 5 * 10^5.*/

function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    const trie = {};
    for (let [i, w] of wordsContainer.entries()) {
        let node = trie;
        w = w.split('').reverse().join('');
        if (!("val" in node) || w.length < node["val"][1])
            node["val"] = [i, w.length];
        for (const ch of w) {
            node = node[ch] ??= {};
            if (!("val" in node) || w.length < node["val"][1])
                node["val"] = [i, w.length];
        }
    }
    const ans = [];
    for (let [i, w] of wordsQuery.entries()) {
        let node = trie;
        w = w.split('').reverse().join('');
        for (const ch of w) {
            if (!(ch in node)) break;
            node = node[ch];
        }
        ans.push(node['val'][0]);
    }
    return ans;
};


/*3099. Harshad Number (Easy)
An integer divisible by the sum of its digits is said to be a Harshad
number. You are given an integer x. Return the sum of the digits of x if x
is a Harshad number, otherwise, return -1.

Example 1:
Input: x = 18
Output: 9
Explanation: The sum of digits of x is 9. 18 is divisible by 9. So 18 is a
             Harshad number and the answer is 9.

Example 2:
Input: x = 23
Output: -1
Explanation: The sum of digits of x is 5. 23 is not divisible by 5. So 23 is
             not a Harshad number and the answer is -1.

Constraints: 1 <= x <= 100*/

function sumOfTheDigitsOfHarshadNumber(x: number): number {
    let val = 0;
    for (let xx = x; xx; xx = Math.floor(xx/10))
        val += xx % 10;
    return x % val == 0 ? val : -1;
};


/*3100. Water Bottles II (Medium)
You are given two integers numBottles and numExchange. numBottles represents
the number of full water bottles that you initially have. In one operation,
you can perform one of the following operations:
* Drink any number of full water bottles turning them into empty bottles.
* Exchange numExchange empty bottles with one full water bottle. Then,
  increase numExchange by one.
Note that you cannot exchange multiple batches of empty bottles for the same
value of numExchange. For example, if numBottles == 3 and numExchange == 1,
you cannot exchange 3 empty water bottles for 3 full bottles. Return the
maximum number of water bottles you can drink.

Example 1:
Input: numBottles = 13, numExchange = 6
Output: 15
Explanation: The table above shows the number of full water bottles, empty
             water bottles, the value of numExchange, and the number of
             bottles drunk.

Example 2:
Input: numBottles = 10, numExchange = 3
Output: 13
Explanation: The table above shows the number of full water bottles, empty
             water bottles, the value of numExchange, and the number of
             bottles drunk.

Constraints:
* 1 <= numBottles <= 100
* 1 <= numExchange <= 100*/

function maxBottlesDrunk(numBottles: number, numExchange: number): number {
    let ans = 0, empty = 0;
    while (numBottles) {
        ans += numBottles;
        empty += numBottles;
        numBottles = 0;
        for (; empty >= numExchange; ++numExchange) {
            empty -= numExchange;
            ++numBottles;
        }
    }
    return ans;
};


/*3101. Count Alternating Subarrays (Medium)
You are given a binary array nums. We call a subarray alternating if no two
adjacent elements in the subarray have the same value. Return the number of
alternating subarrays in nums.

Example 1:
Input: nums = [0,1,1,1]
Output: 5
Explanation: The following subarrays are alternating: [0], [1], [1], [1],
             and [0,1].

Example 2:
Input: nums = [1,0,1,0]
Output: 10
Explanation: Every subarray of the array is alternating. There are 10
             possible subarrays that we can choose.

Constraints:
* 1 <= nums.length <= 10^5
* nums[i] is either 0 or 1.*/

function countAlternatingSubarrays(nums: number[]): number {
    let ans = 0;
    for (let i = 0, cnt = 0; i < nums.length; ++i) {
        if (i && nums[i-1] == nums[i]) cnt = 0;
        ans += ++cnt;
    }
    return ans;
};


/*3102. Minimize Manhattan Distances (Hard)
You are given a 0-indexed array points representing integer coordinates of
some points on a 2D plane, where points[i] = [xi, yi]. The distance between
two points is defined as their Manhattan distance. Return the minimum
possible value for maximum distance between any two points by removing
exactly one point.

Example 1:
Input: points = [[3,10],[5,15],[10,2],[4,4]]
Output: 12
Explanation: The maximum distance after removing each point is the following:
             - After removing the 0th point the maximum distance is between
               points (5, 15) and (10, 2), which is |5 - 10| + |15 - 2| = 18.
             - After removing the 1st point the maximum distance is between
               points (3, 10) and (10, 2), which is |3 - 10| + |10 - 2| = 15.
             - After removing the 2nd point the maximum distance is between
               points (5, 15) and (4, 4), which is |5 - 4| + |15 - 4| = 12.
             - After removing the 3rd point the maximum distance is between
               points (5, 15) and (10, 2), which is |5 - 10| + |15 - 2| = 18.
             It can be seen that 12 is the minimum possible maximum distance
             between any two points after removing exactly one point.

Example 2:
Input: points = [[1,1],[1,1],[1,1]]
Output: 0
Explanation: It can be seen that removing any of the points results in the
             maximum distance between any two points of 0.

Constraints:
* 3 <= points.length <= 10^5
* points[i].length == 2=
* 1 <= points[i][0], points[i][1] <= 10^8*/

function minimumDistance(points: number[][]): number {
    const diff = [[Infinity, -1], [Infinity, -1], [-Infinity, -1], [-Infinity, -1]];
    const summ = [[Infinity, -1], [Infinity, -1], [-Infinity, -1], [-Infinity, -1]];
    for (const [i, [x, y]] of points.entries()) {
        if (x-y <= diff[0][0]) {
            diff[1] = diff[0];
            diff[0] = [x-y, i];
        } else if (x-y < diff[1][0]) diff[1] = [x-y, i];
        if (x-y >= diff[3][0]) {
            diff[2] = diff[3];
            diff[3] = [x-y, i];
        } else if (x-y > diff[2][0]) diff[2] = [x-y, i];
        if (x+y <= summ[0][0]) {
            summ[1] = summ[0];
            summ[0] = [x+y, i];
        } else if (x+y < summ[1][0]) summ[1] = [x+y, i];
        if (x+y >= summ[3][0]) {
            summ[2] = summ[3];
            summ[3] = [x+y, i];
        } else if (x+y > summ[2][0]) summ[2] = [x+y, i];
    }
    let cand = [diff[0][1], diff[3][1]];
    if (diff[3][0] - diff[0][0] < summ[3][0] - summ[0][0])
        cand = [summ[0][1], summ[3][1]];
    let ans = Infinity;
    for (const x of cand) {
        let val = 0;
        if (diff[0][1] == x) val = Math.max(val, diff[3][0] - diff[1][0]);
        else if (diff[3][1] == x) val = Math.max(val, diff[2][0] - diff[0][0]);
        else val = Math.max(val, diff[3][0] - diff[0][0]);
        if (summ[0][1] == x) val = Math.max(val, summ[3][0] - summ[1][0]);
        else if(summ[3][1] == x) val = Math.max(val, summ[2][0] - summ[0][0]);
        else val = Math.max(val, summ[3][0] - summ[0][0]);
        ans = Math.min(ans, val);
    }
    return ans;
};


/*3105. Longest Strictly Increasing or Strictly Decreasing Subarray (Easy)
You are given an array of integers nums. Return the length of the longest
subarray of nums which is either strictly increasing or strictly decreasing.

Example 1:
Input: nums = [1,4,3,3,2]
Output: 2
Explanation: The strictly increasing subarrays of nums are [1], [2], [3],
             [3], [4], and [1,4]. The strictly decreasing subarrays of nums
             are [1], [2], [3], [3], [4], [3,2], and [4,3]. Hence, we return
             2.

Example 2:
Input: nums = [3,3,3,3]
Output: 1
Explanation: The strictly increasing subarrays of nums are [3], [3], [3],
             and [3]. The strictly decreasing subarrays of nums are [3],
             [3], [3], and [3]. Hence, we return 1.

Example 3:
Input: nums = [3,2,1]
Output: 3
Explanation: The strictly increasing subarrays of nums are [3], [2], and
             [1]. The strictly decreasing subarrays of nums are [3], [2],
             [1], [3,2], [2,1], and [3,2,1]. Hence, we return 3.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 50*/

function longestMonotonicSubarray(nums: number[]): number {
    let ans = 0;
    for (let i = 0, val = 0; i < nums.length; ++i) {
        if (i && nums[i-1] == nums[i]) val = 0;
        else if (i >= 2 && (nums[i-2]-nums[i-1])*(nums[i-1]-nums[i]) <= 0) val = 1;
        ans = Math.max(ans, ++val);
    }
    return ans;
};


/*3106. Lexicographically Smallest String After Operations With Constraint (Medium)
You are given a string s and an integer k. Define a function
distance(s1, s2) between two strings s1 and s2 of the same length n as:
* The sum of the minimum distance between s1[i] and s2[i] when the
  characters from 'a' to 'z' are placed in a cyclic order, for all i in the
  range [0, n - 1].
For example, distance("ab", "cd") == 4, and distance("a", "z") == 1. You can
change any letter of s to any other lowercase English letter, any number of
times. Return a string denoting the lexicographically smallest string t you
can get after some changes, such that distance(s, t) <= k.

Example 1:
Input: s = "zbbz", k = 3
Output: "aaaz"
Explanation: Change s to "aaaz". The distance between "zbbz" and "aaaz" is
             equal to k = 3.

Example 2:
Input: s = "xaxcd", k = 4
Output: "aawcd"
Explanation: The distance between "xaxcd" and "aawcd" is equal to k = 4.

Example 3:
Input: s = "lol", k = 0
Output: "lol"
Explanation: It's impossible to change any character as k = 0.

Constraints:
* 1 <= s.length <= 100
* 0 <= k <= 2000
* s consists only of lowercase English letters.*/

function getSmallestString(s: string, k: number): string {
    const ans = s.split('');
    for (let i = 0; i < s.length; ++i) {
        const dist = Math.min(s[i].charCodeAt(0) - 97, 123 - s[i].charCodeAt(0));
        if (dist <= k) ans[i] = 'a';
        else ans[i] = String.fromCharCode(s[i].charCodeAt(0) - k);
        k -= Math.min(k, dist);
    }
    return ans.join('');
};


/*3107. Minimum Operations to Make Median of Array Equal to K (Medium)
You are given an integer array nums and a non-negative integer k. In one
operation, you can increase or decrease any element by 1. Return the minimum
number of operations needed to make the median of nums equal to k. The
median of an array is defined as the middle element of the array when it is
sorted in non-decreasing order. If there are two choices for a median, the
larger of the two values is taken.

Example 1:
Input: nums = [2,5,6,8,5], k = 4
Output: 2
Explanation: We can subtract one from nums[1] and nums[4] to obtain
             [2, 4, 6, 8, 4]. The median of the resulting array is equal to
             k.

Example 2:
Input: nums = [2,5,6,8,5], k = 7
Output: 3
Explanation: We can add one to nums[1] twice and add one to nums[2] once to
             obtain [2, 7, 7, 8, 5].

Example 3:
Input: nums = [1,2,3,4,5,6], k = 4
Output: 0
Explanation: The median of the array is already equal to k.

Constraints:
* 1 <= nums.length <= 2 * 10^5
* 1 <= nums[i] <= 10^9
* 1 <= k <= 10^9*/

function minOperationsToMakeMedianK(nums: number[], k: number): number {
    nums.sort((x, y) => x-y);
    let ans = 0, m = Math.floor(nums.length/2);
    for (const [i, x] of nums.entries())
        if (i < m) ans += Math.max(0, x-k);
        else if (i == m) ans += Math.abs(x-k);
        else ans += Math.max(0, k-x);
    return ans;
};


/*3108. Minimum Cost Walk in Weighted Graph (Hard)
There is an undirected weighted graph with n vertices labeled from 0 to
n - 1. You are given the integer n and an array edges, where
edges[i] = [ui, vi, wi] indicates that there is an edge between vertices ui
and vi with a weight of wi. A walk on a graph is a sequence of vertices and
edges. The walk starts and ends with a vertex, and each edge connects the
vertex that comes before it and the vertex that comes after it. It's
important to note that a walk may visit the same edge or vertex more than
once. The cost of a walk starting at node u and ending at node v is defined
as the bitwise AND of the weights of the edges traversed during the walk. In
other words, if the sequence of edge weights encountered during the walk is
w0, w1, w2, ..., wk, then the cost is calculated as w0 & w1 & w2 & ... & wk,
where & denotes the bitwise AND operator. You are also given a 2D array
query, where query[i] = [si, ti]. For each query, you need to find the
minimum cost of the walk starting at vertex si and ending at vertex ti. If
there exists no such walk, the answer is -1. Return the array answer, where
answer[i] denotes the minimum cost of a walk for query i.

Example 1:
Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]
Output: [1,-1]
Explanation: To achieve the cost of 1 in the first query, we need to move on
             the following edges: 0->1 (weight 7), 1->2 (weight 1),
             2->1 (weight 1), 1->3 (weight 7). In the second query, there is
             no walk between nodes 3 and 4, so the answer is -1.

Example 2:
Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]
Output: [0]
Explanation: To achieve the cost of 0 in the first query, we need to move on
             the following edges: 1->2 (weight 1), 2->1 (weight 6),
             1->2 (weight 1).

Constraints:
* 1 <= n <= 10^5
* 0 <= edges.length <= 10^5
* edges[i].length == 3
* 0 <= ui, vi <= n - 1
* ui != vi
* 0 <= wi <= 10^5
* 1 <= query.length <= 10^5
* query[i].length == 2
* 0 <= si, ti <= n - 1*/

function minimumCost(n: number, edges: number[][], query: number[][]): number[] {

    function find(p) {
        if (parent[p] != p)
            parent[p] = find(parent[p]);
        return parent[p];
    };

    const parent = [...Array(n).keys()], weight = Array(n).fill(-1);
    for (const [u, v, w] of edges) {
        const uu = find(u), vv = find(v);
        if (uu != vv) parent[uu] = vv;
        weight[vv] &= weight[uu] & w;
    }

    const ans = [];
    for (const [u, v] of query) {
        if (u == v) ans.push(0);
        else {
            const uu = find(u), vv = find(v);
            if (uu == vv) ans.push(weight[uu]);
            else ans.push(-1);
        }
    }
    return ans;
};


/*3110. Score of a String (Easy)
You are given a string s. The score of a string is defined as the sum of the
absolute difference between the ASCII values of adjacent characters. Return
the score of s.

Example 1:
Input: s = "hello"
Output: 13
Explanation: The ASCII values of the characters in s are: 'h' = 104,
             'e' = 101, 'l' = 108, 'o' = 111. So, the score of s would be
             |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111|
             = 3 + 7 + 0 + 3 = 13.

Example 2:
Input: s = "zaz"
Output: 50
Explanation: The ASCII values of the characters in s are: 'z' = 122,
             'a' = 97. So, the score of s would be
             |122 - 97| + |97 - 122| = 25 + 25 = 50.

Constraints:
* 2 <= s.length <= 100
* s consists only of lowercase English letters.*/

function scoreOfString(s: string): number {
    let ans = 0;
    for (let i = 1; i < s.length; ++i)
        ans += Math.abs(s[i].charCodeAt(0) - s[i-1].charCodeAt(0));
    return ans;
};


/*3111. Minimum Rectangles to Cover Points (Medium)
You are given a 2D integer array points, where points[i] = [xi, yi]. You are
also given an integer w. Your task is to cover all the given points with
rectangles. Each rectangle has its lower end at some point (x1, 0) and its
upper end at some point (x2, y2), where x1 <= x2, y2 >= 0, and the condition
x2 - x1 <= w must be satisfied for each rectangle. A point is considered
covered by a rectangle if it lies within or on the boundary of the
rectangle. Return an integer denoting the minimum number of rectangles
needed so that each point is covered by at least one rectangle. Note: A
point may be covered by more than one rectangle.

Example 1:
Input: points = [[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], w = 1
Output: 2
Explanation: The image above shows one possible placement of rectangles to
             cover the points:
             - A rectangle with a lower end at (1, 0) and its upper end at
               (2, 8)
             - A rectangle with a lower end at (3, 0) and its upper end at
               (4, 8)

Example 2:
Input: points = [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]], w = 2
Output: 3
Explanation: The image above shows one possible placement of rectangles to
             cover the points:
             - A rectangle with a lower end at (0, 0) and its upper end at
               (2, 2)
             - A rectangle with a lower end at (3, 0) and its upper end at
               (5, 5)
             - A rectangle with a lower end at (6, 0) and its upper end at
               (6, 6)

Example 3:
Input: points = [[2,3],[1,2]], w = 0
Output: 2
Explanation: The image above shows one possible placement of rectangles to
             cover the points:
             - A rectangle with a lower end at (1, 0) and its upper end at
               (1, 2)
             - A rectangle with a lower end at (2, 0) and its upper end at
               (2, 3)

Constraints:
* 1 <= points.length <= 10^5
* points[i].length == 2
* 0 <= xi == points[i][0] <= 10^9
* 0 <= yi == points[i][1] <= 10^9
* 0 <= w <= 10^9
* All pairs (xi, yi) are distinct.*/

function minRectanglesToCoverPoints(points: number[][], w: number): number {
    points.sort((x, y) => (x[0] - y[0]));
    let ans = 0, prev = -Infinity;
    for (const [x, _] of points)
        if (prev + w < x) {
            ++ans;
            prev = x;
        }
    return ans;
};


/*3112. Minimum Time to Visit Disappearing Nodes (Medium)
There is an undirected graph of n nodes. You are given a 2D array edges,
where edges[i] = [ui, vi, lengthi] describes an edge between node ui and
node vi with a traversal time of lengthi units. Additionally, you are given
an array disappear, where disappear[i] denotes the time when the node i
disappears from the graph and you won't be able to visit it. Notice that the
graph might be disconnected and might contain multiple edges. Return the
array answer, with answer[i] denoting the minimum units of time required to
reach node i from node 0. If node i is unreachable from node 0 then
answer[i] is -1.

Example 1:
Input:  n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,1,5]
Output:  [0,-1,4]
Explanation: We are starting our journey from node 0, and our goal is to
             find the minimum time required to reach each node before it
             disappears.
             - For node 0, we don't need any time as it is our starting
               point.
             - For node 1, we need at least 2 units of time to traverse
               edges[0]. Unfortunately, it disappears at that moment, so we
               won't be able to visit it.
             - For node 2, we need at least 4 units of time to traverse
               edges[2].

Example 2:
Input:  n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,3,5]
Output:  [0,2,3]
Explanation: We are starting our journey from node 0, and our goal is to
             find the minimum time required to reach each node before it
             disappears.
             - For node 0, we don't need any time as it is the starting
               point.
             - For node 1, we need at least 2 units of time to traverse
               edges[0].
             - For node 2, we need at least 3 units of time to traverse
               edges[0] and edges[1].

Example 3:
Input: n = 2, edges = [[0,1,1]], disappear = [1,1]
Output: [0,-1]
Explanation: Exactly when we reach node 1, it disappears.

Constraints:
* 1 <= n <= 5 * 10^4
* 0 <= edges.length <= 10^5
* edges[i] == [ui, vi, lengthi]
* 0 <= ui, vi <= n - 1
* 1 <= lengthi <= 10^5
* disappear.length == n
* 1 <= disappear[i] <= 10^5*/

function minimumTime(n: number, edges: number[][], disappear: number[]): number[] {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }
    const pq = new PriorityQueue({compare : (x, y) => x[0] - y[0]});
    pq.enqueue([0, 0]);
    const ans = Array(n).fill(Infinity);
    ans[0] = 0;
    while (pq.size()) {
        const [x, u] = pq.dequeue();
        if (x == ans[u])
            for (const [v, w] of graph[u])
                if (x+w < disappear[v] && x+w < ans[v]) {
                    ans[v] = x+w;
                    pq.enqueue([x+w, v]);
                }
    }
    ans.forEach((x, i) => { if (x == Infinity) ans[i] = -1; });
    return ans;
};


/*3113. Find the Number of Subarrays Where Boundary Elements Are Maximum (Hard)
You are given an array of positive integers nums. Return the number of
subarrays of nums, where the first and the last elements of the subarray are
equal to the largest element in the subarray.

Example 1:
Input: nums = [1,4,3,3,2]
Output: 6
Explanation: There are 6 subarrays which have the first and the last
             elements equal to the largest element of the subarray:
             - subarray [1,4,3,3,2], with its largest element 1. The first
               element is 1 and the last element is also 1.
             - subarray [1,4,3,3,2], with its largest element 4. The first
               element is 4 and the last element is also 4.
             - subarray [1,4,3,3,2], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [1,4,3,3,2], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [1,4,3,3,2], with its largest element 2. The first
               element is 2 and the last element is also 2.
             - subarray [1,4,3,3,2], with its largest element 3. The first
               element is 3 and the last element is also 3.
             Hence, we return 6.

Example 2:
Input: nums = [3,3,3]
Output: 6
Explanation: There are 6 subarrays which have the first and the last
             elements equal to the largest element of the subarray:
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             - subarray [3,3,3], with its largest element 3. The first
               element is 3 and the last element is also 3.
             Hence, we return 6.

Example 3:
Input: nums = [1]
Output: 1
Explanation: There is a single subarray of nums which is [1], with its
             largest element 1. The first element is 1 and the last element
             is also 1. Hence, we return 1.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

function numberOfSubarrays(nums: number[]): number {
    const n = nums.length, dp = Array(n).fill(1), stack = [];
    for (const [i, x] of nums.entries()) {
        while (stack.length && stack[stack.length-1][1] <= x) {
            const [ii, xx] = stack.pop();
            if (xx == x) {
                dp[i] = dp[ii]+1;
                break;
            }
        }
        stack.push([i, x]);
    }
    return dp.reduce((x, y) => x+y);
};


/*3114. Latest Time You Can Obtain After Replacing Characters (Easy)
You are given a string s representing a 12-hour format time where some of
the digits (possibly none) are replaced with a "?". 12-hour times are
formatted as "HH:MM", where HH is between 00 and 11, and MM is between 00
and 59. The earliest 12-hour time is 00:00, and the latest is 11:59. You
have to replace all the "?" characters in s with digits such that the time
we obtain by the resulting string is a valid 12-hour format time and is the
latest possible. Return the resulting string.

Example 1:
Input: s = "1?:?4"
Output: "11:54"
Explanation: The latest 12-hour format time we can achieve by replacing "?"
             characters is "11:54".

Example 2:
Input: s = "0?:5?"
Output: "09:59"
Explanation: The latest 12-hour format time we can achieve by replacing "?"
             characters is "09:59".

Constraints:
* s.length == 5
* s[2] is equal to the character ":".
* All characters except s[2] are digits or "?" characters.
* The input is generated such that there is at least one time between
  "00:00" and "11:59" that you can obtain after replacing the "?"
  characters.*/

function findLatestTime(s: string): string {
    const ch = s.split('');
    if (ch[0] == '?') ch[0] = ch[1] == '?' || ch[1] <= '1' ? '1' : '0';
    if (ch[1] == '?') ch[1] = ch[0] == '1' ? '1' : '9';
    if (ch[3] == '?') ch[3] = '5';
    if (ch[4] == '?') ch[4] = '9';
    return ch.join('');
};


/*3115. Maximum Prime Difference (Medium)
You are given an integer array nums. Return an integer that is the maximum
distance between the indices of two (not necessarily different) prime
numbers in nums.

Example 1:
Input: nums = [4,2,9,5,3]
Output: 3
Explanation: nums[1], nums[3], and nums[4] are prime. So the answer is
             |4 - 1| = 3.

Example 2:
Input: nums = [4,8,2,8]
Output: 0
Explanation: nums[2] is prime. Because there is just one prime number, the
             answer is |2 - 2| = 0.

Constraints:
* 1 <= nums.length <= 3 * 10^5
* 1 <= nums[i] <= 100
* The input is generated such that the number of prime numbers in the nums
  is at least one.*/

function maximumPrimeDifference(nums: number[]): number {
    const sieve = Array(101).fill(true);
    sieve[0] = sieve[1] = false;
    for (let x = 2; x <= 10; ++x)
        if (sieve[x])
            for (let xx = x*x; xx <= 100; xx += x)
                sieve[xx] = false;
    let lo = -1, hi = -1;
    for (const [i, x] of nums.entries())
        if (sieve[x]) {
            if (lo == -1) lo = i;
            hi = i;
        }
    return hi - lo;
};


/*3116. Kth Smallest Amount With Single Denomination Combination (Hard)
You are given an integer array coins representing coins of different
denominations and an integer k. You have an infinite number of coins of each
denomination. However, you are not allowed to combine coins of different
denominations. Return the kth smallest amount that can be made using these
coins.

Example 1:
Input: coins = [3,6,9], k = 3
Output:  9
Explanation: The given coins can make the following amounts:
             Coin 3 produces multiples of 3: 3, 6, 9, 12, 15, etc.
             Coin 6 produces multiples of 6: 6, 12, 18, 24, etc.
             Coin 9 produces multiples of 9: 9, 18, 27, 36, etc.
             All of the coins combined produce: 3, 6, 9, 12, 15, etc.

Example 2:
Input: coins = [5,2], k = 7
Output: 12
Explanation: The given coins can make the following amounts:
             Coin 5 produces multiples of 5: 5, 10, 15, 20, etc.
             Coin 2 produces multiples of 2: 2, 4, 6, 8, 10, 12, etc.
             All of the coins combined produce: 2, 4, 5, 6, 8, 10, 12, 14,
             15, etc.

Constraints:
* 1 <= coins.length <= 15
* 1 <= coins[i] <= 25
* 1 <= k <= 2 * 10^9
* coins contains pairwise distinct integers.*/

function findKthSmallest(coins: number[], k: number): number {
    const n = coins.length;
    const comb = Array(n+1).fill(null).map(() => []);

    let gcd = (x, y) => {
        while (y) [x, y] = [y, x%y]
        return Math.abs(x);
    };

    for (let m = 1; m < 1<<n; ++m) {
        let cnt = 0, v = 1;
        for (let i = 0; i < n; ++i)
            if (m & 1<<i) {
                ++cnt;
                v *= coins[i]/gcd(v, coins[i]);
            }
        comb[cnt].push(v);
    }

    let fn = (val) => {
        let ans = 0;
        for (let i = 1; i <= n; ++i)
            for (const v of comb[i])
                ans -= Math.pow(-1, i)*Math.floor(val/v);
        return ans;
    };

    let lo = 0, hi = k*coins[0];
    while (lo < hi) {
        const mid = lo + Math.floor((hi-lo)/2);
        if (fn(mid) < k) lo = mid + 1;
        else hi = mid;
    }
    return lo;
};


/*3117. Minimum Sum of Values by Dividing Array (Hard)
You are given two arrays nums and andValues of length n and m respectively.
The value of an array is equal to the last element of that array. You have
to divide nums into m disjoint contiguous subarrays such that for the ith
subarray [li, ri], the bitwise AND of the subarray elements is equal to
andValues[i], in other words, nums[li] & nums[li + 1] & ... &
nums[ri] == andValues[i] for all 1 <= i <= m, where & represents the bitwise
AND operator. Return the minimum possible sum of the values of the m
subarrays nums is divided into. If it is not possible to divide nums into m
subarrays satisfying these conditions, return -1.

Example 1:
Input: nums = [1,4,3,3,2], andValues = [0,3,3,2]
Output: 12
Explanation: The only possible way to divide nums is:
             - [1,4] as 1 & 4 == 0.
             - [3] as the bitwise AND of a single element subarray is that
               element itself.
             - [3] as the bitwise AND of a single element subarray is that
               element itself.
             - [2] as the bitwise AND of a single element subarray is that
               element itself.
             - The sum of the values for these subarrays is
               4 + 3 + 3 + 2 = 12.

Example 2:
Input: nums = [2,3,5,7,7,7,5], andValues = [0,7,5]
Output: 17
Explanation: There are three ways to divide nums:
             - [[2,3,5],[7,7,7],[5]] with the sum of the values
               5 + 7 + 5 == 17.
             - [[2,3,5,7],[7,7],[5]] with the sum of the values
               7 + 7 + 5 == 19.
             - [[2,3,5,7,7],[7],[5]] with the sum of the values
               7 + 7 + 5 == 19.
             - The minimum possible sum of the values is 17.

Example 3:
Input: nums = [1,2,3,4], andValues = [2]
Output: -1
Explanation: The bitwise AND of the entire array nums is 0. As there is no
             possible way to divide nums into a single subarray to have the
             bitwise AND of elements 2, return -1.

Constraints:
* 1 <= n == nums.length <= 10^4
* 1 <= m == andValues.length <= min(n, 10)
* 1 <= nums[i] < 10^5
* 0 <= andValues[j] < 10^5*/

function minimumValueSum(nums: number[], andValues: number[]): number {
    const m = nums.length, n = andValues.length;
    const memo = Array(m+1).fill(null).map(() => Array(n+1).fill(null).map(() => new Map()));

    const fn = (i, j, mask) => {
        if (!memo[i][j].has(mask)) {
            let val = 0;
            if (i == m && j == n) val = 0;
            else if (i == m || j == n) val = Infinity;
            else {
                const mm = mask & nums[i];
                if (mm < andValues[j]) val = Infinity;
                else if (mm == andValues[j]) val = Math.min(fn(i+1, j, mm), nums[i] + fn(i+1, j+1, -1));
                else val = fn(i+1, j, mm);
            }
            memo[i][j].set(mask, val);
        }
        return memo[i][j].get(mask);
    };

    const ans = fn(0, 0, -1);
    return ans < Infinity ? ans : -1;
};


/*3120. Count the Number of Special Characters I (Easy)
You are given a string word. A letter is called special if it appears both
in lowercase and uppercase in word. Return the number of special letters in
word.

Example 1:
Input: word = "aaAbcBC"
Output: 3
Explanation: The special characters in word are 'a', 'b', and 'c'.

Example 2:
Input: word = "abc"
Output: 0
Explanation: No character in word appears in uppercase.

Example 3:
Input: word = "abBCab"
Output: 1
Explanation: The only special character in word is 'b'.

Constraints:
* 1 <= word.length <= 50
* word consists of only lowercase and uppercase English letters.*/

function numberOfSpecialChars(word: string): number {
    let lower = 0, upper = 0;
    for (const ch of word) {
        if (ch == ch.toLowerCase()) lower |= 1 << (ch.charCodeAt(0)-97);
        else upper |= 1 << (ch.charCodeAt(0)-65);
    }
    return (lower&upper).toString(2).replace(/0/g, "").length;
};


/*3121. Count the Number of Special Characters II (Medium)
You are given a string word. A letter c is called special if it appears both
in lowercase and uppercase in word, and every lowercase occurrence of c
appears before the first uppercase occurrence of c. Return the number of
special letters in word.

Example 1:
Input: word = "aaAbcBC"
Output: 3
Explanation: The special characters are 'a', 'b', and 'c'.

Example 2:
Input: word = "abc"
Output: 0
Explanation: There are no special characters in word.

Example 3:
Input: word = "AbBCab"
Output: 0
Explanation: There are no special characters in word.

Constraints:
* 1 <= word.length <= 2 * 10^5
* word consists of only lowercase and uppercase English letters.*/

function numberOfSpecialChars(word: string): number {
    let lower = 0, upper = 0;
    for (const ch of word) {
        if (ch == ch.toLowerCase()) {
            lower &= ~(1 << ch.charCodeAt(0)-97);
            lower |= ~upper & 1 << ch.charCodeAt(0)-97;
        } else upper |= 1 << ch.charCodeAt(0)-65;
    }
    return (lower&upper).toString(2).replace(/0/g, "").length;
};


/*3122. Minimum Number of Operations to Satisfy Conditions (Medium)
You are given a 2D matrix grid of size m x n. In one operation, you can
change the value of any cell to any non-negative number. You need to perform
some operations such that each cell grid[i][j] is:
* Equal to the cell below it, i.e. grid[i][j] == grid[i + 1][j] (if it
  exists).
* Different from the cell to its right, i.e. grid[i][j] != grid[i][j + 1]
  (if it exists).
Return the minimum number of operations needed.

Example 1:
Input: grid = [[1,0,2],[1,0,2]]
Output: 0
Explanation: All the cells in the matrix already satisfy the properties.

Example 2:
Input: grid = [[1,1,1],[0,0,0]]
Output: 3
Explanation: The matrix becomes [[1,0,1],[1,0,1]] which satisfies the
             properties, by doing these 3 operations:
             - Change grid[1][0] to 1.
             - Change grid[0][1] to 0.
             - Change grid[1][2] to 1.

Example 3:
Input: grid = [[1],[2],[3]]
Output: 2
Explanation: There is a single column. We can change the value to 1 in each
             cell using 2 operations.

Constraints:
* 1 <= n, m <= 1000
* 0 <= grid[i][j] <= 9*/

function minimumOperations(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const dp = Array(10).fill(null).map(() => Array(n+1).fill(0));
    const vals = Array(10).fill(0).map((x, i) => i);
    for (let j = n-1; j >= 0; --j) {
        const freq = Array(10).fill(0);
        for (let i = 0; i < m; ++i)
            ++freq[grid[i][j]];
        vals.sort((x, y) => dp[x][j+1] - dp[y][j+1]);
        for (let x = 0; x < 10; ++x) {
            dp[x][j] = m - freq[x];
            if (x != vals[0]) dp[x][j] += dp[vals[0]][j+1];
            else dp[x][j] += dp[vals[1]][j+1];
        }
    }
    return dp.reduce((x, y) => x[0] < y[0] ? x : y, [Infinity])[0];
};


/*3123. Find Edges in Shortest Paths (Hard)
You are given an undirected weighted graph of n nodes numbered from 0 to
n - 1. The graph consists of m edges represented by a 2D array edges, where
edges[i] = [ai, bi, wi] indicates that there is an edge between nodes ai and
bi with weight wi. Consider all the shortest paths from node 0 to node n - 1
in the graph. You need to find a boolean array answer where answer[i] is
true if the edge edges[i] is part of at least one shortest path. Otherwise,
answer[i] is false. Return the array answer. Note that the graph may not be
connected.

Example 1:
Input: n = 6, edges = [[0,1,4],[0,2,1],[1,3,2],[1,4,3],[1,5,1],[2,3,1],[3,5,3],[4,5,2]]
Output: [true,true,true,false,true,true,true,false]
Explanation: The following are all the shortest paths between nodes 0 and 5:
             - The path 0 -> 1 -> 5: The sum of weights is 4 + 1 = 5.
             - The path 0 -> 2 -> 3 -> 5: The sum of weights is
               1 + 1 + 3 = 5.
             - The path 0 -> 2 -> 3 -> 1 -> 5: The sum of weights is
               1 + 1 + 2 + 1 = 5.

Example 2:
Input: n = 4, edges = [[2,0,1],[0,1,1],[0,3,4],[3,2,2]]
Output: [true,false,false,true]
Explanation: There is one shortest path between nodes 0 and 3, which is the
             path 0 -> 2 -> 3 with the sum of weights 1 + 2 = 3.

Constraints:
* 2 <= n <= 5 * 10^4
* m == edges.length
* 1 <= m <= min(5 * 10^4, n * (n - 1) / 2)
* 0 <= ai, bi < n
* ai != bi
* 1 <= wi <= 10^5
* There are no repeated edges.*/

function findAnswer(n: number, edges: number[][]): boolean[] {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    let fn = (source) => {
        const dist = Array(n).fill(Infinity);
        dist[source] = 0;
        const pq = new PriorityQueue({ compare : (x, y) => x[0] - y[0] });
        pq.enqueue([0, source]);
        while (pq.size()) {
            const [x, u] = pq.dequeue();
            if (dist[u] == x) {
                for (const [v, w] of graph[u]) {
                    if (x+w < dist[v]) {
                        dist[v] = x+w;
                        pq.enqueue([x+w, v]);
                    }
                }
            }
        }
        return dist;
    };

    const dist0 = fn(0), dist1 = fn(n-1), m = edges.length;
    if (dist0[n-1] == Infinity) return Array(m).fill(false);
    const ans = [];
    for (const [u, v, w] of edges)
        ans.push(dist0[u]+w+dist1[v] == dist0[n-1] || dist1[u]+w+dist0[v] == dist0[n-1]);
    return ans;
};


/*3127. Make a Square with the Same Color (Easy)
You are given a 2D matrix grid of size 3 x 3 consisting only of characters
'B' and 'W'. Character 'W' represents the white color, and character 'B'
represents the black color. Your task is to change the color of at most one
cell so that the matrix has a 2 x 2 square where all cells are of the same
color. Return true if it is possible to create a 2 x 2 square of the same
color, otherwise, return false.

Example 1:
Input: grid = [["B","W","B"],["B","W","W"],["B","W","B"]]
Output: true
Explanation: It can be done by changing the color of the grid[0][2].

Example 2:
Input: grid = [["B","W","B"],["W","B","W"],["B","W","B"]]
Output: false
Explanation: It cannot be done by changing at most one cell.

Example 3:
Input: grid = [["B","W","B"],["B","W","W"],["B","W","W"]]
Output: true
Explanation: The grid already contains a 2 x 2 square of the same color.

Constraints:
* grid.length == 3
* grid[i].length == 3
* grid[i][j] is either 'W' or 'B'.*/

function canMakeSquare(grid: string[][]): boolean {
    const m = grid.length, n = grid[0].length;
    for (let i = 0; i < m-1; ++i)
        for (let j = 0; j < n-1; ++j) {
            const cnt = grid.slice(i, i+2).map(r => r.slice(j, j+2).filter(x => x == 'B').length).reduce((x, y) => x+y, 0);
            if (cnt != 2) return true;
        }
    return false;
};


/*3128. Right Triangles (Medium)
You are given a 2D boolean matrix grid. Return an integer that is the number
of right triangles that can be made with the 3 elements of grid such that
all of them have a value of 1. Note: A collection of 3 elements of grid is a
right triangle if one of its elements is in the same row with another
element and in the same column with the third element. The 3 elements do not
have to be next to each other.

Example 1: 0   1   0
           0   1   1
           0   1   0
           0   1   0
           0   1   1
           0   1   0
Input: grid = [[0,1,0],[0,1,1],[0,1,0]]
Output: 2
Explanation: There are two right triangles.

Example 2: 1   0   0   0
           0   1   0   1
           1   0   0   0
Input: grid = [[1,0,0,0],[0,1,0,1],[1,0,0,0]]
Output: 0
Explanation: There are no right triangles.

Example 3: 1   0   1
           1   0   0
           1   0   0
           1   0   1
           1   0   0
           1   0   0
Input: grid = [[1,0,1],[1,0,0],[1,0,0]]
Output: 2
Explanation: There are two right triangles.

Constraints:
* 1 <= grid.length <= 1000
* 1 <= grid[i].length <= 1000
* 0 <= grid[i][j] <= 1*/

function numberOfRightTriangles(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const rows = Array(m).fill(0), cols = Array(n).fill(0);
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j]) {
                ++rows[i];
                ++cols[j];
            }
    let ans = 0;
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j])
                ans += (rows[i]-1)*(cols[j]-1);
    return ans;
};


/*3129. Find All Possible Stable Binary Arrays I (Medium)
You are given 3 positive integers zero, one, and limit. A binary array arr
is called stable if:
* The number of occurrences of 0 in arr is exactly zero.
* The number of occurrences of 1 in arr is exactly one.
* Each subarray of arr with a size greater than limit must contain both 0
  and 1.
Return the total number of stable binary arrays. Since the answer may be
very large, return it modulo 10^9 + 7.

Example 1:
Input: zero = 1, one = 1, limit = 2
Output: 2
Explanation: The two possible stable binary arrays are [1,0] and [0,1], as
             both arrays have a single 0 and a single 1, and no subarray has
             a length greater than 2.

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation: The only possible stable binary array is [1,0,1]. Note that the
             binary arrays [1,1,0] and [0,1,1] have subarrays of length 2
             with identical elements, hence, they are not stable.

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14
Explanation: All the possible stable binary arrays are [0,0,1,0,1,1],
             [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0],
             [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0],
             [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and
             [1,1,0,1,0,0].

Constraints: 1 <= zero, one, limit <= 200*/

function numberOfStableArrays(zero: number, one: number, limit: number): number {
    const mod = 1_000_000_007;
    const dp = Array(zero+1).fill(0).map(() => Array(one+1).fill(0).map(() => Array(2).fill(0)));
    for (let i = 1; i <= zero && i <= limit; ++i) dp[i][0][0] = 1;
    for (let j = 1; j <= one && j <= limit; ++j) dp[0][j][1] = 1;
    for (let i = 1; i <= zero; ++i)
        for (let j = 1; j <= one; ++j) {
            dp[i][j][0] = (dp[i-1][j][1] + dp[i-1][j][0]) % mod;
            if (i-1-limit >= 0) dp[i][j][0] = ((dp[i][j][0] - dp[i-1-limit][j][1]) % mod + mod) % mod;
            dp[i][j][1] = (dp[i][j-1][0] + dp[i][j-1][1]) % mod;
            if (j-1-limit >= 0) dp[i][j][1] = ((dp[i][j][1] - dp[i][j-1-limit][0]) % mod + mod) % mod;
        }
    return (dp[zero][one][0] + dp[zero][one][1]) % mod;
};


/*3130. Find All Possible Stable Binary Arrays II (Hard)
You are given 3 positive integers zero, one, and limit. A binary array arr
is called stable if:
* The number of occurrences of 0 in arr is exactly zero.
* The number of occurrences of 1 in arr is exactly one.
* Each subarray of arr with a size greater than limit must contain both 0
  and 1.
Return the total number of stable binary arrays. Since the answer may be
very large, return it modulo 10^9 + 7.

Example 1:
Input: zero = 1, one = 1, limit = 2
Output: 2
Explanation: The two possible stable binary arrays are [1,0] and [0,1].

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation: The only possible stable binary array is [1,0,1].

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14
Explanation: All the possible stable binary arrays are [0,0,1,0,1,1],
             [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0],
             [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0],
             [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and
             [1,1,0,1,0,0].

Constraints: 1 <= zero, one, limit <= 1000*/

function numberOfStableArrays(zero: number, one: number, limit: number): number {
    const mod = 1_000_000_007;
    const dp = Array(zero+1).fill(0).map(() => Array(one+1).fill(0).map(() => Array(2).fill(0)));
    for (let i = 1; i <= zero && i <= limit; ++i) dp[i][0][0] = 1;
    for (let j = 1; j <= one && j <= limit; ++j) dp[0][j][1] = 1;
    for (let i = 1; i <= zero; ++i)
        for (let j = 1; j <= one; ++j) {
            dp[i][j][0] = (dp[i-1][j][1] + dp[i-1][j][0]) % mod;
            if (i-1-limit >= 0) dp[i][j][0] = ((dp[i][j][0] - dp[i-1-limit][j][1]) % mod + mod) % mod;
            dp[i][j][1] = (dp[i][j-1][0] + dp[i][j-1][1]) % mod;
            if (j-1-limit >= 0) dp[i][j][1] = ((dp[i][j][1] - dp[i][j-1-limit][0]) % mod + mod) % mod;
        }
    return (dp[zero][one][0] + dp[zero][one][1]) % mod;
};


/*3131. Find the Integer Added to Array I (Easy)
You are given two arrays of equal length, nums1 and nums2. Each element in
nums1 has been increased (or decreased in the case of negative) by an
integer, represented by the variable x. As a result, nums1 becomes equal to
nums2. Two arrays are considered equal when they contain the same integers
with the same frequencies. Return the integer x.

Example 1:
Input: nums1 = [2,6,4], nums2 = [9,7,5]
Output: 3
Explanation: The integer added to each element of nums1 is 3.

Example 2:
Input: nums1 = [10], nums2 = [5]
Output: -5
Explanation: The integer added to each element of nums1 is -5.

Example 3:
Input: nums1 = [1,1,1,1], nums2 = [1,1,1,1]
Output: 0
Explanation: The integer added to each element of nums1 is 0.

Constraints:
* 1 <= nums1.length == nums2.length <= 100
* 0 <= nums1[i], nums2[i] <= 1000
* The test cases are generated in a way that there is an integer x such that
  nums1 can become equal to nums2 by adding x to each element of nums1.*/

function addedInteger(nums1: number[], nums2: number[]): number {
    return Math.min(...nums2) - Math.min(...nums1);
};


/*3132. Find the Integer Added to Array II (Medium)
You are given two integer arrays nums1 and nums2. From nums1 two elements
have been removed, and all other elements have been increased (or decreased
in the case of negative) by an integer, represented by the variable x. As a
result, nums1 becomes equal to nums2. Two arrays are considered equal when
they contain the same integers with the same frequencies. Return the minimum
possible integer x that achieves this equivalence.

Example 1:
Input: nums1 = [4,20,16,12,8], nums2 = [14,18,10]
Output: -2
Explanation: After removing elements at indices [0,4] and adding -2, nums1
             becomes [18,14,10].

Example 2:
Input: nums1 = [3,5,5,3], nums2 = [7,7]
Output: 2
Explanation: After removing elements at indices [0,3] and adding 2, nums1
             becomes [7,7].

Constraints:
* 3 <= nums1.length <= 200
* nums2.length == nums1.length - 2
* 0 <= nums1[i], nums2[i] <= 1000
* The test cases are generated in a way that there is an integer x such that
  nums1 can become equal to nums2 by removing two elements and adding x to
  each element of nums1.*/

function minimumAddedInteger(nums1: number[], nums2: number[]): number {
    nums1.sort((x, y) => x-y);
    nums2.sort((x, y) => x-y);
    let ans = Infinity;
    for (let x = 0, n = nums1.length; x < n; ++x)
        for (let y = x+1; y < n; ++y) {
            let found = false, seen = null;
            for (let i = 0, j = 0; i < n; ++i) {
                if (i != x && i != y) {
                    const diff = nums2[j] - nums1[i];
                    if (seen == null) seen = diff;
                    else if (seen != diff) {
                        found = true;
                        break;
                    }
                    ++j;
                }
            }
            if (!found) ans = Math.min(ans, seen);
        }
    return ans;
};


/*3133. Minimum Array End (Medium)
You are given two integers n and x. You have to construct an array of
positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1]
is greater than nums[i], and the result of the bitwise AND operation between
all elements of nums is x. Return the minimum possible value of nums[n - 1].

Example 1:
Input: n = 3, x = 4
Output: 6
Explanation: nums can be [4,5,6] and its last element is 6.

Example 2:
Input: n = 2, x = 7
Output: 15
Explanation: nums can be [7,15] and its last element is 15.

Constraints: 1 <= n, x <= 10^8*/

function minEnd(n: number, x: number): number {
    --n;
    let ans = BigInt(x);
    for (let i = 0n; n; ++i)
        if ((ans & 1n<<i) == 0n) {
            if (n & 1) ans ^= 1n << i;
            n >>= 1;
        }
    return Number(ans);
};


/*3134. Find the Median of the Uniqueness Array (Hard)
You are given an integer array nums. The uniqueness array of nums is the
sorted array that contains the number of distinct elements of all the
subarrays of nums. In other words, it is a sorted array consisting of
distinct(nums[i..j]), for all 0 <= i <= j < nums.length. Here,
distinct(nums[i..j]) denotes the number of distinct elements in the subarray
that starts at index i and ends at index j. Return the median of the
uniqueness array of nums. Note that the median of an array is defined as the
middle element of the array when it is sorted in non-decreasing order. If
there are two choices for a median, the smaller of the two values is taken.

Example 1:
Input: nums = [1,2,3]
Output: 1
Explanation: The uniqueness array of nums is [distinct(nums[0..0]),
             distinct(nums[1..1]), distinct(nums[2..2]),
             distinct(nums[0..1]), distinct(nums[1..2]),
             distinct(nums[0..2])] which is equal to [1, 1, 1, 2, 2, 3]. The
             uniqueness array has a median of 1. Therefore, the answer is 1.

Example 2:
Input: nums = [3,4,3,4,5]
Output: 2
Explanation: The uniqueness array of nums is
             [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3]. The uniqueness
             array has a median of 2. Therefore, the answer is 2.

Example 3:
Input: nums = [4,3,5,4]
Output: 2
Explanation: The uniqueness array of nums is [1, 1, 1, 1, 2, 2, 2, 3, 3, 3].
             The uniqueness array has a median of 2. Therefore, the answer
             is 2.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5*/

function medianOfUniquenessArray(nums: number[]): number {
    const n = nums.length;
    let lo = 0, hi = n;
    while (lo < hi) {
        const mid = lo + Math.floor((hi-lo)/2);
        let val = 0, ii = 0;
        const freq = new Map();
        for (const [i, x] of nums.entries()) {
            freq.set(x, 1+(freq.get(x)??0));
            for (; freq.size > mid; ++ii) {
                freq.set(nums[ii], freq.get(nums[ii])-1);
                if (freq.get(nums[ii]) == 0) freq.delete(nums[ii]);
            }
            val += i-ii+1;
        }
        if (val < Math.floor((n*(n+1)/2+1)/2)) lo = mid+1;
        else hi = mid;
    }
    return lo;
};


/*3146. Permutation Difference between Two Strings (Easy)
You are given two strings s and t such that every character occurs at most
once in s and t is a permutation of s. The permutation difference between s
and t is defined as the sum of the absolute difference between the index of
the occurrence of each character in s and the index of the occurrence of the
same character in t. Return the permutation difference between s and t.

Example 1:
Input: s = "abc", t = "bac"
Output: 2
Explanation: For s = "abc" and t = "bac", the permutation difference of s
             and t is equal to the sum of:
             - The absolute difference between the index of the occurrence
               of "a" in s and the index of the occurrence of "a" in t.
             - The absolute difference between the index of the occurrence
               of "b" in s and the index of the occurrence of "b" in t.
             - The absolute difference between the index of the occurrence
               of "c" in s and the index of the occurrence of "c" in t.
             - That is, the permutation difference between s and t is equal
               to |0 - 1| + |1 - 0| + |2 - 2| = 2.

Example 2:
Input: s = "abcde", t = "edbac"
Output: 12
Explanation: The permutation difference between s and t is equal to
             |0 - 3| + |1 - 2| + |2 - 4| + |3 - 1| + |4 - 0| = 12.

Constraints:
* 1 <= s.length <= 26
* Each character occurs at most once in s.
* t is a permutation of s.
* s consists only of lowercase English letters.*/

function findPermutationDifference(s: string, t: string): number {
    const loc = Array(26).fill(-1);
    for (const [i, ch] of s.split('').entries())
        loc[ch.charCodeAt(0) - 97] = i;
    let ans = 0;
    for (const [i, ch] of t.split('').entries())
        ans += Math.abs(i - loc[ch.charCodeAt(0) - 97]);
    return ans;
};


/*3147. Taking Maximum Energy From the Mystic Dungeon (Medium)
In a mystic dungeon, n magicians are standing in a line. Each magician has
an attribute that gives you energy. Some magicians can give you negative
energy, which means taking energy from you. You have been cursed in such a
way that after absorbing energy from magician i, you will be instantly
transported to magician (i + k). This process will be repeated until you
reach the magician where (i + k) does not exist. In other words, you will
choose a starting point and then teleport with k jumps until you reach the
end of the magicians' sequence, absorbing all the energy during the journey.
You are given an array energy and an integer k. Return the maximum possible
energy you can gain.

Example 1:
Input:  energy = [5,2,-10,-5,1], k = 3
Output: 3
Explanation: We can gain a total energy of 3 by starting from magician 1
             absorbing 2 + 1 = 3.

Example 2:
Input: energy = [-2,-3,-1], k = 2
Output: -1
Explanation: We can gain a total energy of -1 by starting from magician 2.

Constraints:
* 1 <= energy.length <= 10^5
* -1000 <= energy[i] <= 1000
* 1 <= k <= energy.length - 1*/

function maximumEnergy(energy: number[], k: number): number {
    const dp = Array(k).fill(-Infinity);
    for (const [i, x] of energy.entries())
        dp[i%k] = Math.max(0, dp[i%k]) + x;
    return Math.max(...dp);
};


/*3148. Maximum Difference Score in a Grid (Medium)
You are given an m x n matrix grid consisting of positive integers. You can
move from a cell in the matrix to any other cell that is either to the
bottom or to the right (not necessarily adjacent). The score of a move from
a cell with the value c1 to a cell with the value c2 is c2 - c1. You can
start at any cell, and you have to make at least one move. Return the
maximum total score you can achieve.

Example 1:
Input: grid = [[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]
Output: 9
Explanation: We start at the cell (0, 1), and we perform the following moves:
             - Move from the cell (0, 1) to (2, 1) with a score of 7 - 5 = 2.
             - Move from the cell (2, 1) to (2, 2) with a score of 14 - 7 = 7.
             The total score is 2 + 7 = 9.

Example 2:
Input: grid = [[4,3,2],[3,2,1]]
Output: -1
Explanation: We start at the cell (0, 0), and we perform one move: (0, 0) to
             (0, 1). The score is 3 - 4 = -1.

Constraints:
* m == grid.length
* n == grid[i].length
* 2 <= m, n <= 1000
* 4 <= m * n <= 10^5
* 1 <= grid[i][j] <= 10^5*/

function maxScore(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    let ans = -Infinity;
    const prefix = Array(m+1).fill(null).map(() => Array(n+1).fill(Infinity));
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j) {
            const val = Math.min(prefix[i+1][j], prefix[i][j+1]);
            ans = Math.max(ans, grid[i][j] - val);
            prefix[i+1][j+1] = Math.min(grid[i][j], val);
        }
    return ans;
};


/*3149. Find the Minimum Cost Array Permutation (Hard)
You are given an array nums which is a permutation of [0, 1, 2, ..., n - 1].
The score of any permutation of [0, 1, 2, ..., n - 1] named perm is defined
as:
* score(perm) = |perm[0] - nums[perm[1]]| + |perm[1] - nums[perm[2]]| + ...
  + |perm[n - 1] - nums[perm[0]]|
Return the permutation perm which has the minimum possible score. If
multiple permutations exist with this score, return the one that is
lexicographically smallest among them.

Example 1:
Input: nums = [1,0,2]
Output: [0,1,2]
Explanation: The lexicographically smallest permutation with minimum cost is
             [0,1,2]. The cost of this permutation is
             |0 - 0| + |1 - 2| + |2 - 1| = 2.

Example 2:
Input: nums = [0,2,1]
Output: [0,2,1]
Explanation: The lexicographically smallest permutation with minimum cost is
             [0,2,1]. The cost of this permutation is
             |0 - 1| + |2 - 2| + |1 - 0| = 2.

Constraints:
* 2 <= n == nums.length <= 14
* nums is a permutation of [0, 1, 2, ..., n - 1].*/

function findPermutation(nums: number[]): number[] {
    const n = nums.length;
    const dp = Array(1<<n).fill(0).map(() => Array(n).fill(Infinity));
    const jump = Array(1<<n).fill(0).map(() => Array(n).fill(0));
    for (let m = (1<<n)-1; m; --m) {
        let i = 0;
        for (let mm = m; mm; mm &= mm-1, ++i);
        for (let p = 0; p < n; ++p)
            if (i == n) dp[m][p] = Math.abs(p - nums[0]);
            else
                for (let k = 0; k < n; ++k)
                    if ((m & 1<<k) == 0) {
                        const cand = Math.abs(p - nums[k]) + dp[m^1<<k][k];
                        if (cand < dp[m][p]) {
                            dp[m][p] = cand;
                            jump[m][p] = k;
                        }
                    }
    }
    const ans = [0];
    for (let i = 1, m = 1; i < n; ++i) {
        const k = jump[m][ans[i-1]];
        ans.push(k);
        m ^= 1<<k;
    }
    return ans;
};


/*3151. Special Array I (Easy)
An array is considered special if every pair of its adjacent elements
contains two numbers with different parity. You are given an array of
integers nums. Return true if nums is a special array, otherwise, return
false.

Example 1:
Input: nums = [1]
Output: true
Explanation: There is only one element. So the answer is true.

Example 2:
Input: nums = [2,1,4]
Output: true
Explanation: There is only two pairs: (2,1) and (1,4), and both of them
             contain numbers with different parity. So the answer is true.

Example 3:
Input: nums = [4,3,1,6]
Output: false
Explanation: nums[1] and nums[2] are both odd. So the answer is false.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100*/

function isArraySpecial(nums: number[]): boolean {
    return nums.reduce((acc, x, i) => acc && (x-nums[i-1])%2);
};


/*3152. Special Array II (Medium)
An array is considered special if every pair of its adjacent elements
contains two numbers with different parity. You are given an array of
integer nums and a 2D integer matrix queries, where for
queries[i] = [fromi, toi] your task is to check that subarray
nums[fromi..toi] is special or not. Return an array of booleans answer such
that answer[i] is true if nums[fromi..toi] is special.

Example 1:
Input: nums = [3,4,1,2,6], queries = [[0,4]]
Output: [false]
Explanation: The subarray is [3,4,1,2,6]. 2 and 6 are both even.

Example 2:
Input: nums = [4,3,1,6], queries = [[0,2],[2,3]]
Output: [false,true]
Explanation: The subarray is [4,3,1]. 3 and 1 are both odd. So the answer to
             this query is false. The subarray is [1,6]. There is only one
             pair: (1,6) and it contains numbers with different parity. So
             the answer to this query is true.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5
* 1 <= queries.length <= 10^5
* queries[i].length == 2
* 0 <= queries[i][0] <= queries[i][1] <= nums.length - 1*/

function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
    const dp = [];
    for (let i = 0, v = 0; i < nums.length; ++i) {
        if (i && (nums[i-1]-nums[i]) % 2 == 0) v = i;
        dp.push(v);
    }
    return queries.map(([lo, hi]) => lo >= dp[hi]);
};


/*3153. Sum of Digit Differences of All Pairs (Medium)
You are given an array nums consisting of positive integers where all
integers have the same number of digits. The digit difference between two
integers is the count of different digits that are in the same position in
the two integers. Return the sum of the digit differences between all pairs
of integers in nums.

Example 1:
Input: nums = [13,23,12]
Output: 4
Explanation: We have the following:
             - The digit difference between 13 and 23 is 1.
             - The digit difference between 13 and 12 is 1.
             - The digit difference between 23 and 12 is 2.
             So the total sum of digit differences between all pairs of
             integers is 1 + 1 + 2 = 4.

Example 2:
Input: nums = [10,10,10,10]
Output: 0
Explanation: All the integers in the array are the same. So the total sum of
             digit differences between all pairs of integers will be 0.

Constraints:
* 2 <= nums.length <= 10^5
* 1 <= nums[i] < 10^9
* All integers in nums have the same number of digits.*/

function sumDigitDifferences(nums: number[]): number {
    let ans = 0;
    for (let n = nums.length; nums[0]; ) {
        const freq = Array(10).fill(0);
        for (let i = 0; i < n; ++i) {
            ++freq[nums[i] % 10];
            nums[i] = Math.floor(nums[i]/10);
        }
        ans += freq.reduce((x, y) => x + y*(n-y), 0);
    }
    return ans/2;
};


/*3154. Find Number of Ways to Reach the K-th Stair (Hard)
You are given a non-negative integer k. There exists a staircase with an
infinite number of stairs, with the lowest stair numbered 0. Alice has an
integer jump, with an initial value of 0. She starts on stair 1 and wants to
reach stair k using any number of operations. If she is on stair i, in one
operation she can:
* Go down to stair i - 1. This operation cannot be used consecutively or on
  stair 0.
* Go up to stair i + 2jump. And then, jump becomes jump + 1.
Return the total number of ways Alice can reach stair k. Note that it is
possible that Alice reaches the stair k, and performs some operations to
reach the stair k again.

Example 1:
Input: k = 0
Output: 2
Explanation: The 2 possible ways of reaching stair 0 are:
             - Alice starts at stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.
             - Alice starts at stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.
             - Using an operation of the second type, she goes up 20 stairs
               to reach stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.

Example 2:
Input: k = 1
Output: 4
Explanation: The 4 possible ways of reaching stair 1 are:
             - Alice starts at stair 1. Alice is at stair 1.
             - Alice starts at stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.
             - Using an operation of the second type, she goes up 20 stairs
               to reach stair 1.
             - Alice starts at stair 1.
             - Using an operation of the second type, she goes up 20 stairs
               to reach stair 2.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 1.
             - Alice starts at stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.
             - Using an operation of the second type, she goes up 20 stairs
               to reach stair 1.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 0.
             - Using an operation of the second type, she goes up 21 stairs
               to reach stair 2.
             - Using an operation of the first type, she goes down 1 stair
               to reach stair 1.

Constraints: 0 <= k <= 10^9*/

function waysToReachStair(k: number): number {
    let ans = 0;
    for (let jump = 0; jump <= 30; ++jump) {
        let n = 1+jump, v = (1<<jump)-k;
        v = Math.min(v, n-v);
        if (v >= 0) {
            let val = 1;
            for (let i = 0; i < v; ++i) {
                val *= n-i;
                val /= i+1;
            }
            ans += val;
        }
    }
    return ans;
};


/*3158. Find the XOR of Numbers Which Appear Twice (Easy)
You are given an array nums, where each number in the array appears either
once or twice. Return the bitwise XOR of all the numbers that appear twice
in the array, or 0 if no number appears twice.

Example 1:
Input: nums = [1,2,1,3]
Output: 1
Explanation: The only number that appears twice in nums is 1.

Example 2:
Input: nums = [1,2,3]
Output: 0
Explanation: No number appears twice in nums.

Example 3:
Input: nums = [1,2,2,1]
Output: 3
Explanation: Numbers 1 and 2 appeared twice. 1 XOR 2 == 3.

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 50
* Each number in nums appears either once or twice.*/

function duplicateNumbersXOR(nums: number[]): number {
    let ans = 0, seen = 0n;
    for (const x of nums) {
        if (seen & 1n<<BigInt(x)) ans ^= x;
        seen ^= 1n<<BigInt(x);
    }
    return ans;
};


/*3159. Find Occurrences of an Element in an Array (Medium)
You are given an integer array nums, an integer array queries, and an
integer x. For each queries[i], you need to find the index of the
queries[i]th occurrence of x in the nums array. If there are fewer than
queries[i] occurrences of x, the answer should be -1 for that query. Return
an integer array answer containing the answers to all queries.

Example 1:
Input: nums = [1,3,1,7], queries = [1,3,2,4], x = 1
Output: [0,-1,2,-1]
Explanation: - For the 1st query, the first occurrence of 1 is at index 0.
             - For the 2nd query, there are only two occurrences of 1 in
               nums, so the answer is -1.
             - For the 3rd query, the second occurrence of 1 is at index 2.
             - For the 4th query, there are only two occurrences of 1 in
               nums, so the answer is -1.

Example 2:
Input: nums = [1,2,3], queries = [10], x = 5
Output: [-1]
Explanation: For the 1st query, 5 doesn't exist in nums, so the answer is -1.

Constraints:
* 1 <= nums.length, queries.length <= 10^5
* 1 <= queries[i] <= 10^5
* 1 <= nums[i], x <= 10^4*/

function occurrencesOfElement(nums: number[], queries: number[], x: number): number[] {
    const loc = nums.map((v, i) => v == x ? i : -1).filter(x => x >= 0);
    return queries.map(q => q <= loc.length ? loc[q-1] : -1);
};


/*3160. Find the Number of Distinct Colors Among the Balls (Medium)
You are given an integer limit and a 2D array queries of size n x 2. There
are limit + 1 balls with distinct labels in the range [0, limit]. Initially,
all balls are uncolored. For every query in queries that is of the form
[x, y], you mark ball x with the color y. After each query, you need to find
the number of distinct colors among the balls. Return an array result of
length n, where result[i] denotes the number of distinct colors after ith
query. Note that when answering a query, lack of a color will not be
considered as a color.

Example 1:
Input: limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]
Output: [1,2,2,3]
Explanation: - After query 0, ball 1 has color 4.
             - After query 1, ball 1 has color 4, and ball 2 has color 5.
             - After query 2, ball 1 has color 3, and ball 2 has color 5.
             - After query 3, ball 1 has color 3, ball 2 has color 5, and
               ball 3 has color 4.

Example 2:
Input: limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]
Output: [1,2,2,3,4]
Explanation: - After query 0, ball 0 has color 1.
             - After query 1, ball 0 has color 1, and ball 1 has color 2.
             - After query 2, ball 0 has color 1, and balls 1 and 2 have
               color 2.
             - After query 3, ball 0 has color 1, balls 1 and 2 have color
               2, and ball 3 has color 4.
             - After query 4, ball 0 has color 1, balls 1 and 2 have color
               2, ball 3 has color 4, and ball 4 has color 5.

Constraints:
* 1 <= limit <= 10^9
* 1 <= n == queries.length <= 10^5
* queries[i].length == 2
* 0 <= queries[i][0] <= limit
* 1 <= queries[i][1] <= 10^9*/

function queryResults(limit: number, queries: number[][]): number[] {
    const ans = [], mp = new Map(), freq = new Map();
    for (const [b, c] of queries) {
        if (mp[b]) {
            freq.set(mp[b], freq.get(mp[b])-1);
            if (freq.get(mp[b]) == 0) freq.delete(mp[b]);
        }
        mp[b] = c;
        freq.set(c, (freq.get(c) ?? 0) + 1);
        ans.push(freq.size);
    }
    return ans;
};


/*3161. Block Placement Queries (Hard）
There exists an infinite number line, with its origin at 0 and extending
towards the positive x-axis. You are given a 2D array queries, which
contains two types of queries:
* For a query of type 1, queries[i] = [1, x]. Build an obstacle at distance
  x from the origin. It is guaranteed that there is no obstacle at distance
  x when the query is asked.
* For a query of type 2, queries[i] = [2, x, sz]. Check if it is possible to
  place a block of size sz anywhere in the range [0, x] on the line, such
  that the block entirely lies in the range [0, x]. A block cannot be placed
  if it intersects with any obstacle, but it may touch it. Note that you do
  not actually place the block. Queries are separate.
Return a boolean array results, where results[i] is true if you can place
the block specified in the ith query of type 2, and false otherwise.

Example 1:
Input: queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]
Output: [false,true,true]
Explanation: For query 0, place an obstacle at x = 2. A block of size at
             most 2 can be placed before x = 3.

Example 2:
Input: queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]
Output: [true,true,false]
Explanation: - Place an obstacle at x = 7 for query 0. A block of size at
               most 7 can be placed before x = 7.
             - Place an obstacle at x = 2 for query 2. Now, a block of size
               at most 5 can be placed before x = 7, and a block of size at
               most 2 before x = 2.

Constraints:
* 1 <= queries.length <= 15 * 10^4
* 2 <= queries[i].length <= 3
* 1 <= queries[i][0] <= 2
* 1 <= x, sz <= min(5 * 104, 3 * queries.length)
* The input is generated such that for queries of type 1, no obstacle exists
  at distance x when the query is asked.
* The input is generated such that there is at least one query of type 2.*/


/*3162. Find the Number of Good Pairs I (Easy)
You are given 2 integer arrays nums1 and nums2 of lengths n and m
respectively. You are also given a positive integer k. A pair (i, j) is
called good if nums1[i] is divisible by nums2[j] * k (0 <= i <= n - 1,
0 <= j <= m - 1). Return the total number of good pairs.

Example 1:
Input: nums1 = [1,3,4], nums2 = [1,3,4], k = 1
Output: 5
Explanation: The 5 good pairs are (0, 0), (1, 0), (1, 1), (2, 0), and (2, 2).

Example 2:
Input: nums1 = [1,2,4,12], nums2 = [2,4], k = 3
Output: 2
Explanation: The 2 good pairs are (3, 0) and (3, 1).

Constraints:
* 1 <= n, m <= 50
* 1 <= nums1[i], nums2[j] <= 50
* 1 <= k <= 50*/

function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
    let ans = 0;
    for (const x of nums1)
        for (const y of nums2)
            if (x % (y*k) == 0) ++ans;
    return ans;
};


/*3163. String Compression III (Medium)
Given a string word, compress it using the following algorithm:
* Begin with an empty string comp. While word is not empty, use the
  following operation:
  - Remove a maximum length prefix of word made of a single character c
    repeating at most 9 times.
  - Append the length of the prefix followed by c to comp.
Return the string comp.

Example 1:
Input: word = "abcde"
Output: "1a1b1c1d1e"
Explanation: Initially, comp = "". Apply the operation 5 times, choosing
             "a", "b", "c", "d", and "e" as the prefix in each operation.
             For each prefix, append "1" followed by the character to comp.

Example 2:
Input: word = "aaaaaaaaaaaaaabb"
Output: "9a5a2b"
Explanation: Initially, comp = "". Apply the operation 3 times, choosing
             "aaaaaaaaa", "aaaaa", and "bb" as the prefix in each operation.
             - For prefix "aaaaaaaaa", append "9" followed by "a" to comp.
             - For prefix "aaaaa", append "5" followed by "a" to comp.
             - For prefix "bb", append "2" followed by "b" to comp.

Constraints:
* 1 <= word.length <= 2 * 10^5
* word consists only of lowercase English letters.*/

function compressedString(word: string): string {
    const ans = [];
    for (let i = 0, ii = 0, n = word.length; i < n; ++i)
        if (i == n-1 || word[i] != word[i+1] || i-ii+1 == 9) {
            ans.push(String.fromCharCode(48+i-ii+1));
            ans.push(word[i]);
            ii = i+1;
        }
    return ans.join('');
};


/*3164. Find the Number of Good Pairs II (Medium)
You are given 2 integer arrays nums1 and nums2 of lengths n and m
respectively. You are also given a positive integer k. A pair (i, j) is
called good if nums1[i] is divisible by nums2[j] * k (0 <= i <= n - 1,
0 <= j <= m - 1). Return the total number of good pairs.

Example 1:
Input: nums1 = [1,3,4], nums2 = [1,3,4], k = 1
Output: 5
Explanation: The 5 good pairs are (0, 0), (1, 0), (1, 1), (2, 0), and (2, 2).

Example 2:
Input: nums1 = [1,2,4,12], nums2 = [2,4], k = 3
Output: 2
Explanation: The 2 good pairs are (3, 0) and (3, 1).

Constraints:
* 1 <= n, m <= 10^5
* 1 <= nums1[i], nums2[j] <= 10^6
* 1 <= k <= 10^3*/

function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
    const m = Math.max(...nums1);
    const freq1 = new Map(), freq2 = new Map();
    for (const x of nums1)
        if (x % k == 0) freq1.set(x/k, 1 + (freq1.get(x/k) ?? 0));
    for (const x of nums2)
        freq2.set(x, 1 + (freq2.get(x) ?? 0));
    let ans = 0;
    for (const [x, v] of freq2) {
        for (let xx = x; xx <= m; xx += x)
            ans += (freq1.get(xx) ?? 0) * v;
    }
    return ans;
};


/*3165. Maximum Sum of Subsequence With Non-adjacent Elements (Hard)
You are given an array nums consisting of integers. You are also given a 2D
array queries, where queries[i] = [posi, xi]. For query i, we first set
nums[posi] equal to xi, then we calculate the answer to query i which is the
maximum sum of a subsequence of nums where no two adjacent elements are
selected. Return the sum of the answers to all queries. Since the final
answer may be very large, return it modulo 10^9 + 7. A subsequence is an
array that can be derived from another array by deleting some or no elements
without changing the order of the remaining elements.

Example 1:
Input: nums = [3,5,9], queries = [[1,-2],[0,-3]]
Output: 21
Explanation: - After the 1st query, nums = [3,-2,9] and the maximum sum of a
               subsequence with non-adjacent elements is 3 + 9 = 12.
             - After the 2nd query, nums = [-3,-2,9] and the maximum sum of
               a subsequence with non-adjacent elements is 9.

Example 2:
Input: nums = [0,-1], queries = [[0,-5]]
Output: 0
Explanation: After the 1st query, nums = [-5,-1] and the maximum sum of a
             subsequence with non-adjacent elements is 0 (choosing an empty
             subsequence).

Constraints:
* 1 <= nums.length <= 5 * 10^4
* -10^5 <= nums[i] <= 10^5
* 1 <= queries.length <= 5 * 10^4
* queries[i] == [posi, xi]
* 0 <= posi <= nums.length - 1
* -10^5 <= xi <= 10^5*/

class SegTree {
    private n: number;
    private tree: number[][];

    constructor(arr: number[]) {
        this.n = arr.length;
        this.tree = Array(4*this.n).fill(null).map(() => Array(4).fill(0));
        this.build(arr, 0, 0, this.n);
    }

    op(left: number[], right: number[]): number[] {
        const [lv, ls, le, lse] = left, [rv, rs, re, rse] = right;
        const v = Math.max(le+rv, lv+rs), s = Math.max(ls+rs, lse+rv), e = Math.max(le+re, lv+rse), se = Math.max(lse+re, ls+rse);
        return [v, s, e, se];
    }

    build(arr: number[], k: number, lo: number, hi: number): void {
        if (lo+1 == hi) this.tree[k] = [Math.max(0, arr[lo]), 0, 0, 0];
        else {
            const mid = lo + Math.floor((hi-lo)/2);
            this.build(arr, 2*k+1, lo, mid);
            this.build(arr, 2*k+2, mid, hi);
            this.tree[k] = this.op(this.tree[2*k+1], this.tree[2*k+2]);
        }
    }

    update(i: number, val: number, k=0, lo=0, hi=0): void {
        if (hi == 0) hi = this.n;
        if (lo+1 == hi) this.tree[k][0] = Math.max(0, val);
        else {
            const mid = lo + Math.floor((hi-lo)/2);
            if (i < mid) this.update(i, val, 2*k+1, lo, mid);
            else this.update(i, val, 2*k+2, mid, hi);
            this.tree[k] = this.op(this.tree[2*k+1], this.tree[2*k+2]);
        }
    }

    query(qlo: number, qhi: number, k=0, lo=0, hi=0): number[] {
        if (hi == 0) hi = this.n;
        if (qhi <= lo || hi <= qlo) return [0, 0, 0, 0];
        if (qlo <= lo && hi <= qhi) return this.tree[k];
        const mid = lo + Math.floor((hi-lo)/2);
        return this.op(this.query(qlo, qhi, 2*k+1, lo, mid), this.query(qlo, qhi, 2*k+2, mid, hi));
    }
}


function maximumSumSubsequence(nums: number[], queries: number[][]): number {
    const tree = new SegTree(nums);
    let ans = 0;
    for (const [i, x] of queries) {
        tree.update(i, x);
        ans = (ans + tree.query(0, nums.length)[0]) % 1_000_000_007;
    }
    return ans;
};


/*3168. Minimum Number of Chairs in a Waiting Room (Easy)
You are given a string s. Simulate events at each second i:
* If s[i] == 'E', a person enters the waiting room and takes one of the
  chairs in it.
* If s[i] == 'L', a person leaves the waiting room, freeing up a chair.
Return the minimum number of chairs needed so that a chair is available for
every person who enters the waiting room given that it is initially empty.

Example 1:
Input: s = "EEEEEEE"
Output: 7
Explanation: After each second, a person enters the waiting room and no
             person leaves it. Therefore, a minimum of 7 chairs is needed.

Example 2:
Input: s = "ELELEEL"
Output: 2
Explanation: Let's consider that there are 2 chairs in the waiting room. The
             table below shows the state of the waiting room at each second.
             Second  Event   People in the Waiting Room  Available Chairs
             0   Enter   1   1
             1   Leave   0   2
             2   Enter   1   1
             3   Leave   0   2
             4   Enter   1   1
             5   Enter   2   0
             6   Leave   1   1

Example 3:
Input: s = "ELEELEELLL"
Output: 3
Explanation: Let's consider that there are 3 chairs in the waiting room. The
             table below shows the state of the waiting room at each second.
             Second  Event   People in the Waiting Room  Available Chairs
             0   Enter   1   2
             1   Leave   0   3
             2   Enter   1   2
             3   Enter   2   1
             4   Leave   1   2
             5   Enter   2   1
             6   Enter   3   0
             7   Leave   2   1
             8   Leave   1   2
             9   Leave   0   3

Constraints:
* 1 <= s.length <= 50
* s consists only of the letters 'E' and 'L'.
* s represents a valid sequence of entries and exits.*/

function minimumChairs(s: string): number {
    let ans = 0, prefix = 0;
    for (const ch of s) {
        if (ch == 'E') ++prefix;
        else --prefix;
        ans = Math.max(ans, prefix);
    }
    return ans;
};


/*3169. Count Days Without Meetings (Medium)
You are given a positive integer days representing the total number of days
an employee is available for work (starting from day 1). You are also given
a 2D array meetings of size n where, meetings[i] = [start_i, end_i]
represents the starting and ending days of meeting i (inclusive). Return the
count of days when the employee is available for work but no meetings are
scheduled. Note: The meetings may overlap.

Example 1:
Input: days = 10, meetings = [[5,7],[1,3],[9,10]]
Output: 2
Explanation: There is no meeting scheduled on the 4th and 8th days.

Example 2:
Input: days = 5, meetings = [[2,4],[1,3]]
Output: 1
Explanation: There is no meeting scheduled on the 5th day.

Example 3:
Input: days = 6, meetings = [[1,6]]
Output: 0
Explanation: Meetings are scheduled for all working days.

Constraints:
* 1 <= days <= 10^9
* 1 <= meetings.length <= 10^5
* meetings[i].length == 2
* 1 <= meetings[i][0] <= meetings[i][1] <= days*/

function countDays(days: number, meetings: number[][]): number {
    let ans = 0, prev = 0;
    meetings.sort((x, y) => x[0]-y[0]);
    for (const [x, y] of meetings) {
        ans += Math.max(0, Math.min(x, days)-prev-1);
        prev = Math.max(prev, y);
    }
    return ans + Math.max(0, days-prev);
};


/*3170. Lexicographically Minimum String After Removing Stars (Medium)
You are given a string s. It may contain any number of '*' characters. Your
task is to remove all '*' characters. While there is a '*', do the following
operation:
* Delete the leftmost '*' and the smallest non-'*' character to its left. If
  there are several smallest characters, you can delete any of them.
Return the lexicographically smallest resulting string after removing all
'*' characters.

Example 1:
Input: s = "aaba*"
Output: "aab"
Explanation: We should delete one of the 'a' characters with '*'. If we
             choose s[3], s becomes the lexicographically smallest.

Example 2:
Input: s = "abc"
Output: "abc"
Explanation: There is no '*' in the string.

Constraints:
* 1 <= s.length <= 10^5
* s consists only of lowercase English letters and '*'.
* The input is generated such that it is possible to delete all '*'
characters.*/

function clearStars(s: string): string {
    const chs = s.split('');
    const pq = new PriorityQueue({ compare : (i, j) => s[i] != s[j] ? s[i] > s[j] : j-i});
    for (let i = 0; i < chs.length; ++i)
        if (chs[i] == '*') chs[pq.dequeue()] = '*';
        else pq.enqueue(i);
    return chs.join('').replaceAll('\*', '');
};


/*3171. Find Subarray With Bitwise AND Closest to K (Hard)
You are given an array nums and an integer k. You need to find a subarray of
nums such that the absolute difference between k and the bitwise AND of the
subarray elements is as small as possible. In other words, select a subarray
nums[l..r] such that |k - (nums[l] AND nums[l + 1] ... AND nums[r])| is
minimum. Return the minimum possible value of the absolute difference. A
subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,4,5], k = 3
Output: 1
Explanation: The subarray nums[2..3] has AND value 4, which gives the
             minimum absolute difference |3 - 4| = 1.

Example 2:
Input: nums = [1,2,1,2], k = 2
Output: 0
Explanation: The subarray nums[1..1] has AND value 2, which gives the
             minimum absolute difference |2 - 2| = 0.

Example 3:
Input: nums = [1], k = 10
Output: 9
Explanation: There is a single subarray with AND value 1, which gives the
             minimum absolute difference |10 - 1| = 9.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* 1 <= k <= 10^9*/

function minimumDifference(nums: number[], k: number): number {
    const freq = Array(30).fill(0);
    let ans = Infinity, mask = (1<<30)-1;
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        for (let j = 0; j < 30; ++j)
            if ((nums[i] & 1<<j) == 0 && freq[j]++ == 0) mask ^= 1<<j;
        ans = Math.min(ans, Math.abs(mask-k));
        for (; ii < i && mask < k; ++ii) {
            for (let j = 0; j < 30; ++j)
                if ((nums[ii] & 1<<j) == 0 && --freq[j] == 0) mask ^= 1<<j;
            ans = Math.min(ans, Math.abs(mask-k));
        }
    }
    return ans;
};


/*3174. Clear Digits (Easy)
You are given a string s. Your task is to remove all digits by doing this
operation repeatedly:
* Delete the first digit and the closest non-digit character to its left.
Return the resulting string after removing all digits.

Example 1:
Input: s = "abc"
Output: "abc"
Explanation: There is no digit in the string.

Example 2:
Input: s = "cb34"
Output: ""
Explanation: First, we apply the operation on s[2], and s becomes "c4". Then
             we apply the operation on s[1], and s becomes "".

Constraints:
* 1 <= s.length <= 100
* s consists only of lowercase English letters and digits.
* The input is generated such that it is possible to delete all digits.*/

function clearDigits(s: string): string {
    const ans = [];
    for (const ch of s)
        if ('0' <= ch && ch <= '9') ans.pop();
        else ans.push(ch);
    return ans.join('');
};


/*3175. Find The First Player to win K Games in a Row (Medium)
A competition consists of n players numbered from 0 to n - 1. You are given
an integer array skills of size n and a positive integer k, where skills[i]
is the skill level of player i. All integers in skills are unique. All
players are standing in a queue in order from player 0 to player n - 1. The
competition process is as follows:
* The first two players in the queue play a game, and the player with the
  higher skill level wins.
* After the game, the winner stays at the beginning of the queue, and the
  loser goes to the end of it.
The winner of the competition is the first player who wins k games in a row.
Return the initial index of the winning player.

Example 1:
Input: skills = [4,2,6,3,9], k = 2
Output: 2
Explanation: Initially, the queue of players is [0,1,2,3,4]. The following
             process happens:
             - Players 0 and 1 play a game, since the skill of player 0 is
               higher than that of player 1, player 0 wins. The resulting
               queue is [0,2,3,4,1].
             - Players 0 and 2 play a game, since the skill of player 2 is
               higher than that of player 0, player 2 wins. The resulting
               queue is [2,3,4,1,0].
             - Players 2 and 3 play a game, since the skill of player 2 is
               higher than that of player 3, player 2 wins. The resulting
               queue is [2,4,1,0,3].
             - Player 2 won k = 2 games in a row, so the winner is player 2.

Example 2:
Input: skills = [2,5,4], k = 3
Output: 1
Explanation: Initially, the queue of players is [0,1,2]. The following
             process happens:
             - Players 0 and 1 play a game, since the skill of player 1 is
               higher than that of player 0, player 1 wins. The resulting
               queue is [1,2,0].
             - Players 1 and 2 play a game, since the skill of player 1 is
               higher than that of player 2, player 1 wins. The resulting
               queue is [1,0,2].
             - Players 1 and 0 play a game, since the skill of player 1 is
               higher than that of player 0, player 1 wins. The resulting
               queue is [1,2,0].
             - Player 1 won k = 3 games in a row, so the winner is player 1.

Constraints:
* n == skills.length
* 2 <= n <= 10^5
* 1 <= k <= 10^9
* 1 <= skills[i] <= 10^6
* All integers in skills are unique.*/

function findWinningPlayer(skills: number[], k: number): number {
    let j = 0;
    for (let i = 1, cnt = 0; i < skills.length && cnt < k; ++i, ++cnt)
        if (skills[j] < skills[i]) {
            j = i;
            cnt = 0;
        }
    return j;
};


/*3176. Find the Maximum Length of a Good Subsequence I (Medium)
You are given an integer array nums and a non-negative integer k. A sequence
of integers seq is called good if there are at most k indices i in the range
[0, seq.length - 2] such that seq[i] != seq[i + 1]. Return the maximum
possible length of a good subsequence of nums.

Example 1:
Input: nums = [1,2,1,1,3], k = 2
Output: 4
Explanation: The maximum length subsequence is [1,2,1,1,3].

Example 2:
Input: nums = [1,2,3,4,5,1], k = 0
Output: 2
Explanation: The maximum length subsequence is [1,2,3,4,5,1].

Constraints:
* 1 <= nums.length <= 500
* 1 <= nums[i] <= 10^9
* 0 <= k <= min(nums.length, 25)*/

function maximumLength(nums: number[], k: number): number {
    const dp = Array(k+1).fill(0).map(() => new Map());
    const most = Array(k+1).fill(0);
    for (const x of nums)
        for (let i = k; i >= 0; --i) {
            dp[i].set(x, 1 + (dp[i].get(x) ?? 0));
            if (i > 0) dp[i].set(x, Math.max(dp[i].get(x), 1+most[i-1]));
            most[i] = Math.max(most[i], dp[i].get(x));
        }
    return most[k];
};


/*3177. Find the Maximum Length of a Good Subsequence II (Hard)
You are given an integer array nums and a non-negative integer k. A sequence
of integers seq is called good if there are at most k indices i in the range
[0, seq.length - 2] such that seq[i] != seq[i + 1]. Return the maximum
possible length of a good subsequence of nums.

Example 1:
Input: nums = [1,2,1,1,3], k = 2
Output: 4
Explanation: The maximum length subsequence is [1,2,1,1,3].

Example 2:
Input: nums = [1,2,3,4,5,1], k = 0
Output: 2
Explanation: The maximum length subsequence is [1,2,3,4,5,1].

Constraints:
* 1 <= nums.length <= 5 * 10^3
* 1 <= nums[i] <= 10^9
* 0 <= k <= min(50, nums.length)*/

function maximumLength(nums: number[], k: number): number {
    const dp = Array(k+1).fill(0).map(() => new Map());
    const most = Array(k+1).fill(0);
    for (const x of nums)
        for (let i = k; i >= 0; --i) {
            dp[i].set(x, 1 + (dp[i].get(x) ?? 0));
            if (i > 0) dp[i].set(x, Math.max(dp[i].get(x), 1+most[i-1]));
            most[i] = Math.max(most[i], dp[i].get(x));
        }
    return most[k];
};


/*3179. Find the N-th Value After K Seconds (Medium)
You are given two integers n and k. Initially, you start with an array a of
n integers where a[i] = 1 for all 0 <= i <= n - 1. After each second, you
simultaneously update each element to be the sum of all its preceding
elements plus the element itself. For example, after one second, a[0]
remains the same, a[1] becomes a[0] + a[1], a[2] becomes a[0] + a[1] + a[2],
and so on. Return the value of a[n - 1] after k seconds. Since the answer
may be very large, return it modulo 10^9 + 7.

Example 1:
Input: n = 4, k = 5
Output: 56
Explanation: Second  State After
             0   [1,1,1,1]
             1   [1,2,3,4]
             2   [1,3,6,10]
             3   [1,4,10,20]
             4   [1,5,15,35]
             5   [1,6,21,56]

Example 2:
Input: n = 5, k = 3
Output: 35
Explanation: Second  State After
             0   [1,1,1,1,1]
             1   [1,2,3,4,5]
             2   [1,3,6,10,15]
             3   [1,4,10,20,35]

Constraints: 1 <= n, k <= 1000*/

function valueAfterKSeconds(n: number, k: number): number {
    let ans = 1n, m = 1_000_000_007;
    const nn = BigInt(n), kk = BigInt(k), mm = BigInt(m);
    const inv = Array(k+1).fill(1n);
    for (let i = 1; i <= k; ++i) {
        const ii = BigInt(i);
        if (i >= 2)
            inv[i] = mm - mm/ii * inv[m % i] % mm;
        ans = ans * (nn+kk-ii) % mm;
        ans = ans * inv[i] % mm;
    }
    return Number(ans);
};


/*3184. Count Pairs That Form a Complete Day I (Easy)
Given an integer array hours representing times in hours, return an integer
denoting the number of pairs i, j where i < j and hours[i] + hours[j] forms
a complete day. A complete day is defined as a time duration that is an
exact multiple of 24 hours. For example, 1 day is 24 hours, 2 days is 48
hours, 3 days is 72 hours, and so on.

Example 1:
Input: hours = [12,12,30,24,24]
Output: 2
Explanation: The pairs of indices that form a complete day are (0, 1) and
             (3, 4).

Example 2:
Input: hours = [72,48,24,3]
Output: 3
Explanation: The pairs of indices that form a complete day are (0, 1),
             (0, 2), and (1, 2).

Constraints:
* 1 <= hours.length <= 100
* 1 <= hours[i] <= 10^9*/

function countCompleteDayPairs(hours: number[]): number {
    let ans = 0;
    const freq = Array(24).fill(0);
    for (const h of hours) {
        ans += freq[(24-h%24) % 24];
        ++freq[h % 24];
    }
    return ans;
};


/*3185. Count Pairs That Form a Complete Day II (Medium)
Given an integer array hours representing times in hours, return an integer
denoting the number of pairs i, j where i < j and hours[i] + hours[j] forms
a complete day. A complete day is defined as a time duration that is an
exact multiple of 24 hours. For example, 1 day is 24 hours, 2 days is 48
hours, 3 days is 72 hours, and so on.

Example 1:
Input: hours = [12,12,30,24,24]
Output: 2
Explanation: The pairs of indices that form a complete day are (0, 1) and
             (3, 4).

Example 2:
Input: hours = [72,48,24,3]
Output: 3
Explanation: The pairs of indices that form a complete day are (0, 1),
             (0, 2), and (1, 2).

Constraints:
* 1 <= hours.length <= 5 * 10^5
* 1 <= hours[i] <= 10^9*/

function countCompleteDayPairs(hours: number[]): number {
    let ans = 0;
    const freq = Array(24).fill(0);
    for (const h of hours) {
        ans += freq[(24-h%24) % 24];
        ++freq[h % 24];
    }
    return ans;
};


/*3186. Maximum Total Damage With Spell Casting (Medium)
A magician has various spells. You are given an array power, where each
element represents the damage of a spell. Multiple spells can have the same
damage value. It is a known fact that if a magician decides to cast a spell
with a damage of power[i], they cannot cast any spell with a damage of
power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2. Each spell can be
cast only once. Return the maximum possible total damage that a magician can
cast.

Example 1:
Input: power = [1,1,3,4]
Output: 6
Explanation: The maximum possible damage of 6 is produced by casting spells
             0, 1, 3 with damage 1, 1, 4.

Example 2:
Input: power = [7,1,6,6]
Output: 13
Explanation: The maximum possible damage of 13 is produced by casting spells
             1, 2, 3 with damage 1, 6, 6.

Constraints:
* 1 <= power.length <= 10^5
* 1 <= power[i] <= 10^9*/

function maximumTotalDamage(power: number[]): number {
    power.sort((x, y) => x-y);
    let prefix = 0;
    const n = power.length, dp = Array(n).fill(0);
    for (let i = 0, j = 0; i < n; ++i)
        if (i && power[i-1] == power[i]) dp[i] = dp[i-1] + power[i];
        else {
            for (; power[j] < power[i]-2; ++j)
                prefix = Math.max(prefix, dp[j]);
            dp[i] = prefix + power[i];
        }
    return Math.max(...dp);
};


/*3187. Peaks in Array (Hard)
A peak in an array arr is an element that is greater than its previous and
next element in arr. You are given an integer array nums and a 2D integer
array queries. You have to process queries of two types:
* queries[i] = [1, li, ri], determine the count of peak elements in the
  subarray nums[li..ri].
* queries[i] = [2, indexi, vali], change nums[indexi] to vali.
Return an array answer containing the results of the queries of the first
type in order. Notes:
* The first and the last element of an array or a subarray cannot be a peak.

Example 1:
Input: nums = [3,1,4,2,5], queries = [[2,3,4],[1,0,4]]
Output: [0]
Explanation: First query: We change nums[3] to 4 and nums becomes
             [3,1,4,4,5]. Second query: The number of peaks in the
             [3,1,4,4,5] is 0.

Example 2:
Input: nums = [4,1,4,2,1,5], queries = [[2,2,4],[1,0,2],[1,0,4]]
Output: [0,1]
Explanation: First query: nums[2] should become 4, but it is already set to
             4. Second query: The number of peaks in the [4,1,4] is 0. Third
             query: The second 4 is a peak in the [4,1,4,2,1].

Constraints:
* 3 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5
* 1 <= queries.length <= 10^5
* queries[i][0] == 1 or queries[i][0] == 2
* For all i that:
  - queries[i][0] == 1: 0 <= queries[i][1] <= queries[i][2] <= nums.length - 1
  - queries[i][0] == 2: 0 <= queries[i][1] <= nums.length - 1,
    1 <= queries[i][2] <= 10^5*/

class Fenwick {
    private nums: Array<number>;

    constructor(n) {
        this.nums = Array(n+1).fill(0);
    }

    add(k, delta) {
        for (++k; k < this.nums.length; k += k & -k)
            this.nums[k] += delta;
    }

    query(k) {
        let ans = 0;
        for (++k; k > 0; k -= k & -k)
            ans += this.nums[k];
        return ans;
    }
};

function countOfPeaks(nums: number[], queries: number[][]): number[] {
    const n = nums.length, tree = new Fenwick(n);
    for (let i = 1; i+1 < n; ++i)
        if (nums[i-1] < nums[i] && nums[i] > nums[i+1])
            tree.add(i, 1);
    const ans = [];
    for (const q of queries) {
        if (q[0] == 1) {
            const [_, lo, hi] = q;
            ans.push(tree.query(Math.max(lo, hi-1)) - tree.query(lo));
        } else {
            const [_, k, v] = q;
            for (let i = Math.max(1, k-1); i <= k+1 && i+1 < n; ++i)
                if (nums[i-1] < nums[i] && nums[i] > nums[i+1])
                    tree.add(i, -1);
            nums[k] = v;
            for (let i = Math.max(1, k-1); i <= k+1 && i+1 < n; ++i)
                if (nums[i-1] < nums[i] && nums[i] > nums[i+1])
                    tree.add(i, 1);
        }
    }
    return ans;
};


/*3190. Find Minimum Operations to Make All Elements Divisible by Three (Easy)
You are given an integer array nums. In one operation, you can add or
subtract 1 from any element of nums. Return the minimum number of operations
to make all elements of nums divisible by 3.

Example 1:
Input: nums = [1,2,3,4]
Output: 3
Explanation: All array elements can be made divisible by 3 using 3
             operations:
             - Subtract 1 from 1.
             - Add 1 to 2.
             - Subtract 1 from 4.

Example 2:
Input: nums = [3,6,9]
Output: 0

Constraints:
* 1 <= nums.length <= 50
* 1 <= nums[i] <= 50*/

function minimumOperations(nums: number[]): number {
    return nums.reduce((s, x) => s + Math.min(x%3, 3-x%3), 0);
};


/*3191. Minimum Operations to Make Binary Array Elements Equal to One I (Medium)
You are given a binary array nums. You can do the following operation on the
array any number of times (possibly zero):
* Choose any 3 consecutive elements from the array and flip all of them.
Flipping an element means changing its value from 0 to 1, and from 1 to 0.
Return the minimum number of operations required to make all elements in
nums equal to 1. If it is impossible, return -1.

Example 1:
Input: nums = [0,1,1,1,0,0]
Output: 3
Explanation: We can do the following operations:
             - Choose the elements at indices 0, 1 and 2. The resulting
               array is nums = [1,0,0,1,0,0].
             - Choose the elements at indices 1, 2 and 3. The resulting
               array is nums = [1,1,1,0,0,0].
             - Choose the elements at indices 3, 4 and 5. The resulting
               array is nums = [1,1,1,1,1,1].

Example 2:
Input: nums = [0,1,1,1]
Output: -1
Explanation: It is impossible to make all elements equal to 1.

Constraints:
* 3 <= nums.length <= 10^5
* 0 <= nums[i] <= 1*/

function minOperations(nums: number[]): number {
    let ans = 0, flip = 0;
    const n = nums.length, line = Array(n).fill(0);
    for (let [i, x] of nums.entries()) {
        if (line[i]) flip ^= 1;
        x ^= flip;
        if (x == 0) {
            if (i+2 >= n) return -1;
            ++ans;
            flip ^= 1;
            if (i+3 < n) line[i+3] = 1;
        }
    }
    return ans;
};


/*3192. Minimum Operations to Make Binary Array Elements Equal to One II (Medium)
You are given a binary array nums. You can do the following operation on
the array any number of times (possibly zero):
* Choose any index i from the array and flip all the elements from index i
  to the end of the array.
Flipping an element means changing its value from 0 to 1, and from 1 to 0.
Return the minimum number of operations required to make all elements in
nums equal to 1.

Example 1:
Input: nums = [0,1,1,0,1]
Output: 4
Explanation: We can do the following operations:
             - Choose the index i = 1. The resulting array will be
               nums = [0,0,0,1,0].
             - Choose the index i = 0. The resulting array will be
               nums = [1,1,1,0,1].
             - Choose the index i = 4. The resulting array will be
               nums = [1,1,1,0,0].
             - Choose the index i = 3. The resulting array will be
               nums = [1,1,1,1,1].

Example 2:
Input: nums = [1,0,0,0]
Output: 1
Explanation: We can do the following operation:
             - Choose the index i = 1. The resulting array will be
               nums = [1,1,1,1].

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i] <= 1*/

function minOperations(nums: number[]): number {
    let ans = 0;
    for (const x of nums)
        if (x == (ans & 1)) ++ans;
    return ans;
};


/*3193. Count the Number of Inversions (Hard)
You are given an integer n and a 2D array requirements, where
requirements[i] = [endi, cnti] represents the end index and the inversion
count of each requirement. A pair of indices (i, j) from an integer array
nums is called an inversion if:
* i < j and nums[i] > nums[j]
Return the number of permutations perm of [0, 1, 2, ..., n - 1] such that
for all requirements[i], perm[0..endi] has exactly cnti inversions. Since
the answer may be very large, return it modulo 10^9 + 7.

Example 1:
Input: n = 3, requirements = [[2,2],[0,0]]
Output: 2
Explanation: The two permutations are:
             - [2, 0, 1]
               + Prefix [2, 0, 1] has inversions (0, 1) and (0, 2).
               + Prefix [2] has 0 inversions.
             - [1, 2, 0]
               + Prefix [1, 2, 0] has inversions (0, 2) and (1, 2).
               + Prefix [1] has 0 inversions.

Example 2:
Input: n = 3, requirements = [[2,2],[1,1],[0,0]]
Output: 1
Explanation: The only satisfying permutation is [2, 0, 1]:
             - Prefix [2, 0, 1] has inversions (0, 1) and (0, 2).
             - Prefix [2, 0] has an inversion (0, 1).
             - Prefix [2] has 0 inversions.

Example 3:
Input: n = 2, requirements = [[0,0],[1,0]]
Output: 1
Explanation: The only satisfying permutation is [0, 1]:
             - Prefix [0] has 0 inversions.
             - Prefix [0, 1] has an inversion (0, 1).

Constraints:
* 2 <= n <= 300
* 1 <= requirements.length <= n
* requirements[i] = [endi, cnti]
* 0 <= endi <= n - 1
* 0 <= cnti <= 400
* The input is generated such that there is at least one i such that
  endi == n - 1.
* The input is generated such that all endi are unique.*/

function numberOfPermutations(n: number, requirements: number[][]): number {
    const line = Array(n).fill(-1);
    let m = 0, mod = 1_000_000_007;
    for (const [k, v] of requirements) {
        line[k] = v;
        m = Math.max(m, v);
    }
    const dp = Array(n).fill(0).map(() => Array(m+1).fill(0));
    dp[0][0] = 1;
    for (let i = 0; i < n; ++i) {
        let prefix = 0;
        for (let j = 0; j <= m; ++j) {
            if (i > 0) {
                prefix += dp[i-1][j];
                if (j > i) prefix -= dp[i-1][j-1-i];
                dp[i][j] = prefix = (mod + prefix%mod) % mod;
            }
            if (line[i] != -1 && line[i] != j) dp[i][j] = 0;
        }
    }
    return dp[n-1][line[n-1]];
};


/*3194. Minimum Average of Smallest and Largest Elements (Easy)
You have an array of floating point numbers averages which is initially
empty. You are given an array nums of n integers where n is even. You repeat
the following procedure n / 2 times:
* Remove the smallest element, minElement, and the largest element
  maxElement, from nums.
* Add (minElement + maxElement) / 2 to averages.
Return the minimum element in averages.

Example 1:
Input: nums = [7,8,3,4,15,13,4,1]
Output: 5.5
Explanation: step  nums                 averages
             0     [7,8,3,4,15,13,4,1]  []
             1     [7,8,3,4,13,4]       [8]
             2     [7,8,4,4]            [8,8]
             3     [7,4]                [8,8,6]
             4     []                   [8,8,6,5.5]
             The smallest element of averages, 5.5, is returned.

Example 2:
Input: nums = [1,9,8,3,10,5]
Output: 5.5
Explanation: step  nums                 averages
             0     [1,9,8,3,10,5]       []
             1     [9,8,3,5]            [5.5]
             2     [8,5]                [5.5,6]
             3     []                   [5.5,6,6.5]

Example 3:
Input: nums = [1,2,3,7,8,9]
Output: 5.0
Explanation: step  nums                 averages
             0     [1,2,3,7,8,9]        []
             1     [2,3,7,8]            [5]
             2     [3,7]                [5,5]
             3     []                   [5,5,5]

Constraints:
* 2 <= n == nums.length <= 50
* n is even.
* 1 <= nums[i] <= 50*/

function minimumAverage(nums: number[]): number {
    nums.sort((x, y) => x-y);
    let ans = Infinity;
    for (let lo = 0, hi = nums.length-1; lo < hi; ++lo, --hi)
        ans = Math.min(ans, (nums[lo]+nums[hi])/2);
    return ans;
};


/*3195. Find the Minimum Area to Cover All Ones I (Medium)
You are given a 2D binary array grid. Find a rectangle with horizontal and
vertical sides with the smallest area, such that all the 1's in grid lie
inside this rectangle. Return the minimum possible area of the rectangle.

Example 1:
Input: grid = [[0,1,0],[1,0,1]]
Output: 6
Explanation: The smallest rectangle has a height of 2 and a width of 3, so
             it has an area of 2 * 3 = 6.

Example 2:
Input: grid = [[1,0],[0,0]]
Output: 1
Explanation: The smallest rectangle has both height and width 1, so its area
             is 1 * 1 = 1.

Constraints:
* 1 <= grid.length, grid[i].length <= 1000
* grid[i][j] is either 0 or 1.
* The input is generated such that there is at least one 1 in grid.*/

function minimumArea(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    let imin = Infinity, imax = -Infinity, jmin = Infinity, jmax = -Infinity;
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            if (grid[i][j]) {
                imin = Math.min(imin, i);
                imax = Math.max(imax, i);
                jmin = Math.min(jmin, j);
                jmax = Math.max(jmax, j);
            }
    return (imax-imin+1) * (jmax-jmin+1);
};


/*3196. Maximize Total Cost of Alternating Subarrays (Medium)
You are given an integer array nums with length n. The cost of a subarray
nums[l..r], where 0 <= l <= r < n, is defined as:

* cost(l, r) = nums[l] - nums[l + 1] + ... + nums[r] * (−1)r − l

Your task is to split nums into subarrays such that the total cost of the
subarrays is maximized, ensuring each element belongs to exactly one
subarray. Formally, if nums is split into k subarrays, where k > 1, at
indices i1, i2, ..., ik − 1, where 0 <= i1 < i2 < ... < ik - 1 < n - 1, then
the total cost will be:

* cost(0, i1) + cost(i1 + 1, i2) + ... + cost(ik − 1 + 1, n − 1)

Return an integer denoting the maximum total cost of the subarrays after
splitting the array optimally. Note: If nums is not split into subarrays,
i.e. k = 1, the total cost is simply cost(0, n - 1).

Example 1:
Input: nums = [1,-2,3,4]
Output: 10
Explanation: One way to maximize the total cost is by splitting
             [1, -2, 3, 4] into subarrays [1, -2, 3] and [4]. The total cost
             will be (1 + 2 + 3) + 4 = 10.

Example 2:
Input: nums = [1,-1,1,-1]
Output: 4
Explanation: One way to maximize the total cost is by splitting
             [1, -1, 1, -1] into subarrays [1, -1] and [1, -1]. The total
             cost will be (1 + 1) + (1 + 1) = 4.

Example 3:
Input: nums = [0]
Output: 0
Explanation: We cannot split the array further, so the answer is 0.

Example 4:
Input: nums = [1,-1]
Output: 2
Explanation: Selecting the whole array gives a total cost of 1 + 1 = 2,
             which is the maximum.

Constraints:
* 1 <= nums.length <= 10^5
* -10^9 <= nums[i] <= 10^9*/

function maximumTotalCost(nums: number[]): number {
    let ans = 0, suffix = 0;
    for (let i = nums.length-1; i >= 0; --i) {
        suffix = nums[i] - suffix;
        if (suffix > 0) {
            ans += suffix;
            suffix = 0;
        }
    }
    return ans + suffix;
};


/*3197. Find the Minimum Area to Cover All Ones II (Hard)
You are given a 2D binary array grid. You need to find 3 non-overlapping
rectangles having non-zero areas with horizontal and vertical sides such
that all the 1's in grid lie inside these rectangles. Return the minimum
possible sum of the area of these rectangles. Note that the rectangles are
allowed to touch.

Example 1:
Input: grid = [[1,0,1],[1,1,1]]
Output: 5
Explanation: - The 1's at (0, 0) and (1, 0) are covered by a rectangle of
               area 2.
             - The 1's at (0, 2) and (1, 2) are covered by a rectangle of
               area 2.
             - The 1 at (1, 1) is covered by a rectangle of area 1.

Example 2:
Input: grid = [[1,0,1,0],[0,1,0,1]]
Output: 5
Explanation: - The 1's at (0, 0) and (0, 2) are covered by a rectangle of
               area 3.
             - The 1 at (1, 1) is covered by a rectangle of area 1.
             - The 1 at (1, 3) is covered by a rectangle of area 1.

Constraints:
* 1 <= grid.length, grid[i].length <= 30
* grid[i][j] is either 0 or 1.
* The input is generated such that there are at least three 1's in grid.*/

function minimumSum(grid: number[][]): number {

    function fn(grid) {
        const ans = [];
        let imin = 30, jmin = 30, imax = 0, jmax = 0;
        for (let i = 0; i < grid.length-1; ++i) {
            for (let j = 0; j < grid[i].length; ++j)
                if (grid[i][j]) {
                    imin = Math.min(imin, i);
                    jmin = Math.min(jmin, j);
                    imax = Math.max(imax, i);
                    jmax = Math.max(jmax, j);
                }
            let val = 0;
            if (imin <= imax && jmin <= jmax)
                val = (imax-imin+1) * (jmax-jmin+1);
            ans.push(val);
        }
        return ans;
    }

    function rotate(grid) {
        let m = grid.length, n = grid[0].length;
        const ans = Array(n).fill(0).map(() => Array(m).fill(0));
        grid.reverse();
        for (let i = 0; i < m; ++i)
            for (let j = 0; j < n; ++j)
                ans[j][i] = grid[i][j];
        return ans;
    }

    let ans = Infinity;
    for (let k = 0; k < 4; ++k) {
        const half = fn(grid);
        for (const [i, h] of half.entries()) {
            if (h) {
                let sub = grid.slice(i+1);
                for (let sz = 0; sz < 2; ++sz) {
                    const top = fn(sub);
                    sub.reverse();
                    const bottom = fn(sub);
                    for (let j = 0, n = top.length; j < n; ++j)
                        if (top[j] && bottom[n-1-j])
                            ans = Math.min(ans, h + top[j] + bottom[n-1-j]);
                    sub = rotate(sub);
                }
            }
        }
        grid = rotate(grid);
    }
    return ans;
};


/*3200. Maximum Height of a Triangle (Easy)
You are given two integers red and blue representing the count of red and
blue colored balls. You have to arrange these balls to form a triangle such
that the 1st row will have 1 ball, the 2nd row will have 2 balls, the 3rd
row will have 3 balls, and so on. All the balls in a particular row should
be the same color, and adjacent rows should have different colors. Return
the maximum height of the triangle that can be achieved.

Example 1:
Input: red = 2, blue = 4
Output: 3
Explanation: The only possible arrangement is shown above.

Example 2:
Input: red = 2, blue = 1
Output: 2
Explanation: The only possible arrangement is shown above.

Example 3:
Input: red = 1, blue = 1
Output: 1

Example 4:
Input: red = 10, blue = 1
Output: 2
Explanation: The only possible arrangement is shown above.

Constraints: 1 <= red, blue <= 100*/

function maxHeightOfTriangle(red: number, blue: number): number {
    let ans = 0;
    for (let ball of [[red, blue], [blue, red]]) {
        let cand = 0;
        for (let k = 1, i = 0; ball[i] >= k; ++k, i ^= 1) {
            ball[i] -= k;
            ++cand;
        }
        ans = Math.max(ans, cand);
    }
    return ans;
};


/*3201. Find the Maximum Length of Valid Subsequence I (Medium)
You are given an integer array nums. A subsequence sub of nums with length x
is called valid if it satisfies:
* (sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ...
  == (sub[x - 2] + sub[x - 1]) % 2.
Return the length of the longest valid subsequence of nums. A subsequence is
an array that can be derived from another array by deleting some or no
elements without changing the order of the remaining elements.

Example 1:
Input: nums = [1,2,3,4]
Output: 4
Explanation: The longest valid subsequence is [1, 2, 3, 4].

Example 2:
Input: nums = [1,2,1,1,2,1,2]
Output: 6
Explanation: The longest valid subsequence is [1, 2, 1, 2, 1, 2].

Example 3:
Input: nums = [1,3]
Output: 2
Explanation: The longest valid subsequence is [1, 3].

Constraints:
* 2 <= nums.length <= 2 * 10^5
* 1 <= nums[i] <= 10^7*/

function maximumLength(nums: number[]): number {
    const dp = Array(2).fill(0).map(() => Array(2).fill(0));
    for (let x of nums) {
        x %= 2;
        dp[x][0] = 1 + dp[0][x];
        dp[x][1] = 1 + dp[1][x];
    }
    return Math.max(...dp.flat());
};


/*3202. Find the Maximum Length of Valid Subsequence II (Medium)
You are given an integer array nums and a positive integer k. A subsequence
sub of nums with length x is called valid if it satisfies:
* (sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.
Return the length of the longest valid subsequence of nums.

Example 1:
Input: nums = [1,2,3,4,5], k = 2
Output: 5
Explanation: The longest valid subsequence is [1, 2, 3, 4, 5].

Example 2:
Input: nums = [1,4,2,3,1,4], k = 3
Output: 4
Explanation: The longest valid subsequence is [1, 4, 1, 4].

Constraints:
* 2 <= nums.length <= 10^3
* 1 <= nums[i] <= 10^7
* 1 <= k <= 10^3*/

function maximumLength(nums: number[], k: number): number {
    const dp = Array(k).fill(0).map(() => Array(k).fill(0));
    for (let x of nums) {
        x %= k;
        for (let y = 0; y < k; ++y)
            dp[x][y] = 1 + dp[y][x];
    }
    return Math.max(...dp.flat());
};


/*3203. Find Minimum Diameter After Merging Two Trees (Hard)
There exist two undirected trees with n and m nodes, numbered from 0 to
n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays
edges1 and edges2 of lengths n - 1 and m - 1, respectively, where
edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi
in the first tree and edges2[i] = [ui, vi] indicates that there is an edge
between nodes ui and vi in the second tree. You must connect one node from
the first tree with another node from the second tree with an edge. Return
the minimum possible diameter of the resulting tree. The diameter of a tree
is the length of the longest path between any two nodes in the tree.

Example 1:
Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]
Output: 3
Explanation: We can obtain a tree of diameter 3 by connecting node 0 from
             the first tree with any node from the second tree.

Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]
Output: 5
Explanation: We can obtain a tree of diameter 5 by connecting node 0 from
             the first tree with node 0 from the second tree.

Constraints:
* 1 <= n, m <= 10^5
* edges1.length == n - 1
* edges2.length == m - 1
* edges1[i].length == edges2[i].length == 2
* edges1[i] = [ai, bi]
* 0 <= ai, bi < n
* edges2[i] = [ui, vi]
* 0 <= ui, vi < m
* The input is generated such that edges1 and edges2 represent valid trees.*/

function minimumDiameterAfterMerge(edges1: number[][], edges2: number[][]): number {

    function bfs(u, graph) {
        let level = 0;
        const q = [[u, -1]];
        while (q.length) {
            ++level;
            for (let sz = q.length; sz; --sz) {
                var [x, p] = q.shift();
                for (const v of graph[x])
                    if (v != p)
                        q.push([v, x]);
            }
        }
        return [level, x];
    };

    function fn(edges) {
        const n = 1 + edges.length;
        const graph = Array(n).fill(0).map(() => []);
        for (const [u, v] of edges) {
            graph[u].push(v);
            graph[v].push(u);
        }
        const u = bfs(0, graph)[1];
        const d = bfs(u, graph)[0];
        return d-1;
    };

    const d1 = fn(edges1), d2 = fn(edges2);
    return Math.max(d1, d2, Math.ceil(d1/2) + Math.ceil(d2/2) + 1);
};


/*3206. Alternating Groups I (Easy)
There is a circle of red and blue tiles. You are given an array of integers
colors. The color of tile i is represented by colors[i]:
* colors[i] == 0 means that tile i is red.
* colors[i] == 1 means that tile i is blue.
Every 3 contiguous tiles in the circle with alternating colors (the middle
tile has a different color from its left and right tiles) is called an
alternating group. Return the number of alternating groups. Note that since
colors represents a circle, the first and the last tiles are considered to
be next to each other.

Example 1:
Input: colors = [1,1,1]
Output: 0
Explanation:

Example 2:
Input: colors = [0,1,0,0,1]
Output: 3
Explanation:
Alternating groups:

Constraints:
* 3 <= colors.length <= 100
* 0 <= colors[i] <= 1*/

function numberOfAlternatingGroups(colors: number[]): number {
    let ans = 0;
    for (let i = 0, cnt = 0, n = colors.length; i < n+2; ++i) {
        if (i && colors[(i-1)%n] == colors[i%n]) cnt = 0;
        if (++cnt >= 3) ++ans;
    }
    return ans;
};


/*3207. Maximum Points After Enemy Battles (Medium)
You are given an integer array enemyEnergies denoting the energy values of
various enemies. You are also given an integer currentEnergy denoting the
amount of energy you have initially. You start with 0 points, and all the
enemies are unmarked initially. You can perform either of the following
operations zero or multiple times to gain points:
* Choose an unmarked enemy, i, such that currentEnergy >= enemyEnergies[i].
  By choosing this option:
  + You gain 1 point.
  + Your energy is reduced by the enemy's energy, i.e. currentEnergy =
    currentEnergy - enemyEnergies[i].
* If you have at least 1 point, you can choose an unmarked enemy, i. By
  choosing this option:
  + Your energy increases by the enemy's energy, i.e. currentEnergy =
    currentEnergy + enemyEnergies[i].
  + The enemy i is marked.
Return an integer denoting the maximum points you can get in the end by
optimally performing operations.

Example 1:
Input: enemyEnergies = [3,2,2], currentEnergy = 2
Output: 3
Explanation: The following operations can be performed to get 3 points,
             which is the maximum:
             - First operation on enemy 1: points increases by 1, and
               currentEnergy decreases by 2. So, points = 1, and
               currentEnergy = 0.
             - Second operation on enemy 0: currentEnergy increases by 3,
               and enemy 0 is marked. So, points = 1, currentEnergy = 3, and
               marked enemies = [0].
             - First operation on enemy 2: points increases by 1, and
               currentEnergy decreases by 2. So, points = 2,
               currentEnergy = 1, and marked enemies = [0].
             - Second operation on enemy 2: currentEnergy increases by 2,
               and enemy 2 is marked. So, points = 2, currentEnergy = 3, and
               marked enemies = [0, 2].
             - First operation on enemy 1: points increases by 1, and
               currentEnergy decreases by 2. So, points = 3,
               currentEnergy = 1, and marked enemies = [0, 2].

Example 2:
Input: enemyEnergies = [2], currentEnergy = 10
Output: 5
Explanation: Performing the first operation 5 times on enemy 0 results in
             the maximum number of points.

Constraints:
* 1 <= enemyEnergies.length <= 10^5
* 1 <= enemyEnergies[i] <= 10^9
* 0 <= currentEnergy <= 10^9*/

function maximumPoints(enemyEnergies: number[], currentEnergy: number): number {
    const m = Math.min(...enemyEnergies);
    if (currentEnergy < m) return 0;
    return Math.floor((currentEnergy + enemyEnergies.reduce((x, y) => x+y, 0) - m)/m);
};


/*3208. Alternating Groups II (Medium）
There is a circle of red and blue tiles. You are given an array of integers
colors and an integer k. The color of tile i is represented by colors[i]:
* colors[i] == 0 means that tile i is red.
* colors[i] == 1 means that tile i is blue.
An alternating group is every k contiguous tiles in the circle with
alternating colors (each tile in the group except the first and last one has
a different color from its left and right tiles). Return the number of
alternating groups. Note that since colors represents a circle, the first
and the last tiles are considered to be next to each other.

Example 1:
Input: colors = [0,1,0,1,0], k = 3
Output: 3
Explanation:
Alternating groups:

Example 2:
Input: colors = [0,1,0,0,1,0,1], k = 6
Output: 2
Explanation:
Alternating groups:

Example 3:
Input: colors = [1,1,0,1], k = 4
Output: 0
Explanation:

Constraints:
* 3 <= colors.length <= 10^5
* 0 <= colors[i] <= 1
* 3 <= k <= colors.length*/

function numberOfAlternatingGroups(colors: number[], k: number): number {
    let ans = 0;
    for (let i = 0, cnt = 0, n = colors.length; i < n+k-1; ++i) {
        if (i && colors[(i-1)%n] == colors[i%n]) cnt = 0;
        if (++cnt >= k) ++ans;
    }
    return ans;
};


/*3209. Number of Subarrays With AND Value of K (Hard)
Given an array of integers nums and an integer k, return the number of
subarrays of nums where the bitwise AND of the elements of the subarray
equals k.

Example 1:
Input: nums = [1,1,1], k = 1
Output: 6
Explanation: All subarrays contain only 1's.

Example 2:
Input: nums = [1,1,2], k = 1
Output: 3
Explanation: Subarrays having an AND value of 1 are: [1,1,2], [1,1,2], [1,1,2].

Example 3:
Input: nums = [1,2,3], k = 2
Output: 2
Explanation: Subarrays having an AND value of 2 are: [1,2,3], [1,2,3].

Constraints:
* 1 <= nums.length <= 10^5
* 0 <= nums[i], k <= 10^9*/

function countSubarrays(nums: number[], k: number): number {
    let ans = 0, freq = new Map();
    for (const x of nums) {
        const temp = new Map();
        if ((k & x) == k) {
            freq.set(x, 1 + (freq.get(x) ?? 0));
            for (const [key, val] of freq.entries())
                temp.set(key & x, val + (temp.get(key & x) ?? 0));
            ans += temp.get(k) ?? 0;
        }
        freq = temp;
    }
    return ans;
};


/*3216. Lexicographically Smallest String After a Swap (Easy)
Given a string s containing only digits, return the lexicographically
smallest string that can be obtained after swapping adjacent digits in s
with the same parity at most once. Digits have the same parity if both are
odd or both are even. For example, 5 and 9, as well as 2 and 4, have the
same parity, while 6 and 9 do not.

Example 1:
Input: s = "45320"
Output: "43520"
Explanation: s[1] == '5' and s[2] == '3' both have the same parity, and
             swapping them results in the lexicographically smallest string.

Example 2:
Input: s = "001"
Output: "001"
Explanation: There is no need to perform a swap because s is already the
             lexicographically smallest.

Constraints:
* 2 <= s.length <= 100
* s consists only of digits.*/

function getSmallestString(s: string): string {
    const ch = s.split('');
    for (let i = 0; i < s.length-1; ++i) {
        const v = ch[i].charCodeAt(0)-97, n = ch[i+1].charCodeAt(0)-97;
        if ((v-n)%2 == 0 && v > n) {
            [ch[i], ch[i+1]] = [ch[i+1], ch[i]];
            break;
        }
    }
    return ch.join('');
};


/*3217. Delete Nodes From Linked List Present in Array (Medium)
You are given an array of integers nums and the head of a linked list.
Return the head of the modified linked list after removing all nodes from
the linked list that have a value that exists in nums.

Example 1:
Input: nums = [1,2,3], head = [1,2,3,4,5]
Output: [4,5]
Explanation: Remove the nodes with values 1, 2, and 3.

Example 2:
Input: nums = [1], head = [1,2,1,2,1,2]
Output: [2,2,2]
Explanation: Remove the nodes with value 1.

Example 3:
Input: nums = [5], head = [1,2,3,4]
Output: [1,2,3,4]
Explanation: No node has value 5.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5
* All elements in nums are unique.
* The number of nodes in the given list is in the range [1, 10^5].
* 1 <= Node.val <= 10^5
* The input is generated such that there is at least one node in the linked
  list that has a value not present in nums.*/

function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
    const seen = new Set(nums);
    let dummy = new ListNode(0, head);
    for (let node = dummy; node.next; )
        if (seen.has(node.next.val))
            node.next = node.next.next;
        else
            node = node.next;
    return dummy.next;
};


/*3218. Minimum Cost for Cutting Cake I (Medium)
There is an m x n cake that needs to be cut into 1 x 1 pieces. You are given
integers m, n, and two arrays:
* horizontalCut of size m - 1, where horizontalCut[i] represents the cost to
  cut along the horizontal line i.
* verticalCut of size n - 1, where verticalCut[j] represents the cost to cut
  along the vertical line j.
In one operation, you can choose any piece of cake that is not yet a 1 x 1
square and perform one of the following cuts:
* Cut along a horizontal line i at a cost of horizontalCut[i].
* Cut along a vertical line j at a cost of verticalCut[j].
After the cut, the piece of cake is divided into two distinct pieces. The
cost of a cut depends only on the initial cost of the line and does not
change. Return the minimum total cost to cut the entire cake into 1 x 1
pieces.

Example 1:
Input: m = 3, n = 2, horizontalCut = [1,3], verticalCut = [5]
Output: 13
Explanation: Perform a cut on the vertical line 0 with cost 5, current total
             cost is 5.
             Perform a cut on the horizontal line 0 on 3 x 1 subgrid with
             cost 1.
             Perform a cut on the horizontal line 0 on 3 x 1 subgrid with
             cost 1.
             Perform a cut on the horizontal line 1 on 2 x 1 subgrid with
             cost 3.
             Perform a cut on the horizontal line 1 on 2 x 1 subgrid with
             cost 3.
             The total cost is 5 + 1 + 1 + 3 + 3 = 13.

Example 2:
Input: m = 2, n = 2, horizontalCut = [7], verticalCut = [4]
Output: 15
Explanation: Perform a cut on the horizontal line 0 with cost 7.
             Perform a cut on the vertical line 0 on 1 x 2 subgrid with cost
             4.
             Perform a cut on the vertical line 0 on 1 x 2 subgrid with cost
             4.
             The total cost is 7 + 4 + 4 = 15.

Constraints:
* 1 <= m, n <= 20
* horizontalCut.length == m - 1
* verticalCut.length == n - 1
* 1 <= horizontalCut[i], verticalCut[i] <= 10^3*/

function minimumCost(m: number, n: number, horizontalCut: number[], verticalCut: number[]): number {
    let ans = 0;
    horizontalCut.sort((a, b) => a-b);
    verticalCut.sort((a, b) => a-b);
    let hh = horizontalCut.reduce((a, b) => a+b, 0), vv = verticalCut.reduce((a, b) => a+b, 0);
    let h = horizontalCut.length-1, v = verticalCut.length-1;
    while (h >= 0 || v >= 0)
        if (h < 0 || v >= 0 && verticalCut[v] > horizontalCut[h]) {
            ans += verticalCut[v] + hh;
            vv -= verticalCut[v--];
        } else {
            ans += horizontalCut[h] + vv;
            hh -= horizontalCut[h--];
        }
    return ans;
};


/*3219. Minimum Cost for Cutting Cake II (Hard)
There is an m x n cake that needs to be cut into 1 x 1 pieces. You are given
integers m, n, and two arrays:
* horizontalCut of size m - 1, where horizontalCut[i] represents the cost to
  cut along the horizontal line i.
* verticalCut of size n - 1, where verticalCut[j] represents the cost to cut
  along the vertical line j.
In one operation, you can choose any piece of cake that is not yet a 1 x 1
square and perform one of the following cuts:
* Cut along a horizontal line i at a cost of horizontalCut[i].
* Cut along a vertical line j at a cost of verticalCut[j].
After the cut, the piece of cake is divided into two distinct pieces. The
cost of a cut depends only on the initial cost of the line and does not
change. Return the minimum total cost to cut the entire cake into 1 x 1
pieces.

Example 1:
Input: m = 3, n = 2, horizontalCut = [1,3], verticalCut = [5]
Output: 13
Explanation: Perform a cut on the vertical line 0 with cost 5, current total
             cost is 5.
             Perform a cut on the horizontal line 0 on 3 x 1 subgrid with
             cost 1.
             Perform a cut on the horizontal line 0 on 3 x 1 subgrid with
             cost 1.
             Perform a cut on the horizontal line 1 on 2 x 1 subgrid with
             cost 3.
             Perform a cut on the horizontal line 1 on 2 x 1 subgrid with
             cost 3.
             The total cost is 5 + 1 + 1 + 3 + 3 = 13.

Example 2:
Input: m = 2, n = 2, horizontalCut = [7], verticalCut = [4]
Output: 15
Explanation: Perform a cut on the horizontal line 0 with cost 7.
             Perform a cut on the vertical line 0 on 1 x 2 subgrid with cost
             4.
             Perform a cut on the vertical line 0 on 1 x 2 subgrid with cost
             4.
             The total cost is 7 + 4 + 4 = 15.

Constraints:
* 1 <= m, n <= 10^5
* horizontalCut.length == m - 1
* verticalCut.length == n - 1
* 1 <= horizontalCut[i], verticalCut[i] <= 10^3*/

function minimumCost(m: number, n: number, horizontalCut: number[], verticalCut: number[]): number {
    let ans = 0;
    horizontalCut.sort((a, b) => a-b);
    verticalCut.sort((a, b) => a-b);
    let hh = horizontalCut.reduce((a, b) => a+b, 0), vv = verticalCut.reduce((a, b) => a+b, 0);
    let h = horizontalCut.length-1, v = verticalCut.length-1;
    while (h >= 0 || v >= 0)
        if (h < 0 || v >= 0 && verticalCut[v] > horizontalCut[h]) {
            ans += verticalCut[v] + hh;
            vv -= verticalCut[v--];
        } else {
            ans += horizontalCut[h] + vv;
            hh -= horizontalCut[h--];
        }
    return ans;
};


/*3222. Find the Winning Player in Coin Game (Easy)
You are given two positive integers x and y, denoting the number of coins
with values 75 and 10 respectively. Alice and Bob are playing a game. Each
turn, starting with Alice, the player must pick up coins with a total value
115. If the player is unable to do so, they lose the game. Return the name
of the player who wins the game if both players play optimally.

Example 1:
Input: x = 2, y = 7
Output: "Alice"
Explanation: The game ends in a single turn:
             - Alice picks 1 coin with a value of 75 and 4 coins with a value
               of 10.

Example 2:
Input: x = 4, y = 11
Output: "Bob"
Explanation: The game ends in 2 turns:
             - Alice picks 1 coin with a value of 75 and 4 coins with a
               value of 10.
             - Bob picks 1 coin with a value of 75 and 4 coins with a value
               of 10.

Constraints: 1 <= x, y <= 100*/

function losingPlayer(x: number, y: number): string {
    return Math.min(x, Math.floor(y/4)) & 1 ? "Alice" : "Bob";
};


/*3223. Minimum Length of String After Operations (Medium)
You are given a string s. You can perform the following process on s any
number of times:
* Choose an index i in the string such that there is at least one character
  to the left of index i that is equal to s[i], and at least one character
  to the right that is also equal to s[i].
* Delete the closest character to the left of index i that is equal to s[i].
* Delete the closest character to the right of index i that is equal to s[i].
Return the minimum length of the final string s that you can achieve.

Example 1:
Input: s = "abaacbcbb"
Output: 5
Explanation: We do the following operations:
             - Choose index 2, then remove the characters at indices 0 and
               3. The resulting string is s = "bacbcbb".
             - Choose index 3, then remove the characters at indices 0 and
               5. The resulting string is s = "acbcb".

Example 2:
Input: s = "aa"
Output: 2
Explanation: We cannot perform any operations, so we return the length of
             the original string.

Constraints:
* 1 <= s.length <= 2 * 10^5
* s consists only of lowercase English letters.*/

function minimumLength(s: string): number {
    const freq = new Map();
    for (const ch of s)
        freq.set(ch, 1 + (freq.get(ch) ?? 0));
    return Array.from(freq.values()).reduce((s, x) => s+2-x%2, 0);
};


/*3224. Minimum Array Changes to Make Differences Equal (Medium)
You are given an integer array nums of size n where n is even, and an
integer k. You can perform some changes on the array, where in one change
you can replace any element in the array with any integer in the range from
0 to k. You need to perform some changes (possibly none) such that the final
array satisfies the following condition:
* There exists an integer X such that abs(a[i] - a[n - i - 1]) = X for all
  (0 <= i < n).
Return the minimum number of changes required to satisfy the above
condition.

Example 1:
Input: nums = [1,0,1,2,4,3], k = 4
Output: 2
Explanation: We can perform the following changes:
             - Replace nums[1] by 2. The resulting array is
               nums = [1,2,1,2,4,3].
             - Replace nums[3] by 3. The resulting array is
               nums = [1,2,1,3,4,3].
             The integer X will be 2.

Example 2:
Input: nums = [0,1,2,3,3,6,5,4], k = 6
Output: 2
Explanation: We can perform the following operations:
             - Replace nums[3] by 0. The resulting array is
               nums = [0,1,2,0,3,6,5,4].
             - Replace nums[4] by 4. The resulting array is
               nums = [0,1,2,0,4,6,5,4].
             The integer X will be 4.

Constraints:
* 2 <= n == nums.length <= 10^5
* n is even.
* 0 <= nums[i] <= k <= 10^5*/

function minChanges(nums: number[], k: number): number {
    const line = Array(k+2).fill(0), n = nums.length;
    for (let i = 0; i < n/2; ++i) {
        if (nums[i] > nums[n-1-i])
            [nums[i], nums[n-1-i]] = [nums[n-1-i], nums[i]];
        let diff = nums[n-1-i] - nums[i];
        --line[diff];
        ++line[diff+1];
        diff += Math.max(nums[i], k-nums[n-1-i]);
        ++line[diff+1];
    }
    let ans = Math.floor(n/2);
    for (let x = 0, prefix = ans; x <= k; ++x) {
        prefix += line[x];
        ans = Math.min(ans, prefix);
    }
    return ans;
};


/*3225. Maximum Score From Grid Operations (Hard)
You are given a 2D matrix grid of size n x n. Initially, all cells of the
grid are colored white. In one operation, you can select any cell of indices
(i, j), and color black all the cells of the jth column starting from the
top row down to the ith row. The grid score is the sum of all grid[i][j]
such that cell (i, j) is white and it has a horizontally adjacent black
cell. Return the maximum score that can be achieved after some number of
operations.

Example 1:
Input: grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]
Output: 11
Explanation: In the first operation, we color all cells in column 1 down to
             row 3, and in the second operation, we color all cells in
             column 4 down to the last row. The score of the resulting grid
             is grid[3][0] + grid[1][2] + grid[3][3] which is equal to 11.

Example 2:
Input: grid = [[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,3]]
Output: 94
Explanation: We perform operations on 1, 2, and 3 down to rows 1, 4, and 0,
             respectively. The score of the resulting grid is
             grid[0][0] + grid[1][0] + grid[2][1] + grid[4][1] + grid[1][3]
             + grid[2][3] + grid[3][3] + grid[4][3] + grid[0][4] which is
             equal to 94.

Constraints:
* 1 <= n == grid.length <= 100
* n == grid[i].length
* 0 <= grid[i][j] <= 10^9*/

function maximumScore(grid: number[][]): number {
    const n = grid.length;
    const prefix = Array(n+1).fill(0).map(() => Array(n).fill(0));
    const excl = Array(n+1).fill(0).map(() => Array(n).fill(0));
    const incl = Array(n+1).fill(0).map(() => Array(n).fill(0));
    for (let j = 0; j < n; ++j) {
        for (let i = 0; i < n; ++i)
            prefix[i+1][j] = prefix[i][j] + grid[i][j];
        if (j) {
            for (let c = 0; c <= n; ++c)
                for (let p = 0; p <= n; ++p) {
                    let pv = 0, cv = 0;
                    if (c > p) pv = prefix[c][j-1] - prefix[p][j-1];
                    else cv = prefix[p][j] - prefix[c][j];
                    excl[c][j] = Math.max(excl[c][j], pv + excl[p][j-1], incl[p][j-1]);
                    incl[c][j] = Math.max(incl[c][j], cv + incl[p][j-1], pv + cv + excl[p][j-1]);
                }
        }
    }
    return incl.reduce((m, x) => Math.max(m, x[n-1]), 0);
};


/*3226. Number of Bit Changes to Make Two Integers Equal (Easy)
You are given two positive integers n and k. You can choose any bit in the
binary representation of n that is equal to 1 and change it to 0. Return the
number of changes needed to make n equal to k. If it is impossible, return
-1.

Example 1:
Input: n = 13, k = 4
Output: 2
Explanation: Initially, the binary representations of n and k are
             n = (1101)2 and k = (0100)2. We can change the first and fourth
             bits of n. The resulting integer is n = (0100)2 = k.

Example 2:
Input: n = 21, k = 21
Output: 0
Explanation: n and k are already equal, so no changes are needed.

Example 3:
Input: n = 14, k = 13
Output: -1
Explanation: It is not possible to make n equal to k.

Constraints: 1 <= n, k <= 10^6*/

function minChanges(n: number, k: number): number {
    return (n & k) == k ? (n^k).toString(2).split('').filter(x => x=='1').length : -1;
};


/*3227. Vowels Game in a String (Medium)
Alice and Bob are playing a game on a string. You are given a string s,
Alice and Bob will take turns playing the following game where Alice starts
first:
* On Alice's turn, she has to remove any non-empty substring from s that
  contains an odd number of vowels.
* On Bob's turn, he has to remove any non-empty substring from s that
  contains an even number of vowels.
The first player who cannot make a move on their turn loses the game. We
assume that both Alice and Bob play optimally. Return true if Alice wins the
game, and false otherwise. The English vowels are: a, e, i, o, and u.

Example 1:
Input: s = "leetcoder"
Output: true
Explanation: Alice can win the game as follows:
             * Alice plays first, she can delete the underlined substring in
               s = "leetcoder" which contains 3 vowels. The resulting string
               is s = "der".
             * Bob plays second, he can delete the underlined substring in
               s = "der" which contains 0 vowels. The resulting string is
               s = "er".
             * Alice plays third, she can delete the whole string s = "er"
               which contains 1 vowel.
             * Bob plays fourth, since the string is empty, there is no
             valid play for Bob. So Alice wins the game.

Example 2:
Input: s = "bbcd"
Output: false
Explanation: There is no valid play for Alice in her first turn, so Alice
             loses the game.

Constraints:
* 1 <= s.length <= 10^5
* s consists only of lowercase English letters.*/

function doesAliceWin(s: string): boolean {
    for (const ch of "aeiou")
        if (s.indexOf(ch) != -1)
            return true;
    return false;
};


/*3228. Maximum Number of Operations to Move Ones to the End (Medium)
You are given a binary string s. You can perform the following operation on
the string any number of times:
* Choose any index i from the string where i + 1 < s.length such that
  s[i] == '1' and s[i + 1] == '0'.
* Move the character s[i] to the right until it reaches the end of the
  string or another '1'. For example, for s = "010010", if we choose i = 1,
  the resulting string will be s = "000110".
Return the maximum number of operations that you can perform.

Example 1:
Input: s = "1001101"
Output: 4
Explanation: We can perform the following operations:
             Choose index i = 0. The resulting string is s = "0011101".
             Choose index i = 4. The resulting string is s = "0011011".
             Choose index i = 3. The resulting string is s = "0010111".
             Choose index i = 2. The resulting string is s = "0001111".

Example 2:
Input: s = "00111"
Output: 0

Constraints:
* 1 <= s.length <= 10^5
* s[i] is either '0' or '1'.*/

function maxOperations(s: string): number {
    let ans = 0, cnt = 0;
    for (let n = s.length, i = n-1; i >= 0; --i)
        if (s[i] == '0') {
            if (i+1 == n || s[i+1] == '1') ++cnt;
        } else ans += cnt;
    return ans;
};


/*3229. Minimum Operations to Make Array Equal to Target (Hard)
You are given two positive integer arrays nums and target, of the same
length. In a single operation, you can select any subarray of nums and
increment or decrement each element within that subarray by 1. Return the
minimum number of operations required to make nums equal to the array
target.

Example 1:
Input: nums = [3,5,1,2], target = [4,6,2,4]
Output: 2
Explanation: We will perform the following operations to make nums equal to
             target:
            - Increment nums[0..3] by 1, nums = [4,6,2,3].
             - Increment nums[3..3] by 1, nums = [4,6,2,4].

Example 2:
Input: nums = [1,3,2], target = [2,1,4]
Output: 5
Explanation: We will perform the following operations to make nums equal to
             target:
             - Increment nums[0..0] by 1, nums = [2,3,2].
             - Decrement nums[1..1] by 1, nums = [2,2,2].
             - Decrement nums[1..1] by 1, nums = [2,1,2].
             - Increment nums[2..2] by 1, nums = [2,1,3].
             - Increment nums[2..2] by 1, nums = [2,1,4].

Constraints:
* 1 <= nums.length == target.length <= 10^5
* 1 <= nums[i], target[i] <= 10^8*/

function minimumOperations(nums: number[], target: number[]): number {
    let ans = 0, prev = 0;
    for (let i = 0; i < nums.length; ++i) {
        const diff = target[i] - nums[i];
        ans += Math.max(0, diff - prev);
        prev = diff;
    }
    return ans + Math.max(0, -prev);
};


/*3232. Find if Digit Game Can Be Won (Easy)
You are given an array of positive integers nums. Alice and Bob are playing
a game. In the game, Alice can choose either all single-digit numbers or all
double-digit numbers from nums, and the rest of the numbers are given to
Bob. Alice wins if the sum of her numbers is strictly greater than the sum
of Bob's numbers. Return true if Alice can win this game, otherwise, return
false.

Example 1:
Input: nums = [1,2,3,4,10]
Output: false
Explanation: Alice cannot win by choosing either single-digit or double-
             digit numbers.

Example 2:
Input: nums = [1,2,3,4,5,14]
Output: true
Explanation: Alice can win by choosing single-digit numbers which have a sum
             equal to 15.

Example 3:
Input: nums = [5,5,5,25]
Output: true
Explanation: Alice can win by choosing double-digit numbers which have a sum
             equal to 25.

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 99*/

function canAliceWin(nums: number[]): boolean {
    let single = 0, total = 0;
    for (const x of nums) {
        if (x < 10) single += x;
        total += x;
    }
    return 2*single != total;
};


/*3233. Find the Count of Numbers Which Are Not Special (Medium)
You are given 2 positive integers l and r. For any number x, all positive
divisors of x except x are called the proper divisors of x. A number is
called special if it has exactly 2 proper divisors. For example:
* The number 4 is special because it has proper divisors 1 and 2.
* The number 6 is not special because it has proper divisors 1, 2, and 3.
Return the count of numbers in the range [l, r] that are not special.

Example 1:
Input: l = 5, r = 7
Output: 3
Explanation: There are no special numbers in the range [5, 7].

Example 2:
Input: l = 4, r = 16
Output: 11
Explanation: The special numbers in the range [4, 16] are 4 and 9.

Constraints: 1 <= l <= r <= 10^9*/

function nonSpecialCount(l: number, r: number): number {
    const lo = Math.ceil(Math.sqrt(l)), hi = Math.floor(Math.sqrt(r));
    const sieve = Array(hi+1).fill(1);
    sieve[0] = sieve[1] = 0;
    for (let x = 2; x <= hi; ++x)
        if (x)
            for (let xx = x*x; xx <= hi; xx += x)
                sieve[xx]  = 0;
    return r-l+1 - sieve.slice(lo).reduce((s, x) => s+x, 0);
};


/*3234. Count the Number of Substrings With Dominant Ones (Medium)
You are given a binary string s. Return the number of substrings with
dominant ones. A string has dominant ones if the number of ones in the
string is greater than or equal to the square of the number of zeros in the
string.

Example 1:
Input: s = "00011"
Output: 5
Explanation: The substrings with dominant ones are shown in the table below.
             i   j   s[i..j] Number of Zeros Number of Ones
             3   3   1   0   1
             4   4   1   0   1
             2   3   01  1   1
             3   4   11  0   2
             2   4   011 1   2

Example 2:
Input: s = "101101"
Output: 16
Explanation: The substrings with non-dominant ones are shown in the table
             below. Since there are 21 substrings total and 5 of them have
             non-dominant ones, it follows that there are 16 substrings with
             dominant ones.
             i   j   s[i..j] Number of Zeros Number of Ones
             1   1   0   1   0
             4   4   0   1   0
             1   4   0110    2   2
             0   4   10110   2   3
             1   5   01101   2   3

Constraints:
* 1 <= s.length <= 4 * 10^4
* s consists only of characters '0' and '1'.*/

function numberOfSubstrings(s: string): number {
    const n = s.length;
    let ans = 0;
    for (let z = 0; z*z <= n; ++z) {
        let j = 0, zeroj = 0, k = 0, zerok = 0, onek = 0;
        for (const [i, ch] of s.split('').entries()) {
            if (ch == '0') ++zeroj, ++zerok;
            else ++onek;
            for (; zeroj > z; ++j)
                if (s[j] == '0') --zeroj;
            for (; zerok > z || k <= i && zerok == z && onek >= zerok**2; ++k)
                if (s[k] == '0') --zerok;
                else --onek;
            ans += k-j;
        }
    }
    return ans;
};


/*3235. Check if the Rectangle Corner Is Reachable (Hard)
You are given two positive integers X and Y, and a 2D array circles, where
circles[i] = [xi, yi, ri] denotes a circle with center at (xi, yi) and
radius ri. There is a rectangle in the coordinate plane with its bottom left
corner at the origin and top right corner at the coordinate (X, Y). You need
to check whether there is a path from the bottom left corner to the top
right corner such that the entire path lies inside the rectangle, does not
touch or lie inside any circle, and touches the rectangle only at the two
corners. Return true if such a path exists, and false otherwise.

Example 1:
Input: X = 3, Y = 4, circles = [[2,1,1]]
Output: true
Explanation: The black curve shows a possible path between (0, 0) and (3, 4).

Example 2:
Input: X = 3, Y = 3, circles = [[1,1,2]]
Output: false
Explanation: No path exists from (0, 0) to (3, 3).

Example 3:
Input: X = 3, Y = 3, circles = [[2,1,1],[1,2,1]]
Output: false
Explanation: No path exists from (0, 0) to (3, 3).

Constraints:
* 3 <= X, Y <= 10^9
* 1 <= circles.length <= 1000
* circles[i].length == 3
* 1 <= xi, yi, ri <= 10^9*/

function canReachCorner(X: number, Y: number, circles: number[][]): boolean {
    const vals = [];
    for (const [x, y, r] of circles) {
        if (x**2 + y**2 <= r**2) return false;
        if ((X-x)**2 + (Y-y)**2 <= r**2) return false;
        if (x >= X+r || y >= Y+r) continue;
        vals.push([x, y, r]);
    }
    circles = vals;
    const n = circles.length;
    const parent = Array(n).fill(0).map((x, i) => i);

    function find(p) {
        if (p != parent[p])
            parent[p] = find(parent[p]);
        return parent[p];
    }

    for (let i = 0; i < n; ++i) {
        const [xi, yi, ri] = circles[i];
        for (let j = i+1; j < n; ++j) {
            const [xj, yj, rj] = circles[j];
            if ((xi-xj)**2 + (yi-yj)**2 <= (ri+rj)**2) {
                const ii = find(i), jj = find(j);
                parent[ii] = jj;
            }
        }
    }
    const group = new Map();
    for (let i = 0; i < n; ++i) {
        const ii = find(i);
        if (!group.has(ii)) group.set(ii, []);
        group.get(ii).push(i);
    }

    for (const grp of group.values()) {
        let inside = false, xmax = -Infinity, ymax = -Infinity, xmin = Infinity, ymin = Infinity;
        for (const i of grp) {
            const [x, y, r] = circles[i];
            if (0 <= x && x <= X || 0 <= y && y <= Y) inside = true;
            xmax = Math.max(xmax, x+r);
            ymax = Math.max(ymax, y+r);
            xmin = Math.min(xmin, x-r);
            ymin = Math.min(ymin, y-r);
        }
        if (inside) {
            if (xmin <= 0 && xmax >= X) return false;
            if (ymin <= 0 && ymax >= Y) return false;
            if (xmax >= X && ymax >= Y) return false;
            if (xmin <= 0 && ymin <= 0) return false;
        }
    }
    return true;
};


/*3238. Find the Number of Winning Players (Easy)
You are given an integer n representing the number of players in a game and
a 2D array pick where pick[i] = [xi, yi] represents that the player xi
picked a ball of color yi. Player i wins the game if they pick strictly more
than i balls of the same color. In other words,
* Player 0 wins if they pick any ball.
* Player 1 wins if they pick at least two balls of the same color.
* ...
* Player i wins if they pick at leasti + 1 balls of the same color.
Return the number of players who win the game. Note that multiple players
can win the game.

Example 1:
Input: n = 4, pick = [[0,0],[1,0],[1,0],[2,1],[2,1],[2,0]]
Output: 2
Explanation: Player 0 and player 1 win the game, while players 2 and 3 do
not win.

Example 2:
Input: n = 5, pick = [[1,1],[1,2],[1,3],[1,4]]
Output: 0
Explanation: No player wins the game.

Example 3:
Input: n = 5, pick = [[1,1],[2,4],[2,4],[2,4]]
Output: 1
Explanation: Player 2 wins the game by picking 3 balls with color 4.

Constraints:
* 2 <= n <= 10
* 1 <= pick.length <= 100
* pick[i].length == 2
* 0 <= xi <= n - 1
* 0 <= yi <= 10*/

function winningPlayerCount(n: number, pick: number[][]): number {
    const freq = Array(n).fill(0).map(() => Array(11).fill(0));
    for (const [x, y] of pick)
        ++freq[x][y];
    return freq.map((x, i) => i+1 <= Math.max(...x)).filter(Boolean).length;
};


/*3239. Minimum Number of Flips to Make Binary Grid Palindromic I (Medium)
You are given an m x n binary matrix grid. A row or column is considered
palindromic if its values read the same forward and backward. You can flip
any number of cells in grid from 0 to 1, or from 1 to 0. Return the minimum
number of cells that need to be flipped to make either all rows palindromic
or all columns palindromic.

Example 1:
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 2
Explanation: Flipping the highlighted cells makes all the rows palindromic.

Example 2:
Input: grid = [[0,1],[0,1],[0,0]]
Output: 1
Explanation: Flipping the highlighted cell makes all the columns palindromic.

Example 3:
Input: grid = [[1],[0]]
Output: 0
Explanation: All rows are already palindromic.

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m * n <= 2 * 10^5
* 0 <= grid[i][j] <= 1*/

function minFlips(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    let row = 0, col = 0;
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j) {
            row += grid[i][j] ^ grid[m-1-i][j];
            col += grid[i][j] ^ grid[i][n-1-j];
        }
    return Math.floor(Math.min(row, col)/2);
};


/*3240. Minimum Number of Flips to Make Binary Grid Palindromic II (Medium)
You are given an m x n binary matrix grid. A row or column is considered
palindromic if its values read the same forward and backward. You can flip
any number of cells in grid from 0 to 1, or from 1 to 0. Return the minimum
number of cells that need to be flipped to make all rows and columns
palindromic, and the total number of 1's in grid divisible by 4.

Example 1:
Input: grid = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation:

Example 2:
Input: grid = [[0,1],[0,1],[0,0]]
Output: 2
Explanation:

Example 3:
Input: grid = [[1],[1]]
Output: 2
Explanation:

* Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m * n <= 2 * 10^5
* 0 <= grid[i][j] <= 1*/

function minFlips(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const mm = Math.floor(m/2), nn = Math.floor(n/2);
    let ans = 0, ones = 0;
    if (n & 1)
        for (let i = 0; i < mm; ++i) {
            const total = grid[i][nn] + grid[m-1-i][nn];
            if (total == 2) ++ones;
            else if (total == 1) ++ans;
        }
    if (m & 1)
        for (let j = 0; j < nn; ++j) {
            const total = grid[mm][j] + grid[mm][n-1-j];
            if (total == 2) ++ones;
            else if (total == 1) ++ans;
        }
    if (ones&1 && ans == 0) ans += 2;
    if (m&1 && n&1 && grid[mm][nn]) ++ans;
    for (let i = 0; i < mm; ++i)
        for (let j = 0; j < nn; ++j) {
            const total = grid[i][j] + grid[i][n-1-j] + grid[m-1-i][j] + grid[m-1-i][n-1-j];
            ans += Math.min(total, 4-total);
        }
    return ans;
};


/*3241. Time Taken to Mark All Nodes (Hard)
There exists an undirected tree with n nodes numbered 0 to n - 1. You are
given a 2D integer array edges of length n - 1, where edges[i] = [ui, vi]
indicates that there is an edge between nodes ui and vi in the tree.
Initially, all nodes are unmarked. For each node i:
* If i is odd, the node will get marked at time x if there is at least one
  node adjacent to it which was marked at time x - 1.
* If i is even, the node will get marked at time x if there is at least one
  node adjacent to it which was marked at time x - 2.
Return an array times where times[i] is the time when all nodes get marked
in the tree, if you mark node i at time t = 0. Note that the answer for each
times[i] is independent, i.e. when you mark node i all other nodes are
unmarked.

Example 1:
Input: edges = [[0,1],[0,2]]
Output: [2,4,3]
Explanation: For i = 0: Node 1 is marked at t = 1, and Node 2 at t = 2.
             For i = 1: Node 0 is marked at t = 2, and Node 2 at t = 4.
             For i = 2: Node 0 is marked at t = 2, and Node 1 at t = 3.

Example 2:
Input: edges = [[0,1]]
Output: [1,2]
Explanation: For i = 0: Node 1 is marked at t = 1.
             For i = 1: Node 0 is marked at t = 2.

Example 3:
Input: edges = [[2,4],[0,1],[2,3],[0,2]]
Output: [4,6,3,5,5]
Explanation:

Constraints:
* 2 <= n <= 10^5
* edges.length == n - 1
* edges[i].length == 2
* 0 <= edges[i][0], edges[i][1] <= n - 1
* The input is generated such that edges represents a valid tree.*/

function timeTaken(edges: number[][]): number[] {
    const n = 1 + edges.length;
    const tree = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }
    const vals = Array(n).fill(0).map(() => [[-1, 0], [-1, 0]]);

    function dfs(u, p) {
        for (const v of tree[u])
            if (v != p) {
                const cand = 2 - v%2 + dfs(v, u);
                if (cand > vals[u][0][1]) {
                    vals[u][1] = vals[u][0];
                    vals[u][0] = [v, cand];
                } else if (cand > vals[u][1][1])
                    vals[u][1] = [v, cand];
            }
        return vals[u][0][1];
    }

    dfs(0, -1);
    const ans = Array(n).fill(0), stack = [[0, -1, 0]];
    while (stack.length) {
        const [u, p, x] = stack.pop();
        if (x > vals[u][0][1]) {
            vals[u][1] = vals[u][0];
            vals[u][0] = [p, x];
        } else if (x > vals[u][1][1])
            vals[u][1] = [p, x];
        ans[u] = vals[u][0][1];
        for (const v of tree[u])
            if (v != p) {
                let xx = vals[u][0][1];
                if (v == vals[u][0][0]) xx = vals[u][1][1];
                stack.push([v, u, xx + 2 - u%2]);
            }
    }
    return ans;
};


/*3242. Design Neighbor Sum Service (Easy)
You are given a n x n 2D array grid containing distinct elements in the range
[0, n^2 - 1]. Implement the NeighborSum class:
* NeighborSum(int [][]grid) initializes the object.
* int adjacentSum(int value) returns the sum of elements which are adjacent
  neighbors of value, that is either to the top, left, right, or bottom of value
  in grid.
* int diagonalSum(int value) returns the sum of elements which are diagonal
  neighbors of value, that is either to the top-left, top-right, bottom-left, or
  bottom-right of value in grid.

Example 1:
Input:
["NeighborSum", "adjacentSum", "adjacentSum", "diagonalSum", "diagonalSum"]
[[[[0, 1, 2], [3, 4, 5], [6, 7, 8]]], [1], [4], [4], [8]]
Output: [null, 6, 16, 16, 4]

Explanation: The adjacent neighbors of 1 are 0, 2, and 4.
             The adjacent neighbors of 4 are 1, 3, 5, and 7.
             The diagonal neighbors of 4 are 0, 2, 6, and 8.
             The diagonal neighbor of 8 is 4.

Example 2:
Input:
["NeighborSum", "adjacentSum", "diagonalSum"]
[[[[1, 2, 0, 3], [4, 7, 15, 6], [8, 9, 10, 11], [12, 13, 14, 5]]], [15], [9]]
Output: [null, 23, 45]
Explanation: The adjacent neighbors of 15 are 0, 10, 7, and 6.
             The diagonal neighbors of 9 are 4, 12, 14, and 15.

Constraints:
* 3 <= n == grid.length == grid[0].length <= 10
* 0 <= grid[i][j] <= n^2 - 1
* All grid[i][j] are distinct.
* value in adjacentSum and diagonalSum will be in the range [0, n^2 - 1].
* At most 2 * n^2 calls will be made to adjacentSum and diagonalSum.*/

class NeighborSum {
    public vals: number[][];

    constructor(grid: number[][]) {
        const n = grid.length;
        this.vals = Array(2).fill(0).map(() => Array(n*n).fill(0));
        for (let i = 0; i < n; ++i)
            for (let j = 0; j < n; ++j) {
                for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
                    if (0 <= ii && ii < n && 0 <= jj && jj < n)
                        this.vals[0][grid[i][j]] += grid[ii][jj];
                for (const [ii, jj] of [[i-1, j-1], [i-1, j+1], [i+1, j-1], [i+1, j+1]])
                    if (0 <= ii && ii < n && 0 <= jj && jj < n)
                        this.vals[1][grid[i][j]] += grid[ii][jj];
            }
    }

    adjacentSum(value: number): number {
        return this.vals[0][value];
    }

    diagonalSum(value: number): number {
        return this.vals[1][value];
    }
}


/*3243. Shortest Distance After Road Addition Queries I (Medium)
You are given an integer n and a 2D integer array queries. There are n
cities numbered from 0 to n - 1. Initially, there is a unidirectional road
from city i to city i + 1 for all 0 <= i < n - 1. queries[i] = [ui, vi]
represents the addition of a new unidirectional road from city ui to city
vi. After each query, you need to find the length of the shortest path from
city 0 to city n - 1. Return an array answer where for each i in the range
[0, queries.length - 1], answer[i] is the length of the shortest path from
city 0 to city n - 1 after processing the first i + 1 queries.

Example 1:
Input: n = 5, queries = [[2,4],[0,2],[0,4]]
Output: [3,2,1]
Explanation: - After the addition of the road from 2 to 4, the length of the
               shortest path from 0 to 4 is 3.
             - After the addition of the road from 0 to 2, the length of the
               shortest path from 0 to 4 is 2.
             - After the addition of the road from 0 to 4, the length of the
               shortest path from 0 to 4 is 1.

Example 2:
Input: n = 4, queries = [[0,3],[0,2]]
Output: [1,1]
Explanation: - After the addition of the road from 0 to 3, the length of the
               shortest path from 0 to 3 is 1.
             - After the addition of the road from 0 to 2, the length of the
               shortest path remains 1.

Constraints:
* 3 <= n <= 500
* 1 <= queries.length <= 500
* queries[i].length == 2
* 0 <= queries[i][0] < queries[i][1] < n
* 1 < queries[i][1] - queries[i][0]
* There are no repeated roads among the queries.*/

function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
    const graph = Array(n).fill(0).map(() => []);
    for (let i = 0; i+1 < n; ++i)
        graph[i].push(i+1);

    function bfs(graph) {
        const queue = [0];
        const seen = Array(n).fill(false);
        seen[0] = true;
        for (let ans = 0; queue.length; ++ans) {
            for (let sz = queue.length; sz; --sz) {
                const u = queue.shift();
                if (u == n-1) return ans;
                for (const v of graph[u])
                    if (!seen[v]) {
                        queue.push(v);
                        seen[v] = true;
                    }
            }
        }
    };

    const ans = [];
    for (const [u, v] of queries) {
        graph[u].push(v);
        ans.push(bfs(graph));
    }
    return ans;
};


/*3244. Shortest Distance After Road Addition Queries II (Hard)
You are given an integer n and a 2D integer array queries. There are n
cities numbered from 0 to n - 1. Initially, there is a unidirectional road
from city i to city i + 1 for all 0 <= i < n - 1. queries[i] = [ui, vi]
represents the addition of a new unidirectional road from city ui to city
vi. After each query, you need to find the length of the shortest path from
city 0 to city n - 1. There are no two queries such that
queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1]. Return an
array answer where for each i in the range [0, queries.length - 1],
answer[i] is the length of the shortest path from city 0 to city n - 1 after
processing the first i + 1 queries.

Example 1:
Input: n = 5, queries = [[2,4],[0,2],[0,4]]
Output: [3,2,1]
Explanation: - After the addition of the road from 2 to 4, the length of the
               shortest path from 0 to 4 is 3.
             - After the addition of the road from 0 to 2, the length of the
               shortest path from 0 to 4 is 2.
             - After the addition of the road from 0 to 4, the length of the
               shortest path from 0 to 4 is 1.

Example 2:
Input: n = 4, queries = [[0,3],[0,2]]
Output: [1,1]
Explanation: - After the addition of the road from 0 to 3, the length of the
               shortest path from 0 to 3 is 1.
             - After the addition of the road from 0 to 2, the length of the
               shortest path remains 1.

Constraints:
* 3 <= n <= 10^5
* 1 <= queries.length <= 10^5
* queries[i].length == 2
* 0 <= queries[i][0] < queries[i][1] < n
* 1 < queries[i][1] - queries[i][0]
* There are no repeated roads among the queries.
* There are no two queries such that i != j and queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1].*/

function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
    const ans = [], jump = Array(--n).fill(0).map((_, i) => i+1);
    for (let [u, v] of queries) {
        for (; jump[u] < v; --n)
            [jump[u], u] = [v, jump[u]];
        ans.push(n);
    }
    return ans;
};


/*3245. Alternating Groups III (Hard)
There are some red and blue tiles arranged circularly. You are given an
array of integers colors and a 2D integers array queries. The color of tile
i is represented by colors[i]:
* colors[i] == 0 means that tile i is red.
* colors[i] == 1 means that tile i is blue.
An alternating group is a contiguous subset of tiles in the circle with
alternating colors (each tile in the group except the first and last one has
a different color from its adjacent tiles in the group). You have to process
queries of two types:
* queries[i] = [1, sizei], determine the count of alternating groups with
  size sizei.
* queries[i] = [2, indexi, colori], change colors[indexi] to colori.
Return an array answer containing the results of the queries of the first
type in order. Note that since colors represents a circle, the first and the
last tiles are considered to be next to each other.

Example 1:
Input: colors = [0,1,1,0,1], queries = [[2,1,0],[1,4]]
Output: [2]
Explanation: First query:
             Change colors[1] to 0.
             Second query:
             Count of the alternating groups with size 4:

Example 2:
Input: colors = [0,0,1,0,1,1], queries = [[1,3],[2,3,0],[1,5]]
Output: [2,0]
Explanation: First query:
             Count of the alternating groups with size 3:
             Second query: colors will not change.
             Third query: There is no alternating group with size 5.

Constraints:
* 4 <= colors.length <= 5 * 10^4
* 0 <= colors[i] <= 1
* 1 <= queries.length <= 5 * 10^4
* queries[i][0] == 1 or queries[i][0] == 2
* For all i that:
* queries[i][0] == 1: queries[i].length == 2, 3 <= queries[i][1] <= colors.length - 1
* queries[i][0] == 2: queries[i].length == 3, 0 <= queries[i][1] <= colors.length - 1, 0 <= queries[i][2] <= 1*/

class Node {
    public key: number;
    public value: number;
    public left: Node | null;
    public right: Node | null;
    public height: number;

    constructor(key, value, left=null, right=null, height=1) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = height;
    }
}

class AVLTree {
    private root: Node | null;
    public size: number;

    constructor() {
        this.root = null;
        this.size = 0;
    }

    balance(node) {
        if (!node) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    ceilingEntry(key) {
        let ans = null;
        for (let node = this.root; node; )
            if (node.key < key) node = node.right;
            else {
                ans = node;
                node = node.left;
            }
        return ans;
    }

    entrySet() {
        return this.#traverse().map(x => [x.key, x.value]);
    }

    firstEntry() {
        return this.#firstEntry(this.root);
    }

    floorEntry(key) {
        let ans = null;
        for (let node = this.root; node; )
            if (key < node.key) node = node.left;
            else {
                ans = node;
                node = node.right;
            }
        return ans;
    }

    get(key) {
        return this.#get(this.root, key);
    }

    height(node) {
        return node ? node.height : 0;
    }

    put(key, value=0) {
        this.root = this.#put(this.root, key, value);
    }

    remove(key) {
        this.root = this.#remove(this.root, key);
    }

    toString() {
        return "{" + this.#traverse().map(x => `${x.key}: ${x.value}`).join(", ") + "}";
    }

    #firstEntry(node) {
        while (node && node.left) node = node.left;
        return node;
    }

    #get(node, key) {
        if (!node) return null;
        if (node.key === key) return node.value;
        if (node.key < key) return this.#get(node.right, key);
        return this.#get(node.left, key);
    }

    #left_rotate(node) {
        let y = node.right, T2 = y.left;
        y.left = node;
        node.right = T2;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    #put(node, key, value) {
        if (!node) {
            ++this.size;
            return new Node(key, value);
        } else if (key < node.key) node.left = this.#put(node.left, key, value);
        else if (key > node.key) node.right = this.#put(node.right, key, value);
        else {
            node.value = value;
            return node;
        }
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let bal = this.balance(node);
        if (bal > 1 && key < node.left.key)
            return this.#right_rotate(node);
        if (bal < -1 && key > node.right.key)
            return this.#left_rotate(node);
        if (bal > 1 && key > node.left.key) {
            node.left = this.#left_rotate(node.left);
            return this.#right_rotate(node);
        }
        if (bal < -1 && key < node.right.key) {
            node.right = this.#right_rotate(node.right);
            return this.#left_rotate(node);
        }
        return node;
    }

    #remove(node, key) {
        if (!node) return node;
        if (key < node.key) node.left = this.#remove(node.left, key);
        else if (key > node.key) node.right = this.#remove(node.right, key);
        else {
            if (!node.left) {
                let temp = node.right;
                node = null;
                --this.size;
                return temp;
            }
            if (!node.right) {
                let temp = node.left;
                node = null;
                --this.size;
                return temp;
            }
            let temp = this.#firstEntry(node.right);
            node.key = temp.key;
            node.value = temp.value;
            node.right = this.#remove(node.right, temp.key);
        }
        if (!node) return node;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let bal = this.balance(node);
        if (bal > 1 && this.balance(node.left) > 0)
            return this.#right_rotate(node);
        if (bal < -1 && this.balance(node.right) < 0)
            return this.#left_rotate(node);
        if (bal > 1 && this.balance(node.left) < 0) {
            node.left = this.#left_rotate(node.left);
            return this.#right_rotate(node);
        }
        if (bal < -1 && this.balance(node.right) > 0) {
            node.right = this.#right_rotate(node.right);
            return this.#left_rotate(node);
        }
        return node;
    }

    #right_rotate(node) {
        let y = node.left, T3 = y.right;
        y.right = node;
        node.left = T3;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    #traverse() {
        const ans = [], stack = [];
        let node = this.root;
        while (stack.length || node)
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                ans.push(node);
                node = node.right;
            }
        return ans;
    }
}

class Fenwick {
    private cnts: number[];
    private vals: number[];

    constructor(n) {
        this.cnts = Array(n+1).fill(0);
        this.vals = Array(n+1).fill(0);
    }

    add(k, v) {
        for (let i = k+1; i < this.cnts.length; i += i & -i) {
            this.cnts[i] += v;
            this.vals[i] += v*k;
        }
    }

    query(k, v) {
        let ans = 0;
        for (let i = k+1; i; i -= i & -i)
            ans += this.vals[i] - v*this.cnts[i];
        return ans;
    }
}

function numberOfAlternatingGroups(colors: number[], queries: number[][]): number[] {
    const n = colors.length;
    const groups = new AVLTree();
    for (let i = 0, j = 0; i < n; i = j+1) {
        for (j = i; j < i+n-1 && colors[j%n] != colors[(j+1)%n]; ++j);
        groups.put(j%n, i);
    }
    const fen = new Fenwick(n+1);

    var dist = (lo, hi) => lo <= hi ? hi-lo+1 : n+hi-lo+1;

    var add = function(lo, hi) {
        groups.put(hi, lo);
        fen.add(dist(lo, hi), 1);
    };

    var remove = function(i) {
        let hi = groups.ceilingEntry(i);
        if (hi == null) hi = groups.firstEntry().key;
        else hi = hi.key;
        const lo = groups.get(hi);
        groups.remove(hi);
        fen.add(dist(lo, hi), -1);
        return [lo, hi];
    };

    for (const [j, i] of groups.entrySet()) {
        add(i, j);
    }
    const ans = [];
    for (const q of queries) {
        if (q[0] === 1) {
            if (groups.size == 1 && colors[groups.firstEntry().key] != colors[groups.firstEntry().value]) ans.push(n);
            else {
                const sz = q[1];
                ans.push(fen.query(n, sz-1) - fen.query(sz-1, sz-1));
            }
        } else {
            const i = q[1], c = q[2];
            if (colors[i] != c) {
                colors[i] = c;
                let [lo, hi] = remove(i);
                if (lo == hi) {
                    if (colors[(i-1+n)%n] != colors[i]) lo = remove((i-1+n)%n)[0];
                    if (colors[i] != colors[(i+1)%n] && groups.size) hi = remove((i+1)%n)[1];
                    add(lo, hi);
                } else if (lo == i) {
                    add((i+1)%n, hi);
                    if (colors[(i-1+n)%n] != colors[i]) lo = remove((i-1+n)%n)[0];
                    add(lo, i);
                } else if (i == hi) {
                    add(lo, (i-1+n)%n);
                    if (colors[i] != colors[(i+1)%n]) hi = remove((i+1)%n)[1];
                    add(i, hi);
                } else {
                    const i0 = (i-1+n)%n, i1 = (i+1)%n;
                    if (dist(lo, hi) == n && colors[lo] != colors[hi]) add(i1, i0);
                    else {
                        add(lo, i0);
                        add(i1, hi);
                    }
                    add(i, i);
                }
            }
        }
    }
    return ans;
};


/*3248. Snake in Matrix (Easy)
There is a snake in an n x n matrix grid and can move in four possible
directions. Each cell in the grid is identified by the position:
grid[i][j] = (i * n) + j. The snake starts at cell 0 and follows a sequence
of commands. You are given an integer n representing the size of the grid
and an array of strings commands where each command[i] is either "UP",
"RIGHT", "DOWN", and "LEFT". It's guaranteed that the snake will remain
within the grid boundaries throughout its movement. Return the position of
the final cell where the snake ends up after executing commands.

Example 1:
Input: n = 2, commands = ["RIGHT","DOWN"]
Output: 3
Explanation: 0   1
             2   3
             0   1
             2   3
             0   1
             2   3

Example 2:
Input: n = 3, commands = ["DOWN","RIGHT","UP"]
Output: 1
Explanation: 0   1   2
             3   4   5
             6   7   8
             0   1   2
             3   4   5
             6   7   8
             0   1   2
             3   4   5
             6   7   8
             0   1   2
             3   4   5
             6   7   8

Constraints:
* 2 <= n <= 10
* 1 <= commands.length <= 100
* commands consists only of "UP", "RIGHT", "DOWN", and "LEFT".
* The input is generated such the snake will not move outside of the
  boundaries.*/

function finalPositionOfSnake(n: number, commands: string[]): number {
    let i = 0, j = 0;
    for (const c of commands)
        switch(c) {
            case "UP": --i; break;
            case "RIGHT": ++j; break;
            case "DOWN": ++i; break;
            default: --j;
        }
    return i*n + j;
};


/*3249. Count the Number of Good Nodes (Medium)
There is an undirected tree with n nodes labeled from 0 to n - 1, and rooted
at node 0. You are given a 2D integer array edges of length n - 1, where
edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi
in the tree. A node is good if all the subtrees rooted at its children have
the same size. Return the number of good nodes in the given tree. A subtree
of treeName is a tree consisting of a node in treeName and all of its
descendants.

Example 1:
Input: edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
Output: 7
Explanation: All of the nodes of the given tree are good.

Example 2:
Input: edges = [[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8]]
Output: 6
Explanation: There are 6 good nodes in the given tree. They are colored in
             the image above.

Example 3:
Input: edges = [[0,1],[1,2],[1,3],[1,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[9,12],[10,11]]
Output: 12
Explanation: All nodes except node 9 are good.

Constraints:
* 2 <= n <= 10^5
* edges.length == n - 1
* edges[i].length == 2
* 0 <= ai, bi < n
* The input is generated such that edges represents a valid tree.*/

function countGoodNodes(edges: number[][]): number {
    const n = edges.length+1;
    const tree = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }
    let ans = 0;

    function dfs(u, p) {
        const freq = new Map();
        for (const v of tree[u])
            if (v != p) {
                const f = dfs(v, u);
                freq.set(f, 1 + (freq.get(f) ?? 0));
            }
        if (freq.size <= 1) ++ans;
        return 1 + [...freq.keys()].reduce((s, k) => s + k*freq.get(k), 0);
    }

    dfs(0, -1);
    return ans;
};


/*3250. Find the Count of Monotonic Pairs I (Hard)
You are given an array of positive integers nums of length n. We call a pair
of non-negative integer arrays (arr1, arr2) monotonic if:
* The lengths of both arrays are n.
* arr1 is monotonically non-decreasing, in other words,
  arr1[0] <= arr1[1] <= ... <= arr1[n - 1].
* arr2 is monotonically non-increasing, in other words,
  arr2[0] >= arr2[1] >= ... >= arr2[n - 1].
* arr1[i] + arr2[i] == nums[i] for all 0 <= i <= n - 1.
Return the count of monotonic pairs. Since the answer may be very large,
return it modulo 10^9 + 7.

Example 1:
Input: nums = [2,3,2]
Output: 4
Explanation: The good pairs are:
             ([0, 1, 1], [2, 2, 1])
             ([0, 1, 2], [2, 2, 0])
             ([0, 2, 2], [2, 1, 0])
             ([1, 2, 2], [1, 1, 0])

Example 2:
Input: nums = [5,5,5,5]
Output: 126

Constraints:
* 1 <= n == nums.length <= 2000
* 1 <= nums[i] <= 50*/

function countOfPairs(nums: number[]): number {
    const n = nums.length;
    const dp = Array(n+1).fill(0).map(() => Array(51).fill(0));
    dp[n].fill(1);
    for (let i = n-1; i >= 0; --i) {
        let diff = 0;
        if (i) diff = Math.max(0, nums[i] - nums[i-1]);
        for (let j = 50; j >= 0; --j) {
            if (j+1 <= 50) dp[i][j] = dp[i][j+1];
            if (j+diff <= nums[i])
                dp[i][j] = (dp[i][j] + dp[i+1][j+diff]) % 1_000_000_007;
        }
    }
    return dp[0][0];
};


/*3251. Find the Count of Monotonic Pairs II (Hard)
You are given an array of positive integers nums of length n. We call a pair
of non-negative integer arrays (arr1, arr2) monotonic if:
* The lengths of both arrays are n.
* arr1 is monotonically non-decreasing, in other words,
  arr1[0] <= arr1[1] <= ... <= arr1[n - 1].
* arr2 is monotonically non-increasing, in other words,
  arr2[0] >= arr2[1] >= ... >= arr2[n - 1].
* arr1[i] + arr2[i] == nums[i] for all 0 <= i <= n - 1.
Return the count of monotonic pairs. Since the answer may be very large,
return it modulo 10^9 + 7.

Example 1:
Input: nums = [2,3,2]
Output: 4
Explanation: The good pairs are:
             ([0, 1, 1], [2, 2, 1])
             ([0, 1, 2], [2, 2, 0])
             ([0, 2, 2], [2, 1, 0])
             ([1, 2, 2], [1, 1, 0])

Example 2:
Input: nums = [5,5,5,5]
Output: 126

Constraints:
* 1 <= n == nums.length <= 2000
* 1 <= nums[i] <= 1000*/

function countOfPairs(nums: number[]): number {
    const n = nums.length;
    const dp = Array(n+1).fill(0).map(() => Array(1001).fill(0));
    dp[n].fill(1);
    for (let i = n-1; i >= 0; --i) {
        let diff = 0;
        if (i) diff = Math.max(0, nums[i] - nums[i-1]);
        for (let j = 1000; j >= 0; --j) {
            if (j+1 <= 1000) dp[i][j] = dp[i][j+1];
            if (j+diff <= nums[i])
                dp[i][j] = (dp[i][j] + dp[i+1][j+diff]) % 1_000_000_007;
        }
    }
    return dp[0][0];
};


/*3254. Find the Power of K-Size Subarrays I (Medium)
You are given an array of integers nums of length n and a positive integer
k. The power of an array is defined as:
* Its maximum element if all of its elements are consecutive and sorted in
  ascending order.
* -1 otherwise.
You need to find the power of all subarrays of nums of size k. Return an
integer array results of size n - k + 1, where results[i] is the power of
nums[i..(i + k - 1)].

Example 1:
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation: There are 5 subarrays of nums of size 3:
             - [1, 2, 3] with the maximum element 3.
             - [2, 3, 4] with the maximum element 4.
             - [3, 4, 3] whose elements are not consecutive.
             - [4, 3, 2] whose elements are not sorted.
             - [3, 2, 5] whose elements are not consecutive.

Example 2:
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]

Example 3:
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]

Constraints:
* 1 <= n == nums.length <= 500
* 1 <= nums[i] <= 10^5
* 1 <= k <= n*/

function resultsArray(nums: number[], k: number): number[] {
    const ans = [];
    let cnt = 0;
    for (const [i, x] of nums.entries()) {
        if (i && nums[i-1]+1 != nums[i]) cnt = 0;
        ++cnt;
        if (i >= k-1)
            if (cnt >= k) ans.push(nums[i]);
            else ans.push(-1);
    }
    return ans;
};


/*3255. Find the Power of K-Size Subarrays II (Medium)
You are given an array of integers nums of length n and a positive integer
k. The power of an array is defined as:
* Its maximum element if all of its elements are consecutive and sorted in
  ascending order.
* -1 otherwise.
You need to find the power of all subarrays of nums of size k. Return an
integer array results of size n - k + 1, where results[i] is the power of
nums[i..(i + k - 1)].

Example 1:
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation: There are 5 subarrays of nums of size 3:
             - [1, 2, 3] with the maximum element 3.
             - [2, 3, 4] with the maximum element 4.
             - [3, 4, 3] whose elements are not consecutive.
             - [4, 3, 2] whose elements are not sorted.
             - [3, 2, 5] whose elements are not consecutive.

Example 2:
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]

Example 3:
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]

Constraints:
* 1 <= n == nums.length <= 10^5
* 1 <= nums[i] <= 10^6
* 1 <= k <= n*/

function resultsArray(nums: number[], k: number): number[] {
    const ans = [];
    let cnt = 0;
    for (const [i, x] of nums.entries()) {
        if (i && nums[i-1]+1 != nums[i]) cnt = 0;
        ++cnt;
        if (i >= k-1)
            if (cnt >= k) ans.push(nums[i]);
            else ans.push(-1);
    }
    return ans;
};


/*3256. Maximum Value Sum by Placing Three Rooks I (Hard)
You are given a m x n 2D array board representing a chessboard, where
board[i][j] represents the value of the cell (i, j). Rooks in the same row
or column attack each other. You need to place three rooks on the chessboard
such that the rooks do not attack each other. Return the maximum sum of the
cell values on which the rooks are placed.

Example 1:
Input: board = [[-3,1,1,1],[-3,1,-3,1],[-3,2,1,1]]
Output: 4
Explanation: We can place the rooks in the cells (0, 2), (1, 3), and (2, 1)
             for a sum of 1 + 1 + 2 = 4.

Example 2:
Input: board = [[1,2,3],[4,5,6],[7,8,9]]
Output: 15
Explanation: We can place the rooks in the cells (0, 0), (1, 1), and (2, 2)
             for a sum of 1 + 5 + 9 = 15.

Example 3:
Input: board = [[1,1,1],[1,1,1],[1,1,1]]
Output: 3
Explanation: We can place the rooks in the cells (0, 2), (1, 1), and (2, 0)
             for a sum of 1 + 1 + 1 = 3.

Constraints:
* 3 <= m == board.length <= 100
* 3 <= n == board[i].length <= 100
* -10^9 <= board[i][j] <= 10^9*/

function maximumValueSum(board: number[][]): number {
    const m = board.length, n = board[0].length;
    const cols = Array(n).fill(0).map(() => []);
    for (let i = 0; i < m; ++i) {
        const aug = board[i].map((x, j) => [x, j]).sort((x, y) => y[0]-x[0]).slice(0, 3);
        for (const [x, j] of aug)
            cols[j].push([x, i]);
    }
    let vals = [];
    for (let j = 0; j < n; ++j) {
        cols[j] = cols[j].sort((x, y) => y[0]-x[0]).slice(0, 3);
        for (const [x, i] of cols[j])
            vals.push([x, i, j]);
    }
    vals.sort((x, y) => y[0]-x[0]);
    let ans = -Infinity;
    for (let i = 0; i < 9; ++i) {
        const [xi, ii, ji] = vals[i];
        for (let j = i+1; j < 9; ++j) {
            const [xj, ij, jj] = vals[j];
            if (ii != ij && ji != jj) {
                for (let k = j+1; k < 9; ++k) {
                    const [xk, ik, jk] = vals[k];
                    if (ii != ik && ij != ik && ji != jk && jj != jk)
                        ans = Math.max(ans, xi+xj+xk);
                }
            }
        }
    }
    return ans;
};


/*3257. Maximum Value Sum by Placing Three Rooks II (Hard)
You are given a m x n 2D array board representing a chessboard, where
board[i][j] represents the value of the cell (i, j). Rooks in the same row
or column attack each other. You need to place three rooks on the chessboard
such that the rooks do not attack each other. Return the maximum sum of the
cell values on which the rooks are placed.

Example 1:
Input: board = [[-3,1,1,1],[-3,1,-3,1],[-3,2,1,1]]
Output: 4
Explanation: We can place the rooks in the cells (0, 2), (1, 3), and (2, 1)
             for a sum of 1 + 1 + 2 = 4.

Example 2:
Input: board = [[1,2,3],[4,5,6],[7,8,9]]
Output: 15
Explanation: We can place the rooks in the cells (0, 0), (1, 1), and (2, 2)
             for a sum of 1 + 5 + 9 = 15.

Example 3:
Input: board = [[1,1,1],[1,1,1],[1,1,1]]
Output: 3
Explanation: We can place the rooks in the cells (0, 2), (1, 1), and (2, 0)
             for a sum of 1 + 1 + 1 = 3.

Constraints:
* 3 <= m == board.length <= 500
* 3 <= n == board[i].length <= 500
* -10^9 <= board[i][j] <= 10^9*/

function maximumValueSum(board: number[][]): number {
    const m = board.length, n = board[0].length;
    const cols = Array(n).fill(0).map(() => []);
    for (let i = 0; i < m; ++i) {
        const aug = board[i].map((x, j) => [x, j]).sort((x, y) => y[0]-x[0]).slice(0, 3);
        for (const [x, j] of aug)
            cols[j].push([x, i]);
    }
    let vals = [];
    for (let j = 0; j < n; ++j) {
        cols[j] = cols[j].sort((x, y) => y[0]-x[0]).slice(0, 3);
        for (const [x, i] of cols[j])
            vals.push([x, i, j]);
    }
    vals.sort((x, y) => y[0]-x[0]);
    let ans = -Infinity;
    for (let i = 0; i < 9; ++i) {
        const [xi, ii, ji] = vals[i];
        for (let j = i+1; j < 9; ++j) {
            const [xj, ij, jj] = vals[j];
            if (ii != ij && ji != jj) {
                for (let k = j+1; k < 9; ++k) {
                    const [xk, ik, jk] = vals[k];
                    if (ii != ik && ij != ik && ji != jk && jj != jk)
                        ans = Math.max(ans, xi+xj+xk);
                }
            }
        }
    }
    return ans;
};


/*3258. Count Substrings That Satisfy K-Constraint I (Easy)
You are given a binary string s and an integer k. A binary string satisfies
the k-constraint if either of the following conditions holds:
* The number of 0's in the string is at most k.
* The number of 1's in the string is at most k.
Return an integer denoting the number of substrings of s that satisfy the k-
constraint.

Example 1:
Input: s = "10101", k = 1
Output: 12
Explanation: Every substring of s except the substrings "1010", "10101", and
             "0101" satisfies the k-constraint.

Example 2:
Input: s = "1010101", k = 2
Output: 25
Explanation: Every substring of s except the substrings with a length
             greater than 5 satisfies the k-constraint.

Example 3:
Input: s = "11111", k = 1
Output: 15
Explanation: All substrings of s satisfy the k-constraint.

Constraints:
* 1 <= s.length <= 50
* 1 <= k <= s.length
* s[i] is either '0' or '1'.*/

function countKConstraintSubstrings(s: string, k: number): number {
    let ans = 0;
    for (let i = 0, ii = 0, one = 0, zero = 0; i < s.length; ++i) {
        if (s[i] == '1') ++one;
        else ++zero;
        for (; one > k && zero > k; ++ii)
            if (s[ii] == '1') --one;
            else --zero;
        ans += i-ii+1;
    }
    return ans;
};


/*3259. Maximum Energy Boost From Two Drinks (Medium)
You are given two integer arrays energyDrinkA and energyDrinkB of the same
length n by a futuristic sports scientist. These arrays represent the energy
boosts per hour provided by two different energy drinks, A and B,
respectively. You want to maximize your total energy boost by drinking one
energy drink per hour. However, if you want to switch from consuming one
energy drink to the other, you need to wait for one hour to cleanse your
system (meaning you won't get any energy boost in that hour). Return the
maximum total energy boost you can gain in the next n hours. Note that you
can start consuming either of the two energy drinks.

Example 1:
Input: energyDrinkA = [1,3,1], energyDrinkB = [3,1,1]
Output: 5
Explanation: To gain an energy boost of 5, drink only the energy drink A (or
             only B).

Example 2:
Input: energyDrinkA = [4,1,1], energyDrinkB = [1,1,3]
Output: 7
Explanation: To gain an energy boost of 7:
             Drink the energy drink A for the first hour. Switch to the
             energy drink B and we lose the energy boost of the second hour.
             Gain the energy boost of the drink B in the third hour.

Constraints:
* n == energyDrinkA.length == energyDrinkB.length
* 3 <= n <= 10^5
* 1 <= energyDrinkA[i], energyDrinkB[i] <= 10^5*/

function maxEnergyBoost(energyDrinkA: number[], energyDrinkB: number[]): number {
    let dp = Array(2).fill(0);
    for (let i = 0; i < energyDrinkA.length; ++i)
        dp = [Math.max(dp[0] + energyDrinkA[i], dp[1]), Math.max(dp[0], dp[1] + energyDrinkB[i])];
    return Math.max(...dp);
};


/*3260. Find the Largest Palindrome Divisible by K (Hard)
You are given two positive integers n and k. An integer x is called k-
palindromic if:
* x is a palindrome.
* x is divisible by k.
Return the largest integer having n digits (as a string) that is k-
palindromic. Note that the integer must not have leading zeros.

Example 1:
Input: n = 3, k = 5
Output: "595"
Explanation: 595 is the largest k-palindromic integer with 3 digits.

Example 2:
Input: n = 1, k = 4
Output: "8"
Explanation: 4 and 8 are the only k-palindromic integers with 1 digit.

Example 3:
Input: n = 5, k = 6
Output: "89898"

Constraints:
* 1 <= n <= 10^5
* 1 <= k <= 9*/

function largestPalindrome(n: number, k: number): string {
    const pw = Array(n).fill(1);
    for (let i = 1; i < n; ++i)
        pw[i] = pw[i-1] * 10 % k;
    const nn = Math.floor((n-1)/2);
    const dp = Array(nn+1).fill(0).map(() => Array(k).fill(false));
    dp[nn][0] = true;
    for (let i = nn; i > 0; --i) {
        let coef = pw[i];
        if (i != n-1-i) coef += pw[n-1-i];
        for (let j = 0; j < k; ++j)
            if (dp[i][j])
                for (let d = 0; d < 10; ++d) {
                    const jj = (j + coef*d) % k;
                    dp[i-1][jj] = true;
                }
    }
    const ans = Array(n).fill('9');
    let total = 0;
    for (let i = 0; i <= nn; ++i) {
        let coef = pw[i];
        if (i != n-1-i) coef += pw[n-1-i];
        for (let d = 9; d >= 0; --d) {
            const j = (k + (total - coef*d) % k) % k;
            if (dp[i][j]) {
                ans[i] = ans[n-1-i] = String.fromCharCode(48+d);
                total = j;
                break;
            }
        }
    }
    return ans.join('');
};


/*3261. Count Substrings That Satisfy K-Constraint II (Hard)
You are given a binary string s and an integer k. You are also given a 2D
integer array queries, where queries[i] = [li, ri]. A binary string
satisfies the k-constraint if either of the following conditions holds:
* The number of 0's in the string is at most k.
* The number of 1's in the string is at most k.
Return an integer array answer, where answer[i] is the number of substrings
of s[li..ri] that satisfy the k-constraint.

Example 1:
Input: s = "0001111", k = 2, queries = [[0,6]]
Output: [26]
Explanation: For the query [0, 6], all substrings of s[0..6] = "0001111"
             satisfy the k-constraint except for the substrings
             s[0..5] = "000111" and s[0..6] = "0001111".

Example 2:
Input: s = "010101", k = 1, queries = [[0,5],[1,4],[2,3]]
Output: [15,9,3]
Explanation: The substrings of s with a length greater than 3 do not satisfy
             the k-constraint.

Constraints:
* 1 <= s.length <= 10^5
* s[i] is either '0' or '1'.
* 1 <= k <= s.length
* 1 <= queries.length <= 10^5
* queries[i] == [li, ri]
* 0 <= li <= ri < s.length
* All queries are distinct.*/

function countKConstraintSubstrings(s: string, k: number, queries: number[][]): number[] {
    const n = s.length;
    const prefix = Array(n+1).fill(0), jump = Array(n).fill(0);
    for (let i = 0, ii = 0, one = 0; i < n; ++i) {
        if (s[i] == '1') ++one;
        for(; one > k && i-ii-one+1 > k; ++ii)
            if (s[ii] == '1') --one;
        prefix[i+1] = prefix[i] + (i-ii+1);
        jump[ii] = i;
    }
    if (jump[0] == 0) jump[0] = n;
    for (let i = 1; i < n; ++i)
        if (jump[i] == 0) jump[i] = jump[i-1];
    const ans = [];
    for (const [lo, hi] of queries) {
        const mid = Math.min(jump[lo], hi), c = mid-lo+1;
        let cand = Math.floor(c*(c+1)/2);
        if (mid < hi) cand += prefix[hi+1] - prefix[mid+1];
        ans.push(cand);
    }
    return ans;
};


/*3264. Final Array State After K Multiplication Operations I (Easy)
You are given an integer array nums, an integer k, and an integer
multiplier. You need to perform k operations on nums. In each operation:
* Find the minimum value x in nums. If there are multiple occurrences of the
  minimum value, select the one that appears first.
* Replace the selected minimum value x with x * multiplier.
Return an integer array denoting the final state of nums after performing
all k operations.

Example 1:
Input: nums = [2,1,3,5,6], k = 5, multiplier = 2
Output: [8,4,6,5,6]
Explanation: Operation           Result
             After operation 1   [2, 2, 3, 5, 6]
             After operation 2   [4, 2, 3, 5, 6]
             After operation 3   [4, 4, 3, 5, 6]
             After operation 4   [4, 4, 6, 5, 6]
             After operation 5   [8, 4, 6, 5, 6]

Example 2:
Input: nums = [1,2], k = 3, multiplier = 4
Output: [16,8]
Explanation: Operation           Result
             After operation 1   [4, 2]
             After operation 2   [4, 8]
             After operation 3   [16, 8]

Constraints:
* 1 <= nums.length <= 100
* 1 <= nums[i] <= 100
* 1 <= k <= 10
* 1 <= multiplier <= 5*/

function getFinalState(nums: number[], k: number, multiplier: number): number[] {
    while (k--) {
        const i = nums.indexOf(Math.min(...nums));
        nums[i] *= multiplier;
    }
    return nums;
};


/*3265. Count Almost Equal Pairs I (Medium)
You are given an array nums consisting of positive integers. We call two
integers x and y in this problem almost equal if both integers can become
equal after performing the following operation at most once:
* Choose either x or y and swap any two digits within the chosen number.
Return the number of indices i and j in nums where i < j such that nums[i]
and nums[j] are almost equal. Note that it is allowed for an integer to have
leading zeros after performing an operation.

Example 1:
Input: nums = [3,12,30,17,21]
Output: 2
Explanation: The almost equal pairs of elements are:
             - 3 and 30. By swapping 3 and 0 in 30, you get 3.
             - 12 and 21. By swapping 1 and 2 in 12, you get 21.

Example 2:
Input: nums = [1,1,1,1,1]
Output: 10
Explanation: Every two elements in the array are almost equal.

Example 3:
Input: nums = [123,231]
Output: 0
Explanation: We cannot swap any two digits of 123 or 231 to reach the other.

Constraints:
* 2 <= nums.length <= 100
* 1 <= nums[i] <= 10^6*/

function countPairs(nums: number[]): number {
    let ans = 0;
    const freq = new Map();
    for (const x of nums) {
        ans += freq.get(x) ?? 0;
        freq.set(x, 1 + (freq.get(x) ?? 0));
        const ch = String(x).padStart(6, '0').split('');
        for (let i = 0; i < 6; ++i)
            for (let j = i+1; j < 6; ++j)
                if (ch[i] != ch[j]) {
                    [ch[i], ch[j]] = [ch[j], ch[i]];
                    const cand = Number(ch.join(''));
                    ans += freq.get(cand) ?? 0;
                    [ch[i], ch[j]] = [ch[j], ch[i]];
                }
    }
    return ans;
};


/*3266. Final Array State After K Multiplication Operations II (Hard)
You are given an integer array nums, an integer k, and an integer
multiplier. You need to perform k operations on nums. In each operation:
* Find the minimum value x in nums. If there are multiple occurrences of the
  minimum value, select the one that appears first.
* Replace the selected minimum value x with x * multiplier.
After the k operations, apply modulo 109 + 7 to every value in nums. Return
an integer array denoting the final state of nums after performing all k
operations and then applying the modulo.

Example 1:
Input: nums = [2,1,3,5,6], k = 5, multiplier = 2
Output: [8,4,6,5,6]
Explanation: Operation           Result
             After operation 1   [2, 2, 3, 5, 6]
             After operation 2   [4, 2, 3, 5, 6]
             After operation 3   [4, 4, 3, 5, 6]
             After operation 4   [4, 4, 6, 5, 6]
             After operation 5   [8, 4, 6, 5, 6]
             After applying modulo   [8, 4, 6, 5, 6]

Example 2:
Input: nums = [100000,2000], k = 2, multiplier = 1000000
Output: [999999307,999999993]
Explanation: Operation               Result
             After operation 1       [100000, 2000000000]
             After operation 2       [100000000000, 2000000000]
             After applying modulo   [999999307, 999999993]

Constraints:
* 1 <= nums.length <= 10^4
* 1 <= nums[i] <= 10^9
* 1 <= k <= 10^9
* 1 <= multiplier <= 10^6*/

function getFinalState(nums: number[], k: number, multiplier: number): number[] {
    if (multiplier == 1) return nums;
    const m = Math.max(...nums), n = nums.length;
    const pq = new PriorityQueue({ compare : (x, y) => x[0] != y[0] ? x[0]-y[0] : x[1]-y[1] });
    for (let [i, x] of nums.entries())
        pq.enqueue([x, i]);
    for (; k && pq.front()[0]*multiplier <= m; --k) {
        const [x, i] = pq.dequeue();
        pq.enqueue([x*multiplier, i]);
    }
    const vals = [];
    while (pq.size()) {
        const [x, i] = pq.dequeue();
        vals.push([BigInt(x), BigInt(i)]);
    }
    let q = 1n, mul = BigInt(multiplier), mod = 1_000_000_007n;
    for (let p = Math.floor(k/n); p; p >>= 1) {
        if (p & 1) q = q * mul % mod;
        mul = mul * mul % mod;
    }
    for (const v of vals)
        v[0] = v[0] * q % mod;
    mul = BigInt(multiplier)
    for (let i = 0; i < k%n; ++i)
        vals[i][0] = vals[i][0] * mul % mod;
    const ans = Array(n).fill(0);
    for (const [x, i] of vals)
        ans[i] = x;
    return ans;
};


/*3267. Count Almost Equal Pairs II (Hard)
Attention: In this version, the number of operations that can be performed,
has been increased to twice. You are given an array nums consisting of
positive integers. We call two integers x and y almost equal if both
integers can become equal after performing the following operation at most
twice:
* Choose either x or y and swap any two digits within the chosen number.
Return the number of indices i and j in nums where i < j such that nums[i]
and nums[j] are almost equal. Note that it is allowed for an integer to have
leading zeros after performing an operation.

Example 1:
Input: nums = [1023,2310,2130,213]
Output: 4
Explanation: The almost equal pairs of elements are:
             - 1023 and 2310. By swapping the digits 1 and 2, and then the
               digits 0 and 3 in 1023, you get 2310.
             - 1023 and 213. By swapping the digits 1 and 0, and then the
               digits 1 and 2 in 1023, you get 0213, which is 213.
             - 2310 and 213. By swapping the digits 2 and 0, and then the
               digits 3 and 2 in 2310, you get 0213, which is 213.
             - 2310 and 2130. By swapping the digits 3 and 1 in 2310, you
               get 2130.

Example 2:
Input: nums = [1,10,100]
Output: 3
Explanation: The almost equal pairs of elements are:
             - 1 and 10. By swapping the digits 1 and 0 in 10, you get 01
               which is 1.
             - 1 and 100. By swapping the second 0 with the digit 1 in 100,
               you get 001, which is 1.
             - 10 and 100. By swapping the first 0 with the digit 1 in 100,
               you get 010, which is 10.

Constraints:
* 2 <= nums.length <= 5000
* 1 <= nums[i] < 10^7*/

function countPairs(nums: number[]): number {
    let ans = 0;
    const freq = new Map();
    for (const x of nums)
        freq.set(x, 1 + (freq.get(x) ?? 0));
    for (const [x, v] of freq.entries()) {
        ans += v*(v-1);
        let ch = String(x).padStart(7, '0').split('');
        const neighbor = new Set();
        for (let i = 0; i < 7; ++i)
            for (let j = i+1; j < 7; ++j)
                if (ch[i] != ch[j]) {
                    [ch[i], ch[j]] = [ch[j], ch[i]];
                    neighbor.add(Number(ch.join('')));
                    for (let k = 0; k < 7; ++k)
                        for (let l = k+1; l < 7; ++l)
                            if (ch[k] != ch[l] && (k != i || l != j)) {
                                [ch[k], ch[l]] = [ch[l], ch[k]];
                                neighbor.add(Number(ch.join('')));
                                [ch[k], ch[l]] = [ch[l], ch[k]];
                            }
                    [ch[i], ch[j]] = [ch[j], ch[i]];
                }
        for (const y of neighbor)
            if (x !== y && freq.has(y))
                ans += freq.get(x) * freq.get(y);
    }
    return ans/2;
};


/*3270. Find the Key of the Numbers (Easy)
You are given three positive integers num1, num2, and num3. The key of num1,
num2, and num3 is defined as a four-digit number such that:
* Initially, if any number has less than four digits, it is padded with
  leading zeros.
* The ith digit (1 <= i <= 4) of the key is generated by taking the smallest
  digit among the ith digits of num1, num2, and num3.
Return the key of the three numbers without leading zeros (if any).

Example 1:
Input: num1 = 1, num2 = 10, num3 = 1000
Output: 0
Explanation: On padding, num1 becomes "0001", num2 becomes "0010", and num3
             remains "1000".
             - The 1st digit of the key is min(0, 0, 1).
             - The 2nd digit of the key is min(0, 0, 0).
             - The 3rd digit of the key is min(0, 1, 0).
             - The 4th digit of the key is min(1, 0, 0).
             Hence, the key is "0000", i.e. 0.

Example 2:
Input: num1 = 987, num2 = 879, num3 = 798
Output: 777

Example 3:
Input: num1 = 1, num2 = 2, num3 = 3
Output: 1

Constraints: 1 <= num1, num2, num3 <= 9999*/

function generateKey(num1: number, num2: number, num3: number): number {
    const v = Array(4).fill(0).map(() => []);
    for (let x of [num1, num2, num3])
        for (let i = 3; i >= 0; --i) {
            v[i].push(x % 10);
            x = Math.floor(x / 10);
        }
    let ans = 0;
    for (let i = 0; i < 4; ++i)
        ans = 10*ans + Math.min(...v[i]);
    return ans;
};


/*3271. Hash Divided String (Medium)
You are given a string s of length n and an integer k, where n is a multiple
of k. Your task is to hash the string s into a new string called result,
which has a length of n / k. First, divide s into n / k substrings, each
with a length of k. Then, initialize result as an empty string. For each
substring in order from the beginning:
* The hash value of a character is the index of that character in the
  English alphabet (e.g., 'a' → 0, 'b' → 1, ..., 'z' → 25).
* Calculate the sum of all the hash values of the characters in the
  substring.
* Find the remainder of this sum when divided by 26, which is called
  hashedChar.
* Identify the character in the English lowercase alphabet that corresponds
  to hashedChar.
* Append that character to the end of result.
Return result.

Example 1:
Input: s = "abcd", k = 2
Output: "bf"
Explanation: First substring: "ab", 0 + 1 = 1, 1 % 26 = 1, result[0] = 'b'.
             Second substring: "cd", 2 + 3 = 5, 5 % 26 = 5, result[1] = 'f'.

Example 2:
Input: s = "mxz", k = 3
Output: "i"
Explanation: The only substring: "mxz", 12 + 23 + 25 = 60, 60 % 26 = 8,
             result[0] = 'i'.

Constraints:
* 1 <= k <= 100
* k <= s.length <= 1000
* s.length is divisible by k.
* s consists only of lowercase English letters.*/

function stringHash(s: string, k: number): string {
    const ans = [];
    let prefix = 0;
    for (const [i, ch] of s.split('').entries()) {
        prefix += ch.charCodeAt(0) - 97;
        if ((i+1)%k == 0) {
            ans.push(String.fromCharCode(97 + prefix%26));
            prefix = 0;
        }
    }
    return ans.join('');
};


/*3272. Find the Count of Good Integers (Hard)
You are given two positive integers n and k. An integer x is called k-
palindromic if:
* x is a palindrome.
* x is divisible by k.
An integer is called good if its digits can be rearranged to form a k-
palindromic integer. For example, for k = 2, 2020 can be rearranged to form
the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a
k-palindromic integer. Return the count of good integers containing n digits.
Note that any integer must not have leading zeros, neither before nor after
rearrangement. For example, 1010 cannot be rearranged to form 101.

Example 1:
Input: n = 3, k = 5
Output: 27
Explanation: Some of the good integers are:
             - 551 because it can be rearranged to form 515.
             - 525 because it is already k-palindromic.

Example 2:
Input: n = 1, k = 4
Output: 2
Explanation: The two good integers are 4 and 8.

Example 3:
Input: n = 5, k = 6
Output: 2468

Constraints:
* 1 <= n <= 10
* 1 <= k <= 9*/

function countGoodIntegers(n: number, k: number): number {
    let ans = 0;
    const seen = new Set();

    function multinom(vals) {
        let ans = 1, k = 1;
        for (const v of vals)
            for (let x = 1; x <= v; ++x) {
                ans *= k++;
                ans /= x;
            }
        return ans;
    };

    for (let half = Math.ceil(n/2), v = Math.pow(10, half-1); v < Math.pow(10, half); ++v) {
        let rev = 0, base = 1;
        for (let x = n&1 ? Math.floor(v/10) : v; x; rev = 10*rev + x%10, x = Math.floor(x/10), base *= 10);
        let cand = v*base + rev;
        if (cand % k == 0) {
            const freq = Array(10).fill(0);
            for (; cand; cand = Math.floor(cand/10)) ++freq[cand % 10];
            const key = freq.reduce((x, y) => x = 11*x + y, 0);
            if (!seen.has(key)) {
                seen.add(key);
                let val = multinom(freq);
                if (freq[0]) {
                    --freq[0];
                    val -= multinom(freq);
                }
                ans += val;
            }
        }
    }
    return ans;
};


/*3273. Minimum Amount of Damage Dealt to Bob (Hard)
You are given an integer power and two integer arrays damage and health,
both having length n. Bob has n enemies, where enemy i will deal Bob
damage[i] points of damage per second while they are alive (i.e.
health[i] > 0). Every second, after the enemies deal damage to Bob, he
chooses one of the enemies that is still alive and deals power points of
damage to them. Determine the minimum total amount of damage points that
will be dealt to Bob before all n enemies are dead.

Example 1:
Input: power = 4, damage = [1,2,3,4], health = [4,5,6,8]
Output: 39
Explanation: - Attack enemy 3 in the first two seconds, after which enemy 3
               will go down, the number of damage points dealt to Bob is
               10 + 10 = 20 points.
             - Attack enemy 2 in the next two seconds, after which enemy 2
               will go down, the number of damage points dealt to Bob is
               6 + 6 = 12 points.
             - Attack enemy 0 in the next second, after which enemy 0 will
               go down, the number of damage points dealt to Bob is 3 points.
             - Attack enemy 1 in the next two seconds, after which enemy 1
               will go down, the number of damage points dealt to Bob is
               2 + 2 = 4 points.

Example 2:
Input: power = 1, damage = [1,1,1,1], health = [1,2,3,4]
Output: 20
Explanation: - Attack enemy 0 in the first second, after which enemy 0 will
               go down, the number of damage points dealt to Bob is 4 points.
             - Attack enemy 1 in the next two seconds, after which enemy 1
               will go down, the number of damage points dealt to Bob is
               3 + 3 = 6 points.
             - Attack enemy 2 in the next three seconds, after which enemy 2
               will go down, the number of damage points dealt to Bob is
               2 + 2 + 2 = 6 points.
             - Attack enemy 3 in the next four seconds, after which enemy 3
               will go down, the number of damage points dealt to Bob is
               1 + 1 + 1 + 1 = 4 points.

Example 3:
Input: power = 8, damage = [40], health = [59]
Output: 320

Constraints:
* 1 <= power <= 10^4
* 1 <= n == damage.length == health.length <= 10^5
* 1 <= damage[i], health[i] <= 10^4*/

function minDamage(power: number, damage: number[], health: number[]): number {
    let ans = 0, prefix = 0;
    for (const [d, h] of damage.map((x, i) => [x, Math.ceil(health[i]/power)]).sort((x, y) => x[1]*y[0] - x[0]*y[1])) {
        prefix += h;
        ans += d*prefix;
    }
    return ans;
};


/*3274. Check if Two Chessboard Squares Have the Same Color (Easy)
You are given two strings, coordinate1 and coordinate2, representing the
coordinates of a square on an 8 x 8 chessboard. Below is the chessboard for
reference. Return true if these two squares have the same color and false
otherwise. The coordinate will always represent a valid chessboard square.
The coordinate will always have the letter first (indicating its column),
and the number second (indicating its row).

Example 1:
Input: coordinate1 = "a1", coordinate2 = "c3"
Output: true
Explanation: Both squares are black.

Example 2:
Input: coordinate1 = "a1", coordinate2 = "h3"
Output: false
Explanation: Square "a1" is black and "h3" is white.

Constraints:
* coordinate1.length == coordinate2.length == 2
* 'a' <= coordinate1[0], coordinate2[0] <= 'h'
* '1' <= coordinate1[1], coordinate2[1] <= '8'*/

function checkTwoChessboards(coordinate1: string, coordinate2: string): boolean {
    return (coordinate1.charCodeAt(0) + coordinate1.charCodeAt(1)) % 2 == (coordinate2.charCodeAt(0)+ coordinate2.charCodeAt(1)) % 2;
};


/*3275. K-th Nearest Obstacle Queries (Medium)
There is an infinite 2D plane. You are given a positive integer k. You are
also given a 2D array queries, which contains the following queries:
* queries[i] = [x, y]: Build an obstacle at coordinate (x, y) in the plane.
  It is guaranteed that there is no obstacle at this coordinate when this
  query is made.
After each query, you need to find the distance of the kth nearest obstacle
from the origin. Return an integer array results where results[i] denotes
the kth nearest obstacle after query i, or results[i] == -1 if there are
less than k obstacles. Note that initially there are no obstacles anywhere.
The distance of an obstacle at coordinate (x, y) from the origin is given by
|x| + |y|.

Example 1:
Input: queries = [[1,2],[3,4],[2,3],[-3,0]], k = 2
Output: [-1,7,5,3]
Explanation: Initially, there are 0 obstacles.
             - After queries[0], there are less than 2 obstacles.
             - After queries[1], there are obstacles at distances 3 and 7.
             - After queries[2], there are obstacles at distances 3, 5, and
               7.
             - After queries[3], there are obstacles at distances 3, 3, 5,
               and 7.

Example 2:
Input: queries = [[5,5],[4,4],[3,3]], k = 1
Output: [10,8,6]
Explanation: - After queries[0], there is an obstacle at distance 10.
             - After queries[1], there are obstacles at distances 8 and 10.
             - After queries[2], there are obstacles at distances 6, 8, and
               10.

Constraints:
* 1 <= queries.length <= 2 * 10^5
* All queries[i] are unique.
* -10^9 <= queries[i][0], queries[i][1] <= 10^9
* 1 <= k <= 10^5*/

function resultsArray(queries: number[][], k: number): number[] {
    const ans = [];
    const pq = new PriorityQueue({ compare : (x, y) => y-x });
    for (const [x, y] of queries) {
        pq.enqueue(Math.abs(x) + Math.abs(y));
        if (pq.size() > k) pq.dequeue();
        ans.push(pq.size() == k ? pq.front() : -1);
    }
    return ans;
};


/*3276. Select Cells in Grid With Maximum Score (Hard)
You are given a 2D matrix grid consisting of positive integers. You have to
select one or more cells from the matrix such that the following conditions
are satisfied:
* No two selected cells are in the same row of the matrix.
* The values in the set of selected cells are unique.
Your score will be the sum of the values of the selected cells. Return the
maximum score you can achieve.

Example 1:
Input: grid = [[1,2,3],[4,3,2],[1,1,1]]
Output: 8
Explanation: We can select the cells with values 1, 3, and 4 that are
             colored above.

Example 2:
Input: grid = [[8,7,6],[8,3,2]]
Output: 15
Explanation: We can select the cells with values 7 and 8 that are colored
             above.

Constraints:
* 1 <= grid.length, grid[i].length <= 10
* 1 <= grid[i][j] <= 100*/

function maxScore(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const vals = [];
    for (const [i, row] of grid.entries())
        for (const x of row)
            vals.push([x, i]);
    vals.sort((x, y) => x[0]-y[0]);
    const dp = Array(m*n+1).fill(0).map(() => Array(1<<m).fill(0));
    for (let i = m*n-1; i >= 0; --i) {
        const [v, k] = vals[i];
        for (let x = 0; x < (1<<m); ++x) {
            dp[i][x] = dp[i+1][x];
            if ((x & 1<<k) == 0) {
                let ii = i+1;
                while (ii < vals.length && vals[ii][0] == vals[i][0]) ++ii;
                dp[i][x] = Math.max(dp[i][x], v + dp[ii][x ^ 1<<k]);
            }
        }
    }
    return dp[0][0];
};


/*3277. Maximum XOR Score Subarray Queries (Hard)
You are given an array nums of n integers, and a 2D integer array queries of
size q, where queries[i] = [li, ri]. For each query, you must find the
maximum XOR score of any subarray of nums[li..ri]. The XOR score of an array
a is found by repeatedly applying the following operations on a so that only
one element remains, that is the score:
* Simultaneously replace a[i] with a[i] XOR a[i + 1] for all indices i
  except the last one.
* Remove the last element of a.
Return an array answer of size q where answer[i] is the answer to query i.

Example 1:
Input: nums = [2,8,4,32,16,1], queries = [[0,2],[1,4],[0,5]]
Output: [12,60,60]
Explanation: - In the first query, nums[0..2] has 6 subarrays [2], [8], [4],
               [2, 8], [8, 4], and [2, 8, 4] each with a respective XOR
               score of 2, 8, 4, 10, 12, and 6. The answer for the query is
               12, the largest of all XOR scores.
             - In the second query, the subarray of nums[1..4] with the
               largest XOR score is nums[1..4] with a score of 60.
             - In the third query, the subarray of nums[0..5] with the
               largest XOR score is nums[1..4] with a score of 60.

Example 2:
Input: nums = [0,7,3,2,8,5,1], queries = [[0,3],[1,5],[2,4],[2,6],[5,6]]
Output: [7,14,11,14,5]
Explanation: Index   nums[li..ri]    Maximum XOR Score Subarray  Maximum Subarray XOR Score
                 0   [0, 7, 3, 2]    [7]                         7
                 1   [7, 3, 2, 8, 5] [7, 3, 2, 8]                14
                 2   [3, 2, 8]       [3, 2, 8]                   11
                 3   [3, 2, 8, 5, 1] [2, 8, 5, 1]                14
                 4   [5, 1]          [5]                         5

Constraints:
* 1 <= n == nums.length <= 2000
* 0 <= nums[i] <= 2^31 - 1
* 1 <= q == queries.length <= 10^5
* queries[i].length == 2
* queries[i] = [li, ri]
* 0 <= li <= ri <= n - 1*/

function maximumSubarrayXor(nums: number[], queries: number[][]): number[] {
    const n = nums.length;
    const dp = Array(n+1).fill(0).map(() => Array(n).fill(0));
    for (let l = n-1; l >= 0; --l) {
        dp[l][l] = nums[l];
        for (let r = l+1; r < n; ++r)
            dp[l][r] = dp[l][r-1] ^ dp[l+1][r];
    }
    for (let l = 0; l < n; ++l)
        for (let r = l+1; r < n; ++r)
            dp[l][r] = Math.max(dp[l][r], dp[l][r-1]);
    for (let r = 0; r < n; ++r)
        for (let l = r-1; l >= 0; --l)
            dp[l][r] = Math.max(dp[l][r], dp[l+1][r]);
    const ans = [];
    for (const [l, r] of queries)
        ans.push(dp[l][r]);
    return ans;
};


/*3280. Convert Date to Binary (Easy)
You are given a string date representing a Gregorian calendar date in the
yyyy-mm-dd format. date can be written in its binary representation obtained
by converting year, month, and day to their binary representations without
any leading zeroes and writing them down in year-month-day format. Return
the binary representation of date.

Example 1:
Input: date = "2080-02-29"
Output: "100000100000-10-11101"
Explanation: 100000100000, 10, and 11101 are the binary representations of
             2080, 02, and 29 respectively.

Example 2:
Input: date = "1900-01-01"
Output: "11101101100-1-1"
Explanation: 11101101100, 1, and 1 are the binary representations of 1900,
             1, and 1 respectively.

Constraints:
* date.length == 10
* date[4] == date[7] == '-', and all other date[i]'s are digits.
* The input is generated such that date represents a valid Gregorian
  calendar date between Jan 1st, 1900 and Dec 31st, 2100 (both inclusive).*/

function convertDateToBinary(date: string): string {
    let year = date.substring(0, 4), month = date.substring(5, 7), day = date.substring(8, 10);
    year = Number(year).toString(2);
    month = Number(month).toString(2);
    day = Number(day).toString(2);
    return `${year}-${month}-${day}`;
};


/*3281. Maximize Score of Numbers in Ranges (Medium)
You are given an array of integers start and an integer d, representing n
intervals [start[i], start[i] + d]. You are asked to choose n integers where
the ith integer must belong to the ith interval. The score of the chosen
integers is defined as the minimum absolute difference between any two
integers that have been chosen. Return the maximum possible score of the
chosen integers.

Example 1:
Input: start = [6,0,3], d = 2
Output: 4
Explanation: The maximum possible score can be obtained by choosing
             integers: 8, 0, and 4. The score of these chosen integers is
             min(|8 - 0|, |8 - 4|, |0 - 4|) which equals 4.

Example 2:
Input: start = [2,6,13,13], d = 5
Output: 5
Explanation: The maximum possible score can be obtained by choosing
             integers: 2, 7, 13, and 18. The score of these chosen integers
             is min(|2 - 7|, |2 - 13|, |2 - 18|, |7 - 13|, |7 - 18|, |13 - 18|)
             which equals 5.

Constraints:
* 2 <= start.length <= 10^5
* 0 <= start[i] <= 10^9
* 0 <= d <= 10^9*/

function maxPossibleScore(start: number[], d: number): number {
    start.sort((x, y) => x-y);

    function fn(mid) {
        let x = -Infinity;
        for (const s of start) {
            x += mid;
            if (x > s+d) return false;
            x = Math.max(x, s);
        }
        return true;
    }

    let lo = 0, hi = 2_000_000_000;
    while (lo < hi) {
        const mid = lo + Math.floor((hi-lo+1)/2);
        if (fn(mid)) lo = mid;
        else hi = mid-1;
    }
    return lo;
};


/*3282. Reach End of Array With Max Score (Medium)
You are given an integer array nums of length n. Your goal is to start at
index 0 and reach index n - 1. You can only jump to indices greater than
your current index. The score for a jump from index i to index j is
calculated as (j - i) * nums[i]. Return the maximum possible total score by
the time you reach the last index.

Example 1:
Input: nums = [1,3,1,5]
Output: 7
Explanation: First, jump to index 1 and then jump to the last index. The
             final score is 1 * 1 + 2 * 3 = 7.

Example 2:
Input: nums = [4,3,1,3,2]
Output: 16
Explanation: Jump directly to the last index. The final score is 4 * 4 = 16.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^5*/

function findMaximumScore(nums: number[]): number {
    let dp = 0, prefix = 0;
    for (const x of nums) {
        dp += prefix;
        prefix = Math.max(prefix, x);
    }
    return dp;
};


/*3283. Maximum Number of Moves to Kill All Pawns (Hard)
There is a 50 x 50 chessboard with one knight and some pawns on it. You are
given two integers kx and ky where (kx, ky) denotes the position of the
knight, and a 2D array positions where positions[i] = [xi, yi] denotes the
position of the pawns on the chessboard. Alice and Bob play a turn-based
game, where Alice goes first. In each player's turn:
* The player selects a pawn that still exists on the board and captures it
  with the knight in the fewest possible moves. Note that the player can
  select any pawn, it might not be one that can be captured in the least
  number of moves.
* In the process of capturing the selected pawn, the knight may pass other
  pawns without capturing them. Only the selected pawn can be captured in
  this turn.
Alice is trying to maximize the sum of the number of moves made by both
players until there are no more pawns on the board, whereas Bob tries to
minimize them. Return the maximum total number of moves made during the game
that Alice can achieve, assuming both players play optimally. Note that in
one move, a chess knight has eight possible positions it can move to, as
illustrated below. Each move is two cells in a cardinal direction, then one
cell in an orthogonal direction.

Example 1:
Input: kx = 1, ky = 1, positions = [[0,0]]
Output: 4
Explanation: The knight takes 4 moves to reach the pawn at (0, 0).

Example 2:
Input: kx = 0, ky = 2, positions = [[1,1],[2,2],[3,3]]
Output: 8
Explanation: - Alice picks the pawn at (2, 2) and captures it in two moves:
               (0, 2) -> (1, 4) -> (2, 2).
             - Bob picks the pawn at (3, 3) and captures it in two moves:
               (2, 2) -> (4, 1) -> (3, 3).
             - Alice picks the pawn at (1, 1) and captures it in four moves:
               (3, 3) -> (4, 1) -> (2, 2) -> (0, 3) -> (1, 1).

Example 3:
Input: kx = 0, ky = 0, positions = [[1,2],[2,4]]
Output: 3
Explanation: - Alice picks the pawn at (2, 4) and captures it in two moves:
               (0, 0) -> (1, 2) -> (2, 4). Note that the pawn at (1, 2) is
               not captured.
             - Bob picks the pawn at (1, 2) and captures it in one move:
               (2, 4) -> (1, 2).

Constraints:
* 0 <= kx, ky <= 49
* 1 <= positions.length <= 15
* positions[i].length == 2
* 0 <= positions[i][0], positions[i][1] <= 49
* All positions[i] are unique.
* The input is generated such that positions[i] != [kx, ky] for all
0 <= i < positions.length.*/

function maxMoves(kx: number, ky: number, positions: number[][]): number {
    const n = positions.length;
    const dist = Array(n+1).fill(0).map(() => Array(n+1).fill(0));
    positions.push([kx, ky]);

    function bfs(i, j) {
        const queue = [positions[i]];
        const seen = Array(50).fill(0).map(() => Array(50).fill(false));
        for (let step = 0; queue.length; ++step)
            for (let sz = queue.length; sz; --sz) {
                const [x, y] = queue.shift();
                if (x == positions[j][0] && y == positions[j][1]) return step;
                for (const [xx, yy] of [[x-2, y-1], [x-2, y+1], [x-1, y-2], [x-1, y+2], [x+1, y-2], [x+1, y+2], [x+2, y-1], [x+2, y+1]])
                    if (0 <= xx && xx < 50 && 0 <= yy && yy < 50 && !seen[xx][yy]) {
                        queue.push([xx, yy]);
                        seen[xx][yy] = true;
                    }
            }
    };

    for (let i = 0; i < n; ++i)
        for (let j = i+1; j <= n; ++j)
            dist[i][j] = dist[j][i] = bfs(i, j);
    const dp = Array(1<<n).fill(0).map(() => Array(n+1).fill(0).map(() => Array(2).fill(0)));
    for (let m = (1<<n)-2; m >= 0; --m)
        for (let i = 0; i <= n; ++i)
            if ((m & 1<<i) || i == n) {
                dp[m][i] = [0, Infinity];
                for (let j = 0; j < n; ++j)
                    if ((m & 1<<j) == 0) {
                        const mm = m ^ 1<<j;
                        dp[m][i][0] = Math.max(dp[m][i][0], dist[i][j] + dp[mm][j][1]);
                        dp[m][i][1] = Math.min(dp[m][i][1], dist[i][j] + dp[mm][j][0]);
                    }
            }
    return dp[0][n][0];
};


/*3285. Find Indices of Stable Mountains (Easy)
There are n mountains in a row, and each mountain has a height. You are
given an integer array height where height[i] represents the height of
mountain i, and an integer threshold. A mountain is called stable if the
mountain just before it (if it exists) has a height strictly greater than
threshold. Note that mountain 0 is not stable. Return an array containing
the indices of all stable mountains in any order.

Example 1:
Input: height = [1,2,3,4,5], threshold = 2
Output: [3,4]
Explanation: - Mountain 3 is stable because height[2] == 3 is greater than
               threshold == 2.
             - Mountain 4 is stable because height[3] == 4 is greater than
               threshold == 2.

Example 2:
Input: height = [10,1,10,1,10], threshold = 3
Output: [1,3]

Example 3:
Input: height = [10,1,10,1,10], threshold = 10
Output: []

Constraints:
* 2 <= n == height.length <= 100
* 1 <= height[i] <= 100
* 1 <= threshold <= 100*/

function stableMountains(height: number[], threshold: number): number[] {
    return [...Array(height.length).keys()].filter(i => i > 0 && height[i-1] > threshold);
};


/*3286. Find a Safe Walk Through a Grid (Medium)
You are given an m x n binary matrix grid and an integer health. You start
on the upper-left corner (0, 0) and would like to get to the lower-right
corner (m - 1, n - 1). You can move up, down, left, or right from one cell
to another adjacent cell as long as your health remains positive. Cells
(i, j) with grid[i][j] = 1 are considered unsafe and reduce your health by
1. Return true if you can reach the final cell with a health value of 1 or
more, and false otherwise.

Example 1:
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1
Output: true
Explanation: The final cell can be reached safely by walking along the gray
             cells below.

Example 2:
Input: grid = [[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], health = 3
Output: false
Explanation: A minimum of 4 health points is needed to reach the final cell
             safely.

Example 3:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]], health = 5
Output: true
Explanation: The final cell can be reached safely by walking along the gray
             cells below. Any path that does not go through the cell (1, 1)
             is unsafe since your health will drop to 0 when reaching the
             final cell.

Constraints:
* m == grid.length
* n == grid[i].length
* 1 <= m, n <= 50
* 2 <= m * n
* 1 <= health <= m + n
* grid[i][j] is either 0 or 1.*/

function findSafeWalk(grid: number[][], health: number): boolean {
    const m = grid.length, n = grid[0].length;
    const dist = Array(m).fill(0).map(() => Array(n).fill(0));
    dist[0][0] = health - grid[0][0];
    const queue = [[0, 0, dist[0][0]]];
    while (queue.length) {
        const [i, j, h] = queue.shift();
        if (i == m-1 && j == n-1) return true;
        for (const [ii, jj] of [[i-1, j], [i, j-1], [i, j+1], [i+1, j]])
            if (0 <= ii && ii < m && 0 <= jj && jj < n) {
                const hh = h - grid[ii][jj];
                if (dist[ii][jj] < hh) {
                    dist[ii][jj] = hh;
                    queue.push([ii, jj, hh]);
                }
            }
    }
    return false;
};


/*3287. Find the Maximum Sequence Value of Array (Hard)
You are given an integer array nums and a positive integer k. The value of a
sequence seq of size 2 * x is defined as:
* (seq[0] OR seq[1] OR ... OR seq[x - 1]) XOR
  (seq[x] OR seq[x + 1] OR ... OR seq[2 * x - 1]).
Return the maximum value of any subsequence of nums having size 2 * k.

Example 1:
Input: nums = [2,6,7], k = 1
Output: 5
Explanation: The subsequence [2, 7] has the maximum value of 2 XOR 7 = 5.

Example 2:
Input: nums = [4,2,5,6,7], k = 2
Output: 2
Explanation: The subsequence [4, 5, 6, 7] has the maximum value of
             (4 OR 5) XOR (6 OR 7) = 2.

Constraints:
* 2 <= nums.length <= 400
* 1 <= nums[i] < 27
* 1 <= k <= nums.length / 2*/

function maxValue(nums: number[], k: number): number {
    const n = nums.length;
    const left = [];
    let vals = Array(k+1).fill(null).map(() => new Set<number>());
    vals[0].add(0);
    for (let i = 0; i < n; ++i) {
        for (let j = k-1; j >= 0; --j)
            for (const x of vals[j])
                vals[j+1].add(x | nums[i]);
        left.push([...vals[k]]);
    }
    let ans = 0;
    vals = Array(k+1).fill(null).map(() => new Set<number>());
    vals[0].add(0);
    for (let i = n-1; i > 0; --i) {
        for (let j = k-1; j >= 0; --j)
            for (const x of vals[j])
                vals[j+1].add(x | nums[i]);
        for (const l of left[i-1])
            for (const r of vals[k])
                ans = Math.max(ans, l ^ r);
    }
    return ans;
};


/*3288. Length of the Longest Increasing Path (Hard)
You are given a 2D array of integers coordinates of length n and an integer
k, where 0 <= k < n.
coordinates[i] = [xi, yi] indicates the point (xi, yi) in a 2D plane.
An increasing path of length m is defined as a list of points (x1, y1),
(x2, y2), (x3, y3), ..., (xm, ym) such that:
* xi < xi + 1 and yi < yi + 1 for all i where 1 <= i < m.
* (xi, yi) is in the given coordinates for all i where 1 <= i <= m.
Return the maximum length of an increasing path that contains coordinates[k].

Example 1:
Input: coordinates = [[3,1],[2,2],[4,1],[0,0],[5,3]], k = 1
Output: 3
Explanation: (0, 0), (2, 2), (5, 3) is the longest increasing path that
             contains (2, 2).

Example 2:
Input: coordinates = [[2,1],[7,0],[5,6]], k = 2
Output: 2
Explanation: (2, 1), (5, 6) is the longest increasing path that contains
             (5, 6).

Constraints:
* 1 <= n == coordinates.length <= 10^5
* coordinates[i].length == 2
* 0 <= coordinates[i][0], coordinates[i][1] <= 10^9
* All elements in coordinates are distinct.
* 0 <= k <= n - 1*/

function maxPathLength(coordinates: number[][], k: number): number {
    const [xk, yk] = coordinates[k];
    coordinates.sort((x, y) => x[0] != y[0] ? x[0] - y[0] : y[1] - x[1]);
    const lis = [];

    function binarySearch(lis, y) {
        let lo = 0, hi = lis.length;
        while (lo < hi) {
            const mid = lo + hi >> 1;
            if (lis[mid] < y) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    for (const [x, y] of coordinates) {
        if (x < xk && y < yk || x == xk && y == yk || x > xk && y > yk) {
            const i = binarySearch(lis, y);
            if (i == lis.length) lis.push(y);
            else lis[i] = y;
        }
    }
    return lis.length;
};


/*3289. The Two Sneaky Numbers of Digitville (Easy)
In the town of Digitville, there was a list of numbers called nums
containing integers from 0 to n - 1. Each number was supposed to appear
exactly once in the list, however, two mischievous numbers sneaked in an
additional time, making the list longer than usual. As the town detective,
your task is to find these two sneaky numbers. Return an array of size two
containing the two numbers (in any order), so peace can return to
Digitville.

Example 1:
Input: nums = [0,1,1,0]
Output: [0,1]
Explanation: The numbers 0 and 1 each appear twice in the array.

Example 2:
Input: nums = [0,3,2,1,3,2]
Output: [2,3]
Explanation: The numbers 2 and 3 each appear twice in the array.

Example 3:
Input: nums = [7,1,5,4,3,4,6,0,9,5,8,2]
Output: [4,5]
Explanation: The numbers 4 and 5 each appear twice in the array.

Constraints:
* 2 <= n <= 100
* nums.length == n + 2
* 0 <= nums[i] < n
* The input is generated such that nums contains exactly two repeated
  elements.*/

function getSneakyNumbers(nums: number[]): number[] {
    const freq = new Map();
    for (const x of nums)
        freq.set(x, 1 + (freq.get(x) ?? 0));
    return [...freq].filter(x => x[1] == 2).map(x => x[0]);
};


/*3290. Maximum Multiplication Score (Medium)
You are given an integer array a of size 4 and another integer array b of
size at least 4. You need to choose 4 indices i0, i1, i2, and i3 from the
array b such that i0 < i1 < i2 < i3. Your score will be equal to the value
a[0] * b[i0] + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3]. Return the
maximum score you can achieve.

Example 1:
Input: a = [3,2,5,6], b = [2,-6,4,-5,-3,2,-7]
Output: 26
Explanation: We can choose the indices 0, 1, 2, and 5. The score will be
             3 * 2 + 2 * (-6) + 5 * 4 + 6 * 2 = 26.

Example 2:
Input: a = [-1,4,5,-2], b = [-5,-1,-3,-2,-4]
Output: -1
Explanation: We can choose the indices 0, 1, 3, and 4. The score will be
             (-1) * (-5) + 4 * (-1) + 5 * (-2) + (-2) * (-4) = -1.

Constraints:
* a.length == 4
* 4 <= b.length <= 10^5
* -10^5 <= a[i], b[i] <= 10^5*/

function maxScore(a: number[], b: number[]): number {
    const n = b.length;
    const dp = Array(5).fill(0).map(() => Array(n+1).fill(0));
    for (let i = 0; i < 4; ++i)
        dp[i][n] = -Infinity;
    for (let i = 3; i >= 0; --i)
        for (let j = n-1; j >= 0; --j)
            dp[i][j] = Math.max(dp[i][j+1], a[i]*b[j] + dp[i+1][j+1]);
    return dp[0][0] > -Infinity ? dp[0][0] : -1;
};


/*3291. Minimum Number of Valid Strings to Form Target I (Medium)
You are given an array of strings words and a string target. A string x is
called valid if x is a prefix of any string in words. Return the minimum
number of valid strings that can be concatenated to form target. If it is
not possible to form target, return -1. A prefix of a string is a substring
that starts from the beginning of the string and extends to any point within
it.

Example 1:
Input: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
Output: 3
Explanation: The target string can be formed by concatenating:
             - Prefix of length 2 of words[1], i.e. "aa".
             - Prefix of length 3 of words[2], i.e. "bcd".
             - Prefix of length 3 of words[0], i.e. "abc".

Example 2:
Input: words = ["abababab","ab"], target = "ababaababa"
Output: 2
Explanation: The target string can be formed by concatenating:
             - Prefix of length 5 of words[0], i.e. "ababa".
             - Prefix of length 5 of words[0], i.e. "ababa".

Example 3:
Input: words = ["abcdef"], target = "xyz"
Output: -1

Constraints:
* 1 <= words.length <= 100
* 1 <= words[i].length <= 5 * 10^3
* The input is generated such that sum(words[i].length) <= 10^5.
* words[i] consists only of lowercase English letters.
* 1 <= target.length <= 5 * 10^3
* target consists only of lowercase English letters.*/

function minValidStrings(words: string[], target: string): number {
    const trie = {};
    for (const word of words) {
        let node = trie;
        for (const ch of word) {
            if (!(ch in node)) node[ch] = {};
            node = node[ch];
        }
        node["#"] = word;
    }
    const n = target.length;
    const dp = Array(n+1).fill(Infinity);
    dp[n] = 0;
    for (let i = n-1; i >= 0; --i) {
        let node = trie;
        for (let j = i; j < n; ++j) {
            if (target[j] in node) node = node[target[j]];
            else break;
            dp[i] = Math.min(dp[i], 1 + dp[j+1]);
        }
    }
    return dp[0] < Infinity ? dp[0] : -1;
};


/*3292. Minimum Number of Valid Strings to Form Target II (Hard)
You are given an array of strings words and a string target. A string x is
called valid if x is a prefix of any string in words. Return the minimum
number of valid strings that can be concatenated to form target. If it is
not possible to form target, return -1. A prefix of a string is a substring
that starts from the beginning of the string and extends to any point within
it.

Example 1:
Input: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
Output: 3
Explanation: The target string can be formed by concatenating:
             - Prefix of length 2 of words[1], i.e. "aa".
             - Prefix of length 3 of words[2], i.e. "bcd".
             - Prefix of length 3 of words[0], i.e. "abc".

Example 2:
Input: words = ["abababab","ab"], target = "ababaababa"
Output: 2
Explanation: The target string can be formed by concatenating:
             - Prefix of length 5 of words[0], i.e. "ababa".
             - Prefix of length 5 of words[0], i.e. "ababa".

Example 3:
Input: words = ["abcdef"], target = "xyz"
Output: -1

Constraints:
* 1 <= words.length <= 100
* 1 <= words[i].length <= 5 * 10^4
* The input is generated such that sum(words[i].length) <= 10^5.
* words[i] consists only of lowercase English letters.
* 1 <= target.length <= 5 * 10^4
* target consists only of lowercase English letters.*/

class AhoCorasick {
    public root;

    constructor() {
        this.root = {parent: null, suffix: null, "$": 0};
    }

    build(patterns) {
        for (const pattern of patterns) {
            let node = this.root, size = 0;
            for (const ch of pattern) {
                if (!(ch in node))
                    node[ch] = {parent: node};
                node = node[ch];
                node["$"] = ++size;
            }
        }
        const queue = [this.root];
        while (queue.length) {
            for (let sz = queue.length; sz; --sz) {
                const node = queue.shift();
                for (const [ch, child] of Object.entries(node)) {
                    if (!["parent", "suffix", "$"].includes(ch)) {
                        let suffix = node["suffix"];
                        while (suffix && !(ch in suffix)) suffix = suffix.suffix;
                        if (suffix) child["suffix"] = suffix[ch];
                        else child["suffix"] = this.root;
                        queue.push(child);
                    }
                }
            }
        }
    }

    match(text) {
        const ans = [];
        let node = this.root;
        for (const ch of text) {
            while (!(ch in node) && node["suffix"])
                node = node["suffix"];
            if (ch in node) node = node[ch];
            ans.push(node["$"]);
        }
        return ans;
    }
}


function minValidStrings(words: string[], target: string): number {
    const n = target.length;
    const trie = new AhoCorasick();
    trie.build(words);
    const outcome = trie.match(target);
    const dp = Array(n+1).fill(Infinity);
    dp[n] = 0;
    for (let i = n-1; i >= 0; --i) {
        const x = outcome[i];
        if (x == 0) return -1;
        dp[i+1-x] = Math.min(dp[i+1-x], dp[i+1]+1);
    }
    return dp[0];
};
