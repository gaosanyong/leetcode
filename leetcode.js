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
    let ans = 0, freq = new Map(); 
    for (let i = 0, ii = 0; i < nums.length; ++i) {
        freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1); 
        while (freq.get(nums[i]) > k) {
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
