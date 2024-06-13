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

var firstMissingPositive = function(nums) {
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

var trap = function(height) {
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

var groupAnagrams = function(strs) {
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

var lengthOfLastWord = function(s) {
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

var sortColors = function(nums) {
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

var subsets = function(nums) {
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

var exist = function(board, word) {
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

var isSameTree = function(p, q) {
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

var sumNumbers = function(root) {
    const stack = [[root, 0]];
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

var partition = function(s) {
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

var hasCycle = function(head) {
    let fast = head, slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) return true;
    }
    return false;
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

var compareVersion = function(version1, version2) {
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
Output: 2

Constraints:
* n == nums.length
* 1 <= n <= 5 * 10^4
* -2^31 <= nums[i] <= 2^31 - 1

Follow-up: Could you solve the problem in linear time and in O(1) space?*/

var majorityElement = function(nums) {
    let ans = 0, cnt = 0;
    for (const x of nums)
        if (cnt && ans != x) --cnt;
        else {
            if (cnt == 0) ans = x;
            ++cnt;
        }
    return ans;
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

var numIslands = function(grid) {
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

var isPowerOfTwo = function(n) {
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

var deleteNode = function(node) {
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

var productExceptSelf = function(nums) {
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

var singleNumber = function(nums) {
    let val = nums.reduce((x, y) => x^y, 0);
    val &= -val;
    const ans = [0, 0];
    for (const x of nums)
        if (x & val) ans[0] ^= x;
        else ans[1] ^= x;
    return ans;
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

var numSquares = function(n) {
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

var findMinHeightTrees = function(n, edges) {
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

var firstUniqChar = function(s) {
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

var removeKdigits = function(num, k) {
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

var longestPalindrome = function(s) {
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

var findDuplicates = function(nums) {
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

var findMinArrowShots = function(points) {
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

var islandPerimeter = function(grid) {
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

var findRelativeRanks = function(score) {
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

var findBottomLeftValue = function(root) {
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

var checkSubarraySum = function(nums, k) {
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

var addOneRow = function(root, val, depth) {
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

var replaceWords = function(dictionary, sentence) {
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

var checkValidString = function(s) {
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

var numSubarrayProductLessThanK = function(nums, k) {
    let ans = 0, prod = 1;
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        prod *= nums[i];
        while (ii <= i && prod >= k)
            prod /= nums[ii++];
        ans += i-ii+1;
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

var kthSmallestPrimeFraction = function(arr, k) {
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

var findCheapestPrice = function(n, flights, src, dst, k) {
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

var sumOfDistancesInTree = function(n, edges) {
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

var isNStraightHand = function(hand, groupSize) {
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

var mincostToHireWorkers = function(quality, wage, k) {
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

var matrixScore = function(grid) {
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

var bagOfTokensScore = function(tokens, power) {
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

var deckRevealedIncreasing = function(deck) {
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

var subarraysDivByK = function(nums, k) {
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

var distributeCoins = function(root) {

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

var smallestFromLeaf = function(root) {
    const stack = [[root, ""]];
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

var commonChars = function(words) {
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

var heightChecker = function(heights) {
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

var relativeSortArray = function(arr1, arr2) {
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

var tribonacci = function(n) {
    const dp = [0, 1, 1];
    for (let i = 3; i <= n; ++i)
        dp[i%3] = dp.reduce((x, y) => x+y, 0);
    return dp[n%3];
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

var equalSubstring = function(s, t, maxCost) {
    let ans = 0;
    for (let i = 0, ii = 0, val = 0; i < s.length; ++i) {
        val += Math.abs(s[i].charCodeAt(0) - t[i].charCodeAt(0));
        for (; val > maxCost; ++ii)
            val -= Math.abs(s[ii].charCodeAt(0) - t[ii].charCodeAt(0));
        ans = Math.max(ans, i-ii+1);
    }
    return ans;
};


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

var getMaximumGold = function(grid) {
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

var minRemoveToMakeValid = function(s) {
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

var maxScoreWords = function(words, letters, score) {
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

var minFallingPathSum = function(grid) {
    const n = grid.length;
    for (let i = 1; i < n; ++i) {
        const [m0, m1] = grid[i-1].slice().sort((x, y) => x-y).slice(0, 2);
        for (let j = 0; j < n; ++j)
            if (grid[i-1][j] != m0) grid[i][j] += m0;
            else grid[i][j] += m1;
    }
    return Math.min(...grid[n-1]);
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

var removeLeafNodes = function(root, target) {
    if (root) {
        root.left = removeLeafNodes(root.left, target);
        root.right = removeLeafNodes(root.right, target);
        if (root.left || root.right || root.val != target) return root;
    }
    return null;
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

var numSteps = function(s) {
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

var countTriplets = function(arr) {
    let ans = 0, prefix = 0;
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

var makeGood = function(s) {
    const ans = [];
    for (const ch of s)
        if (ans.length && (ans[ans.length-1].charCodeAt(0) ^ 32) == ch.charCodeAt(0)) ans.pop();
        else ans.push(ch);
    return ans.join('');
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

var isEvenOddTree = function(root) {
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

var maxDepth = function(s) {
    let ans = 0, val = 0;
    for (const ch of s)
        if (ch == '(') ans = Math.max(ans, ++val);
        else if (ch == ')') --val;
    return ans;
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

var countStudents = function(students, sandwiches) {
    const n = sandwiches.length;
    let prefix = students.reduce((x, y) => (x+y));
    for (const [i, x] of sandwiches.entries()) {
        if (x && prefix == 0 || x == 0 && prefix == n-i) return n-i;
        prefix -= x;
    }
    return 0;
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

var minimumLength = function(s) {
    let lo = 0, hi = s.length-1;
    while (lo < hi && s[lo] == s[hi]) {
        const ch = s[lo];
        for (; lo <= hi && s[lo] == ch; ++lo);
        for (; lo <= hi && s[hi] == ch; --hi);
    }
    return hi - lo + 1;
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

var subsetXORSum = function(nums) {
    return nums.reduce((x, y) => x|y) << nums.length-1;
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

var wonderfulSubstrings = function(word) {
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

var validPath = function(n, edges, source, destination) {
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

var findFarmland = function(land) {
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

var reversePrefix = function(word, ch) {
    const k = word.indexOf(ch);
    return word.split('').slice(0, k+1).reverse().join('') + word.substring(k+1);
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

var minMovesToSeat = function(seats, students) {
    seats.sort((x, y) => x-y);
    students.sort((x, y) => x-y);
    let ans = 0;
    for (let i = 0; i < seats.length; ++i)
        ans += Math.abs(seats[i] - students[i]);
    return ans;
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

var firstPalindrome = function(words) {
    for (const w of words) {
        const ww = w.split("").reverse().join("");
        if (w === ww) return w;
    }
    return "";
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

var rearrangeArray = function(nums) {
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

var evaluateTree = function(root) {
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

var longestIdealString = function(s, k) {
    const dp = Array(26).fill(0);
    for (const ch of s) {
        let most = 0, x = ch.charCodeAt(0) - 97;
        for (let i = Math.max(0, x-k); i < 26 && i <= x+k; ++i)
            most = Math.max(most, dp[i]);
        dp[x] = 1 + most;
    }
    return Math.max(...dp);
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

var findMaxK = function(nums) {
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

var pivotInteger = function(n) {
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

var removeNodes = function(head) {
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

var getCommon = function(nums1, nums2) {
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

var beautifulSubsets = function(nums, k) {
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
* 1 <= JSON.stringify(o2).length <= 105
* maxNestingDepth <= 1000*/

var areDeeplyEqual = function(o1, o2) {
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

var jsonStringify = function(object) {
    if (object == null) return 'null';
    if (typeof object === 'string') return `"${object}"`;
    if (typeof object == 'number' || typeof object == 'boolean') return String(object);
    if (Array.isArray(object)) return `[${object.map(x => jsonStringify(x)).join(',')}]`;
    return `{${Object.entries(object).map(([k, v]) => jsonStringify(k) + ':' + jsonStringify(v)).join(',')}}`;
};


/*2648. Generate Fibonacci Sequence (Easy)
Write a generator function that returns a generator object which yields the 
fibonacci sequence. The fibonacci sequence is defined by the relation 
Xn = Xn-1 + Xn-2. The first few numbers of the series are 
0, 1, 1, 2, 3, 5, 8, 13.

Example 1:
Input: callCount = 5
Output: [0,1,1,2,3]
Explanation: const gen = fibGenerator();
             gen.next().value; // 0
             gen.next().value; // 1
             gen.next().value; // 1
             gen.next().value; // 2
             gen.next().value; // 3

Example 2:
Input: callCount = 0
Output: []
Explanation: gen.next() is never called so nothing is outputted

Constraints: 0 <= callCount <= 50*/

var fibGenerator = function*() {
    let f0 = 0, f1 = 1;
    while (true) {
        yield f0;
        [f0, f1] = [f1, f0+f1];
    }
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

var splitCircularLinkedList = function(list) {
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


/*2689. Extract Kth Character From The Rope Tree (Easy)
You are given the root of a binary tree and an integer k. Besides the left
and right children, every node of this tree has two other properties, a
string node.val containing only lowercase English letters (possibly empty)
and a non-negative integer node.len. There are two types of nodes in this tree:
* Leaf: These nodes have no children, node.len = 0, and node.val is some
  non-empty string.
* Internal: These nodes have at least one child (also at most two children),
  node.len > 0, and node.val is an empty string.
The tree described above is called a Rope binary tree. Now we define S[node]
recursively as follows:
* If node is some leaf node, S[node] = node.val,
* Otherwise if node is some internal node,
  S[node] = concat(S[node.left], S[node.right]) and
  S[node].length = node.len.
Return k-th character of the string S[root]. Note: If s and p are two
strings, concat(s, p) is a string obtained by concatenating p to s. For
example, concat("ab", "zz") = "abzz".

Example 1:
Input: root = [10,4,"abcpoe","g","rta"], k = 6
Output: "b"
Explanation: In the picture below, we put an integer on internal nodes that
             represents node.len, and a string on leaf nodes that represents
             node.val. You can see that
             S[root] = concat(concat("g", "rta"), "abcpoe") = "grtaabcpoe".
             So S[root][5], which represents 6th character of it, is equal
             to "b".

Example 2:
Input: root = [12,6,6,"abc","efg","hij","klm"], k = 3
Output: "c"
Explanation: In the picture below, we put an integer on internal nodes that
             represents node.len, and a string on leaf nodes that represents
             node.val. You can see that
             S[root] = concat(concat("abc", "efg"), concat("hij", "klm")) =
             "abcefghijklm". So S[root][2], which represents the 3rd
             character of it, is equal to "c".

Example 3:
Input: root = ["ropetree"], k = 8
Output: "e"
Explanation: In the picture below, we put an integer on internal nodes that
             represents node.len, and a string on leaf nodes that represents
             node.val. You can see that S[root] = "ropetree". So S[root][7],
             which represents 8th character of it, is equal to "e".

Constraints:
* The number of nodes in the tree is in the range [1, 10^3]
* node.val contains only lowercase English letters
* 0 <= node.val.length <= 50
* 0 <= node.len <= 10^4
* for leaf nodes, node.len = 0 and node.val is non-empty
* for internal nodes, node.len > 0 and node.val is empty
* 1 <= k <= S[root].length*/

var getKthCharacter = function(root, k) {
    let node = root;
    while (node.len) {
        const val = node.left ? Math.max(node.left.len, node.left.val.length) : 0;
        if (val >= k) node = node.left;
        else {
            k -= val;
            node = node.right;
        }
    }
    return node.val[k-1];
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

var createInfiniteObject = function() {
    return new Proxy({}, {
        get(_, prop) {
            return () => prop;
        }
    });
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

var compactObject = function(obj) {
    if (obj == null) return null;
    if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);
    if (typeof obj == "object") {
        const ans = {};
        for (let [key, val] of Object.entries(obj)) {
            val = compactObject(val);
            if (val) ans[key] = val;
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

var join = function(arr1, arr2) {
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

var houseCount = function(street, k) {
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

var findNonMinOrMax = function(nums) {
    if (nums.length < 3) return -1;
    return nums.slice(0, 3).sort((a, b) => (a-b))[1];
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

var minimumDistance = function(n, edges, s, marked) {
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

var numberOfSpecialSubstrings = function(s) {
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

var maximumNumberOfStringPairs = function(words) {
    let ans = 0, seen = new Set();
    for (let w of words) {
        const ww = w.split("").reverse().join("");
        if (seen.has(ww)) ++ans;
        seen.add(w);
    }
    return ans;
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

Date.prototype.nextDay = function() {
    const date = new Date(this);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}


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

var isPreorder = function(nodes) {
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

Array.prototype.upperBound = function(target) {
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

var numberOfCategories = function(n, categoryHandler) {
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

var createObject = function(keysArr, valuesArr) {
    const ans = {};
    for (const [i, k] of keysArr.entries())
        if (!(k in ans))
            ans[k] = valuesArr[i];
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

String.prototype.replicate = function(times) {
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

var partial = function(fn, args) {

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

var kthLuckyNumber = function(k) {
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

function* factorial(n) {
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

Array.prototype.forEach = function(callback, context) {
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

var doubleIt = function(head) {
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

var delayAll = function(functions, ms) {
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

var invertObject = function(obj) {
    return Object.entries(obj).reduce((acc , [k, v]) => {
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

var countPairs = function(nums, target) {
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

var isAcronym = function(words, s) {
    return words.length === s.length && words.every((v, i) => v[0] === s[i]);
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

var maximumLengthOfRanges = function(nums) {
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

var maximumCoins = function(heroes, monsters, coins) {
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

var sumRemoteness = function(grid) {
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

var minimumRightShifts = function(nums) {
    let k = 0, n = nums.length;
    for (let i = 1; i < n; ++i)
        if (nums[i-1] > nums[i]) {
            if (k) return -1;
            k = i;
        }
    if (k === 0) return 0;
    return nums[n-1] < nums[0] ? n - k : -1;
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

var maxSubarrayLength = function(nums) {
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

var maximumOddBinaryNumber = function(s) {
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

var minArrayLength = function(nums, k) {
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

var maxScore = function(prices) {
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

var lastVisitedIntegers = function(words) {
    let ans = [], seen = [], k = 0;
    for (const w of words) {
        if (w === "prev") {
            if (k >= seen.length) ans.push(-1);
            else ans.push(seen[seen.length-1-k++]);
        } else {
            seen.add(w);
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

var getLongestSubsequence = function(words, groups) {
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

var sumCounts = function(nums) {
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

var findKOr = function(nums, k) {
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


/*2928. Distribute Candies Among Children I (Easy)
You are given two positive integers n and limit. Return the total number of 
ways to distribute n candies among 3 children such that no child gets more 
than limit candies.

Example 1:
Input: n = 5, limit = 2
Output: 3
Explanation: There are 3 ways to distribute 5 candies such that no child 
             gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).

Example 2:
Input: n = 3, limit = 3
Output: 10
Explanation: There are 10 ways to distribute 3 candies such that no child 
             gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), 
             (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), 
             (2, 1, 0) and (3, 0, 0).

Constraints:
* 1 <= n <= 50
* 1 <= limit <= 50*/

var distributeCandies = function(n, limit) {
    let ans = 0; 
    for (var x = 0; x <= limit; ++x) 
        for (var y = 0; y <= limit; ++y)
            if (0 <= n-x-y && n-x-y <= limit) ++ans; 
    return ans; 
};


/*2929. Distribute Candies Among Children II (Medium)
You are given two positive integers n and limit. Return the total number of 
ways to distribute n candies among 3 children such that no child gets more 
than limit candies.

Example 1:
Input: n = 5, limit = 2
Output: 3
Explanation: There are 3 ways to distribute 5 candies such that no child 
             gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).
Example 2:
Input: n = 3, limit = 3
Output: 10
Explanation: There are 10 ways to distribute 3 candies such that no child 
             gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), 
             (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), 
             (2, 1, 0) and (3, 0, 0).

Constraints:
* 1 <= n <= 10^6
* 1 <= limit <= 10^6*/

var distributeCandies = function(n, limit) {
    let ans = 0; 
    for (var x = 0; x <= limit; ++x)
        ans += Math.max(0, Math.min(n-x, 2*limit-n+x)+1); 
    return ans; 
};


/*2930. Number of Strings Which Can Be Rearranged to Contain Substring (Medium)
You are given an integer n. A string s is called good if it contains only 
lowercase English characters and it is possible to rearrange the characters 
of s such that the new string contains "leet" as a substring.

For example:
* The string "lteer" is good because we can rearrange it to form "leetr" .
* "letl" is not good because we cannot rearrange it to contain "leet" as a 
  substring.
Return the total number of good strings of length n. Since the answer may 
be large, return it modulo 10^9 + 7. A substring is a contiguous sequence 
of characters within a string.
 
Example 1:
Input: n = 4
Output: 12
Explanation: The 12 strings which can be rearranged to have "leet" as a 
             substring are: "eelt", "eetl", "elet", "elte", "etel", "etle", 
             "leet", "lete", "ltee", "teel", "tele", and "tlee".

Example 2:
Input: n = 10
Output: 83943898
Explanation: The number of strings with length 10 which can be rearranged 
             to have "leet" as a substring is 526083947580. Hence the 
             answer is 526083947580 % (10^9 + 7) = 83943898.

Constraints: 1 <= n <= 10^5*/

var stringCount = function(n) {
    const mod = 1_000_000_007n; 
    
    const pow = function(x, p, m) {
        let ans = 1n; 
        for (; p; p >>= 1) {
            if (p & 1) ans = ans * x % m; 
            x = x * x % m; 
        }
        return ans; 
    }
    
    const bn = BigInt(n); 
    return ((pow(26n, n, mod) - (75n+bn)*pow(25n, n-1, mod) + (72n+2n*bn)*pow(24n, n-1, mod) - (23n+bn)*pow(23n, n-1, mod)) % mod + mod) % mod; 
};


/*2931. Maximum Spending After Buying Items (Hard)
You are given a 0-indexed m * n integer matrix values, representing the 
values of m * n different items in m different shops. Each shop has n items 
where the jth item in the ith shop has a value of values[i][j]. 
Additionally, the items in the ith shop are sorted in non-increasing order 
of value. That is, values[i][j] >= values[i][j + 1] for all 0 <= j < n - 1.
On each day, you would like to buy a single item from one of the shops. 
Specifically, On the dth day you can:
* Pick any shop i.
* Buy the rightmost available item j for the price of values[i][j] * d. 
  That is, find the greatest index j such that item j was never bought 
  before, and buy it for the price of values[i][j] * d.
Note that all items are pairwise different. For example, if you have bought 
item 0 from shop 1, you can still buy item 0 from any other shop. Return 
the maximum amount of money that can be spent on buying all m * n products.

Example 1:
Input: values = [[8,5,2],[6,4,1],[9,7,3]]
Output: 285
Explanation: - On the first day, we buy product 2 from shop 1 for a price 
               of values[1][2] * 1 = 1.
             - On the second day, we buy product 2 from shop 0 for a price 
               of values[0][2] * 2 = 4.
             - On the third day, we buy product 2 from shop 2 for a price 
               of values[2][2] * 3 = 9.
             - On the fourth day, we buy product 1 from shop 1 for a price 
               of values[1][1] * 4 = 16.
             - On the fifth day, we buy product 1 from shop 0 for a price 
               of values[0][1] * 5 = 25.
             - On the sixth day, we buy product 0 from shop 1 for a price 
               of values[1][0] * 6 = 36.
             - On the seventh day, we buy product 1 from shop 2 for a price 
               of values[2][1] * 7 = 49.
             - On the eighth day, we buy product 0 from shop 0 for a price 
               of values[0][0] * 8 = 64.
               of values[2][0] * 9 = 81.
             Hence, our total spending is equal to 285. It can be shown 
             that 285 is the maximum amount of money that can be spent 
             buying all m * n products. 

Example 2:
Input: values = [[10,8,6,4,2],[9,7,5,3,2]]
Output: 386
Explanation: - On the first day, we buy product 4 from shop 0 for a price 
               of values[0][4] * 1 = 2.
             - On the second day, we buy product 4 from shop 1 for a price 
               of values[1][4] * 2 = 4.
             - On the third day, we buy product 3 from shop 1 for a price of values[1][3] * 3 = 9.
             - On the fourth day, we buy product 3 from shop 0 for a price of values[0][3] * 4 = 16.
             - On the fifth day, we buy product 2 from shop 1 for a price of values[1][2] * 5 = 25.
             - On the sixth day, we buy product 2 from shop 0 for a price of values[0][2] * 6 = 36.
             - On the seventh day, we buy product 1 from shop 1 for a price of values[1][1] * 7 = 49.
             - On the eighth day, we buy product 1 from shop 0 for a price of values[0][1] * 8 = 64
             - On the ninth day, we buy product 0 from shop 1 for a price of values[1][0] * 9 = 81.
             - On the tenth day, we buy product 0 from shop 0 for a price of values[0][0] * 10 = 100.
             Hence, our total spending is equal to 386. It can be shown 
             that 386 is the maximum amount of money that can be spent 
             buying all m * n products.

Constraints:
* 1 <= m == values.length <= 10
* 1 <= n == values[i].length <= 10^4
* 1 <= values[i][j] <= 10^6
* values[i] are sorted in non-increasing order.*/

var maxSpending = function(values) {
    const m = values.length, n = values[0].length; 
    const pq = new PriorityQueue({ compare: (x, y) => x[0]-y[0] }); 
    for (var i = 0; i < m; ++i) 
        pq.enqueue([values[i][n-1], i, n-1]); 
    var ans = 0; 
    for (var k = 0; k < m*n; ++k) {
        const elem = pq.dequeue(), v = elem[0], i = elem[1], j = elem[2]; 
        ans += v * (k+1); 
        if (j) pq.enqueue([values[i][j-1], i, j-1]);
    }
    return ans; 
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

var maximumStrongPairXor = function(nums) {
    let ans = 0;
    for (let i = 0, n = nums.length; i < n; ++i)
        for (let j = i+1; j < n; ++j)
            if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j]))
                ans = Math.max(ans, nums[i] ^ nums[j]);
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

var countBlocks = function(nums) {

    function fn(lo, hi) {
        if (lo == hi || nums.at(lo) == nums.at(hi)) return 1;
        const mid = lo + Math.floor((hi - lo)/2);
        let ans = fn(lo, mid) + fn(mid+1, hi);
        if (nums.at(mid) == nums.at(mid+1)) --ans;
        return ans;
    }

    return fn(0, nums.size()-1);
};


/*2937. Make Three Strings Equal (Easy)
You are given three strings s1, s2, and s3. You have to perform the 
following operation on these three strings as many times as you want. In 
one operation you can choose one of these three strings such that its 
length is at least 2 and delete the rightmost character of it. Return the 
minimum number of operations you need to perform to make the three strings 
equal if there is a way to make them equal, otherwise, return -1.

Example 1:
Input: s1 = "abc", s2 = "abb", s3 = "ab"
Output: 2
Explanation: Performing operations on s1 and s2 once will lead to three 
             equal strings. It can be shown that there is no way to make 
             them equal with less than two operations.

Example 2:
Input: s1 = "dac", s2 = "bac", s3 = "cac"
Output: -1
Explanation: Because the leftmost letters of s1 and s2 are not equal, they 
             could not be equal after any number of operations. So the 
             answer is -1.

Constraints:
* 1 <= s1.length, s2.length, s3.length <= 100
* s1, s2 and s3 consist only of lowercase English letters.*/

var findMinimumOperations = function(s1, s2, s3) {
    let i = 0; 
    for (let m = Math.min(s1.length, s2.length, s3.length); i < m && s1[i] == s2[i] && s2[i] == s3[i]; ++i); 
    return i > 0 ? s1.length + s2.length + s3.length - 3*i : -1; 
};


/*2938. Separate Black and White Balls (Medium)
There are n balls on a table, each ball has a color black or white. You are 
given a 0-indexed binary string s of length n, where 1 and 0 represent 
black and white balls, respectively. In each step, you can choose two 
adjacent balls and swap them. Return the minimum number of steps to group 
all the black balls to the right and all the white balls to the left.

Example 1:
Input: s = "101"
Output: 1
Explanation: We can group all the black balls to the right in the following 
             way:
             - Swap s[0] and s[1], s = "011".
             Initially, 1s are not grouped together, requiring at least 1 
             step to group them to the right.

Example 2:
Input: s = "100"
Output: 2
Explanation: We can group all the black balls to the right in the following 
             way:
             - Swap s[0] and s[1], s = "010".
             - Swap s[1] and s[2], s = "001".
             It can be proven that the minimum number of steps needed is 2.

Example 3:
Input: s = "0111"
Output: 0
Explanation: All the black balls are already grouped to the right.

Constraints:
* 1 <= n == s.length <= 10^5
* s[i] is either '0' or '1'.*/

var minimumSteps = function(s) {
    let ans = 0, prefix = 0; 
    for (const ch of s) 
        if (ch == '1') ++prefix; 
        else ans += prefix; 
    return ans;
};


/*2939. Maximum Xor Product (Medium)
Given three integers a, b, and n, return the maximum value of 
(a XOR x) * (b XOR x) where 0 <= x < 2n. Since the answer may be too large, 
return it modulo 10^9 + 7. Note that XOR is the bitwise XOR operation.

Example 1:
Input: a = 12, b = 5, n = 4
Output: 98
Explanation: For x = 2, (a XOR x) = 14 and (b XOR x) = 7. Hence, 
             (a XOR x) * (b XOR x) = 98. It can be shown that 98 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Example 2:
Input: a = 6, b = 7 , n = 5
Output: 930
Explanation: For x = 25, (a XOR x) = 31 and (b XOR x) = 30. Hence, 
             (a XOR x) * (b XOR x) = 930. It can be shown that 930 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Example 3:
Input: a = 1, b = 6, n = 3
Output: 12
Explanation: For x = 5, (a XOR x) = 4 and (b XOR x) = 3. Hence, 
             (a XOR x) * (b XOR x) = 12. It can be shown that 12 is the 
             maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2n.

Constraints:
* 0 <= a, b < 2^50
* 0 <= n <= 50*/

var maximumXorProduct = function(a, b, n) {
    const mod = 1_000_000_007n; 
    let aa = BigInt(a), bb = BigInt(b); 
    for (let i = BigInt(n)-1n; i >= 0n; --i) 
        if (aa >= bb && (bb & 1n<<i) == 0 || aa < bb && (aa & 1n<<i) == 0) {
            aa ^= 1n<<i; 
            bb ^= 1n<<i; 
        }
    return aa % mod * (bb % mod) % mod; 
};


/*2940. Find Building Where Alice and Bob Can Meet (Hard)
You are given a 0-indexed array heights of positive integers, where 
heights[i] represents the height of the ith building. If a person is in 
building i, they can move to any other building j if and only if i < j and 
heights[i] < heights[j]. You are also given another array queries where 
queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob 
is in building bi. Return an array ans where ans[i] is the index of the 
leftmost building where Alice and Bob can meet on the ith query. If Alice 
and Bob cannot move to a common building on query i, set ans[i] to -1.

Example 1:
Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: - In the first query, Alice and Bob can move to building 2 
               since heights[0] < heights[2] and heights[1] < heights[2]. 
             - In the second query, Alice and Bob can move to building 5 
               since heights[0] < heights[5] and heights[3] < heights[5]. 
             - In the third query, Alice cannot meet Bob since Alice cannot 
               move to any other building.
             - In the fourth query, Alice and Bob can move to building 5 
               since heights[3] < heights[5] and heights[4] < heights[5].
             - In the fifth query, Alice and Bob are already in the same 
               building.  
             For ans[i] != -1, It can be shown that ans[i] is the leftmost 
             building where Alice and Bob can meet. For ans[i] == -1, It 
             can be shown that there is no building where Alice and Bob can 
             meet.

Example 2:
Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: - In the first query, Alice can directly move to Bob's 
               building since heights[0] < heights[7].
             - In the second query, Alice and Bob can move to building 6 
               since heights[3] < heights[6] and heights[5] < heights[6].
             - In the third query, Alice cannot meet Bob since Bob cannot 
               move to any other building.
             - In the fourth query, Alice and Bob can move to building 4 
               since heights[3] < heights[4] and heights[0] < heights[4].
             - In the fifth query, Alice can directly move to Bob's 
               building since heights[1] < heights[6].
             For ans[i] != -1, It can be shown that ans[i] is the leftmost 
             building where Alice and Bob can meet. For ans[i] == -1, It 
             can be shown that there is no building where Alice and Bob can 
             meet.

Constraints:
* 1 <= heights.length <= 5 * 10^4
* 1 <= heights[i] <= 10^9
* 1 <= queries.length <= 5 * 10^4
* queries[i] = [ai, bi]
* 0 <= ai, bi <= heights.length - 1*/

var leftmostBuildingQueries = function(heights, queries) {
    const m = heights.length, n = queries.length; 
    const qs = Array(m).fill().map(() => []); 
    const ans = Array(n).fill(-1); 
    for (let [i, [a, b]] of queries.entries()) {
        if (a > b) { var temp = a; a = b; b = temp; }
        if (a == b || heights[a] < heights[b]) ans[i] = b; 
        else qs[b].push([heights[a], i]); 
    }
    const pq = new PriorityQueue({ compare: (x, y) => x[0]-y[0] }); 
    for (const[k, x] of heights.entries()) {
        while (pq.size() && pq.front()[0] < x) {
            const [_, i] = pq.dequeue(); 
            ans[i] = k; 
        }
        for (var elem of qs[k]) pq.enqueue(elem); 
    }
    return ans; 
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

var findWordsContaining = function(words, x) {
    const ans = [];
    for (let i = 0; i < words.length; ++i)
        if (words[i].includes(x)) ans.push(i);
    return ans;
};


/*2946. Matrix Similarity After Cyclic Shifts (Easy)
You are given a 0-indexed m x n integer matrix mat and an integer k. You 
have to cyclically right shift odd indexed rows k times and cyclically left 
shift even indexed rows k times. Return true if the initial and final 
matrix are exactly the same and false otherwise.

Example 1:
Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]], k = 2
Output: true
Explanation: Initially, the matrix looks like the first figure. Second 
             figure represents the state of the matrix after one right and 
             left cyclic shifts to even and odd indexed rows. Third figure 
             is the final state of the matrix after two cyclic shifts which 
             is similar to the initial matrix. Therefore, return true.

Example 2:
Input: mat = [[2,2],[2,2]], k = 3
Output: true
Explanation: As all the values are equal in the matrix, even after 
             performing cyclic shifts the matrix will remain the same. 
             Therefeore, we return true.

Example 3:
Input: mat = [[1,2]], k = 1
Output: false
Explanation: After one cyclic shift, mat = [[2,1]] which is not equal to 
             the initial matrix. Therefore we return false.

Constraints:
* 1 <= mat.length <= 25
* 1 <= mat[i].length <= 25
* 1 <= mat[i][j] <= 25
* 1 <= k <= 50*/

var areSimilar = function(mat, k) {
    for (var row of mat) 
        for (var j = 0, n = row.length; j < n; ++j) 
            if (row[j] != row[(j+k) % n]) return false; 
    return true; 
};


/*2947. Count Beautiful Substrings I (Medium)
You are given a string s and a positive integer k. Let vowels and 
consonants be the number of vowels and consonants in a string. A string is 
beautiful if:
* vowels == consonants.
* (vowels * consonants) % k == 0, in other terms the multiplication of 
  vowels and consonants is divisible by k.
Return the number of non-empty beautiful substrings in the given string s.
A substring is a contiguous sequence of characters in a string. Vowel 
letters in English are 'a', 'e', 'i', 'o', and 'u'. Consonant letters in 
English are every letter except vowels. 

Example 1:
Input: s = "baeyh", k = 2
Output: 2
Explanation: There are 2 beautiful substrings in the given string.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["y","h"]). You can see that string "aeyh" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["b","y"]). You can see that string "baey" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             It can be shown that there are only 2 beautiful substrings in 
             the given string.

Example 2:
Input: s = "abba", k = 1
Output: 3
Explanation: There are 3 beautiful substrings in the given string.
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]). 
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 2 (["a","a"]), 
               consonants = 2 (["b","b"]).
             It can be shown that there are only 3 beautiful substrings in 
             the given string.

Example 3:
Input: s = "bcdf", k = 1
Output: 0
Explanation: There are no beautiful substrings in the given string.

Constraints:
* 1 <= s.length <= 1000
* 1 <= k <= 1000
* s consists of only English lowercase letters.*/

var beautifulSubstrings = function(s, k) {
    let ans = 0; 
    for (var i = 0, n = s.length; i < n; ++i) {
        let vowels = 0, consonants = 0; 
        for (var j = i; j < n; ++j) {
            if ("aeiou".includes(s[j])) ++vowels; 
            else ++consonants; 
            if (vowels == consonants && vowels * consonants % k == 0) ++ans; 
        }
    }
    return ans; 
};


/*2948. Make Lexicographically Smallest Array by Swapping Elements (Medium)
You are given a 0-indexed array of positive integers nums and a positive 
integer limit. In one operation, you can choose any two indices i and j and 
swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit. Return the 
lexicographically smallest array that can be obtained by performing the 
operation any number of times. An array a is lexicographically smaller than 
an array b if in the first position where a and b differ, array a has an 
element that is less than the corresponding element in b. For example, the 
array [2,10,3] is lexicographically smaller than the array [10,2,3] because 
they differ at index 0 and 2 < 10. 

Example 1:
Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Apply the operation 2 times:
             - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
             - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
             We cannot obtain a lexicographically smaller array by applying 
             any more operations. Note that it may be possible to get the 
             same result by doing different operations.

Example 2:
Input: nums = [1,7,6,18,2,1], limit = 3
Output: [1,6,7,18,1,2]
Explanation: Apply the operation 3 times:
             - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
             - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
             - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
             We cannot obtain a lexicographically smaller array by applying 
             any more operations.

Example 3:
Input: nums = [1,7,28,19,10], limit = 3
Output: [1,7,28,19,10]
Explanation: [1,7,28,19,10] is the lexicographically smallest array we can 
             obtain because we cannot apply the operation on any two 
             indices.

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9
* 1 <= limit <= 10^9*/

var lexicographicallySmallestArray = function(nums, limit) {
    let vals = []; 
    for (const [i, x] of nums.entries()) vals.push([x, i]); 
    vals.sort((x, y) => x[0]-y[0]); 
    let idx = [], kk = 0; 
    for (const [k, [x, i]] of vals.entries()) {
        idx.push(i); 
        if (k == vals.length-1 || x+limit < vals[k+1][0]) {
            idx.sort((x, y) => x-y); 
            for (var j = 0; j < idx.length; ++j) nums[idx[j]] = vals[kk+j][0]; 
            idx.length = 0; 
            kk = k+1; 
        }
    }
    return nums; 
};


/*2949. Count Beautiful Substrings II (Hard)
You are given a string s and a positive integer k. Let vowels and 
consonants be the number of vowels and consonants in a string. A string is 
beautiful if:
* vowels == consonants.
* (vowels * consonants) % k == 0, in other terms the multiplication of 
  vowels and consonants is divisible by k.
Return the number of non-empty beautiful substrings in the given string s.
A substring is a contiguous sequence of characters in a string. Vowel 
letters in English are 'a', 'e', 'i', 'o', and 'u'. Consonant letters in 
English are every letter except vowels.

Example 1:
Input: s = "baeyh", k = 2
Output: 2
Explanation: There are 2 beautiful substrings in the given string.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["y","h"]). You can see that string "aeyh" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             - Substring "baeyh", vowels = 2 (["a",e"]), 
               consonants = 2 (["b","y"]). You can see that string "baey" 
               is beautiful as vowels == consonants and 
               vowels * consonants % k == 0.
             It can be shown that there are only 2 beautiful substrings in 
             the given string.

Example 2:
Input: s = "abba", k = 1
Output: 3
Explanation: There are 3 beautiful substrings in the given string.
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
             - Substring "abba", vowels = 2 (["a","a"]), consonants = 2 
               (["b","b"]).
             It can be shown that there are only 3 beautiful substrings in 
             the given string.

Example 3:
Input: s = "bcdf", k = 1
Output: 0
Explanation: There are no beautiful substrings in the given string.
 
Constraints:
* 1 <= s.length <= 5 * 10^4
* 1 <= k <= 1000
* s consists of only English lowercase letters.*/

var beautifulSubstrings = function(s, k) {
    for (var n = 1; n <= k; ++n) 
        if (n * n % k === 0) break; 
    n *= 2; 
    const seen = Array(n).fill().map(() => new Map());
    seen[n-1].set(0, 1); 
    let ans = 0, diff = 0; 
    for (const [i, ch] of s.split('').entries()) {
        if ("aeiou".includes(ch)) ++diff; 
        else --diff; 
        if (!(seen[i%n].has(diff))) seen[i%n].set(diff, 0); 
        ans += seen[i%n].get(diff); 
        seen[i%n].set(diff, seen[i%n].get(diff) + 1); 
    }
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

var countDivisibleSubstrings = function(word) {
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

var sameEndSubstringCount = function(s, queries) {
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


/*2956. Find Common Elements Between Two Arrays (Easy)
You are given two 0-indexed integer arrays nums1 and nums2 of sizes n and m, 
respectively. Consider calculating the following values:
* The number of indices i such that 0 <= i < n and nums1[i] occurs at least 
  once in nums2.
* The number of indices i such that 0 <= i < m and nums2[i] occurs at least 
  once in nums1.
Return an integer array answer of size 2 containing the two values in the 
above order.

Example 1:
Input: nums1 = [4,3,2,3,1], nums2 = [2,2,5,2,3,6]
Output: [3,4]
Explanation: We calculate the values as follows:
             - The elements at indices 1, 2, and 3 in nums1 occur at least 
               once in nums2. So the first value is 3.
             - The elements at indices 0, 1, 3, and 4 in nums2 occur at 
               least once in nums1. So the second value is 4.

Example 2:
Input: nums1 = [3,4,2,3], nums2 = [1,5]
Output: [0,0]
Explanation: There are no common elements between the two arrays, so the two 
             values will be 0.

Constraints:
* n == nums1.length
* m == nums2.length
* 1 <= n, m <= 100
* 1 <= nums1[i], nums2[i] <= 100*/

var findIntersectionValues = function(nums1, nums2) {
    let ans = [0, 0]; 
    for (const x of nums1) 
        if (nums2.includes(x)) ++ans[0]; 
    for (const x of nums2)
        if (nums1.includes(x)) ++ans[1]; 
    return ans;
};


/*2957. Remove Adjacent Almost-Equal Characters (Medium)
You are given a 0-indexed string word. In one operation, you can pick any 
index i of word and change word[i] to any lowercase English letter. Return 
the minimum number of operations needed to remove all adjacent almost-equal 
characters from word. Two characters a and b are almost-equal if a == b or 
a and b are adjacent in the alphabet.

Example 1:
Input: word = "aaaaa"
Output: 2
Explanation: We can change word into "acaca" which does not have any 
             adjacent almost-equal characters. It can be shown that the 
             minimum number of operations needed to remove all adjacent 
             almost-equal characters from word is 2.

Example 2:
Input: word = "abddez"
Output: 2
Explanation: We can change word into "ybdoez" which does not have any 
             adjacent almost-equal characters. It can be shown that the 
             minimum number of operations needed to remove all adjacent 
             almost-equal characters from word is 2.

Example 3:
Input: word = "zyxyxyz"
Output: 3
Explanation: We can change word into "zaxaxaz" which does not have any 
             adjacent almost-equal characters. It can be shown that the 
             minimum number of operations needed to remove all adjacent 
             almost-equal characters from word is 3.

Constraints:
* 1 <= word.length <= 100
* word consists only of lowercase English letters.*/

var removeAlmostEqualCharacters = function(word) {
    let ans = 0; 
    for (let i = 1; i < word.length; ++i) 
        if (Math.abs(word[i-1].charCodeAt(0) - word[i].charCodeAt(0)) <= 1) ++ans, ++i; 
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

var maxSubarrayLength = function(nums, k) {
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


/*2959. Number of Possible Sets of Closing Branches (Hard)
There is a company with n branches across the country, some of which are 
connected by roads. Initially, all branches are reachable from each other by 
traveling some roads. The company has realized that they are spending an 
excessive amount of time traveling between their branches. As a result, they 
have decided to close down some of these branches (possibly none). However, 
they want to ensure that the remaining branches have a distance of at most 
maxDistance from each other. The distance between two branches is the 
minimum total traveled length needed to reach one branch from another. You 
are given integers n, maxDistance, and a 0-indexed 2D array roads, where 
roads[i] = [ui, vi, wi] represents the undirected road between branches ui 
and vi with length wi. Return the number of possible sets of closing 
branches, so that any branch has a distance of at most maxDistance from any 
other. Note that, after closing a branch, the company will no longer have 
access to any roads connected to it. Note that, multiple roads are allowed.

Example 1:
Input: n = 3, maxDistance = 5, roads = [[0,1,2],[1,2,10],[0,2,10]]
Output: 5
Explanation: The possible sets of closing branches are:
             - The set [2], after closing, active branches are [0,1] and 
               they are reachable to each other within distance 2.
             - The set [0,1], after closing, the active branch is [2].
             - The set [1,2], after closing, the active branch is [0].
             - The set [0,2], after closing, the active branch is [1].
             - The set [0,1,2], after closing, there are no active branches.
             It can be proven, that there are only 5 possible sets of 
             closing branches.

Example 2:
Input: n = 3, maxDistance = 5, roads = [[0,1,20],[0,1,10],[1,2,2],[0,2,2]]
Output: 7
Explanation: The possible sets of closing branches are:
             - The set [], after closing, active branches are [0,1,2] and 
               they are reachable to each other within distance 4.
             - The set [0], after closing, active branches are [1,2] and 
               they are reachable to each other within distance 2.
             - The set [1], after closing, active branches are [0,2] and 
               they are reachable to each other within distance 2.
             - The set [0,1], after closing, the active branch is [2].
             - The set [1,2], after closing, the active branch is [0].
             - The set [0,2], after closing, the active branch is [1].
             - The set [0,1,2], after closing, there are no active branches.
             It can be proven, that there are only 7 possible sets of 
             closing branches.

Example 3:
Input: n = 1, maxDistance = 10, roads = []
Output: 2
Explanation: The possible sets of closing branches are:
             - The set [], after closing, the active branch is [0].
             - The set [0], after closing, there are no active branches.
             It can be proven, that there are only 2 possible sets of 
             closing branches.

Constraints:
* 1 <= n <= 10
* 1 <= maxDistance <= 10^5
* 0 <= roads.length <= 1000
* roads[i].length == 3
* 0 <= ui, vi <= n - 1
* ui != vi
* 1 <= wi <= 1000
* All branches are reachable from each other by traveling some roads.*/

var numberOfSets = function(n, maxDistance, roads) {
    let ans = 0; 
    for (let m = 0; m < (1<<n); ++m) {
        let dist = Array(n).fill(null).map(() => Array(n).fill(1e6)); 
        for (let u = 0; u < n; ++u)
            if (m & 1<<u) dist[u][u] = 0; 
        for (let road of roads) {
            let u = road[0], v = road[1], w = road[2]; 
            if ((m & 1<<u) && (m & 1<<v))
                dist[u][v] = dist[v][u] = Math.min(dist[u][v], w); 
        }
        for (let k = 0; k < n; ++k)
            for (let u = 0; u < n; ++u)
                for (let v = 0; v < n; ++v)
                    dist[u][v] = Math.min(dist[u][v], dist[u][k] + dist[k][v]); 
        let found = false; 
        for (let u = 0; u < n; ++u)
            if (m & 1<<u)
                for (let v = 0; v < n; ++v)
                    if ((m & 1<<v) && dist[u][v] > maxDistance) found = true; 
        if (!found) ++ans; 
    }
    return ans; 
};


/*2960. Count Tested Devices After Test Operations (Easy)
You are given a 0-indexed integer array batteryPercentages having length n,
denoting the battery percentages of n 0-indexed devices. Your task is to
test each device i in order from 0 to n - 1, by performing the following
test operations:
* If batteryPercentages[i] is greater than 0:
  + Increment the count of tested devices.
  + Decrease the battery percentage of all devices with indices j in the
    range [i + 1, n - 1] by 1, ensuring their battery percentage never goes
    below 0, i.e, batteryPercentages[j] = max(0, batteryPercentages[j] - 1).
  + Move to the next device.
* Otherwise, move to the next device without performing any test.
Return an integer denoting the number of devices that will be tested after
performing the test operations in order.

Example 1:
Input: batteryPercentages = [1,1,2,1,3]
Output: 3
Explanation: Performing the test operations in order starting from device 0:
             - At device 1, batteryPercentages [1] == 0, so we move to the
               next device without testing.
             - At device 2, batteryPercentages[2] > 0, so there are now 2
               tested devices, and batteryPercentages becomes [1,0,1,0,1].
             - At device 3, batteryPercentages [3] == 0, so we move to the
               next device without testing.
             - At device 0, batteryPercentages[0] > 0, so there is now 1
               tested device, and batteryPercentages becomes [1,0,1,0,2].
             - At device 4, batteryPercentages[4] > 0, so there are now 3
               tested devices, and batteryPercentages stays the same.
             So, the answer is 3.

Example 2:
Input: batteryPercentages = [0,1,2]
Output: 2
Explanation: Performing the test operations in order starting from device 0:
             - At device 0, batteryPercentages[0] == 0, so we move to the
               next device without testing.
             - At device 1, batteryPercentages[1] > 0, so there is now 1
               tested device, and batteryPercentages becomes [0,1,1].
             - At device 2, batteryPercentages [2] > 0, so there are now 2
               tested devices, and batteryPercentages stays the same.
             So, the answer is 2.

Constraints:
* 1 <= n == batteryPercentages.length <= 100
* 0 <= batteryPercentages[i] <= 100*/

var countTestedDevices = function(batteryPercentages) {
    let ans = 0;
    for (let x of batteryPercentages)
        if (ans < x) ++ans;
    return ans;
};


/*2961. Double Modular Exponentiation (Medium)
You are given a 0-indexed 2D array variables where
variables[i] = [ai, bi, ci, mi], and an integer target. An index i is good
if the following formula holds:
* 0 <= i < variables.length
* ((aibi % 10)ci) % mi == target
Return an array consisting of good indices in any order.

Example 1:
Input: variables = [[2,3,3,10],[3,3,3,1],[6,1,1,4]], target = 2
Output: [0,2]
Explanation: For each index i in the variables array:
             1) For the index 0, variables[0] = [2,3,3,10],
                (23 % 10)3 % 10 = 2.
             2) For the index 1, variables[1] = [3,3,3,1],
                (33 % 10)3 % 1 = 0.
             3) For the index 2, variables[2] = [6,1,1,4],
                (61 % 10)1 % 4 = 2.
             Therefore we return [0,2] as the answer.

Example 2:
Input: variables = [[39,3,1000,1000]], target = 17
Output: []
Explanation: For each index i in the variables array:
             1) For the index 0, variables[0] = [39,3,1000,1000],
                (393 % 10)1000 % 1000 = 1.
             Therefore we return [] as the answer.

Constraints:
* 1 <= variables.length <= 100
* variables[i] == [ai, bi, ci, mi]
* 1 <= ai, bi, ci, mi <= 10^3
* 0 <= target <= 10^3*/

var getGoodIndices = function(variables, target) {

    function pow(x, p, m) {
        let ans = 1;
        for (; p; p >>= 1) {
            if (p & 1) ans = ans * x % m;
            x = x * x % m;
        }
        return ans;
    }

    const ans = [];
    for (const [i, [a, b, c, m]] of variables.entries()) {
        if (pow(pow(a, b, 10), c, m) == target) ans.push(i);
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

var countSubarrays = function(nums, k) {
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


/*2963. Count the Number of Good Partitions (Hard)
You are given a 0-indexed array nums consisting of positive integers. A
partition of an array into one or more contiguous subarrays is called good
if no two subarrays contain the same number. Return the total number of good
partitions of nums. Since the answer may be large, return it modulo
10^9 + 7.

Example 1:
Input: nums = [1,2,3,4]
Output: 8
Explanation: The 8 possible good partitions are: ([1], [2], [3], [4]),
             ([1], [2], [3,4]), ([1], [2,3], [4]), ([1], [2,3,4]),
             ([1,2], [3], [4]), ([1,2], [3,4]), ([1,2,3], [4]), and
             ([1,2,3,4]).

Example 2:
Input: nums = [1,1,1,1]
Output: 1
Explanation: The only possible good partition is: ([1,1,1,1]).

Example 3:
Input: nums = [1,2,1,3]
Output: 2
Explanation: The 2 possible good partitions are: ([1,2,1], [3]) and
             ([1,2,1,3]).

Constraints:
* 1 <= nums.length <= 10^5
* 1 <= nums[i] <= 10^9*/

var numberOfGoodPartitions = function(nums) {
    const mod = 1_000_000_007n; 
    const last = new Map(); 
    for (let i = 0; i < nums.length; ++i) last.set(nums[i], i); 
    let ans = 1n; 
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        if (ii < i) ans = ans * 2n % mod; 
        ii = Math.max(ii, last.get(nums[i])); 
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

var divisibleTripletCount = function(nums, d) {
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

var findMissingAndRepeatedValues = function(grid) {
    let s = 0, s2 = 0, n = grid.length*grid.length;
    for (const row of grid)
        for (const x of row) {
            s += x;
            s2 += x*x;
        }
    let diff = s - n*(n+1)/2, total = (s2 - n*(n+1)*(2*n+1)/6) / diff;
    return [(total+diff)/2, (total-diff)/2];
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

var divideArray = function(nums, k) {
    nums.sort((a, b) => (a-b));
    const ans = [];
    for (let i = 2; i < nums.length; i += 3) {
        if (nums[i] - nums[i-2] > k) return [];
        ans.push([nums[i-2], nums[i-1], nums[i]]);
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

var minimumCost = function(nums) {
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

var maxFrequencyScore = function(nums, k) {
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

var largestPerimeter = function(nums) {
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

var mostExpensiveItem = function(primeOne, primeTwo) {
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

var selfDivisiblePermutationCount = function(n) {
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

var missingInteger = function(nums) {
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

var minOperations = function(nums, k) {
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

var minimumOperationsToMakeEqual = function(x, y) {
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

var numberOfPowerfulInt = function(start, finish, limit, s) {

    function fn(val) {
        const n = val.length - s.length;
        if (n < 0) return 0;
        const dp = Array(n+1).fill().map(() => Array(2).fill(0));
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

var maximumSubtreeSize = function(edges, colors) {
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

var maxFrequencyElements = function(nums) {
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

var beautifulIndices = function(s, a, b, k) {
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

var findMaximumNumber = function(k, x) {

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

var beautifulIndices = function(s, a, b, k) {

    function kmp(pattern, text) {
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

var minimumCost = function(nums) {
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

var canSortArray = function(nums) {
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

var minimumArrayLength = function(nums) {
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

var countKeyChanges = function(s) {
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

var maximumLength = function(nums) {
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

var flowerGame = function(n, m) {
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

var minOrAfterOperations = function(nums, k) {
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

var findPattern = function(stream, pattern) {
    const lps = [0];
    for (let i = 1, k = 0; i < pattern.length; ++i) {
        while (k && pattern[k] != pattern[i]) k = lps[k-1];
        if (pattern[k] == pattern[i]) ++k;
        lps.push(k);
    }
    for (let i = 0, k = 0, n = pattern.length; true; ++i) {
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

var triangleType = function(nums) {
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

var numberOfPairs = function(points) {
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

var maximumSubarraySum = function(nums, k) {
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

var numberOfPairs = function(points) {
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

var numberCount = function(a, b) {
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

var modifiedMatrix = function(matrix) {
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

var countMatchingSubarrays = function(nums, pattern) {
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

var maxPalindromesAfterOperations = function(words) {
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

var countMatchingSubarrays = function(nums, pattern) {
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

var findPattern = function(stream, pattern) {
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

var frequenciesOfElements = function(head) {
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

var findNumber = function() {
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

var minOperations = function(nums, k) {
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

var minOperations = function(nums, k) {
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

var countPairsOfConnectableServers = function(edges, signalSpeed) {
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

var maximumValueSum = function(nums, k, edges) {
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

var minimumBoxes = function(apple, capacity) {
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

var maximumHappinessSum = function(happiness, k) {
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

var shortestSubstrings = function(arr) {
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

var maximumStrength = function(nums, k) {
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

var sumOfEncryptedInt = function(nums) {
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

var unmarkedSumArray = function(nums, queries) {
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

var minimizeStringValue = function(s) {
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

var sumOfPower = function(nums, k) {
    const n = nums.length, mod = 1_000_000_007n;
    const dp = Array(n+1).fill(0).map(() => Array(k+1).fill(0n));
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
        ans = (ans + dp[i][k] * p2[n-i]) % mod;
    return ans;
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

var isSubstringPresent = function(s) {
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

var countSubstrings = function(s, c) {
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

var minimumDeletions = function(word, k) {
    let mp = {}
    for (const ch of word)
        mp[ch] = -~mp[ch];
    const freq = Object.values(mp);
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

var minimumMoves = function(nums, k, maxChanges) {
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

var maximumLengthSubstring = function(s) {
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

var minOperations = function(k) {
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

var mostFrequentIDs = function(nums, freq) {
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

var stringIndices = function(wordsContainer, wordsQuery) {
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

var sumOfTheDigitsOfHarshadNumber = function(x) {
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

var maxBottlesDrunk = function(numBottles, numExchange) {
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

var countAlternatingSubarrays = function(nums) {
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

var minimumDistance = function(points) {
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

var longestMonotonicSubarray = function(nums) {
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

var getSmallestString = function(s, k) {
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

var minOperationsToMakeMedianK = function(nums, k) {
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

var minimumCost = function(n, edges, query) {

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

var scoreOfString = function(s) {
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

var minRectanglesToCoverPoints = function(points, w) {
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

var minimumTime = function(n, edges, disappear) {
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

var numberOfSubarrays = function(nums) {
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

var findLatestTime = function(s) {
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

var maximumPrimeDifference = function(nums) {
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

var findKthSmallest = function(coins, k) {
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

var minimumValueSum = function(nums, andValues) {
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

var numberOfSpecialChars = function(word) {
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

var numberOfSpecialChars = function(word) {
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

var minimumOperations = function(grid) {
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

var findAnswer = function(n, edges) {
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

var canMakeSquare = function(grid) {
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

var numberOfRightTriangles = function(grid) {
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

var numberOfStableArrays = function(zero, one, limit) {
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

var numberOfStableArrays = function(zero, one, limit) {
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

var addedInteger = function(nums1, nums2) {
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

var minimumAddedInteger = function(nums1, nums2) {
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

var minEnd = function(n, x) {
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

var medianOfUniquenessArray = function(nums) {
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

var isArraySpecial = function(nums) {
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

var isArraySpecial = function(nums, queries) {
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

var sumDigitDifferences = function(nums) {
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

var waysToReachStair = function(k) {
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

var duplicateNumbersXOR = function(nums) {
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

var occurrencesOfElement = function(nums, queries, x) {
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

var queryResults = function(limit, queries) {
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

var minimumChairs = function(s) {
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

var countDays = function(days, meetings) {
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

var clearStars = function(s) {
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

var minimumDifference = function(nums, k) {
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
