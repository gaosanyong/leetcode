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
    let k = 0, n = nums.length;
    for (let i = 1; i < n; ++i)
        if (nums[i-1] > nums[i]) {
            if (k) return -1;
            k = i;
        }
    if (k === 0) return 0;
    return nums[n-1] < nums[0] ? n - k : -1;
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
* 0 <= nums[i] < 231
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
